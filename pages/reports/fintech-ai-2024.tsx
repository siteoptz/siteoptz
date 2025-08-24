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
  DollarSign,
  Shield
} from 'lucide-react';

export default function FintechAI2024() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'fintech-ai-2024' as const,
    source: 'report_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'AI adoption trends in banking and finance',
    'Fraud detection and risk assessment case studies',
    'Customer service transformation examples',
    'Algorithmic trading and investment AI insights',
    'Regulatory compliance and ethics framework',
    'ROI analysis and cost-benefit studies'
  ];

  const reportSections = [
    { section: 'Executive Summary', page: 3, description: 'Key findings and market overview' },
    { section: 'Market Landscape Analysis', page: 8, description: 'Current state of AI in fintech' },
    { section: 'Fraud Detection Revolution', page: 15, description: 'AI-powered security solutions' },
    { section: 'Customer Experience Transformation', page: 23, description: 'Personalization and chatbots' },
    { section: 'Algorithmic Trading Insights', page: 31, description: 'AI in investment and trading' },
    { section: 'Risk Assessment Evolution', page: 38, description: 'Advanced risk modeling with AI' },
    { section: 'Regulatory Compliance Framework', page: 45, description: 'Ethics and governance' },
    { section: 'ROI Analysis & Case Studies', page: 52, description: 'Real-world implementation results' },
    { section: 'Future Predictions', page: 60, description: '2025-2030 outlook' }
  ];

  const stats = [
    { number: '87%', label: 'Banks using AI' },
    { number: '$125B', label: 'Market size by 2025' },
    { number: '45%', label: 'Fraud reduction' },
    { number: '200+', label: 'Companies surveyed' }
  ];

  return (
    <>
      <Head>
        <title>Financial Services AI Transformation Report 2024 - Free Download | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive 2024 fintech AI report. Analysis of AI adoption in banking, fraud detection, customer service, and regulatory compliance." 
        />
        <meta 
          name="keywords" 
          content="fintech AI report, banking AI transformation, financial services AI, fraud detection AI, fintech innovation 2024" 
        />
        <link rel="canonical" href="https://siteoptz.ai/reports/fintech-ai-2024" />
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
                  <FileText className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-blue-400 text-sm font-medium">2024 Industry Report</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Financial Services AI Transformation Report 2024
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Comprehensive analysis of AI adoption in banking and financial services. 
                  Based on data from 200+ institutions worldwide.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">$125B</div>
                    <div className="text-sm text-gray-400">Market Size 2025</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">45%</div>
                    <div className="text-sm text-gray-400">Fraud Reduction</div>
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
                      Download Free Report
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        30 min read
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        64-page PDF
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        4.8/5
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
                    Download Free Report
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    💼 Used by 500+ financial institutions worldwide
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
                In-depth analysis of AI transformation across the financial services sector.
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
              Stay Ahead of Fintech Innovation
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the insights that 200+ financial institutions are using to drive AI transformation.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Report
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