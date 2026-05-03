'use client'
import { useEffect, useState } from 'react'
import Badge from '@/components/Badge'
import { Shield, Wifi, Info, Monitor } from 'lucide-react'

function osIcon(os) {
  const o = (os || '').toLowerCase()
  if (o.includes('ios') || o.includes('ipad'))  return '📱'
  if (o.includes('android'))                    return '📱'
  if (o.includes('mac') || o.includes('darwin')) return '💻'
  if (o.includes('windows'))                    return '🖥️'
  return '🐧'
}

export default function NetworkPage() {
  const [ports,     setPorts]     = useState([])
  const [firewall,  setFirewall]  = useState(null)
  const [tailscale, setTailscale] = useState(null)
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/network/ports').then(r => r.json()).catch(() => []),
      fetch('/api/network/firewall').then(r => r.json()).catch(() => null),
      fetch('/api/network/tailscale').then(r => r.json()).catch(() => null),
    ]).then(([p, f, ts]) => {
      setPorts(Array.isArray(p) ? p : [])
      setFirewall(f)
      setTailscale(ts)
      setLoading(false)
    })
  }, [])

  return (
    <div className="p-4 lg:p-5 animate-fadein">

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">

        {/* UFW */}
        <div className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3.5">
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">UFW Firewall</div>
          <div className="flex items-center gap-2">
            <Shield size={16} className={firewall?.active ? 'text-sk-green' : 'text-sk-red'} />
            <span className={`font-mono text-lg font-medium ${firewall?.active ? 'text-sk-green' : 'text-sk-red'}`}>
              {firewall ? (firewall.active ? 'Active' : 'Inactive') : '…'}
            </span>
          </div>
          <div className="text-[11px] text-sk-faint mt-1">
            {firewall?.requiresRoot
              ? 'Rules hidden — run ServerKit as root to see them'
              : 'Default: deny incoming, allow outgoing'}
          </div>
        </div>

        {/* Open ports */}
        <div className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3.5">
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">Open ports</div>
          <div className="font-mono text-3xl font-medium text-sk-orange">{ports.length}</div>
          <div className="text-[11px] text-sk-faint mt-1">
            {ports.filter(p => p.proto === 'tcp').length} TCP ·{' '}
            {ports.filter(p => p.proto === 'udp').length} UDP listening
          </div>
        </div>

        {/* Tailscale */}
        <div className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3.5">
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">Tailscale</div>
          <div className="flex items-center gap-2">
            <Wifi size={16} className={tailscale?.running ? 'text-sk-green' : 'text-sk-muted'} />
            <span className={`font-mono text-lg font-medium ${tailscale?.running ? 'text-sk-green' : 'text-sk-muted'}`}>
              {tailscale ? (tailscale.running ? 'Connected' : tailscale.state || 'Offline') : '…'}
            </span>
          </div>
          <div className="text-[11px] text-sk-faint mt-1 font-mono truncate">
            {tailscale?.self?.ips?.[0] || 'Not connected'}
          </div>
        </div>
      </div>

      {/* Tailscale details */}
      {tailscale?.running && (
        <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-sk-border flex items-center gap-2">
            <Wifi size={13} className="text-sk-green" />
            <span className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em]">Tailscale network</span>
          </div>
          <div className="divide-y divide-sk-subtle">

            {/* Self */}
            {tailscale.self && (
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="text-base leading-none">{osIcon(tailscale.self.os)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-sk-text">{tailscale.self.hostName}</span>
                    <Badge variant="green">this device</Badge>
                  </div>
                  <div className="text-[11px] text-sk-faint font-mono mt-0.5 truncate">
                    {tailscale.self.ips.join('  ·  ')}
                  </div>
                  {tailscale.self.dnsName && (
                    <div className="text-[11px] text-sk-faint font-mono truncate">{tailscale.self.dnsName}</div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-sk-green inline-block" />
                </div>
              </div>
            )}

            {/* Peers */}
            {tailscale.peers.map(peer => (
              <div key={peer.hostName} className="flex items-center gap-3 px-4 py-3">
                <span className="text-base leading-none">{osIcon(peer.os)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-sk-text">{peer.hostName}</span>
                    <span className="text-[11px] text-sk-faint capitalize">{peer.os}</span>
                  </div>
                  <div className="text-[11px] text-sk-faint font-mono mt-0.5 truncate">
                    {peer.ips.join('  ·  ')}
                  </div>
                  {peer.dnsName && (
                    <div className="text-[11px] text-sk-faint font-mono truncate">{peer.dnsName}</div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <span className={`w-2 h-2 rounded-full inline-block ${peer.online ? 'bg-sk-green' : 'bg-sk-faint'}`} />
                </div>
              </div>
            ))}

            {tailscale.peers.length === 0 && (
              <div className="px-4 py-4 text-[12px] text-sk-faint">No other devices on this Tailnet.</div>
            )}
          </div>
        </div>
      )}

      {/* UFW rules (only when root access available) */}
      {firewall?.rules?.length > 0 && (
        <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-sk-border flex items-center gap-2">
            <Shield size={13} className="text-sk-muted" />
            <span className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em]">UFW Rules</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-[12px]">
              <thead>
                <tr>
                  {['To', 'Action', 'From'].map(h => (
                    <th key={h} className="text-left text-2xs font-medium text-sk-faint uppercase
                                           tracking-[.06em] px-4 py-2 border-b border-sk-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {firewall.rules.map((r, i) => (
                  <tr key={i} className="border-b border-sk-subtle last:border-0 hover:bg-white/[.02]">
                    <td className="px-4 py-2.5 font-mono text-sk-text">{r.to}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={r.action === 'ALLOW' ? 'green' : 'red'}>{r.action}</Badge>
                    </td>
                    <td className="px-4 py-2.5 text-sk-muted">{r.from}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* UFW root notice */}
      {firewall?.requiresRoot && (
        <div className="flex items-start gap-2.5 bg-sk-el border border-sk-border rounded-lg
                        px-4 py-3 mb-4 text-[12px] text-sk-muted">
          <Info size={13} className="flex-shrink-0 mt-0.5 text-sk-faint" />
          <span>
            UFW firewall rules require root access. To view rules, run ServerKit with{' '}
            <code className="font-mono text-sk-orange">sudo npm start</code>, or add{' '}
            <code className="font-mono text-sk-orange">serverkit ALL=(ALL) NOPASSWD: /usr/sbin/ufw</code>{' '}
            to <code className="font-mono text-sk-orange">/etc/sudoers</code>.
          </span>
        </div>
      )}

      {/* Listening ports */}
      <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-sk-border flex items-center gap-2">
          <Monitor size={13} className="text-sk-muted" />
          <span className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em]">Listening ports</span>
        </div>
        {loading ? (
          <div className="py-8 text-center text-sk-faint text-sm">Loading…</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-[12px]">
              <thead>
                <tr>
                  {['Port', 'Proto', 'Address', 'Process'].map(h => (
                    <th key={h} className="text-left text-2xs font-medium text-sk-faint uppercase
                                           tracking-[.06em] px-4 py-2 border-b border-sk-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ports.map((p, i) => (
                  <tr key={i} className="border-b border-sk-subtle last:border-0 hover:bg-white/[.02]">
                    <td className="px-4 py-2.5">
                      <span className="font-mono font-medium text-sk-orange">{p.port}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge variant={p.proto === 'tcp' ? 'default' : 'amber'}>{p.proto}</Badge>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-sk-faint">{p.address}</td>
                    <td className="px-4 py-2.5 text-sk-muted">{p.process}</td>
                  </tr>
                ))}
                {ports.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-sk-faint text-sm">No data</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
