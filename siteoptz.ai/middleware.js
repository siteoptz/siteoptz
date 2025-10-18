import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the hostname of the request (e.g., optz.siteoptz.ai, siteoptz.ai)
  const hostname = request.headers.get('host') || '';
  
  // If the request is to optz.siteoptz.ai, redirect to siteoptz.ai
  if (hostname.startsWith('optz.siteoptz.ai')) {
    // Get the pathname and search params
    const url = request.nextUrl.clone();
    
    // Change the hostname to siteoptz.ai
    url.hostname = 'siteoptz.ai';
    url.protocol = 'https';
    url.port = '';
    
    // Redirect to the same path on siteoptz.ai
    return NextResponse.redirect(url);
  }
  
  // Continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};