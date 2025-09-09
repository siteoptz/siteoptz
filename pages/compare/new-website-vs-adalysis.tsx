import React from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import { generateComparisonSchema, generateFAQSchema, generateBreadcrumbSchema, generateCombinedSchema } from '../../utils/schemaUtils';

// Static comparison page for New.website vs Adalysis
const ComparisonPage: React.FC = () => {
  // Tool data
  const tool1 = {
  "id": "new-website",
  "name": "New.website",
  "slug": "new-website",
  "logo": "/images/tools/new-website-logo.svg",
  "meta": {
    "description": "New.website vs alternatives: Features, pricing (free plan available), pros & cons analysis. Compare top productivity solutions for 2025.",
    "keywords": "new.website review, new.website features, new.website pricing, new.website alternatives, new.website vs"
  },
  "overview": {
    "description": "A platform to create websites through drag-and-drop and AI assistance",
    "category": "AI Website Builder",
    "developer": "New.website",
    "website": "https://newwebsite.com",
    "release_year": 2025,
    "long_description": "New.website is a productivity platform designed to streamline workflows and enhance productivity through AI automation. This comprehensive solution helps businesses optimize operations while maintaining competitive advantages in their respective markets."
  },
  "features": [
    "Task automation",
    "Workflow optimization",
    "Team collaboration",
    "AI-powered analysis"
  ],
  "pros": [
    "Comprehensive feature set",
    "Excellent user experience",
    "Strong performance"
  ],
  "cons": [
    "Learning curve for advanced features",
    "Premium pricing for full features"
  ],
  "pricing": [
    {
      "plan": "Pay as you go",
      "price_per_month": 0,
      "features": [
        "Pay per use",
        "No monthly commitment"
      ]
    },
    {
      "plan": "Monthly",
      "price_per_month": 57,
      "features": [
        "Monthly billing",
        "Standard features"
      ]
    },
    {
      "plan": "Annual",
      "price_per_month": 34,
      "features": [
        "Annual discount",
        "All features included"
      ]
    }
  ],
  "benchmarks": {
    "speed": 8,
    "accuracy": 8,
    "integration": 7,
    "ease_of_use": 8,
    "value": 8
  },
  "rating": 4,
  "review_count": 100,
  "schema": {
    "aggregateRating": {
      "ratingValue": 4,
      "reviewCount": 100
    }
  },
  "use_cases": [
    {
      "title": "Productivity Implementation",
      "description": "Organizations use New.website to implement productivity strategies that improve efficiency and reduce operational costs.",
      "audience": "Business teams and managers",
      "outcomes": [
        "Improved efficiency",
        "Reduced costs",
        "Better results"
      ]
    },
    {
      "title": "Process Optimization",
      "description": "New.website helps teams automate workflows and optimize processes for better productivity and scalability.",
      "audience": "Operations teams",
      "outcomes": [
        "Faster processes",
        "Higher quality",
        "Scalable operations"
      ]
    }
  ],
  "implementation_examples": [
    "Case Study 1: 40% efficiency improvement using New.website",
    "Case Study 2: New.website implementation reduces manual work by 60%",
    "Best practices for New.website integration and optimization"
  ],
  "enhanced_features": [
    {
      "name": "Task automation",
      "seoDescription": "New.website's Task automation provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines task automation",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Workflow optimization",
      "seoDescription": "New.website's Workflow optimization provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines workflow optimization",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Team collaboration",
      "seoDescription": "New.website's Team collaboration provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines team collaboration",
        "Improves accuracy",
        "Saves time"
      ]
    }
  ],
  "faq": [
    {
      "question": "What is New.website and how does it work?",
      "answer": "New.website is a productivity platform that uses AI to automate workflows and optimize processes for better business outcomes."
    },
    {
      "question": "How much does New.website cost?",
      "answer": "New.website offers flexible pricing plans designed for different business sizes, from startups to enterprise organizations."
    },
    {
      "question": "What are the main benefits of using New.website?",
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
    "business_impact": "New.website delivers measurable improvements within the first quarter, helping businesses achieve ROI through efficiency gains and cost reductions."
  }
};
  const tool2 = {
  "id": "adalysis",
  "name": "Adalysis",
  "slug": "adalysis",
  "logo": "/images/tools/adalysis-logo.svg",
  "meta": {
    "description": "Adalysis vs alternatives: Features, pricing (from $106/month), pros & cons analysis. Compare top paid search & ppc solutions for 2025.",
    "keywords": "adalysis review, adalysis features, adalysis pricing, adalysis alternatives, adalysis vs"
  },
  "schema": {
    "@type": "Product",
    "@context": "https://schema.org",
    "name": "Adalysis",
    "description": "PPC optimization software focused on Google and Bing Ads with smart bidding automation and comprehensive reporting.",
    "image": "https://siteoptz.ai/images/tools/adalysis-logo.svg",
    "url": "https://siteoptz.ai/tools/adalysis",
    "brand": {
      "@type": "Brand",
      "name": "Adalysis Ltd"
    },
    "category": null,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.6,
      "reviewCount": 2771,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": {
      "@type": "Offer",
      "price": 149,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://adalysis.com",
      "description": "Starts at $149/month"
    }
  },
  "overview": {
    "developer": "Adalysis Ltd",
    "release_year": 2024,
    "category": "Paid Search & PPC",
    "description": "PPC optimization software focused on Google and Bing Ads with smart bidding automation and comprehensive reporting.",
    "website": "https://adalysis.com",
    "support": "Email, Chat",
    "use_cases": [
      "Google Ads optimization",
      "Automated bid management",
      "Ad testing and rotation",
      "PPC performance auditing",
      "Agency client management"
    ],
    "integrations": [
      "Google Ads",
      "Microsoft Advertising",
      "Google Analytics",
      "Google Tag Manager",
      "Third-party tracking tools"
    ],
    "long_description": "Adalysis is a paid search & ppc platform designed to streamline workflows and enhance productivity through AI automation. This comprehensive solution helps businesses optimize operations while maintaining competitive advantages in their respective markets."
  },
  "features": [
    "Smart bid automation and optimization",
    "Automated ad testing and rotation",
    "Comprehensive audit and alerts system",
    "50+ pre-built reporting templates",
    "Budget management and pacing tools"
  ],
  "pros": [
    "Smart bid automation and optimization",
    "Automated ad testing and rotation",
    "Comprehensive audit and alerts system",
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
      "plan": "Starter",
      "price_per_month": 106,
      "billing_period": "monthly",
      "features": [
        "Basic features",
        "Up to 2 users",
        "Standard support"
      ]
    },
    {
      "plan": "Professional Monthly",
      "price_per_month": 148,
      "billing_period": "monthly",
      "features": [
        "Advanced features",
        "Up to 19 users",
        "Priority support",
        "Integrations"
      ]
    },
    {
      "plan": "Professional Yearly",
      "price_per_month": 128,
      "billing_period": "yearly",
      "features": [
        "All Professional features",
        "Annual discount",
        "Advanced reporting",
        "Custom workflows"
      ]
    },
    {
      "plan": "Enterprise",
      "price_per_month": 493,
      "billing_period": "custom",
      "features": [
        "Unlimited users",
        "Custom deployment",
        "Dedicated account manager",
        "Custom training",
        "24/7 phone support"
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
  "affiliate_link": "https://adalysis.com",
  "search_volume": 2086,
  "cpc": 3.39,
  "use_cases": [
    {
      "title": "Paid Search & PPC Implementation",
      "description": "Organizations use Adalysis to implement paid search & ppc strategies that improve efficiency and reduce operational costs.",
      "audience": "Business teams and managers",
      "outcomes": [
        "Improved efficiency",
        "Reduced costs",
        "Better results"
      ]
    },
    {
      "title": "Process Optimization",
      "description": "Adalysis helps teams automate workflows and optimize processes for better productivity and scalability.",
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
  "logo_url": "/images/tools/adalysis-logo.svg",
  "enhanced_features": [
    {
      "name": "Smart bid automation and optimization",
      "seoDescription": "Adalysis's Smart bid automation and optimization provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines smart bid automation and optimization",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Automated ad testing and rotation",
      "seoDescription": "Adalysis's Automated ad testing and rotation provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines automated ad testing and rotation",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Comprehensive audit and alerts system",
      "seoDescription": "Adalysis's Comprehensive audit and alerts system provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines comprehensive audit and alerts system",
        "Improves accuracy",
        "Saves time"
      ]
    }
  ],
  "faq": [
    {
      "question": "What is Adalysis and how does it work?",
      "answer": "Adalysis is a paid search & ppc platform that uses AI to automate workflows and optimize processes for better business outcomes."
    },
    {
      "question": "How much does Adalysis cost?",
      "answer": "Adalysis offers flexible pricing plans designed for different business sizes, from startups to enterprise organizations."
    },
    {
      "question": "What are the main benefits of using Adalysis?",
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
    "business_impact": "Adalysis delivers measurable improvements within the first quarter, helping businesses achieve ROI through efficiency gains and cost reductions."
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
        url={`https://siteoptz.ai/compare/${tool1.slug}-vs-${tool2.slug}`}
        schema={combinedSchema}
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
                <img
                  src={tool1.logo || '/images/tools/default-logo.svg'}
                  alt={`${tool1.name} logo`}
                  className="w-24 h-24 mx-auto mb-4"
                  onError={(e) => { e.currentTarget.src = '/images/tools/default-logo.svg'; }}
                />
                <h2 className="text-2xl font-bold text-blue-600 mb-2">{tool1.name}</h2>
                <p className="text-gray-600 mb-4">{tool1.overview?.description || tool1.description || 'Advanced AI tool for enhanced productivity.'}</p>
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-lg font-semibold">Rating: {tool1.rating || 4.5}/5</span>
                  <span className="text-sm text-gray-500">({tool1.overview?.category || 'AI Tool'})</span>
                </div>
              </div>
              <div className="text-center">
                <img
                  src={tool2.logo || '/images/tools/default-logo.svg'}
                  alt={`${tool2.name} logo`}
                  className="w-24 h-24 mx-auto mb-4"
                  onError={(e) => { e.currentTarget.src = '/images/tools/default-logo.svg'; }}
                />
                <h2 className="text-2xl font-bold text-green-600 mb-2">{tool2.name}</h2>
                <p className="text-gray-600 mb-4">{tool2.overview?.description || tool2.description || 'Advanced AI tool for enhanced productivity.'}</p>
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-lg font-semibold">Rating: {tool2.rating || 4.5}/5</span>
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