'use client'
import { useEffect, useState } from 'react'
import Badge from '@/components/Badge'
import { Shield, Wifi, ExternalLink } from 'lucide-react'

export default function NetworkPage() {
  const [ports, setPorts] = useState([])
  const [firewall, setFirewall] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/network/ports').then(r => r.json()).catch(() => []),
      fetch('/api/network/firewall').then(r => r.json()).catch(() => null),
    ]).then(([p, f]) => {
      setPorts(Array.isArray(p) ? p : [])
      setFirewall(f)
      setLoading(false)
    })
  }, [])

  return (
    <div className="p-4 lg:p-5 animate-fadein">

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3.5">
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">UFW Firewall</div>
          <div className="flex items-center gap-2">
            <Shield size={16} className={firewall?.active ? 'text-sk-green' : 'text-sk-red'} />
            <span className={`font-mono text-lg font-medium ${firewall?.active ? 'text-sk-green' : 'text-sk-red'}`}>
              {firewall ? (firewall.active ? 'Active' : 'Inactive') : '…'}
            </span>
          </div>
          <div className="text-[11px] text-sk-faint mt-1">Default: deny incoming, allow outgoing</div>
        </div>

        <div className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3.5">
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">Open ports</div>
          <div className="font-mono text-3xl font-medium text-sk-orange">{ports.length}</div>
          <div className="text-[11px] text-sk-faint mt-1">TCP/UDP listening</div>
        </div>

        <div className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3.5">
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">Tailscale</div>
          <div className="flex items-center gap-2">
            <Wifi size={16} className="text-sk-muted" />
            <span className="font-mono text-lg font-medium text-sk-muted">Unknown</span>
          </div>
          <div className="text-[11px] text-sk-faint mt-1">Install tailscale to enable</div>
        </div>
      </div>

      {/* UFW rules */}
      {firewall?.rules?.length > 0 && (
        <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-sk-border flex items-center justify-between">
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

      {/* Open ports */}
      <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-sk-border flex items-center justify-between">
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
                  <td className="px-4 py-2.5 font-mono text-sk-muted">{p.proto}</td>
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
