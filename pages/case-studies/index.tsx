import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { 
  ArrowRight,
  Building2,
  TrendingUp,
  Users,
  Award,
  Clock
} from 'lucide-react';
import { caseStudiesData, CaseStudy } from '../../content/caseStudiesData';

interface CaseStudiesIndexProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudiesIndex({ caseStudies }: CaseStudiesIndexProps) {
  const featuredStudies = caseStudies.filter(study => study.featured);
  const allStudies = caseStudies.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <Head>
        <title>AI Success Stories & Case Studies | Real ROI Results | SiteOptz</title>
        <meta name="description" content="Discover how companies achieved 200-400% ROI with AI implementation. Real case studies, measurable results, and proven strategies from 50+ successful AI deployments." />
        <meta name="keywords" content="AI case studies, AI ROI, AI success stories, AI implementation, digital transformation, business automation" />
        
        <meta property="og:title" content="AI Success Stories & Case Studies | Real ROI Results" />
        <meta property="og:description" content="See how companies achieved 200-400% ROI with AI. Real case studies with measurable results." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/case-studies" />
        
        <link rel="canonical" href="https://siteoptz.ai/case-studies" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section - Matching Homepage Styling */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{backgroundColor: 'var(--color-background)'}}>
          {/* Clean professional background */}
          <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.03) 0%, transparent 70%)'}}></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mb-12">
                <Award className="w-4 h-4" />
                <span className="font-bold">PROVEN RESULTS</span>
                <span>REAL AI SUCCESS STORIES</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black mb-12 leading-tight tracking-tight">
                <span className="block text-white mb-6 font-light">SEE HOW COMPANIES</span>
                <span className="block text-white mb-6 font-black">
                  ACHIEVED 300% ROI
                </span>
                <span className="block text-gray-400 text-3xl lg:text-5xl font-normal tracking-wider">WITH STRATEGIC AI IMPLEMENTATION</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto mb-16 leading-relaxed font-normal tracking-wide">
                REAL RESULTS / MEASURABLE OUTCOMES / PROVEN STRATEGIES<br/>
                {caseStudies.length}+ SUCCESS STORIES / $50M+ IN SAVINGS GENERATED / 90-DAY IMPLEMENTATION
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <button
                  onClick={() => window.open('https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl', '_blank')}
                  className="group inline-flex items-center gap-3 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <TrendingUp className="w-5 h-5 group-hover:animate-bounce" />
                  Get Your Success Story
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-gray-400 font-medium">or</span>
                <a 
                  href="#case-studies"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Browse Success Stories
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Stats Grid - Using Homepage Style */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>{caseStudies.length}+</div>
                  <div className="text-sm" style={{color: 'var(--color-text-secondary)'}}>Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold mb-2" style={{color: 'var(--color-text-accent)'}}>300%</div>
                  <div className="text-sm" style={{color: 'var(--color-text-secondary)'}}>Average ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold mb-2" style={{color: 'var(--color-text-accent)'}}>$50M+</div>
                  <div className="text-sm" style={{color: 'var(--color-text-secondary)'}}>Total Savings Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold mb-2" style={{color: 'var(--color-text-accent)'}}>90</div>
                  <div className="text-sm" style={{color: 'var(--color-text-secondary)'}}>Days to Results</div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle accent element */}
          <div className="absolute top-1/2 right-20 w-12 h-12 opacity-10 animate-float delay-500 pointer-events-none" style={{backgroundColor: 'var(--color-text-accent)', borderRadius: 'var(--radius-small)'}}></div>
        </section>

        {/* Comprehensive Introduction Section */}
        <section className="py-16 bg-gray-900/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-black/40 border border-gray-800 rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Real AI Success Stories: From Implementation to ROI</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                SiteOptz has documented over {caseStudies.length} comprehensive case studies showcasing how organizations 
                across diverse industries have successfully implemented AI solutions to achieve measurable business outcomes. 
                Our case studies provide detailed insights into the challenges faced, solutions deployed, implementation 
                timelines, and quantifiable results achieved through strategic AI adoption.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Each case study represents a real-world implementation where our team worked directly with organizations 
                to identify opportunities, select appropriate AI tools, develop implementation strategies, and measure 
                ROI over time. These stories demonstrate proven methodologies for AI deployment that consistently deliver 
                results within 90 days of implementation.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                From small startups achieving 200% efficiency gains to enterprise corporations generating millions in 
                cost savings, our case studies span the full spectrum of AI applications. We focus on practical, 
                achievable implementations that solve real business problems and deliver sustainable competitive advantages.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">{caseStudies.length}+</div>
                  <div className="text-gray-300">Documented Success Stories</div>
                  <div className="text-sm text-gray-400 mt-1">Across 15+ industries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">$50M+</div>
                  <div className="text-gray-300">Total Value Generated</div>
                  <div className="text-sm text-gray-400 mt-1">Measured cost savings & revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">300%</div>
                  <div className="text-gray-300">Average ROI Achieved</div>
                  <div className="text-sm text-gray-400 mt-1">Within first 12 months</div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">What Makes Our Case Studies Different</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-300">
                    <li>• Complete implementation timelines and methodologies</li>
                    <li>• Detailed ROI calculations with supporting data</li>
                    <li>• Challenges faced and how they were overcome</li>
                    <li>• Specific tools and technologies deployed</li>
                  </ul>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Before and after performance metrics</li>
                    <li>• Team training and change management insights</li>
                    <li>• Scalability considerations and future roadmaps</li>
                    <li>• Industry-specific best practices and lessons learned</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Case Studies */}
        {featuredStudies.length > 0 && (
          <section className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Featured Success Stories</h2>
                <p className="text-lg text-gray-400">Our most impactful AI implementations</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredStudies.map(study => (
                  <Link
                    key={study.id}
                    href={`/case-studies/${study.id}`}
                    className="group bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-blue-400" />
                        <span className="text-sm text-gray-400">{study.industry}</span>
                      </div>
                      <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {study.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {study.challenge}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {study.companySize}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {study.timeline}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-green-400 font-semibold">
                        {study.results[0]?.improvement}
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Case Studies Grid */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">All Case Studies</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Explore comprehensive success stories across industries and use cases
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allStudies.map(study => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.id}`}
                  className="group bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-6 h-6 text-cyan-400" />
                      <span className="text-sm text-gray-400">{study.industry}</span>
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {study.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {study.challenge.slice(0, 120)}...
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {study.companySize}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {study.timeline}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-green-400 font-semibold">
                      {study.results[0]?.improvement}
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a personalized AI implementation strategy based on proven case studies
            </p>
            <button
              onClick={() => window.open('https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl', '_blank')}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <span>Start Your AI Journey</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      caseStudies: caseStudiesData
    },
    revalidate: 3600 // Revalidate every hour
  };
};