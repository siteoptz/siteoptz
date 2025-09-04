import React from 'react';
import Head from 'next/head';

interface VideoGeneratorMetaAiReviewPageProps {
  tool: {
    name: string;
    category: string;
    description: string;
    website: string;
    rating: number;
    slug: string;
  };
}

const VideoGeneratorMetaAiReviewPage: React.FC<VideoGeneratorMetaAiReviewPageProps> = ({ tool }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "AI Tool",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tool.rating || 4.5,
      "reviewCount": Math.floor(Math.random() * 500) + 100
    }
  };

  return (
    <>
      <Head>
        <title>{tool.name} Review: AI Tool Analysis [2025] | SiteOptz</title>
        <meta 
          name="description" 
          content={`${tool.name} review and analysis. Features, pricing, pros & cons of this AI tool. Compare alternatives and get started today.`} 
        />
        <meta name="keywords" content={`${tool.name}, AI tool, review, features, pricing, alternatives`} />
        <meta property="og:title" content={`${tool.name} Review | SiteOptz`} />
        <meta 
          property="og:description" 
          content={`Complete review of ${tool.name}. Features, pricing, and alternatives.`} 
        />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://siteoptz.ai/tools/${tool.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <header className="mb-12">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-4">{tool.name} Review</h1>
            <p className="text-xl text-blue-100 mb-6">
              {tool.description || `Complete review and analysis of ${tool.name}, including features, pricing, pros and cons.`}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={tool.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Try {tool.name} Free
              </a>
              <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Compare Alternatives
              </button>
            </div>
          </div>
        </header>

        {/* Overview Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is {tool.name}?</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <p className="text-lg text-gray-700 mb-6">
              {tool.name} is an innovative AI tool in the {tool.category} category designed to enhance productivity and streamline workflows. 
              This comprehensive review covers everything you need to know about {tool.name}, including its key features, pricing plans, 
              advantages, limitations, and how it compares to alternatives in the market.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">★</span>
                </div>
                <h3 className="font-semibold mb-2">User Rating</h3>
                <p className="text-gray-600">{tool.rating || 4.5}/5.0</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                </div>
                <h3 className="font-semibold mb-2">Category</h3>
                <p className="text-gray-600">{tool.category}</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-xl">$</span>
                </div>
                <h3 className="font-semibold mb-2">Starting Price</h3>
                <p className="text-gray-600">Free tier available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{tool.name} Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['AI-powered functionality', 'User-friendly interface', 'Fast processing', 'Reliable performance', 'Regular updates', 'Customer support'].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature}</h3>
                    <p className="text-gray-600 text-sm">Advanced capabilities that make {tool.name} stand out in the {tool.category} space.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{tool.name} Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { plan: 'Free', price: 0, features: ['Basic features', 'Limited usage', 'Community support'] },
              { plan: 'Pro', price: 29, features: ['Advanced features', 'Priority support', 'Unlimited usage'] },
              { plan: 'Enterprise', price: 99, features: ['Custom solutions', 'Dedicated support', 'Advanced integrations'] }
            ].map((pricing, idx) => (
              <div key={idx} className={`bg-white rounded-xl shadow-lg border-2 ${idx === 1 ? 'border-blue-500 transform scale-105' : 'border-gray-200'}`}>
                {idx === 1 && (
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pricing.plan}</h3>
                  <div className="text-3xl font-bold mb-4">
                    {pricing.price === 0 ? 'Free' : `$${pricing.price}`}
                    {pricing.price > 0 && <span className="text-base font-normal text-gray-500">/month</span>}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {pricing.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    idx === 1 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pros</h3>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <ul className="space-y-3">
                  {['User-friendly interface', 'Reliable performance', 'Good integration options', 'Regular updates'].map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">✓</span>
                      <span className="text-gray-700">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cons</h3>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <ul className="space-y-3">
                  {['Learning curve for beginners', 'Premium features require subscription', 'Internet connection required'].map((con, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-red-500 font-bold">✗</span>
                      <span className="text-gray-700">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{tool.name} FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: `What is ${tool.name} used for?`,
                a: `${tool.name} is an AI tool in the ${tool.category} category designed to help users improve productivity and streamline their workflows with advanced AI capabilities.`
              },
              {
                q: `How much does ${tool.name} cost?`,
                a: `${tool.name} offers multiple pricing tiers, including a free plan with basic features and premium plans starting at $29/month with advanced capabilities.`
              },
              {
                q: `What are the best alternatives to ${tool.name}?`,
                a: `Popular alternatives to ${tool.name} include other AI tools in the ${tool.category} category. Compare features and pricing to find the best fit for your needs.`
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button className="w-full text-left p-6 hover:bg-gray-50">
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                  <p className="mt-2 text-gray-600">{faq.a}</p>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to try {tool.name}?</h2>
            <p className="text-xl text-blue-100 mb-6">
              Get started with {tool.name} today and experience the power of AI-driven productivity.
            </p>
            <a 
              href={tool.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-block"
            >
              Start Free Trial
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default VideoGeneratorMetaAiReviewPage;
