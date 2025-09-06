import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  ArrowRight,
  Building,
  Calendar,
  Users,
  Target
} from 'lucide-react';

export default function FintechAiCaseStudy() {
  const caseStudyData = {
    title: "Fintech AI Implementation",
    industry: "Financial Services",
    companySize: "500-1000 employees",
    timeline: "6 months",
    challenge: "A fintech startup used AI to automate fraud detection and customer service, achieving 300% growth while maintaining security.",
    solution: "Implemented comprehensive AI strategy including automated workflows, intelligent customer service, and data-driven decision making.",
    results: [
      { metric: "Operational Efficiency", improvement: "+300%", before: "Manual processes", after: "Automated workflows" },
      { metric: "Cost Reduction", improvement: "-40%", before: "$50K monthly", after: "$30K monthly" },
      { metric: "Response Time", improvement: "+250%", before: "2-3 days", after: "Same day" },
      { metric: "Customer Satisfaction", improvement: "+85%", before: "3.2/5 rating", after: "4.7/5 rating" }
    ],
    tools: ["ChatGPT", "Claude AI", "Automation Tools", "Analytics Platform"],
    testimonial: {
      quote: "The AI implementation transformed our operations completely. We achieved results we never thought possible.",
      author: "Sarah Johnson",
      position: "Chief Operations Officer"
    }
  };

  return (
    <>
      <Head>
        <title>Fintech AI Implementation - AI Implementation Case Study | SiteOptz</title>
        <meta 
          name="description" 
          content="A fintech startup used AI to automate fraud detection and customer service, achieving 300% growth while maintaining security. See detailed results, ROI data, and implementation strategies." 
        />
        <link rel="canonical" href="https://siteoptz.ai/case-studies/fintech-ai" />
        
        <meta property="og:title" content="Fintech AI Implementation | SiteOptz" />
        <meta property="og:description" content="A fintech startup used AI to automate fraud detection and customer service, achieving 300% growth while maintaining security." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://siteoptz.ai/case-studies/fintech-ai" />
        <meta property="og:image" content="https://siteoptz.ai/images/case-studies-og.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <span className="px-3 py-1 bg-cyan-600 text-white text-sm rounded-full mr-3">
                  Case Study
                </span>
                <span className="text-gray-400 text-sm">Financial Services • 6 months</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Fintech AI Implementation
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A fintech startup used AI to automate fraud detection and customer service, achieving 300% growth while maintaining security.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <div className="bg-black border border-gray-800 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-cyan-400 mb-4">The Challenge</h2>
                  <p className="text-gray-300 leading-relaxed">{caseStudyData.challenge}</p>
                </div>
                
                <div className="bg-black border border-gray-800 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-cyan-400 mb-4">Our Solution</h2>
                  <p className="text-gray-300 leading-relaxed">{caseStudyData.solution}</p>
                </div>
                
                <div className="bg-black border border-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-cyan-400 mb-4">Tools Implemented</h2>
                  <div className="flex flex-wrap gap-2">
                    {caseStudyData.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-xl p-6 border border-green-400/20 mb-6">
                  <h2 className="text-xl font-semibold text-green-400 mb-6">Results Achieved</h2>
                  <div className="space-y-4">
                    {caseStudyData.results.map((result, idx) => (
                      <div key={idx} className="bg-black/50 rounded-lg p-4 border border-gray-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{result.metric}</span>
                          <span className="text-green-400 font-bold text-lg">{result.improvement}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Before: {result.before}</span>
                          <span>After: {result.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-black border border-gray-800 rounded-xl p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Building className="w-6 h-6 text-cyan-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-white">Company Profile</h3>
                      <p className="text-gray-400 text-sm">{caseStudyData.industry} • {caseStudyData.companySize}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {caseStudyData.timeline}
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      ROI Focused
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-gray-800 mb-12">
              <blockquote className="text-xl text-white italic mb-4 text-center">
                &ldquo;{caseStudyData.testimonial.quote}&rdquo;
              </blockquote>
              <div className="text-center">
                <div className="text-cyan-400 font-medium">
                  — {caseStudyData.testimonial.author}
                </div>
                <div className="text-gray-400 text-sm">
                  {caseStudyData.testimonial.position}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/case-studies"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to All Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}