/** @type {import('next').NextConfig} */
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
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
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
      // Redirect duplicate comparison pages
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
      
      // Legacy/invalid URL redirects
      {
        source: '/sample-page',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/sample-page/',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/',
        permanent: true,
      },
      {
        source: '/feed/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/:path*',
        destination: '/categories/:path*',
        permanent: true,
      },
      {
        source: '/author/:path*',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:path*',
        destination: '/blog',
        permanent: true,
      },
      
      // Fix comparison URL formats (claude-vs-gemini → claude/vs/gemini)
      {
        source: '/compare/claude-vs-gemini',
        destination: '/compare/claude/vs/gemini',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-vs-claude',
        destination: '/compare/chatgpt/vs/claude',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-vs-gemini',
        destination: '/compare/chatgpt/vs/gemini',
        permanent: true,
      },
      {
        source: '/compare/jasper-ai-vs-copy-ai',
        destination: '/compare/jasper-ai/vs/copy-ai',
        permanent: true,
      },
      {
        source: '/compare/:tool1-vs-:tool2',
        destination: '/compare/:tool1/vs/:tool2',
        permanent: true,
      },
      
      // Tool name variations
      {
        source: '/tools/hugging-face',
        destination: '/tools/huggingface-transformers',
        permanent: true,
      },
      {
        source: '/tools/leonardo.ai',
        destination: '/tools/leonardo-ai',
        permanent: true,
      },
      {
        source: '/tools/perplexity',
        destination: '/tools/perplexity-ai',
        permanent: true,
      },
      {
        source: '/tools/cohere',
        destination: '/tools/cohere-ai',
        permanent: true,
      },
      {
        source: '/tools/adcreative.ai',
        destination: '/tools/adcreative-ai',
        permanent: true,
      },
      {
        source: '/tools/reclaim.ai',
        destination: '/tools/reclaim-ai',
        permanent: true,
      },
      {
        source: '/tools/character.ai',
        destination: '/tools/anthropic-claude',
        permanent: true,
      },
      {
        source: '/tools/stable-diffusion-web',
        destination: '/tools/stable-diffusion',
        permanent: true,
      },
      {
        source: '/tools/gpt-4',
        destination: '/tools/openai-gpt4',
        permanent: true,
      },
      {
        source: '/tools/replicate',
        destination: '/tools/replicate-ai',
        permanent: true,
      },
      {
        source: '/tools/play.ht',
        destination: '/tools/play-ht',
        permanent: true,
      },
      {
        source: '/tools/copy.ai',
        destination: '/tools/copy-ai',
        permanent: true,
      },
      
      // Invalid paths redirects
      {
        source: '/comparisons',
        destination: '/compare',
        permanent: true,
      },
      
      // Category name corrections
      {
        source: '/categories/voice-ai-tools',
        destination: '/categories/best-voice-ai-tools',
        permanent: true,
      },
      {
        source: '/categories/voice-ai-tools/',
        destination: '/categories/best-voice-ai-tools',
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