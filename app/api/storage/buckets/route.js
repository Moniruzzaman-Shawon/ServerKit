import { NextResponse } from 'next/server'
import { getClient } from '@/lib/minio'

export async function GET() {
  const endpoint  = process.env.MINIO_ENDPOINT || 'http://localhost:9000'
  const accessKey = process.env.MINIO_USER     || 'minioadmin'
  const secretKey = process.env.MINIO_PASS     || ''
  const creds     = { endpoint, accessKey, secretKey: secretKey ? '••••••••••' : null }

  let client
  try { client = getClient() }
  catch (err) {
    return NextResponse.json({ buckets: [], credentials: creds, offline: true, error: err.message })
  }

  try {
    const bucketList = await client.listBuckets()

    const buckets = await Promise.all(
      bucketList.map(async b => {
        let objects = 0, sizeBytes = 0
        try {
          const stream = client.listObjectsV2(b.name, '', true)
          await new Promise((resolve, reject) => {
            stream.on('data', obj => { objects++; sizeBytes += obj.size || 0 })
            stream.on('end', resolve)
            stream.on('error', reject)
          })
        } catch {}
        return { name: b.name, created: b.creationDate, objects, sizeBytes, access: 'private' }
      })
    )

    return NextResponse.json({ buckets, credentials: creds })
  } catch (err) {
    return NextResponse.json({ buckets: [], credentials: creds, offline: true, error: err.message })
  }
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}))
  const { name } = body

  if (!name || !/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/.test(name)) {
    return NextResponse.json(
      { error: 'Invalid name — 3 to 63 lowercase letters, numbers, or hyphens.' },
      { status: 400 }
    )
  }

  let client
  try { client = getClient() }
  catch (err) {
    return NextResponse.json({ error: `MinIO client error: ${err.message}` }, { status: 500 })
  }

  try {
    await client.makeBucket(name, 'us-east-1')
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err?.message || err?.code || String(err) || 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
