import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PodcastSubscribeModal from '../components/PodcastSubscribeModal';
import LeadMagnetModal from '../components/LeadMagnetModal';
import { 
  Play,
  Clock,
  Calendar,
  Headphones,
  Search,
  Filter,
  Star,
  Download,
  Share,
  TrendingUp,
  Users,
  Mic
} from 'lucide-react';

interface Podcast {
  id: string;
  title: string;
  description: string;
  host: string;
  duration: string;
  publishDate: string;
  category: string;
  rating: number;
  listens: string;
  topics: string[];
  audioUrl: string;
  transcriptUrl?: string;
  featured: boolean;
}

export default function PodcastsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  // Calculate dates for the past 15 weeks (going backwards from today)
  const getWeeklyDate = (weeksAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - (weeksAgo * 7));
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const podcasts: Podcast[] = [
    {
      id: 'ai-automation-revolution-2024',
      title: 'The AI Automation Revolution: Transforming Business Operations in 2024',
      description: 'Deep dive into how AI automation is reshaping modern business operations, featuring real-world case studies from Fortune 500 companies implementing AI-driven workflows.',
      host: 'Sarah Chen, AI Strategy Consultant',
      duration: '45:30',
      publishDate: getWeeklyDate(0), // This week
      category: 'Business Strategy',
      rating: 4.9,
      listens: '12.5K',
      topics: ['AI Strategy', 'Business Automation', 'Workflow Optimization', 'ROI Analysis'],
      audioUrl: '/podcasts/audio/ai-automation-revolution-2024.mp3',
      transcriptUrl: '/podcasts/transcripts/ai-automation-revolution-2024.txt',
      featured: true
    },
    {
      id: 'chatgpt-enterprise-workflows',
      title: 'ChatGPT in Enterprise: Building Scalable AI Workflows',
      description: 'Practical strategies for implementing ChatGPT and GPT-4 in enterprise environments, including security considerations, cost optimization, and team training.',
      host: 'Marcus Rodriguez, Enterprise AI Lead',
      duration: '38:45',
      publishDate: getWeeklyDate(1), // 1 week ago
      category: 'Enterprise AI',
      rating: 4.8,
      listens: '9.7K',
      topics: ['ChatGPT', 'Enterprise AI', 'Security', 'Cost Optimization'],
      audioUrl: '/podcasts/audio/chatgpt-enterprise-workflows.mp3',
      transcriptUrl: '/podcasts/transcripts/chatgpt-enterprise-workflows.txt',
      featured: false
    },
    {
      id: 'no-code-ai-tools-revolution',
      title: 'No-Code AI Tools: Democratizing Artificial Intelligence',
      description: 'Exploring the rise of no-code AI platforms that enable non-technical users to build powerful AI applications without programming knowledge.',
      host: 'Jennifer Park, No-Code Advocate',
      duration: '42:15',
      publishDate: getWeeklyDate(2), // 2 weeks ago
      category: 'No-Code AI',
      rating: 4.7,
      listens: '8.9K',
      topics: ['No-Code AI', 'Accessibility', 'Business Innovation', 'Democratization'],
      audioUrl: '/podcasts/audio/no-code-ai-tools-revolution.mp3',
      featured: true
    },
    {
      id: 'claude-vs-gpt-enterprise-comparison',
      title: 'Claude vs GPT-4: Enterprise AI Model Comparison',
      description: 'Comprehensive comparison of Claude 3 and GPT-4 for enterprise use cases, covering performance, costs, capabilities, and implementation strategies.',
      host: 'Dr. Alex Thompson, AI Research Director',
      duration: '36:20',
      publishDate: getWeeklyDate(3), // 3 weeks ago
      category: 'AI Models',
      rating: 4.8,
      listens: '11.2K',
      topics: ['Claude AI', 'GPT-4', 'Model Comparison', 'Enterprise AI'],
      audioUrl: '/podcasts/audio/claude-vs-gpt-enterprise-comparison.mp3',
      transcriptUrl: '/podcasts/transcripts/claude-vs-gpt-enterprise-comparison.txt',
      featured: false
    },
    {
      id: 'ai-customer-service-automation',
      title: 'AI-Powered Customer Service: The Future of Support',
      description: 'How AI chatbots and automation are revolutionizing customer service, with insights from companies achieving 90%+ customer satisfaction.',
      host: 'Rachel Kim, Customer Experience Expert',
      duration: '41:10',
      publishDate: getWeeklyDate(4), // 4 weeks ago
      category: 'Customer Service',
      rating: 4.6,
      listens: '7.8K',
      topics: ['Customer Service', 'AI Chatbots', 'Automation', 'CX Innovation'],
      audioUrl: '/podcasts/audio/ai-customer-service-automation.mp3',
      featured: false
    },
    {
      id: 'marketing-automation-ai-tools',
      title: 'Marketing Automation 3.0: AI Tools Changing the Game',
      description: 'Latest AI-powered marketing automation tools and strategies that are driving 300%+ ROI for modern marketing teams.',
      host: 'David Martinez, Marketing AI Specialist',
      duration: '39:45',
      publishDate: getWeeklyDate(5), // 5 weeks ago
      category: 'Marketing AI',
      rating: 4.7,
      listens: '10.1K',
      topics: ['Marketing Automation', 'AI Tools', 'ROI Optimization', 'Campaign Management'],
      audioUrl: '/podcasts/audio/marketing-automation-ai-tools.mp3',
      transcriptUrl: '/podcasts/transcripts/marketing-automation-ai-tools.txt',
      featured: true
    },
    {
      id: 'ai-data-analytics-transformation',
      title: 'AI in Data Analytics: Transforming Business Intelligence',
      description: 'How AI is revolutionizing data analytics, from automated insights generation to predictive modeling and real-time decision making.',
      host: 'Dr. Lisa Wang, Data Science Leader',
      duration: '44:25',
      publishDate: getWeeklyDate(6), // 6 weeks ago
      category: 'Data Analytics',
      rating: 4.9,
      listens: '9.3K',
      topics: ['Data Analytics', 'Business Intelligence', 'Predictive Modeling', 'AI Insights'],
      audioUrl: '/podcasts/audio/ai-data-analytics-transformation.mp3',
      featured: false
    },
    {
      id: 'ai-sales-process-automation',
      title: 'AI Sales Automation: From Lead Generation to Closing',
      description: 'Complete guide to AI-powered sales automation, covering lead scoring, pipeline management, and sales forecasting with real success stories.',
      host: 'Mike Johnson, Sales Technology Expert',
      duration: '37:50',
      publishDate: getWeeklyDate(7), // 7 weeks ago
      category: 'Sales AI',
      rating: 4.8,
      listens: '8.7K',
      topics: ['Sales Automation', 'Lead Generation', 'Pipeline Management', 'Sales AI'],
      audioUrl: '/podcasts/audio/ai-sales-process-automation.mp3',
      transcriptUrl: '/podcasts/transcripts/ai-sales-process-automation.txt',
      featured: false
    },
    {
      id: 'ai-content-creation-tools-2024',
      title: 'AI Content Creation Tools: The Creator Economy Revolution',
      description: 'Comprehensive overview of AI tools transforming content creation, from writing and design to video production and social media management.',
      host: 'Emily Chen, Content Strategy Director',
      duration: '43:35',
      publishDate: getWeeklyDate(8), // 8 weeks ago
      category: 'Content Creation',
      rating: 4.7,
      listens: '12.8K',
      topics: ['Content Creation', 'AI Writing', 'Design Automation', 'Creator Tools'],
      audioUrl: '/podcasts/audio/ai-content-creation-tools-2024.mp3',
      featured: true
    },
    {
      id: 'ai-cybersecurity-automation',
      title: 'AI in Cybersecurity: Automated Threat Detection and Response',
      description: 'How AI is strengthening cybersecurity through automated threat detection, incident response, and predictive security analytics.',
      host: 'Robert Chen, Cybersecurity AI Expert',
      duration: '40:15',
      publishDate: getWeeklyDate(9), // 9 weeks ago
      category: 'Cybersecurity',
      rating: 4.8,
      listens: '6.9K',
      topics: ['Cybersecurity', 'Threat Detection', 'AI Security', 'Automation'],
      audioUrl: '/podcasts/audio/ai-cybersecurity-automation.mp3',
      featured: false
    },
    {
      id: 'ai-healthcare-workflow-automation',
      title: 'AI Healthcare Automation: Streamlining Medical Workflows',
      description: 'Revolutionary AI applications in healthcare automation, from patient scheduling to diagnosis assistance and treatment optimization.',
      host: 'Dr. Amanda Foster, Healthcare AI Researcher',
      duration: '46:20',
      publishDate: getWeeklyDate(10), // 10 weeks ago
      category: 'Healthcare AI',
      rating: 4.9,
      listens: '7.4K',
      topics: ['Healthcare AI', 'Medical Automation', 'Patient Care', 'Clinical Workflows'],
      audioUrl: '/podcasts/audio/ai-healthcare-workflow-automation.mp3',
      transcriptUrl: '/podcasts/transcripts/ai-healthcare-workflow-automation.txt',
      featured: false
    },
    {
      id: 'ai-financial-trading-automation',
      title: 'AI in Finance: Algorithmic Trading and Risk Management',
      description: 'Deep dive into AI applications in financial services, covering algorithmic trading, risk assessment, and automated compliance.',
      host: 'James Liu, Fintech AI Strategist',
      duration: '41:45',
      publishDate: getWeeklyDate(11), // 11 weeks ago
      category: 'Finance AI',
      rating: 4.7,
      listens: '9.1K',
      topics: ['Fintech', 'Algorithmic Trading', 'Risk Management', 'AI Finance'],
      audioUrl: '/podcasts/audio/ai-financial-trading-automation.mp3',
      featured: false
    },
    {
      id: 'ai-hr-recruitment-automation',
      title: 'AI-Powered HR: Revolutionizing Recruitment and Employee Management',
      description: 'How AI is transforming HR processes, from automated resume screening to employee engagement analytics and performance prediction.',
      host: 'Sandra Williams, HR Technology Lead',
      duration: '38:30',
      publishDate: getWeeklyDate(12), // 12 weeks ago
      category: 'HR Technology',
      rating: 4.6,
      listens: '8.2K',
      topics: ['HR Automation', 'Recruitment AI', 'Employee Analytics', 'Talent Management'],
      audioUrl: '/podcasts/audio/ai-hr-recruitment-automation.mp3',
      transcriptUrl: '/podcasts/transcripts/ai-hr-recruitment-automation.txt',
      featured: true
    },
    {
      id: 'ai-manufacturing-industry-40',
      title: 'Industry 4.0: AI Automation in Manufacturing',
      description: 'Exploring AI applications in smart manufacturing, including predictive maintenance, quality control, and supply chain optimization.',
      host: 'Carlos Rodriguez, Manufacturing AI Expert',
      duration: '44:10',
      publishDate: getWeeklyDate(13), // 13 weeks ago
      category: 'Manufacturing',
      rating: 4.8,
      listens: '6.7K',
      topics: ['Industry 4.0', 'Smart Manufacturing', 'Predictive Maintenance', 'Supply Chain'],
      audioUrl: '/podcasts/audio/ai-manufacturing-industry-40.mp3',
      featured: false
    },
    {
      id: 'ai-ecommerce-personalization',
      title: 'AI E-commerce Automation: Personalization and Conversion Optimization',
      description: 'How AI is driving e-commerce growth through personalized shopping experiences, automated customer journeys, and dynamic pricing.',
      host: 'Nicole Chen, E-commerce AI Consultant',
      duration: '42:55',
      publishDate: getWeeklyDate(14), // 14 weeks ago
      category: 'E-commerce',
      rating: 4.7,
      listens: '10.5K',
      topics: ['E-commerce AI', 'Personalization', 'Conversion Optimization', 'Customer Journey'],
      audioUrl: '/podcasts/audio/ai-ecommerce-personalization.mp3',
      transcriptUrl: '/podcasts/transcripts/ai-ecommerce-personalization.txt',
      featured: true
    }
  ];

  const categories = ['all', ...Array.from(new Set(podcasts.map(p => p.category)))];

  const filteredPodcasts = podcasts
    .filter(podcast => {
      const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           podcast.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           podcast.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || podcast.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'popular':
          return parseFloat(b.listens.replace('K', '')) - parseFloat(a.listens.replace('K', ''));
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const featuredPodcasts = podcasts.filter(p => p.featured).slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubscribe = (formData: any) => {
    console.log('Podcast subscription:', formData);
    // Additional tracking or actions can be added here
  };

  return (
    <>
      <Head>
        <title>AI & Automation Podcasts - Expert Insights | SiteOptz.ai</title>
        <meta 
          name="description" 
          content="Discover the latest AI and automation podcasts featuring expert insights, case studies, and practical strategies for implementing AI tools in your business. Weekly episodes covering ChatGPT, Claude, no-code AI, and enterprise automation." 
        />
        <meta name="keywords" content="AI podcasts, automation podcasts, AI tools, business automation, artificial intelligence, ChatGPT, Claude AI, no-code AI, enterprise AI, machine learning podcasts" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://siteoptz.ai/podcasts" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="AI & Automation Podcasts - Expert Insights | SiteOptz.ai" />
        <meta property="og:description" content="Discover the latest AI and automation podcasts featuring expert insights, case studies, and practical strategies for implementing AI tools in your business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/podcasts" />
        <meta property="og:site_name" content="SiteOptz.ai" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Mic className="w-8 h-8 text-cyan-400 mr-3" />
              <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">AI & Automation Podcasts</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Expert Insights on AI Tools
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Stay ahead of the AI revolution with weekly episodes featuring industry experts, practical strategies, 
              and real-world case studies on AI tools and automation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400">
              <div className="flex items-center">
                <Headphones className="w-5 h-5 mr-2" />
                <span>15 Episodes</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>Weekly Updates</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>50K+ Listeners</span>
              </div>
            </div>
          </div>

          {/* Featured Podcasts */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Star className="w-6 h-6 text-yellow-400 mr-2" />
              Featured Episodes
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPodcasts.map((podcast) => (
                <div key={podcast.id} className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      Featured
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="text-sm">{podcast.rating}</span>
                    </div>
                  </div>
                  <Link href={`/podcasts/${podcast.id}`}>
                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 hover:text-cyan-400 transition-colors cursor-pointer">
                      {podcast.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {podcast.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {podcast.duration}
                    </div>
                    <div className="flex items-center">
                      <Headphones className="w-4 h-4 mr-1" />
                      {podcast.listens}
                    </div>
                  </div>
                  <Link href={`/podcasts/${podcast.id}`} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-colors flex items-center justify-center">
                    <Play className="w-4 h-4 mr-2" />
                    Listen Now
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-black border border-gray-800 rounded-xl p-6 mb-12">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search podcasts, topics, or hosts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                >
                  <option value="latest">Latest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Podcasts List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-cyan-400 mr-2" />
              All Episodes ({filteredPodcasts.length})
            </h2>
            {filteredPodcasts.map((podcast) => (
              <div key={podcast.id} className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                <div className="grid lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="bg-gray-800 text-cyan-400 text-xs px-3 py-1 rounded-full">
                          {podcast.category}
                        </span>
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-4 h-4 mr-1 fill-current" />
                          <span className="text-sm">{podcast.rating}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(podcast.publishDate)}
                      </div>
                    </div>
                    
                    <Link href={`/podcasts/${podcast.id}`}>
                      <h3 className="text-xl font-semibold text-white mb-3 hover:text-cyan-400 transition-colors cursor-pointer">
                        {podcast.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {podcast.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="mr-4">Hosted by {podcast.host}</span>
                      <div className="flex items-center mr-4">
                        <Clock className="w-4 h-4 mr-1" />
                        {podcast.duration}
                      </div>
                      <div className="flex items-center">
                        <Headphones className="w-4 h-4 mr-1" />
                        {podcast.listens} listens
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {podcast.topics.map((topic) => (
                        <span key={topic} className="text-xs bg-gray-900 text-gray-300 px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1 flex lg:flex-col gap-3">
                    <Link href={`/podcasts/${podcast.id}`} className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-colors flex items-center justify-center">
                      <Play className="w-4 h-4 mr-2" />
                      Listen
                    </Link>
                    {podcast.transcriptUrl && (
                      <button className="flex-1 bg-gray-800 text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                        <Download className="w-4 h-4 mr-2" />
                        Transcript
                      </button>
                    )}
                    <button className="flex-1 bg-gray-800 text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Leadership Podcast Section */}
          <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                🎯 AI Leadership Podcast: Weekly Insights
              </h3>
              <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
                Join thousands of business leaders getting actionable AI strategies, tool recommendations, 
                and implementation guides delivered weekly. Transform your business with expert insights.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Weekly Insights</h4>
                <p className="text-gray-400">Fresh AI strategies and tool reviews every week</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Expert Guests</h4>
                <p className="text-gray-400">Industry leaders sharing real-world experiences</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Free Resources</h4>
                <p className="text-gray-400">Implementation guides, templates, and frameworks</p>
              </div>
            </div>
            
            <div className="text-center">
              <Link
                href="/resources"
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors mr-4"
              >
                <Download className="w-5 h-5 mr-2" />
                Get Free AI Resources
              </Link>
              <button
                onClick={() => setShowSubscribeModal(true)}
                className="inline-flex items-center bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                <Headphones className="w-5 h-5 mr-2" />
                Subscribe to Podcast
              </button>
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="mt-16 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Never Miss an Episode
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get notified when new AI and automation podcasts are released. 
              Plus, get exclusive insights and early access to episodes.
            </p>
            <button
              onClick={() => setShowNewsletterModal(true)}
              className="inline-flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-colors"
            >
              <Headphones className="w-5 h-5 mr-2" />
              Subscribe to Our Newsletter
            </button>
          </div>
        </div>
      </main>

      {/* Podcast Subscribe Modal */}
      <PodcastSubscribeModal
        isOpen={showSubscribeModal}
        onClose={() => setShowSubscribeModal(false)}
        onSubscribe={handleSubscribe}
      />

      {/* Newsletter Subscribe Modal */}
      <LeadMagnetModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
        resourceType="playbook"
        source="podcast_newsletter"
      />
    </>
  );
}