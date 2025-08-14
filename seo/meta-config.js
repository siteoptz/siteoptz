/**
 * SEO Meta Configuration for SiteOptz AI
 * Centralized keyword research and meta tag management
 */

// Base configuration
export const siteConfig = {
  siteName: 'SiteOptz',
  baseUrl: 'https://siteoptz.ai',
  defaultTitle: 'SiteOptz - AI Tools Reviews & Comparisons | Best AI Software 2025',
  defaultDescription: 'Discover the best AI tools for 2025. Expert reviews, detailed comparisons, and pricing analysis of ChatGPT, Claude, Gemini, and 200+ AI software solutions.',
  defaultKeywords: [
    'AI tools',
    'artificial intelligence software',
    'AI tool reviews',
    'AI software comparison',
    'best AI tools 2025',
    'ChatGPT alternatives',
    'AI tool pricing',
    'machine learning tools'
  ],
  twitterHandle: '@siteoptz',
  author: 'SiteOptz Team'
};

// Page-specific SEO configurations with keyword research
export const pageConfigs = {
  // Homepage
  home: {
    title: 'SiteOptz - Best AI Tools Reviews & Comparisons 2025 | Expert Analysis',
    description: 'Find the perfect AI tool for your needs. Compare 200+ AI software including ChatGPT, Claude, Gemini with expert reviews, pricing analysis, and feature comparisons.',
    keywords: [
      'best AI tools 2025',
      'AI software reviews',
      'AI tool comparison',
      'ChatGPT vs Claude',
      'artificial intelligence tools',
      'AI productivity software',
      'machine learning platforms',
      'AI writing tools',
      'AI image generators',
      'conversational AI'
    ],
    ogType: 'website'
  },

  // Tools listing page
  tools: {
    title: 'AI Tools Directory - 200+ Best AI Software Reviews & Ratings 2025',
    description: 'Comprehensive directory of AI tools with expert reviews, user ratings, and detailed feature analysis. Find the right AI software for content creation, coding, design, and more.',
    keywords: [
      'AI tools directory',
      'AI software catalog',
      'AI tool reviews',
      'artificial intelligence tools list',
      'best AI software 2025',
      'AI productivity tools',
      'business AI tools',
      'AI writing software',
      'AI design tools',
      'AI coding assistants'
    ],
    ogType: 'website'
  },

  // Comparisons page
  comparisons: {
    title: 'AI Tools Comparisons - ChatGPT vs Claude vs Gemini | Expert Analysis',
    description: 'In-depth AI tool comparisons with benchmarks, pricing analysis, and feature breakdowns. Compare ChatGPT, Claude, Gemini, and other leading AI platforms.',
    keywords: [
      'AI tool comparisons',
      'ChatGPT vs Claude',
      'AI software comparison',
      'best AI chatbot',
      'AI model comparison',
      'artificial intelligence benchmarks',
      'AI tool alternatives',
      'AI platform comparison',
      'conversational AI comparison',
      'LLM comparison'
    ],
    ogType: 'website'
  },

  // About page
  about: {
    title: 'About SiteOptz - AI Tools Expert Reviews & Analysis Team',
    description: 'Learn about SiteOptz mission to help businesses and individuals find the best AI tools through expert reviews, detailed comparisons, and unbiased analysis.',
    keywords: [
      'about SiteOptz',
      'AI tools expert',
      'AI software reviews team',
      'artificial intelligence analysis',
      'AI tool research',
      'technology reviews'
    ],
    ogType: 'website'
  },

  // Contact page
  contact: {
    title: 'Contact SiteOptz - AI Tools Review Questions & Partnership Inquiries',
    description: 'Get in touch with SiteOptz for AI tool review requests, partnership opportunities, or questions about our AI software analysis and comparisons.',
    keywords: [
      'contact SiteOptz',
      'AI tool review request',
      'AI software partnership',
      'technology review contact',
      'AI tools inquiry'
    ],
    ogType: 'website'
  }
};

// Dynamic meta generation functions
export const generateToolMeta = (tool) => {
  if (!tool) return null;

  const toolName = tool.name || '';
  const description = tool.overview?.description || tool.description || '';
  const category = tool.category || 'AI Tool';
  
  return {
    title: `${toolName} Review 2025 - Features, Pricing & Alternatives | SiteOptz`,
    description: `${toolName} complete review: ${description.substring(0, 120)}... Expert analysis, pricing comparison, and best alternatives for ${category.toLowerCase()}.`,
    keywords: [
      `${toolName} review`,
      `${toolName} pricing`,
      `${toolName} features`,
      `${toolName} alternatives`,
      `${toolName} vs`,
      `best ${category.toLowerCase()}`,
      `${toolName} tutorial`,
      `${toolName} comparison`,
      'AI tool review',
      'artificial intelligence software'
    ],
    ogType: 'article',
    structuredData: generateSoftwareApplicationSchema(tool)
  };
};

export const generateComparisonMeta = (tool1, tool2) => {
  if (!tool1 || !tool2) return null;

  const tool1Name = tool1.name || '';
  const tool2Name = tool2.name || '';
  
  return {
    title: `${tool1Name} vs ${tool2Name} 2025 - Complete Comparison & Review | SiteOptz`,
    description: `${tool1Name} vs ${tool2Name}: Detailed comparison of features, pricing, performance, and user reviews. Expert analysis to help you choose the right AI tool.`,
    keywords: [
      `${tool1Name} vs ${tool2Name}`,
      `${tool1Name} comparison`,
      `${tool2Name} comparison`,
      `${tool1Name} alternative`,
      `${tool2Name} alternative`,
      'AI tool comparison',
      'AI software comparison',
      `${tool1Name} pricing`,
      `${tool2Name} pricing`,
      'best AI tool 2025',
      'artificial intelligence comparison'
    ],
    ogType: 'article'
  };
};

// Structured data schemas
export const generateSoftwareApplicationSchema = (tool) => {
  if (!tool) return null;

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.overview?.description || tool.description,
    "url": tool.website || `${siteConfig.baseUrl}/tools/${tool.slug}`,
    "applicationCategory": "Artificial Intelligence Software",
    "operatingSystem": "Web, Windows, macOS, Linux",
    "author": {
      "@type": "Organization",
      "name": tool.company || "Unknown"
    },
    "offers": generatePricingOffers(tool.pricing || tool.pricingPlans),
    "featureList": tool.features || [],
    "screenshot": tool.logo || `${siteConfig.baseUrl}/images/tools/${tool.slug}.png`
  };

  // Add aggregateRating if reviews exist
  if (tool.rating || tool.reviews) {
    baseSchema.aggregateRating = generateAggregateRating(tool);
  }

  return baseSchema;
};

export const generateAggregateRating = (tool) => {
  if (!tool) return null;

  const rating = tool.rating || 4.5; // Default rating
  const reviewCount = tool.reviewCount || tool.reviews?.length || 100;

  return {
    "@type": "AggregateRating",
    "ratingValue": rating,
    "ratingCount": reviewCount,
    "bestRating": 5,
    "worstRating": 1
  };
};

export const generatePricingOffers = (pricing) => {
  if (!pricing || !Array.isArray(pricing)) return null;

  return pricing.map(plan => ({
    "@type": "Offer",
    "name": plan.plan || plan.name,
    "price": plan.price_per_month || plan.monthlyPrice || 0,
    "priceCurrency": "USD",
    "billingIncrement": "Monthly",
    "description": plan.features?.join(', ') || '',
    "availability": "https://schema.org/InStock"
  }));
};

// FAQ Schema generator
export const generateFAQSchema = (faqs) => {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Breadcrumb Schema generator
export const generateBreadcrumbSchema = (breadcrumbs) => {
  if (!breadcrumbs || !Array.isArray(breadcrumbs)) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// Meta tags generator
export const generateMetaTags = (config) => {
  if (!config) return [];

  const tags = [
    { name: 'description', content: config.description },
    { name: 'keywords', content: config.keywords?.join(', ') },
    { name: 'author', content: siteConfig.author },
    { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    
    // Open Graph tags
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:type', content: config.ogType || 'website' },
    { property: 'og:site_name', content: siteConfig.siteName },
    { property: 'og:locale', content: 'en_US' },
    
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: siteConfig.twitterHandle },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
    
    // Additional SEO tags
    { name: 'theme-color', content: '#3b82f6' },
    { name: 'msapplication-TileColor', content: '#3b82f6' },
    { httpEquiv: 'Content-Type', content: 'text/html; charset=utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ];

  return tags.filter(tag => tag.content); // Remove empty tags
};

// Export utility functions
export const getPageConfig = (pageKey) => {
  return pageConfigs[pageKey] || {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    keywords: siteConfig.defaultKeywords,
    ogType: 'website'
  };
};

export const buildCanonicalUrl = (path) => {
  return `${siteConfig.baseUrl}${path}`;
};

export const buildOgImageUrl = (path, title) => {
  // Generate dynamic OG images or use default
  return `${siteConfig.baseUrl}/api/og?title=${encodeURIComponent(title)}`;
};