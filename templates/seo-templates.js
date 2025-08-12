// SEO Templates for AI Tool Comparison Pages
// Based on keyword research and best practices

export const metaTitleTemplates = {
  // Primary template - optimized for CTR and relevance
  primary: (toolA, toolB) => `${toolA} vs ${toolB}: AI Tool Comparison & Pricing Calculator`,
  
  // Alternative templates for variety and testing
  alternatives: {
    detailed: (toolA, toolB) => `${toolA} vs ${toolB} - Features, Pricing & Performance [2025]`,
    question: (toolA, toolB) => `${toolA} or ${toolB}? Complete AI Comparison Guide`,
    benefit: (toolA, toolB) => `${toolA} vs ${toolB}: Which AI Tool Saves You More?`,
    specific: (toolA, toolB) => `${toolA} vs ${toolB} Comparison: Pricing, Features & Reviews`,
    year: (toolA, toolB) => `${toolA} vs ${toolB}: Best AI Tool Comparison 2025`
  }
};

export const metaDescriptionTemplates = {
  // Primary template - includes all key elements
  primary: (toolA, toolB, priceA, priceB) => 
    `Compare ${toolA} and ${toolB} side-by-side with features, pricing (${priceA} vs ${priceB}), ratings, and FAQs. Use our interactive calculator to find your best AI tool.`,
  
  // Alternative templates for different focuses
  alternatives: {
    detailed: (toolA, toolB, priceA, priceB) => 
      `${toolA} vs ${toolB}: Complete comparison of features, pricing (${priceA} vs ${priceB}), pros/cons, and use cases. Expert analysis with pricing calculator included.`,
    
    benefit: (toolA, toolB, savings) => 
      `${toolA} vs ${toolB} comparison reveals which AI tool offers better value. Compare features, pricing, and save up to ${savings}/month with our calculator.`,
    
    question: (toolA, toolB) => 
      `Choosing between ${toolA} and ${toolB}? Our detailed comparison covers pricing, features, performance, and user reviews to help you decide.`,
    
    actionable: (toolA, toolB) => 
      `Compare ${toolA} vs ${toolB} with our interactive tool. Filter by price, features, team size. Get personalized recommendations and pricing estimates.`,
    
    specific: (toolA, toolB, category) => 
      `${toolA} vs ${toolB} for ${category}: Compare features, pricing plans, integrations, and user ratings. Free comparison calculator included.`
  }
};

export const keywordLists = {
  // Core comparison keywords
  comparison: [
    'vs', 'versus', 'comparison', 'compare', 'alternative', 'substitute',
    'better than', 'difference between', 'which is better'
  ],
  
  // Feature-related keywords
  features: [
    'features', 'capabilities', 'functionality', 'tools', 'options',
    'integrations', 'API', 'collaboration', 'templates', 'automation'
  ],
  
  // Pricing keywords
  pricing: [
    'pricing', 'cost', 'price', 'plans', 'subscription', 'monthly',
    'yearly', 'free trial', 'enterprise', 'calculator', 'savings'
  ],
  
  // Quality indicators
  quality: [
    'review', 'rating', 'performance', 'reliability', 'accuracy',
    'speed', 'quality', 'best', 'top', 'leading'
  ],
  
  // Intent keywords
  intent: [
    'choose', 'select', 'decide', 'pick', 'find', 'get', 'buy',
    'try', 'test', 'evaluate', 'assess'
  ],
  
  // Year/freshness
  temporal: [
    '2025', 'latest', 'updated', 'current', 'new', 'recent'
  ]
};

export const altTagTemplates = {
  // Logo alt tags
  logo: (toolName) => `${toolName} AI tool logo`,
  logoDetailed: (toolName, vendor) => `${toolName} by ${vendor} - AI tool logo`,
  
  // Feature images
  feature: (toolName, feature) => `${toolName} ${feature} interface screenshot`,
  
  // Comparison images
  comparison: (toolA, toolB) => `${toolA} vs ${toolB} feature comparison chart`,
  
  // Pricing images
  pricing: (toolName) => `${toolName} pricing plans and calculator`,
  
  // Dashboard/interface images
  interface: (toolName) => `${toolName} user interface and dashboard view`,
  
  // Rating/review images
  rating: (toolName, rating) => `${toolName} ${rating} star rating and user reviews`,
  
  // Use case images
  useCase: (toolName, useCase) => `${toolName} for ${useCase} - example usage`,
  
  // Integration images
  integration: (toolName, integration) => `${toolName} ${integration} integration setup`
};

export const schemaTemplates = {
  // FAQ Schema template
  faqSchema: (faqs) => ({
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
  }),
  
  // Product Schema template
  productSchema: (tool) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.tool_name,
    "description": tool.description,
    "url": tool.official_url,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": tool.pricing.plans.map(plan => ({
      "@type": "Offer",
      "name": plan.plan_name,
      "price": plan.price.replace(/[^0-9.]/g, '') || "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })),
    "aggregateRating": tool.rating ? {
      "@type": "AggregateRating",
      "ratingValue": tool.rating,
      "reviewCount": tool.review_count || 100,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "featureList": [
      ...tool.features.core,
      ...tool.features.advanced
    ],
    "softwareVersion": "Latest",
    "releaseNotes": `${tool.tool_name} offers comprehensive AI capabilities for business users.`,
    "screenshot": tool.logo_url,
    "downloadUrl": tool.official_url,
    "installUrl": tool.official_url
  }),
  
  // Article Schema for comparison pages
  articleSchema: (toolA, toolB, pageTitle, metaDescription, slug) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": metaDescription,
    "author": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SiteOptz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://siteoptz.com/logo.png"
      }
    },
    "datePublished": "2025-01-15",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://siteoptz.com/compare/${slug}`
    },
    "about": [
      {
        "@type": "SoftwareApplication",
        "name": toolA.tool_name
      },
      {
        "@type": "SoftwareApplication", 
        "name": toolB.tool_name
      }
    ],
    "mentions": [
      {
        "@type": "Thing",
        "name": "AI Tool Comparison"
      },
      {
        "@type": "Thing",
        "name": "Pricing Calculator"
      },
      {
        "@type": "Thing",
        "name": "Feature Analysis"
      }
    ]
  }),
  
  // Breadcrumb Schema
  breadcrumbSchema: (toolA, toolB, slug) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://siteoptz.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Tools",
        "item": "https://siteoptz.com/ai-tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Compare",
        "item": "https://siteoptz.com/compare"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${toolA.tool_name} vs ${toolB.tool_name}`,
        "item": `https://siteoptz.com/compare/${slug}`
      }
    ]
  }),
  
  // How-to Schema for using the pricing calculator
  howToSchema: (toolA, toolB) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Compare ${toolA.tool_name} and ${toolB.tool_name} Pricing`,
    "description": `Step-by-step guide to using our pricing calculator to compare ${toolA.tool_name} vs ${toolB.tool_name} costs for your team.`,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter team size",
        "text": "Input the number of users who will use the AI tool in your organization."
      },
      {
        "@type": "HowToStep", 
        "name": "Estimate monthly usage",
        "text": "Enter your expected monthly API calls, messages, or generations."
      },
      {
        "@type": "HowToStep",
        "name": "Select payment cycle",
        "text": "Choose between monthly or yearly billing to see potential savings."
      },
      {
        "@type": "HowToStep",
        "name": "Compare results",
        "text": "Review the calculated costs for both tools and identify the best value option."
      }
    ]
  })
};

export const generateSEOData = (toolA, toolB, slug) => {
  const priceA = toolA.pricing.plans[0]?.price || 'Custom';
  const priceB = toolB.pricing.plans[0]?.price || 'Custom';
  
  const pageTitle = metaTitleTemplates.primary(toolA.tool_name, toolB.tool_name);
  const metaDescription = metaDescriptionTemplates.primary(toolA.tool_name, toolB.tool_name, priceA, priceB);
  
  const combinedFAQs = [...toolA.faq, ...toolB.faq];
  
  return {
    pageTitle,
    metaDescription,
    schemas: {
      faq: schemaTemplates.faqSchema(combinedFAQs),
      productA: schemaTemplates.productSchema(toolA),
      productB: schemaTemplates.productSchema(toolB),
      article: schemaTemplates.articleSchema(toolA, toolB, pageTitle, metaDescription, slug),
      breadcrumb: schemaTemplates.breadcrumbSchema(toolA, toolB, slug),
      howTo: schemaTemplates.howToSchema(toolA, toolB)
    },
    keywords: [
      `${toolA.tool_name} vs ${toolB.tool_name}`,
      `${toolA.tool_name} comparison`,
      `${toolB.tool_name} comparison`,
      `${toolA.tool_name} alternative`,
      `${toolB.tool_name} alternative`,
      'AI tools comparison 2025',
      `${toolA.tool_name} review`,
      `${toolB.tool_name} review`,
      `${toolA.tool_name} pricing`,
      `${toolB.tool_name} pricing`,
      'AI tool calculator',
      'pricing calculator'
    ].join(', ')
  };
};