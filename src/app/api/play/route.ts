import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')
  if (!q) return NextResponse.json({ error: 'Query required' }, { status: 400 })
  try {
    const res = await axios.get(`${process.env.NEOXR_API_BASE}/play?q=${encodeURIComponent(q)}&apikey=${process.env.NEOXR_API_KEY}`)
    return NextResponse.json(res.data)
  } catch { return NextResponse.json({ error: 'Play API failed' }, { status: 500 }) }
}