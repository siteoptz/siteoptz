/** @type {import('next').NextConfig} */
// Disabled: Using comprehensive Vercel redirects instead to avoid conflicts
// const redirects404Fix = require('./redirects-404-fix');
// const canonicalRedirects = require('./redirects-canonical');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  
  // Enable static site generation for better SEO and performance
  trailingSlash: false,
  
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

  // Minimal Next.js redirects - main redirects handled by vercel.json
  async redirects() {
    return [
      // Only keep essential redirects that aren't covered by Vercel config
      {
        source: '/ai-tools',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/ai-tools/:slug',
        destination: '/tools/:slug',
        permanent: true,
      },
      {
        source: '/comparison/:tool1-vs-:tool2',
        destination: '/compare/:tool1-vs-:tool2',
        permanent: true,
      },
      {
        source: '/tools-comparison',
        destination: '/compare',
        permanent: true,
      },
      {
        source: '/ai-tools-comparison',
        destination: '/compare',
        permanent: true,
      },
    ];
  },
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
};

module.exports = nextConfig;