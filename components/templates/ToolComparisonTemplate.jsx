import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const ToolComparisonTemplate = ({ 
  tool1, 
  tool2, 
  comparisonData, 
  seoData, 
  relatedComparisons 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Generate comparison winner for each category
  const getWinner = (category, tool1Value, tool2Value) => {
    if (category === 'pricing') {
      const price1 = parseFloat(tool1Value.replace(/[^0-9.]/g, '')) || 0;
      const price2 = parseFloat(tool2Value.replace(/[^0-9.]/g, '')) || 0;
      if (price1 === 0 && price2 > 0) return 'tool1';
      if (price2 === 0 && price1 > 0) return 'tool2';
      return price1 < price2 ? 'tool1' : price2 < price1 ? 'tool2' : 'tie';
    }
    
    if (category === 'features') {
      return tool1Value.length > tool2Value.length ? 'tool1' : 
             tool2Value.length > tool1Value.length ? 'tool2' : 'tie';
    }
    
    if (category === 'rating') {
      return tool1Value > tool2Value ? 'tool1' : 
             tool2Value > tool1Value ? 'tool2' : 'tie';
    }
    
    return 'tie';
  };

  // Generate structured data for comparison
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ComparisonPage",
    "name": seoData.title,
    "description": seoData.description,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "position": 1,
          "name": tool1.toolName,
          "description": tool1.description,
          "applicationCategory": tool1.category,
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": tool1.pricing.price.replace(/[^0-9.]/g, ''),
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": tool1.rating,
            "reviewCount": tool1.review_count
          }
        },
        {
          "@type": "SoftwareApplication",
          "position": 2,
          "name": tool2.toolName,
          "description": tool2.description,
          "applicationCategory": tool2.category,
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": tool2.pricing.price.replace(/[^0-9.]/g, ''),
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": tool2.rating,
            "reviewCount": tool2.review_count
          }
        }
      ]
    }
  };

  const WinnerBadge = ({ winner, tool1Name, tool2Name }) => {
    if (winner === 'tie') {
      return <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs font-medium rounded">Tie</span>;
    }
    
    const winnerName = winner === 'tool1' ? tool1Name : tool2Name;
    const bgColor = winner === 'tool1' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
    
    return (
      <span className={`px-2 py-1 ${bgColor} text-xs font-medium rounded`}>
        {winnerName} wins
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        <link rel="canonical" href={seoData.canonicalUrl} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {tool1.toolName} vs {tool2.toolName}
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {comparisonData.subtitle || `Complete comparison of ${tool1.toolName} and ${tool2.toolName} - features, pricing, pros, cons, and recommendations for 2025.`}
              </p>
              
              {/* Quick Answer */}
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 max-w-4xl mx-auto">
                <h2 className="text-lg font-semibold text-white mb-4">Quick Answer</h2>
                <p className="text-blue-100">
                  {comparisonData.quickAnswer || `Choose ${tool1.toolName} if you need ${tool1.use_cases[0].toLowerCase()}. Choose ${tool2.toolName} if you prioritize ${tool2.use_cases[0].toLowerCase()}.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Feature Comparison
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                      <div className="flex items-center justify-center space-x-3">
                        <Image 
                          src={tool1.logo_url} 
                          alt={`${tool1.toolName} logo`}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                        <span>{tool1.toolName}</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                      <div className="flex items-center justify-center space-x-3">
                        <Image 
                          src={tool2.logo_url} 
                          alt={`${tool2.toolName} logo`}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                        <span>{tool2.toolName}</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Winner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Pricing */}
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Starting Price</td>
                    <td className="px-6 py-4 text-center text-gray-700">{tool1.pricing.price}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{tool2.pricing.price}</td>
                    <td className="px-6 py-4 text-center">
                      <WinnerBadge 
                        winner={getWinner('pricing', tool1.pricing.price, tool2.pricing.price)}
                        tool1Name={tool1.toolName}
                        tool2Name={tool2.toolName}
                      />
                    </td>
                  </tr>
                  
                  {/* Free Plan */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Free Plan</td>
                    <td className="px-6 py-4 text-center">
                      {tool1.pricing.plans.some(plan => plan.price === '$0') ? 
                        <span className="text-green-600 font-medium">✓ Yes</span> : 
                        <span className="text-red-600 font-medium">✗ No</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-center">
                      {tool2.pricing.plans.some(plan => plan.price === '$0') ? 
                        <span className="text-green-600 font-medium">✓ Yes</span> : 
                        <span className="text-red-600 font-medium">✗ No</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-center">
                      <WinnerBadge 
                        winner={tool1.pricing.plans.some(plan => plan.price === '$0') === tool2.pricing.plans.some(plan => plan.price === '$0') ? 'tie' : 
                               tool1.pricing.plans.some(plan => plan.price === '$0') ? 'tool1' : 'tool2'}
                        tool1Name={tool1.toolName}
                        tool2Name={tool2.toolName}
                      />
                    </td>
                  </tr>
                  
                  {/* Features Count */}
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Number of Features</td>
                    <td className="px-6 py-4 text-center text-gray-700">{tool1.features.length}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{tool2.features.length}</td>
                    <td className="px-6 py-4 text-center">
                      <WinnerBadge 
                        winner={getWinner('features', tool1.features, tool2.features)}
                        tool1Name={tool1.toolName}
                        tool2Name={tool2.toolName}
                      />
                    </td>
                  </tr>
                  
                  {/* Rating */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">User Rating</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="font-medium">{tool1.rating}</span>
                        <span className="text-gray-500 text-sm">({tool1.review_count?.toLocaleString()})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="font-medium">{tool2.rating}</span>
                        <span className="text-gray-500 text-sm">({tool2.review_count?.toLocaleString()})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <WinnerBadge 
                        winner={getWinner('rating', tool1.rating, tool2.rating)}
                        tool1Name={tool1.toolName}
                        tool2Name={tool2.toolName}
                      />
                    </td>
                  </tr>
                  
                  {/* Category */}
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Category</td>
                    <td className="px-6 py-4 text-center text-gray-700">{tool1.category}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{tool2.category}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs font-medium rounded">Both</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Detailed Analysis Tabs */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {[
                  { key: 'overview', label: 'Overview' },
                  { key: 'features', label: 'Features' },
                  { key: 'pricing', label: 'Pricing' },
                  { key: 'pros-cons', label: 'Pros & Cons' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{tool1.toolName}</h3>
                  <p className="text-gray-600 mb-6">{tool1.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {tool1.use_cases.slice(0, 3).map((useCase, index) => (
                          <li key={index}>{useCase}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Starting Price:</h4>
                      <p className="text-2xl font-bold text-blue-600">{tool1.pricing.price}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{tool2.toolName}</h3>
                  <p className="text-gray-600 mb-6">{tool2.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {tool2.use_cases.slice(0, 3).map((useCase, index) => (
                          <li key={index}>{useCase}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Starting Price:</h4>
                      <p className="text-2xl font-bold text-green-600">{tool2.pricing.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{tool1.toolName} Features</h3>
                  <div className="space-y-3">
                    {tool1.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{tool2.toolName} Features</h3>
                  <div className="space-y-3">
                    {tool2.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{tool1.toolName} Pricing</h3>
                  <div className="space-y-4">
                    {tool1.pricing.plans.map((plan, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                          <span className="text-lg font-bold text-blue-600">{plan.price}</span>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2">
                              <span className="text-blue-500">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{tool2.toolName} Pricing</h3>
                  <div className="space-y-4">
                    {tool2.pricing.plans.map((plan, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                          <span className="text-lg font-bold text-green-600">{plan.price}</span>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2">
                              <span className="text-green-500">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pros-cons' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">{tool1.toolName}</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-green-800 mb-3">Pros</h4>
                      <div className="bg-green-50 rounded-lg p-4">
                        {tool1.pros.map((pro, index) => (
                          <div key={index} className="flex items-start space-x-3 mb-2 last:mb-0">
                            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-800">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-red-800 mb-3">Cons</h4>
                      <div className="bg-red-50 rounded-lg p-4">
                        {tool1.cons.map((con, index) => (
                          <div key={index} className="flex items-start space-x-3 mb-2 last:mb-0">
                            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="text-red-800">{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">{tool2.toolName}</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-green-800 mb-3">Pros</h4>
                      <div className="bg-green-50 rounded-lg p-4">
                        {tool2.pros.map((pro, index) => (
                          <div key={index} className="flex items-start space-x-3 mb-2 last:mb-0">
                            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-800">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-red-800 mb-3">Cons</h4>
                      <div className="bg-red-50 rounded-lg p-4">
                        {tool2.cons.map((con, index) => (
                          <div key={index} className="flex items-start space-x-3 mb-2 last:mb-0">
                            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="text-red-800">{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Choose?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Both tools have their strengths. Try them out to see which fits your workflow better.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={tool1.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Try {tool1.toolName}
              </a>
              <a
                href={tool2.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Try {tool2.toolName}
              </a>
            </div>
          </div>
        </section>

        {/* Related Comparisons */}
        {relatedComparisons && relatedComparisons.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Related Comparisons
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedComparisons.slice(0, 6).map((comparison, index) => (
                  <Link key={index} href={comparison.url}>
                    <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {comparison.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {comparison.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ToolComparisonTemplate;