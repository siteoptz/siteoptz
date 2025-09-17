import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useUserPlan } from '../../hooks/useUserPlan';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
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
  Database
} from 'lucide-react';
import Link from 'next/link';

export default function EnterpriseDashboard() {
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
      <DashboardHeader userPlan={userPlan} userName="Enterprise User" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Shield className="w-8 h-8 text-amber-400 mr-3" />
            Welcome to SiteOptz Enterprise
          </h1>
          <p className="text-gray-300">
            Premium enterprise experience with dedicated success manager Sarah Chen. Next quarterly review: March 15, 2024.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-800">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {['overview', 'success-manager', 'consultations', 'training', 'integrations', 'sla', 'executive'].map((tab) => (
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
            {/* Enterprise Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Unlimited Consultations</p>
                    <p className="text-2xl font-bold text-white">23</p>
                    <p className="text-amber-400 text-xs mt-1">This month</p>
                  </div>
                  <Calendar className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Team Members</p>
                    <p className="text-2xl font-bold text-white">47/100</p>
                    <p className="text-blue-400 text-xs mt-1">Across 5 departments</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Custom Integrations</p>
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-green-400 text-xs mt-1">Active connections</p>
                  </div>
                  <Layers className="w-8 h-8 text-green-400" />
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">SLA Uptime</p>
                    <p className="text-2xl font-bold text-white">99.98%</p>
                    <p className="text-green-400 text-xs mt-1">Above 99.9% target</p>
                  </div>
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Award className="w-6 h-6 text-amber-400 mr-2" />
                Executive Summary
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-green-400">Enterprise ROI</h3>
                    <p className="text-3xl font-bold text-white">847%</p>
                    <p className="text-green-300 text-sm">$2.4M annual value generated</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-400">Organization Impact</h3>
                    <p className="text-3xl font-bold text-white">+156%</p>
                    <p className="text-blue-300 text-sm">Productivity across all departments</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-400">Cost Optimization</h3>
                    <p className="text-3xl font-bold text-white">$890K</p>
                    <p className="text-purple-300 text-sm">Annual savings from AI implementation</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <h3 className="font-semibold text-amber-400">Strategic Alignment</h3>
                    <p className="text-3xl font-bold text-white">98%</p>
                    <p className="text-amber-300 text-sm">Goals on track for completion</p>
                  </div>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Next Quarter Focus</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 text-amber-400 mr-2" />
                      Expand AI to 3 new departments
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-blue-400 mr-2" />
                      Scale team to 75 members
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                      Achieve $3M annual value
                    </div>
                  </div>
                  <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors mt-4">
                    Schedule Strategic Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Success Manager Tab */}
        {activeTab === 'success-manager' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <User className="w-6 h-6 text-amber-400 mr-2" />
                Dedicated Success Manager Portal
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Success Manager Profile */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      SC
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white">Sarah Chen</h3>
                      <p className="text-amber-400">Senior Enterprise Success Manager</p>
                      <p className="text-gray-300 text-sm">5+ years AI implementation experience</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Phone className="w-4 h-4 text-amber-400 mr-2" />
                      Direct line: +1 (555) 987-6543
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MessageSquare className="w-4 h-4 text-amber-400 mr-2" />
                      Slack: @sarah.chen
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 text-amber-400 mr-2" />
                      Available: Mon-Fri 8AM-6PM EST
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg flex-1">
                      Schedule Meeting
                    </button>
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                      Message
                    </button>
                  </div>
                </div>

                {/* Recent Communications */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Recent Communications</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">Q1 Strategy Planning</h4>
                        <span className="text-green-400 text-sm">Completed</span>
                      </div>
                      <p className="text-gray-300 text-sm">Discussed expansion plans and resource allocation</p>
                      <p className="text-gray-400 text-xs">3 days ago • 90 minutes</p>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">Weekly Check-in</h4>
                        <span className="text-blue-400 text-sm">Scheduled</span>
                      </div>
                      <p className="text-gray-300 text-sm">Regular progress review and goal alignment</p>
                      <p className="text-gray-400 text-xs">Tomorrow 2:00 PM • 30 minutes</p>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">Integration Support</h4>
                        <span className="text-amber-400 text-sm">In Progress</span>
                      </div>
                      <p className="text-gray-300 text-sm">Custom Salesforce integration implementation</p>
                      <p className="text-gray-400 text-xs">1 week ago • Ongoing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Planning */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Strategic Planning Sessions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400">Quarterly Planning</h4>
                  <p className="text-2xl font-bold text-white">Q2 2024</p>
                  <p className="text-blue-300 text-sm">March 15 • 2 hours</p>
                  <button className="text-blue-400 hover:text-blue-300 text-sm mt-2">
                    Prepare Agenda →
                  </button>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400">Goal Setting</h4>
                  <p className="text-2xl font-bold text-white">85%</p>
                  <p className="text-purple-300 text-sm">Current progress</p>
                  <button className="text-purple-400 hover:text-purple-300 text-sm mt-2">
                    Review Goals →
                  </button>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400">Success Metrics</h4>
                  <p className="text-2xl font-bold text-white">12/15</p>
                  <p className="text-green-300 text-sm">KPIs on track</p>
                  <button className="text-green-400 hover:text-green-300 text-sm mt-2">
                    View Dashboard →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unlimited Consultations Tab */}
        {activeTab === 'consultations' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Crown className="w-6 h-6 text-purple-400 mr-2" />
                Unlimited Expert Consultations
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Expert Team Access */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Expert Team Access</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Dr. Michael Zhang', specialty: 'AI Strategy & Vision', rating: 4.9, sessions: 300 },
                      { name: 'Jennifer Liu', specialty: 'Implementation & Training', rating: 4.8, sessions: 250 },
                      { name: 'Robert Davis', specialty: 'Technical Integration', rating: 4.9, sessions: 180 },
                      { name: 'Maria Garcia', specialty: 'Change Management', rating: 4.8, sessions: 220 }
                    ].map((expert, idx) => (
                      <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {expert.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-3">
                              <h4 className="text-white font-medium">{expert.name}</h4>
                              <p className="text-gray-400 text-sm">{expert.specialty}</p>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <div className="text-yellow-400">★ {expert.rating}</div>
                            <div className="text-gray-400">{expert.sessions}+ sessions</div>
                          </div>
                        </div>
                        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                          Schedule Consultation
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialized Consultations */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Specialized Consultations</h3>
                  <div className="space-y-3">
                    {[
                      { type: 'Strategic Planning', duration: '2-3 hours', description: 'Long-term AI roadmap development' },
                      { type: 'Technical Deep Dive', duration: '90 minutes', description: 'Complex integration challenges' },
                      { type: 'Team Training', duration: '4-6 hours', description: 'Department-wide skill development' },
                      { type: 'Crisis Resolution', duration: 'As needed', description: '24/7 emergency support' }
                    ].map((consultation, idx) => (
                      <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h4 className="text-white font-medium">{consultation.type}</h4>
                        <p className="text-gray-300 text-sm mt-1">{consultation.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-400 text-xs">{consultation.duration}</span>
                          <button className="text-purple-400 hover:text-purple-300 text-sm">
                            Book Now →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Consultation History */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Recent Consultation History</h3>
              <div className="space-y-3">
                {[
                  { topic: 'Q1 AI Strategy Review', expert: 'Dr. Michael Zhang', date: '2 days ago', duration: '2 hours', outcome: 'Strategic roadmap updated' },
                  { topic: 'Salesforce Integration', expert: 'Robert Davis', date: '1 week ago', duration: '90 mins', outcome: 'Technical specs finalized' },
                  { topic: 'Team Onboarding Plan', expert: 'Maria Garcia', date: '2 weeks ago', duration: '2 hours', outcome: 'Training program designed' }
                ].map((consultation, idx) => (
                  <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{consultation.topic}</h4>
                      <span className="text-green-400 text-sm">Completed</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>Expert: {consultation.expert}</div>
                      <div>Duration: {consultation.duration}</div>
                      <div>Date: {consultation.date}</div>
                      <div>Outcome: {consultation.outcome}</div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">
                        View Notes
                      </button>
                      <button className="text-green-400 hover:text-green-300 text-sm">
                        Download Recording
                      </button>
                      <button className="text-purple-400 hover:text-purple-300 text-sm">
                        Schedule Follow-up
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Custom Training Programs Tab */}
        {activeTab === 'training' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <BookOpen className="w-6 h-6 text-blue-400 mr-2" />
                Custom Training Programs
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Tailored Training Modules */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Tailored Training Modules</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Executive AI Leadership', level: 'C-Level', participants: 8, progress: 85 },
                      { title: 'Technical Implementation', level: 'Engineering', participants: 23, progress: 92 },
                      { title: 'AI-Powered Marketing', level: 'Marketing', participants: 15, progress: 78 },
                      { title: 'Data-Driven Sales', level: 'Sales', participants: 18, progress: 65 }
                    ].map((module, idx) => (
                      <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{module.title}</h4>
                          <span className="text-blue-400 text-sm">{module.progress}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                          <span>{module.level} • {module.participants} participants</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${module.progress}%` }} />
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 text-sm">
                          View Progress →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certification Tracks */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Certification Tracks</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'AI Fundamentals', level: 'Beginner', certified: 42, total: 47 },
                      { name: 'Advanced Analytics', level: 'Intermediate', certified: 28, total: 35 },
                      { name: 'AI Strategy Leadership', level: 'Advanced', certified: 12, total: 15 },
                      { name: 'Technical Implementation', level: 'Expert', certified: 8, total: 12 }
                    ].map((track, idx) => (
                      <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h4 className="text-white font-medium">{track.name}</h4>
                        <div className="flex items-center justify-between mt-2 text-sm">
                          <span className="text-gray-300">{track.level}</span>
                          <span className="text-green-400">{track.certified}/{track.total} certified</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(track.certified / track.total) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* On-site Workshops */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">On-site Workshops</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400">Upcoming Workshop</h4>
                  <p className="text-white font-medium">AI Strategy Deep Dive</p>
                  <p className="text-gray-300 text-sm">March 20-21, 2024</p>
                  <p className="text-gray-400 text-xs">2 days • All departments</p>
                  <button className="text-amber-400 hover:text-amber-300 text-sm mt-2">
                    View Agenda →
                  </button>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400">Custom Curriculum</h4>
                  <p className="text-white font-medium">Tailored Content</p>
                  <p className="text-gray-300 text-sm">Industry-specific focus</p>
                  <p className="text-gray-400 text-xs">Based on your business needs</p>
                  <button className="text-blue-400 hover:text-blue-300 text-sm mt-2">
                    Request Curriculum →
                  </button>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400">Follow-up Support</h4>
                  <p className="text-white font-medium">Post-Workshop</p>
                  <p className="text-gray-300 text-sm">3-month support period</p>
                  <p className="text-gray-400 text-xs">Continuous guidance</p>
                  <button className="text-green-400 hover:text-green-300 text-sm mt-2">
                    Schedule Support →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Layers className="w-6 h-6 text-green-400 mr-2" />
                Custom Integrations
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Active Integrations */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Active Integrations</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Salesforce CRM', type: 'Custom API', status: 'Active', data: '2.3M records synced' },
                      { name: 'SAP Enterprise', type: 'Direct Connection', status: 'Active', data: '156K transactions/day' },
                      { name: 'Microsoft Dynamics', type: 'Webhook Integration', status: 'Active', data: '890K customer records' },
                      { name: 'Oracle Database', type: 'Real-time Sync', status: 'Active', data: '5.2TB data warehouse' }
                    ].map((integration, idx) => (
                      <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{integration.name}</h4>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                            {integration.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300 mb-2">
                          <div>{integration.type}</div>
                          <div className="text-gray-400">{integration.data}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300 text-sm">
                            Configure
                          </button>
                          <button className="text-green-400 hover:text-green-300 text-sm">
                            Monitor
                          </button>
                          <button className="text-amber-400 hover:text-amber-300 text-sm">
                            Optimize
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Development Queue */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Development Queue</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Workday HRIS', status: 'In Development', eta: '2 weeks', progress: 75 },
                      { name: 'ServiceNow ITSM', status: 'Planning', eta: '4 weeks', progress: 25 },
                      { name: 'Tableau Analytics', status: 'Testing', eta: '1 week', progress: 90 },
                      { name: 'Custom ERP System', status: 'Requirements', eta: '6 weeks', progress: 10 }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'Testing' ? 'bg-amber-500/20 text-amber-400' :
                            item.status === 'In Development' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300 mb-2">
                          ETA: {item.eta}
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.progress}%` }} />
                        </div>
                        <div className="text-xs text-gray-400">{item.progress}% complete</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Data Synchronization */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Data Synchronization</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <Database className="w-8 h-8 text-blue-400 mb-2" />
                  <h4 className="font-semibold text-blue-400">Real-time Sync</h4>
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-blue-300 text-sm">Active connections</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
                  <h4 className="font-semibold text-green-400">Data Processed</h4>
                  <p className="text-2xl font-bold text-white">847GB</p>
                  <p className="text-green-300 text-sm">This month</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <Shield className="w-8 h-8 text-purple-400 mb-2" />
                  <h4 className="font-semibold text-purple-400">Security Score</h4>
                  <p className="text-2xl font-bold text-white">98%</p>
                  <p className="text-purple-300 text-sm">Enterprise grade</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <Clock className="w-8 h-8 text-amber-400 mb-2" />
                  <h4 className="font-semibold text-amber-400">Latency</h4>
                  <p className="text-2xl font-bold text-white">23ms</p>
                  <p className="text-amber-300 text-sm">Average response</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLA Guarantees Tab */}
        {activeTab === 'sla' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-green-400 mr-2" />
                SLA Guarantees & Monitoring
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* SLA Metrics */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Current SLA Performance</h3>
                  <div className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-green-400">Uptime</h4>
                      <p className="text-3xl font-bold text-white">99.98%</p>
                      <p className="text-green-300 text-sm">Target: 99.9% ✓</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-400">Response Time</h4>
                      <p className="text-3xl font-bold text-white">&lt; 1hr</p>
                      <p className="text-blue-300 text-sm">Target: &lt; 2hrs ✓</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-400">Resolution Time</h4>
                      <p className="text-3xl font-bold text-white">4.2hrs</p>
                      <p className="text-purple-300 text-sm">Target: &lt; 8hrs ✓</p>
                    </div>
                  </div>
                </div>

                {/* SLA History */}
                <div>
                  <h3 className="font-semibold text-white mb-4">SLA History</h3>
                  <div className="space-y-3">
                    {[
                      { month: 'February 2024', uptime: '99.97%', status: 'Met' },
                      { month: 'January 2024', uptime: '99.99%', status: 'Exceeded' },
                      { month: 'December 2023', uptime: '99.95%', status: 'Met' },
                      { month: 'November 2023', uptime: '99.98%', status: 'Met' }
                    ].map((record, idx) => (
                      <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{record.month}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            record.status === 'Exceeded' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">Uptime: {record.uptime}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Escalation Procedures */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Escalation Procedures</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-medium flex items-center">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mr-2" />
                        Level 1: Standard
                      </h4>
                      <p className="text-gray-300 text-sm">Response: 1 hour</p>
                      <p className="text-gray-400 text-xs">Business hours support</p>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-medium flex items-center">
                        <AlertCircle className="w-4 h-4 text-orange-400 mr-2" />
                        Level 2: Priority
                      </h4>
                      <p className="text-gray-300 text-sm">Response: 30 minutes</p>
                      <p className="text-gray-400 text-xs">24/7 availability</p>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-medium flex items-center">
                        <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                        Level 3: Critical
                      </h4>
                      <p className="text-gray-300 text-sm">Response: 15 minutes</p>
                      <p className="text-gray-400 text-xs">Immediate escalation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Executive Reporting Tab */}
        {activeTab === 'executive' && (
          <div className="space-y-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Briefcase className="w-6 h-6 text-amber-400 mr-2" />
                Executive Reporting
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* C-Level Dashboards */}
                <div>
                  <h3 className="font-semibold text-white mb-4">C-Level Dashboards</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'CEO Strategic Overview', metrics: 'ROI, Growth, Strategy', lastUpdated: '1 hour ago' },
                      { title: 'CFO Financial Impact', metrics: 'Cost, Savings, Budget', lastUpdated: '2 hours ago' },
                      { title: 'CTO Technical Progress', metrics: 'Implementation, Security', lastUpdated: '30 mins ago' },
                      { title: 'CHRO People Impact', metrics: 'Training, Adoption, Skills', lastUpdated: '1 hour ago' }
                    ].map((dashboard, idx) => (
                      <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                        <h4 className="text-white font-medium">{dashboard.title}</h4>
                        <p className="text-gray-300 text-sm mt-1">{dashboard.metrics}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-400 text-xs">Updated: {dashboard.lastUpdated}</span>
                          <button className="text-amber-400 hover:text-amber-300 text-sm">
                            View Dashboard →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategic Insights */}
                <div>
                  <h3 className="font-semibold text-white mb-4">Strategic Insights</h3>
                  <div className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-green-400">Key Achievement</h4>
                      <p className="text-white">847% ROI exceeds industry average by 340%</p>
                      <p className="text-green-300 text-sm">Recommendation: Expand to additional business units</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-400">Growth Opportunity</h4>
                      <p className="text-white">3 departments ready for AI implementation</p>
                      <p className="text-blue-300 text-sm">Projected additional value: $1.2M annually</p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-400">Risk Mitigation</h4>
                      <p className="text-white">Skills gap identified in data analysis</p>
                      <p className="text-amber-300 text-sm">Training program scheduled for Q2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Enterprise Performance Metrics</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-400">Revenue Impact</h4>
                  <p className="text-2xl font-bold text-white">+$2.4M</p>
                  <p className="text-green-300 text-sm">Annual value generated</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-400">Team Efficiency</h4>
                  <p className="text-2xl font-bold text-white">+156%</p>
                  <p className="text-blue-300 text-sm">Productivity increase</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-400">Time Saved</h4>
                  <p className="text-2xl font-bold text-white">2,340</p>
                  <p className="text-purple-300 text-sm">Hours annually</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center">
                  <Target className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-amber-400">Goal Achievement</h4>
                  <p className="text-2xl font-bold text-white">98%</p>
                  <p className="text-amber-300 text-sm">Strategic objectives</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enterprise Support Footer */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Enterprise Excellence</h3>
          <p className="text-amber-100 mb-4">
            Your dedicated success manager and expert team are here to ensure your continued success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Schedule Strategic Review
            </button>
            <button className="bg-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors">
              Contact Success Manager
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