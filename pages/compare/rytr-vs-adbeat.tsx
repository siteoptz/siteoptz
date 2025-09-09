import React from 'react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import { generateComparisonSchema, generateFAQSchema, generateBreadcrumbSchema, generateCombinedSchema } from '../../utils/schemaUtils';

// Static comparison page for Rytr vs Adbeat
const ComparisonPage: React.FC = () => {
  // Tool data
  const tool1 = {
  "id": "rytr",
  "name": "Rytr",
  "slug": "rytr",
  "logo": "/images/tools/rytr-logo.svg",
  "description": "Rytr is an AI writing assistant designed for short-form content creation, accessible across various platforms. It helps users generate original and compelling content quickly, offering over 40 use cases and templates, including blog posts, social media ads, email responses, and more. Rytr aims to sound like the user, not a robot, by analyzing writing samples and mirroring tone, with options for custom tones. It also emphasizes plagiarism-free content and offers a Chrome Extension for seamless integration into writing workflows.",
  "overview": {
    "description": "Rytr is an AI writing assistant designed for short-form content creation, accessible across various platforms. It helps users generate original and compelling content quickly, offering over 40 use cases and templates, including blog posts, social media ads, email responses, and more. Rytr aims to sound like the user, not a robot, by analyzing writing samples and mirroring tone, with options for custom tones. It also emphasizes plagiarism-free content and offers a Chrome Extension for seamless integration into writing workflows.",
    "category": "Content Creation",
    "developer": "Rytr",
    "website": "https://rytr.me/",
    "integrations": [
      "Chrome Extension"
    ],
    "use_cases": [
      "Short-form content creation",
      "Email writing",
      "Blog writing",
      "Social media content",
      "Marketing copy",
      "Creative writing",
      "SEO content",
      "Business pitches",
      "Cover letters",
      "Job descriptions",
      "Real estate listings",
      "Product descriptions",
      "Ad copy"
    ],
    "long_description": "Rytr is a content creation platform designed to streamline workflows and enhance productivity through AI automation. This comprehensive solution helps businesses optimize operations while maintaining competitive advantages in their respective markets."
  },
  "features": [
    "AI-powered content generation",
    "Over 40 content use cases and templates",
    "Supports 20+ tones of voice",
    "Customizable tones of voice",
    "Plagiarism checker",
    "Chrome Extension for writing anywhere",
    "AI Autocomplete Text",
    "Continue Writing feature",
    "Text Inflator (content expansion)",
    "Grammar Checker & Text Improver",
    "AI Paragraph Generator",
    "Rewording Generator",
    "Sentence Shortener",
    "AI Command Generator",
    "Blog Outline Generator",
    "AI Blog Generator",
    "AI Meta Description Generator",
    "SEO Meta Title Generator",
    "AI Landing Page Generator",
    "Keyword Extractor",
    "AI Keyword Generator",
    "AI Newsletter Generator",
    "Custom Poem Generator",
    "AI Song Generator",
    "AI Story Generator",
    "Call To Action Generator",
    "Social Media Ad Generator",
    "Google Ad Generator",
    "AI Caption Generator",
    "AI SMS Generator",
    "AI Bio Generator",
    "Video Description Generator",
    "Video Channel Description Generator",
    "Video Idea Generator",
    "AI LinkedIn Post Generator",
    "AI Quora Answer Generator",
    "AI Facebook Post Generator",
    "AI Product Description Generator",
    "AI Bullet Point Generator",
    "AIDA Copywriting Generator",
    "PAS Copywriting Generator",
    "AI Response Generator",
    "Business Pitch Generator",
    "AI Business Idea Generator",
    "AI Cover Letter Generator",
    "Email Generator",
    "AI Interview Question Generator",
    "AI Job Description Generator",
    "AI Tagline Generator",
    "AI Real Estate Listings"
  ],
  "pricing": [
    {
      "tier": "Free",
      "price_per_month": 0,
      "billing_period": "month",
      "features": [
        "Generate 10k characters per month",
        "Access 40+ use-cases",
        "Write in 20+ tones",
        "Access to chrome extension"
      ],
      "description": "Free features",
      "popular": false
    },
    {
      "tier": "Unlimited",
      "price_per_month": 7.5,
      "billing_period": "month",
      "features": [
        "Unlimited generations",
        "Build 1 personalized tone of voice",
        "50/m plagiarism checks"
      ],
      "description": "Unlimited features",
      "popular": false
    },
    {
      "tier": "Premium",
      "price_per_month": 24.16,
      "billing_period": "month",
      "features": [
        "Build 5 personal tones of voice",
        "Increased character input limits",
        "Write in 40+ languages",
        "100/m plagiarism checks"
      ],
      "description": "Premium features",
      "popular": false
    },
    {
      "tier": "Enterprise",
      "price_per_month": "Custom",
      "billing_period": "month",
      "features": [
        "Custom features",
        "Dedicated support",
        "SLA"
      ],
      "description": "Enterprise-grade features",
      "popular": false
    }
  ],
  "pros": [
    "Affordable pricing",
    "Easy to use",
    "Saves time and effort",
    "Generates original and plagiarism-free content",
    "Mirrors user's writing tone",
    "Wide range of use cases and templates",
    "Free plan available"
  ],
  "cons": [
    "Free plan has limitations on character generation and plagiarism checks."
  ],
  "benchmarks": {
    "speed": 9.8,
    "accuracy": 9.8,
    "integration": 7,
    "ease_of_use": 9.8,
    "value": 9
  },
  "affiliate_link": "https://rytr.me?via=siteoptz",
  "category": "Content Creation",
  "tags": [
    "ai writing assistant",
    "ai tool",
    "copywriters, marketers, entrepreneurs, freelancers, individuals creating content"
  ],
  "last_updated": "2025-08-21T18:15:14.844Z",
  "rating": 4.9,
  "review_count": 1000,
  "free_trial": true,
  "seo": {
    "title": "Rytr Review 2025 - AI Writing Assistant AI Tool | SiteOptz",
    "description": "Rytr is an AI writing assistant designed for short-form content creation, accessible across various platforms. It helps . Compare pricing, features, pros & cons. Expert AI Writing Assistant AI tool review.",
    "keywords": [
      "rytr",
      "rytr review",
      "ai writing assistant ai",
      "ai writing assistant tools",
      "ai tools comparison",
      "siteoptz review"
    ],
    "canonical_url": "https://siteoptz.ai/tools/rytr"
  },
  "meta": {
    "description": "Rytr detailed review. Content Creation features, free plan available pricing, user feedback & comparisons. Make informed decisions with our expert analysis.",
    "keywords": "rytr review, rytr features, rytr pricing, rytr alternatives, rytr vs"
  },
  "related_tools": [],
  "logo_url": "/images/tools/rytr-logo.svg",
  "enhanced_features": [
    {
      "name": "AI-powered content generation",
      "seoDescription": "Rytr's AI-powered content generation provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines ai-powered content generation",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Over 40 content use cases and templates",
      "seoDescription": "Rytr's Over 40 content use cases and templates provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines over 40 content use cases and templates",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Supports 20+ tones of voice",
      "seoDescription": "Rytr's Supports 20+ tones of voice provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines supports 20+ tones of voice",
        "Improves accuracy",
        "Saves time"
      ]
    }
  ],
  "use_cases": [
    {
      "title": "Content Creation Implementation",
      "description": "Organizations use Rytr to implement content creation strategies that improve efficiency and reduce operational costs.",
      "audience": "Business teams and managers",
      "outcomes": [
        "Improved efficiency",
        "Reduced costs",
        "Better results"
      ]
    },
    {
      "title": "Process Optimization",
      "description": "Rytr helps teams automate workflows and optimize processes for better productivity and scalability.",
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
      "question": "What is Rytr and how does it work?",
      "answer": "Rytr is a content creation platform that uses AI to automate workflows and optimize processes for better business outcomes."
    },
    {
      "question": "How much does Rytr cost?",
      "answer": "Rytr offers flexible pricing plans designed for different business sizes, from startups to enterprise organizations."
    },
    {
      "question": "What are the main benefits of using Rytr?",
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
    "business_impact": "Rytr delivers measurable improvements within the first quarter, helping businesses achieve ROI through efficiency gains and cost reductions."
  }
};
  const tool2 = {
  "id": "adbeat",
  "name": "Adbeat",
  "slug": "adbeat",
  "logo": "/images/tools/adbeat-logo.svg",
  "description": "Display advertising intelligence and competitive analysis platform",
  "overview": {
    "developer": "Adbeat",
    "release_year": 2011,
    "description": "Adbeat is a display advertising intelligence platform that provides competitive insights and market analysis for digital advertising campaigns across multiple networks.",
    "category": "Paid Search & PPC",
    "long_description": "Adbeat is a paid search & ppc platform designed to streamline workflows and enhance productivity through AI automation. This comprehensive solution helps businesses optimize operations while maintaining competitive advantages in their respective markets."
  },
  "features": [
    "Display ad intelligence and monitoring",
    "Competitive advertising analysis",
    "Ad creative tracking and history",
    "Publisher network insights",
    "Market trend analysis"
  ],
  "pros": [
    "Comprehensive display ad intelligence",
    "Historical advertising data",
    "Market trend insights"
  ],
  "cons": [
    "Focused primarily on display ads",
    "Limited search advertising data"
  ],
  "pricing": [
    {
      "tier": "Starter",
      "price_per_month": 249,
      "features": [
        "Basic ad intelligence",
        "Limited searches",
        "Standard reports",
        "Email support"
      ]
    },
    {
      "tier": "Professional",
      "price_per_month": 449,
      "features": [
        "Full ad intelligence",
        "Unlimited searches",
        "Advanced analytics",
        "Priority support"
      ]
    }
  ],
  "benchmarks": {
    "speed": 8,
    "accuracy": 8,
    "integration": 7,
    "ease_of_use": 7,
    "value": 7
  },
  "rating": 4,
  "review_count": 180,
  "category": "Paid Search & PPC",
  "logo_url": "/images/tools/adbeat-logo.svg",
  "meta": {
    "description": "Adbeat detailed review. Paid Search & PPC features, from $249/month pricing, user feedback & comparisons. Make informed decisions with our expert analysis.",
    "keywords": "adbeat review, adbeat features, adbeat pricing, adbeat alternatives, adbeat vs"
  },
  "enhanced_features": [
    {
      "name": "Display ad intelligence and monitoring",
      "seoDescription": "Adbeat's Display ad intelligence and monitoring provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines display ad intelligence and monitoring",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Competitive advertising analysis",
      "seoDescription": "Adbeat's Competitive advertising analysis provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines competitive advertising analysis",
        "Improves accuracy",
        "Saves time"
      ]
    },
    {
      "name": "Ad creative tracking and history",
      "seoDescription": "Adbeat's Ad creative tracking and history provides advanced automation capabilities that improve efficiency and reduce manual overhead.",
      "benefits": [
        "Streamlines ad creative tracking and history",
        "Improves accuracy",
        "Saves time"
      ]
    }
  ],
  "use_cases": [
    {
      "title": "Paid Search & PPC Implementation",
      "description": "Organizations use Adbeat to implement paid search & ppc strategies that improve efficiency and reduce operational costs.",
      "audience": "Business teams and managers",
      "outcomes": [
        "Improved efficiency",
        "Reduced costs",
        "Better results"
      ]
    },
    {
      "title": "Process Optimization",
      "description": "Adbeat helps teams automate workflows and optimize processes for better productivity and scalability.",
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
      "question": "What is Adbeat and how does it work?",
      "answer": "Adbeat is a paid search & ppc platform that uses AI to automate workflows and optimize processes for better business outcomes."
    },
    {
      "question": "How much does Adbeat cost?",
      "answer": "Adbeat offers flexible pricing plans designed for different business sizes, from startups to enterprise organizations."
    },
    {
      "question": "What are the main benefits of using Adbeat?",
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
    "business_impact": "Adbeat delivers measurable improvements within the first quarter, helping businesses achieve ROI through efficiency gains and cost reductions."
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