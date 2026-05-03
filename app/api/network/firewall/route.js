import { NextResponse } from 'next/server'
import { safeExec } from '@/lib/shell'

export async function GET() {
  // Try full ufw status (requires root). Fall back to systemctl for active state.
  let active = false
  let rules = []
  let requiresRoot = false

  try {
    const output = await safeExec('ufw', ['status', 'verbose'])
    active = output.includes('Status: active')

    for (const line of output.split('\n')) {
      const m = line.match(/^(\S+)\s+(ALLOW|DENY|REJECT)\s+(?:IN\s+|OUT\s+)?(.+)$/)
      if (m) rules.push({ to: m[1], action: m[2], from: m[3].trim() })
    }
  } catch {
    requiresRoot = true
    // Fall back: detect active state via systemctl
    try {
      const svc = await safeExec('systemctl', ['is-active', 'ufw'])
      active = svc.trim() === 'active'
    } catch {
      active = false
    }
  }

  return NextResponse.json({ active, rules, requiresRoot })
}
