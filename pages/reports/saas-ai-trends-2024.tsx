import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  Award
} from 'lucide-react';

export default function SaasAiTrends2024() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    resourceType: 'playbook' | 'framework' | 'both';
    source?: string;
  }>({
    isOpen: false,
    resourceType: 'framework',
    source: 'saas-ai-trends-2024_report'
  });

  const openModal = (resourceType: 'playbook' | 'framework' | 'both', source: string = 'saas-ai-trends-2024_report') => {
    setModalState({
      isOpen: true,
      resourceType,
      source
    });
  };

  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  const reportStats = [
    { number: "500+", label: "Companies Surveyed", icon: Users },
    { number: "25", label: "Industry Sectors", icon: BarChart3 },
    { number: "92%", label: "Accuracy Rate", icon: Award },
    { number: "2024", label: "Latest Data", icon: Calendar }
  ];

  return (
    <>
      <Head>
        <title>SaaS AI Trends 2024 - Comprehensive Industry Report | SiteOptz</title>
        <meta 
          name="description" 
          content="Comprehensive analysis of AI adoption trends in SaaS companies, including implementation strategies and ROI benchmarks. Download the complete report with data, insights, and industry benchmarks." 
        />
        <link rel="canonical" href="https://siteoptz.ai/reports/saas-ai-trends-2024" />
        
        <meta property="og:title" content="SaaS AI Trends 2024 | SiteOptz" />
        <meta property="og:description" content="Comprehensive analysis of AI adoption trends in SaaS companies, including implementation strategies and ROI benchmarks." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://siteoptz.ai/reports/saas-ai-trends-2024" />
        <meta property="og:image" content="https://siteoptz.ai/images/reports-og.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full mr-3">
                  Industry Report
                </span>
                <span className="text-gray-400 text-sm">2024 Edition</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                SaaS AI Trends 2024
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Comprehensive analysis of AI adoption trends in SaaS companies, including implementation strategies and ROI benchmarks.
              </p>
            </div>

            {/* Report Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {reportStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-black border border-gray-800 rounded-xl p-4 text-center">
                    <IconComponent className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-2xl p-8 border border-purple-400/20 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Download Complete Report
                </h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Get the full saas ai trends 2024 with detailed analysis, charts, benchmarks, and actionable insights.
                </p>
                <button
                  onClick={() => openModal('framework', 'saas-ai-trends-2024_hero')}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center mx-auto"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Free Report
                </button>
                <p className="text-xs text-gray-400 mt-3">PDF format • 25+ pages • Industry benchmarks included</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">What&apos;s Inside</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Comprehensive market analysis and trends</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Industry benchmarks and performance metrics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">ROI data from 500+ companies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Implementation recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Future predictions and strategic insights</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Key Findings</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-cyan-400 pl-4">
                    <div className="text-cyan-400 font-semibold mb-1">85% Adoption Rate</div>
                    <p className="text-gray-300 text-sm">Companies report significant AI adoption across operations</p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-4">
                    <div className="text-green-400 font-semibold mb-1">300% ROI Average</div>
                    <p className="text-gray-300 text-sm">Organizations achieving measurable return on AI investments</p>
                  </div>
                  <div className="border-l-4 border-purple-400 pl-4">
                    <div className="text-purple-400 font-semibold mb-1">12-Month Timeline</div>
                    <p className="text-gray-300 text-sm">Typical implementation and optimization timeframe</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/resources"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to All Resources
              </Link>
            </div>
          </div>
        </section>
      </div>

      <LeadMagnetModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        resourceType={modalState.resourceType}
        source={modalState.source}
      />
    </>
  );
}