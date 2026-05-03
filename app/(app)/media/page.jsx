'use client'
import { useEffect, useState } from 'react'
import { Folder, File, Film, Music, Image, Upload, FolderPlus, ChevronRight } from 'lucide-react'
import { formatBytes } from '@/lib/utils'

function fileIcon(item) {
  if (item.type === 'dir') return <Folder size={15} className="text-sk-amber" />
  const n = item.name.toLowerCase()
  if (/\.(mkv|mp4|avi|mov|wmv)$/.test(n)) return <Film size={15} className="text-sk-orange" />
  if (/\.(mp3|flac|aac|wav|ogg)$/.test(n)) return <Music size={15} className="text-sk-green" />
  if (/\.(jpg|jpeg|png|gif|webp)$/.test(n)) return <Image size={15} className="text-sk-purple" />
  return <File size={15} className="text-sk-faint" />
}

export default function MediaPage() {
  const [path, setPath] = useState('')
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [roots, setRoots] = useState([])

  useEffect(() => {
    fetch('/api/media')
      .then(r => r.json())
      .then(d => {
        if (d.roots) { setRoots(d.roots); setPath(d.roots[0] || '') }
        if (d.entries) setEntries(d.entries)
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  async function navigate(newPath) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/media?path=' + encodeURIComponent(newPath))
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setPath(newPath)
      setEntries(data.entries)
    } catch {
      setError('Failed to load directory')
    } finally {
      setLoading(false)
    }
  }

  // Build breadcrumb segments
  const segments = path ? path.split('/').filter(Boolean) : []

  function goToSegment(idx) {
    const p = '/' + segments.slice(0, idx + 1).join('/')
    navigate(p)
  }

  return (
    <div className="p-5 animate-fadein">

      {/* Breadcrumb + actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-[12px] text-sk-muted flex-wrap">
          <button onClick={() => navigate(roots[0] || '')} className="hover:text-sk-orange transition-colors cursor-pointer">/</button>
          {segments.map((seg, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight size={12} className="text-sk-faint" />
              <button
                onClick={() => goToSegment(i)}
                className="hover:text-sk-orange transition-colors cursor-pointer"
              >
                {seg}
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {roots.length > 1 && roots.map(r => (
            <button
              key={r}
              onClick={() => navigate(r)}
              className={`px-2.5 py-1 rounded-md border text-[11px] transition-all cursor-pointer
                          ${path.startsWith(r)
                            ? 'border-sk-orange/50 text-sk-orange bg-sk-orange/8'
                            : 'border-sk-border text-sk-muted hover:bg-sk-el'}`}
            >
              {r.split('/').pop()}
            </button>
          ))}
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-sk-border
                             text-[11px] text-sk-muted hover:bg-sk-el hover:text-sk-text transition-all cursor-pointer">
            <Upload size={11} /> Upload
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-sk-border
                             text-[11px] text-sk-muted hover:bg-sk-el hover:text-sk-text transition-all cursor-pointer">
            <FolderPlus size={11} /> New folder
          </button>
        </div>
      </div>

      <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid px-3 py-2 border-b border-sk-border text-2xs font-medium
                        text-sk-faint uppercase tracking-[.06em]"
             style={{ gridTemplateColumns: '1fr auto auto' }}>
          <span>{path ? path.split('/').pop() : 'Root'} · {entries.length} items</span>
          <span className="mr-6">Size</span>
          <span>Modified</span>
        </div>

        {loading && (
          <div className="py-10 text-center text-sk-faint text-sm">Loading…</div>
        )}
        {error && (
          <div className="py-10 text-center text-sk-red text-sm">{error}</div>
        )}
        {!loading && !error && entries.length === 0 && (
          <div className="py-10 text-center text-sk-faint text-sm">Empty directory</div>
        )}
        {!loading && entries.map(item => (
          <div
            key={item.path}
            onClick={() => item.type === 'dir' && navigate(item.path)}
            className={`flex items-center gap-2.5 px-3 py-2.5 border-b border-sk-subtle
                        last:border-0 transition-colors
                        ${item.type === 'dir' ? 'cursor-pointer hover:bg-sk-el' : ''}`}
          >
            <div className="flex-shrink-0">{fileIcon(item)}</div>
            <div className="flex-1 text-[13px] text-sk-text min-w-0 truncate">{item.name}</div>
            <div className="font-mono text-[11px] text-sk-faint w-20 text-right flex-shrink-0">
              {item.type === 'dir' ? '—' : formatBytes(item.size)}
            </div>
            <div className="text-[11px] text-sk-faint w-24 text-right flex-shrink-0">
              {new Date(item.modified).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
