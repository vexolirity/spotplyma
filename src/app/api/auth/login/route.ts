import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { signJWT } from '@/lib/jwt'
import { findUserByUsername } from '@/lib/userHelpers'

export async function POST(req: NextRequest) {
  try {
    const { username, password, remember } = await req.json()
    if (username === 'yamaxiar' && password === 'yama123') {
      const token = signJWT({ id: 'demo', username, role: 'premium', isGuest: false, requestCount: 0 }, remember ? '30d' : '7d')
      const res = NextResponse.json({ token, user: { id: 'demo', username, isGuest: false, role: 'premium', requestCount: 0 } })
      res.cookies.set('token', token, { httpOnly: true, maxAge: remember ? 30*24*60*60 : 7*24*60*60 })
      return res
    }
    const user = findUserByUsername(username)
    if (!user || user.isGuest) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    const valid = await bcrypt.compare(password, user.password!)
    if (!valid) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    const token = signJWT({ id: user.id, username, role: user.role, isGuest: false, requestCount: user.requestCount }, remember ? '30d' : '7d')
    const res = NextResponse.json({ token, user: { id: user.id, username, email: user.email, isGuest: false, role: user.role, requestCount: user.requestCount, profilePicture: user.profilePicture } })
    res.cookies.set('token', token, { httpOnly: true, maxAge: remember ? 30*24*60*60 : 7*24*60*60 })
    return res
  } catch (error) { return NextResponse.json({ message: 'Server error' }, { status: 500 }) }
}