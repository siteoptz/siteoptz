import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { 
  getPageConfig, 
  generateSoftwareApplicationSchema,
  buildCanonicalUrl 
} from '../seo/meta-config.js';
import { Search, TrendingUp, Zap, CheckCircle, Sparkles, Brain, BarChart3, Target, Users, Rocket, Calendar } from 'lucide-react';
import ExternalLink from '../components/ExternalLink';
import { authoritativeLinks } from '../utils/externalLinks';
import FAQSection from '../components/FAQ/FAQSection';
import HeroSection from '../components/HeroSection';


interface HomePageProps {
  faqs: any[];
}

export default function HomePage({ faqs }: HomePageProps) {
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Hero Section */}
        <HeroSection />






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

        {/* Final CTA Section */}
        <section className="bg-gray-950 text-white py-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8">
                <Calendar className="w-4 h-4 text-cyan-400" />
                Ready to Stop Wasting Time on Wrong AI Tools?
              </div>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Get Your Custom AI Roadmap
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2">
                In 30 Minutes
              </span>
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
              Join 500+ companies who chose professional AI implementation over costly trial-and-error.
              Book your free strategy session and get a custom roadmap worth $2,500.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a 
                href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105"
              >
                <Calendar className="w-6 h-6 group-hover:animate-bounce" />
                Book Free Strategy Session
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                href="/tools"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg rounded-2xl hover:bg-white/15 transition-all duration-300"
              >
                <TrendingUp className="w-6 h-6" />
                Browse Tools Database
              </Link>
            </div>
            
            <div className="text-sm text-gray-400">
              <span className="opacity-75">✓ No sales pitch guaranteed</span>
              <span className="mx-4 opacity-50">•</span>
              <span className="opacity-75">✓ Custom roadmap included</span>
              <span className="mx-4 opacity-50">•</span>
              <span className="opacity-75">✓ 98% success rate</span>
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

    return {
      props: {
        faqs: faqData
      }
    };
  } catch (error) {
    console.error('Error loading homepage data:', error);
    return {
      props: {
        faqs: []
      }
    };
  }
};