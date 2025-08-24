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
  Zap,
  DollarSign,
  Shield
} from 'lucide-react';

export default function GPT4TurboBusiness() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'gpt4-turbo-business' as const,
    source: 'guide_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'GPT-4 Turbo features and capabilities overview',
    'Business use cases and practical applications',
    'Implementation strategy and step-by-step roadmap',
    'Cost analysis and ROI calculations',
    'Integration best practices and security guidelines',
    'Performance optimization and troubleshooting'
  ];

  const tableOfContents = [
    { section: '1. GPT-4 Turbo Overview', page: '3', description: 'New features, improvements, and capabilities' },
    { section: '2. Business Applications', page: '8', description: 'Real-world use cases across industries' },
    { section: '3. Implementation Strategy', page: '15', description: 'Step-by-step deployment roadmap' },
    { section: '4. Cost Analysis & ROI', page: '22', description: 'Pricing comparison and return calculations' },
    { section: '5. Integration Best Practices', page: '27', description: 'Connect with existing systems and workflows' },
    { section: '6. Security & Compliance', page: '31', description: 'Data protection and regulatory considerations' },
    { section: '7. Performance Optimization', page: '34', description: 'Maximize efficiency and output quality' },
    { section: '8. Migration Guide', page: '37', description: 'Smooth transition from GPT-4 to Turbo' }
  ];

  const stats = [
    { number: '2x', label: 'Faster processing' },
    { number: '50%', label: 'Cost reduction' },
    { number: '128K', label: 'Context window' },
    { number: '99.9%', label: 'Uptime reliability' }
  ];

  return (
    <>
      <Head>
        <title>OpenAI GPT-4 Turbo: Complete Business Guide - Free Download | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive 38-page guide to implementing GPT-4 Turbo in your business. Includes cost analysis, ROI calculations, and implementation roadmap." 
        />
        <meta 
          name="keywords" 
          content="GPT-4 Turbo, OpenAI business guide, AI implementation, GPT-4 Turbo pricing, business automation" 
        />
        <link rel="canonical" href="https://siteoptz.ai/guides/gpt4-turbo-business" />
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
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full border border-green-500/30 mb-6">
                  <Zap className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-green-400 text-sm font-medium">Latest GPT-4 Turbo Guide</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  OpenAI GPT-4 Turbo: Complete Business Guide
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Master GPT-4 Turbo implementation with our comprehensive guide covering features, 
                  business applications, cost analysis, and proven deployment strategies.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">50%</div>
                    <div className="text-sm text-gray-400">Cost Savings</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">Enterprise</div>
                    <div className="text-sm text-gray-400">Grade Security</div>
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
                <div className="bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-2xl p-8 border border-green-500/30">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Download Your Free Guide
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        20 min read
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
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Get Your Free Guide
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    ⚡ Get instant access to the latest GPT-4 Turbo insights
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
                Everything you need to successfully implement GPT-4 Turbo in your business operations.
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
              Ready to Leverage GPT-4 Turbo&apos;s Power?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the complete implementation guide and start transforming your business with GPT-4 Turbo today.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors text-lg"
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