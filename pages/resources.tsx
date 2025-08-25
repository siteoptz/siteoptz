import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../components/LeadMagnetModal';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Headphones,
  Download,
  ExternalLink,
  Clock,
  Users,
  TrendingUp,
  ArrowRight,
  Play,
  Star,
  Calendar,
  Search,
  Filter,
  CheckCircle
} from 'lucide-react';

export default function Resources() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    resourceType: 'playbook' | 'framework' | 'both';
    source?: string;
  }>({
    isOpen: false,
    resourceType: 'playbook',
    source: 'resources_page'
  });

  const openModal = (resourceType: 'playbook' | 'framework' | 'both', source: string = 'resources_page') => {
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
  const resourceCategories = [
    {
      title: "AI Implementation Guides",
      description: "Step-by-step guides to implement AI in your business",
      icon: BookOpen,
      resources: [
        {
          title: "Complete Guide to AI Chatbot Implementation",
          type: "Guide",
          readTime: "15 min read",
          description: "Learn how to implement AI chatbots from strategy to deployment, with real-world case studies and ROI calculations.",
          url: "/guides/ai-chatbot-implementation",
          featured: true
        },
        {
          title: "AI Content Generation: Best Practices & Tools",
          type: "Guide", 
          readTime: "12 min read",
          description: "Master AI content creation with proven strategies, tool comparisons, and quality control frameworks.",
          url: "/guides/ai-content-generation"
        },
        {
          title: "Data Analysis with AI: A Beginner's Roadmap",
          type: "Guide",
          readTime: "18 min read", 
          description: "Transform your data analysis workflow with AI tools. Includes tool selection criteria and implementation timeline.",
          url: "/guides/ai-data-analysis"
        }
      ]
    },
    {
      title: "Industry Reports",
      description: "Research-backed insights on AI adoption across industries",
      icon: FileText,
      resources: [
        {
          title: "State of AI in Healthcare 2024",
          type: "Report",
          readTime: "25 min read",
          description: "Comprehensive analysis of AI adoption in healthcare, including ROI data from 200+ hospitals and clinics.",
          url: "/reports/ai-healthcare-2024",
          featured: true
        },
        {
          title: "Financial Services AI Transformation Report",
          type: "Report",
          readTime: "30 min read",
          description: "How banks and fintech companies are leveraging AI for fraud detection, risk assessment, and customer service.",
          url: "/reports/fintech-ai-2024"
        },
        {
          title: "Manufacturing AI Efficiency Study",
          type: "Report",
          readTime: "22 min read",
          description: "Data-driven insights on how AI is improving manufacturing efficiency, reducing costs, and enhancing quality control.",
          url: "/reports/manufacturing-ai-2024"
        }
      ]
    },
    {
      title: "Video Tutorials",
      description: "Visual learning resources and step-by-step tutorials",
      icon: Video,
      resources: [
        {
          title: "Getting Started with Claude AI for Business",
          type: "Video",
          readTime: "8 min watch",
          description: "Complete walkthrough of setting up and optimizing Claude AI for business workflows and customer service.",
          url: "/videos/claude-ai-business-setup"
        },
        {
          title: "ChatGPT vs Claude vs Gemini: Tool Comparison",
          type: "Video", 
          readTime: "12 min watch",
          description: "Side-by-side comparison of leading AI tools, helping you choose the right solution for your business needs.",
          url: "/videos/ai-tools-comparison"
        },
        {
          title: "AI Tool Integration Masterclass",
          type: "Video",
          readTime: "45 min watch",
          description: "Advanced techniques for integrating multiple AI tools into existing business workflows for maximum efficiency.",
          url: "/videos/ai-integration-masterclass"
        }
      ]
    },
    {
      title: "Podcasts & Webinars",
      description: "Expert discussions and live training sessions",
      icon: Headphones,
      resources: [
        {
          title: "AI Leadership Podcast: Weekly Insights",
          type: "Podcast",
          readTime: "30 min episodes",
          description: "Weekly discussions with AI leaders, featuring implementation strategies and success stories from Fortune 500 companies.",
          url: "/podcasts/"
        },
        {
          title: "Monthly AI Tools Webinar Series",
          type: "Webinar",
          readTime: "60 min sessions",
          description: "Live monthly sessions covering new AI tools, implementation best practices, and Q&A with experts.",
          url: "/webinars/monthly-tools-series"
        }
      ]
    }
  ];

  const featuredResources = [
    {
      title: "The Ultimate AI Implementation Playbook",
      description: "A comprehensive 50-page guide covering everything from AI strategy to measurement and optimization.",
      type: "Downloadable Guide",
      author: "SiteOptz AI Team",
      downloads: "10,000+",
      rating: 4.9,
      resourceType: 'playbook' as const
    },
    {
      title: "AI Tool Selection Framework",
      description: "Decision matrix and evaluation criteria to help you choose the right AI tools for your specific business needs.",
      type: "Template",
      author: "Alex Chen, CEO",
      downloads: "8,500+", 
      rating: 4.8,
      resourceType: 'framework' as const
    }
  ];

  const recentUpdates = [
    {
      title: "OpenAI GPT-4 Turbo: Complete Business Guide",
      date: "3 days ago",
      type: "Guide",
      url: "/guides/gpt4-turbo-business"
    },
    {
      title: "Q4 2024 AI Tools Market Analysis",
      date: "1 week ago", 
      type: "Report",
      url: "/reports/q4-2024-ai-market"
    },
    {
      title: "Anthropic Claude 3 vs GPT-4: Detailed Comparison",
      date: "2 weeks ago",
      type: "Analysis", 
      url: "/analysis/claude3-vs-gpt4"
    }
  ];

  const stats = [
    { number: "50+", label: "Comprehensive Guides" },
    { number: "25+", label: "Industry Reports" },
    { number: "100+", label: "Video Tutorials" },
    { number: "500K+", label: "Resource Downloads" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Resources & Learning Center",
    "description": "Access 50+ comprehensive guides, industry reports, video tutorials, and expert resources for AI implementation and optimization. Free downloads and expert insights.",
    "url": "https://siteoptz.ai/resources",
    "mainEntity": {
      "@type": "ItemList", 
      "numberOfItems": resourceCategories.reduce((total, category) => total + category.resources.length, 0),
      "itemListElement": resourceCategories.flatMap(category => 
        category.resources.map((resource, index) => ({
          "@type": "CreativeWork",
          "name": resource.title,
          "description": resource.description,
          "author": {
            "@type": "Organization",
            "name": "SiteOptz"
          },
          "publisher": {
            "@type": "Organization",
            "name": "SiteOptz" 
          },
          "datePublished": "2024-01-01",
          "url": `https://siteoptz.ai${resource.url}`
        }))
      )
    }
  };

  return (
    <>
      <Head>
        <title>AI Resources & Learning Center - Free Guides, Reports & Tools | SiteOptz</title>
        <meta 
          name="description" 
          content="Access 50+ comprehensive AI guides, industry reports, video tutorials, and expert resources. Free downloads covering AI implementation, tool selection, and optimization strategies." 
        />
        <meta 
          name="keywords" 
          content="AI resources, AI implementation guide, AI tools comparison, AI business strategy, machine learning resources, AI training materials, AI best practices" 
        />
        <link rel="canonical" href="https://siteoptz.ai/resources" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Free AI Resources & Learning Center | SiteOptz" />
        <meta property="og:description" content="50+ comprehensive guides, reports, and tutorials to help you implement and optimize AI in your business. Expert insights and free downloads." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/resources" />
        <meta property="og:image" content="https://siteoptz.ai/images/resources-og.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                AI Resources & Learning Center
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Access expert guides, industry reports, and practical resources to accelerate 
                your AI implementation journey.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Featured Downloads
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our most popular resources, downloaded by thousands of businesses worldwide.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
              {featuredResources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-cyan-400"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-cyan-600 text-white text-sm rounded-full">
                      {resource.type}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {resource.downloads}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        {resource.rating}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      By {resource.author}
                    </div>
                    <button
                      onClick={() => openModal(resource.resourceType, 'featured_downloads')}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-sm font-medium flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Free
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Get Both Bundle */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/50 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🎯 Complete AI Success Bundle
                </h3>
                <p className="text-gray-300 mb-6">
                  Get both the Implementation Playbook AND Tool Selection Framework together. 
                  Everything you need for successful AI adoption.
                </p>
                <div className="flex items-center justify-center space-x-6 mb-6 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-gray-300">50+ page playbook</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-gray-300">Selection framework</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-gray-300">Templates & tools</span>
                  </div>
                </div>
                <button
                  onClick={() => openModal('both', 'bundle_cta')}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center mx-auto"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Get Complete Bundle Free
                </button>
                <p className="text-xs text-gray-400 mt-3">
                  <Star className="w-3 h-3 inline mr-1 text-yellow-400" />
                  Join 15,000+ business leaders
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Browse Resources by Category
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Find exactly what you need to advance your AI implementation journey.
              </p>
            </div>
            
            <div className="space-y-12">
              {resourceCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <div key={categoryIndex} className="bg-black border border-gray-800 rounded-2xl p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                        <p className="text-gray-400">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.resources.map((resource, resourceIndex) => (
                        <div
                          key={resourceIndex}
                          className={`bg-gray-900 border rounded-xl p-6 hover:border-cyan-400 transition-all ${
                            resource.featured ? 'border-cyan-400 ring-1 ring-cyan-400/20' : 'border-gray-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                              {resource.type}
                            </span>
                            {resource.featured && (
                              <span className="px-2 py-1 bg-cyan-600 text-white text-xs rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          
                          <h4 className="text-lg font-semibold text-white mb-3">
                            {resource.title}
                          </h4>
                          
                          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                            {resource.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {resource.readTime}
                            </div>
                            <Link
                              href={resource.url}
                              className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors flex items-center"
                            >
                              {resource.type === 'Video' ? 'Watch' : 'Read'}
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recent Updates */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Latest Updates
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Stay current with our newest resources and insights.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {recentUpdates.map((update, index) => (
                <Link
                  key={index}
                  href={update.url}
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                      {update.type}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {update.date}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-2 hover:text-cyan-400 transition-colors">
                    {update.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need Personalized AI Guidance?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get custom AI implementation strategy and expert consultation tailored to your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Link>
                <Link
                  href="/case-studies"
                  className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  View Success Stories
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
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