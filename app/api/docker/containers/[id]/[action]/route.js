import { NextResponse } from 'next/server'
import { containerAction } from '@/lib/docker'
import { logActivity } from '@/lib/db'

const ALLOWED_ACTIONS = ['start', 'stop', 'restart', 'remove']

export async function POST(req, { params }) {
  const { id, action } = params

  if (!ALLOWED_ACTIONS.includes(action)) {
    return NextResponse.json({ error: `Action '${action}' not allowed` }, { status: 400 })
  }

  try {
    await containerAction(id, action)
    logActivity(`Container ${id} → ${action}`, action === 'remove' ? 'warn' : 'success')
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
