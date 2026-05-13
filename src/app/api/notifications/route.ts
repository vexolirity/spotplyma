import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/jwt'
import { getNotifications, addNotification, markNotificationRead, markAllNotificationsRead } from '@/lib/userHelpers'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const decoded: any = await verifyJWT(token)
    const notifs = getNotifications(decoded.id)
    return NextResponse.json(notifs)
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const decoded: any = await verifyJWT(token)
    const { title, message, type } = await req.json()
    addNotification(decoded.id, { title, message, type: type || 'info' })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const decoded: any = await verifyJWT(token)
    const { searchParams } = new URL(req.url)
    const notifId = searchParams.get('id')
    const action = searchParams.get('action')
    
    if (action === 'read-all') {
      markAllNotificationsRead(decoded.id)
    } else if (notifId) {
      markNotificationRead(decoded.id, notifId)
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
