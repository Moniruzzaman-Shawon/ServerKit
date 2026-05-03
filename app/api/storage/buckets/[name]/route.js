import { NextResponse } from 'next/server'
import { getClient } from '@/lib/minio'

export async function DELETE(req, { params }) {
  const { name } = await params
  try {
    const client = getClient()
    // Remove all objects first, then delete the bucket
    const stream = client.listObjectsV2(name, '', true)
    const objects = []
    await new Promise((resolve, reject) => {
      stream.on('data', obj => objects.push({ name: obj.name }))
      stream.on('end', resolve)
      stream.on('error', reject)
    })
    if (objects.length > 0) await client.removeObjects(name, objects)
    await client.removeBucket(name)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
