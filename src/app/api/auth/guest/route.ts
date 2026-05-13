import { NextRequest, NextResponse } from 'next/server'
import { signJWT } from '@/lib/jwt'
import { createUser } from '@/lib/userHelpers'
import { v4 as uuidv4 } from 'uuid'

export async function POST() {
  try {
    const guestId = `guest_${uuidv4().slice(0,8)}`
    const user = createUser({ username: guestId, isGuest: true, role: 'guest', requestCount: 0, settings: { theme: 'dark', notifications: false } })
    const token = signJWT({ id: user.id, username: user.username, isGuest: true, role: 'guest', requestCount: 0 }, '24h')
    const res = NextResponse.json({ token, user })
    res.cookies.set('token', token, { httpOnly: true, maxAge: 24*60*60 })
    return res
  } catch { return NextResponse.json({ message: 'Guest creation failed' }, { status: 500 }) }
}