import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;
  
  console.log('Middleware: Request from', hostname, 'to', url.pathname);
  
  // CRITICAL: If request is to optz.siteoptz.ai, redirect to siteoptz.ai
  if (hostname.includes('optz.siteoptz.ai')) {
    console.log('REDIRECT: optz.siteoptz.ai -> siteoptz.ai');
    const newUrl = new URL(url.pathname + url.search, 'https://siteoptz.ai');
    return NextResponse.redirect(newUrl);
  }
  
  // Handle dashboard routes
  if (url.pathname.startsWith('/dashboard')) {
    console.log('Middleware: Dashboard route detected');
    
    // Check for authentication
    const hasSession = request.cookies.get('next-auth.session-token') || 
                      request.cookies.get('__Secure-next-auth.session-token') ||
                      request.cookies.get('siteoptz_user');
    
    if (!hasSession && url.pathname === '/dashboard') {
      console.log('Middleware: No session, redirecting to login');
      return NextResponse.redirect(new URL('/#login', request.url));
    }
    
    // Allow the request to continue
    return NextResponse.next();
  }
  
  // For all other routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes we want to exclude
    '/((?!_next/static|_next/image|favicon.ico|api/auth/login|api/auth/register).*)',
  ],
};