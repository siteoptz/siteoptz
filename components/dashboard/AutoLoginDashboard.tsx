import React, { useEffect, useState, useCallback } from 'react';
import { BarChart3, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import CyfeSSOMiddleware from '@/lib/cyfe-sso-middleware';

interface AutoLoginDashboardProps {
  dashboardId: string;
  height?: string;
  width?: string;
  className?: string;
  userEmail?: string;
  plan?: string;
  showHeader?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number; // in seconds
}

export const AutoLoginDashboard: React.FC<AutoLoginDashboardProps> = ({
  dashboardId,
  height = '600px',
  width = '100%',
  className = '',
  userEmail,
  plan = 'pro',
  showHeader = true,
  autoRefresh = false,
  refreshInterval = 300 // 5 minutes default
}) => {
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Generate authenticated iframe URL
  const generateIframeUrl = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // If we have user email, generate a fresh token
      if (userEmail) {
        // Generate SSO token for iframe authentication
        const response = await fetch('/api/optz/generate-embed-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email: userEmail,
            plan,
            dashboardId
          })
        });

        if (!response.ok) {
          throw new Error('Failed to generate embed token');
        }

        const { embedUrl } = await response.json();
        setIframeUrl(embedUrl);
      } else {
        // Use direct Cyfe URL with auto-login token from cookies
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('optz-sso-token='))
          ?.split('=')[1];

        if (!token) {
          throw new Error('No authentication token found');
        }

        const embedUrl = CyfeSSOMiddleware.generateEmbedUrl({
          dashboardId,
          token,
          height,
          width
        });

        setIframeUrl(embedUrl);
      }

      setLastRefresh(new Date());
    } catch (err: any) {
      console.error('Dashboard loading error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dashboardId, userEmail, plan, height, width]);

  // Initial load
  useEffect(() => {
    generateIframeUrl();
  }, [dashboardId, userEmail, plan]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh || !refreshInterval) return;

    const interval = setInterval(() => {
      console.log('Auto-refreshing dashboard...');
      generateIframeUrl();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Handle iframe errors
  const handleIframeError = () => {
    setError('Failed to load dashboard. Please check your connection.');
    setLoading(false);
  };

  // Handle iframe load success
  const handleIframeLoad = () => {
    setLoading(false);
    setError(null);
  };

  // Open dashboard in new window
  const openInNewWindow = () => {
    if (iframeUrl) {
      window.open(iframeUrl.replace('/embed/', '/'), '_blank');
    }
  };

  // Retry loading
  const retryLoad = () => {
    generateIframeUrl();
  };

  // Determine dashboard name based on ID
  const getDashboardName = () => {
    const dashboardNames: Record<string, string> = {
      'basic_analytics': 'Basic Analytics',
      'marketing_roi': 'Marketing ROI Dashboard',
      'advanced_analytics': 'Advanced Analytics Suite',
      'revenue_attribution': 'Revenue Attribution',
      'executive_dashboard': 'Executive Command Center',
      'sales_pipeline': 'Sales Pipeline Analytics',
      'customer_success': 'Customer Success Metrics',
      'financial_overview': 'Financial Overview'
    };

    return dashboardNames[dashboardId] || 'Analytics Dashboard';
  };

  return (
    <div className={`bg-black border border-gray-800 rounded-xl overflow-hidden ${className}`}>
      {showHeader && (
        <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{getDashboardName()}</h3>
                <p className="text-sm text-gray-400">
                  {autoRefresh && `Auto-refreshes every ${refreshInterval}s`}
                  {lastRefresh && ` • Last updated: ${lastRefresh.toLocaleTimeString()}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!loading && !error && (
                <button
                  onClick={openInNewWindow}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Open in new window"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="relative" style={{ height, width }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
              <p className="text-gray-300">Loading dashboard...</p>
              <p className="text-gray-400 text-sm mt-1">Authenticating access</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <div className="text-center max-w-md mx-auto p-6">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <p className="text-white font-medium mb-2">Dashboard Load Error</p>
              <p className="text-gray-400 text-sm mb-4">{error}</p>
              <button
                onClick={retryLoad}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 
                         hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium 
                         transition-all duration-200"
              >
                Retry Loading
              </button>
            </div>
          </div>
        )}

        {iframeUrl && (
          <iframe
            src={iframeUrl}
            width={width}
            height={height}
            frameBorder="0"
            className={`${loading || error ? 'invisible' : 'visible'}`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="fullscreen"
            title={getDashboardName()}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        )}

        {!iframeUrl && !loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No dashboard configured</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Preset dashboard configurations for easy use
export const DashboardPresets = {
  BasicAnalytics: (props: Partial<AutoLoginDashboardProps>) => (
    <AutoLoginDashboard dashboardId="basic_analytics" height="500px" {...props} />
  ),
  MarketingROI: (props: Partial<AutoLoginDashboardProps>) => (
    <AutoLoginDashboard dashboardId="marketing_roi" height="600px" {...props} />
  ),
  AdvancedAnalytics: (props: Partial<AutoLoginDashboardProps>) => (
    <AutoLoginDashboard 
      dashboardId="advanced_analytics" 
      height="700px" 
      autoRefresh={true}
      refreshInterval={300}
      {...props} 
    />
  ),
  ExecutiveDashboard: (props: Partial<AutoLoginDashboardProps>) => (
    <AutoLoginDashboard 
      dashboardId="executive_dashboard" 
      height="800px" 
      autoRefresh={true}
      refreshInterval={180}
      {...props} 
    />
  )
};

export default AutoLoginDashboard;