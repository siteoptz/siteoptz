import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Search,
  Filter,
  Star,
  Users,
  TrendingUp,
  Zap,
  Brain,
  Code,
  Image as ImageIcon,
  Video,
  Mic,
  BarChart3,
  MessageSquare,
  Mail,
  Calendar,
  FileText,
  ArrowRight,
  ExternalLink,
  Bookmark,
  Clock,
  DollarSign
} from 'lucide-react';

export default function AILibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', icon: Brain, count: 500, color: 'text-purple-400' },
    { name: 'Content Creation', icon: FileText, count: 85, color: 'text-blue-400' },
    { name: 'Code Generation', icon: Code, count: 65, color: 'text-green-400' },
    { name: 'Image Generation', icon: ImageIcon, count: 75, color: 'text-pink-400' },
    { name: 'Video Creation', icon: Video, count: 45, color: 'text-red-400' },
    { name: 'Voice AI', icon: Mic, count: 35, color: 'text-yellow-400' },
    { name: 'Data Analysis', icon: BarChart3, count: 55, color: 'text-cyan-400' },
    { name: 'Customer Service', icon: MessageSquare, count: 40, color: 'text-orange-400' },
    { name: 'Email Marketing', icon: Mail, count: 30, color: 'text-indigo-400' },
    { name: 'Productivity', icon: Calendar, count: 70, color: 'text-teal-400' }
  ];

  const featuredTools = [
    {
      name: "ChatGPT",
      category: "Content Creation",
      description: "Advanced conversational AI for content generation, analysis, and creative writing with human-like responses.",
      rating: 4.8,
      users: "100M+",
      pricing: "Free + $20/mo",
      features: ["Natural Language Processing", "Code Generation", "Data Analysis", "Creative Writing"],
      url: "/tools/chatgpt",
      logo: "/images/tools/chatgpt-logo.png",
      featured: true
    },
    {
      name: "Claude",
      category: "Content Creation", 
      description: "Anthropic's AI assistant specialized in safe, helpful, and honest conversations with advanced reasoning capabilities.",
      rating: 4.9,
      users: "10M+",
      pricing: "Free + $20/mo",
      features: ["Advanced Reasoning", "Document Analysis", "Code Review", "Research"],
      url: "/tools/claude",
      logo: "/images/tools/claude-logo.png",
      featured: true
    },
    {
      name: "Midjourney",
      category: "Image Generation",
      description: "Leading AI image generator creating stunning, artistic visuals from text descriptions with exceptional quality.",
      rating: 4.7,
      users: "15M+",
      pricing: "$10-60/mo",
      features: ["Artistic Styles", "High Resolution", "Style Transfer", "Batch Processing"],
      url: "/tools/midjourney",
      logo: "/images/tools/midjourney-logo.png",
      featured: true
    },
    {
      name: "GitHub Copilot",
      category: "Code Generation",
      description: "AI-powered code completion tool that helps developers write better code faster with intelligent suggestions.",
      rating: 4.6,
      users: "5M+", 
      pricing: "$10-19/mo",
      features: ["Code Completion", "Multi-language Support", "Context Awareness", "IDE Integration"],
      url: "/tools/github-copilot",
      logo: "/images/tools/copilot-logo.png"
    },
    {
      name: "Jasper AI",
      category: "Content Creation",
      description: "Enterprise AI writing assistant designed for marketing teams to create high-converting content at scale.",
      rating: 4.4,
      users: "1M+",
      pricing: "$49-125/mo",
      features: ["Brand Voice", "SEO Optimization", "Team Collaboration", "Content Templates"],
      url: "/tools/jasper-ai",
      logo: "/images/tools/jasper-logo.png"
    },
    {
      name: "Runway ML",
      category: "Video Creation",
      description: "AI-powered video editing and generation platform with cutting-edge tools for content creators.",
      rating: 4.5,
      users: "2M+",
      pricing: "Free + $15-35/mo",
      features: ["Video Generation", "Background Removal", "Style Transfer", "Motion Tracking"],
      url: "/tools/runway-ml",
      logo: "/images/tools/runway-logo.png"
    }
  ];

  const toolStats = [
    { number: "500+", label: "AI Tools Reviewed" },
    { number: "50+", label: "Categories Covered" },
    { number: "1M+", label: "Monthly Users" },
    { number: "98%", label: "Accuracy Rating" }
  ];

  const recentlyAdded = [
    {
      name: "Anthropic Claude 3 Opus",
      category: "Content Creation",
      addedDate: "2 days ago",
      rating: 4.9,
      url: "/tools/claude-3-opus"
    },
    {
      name: "OpenAI GPT-4 Turbo",
      category: "Code Generation", 
      addedDate: "5 days ago",
      rating: 4.8,
      url: "/tools/gpt4-turbo"
    },
    {
      name: "Stability AI SDXL",
      category: "Image Generation",
      addedDate: "1 week ago",
      rating: 4.6,
      url: "/tools/sdxl"
    }
  ];

  const filteredTools = featuredTools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Tools Library - 500+ Reviewed AI Tools & Software",
    "description": "Comprehensive library of 500+ AI tools across 50+ categories. Expert reviews, ratings, and comparisons to help you find the perfect AI solution for your business.",
    "url": "https://siteoptz.ai/ai-library",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": featuredTools.length,
      "itemListElement": featuredTools.map((tool, index) => ({
        "@type": "SoftwareApplication",
        "position": index + 1,
        "name": tool.name,
        "description": tool.description,
        "applicationCategory": tool.category,
        "aggregateRating": {
          "@type": "AggregateRating", 
          "ratingValue": tool.rating,
          "bestRating": 5,
          "worstRating": 1
        },
        "offers": {
          "@type": "Offer",
          "price": tool.pricing,
          "priceCurrency": "USD"
        }
      }))
    }
  };

  return (
    <>
      <Head>
        <title>AI Tools Library - 500+ Reviewed AI Tools & Software | SiteOptz</title>
        <meta 
          name="description" 
          content="Comprehensive library of 500+ AI tools across 50+ categories. Expert reviews, ratings, and detailed comparisons to help you find the perfect AI solution for your business." 
        />
        <meta 
          name="keywords" 
          content="AI tools library, AI software directory, AI tool reviews, best AI tools, AI tool comparison, artificial intelligence tools, machine learning tools" 
        />
        <link rel="canonical" href="https://siteoptz.ai/ai-library" />
        
        {/* Open Graph */}
        <meta property="og:title" content="500+ AI Tools Library with Expert Reviews | SiteOptz" />
        <meta property="og:description" content="Discover the best AI tools for your business. Expert reviews, ratings, and comparisons across 50+ categories including content, code, image generation, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/ai-library" />
        <meta property="og:image" content="https://siteoptz.ai/images/ai-library-og.jpg" />
        
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
                AI Tools Library
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Discover and compare 500+ AI tools across 50+ categories. 
                Expert reviews, ratings, and recommendations to find your perfect AI solution.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search AI tools... (e.g., ChatGPT, Midjourney, Claude)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {toolStats.map((stat, index) => (
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

        {/* Category Filter */}
        <section className="py-8 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                      selectedCategory === category.name
                        ? 'bg-cyan-600 text-white'
                        : 'bg-black border border-gray-800 text-gray-300 hover:border-cyan-400'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${category.color}`} />
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Tools */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                {selectedCategory === 'All' ? 'Featured AI Tools' : `${selectedCategory} Tools`}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Expertly reviewed and rated AI tools to accelerate your business transformation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.map((tool, index) => (
                <div
                  key={index}
                  className={`bg-black border rounded-xl p-6 hover:border-cyan-400 transition-all hover:transform hover:scale-105 ${
                    tool.featured ? 'border-cyan-400 ring-1 ring-cyan-400/20' : 'border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                        <span className="text-xs text-gray-400">{tool.category}</span>
                      </div>
                    </div>
                    {tool.featured && (
                      <span className="px-2 py-1 bg-cyan-600 text-white text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-white font-medium">{tool.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="w-4 h-4 mr-1" />
                        {tool.users}
                      </div>
                      <div className="flex items-center text-green-400">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {tool.pricing}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {tool.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
                      {tool.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                          +{tool.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <Link
                      href={tool.url}
                      className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors flex items-center"
                    >
                      View Details
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recently Added */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Recently Added
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The latest AI tools we've reviewed and added to our library.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {recentlyAdded.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.url}
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                      {tool.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {tool.addedDate}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-2 hover:text-cyan-400 transition-colors">
                    {tool.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white text-sm">{tool.rating}</span>
                  </div>
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
                Can't Find the Right AI Tool?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get personalized AI tool recommendations based on your specific business needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Get Recommendations
                </Link>
                <Link
                  href="/compare"
                  className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  Compare Tools
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}