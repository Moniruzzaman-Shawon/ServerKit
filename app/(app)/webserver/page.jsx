'use client'
import { useEffect, useState } from 'react'
import Badge from '@/components/Badge'
import { Globe, Lock, ExternalLink } from 'lucide-react'

export default function WebServerPage() {
  const [containers, setContainers] = useState([])

  useEffect(() => {
    fetch('/api/docker/containers')
      .then(r => r.json())
      .then(data => {
        const web = (Array.isArray(data) ? data : []).filter(c =>
          ['traefik', 'nginx', 'caddy', 'apache'].some(name =>
            c.name.toLowerCase().includes(name) || c.image.toLowerCase().includes(name)
          )
        )
        setContainers(web)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="p-5 animate-fadein">
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3.5">
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">Reverse proxy</div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-sk-orange" />
            <span className="font-mono text-lg font-medium text-sk-orange">Traefik</span>
          </div>
          <div className="text-[11px] text-sk-faint mt-1">Ports 80 / 443</div>
        </div>
        <div className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3.5">
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">TLS / Let's Encrypt</div>
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-sk-green" />
            <span className="font-mono text-lg font-medium text-sk-green">Auto-renew</span>
          </div>
          <div className="text-[11px] text-sk-faint mt-1">ACME challenge via Traefik</div>
        </div>
        <div className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3.5">
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">Web containers</div>
          <div className="font-mono text-3xl font-medium text-sk-orange">{containers.length}</div>
        </div>
      </div>

      <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-sk-border">
          <span className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em]">
            Web service containers
          </span>
        </div>
        {containers.length === 0 ? (
          <div className="py-10 text-center">
            <Globe size={28} className="text-sk-faint mx-auto mb-3" />
            <p className="text-[13px] text-sk-faint">No web server containers detected.</p>
            <p className="text-[12px] text-sk-faint mt-1">Deploy Traefik or Nginx via Docker to see routes here.</p>
          </div>
        ) : (
          <table className="w-full text-[12px]">
            <thead>
              <tr>
                {['Container', 'Image', 'Status', 'Ports'].map(h => (
                  <th key={h} className="text-left text-2xs font-medium text-sk-faint uppercase
                                         tracking-[.06em] px-4 py-2 border-b border-sk-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {containers.map(c => (
                <tr key={c.id} className="border-b border-sk-subtle last:border-0 hover:bg-white/[.02]">
                  <td className="px-4 py-2.5 font-mono font-medium text-sk-text">{c.name}</td>
                  <td className="px-4 py-2.5 text-sk-muted text-[11px]">{c.image}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={c.status === 'running' ? 'green' : 'red'}>{c.status}</Badge>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-sk-faint">{c.ports || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
