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
  AlertCircle,
  CheckCircle,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function StarterBilling() {
  const { userPlan, loading } = useUserPlan();
  const [billingCycle, setBillingCycle] = useState('monthly');

  if (loading || !userPlan) {
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
    { id: 'INV-2024-001', date: '2024-12-01', amount: 29, status: 'paid', plan: 'Starter Monthly' },
    { id: 'INV-2024-002', date: '2024-11-01', amount: 29, status: 'paid', plan: 'Starter Monthly' },
    { id: 'INV-2024-003', date: '2024-10-01', amount: 29, status: 'paid', plan: 'Starter Monthly' }
  ];

  const usageMetrics = [
    { metric: 'API Calls', current: 734, limit: 5000, percentage: 15 },
    { metric: 'Tool Comparisons', current: 89, limit: 500, percentage: 18 },
    { metric: 'Reports Generated', current: 23, limit: 100, percentage: 23 },
    { metric: 'Support Tickets', current: 2, limit: 10, percentage: 20 }
  ];

  const starterFeatures = [
    { feature: "5,000 API calls/month", included: true },
    { feature: "500 tool comparisons", included: true },
    { feature: "100 reports generated", included: true },
    { feature: "Push notifications", included: true },
    { feature: "Email scheduling", included: true },
    { feature: "Priority email support", included: true },
    { feature: "Basic automation", included: true },
    { feature: "Advanced analytics", included: false, proFeature: true },
    { feature: "Unlimited comparisons", included: false, proFeature: true },
    { feature: "Custom integrations", included: false, proFeature: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
          <p className="text-gray-400">Manage your Starter subscription and usage details</p>
        </div>

        {/* Starter Plan Status */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Starter Plan Active</h3>
              <p className="text-gray-300 mb-4">
                You&apos;re getting enhanced features with increased limits and priority support. 
                Next billing date: January 15, 2025. Ready to unlock even more power?
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/upgrade" 
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <button className="px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all">
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
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg">
                  <div>
                    <h3 className="text-lg font-medium text-white flex items-center">
                      Starter Plan
                      <CheckCircle className="w-4 h-4 ml-2 text-blue-400" />
                    </h3>
                    <p className="text-gray-400">Perfect for growing businesses</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">$29</div>
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
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Monthly ($29)
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-4 py-2 rounded-md text-sm transition-all ${
                        billingCycle === 'yearly' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Yearly ($290) 
                      <span className="text-green-400 text-xs ml-1">17% OFF</span>
                    </button>
                  </div>
                </div>

                {/* Plan Features */}
                <div>
                  <h4 className="text-white font-medium mb-3">Plan Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {starterFeatures.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                        {item.included ? (
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${item.included ? 'text-white' : 'text-gray-500'}`}>
                          {item.feature}
                          {item.proFeature && <span className="text-purple-400 text-xs ml-1">(PRO)</span>}
                        </span>
                      </div>
                    ))}
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
                    <button className="ml-auto text-blue-400 hover:text-blue-300 text-sm">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Analytics */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
                Usage This Month
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {usageMetrics.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-900 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium">{item.metric}</h4>
                      <span className="text-gray-400 text-sm">
                        {item.current.toLocaleString()} / {item.limit.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.percentage > 80 ? 'bg-red-500' : 
                          item.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(item.percentage, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">
                      {(item.limit - item.current).toLocaleString()} remaining
                    </p>
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

            {/* Cost Breakdown */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-cyan-400" />
                Cost Breakdown
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">This Month</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Starter subscription:</span>
                      <span className="text-white">$29.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Add-ons:</span>
                      <span className="text-white">$0.00</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-gray-700">
                      <span className="text-white">Total:</span>
                      <span className="text-blue-400">$29.00</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Usage Efficiency</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300 text-sm">API Usage</span>
                        <span className="text-green-400 text-sm">15%</span>
                      </div>
                      <p className="text-gray-400 text-xs">Good value for money</p>
                    </div>
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300 text-sm">Feature Utilization</span>
                        <span className="text-blue-400 text-sm">78%</span>
                      </div>
                      <p className="text-gray-400 text-xs">Making good use of features</p>
                    </div>
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
              feature="Pro billing features"
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
                    <Calendar className="w-4 h-4 text-green-400" />
                    <span className="text-white">Switch to Annual Billing</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-purple-400" />
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
                  <span className="text-white font-medium">$29.00</span>
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