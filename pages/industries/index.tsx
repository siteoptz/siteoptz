import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Heart, 
  DollarSign, 
  ShoppingCart, 
  Factory, 
  Truck,
  Megaphone,
  Zap,
  GraduationCap,
  Scale,
  Users,
  Rocket,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { industries, industrySlugMap } from '../../content/industryContent';

const industryIcons: Record<string, React.ReactNode> = {
  'Healthcare & Life Sciences': <Heart className="w-8 h-8" />,
  'Finance & Banking': <DollarSign className="w-8 h-8" />,
  'Retail & E-Commerce': <ShoppingCart className="w-8 h-8" />,
  'Manufacturing & Supply Chain': <Factory className="w-8 h-8" />,
  'Transportation & Logistics': <Truck className="w-8 h-8" />,
  'Marketing, Advertising & Media': <Megaphone className="w-8 h-8" />,
  'Energy & Utilities': <Zap className="w-8 h-8" />,
  'Education & EdTech': <GraduationCap className="w-8 h-8" />,
  'Legal & Compliance': <Scale className="w-8 h-8" />,
  'Human Resources & Recruiting': <Users className="w-8 h-8" />,
  'Aerospace & Defense': <Rocket className="w-8 h-8" />
};

const industryDescriptions: Record<string, string> = {
  'Healthcare & Life Sciences': 'AI-powered diagnostics, patient care automation, and clinical decision support',
  'Finance & Banking': 'Fraud detection, risk assessment, and automated compliance monitoring',
  'Retail & E-Commerce': 'Personalization, inventory optimization, and customer experience enhancement',
  'Manufacturing & Supply Chain': 'Predictive maintenance, quality control, and production optimization',
  'Transportation & Logistics': 'Route optimization, fleet management, and delivery automation',
  'Marketing, Advertising & Media': 'Content creation, campaign optimization, and audience targeting',
  'Energy & Utilities': 'Grid optimization, demand forecasting, and sustainability management',
  'Education & EdTech': 'Personalized learning, automated grading, and student success prediction',
  'Legal & Compliance': 'Contract analysis, legal research, and regulatory monitoring',
  'Human Resources & Recruiting': 'Talent acquisition, employee analytics, and engagement optimization',
  'Aerospace & Defense': 'Mission planning, predictive maintenance, and autonomous systems'
};

const industryStats: Record<string, { metric: string; value: string }> = {
  'Healthcare & Life Sciences': { metric: 'Diagnostic Accuracy', value: '+40%' },
  'Finance & Banking': { metric: 'Fraud Prevention', value: '95%' },
  'Retail & E-Commerce': { metric: 'Conversion Rate', value: '+35%' },
  'Manufacturing & Supply Chain': { metric: 'Downtime Reduction', value: '50%' },
  'Transportation & Logistics': { metric: 'Delivery Cost', value: '-25%' },
  'Marketing, Advertising & Media': { metric: 'Campaign ROI', value: '+40%' },
  'Energy & Utilities': { metric: 'Energy Savings', value: '30%' },
  'Education & EdTech': { metric: 'Student Outcomes', value: '+35%' },
  'Legal & Compliance': { metric: 'Review Time', value: '-70%' },
  'Human Resources & Recruiting': { metric: 'Time to Hire', value: '-50%' },
  'Aerospace & Defense': { metric: 'Mission Success', value: '+40%' }
};

export default function IndustriesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Solutions by Industry",
    "description": "Comprehensive AI implementation solutions for 11 major industries. Transform your business with industry-specific artificial intelligence tools and strategies.",
    "url": "https://siteoptz.ai/industries",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": industries.length,
      "itemListElement": industries.map((industry, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": industry,
        "description": industryDescriptions[industry],
        "url": `https://siteoptz.ai/industries/${industrySlugMap[industry]}`
      }))
    }
  };

  return (
    <>
      <Head>
        <title>AI Solutions by Industry | Transform Your Business with AI</title>
        <meta 
          name="description" 
          content="Discover AI solutions tailored for your industry. From healthcare to aerospace, we implement cutting-edge AI tools that drive 30-50% improvements in key metrics." 
        />
        <meta 
          name="keywords" 
          content="industry AI solutions, vertical AI tools, business AI implementation, enterprise AI, sector-specific AI, AI transformation, industry automation" 
        />
        <link rel="canonical" href="https://siteoptz.ai/industries" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Solutions by Industry | SiteOptz" />
        <meta property="og:description" content="Transform your industry with AI. Tailored solutions for healthcare, finance, retail, and 8 more sectors." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/industries" />
        <meta property="og:image" content="https://siteoptz.ai/images/industries-og.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                AI Solutions for Every Industry
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Transform your business with industry-specific AI implementations that deliver 
                measurable results and competitive advantage
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">11</div>
                  <div className="text-sm text-gray-400">Industries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">500+</div>
                  <div className="text-sm text-gray-400">AI Implementations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">40%</div>
                  <div className="text-sm text-gray-400">Avg. ROI Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">93+</div>
                  <div className="text-sm text-gray-400">AI Tools Available</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Select Your Industry
              </h2>
              <p className="text-xl text-gray-300">
                Explore AI solutions tailored to your sector&apos;s unique challenges and opportunities
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <Link
                  key={industry}
                  href={`/industries/${industrySlugMap[industry]}`}
                  className="group bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-all duration-200 hover:transform hover:scale-105"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white mr-4 group-hover:from-blue-700 group-hover:to-purple-700 transition-colors">
                      {industryIcons[industry]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {industry}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {industryDescriptions[industry]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">
                        {industryStats[industry].value}
                      </div>
                      <div className="text-xs text-gray-500">
                        {industryStats[industry].metric}
                      </div>
                    </div>
                    <div className="flex items-center text-cyan-400 group-hover:translate-x-2 transition-transform">
                      <span className="text-sm mr-1">Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Industry-Specific AI Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Industry-Specific AI Matters
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Generic AI solutions fall short. Your industry has unique challenges that require 
                specialized AI implementations designed for your specific workflows and regulations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Tailored Solutions
                </h3>
                <p className="text-gray-400">
                  AI tools configured for your industry&apos;s specific processes, compliance requirements, and business models
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Expert Implementation
                </h3>
                <p className="text-gray-400">
                  Industry specialists who understand your challenges and know which AI tools deliver the best results
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Proven Results
                </h3>
                <p className="text-gray-400">
                  Case studies and benchmarks from your industry showing 30-50% improvements in key metrics
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Industry with AI?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get a customized AI implementation roadmap for your business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get Your AI Roadmap
                </Link>
                <Link
                  href="/tools"
                  className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors"
                >
                  Browse AI Tools
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}