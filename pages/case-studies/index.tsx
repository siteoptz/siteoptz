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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center gap-2 mb-6">
                <Award className="w-8 h-8 text-yellow-300" />
                <span className="text-yellow-300 font-semibold">Proven Results</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Real AI Success Stories
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                See how companies like yours achieved 200-400% ROI with strategic AI implementation. 
                Real results, measurable outcomes, proven strategies.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-3xl font-bold">{caseStudies.length}+</div>
                  <div className="text-blue-100">Case Studies</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-3xl font-bold">300%</div>
                  <div className="text-blue-100">Avg ROI</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                  <div className="text-3xl font-bold">$2.5M</div>
                  <div className="text-blue-100">Avg Savings</div>
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