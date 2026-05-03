import { createReadStream, statSync } from 'fs'
import path from 'path'
import { lookup as mimeLookup } from 'mime-types'
import { isAllowed } from '@/lib/fs'
import { NextResponse } from 'next/server'
import { Readable } from 'stream'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const filePath = searchParams.get('path')

  if (!filePath) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 })
  }

  const resolved = path.resolve(filePath)

  if (!isAllowed(resolved)) {
    return NextResponse.json({ error: 'Path outside allowed roots' }, { status: 403 })
  }

  let stat
  try {
    stat = statSync(resolved)
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  if (stat.isDirectory()) {
    return NextResponse.json({ error: 'Path is a directory' }, { status: 400 })
  }

  const mime = mimeLookup(resolved) || 'application/octet-stream'
  const fileSize = stat.size
  const rangeHeader = req.headers.get('range')

  // Range request — needed for video/audio seeking
  if (rangeHeader) {
    const [startStr, endStr] = rangeHeader.replace(/bytes=/, '').split('-')
    const start = parseInt(startStr, 10)
    const end = endStr ? parseInt(endStr, 10) : Math.min(start + 1024 * 1024 - 1, fileSize - 1)
    const chunkSize = end - start + 1

    const stream = createReadStream(resolved, { start, end })
    const nodeReadable = Readable.from(stream)
    const webStream = new ReadableStream({
      start(controller) {
        nodeReadable.on('data', chunk => controller.enqueue(chunk))
        nodeReadable.on('end', () => controller.close())
        nodeReadable.on('error', err => controller.error(err))
      },
    })

    return new Response(webStream, {
      status: 206,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': String(chunkSize),
        'Content-Type': mime,
        'Cache-Control': 'private, max-age=3600',
      },
    })
  }

  // Full file
  const stream = createReadStream(resolved)
  const nodeReadable = Readable.from(stream)
  const webStream = new ReadableStream({
    start(controller) {
      nodeReadable.on('data', chunk => controller.enqueue(chunk))
      nodeReadable.on('end', () => controller.close())
      nodeReadable.on('error', err => controller.error(err))
    },
  })

  const ext = path.extname(resolved).toLowerCase()
  const viewable = /^\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mp3|flac|aac|ogg|wav|pdf)$/.test(ext)

  return new Response(webStream, {
    status: 200,
    headers: {
      'Content-Type': mime,
      'Content-Length': String(fileSize),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'private, max-age=3600',
      'Content-Disposition': viewable
        ? `inline; filename="${path.basename(resolved)}"`
        : `attachment; filename="${path.basename(resolved)}"`,
    },
  })
}
