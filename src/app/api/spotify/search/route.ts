import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')
  if (!q) return NextResponse.json({ error: 'Query required' }, { status: 400 })
  try {
    const res = await axios.get(`${process.env.NEOXR_API_BASE}/spotify-search?q=${encodeURIComponent(q)}&apikey=${process.env.NEOXR_API_KEY}`)
    const tracks = (res.data || []).map((t: any) => ({ id: t.id || Math.random().toString(), title: t.title, artist: t.artist || 'Unknown', thumbnail: t.thumbnail, duration: t.duration, popularity: t.popularity, url: t.url }))
    return NextResponse.json(tracks)
  } catch { return NextResponse.json({ error: 'Spotify API failed' }, { status: 500 }) }
}