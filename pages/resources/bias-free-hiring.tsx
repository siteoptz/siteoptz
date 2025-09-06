import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Users,
  Star,
  BookOpen
} from 'lucide-react';

export default function BiasFreeHiring() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    resourceType: 'playbook' | 'framework' | 'both';
    source?: string;
  }>({
    isOpen: false,
    resourceType: 'framework',
    source: 'bias-free-hiring_page'
  });

  const openModal = (resourceType: 'playbook' | 'framework' | 'both', source: string = 'bias-free-hiring_page') => {
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

  return (
    <>
      <Head>
        <title>Bias-Free Hiring with AI - Expert Guide & Resources | SiteOptz</title>
        <meta 
          name="description" 
          content="Learn how to use AI tools to eliminate hiring bias and create more diverse, equitable recruitment processes. Download expert resources, templates, and implementation guides." 
        />
        <link rel="canonical" href="https://siteoptz.ai/resources/bias-free-hiring" />
        
        <meta property="og:title" content="Bias-Free Hiring with AI | SiteOptz" />
        <meta property="og:description" content="Learn how to use AI tools to eliminate hiring bias and create more diverse, equitable recruitment processes." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://siteoptz.ai/resources/bias-free-hiring" />
        <meta property="og:image" content="https://siteoptz.ai/images/resources-og.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <section className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Bias-Free Hiring with AI
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Learn how to use AI tools to eliminate hiring bias and create more diverse, equitable recruitment processes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-cyan-400 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Free Expert Resource Download
                </h2>
                <p className="text-gray-300 mb-6">
                  Get comprehensive templates, frameworks, and implementation guides for bias-free hiring with ai.
                </p>
                <button
                  onClick={() => openModal('framework', 'bias-free-hiring_hero')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center mx-auto"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Free Resource
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Step-by-step implementation strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Best practices and proven frameworks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Real-world case studies and examples</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Templates and tools for immediate use</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Resource Details</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>15-20 minute read</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Suitable for all experience levels</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Updated with latest AI trends</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Comprehensive implementation guide</span>
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