import { NextRequest, NextResponse } from 'next/server'
import { signJWT } from '@/lib/jwt'
import { createUser, findUserByUsername } from '@/lib/userHelpers'

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json()
    
    if (!username || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }
    
    if (findUserByUsername(username)) {
      return NextResponse.json({ message: 'Username taken' }, { status: 400 })
    }
    
    const newUser = createUser({
      username,
      email: email || null,
      password: password, // in-memory, no hash for simplicity
      isGuest: false,
      role: 'user',
      requestCount: 0,
      settings: { theme: 'dark', notifications: true }
    })
    
    const token = signJWT({ 
      id: newUser.id, 
      username, 
      role: 'user', 
      isGuest: false, 
      requestCount: 0 
    }, '7d')
    
    return NextResponse.json({ token, user: newUser })
  } catch (error) {
    console.error('[REGISTER_ERROR]', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
