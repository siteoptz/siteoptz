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
  Zap,
  Target
} from 'lucide-react';

export default function AIToolsComparison() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'ai-tools-comparison-video' as const,
    source: 'video_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'Side-by-side comparison of ChatGPT, Claude, and Gemini',
    'Performance benchmarks and testing results',
    'Cost analysis and pricing comparison',
    'Use case recommendations for each tool',
    'Integration capabilities and limitations',
    'Decision-making framework for tool selection'
  ];

  const videoChapters = [
    { chapter: '1. Introduction & Overview', time: '0:00', description: 'AI tools landscape and comparison methodology' },
    { chapter: '2. ChatGPT Deep Dive', time: '3:30', description: 'Features, strengths, and use cases' },
    { chapter: '3. Claude AI Analysis', time: '6:45', description: 'Capabilities, advantages, and applications' },
    { chapter: '4. Google Gemini Review', time: '10:20', description: 'Performance, features, and positioning' },
    { chapter: '5. Performance Benchmarks', time: '13:50', description: 'Head-to-head testing and results' },
    { chapter: '6. Cost & Pricing Analysis', time: '17:15', description: 'ROI calculations and cost comparison' },
    { chapter: '7. Use Case Recommendations', time: '19:40', description: 'Which tool for which business need' },
    { chapter: '8. Final Verdict & Selection Guide', time: '22:30', description: 'Decision framework and conclusions' }
  ];

  const stats = [
    { number: '8', label: 'Detailed chapters' },
    { number: '25min', label: 'Runtime' },
    { number: '3', label: 'AI tools compared' },
    { number: '4.8', label: 'User rating' }
  ];

  return (
    <>
      <Head>
        <title>ChatGPT vs Claude vs Gemini: Complete Tool Comparison Video | SiteOptz</title>
        <meta 
          name="description" 
          content="Watch our comprehensive 25-minute comparison of ChatGPT, Claude AI, and Google Gemini. Includes benchmarks, pricing, and use case recommendations." 
        />
        <meta 
          name="keywords" 
          content="ChatGPT vs Claude vs Gemini, AI tools comparison, AI model comparison, ChatGPT comparison, Claude AI comparison, Gemini AI" 
        />
        <link rel="canonical" href="https://siteoptz.ai/videos/ai-tools-comparison" />
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
                  <span className="text-purple-400 text-sm font-medium">AI Tools Comparison</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  ChatGPT vs Claude vs Gemini: Tool Comparison
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Get the definitive comparison of the top 3 AI tools. See side-by-side benchmarks, 
                  pricing analysis, and get expert recommendations for your business needs.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-sm text-gray-400">AI Tools</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Video className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">25</div>
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
                <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl p-8 border border-purple-500/30">
                  {/* Video Thumbnail */}
                  <div className="bg-gray-800 rounded-xl mb-6 aspect-video flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"></div>
                    <div className="flex items-center space-x-4 relative z-10">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">GPT</span>
                      </div>
                      <div className="text-white text-2xl">vs</div>
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">C</span>
                      </div>
                      <div className="text-white text-2xl">vs</div>
                      <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">G</span>
                      </div>
                    </div>
                    <Play className="w-16 h-16 text-white absolute" />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-xs">
                      25:15
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Watch Full Comparison
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        25 min watch
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        8,300+ viewers
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
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Comparison
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    ⚡ Includes comparison matrix and decision framework
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Chapters */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                What&apos;s Covered
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive analysis covering performance, features, pricing, and use cases.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {videoChapters.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-black border border-gray-800 rounded-xl mb-4 hover:border-cyan-400 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {item.chapter}
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
              Make the Right AI Tool Choice
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the complete comparison and choose the perfect AI tool for your business needs.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Now
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