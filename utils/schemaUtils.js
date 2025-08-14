// Utility functions for generating JSON-LD schema data

export const generateProductSchema = (toolData) => {
  if (!toolData) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": toolData.name,
    "description": toolData.overview?.description || toolData.meta?.description,
    "url": `https://siteoptz.ai/tools/${toolData.slug}`,
    "image": toolData.logo,
    "applicationCategory": "AI Software",
    "operatingSystem": "Web Browser",
    "offers": toolData.pricing?.map(plan => ({
      "@type": "Offer",
      "name": plan.plan,
      "price": plan.price_per_month,
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": plan.price_per_month,
        "priceCurrency": "USD",
        "billingIncrement": "monthly"
      }
    })) || [],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": calculateAverageRating(toolData.benchmarks),
      "reviewCount": 100,
      "bestRating": 10,
      "worstRating": 1
    },
    "author": {
      "@type": "Organization",
      "name": toolData.overview?.developer || "Unknown",
      "url": `https://${toolData.overview?.developer?.toLowerCase().replace(/\s+/g, '')}.com`
    },
    "publisher": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://siteoptz.ai/images/logo.png"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };
};

export const generateComparisonSchema = (tool1Data, tool2Data) => {
  if (!tool1Data || !tool2Data) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${tool1Data.name} vs ${tool2Data.name}: Complete Comparison [2025]`,
    "description": `Compare ${tool1Data.name} and ${tool2Data.name} features, pricing, pros and cons. Expert analysis to help you choose the right AI tool.`,
    "author": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://siteoptz.ai/images/logo.png"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntity": [
      generateProductSchema(tool1Data),
      generateProductSchema(tool2Data)
    ],
    "about": [
      {
        "@type": "Thing",
        "name": tool1Data.name,
        "description": tool1Data.overview?.description
      },
      {
        "@type": "Thing", 
        "name": tool2Data.name,
        "description": tool2Data.overview?.description
      }
    ]
  };
};

export const generateFAQSchema = (faqData) => {
  if (!faqData || !Array.isArray(faqData)) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const generateBreadcrumbSchema = (breadcrumbs) => {
  if (!breadcrumbs || !Array.isArray(breadcrumbs)) return null;

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
};

export const generateReviewSchema = (toolData, reviewData) => {
  if (!toolData) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": generateProductSchema(toolData),
    "author": {
      "@type": "Organization",
      "name": "SiteOptz"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": calculateAverageRating(toolData.benchmarks),
      "bestRating": 10,
      "worstRating": 1
    },
    "publisher": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai"
    },
    "datePublished": "2025-01-01"
  };
};

export const generateHowToSchema = (title, steps) => {
  if (!steps || !Array.isArray(steps)) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": `Step-by-step guide: ${title}`,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": step.url || `#step-${index + 1}`
    }))
  };
};

// Helper function to calculate average rating from benchmarks
const calculateAverageRating = (benchmarks) => {
  if (!benchmarks) return 8.5;
  
  const scores = Object.values(benchmarks);
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  return Math.round(average * 10) / 10;
};

// Generate combined schema for pages with multiple schema types
export const generateCombinedSchema = (...schemas) => {
  const validSchemas = schemas.filter(schema => schema !== null);
  
  if (validSchemas.length === 0) return null;
  if (validSchemas.length === 1) return validSchemas[0];
  
  return {
    "@context": "https://schema.org",
    "@graph": validSchemas
  };
};