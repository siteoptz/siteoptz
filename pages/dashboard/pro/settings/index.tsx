import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useUserPlan } from '../../../../hooks/useUserPlan';
import { DashboardHeader } from '../../../../components/dashboard/DashboardHeader';
import { UpgradePrompt } from '../../../../components/UpgradePrompt';
import { 
  Settings,
  User,
  Shield,
  Key,
  Bell,
  Globe,
  Database,
  Palette,
  Users,
  Mail,
  Phone,
  Lock,
  Crown,
  ArrowRight,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  Copy,
  RefreshCw,
  Trash2,
  Plus,
  AlertTriangle,
  Clock,
  Zap,
  Link as LinkIcon,
  Server,
  Activity
} from 'lucide-react';
import Link from 'next/link';

export default function ProSettings() {
  const { userPlan, loading } = useUserPlan();
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    company: 'TechCorp Solutions',
    phone: '+1 (555) 987-6543',
    timezone: 'UTC-5',
    language: 'English',
    role: 'Product Manager'
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Smith', email: 'john@techcorp.com', role: 'Developer', status: 'active' },
    { id: 2, name: 'Emily Davis', email: 'emily@techcorp.com', role: 'Analyst', status: 'active' },
    { id: 3, name: 'Mike Wilson', email: 'mike@techcorp.com', role: 'Manager', status: 'pending' }
  ]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Management', icon: Key },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={profileData.role}
                  onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Product Manager">Product Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  value={profileData.timezone}
                  onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">UTC</option>
                  <option value="UTC+1">Central European Time (UTC+1)</option>
                </select>
              </div>
            </div>
            <button className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Team Members</h3>
                <p className="text-gray-400 text-sm">Manage your team members and their permissions</p>
              </div>
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                <Plus className="w-4 h-4 mr-2" />
                Invite Member
              </button>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{member.name}</h4>
                      <p className="text-gray-400 text-sm">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-300 text-sm">{member.role}</span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      member.status === 'active' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {member.status}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Advanced Security</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-purple-400" />
                      <div>
                        <h4 className="text-white font-medium">Single Sign-On (SSO)</h4>
                        <p className="text-gray-400 text-sm">Connect with your identity provider</p>
                      </div>
                    </div>
                    <button className="text-purple-400 hover:text-purple-300 text-sm">
                      Configure
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                        <p className="text-gray-400 text-sm">Enabled via Authenticator App</p>
                      </div>
                    </div>
                    <button className="text-purple-400 hover:text-purple-300 text-sm">
                      Manage
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-blue-400" />
                      <div>
                        <h4 className="text-white font-medium">Session Management</h4>
                        <p className="text-gray-400 text-sm">Control active sessions and timeouts</p>
                      </div>
                    </div>
                    <button className="text-purple-400 hover:text-purple-300 text-sm">
                      View Sessions
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Security Policies</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Password Policy</h4>
                    <p className="text-gray-400 text-sm">Enforce strong passwords for team members</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">IP Allowlisting</h4>
                    <p className="text-gray-400 text-sm">Restrict access to specific IP addresses</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Crown className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Pro API Access</h3>
                  <p className="text-gray-300 mb-4">
                    Unlimited API access with advanced endpoints and priority support. 
                    Configure rate limits and access controls for your team.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">API Keys</h3>
                <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                  <Plus className="w-4 h-4 mr-2" />
                  Generate New Key
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">Production Key</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Active</span>
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <code className="flex-1 text-gray-300 bg-gray-800 px-3 py-2 rounded text-sm font-mono">
                      {showApiKey ? 'sk-prod-1234567890abcdef' : '••••••••••••••••'}
                    </code>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                    <p>Created: December 15, 2024</p>
                    <p>Last used: 2 hours ago</p>
                    <p>Requests this month: 8,247</p>
                    <p>Rate limit: Unlimited</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">Development Key</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Dev</span>
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <code className="flex-1 text-gray-300 bg-gray-800 px-3 py-2 rounded text-sm font-mono">
                      sk-dev-••••••••••••••••
                    </code>
                    <button className="p-2 text-gray-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                    <p>Created: November 3, 2024</p>
                    <p>Last used: Never</p>
                    <p>Requests this month: 0</p>
                    <p>Rate limit: 1,000/hour</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Advanced Configuration</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Custom Rate Limits</h4>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Requests per minute:</label>
                    <input 
                      type="number" 
                      defaultValue="1000"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-900 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Webhook Endpoints</h4>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Callback URL:</label>
                    <input 
                      type="url" 
                      placeholder="https://your-app.com/webhook"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Connected Integrations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Slack</h4>
                        <p className="text-gray-400 text-sm">Team workspace</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Connected</span>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 text-sm">
                    Configure
                  </button>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Z</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Zapier</h4>
                        <p className="text-gray-400 text-sm">Automation platform</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Connected</span>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 text-sm">
                    Manage Zaps
                  </button>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg opacity-60">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">D</span>
                      </div>
                      <div>
                        <h4 className="text-gray-400 font-medium">Discord</h4>
                        <p className="text-gray-500 text-sm">Community notifications</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">Available</span>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 text-sm">
                    Connect
                  </button>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg opacity-60">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">A</span>
                      </div>
                      <div>
                        <h4 className="text-gray-400 font-medium">Airtable</h4>
                        <p className="text-gray-500 text-sm">Database sync</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">Available</span>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 text-sm">
                    Connect
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Custom Webhooks</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">Analytics Webhook</h4>
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">https://api.yourapp.com/webhooks/analytics</p>
                  <p className="text-gray-500 text-xs">Triggers: Performance alerts, Usage thresholds</p>
                </div>

                <button className="flex items-center px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Webhook
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <p className="text-gray-400">
              Advanced notification settings are managed in the 
              <Link href="/dashboard/pro/notifications" className="text-purple-400 hover:text-purple-300 ml-1">
                Notifications section
              </Link>.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  Email Alerts
                </h4>
                <p className="text-gray-400 text-sm">247 sent this month</p>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <Bell className="w-4 h-4 mr-2 text-green-400" />
                  Push Notifications
                </h4>
                <p className="text-gray-400 text-sm">1,832 delivered</p>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-purple-400" />
                  Webhooks Fired
                </h4>
                <p className="text-gray-400 text-sm">156 this month</p>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Advanced Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Dark Mode</h4>
                    <p className="text-gray-400 text-sm">Use dark theme across the application</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Advanced Analytics</h4>
                    <p className="text-gray-400 text-sm">Show detailed performance metrics</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Auto-save Frequency</h4>
                    <p className="text-gray-400 text-sm">How often to save changes automatically</p>
                  </div>
                  <select className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm">
                    <option>Every 30 seconds</option>
                    <option>Every minute</option>
                    <option>Every 5 minutes</option>
                    <option>Manual only</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-600 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Export All Data</h4>
                      <p className="text-gray-400 text-sm">Download complete account data archive</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </button>

                <button className="w-full text-left p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-600 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Data Retention Policy</h4>
                      <p className="text-gray-400 text-sm">Configure how long to keep historical data</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </button>

                <button className="w-full text-left p-4 bg-red-900/20 border border-red-500/30 rounded-lg hover:border-red-400/50 transition-all">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <div>
                      <h4 className="text-red-400 font-medium">Delete Account</h4>
                      <p className="text-gray-400 text-sm">Permanently delete account and all team data</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Pro Settings</h1>
          <p className="text-gray-400">Advanced account management and team collaboration settings</p>
        </div>

        {/* Pro Plan Features */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Crown className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Pro Plan - Advanced Settings</h3>
              <p className="text-gray-300 mb-4">
                Access to team management, advanced security features, unlimited API access, and custom integrations. 
                Upgrade to Enterprise for white-label solutions and dedicated support.
              </p>
              <Link 
                href="/upgrade" 
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Enterprise
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2">
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || Settings, { className: "w-5 h-5 mr-2 text-purple-400" })}
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              {renderTabContent()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <UpgradePrompt 
              currentPlan="pro"
              title="Enterprise Features"
              description="Advanced team management and white-label solutions"
              features={[
                "Unlimited team members",
                "White-label customization",
                "Dedicated account manager",
                "Custom SLA agreements"
              ]}
            />

            {/* Security Score */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Security Score</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
                <p className="text-gray-400 text-sm mb-4">Excellent security posture</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">2FA Enabled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Strong Password</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">SSO Configured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">IP Allowlist</span>
                  </div>
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