/**
 * Schema validation utility for Google Rich Results Test API
 * Validates structured data schemas in development environment
 */

export const validateSchemaWithGoogle = async (schema, url = null) => {
  // Only run in development with API key
  if (process.env.NODE_ENV !== 'development' || !process.env.GOOGLE_RICH_RESULTS_API_KEY) {
    return null;
  }

  try {
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    
    // Use Google Search Console API for schema validation
    const response = await fetch('https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GOOGLE_RICH_RESULTS_API_KEY}`
      },
      body: JSON.stringify({
        url: currentUrl,
        requestScreenshot: false
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Schema validation successful:', {
        url: currentUrl,
        schemaType: schema['@type'],
        result: result
      });
      return result;
    } else {
      console.warn('⚠️ Schema validation failed:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.warn('⚠️ Schema validation error:', error.message);
    return null;
  }
};

/**
 * Validate FAQ schema specifically
 */
export const validateFAQSchema = async (faqs, url = null) => {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
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

  return await validateSchemaWithGoogle(faqSchema, url);
};

/**
 * Validate SoftwareApplication schema specifically
 */
export const validateSoftwareApplicationSchema = async (tool, url = null) => {
  if (!tool) return null;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.tool_name,
    "description": tool.description,
    "applicationCategory": "AI Tool",
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Plan",
        "description": tool.pricing.free,
        "price": 0,
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": "Basic Plan",
        "description": tool.pricing.basic,
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "description": tool.pricing.pro,
        "priceCurrency": "USD"
      },
      ...(tool.pricing.enterprise ? [{
        "@type": "Offer",
        "name": "Enterprise Plan",
        "description": tool.pricing.enterprise,
        "priceCurrency": "USD"
      }] : [])
    ]
  };

  return await validateSchemaWithGoogle(softwareSchema, url);
};

/**
 * Validate ItemList schema for rankings
 */
export const validateItemListSchema = async (tools, category = "AI Tools", url = null) => {
  if (!tools || tools.length === 0) return null;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Top ${tools.length} ${category}`,
    "numberOfItems": tools.length,
    "itemListElement": tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.tool_name,
        "description": tool.description,
        "applicationCategory": category
      }
    }))
  };

  return await validateSchemaWithGoogle(itemListSchema, url);
};

/**
 * Generate meta tags from tool data
 */
export const generateMetaTags = (tool, type = 'review') => {
  const baseTitle = tool ? `${tool.tool_name} ${type === 'review' ? 'Review' : 'Comparison'}` : 'AI Tool';
  const baseDescription = tool ? tool.meta_description : 'AI tool analysis and comparison';

  return {
    title: `${baseTitle}: Complete Guide [2025] | SiteOptz`,
    description: baseDescription,
    keywords: tool?.target_keywords?.join(', ') || 'AI tools, artificial intelligence, software review',
    ogTitle: `${baseTitle}: Complete Guide [2025] | SiteOptz`,
    ogDescription: baseDescription,
    twitterTitle: `${baseTitle}: Complete Guide [2025] | SiteOptz`,
    twitterDescription: baseDescription
  };
};

/**
 * Generate internal links for related tools
 */
export const generateInternalLinks = (tools, basePath = '/compare') => {
  if (!tools || tools.length === 0) return [];

  return tools.map(tool => ({
    name: tool.tool_name,
    url: `${basePath}/${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`,
    description: tool.description?.substring(0, 100) + '...',
    keywords: tool.target_keywords?.slice(0, 3) || []
  }));
};

/**
 * Check if schema is valid (basic validation)
 */
export const isValidSchema = (schema) => {
  if (!schema || typeof schema !== 'object') return false;
  
  // Check for required schema.org properties
  if (!schema['@context'] || !schema['@type']) return false;
  
  // Validate context
  if (schema['@context'] !== 'https://schema.org') return false;
  
  return true;
};

/**
 * Log schema validation results
 */
export const logSchemaValidation = (schema, result) => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🔍 Schema Validation Results');
    console.log('Schema Type:', schema['@type']);
    console.log('Validation Result:', result);
    console.groupEnd();
  }
};
