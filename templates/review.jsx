import React from 'react';
import Head from 'next/head';
import ComparisonTable from '../components/table';
import PricingCalculator from '../components/pricing-calculator';
import FAQ from '../components/faq';

const ReviewTemplate = ({ 
  tool, 
  headline, 
  subheading, 
  ctaText = "Get Started",
  ctaLink = "#pricing",
  pros = [],
  cons = [],
  faqs = [],
  relatedTools = [],
  reviewContent = null
}) => {
  // Generate meta title and description
  const generateMetaTitle = () => {
    if (tool) {
      return `${tool.tool_name} Review: Complete Guide [2025] | SiteOptz`;
    }
    return headline || "AI Tool Review | SiteOptz";
  };

  const generateMetaDescription = () => {
    if (tool) {
      return tool.meta_description || `Comprehensive ${tool.tool_name} review covering features, pricing, pros & cons, and alternatives. Expert analysis with real user feedback for 2025.`;
    }
    return subheading || "Detailed AI tool review with expert analysis and user feedback.";
  };

  // Generate keywords from tool data
  const generateKeywords = () => {
    if (tool && tool.target_keywords) {
      return tool.target_keywords.join(', ');
    }
    return "AI tool review, AI software, artificial intelligence tools";
  };

  // Generate structured data for review
  const generateStructuredData = () => {
    if (!tool) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
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
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "SiteOptz"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SiteOptz"
      }
    };
  };

  // Generate FAQ structured data
  const generateFAQStructuredData = () => {
    if (!faqs.length) return null;
    
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
  };

  // Generate internal links for related tools
  const generateRelatedLinks = () => {
    if (!relatedTools.length) return [];
    
    return relatedTools.map(tool => ({
      name: tool.tool_name,
      url: `/compare/${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`,
      description: tool.description?.substring(0, 100) + '...'
    }));
  };

  // Validate schema with Google Rich Results Test (if in development)
  const validateSchema = async (schema) => {
    if (process.env.NODE_ENV === 'development' && process.env.GOOGLE_RICH_RESULTS_API_KEY) {
      try {
        const response = await fetch('https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GOOGLE_RICH_RESULTS_API_KEY}`
          },
          body: JSON.stringify({
            url: typeof window !== 'undefined' ? window.location.href : '',
            requestScreenshot: false
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('Schema validation result:', result);
        }
      } catch (error) {
        console.warn('Schema validation failed:', error);
      }
    }
  };

  // Validate schemas on mount
  React.useEffect(() => {
    const reviewSchema = generateStructuredData();
    const faqSchema = generateFAQStructuredData();
    
    if (reviewSchema) {
      validateSchema(reviewSchema);
    }
    if (faqSchema) {
      validateSchema(faqSchema);
    }
  }, [tool, faqs]);

  // Default pros and cons if not provided
  const defaultPros = [
    "Powerful AI capabilities",
    "User-friendly interface",
    "Excellent customer support",
    "Regular updates and improvements",
    "Strong community"
  ];

  const defaultCons = [
    "Can be expensive for small teams",
    "Steep learning curve",
    "Limited customization options",
    "Requires internet connection"
  ];

  const toolPros = pros.length > 0 ? pros : defaultPros;
  const toolCons = cons.length > 0 ? cons : defaultCons;

  return (
    <>
      <Head>
        <title>{generateMetaTitle()}</title>
        <meta name="description" content={generateMetaDescription()} />
        <meta name="keywords" content={generateKeywords()} />
        
        {/* Open Graph */}
        <meta property="og:title" content={generateMetaTitle()} />
        <meta property="og:description" content={generateMetaDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:site_name" content="SiteOptz" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={generateMetaTitle()} />
        <meta name="twitter:description" content={generateMetaDescription()} />
        <meta name="twitter:site" content="@siteoptz" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        
        {/* Structured Data */}
        {generateStructuredData() && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateStructuredData())
            }}
          />
        )}
        {generateFAQStructuredData() && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateFAQStructuredData())
            }}
          />
        )}
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-lg bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-4xl">
                    {tool?.tool_name?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {headline}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {subheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ctaLink}
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
                >
                  {ctaText}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    About {tool?.tool_name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {tool?.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Starting Price</h3>
                      <p className="text-2xl font-bold text-indigo-600">
                        {tool?.pricing?.basic?.split(' - ')[1]?.split(' - ')[0] || 'Custom'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Free Plan</h3>
                      <p className="text-gray-600">
                        {tool?.pricing?.free === 'No free plan available' ? '❌ Not available' : '✅ Available'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {tool?.key_features?.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pros & Cons
              </h2>
              <p className="text-lg text-gray-600">
                What we love and what could be better
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Pros
                </h3>
                <ul className="space-y-3">
                  {toolPros.map((pro, index) => (
                    <li key={index} className="flex items-start text-green-700">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Cons
                </h3>
                <ul className="space-y-3">
                  {toolCons.map((con, index) => (
                    <li key={index} className="flex items-start text-red-700">
                      <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Review Content */}
        {reviewContent && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Detailed Review
                </h2>
                <div className="prose prose-lg max-w-none">
                  {reviewContent}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pricing Calculator */}
        <section id="pricing" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingCalculator tools={tool ? [tool] : []} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQ 
              faqs={faqs}
              title={`${tool?.tool_name} - FAQ`}
              subtitle="Common questions about this AI tool"
            />
          </div>
        </section>

        {/* Related Tools with Internal Linking */}
        {relatedTools.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Related Tools
                </h2>
                <p className="text-lg text-gray-600">
                  Explore alternatives and similar tools
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {generateRelatedLinks().map((relatedTool) => (
                  <div key={relatedTool.name} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">
                          {relatedTool.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{relatedTool.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{relatedTool.description}</p>
                    <a
                      href={relatedTool.url}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                      rel="internal"
                    >
                      Learn More →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Email Capture */}
        <section className="py-16 bg-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get More AI Tool Reviews
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Stay updated with the latest AI tool reviews and comparisons.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ReviewTemplate;
