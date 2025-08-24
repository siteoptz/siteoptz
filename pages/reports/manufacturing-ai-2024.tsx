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
  Factory,
  Cog,
  TrendingUp
} from 'lucide-react';

export default function ManufacturingAI2024() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'manufacturing-ai-2024' as const,
    source: 'report_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'AI implementation in manufacturing processes',
    'Efficiency improvements and cost savings data',
    'Quality control and predictive maintenance',
    'Supply chain optimization strategies',
    'Smart factory and Industry 4.0 insights',
    'Case studies from 50+ manufacturers'
  ];

  const reportSections = [
    { section: 'Executive Summary', page: 3, description: 'Key findings and industry overview' },
    { section: 'AI Adoption in Manufacturing', page: 8, description: 'Current state and trends' },
    { section: 'Process Optimization', page: 16, description: 'AI-driven efficiency improvements' },
    { section: 'Predictive Maintenance', page: 24, description: 'Reducing downtime with AI' },
    { section: 'Quality Control Revolution', page: 32, description: 'Computer vision and defect detection' },
    { section: 'Supply Chain Intelligence', page: 40, description: 'AI-powered logistics optimization' },
    { section: 'Smart Factory Implementation', page: 48, description: 'Industry 4.0 case studies' },
    { section: 'ROI Analysis', page: 56, description: 'Cost savings and productivity gains' },
    { section: 'Future of Manufacturing AI', page: 64, description: '2025-2030 predictions' }
  ];

  const stats = [
    { number: '73%', label: 'Manufacturers using AI' },
    { number: '35%', label: 'Average cost reduction' },
    { number: '42%', label: 'Productivity increase' },
    { number: '50+', label: 'Case studies included' }
  ];

  return (
    <>
      <Head>
        <title>Manufacturing AI Efficiency Study 2024 - Free Industry Report | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive manufacturing AI study. Data-driven insights on efficiency, quality control, predictive maintenance, and Industry 4.0 transformation." 
        />
        <meta 
          name="keywords" 
          content="manufacturing AI report, Industry 4.0, smart factory, predictive maintenance, manufacturing automation, AI efficiency study" 
        />
        <link rel="canonical" href="https://siteoptz.ai/reports/manufacturing-ai-2024" />
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
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600/20 to-cyan-600/20 rounded-full border border-green-500/30 mb-6">
                  <Factory className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-green-400 text-sm font-medium">Industry 4.0 Report</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Manufacturing AI Efficiency Study 2024
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Data-driven insights on how AI is improving manufacturing efficiency, 
                  reducing costs, and enhancing quality control across 50+ companies.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Cog className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">35%</div>
                    <div className="text-sm text-gray-400">Cost Reduction</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">42%</div>
                    <div className="text-sm text-gray-400">Productivity Gain</div>
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
                <div className="bg-gradient-to-br from-green-600/10 to-cyan-600/10 rounded-2xl p-8 border border-green-500/30">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Download Free Study
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        22 min read
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        68-page PDF
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        4.7/5
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
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Study
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    🏭 Trusted by 300+ manufacturing leaders
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
                Study Contents
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive analysis of AI transformation in manufacturing and Industry 4.0.
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
              Transform Your Manufacturing Operations
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the Industry 4.0 revolution with insights from 50+ successful AI implementations.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Study
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