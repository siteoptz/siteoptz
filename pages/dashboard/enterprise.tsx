import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useUserPlan } from '../../hooks/useUserPlan';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { getDashboardContent } from '../../content/dashboard-marketing-content';
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  Shield,
  BookOpen,
  TrendingUp,
  BarChart3,
  FileText,
  Phone,
  Settings,
  Share,
  Download,
  Play,
  Clock,
  Star,
  ArrowRight,
  Filter,
  Crown,
  Zap,
  User,
  Video,
  MessageSquare,
  Target,
  Globe,
  Code,
  Award,
  Briefcase,
  Headphones,
  AlertCircle,
  Layers,
  Database,
  Building2,
  Rocket,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function EnterpriseDashboard() {
  const { userPlan, loading } = useUserPlan();
  const [activeTab, setActiveTab] = useState('overview');
  const enterpriseContent = getDashboardContent('enterprise');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userPlan || userPlan.plan !== 'enterprise') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-300">This page is for Enterprise plan users only.</p>
          <Link href="/dashboard" className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <Crown className="w-8 h-8 text-amber-400 mr-3" />
            {enterpriseContent.hero.title}
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            {enterpriseContent.hero.subtitle}
          </p>
          <p className="text-lg text-gray-400 mb-8">
            {enterpriseContent.hero.description}
          </p>
          
          {/* Elite Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {enterpriseContent.hero.stats.map((stat, index) => {
              const colors = ['text-cyan-400', 'text-green-400', 'text-purple-400', 'text-yellow-400'];
              return (
                <div key={index} className="bg-black border border-gray-800 rounded-xl p-6 text-center">
                  <div className={`text-3xl font-bold ${colors[index]} mb-2`}>{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-800">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {['overview', 'consulting', 'development', 'briefings', 'white-label', 'team'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                  }`}
                >
                  {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Unlimited Executive Advisory */}
            <div className="bg-black border border-gray-800 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{enterpriseContent.features.unlimitedConsulting.title}</h2>
                  <p className="text-gray-300">{enterpriseContent.features.unlimitedConsulting.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                {enterpriseContent.features.unlimitedConsulting.description}
              </p>
              
              {/* Advisory Board */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {enterpriseContent.features.unlimitedConsulting.advisors.map((advisor, index) => (
                  <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {advisor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-purple-400">{advisor.name}</h4>
                        <p className="text-gray-300 text-sm">{advisor.title}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{advisor.background}</p>
                    <p className="text-xs text-gray-500 mb-2">{advisor.expertise}</p>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                      {advisor.availability}
                    </span>
                  </div>
                ))}
              </div>

              {/* Consulting Metrics */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-amber-400">Market Rate</h4>
                  <p className="text-xl font-bold text-white">{enterpriseContent.features.unlimitedConsulting.metrics.consultingValue}</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-blue-400">Average Usage</h4>
                  <p className="text-xl font-bold text-white">{enterpriseContent.features.unlimitedConsulting.metrics.averageUsage}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-green-400">Satisfaction</h4>
                  <p className="text-xl font-bold text-white">{enterpriseContent.features.unlimitedConsulting.metrics.clientSatisfaction}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-purple-400">ROI Multiplier</h4>
                  <p className="text-xl font-bold text-white">{enterpriseContent.features.unlimitedConsulting.metrics.roiMultiplier}</p>
                </div>
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                {enterpriseContent.features.unlimitedConsulting.cta.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{enterpriseContent.features.unlimitedConsulting.cta.subtext}</p>
            </div>

            {/* Your AI Transformation Office */}
            <div className="bg-black border border-gray-800 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <Building2 className="w-8 h-8 text-blue-400 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{enterpriseContent.features.dedicatedTeam.title}</h2>
                  <p className="text-gray-300">{enterpriseContent.features.dedicatedTeam.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                {enterpriseContent.features.dedicatedTeam.description}
              </p>

              {/* Dedicated Team */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {enterpriseContent.features.dedicatedTeam.team.map((member, index) => (
                  <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400">{member.role}</h4>
                    <p className="text-white font-medium">{member.name}</p>
                    <p className="text-sm text-gray-300 mb-2">{member.dedication}</p>
                    <p className="text-xs text-gray-400 mb-2">{member.expertise}</p>
                    <p className="text-xs text-green-400">Value: {member.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-white mb-2">Total Dedicated Resources</h4>
                <p className="text-2xl font-bold text-green-400">{enterpriseContent.features.dedicatedTeam.totalValue}</p>
                <p className="text-sm text-green-300">Exclusively for your account</p>
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all">
                {enterpriseContent.features.dedicatedTeam.cta.text}
                <Users className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{enterpriseContent.features.dedicatedTeam.cta.subtext}</p>
            </div>
          </div>
        )}

        {/* Consulting Tab */}
        {activeTab === 'consulting' && (
          <div className="space-y-8">
            {/* Current Project */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Rocket className="w-6 h-6 text-orange-400 mr-2" />
                Active Development Projects
              </h2>
              
              {enterpriseContent.features.customDevelopment.currentProjects.map((project, index) => (
                <div key={index} className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{project.name}</h3>
                    <span className="text-orange-400 font-medium">{project.progress}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                    <div className="bg-orange-500 h-3 rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Completion:</span>
                      <span className="text-white ml-2">{project.completion}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Projected Impact:</span>
                      <span className="text-green-400 ml-2 font-semibold">{project.projectedImpact}</span>
                    </div>
                  </div>
                </div>
              ))}

              <button className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all mt-4">
                View Project Details
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Development Tab */}
        {activeTab === 'development' && (
          <div className="space-y-8">
            {/* Proprietary AI Development Lab */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Code className="w-6 h-6 text-green-400 mr-2" />
                {enterpriseContent.features.customDevelopment.title}
              </h2>
              <p className="text-gray-300 text-sm mb-2">{enterpriseContent.features.customDevelopment.subtitle}</p>
              <p className="text-gray-400 mb-6">{enterpriseContent.features.customDevelopment.description}</p>

              {/* Development Capabilities */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {enterpriseContent.features.customDevelopment.capabilities.map((capability, index) => (
                  <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">{capability.service}</h4>
                    <p className="text-sm text-gray-300 mb-1">Market Value: {capability.value}</p>
                    <p className="text-sm text-gray-400 mb-2">Timeline: {capability.timeline}</p>
                    <p className="text-xs text-green-300">{capability.impact}</p>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all">
                {enterpriseContent.features.customDevelopment.cta.text}
                <Sparkles className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{enterpriseContent.features.customDevelopment.cta.subtext}</p>
            </div>
          </div>
        )}

        {/* Executive Briefings Tab */}
        {activeTab === 'briefings' && (
          <div className="space-y-8">
            {/* C-Suite Intelligence Network */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Crown className="w-6 h-6 text-amber-400 mr-2" />
                {enterpriseContent.features.executiveBriefings.title}
              </h2>
              <p className="text-gray-300 text-sm mb-2">{enterpriseContent.features.executiveBriefings.subtitle}</p>
              <p className="text-gray-400 mb-6">{enterpriseContent.features.executiveBriefings.description}</p>

              {/* Upcoming Event */}
              <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/20 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">{enterpriseContent.features.executiveBriefings.upcoming.event}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-amber-400 mb-2">Event Details</h4>
                    <p className="text-gray-300 mb-1">Date: {enterpriseContent.features.executiveBriefings.upcoming.date}</p>
                    <p className="text-gray-300 mb-1">Location: {enterpriseContent.features.executiveBriefings.upcoming.location}</p>
                    <p className="text-gray-400 text-sm">{enterpriseContent.features.executiveBriefings.upcoming.exclusivity}</p>
                    <p className="text-green-400 text-sm font-semibold">{enterpriseContent.features.executiveBriefings.upcoming.value}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-400 mb-2">Key Topics</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      {enterpriseContent.features.executiveBriefings.upcoming.topics.map((topic, index) => (
                        <li key={index} className="flex items-center">
                          <Target className="w-3 h-3 text-amber-400 mr-2" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all">
                {enterpriseContent.features.executiveBriefings.cta.text}
                <Calendar className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{enterpriseContent.features.executiveBriefings.cta.subtext}</p>
            </div>

            {/* Exclusive Industry Intelligence */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Globe className="w-6 h-6 text-cyan-400 mr-2" />
                {enterpriseContent.exclusiveAccess.title}
              </h3>
              <p className="text-gray-300 text-sm mb-6">{enterpriseContent.exclusiveAccess.subtitle}</p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {enterpriseContent.exclusiveAccess.sections.map((section, index) => (
                  <div key={index} className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-400 mb-2">{section.name}</h4>
                    <p className="text-gray-300 text-sm mb-2">{section.description}</p>
                    <p className="text-xs text-gray-400">
                      {section.currentAccess ? `Current Access: ${section.currentAccess.join(', ')}` : 
                       section.recentIntel ? `Recent: ${section.recentIntel}` :
                       section.value}
                    </p>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all">
                {enterpriseContent.exclusiveAccess.cta.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{enterpriseContent.exclusiveAccess.cta.subtext}</p>
            </div>
          </div>
        )}

        {/* White-Label Tab */}
        {activeTab === 'white-label' && (
          <div className="space-y-8">
            {/* White-Label AI Platform */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Award className="w-6 h-6 text-yellow-400 mr-2" />
                {enterpriseContent.features.whiteLabel.title}
              </h2>
              <p className="text-gray-300 text-sm mb-2">{enterpriseContent.features.whiteLabel.subtitle}</p>
              <p className="text-gray-400 mb-6">{enterpriseContent.features.whiteLabel.description}</p>

              {/* Platform Options */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {enterpriseContent.features.whiteLabel.options.map((option, index) => (
                  <div key={index} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">{option.model}</h4>
                    <p className="text-sm text-gray-300 mb-1">Setup: {option.setup}</p>
                    <p className="text-sm text-gray-400 mb-2">Support: {option.support}</p>
                    <p className="text-xs text-green-400">Revenue: {option.revenue}</p>
                  </div>
                ))}
              </div>

              {/* Success Story */}
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/20 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-400 mb-2">Success Story</h4>
                <p className="text-white font-medium">{enterpriseContent.features.whiteLabel.successStory.client}</p>
                <p className="text-green-300">{enterpriseContent.features.whiteLabel.successStory.result}</p>
                <p className="text-sm text-gray-400">{enterpriseContent.features.whiteLabel.successStory.timeline}</p>
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-amber-700 transition-all">
                {enterpriseContent.features.whiteLabel.cta.text}
                <Shield className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{enterpriseContent.features.whiteLabel.cta.subtext}</p>
            </div>
          </div>
        )}

        {/* Team Tab - using existing structure */}
        {activeTab === 'team' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Enterprise Team Management</h2>
              <p className="text-gray-400 mb-4">
                Manage your unlimited team members and organizational structure.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Manage Team Access
              </button>
            </div>
          </div>
        )}

        {/* Enterprise Excellence Footer */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">AI Leadership Circle Excellence</h3>
          <p className="text-xl text-amber-100 mb-6">
            You&apos;re not just using AI—you&apos;re defining the future of your industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-600 px-8 py-3 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors">
              Schedule Executive Review
            </button>
            <button className="bg-white/20 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-white/30 transition-colors">
              Contact Your Advisory Board
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/#login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};