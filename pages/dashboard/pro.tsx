import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useUserPlan } from '../../hooks/useUserPlan';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { FeatureGate } from '../../components/FeatureGate';
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
  Code
} from 'lucide-react';
import Link from 'next/link';

export default function ProDashboard() {
  const { userPlan, loading } = useUserPlan();
  const [activeTab, setActiveTab] = useState('overview');

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
      <DashboardHeader userPlan={userPlan} userName="Pro User" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Crown className="w-8 h-8 text-purple-400 mr-3" />
            Welcome to SiteOptz Pro
          </h1>
          <p className="text-gray-300">
            Premium AI implementation experience with expert consultations and team collaboration. 3 consultations remaining this month.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-800">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'consultations', 'team', 'analytics', 'api', 'reports'].map((tab) => (
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
            {/* Pro Plan Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Consultations Used</p>
                    <p className="text-2xl font-bold text-white">1/4</p>
                    <p className="text-purple-400 text-xs mt-1">This month</p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Team Members</p>
                    <p className="text-2xl font-bold text-white">5/10</p>
                    <p className="text-blue-400 text-xs mt-1">Active collaborators</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">API Calls</p>
                    <p className="text-2xl font-bold text-white">2.3K</p>
                    <p className="text-green-400 text-xs mt-1">This month</p>
                  </div>
                  <Code className="w-8 h-8 text-green-400" />
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Reports Generated</p>
                    <p className="text-2xl font-bold text-white">18</p>
                    <p className="text-amber-400 text-xs mt-1">White-labeled</p>
                  </div>
                  <FileText className="w-8 h-8 text-amber-400" />
                </div>
              </div>
            </div>

            {/* Advanced Analytics */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 text-green-400 mr-2" />
                Advanced Analytics Dashboard
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-green-400">ROI Achievement</h3>
                    <p className="text-3xl font-bold text-white">312%</p>
                    <p className="text-green-300 text-sm">Target: 250%</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-400">Team Productivity</h3>
                    <p className="text-3xl font-bold text-white">+67%</p>
                    <p className="text-blue-300 text-sm">Since AI implementation</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-400">Cost Savings</h3>
                    <p className="text-3xl font-bold text-white">$34K</p>
                    <p className="text-purple-300 text-sm">Annual projection: $120K</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-amber-400">Implementation Score</h3>
                    <p className="text-3xl font-bold text-white">94%</p>
                    <p className="text-amber-300 text-sm">Excellent progress</p>
                  </div>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Custom Reports Available</h4>
                  <div className="space-y-2 text-sm">
                    <button className="w-full text-left p-2 bg-gray-700/50 rounded text-gray-300 hover:bg-gray-700">
                      Executive Summary Report
                    </button>
                    <button className="w-full text-left p-2 bg-gray-700/50 rounded text-gray-300 hover:bg-gray-700">
                      Team Performance Analytics
                    </button>
                    <button className="w-full text-left p-2 bg-gray-700/50 rounded text-gray-300 hover:bg-gray-700">
                      ROI Detailed Breakdown
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expert Consultations Tab */}
        {activeTab === 'consultations' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <User className="w-6 h-6 text-purple-400 mr-2" />
                Expert Consultations Hub
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Schedule New Consultation */}
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-400 mb-4">Schedule New Consultation</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Expert Specialty</label>
                      <select className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2">
                        <option>AI Strategy</option>
                        <option>Implementation Planning</option>
                        <option>Team Training</option>
                        <option>ROI Optimization</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Preferred Time</label>
                      <input type="datetime-local" className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2" />
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Schedule Consultation
                    </button>
                  </div>
                  <p className="text-purple-300 text-xs mt-3">3 consultations remaining this month</p>
                </div>

                {/* Consultation History */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Recent Consultations</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">AI Strategy Review</h4>
                        <span className="text-green-400 text-sm">Completed</span>
                      </div>
                      <p className="text-gray-300 text-sm">Expert: Sarah Chen • 60 mins</p>
                      <p className="text-gray-400 text-xs">Last week</p>
                      <div className="flex space-x-2 mt-2">
                        <button className="text-blue-400 hover:text-blue-300 text-xs">
                          View Notes
                        </button>
                        <button className="text-green-400 hover:text-green-300 text-xs">
                          Download Recording
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">Team Training Plan</h4>
                        <span className="text-blue-400 text-sm">Scheduled</span>
                      </div>
                      <p className="text-gray-300 text-sm">Expert: David Kim • Tomorrow 2:00 PM</p>
                      <div className="flex space-x-2 mt-2">
                        <button className="text-purple-400 hover:text-purple-300 text-xs">
                          Join Meeting
                        </button>
                        <button className="text-gray-400 hover:text-gray-300 text-xs">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expert Profiles */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Available Experts</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: 'Sarah Chen', specialty: 'AI Strategy', rating: 4.9, sessions: 150 },
                  { name: 'David Kim', specialty: 'Implementation', rating: 4.8, sessions: 120 },
                  { name: 'Lisa Rodriguez', specialty: 'Team Training', rating: 4.9, sessions: 180 }
                ].map((expert, idx) => (
                  <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {expert.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <h4 className="text-white font-medium">{expert.name}</h4>
                        <p className="text-gray-400 text-sm">{expert.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-yellow-400">★ {expert.rating}</span>
                      <span className="text-gray-400">{expert.sessions} sessions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Collaboration Tab */}
        {activeTab === 'team' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Users className="w-6 h-6 text-blue-400 mr-2" />
                Team Collaboration Tools
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Team Members */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">Team Members (5/10)</h3>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                      Invite Member
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'John Doe', role: 'Admin', status: 'Active', lastSeen: 'Online' },
                      { name: 'Jane Smith', role: 'Manager', status: 'Active', lastSeen: '2 hours ago' },
                      { name: 'Mike Johnson', role: 'Analyst', status: 'Active', lastSeen: '1 day ago' },
                      { name: 'Sarah Wilson', role: 'Contributor', status: 'Pending', lastSeen: 'Invited' },
                      { name: 'Tom Brown', role: 'Viewer', status: 'Active', lastSeen: '3 days ago' }
                    ].map((member, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-3">
                            <p className="text-white font-medium text-sm">{member.name}</p>
                            <p className="text-gray-400 text-xs">{member.role} • {member.lastSeen}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          member.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shared Workspaces */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">Shared Workspaces</h3>
                    <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm">
                      New Workspace
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'AI Strategy Planning', members: 3, lastUpdated: '2 hours ago' },
                      { name: 'Customer Service AI', members: 5, lastUpdated: '1 day ago' },
                      { name: 'Marketing Automation', members: 2, lastUpdated: '3 days ago' }
                    ].map((workspace, idx) => (
                      <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                        <h4 className="text-white font-medium">{workspace.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-400 text-sm">{workspace.members} members</span>
                          <span className="text-gray-400 text-sm">{workspace.lastUpdated}</span>
                        </div>
                        <div className="flex space-x-2 mt-2">
                          <button className="text-blue-400 hover:text-blue-300 text-xs">
                            Open Workspace
                          </button>
                          <button className="text-gray-400 hover:text-gray-300 text-xs">
                            Manage Access
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Team Progress Tracking */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Team Progress Tracking</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400">Active Projects</h4>
                  <p className="text-2xl font-bold text-white">7</p>
                  <p className="text-blue-300 text-sm">3 completed this month</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400">Team Efficiency</h4>
                  <p className="text-2xl font-bold text-white">89%</p>
                  <p className="text-green-300 text-sm">+12% from last month</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400">Collaboration Score</h4>
                  <p className="text-2xl font-bold text-white">9.2/10</p>
                  <p className="text-purple-300 text-sm">Excellent teamwork</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Access Tab */}
        {activeTab === 'api' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Code className="w-6 h-6 text-green-400 mr-2" />
                API Access & Integrations
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* API Documentation */}
                <div>
                  <h3 className="font-semibold text-white mb-4">API Documentation</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-medium">Getting Started</h4>
                      <p className="text-gray-300 text-sm mt-1">Authentication, rate limits, and basic usage</p>
                      <button className="text-green-400 hover:text-green-300 text-sm mt-2">
                        View Documentation →
                      </button>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-medium">API Endpoints</h4>
                      <p className="text-gray-300 text-sm mt-1">Complete list of available endpoints</p>
                      <button className="text-green-400 hover:text-green-300 text-sm mt-2">
                        Explore Endpoints →
                      </button>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-medium">Code Examples</h4>
                      <p className="text-gray-300 text-sm mt-1">Sample code in multiple languages</p>
                      <button className="text-green-400 hover:text-green-300 text-sm mt-2">
                        View Examples →
                      </button>
                    </div>
                  </div>
                </div>

                {/* API Keys & Usage */}
                <div>
                  <h3 className="font-semibold text-white mb-4">API Keys & Usage</h3>
                  <div className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-400 font-medium">Production API Key</span>
                        <button className="text-green-400 hover:text-green-300 text-sm">
                          Regenerate
                        </button>
                      </div>
                      <code className="text-gray-300 text-sm bg-gray-800 p-2 rounded block">
                        sk-proj-...•••••••••••••••••
                      </code>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Monthly Usage</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">API Calls</span>
                          <span className="text-white">2,347 / 10,000</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third-party Integrations */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Third-party Integrations</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: 'Slack', status: 'Connected', icon: '💬' },
                  { name: 'Microsoft Teams', status: 'Available', icon: '🔗' },
                  { name: 'Zapier', status: 'Connected', icon: '⚡' },
                  { name: 'Google Workspace', status: 'Available', icon: '🌐' },
                  { name: 'Salesforce', status: 'Available', icon: '☁️' },
                  { name: 'HubSpot', status: 'Available', icon: '🎯' }
                ].map((integration, idx) => (
                  <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{integration.icon}</span>
                        <span className="text-white font-medium">{integration.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        integration.status === 'Connected' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {integration.status}
                      </span>
                    </div>
                    <button className={`text-sm ${
                      integration.status === 'Connected' 
                        ? 'text-red-400 hover:text-red-300' 
                        : 'text-blue-400 hover:text-blue-300'
                    }`}>
                      {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* White-label Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <FileText className="w-6 h-6 text-amber-400 mr-2" />
                White-label Reports
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Report Templates */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Available Templates</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Executive Summary', description: 'High-level overview for leadership' },
                      { name: 'Technical Analysis', description: 'Detailed implementation report' },
                      { name: 'ROI Assessment', description: 'Financial impact and projections' },
                      { name: 'Team Performance', description: 'Collaboration and productivity metrics' }
                    ].map((template, idx) => (
                      <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                        <h4 className="text-white font-medium">{template.name}</h4>
                        <p className="text-gray-300 text-sm mt-1">{template.description}</p>
                        <div className="flex space-x-2 mt-3">
                          <button className="bg-amber-600 text-white px-3 py-1 rounded text-sm">
                            Generate Report
                          </button>
                          <button className="text-amber-400 hover:text-amber-300 text-sm">
                            Preview
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brand Customization */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Brand Customization</h3>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Company Logo</label>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                          <p className="text-gray-400">Upload your logo</p>
                          <button className="text-blue-400 hover:text-blue-300 text-sm mt-2">
                            Choose File
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Brand Colors</label>
                        <div className="flex space-x-2">
                          <input type="color" value="#3B82F6" className="w-12 h-8 rounded border border-gray-600" />
                          <input type="color" value="#8B5CF6" className="w-12 h-8 rounded border border-gray-600" />
                          <input type="color" value="#10B981" className="w-12 h-8 rounded border border-gray-600" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Company Name</label>
                        <input 
                          type="text" 
                          placeholder="Your Company Name"
                          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2"
                        />
                      </div>
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Save Brand Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Recent Reports</h3>
              <div className="space-y-3">
                {[
                  { name: 'Q4 AI Implementation Report', date: '2 days ago', type: 'Executive Summary' },
                  { name: 'Team Performance Analysis', date: '1 week ago', type: 'Team Performance' },
                  { name: 'ROI Assessment - December', date: '2 weeks ago', type: 'ROI Assessment' }
                ].map((report, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div>
                      <h4 className="text-white font-medium">{report.name}</h4>
                      <p className="text-gray-400 text-sm">{report.type} • {report.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="text-green-400 hover:text-green-300">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-purple-400 hover:text-purple-300">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Priority Phone Support */}
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Phone className="w-6 h-6 text-green-400 mr-2" />
            Priority Phone Support
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Dedicated support line
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                2-hour response time guarantee
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                Escalation procedures
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                SLA tracking and reports
              </div>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Call Support: +1 (555) 123-4567
              </button>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Quarterly Business Review</h4>
              <p className="text-sm text-blue-300 mb-4">
                Your next quarterly review is scheduled for next month. We&apos;ll assess performance, adjust strategies, and set new goals.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                Schedule Review
              </button>
            </div>
          </div>
        </div>

        {/* Upgrade to Enterprise */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Ready for Enterprise?</h3>
          <p className="text-purple-100 mb-4">
            Unlock unlimited consultations, dedicated success manager, and custom integrations.
          </p>
          <UpgradePrompt
            currentPlan="pro"
            requiredPlan="enterprise"
            feature="unlimited consultations and dedicated success manager"
            variant="banner"
          />
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