import React from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import { generateComparisonSchema, generateFAQSchema, generateBreadcrumbSchema, generateCombinedSchema } from '../../utils/schemaUtils';
import ToolLogo from '../../components/ToolLogo';

// Static comparison page for Text-to-Video - Stunning Video Creation vs Acquisio
const ComparisonPage: React.FC = () => {
  // Tool data
  const tool1 = {
  "id": "texttovideo-stunning-video-creation",
  "name": "Text-to-Video - Stunning Video Creation",
  "slug": "texttovideo-stunning-video-creation",
  "logo": "/images/tools/texttovideo-stunning-video-creation-logo.svg",
  "meta": {
    "description": "Text-to-Video - Stunning Video Creation review: Complete analysis of features, pricing (from $40/month), pros, cons & alternatives. Expert guide for video generation in 2025.",
    "keywords": "text-to-video - stunning video creation review, text-to-video - stunning video creation features, text-to-video - stunning video creation pricing, text-to-video - stunning video creation alternatives, text-to-video - stunning video creation vs"
  },
  "overview": {
    "developer": "Text-to-Video - Stunning Video Creation",
    "release_year": 2024,
    "description": "Text-to-Video - Stunning Video Creation",
    "category": "Video Generation",
    "website": "https://www.b12.io/static/384bdd04da8c08bd8a90e97683583ddc/922af/text-to-video.png",
    "long_description": "Text-to-Video - Stunning Video Creation is a video generation platform designed to streamline workflows and enhance productivity through AI automation. This comprehensive solution helps businesses optimize operations while maintaining competitive advantages in their respective markets."
  },
  "features": [
    "Text-to-video conversion",
    "Professional templates",
    "HD/4K quality output",
    "Automated editing",
    "Custom branding",
    "Social media optimization"
  ],
  "pros": [
    "User-friendly interface",
    "Reliable performance",
    "Good integration options",
    "Regular updates"
  ],
  "cons": [
    "Learning curve for beginners",
    "Premium features require subscription",
    "Internet connection required"
  ],
  "pricing": [
    {
      "plan": "Monthly",
      "price_per_month": 50,
      "billing_period": "monthly",
      "features": [
        "Full access",
        "Monthly billing",
        "Cancel anytime",
        "Email support"
      ]
    },
    {
      "plan": "Yearly",
      "price_per_month": 40,
      "billing_period": "yearly",
      "features": [
        "Full access",
        "Save 20%",
        "Priority support",
        "Advanced features"
      ]
    },
    {
      "plan": "Enterprise",
      "price_per_month": 202,
      "billing_period": "custom",
      "features": [
        "Custom pricing",
        "Volume discounts",
        "Enterprise features",
        "Dedicated support",
        "Service level agreement"
      ]
    }
  ],
  "rating": 5,
  "search_volume": 1742,
  "cpc": 3.39,
  "benchmarks": {
    "speed": 9,
    "accuracy": 8,
    "integration": 8,
    "ease_of_use": 7,
    "value": 8
  },
  "source": "B12 AI Directory",
  "enhanced_features": [
    {
      "name": "Text-to-video conversion",
      "seoDescription": "Text-to-Video - Stunning Video Creation's Text-to-video conversion provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines text-to-video conversion",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Professional templates",
      "seoDescription": "Text-to-Video - Stunning Video Creation's Professional templates provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines professional templates",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "HD/4K quality output",
      "seoDescription": "Text-to-Video - Stunning Video Creation's HD/4K quality output provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines hd/4k quality output",
        "Improves accuracy",
        "Saves time"
      ]
    }
  ],
  "use_cases": [
    {
      "title": "Video Generation Implementation",
      "description": "Organizations use Text-to-Video - Stunning Video Creation to implement video generation strategies that improve efficiency and reduce operational costs.",
      "audience": "Business teams and managers",
      "outcomes": [
        "Improved efficiency",
        "Reduced costs",
        "Better results"
      ]
    },
    {
      "title": "Process Optimization",
      "description": "Text-to-Video - Stunning Video Creation helps teams automate workflows and optimize processes for better productivity and scalability.",
      "audience": "Operations teams",
      "outcomes": [
        "Faster processes",
        "Higher quality",
        "Scalable operations"
      ]
    }
  ],
  "faq": [
    {
      "question": "What is Text-to-Video - Stunning Video Creation and how does it work?",
      "answer": "Text-to-Video - Stunning Video Creation is a video generation platform that uses AI to automate workflows and optimize processes for better business outcomes."
    },
    {
      "question": "How much does Text-to-Video - Stunning Video Creation cost?",
      "answer": "Text-to-Video - Stunning Video Creation offers flexible pricing plans designed for different business sizes, from startups to enterprise organizations."
    },
    {
      "question": "What are the main benefits of using Text-to-Video - Stunning Video Creation?",
      "answer": "Key benefits include improved efficiency, reduced costs, better accuracy, and scalable automation capabilities."
    }
  ],
  "benefits_roi": {
    "roi_metrics": {
      "timeSavings": "50-70% reduction in manual task completion time",
      "costSavings": "30-45% decrease in operational costs",
      "productivity": "2-3x improvement in team productivity",
      "accuracy": "90% reduction in error rates"
    },
    "business_impact": "Text-to-Video - Stunning Video Creation delivers measurable improvements within the first quarter, helping businesses achieve ROI through efficiency gains and cost reductions."
  }
};
  const tool2 = {
  "id": "acquisio",
  "name": "Acquisio",
  "slug": "acquisio",
  "logo": "/images/tools/acquisio-logo.svg",
  "meta": {
    "description": "Acquisio vs alternatives: Features, pricing (free plan available), pros & cons analysis. Compare top paid search & ppc solutions for 2025.",
    "keywords": "acquisio review, acquisio features, acquisio pricing, acquisio alternatives, acquisio vs"
  },
  "schema": {
    "@type": "Product",
    "@context": "https://schema.org",
    "name": "Acquisio",
    "description": "AI-powered advertising platform for scaling PPC campaigns across Google, Meta, and Microsoft with machine learning optimization.",
    "image": "https://siteoptz.ai/images/tools/acquisio-logo.svg",
    "url": "https://siteoptz.ai/tools/acquisio",
    "brand": {
      "@type": "Brand",
      "name": "Acquisio Inc"
    },
    "category": null,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.5,
      "reviewCount": 5540,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": {
      "@type": "Offer",
      "price": 0,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.acquisio.com",
      "description": "Free to start"
    }
  },
  "overview": {
    "developer": "Acquisio Inc",
    "release_year": 2024,
    "category": "Paid Search & PPC",
    "description": "AI-powered advertising platform for scaling PPC campaigns across Google, Meta, and Microsoft with machine learning optimization.",
    "website": "https://www.acquisio.com",
    "support": "Email, Chat",
    "use_cases": [
      "Large-scale PPC automation",
      "Cross-platform campaign optimization",
      "Local SEM reseller programs",
      "Enterprise advertising management",
      "AI-driven bid optimization"
    ],
    "integrations": [
      "Google Ads",
      "Facebook Ads",
      "Microsoft Advertising",
      "Google Analytics",
      "CRM systems"
    ],
    "long_description": "Acquisio is a paid search & ppc platform designed to streamline workflows and enhance productivity through AI automation. This comprehensive solution helps businesses optimize operations while maintaining competitive advantages in their respective markets."
  },
  "features": [
    "AI-driven bid and budget optimization",
    "Cross-channel campaign management",
    "Machine learning audience targeting",
    "Automated performance reporting",
    "Local SEM reseller tools"
  ],
  "pros": [
    "AI-driven bid and budget optimization",
    "Cross-channel campaign management",
    "Machine learning audience targeting",
    "User-friendly interface",
    "Regular updates",
    "Good customer support"
  ],
  "cons": [
    "Learning curve for beginners",
    "Pricing may be high for small businesses",
    "Limited free features"
  ],
  "pricing": [
    {
      "plan": "Performance",
      "price_per_month": 0,
      "features": [
        "AI optimization",
        "Cross-platform management",
        "Basic reporting",
        "Standard support"
      ]
    },
    {
      "plan": "Enterprise",
      "price_per_month": 0,
      "features": [
        "Advanced AI features",
        "White-label options",
        "Custom reporting",
        "Dedicated support"
      ]
    }
  ],
  "benchmarks": {
    "speed": 8,
    "accuracy": 8,
    "integration": 7,
    "ease_of_use": 8,
    "value": 7
  },
  "related_tools": [],
  "affiliate_link": "https://www.acquisio.com",
  "search_volume": 1414,
  "cpc": 1.41,
  "use_cases": [
    {
      "title": "Paid Search & PPC Implementation",
      "description": "Organizations use Acquisio to implement paid search & ppc strategies that improve efficiency and reduce operational costs.",
      "audience": "Business teams and managers",
      "outcomes": [
        "Improved efficiency",
        "Reduced costs",
        "Better results"
      ]
    },
    {
      "title": "Process Optimization",
      "description": "Acquisio helps teams automate workflows and optimize processes for better productivity and scalability.",
      "audience": "Operations teams",
      "outcomes": [
        "Faster processes",
        "Higher quality",
        "Scalable operations"
      ]
    }
  ],
  "tags": [
    "paid-search-&-ppc",
    "ai-tools",
    "automation"
  ],
  "logo_url": "/images/tools/acquisio-logo.svg",
  "enhanced_features": [
    {
      "name": "AI-driven bid and budget optimization",
      "seoDescription": "Acquisio's AI-driven bid and budget optimization provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines ai-driven bid and budget optimization",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Cross-channel campaign management",
      "seoDescription": "Acquisio's Cross-channel campaign management provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines cross-channel campaign management",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Machine learning audience targeting",
      "seoDescription": "Acquisio's Machine learning audience targeting provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines machine learning audience targeting",
        "Improves accuracy",
        "Saves time"
      ]
    }
  ],
  "faq": [
    {
      "question": "What is Acquisio and how does it work?",
      "answer": "Acquisio is a paid search & ppc platform that uses AI to automate workflows and optimize processes for better business outcomes."
    },
    {
      "question": "How much does Acquisio cost?",
      "answer": "Acquisio offers flexible pricing plans designed for different business sizes, from startups to enterprise organizations."
    },
    {
      "question": "What are the main benefits of using Acquisio?",
      "answer": "Key benefits include improved efficiency, reduced costs, better accuracy, and scalable automation capabilities."
    }
  ],
  "benefits_roi": {
    "roi_metrics": {
      "timeSavings": "50-70% reduction in manual task completion time",
      "costSavings": "30-45% decrease in operational costs",
      "productivity": "2-3x improvement in team productivity",
      "accuracy": "90% reduction in error rates"
    },
    "business_impact": "Acquisio delivers measurable improvements within the first quarter, helping businesses achieve ROI through efficiency gains and cost reductions."
  }
};
  
  // Generate schema data
  const comparisonSchema = generateComparisonSchema(tool1, tool2);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://siteoptz.ai' },
    { name: 'AI Tools', url: 'https://siteoptz.ai/tools' },
    { name: 'Compare', url: 'https://siteoptz.ai/compare' },
    { name: `${tool1.name} vs ${tool2.name}`, url: `https://siteoptz.ai/compare/${tool1.slug}-vs-${tool2.slug}` }
  ]);
  
  const combinedSchema = generateCombinedSchema(comparisonSchema, breadcrumbSchema);

  // SEO metadata
  const title = `${tool1.name} vs ${tool2.name}: Complete Comparison [2025] | SiteOptz`;
  const description = `Compare ${tool1.name} and ${tool2.name} features, pricing, pros and cons. Expert analysis with benchmarks to help you choose the right AI tool for your needs.`;
  
  // Extract keywords for SEO
  const keywords: string[] = [
    `${tool1.name} vs ${tool2.name}`,
    `${tool1.name} comparison`,
    `${tool2.name} comparison`,
    `${tool1.name} alternative`,
    `${tool2.name} alternative`,
    'AI tool comparison',
    'AI software comparison',
    `${tool1.name} pricing`,
    `${tool2.name} pricing`,
    `best AI tool 2025`
  ];

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={`https://siteoptz.ai/compare/${tool1.slug}-vs-${tool2.slug}`}
        schemaData={combinedSchema}
      />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {tool1.name} vs {tool2.name}: Complete Comparison [2025]
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare {tool1.name} and {tool2.name} features, pricing, and capabilities to choose the best AI tool for your needs.
            </p>
          </div>

          {/* Tool Logos and Basic Info */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="text-center">
                <ToolLogo toolName={tool1.name} logoUrl={tool1.logo} size="xl" className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-600 mb-2">{tool1.name}</h2>
                <p className="text-gray-600 mb-4">{(tool1.overview as any)?.description || tool1.overview?.long_description || 'Advanced AI tool for enhanced productivity.'}</p>
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-lg font-semibold">Rating: {(tool1 as any).rating || 4.5}/5</span>
                  <span className="text-sm text-gray-500">({tool1.overview?.category || 'AI Tool'})</span>
                </div>
              </div>
              <div className="text-center">
                <ToolLogo toolName={tool2.name} logoUrl={tool2.logo} size="xl" className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-600 mb-2">{tool2.name}</h2>
                <p className="text-gray-600 mb-4">{(tool2.overview as any)?.description || tool2.overview?.long_description || 'Advanced AI tool for enhanced productivity.'}</p>
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-lg font-semibold">Rating: {(tool2 as any).rating || 4.5}/5</span>
                  <span className="text-sm text-gray-500">({tool2.overview?.category || 'AI Tool'})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Feature Comparison: {tool1.name} vs {tool2.name}
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">{tool1.name} Features</h3>
                <ul className="space-y-2">
                  {(tool1.features || ['Advanced AI capabilities', 'User-friendly interface', 'Reliable performance']).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">{tool2.name} Features</h3>
                <ul className="space-y-2">
                  {(tool2.features || ['Advanced AI capabilities', 'User-friendly interface', 'Reliable performance']).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pricing Comparison: {tool1.name} vs {tool2.name} [2025]
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">{tool1.name} Pricing</h3>
                <div className="space-y-4">
                  {(tool1.pricing || [{ plan: 'Standard', price_per_month: 29, features: ['Core features', 'Email support'] }]).map((plan: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{plan.plan}</h4>
                        <span className="text-lg font-bold text-blue-600">
                          {plan.price_per_month === 0 ? 'Free' : `$${plan.price_per_month}/mo`}
                        </span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {(plan.features || []).map((feature: string, featureIndex: number) => (
                          <li key={featureIndex}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">{tool2.name} Pricing</h3>
                <div className="space-y-4">
                  {(tool2.pricing || [{ plan: 'Standard', price_per_month: 29, features: ['Core features', 'Email support'] }]).map((plan: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{plan.plan}</h4>
                        <span className="text-lg font-bold text-green-600">
                          {plan.price_per_month === 0 ? 'Free' : `$${plan.price_per_month}/mo`}
                        </span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {(plan.features || []).map((feature: string, featureIndex: number) => (
                          <li key={featureIndex}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pros and Cons Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pros and Cons: {tool1.name} vs {tool2.name}
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">{tool1.name}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">✅ Pros</h4>
                    <ul className="space-y-1 text-sm">
                      {(tool1.pros || ['Reliable performance', 'Good user experience']).map((pro: string, index: number) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">❌ Cons</h4>
                    <ul className="space-y-1 text-sm">
                      {(tool1.cons || ['Learning curve', 'Premium pricing']).map((con: string, index: number) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">{tool2.name}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">✅ Pros</h4>
                    <ul className="space-y-1 text-sm">
                      {(tool2.pros || ['Reliable performance', 'Good user experience']).map((pro: string, index: number) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">❌ Cons</h4>
                    <ul className="space-y-1 text-sm">
                      {(tool2.cons || ['Learning curve', 'Premium pricing']).map((con: string, index: number) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Helper */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Which Tool Should You Choose?
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Choose {tool1.name} if:</h3>
                <ul className="space-y-2 text-gray-700">
                  {(tool1.pros || ['You need reliable performance', 'You value user experience']).slice(0, 3).map((pro: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>You prioritize {pro.toLowerCase()}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href={`/reviews/${tool1.slug}`}
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More About {tool1.name}
                </Link>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-600 mb-4">Choose {tool2.name} if:</h3>
                <ul className="space-y-2 text-gray-700">
                  {(tool2.pros || ['You need reliable performance', 'You value user experience']).slice(0, 3).map((pro: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>You prioritize {pro.toLowerCase()}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href={`/reviews/${tool2.slug}`}
                  className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Learn More About {tool2.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparisonPage;