import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC = ['/login', '/api/auth/login']

function secret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || 'serverkit-dev-secret-please-change-in-production'
  )
}

export async function middleware(req) {
  const { pathname } = req.nextUrl

  if (PUBLIC.some(p => pathname.startsWith(p))) return NextResponse.next()

  const token = req.cookies.get('sk_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    await jwtVerify(token, secret())
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
