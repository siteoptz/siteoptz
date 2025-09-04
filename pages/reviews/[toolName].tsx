import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '../../components/comparison/FAQSection';
import ToolLogo from '../../components/ToolLogo';
import { hasSEOComponent, getSEOComponent } from '../../utils/seoComponentMapping';
import dynamic from 'next/dynamic';

interface Tool {
  tool_name: string;
  vendor: string;
  logo_url: string;
  description: string;
  features: {
    core: string[];
    advanced: string[];
    integrations: string[];
  };
  pros: string[];
  cons: string[];
  pricing: {
    monthly: number | string;
    yearly: number | string;
    enterprise: string;
  };
  official_url: string;
  affiliate_link: string;
  rating: number;
  use_cases: string[];
  free_trial: boolean;
  slug?: string;
  id?: string;
}

interface ReviewPageProps {
  tool: Tool;
  pageTitle: string;
  slug: string;
  relatedTools: Tool[];
  relatedComparisons: Array<{
    title: string;
    slug: string;
    toolAName: string;
    toolBName: string;
    toolASlug?: string;
    toolBSlug?: string;
  }>;
  hasSEOVersion?: boolean;
  seoData?: {
    name: string;
    category: string;
    description: string;
    website: string;
    rating: number;
    slug: string;
  };
}

export default function ReviewPage({ tool, pageTitle, slug, relatedTools, relatedComparisons, hasSEOVersion, seoData }: ReviewPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'use-cases' | 'pros-cons' | 'faq'>('overview');

  // If we have a SEO-optimized version, use it instead
  if (hasSEOVersion && seoData && hasSEOComponent(slug)) {
    const SEOComponent = dynamic(getSEOComponent(slug), {
      loading: () => <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    });
    
    return <SEOComponent tool={seoData} />;
  }

  // Generate optimized meta description (155-160 characters)
  const generateMetaDescription = (tool: Tool): string => {
    const basePrice = typeof tool.pricing.monthly === 'number' && tool.pricing.monthly > 0 ? 
                      `$${tool.pricing.monthly}/month` : 
                      tool.pricing.monthly === 0 || 
                      (typeof tool.pricing.monthly === 'string' && tool.pricing.monthly.toLowerCase() === 'free') ? 
                      'Free plan available' : 'Custom pricing';
    return `${tool.tool_name} review: Features, pricing (from ${basePrice}), pros, cons, and alternatives. Expert analysis and user guide for 2025.`;
  };
  
  const metaDescription = generateMetaDescription(tool);

  // Generate comprehensive JSON-LD schemas
  
  // Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.tool_name,
    "description": tool.description,
    "url": tool.official_url,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": typeof tool.pricing.monthly === 'number' && tool.pricing.monthly > 0 ? 
               tool.pricing.monthly.toString() : "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    ...(tool.rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": tool.rating,
        "reviewCount": 100,
        "bestRating": 5,
        "worstRating": 1
      }
    })
  };

  // Review Schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": tool.tool_name,
      "description": tool.description
    },
    "author": {
      "@type": "Organization",
      "name": "SiteOptz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SiteOptz"
    },
    "datePublished": "2025-01-15",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": tool.rating || 4.5,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": `Comprehensive review of ${tool.tool_name} covering features, pricing, pros, cons, and use cases.`
  };

  // FAQ Schema - Create sample FAQs since not in data
  const sampleFaqs = [
    {
      question: `What is ${tool.tool_name}?`,
      answer: tool.description
    },
    {
      question: `How much does ${tool.tool_name} cost?`,
      answer: (typeof tool.pricing.monthly === 'string' && tool.pricing.monthly.toLowerCase() === 'custom') || 
              tool.pricing.monthly === null || tool.pricing.monthly === undefined ?
              `${tool.tool_name} has various pricing tiers available.` :
              tool.pricing.monthly === 0 || 
              (typeof tool.pricing.monthly === 'string' && tool.pricing.monthly.toLowerCase() === 'free') ?
              `${tool.tool_name} offers a free plan with various pricing tiers available.` :
              typeof tool.pricing.monthly === 'number' && tool.pricing.monthly > 0 ? 
              `${tool.tool_name} starts at $${tool.pricing.monthly}/month with various pricing tiers available.` :
              `${tool.tool_name} has various pricing tiers available.`
    },
    {
      question: `Does ${tool.tool_name} offer a free trial?`,
      answer: tool.free_trial ? `Yes, ${tool.tool_name} offers a free trial.` : `${tool.tool_name} pricing information is available on their website.`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sampleFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Reviews",
        "item": "https://siteoptz.com/reviews"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${tool.tool_name} Review`,
        "item": `https://siteoptz.com/reviews/${slug}`
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${tool.tool_name} review, ${tool.tool_name} features, ${tool.tool_name} pricing, ${tool.tool_name} pros and cons, ${tool.tool_name} alternatives, AI tools 2025`} />
        <meta name="author" content="SiteOptz" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://siteoptz.com/reviews/${slug}`} />
        <meta property="og:site_name" content="SiteOptz" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="SiteOptz" />
        <meta property="article:published_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        <meta property="article:section" content="Technology" />
        <meta property="article:tag" content={`${tool.tool_name}, AI Tools, Review`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://siteoptz.ai/reviews/${slug}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative z-10 py-20">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                <li><span className="mx-2">/</span></li>
                <li><Link href="/tools" className="hover:text-cyan-400 transition-colors">AI Tools</Link></li>
                <li><span className="mx-2">/</span></li>
                <li><Link href="/reviews" className="hover:text-cyan-400 transition-colors">Reviews</Link></li>
                <li><span className="mx-2">/</span></li>
                <li className="text-cyan-400">{tool.tool_name} Review</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row items-center">
              {/* Tool Info */}
              <div className="lg:w-2/3 lg:pr-12 mb-8 lg:mb-0">
                <div className="flex items-center mb-6">
                  <div className="mr-6">
                    <ToolLogo 
                      toolName={tool.tool_name}
                      logoUrl={tool.logo_url}
                      size="xl"
                    />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {tool.tool_name} Review
                    </h1>
                    {tool.rating && (
                      <div className="flex items-center">
                        <div className="flex items-center mr-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(tool.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-blue-100 text-sm">
                          {tool.rating}/5 (100 reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  {tool.description}
                </p>

              </div>

              {/* Quick Stats */}
              <div className="lg:w-1/3">
                <div className="bg-black border border-gray-800 backdrop-blur-md rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Starting Price:</span>
                      <span className="text-white font-semibold">
                        {typeof tool.pricing.monthly === 'number' && tool.pricing.monthly > 0 ? `$${tool.pricing.monthly}/month` : 
                         tool.pricing.monthly === 0 || 
                         (typeof tool.pricing.monthly === 'string' && tool.pricing.monthly.toLowerCase() === 'free') ? 'Free' : 'Custom'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Free Trial:</span>
                      <span className="text-white font-semibold">
                        {tool.free_trial ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Features:</span>
                      <span className="text-white font-semibold">{(tool.features.core?.length || 0)}+</span>
                    </div>
                    {tool.rating && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rating:</span>
                        <span className="text-white font-semibold">{tool.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-black border-b border-gray-800 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'features', label: 'Key Features' },
                { key: 'pricing', label: 'Pricing Plans' },
                { key: 'use-cases', label: 'Use Cases' },
                { key: 'pros-cons', label: 'Pros & Cons' },
                { key: 'faq', label: 'FAQ' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'overview' && (
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-white mb-6">What is {tool.tool_name}?</h2>
                <p className="text-gray-300 mb-8">{tool.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8 not-prose">
                  <div className="bg-black border border-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-green-400 mb-4">Key Strengths</h3>
                    <ul className="space-y-2">
                      {(tool.pros || []).slice(0, 5).map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-black border border-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-red-400 mb-4">Limitations</h3>
                    <ul className="space-y-2">
                      {(tool.cons || []).slice(0, 5).map((con, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">{tool.tool_name} Features</h2>
                
                {/* Core Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Core Features</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(tool.features.core || []).map((feature, index) => (
                      <div key={index} className="bg-black border border-gray-800 p-6 rounded-xl shadow-sm">
                        <div className="flex items-start">
                          <svg className="w-6 h-6 text-cyan-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300 font-medium">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'pricing' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">{tool.tool_name} Pricing Plans</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-white mb-2">Monthly Plan</h3>
                    <div className="text-4xl font-bold text-cyan-400 mb-6">
                      {typeof tool.pricing.monthly === 'number' && tool.pricing.monthly > 0 ? `$${tool.pricing.monthly}` : 
                       tool.pricing.monthly === 0 || 
                       (typeof tool.pricing.monthly === 'string' && tool.pricing.monthly.toLowerCase() === 'free') ? 'Free' : 'Custom'}
                      {typeof tool.pricing.monthly === 'number' && tool.pricing.monthly > 0 && (
                        <span className="text-lg text-gray-400">/month</span>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {(tool.features.core || []).slice(0, 5).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a
                      href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                    >
                      Book Your Free AI Strategy Session
                    </a>
                  </div>
                  
                  <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-white mb-2">Yearly Plan</h3>
                    <div className="text-4xl font-bold text-cyan-400 mb-6">
                      {typeof tool.pricing.yearly === 'number' && tool.pricing.yearly > 0 ? `$${tool.pricing.yearly}` : 
                       tool.pricing.yearly === 0 ||
                       (typeof tool.pricing.yearly === 'string' && tool.pricing.yearly.toLowerCase() === 'free') ? 'Free' : 'Custom'}
                      {typeof tool.pricing.yearly === 'number' && tool.pricing.yearly > 0 && (
                        <span className="text-lg text-gray-400">
                          {(tool.pricing as any).yearlyIsMonthlyRate ? '/month' : '/year'}
                        </span>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {(tool.features.advanced || []).slice(0, 5).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a
                      href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                    >
                      Book Your Free AI Strategy Session
                    </a>
                  </div>
                  
                  <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-white mb-2">Enterprise Plan</h3>
                    <div className="text-4xl font-bold text-cyan-400 mb-6">
                      {typeof tool.pricing.enterprise === 'number' && tool.pricing.enterprise > 0 ? `$${tool.pricing.enterprise}` : 
                       (typeof tool.pricing.enterprise === 'number' && tool.pricing.enterprise === 0) ||
                       (typeof tool.pricing.enterprise === 'string' && tool.pricing.enterprise.toLowerCase() === 'free') ? 'Free' : 'Custom'}
                      {typeof tool.pricing.enterprise === 'number' && tool.pricing.enterprise > 0 && (
                        <span className="text-lg text-gray-400">/month</span>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {[...(tool.features.core || []).slice(0, 3), ...(tool.features.advanced || []).slice(0, 2)].map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a
                      href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                    >
                      Book Your Free AI Strategy Session
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'use-cases' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">{tool.tool_name} Use Cases</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {((tool as any).overview?.use_cases || (tool as any).use_cases || []).map((useCase: string, index: number) => (
                    <div key={index} className="bg-black border border-gray-800 p-6 rounded-xl">
                      <div className="flex items-start">
                        <svg className="w-6 h-6 text-purple-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{useCase}</h3>
                          <p className="text-gray-400 text-sm">Perfect for businesses looking to implement {useCase.toLowerCase()} with {tool.tool_name}.</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Additional use case information */}
                <div className="mt-12 bg-black border border-gray-800 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-6">Who Should Use {tool.tool_name}?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Ideal For:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span className="text-gray-300">Marketing teams and agencies</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span className="text-gray-300">Content creators and influencers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span className="text-gray-300">Small to enterprise businesses</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span className="text-gray-300">E-commerce and retail brands</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Best Scenarios:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-gray-300">Managing multiple social media accounts</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-gray-300">Streamlining content workflows</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-gray-300">Improving team collaboration</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-gray-300">Scaling social media operations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pros-cons' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">{tool.tool_name} Pros and Cons</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-black border border-gray-800 p-8 rounded-xl">
                    <h3 className="text-2xl font-bold text-green-400 mb-6">Pros</h3>
                    <ul className="space-y-4">
                      {(tool.pros || []).map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300 text-lg">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-black border border-gray-800 p-8 rounded-xl">
                    <h3 className="text-2xl font-bold text-red-400 mb-6">Cons</h3>
                    <ul className="space-y-4">
                      {(tool.cons || []).map((con, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-6 h-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300 text-lg">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions about {tool.tool_name}</h2>
                <div className="space-y-6">
                  {sampleFaqs.map((faq, index) => (
                    <div key={index} className="bg-black border border-gray-800 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-cyan-400 mb-3">{faq.question}</h3>
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>


        {/* Related Comparisons */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">{tool.tool_name} Comparisons</h2>
              <p className="text-lg text-gray-300">See how {tool.tool_name} compares to other AI tools</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedComparisons.slice(0, 6).map((comparison, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:border-gray-600 transition-all">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    <a 
                      href={`/compare/${comparison.toolASlug || comparison.toolAName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}/vs/${comparison.toolBSlug || comparison.toolBName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {comparison.title}
                    </a>
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Compare {comparison.toolAName} and {comparison.toolBName} features, pricing, and use cases.
                  </p>
                  <a 
                    href={`/compare/${comparison.toolASlug || comparison.toolAName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}/vs/${comparison.toolBSlug || comparison.toolBName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                  >
                    Read Comparison →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternative Tools */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">{tool.tool_name} Alternatives</h2>
              <p className="text-lg text-gray-300">Explore other AI tools in this category</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTools.slice(0, 4).map((relatedTool, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-gray-600 transition-all">
                  <div className="flex items-center mb-4">
                    <div className="mr-3">
                      <ToolLogo 
                        toolName={relatedTool.tool_name || 'Tool'}
                        logoUrl={relatedTool.logo_url}
                        size="sm"
                      />
                    </div>
                    <h3 className="font-semibold text-white">{relatedTool.tool_name || 'Unknown Tool'}</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    {(relatedTool.description || '').length > 100 
                      ? `${(relatedTool.description || '').substring(0, 100)}...` 
                      : (relatedTool.description || '')}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      From {typeof relatedTool.pricing?.monthly === 'number' && relatedTool.pricing.monthly > 0 ? `$${relatedTool.pricing.monthly}` : 
                            relatedTool.pricing?.monthly === 0 ||
                            (typeof relatedTool.pricing?.monthly === 'string' && relatedTool.pricing.monthly.toLowerCase() === 'free') ? 'Free' : 'Custom'}
                    </span>
                    <a 
                      href={`/reviews/${(relatedTool.tool_name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                    >
                      Review →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ready to Get Started CTA */}
        <section className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 bg-black border border-gray-800 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started with {tool.tool_name}?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get started with {tool.tool_name} today and experience it for yourself.
            </p>
            <div className="flex justify-center">
              <a
                href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Schedule a Meeting With an AI Specialist
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fs = require('fs');
  const path = require('path');
  
  // Load all tools from aiToolsData.json to ensure all pages are pre-generated
  const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
  const toolsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  // Static review pages that already exist (to avoid conflicts)
  const staticReviewPages = ['contentstudio', 'loomly', 'sendible', 'social-champ', 'socialpilot'];
  
  // Generate paths for all tools except those with static pages
  const paths = toolsData
    .filter((tool: any) => !staticReviewPages.includes(tool.slug))
    .map((tool: any) => ({
      params: { toolName: tool.slug }
    }));

  return {
    paths,
    fallback: false // Changed to false to pre-generate all pages for GA tagging
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fs = require('fs');
  const path = require('path');
  const { loadUnifiedToolsData } = require('../../utils/unifiedDataAdapter');
  const { hasSEOComponent } = require('../../utils/seoComponentMapping');
  
  const toolSlug = params?.toolName as string;
  const tools = loadUnifiedToolsData(fs, path);
  
  // Load the public data to get correct slugs for comparisons
  const publicToolsData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public/data/aiToolsData.json'), 'utf8')
  );
  
  // Find tool by slug (try actual slug first, then fall back to generated slug)
  const tool = tools.find((t: any) => 
    t.slug === toolSlug || 
    t.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') === toolSlug
  );

  if (!tool) {
    return {
      notFound: true
    };
  }

  const pageTitle = `${tool.tool_name} Review — Features, Pricing, Pros & Cons [2025]`;
  const slug = toolSlug;

  // Get related tools (exclude current tool)
  const relatedTools = tools.filter((t: any) => t.tool_name !== tool.tool_name);

  // Find the current tool's slug in public data
  const currentPublicTool = publicToolsData.find((t: any) => 
    t.name === tool.tool_name || 
    t.slug === tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  );
  const currentSlug = currentPublicTool?.slug || toolSlug;

  // Generate related comparisons using slugs from public data
  const relatedComparisons = [];
  for (let i = 0; i < publicToolsData.length; i++) {
    const otherPublicTool = publicToolsData[i];
    if (otherPublicTool.slug === currentSlug) continue;
    
    // Find corresponding tool in toolsData for display names
    const otherTool = tools.find((t: any) => 
      t.tool_name === otherPublicTool.name ||
      t.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') === otherPublicTool.slug
    );
    
    if (otherTool) {
      relatedComparisons.push({
        title: `${tool.tool_name} vs ${otherTool.tool_name}`,
        slug: `${currentSlug}/vs/${otherPublicTool.slug}`,
        toolAName: tool.tool_name,
        toolBName: otherTool.tool_name,
        toolASlug: currentSlug,
        toolBSlug: otherPublicTool.slug
      });
    }
  }

  // Check if we have a SEO-optimized component for this tool
  const hasOptimizedVersion = hasSEOComponent(toolSlug);
  
  // Prepare SEO data if available
  let seoData = null;
  if (hasOptimizedVersion) {
    // Map tool data to SEO component format
    seoData = {
      name: tool.tool_name,
      category: tool.category || 'AI Tools',
      description: tool.description,
      website: tool.official_url || '',
      rating: tool.rating || 4.5,
      slug: toolSlug
    };
  }

  return {
    props: {
      tool,
      pageTitle,
      slug,
      relatedTools: relatedTools.slice(0, 8),
      relatedComparisons: relatedComparisons.slice(0, 12),
      hasSEOVersion: hasOptimizedVersion,
      seoData
    }
  };
};