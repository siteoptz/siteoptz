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
     * Only match compare pages with /vs/ in the path
     * This prevents the middleware from running on other pages
     */
    '/compare/:path*/vs/:path*',
  ],
};