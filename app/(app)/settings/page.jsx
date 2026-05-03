'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Server, Shield, HardDrive, Info,
  Save, Eye, EyeOff, CheckCircle, AlertCircle, LogOut,
} from 'lucide-react'

const TABS = [
  { id: 'general',  label: 'General',  Icon: Server  },
  { id: 'security', label: 'Security', Icon: Shield  },
  { id: 'storage',  label: 'Storage',  Icon: HardDrive },
  { id: 'about',    label: 'About',    Icon: Info    },
]

function SectionCard({ title, children }) {
  return (
    <div className="bg-sk-surface border border-sk-border rounded-xl overflow-hidden mb-4">
      <div className="px-4 py-2.5 border-b border-sk-border">
        <span className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em]">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div className="mb-4 last:mb-0">
      <label className="block text-[11px] font-medium text-sk-muted uppercase tracking-[.05em] mb-1.5">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-sk-faint">{hint}</p>}
    </div>
  )
}

function Input({ value, onChange, type = 'text', readOnly, placeholder, className = '' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`w-full bg-sk-el border border-sk-border rounded-md px-3 py-2 text-sm font-sans
                  text-sk-text outline-none transition-colors
                  ${readOnly
                    ? 'opacity-60 cursor-not-allowed'
                    : 'focus:border-sk-orange'
                  } ${className}`}
    />
  )
}

function Toast({ msg, ok }) {
  if (!msg) return null
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-4
                     ${ok
                       ? 'bg-sk-green/10 border border-sk-green/30 text-sk-green'
                       : 'bg-sk-red/10 border border-sk-red/30 text-sk-red'
                     }`}>
      {ok ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
      {msg}
    </div>
  )
}

function SaveBtn({ loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sk-orange text-white
                 text-[12px] font-medium hover:opacity-90 transition-opacity
                 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
    >
      <Save size={13} />
      {loading ? 'Saving…' : 'Save changes'}
    </button>
  )
}

// ─── Tab: General ─────────────────────────────────────────────────────────────

function GeneralTab({ env }) {
  const [hostname, setHostname] = useState(env?.hostname || '')
  const [mediaRoots, setMediaRoots] = useState(env?.mediaRoots || '')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  async function save() {
    setLoading(true)
    setToast(null)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostname, mediaRoots }),
      })
      const data = await res.json()
      setToast({ ok: res.ok, msg: res.ok ? 'Settings saved. Restart to apply.' : (data.error || 'Save failed') })
    } catch {
      setToast({ ok: false, msg: 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Toast msg={toast?.msg} ok={toast?.ok} />

      <SectionCard title="Server identity">
        <Field label="Hostname" hint="Display name shown in the sidebar and login screen.">
          <Input value={hostname} onChange={e => setHostname(e.target.value)} placeholder="my-linux-server" />
        </Field>
        <Field label="Port" hint="Set via PORT in .env — restart required to change.">
          <Input value={env?.port || '3000'} readOnly />
        </Field>
      </SectionCard>

      <SectionCard title="Media browser roots">
        <Field
          label="Allowed paths"
          hint="Comma-separated absolute paths the Media page can browse. Paths outside this list are blocked."
        >
          <Input
            value={mediaRoots}
            onChange={e => setMediaRoots(e.target.value)}
            placeholder="/mnt/media,/mnt/webserver"
          />
        </Field>
      </SectionCard>

      <SectionCard title="Docker">
        <Field label="Docker socket" hint="Set via DOCKER_SOCKET in .env — restart required.">
          <Input value={env?.dockerSocket || '/var/run/docker.sock'} readOnly />
        </Field>
      </SectionCard>

      <SaveBtn loading={loading} onClick={save} />
    </div>
  )
}

// ─── Tab: Security ────────────────────────────────────────────────────────────

function SecurityTab() {
  const [current, setCurrent] = useState('')
  const [next, setNext]       = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast]     = useState(null)
  const router = useRouter()

  async function changePassword() {
    setToast(null)
    if (next !== confirm) {
      setToast({ ok: false, msg: 'New passwords do not match' }); return
    }
    if (next.length < 8) {
      setToast({ ok: false, msg: 'New password must be at least 8 characters' }); return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/settings/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current, next }),
      })
      const data = await res.json()
      if (res.ok) {
        setToast({ ok: true, msg: 'Password changed. You will be signed out.' })
        setCurrent(''); setNext(''); setConfirm('')
        setTimeout(async () => {
          await fetch('/api/auth/logout', { method: 'POST' })
          router.push('/login')
        }, 2000)
      } else {
        setToast({ ok: false, msg: data.error || 'Failed to change password' })
      }
    } catch {
      setToast({ ok: false, msg: 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  const type = show ? 'text' : 'password'

  return (
    <div>
      <Toast msg={toast?.msg} ok={toast?.ok} />

      <SectionCard title="Change password">
        <Field label="Current password">
          <div className="relative">
            <Input type={type} value={current} onChange={e => setCurrent(e.target.value)} placeholder="Enter current password" />
          </div>
        </Field>
        <Field label="New password" hint="Minimum 8 characters.">
          <Input type={type} value={next} onChange={e => setNext(e.target.value)} placeholder="Enter new password" />
        </Field>
        <Field label="Confirm new password">
          <Input type={type} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat new password" />
        </Field>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setShow(s => !s)}
            className="flex items-center gap-1.5 text-[11px] text-sk-faint hover:text-sk-muted
                       transition-colors cursor-pointer"
          >
            {show ? <EyeOff size={12} /> : <Eye size={12} />}
            {show ? 'Hide' : 'Show'} passwords
          </button>
          <SaveBtn loading={loading} onClick={changePassword} />
        </div>
      </SectionCard>

      <SectionCard title="Session">
        <p className="text-[13px] text-sk-muted leading-relaxed">
          Sessions are JWT tokens stored in a secure httpOnly cookie, valid for 7 days.
          Changing your password invalidates all current sessions.
        </p>
        <div className="mt-3 p-3 bg-sk-el rounded-lg border border-sk-border">
          <div className="text-[11px] text-sk-faint font-mono">
            Algorithm: HS256 · Expiry: 7 days · Storage: httpOnly cookie
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

// ─── Tab: Storage ─────────────────────────────────────────────────────────────

function StorageTab({ env }) {
  const [endpoint, setEndpoint] = useState(env?.minioEndpoint || '')
  const [user, setUser]         = useState(env?.minioUser || '')
  const [loading, setLoading]   = useState(false)
  const [toast, setToast]       = useState(null)

  async function save() {
    setLoading(true)
    setToast(null)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minioEndpoint: endpoint, minioUser: user }),
      })
      setToast({ ok: res.ok, msg: res.ok ? 'Storage settings saved.' : 'Save failed' })
    } catch {
      setToast({ ok: false, msg: 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Toast msg={toast?.msg} ok={toast?.ok} />

      <SectionCard title="MinIO / S3">
        <Field label="Endpoint URL" hint="HTTP endpoint where MinIO is reachable.">
          <Input value={endpoint} onChange={e => setEndpoint(e.target.value)} placeholder="http://localhost:9000" />
        </Field>
        <Field label="Access key">
          <Input value={user} onChange={e => setUser(e.target.value)} placeholder="minioadmin" />
        </Field>
        <Field label="Secret key" hint="Set via MINIO_PASS in .env — not editable here for security.">
          <Input value="••••••••••••" readOnly />
        </Field>
      </SectionCard>

      <SaveBtn loading={loading} onClick={save} />
    </div>
  )
}

// ─── Tab: About ───────────────────────────────────────────────────────────────

function AboutTab() {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    fetch('/api/system').then(r => r.json()).then(setInfo).catch(() => {})
  }, [])

  const rows = info ? [
    { l: 'ServerKit',       v: `v${info.sk}` },
    { l: 'Node.js',         v: info.node },
    { l: 'OS',              v: `${info.os?.distro} ${info.os?.release}` },
    { l: 'Kernel',          v: info.os?.kernel },
    { l: 'Architecture',    v: info.os?.arch },
    { l: 'CPU',             v: `${info.cpu?.brand} (${info.cpu?.physicalCores}C / ${info.cpu?.cores}T)` },
    { l: 'Uptime',          v: formatUptime(info.uptime) },
    { l: 'Hostname',        v: info.os?.hostname },
  ] : []

  return (
    <div>
      <SectionCard title="System information">
        {!info ? (
          <p className="text-sk-faint text-sm">Loading…</p>
        ) : (
          <dl className="space-y-2.5">
            {rows.map(r => (
              <div key={r.l} className="flex items-center gap-4">
                <dt className="text-[11px] text-sk-faint w-36 flex-shrink-0">{r.l}</dt>
                <dd className="font-mono text-[12px] text-sk-text">{r.v || '—'}</dd>
              </div>
            ))}
          </dl>
        )}
      </SectionCard>

      <SectionCard title="Open source">
        <p className="text-[13px] text-sk-muted leading-relaxed">
          ServerKit is a self-hosted server management panel. Configure it via{' '}
          <code className="font-mono text-sk-orange text-[12px]">.env</code>, manage Docker,
          browse files, monitor resources, and access a full terminal — all from your browser.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-2xs font-mono text-sk-faint">MIT License · © 2026 Moniruzzaman Shawon · v1.0.0</span>
        </div>
      </SectionCard>
    </div>
  )
}

function formatUptime(seconds) {
  if (!seconds) return '—'
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [tab, setTab]   = useState('general')
  const [cfg, setCfg]   = useState(null)

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setCfg).catch(() => {})
  }, [])

  const env = cfg?.env || {}

  return (
    <div className="p-5 animate-fadein">
      <div className="grid gap-5" style={{ gridTemplateColumns: '180px 1fr' }}>

        {/* Tab nav */}
        <div>
          <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-2">
            Settings
          </div>
          <div className="flex flex-col gap-0.5">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 text-left px-3 py-2 rounded-md
                            text-[13px] border-l-2 transition-all cursor-pointer
                            ${tab === id
                              ? 'bg-sk-orange/8 text-sk-orange border-sk-orange'
                              : 'text-sk-muted border-transparent hover:bg-sk-el hover:text-sk-text'
                            }`}
              >
                <Icon size={13} className={tab === id ? 'opacity-100' : 'opacity-60'} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div>
          {tab === 'general'  && <GeneralTab  env={env} />}
          {tab === 'security' && <SecurityTab />}
          {tab === 'storage'  && <StorageTab  env={env} />}
          {tab === 'about'    && <AboutTab />}
        </div>

      </div>
    </div>
  )
}
