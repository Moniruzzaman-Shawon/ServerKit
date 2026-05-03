import { NextResponse } from 'next/server'
import { safeExec } from '@/lib/shell'

export async function GET() {
  try {
    const output = await safeExec('ss', ['-tlnp'])
    const ports = []

    for (const line of output.split('\n').slice(1)) {
      const parts = line.trim().split(/\s+/)
      if (parts.length < 5) continue

      const [state, , , address, process] = parts
      if (state !== 'LISTEN') continue

      const colonIdx = address.lastIndexOf(':')
      const port = parseInt(address.slice(colonIdx + 1), 10)
      const addr = address.slice(0, colonIdx)
      const procMatch = process?.match(/users:\(\("([^"]+)"/)

      if (!isNaN(port)) {
        ports.push({
          port,
          proto: 'tcp',
          address: addr || '*',
          process: procMatch?.[1] || '—',
        })
      }
    }

    ports.sort((a, b) => a.port - b.port)
    return NextResponse.json(ports)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
