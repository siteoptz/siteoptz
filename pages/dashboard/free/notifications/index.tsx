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
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function FreeNotifications() {
  const { userPlan, loading } = useUserPlan();
  const [emailNotifications, setEmailNotifications] = useState(true);

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
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-gray-400">Manage your notification preferences</p>
        </div>

        {/* Free Plan Limitations */}
        <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Lock className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Free Plan Limitations</h3>
              <p className="text-gray-300 mb-4">
                You're currently on the Free plan with basic notification features. Upgrade to unlock advanced notification management.
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
          {/* Available Settings */}
          <div className="lg:col-span-2">
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-cyan-400" />
                Available Notifications
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
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Locked Features */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg opacity-60">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-gray-500" />
                      <div>
                        <h3 className="text-gray-400 font-medium flex items-center">
                          Push Notifications
                          <Lock className="w-3 h-3 ml-2" />
                        </h3>
                        <p className="text-gray-500 text-sm">Real-time browser notifications</p>
                      </div>
                    </div>
                    <div className="text-xs text-amber-400 font-medium">PRO</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg opacity-60">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-gray-500" />
                      <div>
                        <h3 className="text-gray-400 font-medium flex items-center">
                          Custom Notification Rules
                          <Lock className="w-3 h-3 ml-2" />
                        </h3>
                        <p className="text-gray-500 text-sm">Set up automated notification triggers</p>
                      </div>
                    </div>
                    <div className="text-xs text-amber-400 font-medium">PRO</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg opacity-60">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-gray-500" />
                      <div>
                        <h3 className="text-gray-400 font-medium flex items-center">
                          Advanced Analytics Alerts
                          <Lock className="w-3 h-3 ml-2" />
                        </h3>
                        <p className="text-gray-500 text-sm">Get notified about performance insights</p>
                      </div>
                    </div>
                    <div className="text-xs text-purple-400 font-medium">ENTERPRISE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upgrade Sidebar */}
          <div className="space-y-6">
            <UpgradePrompt 
              currentPlan="free"
              title="Unlock Advanced Notifications"
              description="Get real-time alerts, custom rules, and advanced analytics with Pro"
              features={[
                "Push notifications",
                "Custom notification rules",
                "Email scheduling",
                "Priority support alerts"
              ]}
            />

            {/* Recent Activity */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="text-sm">
                    <p className="text-white">Welcome email sent</p>
                    <p className="text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="text-sm">
                    <p className="text-white">Account created</p>
                    <p className="text-gray-400">1 day ago</p>
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