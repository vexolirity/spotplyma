import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'
import { verifyJWT } from '@/lib/jwt'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  let userId: string
  try { const decoded: any = await verifyJWT(token); userId = decoded.id } catch { return NextResponse.json({ error: 'Invalid token' }, { status: 401 }) }
  const stmt = db.prepare('SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC LIMIT 50')
  const rows = stmt.all(userId)
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  let userId: string
  try { const decoded: any = await verifyJWT(token); userId = decoded.id } catch { return NextResponse.json({ error: 'Invalid token' }, { status: 401 }) }
  const { title, message, type } = await req.json()
  const id = uuidv4()
  const stmt = db.prepare('INSERT INTO notifications (id, userId, title, message, type) VALUES (?, ?, ?, ?, ?)')
  stmt.run(id, userId, title, message, type || 'info')
  return NextResponse.json({ id, userId, title, message, type, read: 0, createdAt: Date.now() })
}