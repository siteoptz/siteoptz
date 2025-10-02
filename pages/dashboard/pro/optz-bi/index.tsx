import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useUserPlan } from '../../../../hooks/useUserPlan';
import { DashboardHeader } from '../../../../components/dashboard/DashboardHeader';
import { 
  BarChart3,
  TrendingUp,
  ArrowRight,
  Target,
  Zap,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function OptzBI() {
  const { userPlan, loading } = useUserPlan();
  const router = useRouter();

  // Redirect to the main Marketing ROI tool in the Pro dashboard
  useEffect(() => {
    if (!loading && userPlan) {
      // Redirect to the ROI Dashboard tab in the main Pro dashboard
      router.replace('/dashboard/pro?tab=roi-dashboard');
    }
  }, [loading, userPlan, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Marketing ROI Tool...</p>
        </div>
      </div>
    );
  }

  if (!userPlan || userPlan.plan !== 'pro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Pro Plan Required</h1>
          <p className="text-gray-300 mb-6">Marketing ROI Tool is an exclusive feature for Pro and Enterprise subscribers.</p>
          <div className="space-x-4">
            <Link 
              href="/upgrade" 
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Upgrade to Pro
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
            <Link 
              href="/dashboard" 
              className="inline-flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show redirect message while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="w-12 h-12 text-purple-400 mr-3" />
              <h1 className="text-3xl font-bold text-white">Marketing ROI Tool</h1>
            </div>
            <p className="text-gray-300 text-lg">
              Redirecting you to the integrated Marketing ROI Dashboard...
            </p>
          </div>

          {/* Redirect Message */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            </div>
            
            <h2 className="text-xl font-semibold text-white mb-4">
              Marketing ROI Tool Integrated
            </h2>
            
            <p className="text-gray-300 mb-6">
              The Marketing ROI tool is now fully integrated into your Pro dashboard. 
              You'll be redirected to the ROI Dashboard tab where you can access all features.
            </p>

            {/* Manual Redirect Button */}
            <Link 
              href="/dashboard/pro?tab=roi-dashboard"
              className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Go to ROI Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Feature Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-white font-semibold">ROI Dashboard</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Real-time marketing performance tracking with key metrics and analytics.
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-white font-semibold">Platform Connections</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Connect Google Ads, Meta, TikTok, and Google Analytics for unified tracking.
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-purple-400 mr-3" />
                <h3 className="text-white font-semibold">AI Insights</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Claude AI-powered recommendations and optimization insights.
              </p>
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
        destination: '/api/auth/signin',
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