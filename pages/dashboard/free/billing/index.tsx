import React from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useUserPlan } from '../../../../hooks/useUserPlan';
import { DashboardHeader } from '../../../../components/dashboard/DashboardHeader';
import { UpgradePrompt } from '../../../../components/UpgradePrompt';
import { 
  CreditCard,
  Calendar,
  TrendingUp,
  Download,
  Crown,
  Gift,
  ArrowRight,
  Check,
  X,
  Zap,
  Users,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function FreeBilling() {
  const { userPlan, loading } = useUserPlan();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading billing information...</p>
        </div>
      </div>
    );
  }

  const freeFeatures = [
    { feature: "Basic AI Tool Comparisons", included: true },
    { feature: "Monthly Tool Reports", included: true },
    { feature: "Community Support", included: true },
    { feature: "Advanced Analytics", included: false },
    { feature: "Priority Support", included: false },
    { feature: "Custom Integrations", included: false },
    { feature: "Team Collaboration", included: false },
    { feature: "White-label Solutions", included: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
          <p className="text-gray-400">Manage your subscription and view usage details</p>
        </div>

        {/* Free Plan Hero */}
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Gift className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-400 mb-2">You&apos;re on the Free Plan!</h3>
              <p className="text-gray-300 mb-4">
                Enjoy our core features at no cost. Ready to unlock the full potential of AI tool optimization?
              </p>
              <Link 
                href="/upgrade" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Plan Details */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-cyan-400" />
                Current Plan Details
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <h3 className="text-lg font-medium text-white">Free Plan</h3>
                    <p className="text-gray-400">Perfect for getting started</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">$0</div>
                    <div className="text-sm text-gray-400">per month</div>
                  </div>
                </div>

                {/* Plan Features */}
                <div className="grid md:grid-cols-2 gap-4">
                  {freeFeatures.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                      {item.included ? (
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${item.included ? 'text-white' : 'text-gray-500'}`}>
                        {item.feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" />
                Usage This Month
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">47</div>
                  <div className="text-sm text-gray-400">Tool Comparisons</div>
                  <div className="text-xs text-green-400 mt-1">75 remaining</div>
                </div>

                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">12</div>
                  <div className="text-sm text-gray-400">Reports Generated</div>
                  <div className="text-xs text-green-400 mt-1">8 remaining</div>
                </div>

                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">3</div>
                  <div className="text-sm text-gray-400">Support Tickets</div>
                  <div className="text-xs text-green-400 mt-1">2 remaining</div>
                </div>
              </div>
            </div>

            {/* Billing History (Empty for Free) */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                Billing History
              </h2>

              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-400 mb-2">No billing history</h3>
                <p className="text-gray-500 mb-4">
                  You're currently on the free plan with no charges
                </p>
                <Link 
                  href="/upgrade" 
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  View Paid Plans
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upgrade Prompt */}
            <UpgradePrompt 
              currentPlan="free"
              requiredPlan="starter"
              feature="Advanced billing features"
            />

            {/* Quick Upgrade Options */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Popular Upgrades</h3>
              
              <div className="space-y-4">
                <Link 
                  href="/upgrade?plan=starter"
                  className="block p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg hover:border-blue-400/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Starter Plan</h4>
                      <p className="text-sm text-gray-400">Perfect for individuals</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-400">$29</div>
                      <div className="text-xs text-gray-400">/month</div>
                    </div>
                  </div>
                </Link>

                <Link 
                  href="/upgrade?plan=pro"
                  className="block p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg hover:border-purple-400/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white flex items-center">
                        Pro Plan
                        <Crown className="w-4 h-4 ml-2 text-yellow-400" />
                      </h4>
                      <p className="text-sm text-gray-400">Most popular choice</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-400">$79</div>
                      <div className="text-xs text-gray-400">/month</div>
                    </div>
                  </div>
                </Link>

                <Link 
                  href="/upgrade?plan=enterprise"
                  className="block p-4 bg-gradient-to-r from-gray-900/20 to-gray-800/20 border border-gray-600/30 rounded-lg hover:border-gray-500/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white flex items-center">
                        Enterprise
                        <Shield className="w-4 h-4 ml-2 text-gray-400" />
                      </h4>
                      <p className="text-sm text-gray-400">For large teams</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Custom</div>
                      <div className="text-xs text-gray-400">pricing</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Account Summary */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Account Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Status:</span>
                  <span className="text-green-400 font-medium">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Member Since:</span>
                  <span className="text-white">Dec 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Payment:</span>
                  <span className="text-gray-400">N/A (Free Plan)</span>
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