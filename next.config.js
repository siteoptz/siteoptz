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

  // Redirects for fixing 404 errors
  async redirects() {
    return [
      // Fix 308 redirect: /about
      {
        source: '/about',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /analysis/claude3-vs-gpt4
      {
        source: '/analysis/claude3-vs-gpt4',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /blog
      {
        source: '/blog',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /careers
      {
        source: '/careers',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies
      {
        source: '/case-studies',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/ai-content-creators
      {
        source: '/case-studies/ai-content-creators',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/ai-customer-service
      {
        source: '/case-studies/ai-customer-service',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/ai-cybersecurity
      {
        source: '/case-studies/ai-cybersecurity',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/datavision-analytics-ai
      {
        source: '/case-studies/datavision-analytics-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/ecommerce-ai
      {
        source: '/case-studies/ecommerce-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/edutech-personalized-learning
      {
        source: '/case-studies/edutech-personalized-learning',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/fintech-ai
      {
        source: '/case-studies/fintech-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/fintech-fraud-detection
      {
        source: '/case-studies/fintech-fraud-detection',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/fortune-500-chatgpt
      {
        source: '/case-studies/fortune-500-chatgpt',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/growthlabs-content-ai
      {
        source: '/case-studies/growthlabs-content-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/healthcare-ai
      {
        source: '/case-studies/healthcare-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/healthplus-diagnostic-ai
      {
        source: '/case-studies/healthplus-diagnostic-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/hr-ai-success
      {
        source: '/case-studies/hr-ai-success',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/legaltech-contract-analysis
      {
        source: '/case-studies/legaltech-contract-analysis',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/logicorp-route-optimization
      {
        source: '/case-studies/logicorp-route-optimization',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/manufacturex-predictive-maintenance
      {
        source: '/case-studies/manufacturex-predictive-maintenance',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/manufacturing-ai
      {
        source: '/case-studies/manufacturing-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/marketing-ai-success
      {
        source: '/case-studies/marketing-ai-success',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/no-code-ai-wins
      {
        source: '/case-studies/no-code-ai-wins',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/predictive-analytics
      {
        source: '/case-studies/predictive-analytics',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/retailmax-inventory-ai
      {
        source: '/case-studies/retailmax-inventory-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/sales-ai
      {
        source: '/case-studies/sales-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/smart-manufacturing
      {
        source: '/case-studies/smart-manufacturing',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /case-studies/techflow-ai-chatbot
      {
        source: '/case-studies/techflow-ai-chatbot',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories
      {
        source: '/categories',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/ai-automation
      {
        source: '/categories/ai-automation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/ai-education
      {
        source: '/categories/ai-education',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/ai-for-business
      {
        source: '/categories/ai-for-business',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/ai-translator
      {
        source: '/categories/ai-translator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/ai-website-builder
      {
        source: '/categories/ai-website-builder',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/best-voice-ai-tools
      {
        source: '/categories/best-voice-ai-tools',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/code-generation
      {
        source: '/categories/code-generation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/content-creation
      {
        source: '/categories/content-creation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/data-analysis
      {
        source: '/categories/data-analysis',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/e-commerce
      {
        source: '/categories/e-commerce',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/email-marketing
      {
        source: '/categories/email-marketing',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/finance-ai
      {
        source: '/categories/finance-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/health-ai
      {
        source: '/categories/health-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/image-generation
      {
        source: '/categories/image-generation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/lead-generation
      {
        source: '/categories/lead-generation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/paid-search-ppc
      {
        source: '/categories/paid-search-ppc',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/productivity
      {
        source: '/categories/productivity',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/research-education
      {
        source: '/categories/research-education',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/seo-optimization
      {
        source: '/categories/seo-optimization',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/social-media
      {
        source: '/categories/social-media',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/ux
      {
        source: '/categories/ux',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/video-generation
      {
        source: '/categories/video-generation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/voice-ai
      {
        source: '/categories/voice-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/website-builder
      {
        source: '/categories/website-builder',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /categories/writing
      {
        source: '/categories/writing',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /contact
      {
        source: '/contact',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /cookies
      {
        source: '/cookies',
        destination: '/',
        permanent: true,
      },
      // Fix 308 redirect: /docs/api
      {
        source: '/docs/api',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /guides/ai-chatbot-implementation
      {
        source: '/guides/ai-chatbot-implementation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /guides/ai-content-generation
      {
        source: '/guides/ai-content-generation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /guides/ai-data-analysis
      {
        source: '/guides/ai-data-analysis',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /guides/gpt4-turbo-business
      {
        source: '/guides/gpt4-turbo-business',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries
      {
        source: '/industries',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries/aerospace-defense
      {
        source: '/industries/aerospace-defense',
        destination: '/categories/best-voice-ai-tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries/education-edtech
      {
        source: '/industries/education-edtech',
        destination: '/categories/best-voice-ai-tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries/energy-utilities
      {
        source: '/industries/energy-utilities',
        destination: '/categories/best-voice-ai-tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries/finance-banking
      {
        source: '/industries/finance-banking',
        destination: '/categories/best-voice-ai-tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries/healthcare-life-sciences
      {
        source: '/industries/healthcare-life-sciences',
        destination: '/categories/best-voice-ai-tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries/human-resources-recruiting
      {
        source: '/industries/human-resources-recruiting',
        destination: '/categories/best-voice-ai-tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries/legal-compliance
      {
        source: '/industries/legal-compliance',
        destination: '/categories/best-voice-ai-tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries/manufacturing-supply-chain
      {
        source: '/industries/manufacturing-supply-chain',
        destination: '/categories/best-voice-ai-tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries/marketing-advertising-media
      {
        source: '/industries/marketing-advertising-media',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries/retail-ecommerce
      {
        source: '/industries/retail-ecommerce',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /industries/transportation-logistics
      {
        source: '/industries/transportation-logistics',
        destination: '/categories/best-voice-ai-tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts
      {
        source: '/podcasts',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/ai-automation-revolution-2024
      {
        source: '/podcasts/ai-automation-revolution-2024',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/ai-content-creation-tools-2024
      {
        source: '/podcasts/ai-content-creation-tools-2024',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/ai-customer-service-automation
      {
        source: '/podcasts/ai-customer-service-automation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/ai-cybersecurity-automation
      {
        source: '/podcasts/ai-cybersecurity-automation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/ai-data-analytics-transformation
      {
        source: '/podcasts/ai-data-analytics-transformation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/ai-ecommerce-personalization
      {
        source: '/podcasts/ai-ecommerce-personalization',
        destination: '/podcasts/transcripts/ai-ecommerce-personalization',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/ai-financial-trading-automation
      {
        source: '/podcasts/ai-financial-trading-automation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/ai-healthcare-workflow-automation
      {
        source: '/podcasts/ai-healthcare-workflow-automation',
        destination: '/podcasts/transcripts/ai-healthcare-workflow-automation',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/ai-hr-recruitment-automation
      {
        source: '/podcasts/ai-hr-recruitment-automation',
        destination: '/podcasts/transcripts/ai-hr-recruitment-automation',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/ai-manufacturing-industry-40
      {
        source: '/podcasts/ai-manufacturing-industry-40',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/ai-sales-process-automation
      {
        source: '/podcasts/ai-sales-process-automation',
        destination: '/podcasts/transcripts/ai-sales-process-automation',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/chatgpt-enterprise-workflows
      {
        source: '/podcasts/chatgpt-enterprise-workflows',
        destination: '/podcasts/transcripts/chatgpt-enterprise-workflows',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/claude-vs-gpt-enterprise-comparison
      {
        source: '/podcasts/claude-vs-gpt-enterprise-comparison',
        destination: '/podcasts/transcripts/claude-vs-gpt-enterprise-comparison',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/marketing-automation-ai-tools
      {
        source: '/podcasts/marketing-automation-ai-tools',
        destination: '/podcasts/transcripts/marketing-automation-ai-tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/no-code-ai-tools-revolution
      {
        source: '/podcasts/no-code-ai-tools-revolution',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/transcripts/ai-automation-revolution-2024
      {
        source: '/podcasts/transcripts/ai-automation-revolution-2024',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/transcripts/ai-ecommerce-personalization
      {
        source: '/podcasts/transcripts/ai-ecommerce-personalization',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/transcripts/ai-healthcare-workflow-automation
      {
        source: '/podcasts/transcripts/ai-healthcare-workflow-automation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/transcripts/ai-hr-recruitment-automation
      {
        source: '/podcasts/transcripts/ai-hr-recruitment-automation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/transcripts/ai-sales-process-automation
      {
        source: '/podcasts/transcripts/ai-sales-process-automation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/transcripts/chatgpt-enterprise-workflows
      {
        source: '/podcasts/transcripts/chatgpt-enterprise-workflows',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/transcripts/claude-vs-gpt-enterprise-comparison
      {
        source: '/podcasts/transcripts/claude-vs-gpt-enterprise-comparison',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /podcasts/transcripts/marketing-automation-ai-tools
      {
        source: '/podcasts/transcripts/marketing-automation-ai-tools',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /pricing
      {
        source: '/pricing',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /privacy
      {
        source: '/privacy',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reports
      {
        source: '/reports',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reports/ai-adoption-survey-2024
      {
        source: '/reports/ai-adoption-survey-2024',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reports/ai-healthcare-2024
      {
        source: '/reports/ai-healthcare-2024',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reports/claude-gpt4-benchmark
      {
        source: '/reports/claude-gpt4-benchmark',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reports/enterprise-ai-roi-2024
      {
        source: '/reports/enterprise-ai-roi-2024',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reports/fintech-ai-2024
      {
        source: '/reports/fintech-ai-2024',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reports/manufacturing-ai-2024
      {
        source: '/reports/manufacturing-ai-2024',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reports/q4-2024-ai-market
      {
        source: '/reports/q4-2024-ai-market',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reports/saas-ai-trends-2024
      {
        source: '/reports/saas-ai-trends-2024',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources
      {
        source: '/resources',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/ai-analytics-guide
      {
        source: '/resources/ai-analytics-guide',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/ai-customer-service-guide
      {
        source: '/resources/ai-customer-service-guide',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/ai-implementation-guide
      {
        source: '/resources/ai-implementation-guide',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/ai-model-selection
      {
        source: '/resources/ai-model-selection',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/ai-security-checklist
      {
        source: '/resources/ai-security-checklist',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/ai-security-guide
      {
        source: '/resources/ai-security-guide',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/ai-strategy-guide
      {
        source: '/resources/ai-strategy-guide',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/algorithmic-trading-guide
      {
        source: '/resources/algorithmic-trading-guide',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/analytics-platform-comparison
      {
        source: '/resources/analytics-platform-comparison',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/automation-toolkit
      {
        source: '/resources/automation-toolkit',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/bias-free-hiring
      {
        source: '/resources/bias-free-hiring',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/business-ai-training
      {
        source: '/resources/business-ai-training',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/chatgpt-enterprise-guide
      {
        source: '/resources/chatgpt-enterprise-guide',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/content-ai-comparison
      {
        source: '/resources/content-ai-comparison',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/creator-ai-toolkit
      {
        source: '/resources/creator-ai-toolkit',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/cs-automation-checklist
      {
        source: '/resources/cs-automation-checklist',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/ecommerce-ai-playbook
      {
        source: '/resources/ecommerce-ai-playbook',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/healthcare-ai-guide
      {
        source: '/resources/healthcare-ai-guide',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/hipaa-ai-compliance
      {
        source: '/resources/hipaa-ai-compliance',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/hr-ai-implementation
      {
        source: '/resources/hr-ai-implementation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/industry-40-guide
      {
        source: '/resources/industry-40-guide',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/lead-scoring-guide
      {
        source: '/resources/lead-scoring-guide',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/marketing-ai-strategy
      {
        source: '/resources/marketing-ai-strategy',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/marketing-ai-tools-comparison
      {
        source: '/resources/marketing-ai-tools-comparison',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/no-code-ai-comparison
      {
        source: '/resources/no-code-ai-comparison',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/personalization-strategy
      {
        source: '/resources/personalization-strategy',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/predictive-maintenance
      {
        source: '/resources/predictive-maintenance',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/risk-management-ai
      {
        source: '/resources/risk-management-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/sales-ai-playbook
      {
        source: '/resources/sales-ai-playbook',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /resources/security-platform-comparison
      {
        source: '/resources/security-platform-comparison',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews
      {
        source: '/reviews',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/0cody
      {
        source: '/reviews/0cody',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/10web
      {
        source: '/reviews/10web',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/11-ai
      {
        source: '/reviews/11-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/37x
      {
        source: '/reviews/37x',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/6sense-aidriven-revenue-growth-optimization
      {
        source: '/reviews/6sense-aidriven-revenue-growth-optimization',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/a0-dev
      {
        source: '/reviews/a0-dev',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/acquisio
      {
        source: '/reviews/acquisio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/actionflows
      {
        source: '/reviews/actionflows',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/adalysis
      {
        source: '/reviews/adalysis',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/adbeat
      {
        source: '/reviews/adbeat',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/adcreative-ai
      {
        source: '/reviews/adcreative-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/adespresso
      {
        source: '/reviews/adespresso',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/adobe-firefly
      {
        source: '/reviews/adobe-firefly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/adsdog
      {
        source: '/reviews/adsdog',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/adzooma
      {
        source: '/reviews/adzooma',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/aerogram
      {
        source: '/reviews/aerogram',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/aftercare
      {
        source: '/reviews/aftercare',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/agentdock
      {
        source: '/reviews/agentdock',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/agentpass-ai
      {
        source: '/reviews/agentpass-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/agentvoice
      {
        source: '/reviews/agentvoice',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ahrefs
      {
        source: '/reviews/ahrefs',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ahrefs-ai
      {
        source: '/reviews/ahrefs-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ai-actions-by-zapier-gpt
      {
        source: '/reviews/ai-actions-by-zapier-gpt',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ai-color-match
      {
        source: '/reviews/ai-color-match',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ai-drive
      {
        source: '/reviews/ai-drive',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ai-homedesign
      {
        source: '/reviews/ai-homedesign',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ai-intime
      {
        source: '/reviews/ai-intime',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ai-renamer
      {
        source: '/reviews/ai-renamer',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ai-studios
      {
        source: '/reviews/ai-studios',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ai-video-translator
      {
        source: '/reviews/ai-video-translator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/aicosts-ai
      {
        source: '/reviews/aicosts-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/aimdoc
      {
        source: '/reviews/aimdoc',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/airops
      {
        source: '/reviews/airops',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/aisoap
      {
        source: '/reviews/aisoap',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/alliai
      {
        source: '/reviews/alliai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/alpha-sense
      {
        source: '/reviews/alpha-sense',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/altavize
      {
        source: '/reviews/altavize',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/amazon-alexa
      {
        source: '/reviews/amazon-alexa',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/amazon-codewhisperer
      {
        source: '/reviews/amazon-codewhisperer',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/amplifa
      {
        source: '/reviews/amplifa',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/anchor-browser
      {
        source: '/reviews/anchor-browser',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/answerly
      {
        source: '/reviews/answerly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/anthropic-chatgpt-alternative
      {
        source: '/reviews/anthropic-chatgpt-alternative',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/anthropic-claude
      {
        source: '/reviews/anthropic-claude',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/anything
      {
        source: '/reviews/anything',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/aphra
      {
        source: '/reviews/aphra',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/apify
      {
        source: '/reviews/apify',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/apollo-io
      {
        source: '/reviews/apollo-io',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/appointwise
      {
        source: '/reviews/appointwise',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/aptlystar-ai
      {
        source: '/reviews/aptlystar-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/archigen
      {
        source: '/reviews/archigen',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/archive
      {
        source: '/reviews/archive',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/arcwise
      {
        source: '/reviews/arcwise',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/athenic-ai
      {
        source: '/reviews/athenic-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/audiox
      {
        source: '/reviews/audiox',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/auralis-ai
      {
        source: '/reviews/auralis-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/auraticai
      {
        source: '/reviews/auraticai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/autolocalise
      {
        source: '/reviews/autolocalise',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/autonomops-ai
      {
        source: '/reviews/autonomops-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/autoreel
      {
        source: '/reviews/autoreel',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/aview
      {
        source: '/reviews/aview',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/awaz-ai
      {
        source: '/reviews/awaz-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/baz
      {
        source: '/reviews/baz',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/beeble-ai
      {
        source: '/reviews/beeble-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/beesift
      {
        source: '/reviews/beesift',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/bertha-ai
      {
        source: '/reviews/bertha-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/betterstudio
      {
        source: '/reviews/betterstudio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/bismuth
      {
        source: '/reviews/bismuth',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/bit-flows
      {
        source: '/reviews/bit-flows',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/bizora
      {
        source: '/reviews/bizora',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/blaze-ai
      {
        source: '/reviews/blaze-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/blink
      {
        source: '/reviews/blink',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/blok
      {
        source: '/reviews/blok',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/bluebarry-ai
      {
        source: '/reviews/bluebarry-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/bondmcp
      {
        source: '/reviews/bondmcp',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/bookread
      {
        source: '/reviews/bookread',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/botric-ai
      {
        source: '/reviews/botric-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/bottr-your-personal-ai-assistant
      {
        source: '/reviews/bottr-your-personal-ai-assistant',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/bounti-ai
      {
        source: '/reviews/bounti-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/brainybear-easily-build-ai-chatbots
      {
        source: '/reviews/brainybear-easily-build-ai-chatbots',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/branchbob
      {
        source: '/reviews/branchbob',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/brandlife
      {
        source: '/reviews/brandlife',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/brandlift
      {
        source: '/reviews/brandlift',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/brandolia
      {
        source: '/reviews/brandolia',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/brandwiz
      {
        source: '/reviews/brandwiz',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/bravo-studio
      {
        source: '/reviews/bravo-studio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/brewprompts
      {
        source: '/reviews/brewprompts',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/broadn
      {
        source: '/reviews/broadn',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/browse-ai
      {
        source: '/reviews/browse-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/browseract
      {
        source: '/reviews/browseract',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/buffer
      {
        source: '/reviews/buffer',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/buffer-ai
      {
        source: '/reviews/buffer-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/buildship-tools
      {
        source: '/reviews/buildship-tools',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/buyertwin
      {
        source: '/reviews/buyertwin',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/buzzclip
      {
        source: '/reviews/buzzclip',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/caimera-ai
      {
        source: '/reviews/caimera-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/canva-ai
      {
        source: '/reviews/canva-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/carboncopy
      {
        source: '/reviews/carboncopy',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/castmagic
      {
        source: '/reviews/castmagic',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/causaly
      {
        source: '/reviews/causaly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cavya-ai
      {
        source: '/reviews/cavya-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ccx-ai
      {
        source: '/reviews/ccx-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/chat-thing
      {
        source: '/reviews/chat-thing',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/chat4data
      {
        source: '/reviews/chat4data',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/chatbit
      {
        source: '/reviews/chatbit',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/chatgpt
      {
        source: '/reviews/chatgpt',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/chatgpt-enterprise
      {
        source: '/reviews/chatgpt-enterprise',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/chatgpt-exporter
      {
        source: '/reviews/chatgpt-exporter',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/chatpdf
      {
        source: '/reviews/chatpdf',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/chatslide-ai
      {
        source: '/reviews/chatslide-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/chatterkb
      {
        source: '/reviews/chatterkb',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/chorus
      {
        source: '/reviews/chorus',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/chronicle
      {
        source: '/reviews/chronicle',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cicube
      {
        source: '/reviews/cicube',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cineocean-ai
      {
        source: '/reviews/cineocean-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/claude
      {
        source: '/reviews/claude',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/clay
      {
        source: '/reviews/clay',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/clearscope
      {
        source: '/reviews/clearscope',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/clickboss-ai
      {
        source: '/reviews/clickboss-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/clickup
      {
        source: '/reviews/clickup',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cliprun
      {
        source: '/reviews/cliprun',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/clockwise
      {
        source: '/reviews/clockwise',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cloudairy
      {
        source: '/reviews/cloudairy',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cloudeagle-ai
      {
        source: '/reviews/cloudeagle-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/clueso
      {
        source: '/reviews/clueso',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/co-dev
      {
        source: '/reviews/co-dev',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/code2-ai
      {
        source: '/reviews/code2-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/codebeaver
      {
        source: '/reviews/codebeaver',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/codeflash-ai
      {
        source: '/reviews/codeflash-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/codegate
      {
        source: '/reviews/codegate',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/coderide
      {
        source: '/reviews/coderide',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cohere-ai
      {
        source: '/reviews/cohere-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/colossyan-creator
      {
        source: '/reviews/colossyan-creator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/comet-by-perplexity
      {
        source: '/reviews/comet-by-perplexity',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cometapi
      {
        source: '/reviews/cometapi',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/conforma
      {
        source: '/reviews/conforma',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/consensus
      {
        source: '/reviews/consensus',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/consensus-ai-research-assistant
      {
        source: '/reviews/consensus-ai-research-assistant',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/constella
      {
        source: '/reviews/constella',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/content-maxima
      {
        source: '/reviews/content-maxima',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/contentforge
      {
        source: '/reviews/contentforge',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/contentstudio
      {
        source: '/reviews/contentstudio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/convertfilesai-free-image-file-converter
      {
        source: '/reviews/convertfilesai-free-image-file-converter',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/coopa-ai
      {
        source: '/reviews/coopa-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/copilot-3d
      {
        source: '/reviews/copilot-3d',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/copilot-audio-expression
      {
        source: '/reviews/copilot-audio-expression',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/copy-ai
      {
        source: '/reviews/copy-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/copycat
      {
        source: '/reviews/copycat',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/copymatic
      {
        source: '/reviews/copymatic',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cosmos-ai
      {
        source: '/reviews/cosmos-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cotypist
      {
        source: '/reviews/cotypist',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/covric
      {
        source: '/reviews/covric',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/coze-build-ai-chatbots-effortlessly
      {
        source: '/reviews/coze-build-ai-chatbots-effortlessly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/coze-studio
      {
        source: '/reviews/coze-studio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cradl-ai
      {
        source: '/reviews/cradl-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/crawlchat
      {
        source: '/reviews/crawlchat',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/creatify
      {
        source: '/reviews/creatify',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cro-benchmark
      {
        source: '/reviews/cro-benchmark',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ctrl-sheet
      {
        source: '/reviews/ctrl-sheet',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cubeone-ai
      {
        source: '/reviews/cubeone-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cubic
      {
        source: '/reviews/cubic',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/curiso-ai
      {
        source: '/reviews/curiso-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/currents-ai
      {
        source: '/reviews/currents-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/cursor
      {
        source: '/reviews/cursor',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/dailyme-journal
      {
        source: '/reviews/dailyme-journal',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/dall-e
      {
        source: '/reviews/dall-e',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/dante-ai
      {
        source: '/reviews/dante-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/databar-ai
      {
        source: '/reviews/databar-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/datarobot
      {
        source: '/reviews/datarobot',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/decofy
      {
        source: '/reviews/decofy',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/deep-research
      {
        source: '/reviews/deep-research',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/deepdocs
      {
        source: '/reviews/deepdocs',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/deepgram
      {
        source: '/reviews/deepgram',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/deptho
      {
        source: '/reviews/deptho',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/descript
      {
        source: '/reviews/descript',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/devplan
      {
        source: '/reviews/devplan',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/diagnosis-pad
      {
        source: '/reviews/diagnosis-pad',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/dialbox
      {
        source: '/reviews/dialbox',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/dialoft-ai
      {
        source: '/reviews/dialoft-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/didocs-ai
      {
        source: '/reviews/didocs-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/distribution-ai
      {
        source: '/reviews/distribution-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/divedeck-aipowered-deck-builder
      {
        source: '/reviews/divedeck-aipowered-deck-builder',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/docci-ai
      {
        source: '/reviews/docci-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/docsumo
      {
        source: '/reviews/docsumo',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/draftly
      {
        source: '/reviews/draftly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/drawer-ai
      {
        source: '/reviews/drawer-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/dream-machine
      {
        source: '/reviews/dream-machine',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/dropship
      {
        source: '/reviews/dropship',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/dubvid
      {
        source: '/reviews/dubvid',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/dume-ai
      {
        source: '/reviews/dume-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/dzine-ai
      {
        source: '/reviews/dzine-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/easysite
      {
        source: '/reviews/easysite',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/echofox
      {
        source: '/reviews/echofox',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/echostash
      {
        source: '/reviews/echostash',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/elai-io
      {
        source: '/reviews/elai-io',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/elevenlabs
      {
        source: '/reviews/elevenlabs',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/elicit
      {
        source: '/reviews/elicit',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/emergent-sh
      {
        source: '/reviews/emergent-sh',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/endex
      {
        source: '/reviews/endex',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/engagico
      {
        source: '/reviews/engagico',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/enjo-ai
      {
        source: '/reviews/enjo-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/enso
      {
        source: '/reviews/enso',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/enterprisedna
      {
        source: '/reviews/enterprisedna',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/eraser-io
      {
        source: '/reviews/eraser-io',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/excel-whisper
      {
        source: '/reviews/excel-whisper',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/excelmatic
      {
        source: '/reviews/excelmatic',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/explee-ai
      {
        source: '/reviews/explee-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/extractany
      {
        source: '/reviews/extractany',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/extruct-ai
      {
        source: '/reviews/extruct-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/facecheck-id
      {
        source: '/reviews/facecheck-id',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/fast-q-a
      {
        source: '/reviews/fast-q-a',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/fathom
      {
        source: '/reviews/fathom',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/feeedback
      {
        source: '/reviews/feeedback',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/fellow-app
      {
        source: '/reviews/fellow-app',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/fenn
      {
        source: '/reviews/fenn',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/fiddler-ai
      {
        source: '/reviews/fiddler-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/figflow
      {
        source: '/reviews/figflow',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/find-my-papers
      {
        source: '/reviews/find-my-papers',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/findaily
      {
        source: '/reviews/findaily',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/fireflies
      {
        source: '/reviews/fireflies',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/fliki
      {
        source: '/reviews/fliki',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/flowmetr
      {
        source: '/reviews/flowmetr',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/flux
      {
        source: '/reviews/flux',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/flux-1
      {
        source: '/reviews/flux-1',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/flux-playground
      {
        source: '/reviews/flux-playground',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/flytest
      {
        source: '/reviews/flytest',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/folder-pilot
      {
        source: '/reviews/folder-pilot',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/folk-crm
      {
        source: '/reviews/folk-crm',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/forge-code
      {
        source: '/reviews/forge-code',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/forvio
      {
        source: '/reviews/forvio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/foundor-ai
      {
        source: '/reviews/foundor-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/frase
      {
        source: '/reviews/frase',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/freepik
      {
        source: '/reviews/freepik',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/futurmotion
      {
        source: '/reviews/futurmotion',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/fyxer
      {
        source: '/reviews/fyxer',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gadget
      {
        source: '/reviews/gadget',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gaio-dataos
      {
        source: '/reviews/gaio-dataos',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gamma
      {
        source: '/reviews/gamma',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gemini
      {
        source: '/reviews/gemini',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gemini-25
      {
        source: '/reviews/gemini-25',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/genppt
      {
        source: '/reviews/genppt',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/genspark-ai
      {
        source: '/reviews/genspark-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/getdot-ai
      {
        source: '/reviews/getdot-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/getgenai
      {
        source: '/reviews/getgenai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/getinvoice
      {
        source: '/reviews/getinvoice',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gigasheet
      {
        source: '/reviews/gigasheet',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gitauto
      {
        source: '/reviews/gitauto',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/github-copilot
      {
        source: '/reviews/github-copilot',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gizmo-party
      {
        source: '/reviews/gizmo-party',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gocodeo
      {
        source: '/reviews/gocodeo',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gong-io
      {
        source: '/reviews/gong-io',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/google-ads
      {
        source: '/reviews/google-ads',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/google-ads-editor
      {
        source: '/reviews/google-ads-editor',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/google-ai-edge
      {
        source: '/reviews/google-ai-edge',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/google-gemini
      {
        source: '/reviews/google-gemini',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/google-search
      {
        source: '/reviews/google-search',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/graficai
      {
        source: '/reviews/graficai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/grammarly
      {
        source: '/reviews/grammarly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/groas
      {
        source: '/reviews/groas',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/grok
      {
        source: '/reviews/grok',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/grok-3
      {
        source: '/reviews/grok-3',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gstory-ai
      {
        source: '/reviews/gstory-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gumloop
      {
        source: '/reviews/gumloop',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gunbot
      {
        source: '/reviews/gunbot',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/guru
      {
        source: '/reviews/guru',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/gwi
      {
        source: '/reviews/gwi',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/handtext-ai
      {
        source: '/reviews/handtext-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/hatch
      {
        source: '/reviews/hatch',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/headshot-generator
      {
        source: '/reviews/headshot-generator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/hera
      {
        source: '/reviews/hera',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/heyboss
      {
        source: '/reviews/heyboss',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/heygen
      {
        source: '/reviews/heygen',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/heynds
      {
        source: '/reviews/heynds',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/hidemydata
      {
        source: '/reviews/hidemydata',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/higgsfield
      {
        source: '/reviews/higgsfield',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/highlight-ai
      {
        source: '/reviews/highlight-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/hoop
      {
        source: '/reviews/hoop',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/hootsuite
      {
        source: '/reviews/hootsuite',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/hootsuite-ai
      {
        source: '/reviews/hootsuite-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/hoox
      {
        source: '/reviews/hoox',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/hostinger-horizons
      {
        source: '/reviews/hostinger-horizons',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/hubspot-ai
      {
        source: '/reviews/hubspot-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/hubspot-email-marketing-tools
      {
        source: '/reviews/hubspot-email-marketing-tools',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/huggingface-transformers
      {
        source: '/reviews/huggingface-transformers',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/humanlayer
      {
        source: '/reviews/humanlayer',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/icon-me
      {
        source: '/reviews/icon-me',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ideaboard
      {
        source: '/reviews/ideaboard',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ideabuddy
      {
        source: '/reviews/ideabuddy',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ideogram
      {
        source: '/reviews/ideogram',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/illustrae
      {
        source: '/reviews/illustrae',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/imagetranslate-ai
      {
        source: '/reviews/imagetranslate-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/inabit-ai
      {
        source: '/reviews/inabit-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/inbox-ai
      {
        source: '/reviews/inbox-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/indipen
      {
        source: '/reviews/indipen',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/initrepo
      {
        source: '/reviews/initrepo',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/interview-study
      {
        source: '/reviews/interview-study',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/intervo-ai
      {
        source: '/reviews/intervo-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/inventaiq
      {
        source: '/reviews/inventaiq',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/invideo
      {
        source: '/reviews/invideo',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/jamie-ai
      {
        source: '/reviews/jamie-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/jasper
      {
        source: '/reviews/jasper',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/jasper-ai
      {
        source: '/reviews/jasper-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/jobquest-ai
      {
        source: '/reviews/jobquest-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/justcall
      {
        source: '/reviews/justcall',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kaiboard
      {
        source: '/reviews/kaiboard',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kapwing
      {
        source: '/reviews/kapwing',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/karax-ai
      {
        source: '/reviews/karax-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kawara-ai
      {
        source: '/reviews/kawara-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/keepmind
      {
        source: '/reviews/keepmind',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kenji
      {
        source: '/reviews/kenji',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kickresume
      {
        source: '/reviews/kickresume',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kiro
      {
        source: '/reviews/kiro',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kittentts
      {
        source: '/reviews/kittentts',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/klarops
      {
        source: '/reviews/klarops',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kleap-ai
      {
        source: '/reviews/kleap-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kodus
      {
        source: '/reviews/kodus',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kokoro-tts
      {
        source: '/reviews/kokoro-tts',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kolena
      {
        source: '/reviews/kolena',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kosmik
      {
        source: '/reviews/kosmik',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kuberns
      {
        source: '/reviews/kuberns',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kudra
      {
        source: '/reviews/kudra',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kvitly
      {
        source: '/reviews/kvitly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/kwizie
      {
        source: '/reviews/kwizie',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/lanta-ai
      {
        source: '/reviews/lanta-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/later
      {
        source: '/reviews/later',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/layerpath
      {
        source: '/reviews/layerpath',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/lazy-so
      {
        source: '/reviews/lazy-so',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/legion-ai
      {
        source: '/reviews/legion-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/leonardo-ai
      {
        source: '/reviews/leonardo-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/letterly
      {
        source: '/reviews/letterly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/letzai
      {
        source: '/reviews/letzai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/licode
      {
        source: '/reviews/licode',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/lindra-ai
      {
        source: '/reviews/lindra-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/listening4
      {
        source: '/reviews/listening4',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/littlebird
      {
        source: '/reviews/littlebird',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/llm-browser
      {
        source: '/reviews/llm-browser',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/lockedin-ai
      {
        source: '/reviews/lockedin-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/locus-extension
      {
        source: '/reviews/locus-extension',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/looka
      {
        source: '/reviews/looka',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/looker
      {
        source: '/reviews/looker',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/loomly
      {
        source: '/reviews/loomly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/lovable
      {
        source: '/reviews/lovable',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/lovart
      {
        source: '/reviews/lovart',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/lovo-ai
      {
        source: '/reviews/lovo-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ltx-studio
      {
        source: '/reviews/ltx-studio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ludus-ai
      {
        source: '/reviews/ludus-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/lumen5
      {
        source: '/reviews/lumen5',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/lyruno
      {
        source: '/reviews/lyruno',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/macaly
      {
        source: '/reviews/macaly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/macaron
      {
        source: '/reviews/macaron',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/macaron-ai
      {
        source: '/reviews/macaron-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/macro
      {
        source: '/reviews/macro',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/magic-animator
      {
        source: '/reviews/magic-animator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/magic-potion
      {
        source: '/reviews/magic-potion',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/magicarena
      {
        source: '/reviews/magicarena',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/mailchimp
      {
        source: '/reviews/mailchimp',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/mailchimp-ai
      {
        source: '/reviews/mailchimp-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/make
      {
        source: '/reviews/make',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/mangools
      {
        source: '/reviews/mangools',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/manus
      {
        source: '/reviews/manus',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/manus-ai
      {
        source: '/reviews/manus-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/manychat
      {
        source: '/reviews/manychat',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/mapify
      {
        source: '/reviews/mapify',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/marin-software
      {
        source: '/reviews/marin-software',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/maskara-ai
      {
        source: '/reviews/maskara-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/me-bot
      {
        source: '/reviews/me-bot',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/media-io
      {
        source: '/reviews/media-io',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/memara
      {
        source: '/reviews/memara',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/memories-ai
      {
        source: '/reviews/memories-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/messync
      {
        source: '/reviews/messync',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/metatable-ai
      {
        source: '/reviews/metatable-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/mexty-ai
      {
        source: '/reviews/mexty-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/microsoft-copilot
      {
        source: '/reviews/microsoft-copilot',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/microsoft-powerpoint
      {
        source: '/reviews/microsoft-powerpoint',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/midi-agent
      {
        source: '/reviews/midi-agent',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/midjourney
      {
        source: '/reviews/midjourney',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/mindly
      {
        source: '/reviews/mindly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/miniflow
      {
        source: '/reviews/miniflow',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/mintly
      {
        source: '/reviews/mintly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/mirai
      {
        source: '/reviews/mirai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/mochii-ai
      {
        source: '/reviews/mochii-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/modelslab
      {
        source: '/reviews/modelslab',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/modulify-ai
      {
        source: '/reviews/modulify-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/monobot-cx
      {
        source: '/reviews/monobot-cx',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/morningscore
      {
        source: '/reviews/morningscore',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/motion
      {
        source: '/reviews/motion',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/motorcut
      {
        source: '/reviews/motorcut',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/movable-type
      {
        source: '/reviews/movable-type',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/moz-pro
      {
        source: '/reviews/moz-pro',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/mumble-note
      {
        source: '/reviews/mumble-note',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/munch-studio
      {
        source: '/reviews/munch-studio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/murf-ai
      {
        source: '/reviews/murf-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/murph-ai
      {
        source: '/reviews/murph-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/my-askai
      {
        source: '/reviews/my-askai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/myriade
      {
        source: '/reviews/myriade',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/mythic-text
      {
        source: '/reviews/mythic-text',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/n8n
      {
        source: '/reviews/n8n',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/nando-ai
      {
        source: '/reviews/nando-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/naturalreader
      {
        source: '/reviews/naturalreader',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/needle-ai
      {
        source: '/reviews/needle-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/neuravid
      {
        source: '/reviews/neuravid',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/new-website
      {
        source: '/reviews/new-website',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/nichesss
      {
        source: '/reviews/nichesss',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/nimagna
      {
        source: '/reviews/nimagna',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/nimblr-ai
      {
        source: '/reviews/nimblr-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/nlevel-ai
      {
        source: '/reviews/nlevel-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/notabl
      {
        source: '/reviews/notabl',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/noteey
      {
        source: '/reviews/noteey',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/notion-ai
      {
        source: '/reviews/notion-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/nyota
      {
        source: '/reviews/nyota',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ocoya
      {
        source: '/reviews/ocoya',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/octave
      {
        source: '/reviews/octave',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/octobot-cloud
      {
        source: '/reviews/octobot-cloud',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/octopus-crm
      {
        source: '/reviews/octopus-crm',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/octopus-do
      {
        source: '/reviews/octopus-do',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/olypsys
      {
        source: '/reviews/olypsys',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/omnisearch
      {
        source: '/reviews/omnisearch',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/onesky
      {
        source: '/reviews/onesky',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/opal
      {
        source: '/reviews/opal',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/open-interface
      {
        source: '/reviews/open-interface',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/open-lovable
      {
        source: '/reviews/open-lovable',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/open-paper
      {
        source: '/reviews/open-paper',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/openai-fm
      {
        source: '/reviews/openai-fm',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/openai-gpt4
      {
        source: '/reviews/openai-gpt4',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/optimizely
      {
        source: '/reviews/optimizely',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/optmyzr
      {
        source: '/reviews/optmyzr',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ordemio
      {
        source: '/reviews/ordemio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/otterai
      {
        source: '/reviews/otterai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/pageai
      {
        source: '/reviews/pageai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/pally
      {
        source: '/reviews/pally',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/panto-ai
      {
        source: '/reviews/panto-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/paperpal
      {
        source: '/reviews/paperpal',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/papira
      {
        source: '/reviews/papira',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/payroll-robot
      {
        source: '/reviews/payroll-robot',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/pencil-sketch-generator
      {
        source: '/reviews/pencil-sketch-generator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/perplexity-ai
      {
        source: '/reviews/perplexity-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/perso-ai
      {
        source: '/reviews/perso-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/phedra-ai
      {
        source: '/reviews/phedra-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/pheromind
      {
        source: '/reviews/pheromind',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/phoenix-new
      {
        source: '/reviews/phoenix-new',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/phonely-ai
      {
        source: '/reviews/phonely-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/photes-io
      {
        source: '/reviews/photes-io',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/picjam
      {
        source: '/reviews/picjam',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/pictory
      {
        source: '/reviews/pictory',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/pig
      {
        source: '/reviews/pig',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/pika-2-1
      {
        source: '/reviews/pika-2-1',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/pikr
      {
        source: '/reviews/pikr',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ping-ai-tasklist
      {
        source: '/reviews/ping-ai-tasklist',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/plansom
      {
        source: '/reviews/plansom',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/platus
      {
        source: '/reviews/platus',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/play-ht
      {
        source: '/reviews/play-ht',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/playground-ai
      {
        source: '/reviews/playground-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/playmix-ai
      {
        source: '/reviews/playmix-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/plexigen-ai
      {
        source: '/reviews/plexigen-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/plotaverse
      {
        source: '/reviews/plotaverse',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/podpally
      {
        source: '/reviews/podpally',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ponder
      {
        source: '/reviews/ponder',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/poppy-ai
      {
        source: '/reviews/poppy-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/postingcat
      {
        source: '/reviews/postingcat',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/postplanify
      {
        source: '/reviews/postplanify',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/postwhale
      {
        source: '/reviews/postwhale',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/potpie-ai
      {
        source: '/reviews/potpie-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/power-bi
      {
        source: '/reviews/power-bi',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ppc-io
      {
        source: '/reviews/ppc-io',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/precallai
      {
        source: '/reviews/precallai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/predis-ai
      {
        source: '/reviews/predis-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/presentations-ai
      {
        source: '/reviews/presentations-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/pressdeck
      {
        source: '/reviews/pressdeck',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/prodpad
      {
        source: '/reviews/prodpad',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/profound
      {
        source: '/reviews/profound',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/prompt-shuttle
      {
        source: '/reviews/prompt-shuttle',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/promptdc
      {
        source: '/reviews/promptdc',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/promptessor
      {
        source: '/reviews/promptessor',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/promptkit
      {
        source: '/reviews/promptkit',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/promptve
      {
        source: '/reviews/promptve',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/propstyle
      {
        source: '/reviews/propstyle',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/prose-fusion
      {
        source: '/reviews/prose-fusion',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/proxed-ai
      {
        source: '/reviews/proxed-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/pubmed-ai
      {
        source: '/reviews/pubmed-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/purecode-ai
      {
        source: '/reviews/purecode-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/qlik-sense
      {
        source: '/reviews/qlik-sense',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/qodex-ai
      {
        source: '/reviews/qodex-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/questdash
      {
        source: '/reviews/questdash',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/quickads
      {
        source: '/reviews/quickads',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/quiki-io
      {
        source: '/reviews/quiki-io',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/rafter
      {
        source: '/reviews/rafter',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/read-ai
      {
        source: '/reviews/read-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/readyscriptpro
      {
        source: '/reviews/readyscriptpro',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/reap-video
      {
        source: '/reviews/reap-video',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/receiptor-ai
      {
        source: '/reviews/receiptor-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/reclaim-ai
      {
        source: '/reviews/reclaim-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/reconxi
      {
        source: '/reviews/reconxi',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/recurse-ml
      {
        source: '/reviews/recurse-ml',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/reddibee
      {
        source: '/reviews/reddibee',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/redesignr-ai
      {
        source: '/reviews/redesignr-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/reelio
      {
        source: '/reviews/reelio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/regie-ai
      {
        source: '/reviews/regie-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/rekla-ai
      {
        source: '/reviews/rekla-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/release0
      {
        source: '/reviews/release0',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/rendable-3d
      {
        source: '/reviews/rendable-3d',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/renude
      {
        source: '/reviews/renude',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/replica-studios
      {
        source: '/reviews/replica-studios',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/replicate-ai
      {
        source: '/reviews/replicate-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/replit-ghost
      {
        source: '/reviews/replit-ghost',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/replit-ios-app
      {
        source: '/reviews/replit-ios-app',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/reportcraft
      {
        source: '/reviews/reportcraft',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/reportgarden
      {
        source: '/reviews/reportgarden',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/research-pal
      {
        source: '/reviews/research-pal',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/researchcollab-ai
      {
        source: '/reviews/researchcollab-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/resemble-ai
      {
        source: '/reviews/resemble-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/retell-media
      {
        source: '/reviews/retell-media',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/retellio
      {
        source: '/reviews/retellio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/retool
      {
        source: '/reviews/retool',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/retroteam
      {
        source: '/reviews/retroteam',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/rev
      {
        source: '/reviews/rev',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/reve-image
      {
        source: '/reviews/reve-image',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/reviewnicely
      {
        source: '/reviews/reviewnicely',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/rierino
      {
        source: '/reviews/rierino',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/riffusion-fuzz
      {
        source: '/reviews/riffusion-fuzz',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/right-click-prompt
      {
        source: '/reviews/right-click-prompt',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/rocket-new
      {
        source: '/reviews/rocket-new',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/rootly
      {
        source: '/reviews/rootly',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/rork
      {
        source: '/reviews/rork',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/rply
      {
        source: '/reviews/rply',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/runcell-dev
      {
        source: '/reviews/runcell-dev',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/runway-ml
      {
        source: '/reviews/runway-ml',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/runwayml
      {
        source: '/reviews/runwayml',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/rytr
      {
        source: '/reviews/rytr',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/salesblink
      {
        source: '/reviews/salesblink',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/salesflow
      {
        source: '/reviews/salesflow',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/salesforge
      {
        source: '/reviews/salesforge',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/saleshandy
      {
        source: '/reviews/saleshandy',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/saufter-ai
      {
        source: '/reviews/saufter-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/schedpilot
      {
        source: '/reviews/schedpilot',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/schedx
      {
        source: '/reviews/schedx',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/scifocus
      {
        source: '/reviews/scifocus',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/scite-ai
      {
        source: '/reviews/scite-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/scop-ai
      {
        source: '/reviews/scop-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/scrapegraphai
      {
        source: '/reviews/scrapegraphai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/screaming-frog-seo-spider
      {
        source: '/reviews/screaming-frog-seo-spider',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/screvi
      {
        source: '/reviews/screvi',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/se-ranking
      {
        source: '/reviews/se-ranking',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/seaart-ai
      {
        source: '/reviews/seaart-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/seamless-ai
      {
        source: '/reviews/seamless-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/seede-ai
      {
        source: '/reviews/seede-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/semrush
      {
        source: '/reviews/semrush',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/semrush-ai
      {
        source: '/reviews/semrush-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sendible
      {
        source: '/reviews/sendible',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sensetask
      {
        source: '/reviews/sensetask',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/serif-ai
      {
        source: '/reviews/serif-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/serpstat
      {
        source: '/reviews/serpstat',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sesame
      {
        source: '/reviews/sesame',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/shiplo
      {
        source: '/reviews/shiplo',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/shortwave
      {
        source: '/reviews/shortwave',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/signs
      {
        source: '/reviews/signs',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/similarweb
      {
        source: '/reviews/similarweb',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/simular-pro
      {
        source: '/reviews/simular-pro',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sitehunt
      {
        source: '/reviews/sitehunt',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sitekick
      {
        source: '/reviews/sitekick',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sitekick-powerful-landing-page-builder
      {
        source: '/reviews/sitekick-powerful-landing-page-builder',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sky
      {
        source: '/reviews/sky',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/skywork
      {
        source: '/reviews/skywork',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/smart-calendars-ai
      {
        source: '/reviews/smart-calendars-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/smythos
      {
        source: '/reviews/smythos',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/social-champ
      {
        source: '/reviews/social-champ',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/socialaf
      {
        source: '/reviews/socialaf',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/socialpilot
      {
        source: '/reviews/socialpilot',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sonofa
      {
        source: '/reviews/sonofa',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sophiana
      {
        source: '/reviews/sophiana',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sourcetable
      {
        source: '/reviews/sourcetable',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sparktoro
      {
        source: '/reviews/sparktoro',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/speechify
      {
        source: '/reviews/speechify',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/speechki-texttospeech-ai
      {
        source: '/reviews/speechki-texttospeech-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/speechmatics
      {
        source: '/reviews/speechmatics',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sprout-social
      {
        source: '/reviews/sprout-social',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/spyfu
      {
        source: '/reviews/spyfu',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/stability-ai-stable-diffusion
      {
        source: '/reviews/stability-ai-stable-diffusion',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/stable-diffusion
      {
        source: '/reviews/stable-diffusion',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/stammer-ai
      {
        source: '/reviews/stammer-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/statpecker
      {
        source: '/reviews/statpecker',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/stormy-ai
      {
        source: '/reviews/stormy-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/storyblocker
      {
        source: '/reviews/storyblocker',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/strella
      {
        source: '/reviews/strella',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/style3d-ai
      {
        source: '/reviews/style3d-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/submagic
      {
        source: '/reviews/submagic',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/sudowrite
      {
        source: '/reviews/sudowrite',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/suno
      {
        source: '/reviews/suno',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/supametas-ai
      {
        source: '/reviews/supametas-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/superluminal
      {
        source: '/reviews/superluminal',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/supermaker-ai
      {
        source: '/reviews/supermaker-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/superu-ai
      {
        source: '/reviews/superu-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/surf-new
      {
        source: '/reviews/surf-new',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/surfer-seo
      {
        source: '/reviews/surfer-seo',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/syllaby
      {
        source: '/reviews/syllaby',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/symvol
      {
        source: '/reviews/symvol',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/synexa-ai
      {
        source: '/reviews/synexa-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/synthesia
      {
        source: '/reviews/synthesia',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/synthesys
      {
        source: '/reviews/synthesys',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/synthflow-ai
      {
        source: '/reviews/synthflow-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tableau-ai
      {
        source: '/reviews/tableau-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tablesprint
      {
        source: '/reviews/tablesprint',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tabnine
      {
        source: '/reviews/tabnine',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/talk-journal
      {
        source: '/reviews/talk-journal',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/talkstack-ai
      {
        source: '/reviews/talkstack-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tana
      {
        source: '/reviews/tana',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tapclicks
      {
        source: '/reviews/tapclicks',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tapflow
      {
        source: '/reviews/tapflow',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/taplio
      {
        source: '/reviews/taplio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tasker-ai
      {
        source: '/reviews/tasker-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tavus
      {
        source: '/reviews/tavus',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/taxgpt
      {
        source: '/reviews/taxgpt',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/teal
      {
        source: '/reviews/teal',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/teammately
      {
        source: '/reviews/teammately',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/telex
      {
        source: '/reviews/telex',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tellersai-automatic-texttovideo-tool
      {
        source: '/reviews/tellersai-automatic-texttovideo-tool',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ten
      {
        source: '/reviews/ten',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tenali
      {
        source: '/reviews/tenali',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/testmyprompt
      {
        source: '/reviews/testmyprompt',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/testzeus
      {
        source: '/reviews/testzeus',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/text-to-video-stunning-video-creation
      {
        source: '/reviews/text-to-video-stunning-video-creation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/texttovideo-stunning-video-creation
      {
        source: '/reviews/texttovideo-stunning-video-creation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/the-librarian
      {
        source: '/reviews/the-librarian',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/the-way-of-code
      {
        source: '/reviews/the-way-of-code',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/theo
      {
        source: '/reviews/theo',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/there
      {
        source: '/reviews/there',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/there-revolutionizing-reports-with-ai
      {
        source: '/reviews/there-revolutionizing-reports-with-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/theysaid
      {
        source: '/reviews/theysaid',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/thiings
      {
        source: '/reviews/thiings',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/thumbnails-labs
      {
        source: '/reviews/thumbnails-labs',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/thunder-code
      {
        source: '/reviews/thunder-code',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ticketmine-ai
      {
        source: '/reviews/ticketmine-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/toolhouse
      {
        source: '/reviews/toolhouse',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/topical-authority-for-seo-gpt-generator
      {
        source: '/reviews/topical-authority-for-seo-gpt-generator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/topk
      {
        source: '/reviews/topk',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/touchbase
      {
        source: '/reviews/touchbase',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/trace-ai
      {
        source: '/reviews/trace-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tradesanta
      {
        source: '/reviews/tradesanta',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/translate-gpt-for-convenient-translation
      {
        source: '/reviews/translate-gpt-for-convenient-translation',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/translatevideos-io
      {
        source: '/reviews/translatevideos-io',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/transmonkey
      {
        source: '/reviews/transmonkey',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/trello-butler
      {
        source: '/reviews/trello-butler',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/triviat
      {
        source: '/reviews/triviat',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/trueclicks
      {
        source: '/reviews/trueclicks',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/trupeer-ai
      {
        source: '/reviews/trupeer-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tryonora
      {
        source: '/reviews/tryonora',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/tugan-ai
      {
        source: '/reviews/tugan-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/turbodoc
      {
        source: '/reviews/turbodoc',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/twin-ai
      {
        source: '/reviews/twin-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/two-minute-reports
      {
        source: '/reviews/two-minute-reports',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/typesmith
      {
        source: '/reviews/typesmith',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/typethinkai
      {
        source: '/reviews/typethinkai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/typito
      {
        source: '/reviews/typito',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/udio
      {
        source: '/reviews/udio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/unbaited
      {
        source: '/reviews/unbaited',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/unbounce
      {
        source: '/reviews/unbounce',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/unbounce-ai-landing-page-builder
      {
        source: '/reviews/unbounce-ai-landing-page-builder',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/undatasio
      {
        source: '/reviews/undatasio',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/unifylabs
      {
        source: '/reviews/unifylabs',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/uniscribe
      {
        source: '/reviews/uniscribe',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/universe-nocode-custom-website-builder
      {
        source: '/reviews/universe-nocode-custom-website-builder',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/unrav-io
      {
        source: '/reviews/unrav-io',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/unreal-speech-costeffective-texttospeech-api
      {
        source: '/reviews/unreal-speech-costeffective-texttospeech-api',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/unsolomind
      {
        source: '/reviews/unsolomind',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/urbiverse
      {
        source: '/reviews/urbiverse',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/url-to-any
      {
        source: '/reviews/url-to-any',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/ux-pilot
      {
        source: '/reviews/ux-pilot',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vaiz
      {
        source: '/reviews/vaiz',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vectal
      {
        source: '/reviews/vectal',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/veeroll
      {
        source: '/reviews/veeroll',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/venice-ai
      {
        source: '/reviews/venice-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/veo
      {
        source: '/reviews/veo',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/verbacall
      {
        source: '/reviews/verbacall',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vercept
      {
        source: '/reviews/vercept',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vetis
      {
        source: '/reviews/vetis',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vibeflow
      {
        source: '/reviews/vibeflow',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vibescan
      {
        source: '/reviews/vibescan',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/victoria
      {
        source: '/reviews/victoria',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vidau-ai
      {
        source: '/reviews/vidau-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/video-generator-meta-ai
      {
        source: '/reviews/video-generator-meta-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/video-gpt-ai-video-maker
      {
        source: '/reviews/video-gpt-ai-video-maker',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/videoplus-ai
      {
        source: '/reviews/videoplus-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/videotube-ai
      {
        source: '/reviews/videotube-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vidur
      {
        source: '/reviews/vidur',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/viewstats
      {
        source: '/reviews/viewstats',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vinteo-ai
      {
        source: '/reviews/vinteo-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/voagents-ai
      {
        source: '/reviews/voagents-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vogent
      {
        source: '/reviews/vogent',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/voicv
      {
        source: '/reviews/voicv',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/voiset
      {
        source: '/reviews/voiset',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vomyra
      {
        source: '/reviews/vomyra',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/votars
      {
        source: '/reviews/votars',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vowel
      {
        source: '/reviews/vowel',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/vozart-ai
      {
        source: '/reviews/vozart-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/wand-ai
      {
        source: '/reviews/wand-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/wavespeed-ai
      {
        source: '/reviews/wavespeed-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/weavy
      {
        source: '/reviews/weavy',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/webbotify-aipowered-chatbot-platform
      {
        source: '/reviews/webbotify-aipowered-chatbot-platform',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/webcrawler-api
      {
        source: '/reviews/webcrawler-api',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/webflow-s-ai-site-builder
      {
        source: '/reviews/webflow-s-ai-site-builder',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/weblium-convenient-ai-website-builder
      {
        source: '/reviews/weblium-convenient-ai-website-builder',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/website-generator-meta-ai
      {
        source: '/reviews/website-generator-meta-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/wellmeright
      {
        source: '/reviews/wellmeright',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/wellpin
      {
        source: '/reviews/wellpin',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/wellsaid-labs
      {
        source: '/reviews/wellsaid-labs',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/whispertranscribe
      {
        source: '/reviews/whispertranscribe',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/windsurf
      {
        source: '/reviews/windsurf',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/wiseppc
      {
        source: '/reviews/wiseppc',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/witsy
      {
        source: '/reviews/witsy',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/wondercraft
      {
        source: '/reviews/wondercraft',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/wordstream
      {
        source: '/reviews/wordstream',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/workflawless
      {
        source: '/reviews/workflawless',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/worxmate
      {
        source: '/reviews/worxmate',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/writesonic
      {
        source: '/reviews/writesonic',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/wui-ai
      {
        source: '/reviews/wui-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/wuko-ai
      {
        source: '/reviews/wuko-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/xavier-ai
      {
        source: '/reviews/xavier-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/xyla-ai
      {
        source: '/reviews/xyla-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/yoink
      {
        source: '/reviews/yoink',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/yue
      {
        source: '/reviews/yue',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/zapier-ai
      {
        source: '/reviews/zapier-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/zapt-powerful-ai-app-builder
      {
        source: '/reviews/zapt-powerful-ai-app-builder',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/zenor-ai
      {
        source: '/reviews/zenor-ai',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/zepic
      {
        source: '/reviews/zepic',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/zola-analytics
      {
        source: '/reviews/zola-analytics',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /reviews/zuzia
      {
        source: '/reviews/zuzia',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /testimonials
      {
        source: '/testimonials',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/ai-cost-calculator
      {
        source: '/tools/ai-cost-calculator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/ai-roi-calculator
      {
        source: '/tools/ai-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/chatbot-roi-calculator
      {
        source: '/tools/chatbot-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/content-roi-calculator
      {
        source: '/tools/content-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/conversion-roi-calculator
      {
        source: '/tools/conversion-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/data-science-roi
      {
        source: '/tools/data-science-roi',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/enterprise-ai-calculator
      {
        source: '/tools/enterprise-ai-calculator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/fintech-ai-roi
      {
        source: '/tools/fintech-ai-roi',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/healthcare-ai-roi
      {
        source: '/tools/healthcare-ai-roi',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/manufacturing-roi-calculator
      {
        source: '/tools/manufacturing-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/marketing-roi-calculator
      {
        source: '/tools/marketing-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/no-code-ai-roi
      {
        source: '/tools/no-code-ai-roi',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/recruitment-roi-calculator
      {
        source: '/tools/recruitment-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/sales-ai-roi
      {
        source: '/tools/sales-ai-roi',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /tools/security-roi-calculator
      {
        source: '/tools/security-roi-calculator',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /videos/ai-integration-masterclass
      {
        source: '/videos/ai-integration-masterclass',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /videos/ai-tools-comparison
      {
        source: '/videos/ai-tools-comparison',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /videos/claude-ai-business-setup
      {
        source: '/videos/claude-ai-business-setup',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /webinars
      {
        source: '/webinars',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /webinars/download/ai-analytics-toolkit
      {
        source: '/webinars/download/ai-analytics-toolkit',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /webinars/download/ai-compliance-framework
      {
        source: '/webinars/download/ai-compliance-framework',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /webinars/download/ai-content-marketing-resources
      {
        source: '/webinars/download/ai-content-marketing-resources',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /webinars/download/no-code-ai-resources
      {
        source: '/webinars/download/no-code-ai-resources',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /webinars/monthly-tools-series
      {
        source: '/webinars/monthly-tools-series',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /webinars/watch/ai-content-marketing-masterclass
      {
        source: '/webinars/watch/ai-content-marketing-masterclass',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /webinars/watch/ai-data-analysis-revolution
      {
        source: '/webinars/watch/ai-data-analysis-revolution',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /webinars/watch/ai-ethics-compliance
      {
        source: '/webinars/watch/ai-ethics-compliance',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /webinars/watch/no-code-ai-apps
      {
        source: '/webinars/watch/no-code-ai-apps',
        destination: '/tools',
        permanent: true,
      },
      // Fix 308 redirect: /why-us
      {
        source: '/why-us',
        destination: '/tools',
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