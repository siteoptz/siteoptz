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
  BarChart3,
  Database
} from 'lucide-react';

export default function AIDataAnalysis() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'ai-data-analysis' as const,
    source: 'guide_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'AI data analysis fundamentals',
    'Tool selection criteria and comparison',
    'Data preparation and cleaning workflows',
    'Implementation timeline and roadmap',
    'Visualization and reporting best practices',
    'Security, compliance, and ROI measurement'
  ];

  const guideContents = [
    { section: '1. Data Analysis Fundamentals', page: 3, description: 'Understanding AI-powered analytics' },
    { section: '2. Tool Selection Framework', page: 9, description: 'Choosing the right AI analytics tools' },
    { section: '3. Data Preparation Strategy', page: 16, description: 'Cleaning and structuring your data' },
    { section: '4. Implementation Roadmap', page: 24, description: '90-day implementation timeline' },
    { section: '5. Visualization Techniques', page: 32, description: 'Creating compelling data stories' },
    { section: '6. Security & Compliance', page: 39, description: 'Protecting sensitive data' },
    { section: '7. ROI Measurement', page: 45, description: 'Measuring analytics impact' },
    { section: '8. Advanced Techniques', page: 52, description: 'Machine learning integration' }
  ];

  const stats = [
    { number: '5x', label: 'Faster insights' },
    { number: '78%', label: 'Time savings' },
    { number: '92%', label: 'Accuracy improvement' },
    { number: '12+', label: 'Tools compared' }
  ];

  return (
    <>
      <Head>
        <title>Data Analysis with AI: A Beginner&apos;s Roadmap - Free Guide | SiteOptz</title>
        <meta 
          name="description" 
          content="Transform your data analysis workflow with AI. Download our comprehensive beginner's roadmap including tool selection, implementation timeline, and best practices." 
        />
        <meta 
          name="keywords" 
          content="AI data analysis, data analytics tools, business intelligence AI, data science, AI analytics, data visualization" 
        />
        <link rel="canonical" href="https://siteoptz.ai/guides/ai-data-analysis" />
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
                  <span className="text-blue-400 text-sm font-medium">Data Analysis Roadmap</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Data Analysis with AI: A Beginner&apos;s Roadmap
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Transform your data analysis workflow with AI tools and proven methodologies. 
                  From tool selection to advanced insights generation.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Database className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">90</div>
                    <div className="text-sm text-gray-400">Day Timeline</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">58</div>
                    <div className="text-sm text-gray-400">Page Guide</div>
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
                      Download Your Free Roadmap
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        18 min read
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        PDF Format
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
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Get Your Free Roadmap
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    📊 Includes templates and tool comparison matrix
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
                Your Learning Path
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Step-by-step guidance from data preparation to advanced AI analytics implementation.
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
              Start Your Data Analysis Transformation
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join over 12,000 professionals who have revolutionized their data workflows with AI.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Roadmap
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