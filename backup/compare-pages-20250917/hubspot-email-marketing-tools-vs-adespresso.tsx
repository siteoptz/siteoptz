import React from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import { generateComparisonSchema, generateFAQSchema, generateBreadcrumbSchema, generateCombinedSchema } from '../../utils/schemaUtils';
import ToolLogo from '../../components/ToolLogo';

// Static comparison page for HubSpot Email Marketing Tools vs AdEspresso
const ComparisonPage: React.FC = () => {
  // Tool data
  const tool1 = {
  "id": "hubspot-email-writer",
  "name": "HubSpot Email Marketing Tools",
  "slug": "hubspot-email-marketing-tools",
  "logo": "/images/tools/hubspot-email-writer-logo.svg",
  "description": "HubSpot's free email marketing tools allow users to create, personalize, and optimize marketing emails without needing to rely on designers or IT. It offers features like AI-generated subject lines and copy, customizable templates, and automation for post-send actions.",
  "overview": {
    "description": "HubSpot's free email marketing tools allow users to create, personalize, and optimize marketing emails without needing to rely on designers or IT. It offers features like AI-generated subject lines and copy, customizable templates, and automation for post-send actions.",
    "category": "Email Marketing",
    "developer": "HubSpot",
    "website": "https://www.hubspot.com/products/marketing/email",
    "integrations": [
      "HubSpot CRM",
      "Salesforce",
      "WhatsApp"
    ],
    "use_cases": [
      "Creating and sending newsletters",
      "Promotional email campaigns",
      "Product launch announcements",
      "Event invitations",
      "Customer re-engagement and nurturing",
      "Personalizing email content",
      "Automating email follow-ups",
      "Analyzing email marketing performance"
    ],
    "long_description": "HubSpot Email Marketing Tools is a email marketing platform designed to streamline workflows and enhance productivity through AI automation. This comprehensive solution helps businesses optimize operations while maintaining competitive advantages in their respective markets."
  },
  "features": [
    "AI-generated subject lines and email copy",
    "Customizable templates for newsletters, events, etc.",
    "Email automation with simple workflows",
    "Drag-and-drop email editor",
    "Personalization using CRM data",
    "A/B testing for subject lines and content",
    "Analytics and reporting on campaign performance",
    "Integration with HubSpot CRM and Salesforce",
    "Free online form builder",
    "AI email writer",
    "Social media management",
    "Marketing automation",
    "Campaign management",
    "SEO tools",
    "Live chat and chatbot builder",
    "Free AI content generator",
    "SSL certificate",
    "Newsletter builder",
    "AI paragraph rewriter",
    "User permissions",
    "Custom objects",
    "Social media agent"
  ],
  "pricing": [
    {
      "tier": "Free",
      "price_per_month": 0,
      "billing_period": "month",
      "features": [
        "Free email marketing tools",
        "Drag-and-drop email editor",
        "Customizable templates",
        "Basic automation",
        "CRM integration"
      ],
      "description": "Free features",
      "popular": false
    },
    {
      "tier": "Starter",
      "price_per_month": 23,
      "billing_period": "month",
      "features": [
        "All Free features",
        "Advanced automation",
        "A/B testing",
        "More templates",
        "Enhanced analytics",
        "AI features"
      ],
      "description": "Starter features",
      "popular": false
    },
    {
      "tier": "Professional",
      "price_per_month": 800,
      "billing_period": "month",
      "features": [
        "All Starter features",
        "Advanced personalization",
        "More automation workflows",
        "Campaign management",
        "SEO tools"
      ],
      "description": "Professional features",
      "popular": true
    },
    {
      "tier": "Enterprise",
      "price_per_month": 3200,
      "billing_period": "month",
      "features": [
        "All Professional features",
        "Advanced analytics",
        "Account-based marketing tools",
        "Dedicated IP address",
        "Custom objects"
      ],
      "description": "Enterprise features",
      "popular": false
    }
  ],
  "pros": [
    "User-friendly drag-and-drop editor",
    "Powerful AI assistance for content creation",
    "Seamless integration with HubSpot CRM",
    "Extensive template library",
    "Robust automation capabilities",
    "Comprehensive analytics for campaign optimization",
    "Scalable with different pricing tiers",
    "Free plan offers significant functionality"
  ],
  "cons": [
    "Premium features require paid plans.",
    "Some advanced features might have a learning curve."
  ],
  "benchmarks": {
    "speed": 9,
    "accuracy": 9,
    "integration": 7,
    "ease_of_use": 9,
    "value": 9
  },
  "affiliate_link": "https://www.hubspot.com/products/marketing/email",
  "category": "Email Marketing",
  "tags": [
    "marketing",
    "ai tool",
    "marketers, small to large businesses, content creators"
  ],
  "last_updated": "2025-08-21T18:15:52.176Z",
  "rating": 4.5,
  "review_count": 10000,
  "free_trial": true,
  "seo": {
    "title": "HubSpot Email Marketing Tools Review 2025 - Marketing AI Tool | SiteOptz",
    "description": "HubSpot's free email marketing tools allow users to create, personalize, and optimize marketing emails without needing t. Compare pricing, features, pros & cons. Expert Marketing AI tool review.",
    "keywords": [
      "hubspot email marketing tools",
      "hubspot email marketing tools review",
      "marketing ai",
      "marketing tools",
      "ai tools comparison",
      "siteoptz review"
    ],
    "canonical_url": "https://siteoptz.ai/tools/hubspot-email-marketing-tools"
  },
  "meta": {
    "description": "Comprehensive HubSpot Email Marketing Tools review covering all features, free plan available pricing plans, benefits & limitations. Expert email marketing comparison guide.",
    "keywords": "hubspot email marketing tools review, hubspot email marketing tools features, hubspot email marketing tools pricing, hubspot email marketing tools alternatives, hubspot email marketing tools vs"
  },
  "related_tools": [],
  "logo_url": "/images/tools/hubspot-email-writer-logo.svg",
  "enhanced_features": [
    {
      "name": "AI-generated subject lines and email copy",
      "seoDescription": "HubSpot Email Marketing Tools's AI-generated subject lines and email copy provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines ai-generated subject lines and email copy",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Customizable templates for newsletters, events, etc.",
      "seoDescription": "HubSpot Email Marketing Tools's Customizable templates for newsletters, events, etc. provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines customizable templates for newsletters, events, etc.",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Email automation with simple workflows",
      "seoDescription": "HubSpot Email Marketing Tools's Email automation with simple workflows provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines email automation with simple workflows",
        "Improves accuracy",
        "Saves time"
      ]
    }
  ],
  "use_cases": [
    {
      "title": "Email Marketing Implementation",
      "description": "Organizations use HubSpot Email Marketing Tools to implement email marketing strategies that improve efficiency and reduce operational costs.",
      "audience": "Business teams and managers",
      "outcomes": [
        "Improved efficiency",
        "Reduced costs",
        "Better results"
      ]
    },
    {
      "title": "Process Optimization",
      "description": "HubSpot Email Marketing Tools helps teams automate workflows and optimize processes for better productivity and scalability.",
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
      "question": "What is HubSpot Email Marketing Tools and how does it work?",
      "answer": "HubSpot Email Marketing Tools is a email marketing platform that uses AI to automate workflows and optimize processes for better business outcomes."
    },
    {
      "question": "How much does HubSpot Email Marketing Tools cost?",
      "answer": "HubSpot Email Marketing Tools offers flexible pricing plans designed for different business sizes, from startups to enterprise organizations."
    },
    {
      "question": "What are the main benefits of using HubSpot Email Marketing Tools?",
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
    "business_impact": "HubSpot Email Marketing Tools delivers measurable improvements within the first quarter, helping businesses achieve ROI through efficiency gains and cost reductions."
  }
};
  const tool2 = {
  "name": "AdEspresso",
  "description": "Facebook and Instagram advertising platform with AI-powered ad creation, A/B testing, and optimization tools for social media campaigns.",
  "overview": {
    "developer": "AdEspresso (Hootsuite)",
    "release_year": 2023,
    "category": "Paid Search & PPC",
    "description": "Facebook and Instagram advertising platform with AI-powered ad creation, A/B testing, and optimization tools for social media campaigns.",
    "website": "https://adespresso.com/",
    "support": "Email, Chat",
    "integrations": [
      "Facebook Ads",
      "Instagram Ads",
      "Google Ads"
    ],
    "pricing": {
      "free_tier": false,
      "starting_price": 49,
      "pricing_model": "Subscription"
    },
    "long_description": "AdEspresso is a paid search & ppc platform designed to streamline workflows and enhance productivity through AI automation. This comprehensive solution helps businesses optimize operations while maintaining competitive advantages in their respective markets."
  },
  "features": [
    "Social Media Advertising",
    "A/B Testing",
    "Creative Optimization",
    "Analytics"
  ],
  "use_cases": [
    {
      "title": "Paid Search & PPC Implementation",
      "description": "Organizations use AdEspresso to implement paid search & ppc strategies that improve efficiency and reduce operational costs.",
      "audience": "Business teams and managers",
      "outcomes": [
        "Improved efficiency",
        "Reduced costs",
        "Better results"
      ]
    },
    {
      "title": "Process Optimization",
      "description": "AdEspresso helps teams automate workflows and optimize processes for better productivity and scalability.",
      "audience": "Operations teams",
      "outcomes": [
        "Faster processes",
        "Higher quality",
        "Scalable operations"
      ]
    }
  ],
  "pricing": [
    {
      "plan": "Free",
      "price_per_month": 0,
      "billing_period": "monthly",
      "features": [
        "Limited features",
        "44 monthly credits",
        "Community support"
      ]
    },
    {
      "plan": "Pro Monthly",
      "price_per_month": 51,
      "billing_period": "monthly",
      "features": [
        "All features",
        "Unlimited usage",
        "Email support",
        "API access"
      ]
    },
    {
      "plan": "Pro Yearly",
      "price_per_month": 40,
      "billing_period": "yearly",
      "features": [
        "All Pro features",
        "2 months free",
        "Priority support",
        "Advanced analytics"
      ]
    },
    {
      "plan": "Enterprise",
      "price_per_month": 153,
      "billing_period": "custom",
      "features": [
        "Custom features",
        "Dedicated support",
        "SLA guarantee",
        "Custom integrations",
        "Training included"
      ]
    }
  ],
  "category": "Paid Search & PPC",
  "tags": [
    "paid search",
    "ai tool",
    "social media advertising"
  ],
  "slug": "adespresso",
  "id": "adespresso",
  "logo": "/images/tools/adespresso-logo.svg",
  "meta": {
    "description": "AdEspresso detailed review. Paid Search & PPC features, free plan available pricing, user feedback & comparisons. Make informed decisions with our expert analysis.",
    "keywords": "adespresso review, adespresso features, adespresso pricing, adespresso alternatives, adespresso vs"
  },
  "pros": [
    "AI-powered features",
    "User-friendly interface",
    "Good performance"
  ],
  "cons": [
    "Learning curve",
    "Pricing could be better"
  ],
  "related_tools": [],
  "benchmarks": {
    "speed": 4.2,
    "accuracy": 4.3,
    "integration": 4.1,
    "ease_of_use": 4,
    "value": 4.2
  },
  "logo_url": "/images/tools/adespresso-logo.svg",
  "enhanced_features": [
    {
      "name": "Social Media Advertising",
      "seoDescription": "AdEspresso's Social Media Advertising provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines social media advertising",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "A/B Testing",
      "seoDescription": "AdEspresso's A/B Testing provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines a/b testing",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Creative Optimization",
      "seoDescription": "AdEspresso's Creative Optimization provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines creative optimization",
        "Improves accuracy",
        "Saves time"
      ]
    }
  ],
  "faq": [
    {
      "question": "What is AdEspresso and how does it work?",
      "answer": "AdEspresso is a paid search & ppc platform that uses AI to automate workflows and optimize processes for better business outcomes."
    },
    {
      "question": "How much does AdEspresso cost?",
      "answer": "AdEspresso offers flexible pricing plans designed for different business sizes, from startups to enterprise organizations."
    },
    {
      "question": "What are the main benefits of using AdEspresso?",
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
    "business_impact": "AdEspresso delivers measurable improvements within the first quarter, helping businesses achieve ROI through efficiency gains and cost reductions."
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
                <ToolLogo toolName={tool1.name} logoUrl={tool1.logo || undefined} size="xl" className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-600 mb-2">{tool1.name}</h2>
                <p className="text-gray-600 mb-4">{(tool1.overview as any)?.description || tool1.overview?.long_description || 'Advanced AI tool for enhanced productivity.'}</p>
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-lg font-semibold">Rating: {(tool1 as any).rating || 4.5}/5</span>
                  <span className="text-sm text-gray-500">({tool1.overview?.category || 'AI Tool'})</span>
                </div>
              </div>
              <div className="text-center">
                <ToolLogo toolName={tool2.name} logoUrl={tool2.logo || undefined} size="xl" className="mx-auto mb-4" />
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