import { getContainerLogs } from '@/lib/docker'

export async function GET(req, { params }) {
  const tail = Number(new URL(req.url).searchParams.get('tail') || 100)
  try {
    const logs = await getContainerLogs(params.id, tail)
    return new Response(logs, { headers: { 'Content-Type': 'text/plain' } })
  } catch (err) {
    return new Response(err.message, { status: 500 })
  }
}
