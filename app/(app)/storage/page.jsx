'use client'
import { useEffect, useState, useCallback } from 'react'
import Badge from '@/components/Badge'
import { formatBytes } from '@/lib/utils'
import { HardDrive, Plus, Trash2, FolderOpen, X, AlertTriangle } from 'lucide-react'

// ── Create bucket modal ────────────────────────────────────────────────────────

function CreateModal({ onClose, onCreated }) {
  const [name, setName] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      const res = await fetch('/api/storage/buckets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.error || 'Failed to create bucket'); return }
      onCreated()
    } catch {
      setErr('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
         style={{ background: 'rgba(0,0,0,0.6)' }}
         onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-sk-surface border border-sk-border rounded-xl w-[380px] shadow-2xl animate-fadein">
        <div className="flex items-center justify-between px-5 py-4 border-b border-sk-border">
          <span className="text-sm font-medium text-sk-text">Create bucket</span>
          <button onClick={onClose} className="text-sk-faint hover:text-sk-text transition-colors cursor-pointer">
            <X size={15} />
          </button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-4">
          <div>
            <label className="block text-2xs font-medium text-sk-muted uppercase tracking-[.08em] mb-1.5">
              Bucket name
            </label>
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value.toLowerCase())}
              placeholder="my-bucket"
              className="w-full bg-sk-el border border-sk-border rounded-md px-3 py-2
                         text-sk-text text-sm outline-none font-mono
                         focus:border-sk-orange transition-colors"
            />
            <p className="text-[11px] text-sk-faint mt-1.5">
              3–63 lowercase letters, numbers, and hyphens only.
            </p>
          </div>
          {err && (
            <div className="flex items-center gap-2 text-sk-red text-xs bg-sk-red/10
                            border border-sk-red/25 rounded-md px-3 py-2">
              <AlertTriangle size={12} /> {err}
            </div>
          )}
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-sk-border text-sk-muted
                         text-[12px] hover:bg-sk-el transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={loading || !name}
              className="px-3.5 py-2 rounded-lg bg-sk-orange text-white text-[12px]
                         font-medium hover:opacity-90 transition-opacity
                         disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
              {loading ? 'Creating…' : 'Create bucket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Delete confirm modal ───────────────────────────────────────────────────────

function DeleteModal({ bucket, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  async function confirm() {
    setLoading(true)
    setErr('')
    try {
      const res = await fetch(`/api/storage/buckets/${bucket}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) { setErr(data.error || 'Failed to delete'); setLoading(false); return }
      onDeleted()
    } catch {
      setErr('Network error')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
         style={{ background: 'rgba(0,0,0,0.6)' }}
         onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-sk-surface border border-sk-border rounded-xl w-[380px] shadow-2xl animate-fadein">
        <div className="flex items-center justify-between px-5 py-4 border-b border-sk-border">
          <span className="text-sm font-medium text-sk-text">Delete bucket</span>
          <button onClick={onClose} className="text-sk-faint hover:text-sk-text transition-colors cursor-pointer">
            <X size={15} />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle size={16} className="text-sk-red flex-shrink-0 mt-0.5" />
            <p className="text-sm text-sk-muted leading-relaxed">
              This will permanently delete{' '}
              <span className="font-mono text-sk-text">{bucket}</span>{' '}
              and all objects inside it. This cannot be undone.
            </p>
          </div>
          {err && (
            <div className="text-sk-red text-xs bg-sk-red/10 border border-sk-red/25
                            rounded-md px-3 py-2 mb-4">{err}</div>
          )}
          <div className="flex justify-end gap-2">
            <button onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-sk-border text-sk-muted
                         text-[12px] hover:bg-sk-el transition-colors cursor-pointer">
              Cancel
            </button>
            <button onClick={confirm} disabled={loading}
              className="px-3.5 py-2 rounded-lg bg-sk-red text-white text-[12px]
                         font-medium hover:opacity-90 transition-opacity
                         disabled:opacity-50 cursor-pointer">
              {loading ? 'Deleting…' : 'Delete permanently'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StoragePage() {
  const [buckets, setBuckets]         = useState([])
  const [creds, setCreds]             = useState(null)
  const [loading, setLoading]         = useState(true)
  const [offline, setOffline]         = useState(false)
  const [showCreate, setShowCreate]   = useState(false)
  const [deleteBucket, setDeleteBucket] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const d = await fetch('/api/storage/buckets').then(r => r.json())
      setBuckets(d.buckets || [])
      setCreds(d.credentials || null)
      setOffline(!!d.offline)
    } catch {
      setOffline(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const totalObjects = buckets.reduce((s, b) => s + (b.objects || 0), 0)
  const totalSize    = buckets.reduce((s, b) => s + (b.sizeBytes || 0), 0)

  return (
    <div className="p-4 lg:p-5 animate-fadein">
      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); load() }}
        />
      )}
      {deleteBucket && (
        <DeleteModal
          bucket={deleteBucket}
          onClose={() => setDeleteBucket(null)}
          onDeleted={() => { setDeleteBucket(null); load() }}
        />
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { l: 'Buckets',    v: buckets.length,                c: 'text-sk-orange' },
          { l: 'Objects',    v: totalObjects.toLocaleString(),  c: 'text-sk-purple' },
          { l: 'Total size', v: formatBytes(totalSize),         c: 'text-sk-amber'  },
          { l: 'Status',     v: offline ? 'Offline' : 'Online', c: offline ? 'text-sk-red' : 'text-sk-green' },
        ].map(s => (
          <div key={s.l} className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3">
            <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-1">{s.l}</div>
            <div className={`font-mono text-[22px] font-medium ${s.c}`}>{s.v}</div>
          </div>
        ))}
      </div>

      {offline && (
        <div className="flex items-center gap-2 bg-sk-amber/10 border border-sk-amber/30
                        rounded-lg px-4 py-3 mb-4 text-sk-amber text-sm">
          <AlertTriangle size={14} />
          MinIO is not reachable at <span className="font-mono ml-1">{creds?.endpoint || 'localhost:9000'}</span>.
          Check that MinIO is running.
        </div>
      )}

      {/* Buckets table */}
      <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden mb-4">
        <div className="px-4 py-2.5 border-b border-sk-border flex items-center justify-between">
          <span className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em]">Buckets</span>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sk-orange
                       text-white text-[11px] font-medium hover:opacity-90
                       transition-opacity cursor-pointer">
            <Plus size={11} /> Create bucket
          </button>
        </div>

        {loading ? (
          <div className="py-8 text-center text-sk-faint text-sm">Loading…</div>
        ) : buckets.length === 0 ? (
          <div className="py-8 text-center text-sk-faint text-sm">
            {offline ? 'Cannot connect to MinIO.' : 'No buckets yet. Create one to get started.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-[12px]">
            <thead>
              <tr>
                {['Name', 'Objects', 'Size', 'Created', 'Actions'].map(h => (
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
                  <td className="px-4 py-2.5 text-[11px] text-sk-faint">
                    {b.created ? new Date(b.created).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <button className="flex items-center gap-1 px-2 py-1 rounded-md border border-sk-border
                                         text-[11px] text-sk-muted hover:bg-sk-el cursor-pointer transition-all">
                        <FolderOpen size={10} /> Browse
                      </button>
                      <button
                        onClick={() => setDeleteBucket(b.name)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md border border-sk-red/40
                                   text-[11px] text-sk-red hover:bg-sk-red/10 cursor-pointer transition-all">
                        <Trash2 size={10} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      {/* S3 credentials */}
      <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-sk-border">
          <span className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em]">S3 Credentials</span>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { l: 'Endpoint',   v: creds?.endpoint   || 'http://server:9000' },
            { l: 'Access key', v: creds?.accessKey  || 'minioadmin' },
            { l: 'Secret key', v: creds?.secretKey  || '(not configured)' },
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
