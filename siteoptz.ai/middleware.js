import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  
  console.log('Middleware: Processing request to', url.pathname);
  
  // CRITICAL: Block any redirect to optz.siteoptz.ai
  // Check if the response is trying to redirect to optz.siteoptz.ai
  const response = NextResponse.next();
  
  // If this is a dashboard route, ensure it stays on siteoptz.ai
  if (url.pathname.startsWith('/dashboard')) {
    console.log('Middleware: Dashboard route detected, ensuring it stays on siteoptz.ai');
    
    // If user is not authenticated (no session cookie), redirect to login
    // Otherwise, let the dashboard page handle the routing
    const hasSession = request.cookies.get('next-auth.session-token') || 
                      request.cookies.get('__Secure-next-auth.session-token') ||
                      request.cookies.get('siteoptz_user');
    
    if (!hasSession && url.pathname === '/dashboard') {
      console.log('Middleware: No session, redirecting to login');
      return NextResponse.redirect(new URL('/#login', request.url));
    }
    
    // Allow the request to continue to our dashboard page
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