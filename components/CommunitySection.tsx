import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MessageCircle, 
  Users, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Heart
} from 'lucide-react';

interface CommunitySectionProps {
  className?: string;
  showFullSection?: boolean;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ 
  className = '', 
  showFullSection = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const communityStats = [
    {
      icon: Users,
      value: "500+",
      label: "Active Members",
      color: "text-blue-400"
    },
    {
      icon: MessageCircle,
      value: "1,200+",
      label: "Daily Messages",
      color: "text-green-400"
    },
    {
      icon: TrendingUp,
      value: "50+",
      label: "New Tools Weekly",
      color: "text-purple-400"
    },
    {
      icon: Star,
      value: "98%",
      label: "Satisfaction Rate",
      color: "text-yellow-400"
    }
  ];

  const communityFeatures = [
    {
      icon: MessageCircle,
      title: "Real-time AI Tool Discussions",
      description: "Get instant feedback on AI tools from 500+ active community members"
    },
    {
      icon: Users,
      title: "Expert Implementation Help",
      description: "Connect with AI implementation experts and get personalized guidance"
    },
    {
      icon: TrendingUp,
      title: "Early Access to New Tools",
      description: "Be the first to discover and test cutting-edge AI tools before they go mainstream"
    },
    {
      icon: Zap,
      title: "Workflow Optimization",
      description: "Share and discover AI-powered workflows that actually drive business results"
    }
  ];

  const recentDiscussions = [
    {
      topic: "Best AI tools for e-commerce automation?",
      replies: 23,
      time: "2 hours ago",
      category: "E-commerce"
    },
    {
      topic: "ChatGPT vs Claude for content creation - real results",
      replies: 45,
      time: "4 hours ago", 
      category: "Content Creation"
    },
    {
      topic: "Just implemented Midjourney for product photos - 300% ROI",
      replies: 18,
      time: "6 hours ago",
      category: "Image Generation"
    },
    {
      topic: "AI coding tools comparison: Copilot vs Cursor vs Replit",
      replies: 31,
      time: "8 hours ago",
      category: "Code Generation"
    }
  ];

  if (!showFullSection) {
    return (
      <div className={`bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Join Our AI Community</h3>
              <p className="text-sm text-gray-400">500+ members discussing AI tools</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {communityStats.slice(0, 2).map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
        <a
          href="https://discord.gg/siteoptz"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold text-center block hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          Join Discord Community
        </a>
      </div>
    );
  }

  return (
    <section className={`py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            Join 500+ AI Professionals
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Connect with the AI Tools Community
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join our Discord community of AI enthusiasts, business leaders, and implementation experts. 
            Share discoveries, get help, and turn AI into ROI together.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Features */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Why Join Our Community?</h3>
            <div className="space-y-6">
              {communityFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <a
                href="https://discord.gg/siteoptz"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                Join Discord Community
                <ArrowRight className={`w-5 h-5 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
              </a>
              <p className="text-sm text-gray-400 mt-3">
                ✓ Free to join • ✓ No spam • ✓ Expert discussions
              </p>
            </div>
          </div>

          {/* Right Column - Recent Discussions */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Recent Community Discussions</h3>
            <div className="space-y-4">
              {recentDiscussions.map((discussion, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-all duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-semibold text-sm leading-tight">{discussion.topic}</h4>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{discussion.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                      {discussion.category}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-400 text-xs">
                      <MessageCircle className="w-3 h-3" />
                      <span>{discussion.replies} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <a
                href="https://discord.gg/siteoptz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center justify-center space-x-1"
              >
                <span>View all discussions</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mt-16 bg-black border border-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Community Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">What We Encourage</h4>
              <ul className="space-y-3">
                {[
                  "Sharing AI tool discoveries and experiences",
                  "Helping others with implementation challenges", 
                  "Posting detailed tool comparisons and reviews",
                  "Collaborating on AI workflow optimization"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Community Rules</h4>
              <ul className="space-y-3">
                {[
                  "Be respectful and professional in all discussions",
                  "Stay on topic - focus on AI tools and business impact",
                  "No spam or excessive self-promotion",
                  "Follow Discord's Terms of Service"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
