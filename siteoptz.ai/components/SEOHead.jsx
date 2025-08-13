import Head from 'next/head';

/**
 * Reusable SEO Head component for meta tags and JSON-LD schema injection
 * @param {Object} props - Component props
 * @returns {JSX.Element} Head component with SEO data
 */
export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  schemas = {},
  noindex = false,
  children
}) {
  // Default values
  const defaultTitle = "AI Tool Comparisons & Reviews | SiteOptz";
  const defaultDescription = "Compare AI tools, features, and pricing. Find the best AI solution for your business with our comprehensive comparison platform.";
  const defaultOgImage = "https://siteoptz.ai/images/og-default.png";
  const siteName = "SiteOptz";
  const siteUrl = "https://siteoptz.ai";

  // Format title
  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  
  // Format canonical URL
  const finalCanonical = canonical ? 
    (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : 
    siteUrl;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="SiteOptz" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
      <meta name="twitter:site" content="@siteoptz" />
      <meta name="twitter:creator" content="@siteoptz" />
      
      {/* Additional Meta */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* JSON-LD Schemas */}
      {Object.entries(schemas).map(([key, schema]) => (
        <script
          key={key}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0)
          }}
        />
      ))}
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* Additional head elements */}
      {children}
    </Head>
  );
}

/**
 * SEO Head component specifically for comparison pages
 */
export function ComparisonSEOHead({ toolA, toolB, toolAData, toolBData, url, faqs = [] }) {
  const title = toolB 
    ? `${toolA} vs ${toolB}: AI Tool Comparison & Pricing Calculator`
    : `${toolA} Review: Features, Pricing & Alternatives`;
  
  const priceA = toolAData?.pricing?.startingPrice ? `$${toolAData.pricing.startingPrice}` : 'Free';
  const priceB = toolBData?.pricing?.startingPrice ? `$${toolBData.pricing.startingPrice}` : 'Free';
  
  const description = toolB
    ? `Compare ${toolA} vs ${toolB}: features, pricing (${priceA} vs ${priceB}), and ratings. Use our calculator to find the best AI tool for your needs.`
    : `${toolA} review: features, pricing (starts at ${priceA}), pros/cons, and alternatives. Complete guide to help you decide if ${toolA} is right for you.`;
  
  const keywords = toolB
    ? `${toolA} vs ${toolB}, ${toolA} comparison, ${toolB} comparison, AI tools comparison, pricing calculator, ${toolA} alternative, ${toolB} alternative`
    : `${toolA} review, ${toolA} pricing, ${toolA} features, ${toolA} alternatives, AI tool review`;

  const breadcrumbs = [
    { name: 'Home', url: 'https://siteoptz.ai' },
    { name: 'AI Tools', url: 'https://siteoptz.ai/compare' },
    { name: toolB ? 'Compare' : 'Reviews', url: toolB ? 'https://siteoptz.ai/compare' : 'https://siteoptz.ai/reviews' },
    { name: toolB ? `${toolA} vs ${toolB}` : `${toolA} Review`, url }
  ];

  const schemas = {
    organization: {
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
    },
    article: {
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
        { "@type": "SoftwareApplication", "name": toolA },
        { "@type": "SoftwareApplication", "name": toolB }
      ] : [
        { "@type": "SoftwareApplication", "name": toolA }
      ]
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    }
  };

  // Add product schemas if data is available
  if (toolAData) {
    schemas.productA = generateProductSchema(toolAData);
  }

  if (toolBData) {
    schemas.productB = generateProductSchema(toolBData);
  }

  // Add FAQ schema if FAQs are provided
  if (faqs.length > 0) {
    schemas.faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "@id": `#faq-${faq.question.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  // Add HowTo schema for pricing calculator
  if (toolB) {
    schemas.howTo = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `How to Compare ${toolA} and ${toolB} Pricing`,
      "description": `Step-by-step guide to using our pricing calculator to compare ${toolA} vs ${toolB} costs for your team.`,
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

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={keywords}
      canonical={url}
      schemas={schemas}
    />
  );
}

/**
 * Generate Product Schema for a tool
 */
function generateProductSchema(tool) {
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