import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
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
    // Only match compare routes - remove the broad matcher that was affecting other pages
    '/compare/:path*',
  ]
}