import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })
  try {
    const res = await axios.get(`${process.env.NEOXR_API_BASE}/aio?url=${encodeURIComponent(url)}&apikey=${process.env.NEOXR_API_KEY}`)
    return NextResponse.json(res.data)
  } catch { return NextResponse.json({ error: 'Auto detect failed' }, { status: 500 }) }
}