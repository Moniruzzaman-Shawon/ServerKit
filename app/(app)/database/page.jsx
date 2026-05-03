'use client'
import { useEffect, useState } from 'react'
import Badge from '@/components/Badge'
import { Database, Play } from 'lucide-react'

export default function DatabasePage() {
  const [containers, setContainers] = useState([])

  useEffect(() => {
    fetch('/api/docker/containers')
      .then(r => r.json())
      .then(data => {
        const dbs = (Array.isArray(data) ? data : []).filter(c =>
          ['postgres', 'mysql', 'mariadb', 'mongo', 'redis', 'sqlite'].some(name =>
            c.name.toLowerCase().includes(name) || c.image.toLowerCase().includes(name)
          )
        )
        setContainers(dbs)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="p-4 lg:p-5 animate-fadein">
      <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-sk-border">
          <span className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em]">
            Database containers
          </span>
        </div>
        {containers.length === 0 ? (
          <div className="py-14 text-center">
            <Database size={30} className="text-sk-faint mx-auto mb-3" />
            <p className="text-[13px] text-sk-faint">No database containers detected.</p>
            <p className="text-[12px] text-sk-faint mt-1">Run PostgreSQL, MySQL, or Redis via Docker to see them here.</p>
            <pre className="mt-4 mx-auto inline-block text-left bg-sk-el border border-sk-border rounded-md
                            px-4 py-3 font-mono text-[11px] text-sk-muted">
{`docker run -d \\
  --name postgres \\
  -e POSTGRES_PASSWORD=secret \\
  -p 5432:5432 \\
  postgres:16`}
            </pre>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-[12px]">
            <thead>
              <tr>
                {['Container', 'Image', 'Status', 'Port', 'Uptime'].map(h => (
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
                  <td className="px-4 py-2.5 font-mono text-[11px] text-sk-orange">{c.ports || '—'}</td>
                  <td className="px-4 py-2.5 text-[11px] text-sk-faint">{c.statusText}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  )
}
