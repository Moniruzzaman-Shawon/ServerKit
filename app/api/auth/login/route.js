import { NextResponse } from 'next/server'
import { signToken, COOKIE } from '@/lib/auth'
import { getSetting } from '@/lib/db'

// In-memory rate limiter — 5 failed attempts per IP per 15 minutes
const loginAttempts = new Map()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

setInterval(() => {
  const now = Date.now()
  for (const [ip, r] of loginAttempts.entries()) {
    if (now > r.resetAt) loginAttempts.delete(ip)
  }
}, 60 * 60 * 1000)

function checkLimit(ip) {
  const now = Date.now()
  let r = loginAttempts.get(ip)
  if (!r || now > r.resetAt) r = { count: 0, resetAt: now + WINDOW_MS }
  r.count++
  loginAttempts.set(ip, r)
  return {
    blocked: r.count > MAX_ATTEMPTS,
    retryAfter: Math.ceil((r.resetAt - now) / 1000),
  }
}

function clearLimit(ip) {
  loginAttempts.delete(ip)
}

export async function POST(req) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1'

  const { blocked, retryAfter } = checkLimit(ip)
  if (blocked) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${Math.ceil(retryAfter / 60)} minutes.` },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }

  const { password } = await req.json()

  if (!process.env.SK_PASSWORD) {
    return NextResponse.json({ error: 'SK_PASSWORD not set in environment' }, { status: 500 })
  }

  const effectivePassword = getSetting('password') ?? process.env.SK_PASSWORD

  if (password !== effectivePassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  clearLimit(ip)

  const token = await signToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  })
  return res
}
