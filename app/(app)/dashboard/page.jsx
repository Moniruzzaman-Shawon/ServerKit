'use client'
import { useEffect, useState } from 'react'
import { useStats } from '@/hooks/useStats'
import StatCard from '@/components/StatCard'
import Badge from '@/components/Badge'
import { formatBytes, formatBytesPerSec, relativeTime, levelDot } from '@/lib/utils'
import {
  Container, Film, Globe, Database, HardDrive, Network,
} from 'lucide-react'

const MODULES = [
  { key: 'docker',    label: 'Docker',       Icon: Container, href: '/docker',    desc: 'Containers, images, compose stacks' },
  { key: 'media',     label: 'Media server', Icon: Film,      href: '/media',     desc: 'Files, Samba shares' },
  { key: 'webserver', label: 'Web server',   Icon: Globe,     href: '/webserver', desc: 'Traefik · reverse proxy · TLS' },
  { key: 'database',  label: 'Database',     Icon: Database,  href: '/database',  desc: 'PostgreSQL, MySQL, SQLite' },
  { key: 'storage',   label: 'Storage',      Icon: HardDrive, href: '/storage',   desc: 'MinIO S3-compatible object storage' },
  { key: 'network',   label: 'Network',      Icon: Network,   href: '/network',   desc: 'UFW firewall · open ports · Tailscale' },
]

export default function DashboardPage() {
  const { stats, history } = useStats()
  const [activity,    setActivity]    = useState([])
  const [dockerStats, setDockerStats] = useState(null)
  const [thermal,     setThermal]     = useState(null)

  useEffect(() => {
    fetch('/api/activity').then(r => r.json()).then(setActivity).catch(() => {})
    fetch('/api/docker/summary').then(r => r.json()).then(setDockerStats).catch(() => {})
  }, [])

  // Poll thermal data every 3 s (independent of WebSocket)
  const [tempHistory, setTempHistory] = useState(Array(20).fill(0))
  useEffect(() => {
    function load() {
      fetch('/api/stats/thermal').then(r => r.json()).then(d => {
        setThermal(d)
        setTempHistory(prev => [...prev.slice(-19), d.cpu ?? 0])
      }).catch(() => {})
    }
    load()
    const t = setInterval(load, 3000)
    return () => clearInterval(t)
  }, [])

  const mediaDisk = stats?.disks?.find(d => d.mount.includes('media'))
  const webDisk   = stats?.disks?.find(d => d.mount.includes('webserver') || d.mount.includes('web'))
  const sysDisk   = stats?.disks?.find(d => d.mount === '/')

  return (
    <div className="p-4 lg:p-5 animate-fadein">

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        <StatCard
          label="CPU"
          value={stats ? `${stats.cpu.load}%` : null}
          sub={stats ? `${stats.cpu.cores} cores · ${stats.cpu.speed} GHz` : 'Loading…'}
          pct={stats?.cpu.load ?? 0}
          color="#f97316"
          spark={history.cpu}
        />
        <StatCard
          label="RAM"
          value={stats ? formatBytes(stats.ram.used, 1) : null}
          sub={stats ? `of ${formatBytes(stats.ram.total, 0)}` : 'Loading…'}
          pct={stats?.ram.pct ?? 0}
          color="#388bfd"
          spark={history.ram}
        />
        <StatCard
          label={sysDisk ? `SSD · ${sysDisk.mount}` : 'System disk'}
          value={sysDisk ? formatBytes(sysDisk.used) : null}
          sub={sysDisk ? `of ${formatBytes(sysDisk.size)}` : 'Loading…'}
          pct={sysDisk?.pct ?? 0}
          color="#bc8cff"
        />
        <StatCard
          label={mediaDisk ? `HDD · ${mediaDisk.mount}` : webDisk ? `HDD · ${webDisk.mount}` : 'Media disk'}
          value={(mediaDisk || webDisk) ? formatBytes((mediaDisk || webDisk).used) : null}
          sub={(mediaDisk || webDisk) ? `of ${formatBytes((mediaDisk || webDisk).size)}` : 'Not mounted'}
          pct={(mediaDisk || webDisk)?.pct ?? 0}
          color="#d29922"
        />
        <StatCard
          label="Temperature"
          value={thermal?.cpu != null ? `${thermal.cpu}°C` : (thermal ? 'N/A' : null)}
          sub={
            !thermal ? 'Loading…' :
            thermal.cpu == null ? 'No sensor detected' :
            thermal.gpu != null ? `GPU ${thermal.gpu}°C` : 'GPU —'
          }
          pct={thermal?.cpu != null ? Math.min(100, thermal.cpu) : 0}
          color={
            (thermal?.cpu ?? 0) >= 80 ? '#f85149' :
            (thermal?.cpu ?? 0) >= 60 ? '#d29922' : '#39d353'
          }
          spark={tempHistory}
        />
        <StatCard
          label="GPU Power"
          value={thermal?.gpuWatts != null ? `${thermal.gpuWatts}W` : (thermal ? 'N/A' : null)}
          sub={
            !thermal ? 'Loading…' :
            thermal.gpuWatts == null ? 'No GPU detected' :
            thermal.gpuWattsCap != null ? `of ${thermal.gpuWattsCap}W cap` : 'No cap data'
          }
          pct={
            thermal?.gpuWatts != null && thermal?.gpuWattsCap
              ? Math.round((thermal.gpuWatts / thermal.gpuWattsCap) * 100)
              : 0
          }
          color="#bc8cff"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 xl:grid-cols-[1fr_280px]">

        {/* Modules */}
        <div>
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-3">
            Modules
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {MODULES.map(({ key, label, Icon, href, desc }) => (
              <a
                key={key}
                href={href}
                className="bg-sk-surface border border-sk-border rounded-xl p-3.5
                           hover:border-sk-orange/60 transition-colors cursor-pointer block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-medium text-sk-text">{label}</span>
                  {key === 'docker' && dockerStats && (
                    <Badge variant="green">{dockerStats.running} running</Badge>
                  )}
                </div>
                <div className="text-[11px] text-sk-faint leading-relaxed mb-2.5">{desc}</div>
                <div className="flex items-center gap-1.5">
                  <Icon size={12} className="text-sk-faint" />
                  <span className="text-[11px] text-sk-faint">Open →</span>
                </div>
              </a>
            ))}
          </div>

          {/* Network I/O */}
          {stats?.net && (
            <div className="mt-3 bg-sk-surface border border-sk-border rounded-xl px-4 py-3">
              <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">
                Network · {stats.net.iface}
              </div>
              <div className="flex gap-6">
                <div>
                  <div className="text-2xs text-sk-faint mb-0.5">↓ Inbound</div>
                  <div className="font-mono text-sm text-sk-green">{formatBytesPerSec(stats.net.rx)}</div>
                </div>
                <div>
                  <div className="text-2xs text-sk-faint mb-0.5">↑ Outbound</div>
                  <div className="font-mono text-sm text-sk-orange">{formatBytesPerSec(stats.net.tx)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Activity */}
        <div>
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-3">
            Recent activity
          </div>
          <div className="bg-sk-surface border border-sk-border rounded-xl divide-y divide-sk-subtle">
            {activity.length === 0 && (
              <div className="px-4 py-6 text-[12px] text-sk-faint text-center">No activity yet</div>
            )}
            {activity.map(a => (
              <div key={a.id} className="flex items-start gap-2.5 px-3.5 py-2.5">
                <span className={`w-[7px] h-[7px] rounded-full flex-shrink-0 mt-1 ${levelDot[a.level] ?? 'bg-sk-orange'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-sk-muted leading-snug">{a.message}</div>
                  <div className="text-[10px] text-sk-faint mt-0.5">{relativeTime(a.ts)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
