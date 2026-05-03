'use client'
import { usePathname } from 'next/navigation'
import { RefreshCw, Menu } from 'lucide-react'

const TITLES = {
  '/dashboard': 'Dashboard',
  '/docker':    'Docker',
  '/media':     'Media server',
  '/webserver': 'Web server',
  '/database':  'Database',
  '/storage':   'Storage',
  '/network':   'Network',
  '/terminal':  'Terminal',
  '/guides':    'Guides',
  '/settings':  'Settings',
}

export default function Topbar({ onMenuClick }) {
  const path = usePathname()
  const title = TITLES[path] || 'ServerKit'

  function reload() { window.location.reload() }

  return (
    <header className="h-[52px] bg-sk-surface border-b border-sk-border
                       flex items-center px-4 gap-3 flex-shrink-0">
      {/* Hamburger — mobile / tablet only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-sk-muted hover:text-sk-text transition-colors cursor-pointer p-1"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <h1 className="text-[14px] font-medium tracking-tight text-sk-text">{title}</h1>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={reload}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-sk-border
                     text-[11px] text-sk-muted hover:bg-sk-el hover:text-sk-text
                     transition-all cursor-pointer"
        >
          <RefreshCw size={11} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
    </header>
  )
}
