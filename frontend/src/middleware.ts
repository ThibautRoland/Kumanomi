// https://nextjs.org/docs/app/building-your-application/authentication

import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {

  const tokenFromClientRequest = request.cookies.get('token')?.value
  console.log("tokenFromClientRequest" ,tokenFromClientRequest)

  if (tokenFromClientRequest && !request.nextUrl.pathname.startsWith('/dashboard')) {
    cookies().set('token', 'lee', { secure: true })
    return Response.redirect(new URL('/dashboard', request.url))
  }

  if (!tokenFromClientRequest && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}