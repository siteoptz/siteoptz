const fs = require('fs').promises;
const path = require('path');

// SiteOptz.ai compatible category mappings
const SITEOPTZ_CATEGORIES = {
  // Voice & Audio
  'voice': 'Best Voice AI Tools',
  'audio': 'Best Voice AI Tools', 
  'text-to-speech': 'Best Voice AI Tools',
  'tts': 'Best Voice AI Tools',
  'speech': 'Best Voice AI Tools',
  'music': 'Best Voice AI Tools',
  'sound': 'Best Voice AI Tools',
  
  // Content Creation
  'text': 'Content Creation',
  'writing': 'Content Creation',
  'content': 'Content Creation',
  'copywriting': 'Content Creation',
  'text generation': 'Content Creation',
  'content creation': 'Content Creation',
  'ai writing': 'Content Creation',
  'blog': 'Content Creation',
  'article': 'Content Creation',
  
  // Image & Design
  'image': 'Image Generation',
  'art': 'Image Generation',
  'design': 'Image Generation',
  'graphics': 'Image Generation',
  'image generation': 'Image Generation',
  'ai art': 'Image Generation',
  'photo': 'Image Generation',
  'visual': 'Image Generation',
  
  // Video
  'video': 'Video Generation',
  'video editing': 'Video Generation',
  'video generation': 'Video Generation',
  'animation': 'Video Generation',
  'film': 'Video Generation',
  
  // Code & Development
  'code': 'Code Generation',
  'coding': 'Code Generation',
  'programming': 'Code Generation',
  'development': 'Code Generation',
  'developer tools': 'Code Generation',
  'dev tools': 'Code Generation',
  'software': 'Code Generation',
  
  // Business & Productivity
  'automation': 'AI Automation',
  'workflow': 'AI Automation',
  'productivity': 'Productivity',
  'business': 'Productivity',
  'task management': 'Productivity',
  'organization': 'Productivity',
  
  // Marketing & SEO
  'marketing': 'Social Media',
  'social media': 'Social Media',
  'social': 'Social Media',
  'advertising': 'Social Media',
  'campaign': 'Social Media',
  'seo': 'SEO & Optimization',
  'search engine optimization': 'SEO & Optimization',
  'optimization': 'SEO & Optimization',
  'email': 'Email Marketing',
  'email marketing': 'Email Marketing',
  'newsletter': 'Email Marketing',
  'ppc': 'Paid Search & PPC',
  'paid search': 'Paid Search & PPC',
  'google ads': 'Paid Search & PPC',
  'facebook ads': 'Paid Search & PPC',
  'advertising': 'Paid Search & PPC',
  
  // Data & Analytics
  'data': 'Data Analysis',
  'analytics': 'Data Analysis',
  'data analysis': 'Data Analysis',
  'business intelligence': 'Data Analysis',
  'bi': 'Data Analysis',
  'reporting': 'Data Analysis',
  'dashboard': 'Data Analysis',
  
  // AI Assistants & Chat
  'chatbot': 'AI Assistants',
  'chat': 'AI Assistants',
  'conversational ai': 'AI Assistants',
  'assistant': 'AI Assistants',
  'ai assistant': 'AI Assistants',
  'virtual assistant': 'AI Assistants',
  
  // Education & Research
  'research': 'Research & Education',
  'education': 'Research & Education',
  'learning': 'Research & Education',
  'study': 'Research & Education',
  'academic': 'Research & Education',
  'knowledge': 'Research & Education',
  
  // Specialized categories
  'translation': 'Translation',
  'language': 'Translation',
  'multilingual': 'Translation',
  'finance': 'Finance',
  'financial': 'Finance',
  'accounting': 'Finance',
  'legal': 'Legal',
  'law': 'Legal',
  'compliance': 'Legal',
  'healthcare': 'Healthcare',
  'medical': 'Healthcare',
  'health': 'Healthcare'
};

// Generate SiteOptz-compatible tool ID
function generateSiteOptzId(toolName, source = '') {
  return toolName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '');     // Trim leading/trailing hyphens
}

// Normalize category to SiteOptz format
function normalizeCategoryForSiteOptz(category) {
  if (!category) return 'other';
  
  const lowercaseCategory = category.toLowerCase().trim();
  
  // Check for exact match
  if (SITEOPTZ_CATEGORIES[lowercaseCategory]) {
    return SITEOPTZ_CATEGORIES[lowercaseCategory];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(SITEOPTZ_CATEGORIES)) {
    if (lowercaseCategory.includes(key) || key.includes(lowercaseCategory)) {
      return value;
    }
  }
  
  // If no match found, return 'other' (existing behavior)
  return 'other';
}

// Generate comprehensive SEO metadata
function generateSiteOptzSEO(tool) {
  const baseUrl = 'https://siteoptz.ai';
  const toolUrl = `${baseUrl}/tools/${tool.slug}`;
  const reviewUrl = `${baseUrl}/reviews/${tool.slug}`;
  
  const description = tool.overview?.description || tool.description || `${tool.name} is an AI-powered tool for ${tool.overview?.category?.toLowerCase() || 'business automation'}.`;
  const shortDescription = description.length > 155 ? description.substring(0, 155) + '...' : description;
  
  return {
    meta: {
      title: `${tool.name} Review, Pricing, Features & Alternatives [2025]`,
      description: `Comprehensive review of ${tool.name}. ${shortDescription} Compare features, pricing, and alternatives in ${tool.overview?.category || 'AI Tools'}.`,
      keywords: [
        tool.name.toLowerCase(),
        `${tool.name.toLowerCase()} review`,
        `${tool.name.toLowerCase()} pricing`,
        `${tool.name.toLowerCase()} alternatives`,
        `${tool.name.toLowerCase()} features`,
        tool.overview?.category?.toLowerCase().replace(/\s+/g, ' ') || 'ai tools',
        'ai tools',
        'artificial intelligence',
        'software comparison',
        '2025'
      ].join(', '),
      canonical: toolUrl,
      openGraph: {
        title: `${tool.name} - AI Tool Review & Pricing`,
        description: shortDescription,
        type: 'article',
        url: toolUrl,
        image: tool.logo || `${baseUrl}/images/tools/${tool.slug}-logo.svg`,
        siteName: 'SiteOptz'
      },
      twitter: {
        card: 'summary_large_image',
        title: `${tool.name} - AI Tool Review`,
        description: shortDescription,
        image: tool.logo || `${baseUrl}/images/tools/${tool.slug}-logo.svg`
      }
    }
  };
}

// Generate JSON-LD structured data
function generateStructuredData(tool) {
  const baseUrl = 'https://siteoptz.ai';
  
  return {
    '@type': 'Product',
    '@context': 'https://schema.org',
    name: tool.name,
    description: tool.overview?.description || tool.description || `AI-powered tool: ${tool.name}`,
    image: tool.logo || `${baseUrl}/images/tools/${tool.slug}-logo.svg`,
    url: `${baseUrl}/tools/${tool.slug}`,
    brand: {
      '@type': 'Brand',
      name: tool.overview?.developer || tool.name
    },
    category: tool.overview?.category || 'AI Tools',
    aggregateRating: tool.rating ? {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      reviewCount: tool.reviewCount || Math.floor(tool.rating * 1000 + Math.random() * 2000),
      bestRating: 5,
      worstRating: 1
    } : null,
    offers: {
      '@type': 'Offer',
      price: tool.pricing?.[0]?.price_per_month || 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: tool.overview?.website || tool.website,
      description: tool.pricing?.[0]?.price_per_month ? 
        `Starts at $${tool.pricing[0].price_per_month}/month` : 
        'Multiple pricing plans available'
    }
  };
}

// Convert scraped tool to SiteOptz.ai format
function convertToSiteOptzFormat(scrapedTool, sourceInfo = {}) {
  const toolId = generateSiteOptzId(scrapedTool.name);
  const category = normalizeCategoryForSiteOptz(scrapedTool.category);
  
  // Build pricing array in SiteOptz format
  const pricingPlans = [];
  
  if (scrapedTool.pricing?.free || scrapedTool.pricing?.startingPrice === 0) {
    pricingPlans.push({
      plan: 'Free',
      price_per_month: 0,
      features: scrapedTool.features?.slice(0, 3) || ['Basic features included']
    });
  }
  
  if (scrapedTool.pricing?.startingPrice > 0) {
    pricingPlans.push({
      plan: 'Pro',
      price_per_month: scrapedTool.pricing.startingPrice,
      features: scrapedTool.features?.slice(0, 5) || ['Advanced features included']
    });
  }
  
  if (pricingPlans.length === 0) {
    pricingPlans.push({
      plan: 'Custom',
      price_per_month: 0,
      features: ['Contact for pricing']
    });
  }
  
  // Build the complete tool object
  const siteOptzTool = {
    id: toolId,
    name: scrapedTool.name,
    slug: toolId,
    logo: `/images/tools/${toolId}-logo.svg`,
    overview: {
      developer: scrapedTool.source || 'Unknown',
      release_year: new Date().getFullYear(),
      category: category,
      description: scrapedTool.description || `${scrapedTool.name} is an AI-powered tool for enhanced productivity and automation.`,
      website: scrapedTool.website || scrapedTool.official_url || '',
      support: 'Online documentation',
      use_cases: scrapedTool.useCases || scrapedTool.use_cases || [
        'Business automation',
        'Productivity enhancement',
        'Workflow optimization'
      ],
      integrations: scrapedTool.integrations || [
        'API access',
        'Web interface',
        'Third-party integrations'
      ]
    },
    features: scrapedTool.features || [
      'AI-powered functionality',
      'User-friendly interface',
      'Cloud-based platform'
    ],
    pros: scrapedTool.pros || [
      'Easy to use interface',
      'Powerful AI capabilities',
      'Good customer support',
      'Regular updates'
    ],
    cons: scrapedTool.cons || [
      'Limited free tier',
      'Learning curve for advanced features',
      'Requires internet connection'
    ],
    pricing: pricingPlans,
    benchmarks: {
      speed: Math.floor(Math.random() * 3) + 7,      // 7-9
      accuracy: Math.floor(Math.random() * 3) + 7,   // 7-9
      integration: Math.floor(Math.random() * 4) + 6, // 6-9
      ease_of_use: Math.floor(Math.random() * 3) + 7, // 7-9
      value: Math.floor(Math.random() * 3) + 7        // 7-9
    },
    related_tools: scrapedTool.relatedTools || [],
    affiliate_link: scrapedTool.affiliate_link || scrapedTool.website || '',
    search_volume: scrapedTool.searchVolume || Math.floor(Math.random() * 5000) + 1000,
    cpc: scrapedTool.cpc || (Math.random() * 8 + 2).toFixed(1), // $2-10
    use_cases: scrapedTool.useCases || scrapedTool.use_cases || [
      'Business Process Automation',
      'Content Creation',
      'Data Analysis',
      'Customer Support',
      'Marketing Optimization'
    ],
    tags: scrapedTool.tags || [
      'ai tool',
      category.toLowerCase().replace(/\s+/g, '-'),
      'automation',
      'productivity'
    ]
  };
  
  // Add SEO metadata
  const seoData = generateSiteOptzSEO(siteOptzTool);
  siteOptzTool.meta = seoData.meta;
  
  // Add structured data
  siteOptzTool.schema = generateStructuredData(siteOptzTool);
  
  return siteOptzTool;
}

// Validate tool data against SiteOptz schema
function validateSiteOptzTool(tool) {
  const errors = [];
  const warnings = [];
  
  // Required fields
  if (!tool.id) errors.push('Missing required field: id');
  if (!tool.name) errors.push('Missing required field: name');
  if (!tool.slug) errors.push('Missing required field: slug');
  if (!tool.overview?.description) errors.push('Missing required field: overview.description');
  if (!tool.overview?.category) warnings.push('Missing category classification');
  
  // SEO validation
  if (!tool.meta?.title) warnings.push('Missing SEO title');
  if (!tool.meta?.description) warnings.push('Missing SEO description');
  if (tool.meta?.description && tool.meta.description.length > 160) {
    warnings.push('SEO description too long (>160 characters)');
  }
  
  // Pricing validation
  if (!tool.pricing || !Array.isArray(tool.pricing) || tool.pricing.length === 0) {
    warnings.push('Missing pricing information');
  }
  
  // Features validation
  if (!tool.features || tool.features.length === 0) {
    warnings.push('No features listed');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// Bulk convert scraped tools to SiteOptz format
async function convertBulkToSiteOptz(scrapedTools, options = {}) {
  console.log(`\n🔄 Converting ${scrapedTools.length} tools to SiteOptz.ai format...`);
  
  const convertedTools = [];
  const conversionErrors = [];
  const categoryStats = {};
  
  for (const [index, scrapedTool] of scrapedTools.entries()) {
    try {
      const siteOptzTool = convertToSiteOptzFormat(scrapedTool, options.sourceInfo);
      
      // Validate the converted tool
      const validation = validateSiteOptzTool(siteOptzTool);
      
      if (validation.valid) {
        convertedTools.push(siteOptzTool);
        
        // Track category stats
        const category = siteOptzTool.overview.category;
        categoryStats[category] = (categoryStats[category] || 0) + 1;
        
        if (validation.warnings.length > 0) {
          console.log(`⚠️ ${siteOptzTool.name}: ${validation.warnings.join(', ')}`);
        }
      } else {
        conversionErrors.push({
          tool: scrapedTool.name,
          errors: validation.errors
        });
        console.log(`❌ Failed to convert ${scrapedTool.name}: ${validation.errors.join(', ')}`);
      }
      
      // Progress indicator
      if ((index + 1) % 10 === 0) {
        console.log(`   Processed ${index + 1}/${scrapedTools.length} tools...`);
      }
      
    } catch (error) {
      conversionErrors.push({
        tool: scrapedTool.name || 'Unknown',
        errors: [error.message]
      });
      console.log(`❌ Error converting tool: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Conversion complete:`);
  console.log(`   - Successfully converted: ${convertedTools.length} tools`);
  console.log(`   - Failed conversions: ${conversionErrors.length} tools`);
  console.log(`   - Categories created: ${Object.keys(categoryStats).length}`);
  
  if (Object.keys(categoryStats).length > 0) {
    console.log(`\n📂 Category breakdown:`);
    Object.entries(categoryStats)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, count]) => {
        console.log(`   - ${category}: ${count} tools`);
      });
  }
  
  return {
    tools: convertedTools,
    errors: conversionErrors,
    categoryStats
  };
}

module.exports = {
  convertToSiteOptzFormat,
  convertBulkToSiteOptz,
  validateSiteOptzTool,
  normalizeCategoryForSiteOptz,
  generateSiteOptzSEO,
  generateStructuredData,
  generateSiteOptzId,
  SITEOPTZ_CATEGORIES
};