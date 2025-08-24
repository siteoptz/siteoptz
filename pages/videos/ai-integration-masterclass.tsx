import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import { 
  Play,
  Download,
  CheckCircle,
  ArrowLeft,
  Clock,
  Users,
  Star,
  Video,
  Settings,
  Target,
  Zap
} from 'lucide-react';

export default function AIIntegrationMasterclass() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'ai-integration-masterclass' as const,
    source: 'video_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'Advanced AI tool integration techniques',
    'Multi-tool workflow automation strategies',
    'API connections and data synchronization',
    'Performance optimization and monitoring',
    'Troubleshooting common integration issues',
    'Enterprise-grade security considerations'
  ];

  const videoSections = [
    { section: '1. Integration Strategy Planning', time: '0:00', description: 'Framework for successful AI tool integration' },
    { section: '2. API Connections & Setup', time: '8:30', description: 'Technical implementation and authentication' },
    { section: '3. Data Flow Architecture', time: '16:15', description: 'Designing efficient data pipelines' },
    { section: '4. Workflow Automation', time: '24:45', description: 'Building automated multi-tool workflows' },
    { section: '5. Performance Optimization', time: '32:20', description: 'Monitoring and improving integration performance' },
    { section: '6. Security & Compliance', time: '38:50', description: 'Enterprise security best practices' },
    { section: '7. Troubleshooting Guide', time: '42:30', description: 'Common issues and solutions' },
    { section: '8. Advanced Techniques', time: '47:10', description: 'Expert-level integration strategies' }
  ];

  const stats = [
    { number: '8', label: 'Deep sections' },
    { number: '52min', label: 'Masterclass' },
    { number: '20+', label: 'Integration examples' },
    { number: '4.9', label: 'Expert rating' }
  ];

  return (
    <>
      <Head>
        <title>AI Tool Integration Masterclass - Advanced Video Tutorial | SiteOptz</title>
        <meta 
          name="description" 
          content="Master AI tool integration with our 52-minute advanced tutorial. Learn workflow automation, API connections, and enterprise integration strategies." 
        />
        <meta 
          name="keywords" 
          content="AI tool integration, workflow automation, AI API integration, AI tool optimization, enterprise AI integration, AI workflow design" 
        />
        <link rel="canonical" href="https://siteoptz.ai/videos/ai-integration-masterclass" />
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
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-full border border-orange-500/30 mb-6">
                  <Settings className="w-4 h-4 text-orange-400 mr-2" />
                  <span className="text-orange-400 text-sm font-medium">Advanced Masterclass</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  AI Tool Integration Masterclass
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Master advanced techniques for integrating multiple AI tools into seamless workflows. 
                  Learn enterprise-grade integration strategies, automation, and optimization.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">Advanced</div>
                    <div className="text-sm text-gray-400">Level</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">52</div>
                    <div className="text-sm text-gray-400">Minutes</div>
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
              
              {/* Right Column - Video Access Card */}
              <div className="lg:pl-8">
                <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-2xl p-8 border border-orange-500/30">
                  {/* Video Thumbnail */}
                  <div className="bg-gray-800 rounded-xl mb-6 aspect-video flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20"></div>
                    <div className="flex items-center space-x-2 relative z-10">
                      <div className="w-8 h-8 bg-blue-500 rounded border-2 border-white"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-8 h-8 bg-green-500 rounded border-2 border-white"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-8 h-8 bg-purple-500 rounded border-2 border-white"></div>
                    </div>
                    <Play className="w-16 h-16 text-white absolute" />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-xs">
                      52:30
                    </div>
                    <div className="absolute top-2 left-2 bg-orange-600 px-2 py-1 rounded text-white text-xs">
                      ADVANCED
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Access Masterclass
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        52 min class
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        3,800+ students
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
                    className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors flex items-center justify-center"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Masterclass
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    🔧 Includes code examples and integration templates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Sections */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Masterclass Curriculum
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Advanced integration techniques for building sophisticated AI-powered workflows.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {videoSections.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-black border border-gray-800 rounded-xl mb-4 hover:border-cyan-400 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {item.section}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-cyan-400 font-mono text-sm ml-4">
                    {item.time}
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
              Master Advanced AI Integration
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Take your AI implementation to the next level with enterprise-grade integration techniques.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Masterclass
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