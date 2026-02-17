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
      'siteoptz.com',
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

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Development server optimizations to prevent infinite reload loops  
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 1000, // 60 seconds (increased from default 15s)
    // Number of pages that should be kept simultaneously without being disposed  
    pagesBufferLength: 5, // increased from default 2
  },

  // Webpack configuration to handle server-side modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fallback for Node.js modules in client-side code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    return config;
  },


  // Subdomain routing now handled in middleware.ts

  // Optimized redirects using pattern matching
  // Reduces thousands of individual redirects to just a few patterns
  async redirects() {
    return [
      // Podcast transcript .txt redirects - redirect to actual pages without .txt extension
      {
        source: '/podcasts/transcripts/marketing-automation-ai-tools.txt',
        destination: '/podcasts/transcripts/marketing-automation-ai-tools',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/podcasts/transcripts/chatgpt-enterprise-workflows.txt',
        destination: '/podcasts/transcripts/chatgpt-enterprise-workflows',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/podcasts/transcripts/ai-sales-process-automation.txt',
        destination: '/podcasts/transcripts/ai-sales-process-automation',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/podcasts/transcripts/ai-healthcare-workflow-automation.txt',
        destination: '/podcasts/transcripts/ai-healthcare-workflow-automation',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/podcasts/transcripts/claude-vs-gpt-enterprise-comparison.txt',
        destination: '/podcasts/transcripts/claude-vs-gpt-enterprise-comparison',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/podcasts/transcripts/ai-automation-revolution-2024.txt',
        destination: '/podcasts/transcripts/ai-automation-revolution-2024',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/podcasts/transcripts/ai-hr-recruitment-automation.txt',
        destination: '/podcasts/transcripts/ai-hr-recruitment-automation',
        permanent: true,
        statusCode: 301,
      },
      {
        source: '/podcasts/transcripts/ai-ecommerce-personalization.txt',
        destination: '/podcasts/transcripts/ai-ecommerce-personalization',
        permanent: true,
        statusCode: 301,
      },
      // Pricing page redirect to upgrade page
      {
        source: '/pricing',
        destination: '/upgrade',
        permanent: true,
        statusCode: 301,
      },
      // Specific category redirects
      {
        source: '/categories/best-voice-ai-tools',
        destination: '/categories/voice-ai',
        permanent: true,
        statusCode: 301,
      },
      // SEO-OPTIMIZED REDIRECTS: Smart redirects that preserve functionality while improving SEO
      // Instead of killing pages, we redirect invalid/broken URLs to valid alternatives
      
      // Only redirect invalid category paths, not valid ones
      {
        source: '/categories/ai-automation',
        destination: '/categories',
        permanent: false, // Temporary redirect to preserve link juice
        statusCode: 302,
      },
      {
        source: '/categories/code-generation', 
        destination: '/categories',
        permanent: false,
        statusCode: 302,
      },
      // Keep comparison pages ACTIVE - only redirect broken comparison URLs to compare index
      {
        source: '/compare/invalid-:tool1/vs/invalid-:tool2',
        destination: '/compare',
        permanent: false,
        statusCode: 302,
      },
      // Tools with trailing slash
      {
        source: '/tools/',
        destination: '/tools',
        permanent: true,
        statusCode: 301,
      }
    ];
  },
  };

module.exports = nextConfig;