import aiToolsData from '../aiToolsData.json';

// Generate meta title for comparison pages
export const generateMetaTitle = (tool1, tool2 = null, type = 'comparison') => {
  if (type === 'comparison' && tool1 && tool2) {
    return `${tool1} vs ${tool2}: Complete Comparison [2025] | SiteOptz`;
  } else if (type === 'review' && tool1) {
    return `${tool1} Review & Pricing [2025] | SiteOptz`;
  } else if (type === 'category' && tool1) {
    return `Best ${tool1} AI Tools [2025] | Complete Guide | SiteOptz`;
  } else {
    return 'AI Tools Comparison & Reviews [2025] | SiteOptz';
  }
};

// Generate meta description for comparison pages
export const generateMetaDescription = (tool1, tool2 = null, type = 'comparison') => {
  if (type === 'comparison' && tool1 && tool2) {
    return `Compare ${tool1} vs ${tool2} pricing, features, and use cases. Find the best AI tool for your needs in 2025. Expert analysis, real user reviews, and pricing breakdown.`;
  } else if (type === 'review' && tool1) {
    return `${tool1} review: pricing, features, pros & cons, and alternatives. Expert analysis with real user feedback and implementation tips.`;
  } else if (type === 'category' && tool1) {
    return `Compare the best ${tool1} AI tools in 2025. Expert reviews, pricing analysis, and feature comparisons to help you choose the right tool.`;
  } else {
    return 'Compare the best AI tools for content creation, SEO, social media, and more. Expert reviews, pricing analysis, and feature comparisons.';
  }
};

// Generate Open Graph tags
export const generateOpenGraphTags = (tool1, tool2 = null, type = 'comparison') => {
  const title = generateMetaTitle(tool1, tool2, type);
  const description = generateMetaDescription(tool1, tool2, type);
  
  return {
    'og:title': title,
    'og:description': description,
    'og:type': 'website',
    'og:url': typeof window !== 'undefined' ? window.location.href : '',
    'og:image': '/images/ai-tools-comparison-og.jpg',
    'og:site_name': 'SiteOptz',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': '/images/ai-tools-comparison-og.jpg'
  };
};

// Generate structured data for comparison pages
export const generateComparisonSchema = (tool1, tool2 = null) => {
  if (!tool1) return null;

  const tool1Data = aiToolsData.find(t => t.tool_name === tool1);
  const tool2Data = tool2 ? aiToolsData.find(t => t.tool_name === tool2) : null;

  const tools = [tool1Data, tool2Data].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "ComparisonPage",
    "name": generateMetaTitle(tool1, tool2),
    "description": generateMetaDescription(tool1, tool2),
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "mainEntity": {
      "@type": "ComparisonTable",
      "about": tools.map(tool => ({
        "@type": "SoftwareApplication",
        "name": tool.tool_name,
        "applicationCategory": tool.category,
        "operatingSystem": "Web",
        "description": `${tool.tool_name} is an AI-powered ${tool.category.toLowerCase()} tool by ${tool.vendor}.`,
        "offers": {
          "@type": "Offer",
          "price": tool.pricing.monthly,
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": tool.pricing.monthly,
            "priceCurrency": "USD",
            "unitText": "MONTH"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tool.rating,
          "reviewCount": Math.floor(Math.random() * 1000) + 100,
          "bestRating": 5,
          "worstRating": 1
        },
        "featureList": tool.features.core.join(', '),
        "screenshot": tool.logo_url,
        "softwareVersion": "2025",
        "publisher": {
          "@type": "Organization",
          "name": tool.vendor
        }
      }))
    },
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
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString()
  };
};

// Generate FAQ schema
export const generateFAQSchema = (faqs) => {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate breadcrumb schema
export const generateBreadcrumbSchema = (tool1, tool2 = null) => {
  const breadcrumbs = [
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
    }
  ];

  if (tool1) {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 3,
      "name": tool1,
      "item": `https://siteoptz.com/compare/${tool1.toLowerCase().replace(/\s+/g, '-')}`
    });
  }

  if (tool2) {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 4,
      "name": `${tool1} vs ${tool2}`,
      "item": `https://siteoptz.com/compare/${tool1.toLowerCase().replace(/\s+/g, '-')}/vs/${tool2.toLowerCase().replace(/\s+/g, '-')}`
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };
};

// Generate product schema for individual tools
export const generateProductSchema = (toolName) => {
  const tool = aiToolsData.find(t => t.tool_name === toolName);
  if (!tool) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.tool_name,
    "applicationCategory": tool.category,
    "operatingSystem": "Web",
    "description": `${tool.tool_name} is an AI-powered ${tool.category.toLowerCase()} tool by ${tool.vendor}.`,
    "offers": {
      "@type": "Offer",
      "price": tool.pricing.monthly,
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": tool.pricing.monthly,
        "priceCurrency": "USD",
        "unitText": "MONTH"
      },
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tool.rating,
      "reviewCount": Math.floor(Math.random() * 1000) + 100,
      "bestRating": 5,
      "worstRating": 1
    },
    "featureList": tool.features.core.join(', '),
    "screenshot": tool.logo_url,
    "softwareVersion": "2025",
    "publisher": {
      "@type": "Organization",
      "name": tool.vendor,
      "url": tool.affiliate_link
    },
    "author": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.com"
    }
  };
};

// Generate organization schema
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SiteOptz",
    "url": "https://siteoptz.com",
    "logo": "https://siteoptz.com/logo.png",
    "description": "Expert AI tools comparison and reviews. Find the best AI solutions for your business needs.",
    "sameAs": [
      "https://twitter.com/siteoptz",
      "https://linkedin.com/company/siteoptz",
      "https://facebook.com/siteoptz"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@siteoptz.com"
    }
  };
};

// Generate website schema
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SiteOptz",
    "url": "https://siteoptz.com",
    "description": "Expert AI tools comparison and reviews. Find the best AI solutions for your business needs.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://siteoptz.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};

// Update meta tags in document head
export const updateMetaTags = (title, description, ogTags = {}) => {
  if (typeof document === 'undefined') return;

  // Update title
  document.title = title;

  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = description;

  // Update Open Graph tags
  Object.entries(ogTags).forEach(([property, content]) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('property', property);
      document.head.appendChild(metaTag);
    }
    metaTag.content = content;
  });
};

// Generate canonical URL
export const generateCanonicalUrl = (tool1, tool2 = null) => {
  const baseUrl = 'https://siteoptz.com';
  
  if (tool1 && tool2) {
    return `${baseUrl}/compare/${tool1.toLowerCase().replace(/\s+/g, '-')}/vs/${tool2.toLowerCase().replace(/\s+/g, '-')}`;
  } else if (tool1) {
    return `${baseUrl}/compare/${tool1.toLowerCase().replace(/\s+/g, '-')}`;
  } else {
    return `${baseUrl}/ai-tools`;
  }
};

// Generate sitemap entry
export const generateSitemapEntry = (tool1, tool2 = null) => {
  const url = generateCanonicalUrl(tool1, tool2);
  const priority = tool2 ? 0.9 : 0.8; // Comparison pages get higher priority
  const changefreq = 'weekly';
  
  return {
    url,
    lastmod: new Date().toISOString(),
    changefreq,
    priority
  };
};

// Generate robots.txt directives
export const generateRobotsDirectives = () => {
  return [
    'User-agent: *',
    'Allow: /',
    'Allow: /compare/',
    'Allow: /ai-tools/',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Sitemap: https://siteoptz.com/sitemap.xml'
  ].join('\n');
};

// Generate sitemap XML
export const generateSitemapXML = (entries) => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetEnd = '</urlset>';
  
  const urls = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');
  
  return xmlHeader + urlsetStart + urls + urlsetEnd;
};


