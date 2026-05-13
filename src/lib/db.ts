import Database from 'better-sqlite3'
import path from 'path'
const dbPath = path.join(process.cwd(), 'spotplyma.db')
const db = new Database(dbPath)
db.exec(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT UNIQUE, email TEXT, password TEXT, isGuest INTEGER, guestExpiry INTEGER, profilePicture TEXT, role TEXT, requestCount INTEGER, settings TEXT, createdAt INTEGER); CREATE TABLE IF NOT EXISTS notifications (id TEXT PRIMARY KEY, userId TEXT, title TEXT, message TEXT, type TEXT, read INTEGER, createdAt INTEGER); CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);`)
export default db