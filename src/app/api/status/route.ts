import { NextRequest } from 'next/server'
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ timestamp: Date.now(), status: 'active', downloads: Math.floor(Math.random() * 100) })}\n\n`))
      }, 5000)
      req.signal.addEventListener('abort', () => clearInterval(interval))
    }
  })
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } })
}