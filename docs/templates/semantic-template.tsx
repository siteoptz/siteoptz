import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SemanticLayout from '../../components/SemanticLayout';
import SEOHead from '../../components/SEOHead';
import { Star, CheckCircle, XCircle, ArrowRight, Download, Share2, Bookmark } from 'lucide-react';

/**
 * Semantic HTML Template for Tool Detail Pages
 * 
 * This is a TEMPLATE FILE demonstrating proper use of HTML5 semantic elements
 * including article, section, aside, nav, header, and proper heading hierarchy.
 * 
 * Usage:
 * 1. Copy this file to pages/tools/[slug].tsx or similar
 * 2. Remove the example data from getStaticProps
 * 3. Add real data fetching logic
 * 4. For dynamic routes, add getStaticPaths function
 * 
 * Note: This file is in docs/templates to avoid Next.js build issues
 */

interface ToolPageProps {
  tool: any;
  relatedTools: any[];
}

export default function SemanticToolPage({ tool, relatedTools }: ToolPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'alternatives', label: 'Alternatives' },
  ];

  return (
    <SemanticLayout>
      <SEOHead
        title={tool.meta.title}
        description={tool.meta.description}
        keywords={tool.meta.keywords}
        canonicalUrl={tool.meta.canonical}
        schemaData={tool.schema}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 px-4 py-3">
        <ol className="max-w-7xl mx-auto flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li>
            <Link href="/tools" className="text-gray-500 hover:text-gray-700">
              Tools
            </Link>
          </li>
          <li aria-hidden="true">
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li>
            <Link href={`/tools?category=${tool.overview.category?.toLowerCase().replace(/ /g, '-')}`} className="text-gray-500 hover:text-gray-700">
              {tool.overview.category}
            </Link>
          </li>
          <li aria-hidden="true">
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li>
            <span className="text-gray-900" aria-current="page">{tool.name}</span>
          </li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8">
            {/* Tool Header */}
            <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-start space-x-4">
                <figure className="flex-shrink-0">
                  <Image
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </figure>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {tool.name}
                  </h1>
                  
                  <p className="text-gray-600 mb-4">
                    {tool.overview.description}
                  </p>
                  
                  {/* Rating */}
                  {tool.schema?.aggregateRating && (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center" role="img" aria-label={`Rated ${tool.schema.aggregateRating.ratingValue} out of 5 stars`}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(tool.schema.aggregateRating.ratingValue)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {tool.schema.aggregateRating.ratingValue} ({tool.schema.aggregateRating.reviewCount} reviews)
                        </span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button
                          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                          aria-label="Share tool"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                          aria-label="Bookmark tool"
                        >
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Tab Navigation */}
            <nav className="bg-white rounded-lg shadow-lg mb-8" aria-label="Tool information tabs">
              <ul className="flex border-b" role="tablist">
                {tabs.map((tab) => (
                  <li key={tab.id} role="presentation">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`${tab.id}-panel`}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <section id="overview-panel" role="tabpanel" aria-labelledby="overview-tab">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                  
                  <div className="prose prose-lg max-w-none">
                    <p>{tool.overview.description}</p>
                    
                    {/* Use Cases */}
                    {tool.use_cases && tool.use_cases.length > 0 && (
                      <section className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Use Cases</h3>
                        <ul className="space-y-2">
                          {tool.use_cases.map((useCase: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" aria-hidden="true" />
                              <span>{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}
                    
                    {/* Key Benefits */}
                    <section className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {tool.pros?.map((pro: string, index: number) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" aria-hidden="true" />
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    {/* Limitations */}
                    {tool.cons && tool.cons.length > 0 && (
                      <section className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Limitations</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {tool.cons.map((con: string, index: number) => (
                            <div key={index} className="flex items-start">
                              <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" aria-hidden="true" />
                              <span>{con}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </section>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <section id="features-panel" role="tabpanel" aria-labelledby="features-tab">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
                  
                  <div className="space-y-6">
                    {/* Core Features */}
                    <section>
                      <h3 className="text-lg font-semibold mb-3">Core Features</h3>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {tool.features?.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" aria-hidden="true" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                    
                    {/* Integrations */}
                    {tool.overview.integrations && tool.overview.integrations.length > 0 && (
                      <section>
                        <h3 className="text-lg font-semibold mb-3">Integrations</h3>
                        <div className="flex flex-wrap gap-2">
                          {tool.overview.integrations.map((integration: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {integration}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </section>
              )}

              {/* Pricing Tab */}
              {activeTab === 'pricing' && (
                <section id="pricing-panel" role="tabpanel" aria-labelledby="pricing-tab">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tool.pricing?.map((plan: any, index: number) => (
                      <article key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <header>
                          <h3 className="text-lg font-semibold mb-2">{plan.plan}</h3>
                          <div className="text-3xl font-bold mb-4">
                            {plan.price_per_month === 0 ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              <>
                                <span>${plan.price_per_month}</span>
                                <span className="text-sm font-normal text-gray-500">/month</span>
                              </>
                            )}
                          </div>
                        </header>
                        
                        {plan.features && (
                          <ul className="space-y-2">
                            {plan.features.map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-start text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" aria-hidden="true" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* CTA Card */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Get Started with {tool.name}</h2>
              
              <div className="space-y-3">
                <a
                  href={tool.affiliate_link || tool.overview.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Try {tool.name} Free
                  <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </a>
                
                <Link
                  href={`/compare/${tool.slug}-vs-alternatives`}
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Compare Alternatives
                </Link>
              </div>
              
              {/* Quick Stats */}
              <dl className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Starting Price</dt>
                  <dd className="font-semibold">
                    {tool.pricing?.[0]?.price_per_month === 0 ? 'Free' : `$${tool.pricing?.[0]?.price_per_month}/mo`}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Category</dt>
                  <dd className="font-semibold">{tool.overview.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Founded</dt>
                  <dd className="font-semibold">{tool.overview.release_year || 'N/A'}</dd>
                </div>
              </dl>
            </section>

            {/* Related Tools */}
            {relatedTools && relatedTools.length > 0 && (
              <section className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Related Tools</h2>
                
                <nav aria-label="Related tools">
                  <ul className="space-y-3">
                    {relatedTools.slice(0, 5).map((related) => (
                      <li key={related.id}>
                        <Link
                          href={`/tools/${related.slug}`}
                          className="flex items-center space-x-3 group"
                        >
                          <Image
                            src={related.logo}
                            alt={`${related.name} logo`}
                            width={32}
                            height={32}
                            className="rounded"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {related.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {related.overview.category}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                <Link
                  href={`/tools?category=${tool.overview.category?.toLowerCase().replace(/ /g, '-')}`}
                  className="block mt-4 text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All {tool.overview.category} Tools
                  <ArrowRight className="inline-block ml-1 w-4 h-4" />
                </Link>
              </section>
            )}

            {/* Download Resources */}
            <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Free Resources</h2>
              
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/downloads/ai-tool-selection-framework"
                    className="flex items-center justify-between group"
                  >
                    <span className="group-hover:underline">AI Tool Selection Guide</span>
                    <Download className="w-4 h-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/downloads/ai-implementation-playbook"
                    className="flex items-center justify-between group"
                  >
                    <span className="group-hover:underline">Implementation Playbook</span>
                    <Download className="w-4 h-4" />
                  </Link>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </SemanticLayout>
  );
}

// Example static props implementation for dynamic routes
// Note: Only use getStaticPaths with dynamic routes like [slug].tsx
// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// };

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch tool data here
  return {
    props: {
      tool: {
        name: "Example Tool",
        meta: {
          title: "Example Tool - Semantic HTML Template",
          description: "Example semantic HTML template",
          keywords: "example, template, semantic, html",
          canonical: "https://siteoptz.ai/tools/example"
        },
        schema: {},
        overview: {
          category: "Template",
          description: "This is an example semantic HTML template",
          release_year: 2024
        },
        logo: "/images/tools/placeholder-logo.svg",
        slug: "example-tool",
        pricing: [],
        use_cases: [],
        pros: [],
        cons: [],
        features: []
      },
      relatedTools: [],
    },
  };
};