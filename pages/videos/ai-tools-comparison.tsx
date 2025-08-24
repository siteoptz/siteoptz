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

        {/* Comprehensive AI Tools Comparison Content */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SiteOptz Branding Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <img src="/images/siteoptz-logo.png" alt="SiteOptz AI Logo" className="w-12 h-12 mr-3" />
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SiteOptz Ultimate AI Tools Comparison
                </div>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The definitive comparison of ChatGPT, Claude AI, and Google Gemini for business
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Comparison Overview */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">⚔️</div>
                  The Ultimate AI Battle: Which Tool Wins?
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-b from-green-600/20 to-green-800/20 rounded-lg p-6 border border-green-500/30 text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-lg">GPT</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">ChatGPT</h4>
                      <p className="text-sm text-gray-300 mb-3">The market leader with massive popularity</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Strengths:</span>
                          <span className="text-green-400">Versatility</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Best for:</span>
                          <span className="text-cyan-400">General use</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="text-yellow-400">$20/month</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-b from-blue-600/20 to-blue-800/20 rounded-lg p-6 border border-blue-500/30 text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-lg">C</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">Claude AI</h4>
                      <p className="text-sm text-gray-300 mb-3">The reasoning powerhouse</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Strengths:</span>
                          <span className="text-blue-400">Analysis</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Best for:</span>
                          <span className="text-cyan-400">Business</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="text-yellow-400">$20/month</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-b from-red-600/20 to-red-800/20 rounded-lg p-6 border border-red-500/30 text-center">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-lg">G</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">Gemini</h4>
                      <p className="text-sm text-gray-300 mb-3">Google&apos;s multimodal challenger</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Strengths:</span>
                          <span className="text-red-400">Integration</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Best for:</span>
                          <span className="text-cyan-400">Google users</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="text-yellow-400">$20/month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Benchmarks */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">📊</div>
                  Head-to-Head Performance Benchmarks
                </h3>
                
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 text-white">Test Category</th>
                          <th className="text-center py-3 text-green-400">ChatGPT 4</th>
                          <th className="text-center py-3 text-blue-400">Claude 3 Opus</th>
                          <th className="text-center py-3 text-red-400">Gemini Ultra</th>
                          <th className="text-center py-3 text-white">Winner</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-gray-800">
                          <td className="py-4 font-medium">Code Generation</td>
                          <td className="py-4 text-center text-green-400">87%</td>
                          <td className="py-4 text-center text-blue-400">92%</td>
                          <td className="py-4 text-center text-red-400">83%</td>
                          <td className="py-4 text-center text-blue-400">🏆 Claude</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-4 font-medium">Creative Writing</td>
                          <td className="py-4 text-center text-green-400">94%</td>
                          <td className="py-4 text-center text-blue-400">89%</td>
                          <td className="py-4 text-center text-red-400">86%</td>
                          <td className="py-4 text-center text-green-400">🏆 ChatGPT</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-4 font-medium">Math & Logic</td>
                          <td className="py-4 text-center text-green-400">78%</td>
                          <td className="py-4 text-center text-blue-400">91%</td>
                          <td className="py-4 text-center text-red-400">88%</td>
                          <td className="py-4 text-center text-blue-400">🏆 Claude</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-4 font-medium">Factual Accuracy</td>
                          <td className="py-4 text-center text-green-400">85%</td>
                          <td className="py-4 text-center text-blue-400">94%</td>
                          <td className="py-4 text-center text-red-400">91%</td>
                          <td className="py-4 text-center text-blue-400">🏆 Claude</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-4 font-medium">Multimodal Tasks</td>
                          <td className="py-4 text-center text-green-400">79%</td>
                          <td className="py-4 text-center text-blue-400">84%</td>
                          <td className="py-4 text-center text-red-400">96%</td>
                          <td className="py-4 text-center text-red-400">🏆 Gemini</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-lg p-6 border border-yellow-500/30">
                    <h4 className="text-lg font-semibold text-white mb-3">💡 SiteOptz Performance Insight</h4>
                    <p className="text-sm leading-relaxed text-gray-300">
                      <strong className="text-blue-400">Claude 3 Opus</strong> wins in reasoning-heavy tasks, making it ideal for business analysis. 
                      <strong className="text-green-400">ChatGPT 4</strong> excels at creative tasks with broader plugin ecosystem. 
                      <strong className="text-red-400">Gemini Ultra</strong> dominates multimodal capabilities but lags in complex reasoning.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chapter Breakdown with Detailed Content */}
              <div className="space-y-6">
                {videoChapters.map((item, index) => {
                  const chapterContent = {
                    0: {
                      title: "The AI Landscape in 2024",
                      details: [
                        "Market share: ChatGPT 65%, Claude 15%, Gemini 12%",
                        "User satisfaction ratings and retention metrics",
                        "Enterprise adoption rates by industry",
                        "Testing methodology for fair comparison"
                      ]
                    },
                    1: {
                      title: "ChatGPT: The Versatile Champion",
                      details: [
                        "GPT-4 vs GPT-3.5: performance differences",
                        "Plugin ecosystem with 1000+ integrations",
                        "Code Interpreter and advanced data analysis",
                        "Custom GPT creation and marketplace"
                      ]
                    },
                    2: {
                      title: "Claude: The Business Reasoning Expert",
                      details: [
                        "200k token context window - analyze entire documents",
                        "Constitutional AI for safer, more reliable outputs",
                        "Superior performance on logical reasoning tasks",
                        "Best-in-class for financial and legal analysis"
                      ]
                    },
                    3: {
                      title: "Gemini: Google's Multimodal Powerhouse",
                      details: [
                        "Deep integration with Google Workspace",
                        "Best-in-class image and video understanding",
                        "Real-time web search capabilities",
                        "Native YouTube and Gmail integration"
                      ]
                    },
                    4: {
                      title: "Performance Testing Results",
                      details: [
                        "25 standardized tests across different categories",
                        "Response time and accuracy measurements",
                        "Consistency testing over 1000+ queries",
                        "Edge case handling and error rates"
                      ]
                    },
                    5: {
                      title: "Cost Analysis & ROI Comparison",
                      details: [
                        "Per-token pricing and usage optimization",
                        "Enterprise pricing tiers and volume discounts",
                        "Hidden costs: API limits, overage charges",
                        "ROI calculations for different business sizes"
                      ]
                    },
                    6: {
                      title: "Use Case Recommendations",
                      details: [
                        "Content creation: ChatGPT wins for variety",
                        "Business analysis: Claude excels at complex reasoning",
                        "Visual tasks: Gemini dominates image/video work",
                        "Development: Claude leads in code quality"
                      ]
                    },
                    7: {
                      title: "Decision Framework & Final Verdict",
                      details: [
                        "Matrix for choosing based on business needs",
                        "Budget considerations and cost optimization",
                        "Future roadmaps and upcoming features",
                        "Expert recommendation for each scenario"
                      ]
                    }
                  };

                  const content = chapterContent[index as keyof typeof chapterContent] || { title: item.chapter, details: [] };

                  return (
                    <div key={index} className="bg-black border border-gray-800 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                            <Play className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {item.chapter}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-cyan-400 font-mono text-sm">
                          {item.time}
                        </div>
                      </div>
                      
                      <div className="ml-16">
                        <h4 className="text-md font-semibold text-white mb-3">{content.title}</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {content.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-start text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Decision Matrix */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">🎯</div>
                  SiteOptz Decision Matrix: Which Tool Should You Choose?
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-600/10 to-green-800/10 rounded-lg p-6 border border-green-500/30">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-xs">GPT</span>
                      </div>
                      Choose ChatGPT If:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• You need maximum versatility</li>
                      <li>• Creative writing is a priority</li>
                      <li>• You want the largest plugin ecosystem</li>
                      <li>• Budget allows $20/month</li>
                      <li>• You&apos;re new to AI tools</li>
                    </ul>
                    <div className="mt-4 p-3 bg-green-600/20 rounded border border-green-500/30">
                      <p className="text-xs text-green-300">
                        <strong>Best for:</strong> Marketing agencies, content creators, general business use
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-600/10 to-blue-800/10 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-xs">C</span>
                      </div>
                      Choose Claude If:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Complex analysis is crucial</li>
                      <li>• You handle long documents regularly</li>
                      <li>• Code quality matters most</li>
                      <li>• Safety and reliability are priorities</li>
                      <li>• You work in finance/legal/consulting</li>
                    </ul>
                    <div className="mt-4 p-3 bg-blue-600/20 rounded border border-blue-500/30">
                      <p className="text-xs text-blue-300">
                        <strong>Best for:</strong> Consulting firms, financial services, legal teams, developers
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-600/10 to-red-800/10 rounded-lg p-6 border border-red-500/30">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-xs">G</span>
                      </div>
                      Choose Gemini If:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• You live in Google ecosystem</li>
                      <li>• Visual content is important</li>
                      <li>• Real-time data matters</li>
                      <li>• You need multimodal capabilities</li>
                      <li>• YouTube integration is valuable</li>
                    </ul>
                    <div className="mt-4 p-3 bg-red-600/20 rounded border border-red-500/30">
                      <p className="text-xs text-red-300">
                        <strong>Best for:</strong> Design agencies, media companies, Google Workspace users
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SiteOptz Recommendation */}
              <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl p-8 border border-purple-500/30 text-center">
                <div className="flex items-center justify-center mb-4">
                  <img src="/images/siteoptz-logo.png" alt="SiteOptz AI" className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold text-white">Get the Complete Comparison Video + Decision Tools</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  25-minute comprehensive analysis plus comparison matrix, cost calculator, and decision framework.
                </p>
                <button
                  onClick={openModal}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  Watch Full Comparison + Get Tools
                </button>
              </div>
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