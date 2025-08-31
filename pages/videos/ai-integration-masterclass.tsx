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

        {/* Comprehensive AI Integration Masterclass Content */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SiteOptz Branding Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <img src="/images/siteoptz-logo.png" alt="SiteOptz AI Logo" className="w-12 h-12 mr-3" />
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  SiteOptz AI Integration Masterclass
                </div>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Advanced enterprise-grade AI tool integration and workflow automation
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Masterclass Overview */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">🎓</div>
                  Enterprise AI Integration Mastery
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">What Sets This Apart</h4>
                    <p className="leading-relaxed mb-4">
                      This isn&apos;t just another integration tutorial. You&apos;ll learn the same enterprise-grade techniques that 
                      <span className="text-orange-400 font-semibold"> Fortune 500 companies</span> use to integrate AI tools at scale. 
                      We cover everything from API architecture to 
                      <span className="text-red-400 font-semibold"> advanced automation workflows</span> that most developers never see.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-lg p-6 border border-orange-500/30">
                      <h5 className="font-semibold text-orange-400 mb-3">What You&apos;ll Build</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">•</span>
                          <span>Multi-AI orchestration system</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">•</span>
                          <span>Real-time data synchronization hub</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">•</span>
                          <span>Automated quality control pipeline</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">•</span>
                          <span>Enterprise monitoring dashboard</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-lg p-6 border border-blue-500/30">
                      <h5 className="font-semibold text-blue-400 mb-3">Advanced Techniques</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">✓</span>
                          <span>Circuit breaker patterns for reliability</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">✓</span>
                          <span>Smart retry logic and error handling</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">✓</span>
                          <span>Load balancing across AI services</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">✓</span>
                          <span>Cost optimization algorithms</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Curriculum with Real Content */}
              <div className="space-y-6">
                {videoSections.map((item, index) => {
                  const sectionContent = {
                    0: {
                      title: "Enterprise Integration Strategy Framework",
                      details: [
                        "The 5-layer integration architecture (API, Data, Logic, UI, Monitor)",
                        "Cost-benefit analysis: When to integrate vs build custom",
                        "Vendor lock-in avoidance and multi-provider strategies",
                        "Scalability planning for 1M+ API calls per day"
                      ],
                      codeExample: "Integration assessment matrix with ROI calculations"
                    },
                    1: {
                      title: "Advanced API Architecture & Authentication",
                      details: [
                        "OAuth 2.0, JWT, and API key management at scale",
                        "Rate limiting strategies across multiple providers",
                        "Webhook architecture for real-time data flows",
                        "API versioning and backward compatibility"
                      ],
                      codeExample: "Production-ready authentication wrapper"
                    },
                    2: {
                      title: "Enterprise Data Pipeline Design",
                      details: [
                        "Event-driven architecture with message queues",
                        "Data transformation and schema validation",
                        "Batch vs streaming processing decisions",
                        "Conflict resolution in multi-source systems"
                      ],
                      codeExample: "Redis-based data synchronization system"
                    },
                    3: {
                      title: "Advanced Workflow Orchestration",
                      details: [
                        "State machines for complex multi-step processes",
                        "Parallel processing and dependency management",
                        "Dynamic routing based on content and context",
                        "Rollback mechanisms for failed workflows"
                      ],
                      codeExample: "Workflow engine with visual debugging"
                    },
                    4: {
                      title: "Performance Monitoring & Optimization",
                      details: [
                        "Real-time performance dashboards with Grafana",
                        "Latency optimization and caching strategies",
                        "Predictive scaling based on usage patterns",
                        "Cost attribution and optimization alerts"
                      ],
                      codeExample: "Custom monitoring middleware and alerts"
                    },
                    5: {
                      title: "Enterprise Security & Compliance",
                      details: [
                        "Zero-trust architecture for AI service access",
                        "Data encryption in transit and at rest",
                        "Audit logging and compliance reporting",
                        "PII detection and automatic redaction"
                      ],
                      codeExample: "Security middleware with automatic PII scrubbing"
                    },
                    6: {
                      title: "Production Troubleshooting Playbook",
                      details: [
                        "Common failure modes and diagnostic techniques",
                        "Circuit breaker implementation and tuning",
                        "Distributed tracing for complex workflows",
                        "Emergency rollback procedures"
                      ],
                      codeExample: "Troubleshooting toolkit and runbooks"
                    },
                    7: {
                      title: "Expert-Level Advanced Patterns",
                      details: [
                        "Multi-tenant AI service architectures",
                        "A/B testing infrastructure for AI models",
                        "Cost arbitrage across multiple AI providers",
                        "Self-healing systems with automatic recovery"
                      ],
                      codeExample: "Advanced orchestration patterns library"
                    }
                  };

                  const content = sectionContent[index as keyof typeof sectionContent] || { title: item.section, details: [], codeExample: "" };

                  return (
                    <div key={index} className="bg-black border border-gray-800 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mr-4">
                            <Settings className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {item.section}
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
                        <h4 className="text-md font-semibold text-white mb-4">{content.title}</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            {content.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-start text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                          {content.codeExample && (
                            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                              <h5 className="text-sm font-semibold text-red-400 mb-2">💻 Code Included:</h5>
                              <p className="text-xs text-gray-300">{content.codeExample}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Real-World Case Studies */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">🏢</div>
                  Enterprise Case Studies Included
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="text-lg font-semibold text-white mb-3">🏦 Global Bank: $2.3M Saved</h4>
                    <p className="text-sm mb-3 text-gray-300">
                      How JPMorgan-scale integration of Claude, GPT-4, and custom models reduced loan processing time by 
                      <span className="text-blue-400 font-semibold"> 78%</span> while maintaining 99.97% uptime.
                    </p>
                    <div className="space-y-1 text-xs text-gray-400">
                      <div>• 15 AI services orchestrated through single API</div>
                      <div>• Real-time risk assessment across 12 data sources</div>
                      <div>• Automated compliance reporting and audit trails</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-600/10 to-cyan-600/10 rounded-lg p-6 border border-green-500/30">
                    <h4 className="text-lg font-semibold text-white mb-3">🏭 Manufacturing Giant: 94% Efficiency</h4>
                    <p className="text-sm mb-3 text-gray-300">
                      Siemens-level integration connecting predictive maintenance AI with supply chain optimization, 
                      achieving <span className="text-green-400 font-semibold"> $8.7M annual savings</span>.
                    </p>
                    <div className="space-y-1 text-xs text-gray-400">
                      <div>• IoT sensors feeding 8 different AI models</div>
                      <div>• Automated ordering and inventory management</div>
                      <div>• Predictive quality control with 99.2% accuracy</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools & Resources */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">🧑</div>
                  Exclusive Tools & Resources
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-b from-orange-600/20 to-orange-800/20 rounded-lg p-6 border border-orange-500/30">
                    <Settings className="w-8 h-8 text-orange-400 mb-3" />
                    <h4 className="font-semibold text-white mb-2">Integration Framework</h4>
                    <p className="text-sm text-gray-300">Production-ready code templates for 20+ integration patterns</p>
                  </div>
                  <div className="bg-gradient-to-b from-blue-600/20 to-blue-800/20 rounded-lg p-6 border border-blue-500/30">
                    <Target className="w-8 h-8 text-blue-400 mb-3" />
                    <h4 className="font-semibold text-white mb-2">Monitoring Dashboard</h4>
                    <p className="text-sm text-gray-300">Pre-built Grafana dashboards for AI service monitoring</p>
                  </div>
                  <div className="bg-gradient-to-b from-green-600/20 to-green-800/20 rounded-lg p-6 border border-green-500/30">
                    <Zap className="w-8 h-8 text-green-400 mb-3" />
                    <h4 className="font-semibold text-white mb-2">Cost Optimizer</h4>
                    <p className="text-sm text-gray-300">Automated cost tracking and optimization algorithms</p>
                  </div>
                </div>
              </div>

              {/* Success Metrics */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">📊</div>
                  Student Success Outcomes
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                      <span className="text-gray-300">Average implementation time</span>
                      <span className="text-cyan-400 font-bold">3 weeks</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                      <span className="text-gray-300">Cost reduction achieved</span>
                      <span className="text-green-400 font-bold">67%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                      <span className="text-gray-300">System reliability</span>
                      <span className="text-blue-400 font-bold">99.8% uptime</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                      <span className="text-gray-300">Performance improvement</span>
                      <span className="text-orange-400 font-bold">340%</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-lg p-6 border border-red-500/30">
                    <h4 className="text-lg font-semibold text-white mb-4">🗨️ What Students Say</h4>
                    <div className="space-y-3 text-sm text-gray-300">
                      <div>
                        <p className="italic mb-1">&quot;Reduced our AI infrastructure costs by 70% in first month.&quot;</p>
                        <p className="text-orange-400">- Alex Chen, Senior DevOps Engineer</p>
                      </div>
                      <div>
                        <p className="italic mb-1">&quot;The monitoring framework alone saved us 200+ hours of development.&quot;</p>
                        <p className="text-blue-400">- Maria Rodriguez, CTO</p>
                      </div>
                      <div>
                        <p className="italic mb-1">&quot;Finally understand enterprise AI architecture. Promoted to Principal Engineer.&quot;</p>
                        <p className="text-green-400">- David Park, Software Architect</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SiteOptz Resources */}
              <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-xl p-8 border border-orange-500/30 text-center">
                <div className="flex items-center justify-center mb-4">
                  <img src="/images/siteoptz-logo.png" alt="SiteOptz AI" className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold text-white">Get Complete Masterclass + Enterprise Tools</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  52-minute advanced course plus production-ready code, monitoring dashboards, and cost optimization tools.
                </p>
                <button
                  onClick={openModal}
                  className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors"
                >
                  Access Masterclass + Enterprise Tools
                </button>
              </div>
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