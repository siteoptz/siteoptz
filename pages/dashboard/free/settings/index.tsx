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
  Globe,
  Database,
  Lock,
  Crown,
  Zap,
  ArrowRight,
  Eye,
  EyeOff,
  Save
} from 'lucide-react';
import Link from 'next/link';

export default function FreeSettings() {
  const { userPlan, loading } = useUserPlan();
  const [showApiKey, setShowApiKey] = useState(false);
  const [formData, setFormData] = useState({
    displayName: 'Free User',
    email: 'user@example.com',
    timezone: 'UTC',
    language: 'en'
  });

  if (loading || !userPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // Save settings logic would go here
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account preferences and configuration</p>
        </div>

        {/* Free Plan Limitations */}
        <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Lock className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Limited Settings Access</h3>
              <p className="text-gray-300 mb-4">
                Free plan includes basic settings only. Upgrade to access advanced security, API management, and team collaboration features.
              </p>
              <Link 
                href="/upgrade" 
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-cyan-400" />
                Profile Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed on Free plan</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="GMT">GMT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({...formData, language: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>

            {/* Locked Features */}
            <div className="space-y-4">
              {/* Security Settings - Locked */}
              <div className="bg-black/50 border border-gray-800 rounded-2xl p-6 opacity-60">
                <h2 className="text-xl font-semibold text-gray-400 mb-6 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Settings
                  <Lock className="w-4 h-4 ml-2" />
                  <span className="text-xs text-amber-400 font-medium ml-2">PRO</span>
                </h2>
                <p className="text-gray-500">Two-factor authentication, session management, and advanced security features</p>
              </div>

              {/* API Management - Locked */}
              <div className="bg-black/50 border border-gray-800 rounded-2xl p-6 opacity-60">
                <h2 className="text-xl font-semibold text-gray-400 mb-6 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  API Management
                  <Lock className="w-4 h-4 ml-2" />
                  <span className="text-xs text-amber-400 font-medium ml-2">PRO</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      API Key
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type={showApiKey ? "text" : "password"}
                        value="sk-xxxxxxxxxxxxxxxxxx"
                        disabled
                        className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="p-2 text-gray-500 hover:text-gray-400"
                        disabled
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Settings - Locked */}
              <div className="bg-black/50 border border-gray-800 rounded-2xl p-6 opacity-60">
                <h2 className="text-xl font-semibold text-gray-400 mb-6 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Advanced Settings
                  <Lock className="w-4 h-4 ml-2" />
                  <span className="text-xs text-purple-400 font-medium ml-2">ENTERPRISE</span>
                </h2>
                <p className="text-gray-500">Custom integrations, webhooks, and enterprise-level configurations</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <UpgradePrompt 
              currentPlan="free"
              requiredPlan="starter"
              feature="Advanced settings"
            />

            {/* Plan Details */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Plan</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Plan:</span>
                  <span className="text-white font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Settings Access:</span>
                  <span className="text-amber-400">Basic</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">API Calls:</span>
                  <span className="text-white">100/month</span>
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