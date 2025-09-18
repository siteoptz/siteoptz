import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useUserPlan } from '../../../../hooks/useUserPlan';
import { DashboardHeader } from '../../../../components/dashboard/DashboardHeader';
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
  Building,
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
  Activity,
  FileText,
  Download,
  Upload,
  Sliders,
  UserCheck,
  UserX
} from 'lucide-react';
import Link from 'next/link';

export default function EnterpriseSettings() {
  const { userPlan, loading } = useUserPlan();
  const [activeTab, setActiveTab] = useState('organization');
  const [showApiKey, setShowApiKey] = useState(false);

  const [organizationData, setOrganizationData] = useState({
    name: 'TechCorp Enterprise',
    domain: 'techcorp.com',
    industry: 'Technology',
    size: '500-1000',
    country: 'United States',
    timezone: 'UTC-5',
    primaryContact: 'Sarah Johnson',
    email: 'admin@techcorp.com',
    phone: '+1 (555) 123-4567'
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@techcorp.com', role: 'Super Admin', department: 'IT', status: 'active', lastActive: '2 hours ago' },
    { id: 2, name: 'Michael Chen', email: 'michael@techcorp.com', role: 'Admin', department: 'Product', status: 'active', lastActive: '1 day ago' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily@techcorp.com', role: 'Manager', department: 'Marketing', status: 'active', lastActive: '3 hours ago' },
    { id: 4, name: 'David Kim', email: 'david@techcorp.com', role: 'Member', department: 'Sales', status: 'active', lastActive: '1 week ago' },
    { id: 5, name: 'Lisa Thompson', email: 'lisa@techcorp.com', role: 'Member', department: 'Support', status: 'inactive', lastActive: '2 weeks ago' }
  ]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading enterprise settings...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'organization', label: 'Organization', icon: Building },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'security', label: 'Security & Compliance', icon: Shield },
    { id: 'api', label: 'API Management', icon: Key },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'branding', label: 'White-Label', icon: Palette },
    { id: 'billing', label: 'Billing Management', icon: FileText },
    { id: 'support', label: 'Support & SLA', icon: UserCheck }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'organization':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Organization Profile</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={organizationData.name}
                    onChange={(e) => setOrganizationData({...organizationData, name: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Domain
                  </label>
                  <input
                    type="text"
                    value={organizationData.domain}
                    onChange={(e) => setOrganizationData({...organizationData, domain: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry
                  </label>
                  <select
                    value={organizationData.industry}
                    onChange={(e) => setOrganizationData({...organizationData, industry: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Organization Size
                  </label>
                  <select
                    value={organizationData.size}
                    onChange={(e) => setOrganizationData({...organizationData, size: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  >
                    <option value="1-50">1-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500-1000">500-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Primary Contact
                  </label>
                  <input
                    type="text"
                    value={organizationData.primaryContact}
                    onChange={(e) => setOrganizationData({...organizationData, primaryContact: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={organizationData.email}
                    onChange={(e) => setOrganizationData({...organizationData, email: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Regional Settings</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country
                  </label>
                  <select
                    value={organizationData.country}
                    onChange={(e) => setOrganizationData({...organizationData, country: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Default Timezone
                  </label>
                  <select
                    value={organizationData.timezone}
                    onChange={(e) => setOrganizationData({...organizationData, timezone: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">UTC</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="flex items-center px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all">
              <Save className="w-4 h-4 mr-2" />
              Save Organization Settings
            </button>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Team Management</h3>
                <p className="text-gray-400 text-sm">Manage unlimited team members and their roles</p>
              </div>
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all">
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">47</div>
                <div className="text-sm text-gray-400">Total Members</div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-1">42</div>
                <div className="text-sm text-gray-400">Active</div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400 mb-1">3</div>
                <div className="text-sm text-gray-400">Pending</div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-gray-400 mb-1">2</div>
                <div className="text-sm text-gray-400">Inactive</div>
              </div>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{member.name}</h4>
                      <p className="text-gray-400 text-sm">{member.email}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-300 text-sm font-medium">{member.department}</p>
                      <p className="text-gray-500 text-xs">Department</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-gray-300 text-sm">{member.role}</p>
                      <p className="text-gray-500 text-xs">Last: {member.lastActive}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      member.status === 'active' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-600 text-gray-300'
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

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">
                <h4 className="text-white font-medium mb-4">Role Permissions</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Super Admin</span>
                    <span className="text-green-400 text-sm">Full Access</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Admin</span>
                    <span className="text-blue-400 text-sm">Most Features</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Manager</span>
                    <span className="text-purple-400 text-sm">Team Features</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Member</span>
                    <span className="text-gray-400 text-sm">Basic Access</span>
                  </div>
                </div>
                <button className="mt-4 text-yellow-400 hover:text-yellow-300 text-sm">
                  Customize Roles
                </button>
              </div>

              <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">
                <h4 className="text-white font-medium mb-4">Bulk Actions</h4>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
                    <div className="flex items-center gap-3">
                      <Upload className="w-4 h-4 text-blue-400" />
                      <span className="text-white">Import Team Members</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
                    <div className="flex items-center gap-3">
                      <Download className="w-4 h-4 text-green-400" />
                      <span className="text-white">Export Team Data</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
                    <div className="flex items-center gap-3">
                      <UserX className="w-4 h-4 text-red-400" />
                      <span className="text-white">Deactivate Inactive Users</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Enterprise Security & Compliance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <h4 className="text-white font-medium">Enterprise SSO</h4>
                        <p className="text-gray-400 text-sm">SAML 2.0, OAuth 2.0 support</p>
                      </div>
                    </div>
                    <button className="text-yellow-400 hover:text-yellow-300 text-sm">
                      Configure
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <h4 className="text-white font-medium">SCIM Provisioning</h4>
                        <p className="text-gray-400 text-sm">Automated user lifecycle</p>
                      </div>
                    </div>
                    <button className="text-yellow-400 hover:text-yellow-300 text-sm">
                      Active
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-400" />
                      <div>
                        <h4 className="text-white font-medium">Advanced Audit Logs</h4>
                        <p className="text-gray-400 text-sm">Full activity tracking</p>
                      </div>
                    </div>
                    <button className="text-yellow-400 hover:text-yellow-300 text-sm">
                      View Logs
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-400" />
                      <div>
                        <h4 className="text-white font-medium">Compliance Reports</h4>
                        <p className="text-gray-400 text-sm">SOC 2, GDPR, HIPAA ready</p>
                      </div>
                    </div>
                    <button className="text-yellow-400 hover:text-yellow-300 text-sm">
                      Generate
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
                    <h4 className="text-white font-medium">Password Complexity</h4>
                    <p className="text-gray-400 text-sm">Enforce strong passwords organization-wide</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">IP Allowlisting</h4>
                    <p className="text-gray-400 text-sm">Restrict access to approved IP ranges</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Session Timeout</h4>
                    <p className="text-gray-400 text-sm">Automatically log out inactive users</p>
                  </div>
                  <select className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>4 hours</option>
                    <option>8 hours</option>
                    <option>Never</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Data Encryption</h4>
                    <p className="text-gray-400 text-sm">AES-256 encryption for all data</p>
                  </div>
                  <span className="text-green-400 text-sm font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Crown className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Enterprise API Management</h3>
                  <p className="text-gray-300 mb-4">
                    Unlimited API access with custom rate limits, dedicated endpoints, and priority support. 
                    Full control over API keys and access policies for your organization.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">∞</div>
                <div className="text-sm text-gray-400">API Calls/Month</div>
                <div className="text-xs text-green-400 mt-1">Unlimited</div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">12</div>
                <div className="text-sm text-gray-400">Active API Keys</div>
                <div className="text-xs text-blue-400 mt-1">All environments</div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-gray-400">Uptime SLA</div>
                <div className="text-xs text-green-400 mt-1">Guaranteed</div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Organization API Keys</h3>
                <button className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all">
                  <Plus className="w-4 h-4 mr-2" />
                  Create API Key
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">Master Production Key</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Production</span>
                      <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">Master</span>
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <code className="flex-1 text-gray-300 bg-gray-800 px-3 py-2 rounded text-sm font-mono">
                      sk-prod-enterprise-••••••••••••••••
                    </code>
                    <button className="p-2 text-gray-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs text-gray-400">
                    <p>Created: Nov 15, 2024</p>
                    <p>Requests this month: 47,832</p>
                    <p>Rate limit: Custom</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">Analytics API Key</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Analytics</span>
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <code className="flex-1 text-gray-300 bg-gray-800 px-3 py-2 rounded text-sm font-mono">
                      sk-analytics-••••••••••••••••
                    </code>
                    <button className="p-2 text-gray-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs text-gray-400">
                    <p>Created: Dec 1, 2024</p>
                    <p>Requests this month: 12,445</p>
                    <p>Rate limit: 10,000/hour</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Enterprise Configuration</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Default Rate Limits</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Requests/minute:</span>
                        <input type="number" defaultValue="10000" className="w-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Burst limit:</span>
                        <input type="number" defaultValue="50000" className="w-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-900 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Access Control</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span className="text-gray-300 text-sm">Require API key authentication</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span className="text-gray-300 text-sm">IP-based restrictions</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-gray-300 text-sm">Time-based access windows</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-900 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Dedicated Endpoints</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Analytics API:</span>
                        <span className="text-green-400">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Webhook API:</span>
                        <span className="text-green-400">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Batch Processing:</span>
                        <span className="text-green-400">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-900 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Priority Support</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Response time:</span>
                        <span className="text-yellow-400">&lt; 1 hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Dedicated channel:</span>
                        <span className="text-green-400">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Technical contact:</span>
                        <span className="text-blue-400">Assigned</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">White-Label Customization</h3>
              <p className="text-gray-400 mb-6">Customize the platform appearance and branding for your organization.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Logo & Branding</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Company Logo</label>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">TC</span>
                          </div>
                          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all">
                            Upload New Logo
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Favicon</label>
                        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all">
                          Upload Favicon
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Color Scheme</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-yellow-600 rounded border-2 border-gray-600"></div>
                          <input type="text" value="#D97706" className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Accent Color</label>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-orange-600 rounded border-2 border-gray-600"></div>
                          <input type="text" value="#EA580C" className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Custom Domain</h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="app.yourcompany.com"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      />
                      <p className="text-gray-500 text-xs">Configure DNS settings to point to our servers</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Preview</h4>
                    <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-orange-600 rounded flex items-center justify-center">
                          <span className="text-white font-bold text-xs">TC</span>
                        </div>
                        <span className="text-white font-semibold">TechCorp Analytics</span>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full h-2 bg-gray-700 rounded">
                          <div className="w-3/4 h-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-8 bg-gray-700 rounded"></div>
                          <div className="h-8 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Custom CSS</h4>
                    <textarea
                      rows={6}
                      placeholder="/* Add your custom CSS here */"
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm font-mono resize-none focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all">
                <Save className="w-4 h-4 mr-2" />
                Save Branding
              </button>
              <button className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all">
                Preview Changes
              </button>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Dedicated Support & SLA</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">
                  <h4 className="text-white font-medium mb-4">Your Support Team</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">AM</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Alex Morrison</p>
                        <p className="text-gray-400 text-sm">Account Manager</p>
                        <p className="text-gray-500 text-xs">alex.morrison@siteoptz.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">JC</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Jordan Chen</p>
                        <p className="text-gray-400 text-sm">Technical Lead</p>
                        <p className="text-gray-500 text-xs">jordan.chen@siteoptz.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">
                  <h4 className="text-white font-medium mb-4">SLA Guarantees</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Response Time:</span>
                      <span className="text-green-400 font-medium">&lt; 1 hour</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Resolution Time:</span>
                      <span className="text-green-400 font-medium">&lt; 4 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Uptime Guarantee:</span>
                      <span className="text-green-400 font-medium">99.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Support Hours:</span>
                      <span className="text-yellow-400 font-medium">24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support Channels</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-5 h-5 text-green-400" />
                    <h4 className="text-white font-medium">Priority Phone</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Direct line to your support team</p>
                  <p className="text-green-400 text-sm font-mono">+1 (555) ENT-SUPP</p>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <h4 className="text-white font-medium">Email Support</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Dedicated enterprise inbox</p>
                  <p className="text-blue-400 text-sm">enterprise@siteoptz.com</p>
                </div>

                <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <h4 className="text-white font-medium">Slack Connect</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Private channel with our team</p>
                  <button className="text-purple-400 hover:text-purple-300 text-sm">
                    Connect Slack
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Recent Support Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <h4 className="text-white font-medium">API Integration Support</h4>
                      <p className="text-gray-400 text-sm">Ticket #ENT-2024-001 - Resolved</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">2 hours ago</p>
                    <p className="text-green-400 text-xs">Resolved in 45 mins</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div>
                      <h4 className="text-white font-medium">Custom Branding Setup</h4>
                      <p className="text-gray-400 text-sm">Ticket #ENT-2024-002 - In Progress</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">1 day ago</p>
                    <p className="text-blue-400 text-xs">Expected: 2 hours</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <h4 className="text-white font-medium">SSO Configuration</h4>
                      <p className="text-gray-400 text-sm">Ticket #ENT-2024-003 - Resolved</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">3 days ago</p>
                    <p className="text-green-400 text-xs">Resolved in 1.5 hours</p>
                  </div>
                </div>
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
          <h1 className="text-3xl font-bold text-white mb-2">Enterprise Settings</h1>
          <p className="text-gray-400">Complete control over your organization&apos;s platform configuration</p>
        </div>

        {/* Enterprise Plan Features */}
        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Crown className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Enterprise Plan - Full Control</h3>
              <p className="text-gray-300 mb-4">
                Complete platform customization with unlimited team members, white-label branding, 
                dedicated support, and enterprise-grade security. Your organization, your way.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">Dedicated Account Manager</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">99.9% SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">24/7 Priority Support</span>
                </div>
              </div>
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
                        ? 'bg-yellow-600 text-white'
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
          <div className="lg:col-span-3">
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || Settings, { className: "w-5 h-5 mr-2 text-yellow-400" })}
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              {renderTabContent()}
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