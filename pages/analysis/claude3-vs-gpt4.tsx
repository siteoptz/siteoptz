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
  Zap,
  Shield,
  Cpu
} from 'lucide-react';

export default function Claude3VsGPT4() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'claude3-vs-gpt4' as const,
    source: 'analysis_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'Performance benchmarks and testing results',
    'Feature comparison matrix and analysis',
    'Cost analysis and pricing comparison',
    'Use case applications and recommendations',
    'Integration capabilities and requirements',
    'Security, privacy, and compliance features'
  ];

  const comparisonSections = [
    { section: 'Executive Summary', page: 3, description: 'Key findings and recommendations' },
    { section: 'Model Architecture Comparison', page: 8, description: 'Technical specifications and capabilities' },
    { section: 'Performance Benchmarks', page: 15, description: 'Speed, accuracy, and quality testing' },
    { section: 'Feature Analysis', page: 23, description: 'Detailed feature comparison matrix' },
    { section: 'Cost & Pricing Models', page: 31, description: 'ROI analysis and cost optimization' },
    { section: 'Use Case Scenarios', page: 38, description: 'Best applications for each model' },
    { section: 'Integration Capabilities', page: 46, description: 'API features and developer experience' },
    { section: 'Security & Compliance', page: 54, description: 'Privacy features and enterprise requirements' },
    { section: 'Decision Framework', page: 62, description: 'How to choose the right model' }
  ];

  const stats = [
    { number: '25+', label: 'Benchmarks tested' },
    { number: '98%', label: 'Accuracy comparison' },
    { number: '15', label: 'Use cases analyzed' },
    { number: '4.9', label: 'Expert rating' }
  ];

  return (
    <>
      <Head>
        <title>Anthropic Claude 3 vs GPT-4: Detailed Comparison Analysis | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive Claude 3 vs GPT-4 comparison. Performance benchmarks, feature analysis, pricing, and decision framework to choose the right AI model." 
        />
        <meta 
          name="keywords" 
          content="Claude 3 vs GPT-4, AI model comparison, Anthropic Claude vs OpenAI GPT-4, AI model benchmarks, AI model selection" 
        />
        <link rel="canonical" href="https://siteoptz.ai/analysis/claude3-vs-gpt4" />
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
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 mb-6">
                  <Zap className="w-4 h-4 text-purple-400 mr-2" />
                  <span className="text-purple-400 text-sm font-medium">Detailed Comparison Analysis</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Anthropic Claude 3 vs GPT-4: Detailed Comparison
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Comprehensive analysis to help you choose the right AI model for your business needs. 
                  Includes performance benchmarks, feature comparison, and decision framework.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Cpu className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">25+</div>
                    <div className="text-sm text-gray-400">Benchmarks</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">15</div>
                    <div className="text-sm text-gray-400">Use Cases</div>
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
                <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl p-8 border border-purple-500/30">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Download Comparison Analysis
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        24 min read
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        68-page PDF
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
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Analysis
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    🧠 Trusted by 2,500+ AI decision makers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analysis Contents */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Analysis Contents
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive comparison covering performance, features, costs, and strategic recommendations.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {comparisonSections.map((item, index) => (
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
              Make the Right AI Model Choice
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the data-driven insights you need to select the perfect AI model for your business.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors text-lg"
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