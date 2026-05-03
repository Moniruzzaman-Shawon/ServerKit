'use client'
import { useEffect, useState } from 'react'
import Badge from '@/components/Badge'
import { formatBytes } from '@/lib/utils'
import { HardDrive, Plus, Trash2, FolderOpen } from 'lucide-react'

export default function StoragePage() {
  const [buckets, setBuckets] = useState([])
  const [creds, setCreds] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/storage/buckets')
      .then(r => r.json())
      .then(d => {
        setBuckets(d.buckets || [])
        setCreds(d.credentials || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const totalObjects = buckets.reduce((s, b) => s + (b.objects || 0), 0)
  const totalSize    = buckets.reduce((s, b) => s + (b.sizeBytes || 0), 0)

  return (
    <div className="p-5 animate-fadein">

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { l: 'Buckets',      v: buckets.length,                c: 'text-sk-orange' },
          { l: 'Objects',      v: totalObjects.toLocaleString(),  c: 'text-sk-purple' },
          { l: 'Total size',   v: formatBytes(totalSize),         c: 'text-sk-amber'  },
          { l: 'Endpoint',     v: ':9000',                        c: 'text-sk-green'  },
        ].map(s => (
          <div key={s.l} className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3">
            <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-1">{s.l}</div>
            <div className={`font-mono text-[22px] font-medium ${s.c}`}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Buckets */}
      <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden mb-4">
        <div className="px-4 py-2.5 border-b border-sk-border flex items-center justify-between">
          <span className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em]">Buckets</span>
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sk-orange
                             text-white text-[11px] font-medium hover:opacity-90 transition-opacity">
            <Plus size={11} /> Create bucket
          </button>
        </div>
        {loading ? (
          <div className="py-8 text-center text-sk-faint text-sm">Loading…</div>
        ) : buckets.length === 0 ? (
          <div className="py-8 text-center text-sk-faint text-sm">
            No buckets found. Is MinIO running on port 9000?
          </div>
        ) : (
          <table className="w-full text-[12px]">
            <thead>
              <tr>
                {['Name', 'Objects', 'Size', 'Access', 'Created', 'Actions'].map(h => (
                  <th key={h} className="text-left text-2xs font-medium text-sk-faint uppercase
                                         tracking-[.06em] px-4 py-2 border-b border-sk-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buckets.map(b => (
                <tr key={b.name} className="border-b border-sk-subtle last:border-0 hover:bg-white/[.02]">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <HardDrive size={13} className="text-sk-amber" />
                      <span className="font-mono font-medium text-sk-text">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-sk-muted">{(b.objects || 0).toLocaleString()}</td>
                  <td className="px-4 py-2.5 font-mono text-sk-muted">{formatBytes(b.sizeBytes || 0)}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant={b.access === 'public' ? 'orange' : 'amber'}>{b.access || 'private'}</Badge>
                  </td>
                  <td className="px-4 py-2.5 text-[11px] text-sk-faint">
                    {b.created ? new Date(b.created).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <button className="flex items-center gap-1 px-2 py-1 rounded-md border border-sk-border
                                         text-[11px] text-sk-muted hover:bg-sk-el cursor-pointer transition-all">
                        <FolderOpen size={10} /> Browse
                      </button>
                      <button className="flex items-center gap-1 px-2 py-1 rounded-md border border-sk-red/40
                                         text-[11px] text-sk-red hover:bg-sk-red/10 cursor-pointer transition-all">
                        <Trash2 size={10} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* S3 credentials */}
      <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-sk-border">
          <span className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em]">S3 Credentials</span>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {[
            { l: 'Endpoint',   v: creds?.endpoint   || 'http://server:9000' },
            { l: 'Access key', v: creds?.accessKey  || 'minioadmin' },
            { l: 'Secret key', v: creds?.secretKey  ? '••••••••••' : '(not configured)' },
            { l: 'Region',     v: 'us-east-1 (any)' },
          ].map(row => (
            <div key={row.l}>
              <div className="text-[11px] text-sk-faint mb-1">{row.l}</div>
              <div className="font-mono text-[12px] text-sk-text bg-sk-el px-2.5 py-1.5
                              rounded-md border border-sk-border">
                {row.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
