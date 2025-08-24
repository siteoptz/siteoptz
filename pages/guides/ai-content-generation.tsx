import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import { 
  BookOpen,
  Download,
  CheckCircle,
  ArrowLeft,
  Clock,
  Users,
  Star,
  Target,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function AIContentGeneration() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'ai-content-generation' as const,
    source: 'guide_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'Content generation strategy frameworks',
    'Platform selection and comparison matrix',
    'Quality control and brand consistency',
    'SEO optimization with AI tools',
    'Workflow integration best practices',
    'Performance metrics and optimization'
  ];

  const guideContents = [
    { section: '1. Content Strategy Foundation', page: 3, description: 'Building your AI content strategy' },
    { section: '2. AI Content Tools Comparison', page: 8, description: 'Comprehensive platform analysis' },
    { section: '3. Quality Control Framework', page: 15, description: 'Ensuring brand consistency and quality' },
    { section: '4. SEO Integration Techniques', page: 22, description: 'Optimizing AI content for search' },
    { section: '5. Workflow Implementation', page: 28, description: 'Integrating AI into content workflows' },
    { section: '6. Performance Measurement', page: 35, description: 'Tracking ROI and content effectiveness' },
    { section: '7. Advanced Optimization', page: 42, description: 'Fine-tuning for maximum impact' },
    { section: '8. Case Studies & Examples', page: 48, description: 'Real-world implementation stories' }
  ];

  const stats = [
    { number: '3x', label: 'Faster content creation' },
    { number: '67%', label: 'Cost reduction' },
    { number: '89%', label: 'Quality consistency' },
    { number: '15+', label: 'Tools compared' }
  ];

  return (
    <>
      <Head>
        <title>AI Content Generation: Best Practices & Tools - Free Guide | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive guide to AI content generation. Learn best practices, tool comparisons, quality frameworks, and workflow integration strategies." 
        />
        <meta 
          name="keywords" 
          content="AI content generation, content marketing AI, AI writing tools, content automation, AI content strategy, content creation" 
        />
        <link rel="canonical" href="https://siteoptz.ai/guides/ai-content-generation" />
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
                  <BookOpen className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-green-400 text-sm font-medium">Content Generation Guide</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  AI Content Generation: Best Practices & Tools
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Master AI content creation with proven strategies, comprehensive tool comparisons, 
                  and quality control frameworks that ensure brand consistency.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">52</div>
                    <div className="text-sm text-gray-400">Page Guide</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-sm text-gray-400">Tools Compared</div>
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
                      Download Your Free Guide
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        12 min read
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        PDF Format
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
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors flex items-center justify-center"
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

        {/* Guide Contents */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                What&apos;s Inside the Guide
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A comprehensive roadmap covering strategy, tools, quality control, and optimization.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {guideContents.map((item, index) => (
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
              Transform Your Content Strategy Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of content creators who have revolutionized their workflows with AI.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors text-lg"
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