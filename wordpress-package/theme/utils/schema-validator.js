/**
 * Schema Validator Utilities
 * Validates and generates structured data for SEO
 */

/**
 * Generate schema.org structured data for AI tools
 * @param {Object} tool - Tool data object
 * @returns {Object} Schema.org JSON-LD object
 */
export function generateToolSchema(tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "applicationCategory": tool.category,
    "url": `/tools/${tool.id}`,
    "creator": {
      "@type": "Organization",
      "name": tool.company
    },
    "offers": {
      "@type": "Offer",
      "price": tool.pricing.starter || 0,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": tool.rating ? {
      "@type": "AggregateRating",
      "ratingValue": tool.rating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": tool.reviewCount || 100
    } : undefined,
    "featureList": tool.features,
    "softwareVersion": "Latest",
    "operatingSystem": "Web-based",
    "datePublished": tool.founded ? `${tool.founded}-01-01` : undefined
  };
}

/**
 * Generate schema for tool comparison pages
 * @param {Object} toolA - First tool object
 * @param {Object} toolB - Second tool object
 * @returns {Object} Schema.org JSON-LD object
 */
export function generateComparisonSchema(toolA, toolB) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${toolA.name} vs ${toolB.name} Comparison`,
    "description": `Compare ${toolA.name} and ${toolB.name} features, pricing, and reviews`,
    "url": `/compare/${toolA.id}-vs-${toolB.id}`,
    "mainEntity": {
      "@type": "ItemList",
      "name": "AI Tools Comparison",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": generateToolSchema(toolA)
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": generateToolSchema(toolB)
        }
      ]
    }
  };
}

/**
 * Generate FAQ schema
 * @param {Array} faqs - Array of FAQ objects
 * @returns {Object} Schema.org JSON-LD object
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
 * Generate breadcrumb schema
 * @param {Array} breadcrumbs - Array of breadcrumb items
 * @returns {Object} Schema.org JSON-LD object
 */
export function generateBreadcrumbSchema(breadcrumbs) {
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
}

/**
 * Generate organization schema
 * @returns {Object} Schema.org JSON-LD object
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SiteOptz.ai",
    "url": "https://siteoptz.ai",
    "logo": "https://siteoptz.ai/logo.png",
    "description": "AI tools comparison and recommendation platform",
    "sameAs": [
      "https://twitter.com/siteoptz",
      "https://linkedin.com/company/siteoptz",
      "https://github.com/siteoptz"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer support",
      "email": "support@siteoptz.ai",
      "availableLanguage": ["English"]
    }
  };
}

/**
 * Generate review schema
 * @param {Object} review - Review object
 * @param {Object} tool - Tool being reviewed
 * @returns {Object} Schema.org JSON-LD object
 */
export function generateReviewSchema(review, tool) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": tool.name
    },
    "author": {
      "@type": "Person",
      "name": review.userName
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.comment,
    "datePublished": review.date
  };
}

/**
 * Validate tool data structure
 * @param {Object} tool - Tool object to validate
 * @returns {Object} Validation result
 */
export function validateToolData(tool) {
  const errors = [];
  const warnings = [];
  
  // Required fields
  const requiredFields = ['id', 'name', 'category', 'description'];
  requiredFields.forEach(field => {
    if (!tool[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Validate pricing structure
  if (!tool.pricing || typeof tool.pricing !== 'object') {
    errors.push('Invalid pricing structure');
  } else {
    if (typeof tool.pricing.starter !== 'number' && tool.pricing.starter !== null) {
      warnings.push('Starter pricing should be a number or null');
    }
  }
  
  // Validate rating
  if (tool.rating && (tool.rating < 0 || tool.rating > 5)) {
    errors.push('Rating must be between 0 and 5');
  }
  
  // Validate arrays
  ['features', 'pros', 'cons', 'integrations'].forEach(field => {
    if (tool[field] && !Array.isArray(tool[field])) {
      errors.push(`${field} must be an array`);
    }
  });
  
  // Validate URL
  if (tool.website && !isValidUrl(tool.website)) {
    warnings.push('Invalid website URL');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Helper function to validate URLs
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid URL
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Generate meta tags for a page
 * @param {Object} metadata - Metadata object
 * @returns {Array} Array of meta tag objects
 */
export function generateMetaTags(metadata) {
  const tags = [
    { name: 'description', content: metadata.description },
    { name: 'keywords', content: metadata.keywords?.join(', ') },
    { property: 'og:title', content: metadata.title },
    { property: 'og:description', content: metadata.description },
    { property: 'og:url', content: metadata.url },
    { property: 'og:type', content: metadata.type || 'website' },
    { property: 'og:image', content: metadata.image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: metadata.title },
    { name: 'twitter:description', content: metadata.description },
    { name: 'twitter:image', content: metadata.image }
  ];
  
  return tags.filter(tag => tag.content); // Remove tags without content
}

/**
 * Export all schema functions
 */
export default {
  generateToolSchema,
  generateComparisonSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateReviewSchema,
  validateToolData,
  generateMetaTags
};