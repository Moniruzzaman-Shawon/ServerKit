'use client'
import { useEffect, useState, useCallback } from 'react'
import Badge from '@/components/Badge'
import { Play, Square, RotateCcw, Trash2, ChevronDown, ChevronUp, Plus } from 'lucide-react'

function statusVariant(s) {
  if (s === 'running') return 'green'
  if (s === 'paused')  return 'amber'
  return 'red'
}

export default function DockerPage() {
  const [containers, setContainers] = useState([])
  const [loading, setLoading] = useState(true)
  const [openLog, setOpenLog] = useState(null)
  const [logs, setLogs] = useState({})
  const [filter, setFilter] = useState('all')
  const [busy, setBusy] = useState({})

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

  const filtered = filter === 'all' ? containers
    : containers.filter(c => c.status === filter)
  const running = containers.filter(c => c.status === 'running').length

  return (
    <div className="p-5 animate-fadein">

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { l: 'Running', v: running,                       c: 'text-sk-green' },
          { l: 'Stopped', v: containers.length - running,   c: 'text-sk-red' },
          { l: 'Total',   v: containers.length,             c: 'text-sk-orange' },
        ].map(s => (
          <div key={s.l} className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3">
            <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-1">{s.l}</div>
            <div className={`font-mono text-3xl font-medium ${s.c}`}>{s.v}</div>
          </div>
        ))}
        <div className="flex items-end pb-1">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-sk-orange
                             text-white text-[12px] font-medium hover:opacity-90 transition-opacity">
            <Plus size={13} /> New container
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden">

        {/* Filter tabs */}
        <div className="flex border-b border-sk-border px-1">
          {['all', 'running', 'exited'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-2.5 text-[11px] border-b-2 transition-all cursor-pointer
                          ${filter === f
                            ? 'text-sk-orange border-sk-orange'
                            : 'text-sk-muted border-transparent hover:text-sk-text'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-10 text-center text-sk-faint text-sm">Loading containers…</div>
        ) : filtered.length === 0 ? (
          <div className="py-10 text-center text-sk-faint text-sm">No containers</div>
        ) : (
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr>
                {['Container', 'Image', 'Status', 'Ports', 'Actions'].map(h => (
                  <th key={h} className="text-left text-2xs font-medium text-sk-faint uppercase
                                         tracking-[.06em] px-3 py-2 border-b border-sk-border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <>
                  <tr key={c.id} className="border-b border-sk-subtle last:border-0
                                             hover:bg-white/[0.02] transition-colors">
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
                            <Btn icon={Square}     label="Stop"    loading={busy[c.id]==='stop'}    onClick={() => action(c.id, 'stop')}    danger />
                            <Btn icon={RotateCcw}  label="Restart" loading={busy[c.id]==='restart'} onClick={() => action(c.id, 'restart')} />
                          </>
                        ) : (
                          <Btn icon={Play} label="Start" loading={busy[c.id]==='start'} onClick={() => action(c.id, 'start')} positive />
                        )}
                        <Btn
                          icon={openLog === c.id ? ChevronUp : ChevronDown}
                          label="Logs"
                          onClick={() => toggleLog(c.id)}
                        />
                        <Btn icon={Trash2} label="Remove" loading={busy[c.id]==='remove'} onClick={() => action(c.id, 'remove')} danger />
                      </div>
                    </td>
                  </tr>
                  {openLog === c.id && (
                    <tr key={c.id + '-log'} className="border-b border-sk-subtle">
                      <td colSpan={5} className="px-3 py-2">
                        <pre className="bg-[#010409] rounded-md p-3 font-mono text-[11px]
                                        text-sk-muted leading-relaxed max-h-48 overflow-y-auto
                                        whitespace-pre-wrap break-all">
                          {logs[c.id] || 'Loading logs…'}
                        </pre>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function Btn({ icon: Icon, label, onClick, loading, danger, positive }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[11px]
                  transition-all cursor-pointer disabled:opacity-50
                  ${danger   ? 'border-sk-red/40   text-sk-red   hover:bg-sk-red/10'
                  : positive ? 'border-sk-green/40 text-sk-green hover:bg-sk-green/10'
                              : 'border-sk-border  text-sk-muted hover:bg-sk-el hover:text-sk-text'
                  }`}
    >
      <Icon size={11} />
      {label}
    </button>
  )
}
