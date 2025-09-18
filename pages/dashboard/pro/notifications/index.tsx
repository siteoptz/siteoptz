import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useUserPlan } from '../../../../hooks/useUserPlan';
import { DashboardHeader } from '../../../../components/dashboard/DashboardHeader';
import { UpgradePrompt } from '../../../../components/UpgradePrompt';
import { 
  Bell, 
  BellOff, 
  Mail, 
  MessageSquare, 
  Settings,
  Lock,
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
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function ProNotifications() {
  const { userPlan, loading } = useUserPlan();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    digest: true,
    marketing: false,
    security: true,
    analytics: true,
    webhooks: true
  });
  
  const [customRules, setCustomRules] = useState([
    { id: 1, name: "High Performance Alert", condition: "ROI > 150%", action: "Immediate Email + Push", active: true },
    { id: 2, name: "Low Engagement Warning", condition: "CTR < 2%", action: "Daily Digest", active: true },
    { id: 3, name: "Budget Threshold", condition: "Spend > $500", action: "Slack Webhook", active: false }
  ]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading notifications...</p>
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
          <h1 className="text-3xl font-bold text-white mb-2">Advanced Notifications</h1>
          <p className="text-gray-400">Complete control over your notification preferences and automation rules</p>
        </div>

        {/* Pro Plan Features */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Crown className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Pro Plan - Full Access</h3>
              <p className="text-gray-300 mb-4">
                You have access to all notification features including advanced analytics alerts, custom automation rules, 
                and webhook integrations. Upgrade to Enterprise for team management and white-label options.
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Core Notifications */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-cyan-400" />
                Core Notification Settings
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(notifications).map(([key, value]) => {
                  const configs = {
                    email: { icon: Mail, color: 'blue', label: 'Email Notifications' },
                    push: { icon: MessageSquare, color: 'green', label: 'Push Notifications' },
                    digest: { icon: Clock, color: 'cyan', label: 'Weekly Digest' },
                    marketing: { icon: MessageSquare, color: 'purple', label: 'Marketing Updates' },
                    security: { icon: Settings, color: 'red', label: 'Security Alerts' },
                    analytics: { icon: BarChart3, color: 'yellow', label: 'Analytics Alerts' },
                    webhooks: { icon: Zap, color: 'orange', label: 'Webhook Integrations' }
                  };
                  
                  const config = configs[key];
                  const IconComponent = config.icon;
                  
                  return (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-5 h-5 text-${config.color}-400`} />
                        <span className="text-white font-medium">{config.label}</span>
                        {['analytics', 'webhooks'].includes(key) && (
                          <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">PRO</span>
                        )}
                      </div>
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
                  );
                })}
              </div>
            </div>

            {/* Custom Notification Rules - Pro Feature */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-cyan-400" />
                  Custom Notification Rules
                  <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded ml-2">PRO</span>
                </h2>
                <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Rule
                </button>
              </div>

              <div className="space-y-4">
                {customRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{rule.name}</h4>
                      <p className="text-gray-400 text-sm">When {rule.condition} → {rule.action}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded ${rule.active ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'}`}>
                        {rule.active ? 'Active' : 'Inactive'}
                      </span>
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

            {/* Analytics Alerts - Pro Feature */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-cyan-400" />
                Performance Analytics Alerts
                <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded ml-2">PRO</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900 rounded-lg">
                  <h4 className="text-white font-medium mb-2">ROI Threshold Alerts</h4>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Alert when ROI exceeds:</label>
                    <input 
                      type="number" 
                      defaultValue="150"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-900 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Performance Drops</h4>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Alert when CTR drops below:</label>
                    <input 
                      type="number" 
                      defaultValue="2"
                      step="0.1"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-900 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Budget Alerts</h4>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Alert when spend exceeds:</label>
                    <input 
                      type="number" 
                      defaultValue="500"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-900 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Conversion Tracking</h4>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Alert when conversions drop:</label>
                    <input 
                      type="number" 
                      defaultValue="20"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <button className="mt-4 flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                <Save className="w-4 h-4 mr-2" />
                Save Alert Settings
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <UpgradePrompt 
              currentPlan="pro"
              title="Enterprise Features"
              description="Scale notifications for your entire team"
              features={[
                "Team notification management",
                "White-label notifications",
                "Advanced webhook endpoints",
                "Custom integrations"
              ]}
            />

            {/* Notification Stats */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Emails Sent:</span>
                  <span className="text-white font-medium">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Push Notifications:</span>
                  <span className="text-white font-medium">1,832</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rules Triggered:</span>
                  <span className="text-white font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Webhooks Fired:</span>
                  <span className="text-white font-medium">89</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="text-sm">
                    <p className="text-white">ROI alert triggered</p>
                    <p className="text-gray-400">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="text-sm">
                    <p className="text-white">Webhook sent to Slack</p>
                    <p className="text-gray-400">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="text-sm">
                    <p className="text-white">Custom rule updated</p>
                    <p className="text-gray-400">3 hours ago</p>
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