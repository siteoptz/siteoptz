import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../../components/LeadMagnetModal';
import { 
  Download, 
  Play, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Users,
  Star,
  FileText
} from 'lucide-react';

export default function NoCodeAiResourcesDownload() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    resourceType: 'playbook' | 'framework' | 'both';
    source?: string;
  }>({
    isOpen: false,
    resourceType: 'framework',
    source: 'no-code-ai-resources_download'
  });

  const openModal = (resourceType: 'playbook' | 'framework' | 'both', source: string = 'no-code-ai-resources_download') => {
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
        <title>No-Code AI Resources - Webinar Resources Download | SiteOptz</title>
        <meta 
          name="description" 
          content="Resources and templates for building AI applications without coding, including platform comparisons and tutorials. Download presentation slides, templates, and additional resources from our expert webinar." 
        />
        <link rel="canonical" href="https://siteoptz.ai/webinars/download/no-code-ai-resources" />
        
        <meta property="og:title" content="No-Code AI Resources Resources | SiteOptz" />
        <meta property="og:description" content="Resources and templates for building AI applications without coding, including platform comparisons and tutorials." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://siteoptz.ai/webinars/download/no-code-ai-resources" />
        <meta property="og:image" content="https://siteoptz.ai/images/webinars-og.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <section className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full mr-3">
                  Webinar Resources
                </span>
                <span className="text-gray-400 text-sm">Free Download</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                No-Code AI Resources
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Resources and templates for building AI applications without coding, including platform comparisons and tutorials.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-400/20 mb-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Download Webinar Resources
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Get comprehensive resources including presentation slides, templates, checklists, and implementation guides.
                  </p>
                  <button
                    onClick={() => openModal('framework', 'no-code-ai-resources_main')}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Resources
                  </button>
                </div>
                
                <div className="bg-black/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Included Resources</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Complete presentation slides (PDF)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Implementation templates and checklists</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Additional reading materials and links</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Expert contact information for follow-up</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Webinar Highlights</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>60-minute expert session</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Live Q&A with industry experts</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Practical, actionable insights</span>
                  </div>
                  <div className="flex items-center">
                    <Play className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Recording available for review</span>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">What You'll Gain</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Proven implementation strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Industry best practices and frameworks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Tools and resources for immediate use</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Expert insights and recommendations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-6">
                <Link
                  href="/webinars"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Back to Webinars
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  More Resources
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
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