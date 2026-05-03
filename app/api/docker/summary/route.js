import { NextResponse } from 'next/server'
import { getDockerSummary } from '@/lib/docker'

export async function GET() {
  try {
    return NextResponse.json(await getDockerSummary())
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
