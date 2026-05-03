import { NextResponse } from 'next/server'
import { safeExec } from '@/lib/shell'

export async function GET() {
  try {
    const output = await safeExec('ufw', ['status', 'verbose'])
    const active = output.includes('Status: active')
    const rules = []

    for (const line of output.split('\n')) {
      // Match lines like: "22/tcp                     ALLOW IN    Anywhere"
      const m = line.match(/^(\S+)\s+(ALLOW|DENY|REJECT)\s+(?:IN\s+|OUT\s+)?(.+)$/)
      if (m) {
        rules.push({ to: m[1], action: m[2], from: m[3].trim() })
      }
    }

    return NextResponse.json({ active, rules })
  } catch (err) {
    // ufw might not be installed
    return NextResponse.json({ active: false, rules: [], error: err.message })
  }
}
