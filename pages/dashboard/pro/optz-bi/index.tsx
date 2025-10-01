import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useUserPlan } from '../../../../hooks/useUserPlan';
import { DashboardHeader } from '../../../../components/dashboard/DashboardHeader';
import { 
  BarChart3,
  TrendingUp,
  ExternalLink,
  Monitor,
  Loader2,
  Shield,
  Zap,
  Target,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function OptzBI() {
  const { userPlan, loading } = useUserPlan();
  const [iframeLoading, setIframeLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  useEffect(() => {
    // Check if Optz BI is running
    const checkOptzBI = async () => {
      try {
        const response = await fetch('http://localhost:3001', { 
          method: 'HEAD',
          mode: 'no-cors'
        });
        setConnectionStatus('connected');
      } catch (error) {
        setConnectionStatus('error');
      }
    };

    checkOptzBI();
    const interval = setInterval(checkOptzBI, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading || !userPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading Optz BI...</p>
        </div>
      </div>
    );
  }

  if (!userPlan || userPlan.plan !== 'pro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Pro Plan Required</h1>
          <p className="text-gray-300 mb-6">Optz BI is an exclusive feature for Pro and Enterprise subscribers.</p>
          <div className="space-x-4">
            <Link 
              href="/upgrade" 
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Upgrade to Pro
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
            <Link 
              href="/dashboard/pro" 
              className="inline-flex items-center border border-gray-600 text-gray-300 px-6 py-3 rounded-lg hover:border-gray-500 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/pro"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Pro Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                connectionStatus === 'connected' ? 'bg-green-900/50 text-green-400 border border-green-500/30' :
                connectionStatus === 'error' ? 'bg-red-900/50 text-red-400 border border-red-500/30' :
                'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-400' :
                  connectionStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400'
                }`}></div>
                {connectionStatus === 'connected' ? 'Live Application' :
                 connectionStatus === 'error' ? 'Connection Error' : 'Connecting...'}
              </div>
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all text-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </a>
            </div>
          </div>
          
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <BarChart3 className="w-8 h-8 text-purple-400 mr-3" />
              Optz BI - Marketing ROI Tracker
            </h1>
            <p className="text-gray-400">
              Live access to your marketing campaign analytics, ROI tracking, and platform integrations
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-black border border-gray-800 rounded-lg p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <h3 className="text-white font-medium text-sm">Real-time ROI</h3>
            <p className="text-gray-400 text-xs">Live campaign tracking</p>
          </div>
          <div className="bg-black border border-gray-800 rounded-lg p-4 text-center">
            <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h3 className="text-white font-medium text-sm">Platform Sync</h3>
            <p className="text-gray-400 text-xs">Google Ads, Meta, TikTok</p>
          </div>
          <div className="bg-black border border-gray-800 rounded-lg p-4 text-center">
            <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <h3 className="text-white font-medium text-sm">AI Insights</h3>
            <p className="text-gray-400 text-xs">Smart recommendations</p>
          </div>
          <div className="bg-black border border-gray-800 rounded-lg p-4 text-center">
            <Monitor className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <h3 className="text-white font-medium text-sm">Live Dashboard</h3>
            <p className="text-gray-400 text-xs">Real-time analytics</p>
          </div>
        </div>

        {/* Connection Error Message */}
        {connectionStatus === 'error' && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold text-red-400">Optz BI Not Available</h3>
            </div>
            <p className="text-gray-300 mb-4">
              The Optz BI application is not currently running. This might be because:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
              <li>The application server is starting up</li>
              <li>The application is temporarily unavailable</li>
              <li>There&apos;s a network connectivity issue</li>
            </ul>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Connection
              </button>
              <a
                href="mailto:support@siteoptz.ai"
                className="flex items-center px-4 py-2 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
              >
                Contact Support
              </a>
            </div>
          </div>
        )}

        {/* Iframe Container */}
        <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
          {/* Loading State */}
          {(iframeLoading || connectionStatus !== 'connected') && (
            <div className="flex items-center justify-center h-96 bg-gradient-to-br from-gray-900 to-black">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400 mx-auto mb-4" />
                <p className="text-gray-300">
                  {connectionStatus === 'connecting' ? 'Connecting to Optz BI...' : 
                   connectionStatus === 'error' ? 'Connection Failed' : 'Loading Application...'}
                </p>
              </div>
            </div>
          )}

          {/* Iframe */}
          {connectionStatus === 'connected' && (
            <iframe
              src="http://localhost:3001"
              className="w-full h-screen border-0"
              style={{ minHeight: '800px' }}
              onLoad={handleIframeLoad}
              title="Optz BI - Marketing ROI Tracker"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
            />
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Monitor className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <h4 className="text-purple-400 font-medium mb-1">About Optz BI</h4>
              <p className="text-gray-300 mb-2">
                This is your live Optz BI application, running as part of your Pro subscription. 
                You can create campaigns, connect marketing platforms, and track ROI in real-time.
              </p>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>✓ Secure iframe integration</span>
                <span>✓ Real-time data sync</span>
                <span>✓ Pro feature access</span>
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