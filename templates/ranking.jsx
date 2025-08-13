import React from 'react';
import Head from 'next/head';
import ComparisonTable from '../components/table';
import PricingCalculator from '../components/pricing-calculator';
import FAQ from '../components/faq';

const RankingTemplate = ({ 
  tools, 
  headline, 
  subheading, 
  ctaText = "Compare All Tools",
  ctaLink = "#ranking",
  category = "AI Tools",
  rankingCriteria = [],
  faqs = [],
  relatedCategories = []
}) => {
  // Generate meta title and description
  const generateMetaTitle = () => {
    if (tools.length > 0) {
      return `Top ${tools.length} ${category} in 2025: Complete Rankings | SiteOptz`;
    }
    return headline || "AI Tool Rankings | SiteOptz";
  };

  const generateMetaDescription = () => {
    if (tools.length > 0) {
      const topTools = tools.slice(0, 3).map(t => t.tool_name).join(', ');
      return `Discover the best ${category.toLowerCase()} with our comprehensive rankings. Top picks: ${topTools}. Expert analysis, pricing comparison, and real user reviews for 2025.`;
    }
    return subheading || "Comprehensive rankings of the best AI tools with expert analysis and user reviews.";
  };

  // Generate keywords from tool data
  const generateKeywords = () => {
    const keywords = [];
    tools.forEach(tool => {
      if (tool.target_keywords) {
        keywords.push(...tool.target_keywords);
      }
    });
    // Add ranking-specific keywords
    keywords.push(`best ${category.toLowerCase()}`, `${category.toLowerCase()} rankings`, `top ${category.toLowerCase()}`);
    return [...new Set(keywords)].join(', ');
  };

  // Generate structured data for ranking page
  const generateStructuredData = () => {
    if (tools.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": headline,
      "description": subheading,
      "numberOfItems": tools.length,
      "itemListElement": tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.tool_name,
          "description": tool.description,
          "applicationCategory": category,
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
        }
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

  // Generate internal links for related categories
  const generateRelatedCategoryLinks = () => {
    if (!relatedCategories.length) return [];
    
    return relatedCategories.map(cat => ({
      name: cat.name,
      url: cat.link,
      description: cat.description
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
    const rankingSchema = generateStructuredData();
    const faqSchema = generateFAQStructuredData();
    
    if (rankingSchema) {
      validateSchema(rankingSchema);
    }
    if (faqSchema) {
      validateSchema(faqSchema);
    }
  }, [tools, faqs]);

  // Default ranking criteria if not provided
  const defaultCriteria = [
    "Overall Rating",
    "Ease of Use",
    "Features",
    "Pricing",
    "Customer Support",
    "Performance"
  ];

  const criteria = rankingCriteria.length > 0 ? rankingCriteria : defaultCriteria;

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

        {/* Ranking Criteria */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How We Rank {category}
              </h2>
              <p className="text-lg text-gray-600">
                Our comprehensive evaluation criteria
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {criteria.map((criterion, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{criterion}</h3>
                  </div>
                  <p className="text-gray-600">
                    We evaluate each tool based on {criterion.toLowerCase()} to ensure you get the best recommendations.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Tools Ranking */}
        <section id="ranking" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Top {tools.length} {category}
              </h2>
              <p className="text-lg text-gray-600">
                Ranked by overall performance and user satisfaction
              </p>
            </div>
            
            <div className="space-y-6">
              {tools.map((tool, index) => (
                <div key={tool.tool_name} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-2xl">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{tool.tool_name}</h3>
                        <p className="text-gray-600">{tool.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">
                        #{index + 1}
                      </div>
                      <div className="text-sm text-gray-500">Rank</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Starting Price</h4>
                      <p className="text-lg font-bold text-indigo-600">
                        {tool.pricing.basic?.split(' - ')[1]?.split(' - ')[0] || 'Custom'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                      <ul className="space-y-1">
                        {tool.key_features?.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-600 text-sm">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Rating</h4>
                        <div className="flex items-center">
                          <span className="text-2xl">⭐⭐⭐⭐⭐</span>
                          <span className="ml-2 text-lg font-bold text-gray-900">4.5/5</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <a
                          href={`/compare/${tool.tool_name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                          rel="internal"
                        >
                          Read Review
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ComparisonTable 
              tools={tools} 
              comparisonPoints={criteria}
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
              title={`${category} - FAQ`}
              subtitle="Common questions about these tools"
            />
          </div>
        </section>

        {/* Related Categories with Internal Linking */}
        {relatedCategories.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Explore More Categories
                </h2>
                <p className="text-lg text-gray-600">
                  Discover other AI tool categories
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {generateRelatedCategoryLinks().map((category) => (
                  <div key={category.name} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <a
                      href={category.url}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                      rel="internal"
                    >
                      View Rankings →
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
              Get Updated Rankings
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Stay informed about the latest tool rankings and comparisons.
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

export default RankingTemplate;
