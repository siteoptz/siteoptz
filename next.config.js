/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  
  // Pick one style and link to it everywhere to avoid slash-normalization redirects
  trailingSlash: false,           // be consistent
  
  // Remove if not using locales to avoid auto locale redirects
  i18n: undefined,                // no automatic locale detection
  
  // Avoid root → basePath redirects unless needed
  basePath: undefined,
  
  // Image optimization settings
  images: {
    unoptimized: false, // Enable optimization
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'siteoptz.ai',
      'www.siteoptz.ai',
      'upload.wikimedia.org',
      'cdn.openai.com',
      'assets.claude.ai',
      'images.unsplash.com',
      'logo.clearbit.com',
      'www.jasper.ai',
      'copy.ai',
      'writesonic.com',
      'app.gamma.ai',
      'notion.so'
    ]
  },
  
  // SEO and performance optimizations
  generateEtags: true,
  poweredByHeader: false,
  
  // Headers for SEO and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/data/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400', // 24 hours
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, s-maxage=2592000', // 30 days
          },
          {
            key: 'Accept-CH',
            value: 'DPR, Viewport-Width, Width',
          },
        ],
      },
      {
        source: '/(.*).webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // 24 hours
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600', // 1 hour
          },
        ],
      },
      {
        source: '/sitemap-:type.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600', // 1 hour
          },
        ],
      },
    ];
  },

  // Redirects for fixing 404 errors
  async redirects() {
    return [
      // WWW to non-WWW redirects to prevent duplicate content
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.siteoptz.ai',
          },
        ],
        destination: 'https://siteoptz.ai/:path*',
        permanent: true,
      },
      // Category URL fix - typo/variant
      {
        source: '/categories/voice-ai-tools',
        destination: '/categories/best-voice-ai-tools',
        permanent: true,
      },
      // Podcast transcript redirects - asset fix (redirect .txt to .tsx pages)
      {
        source: '/podcasts/transcripts/ai-automation-revolution-2024.txt',
        destination: '/podcasts/transcripts/ai-automation-revolution-2024',
        permanent: true,
      },
      {
        source: '/podcasts/transcripts/ai-ecommerce-personalization.txt',
        destination: '/podcasts/transcripts/ai-ecommerce-personalization',
        permanent: true,
      },
      {
        source: '/podcasts/transcripts/ai-healthcare-workflow-automation.txt',
        destination: '/podcasts/transcripts/ai-healthcare-workflow-automation',
        permanent: true,
      },
      {
        source: '/podcasts/transcripts/ai-hr-recruitment-automation.txt',
        destination: '/podcasts/transcripts/ai-hr-recruitment-automation',
        permanent: true,
      },
      {
        source: '/podcasts/transcripts/ai-sales-process-automation.txt',
        destination: '/podcasts/transcripts/ai-sales-process-automation',
        permanent: true,
      },
      {
        source: '/podcasts/transcripts/chatgpt-enterprise-workflows.txt',
        destination: '/podcasts/transcripts/chatgpt-enterprise-workflows',
        permanent: true,
      },
      {
        source: '/podcasts/transcripts/claude-vs-gpt-enterprise-comparison.txt',
        destination: '/podcasts/transcripts/claude-vs-gpt-enterprise-comparison',
        permanent: true,
      },
      {
        source: '/podcasts/transcripts/marketing-automation-ai-tools.txt',
        destination: '/podcasts/transcripts/marketing-automation-ai-tools',
        permanent: true,
      }
    ];
  },
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
};

module.exports = nextConfig;