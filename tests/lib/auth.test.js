import { describe, it, expect, vi, beforeEach } from 'vitest'

// next/headers is already mocked in tests/setup.js
// Override JWT_SECRET for deterministic tests
process.env.JWT_SECRET = 'test-secret-key-for-vitest-only'

const { signToken, verifyToken, getSession, COOKIE } = await import('../../lib/auth.js')
const nextHeaders = await import('next/headers')

// ─── COOKIE name ──────────────────────────────────────────────────────────────

describe('COOKIE', () => {
  it('exports the cookie name constant', () => {
    expect(typeof COOKIE).toBe('string')
    expect(COOKIE.length).toBeGreaterThan(0)
  })
})

// ─── signToken / verifyToken ──────────────────────────────────────────────────

describe('signToken + verifyToken', () => {
  it('signs a token and verifies it successfully', async () => {
    const token = await signToken()
    expect(typeof token).toBe('string')
    expect(token.split('.').length).toBe(3)   // valid JWT structure

    const payload = await verifyToken(token)
    expect(payload).not.toBeNull()
    expect(payload.sub).toBe('admin')
  })

  it('returns null for an invalid token', async () => {
    const result = await verifyToken('not.a.valid.token')
    expect(result).toBeNull()
  })

  it('returns null for an empty string', async () => {
    expect(await verifyToken('')).toBeNull()
  })

  it('returns null for a token signed with a different secret', async () => {
    // Sign with wrong secret manually
    const { SignJWT } = await import('jose')
    const wrongSecret = new TextEncoder().encode('wrong-secret')
    const bad = await new SignJWT({ sub: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(wrongSecret)

    expect(await verifyToken(bad)).toBeNull()
  })

  it('token payload includes expiration', async () => {
    const token = await signToken()
    const payload = await verifyToken(token)
    expect(payload.exp).toBeGreaterThan(Math.floor(Date.now() / 1000))
  })

  it('token expires in ~7 days', async () => {
    const token = await signToken()
    const payload = await verifyToken(token)
    const sevenDaysFromNow = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
    // Allow ±60 second margin
    expect(payload.exp).toBeGreaterThan(sevenDaysFromNow - 60)
    expect(payload.exp).toBeLessThan(sevenDaysFromNow + 60)
  })
})

// ─── getSession ───────────────────────────────────────────────────────────────

describe('getSession', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns null when no cookie is set', async () => {
    nextHeaders.cookies.mockReturnValue({ get: vi.fn().mockReturnValue(undefined) })
    const session = await getSession()
    expect(session).toBeNull()
  })

  it('returns payload for a valid cookie', async () => {
    const token = await signToken()
    nextHeaders.cookies.mockReturnValue({
      get: vi.fn().mockReturnValue({ value: token }),
    })
    const session = await getSession()
    expect(session).not.toBeNull()
    expect(session.sub).toBe('admin')
  })

  it('returns null for an invalid cookie value', async () => {
    nextHeaders.cookies.mockReturnValue({
      get: vi.fn().mockReturnValue({ value: 'garbage' }),
    })
    const session = await getSession()
    expect(session).toBeNull()
  })
})
