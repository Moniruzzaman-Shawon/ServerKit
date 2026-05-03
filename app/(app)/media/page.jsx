'use client'
import { useEffect, useState } from 'react'
import {
  Folder, File, Film, Music, Image as ImageIcon,
  Upload, FolderPlus, ChevronRight, Download, X, Play,
} from 'lucide-react'
import { formatBytes } from '@/lib/utils'

const isImage = n => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(n)
const isVideo = n => /\.(mp4|webm|mov|mkv|avi)$/i.test(n)
const isAudio = n => /\.(mp3|flac|aac|wav|ogg|opus)$/i.test(n)

function fileUrl(filePath) {
  return '/api/media/file?path=' + encodeURIComponent(filePath)
}

function fileIcon(item) {
  if (item.type === 'dir') return <Folder size={15} className="text-sk-amber" />
  const n = item.name.toLowerCase()
  if (isVideo(n))  return <Film     size={15} className="text-sk-orange" />
  if (isAudio(n))  return <Music    size={15} className="text-sk-green"  />
  if (isImage(n))  return <ImageIcon size={15} className="text-sk-purple" />
  return <File size={15} className="text-sk-faint" />
}

// ── Preview modal ──────────────────────────────────────────────────────────────

function PreviewModal({ item, onClose }) {
  const url = fileUrl(item.path)
  const n   = item.name.toLowerCase()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="relative max-w-5xl w-full animate-fadein">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[13px] text-sk-muted font-mono truncate">{item.name}</span>
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            <a
              href={url + '&dl=1'}
              download={item.name}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-sk-border
                         text-[11px] text-sk-muted hover:bg-sk-el hover:text-sk-text transition-all"
            >
              <Download size={11} /> Download
            </a>
            <button
              onClick={onClose}
              className="text-sk-faint hover:text-sk-text transition-colors cursor-pointer p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        {isImage(n) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={item.name}
            className="max-h-[80vh] w-full object-contain rounded-xl bg-black"
          />
        )}
        {isVideo(n) && (
          <video
            src={url}
            controls
            autoPlay
            className="w-full max-h-[80vh] rounded-xl bg-black"
          />
        )}
        {isAudio(n) && (
          <div className="bg-sk-surface border border-sk-border rounded-xl p-8 flex flex-col items-center gap-4">
            <Music size={40} className="text-sk-green opacity-60" />
            <span className="text-[14px] text-sk-text font-medium">{item.name}</span>
            <audio src={url} controls autoPlay className="w-full" />
          </div>
        )}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MediaPage() {
  const [path,    setPath]    = useState('')
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [roots,   setRoots]   = useState([])
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    fetch('/api/media')
      .then(r => r.json())
      .then(d => {
        if (d.roots)   { setRoots(d.roots); setPath(d.roots[0] || '') }
        if (d.entries) setEntries(d.entries)
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  async function navigate(newPath) {
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/media?path=' + encodeURIComponent(newPath))
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

  function handleItemClick(item) {
    if (item.type === 'dir') {
      navigate(item.path)
      return
    }
    const n = item.name.toLowerCase()
    if (isImage(n) || isVideo(n) || isAudio(n)) {
      setPreview(item)
    } else {
      // Download non-previewable files directly
      window.open(fileUrl(item.path), '_blank')
    }
  }

  const segments = path ? path.split('/').filter(Boolean) : []

  function goToSegment(idx) {
    navigate('/' + segments.slice(0, idx + 1).join('/'))
  }

  return (
    <div className="p-4 lg:p-5 animate-fadein">

      {preview && (
        <PreviewModal item={preview} onClose={() => setPreview(null)} />
      )}

      {/* Breadcrumb + actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div className="flex items-center gap-1 text-[12px] text-sk-muted flex-wrap min-w-0">
          <button
            onClick={() => navigate(roots[0] || '')}
            className="hover:text-sk-orange transition-colors cursor-pointer"
          >/</button>
          {segments.map((seg, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight size={12} className="text-sk-faint" />
              <button
                onClick={() => goToSegment(i)}
                className="hover:text-sk-orange transition-colors cursor-pointer"
              >{seg}</button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
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
        <div
          className="grid px-3 py-2 border-b border-sk-border text-2xs font-medium
                     text-sk-faint uppercase tracking-[.06em]"
          style={{ gridTemplateColumns: '1fr auto auto auto' }}
        >
          <span>{path ? path.split('/').pop() : 'Root'} · {entries.length} items</span>
          <span className="mr-16 hidden sm:block">Size</span>
          <span className="mr-6 hidden sm:block">Modified</span>
          <span />
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
        {!loading && entries.map(item => {
          const n          = item.name.toLowerCase()
          const previewable = item.type === 'file' && (isImage(n) || isVideo(n) || isAudio(n))
          const clickable   = item.type === 'dir' || item.type === 'file'

          return (
            <div
              key={item.path}
              onClick={() => handleItemClick(item)}
              className={`flex items-center gap-2.5 px-3 py-2.5 border-b border-sk-subtle
                          last:border-0 transition-colors group
                          ${clickable ? 'cursor-pointer hover:bg-sk-el' : ''}`}
            >
              <div className="flex-shrink-0">{fileIcon(item)}</div>
              <div className="flex-1 text-[13px] text-sk-text min-w-0 truncate">
                {item.name}
                {previewable && (
                  <Play size={10} className="inline ml-1.5 text-sk-faint opacity-0 group-hover:opacity-60 transition-opacity" />
                )}
              </div>
              <div className="font-mono text-[11px] text-sk-faint w-20 text-right flex-shrink-0 hidden sm:block">
                {item.type === 'dir' ? '—' : formatBytes(item.size)}
              </div>
              <div className="text-[11px] text-sk-faint w-24 text-right flex-shrink-0 hidden sm:block">
                {new Date(item.modified).toLocaleDateString()}
              </div>
              {item.type === 'file' && (
                <a
                  href={fileUrl(item.path)}
                  download={item.name}
                  onClick={e => e.stopPropagation()}
                  className="flex-shrink-0 text-sk-faint hover:text-sk-text transition-colors opacity-0
                             group-hover:opacity-100 p-0.5"
                  title="Download"
                >
                  <Download size={12} />
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
