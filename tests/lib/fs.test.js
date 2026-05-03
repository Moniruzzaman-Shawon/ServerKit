import { describe, it, expect, vi, beforeEach } from 'vitest'

process.env.MEDIA_ROOTS = '/mnt/media,/mnt/webserver'

// Mock fs.promises BEFORE lib/fs.js imports it
vi.mock('fs', () => ({
  promises: {
    readdir: vi.fn(),
    stat:    vi.fn(),
  },
}))

const { isAllowed, listDir } = await import('../../lib/fs.js')
const { promises: fsMock }   = await import('fs')

beforeEach(() => vi.clearAllMocks())

// ─── isAllowed ────────────────────────────────────────────────────────────────

describe('isAllowed – path traversal prevention', () => {
  it('allows exact root',                 () => expect(isAllowed('/mnt/media')).toBe(true))
  it('allows exact second root',          () => expect(isAllowed('/mnt/webserver')).toBe(true))
  it('allows nested path under root',     () => expect(isAllowed('/mnt/media/Movies')).toBe(true))
  it('allows deep nesting',               () => expect(isAllowed('/mnt/media/a/b/c')).toBe(true))

  it('blocks /etc',                       () => expect(isAllowed('/etc/passwd')).toBe(false))
  it('blocks /root',                      () => expect(isAllowed('/root')).toBe(false))
  it('blocks /',                          () => expect(isAllowed('/')).toBe(false))
  it('blocks /var/log',                   () => expect(isAllowed('/var/log')).toBe(false))
  it('blocks path traversal via ..',      () => expect(isAllowed('/mnt/media/../../etc/passwd')).toBe(false))
  it('blocks empty string',               () => expect(isAllowed('')).toBe(false))

  it('blocks path that starts-with but is not a child', () => {
    // /mnt/media_extra starts with '/mnt/media' as a string, but is NOT under /mnt/media/
    expect(isAllowed('/mnt/media_extra')).toBe(false)
  })
})

// ─── listDir ──────────────────────────────────────────────────────────────────

describe('listDir', () => {
  it('rejects paths outside allowed roots', async () => {
    await expect(listDir('/etc')).rejects.toThrow('outside allowed roots')
    await expect(listDir('/home/user')).rejects.toThrow('outside allowed roots')
  })

  it('returns directories before files', async () => {
    fsMock.readdir.mockResolvedValue([
      { name: 'zfilm.mkv', isDirectory: () => false },
      { name: 'aMovies',   isDirectory: () => true  },
    ])
    fsMock.stat.mockResolvedValue({ size: 4096, mtime: new Date() })

    const entries = await listDir('/mnt/media')
    expect(entries[0].type).toBe('dir')
    expect(entries[0].name).toBe('aMovies')
    expect(entries[1].type).toBe('file')
    expect(entries[1].name).toBe('zfilm.mkv')
  })

  it('attaches size and modified date', async () => {
    const mtime = new Date('2025-06-01T12:00:00.000Z')
    fsMock.readdir.mockResolvedValue([{ name: 'file.mkv', isDirectory: () => false }])
    fsMock.stat.mockResolvedValue({ size: 5000, mtime })

    const [entry] = await listDir('/mnt/media')
    expect(entry.size).toBe(5000)
    expect(entry.modified).toBe(mtime.toISOString())
  })

  it('sorts dirs alphabetically among themselves', async () => {
    fsMock.readdir.mockResolvedValue([
      { name: 'ZShows',  isDirectory: () => true },
      { name: 'AMovies', isDirectory: () => true },
      { name: 'MMusic',  isDirectory: () => true },
    ])
    fsMock.stat.mockResolvedValue({ size: 0, mtime: new Date() })

    const names = (await listDir('/mnt/media')).map(e => e.name)
    expect(names).toEqual(['AMovies', 'MMusic', 'ZShows'])
  })

  it('skips entries whose stat fails (e.g. EACCES)', async () => {
    fsMock.readdir.mockResolvedValue([
      { name: 'ok.mkv',     isDirectory: () => false },
      { name: 'broken.mkv', isDirectory: () => false },
    ])
    fsMock.stat
      .mockResolvedValueOnce({ size: 100, mtime: new Date() })
      .mockRejectedValueOnce(new Error('EACCES: permission denied'))

    const entries = await listDir('/mnt/media')
    expect(entries).toHaveLength(1)
    expect(entries[0].name).toBe('ok.mkv')
  })

  it('returns empty array for an empty directory', async () => {
    fsMock.readdir.mockResolvedValue([])
    const entries = await listDir('/mnt/media')
    expect(entries).toEqual([])
  })
})
