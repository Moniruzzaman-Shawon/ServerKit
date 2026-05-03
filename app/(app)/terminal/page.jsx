'use client'
import dynamic from 'next/dynamic'

const TerminalView = dynamic(() => import('@/components/TerminalView'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 bg-[#010409] rounded-xl flex items-center justify-center
                    text-sk-faint text-sm font-mono">
      Loading terminal…
    </div>
  ),
})

export default function TerminalPage() {
  return (
    <div className="p-5 animate-fadein h-full flex flex-col">
      {/* Chrome */}
      <div className="bg-sk-surface border border-sk-border rounded-t-xl px-4 py-2.5
                      flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sk-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-sk-amber" />
          <span className="w-2.5 h-2.5 rounded-full bg-sk-green" />
          <span className="ml-3 font-mono text-[12px] text-sk-faint">
            bash · {process.env.NEXT_PUBLIC_HOSTNAME || 'my-linux-server'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-sk-faint">
          <span className="w-1.5 h-1.5 rounded-full bg-sk-green animate-pulse2" />
          connected · node-pty
        </div>
      </div>

      {/* Terminal area */}
      <div className="flex-1 border-x border-b border-sk-border rounded-b-xl overflow-hidden"
           style={{ minHeight: '500px' }}>
        <TerminalView />
      </div>
    </div>
  )
}
