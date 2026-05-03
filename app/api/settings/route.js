import { NextResponse } from 'next/server'
import { getSetting, setSetting, getAllSettings } from '@/lib/db'

// Fields that can be persisted via the UI (env vars are read-only from here)
const WRITABLE = ['hostname', 'mediaRoots', 'minioEndpoint', 'minioUser']

export async function GET() {
  const stored = getAllSettings()

  return NextResponse.json({
    // Env-sourced (read-only display)
    env: {
      hostname:     process.env.NEXT_PUBLIC_HOSTNAME || 'my-linux-server',
      port:         process.env.PORT || '3000',
      mediaRoots:   process.env.MEDIA_ROOTS || '/mnt/media,/mnt/webserver',
      dockerSocket: process.env.DOCKER_SOCKET || '/var/run/docker.sock',
      minioEndpoint:process.env.MINIO_ENDPOINT || 'http://localhost:9000',
      minioUser:    process.env.MINIO_USER || 'minioadmin',
    },
    // DB-stored overrides
    stored,
  })
}

export async function POST(req) {
  const body = await req.json()
  const updated = {}

  for (const key of WRITABLE) {
    if (key in body) {
      setSetting(key, body[key])
      updated[key] = body[key]
    }
  }

  return NextResponse.json({ ok: true, updated })
}
