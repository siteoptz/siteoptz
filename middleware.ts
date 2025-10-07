import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const hostname = request.headers.get('host') || ''
  
  // Handle optz subdomain routing
  if (hostname === 'optz.siteoptz.ai') {
    console.log('Optz subdomain detected:', pathname);
    
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