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
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function StarterNotifications() {
  const { userPlan, loading } = useUserPlan();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    digest: false,
    marketing: true,
    security: true
  });

  if (loading || !userPlan) {
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
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-gray-400">Manage your notification preferences with enhanced controls</p>
        </div>

        {/* Starter Plan Features */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Starter Plan Active</h3>
              <p className="text-gray-300 mb-4">
                You now have access to push notifications, email scheduling, and basic automation rules. 
                Upgrade to Pro for advanced analytics alerts and custom integrations.
              </p>
              <Link 
                href="/upgrade" 
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Notifications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Available Settings */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-cyan-400" />
                Notification Settings
              </h2>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <h3 className="text-white font-medium">Email Notifications</h3>
                      <p className="text-gray-400 text-sm">Receive important updates via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Push Notifications - Available in Starter */}
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-green-400" />
                    <div>
                      <h3 className="text-white font-medium flex items-center">
                        Push Notifications
                        <CheckCircle className="w-4 h-4 ml-2 text-green-400" />
                      </h3>
                      <p className="text-gray-400 text-sm">Real-time browser notifications</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {/* Weekly Digest - Available in Starter */}
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <div>
                      <h3 className="text-white font-medium flex items-center">
                        Weekly Digest
                        <CheckCircle className="w-4 h-4 ml-2 text-green-400" />
                      </h3>
                      <p className="text-gray-400 text-sm">Summary of your week&apos;s activity</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.digest}
                      onChange={(e) => setNotifications({...notifications, digest: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>

                {/* Marketing Updates */}
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                    <div>
                      <h3 className="text-white font-medium">Marketing Updates</h3>
                      <p className="text-gray-400 text-sm">Product updates and feature announcements</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.marketing}
                      onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                {/* Security Alerts */}
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-red-400" />
                    <div>
                      <h3 className="text-white font-medium">Security Alerts</h3>
                      <p className="text-gray-400 text-sm">Account security and login notifications</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.security}
                      onChange={(e) => setNotifications({...notifications, security: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                {/* Locked Pro Features */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg opacity-60">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-gray-500" />
                      <div>
                        <h3 className="text-gray-400 font-medium flex items-center">
                          Advanced Analytics Alerts
                          <Lock className="w-3 h-3 ml-2" />
                        </h3>
                        <p className="text-gray-500 text-sm">Get notified about performance insights and trends</p>
                      </div>
                    </div>
                    <div className="text-xs text-purple-400 font-medium">PRO</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg opacity-60">
                    <div className="flex items-center gap-3">
                      <Filter className="w-5 h-5 text-gray-500" />
                      <div>
                        <h3 className="text-gray-400 font-medium flex items-center">
                          Custom Notification Rules
                          <Lock className="w-3 h-3 ml-2" />
                        </h3>
                        <p className="text-gray-500 text-sm">Create advanced automation triggers</p>
                      </div>
                    </div>
                    <div className="text-xs text-purple-400 font-medium">PRO</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Schedule - New for Starter */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-cyan-400" />
                Notification Schedule
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded ml-2">STARTER</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quiet Hours
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="time"
                      defaultValue="22:00"
                      className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="time"
                      defaultValue="08:00"
                      className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">No notifications during these hours</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <label key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked={!['Sat', 'Sun'].includes(day)}
                          className="sr-only peer"
                        />
                        <div className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-500 cursor-pointer">
                          {day}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <UpgradePrompt 
              currentPlan="starter"
              requiredPlan="pro"
              feature="Pro notifications"
            />

            {/* Recent Notifications */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="text-sm">
                    <p className="text-white">Weekly digest sent</p>
                    <p className="text-gray-400">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="text-sm">
                    <p className="text-white">Push notifications enabled</p>
                    <p className="text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="text-sm">
                    <p className="text-white">Starter plan activated</p>
                    <p className="text-gray-400">2 days ago</p>
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