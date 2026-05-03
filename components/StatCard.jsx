import Sparkline from './Sparkline'

export default function StatCard({ label, value, sub, pct = 0, color = '#f97316', spark }) {
  return (
    <div className="bg-sk-surface border border-sk-border rounded-xl px-4 py-3.5">
      <div className="text-2xs font-medium text-sk-faint uppercase tracking-[.06em] mb-1.5">
        {label}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="font-mono text-[26px] font-medium text-sk-text leading-none mb-1">
            {value ?? '—'}
          </div>
          <div className="text-[11px] text-sk-muted">{sub}</div>
        </div>
        {spark && <Sparkline data={spark} color={color} />}
      </div>
      <div className="mt-2.5 h-[3px] bg-sk-el rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, pct)}%`, background: color }}
        />
      </div>
    </div>
  )
}
