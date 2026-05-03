import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import ShellLayout from '@/components/ShellLayout'

export default async function AppLayout({ children }) {
  const session = await getSession()
  if (!session) redirect('/login')
  return <ShellLayout>{children}</ShellLayout>
}
