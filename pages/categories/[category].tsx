import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Star, TrendingUp, Users, Zap, CheckCircle, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import { toolCategories, getCategorySlug } from '../../config/categories';
import { loadUnifiedToolsData } from '../../utils/unifiedDataAdapter';
import { categoryContent } from '../../content/categoryContent';
import ToolLogo from '../../components/ToolLogo';

interface CategoryPageProps {
  category: string;
  tools: any[];
  content: any;
}

export default function CategoryPage({ category, tools, content }: CategoryPageProps) {
  const [showAllTools, setShowAllTools] = useState(false);
  
  
  if (!content || !content.seo || !content.seo.title) {
    return <div>Error: Invalid category content structure</div>;
  }
  
  const topTools = tools.slice(0, 6);
  const displayedTools = showAllTools ? tools : topTools;
  const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <>
      <Head>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="keywords" content={content.seo.keywords.join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SiteOptz" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://siteoptz.ai/categories/${categorySlug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={content.seo.title} />
        <meta property="og:description" content={content.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://siteoptz.ai/categories/${categorySlug}`} />
        <meta property="og:site_name" content="SiteOptz" />
        <meta property="og:image" content={`https://siteoptz.ai/images/og/${categorySlug}.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@siteoptz" />
        <meta name="twitter:title" content={content.seo.title} />
        <meta name="twitter:description" content={content.seo.description} />
        <meta name="twitter:image" content={`https://siteoptz.ai/images/og/${categorySlug}.jpg`} />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SiteOptz",
              "url": "https://siteoptz.ai",
              "logo": "https://siteoptz.ai/images/logo.png",
              "description": "Leading AI tools comparison and review platform helping businesses choose the right artificial intelligence solutions.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-0123",
                "contactType": "customer service",
                "url": "https://siteoptz.ai/contact"
              },
              "sameAs": [
                "https://twitter.com/siteoptz",
                "https://linkedin.com/company/siteoptz"
              ]
            })
          }}
        />
        
        {/* Structured Data - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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
                  "name": "AI Tools",
                  "item": "https://siteoptz.ai/tools"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": category,
                  "item": `https://siteoptz.ai/categories/${categorySlug}`
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": content.hero?.title || content.seo.title,
              "description": content.seo.description,
              "author": {
                "@type": "Organization",
                "name": "SiteOptz",
                "url": "https://siteoptz.ai"
              },
              "publisher": {
                "@type": "Organization",
                "name": "SiteOptz",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://siteoptz.ai/images/logo.png"
                }
              },
              "datePublished": "2025-01-01",
              "dateModified": new Date().toISOString().split('T')[0],
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://siteoptz.ai/categories/${categorySlug}`
              },
              "articleBody": Array.isArray(content.introduction?.content) ? content.introduction.content.join(' ') : (content.introduction?.content || content.seo.description)
            })
          }}
        />
        
        {/* Structured Data - Category Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": `https://siteoptz.ai/categories/${categorySlug}`,
              "name": content.seo.title,
              "description": content.seo.description,
              "url": `https://siteoptz.ai/categories/${categorySlug}`,
              "mainEntity": {
                "@type": "ItemList",
                "@id": `https://siteoptz.ai/categories/${categorySlug}#itemlist`,
                "name": `${category} Tools Collection`,
                "description": `Curated list of the best ${category.toLowerCase()} tools`,
                "numberOfItems": tools.length,
                "itemListElement": topTools.map((tool: any, index: number) => ({
                  "@type": "SoftwareApplication",
                  "@id": `https://siteoptz.ai/reviews/${tool.tool_name?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                  "position": index + 1,
                  "name": tool.tool_name,
                  "description": tool.description,
                  "applicationCategory": category,
                  "operatingSystem": "Web Browser",
                  "url": tool.website || `https://siteoptz.ai/reviews/${tool.tool_name?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                  "offers": {
                    "@type": "Offer",
                    "price": tool.pricing?.monthly === 0 ? "0" : 
                             typeof tool.pricing?.monthly === 'number' ? tool.pricing.monthly.toString() : "0",
                    "priceCurrency": "USD",
                    "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": tool.rating || 4.5,
                    "reviewCount": tool.search_volume || 100,
                    "bestRating": 5,
                    "worstRating": 1
                  },
                  "author": {
                    "@type": "Organization",
                    "name": tool.vendor || tool.tool_name
                  }
                }))
              }
            })
          }}
        />
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": (content.faqs || []).map((faq: any) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {content.hero?.title || content.seo.title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-6">
                {content.hero?.subheading || `Best ${category} Tools 2025`}
              </h2>
              <div 
                className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content.hero?.introText || content.seo.description }}
              />
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{tools.length}+</div>
                  <div className="text-sm text-gray-400">Tools Reviewed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">50K+</div>
                  <div className="text-sm text-gray-400">Users Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">4.8/5</div>
                  <div className="text-sm text-gray-400">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">24/7</div>
                  <div className="text-sm text-gray-400">Expert Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-12">
                <h3 className="text-3xl font-bold text-white mb-6">
                  {content.introduction?.title || `About ${category} Tools`}
                </h3>
                <div className="prose prose-lg prose-gray-300 max-w-none">
                  {Array.isArray(content.introduction?.content) ? 
                    content.introduction.content.map((paragraph: string, index: number) => (
                      <p key={index} className="text-gray-300 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    )) : (
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {content.introduction?.content || content.seo.description}
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Tools Section */}
        <section id="tools-section" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                {showAllTools ? `All ${tools.length} ${category} Tools` : `Top ${category} Tools`}
              </h2>
              <p className="text-xl text-gray-300">
                Hand-picked and tested by our experts
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedTools.map((tool: any, index: number) => (
                <div key={tool.id || index} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-cyan-400 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <ToolLogo 
                        toolName={tool.tool_name}
                        logoUrl={tool.logo_url || tool.logo}
                        size="md"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{tool.tool_name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-300">{tool.rating || '4.5'}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {tool.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-cyan-400 font-bold">
                      {tool.pricing?.monthly === 0 ? 'Free' :
                       tool.pricing?.monthly === 'Custom' ? 'Custom' :
                       typeof tool.pricing?.monthly === 'number' ? `$${tool.pricing.monthly}/mo` : 'Custom'}
                    </div>
                    <Link 
                      href={`/reviews/${tool.slug || tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {tools.length > 6 && (
              <div className="text-center mt-12">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllTools(!showAllTools);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center touch-manipulation cursor-pointer"
                  style={{ WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}
                >
                  {showAllTools ? 'Show Less' : `View All ${tools.length} ${category} Tools`}
                  {showAllTools ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Business Cases Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Real-World Business Cases
              </h2>
              <p className="text-xl text-gray-300">
                How companies are transforming their operations with {category.toLowerCase()}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {(content.businessCases || []).map((businessCase: any, index: number) => (
                <div key={index} className="bg-black border border-gray-800 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">{businessCase.industry.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{businessCase.company}</h3>
                      <p className="text-cyan-400 text-sm">{businessCase.industry}</p>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-3">{businessCase.challenge}</h4>
                  <p className="text-gray-300 mb-4">{businessCase.solution}</p>
                  
                  <div className="border-t border-gray-800 pt-4">
                    <h5 className="text-sm font-semibold text-white mb-2">Results:</h5>
                    <ul className="space-y-1">
                      {(businessCase.results || []).map((result: string, resultIndex: number) => (
                        <li key={resultIndex} className="text-green-400 text-sm flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Examples Section */}
        {content.implementation && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  Implementation Guide
                </h2>
                
                <div className="bg-black border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    {content.implementation.title || `How to Implement ${category} Solutions`}
                  </h3>
                  
                  <div className="space-y-8">
                    {(content.implementation?.steps || []).map((step: any, index: number) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                          <p className="text-gray-300 mb-3">{step.description}</p>
                          {step.details && (
                            <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                              {(step.details || []).map((detail: string, detailIndex: number) => (
                                <li key={detailIndex}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {content.implementation.expectedResults && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-800/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-white mb-2">Expected Results</h4>
                      <p className="text-gray-300">{content.implementation.expectedResults}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {(content.faqs || []).map((faq: any, index: number) => (
                <details key={index} className="bg-black border border-gray-800 rounded-lg">
                  <summary className="p-6 cursor-pointer hover:bg-gray-900 transition-colors">
                    <h3 className="text-lg font-semibold text-white inline">
                      {faq.question}
                    </h3>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Business with {category}?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of businesses already using AI to drive growth and innovation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllTools(true);
                    setTimeout(() => {
                      document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="bg-white text-blue-600 hover:bg-gray-100 active:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition-colors touch-manipulation cursor-pointer"
                  style={{ WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}
                >
                  Explore {category} Tools
                </button>
                <a 
                  href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Your Free AI Consultation
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = toolCategories
    .filter(category => category !== 'SEO & Optimization' && category !== 'Paid Search & PPC' && category !== 'AI Automation') // Exclude categories with custom pages
    .map(category => ({
      params: { 
        category: category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      }
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fs = require('fs');
  const path = require('path');
  
  if (!params?.category || typeof params.category !== 'string') {
    return { notFound: true };
  }

  // Find the category from slug
  const categorySlug = params.category;
  const category = toolCategories.find(cat => 
    cat.toLowerCase().replace(/[^a-z0-9]+/g, '-') === categorySlug
  );

  if (!category) {
    return { notFound: true };
  }

  // Load tools for this category - check both category fields
  const allTools = loadUnifiedToolsData(fs, path);
  const tools = allTools.filter(tool => 
    tool.category === category || 
    tool.overview?.category === category
  );

  // Load category content with proper mapping from slug to content key
  const contentKeyMapping: Record<string, string> = {
    'ai-education': 'AI Education',
    'ai-for-business': 'AI For Business', 
    'ai-translator': 'AI Translator',
    'ai-website-builder': 'AI Website Builder',
    'finance-ai': 'Finance AI',
    'health-ai': 'Health AI',
    'lead-generation': 'Lead Generation',
    'voice-ai': 'Voice AI',
    'voice-ai-tools': 'Best Voice AI Tools',
    'writing': 'Writing'
  };
  
  // First try direct category name, then try the mapping
  let content = categoryContent[category];
  if (!content && contentKeyMapping[categorySlug]) {
    content = categoryContent[contentKeyMapping[categorySlug]];
  }
  
  if (!content) {
    console.error(`Category content not found for: ${category} (slug: ${categorySlug})`);
    console.error(`Available keys: ${Object.keys(categoryContent)}`);
    return { notFound: true };
  }

  return {
    props: {
      category,
      tools,
      content,
    },
  };
};