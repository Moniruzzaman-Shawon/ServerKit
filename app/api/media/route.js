import { NextResponse } from 'next/server'
import { listDir, ROOTS } from '@/lib/fs'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const reqPath = searchParams.get('path')

  // No path → return roots + first root listing
  if (!reqPath) {
    try {
      const entries = ROOTS.length > 0 ? await listDir(ROOTS[0]) : []
      return NextResponse.json({ roots: ROOTS, entries })
    } catch {
      return NextResponse.json({ roots: ROOTS, entries: [] })
    }
  }

  try {
    const entries = await listDir(reqPath)
    return NextResponse.json({ entries })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
