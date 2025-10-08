import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Crown,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  User,
  Mail,
  Calendar
} from 'lucide-react';

interface OptzDashboardProps {
  email: string | null;
  plan: string;
  isAuthenticated: boolean;
}

export default function OptzDashboard({ email, plan, isAuthenticated }: OptzDashboardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(!isAuthenticated);

  useEffect(() => {
    // If not authenticated, check for SSO token in URL
    if (!isAuthenticated) {
      const ssoToken = router.query.sso_token as string;
      if (ssoToken) {
        // Token will be handled by middleware, just wait for reload
        setLoading(true);
      } else {
        // No authentication, redirect to main site
        setTimeout(() => {
          window.location.href = `https://siteoptz.ai/dashboard/${plan}`;
        }, 2000);
      }
    }
  }, [isAuthenticated, router.query, plan]);

  const getPlanFeatures = () => {
    const features: Record<string, any> = {
      free: {
        name: 'Basic Analytics',
        widgets: 5,
        refreshRate: '1 hour',
        features: ['Basic traffic metrics', 'Simple conversion tracking', 'Weekly reports'],
        dashboards: ['Overview Dashboard'],
        color: 'gray'
      },
      starter: {
        name: 'Marketing Dashboard',
        widgets: 15,
        refreshRate: '30 minutes',
        features: ['Marketing ROI tracking', 'Campaign analytics', 'A/B testing', 'Monthly reports'],
        dashboards: ['Marketing Dashboard', 'Campaign Performance'],
        color: 'blue'
      },
      pro: {
        name: 'Advanced Analytics',
        widgets: 50,
        refreshRate: '15 minutes',
        features: ['Advanced segmentation', 'Predictive analytics', 'Custom reports', 'API access', 'Priority support'],
        dashboards: ['Advanced Dashboard', 'Executive Reports', 'Team Analytics'],
        color: 'purple'
      },
      enterprise: {
        name: 'Executive Command Center',
        widgets: 'Unlimited',
        refreshRate: '5 minutes',
        features: ['Custom integrations', 'White-label options', 'Dedicated support', 'SLA guarantee', 'Custom training'],
        dashboards: ['Executive Dashboard', 'All Features', 'Custom Dashboards'],
        color: 'gold'
      }
    };

    return features[plan] || features.free;
  };

  const planData = getPlanFeatures();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Authenticating your session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Authentication required</p>
          <p className="text-gray-300">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Optz Analytics - {planData.name}</title>
        <meta name="description" content="Access your white-label analytics dashboard" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <header className="bg-black/50 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-white">Optz Analytics Suite</h1>
                <div className={`px-3 py-1 rounded-full text-white text-sm font-medium uppercase
                  ${plan === 'enterprise' ? 'bg-gradient-to-r from-yellow-600 to-orange-600' :
                    plan === 'pro' ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                    plan === 'starter' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' :
                    'bg-gradient-to-r from-gray-600 to-gray-700'}`}>
                  {plan}
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{email}</span>
                </div>
                <button
                  onClick={() => window.location.href = 'https://siteoptz.ai'}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Back to SiteOptz
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-6">
            <h2 className="text-3xl font-bold text-white mb-2">{planData.name}</h2>
            <p className="text-gray-300 mb-4">Your white-label analytics dashboard powered by Cyfe</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Widgets Available</span>
                  <span className="text-cyan-400 font-bold">{planData.widgets}</span>
                </div>
              </div>
              <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Refresh Rate</span>
                  <span className="text-cyan-400 font-bold">{planData.refreshRate}</span>
                </div>
              </div>
              <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-bold">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Embed Section */}
          <div className="mb-8 bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Live Analytics Dashboard</h3>
              <button
                onClick={() => window.open('https://app.cyfe.com', '_blank')}
                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 
                         hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg 
                         font-medium transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Full Dashboard</span>
              </button>
            </div>
            
            {/* Cyfe Dashboard Embed Placeholder */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg h-[600px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                <p className="text-white text-lg font-medium mb-2">Cyfe Dashboard Integration</p>
                <p className="text-gray-400 text-sm mb-4">
                  Your custom analytics dashboard will be embedded here
                </p>
                <button
                  onClick={() => window.open('https://app.cyfe.com', '_blank')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 
                           hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium 
                           transition-all duration-200"
                >
                  Configure Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                Plan Features
              </h3>
              <div className="space-y-3">
                {planData.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 text-cyan-400 mr-2" />
                Available Dashboards
              </h3>
              <div className="space-y-3">
                {planData.dashboards.map((dashboard: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 
                                              border border-gray-700 rounded-lg hover:border-cyan-400/50 
                                              transition-colors cursor-pointer">
                    <span className="text-gray-300">{dashboard}</span>
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">SSO Authentication</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400">Authenticated</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Session valid for 24 hours</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { plan } = context.query;
  
  // Check for SSO authentication cookies
  const isAuthenticated = req.cookies['optz-authenticated'] === 'true';
  const email = req.cookies['optz-sso-email'] || null;
  const userPlan = req.cookies['optz-sso-plan'] || plan || 'free';
  
  // Validate plan parameter
  const validPlans = ['free', 'starter', 'pro', 'enterprise'];
  const normalizedPlan = validPlans.includes(userPlan as string) ? userPlan : 'free';
  
  return {
    props: {
      email,
      plan: normalizedPlan,
      isAuthenticated
    }
  };
};