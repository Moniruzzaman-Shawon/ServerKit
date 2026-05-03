export default function Sparkline({ data = [], color = '#f97316', h = 32, w = 80 }) {
  if (!data.length) return null
  const pad = 2
  const mn = Math.min(...data)
  const mx = Math.max(...data) || 1
  const pts = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1 || 1)) * (w - pad * 2)
      const y = h - pad - ((v - mn) / (mx - mn || 1)) * (h - pad * 2)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
