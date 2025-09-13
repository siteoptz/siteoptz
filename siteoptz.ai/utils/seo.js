// SEO utilities for dynamic meta tags and JSON-LD schema generation

/**
 * Generate optimized meta title for tool comparisons
 * @param {string} toolA - First tool name
 * @param {string} toolB - Second tool name (optional)
 * @returns {string} Optimized meta title
 */
export function generateMetaTitle(toolA, toolB = null) {
  if (toolB) {
    return `${toolA} vs ${toolB}: AI Tool Comparison & Pricing Calculator | SiteOptz`;
  }
  return `${toolA} Review: Features, Pricing & Alternatives | SiteOptz`;
}

/**
 * Generate optimized meta description
 * @param {string} toolA - First tool name
 * @param {string} toolB - Second tool name (optional)
 * @param {Object} toolAData - Tool A data object
 * @param {Object} toolBData - Tool B data object (optional)
 * @returns {string} Meta description (155-160 characters)
 */
export function generateMetaDescription(toolA, toolB = null, toolAData = {}, toolBData = {}) {
  const priceA = toolAData.pricing?.startingPrice ? `$${toolAData.pricing.startingPrice}` : 'Free';
  
  if (toolB && toolBData) {
    const priceB = toolBData.pricing?.startingPrice ? `$${toolBData.pricing.startingPrice}` : 'Free';
    return `Compare ${toolA} vs ${toolB}: features, pricing (${priceA} vs ${priceB}), and ratings. Use our calculator to find the best AI tool for your needs.`;
  }
  
  return `${toolA} review: features, pricing (starts at ${priceA}), pros/cons, and alternatives. Complete guide to help you decide if ${toolA} is right for you.`;
}

/**
 * Generate keywords for SEO
 * @param {string} toolA - First tool name
 * @param {string} toolB - Second tool name (optional)
 * @returns {string} Comma-separated keywords
 */
export function generateKeywords(toolA, toolB = null) {
  const baseKeywords = [
    `${toolA} review`,
    `${toolA} pricing`,
    `${toolA} features`,
    `${toolA} alternatives`,
    'AI tools comparison',
    'AI assistant',
    'pricing calculator'
  ];

  if (toolB) {
    const comparisonKeywords = [
      `${toolA} vs ${toolB}`,
      `${toolA} comparison`,
      `${toolB} comparison`,
      `${toolA} alternative`,
      `${toolB} alternative`,
      'AI tool comparison 2025'
    ];
    return [...baseKeywords, ...comparisonKeywords].join(', ');
  }

  return baseKeywords.join(', ');
}

/**
 * Generate FAQ Schema markup
 * @param {Array} faqs - Array of FAQ objects
 * @returns {Object} JSON-LD FAQ schema
 */
export function generateFAQSchema(faqs) {
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
}

/**
 * Generate Product Schema for AI tools
 * @param {Object} tool - Tool data object
 * @returns {Object} JSON-LD Product schema
 */
export function generateProductSchema(tool) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": tool.website,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "softwareVersion": "Latest",
    "offers": tool.pricing.plans.map(plan => ({
      "@type": "Offer",
      "name": plan.name,
      "price": plan.price === "Custom" ? "0" : plan.price.toString(),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })),
    "featureList": tool.features.core,
    "screenshot": tool.logo,
    "downloadUrl": tool.website,
    "installUrl": tool.website
  };

  // Add aggregate rating if available
  if (tool.rating && tool.reviewCount) {
    baseSchema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": tool.rating,
      "reviewCount": tool.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    };
  }

  return baseSchema;
}

/**
 * Generate Article Schema for comparison pages
 * @param {string} toolA - First tool name
 * @param {string} toolB - Second tool name (optional)
 * @param {string} url - Page URL
 * @returns {Object} JSON-LD Article schema
 */
export function generateArticleSchema(toolA, toolB = null, url) {
  const title = generateMetaTitle(toolA, toolB);
  const description = generateMetaDescription(toolA, toolB);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SiteOptz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://siteoptz.ai/images/logo.png",
        "width": 600,
        "height": 60
      }
    },
    "datePublished": "2025-01-15",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "about": toolB ? [
      {
        "@type": "SoftwareApplication",
        "name": toolA,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.5,
          "reviewCount": 1000,
          "bestRating": 5,
          "worstRating": 1
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": toolB,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.5,
          "reviewCount": 1000,
          "bestRating": 5,
          "worstRating": 1
        }
      }
    ] : [
      {
        "@type": "SoftwareApplication",
        "name": toolA,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.5,
          "reviewCount": 1000,
          "bestRating": 5,
          "worstRating": 1
        }
      }
    ]
  };
}

/**
 * Generate Breadcrumb Schema
 * @param {Array} breadcrumbs - Array of breadcrumb objects with name and url
 * @returns {Object} JSON-LD Breadcrumb schema
 */
export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

/**
 * Generate HowTo Schema for pricing calculator
 * @param {string} toolA - First tool name
 * @param {string} toolB - Second tool name (optional)
 * @returns {Object} JSON-LD HowTo schema
 */
export function generateHowToSchema(toolA, toolB = null) {
  const tools = toolB ? `${toolA} and ${toolB}` : toolA;
  
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Compare ${tools} Pricing`,
    "description": `Step-by-step guide to using our pricing calculator to compare ${tools} costs for your team.`,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter team size",
        "text": "Input the number of users who will use the AI tool in your organization."
      },
      {
        "@type": "HowToStep",
        "name": "Select usage level",
        "text": "Choose your expected monthly usage: light, moderate, or heavy."
      },
      {
        "@type": "HowToStep",
        "name": "Choose billing cycle",
        "text": "Select between monthly or yearly billing to see potential savings."
      },
      {
        "@type": "HowToStep",
        "name": "Compare results",
        "text": "Review the calculated costs and identify the best value option for your needs."
      }
    ]
  };
}

/**
 * Generate Organization Schema for SiteOptz
 * @returns {Object} JSON-LD Organization schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SiteOptz",
    "url": "https://siteoptz.ai",
    "logo": "https://siteoptz.ai/images/logo.png",
    "description": "AI tool comparison and optimization platform helping businesses choose the right AI solutions.",
    "sameAs": [
      "https://twitter.com/siteoptz",
      "https://linkedin.com/company/siteoptz"
    ]
  };
}

/**
 * Generate complete SEO data package
 * @param {Object} params - Parameters object
 * @returns {Object} Complete SEO data
 */
export function generateSEOData(params) {
  const { toolA, toolB, toolAData, toolBData, url, faqs = [], breadcrumbs = [] } = params;
  
  const seoData = {
    title: generateMetaTitle(toolA, toolB),
    description: generateMetaDescription(toolA, toolB, toolAData, toolBData),
    keywords: generateKeywords(toolA, toolB),
    canonical: url,
    schemas: {
      article: generateArticleSchema(toolA, toolB, url),
      organization: generateOrganizationSchema()
    }
  };

  // Add optional schemas if data is available
  if (faqs.length > 0) {
    seoData.schemas.faq = generateFAQSchema(faqs);
  }

  if (breadcrumbs.length > 0) {
    seoData.schemas.breadcrumb = generateBreadcrumbSchema(breadcrumbs);
  }

  if (toolAData) {
    seoData.schemas.productA = generateProductSchema(toolAData);
  }

  if (toolBData) {
    seoData.schemas.productB = generateProductSchema(toolBData);
    seoData.schemas.howTo = generateHowToSchema(toolA, toolB);
  }

  return seoData;
}