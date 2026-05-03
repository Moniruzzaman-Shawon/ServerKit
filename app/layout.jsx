import './globals.css'

export const metadata = {
  title: 'ServerKit',
  description: 'Self-hosted Linux server management',
  icons: { icon: '/logo.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-sk-bg text-sk-text font-sans antialiased">{children}</body>
    </html>
  )
}
