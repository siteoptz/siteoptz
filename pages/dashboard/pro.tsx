import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useUserPlan } from '../../hooks/useUserPlan';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { getDashboardContent, getUpgradePrompt } from '../../content/dashboard-marketing-content';
import { UpgradePrompt } from '../../components/UpgradePrompt';
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  Crown,
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
  Shield,
  Zap,
  User,
  Video,
  MessageSquare,
  Target,
  Globe,
  Code,
  Award,
  Building2,
  Rocket
} from 'lucide-react';
import Link from 'next/link';

export default function ProDashboard() {
  const { userPlan, loading } = useUserPlan();
  const [activeTab, setActiveTab] = useState('overview');
  const proContent = getDashboardContent('pro') as any;
  const enterpriseUpgrade = getUpgradePrompt('pro', 'enterprise') as any;

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

  if (!userPlan || userPlan.plan !== 'pro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-300">This page is for Pro plan users only.</p>
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
            <Crown className="w-8 h-8 text-purple-400 mr-3" />
            {proContent.hero.title}
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            {proContent.hero.subtitle}
          </p>
          <p className="text-lg text-gray-400 mb-8">
            {proContent.hero.description}
          </p>
          
          {/* Elite Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {proContent.hero.stats.map((stat, index) => {
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
            <nav className="-mb-px flex space-x-8">
              {['overview', 'consulting', 'reports', 'team', 'support'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-purple-400 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Executive AI Advisory Board */}
            <div className="bg-black border border-gray-800 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <User className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{proContent.features.consulting.title}</h2>
                  <p className="text-gray-300">{proContent.features.consulting.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                {proContent.features.consulting.description}
              </p>
              
              {/* Session Types */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {proContent.features.consulting.sessions.map((session, index) => (
                  <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-400 mb-2">{session.type}</h4>
                    <p className="text-sm text-gray-300 mb-1">{session.duration}</p>
                    <p className="text-xs text-gray-400 mb-2">Value: {session.value}</p>
                    <p className="text-xs text-gray-500">{session.outcome}</p>
                  </div>
                ))}
              </div>

              {/* Next Session */}
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-white mb-2">Next Available Session</h4>
                <p className="text-purple-300">{proContent.features.consulting.nextSession.consultant}</p>
                <p className="text-sm text-gray-400">{proContent.features.consulting.nextSession.credentials}</p>
                <p className="text-sm text-blue-400">{proContent.features.consulting.nextSession.availability}</p>
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                {proContent.features.consulting.cta.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{proContent.features.consulting.cta.subtext}</p>
            </div>

            {/* Board-Ready Intelligence Reports */}
            <div className="bg-black border border-gray-800 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-blue-400 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{proContent.features.customReports.title}</h2>
                  <p className="text-gray-300">{proContent.features.customReports.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                {proContent.features.customReports.description}
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {proContent.features.customReports.reports.map((report, index) => (
                  <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">{report.name}</h4>
                    <p className="text-sm text-gray-300 mb-1">{report.frequency}</p>
                    <p className="text-xs text-gray-400 mb-2">{report.insights}</p>
                    <p className="text-xs text-green-400">Value: {report.value}</p>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all">
                {proContent.features.customReports.cta.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{proContent.features.customReports.cta.subtext}</p>
            </div>
          </div>
        )}

        {/* Consulting Tab */}
        {activeTab === 'consulting' && (
          <div className="space-y-8">
            {/* Active Team Display */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-yellow-400 mr-2" />
                {proContent.features.prioritySupport.title}
              </h2>
              <p className="text-gray-300 text-sm mb-2">{proContent.features.prioritySupport.subtitle}</p>
              <p className="text-gray-400 mb-6">{proContent.features.prioritySupport.description}</p>

              {/* Success Team */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {proContent.features.prioritySupport.team.map((member, index) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <h4 className="text-white font-medium">{member.name}</h4>
                        <p className="text-gray-400 text-sm">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{member.background}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.availability === 'On standby' || member.availability === 'Available now' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {member.availability}
                    </span>
                  </div>
                ))}
              </div>

              {/* Team Metrics */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-green-400">Response Time</h4>
                  <p className="text-2xl font-bold text-white">{proContent.features.prioritySupport.metrics.responseTime}</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-blue-400">Satisfaction Score</h4>
                  <p className="text-2xl font-bold text-white">{proContent.features.prioritySupport.metrics.satisfactionScore}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-purple-400">Success Rate</h4>
                  <p className="text-2xl font-bold text-white">{proContent.features.prioritySupport.metrics.successRate}</p>
                </div>
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all">
                {proContent.features.prioritySupport.cta.text}
                <MessageSquare className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{proContent.features.prioritySupport.cta.subtext}</p>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-8">
            {/* Enterprise Command Center */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Building2 className="w-6 h-6 text-blue-400 mr-2" />
                {proContent.features.teamCollaboration.title}
              </h2>
              <p className="text-gray-300 text-sm mb-2">{proContent.features.teamCollaboration.subtitle}</p>
              <p className="text-gray-400 mb-6">{proContent.features.teamCollaboration.description}</p>

              {/* Capabilities */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Command Center Capabilities</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {proContent.features.teamCollaboration.capabilities.map((capability, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Live Activity</h4>
                  <p className="text-3xl font-bold text-white mb-2">{proContent.features.teamCollaboration.activeNow}</p>
                  <p className="text-blue-300 text-sm">Currently collaborating</p>
                </div>
              </div>

              <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                {proContent.features.teamCollaboration.cta.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <p className="text-xs text-gray-500 mt-2">{proContent.features.teamCollaboration.cta.subtext}</p>
            </div>
          </div>
        )}

        {/* Reports & Support Tabs - Using existing functionality */}
        {(activeTab === 'reports' || activeTab === 'support') && (
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              {activeTab === 'reports' ? 'Custom Reports' : 'Priority Support'}
            </h2>
            <p className="text-gray-400 mb-4">
              {activeTab === 'reports' 
                ? 'Generate custom white-label reports for your organization.'
                : 'Access your dedicated support team and resources.'
              }
            </p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              {activeTab === 'reports' ? 'Generate Report' : 'Contact Support'}
            </button>
          </div>
        )}

        {/* Upgrade to Enterprise */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">{enterpriseUpgrade?.title}</h3>
          <p className="text-xl text-purple-100 mb-2">{enterpriseUpgrade?.subtitle}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-left">
              <h4 className="font-semibold text-white mb-4">Enterprise Unlocks:</h4>
              <ul className="space-y-3 text-purple-100">
                {enterpriseUpgrade?.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <Crown className="w-5 h-5 text-yellow-400 mr-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-black/40 p-6 rounded-lg border border-purple-300/20">
              <blockquote className="text-purple-100 italic mb-4">
                &ldquo;{enterpriseUpgrade?.testimonial.quote}&rdquo;
              </blockquote>
              <cite className="text-sm text-purple-200">
                — {enterpriseUpgrade?.testimonial.author}, {enterpriseUpgrade?.testimonial.title}
              </cite>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-yellow-300 font-medium mb-2">⚡ {enterpriseUpgrade?.exclusivity}</p>
          </div>
          
          <Link 
            href="/upgrade" 
            className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-lg text-lg font-bold hover:from-yellow-400 hover:to-orange-400 transition-all"
          >
            {enterpriseUpgrade?.cta}
            <Rocket className="w-5 h-5 ml-2" />
          </Link>
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