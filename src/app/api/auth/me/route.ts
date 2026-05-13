import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT, signJWT } from '@/lib/jwt'
import { findUserById, updateUser } from '@/lib/userHelpers'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value || req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const decoded: any = await verifyJWT(token)
    if (decoded.isGuest) {
      return NextResponse.json({ 
        id: decoded.id, 
        username: decoded.username, 
        isGuest: true, 
        role: 'guest', 
        requestCount: 0 
      })
    }
    
    const user = findUserById(decoded.id)
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const decoded: any = await verifyJWT(token)
    if (decoded.isGuest) {
      return NextResponse.json({ message: 'Guest cannot update' }, { status: 403 })
    }
    
    const updates = await req.json()
    const updated = updateUser(decoded.id, updates)
    
    if (!updated) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    
    const newToken = signJWT({ ...updated }, '7d')
    const res = NextResponse.json(updated)
    res.cookies.set('token', newToken, { httpOnly: true })
    return res
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}
