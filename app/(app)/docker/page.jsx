'use client'
import React, { useEffect, useState, useCallback } from 'react'
import Badge from '@/components/Badge'
import {
  Play, Square, RotateCcw, Trash2, ChevronDown, ChevronUp,
  Plus, X, AlertTriangle, Minus,
} from 'lucide-react'

// ── Helpers ────────────────────────────────────────────────────────────────────

function statusVariant(s) {
  if (s === 'running') return 'green'
  if (s === 'paused')  return 'amber'
  return 'red'
}

function Btn({ icon: Icon, label, onClick, loading, danger, positive }) {
  return (
    <button onClick={onClick} disabled={loading}
      className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[11px]
                  transition-all cursor-pointer disabled:opacity-50
                  ${danger   ? 'border-sk-red/40   text-sk-red   hover:bg-sk-red/10'
                  : positive ? 'border-sk-green/40 text-sk-green hover:bg-sk-green/10'
                              : 'border-sk-border  text-sk-muted hover:bg-sk-el hover:text-sk-text'}`}>
      <Icon size={11} />{label}
    </button>
  )
}

// ── New Container Modal ────────────────────────────────────────────────────────

const RESTART_OPTIONS = [
  { value: 'unless-stopped', label: 'Unless stopped (recommended)' },
  { value: 'always',         label: 'Always' },
  { value: 'on-failure',     label: 'On failure' },
  { value: 'no',             label: 'No (never restart)' },
]

const emptyPort   = () => ({ host: '', container: '' })
const emptyEnv    = () => ({ key: '', value: '' })
const emptyVolume = () => ({ host: '', container: '' })

function Section({ title, children, onAdd, addLabel }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xs font-semibold text-sk-muted uppercase tracking-[.08em]">{title}</span>
        {onAdd && (
          <button type="button" onClick={onAdd}
            className="flex items-center gap-1 text-[11px] text-sk-orange hover:opacity-80
                       transition-opacity cursor-pointer">
            <Plus size={11} />{addLabel}
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

function Row({ children, onRemove }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      {children}
      <button type="button" onClick={onRemove}
        className="text-sk-faint hover:text-sk-red transition-colors cursor-pointer flex-shrink-0">
        <Minus size={13} />
      </button>
    </div>
  )
}

function Field({ placeholder, value, onChange, mono }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className={`flex-1 min-w-0 bg-sk-el border border-sk-border rounded-md px-2.5 py-1.5
                  text-sk-text text-[12px] outline-none focus:border-sk-orange transition-colors
                  placeholder:text-sk-faint ${mono ? 'font-mono' : ''}`} />
  )
}

function NewContainerModal({ onClose, onCreated }) {
  const [image,   setImage]   = useState('')
  const [name,    setName]    = useState('')
  const [restart, setRestart] = useState('unless-stopped')
  const [ports,   setPorts]   = useState([])
  const [env,     setEnv]     = useState([])
  const [volumes, setVolumes] = useState([])
  const [loading, setLoading] = useState(false)
  const [status,  setStatus]  = useState('')
  const [err,     setErr]     = useState('')

  const updatePort   = (i, f, v) => setPorts(p   => p.map((r, j)   => j === i ? { ...r, [f]: v } : r))
  const updateEnv    = (i, f, v) => setEnv(p     => p.map((r, j)   => j === i ? { ...r, [f]: v } : r))
  const updateVolume = (i, f, v) => setVolumes(p => p.map((r, j)   => j === i ? { ...r, [f]: v } : r))

  async function submit(e) {
    e.preventDefault()
    if (!image.trim()) { setErr('Image name is required'); return }
    setErr('')
    setLoading(true)
    setStatus('Creating container…')

    try {
      const res = await fetch('/api/docker/containers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: image.trim(), name: name.trim() || undefined, restart, ports, env, volumes }),
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.error || 'Failed to create container'); setLoading(false); setStatus(''); return }
      if (data.pulled) setStatus('Image pulled & container started.')
      onCreated()
    } catch {
      setErr('Network error')
      setLoading(false)
      setStatus('')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.65)' }}
         onClick={e => e.target === e.currentTarget && !loading && onClose()}>
      <div className="bg-sk-surface border border-sk-border rounded-2xl w-full max-w-[560px]
                      shadow-2xl animate-fadein max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sk-border flex-shrink-0">
          <span className="font-medium text-sk-text">New container</span>
          <button onClick={onClose} disabled={loading}
            className="text-sk-faint hover:text-sk-text transition-colors cursor-pointer">
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={submit} className="overflow-y-auto flex-1 px-6 py-5">

          {/* Image + Name */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className="block text-2xs font-semibold text-sk-muted uppercase tracking-[.08em] mb-1.5">
                Image <span className="text-sk-red">*</span>
              </label>
              <input value={image} onChange={e => setImage(e.target.value)}
                placeholder="nginx:latest"
                className="w-full bg-sk-el border border-sk-border rounded-md px-3 py-2
                           text-sk-text text-sm font-mono outline-none
                           focus:border-sk-orange transition-colors placeholder:text-sk-faint" />
              <p className="text-[10px] text-sk-faint mt-1">Image will be pulled if not local.</p>
            </div>
            <div>
              <label className="block text-2xs font-semibold text-sk-muted uppercase tracking-[.08em] mb-1.5">
                Container name
              </label>
              <input value={name} onChange={e => setName(e.target.value)}
                placeholder="my-nginx (optional)"
                className="w-full bg-sk-el border border-sk-border rounded-md px-3 py-2
                           text-sk-text text-sm font-mono outline-none
                           focus:border-sk-orange transition-colors placeholder:text-sk-faint" />
            </div>
          </div>

          {/* Restart policy */}
          <div className="mb-5">
            <label className="block text-2xs font-semibold text-sk-muted uppercase tracking-[.08em] mb-1.5">
              Restart policy
            </label>
            <select value={restart} onChange={e => setRestart(e.target.value)}
              className="w-full bg-sk-el border border-sk-border rounded-md px-3 py-2
                         text-sk-text text-sm outline-none focus:border-sk-orange
                         transition-colors cursor-pointer">
              {RESTART_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Port mappings */}
          <Section title="Port mappings" onAdd={() => setPorts(p => [...p, emptyPort()])} addLabel="Add port">
            {ports.length === 0 && (
              <p className="text-[11px] text-sk-faint">No ports exposed. Add a mapping to publish a port.</p>
            )}
            {ports.map((p, i) => (
              <Row key={i} onRemove={() => setPorts(pp => pp.filter((_, j) => j !== i))}>
                <Field placeholder="Host port" value={p.host}      mono onChange={v => updatePort(i, 'host', v)} />
                <span className="text-sk-faint text-sm flex-shrink-0">→</span>
                <Field placeholder="Container port" value={p.container} mono onChange={v => updatePort(i, 'container', v)} />
              </Row>
            ))}
          </Section>

          {/* Environment variables */}
          <Section title="Environment variables" onAdd={() => setEnv(p => [...p, emptyEnv()])} addLabel="Add variable">
            {env.length === 0 && (
              <p className="text-[11px] text-sk-faint">No environment variables. Add KEY=VALUE pairs.</p>
            )}
            {env.map((e, i) => (
              <Row key={i} onRemove={() => setEnv(pp => pp.filter((_, j) => j !== i))}>
                <Field placeholder="KEY"   value={e.key}   mono onChange={v => updateEnv(i, 'key', v)} />
                <span className="text-sk-faint text-sm flex-shrink-0">=</span>
                <Field placeholder="value" value={e.value} onChange={v => updateEnv(i, 'value', v)} />
              </Row>
            ))}
          </Section>

          {/* Volume mounts */}
          <Section title="Volume mounts" onAdd={() => setVolumes(p => [...p, emptyVolume()])} addLabel="Add volume">
            {volumes.length === 0 && (
              <p className="text-[11px] text-sk-faint">No volumes mounted. Add host:container path pairs.</p>
            )}
            {volumes.map((v, i) => (
              <Row key={i} onRemove={() => setVolumes(pp => pp.filter((_, j) => j !== i))}>
                <Field placeholder="/host/path"      value={v.host}      mono onChange={val => updateVolume(i, 'host', val)} />
                <span className="text-sk-faint text-sm flex-shrink-0">:</span>
                <Field placeholder="/container/path" value={v.container} mono onChange={val => updateVolume(i, 'container', val)} />
              </Row>
            ))}
          </Section>

          {/* Error */}
          {err && (
            <div className="flex items-start gap-2 bg-sk-red/10 border border-sk-red/25
                            rounded-lg px-3 py-2.5 text-sk-red text-xs mb-4">
              <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
              <span>{err}</span>
            </div>
          )}

          {/* Status (pulling) */}
          {status && !err && (
            <div className="text-xs text-sk-muted mb-4">{status}</div>
          )}
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-sk-border flex-shrink-0">
          <button type="button" onClick={onClose} disabled={loading}
            className="px-4 py-2 rounded-lg border border-sk-border text-sk-muted text-[12px]
                       hover:bg-sk-el transition-colors cursor-pointer disabled:opacity-50">
            Cancel
          </button>
          <button onClick={submit} disabled={loading || !image.trim()}
            className="px-4 py-2 rounded-lg bg-sk-orange text-white text-[12px] font-medium
                       hover:opacity-90 transition-opacity cursor-pointer
                       disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? status || 'Creating…' : 'Create & start'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DockerPage() {
  const [containers,  setContainers]  = useState([])
  const [loading,     setLoading]     = useState(true)
  const [openLog,     setOpenLog]     = useState(null)
  const [logs,        setLogs]        = useState({})
  const [filter,      setFilter]      = useState('all')
  const [busy,        setBusy]        = useState({})
  const [showNew,     setShowNew]     = useState(false)

  const fetchContainers = useCallback(async () => {
    try {
      const data = await fetch('/api/docker/containers').then(r => r.json())
      setContainers(Array.isArray(data) ? data : [])
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchContainers()
    const t = setInterval(fetchContainers, 5000)
    return () => clearInterval(t)
  }, [fetchContainers])

  async function action(id, act) {
    setBusy(b => ({ ...b, [id]: act }))
    await fetch(`/api/docker/containers/${id}/${act}`, { method: 'POST' })
    await fetchContainers()
    setBusy(b => { const n = { ...b }; delete n[id]; return n })
  }

  async function toggleLog(id) {
    if (openLog === id) { setOpenLog(null); return }
    setOpenLog(id)
    if (!logs[id]) {
      const text = await fetch(`/api/docker/logs/${id}`).then(r => r.text())
      setLogs(l => ({ ...l, [id]: text }))
    }
  }

  const filtered = filter === 'all' ? containers : containers.filter(c => c.status === filter)
  const running  = containers.filter(c => c.status === 'running').length

  return (
    <div className="p-4 lg:p-5 animate-fadein">
      {showNew && (
        <NewContainerModal
          onClose={() => setShowNew(false)}
          onCreated={() => { setShowNew(false); fetchContainers() }}
        />
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {[
          { l: 'Running', v: running,                     c: 'text-sk-green'  },
          { l: 'Stopped', v: containers.length - running, c: 'text-sk-red'    },
          { l: 'Total',   v: containers.length,           c: 'text-sk-orange' },
        ].map(s => (
          <div key={s.l} className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3">
            <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-1">{s.l}</div>
            <div className={`font-mono text-3xl font-medium ${s.c}`}>{s.v}</div>
          </div>
        ))}
        <div className="flex items-end pb-1">
          <button onClick={() => setShowNew(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-sk-orange
                       text-white text-[12px] font-medium hover:opacity-90
                       transition-opacity cursor-pointer">
            <Plus size={13} /> New container
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden">
        <div className="flex border-b border-sk-border px-1">
          {['all', 'running', 'exited'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3.5 py-2.5 text-[11px] border-b-2 transition-all cursor-pointer
                          ${filter === f
                            ? 'text-sk-orange border-sk-orange'
                            : 'text-sk-muted border-transparent hover:text-sk-text'}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-10 text-center text-sk-faint text-sm">Loading containers…</div>
        ) : filtered.length === 0 ? (
          <div className="py-10 text-center text-sk-faint text-sm">
            No containers. Click <strong>New container</strong> to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-[12px] border-collapse">
            <thead>
              <tr>
                {['Container', 'Image', 'Status', 'Ports', 'Actions'].map(h => (
                  <th key={h} className="text-left text-2xs font-medium text-sk-faint uppercase
                                         tracking-[.06em] px-3 py-2 border-b border-sk-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <React.Fragment key={c.id}>
                  <tr className="border-b border-sk-subtle last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-3 py-2.5">
                      <span className="font-mono font-medium text-sk-text">{c.name}</span>
                      <span className="ml-2 text-sk-faint font-mono text-[10px]">{c.id}</span>
                    </td>
                    <td className="px-3 py-2.5 text-sk-muted text-[11px]">{c.image}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant={statusVariant(c.status)}>{c.status}</Badge>
                      <span className="ml-2 text-sk-faint text-[10px]">{c.statusText}</span>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-sk-faint">{c.ports || '—'}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        {c.status === 'running' ? (
                          <>
                            <Btn icon={Square}    label="Stop"    loading={busy[c.id]==='stop'}    onClick={() => action(c.id, 'stop')}    danger />
                            <Btn icon={RotateCcw} label="Restart" loading={busy[c.id]==='restart'} onClick={() => action(c.id, 'restart')} />
                          </>
                        ) : (
                          <Btn icon={Play} label="Start" loading={busy[c.id]==='start'} onClick={() => action(c.id, 'start')} positive />
                        )}
                        <Btn icon={openLog === c.id ? ChevronUp : ChevronDown} label="Logs" onClick={() => toggleLog(c.id)} />
                        <Btn icon={Trash2} label="Remove" loading={busy[c.id]==='remove'} onClick={() => action(c.id, 'remove')} danger />
                      </div>
                    </td>
                  </tr>
                  {openLog === c.id && (
                    <tr className="border-b border-sk-subtle">
                      <td colSpan={5} className="px-3 py-2">
                        <pre className="bg-[#010409] rounded-md p-3 font-mono text-[11px]
                                        text-sk-muted leading-relaxed max-h-48 overflow-y-auto
                                        whitespace-pre-wrap break-all">
                          {logs[c.id] || 'Loading logs…'}
                        </pre>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  )
}
