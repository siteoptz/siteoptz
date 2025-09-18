import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useUserPlan } from '../../../../hooks/useUserPlan';
import { DashboardHeader } from '../../../../components/dashboard/DashboardHeader';
import { 
  Bell, 
  BellOff, 
  Mail, 
  MessageSquare, 
  Settings,
  Crown,
  Zap,
  ArrowRight,
  Clock,
  Filter,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Save,
  Target,
  BarChart3,
  Users,
  Shield,
  Globe,
  Code,
  Webhook,
  Building
} from 'lucide-react';

export default function EnterpriseNotifications() {
  const { userPlan, loading } = useUserPlan();
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: true,
    slack: true,
    teams: true,
    webhook: true,
    whiteLabel: true
  });

  const teams = [
    { id: 'all', name: 'All Teams', members: 47 },
    { id: 'marketing', name: 'Marketing Team', members: 12 },
    { id: 'sales', name: 'Sales Team', members: 8 },
    { id: 'product', name: 'Product Team', members: 15 },
    { id: 'analytics', name: 'Analytics Team', members: 12 }
  ];

  const webhookEndpoints = [
    { id: 1, name: 'Slack Production', url: 'https://hooks.slack.com/...', status: 'active', events: 245 },
    { id: 2, name: 'Microsoft Teams', url: 'https://outlook.office.com/...', status: 'active', events: 189 },
    { id: 3, name: 'Custom Dashboard', url: 'https://api.company.com/...', status: 'active', events: 567 },
    { id: 4, name: 'Analytics Pipeline', url: 'https://analytics.company.com/...', status: 'paused', events: 0 }
  ];

  if (loading || !userPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading enterprise notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Enterprise Notifications</h1>
          <p className="text-gray-400">Complete notification management for your entire organization</p>
        </div>

        {/* Enterprise Status */}
        <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 border border-gray-600/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Building className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Enterprise Plan Active</h3>
              <p className="text-gray-400 mb-4">
                Full enterprise-grade notification management with team controls, white-label options, 
                custom integrations, and dedicated support. Managing notifications for 47 team members across 5 departments.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">99.9% Uptime SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-sm">Unlimited Team Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 text-sm">White-label Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Team Selector Sidebar */}
          <div className="bg-black border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-cyan-400" />
              Teams
            </h3>
            <div className="space-y-2">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedTeam === team.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{team.name}</span>
                    <span className="text-xs opacity-75">{team.members}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Enterprise Notification Channels */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-cyan-400" />
                Notification Channels
                <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded ml-2">ENTERPRISE</span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(notifications).map(([key, value]) => {
                  const configs = {
                    email: { icon: Mail, color: 'blue', label: 'Email Notifications', description: 'Traditional email alerts' },
                    push: { icon: MessageSquare, color: 'green', label: 'Push Notifications', description: 'Browser push alerts' },
                    sms: { icon: MessageSquare, color: 'yellow', label: 'SMS Alerts', description: 'Critical mobile alerts' },
                    slack: { icon: MessageSquare, color: 'purple', label: 'Slack Integration', description: 'Team workspace alerts' },
                    teams: { icon: Users, color: 'cyan', label: 'Microsoft Teams', description: 'Enterprise collaboration' },
                    webhook: { icon: Webhook, color: 'orange', label: 'Custom Webhooks', description: 'API integrations' },
                    whiteLabel: { icon: Crown, color: 'pink', label: 'White-label Notifications', description: 'Branded communications' }
                  };
                  
                  const config = configs[key as keyof typeof configs];
                  const IconComponent = config.icon;
                  
                  return (
                    <div key={key} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <IconComponent className={`w-5 h-5 text-${config.color}-400`} />
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${config.color}-600`}></div>
                        </label>
                      </div>
                      <h4 className="text-white font-medium text-sm">{config.label}</h4>
                      <p className="text-gray-400 text-xs mt-1">{config.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Webhook Management */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Code className="w-5 h-5 mr-2 text-cyan-400" />
                  Webhook Endpoints
                  <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded ml-2">ENTERPRISE</span>
                </h2>
                <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Webhook
                </button>
              </div>

              <div className="space-y-4">
                {webhookEndpoints.map((webhook) => (
                  <div key={webhook.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-white font-medium">{webhook.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded ${
                          webhook.status === 'active' 
                            ? 'bg-green-900 text-green-400' 
                            : 'bg-yellow-900 text-yellow-400'
                        }`}>
                          {webhook.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm font-mono">{webhook.url}</p>
                      <p className="text-gray-500 text-xs mt-1">{webhook.events} events sent this month</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-400">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Role Management */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                Role-Based Notification Permissions
                <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded ml-2">ENTERPRISE</span>
              </h2>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-900 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Admin Roles</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Full notification access</span>
                        <span className="text-green-400 text-sm">8 users</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Webhook management</span>
                        <span className="text-blue-400 text-sm">3 users</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-900 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Team Members</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Basic notifications</span>
                        <span className="text-blue-400 text-sm">39 users</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Department-specific</span>
                        <span className="text-purple-400 text-sm">25 users</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* White-label Customization */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Crown className="w-5 h-5 mr-2 text-cyan-400" />
                White-label Notification Branding
                <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded ml-2">ENTERPRISE</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name in Notifications
                    </label>
                    <input
                      type="text"
                      defaultValue="Your Company"
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      From Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="notifications@yourcompany.com"
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Brand Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        defaultValue="#3B82F6"
                        className="w-12 h-10 rounded border border-gray-700"
                      />
                      <span className="text-gray-400">#3B82F6</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourcompany.com/logo.png"
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <button className="mt-6 flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                <Save className="w-4 h-4 mr-2" />
                Save Branding Settings
              </button>
            </div>

            {/* Enterprise Analytics */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
                Notification Analytics
                <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded ml-2">ENTERPRISE</span>
              </h2>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-900 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white mb-1">24,847</div>
                  <div className="text-sm text-gray-400">Total Sent</div>
                  <div className="text-xs text-green-400 mt-1">+12% this month</div>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white mb-1">98.7%</div>
                  <div className="text-sm text-gray-400">Delivery Rate</div>
                  <div className="text-xs text-green-400 mt-1">+0.3% this month</div>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white mb-1">76.2%</div>
                  <div className="text-sm text-gray-400">Open Rate</div>
                  <div className="text-xs text-blue-400 mt-1">+2.1% this month</div>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white mb-1">1,203</div>
                  <div className="text-sm text-gray-400">Webhooks Fired</div>
                  <div className="text-xs text-purple-400 mt-1">+8% this month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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