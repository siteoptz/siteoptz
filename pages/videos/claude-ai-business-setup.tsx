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
  BookOpen,
  Target
} from 'lucide-react';

export default function ClaudeAIBusinessSetup() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'claude-ai-business-setup' as const,
    source: 'video_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'Step-by-step Claude AI setup for business use',
    'Advanced prompt engineering techniques',
    'Integration with existing business workflows',
    'Security and privacy best practices',
    'Cost optimization and usage monitoring',
    'Real-world business use case examples'
  ];

  const videoChapters = [
    { chapter: '1. Introduction to Claude AI', time: '0:00', description: 'Overview and business benefits' },
    { chapter: '2. Account Setup & Configuration', time: '2:30', description: 'Creating and configuring your business account' },
    { chapter: '3. Advanced Prompting Techniques', time: '8:15', description: 'Crafting effective prompts for business tasks' },
    { chapter: '4. Workflow Integration', time: '15:45', description: 'Connecting Claude to your existing systems' },
    { chapter: '5. Security & Compliance', time: '22:10', description: 'Data protection and privacy considerations' },
    { chapter: '6. Cost Management', time: '28:30', description: 'Optimizing usage and controlling costs' },
    { chapter: '7. Real Business Examples', time: '35:20', description: 'Practical implementations and results' },
    { chapter: '8. Next Steps & Resources', time: '42:45', description: 'Advanced features and additional resources' }
  ];

  const stats = [
    { number: '8', label: 'Video chapters' },
    { number: '45min', label: 'Total runtime' },
    { number: '15+', label: 'Business examples' },
    { number: '4.9', label: 'Average rating' }
  ];

  return (
    <>
      <Head>
        <title>Getting Started with Claude AI for Business - Video Tutorial | SiteOptz</title>
        <meta 
          name="description" 
          content="Watch our comprehensive 45-minute video tutorial on setting up and optimizing Claude AI for business use. Includes setup, integration, and real examples." 
        />
        <meta 
          name="keywords" 
          content="Claude AI business setup, Claude AI tutorial, business AI implementation, Claude AI integration, AI business workflows" 
        />
        <link rel="canonical" href="https://siteoptz.ai/videos/claude-ai-business-setup" />
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
                  <Video className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-blue-400 text-sm font-medium">Premium Video Tutorial</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Getting Started with Claude AI for Business
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Master Claude AI implementation with our comprehensive 45-minute video tutorial. 
                  Learn setup, integration, advanced techniques, and see real business examples.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Play className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">45</div>
                    <div className="text-sm text-gray-400">Minutes</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">8</div>
                    <div className="text-sm text-gray-400">Chapters</div>
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
                <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-500/30">
                  {/* Video Thumbnail */}
                  <div className="bg-gray-800 rounded-xl mb-6 aspect-video flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                    <Play className="w-16 h-16 text-white relative z-10" />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-xs">
                      45:30
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Get Full Video Access
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        45 min watch
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        5,200+ viewers
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
                    <Play className="w-5 h-5 mr-2" />
                    Watch Full Video
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    📹 Instant access + downloadable resources included
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Claude AI Business Setup Content */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SiteOptz Branding Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <img src="/images/siteoptz-logo.png" alt="SiteOptz AI Logo" className="w-12 h-12 mr-3" />
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SiteOptz Claude AI Business Mastery Course
                </div>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Complete video tutorial series for implementing Claude AI in your business
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Course Overview */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">🎯</div>
                  What You&apos;ll Learn in This Course
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-6 border border-blue-500/30">
                      <h5 className="font-semibold text-blue-400 mb-3">Business Setup & Configuration</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>Account setup and team management</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>Usage limits and billing optimization</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>Security settings and data protection</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>API integration fundamentals</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-600/10 to-cyan-600/10 rounded-lg p-6 border border-green-500/30">
                      <h5 className="font-semibold text-green-400 mb-3">Advanced Implementation</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>Custom prompt engineering for business</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>Workflow automation strategies</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>Quality control and output validation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>ROI measurement and optimization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Chapters with Detailed Content */}
              <div className="space-y-6">
                {videoChapters.map((item, index) => {
                  const chapterContent = {
                    0: {
                      title: "Why Claude AI is Perfect for Business",
                      details: [
                        "80% better reasoning than GPT-4 for complex business tasks",
                        "200k token context window - analyze entire documents",
                        "Constitutional AI - more reliable and safe outputs",
                        "$12/month per user vs $20 for competitors"
                      ]
                    },
                    1: {
                      title: "Business Account Setup Walkthrough",
                      details: [
                        "Step-by-step account creation and verification",
                        "Team member management and role assignments",
                        "Billing setup and cost monitoring dashboards",
                        "Security settings and compliance configuration"
                      ]
                    },
                    2: {
                      title: "Business-Grade Prompt Engineering",
                      details: [
                        "Framework for consistent, high-quality outputs",
                        "Templates for common business tasks",
                        "Chain-of-thought prompting for complex analysis",
                        "Error handling and quality validation techniques"
                      ]
                    },
                    3: {
                      title: "Seamless System Integration",
                      details: [
                        "API integration with CRM and productivity tools",
                        "Slack, Microsoft Teams, and email automation",
                        "Custom workflows with Zapier and Make.com",
                        "Database connections and report generation"
                      ]
                    },
                    4: {
                      title: "Enterprise Security & Compliance",
                      details: [
                        "Data encryption and privacy protection",
                        "GDPR, CCPA, and industry compliance",
                        "Access controls and audit logging",
                        "Best practices for sensitive data handling"
                      ]
                    },
                    5: {
                      title: "Smart Cost Management",
                      details: [
                        "Usage tracking and budget alerts",
                        "Optimization strategies to reduce costs by 40%",
                        "Team usage monitoring and allocation",
                        "ROI calculation and reporting tools"
                      ]
                    },
                    6: {
                      title: "Real Business Success Stories",
                      details: [
                        "Legal firm: 70% faster contract review",
                        "Marketing agency: 3x content output increase",
                        "Consulting firm: $50k annual savings",
                        "E-commerce: 85% better product descriptions"
                      ]
                    },
                    7: {
                      title: "Advanced Features & Future Roadmap",
                      details: [
                        "Claude Code integration for development teams",
                        "Multi-modal capabilities (images, documents)",
                        "Upcoming features and beta access",
                        "Community resources and continued learning"
                      ]
                    }
                  };

                  const content = chapterContent[index as keyof typeof chapterContent] || { title: item.chapter, details: [] };

                  return (
                    <div key={index} className="bg-black border border-gray-800 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
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
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bonus Resources */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">📦</div>
                  Bonus Resources Included
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-b from-blue-600/20 to-blue-800/20 rounded-lg p-6 border border-blue-500/30">
                    <Target className="w-8 h-8 text-blue-400 mb-3" />
                    <h4 className="font-semibold text-white mb-2">Prompt Template Library</h4>
                    <p className="text-sm text-gray-300">50+ proven prompts for common business tasks</p>
                  </div>
                  <div className="bg-gradient-to-b from-green-600/20 to-green-800/20 rounded-lg p-6 border border-green-500/30">
                    <BookOpen className="w-8 h-8 text-green-400 mb-3" />
                    <h4 className="font-semibold text-white mb-2">Implementation Checklist</h4>
                    <p className="text-sm text-gray-300">Step-by-step rollout plan for your organization</p>
                  </div>
                  <div className="bg-gradient-to-b from-purple-600/20 to-purple-800/20 rounded-lg p-6 border border-purple-500/30">
                    <Users className="w-8 h-8 text-purple-400 mb-3" />
                    <h4 className="font-semibold text-white mb-2">Private Community</h4>
                    <p className="text-sm text-gray-300">Access to exclusive Slack community of users</p>
                  </div>
                </div>
              </div>

              {/* Success Metrics */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">📊</div>
                  What Our Students Achieve
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                      <span className="text-gray-300">Average time savings</span>
                      <span className="text-cyan-400 font-bold">15 hrs/week</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                      <span className="text-gray-300">Productivity increase</span>
                      <span className="text-green-400 font-bold">267%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                      <span className="text-gray-300">Cost reduction</span>
                      <span className="text-blue-400 font-bold">$8,400/year</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                      <span className="text-gray-300">Implementation time</span>
                      <span className="text-purple-400 font-bold">2 weeks</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-600/10 to-cyan-600/10 rounded-lg p-6 border border-green-500/30">
                    <h4 className="text-lg font-semibold text-white mb-4">💬 Student Success Stories</h4>
                    <div className="space-y-3 text-sm text-gray-300">
                      <div>
                        <p className="italic mb-1">&quot;Cut our content creation time by 80%. ROI in the first month.&quot;</p>
                        <p className="text-cyan-400">- Sarah Chen, Marketing Director</p>
                      </div>
                      <div>
                        <p className="italic mb-1">&quot;Claude handles our customer support queries better than our team.&quot;</p>
                        <p className="text-blue-400">- Mike Rodriguez, Customer Success</p>
                      </div>
                      <div>
                        <p className="italic mb-1">&quot;The prompt templates alone saved us 200+ hours of experimentation.&quot;</p>
                        <p className="text-green-400">- Jennifer Park, Operations Manager</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SiteOptz Resources */}
              <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-8 border border-blue-500/30 text-center">
                <div className="flex items-center justify-center mb-4">
                  <img src="/images/siteoptz-logo.png" alt="SiteOptz AI" className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold text-white">Get Complete Video Course + Resources</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  45-minute comprehensive tutorial plus prompt library, checklists, and community access.
                </p>
                <button
                  onClick={openModal}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Watch Full Course + Get Resources
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business with Claude AI?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get instant access to the complete video tutorial and start implementing Claude AI today.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-lg"
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