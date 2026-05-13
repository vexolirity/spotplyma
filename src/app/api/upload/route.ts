import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { verifyJWT } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try { await verifyJWT(token) } catch { return NextResponse.json({ error: 'Invalid token' }, { status: 401 }) }
  const formData = await req.formData()
  const file = formData.get('image') as File
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const uploadDir = path.join(process.cwd(), 'public/uploads')
  await mkdir(uploadDir, { recursive: true })
  const filename = `${uuidv4()}-${file.name}`
  await writeFile(path.join(uploadDir, filename), buffer)
  return NextResponse.json({ url: `/uploads/${filename}` })
}