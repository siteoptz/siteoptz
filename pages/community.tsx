import React from 'react';
import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import CommunitySection from '../components/CommunitySection';
import DiscordWidget from '../components/DiscordWidget';
import { 
  getPageConfig, 
  buildCanonicalUrl 
} from '../seo/meta-config.js';
import { 
  MessageCircle, 
  Users, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Heart,
  Shield,
  Award,
  Target,
  BookOpen,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface CommunityPageProps {}

export default function CommunityPage({}: CommunityPageProps) {
  const pageConfig = getPageConfig('community');

  const communityBenefits = [
    {
      icon: MessageCircle,
      title: "Real-time AI Tool Discussions",
      description: "Get instant feedback and insights from 500+ active community members discussing the latest AI tools and implementations."
    },
    {
      icon: Users,
      title: "Expert Implementation Help",
      description: "Connect with AI implementation experts, business leaders, and technical specialists who can guide your AI transformation journey."
    },
    {
      icon: TrendingUp,
      title: "Early Access to New Tools",
      description: "Be the first to discover and test cutting-edge AI tools before they go mainstream. Get beta access and exclusive previews."
    },
    {
      icon: Zap,
      title: "Workflow Optimization",
      description: "Share and discover AI-powered workflows that actually drive business results. Learn from real-world implementations."
    },
    {
      icon: Shield,
      title: "Implementation Support",
      description: "Get help with technical integrations, troubleshooting, and optimization from experienced AI practitioners."
    },
    {
      icon: Award,
      title: "Community Recognition",
      description: "Earn badges and recognition for helping others, sharing valuable insights, and contributing to the community."
    }
  ];

  const channelHighlights = [
    {
      name: "General Chat",
      description: "Open discussions about AI tools, business challenges, and industry trends",
      icon: MessageCircle,
      members: "500+",
      activity: "Very Active"
    },
    {
      name: "Tool Discoveries",
      description: "Share and discuss newly discovered AI tools and their potential applications",
      icon: TrendingUp,
      members: "300+",
      activity: "Active"
    },
    {
      name: "Implementation Help",
      description: "Get technical support and guidance for AI tool implementations",
      icon: Zap,
      members: "200+",
      activity: "Active"
    },
    {
      name: "Workflow Showcase",
      description: "Share your AI-powered workflows and learn from others&apos; success stories",
      icon: Target,
      members: "150+",
      activity: "Growing"
    }
  ];

  const upcomingEvents = [
    {
      title: "Weekly AI Tool Spotlight",
      date: "Every Friday",
      time: "2:00 PM EST",
      description: "Community-driven showcase of the most interesting AI tools discovered this week",
      type: "Regular Event"
    },
    {
      title: "AI Implementation Q&A",
      date: "First Tuesday",
      time: "3:00 PM EST", 
      description: "Monthly Q&A session with AI implementation experts",
      type: "Monthly Event"
    },
    {
      title: "Tool Comparison Deep Dive",
      date: "Third Thursday",
      time: "1:00 PM EST",
      description: "Detailed comparison of popular AI tools with real-world use cases",
      type: "Monthly Event"
    }
  ];

  const communityStats = [
    { label: "Active Members", value: "500+", icon: Users },
    { label: "Daily Messages", value: "1,200+", icon: MessageCircle },
    { label: "Tools Discussed", value: "200+", icon: TrendingUp },
    { label: "Success Stories", value: "50+", icon: Star }
  ];

  return (
    <>
      <SEOHead
        title={pageConfig.title}
        description={pageConfig.description}
        keywords={pageConfig.keywords}
        canonicalUrl={buildCanonicalUrl('/community')}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SiteOptz AI Community",
          "url": "https://siteoptz.ai/community",
          "description": pageConfig.description,
          "sameAs": [
            "https://discord.gg/siteoptz"
          ]
        }}
      />

      <div className="bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden pt-16 lg:pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-8">
              <MessageCircle className="w-4 h-4" />
              Join 500+ AI Professionals
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              SiteOptz AI Tools Community
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Connect with AI enthusiasts, business leaders, and implementation experts. 
              Share discoveries, get help, and turn AI into ROI together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="https://discord.gg/siteoptz"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                Join Discord Community
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="text-sm text-gray-400">
                ✓ Free to join • ✓ No spam • ✓ Expert discussions
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {communityStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Community Benefits */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Join Our Community?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our Discord community is more than just a chat room - it&apos;s a hub for AI innovation, 
                knowledge sharing, and professional growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communityBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="bg-black border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Channel Highlights */}
        <section className="relative z-10 py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Popular Community Channels
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Find your niche and connect with like-minded professionals in our specialized channels.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {channelHighlights.map((channel, index) => {
                const IconComponent = channel.icon;
                return (
                  <div key={index} className="bg-black border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{channel.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>{channel.members} members</span>
                            <span>•</span>
                            <span className="text-green-400">{channel.activity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">{channel.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Community Events & Activities
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join our regular events and activities designed to help you stay ahead of the AI curve.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-blue-400 font-medium">{event.type}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{event.date} at {event.time}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Discord Widget */}
        <section className="relative z-10 py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Join the Conversation
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                See what&apos;s happening in our community right now and join the discussion.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <DiscordWidget />
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Community Guidelines
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We maintain a professional, respectful environment where everyone can learn and grow together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-black border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  What We Encourage
                </h3>
                <ul className="space-y-4">
                  {[
                    "Sharing AI tool discoveries and real-world experiences",
                    "Helping others with implementation challenges and questions", 
                    "Posting detailed tool comparisons and honest reviews",
                    "Collaborating on AI workflow optimization and automation",
                    "Asking questions and seeking guidance from experts",
                    "Sharing success stories and lessons learned"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Shield className="w-6 h-6 text-blue-400 mr-3" />
                  Community Rules
                </h3>
                <ul className="space-y-4">
                  {[
                    "Be respectful and professional in all discussions",
                    "Stay on topic - focus on AI tools and business impact",
                    "No spam, excessive self-promotion, or off-topic content",
                    "Follow Discord's Terms of Service and community standards",
                    "Use appropriate channels for different types of discussions",
                    "Help maintain a positive, inclusive environment for all members"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative z-10 py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join the AI Revolution?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Connect with 500+ AI professionals, get instant help with implementations, 
              and discover the tools that will transform your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://discord.gg/siteoptz"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                Join Discord Community
                <ExternalLink className="w-5 h-5" />
              </a>
              <div className="text-sm text-gray-400">
                ✓ Free to join • ✓ 500+ members • ✓ Expert discussions
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};
