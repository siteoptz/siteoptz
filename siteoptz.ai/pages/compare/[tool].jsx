import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import aiToolsData from '../../data/aiToolsData.json';
import SEOHead from '../../components/SEOHead';
import HeroSection from '../../components/comparison/HeroSection';
import PricingCalculator from '../../components/comparison/PricingCalculator';
import FAQSection from '../../components/comparison/FAQSection';
import EmailCaptureForm from '../../components/comparison/EmailCaptureForm';
import { TryNowButton, ContactSalesButton } from '../../components/CTAButton';
import { generateMetaTitle, generateMetaDescription } from '../../utils/seo';

/**
 * Single tool review and comparison page
 * Shows detailed information about one AI tool with comparison suggestions
 */
export default function SingleToolPage({ tool, suggestedComparisons }) {
  const router = useRouter();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!tool) {
    return <div>Tool not found</div>;
  }

  const handleGetReport = () => {
    setShowEmailForm(true);
  };

  const formatPrice = (price, hasFreeTier) => {
    if (hasFreeTier && (!price || price === 0)) return 'Free';
    if (!price || price === 0) return 'Free';
    return `$${price}/month`;
  };

  return (
    <>
      <SEOHead
        title={generateMetaTitle(tool.name)}
        description={generateMetaDescription(tool.name, null, {
          features: tool.features.core.slice(0, 3),
          price: tool.pricing.startingPrice,
          rating: tool.rating
        })}
        keywords={`${tool.name} review, ${tool.name} pricing, ${tool.name} features, ${tool.name} alternatives, ${tool.vendor} AI tool, AI assistant comparison`}
        canonical={`https://siteoptz.ai/compare/${tool.id}`}
        schemas={{
          product: {
            "@type": "Product",
            "name": tool.name,
            "description": tool.description,
            "brand": {
              "@type": "Brand",
              "name": tool.vendor
            },
            "offers": {
              "@type": "Offer",
              "price": tool.pricing.startingPrice || 0,
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": tool.rating,
              "reviewCount": tool.reviewCount,
              "bestRating": 5,
              "worstRating": 1
            }
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://siteoptz.ai"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "AI Tool Comparison",
                "item": "https://siteoptz.ai/compare"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": tool.name,
                "item": `https://siteoptz.ai/compare/${tool.id}`
              }
            ]
          }
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Tool Info */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl p-3 mr-6">
                    <Image
                      src={tool.logo}
                      alt={`${tool.name} logo - ${tool.vendor} AI tool review`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{tool.name}</h1>
                    <p className="text-xl text-gray-600">by {tool.vendor}</p>
                  </div>
                </div>

                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {tool.description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {tool.rating}/5
                    </div>
                    <div className="text-sm text-gray-600">User Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {formatPrice(tool.pricing.startingPrice, tool.pricing.freeTier)}
                    </div>
                    <div className="text-sm text-gray-600">Starting Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {tool.reviewCount?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <TryNowButton 
                    tool={tool} 
                    size="large"
                    className="flex-1"
                  />
                  <button
                    onClick={handleGetReport}
                    className="flex-1 bg-blue-100 text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
                  >
                    Get Detailed Report
                  </button>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
                <div className="space-y-4">
                  {tool.features.core.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'features', label: 'Features' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'comparisons', label: 'Comparisons' },
                { id: 'faq', label: 'FAQ' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {activeTab === 'overview' && (
            <OverviewTab tool={tool} />
          )}
          {activeTab === 'features' && (
            <FeaturesTab tool={tool} />
          )}
          {activeTab === 'pricing' && (
            <div className="max-w-4xl mx-auto">
              <PricingCalculator toolA={tool} showComparison={false} />
            </div>
          )}
          {activeTab === 'comparisons' && (
            <ComparisonsTab tool={tool} suggestedComparisons={suggestedComparisons} />
          )}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto">
              <FAQSection toolA={tool} />
            </div>
          )}
        </div>

        {/* Email Capture Modal */}
        <EmailCaptureForm
          isOpen={showEmailForm}
          onClose={() => setShowEmailForm(false)}
          tools={[tool]}
          title={`Get Your ${tool.name} Analysis Report`}
          description="We'll create a detailed analysis including pricing recommendations, feature breakdown, and alternative suggestions."
        />
      </div>
    </>
  );
}

/**
 * Overview tab content
 */
function OverviewTab({ tool }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About {tool.name}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {tool.description}
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Best For</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {tool.useCases.map((useCase, index) => (
              <div key={index} className="flex items-center bg-blue-50 rounded-lg p-3">
                <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-900 font-medium">{useCase}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Target Audience</h3>
          <div className="flex flex-wrap gap-2">
            {tool.targetAudience.map((audience, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {audience}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="text-sm text-gray-900">{tool.category}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Free Tier</dt>
              <dd className="text-sm text-gray-900">{tool.pricing.freeTier ? 'Yes' : 'No'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Starting Price</dt>
              <dd className="text-sm text-gray-900">
                {tool.pricing.startingPrice ? `$${tool.pricing.startingPrice}/month` : 'Free'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">User Rating</dt>
              <dd className="text-sm text-gray-900">{tool.rating}/5 ⭐</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Reviews</dt>
              <dd className="text-sm text-gray-900">{tool.reviewCount?.toLocaleString()}</dd>
            </div>
          </dl>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <TryNowButton tool={tool} fullWidth size="medium" />
            <ContactSalesButton 
              tool={tool} 
              fullWidth 
              size="medium" 
              variant="outline" 
              className="mt-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Features tab content
 */
function FeaturesTab({ tool }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Features</h2>
        <div className="space-y-3">
          {tool.features.core.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Features</h2>
        <div className="space-y-3">
          {tool.features.advanced.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 lg:col-span-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Integrations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tool.features.integrations.map((integration, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="text-sm font-medium text-gray-700">{integration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Comparisons tab content
 */
function ComparisonsTab({ tool, suggestedComparisons }) {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Compare {tool.name} with Other AI Tools
        </h2>
        <p className="text-lg text-gray-600">
          See how {tool.name} stacks up against similar AI tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestedComparisons.map((comparisonTool) => (
          <Link 
            key={comparisonTool.id}
            href={`/compare/${tool.id}-vs-${comparisonTool.id}`}
            className="block"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Image
                  src={comparisonTool.logo}
                  alt={comparisonTool.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {tool.name} vs {comparisonTool.name}
                  </h3>
                  <p className="text-sm text-gray-500">{comparisonTool.vendor}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Compare features, pricing, and capabilities between {tool.name} and {comparisonTool.name}.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 font-medium">View Comparison</span>
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = aiToolsData.tools.map(tool => ({
    params: { tool: tool.id }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const tool = aiToolsData.tools.find(t => t.id === params.tool);
  
  if (!tool) {
    return {
      notFound: true
    };
  }

  // Get suggested comparisons (other tools in same category)
  const suggestedComparisons = aiToolsData.tools
    .filter(t => t.id !== tool.id && (t.category === tool.category || t.useCases.some(uc => tool.useCases.includes(uc))))
    .slice(0, 6);

  return {
    props: {
      tool,
      suggestedComparisons
    }
  };
}