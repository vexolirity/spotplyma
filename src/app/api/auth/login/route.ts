import { NextRequest, NextResponse } from 'next/server'
import { signJWT } from '@/lib/jwt'
import { findUserByUsername } from '@/lib/userHelpers'

export async function POST(req: NextRequest) {
  try {
    const { username, password, remember } = await req.json()
    
    // Hardcoded demo user
    if (username === 'yamaxiar' && password === 'yama123') {
      const token = signJWT({ 
        id: 'demo_user', 
        username, 
        role: 'premium', 
        isGuest: false, 
        requestCount: 0 
      }, remember ? '30d' : '7d')
      
      const res = NextResponse.json({ 
        token, 
        user: { 
          id: 'demo_user', 
          username, 
          isGuest: false, 
          role: 'premium', 
          requestCount: 0 
        } 
      })
      res.cookies.set('token', token, { httpOnly: true, maxAge: remember ? 30*24*60*60 : 7*24*60*60 })
      return res
    }

    const user = findUserByUsername(username)
    if (!user || user.isGuest) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }
    
    // Simple password check (in-memory)
    if (password !== user.password && user.password !== null) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }
    
    const token = signJWT({ 
      id: user.id, 
      username, 
      role: user.role, 
      isGuest: false 
    }, remember ? '30d' : '7d')
    
    const res = NextResponse.json({ token, user: { ...user, password: undefined } })
    res.cookies.set('token', token, { httpOnly: true })
    return res
  } catch (error) {
    console.error('[LOGIN_ERROR]', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
