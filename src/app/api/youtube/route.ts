import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  const type = req.nextUrl.searchParams.get('type') || 'audio'
  const quality = req.nextUrl.searchParams.get('quality') || '128kbps'
  const q = req.nextUrl.searchParams.get('q')
  try {
    let apiUrl = `${process.env.NEOXR_API_BASE}/youtube?`
    if (url) apiUrl += `url=${encodeURIComponent(url)}&type=${type}&quality=${quality}&apikey=${process.env.NEOXR_API_KEY}`
    else if (q) {
      const searchRes = await axios.get(`${process.env.NEOXR_API_BASE}/play?q=${encodeURIComponent(q)}&apikey=${process.env.NEOXR_API_KEY}`)
      const videoId = searchRes.data.id
      apiUrl = `${process.env.NEOXR_API_BASE}/youtube?url=https://youtube.com/watch?v=${videoId}&type=${type}&quality=${quality}&apikey=${process.env.NEOXR_API_KEY}`
    } else return NextResponse.json({ error: 'Missing url or query' }, { status: 400 })
    const response = await axios.get(apiUrl)
    return NextResponse.json(response.data)
  } catch { return NextResponse.json({ error: 'YouTube API failed' }, { status: 500 }) }
}