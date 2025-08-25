import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  ArrowRight,
  CheckCircle,
  BarChart3,
  Target,
  Zap,
  Award
} from 'lucide-react';
import { caseStudiesData } from '../content/caseStudiesData';

export default function CaseStudies() {
  const caseStudies = caseStudiesData;

  const industries = [
    { name: "SaaS & Technology", cases: 45, icon: "💻" },
    { name: "E-commerce & Retail", cases: 38, icon: "🛍️" },
    { name: "Healthcare", cases: 32, icon: "🏥" },
    { name: "Finance & Banking", cases: 28, icon: "🏦" },
    { name: "Manufacturing", cases: 25, icon: "🏭" },
    { name: "Marketing & Media", cases: 22, icon: "📱" },
    { name: "Logistics", cases: 18, icon: "🚛" },
    { name: "Education", cases: 15, icon: "🎓" }
  ];

  const stats = [
    { number: "150+", label: "Case Studies", icon: BarChart3 },
    { number: "10x", label: "Average ROI", icon: TrendingUp },
    { number: "$50M+", label: "Client Savings", icon: DollarSign },
    { number: "98%", label: "Success Rate", icon: Award }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Implementation Case Studies",
    "description": "Explore 150+ detailed case studies showing how businesses achieved 10x ROI with AI implementation. Real results from SaaS, healthcare, finance, and manufacturing companies.",
    "url": "https://siteoptz.ai/case-studies",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": caseStudies.length,
      "itemListElement": caseStudies.map((study, index) => ({
        "@type": "Article",
        "position": index + 1,
        "headline": study.title,
        "description": study.challenge,
        "author": {
          "@type": "Organization",
          "name": "SiteOptz"
        },
        "publisher": {
          "@type": "Organization", 
          "name": "SiteOptz"
        },
        "datePublished": "2024-01-01",
        "url": `https://siteoptz.ai/case-studies/${study.id}`
      }))
    }
  };

  return (
    <>
      <Head>
        <title>AI Case Studies - 150+ Success Stories with 10x ROI | SiteOptz</title>
        <meta 
          name="description" 
          content="Explore 150+ detailed AI implementation case studies. See how businesses achieved 10x ROI with AI tools across SaaS, healthcare, finance, and manufacturing industries." 
        />
        <meta 
          name="keywords" 
          content="AI case studies, AI implementation examples, AI ROI case studies, business AI success stories, AI transformation results, machine learning case studies" 
        />
        <link rel="canonical" href="https://siteoptz.ai/case-studies" />
        
        {/* Open Graph */}
        <meta property="og:title" content="150+ AI Implementation Case Studies | SiteOptz" />
        <meta property="og:description" content="Real results from real businesses. See how companies achieved $50M+ in savings with AI implementation across 50+ industries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/case-studies" />
        <meta property="og:image" content="https://siteoptz.ai/images/case-studies-og.jpg" />
        
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
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                AI Implementation Case Studies
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Real results from real businesses. Discover how 150+ companies achieved 
                measurable success with our AI implementation strategies.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <IconComponent className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Case Study */}
        {caseStudies.filter(study => study.featured).map((study, index) => (
          <section key={index} className="py-16 bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 lg:p-12 border border-cyan-400">
                <div className="flex items-center mb-6">
                  <span className="px-3 py-1 bg-cyan-600 text-white text-sm rounded-full mr-4">
                    Featured Case Study
                  </span>
                  <span className="text-gray-400 text-sm">{study.industry} • {study.companySize}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-6">
                  {study.title}
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-12 mb-8">
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-cyan-400 mb-3">The Challenge</h3>
                      <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-cyan-400 mb-3">Our Solution</h3>
                      <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-400 mb-3">Tools Implemented</h3>
                      <div className="flex flex-wrap gap-2">
                        {study.tools.map((tool, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-green-400 mb-6">Results Achieved</h3>
                    <div className="space-y-4">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="bg-black/50 rounded-lg p-4 border border-gray-800">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-medium">{result.metric}</span>
                            <span className="text-green-400 font-bold">{result.improvement}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>Before: {result.before}</span>
                            <span>After: {result.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-lg p-6 border border-gray-800">
                  <blockquote className="text-lg text-white italic mb-4">
                    &ldquo;{study.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="text-cyan-400 font-medium">
                    — {study.testimonial.author}, {study.testimonial.position}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                More Success Stories
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Browse additional case studies showing measurable AI implementation results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.filter(study => !study.featured).map((study, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-all hover:transform hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                      {study.industry}
                    </span>
                    <span className="text-gray-400 text-xs">{study.timeline}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 leading-tight">
                    {study.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {study.challenge.substring(0, 120)}...
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {study.results.slice(0, 2).map((result, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{result.metric}</span>
                        <span className="text-green-400 font-medium">{result.improvement}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-800 pt-4">
                    <blockquote className="text-gray-300 text-sm italic mb-3">
                      &ldquo;{study.testimonial.quote.substring(0, 100)}...&rdquo;
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 text-xs font-medium">
                        — {study.testimonial.author}
                      </span>
                      <Link
                        href={`/case-studies/${study.id}`}
                        className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors flex items-center"
                      >
                        Read Full Study
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Case Studies by Industry
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore success stories from your industry and see how AI can transform your business.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industries.map((industry, index) => (
                <Link
                  key={index}
                  href={`/case-studies?industry=${encodeURIComponent(industry.name)}`}
                  className="bg-black border border-gray-800 rounded-xl p-6 text-center hover:border-cyan-400 transition-all hover:transform hover:scale-105"
                >
                  <div className="text-3xl mb-3">{industry.icon}</div>
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    {industry.name}
                  </h3>
                  <div className="text-cyan-400 font-bold text-lg">
                    {industry.cases}
                  </div>
                  <div className="text-gray-400 text-xs">case studies</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join 150+ companies that achieved measurable results with our AI implementation expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Link>
                <Link
                  href="/testimonials"
                  className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  Read More Testimonials
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}