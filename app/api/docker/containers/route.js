import { NextResponse } from 'next/server'
import { listContainers } from '@/lib/docker'

export async function GET() {
  try {
    const containers = await listContainers()
    return NextResponse.json(containers)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
