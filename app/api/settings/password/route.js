import { NextResponse } from 'next/server'
import { getSetting, setSetting } from '@/lib/db'
import { logActivity } from '@/lib/db'

export async function POST(req) {
  const { current, next } = await req.json()

  if (!current || !next) {
    return NextResponse.json({ error: 'Both current and new password required' }, { status: 400 })
  }
  if (next.length < 8) {
    return NextResponse.json({ error: 'New password must be at least 8 characters' }, { status: 400 })
  }

  // The effective password is the DB override if set, otherwise the env var
  const storedPassword = getSetting('password')
  const effectivePassword = storedPassword ?? process.env.SK_PASSWORD

  if (current !== effectivePassword) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
  }

  setSetting('password', next)
  logActivity('Password changed via settings', 'success')

  return NextResponse.json({ ok: true })
}
