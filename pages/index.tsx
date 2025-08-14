import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { 
  getPageConfig, 
  generateSoftwareApplicationSchema,
  buildCanonicalUrl 
} from '../seo/meta-config.js';
import { Search, Star, TrendingUp, Zap, ArrowRight, CheckCircle } from 'lucide-react';

interface Tool {
  id: string;
  slug: string;
  name: string;
  logo: string;
  overview: {
    description: string;
  };
  rating?: number;
  features: string[];
  pricing: Array<{
    plan: string;
    price_per_month: number;
  }>;
}

interface HomePageProps {
  featuredTools: Tool[];
  popularComparisons: Array<{
    tool1: Tool;
    tool2: Tool;
  }>;
}

export default function HomePage({ featuredTools, popularComparisons }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const pageConfig = getPageConfig('home');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/tools?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <>
      <SEOHead
        title={pageConfig.title}
        description={pageConfig.description}
        keywords={pageConfig.keywords}
        canonicalUrl={buildCanonicalUrl('/')}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SiteOptz",
          "url": "https://siteoptz.ai",
          "description": pageConfig.description,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://siteoptz.ai/tools?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Find the Perfect
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> AI Tool</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
                Expert reviews and comparisons of 200+ AI tools including ChatGPT, Claude, Gemini, and more. 
                Make informed decisions with our detailed analysis, pricing comparisons, and feature breakdowns.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search AI tools (e.g., ChatGPT, writing tools, image generators...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/tools"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Browse All Tools
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  href="/compare"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
                >
                  Compare Tools
                  <TrendingUp className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-white py-12 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-gray-600">AI Tools Reviewed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-600">Tool Comparisons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">100K+</div>
                <div className="text-gray-600">Monthly Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
                <div className="text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tools */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Top-Rated AI Tools
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the most popular and highly-rated AI tools used by millions of professionals worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTools.slice(0, 6).map((tool) => (
                <div key={tool.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                      <img 
                        src={tool.logo} 
                        alt={`${tool.name} logo`}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-logo.png';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-600">
                          {tool.rating || 4.5}/5
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {tool.overview?.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-gray-900">
                      {tool.pricing?.[0]?.price_per_month === 0 
                        ? 'Free' 
                        : `$${tool.pricing?.[0]?.price_per_month || 0}/mo`
                      }
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {tool.features?.length || 0} features
                    </span>
                  </div>

                  <Link 
                    href={`/tools/${tool.slug}`}
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/tools"
                className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                View All {featuredTools.length}+ Tools
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Comparisons */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Popular AI Tool Comparisons
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Side-by-side comparisons of the most popular AI tools to help you choose the right one.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularComparisons.slice(0, 6).map((comparison, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={comparison.tool1.logo} 
                        alt={comparison.tool1.name}
                        className="w-10 h-10 object-contain"
                      />
                      <span className="font-semibold">{comparison.tool1.name}</span>
                    </div>
                    <div className="text-gray-400 font-bold">VS</div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{comparison.tool2.name}</span>
                      <img 
                        src={comparison.tool2.logo} 
                        alt={comparison.tool2.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Compare features, pricing, and performance between {comparison.tool1.name} and {comparison.tool2.name}.
                  </p>

                  <Link 
                    href={`/compare/${comparison.tool1.slug}-vs-${comparison.tool2.slug}`}
                    className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                  >
                    Compare Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose SiteOptz?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive, unbiased reviews to help you find the perfect AI tool for your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Reviews</h3>
                <p className="text-gray-600">
                  In-depth analysis by AI specialists with hands-on testing and real-world use cases.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Performance Benchmarks</h3>
                <p className="text-gray-600">
                  Objective performance metrics and benchmarks to compare tools accurately.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Regular Updates</h3>
                <p className="text-gray-600">
                  Constantly updated reviews and new tool discoveries to keep you informed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Find Your Perfect AI Tool?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who trust SiteOptz for AI tool recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/tools"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/compare"
                className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
              >
                Compare Tools
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Load AI tools data from new comprehensive file
    const aiToolsData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'data/ai-tools.json'), 'utf8')
    );

    // Transform data to match homepage interface
    const transformedTools = aiToolsData.ai_tools.map((tool: any) => ({
      id: tool.toolName.toLowerCase().replace(/\s+/g, '-'),
      slug: tool.toolName.toLowerCase().replace(/\s+/g, '-'),
      name: tool.toolName,
      logo: tool.logo_url,
      overview: {
        description: tool.description
      },
      rating: tool.rating,
      features: tool.features,
      pricing: tool.pricing.plans.map((plan: any) => ({
        plan: plan.name,
        price_per_month: parseFloat(plan.price.replace(/[^0-9.]/g, '')) || 0
      }))
    }));

    // Get featured tools (all tools with high ratings)
    const featuredTools = transformedTools
      .filter((tool: any) => tool.rating >= 4.0)
      .slice(0, 12);

    // Create popular comparisons using transformed tools
    const popularComparisons = [
      { tool1: transformedTools.find((t: any) => t.slug === 'chatgpt'), tool2: transformedTools.find((t: any) => t.slug === 'claude') },
      { tool1: transformedTools.find((t: any) => t.slug === 'chatgpt'), tool2: transformedTools.find((t: any) => t.slug === 'gemini') },
      { tool1: transformedTools.find((t: any) => t.slug === 'claude'), tool2: transformedTools.find((t: any) => t.slug === 'gemini') },
      { tool1: transformedTools.find((t: any) => t.slug === 'jasper-ai'), tool2: transformedTools.find((t: any) => t.slug === 'copy.ai') },
      { tool1: transformedTools.find((t: any) => t.slug === 'midjourney'), tool2: transformedTools.find((t: any) => t.slug === 'dall-e-3') },
      { tool1: transformedTools.find((t: any) => t.slug === 'notion-ai'), tool2: transformedTools.find((t: any) => t.slug === 'gamma') }
    ].filter(comparison => comparison.tool1 && comparison.tool2);

    return {
      props: {
        featuredTools,
        popularComparisons
      }
    };
  } catch (error) {
    console.error('Error loading homepage data:', error);
    return {
      props: {
        featuredTools: [],
        popularComparisons: []
      }
    };
  }
};