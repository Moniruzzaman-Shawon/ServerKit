const VARIANTS = {
  green:  'bg-sk-green/10  text-sk-green',
  red:    'bg-sk-red/10   text-sk-red',
  amber:  'bg-sk-amber/10 text-sk-amber',
  orange: 'bg-sk-orange/10 text-sk-orange',
  purple: 'bg-sk-purple/10 text-sk-purple',
  muted:  'bg-sk-el       text-sk-muted',
}

export default function Badge({ variant = 'muted', children }) {
  return (
    <span className={`inline-flex items-center font-mono text-[10px] font-medium
                      px-2 py-0.5 rounded ${VARIANTS[variant] ?? VARIANTS.muted}`}>
      {children}
    </span>
  )
}
