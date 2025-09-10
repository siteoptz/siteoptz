import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle compare page redirects (too many for vercel.json)
  if (pathname.startsWith('/compare/') && pathname.includes('/vs/')) {
    return NextResponse.redirect(new URL('/tools', request.url), 301);
  }
  
  // Let other requests pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\..*|tools).*)',
  ],
};