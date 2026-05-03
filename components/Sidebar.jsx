'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Container, Film, Globe, Database,
  HardDrive, Network, Terminal, BookOpen, Settings, LogOut,
} from 'lucide-react'

const NAV = [
  { href: '/dashboard', label: 'Dashboard',   Icon: LayoutDashboard },
  { href: '/docker',    label: 'Docker',       Icon: Container },
  { href: '/media',     label: 'Media server', Icon: Film },
  { href: '/webserver', label: 'Web server',   Icon: Globe },
  { href: '/database',  label: 'Database',     Icon: Database },
  { href: '/storage',   label: 'Storage',      Icon: HardDrive },
  { href: '/network',   label: 'Network',      Icon: Network },
  { href: '/terminal',  label: 'Terminal',     Icon: Terminal },
]

const MORE = [
  { href: '/guides',   label: 'Guides',   Icon: BookOpen },
  { href: '/settings', label: 'Settings', Icon: Settings },
]

function NavItem({ href, label, Icon }) {
  const path = usePathname()
  const active = path === href || (href !== '/dashboard' && path.startsWith(href))
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-4 py-[7px] text-[13px] select-none
                  border-l-2 transition-all duration-100
                  ${active
                    ? 'bg-sk-orange/8 text-sk-orange border-sk-orange'
                    : 'text-sk-muted border-transparent hover:bg-sk-el hover:text-sk-text'
                  }`}
    >
      <Icon size={14} className={active ? 'opacity-100' : 'opacity-70'} />
      {label}
    </Link>
  )
}

export default function Sidebar() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <aside className="w-[220px] min-w-[220px] bg-sk-surface border-r border-sk-border
                      flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-4 pt-4 pb-3 border-b border-sk-subtle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 160"
          className="w-[160px] h-auto"
          style={{ overflow: 'visible' }}
          aria-label="ServerKit"
        >
          <text x="16" y="98" fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" fontSize="96" fontWeight="800" fill="#eef0f4" letterSpacing="-4">Server</text>
          <text x="16" y="155" fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" fontSize="96" fontWeight="300" fill="#388bfd" letterSpacing="-3">Kit</text>
        </svg>
        <div className="text-[11px] text-sk-faint mt-1.5">
          {process.env.NEXT_PUBLIC_HOSTNAME || 'my-linux-server'}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {NAV.map(item => <NavItem key={item.href} {...item} />)}

        <div className="px-4 pt-4 pb-1.5 text-2xs font-medium tracking-[.08em]
                        uppercase text-sk-faint">
          More
        </div>
        {MORE.map(item => <NavItem key={item.href} {...item} />)}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-sk-subtle space-y-2">
        <div className="flex items-center gap-2 text-[11px] text-sk-faint">
          <span className="w-[7px] h-[7px] rounded-full bg-sk-green animate-pulse2 flex-shrink-0" />
          Online · v1.0.0
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-[11px] text-sk-faint
                     hover:text-sk-red transition-colors cursor-pointer w-full"
        >
          <LogOut size={12} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
