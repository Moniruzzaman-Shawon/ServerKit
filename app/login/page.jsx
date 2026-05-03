'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Shield } from 'lucide-react'

export default function LoginPage() {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setErr('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) {
      router.push('/dashboard')
    } else {
      setErr('Incorrect password')
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #1c0d00 0%, #0d1117 55%)' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.12) 0%, transparent 70%)' }}
      />

      {/* Card */}
      <div className="relative w-full max-w-[420px] mx-4 animate-fadein z-10">
        {/* Outer glow ring */}
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(249,115,22,0.35) 0%, rgba(249,115,22,0.05) 40%, transparent 60%)',
            borderRadius: 'inherit',
          }}
        />

        <div className="relative bg-sk-surface border border-sk-border rounded-2xl overflow-hidden shadow-2xl">
          {/* Top accent line */}
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #f97316 50%, transparent 100%)' }}
          />

          {/* Header */}
          <div className="px-8 pt-7 pb-6 border-b border-sk-subtle">
            {/* Status bar */}
            <div className="flex items-center gap-2 mb-7">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sk-el border border-sk-border text-[11px] text-sk-muted font-mono tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-sk-green animate-pulse2 flex-shrink-0" />
                {process.env.NEXT_PUBLIC_HOSTNAME || 'my-linux-server'}
              </div>
              <div className="ml-auto flex items-center gap-1 text-[11px] text-sk-faint">
                <Shield size={11} className="text-sk-orange opacity-80" />
                <span>Secure</span>
              </div>
            </div>

            {/* Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 160"
              className="w-full h-auto"
              style={{ overflow: 'visible' }}
              aria-label="ServerKit"
            >
              <text x="16" y="98" fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" fontSize="96" fontWeight="800" fill="#eef0f4" letterSpacing="-4">Server</text>
              <text x="16" y="155" fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" fontSize="96" fontWeight="300" fill="#f97316" letterSpacing="-3">Kit</text>
            </svg>

            <p className="text-sk-faint text-[12px] mt-2 pl-0.5 tracking-wide">
              Management Console · v1.0.0
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-7">
            {err && (
              <div className="flex items-center gap-2.5 bg-sk-red/10 border border-sk-red/25 rounded-lg px-3.5 py-2.5 text-sk-red text-xs mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-sk-red flex-shrink-0" />
                {err}
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-2xs font-semibold text-sk-muted uppercase tracking-[.12em] mb-2">
                  Administrator Password
                </label>
                <div className="relative">
                  <Lock
                    size={13}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sk-faint pointer-events-none"
                  />
                  <input
                    type="password"
                    value={pw}
                    onChange={e => setPw(e.target.value)}
                    placeholder="Enter password"
                    autoFocus
                    className="w-full bg-sk-el border border-sk-border rounded-lg pl-9 pr-3.5 py-2.5
                               text-sk-text text-sm outline-none font-sans placeholder:text-sk-faint
                               focus:border-sk-orange transition-colors"
                    style={{ boxShadow: 'none' }}
                    onFocus={e => (e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.12)')}
                    onBlur={e => (e.target.style.boxShadow = 'none')}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !pw}
                className="w-full rounded-lg py-2.5 text-sm font-semibold text-white
                           transition-all cursor-pointer disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #e8650a 100%)',
                  boxShadow: loading || !pw ? 'none' : '0 0 24px rgba(249,115,22,0.35)',
                  opacity: loading || !pw ? 0.45 : 1,
                }}
              >
                {loading ? 'Authenticating…' : 'Sign in'}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-3.5 border-t border-sk-subtle" style={{ background: 'rgba(13,17,23,0.5)' }}>
            <p className="text-2xs text-sk-faint text-center">
              Password via{' '}
              <span className="font-mono text-sk-muted">SK_PASSWORD</span>
              {' '}in{' '}
              <span className="font-mono text-sk-muted">.env</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
