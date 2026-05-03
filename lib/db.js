const Database = require('better-sqlite3')
const path = require('path')
const fss = require('fs')

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'serverkit.db')
fss.mkdirSync(path.dirname(DB_PATH), { recursive: true })

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS activity (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    message   TEXT    NOT NULL,
    level     TEXT    NOT NULL DEFAULT 'info',
    ts        INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS settings (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`)

function logActivity(message, level = 'info') {
  db.prepare('INSERT INTO activity (message, level) VALUES (?, ?)').run(message, level)
}

function getActivity(limit = 30) {
  return db.prepare('SELECT * FROM activity ORDER BY ts DESC, id DESC LIMIT ?').all(limit)
}

function getSetting(key, fallback = null) {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key)
  return row ? JSON.parse(row.value) : fallback
}

function setSetting(key, value) {
  db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)')
    .run(key, JSON.stringify(value))
}

function getAllSettings() {
  const rows = db.prepare('SELECT key, value FROM settings').all()
  return Object.fromEntries(rows.map(r => [r.key, JSON.parse(r.value)]))
}

module.exports = { db, logActivity, getActivity, getSetting, setSetting, getAllSettings }
