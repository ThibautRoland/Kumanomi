import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {
  const tokenFromClientRequest = request.cookies.get('token')?.value
  if (!tokenFromClientRequest && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}