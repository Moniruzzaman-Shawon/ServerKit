import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { Client } = require('minio')

function parseEndpoint(raw) {
  try {
    const url = new URL(raw)
    return {
      endPoint: url.hostname,
      port: url.port ? parseInt(url.port) : (url.protocol === 'https:' ? 443 : 80),
      useSSL: url.protocol === 'https:',
    }
  } catch {
    return { endPoint: 'localhost', port: 9000, useSSL: false }
  }
}

export function getClient() {
  const { endPoint, port, useSSL } = parseEndpoint(
    process.env.MINIO_ENDPOINT || 'http://localhost:9000'
  )
  return new Client({
    endPoint,
    port,
    useSSL,
    accessKey: process.env.MINIO_USER || 'minioadmin',
    secretKey: process.env.MINIO_PASS || 'minioadmin',
  })
}
