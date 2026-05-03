import { NextResponse } from 'next/server'
import { safeExec } from '@/lib/shell'

function parseSS(output, proto) {
  const ports = []
  for (const line of output.split('\n').slice(1)) {
    const parts = line.trim().split(/\s+/)
    if (parts.length < 4) continue

    // ss columns: State Recv-Q Send-Q Local-Address:Port Peer-Address:Port [Process]
    const state   = parts[0]
    const address = parts[3]
    const procStr = parts[5] || ''

    const validState = proto === 'udp' ? (state === 'UNCONN' || state === 'LISTEN') : state === 'LISTEN'
    if (!validState) continue

    const colonIdx = address.lastIndexOf(':')
    if (colonIdx === -1) continue

    const port = parseInt(address.slice(colonIdx + 1), 10)
    const addr = address.slice(0, colonIdx).replace(/^\[|\]$/g, '') || '*'
    const procMatch = procStr.match(/users:\(\("([^"]+)"/)

    if (!isNaN(port)) {
      ports.push({
        port,
        proto,
        address: addr,
        process: procMatch?.[1] || '—',
      })
    }
  }
  return ports
}

export async function GET() {
  try {
    const [tcpOut, udpOut] = await Promise.all([
      safeExec('ss', ['-tlnp']).catch(() => ''),
      safeExec('ss', ['-ulnp']).catch(() => ''),
    ])

    const tcp = parseSS(tcpOut, 'tcp')
    const udp = parseSS(udpOut, 'udp')

    const ports = [...tcp, ...udp].sort((a, b) => a.port - b.port)
    return NextResponse.json(ports)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
