import { NextResponse } from 'next/server'
import { listContainers, createContainer, pullImage } from '@/lib/docker'
import { logActivity } from '@/lib/db'

export async function GET() {
  try {
    return NextResponse.json(await listContainers())
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}))
  const { image, name, ports, env, volumes, restart } = body

  if (!image?.trim()) {
    return NextResponse.json({ error: 'Image name is required' }, { status: 400 })
  }

  const run = async () => createContainer({ image, name, ports, env, volumes, restart })

  try {
    const result = await run()
    logActivity(`Created container from ${image}`, 'success')
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const notFound = err?.statusCode === 404 || err?.message?.includes('No such image')
    if (!notFound) {
      return NextResponse.json({ error: err.message || 'Failed to create container' }, { status: 500 })
    }

    // Image not local — pull it then retry
    try {
      await pullImage(image)
      const result = await run()
      logActivity(`Pulled & created container from ${image}`, 'success')
      return NextResponse.json({ ok: true, pulled: true, ...result })
    } catch (err2) {
      return NextResponse.json(
        { error: err2.message || 'Failed to pull image' },
        { status: 500 }
      )
    }
  }
}
