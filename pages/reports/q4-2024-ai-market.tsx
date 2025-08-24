import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import { 
  FileText,
  Download,
  CheckCircle,
  ArrowLeft,
  Clock,
  Users,
  Star,
  TrendingUp,
  BarChart3,
  Globe
} from 'lucide-react';

export default function Q42024AIMarket() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'q4-2024-ai-market' as const,
    source: 'report_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'Market size and growth projections',
    'Competitive landscape analysis',
    'Funding and investment trends',
    'Emerging technologies and innovations',
    'Enterprise adoption rates and patterns',
    '2025 predictions and opportunities'
  ];

  const reportSections = [
    { section: 'Market Overview & Key Metrics', page: 3, description: 'Q4 2024 market size and growth data' },
    { section: 'Competitive Landscape Analysis', page: 9, description: 'Major players and market share' },
    { section: 'Investment & Funding Trends', page: 17, description: 'VC funding and acquisition activity' },
    { section: 'Enterprise Adoption Patterns', page: 25, description: 'How businesses are adopting AI tools' },
    { section: 'Emerging Technologies', page: 33, description: 'Next-generation AI innovations' },
    { section: 'Regional Market Analysis', page: 41, description: 'Global adoption and regional trends' },
    { section: 'Industry Vertical Deep Dive', page: 49, description: 'Sector-specific AI tool usage' },
    { section: '2025 Market Predictions', page: 57, description: 'Forecasts and growth opportunities' },
    { section: 'Strategic Recommendations', page: 65, description: 'Actionable insights for businesses' }
  ];

  const stats = [
    { number: '$185B', label: 'Market value Q4 2024' },
    { number: '47%', label: 'YoY growth rate' },
    { number: '2.8M', label: 'New AI tools launched' },
    { number: '89%', label: 'Enterprise adoption' }
  ];

  return (
    <>
      <Head>
        <title>Q4 2024 AI Tools Market Analysis - Comprehensive Industry Report | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our Q4 2024 AI tools market analysis. Latest market research on landscape, trends, funding, and 2025 growth projections." 
        />
        <meta 
          name="keywords" 
          content="AI market analysis 2024, AI tools market report, AI industry trends, AI market size, AI investment trends, AI market research" 
        />
        <link rel="canonical" href="https://siteoptz.ai/reports/q4-2024-ai-market" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <nav className="pt-6 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/resources"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30 mb-6">
                  <BarChart3 className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-blue-400 text-sm font-medium">Q4 2024 Market Research</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Q4 2024 AI Tools Market Analysis
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Latest market research on AI tools landscape, competitive analysis, 
                  funding trends, and comprehensive 2025 growth projections.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Globe className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">$185B</div>
                    <div className="text-sm text-gray-400">Market Value</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">47%</div>
                    <div className="text-sm text-gray-400">YoY Growth</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">
                        {stat.number}
                      </div>
                      <div className="text-xs text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Column - Download Card */}
              <div className="lg:pl-8">
                <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-500/30">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Download Market Analysis
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        28 min read
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        72-page PDF
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        4.9/5
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={openModal}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Analysis
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    📈 Used by 1,200+ business strategists worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Contents */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Report Contents
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive market intelligence and strategic insights for 2025 planning.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {reportSections.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-black border border-gray-800 rounded-xl mb-4 hover:border-cyan-400 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.section}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-cyan-400 font-mono text-sm ml-4">
                    Page {item.page}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Make Data-Driven AI Decisions
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the market intelligence you need to navigate the rapidly evolving AI landscape.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Analysis
            </button>
          </div>
        </section>
      </div>

      {/* Lead Magnet Modal */}
      <LeadMagnetModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        resourceType={modalState.resourceType}
        source={modalState.source}
      />
    </>
  );
}