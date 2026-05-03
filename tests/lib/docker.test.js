import { describe, it, expect, vi, beforeEach } from 'vitest'

// ─── Mock Dockerode before lib/docker.js imports it ──────────────────────────

const MOCK_RAW = {
  Id: 'abc123def456789012',
  Names: ['/my-app'],
  Image: 'node:20-alpine',
  State: 'running',
  Status: 'Up 3 hours',
  Ports: [
    { PublicPort: 3000, PrivatePort: 3000, Type: 'tcp' },
    { PrivatePort: 9229, Type: 'tcp' },     // no PublicPort — must be excluded
  ],
  Created: 1700000000,
}

const LOG_BUF = (() => {
  const msg = Buffer.from('hello from container\n')
  const hdr = Buffer.alloc(8)
  hdr.writeUInt8(1, 0)
  hdr.writeUInt32BE(msg.length, 4)
  return Buffer.concat([hdr, msg])
})()

const mockContainerInstance = {
  start:   vi.fn().mockResolvedValue({}),
  stop:    vi.fn().mockResolvedValue({}),
  restart: vi.fn().mockResolvedValue({}),
  remove:  vi.fn().mockResolvedValue({}),
  logs:    vi.fn().mockResolvedValue(LOG_BUF),
}

vi.mock('dockerode', () => {
  const MockDockerode = vi.fn().mockImplementation(() => ({
    listContainers: vi.fn().mockImplementation(async ({ all } = {}) =>
      all ? [MOCK_RAW, { ...MOCK_RAW, Id: 'stopped000000000001', State: 'exited', Names: ['/old'] }]
           : [MOCK_RAW]
    ),
    getContainer: vi.fn().mockReturnValue(mockContainerInstance),
    listImages:   vi.fn().mockResolvedValue([{}, {}, {}]),
  }))
  return { default: MockDockerode }
})

const { listContainers, containerAction, getContainerLogs, getDockerSummary } =
  await import('../../lib/docker.js')

beforeEach(() => vi.clearAllMocks())

// ─── listContainers ───────────────────────────────────────────────────────────

describe('listContainers', () => {
  it('returns an array', async () => {
    expect(Array.isArray(await listContainers())).toBe(true)
  })

  it('truncates id to 12 chars', async () => {
    const [c] = await listContainers()
    expect(c.id).toBe('abc123def456')
    expect(c.id.length).toBe(12)
  })

  it('strips leading slash from name', async () => {
    const [c] = await listContainers()
    expect(c.name).toBe('my-app')
    expect(c.name).not.toContain('/')
  })

  it('exposes image, status, statusText', async () => {
    const [c] = await listContainers()
    expect(c.image).toBe('node:20-alpine')
    expect(c.status).toBe('running')
    expect(c.statusText).toBe('Up 3 hours')
  })

  it('only includes ports with a public mapping', async () => {
    const [c] = await listContainers()
    expect(c.ports).toContain('3000')
    expect(c.ports).not.toContain('9229')
  })
})

// ─── containerAction ──────────────────────────────────────────────────────────

describe('containerAction', () => {
  it('calls start on the container', async () => {
    await containerAction('abc123', 'start')
    expect(mockContainerInstance.start).toHaveBeenCalledOnce()
  })

  it('calls stop on the container', async () => {
    await containerAction('abc123', 'stop')
    expect(mockContainerInstance.stop).toHaveBeenCalledOnce()
  })

  it('calls restart on the container', async () => {
    await containerAction('abc123', 'restart')
    expect(mockContainerInstance.restart).toHaveBeenCalledOnce()
  })

  it('calls remove with { force: true }', async () => {
    await containerAction('abc123', 'remove')
    expect(mockContainerInstance.remove).toHaveBeenCalledWith({ force: true })
  })

  it('throws for unknown actions', async () => {
    await expect(containerAction('abc123', 'exec')).rejects.toThrow('Unknown action')
    await expect(containerAction('abc123', '')).rejects.toThrow('Unknown action')
    await expect(containerAction('abc123', 'kill')).rejects.toThrow('Unknown action')
  })
})

// ─── getContainerLogs ─────────────────────────────────────────────────────────

describe('getContainerLogs', () => {
  it('strips Docker multiplexed stream headers and returns text', async () => {
    const logs = await getContainerLogs('abc123', 50)
    expect(logs).toContain('hello from container')
  })

  it('handles an empty buffer without throwing', async () => {
    mockContainerInstance.logs.mockResolvedValueOnce(Buffer.alloc(0))
    const logs = await getContainerLogs('abc123')
    expect(logs).toBe('')
  })
})

// ─── getDockerSummary ─────────────────────────────────────────────────────────

describe('getDockerSummary', () => {
  it('returns running, total, images as numbers', async () => {
    const s = await getDockerSummary()
    expect(s).toMatchObject({
      running: expect.any(Number),
      total:   expect.any(Number),
      images:  expect.any(Number),
    })
  })

  it('total is >= running', async () => {
    const { running, total } = await getDockerSummary()
    expect(total).toBeGreaterThanOrEqual(running)
  })

  it('running = 1, total = 2 from mock', async () => {
    const { running, total } = await getDockerSummary()
    expect(running).toBe(1)
    expect(total).toBe(2)
    await expect(getDockerSummary()).resolves.toMatchObject({ images: 3 })
  })
})
