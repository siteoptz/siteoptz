import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import WebinarRegistrationModal from '../components/WebinarRegistrationModal';
import { 
  Calendar,
  Clock,
  Users,
  Play,
  Video,
  Bookmark,
  Download,
  ExternalLink,
  Star,
  CheckCircle,
  ArrowRight,
  Filter,
  Search,
  Globe,
  Award,
  TrendingUp,
  User,
  Mail,
  Phone,
  Zap
} from 'lucide-react';

export default function Webinars() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState(null);

  const upcomingWebinars = [
    {
      title: "AI Implementation Strategy for Enterprise: From Vision to ROI",
      description: "Learn how Fortune 500 companies are successfully implementing AI solutions and measuring measurable business impact. Includes case studies and live Q&A.",
      date: "February 15, 2025",
      time: "2:00 PM EST",
      duration: "60 minutes",
      speaker: "Sarah Chen, VP AI Strategy",
      speakerImage: "/images/speakers/sarah-chen.jpg",
      category: "Strategy",
      level: "Executive",
      attendees: 1250,
      featured: true,
      registrationUrl: "/webinars/register/ai-implementation-strategy",
      topics: ["AI Strategy", "Enterprise Implementation", "ROI Measurement", "Case Studies"]
    },
    {
      title: "ChatGPT vs Claude vs Gemini: Complete Business Comparison 2025",
      description: "Side-by-side comparison of leading AI assistants for business use. Practical demonstrations, pricing analysis, and use case recommendations.",
      date: "February 22, 2025", 
      time: "1:00 PM EST",
      duration: "45 minutes",
      speaker: "Dr. Michael Rodriguez, AI Researcher",
      speakerImage: "/images/speakers/michael-rodriguez.jpg",
      category: "Tools",
      level: "Beginner",
      attendees: 890,
      registrationUrl: "/webinars/register/ai-tools-comparison",
      topics: ["AI Tools", "Comparison", "Business Applications", "Cost Analysis"]
    },
    {
      title: "AI-Powered Customer Service: Implementation Workshop",
      description: "Hands-on workshop covering chatbot setup, workflow automation, and customer experience optimization. Includes templates and implementation guides.",
      date: "March 1, 2025",
      time: "3:00 PM EST", 
      duration: "90 minutes",
      speaker: "Lisa Park, Customer Experience Director",
      speakerImage: "/images/speakers/lisa-park.jpg",
      category: "Implementation",
      level: "Intermediate",
      attendees: 650,
      registrationUrl: "/webinars/register/ai-customer-service-workshop",
      topics: ["Customer Service", "Chatbots", "Automation", "Implementation"]
    }
  ];

  const onDemandWebinars = [
    {
      title: "AI Content Marketing Masterclass: 10x Your Output",
      description: "Complete guide to using AI for content creation, SEO optimization, and marketing automation. Recorded live with 500+ marketers.",
      duration: "75 minutes",
      speaker: "Amanda Foster, Content Marketing Expert",
      category: "Marketing",
      level: "Intermediate",
      views: 15200,
      rating: 4.9,
      recordedDate: "January 2025",
      watchUrl: "/webinars/watch/ai-content-marketing-masterclass",
      downloadUrl: "/webinars/download/ai-content-marketing-resources",
      topics: ["Content Marketing", "AI Writing", "SEO", "Marketing Automation"]
    },
    {
      title: "Building Your First AI-Powered App: No-Code Solutions",
      description: "Learn to create AI applications without coding using no-code platforms. Includes live demos and step-by-step tutorials.",
      duration: "60 minutes",
      speaker: "James Kim, No-Code Specialist", 
      category: "Development",
      level: "Beginner",
      views: 8900,
      rating: 4.7,
      recordedDate: "December 2024",
      watchUrl: "/webinars/watch/no-code-ai-apps",
      downloadUrl: "/webinars/download/no-code-ai-resources",
      topics: ["No-Code", "App Development", "AI Integration", "Tutorials"]
    },
    {
      title: "AI Ethics and Compliance: Enterprise Best Practices",
      description: "Navigate AI ethics, compliance requirements, and risk management. Essential for legal, compliance, and executive teams.",
      duration: "55 minutes",
      speaker: "Dr. Rachel Thompson, AI Ethics Expert",
      category: "Compliance",
      level: "Executive", 
      views: 6500,
      rating: 4.8,
      recordedDate: "November 2024",
      watchUrl: "/webinars/watch/ai-ethics-compliance",
      downloadUrl: "/webinars/download/ai-compliance-framework",
      topics: ["AI Ethics", "Compliance", "Risk Management", "Legal"]
    },
    {
      title: "Data Analysis Revolution: AI Tools for Business Intelligence",
      description: "Transform your data analysis with AI. Covers tool selection, implementation, and creating automated insights and reports.",
      duration: "65 minutes",
      speaker: "David Chen, Data Science Director",
      category: "Analytics",
      level: "Intermediate",
      views: 11200,
      rating: 4.6,
      recordedDate: "October 2024", 
      watchUrl: "/webinars/watch/ai-data-analysis-revolution",
      downloadUrl: "/webinars/download/ai-analytics-toolkit",
      topics: ["Data Analysis", "Business Intelligence", "AI Analytics", "Reporting"]
    }
  ];

  const categories = ['All', 'Strategy', 'Tools', 'Implementation', 'Marketing', 'Development', 'Compliance', 'Analytics'];

  const handleRegistrationClick = (webinar) => {
    setSelectedWebinar(webinar);
    setShowRegistrationModal(true);
  };

  const webinarStats = [
    { number: "50+", label: "Expert Webinars" },
    { number: "25K+", label: "Total Attendees" },
    { number: "4.8/5", label: "Average Rating" },
    { number: "95%", label: "Completion Rate" }
  ];

  const speakers = [
    {
      name: "Sarah Chen",
      title: "VP AI Strategy", 
      company: "SiteOptz",
      expertise: "Enterprise AI Implementation",
      webinars: 12,
      image: "/images/speakers/sarah-chen.jpg"
    },
    {
      name: "Dr. Michael Rodriguez", 
      title: "AI Researcher",
      company: "Tech Institute",
      expertise: "AI Tools & Comparison",
      webinars: 8,
      image: "/images/speakers/michael-rodriguez.jpg"
    },
    {
      name: "Lisa Park",
      title: "Customer Experience Director",
      company: "AI Solutions Corp",
      expertise: "Customer Service AI",
      webinars: 6,
      image: "/images/speakers/lisa-park.jpg"
    }
  ];

  const filteredOnDemand = onDemandWebinars.filter(webinar => {
    const matchesCategory = selectedFilter === 'All' || webinar.category === selectedFilter;
    const matchesSearch = webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         webinar.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Webinars & Training Sessions",
    "description": "Join expert-led AI webinars covering implementation, tools, strategy, and best practices. Live sessions and on-demand recordings available.",
    "url": "https://siteoptz.ai/webinars",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": upcomingWebinars.length + onDemandWebinars.length,
      "itemListElement": [...upcomingWebinars, ...onDemandWebinars].map((webinar, index) => ({
        "@type": "Event",
        "position": index + 1,
        "name": webinar.title,
        "description": webinar.description,
        "startDate": (webinar as any).date || (webinar as any).recordedDate,
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "organizer": {
          "@type": "Organization",
          "name": "SiteOptz"
        }
      }))
    }
  };

  return (
    <>
      <Head>
        <title>AI Webinars & Training Sessions - Expert-Led Learning | SiteOptz</title>
        <meta 
          name="description" 
          content="Join expert-led AI webinars covering implementation, tools, strategy, and best practices. 50+ sessions with 25K+ attendees. Live and on-demand options available." 
        />
        <meta 
          name="keywords" 
          content="AI webinars, AI training sessions, AI implementation training, AI tools training, AI strategy webinars, AI education, online AI courses" 
        />
        <link rel="canonical" href="https://siteoptz.ai/webinars" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Expert AI Webinars & Training Sessions | SiteOptz" />
        <meta property="og:description" content="Learn from AI experts through live webinars and on-demand training sessions. 50+ sessions covering strategy, implementation, and best practices." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/webinars" />
        <meta property="og:image" content="https://siteoptz.ai/images/webinars-og.jpg" />
        
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
                AI Webinars & Training
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Learn from AI experts through live webinars and on-demand training sessions. 
                Master AI implementation, tools, and strategies with hands-on guidance.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {webinarStats.map((stat, index) => (
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

        {/* Upcoming Webinars */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Upcoming Live Webinars
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Register for upcoming expert-led sessions and interact with speakers in real-time.
              </p>
            </div>
            
            <div className="space-y-8">
              {upcomingWebinars.map((webinar, index) => (
                <div
                  key={index}
                  className={`bg-black border rounded-2xl p-8 hover:border-cyan-400 transition-all ${
                    webinar.featured ? 'border-cyan-400 ring-1 ring-cyan-400/20' : 'border-gray-800'
                  }`}
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center mb-4">
                        {webinar.featured && (
                          <span className="px-3 py-1 bg-cyan-600 text-white text-sm rounded-full mr-3">
                            Featured
                          </span>
                        )}
                        <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                          {webinar.category}
                        </span>
                        <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full ml-2">
                          {webinar.level}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {webinar.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {webinar.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {webinar.topics.map((topic, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-400 mb-6">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {webinar.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {webinar.time} ({webinar.duration})
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {webinar.attendees} registered
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{webinar.speaker}</div>
                          <div className="text-gray-400 text-sm">Speaker & Expert</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-1">
                      <div className="bg-gray-900 rounded-xl p-6 text-center">
                        <div className="text-2xl font-bold text-white mb-2">Free Registration</div>
                        <div className="text-gray-400 text-sm mb-4">Secure your spot today</div>
                        
                        <button
                          onClick={() => handleRegistrationClick(webinar)}
                          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold flex items-center justify-center mb-4"
                        >
                          Register Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                        
                        <div className="space-y-2 text-sm text-gray-400">
                          <div className="flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                            Live Q&A Session
                          </div>
                          <div className="flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                            Recording Access
                          </div>
                          <div className="flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                            Resource Downloads
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Section for On-Demand */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  On-Demand Webinars
                </h2>
                <p className="text-gray-300">Watch expert sessions anytime, anywhere</p>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search webinars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedFilter(category)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedFilter === category
                          ? 'bg-cyan-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* On-Demand Webinars */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {filteredOnDemand.map((webinar, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-all hover:transform hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                        {webinar.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                        {webinar.level}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      {webinar.rating}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {webinar.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {webinar.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {webinar.topics.map((topic, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {webinar.duration}
                    </div>
                    <div className="flex items-center">
                      <Play className="w-4 h-4 mr-1" />
                      {webinar.views.toLocaleString()} views
                    </div>
                    <div className="text-xs">{webinar.recordedDate}</div>
                  </div>
                  
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-gray-300">
                        By {webinar.speaker}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link
                        href={webinar.watchUrl}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-sm font-medium flex items-center"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Now
                      </Link>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={webinar.downloadUrl}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Speakers */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Expert Speakers
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Learn from industry leaders and AI experts with real-world implementation experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6 text-center hover:border-cyan-400 transition-colors"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {speaker.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {speaker.name}
                  </h3>
                  <div className="text-cyan-400 font-medium mb-1">
                    {speaker.title}
                  </div>
                  <div className="text-gray-400 text-sm mb-3">
                    {speaker.company}
                  </div>
                  <div className="text-gray-300 text-sm mb-4">
                    {speaker.expertise}
                  </div>
                  <div className="text-xs text-gray-500">
                    {speaker.webinars} webinars delivered
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Want to Host a Webinar?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Share your AI expertise with our community of 25K+ business professionals and AI practitioners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Become a Speaker
                </Link>
                <Link
                  href="/resources"
                  className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  Explore Resources
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Webinar Registration Modal */}
      <WebinarRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        webinar={selectedWebinar}
      />
    </>
  );
}