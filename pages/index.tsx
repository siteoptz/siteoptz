import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { 
  getPageConfig, 
  generateSoftwareApplicationSchema,
  buildCanonicalUrl 
} from '../seo/meta-config.js';
import { Search, Star, TrendingUp, Zap, ArrowRight, CheckCircle, Sparkles, Brain, BarChart3, Target, Users, Rocket } from 'lucide-react';
import ExternalLink from '../components/ExternalLink';
import { authoritativeLinks } from '../utils/externalLinks';
import FAQSection from '../components/FAQ/FAQSection';

interface Tool {
  id: string;
  slug: string;
  name: string;
  logo: string;
  category?: string;
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
  faqs: any[];
}

export default function HomePage({ featuredTools, popularComparisons, faqs }: HomePageProps) {
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

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8 hover:bg-white/15 transition-all duration-300">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Trusted by Fortune 500 Companies
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>

              {/* Main Heading */}
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold mb-8 leading-tight">
                <span className="block text-white mb-4">The Future of</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">
                  Business Growth
                </span>
                <span className="block text-white mt-4">is AI-Powered</span>
              </h1>

              {/* Subtitle */}
              <h2 className="text-xl lg:text-3xl text-gray-300 max-w-5xl mx-auto mb-12 leading-relaxed font-light">
                SiteOptz helps you leverage cutting-edge AI to streamline operations, 
                convert more customers, and achieve exponential growth.
              </h2>


              {/* Primary CTA */}
              <div className="mb-8">
                <Link 
                  href="/tools"
                  className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105"
                >
                  <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                  Start Scaling with AI Today
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Secondary Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/15 transition-all duration-300"
                >
                  <BarChart3 className="w-5 h-5" />
                  AI Cost Calculator
                </Link>
                <span className="text-gray-400 font-medium">or</span>
                <Link 
                  href="/compare"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Compare AI Solutions
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">500+</div>
                  <div className="text-gray-400 text-sm">Enterprise Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">10x</div>
                  <div className="text-gray-400 text-sm">Average ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">98%</div>
                  <div className="text-gray-400 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2">24/7</div>
                  <div className="text-gray-400 text-sm">AI Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl opacity-20 animate-float pointer-events-none"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-float delay-1000 pointer-events-none"></div>
          <div className="absolute top-1/2 right-20 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl opacity-20 animate-float delay-500 pointer-events-none"></div>
        </section>


        {/* Top-Rated AI Tools */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Top-Rated AI Tools
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover all {featuredTools.length} AI tools across 13+ categories, used by millions of professionals worldwide.
              </p>
            </div>

            {/* Tools by Category */}
            {(() => {
              // Group tools by category
              const toolsByCategory = featuredTools.reduce((acc: any, tool: Tool) => {
                const category = tool.category || 'Other';
                if (!acc[category]) acc[category] = [];
                acc[category].push(tool);
                return acc;
              }, {});

              return Object.entries(toolsByCategory).map(([category, tools]: [string, any]) => (
                <div key={category} className="mb-16">
                  <div className="flex items-center mb-8">
                    <h3 className="text-2xl font-bold text-white">{category.startsWith('Best') ? category : `Best ${category} AI Tools`}</h3>
                    <span className="ml-3 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {tools.length} tools
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tools.slice(0, 4).map((tool: Tool) => (
                      <div key={tool.id} className="bg-black border border-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:border-gray-600 p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                            <img 
                              src={tool.logo} 
                              alt={`${tool.name} AI tool logo - ${tool.category || 'artificial intelligence software'} for professional use`}
                              className="w-8 h-8 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                                if (sibling) sibling.style.display = 'flex';
                              }}
                            />
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{display: 'none'}}>
                              {tool.name.charAt(0)}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-lg font-semibold text-white truncate">{tool.name}</h4>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs font-medium text-gray-400">
                                {tool.rating || 4.5}/5
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {tool.overview?.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm font-bold text-white">
                            {(() => {
                              const plan = tool.pricing?.[0];
                              if (!plan) return 'Free';
                              
                              if (plan.price_per_month === 0) {
                                return 'Free';
                              } else {
                                return `$${plan.price_per_month}/mo`;
                              }
                            })()}
                          </div>
                          <span className="px-2 py-1 bg-gray-900 text-gray-300 text-xs rounded-full border border-gray-700">
                            {tool.features?.length || 0} features
                          </span>
                        </div>

                        <Link 
                          href={`/reviews/${tool.slug}`}
                          className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          View Details
                        </Link>
                      </div>
                    ))}
                  </div>
                  
                  {tools.length > 4 && (
                    <div className="text-center mt-8">
                      <Link 
                        href={`/tools/?category=${encodeURIComponent(category)}`}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        See All {tools.length} {category.endsWith('Tools') || category.endsWith('tools') ? category : `${category} Tools`}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </div>
                  )}
                </div>
              ));
            })()}

            <div className="text-center mt-12">
              <Link 
                href="/tools"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Explore All {featuredTools.length} Tools
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Comparisons */}
        <section className="bg-gray-950 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Popular AI Tool Comparisons
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Side-by-side comparisons of the most popular AI tools to help you choose the right one.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularComparisons.slice(0, 12).map((comparison, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:border-gray-600 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                        <img 
                          src={comparison.tool1.logo} 
                          alt={`${comparison.tool1.name} AI tool comparison logo`}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                            if (sibling) sibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white text-xs font-bold" style={{display: 'none'}}>
                          {comparison.tool1.name.charAt(0)}
                        </div>
                      </div>
                      <span className="font-semibold text-sm text-white">{comparison.tool1.name}</span>
                    </div>
                    <div className="text-gray-400 font-bold text-sm">VS</div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm text-white">{comparison.tool2.name}</span>
                      <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                        <img 
                          src={comparison.tool2.logo} 
                          alt={`${comparison.tool2.name} AI tool comparison logo`}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                            if (sibling) sibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-md flex items-center justify-center text-white text-xs font-bold" style={{display: 'none'}}>
                          {comparison.tool2.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">
                    Compare features, pricing, and performance between {comparison.tool1.name} and {comparison.tool2.name}.
                  </p>

                  <Link 
                    href={`/compare/${comparison.tool1.slug}/vs/${comparison.tool2.slug}`}
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Compare Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Your AI Transformation Partner
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We deliver enterprise-grade AI solutions that drive measurable business growth and operational excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-black border border-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:border-gray-600">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Strategic AI Implementation</h3>
                <p className="text-gray-300 leading-relaxed">
                  Custom AI strategies designed to align with your business objectives and deliver measurable ROI within 90 days.
                </p>
              </div>

              <div className="bg-black border border-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:border-gray-600">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Performance Optimization</h3>
                <p className="text-gray-300 leading-relaxed">
                  Continuous monitoring and optimization to ensure your AI solutions deliver peak performance and maximum efficiency.
                </p>
              </div>

              <div className="bg-black border border-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:border-gray-600">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Enterprise Support</h3>
                <p className="text-gray-300 leading-relaxed">
                  24/7 dedicated support team with enterprise SLAs, ensuring your AI initiatives never miss a beat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Insights Section */}
        <section className="py-16 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Industry Insights & Research
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Stay informed with the latest AI research, market analysis, and industry standards from leading authorities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black border border-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-3">Market Research</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Latest AI market trends and forecasts from industry analysts.
                </p>
                <ExternalLink 
                  href={authoritativeLinks.gartner.url}
                  title={authoritativeLinks.gartner.title}
                  description={authoritativeLinks.gartner.description}
                  className="text-sm font-medium text-gray-400 hover:text-white"
                >
                  Gartner AI Analysis
                </ExternalLink>
              </div>

              <div className="bg-black border border-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-3">Academic Research</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Cutting-edge AI research from top universities and institutions.
                </p>
                <ExternalLink 
                  href={authoritativeLinks.stanfordAI.url}
                  title={authoritativeLinks.stanfordAI.title}
                  description={authoritativeLinks.stanfordAI.description}
                  className="text-sm font-medium text-gray-400 hover:text-white"
                >
                  Stanford AI Lab
                </ExternalLink>
              </div>

              <div className="bg-black border border-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-3">Industry Standards</h3>
                <p className="text-gray-300 text-sm mb-4">
                  AI safety guidelines and ethical standards from regulatory bodies.
                </p>
                <ExternalLink 
                  href={authoritativeLinks.nist.url}
                  title={authoritativeLinks.nist.title}
                  description={authoritativeLinks.nist.description}
                  className="text-sm font-medium text-gray-400 hover:text-white"
                >
                  NIST AI Framework
                </ExternalLink>
              </div>

              <div className="bg-black border border-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-3">Business Impact</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Strategic insights on AI adoption and business transformation.
                </p>
                <ExternalLink 
                  href={authoritativeLinks.mckinsey.url}
                  title={authoritativeLinks.mckinsey.title}
                  description={authoritativeLinks.mckinsey.description}
                  className="text-sm font-medium text-gray-400 hover:text-white"
                >
                  McKinsey AI Report
                </ExternalLink>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Enhanced with comprehensive AI tool questions */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSection 
              faqs={faqs}
              title="Frequently Asked Questions About AI Tools"
              description="Get answers to common questions about AI tools, pricing, safety, and implementation to help you make informed decisions."
              maxVisible={undefined}
              showStructuredData={true}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-950 text-white py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8">
                <Rocket className="w-4 h-4 text-cyan-400" />
                Ready to Transform Your Business?
              </div>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Scale Beyond Limits with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2">
                AI-Powered Growth
              </span>
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
              Join 500+ Fortune 500 companies already achieving 10x ROI with our enterprise AI solutions.
              Your transformation starts today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link 
                href="/tools"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105"
              >
                <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                Start Your AI Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/pricing"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg rounded-2xl hover:bg-white/15 transition-all duration-300"
              >
                <BarChart3 className="w-6 h-6" />
                Calculate ROI
              </Link>
            </div>
            
            <div className="text-sm text-gray-400">
              <span className="opacity-75">✓ No setup fees</span>
              <span className="mx-4 opacity-50">•</span>
              <span className="opacity-75">✓ 90-day ROI guarantee</span>
              <span className="mx-4 opacity-50">•</span>
              <span className="opacity-75">✓ 24/7 enterprise support</span>
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
    const { loadUnifiedToolsData } = require('../utils/unifiedDataAdapter');
    
    // Load unified tools data
    const unifiedTools = loadUnifiedToolsData(fs, path);
    
    // Load enhanced FAQ data
    let faqData: any[] = [];
    try {
      const faqPath = path.join(process.cwd(), 'data/enhanced-faq.json');
      if (fs.existsSync(faqPath)) {
        const rawFaqData = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
        faqData = [
          ...rawFaqData.general_ai_tools,
          ...rawFaqData.pricing_faqs.slice(0, 2),
          ...rawFaqData.technical_faqs.slice(0, 1)
        ];
      }
    } catch (error) {
      console.error('Error loading FAQ data:', error);
    }

    // Transform data to match homepage interface
    const transformedTools = unifiedTools.map((tool: any) => {
      const toolSlug = (tool.tool_name || tool.toolName).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      return {
        id: toolSlug,
        slug: toolSlug,
        name: tool.tool_name || tool.toolName,
        logo: tool.logo_url || tool.logo,
        category: tool.category || 'AI Tool',
        overview: {
          description: tool.description || ''
        },
        rating: tool.rating || 4.5,
        features: tool.features?.core || tool.features || [],
        pricing: [
          {
            plan: 'Monthly',
            price_per_month: tool.pricing?.monthly === 'Free' ? 0 : 
                            tool.pricing?.monthly === 'Custom' ? 0 : 
                            tool.pricing?.monthly || 0
          }
        ]
      };
    });

    // Get all tools sorted by rating (highest first)
    const featuredTools = transformedTools
      .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));

    // Create comprehensive popular comparisons using transformed tools
    const popularComparisons = [
      // Language Models & Chatbots
      { tool1: transformedTools.find((t: any) => t.slug === 'chatgpt'), tool2: transformedTools.find((t: any) => t.slug === 'claude') },
      { tool1: transformedTools.find((t: any) => t.slug === 'chatgpt'), tool2: transformedTools.find((t: any) => t.slug === 'gemini') },
      { tool1: transformedTools.find((t: any) => t.slug === 'claude'), tool2: transformedTools.find((t: any) => t.slug === 'gemini') },
      { tool1: transformedTools.find((t: any) => t.slug === 'chatgpt'), tool2: transformedTools.find((t: any) => t.slug === 'perplexity-ai') },
      
      // Writing & Content Creation
      { tool1: transformedTools.find((t: any) => t.slug === 'jasper-ai'), tool2: transformedTools.find((t: any) => t.slug === 'copy-ai') },
      { tool1: transformedTools.find((t: any) => t.slug === 'jasper-ai'), tool2: transformedTools.find((t: any) => t.slug === 'writesonic') },
      { tool1: transformedTools.find((t: any) => t.slug === 'copy-ai'), tool2: transformedTools.find((t: any) => t.slug === 'writesonic') },
      { tool1: transformedTools.find((t: any) => t.slug === 'chatgpt'), tool2: transformedTools.find((t: any) => t.slug === 'jasper-ai') },
      
      // SEO & Content Optimization
      { tool1: transformedTools.find((t: any) => t.slug === 'surfer-seo'), tool2: transformedTools.find((t: any) => t.slug === 'frase') },
      { tool1: transformedTools.find((t: any) => t.slug === 'jasper-ai'), tool2: transformedTools.find((t: any) => t.slug === 'surfer-seo') },
      
      // Image Generation
      { tool1: transformedTools.find((t: any) => t.slug === 'midjourney'), tool2: transformedTools.find((t: any) => t.slug === 'dall-e') },
      { tool1: transformedTools.find((t: any) => t.slug === 'midjourney'), tool2: transformedTools.find((t: any) => t.slug === 'chatgpt') },
      
      // Coding & Development
      { tool1: transformedTools.find((t: any) => t.slug === 'github-copilot'), tool2: transformedTools.find((t: any) => t.slug === 'chatgpt') },
      { tool1: transformedTools.find((t: any) => t.slug === 'github-copilot'), tool2: transformedTools.find((t: any) => t.slug === 'claude') },
      
      // Productivity & Workplace
      { tool1: transformedTools.find((t: any) => t.slug === 'notion-ai'), tool2: transformedTools.find((t: any) => t.slug === 'chatgpt') },
      { tool1: transformedTools.find((t: any) => t.slug === 'notion-ai'), tool2: transformedTools.find((t: any) => t.slug === 'claude') }
    ].filter(comparison => comparison.tool1 && comparison.tool2);

    return {
      props: {
        featuredTools,
        popularComparisons,
        faqs: faqData
      }
    };
  } catch (error) {
    console.error('Error loading homepage data:', error);
    return {
      props: {
        featuredTools: [],
        popularComparisons: [],
        faqs: []
      }
    };
  }
};