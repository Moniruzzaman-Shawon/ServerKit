import { describe, it, expect, beforeEach } from 'vitest'

process.env.DB_PATH = ':memory:'

const { db, logActivity, getActivity } = await import('../../lib/db.js')

// Wipe the table before every test for full isolation
beforeEach(() => db.exec('DELETE FROM activity'))

// ─── logActivity / getActivity ────────────────────────────────────────────────

describe('activity log', () => {
  it('starts empty after wipe', () => {
    expect(getActivity()).toEqual([])
  })

  it('inserts and retrieves an entry', () => {
    logActivity('Container my-app started')
    const rows = getActivity()
    expect(rows).toHaveLength(1)
    expect(rows[0].message).toBe('Container my-app started')
  })

  it('defaults to level "info"', () => {
    logActivity('default level test')
    expect(getActivity()[0].level).toBe('info')
  })

  it('stores custom levels', () => {
    logActivity('disk warning', 'warn')
    logActivity('container removed', 'success')
    const rows = getActivity()
    expect(rows.find(r => r.level === 'warn')).toBeDefined()
    expect(rows.find(r => r.level === 'success')).toBeDefined()
  })

  it('returns most recent entry first', () => {
    logActivity('first')
    logActivity('second')
    logActivity('third')
    expect(getActivity()[0].message).toBe('third')
  })

  it('respects the limit parameter', () => {
    for (let i = 0; i < 10; i++) logActivity(`bulk ${i}`)
    expect(getActivity(3)).toHaveLength(3)
  })

  it('assigns incrementing ids within a session', () => {
    logActivity('a')
    logActivity('b')
    const rows = getActivity()
    expect(rows[0].id).toBeGreaterThan(rows[1].id)  // most-recent first → id DESC
  })

  it('stores a unix timestamp in ts', () => {
    logActivity('ts test')
    const [row] = getActivity()
    const now = Math.floor(Date.now() / 1000)
    expect(row.ts).toBeGreaterThan(now - 5)
    expect(row.ts).toBeLessThanOrEqual(now + 1)
  })
})
