import { NextResponse } from 'next/server'
import { signToken, COOKIE } from '@/lib/auth'
import { getSetting } from '@/lib/db'

export async function POST(req) {
  const { password } = await req.json()

  if (!process.env.SK_PASSWORD) {
    return NextResponse.json({ error: 'SK_PASSWORD not set in environment' }, { status: 500 })
  }

  // DB-stored password (set via Settings page) takes precedence over env var
  const effectivePassword = getSetting('password') ?? process.env.SK_PASSWORD

  if (password !== effectivePassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

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
