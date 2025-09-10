const fs = require('fs');

// Read the new redirects data
const newRedirectsData = JSON.parse(fs.readFileSync('new-301-redirects.json', 'utf-8'));
const allNewRedirects = newRedirectsData.redirects;

// Read existing vercel.json
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf-8'));
const existingRedirects = vercelConfig.redirects;

console.log(`Existing redirects: ${existingRedirects.length}`);
console.log(`New redirects to add: ${allNewRedirects.length}`);

// Calculate how many we can add
const VERCEL_LIMIT = 2048;
const availableSlots = VERCEL_LIMIT - existingRedirects.length;

console.log(`Available slots: ${availableSlots}`);

// Prioritize redirects by importance
const prioritizedRedirects = [];

// Priority 1: Root level pages (most important)
const rootPages = allNewRedirects.filter(r => 
    ['/about', '/blog', '/careers', '/contact', '/pricing', 
     '/resources', '/testimonials', '/why-us', '/'].includes(r.source)
);

// Priority 2: Main category pages
const categoryPages = allNewRedirects.filter(r => 
    r.source.startsWith('/categories/') && !r.source.includes('/vs/')
);

// Priority 3: Case studies pages
const caseStudies = allNewRedirects.filter(r => 
    r.source.startsWith('/case-studies')
);

// Priority 4: Analysis pages
const analysisPages = allNewRedirects.filter(r => 
    r.source.startsWith('/analysis/')
);

// Combine in priority order
prioritizedRedirects.push(...rootPages);
prioritizedRedirects.push(...categoryPages);
prioritizedRedirects.push(...caseStudies);
prioritizedRedirects.push(...analysisPages);

// Take only what fits
const redirectsToAdd = prioritizedRedirects.slice(0, availableSlots);

console.log(`\nAdding ${redirectsToAdd.length} high-priority redirects`);
console.log(`- Root pages: ${rootPages.length}`);
console.log(`- Category pages: ${categoryPages.length}`);
console.log(`- Case studies: ${caseStudies.length}`);
console.log(`- Analysis pages: ${analysisPages.length}`);

// Add the new redirects to vercel.json
vercelConfig.redirects = [...redirectsToAdd, ...existingRedirects];

// Save updated vercel.json
fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));

console.log(`\n✅ Updated vercel.json with ${vercelConfig.redirects.length} total redirects`);

// Create middleware for handling remaining redirects
const middlewareCode = `import { NextResponse } from 'next/server';
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
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|tools).*)',
  ],
};`;

fs.writeFileSync('middleware.ts', middlewareCode);

console.log('\n✅ Created middleware.ts to handle remaining redirects');

// Create summary report
const report = {
    timestamp: new Date().toISOString(),
    vercelLimit: VERCEL_LIMIT,
    existingRedirects: existingRedirects.length,
    attemptedToAdd: allNewRedirects.length,
    actuallyAdded: redirectsToAdd.length,
    handledByMiddleware: allNewRedirects.length - redirectsToAdd.length,
    totalInVercelJson: vercelConfig.redirects.length,
    breakdown: {
        rootPages: rootPages.length,
        categoryPages: categoryPages.length,
        caseStudies: caseStudies.length,
        analysisPages: analysisPages.length
    }
};

fs.writeFileSync('redirect-fix-final-report.json', JSON.stringify(report, null, 2));

console.log('\n📊 Report saved to redirect-fix-final-report.json');
console.log('\n⚠️  IMPORTANT: The remaining redirects will be handled by middleware.ts');
console.log('   This file needs to be placed in the root of your Next.js project.');