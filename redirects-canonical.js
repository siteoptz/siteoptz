/**
 * Canonical URL Redirect Configuration
 * Ensures all URLs redirect to their canonical versions
 */

module.exports = [
  // Note: Vercel is redirecting siteoptz.ai → www.siteoptz.ai at DNS level
  // So we align with that and use www.siteoptz.ai as canonical domain
  // No redirect needed here since Vercel handles non-www → www
  
  // Redirect tool category query parameters to category pages
  {
    source: '/tools',
    has: [
      {
        type: 'query',
        key: 'category',
        value: '(?<category>.*)',
      },
    ],
    destination: '/categories/:category',
    permanent: true,
  },
  
  // Redirect /tools/{slug} to /reviews/{slug} for individual tools
  {
    source: '/tools/:slug',
    destination: '/reviews/:slug',
    permanent: true,
  },
  
  // Keep ROI calculators and comparison tools in /tools/
  {
    source: '/tools/ai-roi-calculator',
    destination: '/tools/ai-roi-calculator',
    permanent: false,
  },
  {
    source: '/tools/marketing-roi-calculator',
    destination: '/tools/marketing-roi-calculator',
    permanent: false,
  },
  {
    source: '/tools/chatbot-roi-calculator',
    destination: '/tools/chatbot-roi-calculator',
    permanent: false,
  },
  {
    source: '/tools/content-roi-calculator',
    destination: '/tools/content-roi-calculator',
    permanent: false,
  },
  {
    source: '/tools/sales-ai-roi',
    destination: '/tools/sales-ai-roi',
    permanent: false,
  },
  {
    source: '/tools/healthcare-ai-roi',
    destination: '/tools/healthcare-ai-roi',
    permanent: false,
  },
  {
    source: '/tools/manufacturing-roi-calculator',
    destination: '/tools/manufacturing-roi-calculator',
    permanent: false,
  },
  {
    source: '/tools/recruitment-roi-calculator',
    destination: '/tools/recruitment-roi-calculator',
    permanent: false,
  },
  {
    source: '/tools/security-roi-calculator',
    destination: '/tools/security-roi-calculator',
    permanent: false,
  },
  {
    source: '/tools/no-code-ai-roi',
    destination: '/tools/no-code-ai-roi',
    permanent: false,
  },
  {
    source: '/tools/enterprise-ai-calculator',
    destination: '/tools/enterprise-ai-calculator',
    permanent: false,
  },
  {
    source: '/tools/conversion-roi-calculator',
    destination: '/tools/conversion-roi-calculator',
    permanent: false,
  },
  {
    source: '/tools/ai-cost-calculator',
    destination: '/tools/ai-cost-calculator',
    permanent: false,
  },
  {
    source: '/tools/compare',
    destination: '/tools/compare',
    permanent: false,
  },
  {
    source: '/tools/comprehensive-comparison',
    destination: '/tools/comprehensive-comparison',
    permanent: false,
  },
  
  // Redirect comparison URLs to proper format
  {
    source: '/compare/:tool1/vs/:tool2',
    destination: '/compare/:tool1-vs-:tool2',
    permanent: true,
  },
  
  // Category redirects for URL-encoded category names
  {
    source: '/categories/seo-optimization',
    destination: '/categories/seo-optimization',
    permanent: false,
  },
  {
    source: '/categories/paid-search-ppc',
    destination: '/categories/paid-search-ppc',
    permanent: false,
  },
  {
    source: '/categories/ai-automation',
    destination: '/categories/ai-automation',
    permanent: false,
  },
  
  // Industry page redirects
  {
    source: '/industries/retail-ecommerce',
    destination: '/industries/retail-e-commerce',
    permanent: true,
  }
];