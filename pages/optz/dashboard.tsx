import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { 
  BarChart3, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Layout,
  Monitor,
  User
} from 'lucide-react';

interface Widget {
  id: string;
  name: string;
  type: string;
  description?: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
  canAccess: boolean;
  dashboardUrl?: string;
}

interface SSOData {
  token: string;
  domain: string;
  dashboardUrls: {
    full: string;
    widgets: string;
    embed: string;
  };
  expires: string;
  user: {
    email: string;
    name: string;
    id: string;
  };
}

interface OptzDashboardProps {
  host: string;
}

export default function OptzDashboard({ host }: OptzDashboardProps) {
  const { data: session, status } = useSession();
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ssoData, setSsoData] = useState<SSOData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // Fetch widgets from Cyfe API
  const fetchWidgets = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cyfe/widgets');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch widgets: ${response.status}`);
      }
      
      const result = await response.json();
      setWidgets(result.data || []);
      setConnectionStatus('connected');
      setError(null);
    } catch (err) {
      console.error('Error fetching widgets:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch widgets');
      setConnectionStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Generate SSO token for dashboard access
  const generateSSOToken = async () => {
    try {
      const response = await fetch('/api/cyfe/sso/generate', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate SSO token');
      }
      
      const result = await response.json();
      setSsoData(result.data);
    } catch (err) {
      console.error('Error generating SSO token:', err);
      setError('Failed to generate dashboard access token');
    }
  };

  // Load data when component mounts or session changes
  useEffect(() => {
    if (status === 'authenticated') {
      fetchWidgets();
      generateSSOToken();
    }
  }, [status]);

  // Handle authentication required
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="bg-black border border-gray-800 rounded-2xl p-8 text-center">
            <User className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-white mb-4">Authentication Required</h1>
            <p className="text-gray-300 mb-6">
              Please sign in to access your Cyfe dashboard widgets and analytics.
            </p>
            <button
              onClick={() => signIn()}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Cyfe Dashboard - Optz Analytics Platform</title>
        <meta name="description" content="Access your Cyfe widgets and analytics through the Optz dashboard. Real-time business intelligence and data visualization." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`https://${host}/dashboard`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Header */}
        <header className="relative z-10 bg-black/50 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Link href="/optz" className="text-2xl font-bold text-white">Optz</Link>
                <span className="ml-2 text-sm text-gray-400">Dashboard</span>
                {connectionStatus === 'connected' && (
                  <div className="ml-4 flex items-center text-green-400">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs">Connected</span>
                  </div>
                )}
                {connectionStatus === 'error' && (
                  <div className="ml-4 flex items-center text-red-400">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs">Connection Error</span>
                  </div>
                )}
              </div>
              <nav className="flex items-center space-x-6">
                <Link href="/optz" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link href="/optz/analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</Link>
                <div className="flex items-center text-gray-300">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm">{session?.user?.email}</span>
                </div>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Cyfe Analytics Dashboard</h1>
            <p className="text-gray-300">Access your business intelligence widgets and real-time analytics</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-900/50 border border-red-800 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                <div>
                  <h3 className="text-red-200 font-medium">Connection Error</h3>
                  <p className="text-red-300 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {ssoData && (
              <>
                <button
                  onClick={() => window.open(ssoData.dashboardUrls.full, '_blank')}
                  className="bg-black border border-gray-800 rounded-xl p-6 text-left hover:border-cyan-400 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Full Dashboard</h3>
                      <p className="text-gray-300 text-sm">Access complete Cyfe dashboard</p>
                    </div>
                    <Monitor className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                </button>
                
                <button
                  onClick={() => window.open(ssoData.dashboardUrls.widgets, '_blank')}
                  className="bg-black border border-gray-800 rounded-xl p-6 text-left hover:border-cyan-400 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Widget View</h3>
                      <p className="text-gray-300 text-sm">Browse individual widgets</p>
                    </div>
                    <Layout className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                </button>
              </>
            )}
            
            <button
              onClick={fetchWidgets}
              className="bg-black border border-gray-800 rounded-xl p-6 text-left hover:border-cyan-400 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Refresh Data</h3>
                  <p className="text-gray-300 text-sm">Sync latest widget data</p>
                </div>
                <RefreshCw className={`w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform ${loading ? 'animate-spin' : ''}`} />
              </div>
            </button>
          </div>

          {/* Widgets Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Available Widgets</h2>
              <span className="text-gray-400 text-sm">
                {widgets.length} widget{widgets.length !== 1 ? 's' : ''} available
              </span>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-black border border-gray-800 rounded-xl p-6 animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : widgets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {widgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{widget.name}</h3>
                        <p className="text-gray-400 text-sm">{widget.type}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        widget.status === 'active' 
                          ? 'bg-green-900/50 text-green-400' 
                          : 'bg-red-900/50 text-red-400'
                      }`}>
                        {widget.status}
                      </div>
                    </div>
                    
                    {widget.description && (
                      <p className="text-gray-300 text-sm mb-4">{widget.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Updated {new Date(widget.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {widget.dashboardUrl && (
                      <button
                        onClick={() => window.open(widget.dashboardUrl, '_blank')}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center"
                      >
                        Open Widget
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Widgets Available</h3>
                <p className="text-gray-500">
                  {error ? 'Unable to load widgets. Check your connection.' : 'No widgets have been configured yet.'}
                </p>
              </div>
            )}
          </div>

          {/* SSO Info */}
          {ssoData && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Session Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">User:</span>
                  <span className="text-white ml-2">{ssoData.user.name || ssoData.user.email}</span>
                </div>
                <div>
                  <span className="text-gray-400">Domain:</span>
                  <span className="text-cyan-400 ml-2">{ssoData.domain}</span>
                </div>
                <div>
                  <span className="text-gray-400">Session Expires:</span>
                  <span className="text-white ml-2">{new Date(ssoData.expires).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-400">Access Level:</span>
                  <span className="text-green-400 ml-2">Full Dashboard</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const host = req.headers.host || 'optz.siteoptz.ai';

  return {
    props: {
      host,
    },
  };
};
