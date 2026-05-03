import { NextResponse } from 'next/server'

export async function GET() {
  const endpoint = process.env.MINIO_ENDPOINT || 'http://localhost:9000'
  const accessKey = process.env.MINIO_USER || 'minioadmin'
  const secretKey = process.env.MINIO_PASS || ''

  try {
    // List buckets via MinIO admin API
    const res = await fetch(`${endpoint}/minio/health/live`, { signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error('MinIO not reachable')

    // Basic bucket list — requires proper auth in production
    // For now, return configured credentials so the UI can show the endpoint
    return NextResponse.json({
      buckets: [],
      credentials: {
        endpoint,
        accessKey,
        secretKey: secretKey ? '••••••••••' : null,
      },
    })
  } catch {
    return NextResponse.json({
      buckets: [],
      credentials: { endpoint, accessKey, secretKey: secretKey ? '••••••••••' : null },
      offline: true,
    })
  }
}
