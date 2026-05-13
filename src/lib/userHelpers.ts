import db from './db'
import { v4 as uuidv4 } from 'uuid'
export function createUser(data: any) {
  const id = uuidv4()
  const stmt = db.prepare(`INSERT INTO users (id, username, email, password, isGuest, role, requestCount, settings, createdAt) VALUES (?,?,?,?,?,?,?,?,?)`)
  stmt.run(id, data.username, data.email || null, data.password || null, data.isGuest ? 1 : 0, data.role || 'user', data.requestCount || 0, JSON.stringify(data.settings || {}), Date.now())
  return findUserById(id)!
}
export function findUserByUsername(username: string) {
  const row: any = db.prepare('SELECT * FROM users WHERE username = ?').get(username)
  if (!row) return null
  return { ...row, isGuest: row.isGuest === 1, settings: JSON.parse(row.settings || '{}'), requestCount: row.requestCount }
}
export function findUserById(id: string) {
  const row: any = db.prepare('SELECT * FROM users WHERE id = ?').get(id)
  if (!row) return null
  return { ...row, isGuest: row.isGuest === 1, settings: JSON.parse(row.settings || '{}'), requestCount: row.requestCount }
}
export function updateUser(id: string, updates: any) {
  const allowed = ['username', 'email', 'profilePicture', 'settings', 'requestCount']
  const fields: string[] = []
  const values: any[] = []
  for (const key of allowed) {
    if (updates[key] !== undefined) {
      fields.push(`${key} = ?`)
      values.push(key === 'settings' ? JSON.stringify(updates[key]) : updates[key])
    }
  }
  if (fields.length === 0) return findUserById(id)
  values.push(Date.now(), id)
  db.prepare(`UPDATE users SET ${fields.join(', ')}, updatedAt = ? WHERE id = ?`).run(...values)
  return findUserById(id)
}
export function incrementRequestCount(userId: string) { db.prepare('UPDATE users SET requestCount = requestCount + 1 WHERE id = ?').run(userId) }