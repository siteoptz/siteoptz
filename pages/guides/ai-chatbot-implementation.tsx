import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import { 
  Download,
  CheckCircle,
  ArrowLeft,
  Clock,
  Users,
  Star,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';

export default function AIChatbotImplementation() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'ai-chatbot-implementation' as const,
    source: 'guide_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'Chatbot strategy development framework',
    'Platform selection and comparison matrix',
    'Implementation roadmap with clear timelines',
    'Integration best practices for existing systems',
    'Training and optimization techniques',
    'ROI measurement and real-world case studies'
  ];

  const tableOfContents = [
    { section: '1. Executive Summary', page: '3', description: 'Key insights and implementation overview' },
    { section: '2. Chatbot Strategy Development', page: '6', description: 'Define goals, use cases, and success metrics' },
    { section: '3. Platform Selection & Comparison', page: '12', description: 'Detailed analysis of top chatbot platforms' },
    { section: '4. Implementation Roadmap', page: '18', description: '90-day implementation timeline with milestones' },
    { section: '5. Integration Best Practices', page: '24', description: 'Connect with CRM, helpdesk, and other tools' },
    { section: '6. Training & Optimization', page: '28', description: 'Continuous improvement and performance tuning' },
    { section: '7. ROI Measurement', page: '32', description: 'Track success and demonstrate business value' },
    { section: '8. Case Studies', page: '35', description: 'Real success stories from 10+ companies' }
  ];

  const stats = [
    { number: '67%', label: 'Average cost reduction' },
    { number: '24/7', label: 'Customer support availability' },
    { number: '3x', label: 'Faster response times' },
    { number: '89%', label: 'Customer satisfaction rate' }
  ];

  return (
    <>
      <Head>
        <title>Complete Guide to AI Chatbot Implementation - Free Download | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive 35-page guide to AI chatbot implementation. Includes strategy, platform comparison, implementation roadmap, and ROI case studies." 
        />
        <meta 
          name="keywords" 
          content="AI chatbot implementation, chatbot strategy, customer service automation, chatbot ROI, conversational AI" 
        />
        <link rel="canonical" href="https://siteoptz.ai/guides/ai-chatbot-implementation" />
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
                  <BookOpen className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-blue-400 text-sm font-medium">35-Page Implementation Guide</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Complete Guide to AI Chatbot Implementation
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Learn how to implement AI chatbots from strategy to deployment, with real-world case studies, 
                  ROI calculations, and a proven 90-day roadmap.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">90</div>
                    <div className="text-sm text-gray-400">Day Roadmap</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">10+</div>
                    <div className="text-sm text-gray-400">Case Studies</div>
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
                      Download Your Free Guide
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        15 min read
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        PDF Format
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
                    Get Your Free Guide
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    ✨ No spam, just valuable insights delivered to your inbox
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                What&apos;s Inside the Guide
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A comprehensive roadmap covering everything from strategy development to ROI measurement.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {tableOfContents.map((item, index) => (
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
              Ready to Transform Your Customer Service?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Download the complete implementation guide and start building your AI chatbot strategy today.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Guide
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