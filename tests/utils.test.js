import { describe, it, expect } from 'vitest'
import { formatBytes, formatBytesPerSec, relativeTime } from '../lib/utils.js'

// ─── formatBytes ──────────────────────────────────────────────────────────────

describe('formatBytes', () => {
  it('returns "0 B" for 0',         () => expect(formatBytes(0)).toBe('0 B'))
  it('returns "0 B" for null',       () => expect(formatBytes(null)).toBe('0 B'))
  it('returns "0 B" for undefined',  () => expect(formatBytes(undefined)).toBe('0 B'))

  // parseFloat strips trailing zeros — '500 B', '1 KB', etc.
  it('formats bytes',     () => expect(formatBytes(500)).toBe('500 B'))
  it('formats kilobytes', () => expect(formatBytes(1024)).toBe('1 KB'))
  it('formats megabytes', () => expect(formatBytes(1024 ** 2)).toBe('1 MB'))
  it('formats gigabytes', () => expect(formatBytes(1024 ** 3)).toBe('1 GB'))
  it('formats terabytes', () => expect(formatBytes(1024 ** 4)).toBe('1 TB'))

  it('formats fractional values', () => {
    expect(formatBytes(1536)).toBe('1.5 KB')            // 1.5 KB — no trailing zero
    expect(formatBytes(1.5 * 1024 ** 3)).toBe('1.5 GB')
  })

  it('respects explicit decimals (trailing zeros stripped by parseFloat)', () => {
    // parseFloat('1.50') → 1.5 → '1.5 KB'
    expect(formatBytes(1536, 2)).toBe('1.5 KB')
  })
})

// ─── formatBytesPerSec ────────────────────────────────────────────────────────

describe('formatBytesPerSec', () => {
  it('formats 0 as B/s',   () => expect(formatBytesPerSec(0)).toBe('0 B/s'))
  it('formats < 1 KB B/s', () => expect(formatBytesPerSec(512)).toBe('512 B/s'))
  it('formats KB/s',       () => expect(formatBytesPerSec(2048)).toBe('2.0 KB/s'))
  it('formats MB/s',       () => expect(formatBytesPerSec(5 * 1024 ** 2)).toBe('5.0 MB/s'))
})

// ─── relativeTime ─────────────────────────────────────────────────────────────

describe('relativeTime', () => {
  const now = () => Math.floor(Date.now() / 1000)

  it('returns "just now" for < 60s',     () => expect(relativeTime(now() - 30)).toBe('just now'))
  it('returns "just now" for 59s',       () => expect(relativeTime(now() - 59)).toBe('just now'))
  it('returns minutes for exactly 60s',  () => expect(relativeTime(now() - 60)).toBe('1m ago'))
  it('returns minutes for 2m',           () => expect(relativeTime(now() - 120)).toBe('2m ago'))
  it('returns hours for 2h',             () => expect(relativeTime(now() - 7200)).toBe('2h ago'))
  it('returns days for 3d',              () => expect(relativeTime(now() - 86400 * 3)).toBe('3d ago'))
})
