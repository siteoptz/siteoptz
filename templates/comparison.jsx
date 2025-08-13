import React from 'react';
import Head from 'next/head';
import ComparisonTable from '../components/table';
import PricingCalculator from '../components/pricing-calculator';
import FAQ from '../components/faq';

const ComparisonTemplate = ({ 
  tool1, 
  tool2, 
  headline, 
  subheading, 
  ctaText = "Compare Now",
  ctaLink = "#comparison",
  comparisonPoints = [],
  faqs = [],
  relatedTools = []
}) => {
  const tools = [tool1, tool2].filter(Boolean);
  
  // Generate meta title and description
  const generateMetaTitle = () => {
    if (tool1 && tool2) {
      return `${tool1.tool_name} vs ${tool2.tool_name}: Complete Comparison [2025] | SiteOptz`;
    }
    return headline || "AI Tool Comparison | SiteOptz";
  };

  const generateMetaDescription = () => {
    if (tool1 && tool2) {
      return `Compare ${tool1.tool_name} vs ${tool2.tool_name} features, pricing, and performance. Expert analysis with real user feedback and implementation tips for 2025.`;
    }
    return subheading || "Compare AI tools side-by-side with detailed analysis and expert recommendations.";
  };

  // Generate keywords from tool data
  const generateKeywords = () => {
    const keywords = [];
    tools.forEach(tool => {
      if (tool.target_keywords) {
        keywords.push(...tool.target_keywords);
      }
    });
    return [...new Set(keywords)].join(', ');
  };

  // Generate structured data for comparison
  const generateStructuredData = () => {
    if (tools.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ComparisonPage",
      "name": headline,
      "description": subheading,
      "mainEntity": tools.map(tool => ({
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
      }))
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
    const comparisonSchema = generateStructuredData();
    const faqSchema = generateFAQStructuredData();
    
    if (comparisonSchema) {
      validateSchema(comparisonSchema);
    }
    if (faqSchema) {
      validateSchema(faqSchema);
    }
  }, [tool1, tool2, faqs]);

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
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {headline}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {subheading}
              </p>
              <a
                href={ctaLink}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
              >
                {ctaText}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Quick Comparison Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {tools.map((tool, index) => (
                <div key={tool.tool_name} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-2xl">
                        {tool.tool_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{tool.tool_name}</h2>
                      <p className="text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Starting Price</h3>
                      <p className="text-2xl font-bold text-indigo-600">
                        {tool.pricing.basic?.split(' - ')[1]?.split(' - ')[0] || 'Custom'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
                      <ul className="space-y-1">
                        {tool.key_features?.slice(0, 5).map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4">
                      <a
                        href={`/compare/${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Read Full Review
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section id="comparison" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ComparisonTable 
              tools={tools} 
              comparisonPoints={comparisonPoints}
            />
          </div>
        </section>

        {/* Pricing Calculator */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingCalculator tools={tools} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQ 
              faqs={faqs}
              title={`${tool1?.tool_name} vs ${tool2?.tool_name} - FAQ`}
              subtitle="Common questions about these AI tools"
            />
          </div>
        </section>

        {/* Related Tools with Internal Linking */}
        {relatedTools.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Related Tools
                </h2>
                <p className="text-lg text-gray-600">
                  Explore other AI tools in this category
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {generateRelatedLinks().map((relatedTool) => (
                  <div key={relatedTool.name} className="bg-white rounded-lg shadow-lg p-6">
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
              Stay Updated on AI Tools
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Get the latest reviews, comparisons, and insights delivered to your inbox.
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

export default ComparisonTemplate;
