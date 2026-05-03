/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        sk: {
          bg:        '#0d1117',
          surface:   '#161b22',
          el:        '#1c2128',
          border:    '#30363d',
          subtle:    '#21262d',
          text:      '#e6edf3',
          muted:     '#8b949e',
          faint:     '#6e7681',
          orange:    '#f97316',
          green:     '#56d364',
          red:       '#f85149',
          amber:     '#d29922',
          purple:    '#bc8cff',
          teal:      '#39d353',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
      },
      animation: {
        pulse2: 'pulse2 2s ease-in-out infinite',
        fadein: 'fadein 0.15s ease-out',
      },
      keyframes: {
        pulse2: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
        fadein: { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'none' } },
      },
    },
  },
  plugins: [],
}
