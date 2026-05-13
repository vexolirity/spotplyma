import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from './src/lib/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return NextResponse.next()
  }
  const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.replace('Bearer ', '')
  const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/settings')
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (token && isProtected) {
    try {
      await verifyJWT(token)
      return NextResponse.next()
    } catch {
      const res = NextResponse.redirect(new URL('/login', request.url))
      res.cookies.delete('token')
      return res
    }
  }
  return NextResponse.next()
}
export const config = { matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*', '/api/:path*'] }