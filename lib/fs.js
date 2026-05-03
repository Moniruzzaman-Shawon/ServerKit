import { promises as fs } from 'fs'
import path from 'path'

export const ROOTS = (process.env.MEDIA_ROOTS || '/mnt/media,/mnt/webserver')
  .split(',')
  .map(p => path.resolve(p.trim()))

export function isAllowed(target) {
  if (!target) return false
  const resolved = path.resolve(target)
  return ROOTS.some(root => resolved === root || resolved.startsWith(root + path.sep))
}

export async function listDir(dirPath) {
  if (!isAllowed(dirPath)) throw new Error('Path outside allowed roots')

  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  const items = await Promise.all(
    entries.map(async entry => {
      const full = path.join(dirPath, entry.name)
      try {
        const stat = await fs.stat(full)
        return {
          name: entry.name,
          type: entry.isDirectory() ? 'dir' : 'file',
          size: stat.size,
          modified: stat.mtime.toISOString(),
          path: full,
        }
      } catch {
        return null
      }
    })
  )

  return items
    .filter(Boolean)
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
      return a.name.localeCompare(b.name)
    })
}
