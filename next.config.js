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
      'siteoptz.ai',
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

  // Auto-generated redirects from siteoptz.ai_permanent_redirects_20250917.csv
  async redirects() {
    return [
      {
        source: '/categories/content-creation',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/categories/data-analysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/categories/paid-search-ppc',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/categories/email-marketing',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/categories/code-generation',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/categories/research-education',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/categories/seo-optimization',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/categories/video-generation',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/categories/productivity',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/categories/best-voice-ai-tools',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/categories/social-media',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/categories/image-generation',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/fintech-fraud-detection',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/healthplus-diagnostic-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/retailmax-inventory-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/logicorp-route-optimization',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/legaltech-contract-analysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/edutech-personalized-learning',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/growthlabs-content-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/datavision-analytics-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/manufacturex-predictive-maintenance',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper-ai/vs/surfer-seo',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/midjourney/vs/chatgpt',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copy-ai/vs/writesonic',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/claude/vs/gemini',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper-ai/vs/copy-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt/vs/jasper-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper-ai/vs/writesonic',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt/vs/gemini',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt/vs/perplexity-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt/vs/claude',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/ai-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/manufacturing-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/ai-content-creators',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/content-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/chatbot-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/ai-customer-service',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/security-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/ai-cybersecurity',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/data-science-roi',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/predictive-analytics',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/ecommerce-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/conversion-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/fintech-ai-roi',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/fintech-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/healthcare-ai-roi',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/healthcare-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/recruitment-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/hr-ai-success',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/smart-manufacturing',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/manufacturing-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/sales-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/sales-ai-roi',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/enterprise-ai-calculator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/fortune-500-chatgpt',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/ai-cost-calculator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/marketing-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/marketing-ai-success',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/no-code-ai-roi',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/case-studies/no-code-ai-wins',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/analysis/claude3-vs-gpt4',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/0cody/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/0cody/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/0cody/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/0cody/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/0cody/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/0cody/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/10web/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/10web/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/10web/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/10web/vs/adobe-firefly',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/10web/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/10web/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/11-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/11-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/11-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/11-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/11-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/11-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/37x/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/37x/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/37x/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/37x/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/37x/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/37x/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/6sense-aidriven-revenue-growth-optimization/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/6sense-aidriven-revenue-growth-optimization/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/6sense-aidriven-revenue-growth-optimization/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/6sense-aidriven-revenue-growth-optimization/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/6sense-aidriven-revenue-growth-optimization/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/6sense-aidriven-revenue-growth-optimization/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/a0-dev/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/a0-dev/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/a0-dev/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/a0-dev/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/a0-dev/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/a0-dev/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/acquisio/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/acquisio/vs/adobe-firefly',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/acquisio/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/acquisio/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/acquisio/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/acquisio/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/actionflows/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/actionflows/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/actionflows/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/actionflows/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/actionflows/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/actionflows/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adalysis/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adalysis/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adalysis/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adalysis/vs/adobe-firefly',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adalysis/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adalysis/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adbeat/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adbeat/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adbeat/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adbeat/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adbeat/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adbeat/vs/adobe-firefly',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adcreative-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adcreative-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adcreative-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adcreative-ai/vs/adobe-firefly',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adcreative-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adcreative-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adespresso/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adespresso/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adespresso/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adespresso/vs/adobe-firefly',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adespresso/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adespresso/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adobe-firefly/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adobe-firefly/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adobe-firefly/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adobe-firefly/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adobe-firefly/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adobe-firefly/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adsdog/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adsdog/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adsdog/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adsdog/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adsdog/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adsdog/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adzooma/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adzooma/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adzooma/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adzooma/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adzooma/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/adzooma/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aerogram/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aerogram/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aerogram/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aerogram/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aerogram/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aerogram/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aftercare/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aftercare/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aftercare/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aftercare/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aftercare/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aftercare/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentdock/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentdock/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentdock/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentdock/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentdock/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentdock/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentpass-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentpass-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentpass-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentpass-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentpass-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentpass-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentvoice/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentvoice/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentvoice/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentvoice/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentvoice/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/agentvoice/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ahrefs-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-actions-by-zapier-gpt/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-actions-by-zapier-gpt/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-actions-by-zapier-gpt/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-actions-by-zapier-gpt/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-actions-by-zapier-gpt/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-actions-by-zapier-gpt/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-color-match/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-color-match/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-color-match/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-color-match/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-color-match/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-color-match/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-drive/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-drive/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-drive/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-drive/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-drive/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-drive/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-homedesign/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-homedesign/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-homedesign/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-homedesign/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-homedesign/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-homedesign/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-intime/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-intime/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-intime/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-intime/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-intime/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-intime/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-renamer/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-renamer/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-renamer/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-renamer/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-renamer/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-renamer/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-studios/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-studios/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-studios/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-studios/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-studios/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-studios/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-video-translator/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-video-translator/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-video-translator/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-video-translator/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-video-translator/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ai-video-translator/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aicosts-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aicosts-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aicosts-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aicosts-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aicosts-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aicosts-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aimdoc/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aimdoc/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aimdoc/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aimdoc/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aimdoc/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aimdoc/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/airops/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/airops/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/airops/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/airops/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/airops/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/airops/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aisoap/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aisoap/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aisoap/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aisoap/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aisoap/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aisoap/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alliai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alliai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alliai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alliai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alliai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alliai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alpha-sense/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alpha-sense/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alpha-sense/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alpha-sense/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alpha-sense/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/alpha-sense/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/altavize/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/altavize/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/altavize/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/altavize/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/altavize/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/altavize/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-alexa/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-alexa/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-alexa/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-alexa/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-alexa/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-alexa/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-codewhisperer/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-codewhisperer/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-codewhisperer/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-codewhisperer/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-codewhisperer/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amazon-codewhisperer/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amplifa/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amplifa/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amplifa/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amplifa/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amplifa/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/amplifa/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anchor-browser/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anchor-browser/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anchor-browser/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anchor-browser/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anchor-browser/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anchor-browser/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/answerly/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/answerly/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/answerly/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/answerly/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/answerly/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/answerly/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-chatgpt-alternative/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-chatgpt-alternative/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-chatgpt-alternative/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-chatgpt-alternative/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-chatgpt-alternative/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-chatgpt-alternative/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-claude/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-claude/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-claude/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-claude/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-claude/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anthropic-claude/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anything/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anything/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anything/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anything/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anything/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/anything/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aphra/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aphra/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aphra/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aphra/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aphra/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aphra/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apify/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apify/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apify/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apify/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apify/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apify/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apollo-io/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apollo-io/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apollo-io/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apollo-io/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apollo-io/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/apollo-io/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/appointwise/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/appointwise/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/appointwise/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/appointwise/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/appointwise/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/appointwise/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aptlystar-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aptlystar-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aptlystar-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aptlystar-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aptlystar-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aptlystar-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archigen/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archigen/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archigen/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archigen/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archigen/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archigen/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archive/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archive/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archive/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archive/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archive/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/archive/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/arcwise/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/arcwise/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/arcwise/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/arcwise/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/arcwise/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/arcwise/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/athenic-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/athenic-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/athenic-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/athenic-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/athenic-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/athenic-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/audiox/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/audiox/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/audiox/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/audiox/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/audiox/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/audiox/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auralis-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auralis-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auralis-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auralis-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auralis-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auralis-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auraticai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auraticai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auraticai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auraticai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auraticai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/auraticai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autolocalise/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autolocalise/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autolocalise/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autolocalise/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autolocalise/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autolocalise/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autonomops-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autonomops-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autonomops-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autonomops-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autonomops-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autonomops-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autoreel/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autoreel/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autoreel/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autoreel/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autoreel/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/autoreel/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aview/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aview/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aview/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aview/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aview/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/aview/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/awaz-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/awaz-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/awaz-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/awaz-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/awaz-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/awaz-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/baz/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/baz/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/baz/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/baz/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/baz/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/baz/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beeble-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beeble-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beeble-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beeble-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beeble-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beeble-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beesift/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beesift/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beesift/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beesift/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beesift/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/beesift/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bertha-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bertha-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bertha-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bertha-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bertha-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bertha-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/betterstudio/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/betterstudio/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/betterstudio/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/betterstudio/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/betterstudio/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/betterstudio/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bismuth/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bismuth/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bismuth/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bismuth/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bismuth/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bismuth/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bit-flows/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bit-flows/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bit-flows/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bit-flows/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bit-flows/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bit-flows/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bizora/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bizora/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bizora/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bizora/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bizora/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bizora/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blaze-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blaze-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blaze-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blaze-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blaze-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blaze-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blink/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blink/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blink/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blink/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blink/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blink/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blok/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blok/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blok/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blok/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blok/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/blok/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bluebarry-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bluebarry-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bluebarry-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bluebarry-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bluebarry-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bluebarry-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bondmcp/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bondmcp/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bondmcp/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bondmcp/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bondmcp/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bondmcp/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bookread/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bookread/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bookread/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bookread/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bookread/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bookread/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/botric-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/botric-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/botric-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/botric-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/botric-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/botric-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bottr-your-personal-ai-assistant/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bottr-your-personal-ai-assistant/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bottr-your-personal-ai-assistant/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bottr-your-personal-ai-assistant/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bottr-your-personal-ai-assistant/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bottr-your-personal-ai-assistant/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bounti-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bounti-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bounti-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bounti-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bounti-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bounti-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brainybear-easily-build-ai-chatbots/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brainybear-easily-build-ai-chatbots/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brainybear-easily-build-ai-chatbots/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brainybear-easily-build-ai-chatbots/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brainybear-easily-build-ai-chatbots/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brainybear-easily-build-ai-chatbots/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/branchbob/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/branchbob/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/branchbob/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/branchbob/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/branchbob/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/branchbob/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlife/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlife/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlife/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlife/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlife/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlife/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlift/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlift/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlift/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlift/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlift/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandlift/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandolia/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandolia/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandolia/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandolia/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandolia/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandolia/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandwiz/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandwiz/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandwiz/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandwiz/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandwiz/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brandwiz/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bravo-studio/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bravo-studio/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bravo-studio/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bravo-studio/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bravo-studio/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/bravo-studio/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brewprompts/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brewprompts/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brewprompts/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brewprompts/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brewprompts/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/brewprompts/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/broadn/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/broadn/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/broadn/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/broadn/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/broadn/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/broadn/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browse-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browse-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browse-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browse-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browse-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browse-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browseract/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browseract/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browseract/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browseract/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browseract/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/browseract/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buffer-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buildship-tools/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buildship-tools/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buildship-tools/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buildship-tools/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buildship-tools/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buildship-tools/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buyertwin/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buyertwin/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buyertwin/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buyertwin/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buyertwin/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buyertwin/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buzzclip/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buzzclip/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buzzclip/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buzzclip/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buzzclip/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/buzzclip/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/caimera-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/caimera-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/caimera-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/caimera-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/caimera-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/caimera-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/canva-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/canva-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/canva-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/canva-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/canva-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/canva-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/carboncopy/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/carboncopy/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/carboncopy/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/carboncopy/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/carboncopy/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/carboncopy/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/castmagic/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/castmagic/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/castmagic/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/castmagic/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/castmagic/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/castmagic/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/causaly/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/causaly/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/causaly/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/causaly/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/causaly/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/causaly/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cavya-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cavya-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cavya-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cavya-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cavya-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cavya-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ccx-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ccx-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ccx-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ccx-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ccx-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ccx-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat-thing/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat-thing/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat-thing/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat-thing/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat-thing/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat-thing/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat4data/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat4data/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat4data/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat4data/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat4data/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chat4data/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatbit/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatbit/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatbit/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatbit/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatbit/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatbit/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-enterprise/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-enterprise/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-enterprise/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-enterprise/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-enterprise/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-enterprise/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-exporter/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-exporter/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-exporter/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-exporter/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-exporter/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatgpt-exporter/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatpdf/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatpdf/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatpdf/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatpdf/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatpdf/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatpdf/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatslide-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatslide-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatslide-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatslide-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatslide-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatslide-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatterkb/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatterkb/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatterkb/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatterkb/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatterkb/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chatterkb/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chorus/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chorus/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chorus/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chorus/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chorus/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chorus/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chronicle/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chronicle/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chronicle/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chronicle/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chronicle/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/chronicle/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cicube/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cicube/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cicube/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cicube/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cicube/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cicube/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cineocean-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cineocean-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cineocean-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cineocean-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cineocean-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cineocean-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/claude/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/claude/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/claude/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/claude/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/claude/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/claude/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clay/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clay/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clay/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clay/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clay/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clay/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clearscope/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clearscope/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clearscope/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clearscope/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clearscope/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clearscope/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickboss-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickboss-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickboss-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickboss-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickboss-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickboss-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickup/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickup/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickup/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickup/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickup/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clickup/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cliprun/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cliprun/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cliprun/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cliprun/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cliprun/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cliprun/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clockwise/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clockwise/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clockwise/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clockwise/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clockwise/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clockwise/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudairy/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudairy/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudairy/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudairy/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudairy/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudairy/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudeagle-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudeagle-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudeagle-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudeagle-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudeagle-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cloudeagle-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clueso/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clueso/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clueso/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clueso/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clueso/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/clueso/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/co-dev/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/co-dev/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/co-dev/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/co-dev/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/co-dev/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/co-dev/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/code2-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/code2-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/code2-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/code2-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/code2-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/code2-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codebeaver/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codebeaver/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codebeaver/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codebeaver/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codebeaver/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codebeaver/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codeflash-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codeflash-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codeflash-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codeflash-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codeflash-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codeflash-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codegate/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codegate/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codegate/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codegate/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codegate/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/codegate/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coderide/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coderide/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coderide/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coderide/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coderide/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coderide/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cohere-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cohere-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cohere-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cohere-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cohere-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cohere-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/colossyan-creator/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/colossyan-creator/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/colossyan-creator/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/colossyan-creator/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/colossyan-creator/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/colossyan-creator/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/comet-by-perplexity/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/comet-by-perplexity/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/comet-by-perplexity/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/comet-by-perplexity/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/comet-by-perplexity/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/comet-by-perplexity/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cometapi/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cometapi/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cometapi/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cometapi/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cometapi/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cometapi/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/conforma/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/conforma/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/conforma/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/conforma/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/conforma/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/conforma/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus-ai-research-assistant/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus-ai-research-assistant/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus-ai-research-assistant/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus-ai-research-assistant/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus-ai-research-assistant/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/consensus-ai-research-assistant/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/constella/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/constella/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/constella/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/constella/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/constella/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/constella/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/content-maxima/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/content-maxima/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/content-maxima/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/content-maxima/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/content-maxima/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/content-maxima/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/contentforge/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/contentforge/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/contentforge/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/contentforge/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/contentforge/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/contentforge/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/contentstudio/vs/hootsuite',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/contentstudio/vs/buffer',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/convertfilesai-free-image-file-converter/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/convertfilesai-free-image-file-converter/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/convertfilesai-free-image-file-converter/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/convertfilesai-free-image-file-converter/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/convertfilesai-free-image-file-converter/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/convertfilesai-free-image-file-converter/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coopa-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coopa-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coopa-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coopa-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coopa-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coopa-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-3d/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-3d/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-3d/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-3d/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-3d/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-3d/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-audio-expression/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-audio-expression/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-audio-expression/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-audio-expression/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-audio-expression/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copilot-audio-expression/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copy-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copy-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copy-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copy-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copy-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copy-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copycat/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copycat/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copycat/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copycat/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copycat/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copycat/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copymatic/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copymatic/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copymatic/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copymatic/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copymatic/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/copymatic/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cosmos-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cosmos-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cosmos-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cosmos-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cosmos-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cosmos-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cotypist/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cotypist/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cotypist/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cotypist/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cotypist/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cotypist/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/covric/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/covric/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/covric/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/covric/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/covric/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/covric/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-build-ai-chatbots-effortlessly/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-build-ai-chatbots-effortlessly/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-build-ai-chatbots-effortlessly/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-build-ai-chatbots-effortlessly/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-build-ai-chatbots-effortlessly/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-build-ai-chatbots-effortlessly/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-studio/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-studio/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-studio/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-studio/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-studio/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/coze-studio/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cradl-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cradl-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cradl-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cradl-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cradl-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cradl-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/crawlchat/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/crawlchat/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/crawlchat/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/crawlchat/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/crawlchat/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/crawlchat/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/creatify/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/creatify/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/creatify/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/creatify/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/creatify/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/creatify/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cro-benchmark/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cro-benchmark/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cro-benchmark/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cro-benchmark/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cro-benchmark/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cro-benchmark/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ctrl-sheet/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ctrl-sheet/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ctrl-sheet/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ctrl-sheet/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ctrl-sheet/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/ctrl-sheet/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubeone-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubeone-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubeone-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubeone-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubeone-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubeone-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubic/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubic/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubic/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubic/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubic/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cubic/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/curiso-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/curiso-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/curiso-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/curiso-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/curiso-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/curiso-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/currents-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/currents-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/currents-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/currents-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/currents-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/currents-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cursor/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cursor/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cursor/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cursor/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cursor/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/cursor/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dailyme-journal/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dailyme-journal/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dailyme-journal/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dailyme-journal/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dailyme-journal/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dailyme-journal/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dall-e/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dall-e/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dall-e/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dall-e/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dall-e/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dall-e/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dante-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dante-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dante-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dante-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dante-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dante-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/databar-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/databar-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/databar-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/databar-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/databar-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/databar-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/datarobot/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/datarobot/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/datarobot/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/datarobot/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/datarobot/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/datarobot/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/decofy/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/decofy/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/decofy/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/decofy/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/decofy/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/decofy/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deep-research/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deep-research/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deep-research/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deep-research/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deep-research/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deep-research/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepdocs/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepdocs/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepdocs/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepdocs/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepdocs/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepdocs/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepgram/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepgram/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepgram/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepgram/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepgram/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deepgram/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deptho/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deptho/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deptho/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deptho/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deptho/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/deptho/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/descript/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/descript/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/descript/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/descript/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/descript/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/descript/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/devplan/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/devplan/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/devplan/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/devplan/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/devplan/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/devplan/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/diagnosis-pad/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/diagnosis-pad/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/diagnosis-pad/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/diagnosis-pad/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/diagnosis-pad/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/diagnosis-pad/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialbox/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialbox/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialbox/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialbox/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialbox/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialbox/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialoft-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialoft-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialoft-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialoft-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialoft-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dialoft-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/didocs-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/didocs-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/didocs-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/didocs-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/didocs-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/didocs-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/distribution-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/distribution-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/distribution-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/distribution-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/distribution-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/distribution-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/divedeck-aipowered-deck-builder/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/divedeck-aipowered-deck-builder/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/divedeck-aipowered-deck-builder/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/divedeck-aipowered-deck-builder/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/divedeck-aipowered-deck-builder/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/divedeck-aipowered-deck-builder/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docci-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docci-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docci-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docci-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docci-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docci-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docsumo/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docsumo/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docsumo/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docsumo/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docsumo/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/docsumo/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/draftly/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/draftly/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/draftly/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/draftly/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/draftly/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/draftly/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/drawer-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/drawer-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/drawer-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/drawer-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/drawer-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/drawer-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dream-machine/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dream-machine/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dream-machine/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dream-machine/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dream-machine/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dream-machine/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dropship/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dropship/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dropship/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dropship/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dropship/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dropship/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dubvid/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dubvid/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dubvid/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dubvid/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dubvid/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dubvid/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dume-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dume-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dume-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dume-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dume-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dume-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dzine-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dzine-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dzine-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dzine-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dzine-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/dzine-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/easysite/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/easysite/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/easysite/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/easysite/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/easysite/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/easysite/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echofox/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echofox/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echofox/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echofox/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echofox/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echofox/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echostash/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echostash/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echostash/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echostash/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echostash/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/echostash/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elai-io/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elai-io/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elai-io/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elai-io/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elai-io/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elai-io/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elevenlabs/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elevenlabs/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elevenlabs/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elevenlabs/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elevenlabs/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elevenlabs/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elicit/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elicit/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elicit/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elicit/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elicit/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/elicit/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/emergent-sh/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/emergent-sh/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/emergent-sh/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/emergent-sh/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/emergent-sh/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/emergent-sh/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/endex/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/endex/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/endex/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/endex/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/endex/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/endex/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/engagico/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/engagico/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/engagico/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/engagico/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/engagico/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/engagico/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enjo-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enjo-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enjo-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enjo-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enjo-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enjo-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enso/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enso/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enso/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enso/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enso/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enso/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enterprisedna/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enterprisedna/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enterprisedna/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enterprisedna/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enterprisedna/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/enterprisedna/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/eraser-io/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/eraser-io/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/eraser-io/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/eraser-io/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/eraser-io/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/eraser-io/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excel-whisper/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excel-whisper/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excel-whisper/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excel-whisper/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excel-whisper/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excel-whisper/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excelmatic/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excelmatic/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excelmatic/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excelmatic/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excelmatic/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/excelmatic/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/explee-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/explee-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/explee-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/explee-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/explee-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/explee-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extractany/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extractany/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extractany/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extractany/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extractany/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extractany/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extruct-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extruct-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extruct-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extruct-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extruct-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/extruct-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/facecheck-id/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/facecheck-id/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/facecheck-id/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/facecheck-id/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/facecheck-id/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/facecheck-id/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fast-q-a/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fast-q-a/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fast-q-a/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fast-q-a/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fast-q-a/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fast-q-a/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fathom/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fathom/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fathom/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fathom/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fathom/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fathom/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/feeedback/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/feeedback/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/feeedback/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/feeedback/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/feeedback/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/feeedback/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fellow-app/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fellow-app/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fellow-app/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fellow-app/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fellow-app/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fellow-app/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fenn/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fenn/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fenn/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/fenn/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini-25/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini-25/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini-25/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini-25/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini-25/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/gemini-25/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/google-gemini/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/google-gemini/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/google-gemini/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/google-gemini/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/google-gemini/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/google-gemini/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/jasper-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/notion-ai/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/notion-ai/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/notion-ai/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/notion-ai/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/notion-ai/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/notion-ai/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/writesonic/vs/10web',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/writesonic/vs/adespresso',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/writesonic/vs/acquisio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/writesonic/vs/adbeat',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/writesonic/vs/adalysis',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/compare/writesonic/vs/adcreative-ai',
        destination: '/tools',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;