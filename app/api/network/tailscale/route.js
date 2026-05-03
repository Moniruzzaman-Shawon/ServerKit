import { NextResponse } from 'next/server'
import { safeExec } from '@/lib/shell'

export async function GET() {
  try {
    const raw = await safeExec('tailscale', ['status', '--json'])
    const ts  = JSON.parse(raw)

    const self = ts.Self ? {
      hostName:    ts.Self.HostName,
      dnsName:     ts.Self.DNSName?.replace(/\.$/, ''),
      ips:         ts.Self.TailscaleIPs || [],
      os:          ts.Self.OS,
    } : null

    const peers = Object.values(ts.Peer || {}).map(p => ({
      hostName: p.HostName,
      dnsName:  p.DNSName?.replace(/\.$/, ''),
      ips:      p.TailscaleIPs || [],
      os:       p.OS,
      online:   p.Online ?? false,
      lastSeen: p.LastSeen,
    }))

    return NextResponse.json({
      running: ts.BackendState === 'Running',
      state:   ts.BackendState,
      self,
      peers,
    })
  } catch {
    return NextResponse.json({ running: false, state: 'NotInstalled', self: null, peers: [] })
  }
}
