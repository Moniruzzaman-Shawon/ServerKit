import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

export default async function AppLayout({ children }) {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div className="flex h-screen bg-sk-bg overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
