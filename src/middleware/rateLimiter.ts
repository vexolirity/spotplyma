import { NextRequest, NextResponse } from 'next/server'
const map = new Map()
export function rateLimiter(req: NextRequest, limit=20, windowMs=60000) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  const record = map.get(ip)
  if (!record || now > record.resetTime) { map.set(ip, { count:1, resetTime: now+windowMs }); return null }
  if (record.count >= limit) return new NextResponse('Too Many Requests', { status: 429 })
  record.count++; map.set(ip, record); return null
}