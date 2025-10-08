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
  
  // Handle optz subdomain routing with SSO
  if (hostname === 'optz.siteoptz.ai') {
    console.log('Optz subdomain detected:', pathname);
    
    // Check for SSO token in query params
    const ssoToken = request.nextUrl.searchParams.get('sso_token');
    
    if (ssoToken) {
      // Verify the SSO token
      const ssoData = verifySSOToken(ssoToken);
      
      if (ssoData) {
        // Valid SSO token - set cookies for authenticated session
        const response = NextResponse.next();
        
        // Set authentication cookies
        response.cookies.set('optz-sso-email', ssoData.email, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 // 24 hours
        });
        
        response.cookies.set('optz-sso-plan', ssoData.plan, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 // 24 hours
        });
        
        response.cookies.set('optz-authenticated', 'true', {
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
    const isAuthenticated = request.cookies.get('optz-authenticated')?.value === 'true';
    const userEmail = request.cookies.get('optz-sso-email')?.value;
    const userPlan = request.cookies.get('optz-sso-plan')?.value;
    
    // Allow authenticated users to access all dashboard routes
    if (isAuthenticated && userEmail && userPlan) {
      console.log('User authenticated via SSO:', userEmail, 'Plan:', userPlan);
      // Continue with normal subdomain routing
    } else if (pathname.startsWith('/dashboard')) {
      // For unauthenticated dashboard access, redirect to main site
      console.log('Unauthenticated dashboard access, redirecting to main site');
      const mainSiteUrl = `https://siteoptz.ai${pathname}`;
      return NextResponse.redirect(mainSiteUrl);
    }
    
    // Handle root path
    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = '/optz';
      return NextResponse.rewrite(url);
    }
    
    // Handle auth routes
    if (pathname.startsWith('/auth/')) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace('/auth/', '/optz/auth/');
      console.log('Rewriting auth route:', pathname, '→', url.pathname);
      return NextResponse.rewrite(url);
    }
    
    // Handle dashboard routes
    if (pathname.startsWith('/dashboard')) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace('/dashboard', '/optz/dashboard');
      console.log('Rewriting dashboard route:', pathname, '→', url.pathname);
      return NextResponse.rewrite(url);
    }
    
    // Handle any other routes (except API and Next.js internal routes)
    if (!pathname.startsWith('/optz/') && !pathname.startsWith('/api/') && !pathname.startsWith('/_next/')) {
      const url = request.nextUrl.clone();
      url.pathname = '/optz' + pathname;
      console.log('Rewriting general route:', pathname, '→', url.pathname);
      return NextResponse.rewrite(url);
    }
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