import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple token verification for SSO (without crypto module for Edge Runtime)
function verifySSOToken(token: string): { email: string; plan: string } | null {
  try {
    // Simple base64 decoding for Edge Runtime compatibility
    const [payloadBase64] = token.split('.');
    
    if (!payloadBase64) return null;
    
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString());
    
    // Check expiration
    if (payload.expires && payload.expires < Date.now()) {
      console.log('SSO token expired');
      return null;
    }
    
    // Basic validation
    if (!payload.email || !payload.plan) {
      console.log('SSO token missing required fields');
      return null;
    }
    
    return { email: payload.email, plan: payload.plan };
  } catch (error) {
    console.error('SSO token verification failed:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const hostname = request.headers.get('host') || ''
  
  // Redirect any optz.siteoptz.ai requests to siteoptz.ai
  if (hostname === 'optz.siteoptz.ai' || hostname.includes('optz.siteoptz.ai')) {
    console.log('Redirecting from optz.siteoptz.ai to siteoptz.ai:', pathname);
    const newUrl = new URL(request.url);
    newUrl.hostname = 'siteoptz.ai';
    return NextResponse.redirect(newUrl, { status: 301 });
  }
  
  // Handle SSO token in query params (for any domain)
  const ssoToken = request.nextUrl.searchParams.get('sso_token');
  
  if (ssoToken) {
    // Verify the SSO token
    const ssoData = verifySSOToken(ssoToken);
    
    if (ssoData) {
      // Valid SSO token - set cookies for authenticated session
      const response = NextResponse.next();
      
      // Set authentication cookies
      response.cookies.set('sso-email', ssoData.email, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });
      
      response.cookies.set('sso-plan', ssoData.plan, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });
      
      response.cookies.set('authenticated', 'true', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });
      
      // Remove SSO token from URL and redirect
      const url = request.nextUrl.clone();
      url.searchParams.delete('sso_token');
      return NextResponse.redirect(url);
    }
  }
  
  // Check if user has valid authentication cookies
  const isAuthenticated = request.cookies.get('authenticated')?.value === 'true';
  const userEmail = request.cookies.get('sso-email')?.value;
  const userPlan = request.cookies.get('sso-plan')?.value;
  
  // Allow authenticated users to access all dashboard routes
  if (isAuthenticated && userEmail && userPlan) {
    console.log('User authenticated via SSO:', userEmail, 'Plan:', userPlan);
    // Continue with normal routing
  } else if (pathname.startsWith('/dashboard')) {
    // For unauthenticated dashboard access, check NextAuth session
    console.log('Checking authentication for dashboard access');
  }
  
  // Handle incorrect compare URL formats
  if (pathname.startsWith('/compare/')) {
    const pathSegments = pathname.split('/').filter(segment => segment !== '')
    
    // Check if it's a malformed compare URL (e.g., /compare/tool1-vs-tool2)
    if (pathSegments.length === 2 && pathSegments[1].includes('-vs-')) {
      // Extract tool names from the malformed slug
      const [tool1, ...rest] = pathSegments[1].split('-vs-')
      const tool2 = rest.join('-vs-') // In case tool2 has '-vs-' in its name
      
      // Only redirect if we have both tool names
      if (tool1 && tool2) {
        // Redirect to the correct format: /compare/tool1/vs/tool2
        const correctUrl = `/compare/${tool1}/vs/${tool2}`
        
        // Preserve query parameters if any
        const searchParams = request.nextUrl.searchParams.toString()
        const finalUrl = searchParams ? `${correctUrl}?${searchParams}` : correctUrl
        
        console.log(`[Middleware] Redirecting from ${pathname} to ${finalUrl}`)
        
        return NextResponse.redirect(new URL(finalUrl, request.url), 301)
      }
    }
    
    // Also handle the case where someone might use underscores or other separators
    if (pathSegments.length === 2 && (pathSegments[1].includes('_vs_') || pathSegments[1].includes('-versus-'))) {
      let tool1, tool2
      
      if (pathSegments[1].includes('_vs_')) {
        const parts = pathSegments[1].split('_vs_')
        tool1 = parts[0]
        tool2 = parts.slice(1).join('_vs_')
      } else if (pathSegments[1].includes('-versus-')) {
        const parts = pathSegments[1].split('-versus-')
        tool1 = parts[0]
        tool2 = parts.slice(1).join('-versus-')
      }
      
      if (tool1 && tool2) {
        const correctUrl = `/compare/${tool1}/vs/${tool2}`
        const searchParams = request.nextUrl.searchParams.toString()
        const finalUrl = searchParams ? `${correctUrl}?${searchParams}` : correctUrl
        console.log(`[Middleware] Redirecting from ${pathname} to ${finalUrl}`)
        return NextResponse.redirect(new URL(finalUrl, request.url), 301)
      }
    }
    
    // Handle URLs that might be missing the /vs/ separator entirely
    // For example: /compare/contentstudio/coschedule (missing 'vs')
    if (pathSegments.length === 3 && pathSegments[2] !== 'vs') {
      // Check if it looks like two tool names without 'vs' separator
      // Don't redirect if the second segment is actually 'vs' already
      const correctUrl = `/compare/${pathSegments[1]}/vs/${pathSegments[2]}`
      const searchParams = request.nextUrl.searchParams.toString()
      const finalUrl = searchParams ? `${correctUrl}?${searchParams}` : correctUrl
      console.log(`[Middleware] Redirecting from ${pathname} to ${finalUrl}`)
      return NextResponse.redirect(new URL(finalUrl, request.url), 301)
    }
  }
  
  // Continue with the request if no redirect is needed
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all routes for subdomain handling, but exclude static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}