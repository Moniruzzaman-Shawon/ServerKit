import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock child_process BEFORE lib/shell.js is imported so its module-level
// `promisify(execFile)` captures the mock, not the real execFile.
vi.mock('child_process', () => ({
  execFile: vi.fn((cmd, args, opts, cb) => {
    // Resolve promisify with an object matching execFile's callback shape
    cb(null, { stdout: `mock output for: ${cmd}\n`, stderr: '' })
  }),
}))

const { safeExec } = await import('../../lib/shell.js')
const { execFile }  = await import('child_process')

beforeEach(() => vi.clearAllMocks())

// ─── Allowlist enforcement (no exec needed — throws before reaching execFile) ──

describe('safeExec – blocked commands', () => {
  it('throws for rm',           async () => await expect(safeExec('rm', ['-rf', '/'])).rejects.toThrow('not allowed'))
  it('throws for curl',         async () => await expect(safeExec('curl', ['https://evil.com'])).rejects.toThrow('not allowed'))
  it('throws for wget',         async () => await expect(safeExec('wget', [])).rejects.toThrow('not allowed'))
  it('throws for bash',         async () => await expect(safeExec('bash', ['-c', 'whoami'])).rejects.toThrow('not allowed'))
  it('throws for empty string', async () => await expect(safeExec('')).rejects.toThrow('not allowed'))
  it('throws for shell injection attempt', async () =>
    await expect(safeExec('cat /etc/passwd; rm -rf /')).rejects.toThrow('not allowed'))
})

// ─── Allowed commands — verified to call execFile with correct args ───────────

describe('safeExec – allowed commands', () => {
  it('resolves for "df"', async () => {
    await expect(safeExec('df', ['-h'])).resolves.toBeDefined()
    expect(execFile).toHaveBeenCalledWith('df', ['-h'], expect.any(Object), expect.any(Function))
  })

  it('resolves for "ss"', async () => {
    await expect(safeExec('ss', ['-tlnp'])).resolves.toBeDefined()
    expect(execFile).toHaveBeenCalledWith('ss', ['-tlnp'], expect.any(Object), expect.any(Function))
  })

  it('resolves for "uptime"', async () => {
    await expect(safeExec('uptime', [])).resolves.toBeDefined()
  })

  it('resolves for "hostname"', async () => {
    await expect(safeExec('hostname', [])).resolves.toBeDefined()
  })

  it('resolves for "ufw"', async () => {
    await expect(safeExec('ufw', ['status', 'verbose'])).resolves.toBeDefined()
  })

  it('returns trimmed stdout', async () => {
    const result = await safeExec('uptime', [])
    expect(result).toBe(`mock output for: uptime`)   // .trim() strips trailing \n
  })
})

// ─── Error propagation ────────────────────────────────────────────────────────

describe('safeExec – error propagation', () => {
  it('rejects when execFile calls back with an error', async () => {
    execFile.mockImplementationOnce((cmd, args, opts, cb) => {
      cb(new Error('permission denied'))
    })
    await expect(safeExec('df', ['-h'])).rejects.toThrow('permission denied')
  })
})
