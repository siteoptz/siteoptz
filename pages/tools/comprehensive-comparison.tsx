import { GetStaticProps, GetStaticPaths } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import ComparisonTable from '../../components/ComparisonTable';
import EnhancedPricingCalculator from '../../components/EnhancedPricingCalculator';
import FAQSection from '../../components/FAQSection';
import EmailCaptureForm from '../../components/EmailCaptureForm';
import { ChevronRight, Star, Award, TrendingUp, Users, Shield, Zap } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  category?: string;
  overview?: {
    description?: string;
    category?: string;
    developer?: string;
    website?: string;
    use_cases?: string[];
  };
  features: string[] | { core?: string[]; advanced?: string[]; integrations?: string[] };
  pricing: Array<{
    plan: string;
    price_per_month: number | string;
    features?: string[];
  }> | any;
  pros?: string[];
  cons?: string[];
  rating?: number;
  review_count?: number;
  benchmarks?: {
    speed?: number;
    accuracy?: number;
    integration?: number;
    ease_of_use?: number;
    value?: number;
  };
  meta?: {
    title?: string;
    description?: string;
  };
  schema?: any;
}

interface FAQ {
  question: string;
  answer: string;
}

interface PageProps {
  tools: Tool[];
  faqs: { [key: string]: FAQ[] };
  featuredTools: Tool[];
}

export default function ComprehensiveComparisonPage({ tools, faqs, featuredTools }: PageProps) {
  const [emailCaptured, setEmailCaptured] = useState<string | null>(null);
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);

  // Generate comprehensive schema markup
  const generateSchema = () => {
    const schemas = [];

    // Organization Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai",
      "logo": "https://siteoptz.ai/logo.png",
      "description": "AI Tools Comparison Platform",
      "sameAs": [
        "https://twitter.com/siteoptz",
        "https://linkedin.com/company/siteoptz"
      ]
    });

    // Product Comparison Schema
    if (featuredTools.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Featured AI Tools Comparison",
        "description": "Compare top AI tools for 2025",
        "numberOfItems": featuredTools.length,
        "itemListElement": featuredTools.map((tool, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "name": tool.name,
            "description": tool.overview?.description || tool.description,
            "image": tool.logo,
            "brand": {
              "@type": "Brand",
              "name": tool.overview?.developer || tool.name
            },
            "aggregateRating": tool.rating ? {
              "@type": "AggregateRating",
              "ratingValue": tool.rating,
              "reviewCount": tool.review_count || 100,
              "bestRating": 5,
              "worstRating": 1
            } : undefined,
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "USD",
              "lowPrice": tool.pricing[0]?.price_per_month === 0 ? 0 : 
                         typeof tool.pricing[0]?.price_per_month === 'number' ? tool.pricing[0].price_per_month : 0,
              "highPrice": typeof tool.pricing[tool.pricing.length - 1]?.price_per_month === 'number' ? 
                          tool.pricing[tool.pricing.length - 1].price_per_month : 999,
              "offerCount": tool.pricing.length
            }
          }
        }))
      });
    }

    // FAQ Schema
    const allFaqs = Object.values(faqs).flat().slice(0, 20);
    if (allFaqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allFaqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      });
    }

    // Breadcrumb Schema
    schemas.push({
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
          "name": "Compare",
          "item": "https://siteoptz.ai/tools/compare"
        }
      ]
    });

    return schemas;
  };

  const handleEmailCapture = (email: string, data?: any) => {
    setEmailCaptured(email);
    
    // Track with GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'email_capture', {
        event_category: 'engagement',
        event_label: 'comparison_page',
        value: data
      });
    }

    // Send to backend
    fetch('/api/capture-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'comprehensive_comparison',
        data,
        timestamp: new Date().toISOString()
      })
    }).catch(console.error);
  };

  const handleToolSelection = (tools: Tool[]) => {
    setSelectedTools(tools);
    // Scroll to comparison section
    document.getElementById('detailed-comparison')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>AI Tools Comparison 2025: Compare {tools.length}+ Best AI Tools | SiteOptz</title>
        <meta 
          name="description" 
          content={`Compare ${tools.length}+ AI tools including ChatGPT, Claude, Gemini, and more. Interactive pricing calculator, feature comparisons, and expert reviews for 2025.`}
        />
        <meta name="keywords" content="AI tools comparison, ChatGPT vs Claude, AI pricing calculator, best AI tools 2025, AI tool reviews, AI software comparison" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`AI Tools Comparison 2025: Compare ${tools.length}+ Best AI Tools`} />
        <meta property="og:description" content={`Compare ${tools.length}+ AI tools with pricing, features, and reviews. Find the perfect AI tool for your needs.`} />
        <meta property="og:image" content="https://siteoptz.ai/images/ai-tools-comparison-og.jpg" />
        <meta property="og:url" content="https://siteoptz.ai/tools/compare" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`AI Tools Comparison 2025: ${tools.length}+ Tools`} />
        <meta name="twitter:description" content="Compare the best AI tools with our interactive comparison tool" />
        <meta name="twitter:image" content="https://siteoptz.ai/images/ai-tools-comparison-twitter.jpg" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://siteoptz.ai/tools/compare" />
        
        {/* Schema Markup */}
        {generateSchema().map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center gap-2 mb-6">
                <Award className="w-8 h-8 text-yellow-300" />
                <span className="text-yellow-300 font-semibold">2025's Most Comprehensive Comparison</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Compare {tools.length}+ AI Tools Instantly
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Side-by-side comparisons, real-time pricing calculator, and expert reviews. 
                Find your perfect AI tool stack in minutes.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-3xl font-bold">{tools.length}</div>
                  <div className="text-blue-100">AI Tools</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-3xl font-bold">
                    {tools.filter(t => t.pricing[0]?.price_per_month === 0).length}
                  </div>
                  <div className="text-blue-100">Free Options</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-blue-100">Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-blue-100">Users Helped</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#comparison-table"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Start Comparing Now
                </a>
                <a 
                  href="#pricing-calculator"
                  className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Calculate Total Cost
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tools Showcase */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured AI Tools</h2>
              <p className="text-lg text-gray-600">Most compared tools this month</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredTools.slice(0, 6).map(tool => (
                <div key={tool.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    {tool.logo && (
                      <img 
                        src={tool.logo} 
                        alt={`${tool.name} logo`}
                        className="w-12 h-12 rounded-lg object-contain"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(tool.rating || 0) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          {tool.rating?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {(tool.overview?.description || tool.description || '').slice(0, 100)}...
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">
                      {tool.pricing[0]?.price_per_month === 0 ? 'Free' :
                       typeof tool.pricing[0]?.price_per_month === 'number' ? 
                       `$${tool.pricing[0].price_per_month}/mo` : 'Custom'}
                    </span>
                    <a 
                      href={`/tools/${tool.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section id="comparison-table" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Interactive Comparison Table
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Filter by category, sort by price or rating, and select up to 3 tools for detailed comparison
              </p>
            </div>

            <ComparisonTable 
              tools={tools}
              maxSelection={3}
              onToolSelect={handleToolSelection}
            />
          </div>
        </section>

        {/* Detailed Comparison (shown when tools selected) */}
        {selectedTools.length >= 2 && (
          <section id="detailed-comparison" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Detailed Comparison: {selectedTools.map(t => t.name).join(' vs ')}
              </h2>

              {/* Comparison Grid */}
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feature</th>
                      {selectedTools.map(tool => (
                        <th key={tool.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          {tool.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 font-medium">Starting Price</td>
                      {selectedTools.map(tool => (
                        <td key={tool.id} className="px-6 py-4 text-center">
                          {tool.pricing[0]?.price_per_month === 0 ? 'Free' :
                           typeof tool.pricing[0]?.price_per_month === 'number' ? 
                           `$${tool.pricing[0].price_per_month}/mo` : 'Custom'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Rating</td>
                      {selectedTools.map(tool => (
                        <td key={tool.id} className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < Math.floor(tool.rating || 0) 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{tool.rating?.toFixed(1)}</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Free Trial</td>
                      {selectedTools.map(tool => (
                        <td key={tool.id} className="px-6 py-4 text-center">
                          {tool.pricing[0]?.price_per_month === 0 ? '✅ Free Plan' : '❌ No Free Plan'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Best For</td>
                      {selectedTools.map(tool => (
                        <td key={tool.id} className="px-6 py-4 text-center text-sm">
                          {tool.overview?.use_cases?.[0] || 'General use'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Pricing Calculator Section */}
        <section id="pricing-calculator" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI Tools Pricing Calculator
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Calculate your total monthly and annual investment across multiple AI tools
              </p>
            </div>

            <EnhancedPricingCalculator 
              tools={tools as any}
              onEmailSubmit={handleEmailCapture}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Get answers to common questions about AI tools
              </p>
            </div>

            <FAQSection 
              faqs={Object.values(faqs).flat().slice(0, 10)}
              showSearch={true}
              maxInitialDisplay={5}
            />
          </div>
        </section>

        {/* Email Capture Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Your Personalized AI Tools Report
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Download our comprehensive comparison guide with exclusive insights and recommendations
            </p>

            {!emailCaptured ? (
              <div className="max-w-md mx-auto">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleEmailCapture(formData.get('email') as string);
                }}>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email for instant access"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Free Report
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-lg inline-block">
                ✅ Report sent to {emailCaptured}! Check your inbox.
              </div>
            )}
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-gray-600">Users Helped</div>
              </div>
              <div>
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-gray-600">Unbiased Reviews</div>
              </div>
              <div>
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">Weekly</div>
                <div className="text-gray-600">Data Updates</div>
              </div>
              <div>
                <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Load tools data
    const aiToolsPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
    const tools = JSON.parse(fs.readFileSync(aiToolsPath, 'utf8'));
    
    // Load FAQ data
    const faqPath = path.join(process.cwd(), 'public/data/faqData.json');
    const faqs = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
    
    // Select featured tools (highest rated)
    const featuredTools = [...tools]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
    
    return {
      props: {
        tools,
        faqs,
        featuredTools
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return {
      props: {
        tools: [],
        faqs: {},
        featuredTools: []
      },
      revalidate: 60
    };
  }
};