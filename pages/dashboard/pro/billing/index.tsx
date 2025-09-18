import React, { useState } from 'react';
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
  Shield,
  FileText,
  DollarSign,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ProBilling() {
  const { userPlan, loading } = useUserPlan();
  const [billingCycle, setBillingCycle] = useState('monthly');

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

  const invoices = [
    { id: 'INV-2024-001', date: '2024-12-01', amount: 79, status: 'paid', plan: 'Pro Monthly' },
    { id: 'INV-2024-002', date: '2024-11-01', amount: 79, status: 'paid', plan: 'Pro Monthly' },
    { id: 'INV-2024-003', date: '2024-10-01', amount: 79, status: 'paid', plan: 'Pro Monthly' },
    { id: 'INV-2024-004', date: '2024-09-01', amount: 79, status: 'paid', plan: 'Pro Monthly' }
  ];

  const usageMetrics = [
    { metric: 'API Calls', current: 8247, limit: 25000, percentage: 33 },
    { metric: 'Tool Comparisons', current: 156, limit: 'Unlimited', percentage: 100 },
    { metric: 'Reports Generated', current: 89, limit: 500, percentage: 18 },
    { metric: 'Team Members', current: 3, limit: 10, percentage: 30 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
          <p className="text-gray-400">Manage your Pro subscription, usage, and billing preferences</p>
        </div>

        {/* Pro Plan Status */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Crown className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Pro Plan Active</h3>
              <p className="text-gray-300 mb-4">
                You&apos;re getting the most out of our platform with unlimited tool comparisons, advanced analytics, 
                and priority support. Next billing date: January 15, 2025.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/upgrade" 
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Enterprise
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <button className="px-4 py-2 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-all">
                  Manage Subscription
                </button>
              </div>
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
                Current Subscription
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg">
                  <div>
                    <h3 className="text-lg font-medium text-white flex items-center">
                      Pro Plan
                      <Crown className="w-4 h-4 ml-2 text-purple-400" />
                    </h3>
                    <p className="text-gray-400">Full access to advanced features</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-400">$79</div>
                    <div className="text-sm text-gray-400">per month</div>
                  </div>
                </div>

                {/* Billing Cycle Toggle */}
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">Billing Cycle:</span>
                  <div className="flex bg-gray-900 rounded-lg p-1">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-4 py-2 rounded-md text-sm transition-all ${
                        billingCycle === 'monthly' 
                          ? 'bg-purple-600 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Monthly ($79)
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-4 py-2 rounded-md text-sm transition-all ${
                        billingCycle === 'yearly' 
                          ? 'bg-purple-600 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Yearly ($790) 
                      <span className="text-green-400 text-xs ml-1">20% OFF</span>
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="p-4 bg-gray-900 rounded-lg">
                  <h4 className="text-white font-medium mb-3">Payment Method</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                      <span className="text-xs text-white font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="text-white">•••• •••• •••• 4242</p>
                      <p className="text-gray-400 text-sm">Expires 12/26</p>
                    </div>
                    <button className="ml-auto text-purple-400 hover:text-purple-300 text-sm">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Analytics - Pro Feature */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
                Usage Analytics
                <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded ml-2">PRO</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {usageMetrics.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-900 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium">{item.metric}</h4>
                      <span className="text-gray-400 text-sm">
                        {item.current} / {item.limit}
                      </span>
                    </div>
                    {item.limit !== 'Unlimited' && (
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.percentage > 80 ? 'bg-red-500' : 
                            item.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(item.percentage, 100)}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                  Billing History
                </h2>
                <button className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </button>
              </div>

              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">{invoice.id}</p>
                        <p className="text-gray-400 text-sm">{invoice.plan}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-white">${invoice.amount}</p>
                        <p className="text-gray-400 text-sm">{invoice.date}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-900 text-green-400 text-xs rounded-full">
                        Paid
                      </span>
                      <button className="p-2 text-gray-400 hover:text-white">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Management - Pro Feature */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-cyan-400" />
                Cost Management
                <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded ml-2">PRO</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Spending Alerts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                      <span className="text-gray-300">Monthly budget alert</span>
                      <span className="text-green-400">$100</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                      <span className="text-gray-300">Usage threshold</span>
                      <span className="text-yellow-400">80%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">This Month</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Base subscription:</span>
                      <span className="text-white">$79.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Add-ons:</span>
                      <span className="text-white">$0.00</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-gray-700">
                      <span className="text-white">Total:</span>
                      <span className="text-purple-400">$79.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <UpgradePrompt 
              currentPlan="pro"
              title="Enterprise Features"
              description="Scale your operations with team management and advanced controls"
              features={[
                "Unlimited team members",
                "Advanced role management",
                "Custom billing cycles",
                "Dedicated account manager"
              ]}
            />

            {/* Quick Actions */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span className="text-white">Update Payment Method</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-green-400" />
                    <span className="text-white">Download Tax Invoice</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">Billing Support</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Next Payment */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Next Payment</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Due Date:</span>
                  <span className="text-white">Jan 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white font-medium">$79.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Method:</span>
                  <span className="text-white">•••• 4242</span>
                </div>
                <div className="pt-3 border-t border-gray-700">
                  <div className="text-center text-sm text-green-400">
                    Auto-renewal enabled
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