// components/dashboard/GoogleServicesConnection.tsx
// Component for connecting Google services (Ads, Search Console, Tag Manager, Analytics)

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  CheckCircle, 
  ExternalLink, 
  AlertCircle, 
  RefreshCw,
  Search,
  Tag,
  BarChart3,
  Megaphone,
  Globe
} from 'lucide-react';

interface GoogleServiceStatus {
  platform: string;
  isConnected: boolean;
  lastConnected?: string;
  accountInfo?: any;
  scope?: string;
}

interface GoogleServicesConnectionProps {
  onConnectionChange?: (services: string[]) => void;
}

export const GoogleServicesConnection: React.FC<GoogleServicesConnectionProps> = ({
  onConnectionChange
}) => {
  const { data: session } = useSession();
  const [services, setServices] = useState<GoogleServiceStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Service configuration
  const serviceConfig = {
    'google-ads': {
      name: 'Google Ads',
      icon: <Megaphone className="w-5 h-5" />,
      description: 'Connect your Google Ads account to track campaign performance',
      color: 'blue'
    },
    'search-console': {
      name: 'Search Console',
      icon: <Search className="w-5 h-5" />,
      description: 'Monitor your website\'s search performance and indexing',
      color: 'green'
    },
    'tag-manager': {
      name: 'Tag Manager',
      icon: <Tag className="w-5 h-5" />,
      description: 'Manage your website tags and tracking codes',
      color: 'purple'
    },
    'analytics': {
      name: 'Google Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Access your website analytics and user behavior data',
      color: 'orange'
    }
  };

  // Load connection status from NextAuth session
  const loadServiceStatus = async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      
      // Check if we have Google tokens in the session
      const hasGoogleTokens = !!(session as any)?.accessToken && !!(session as any)?.googleScope;
      const googleScope = (session as any)?.googleScope || '';
      
      console.log('🔐 Checking session tokens:', {
        hasAccessToken: !!(session as any)?.accessToken,
        hasRefreshToken: !!(session as any)?.refreshToken,
        scope: googleScope
      });
      
      // Determine which services are connected based on granted scopes
      const serviceStatuses = Object.keys(serviceConfig).map(platform => {
        let isConnected = false;
        
        if (hasGoogleTokens) {
          switch (platform) {
            case 'google-ads':
              isConnected = googleScope.includes('https://www.googleapis.com/auth/adwords');
              break;
            case 'search-console':
              isConnected = googleScope.includes('https://www.googleapis.com/auth/webmasters.readonly');
              break;
            case 'tag-manager':
              isConnected = googleScope.includes('https://www.googleapis.com/auth/tagmanager.readonly');
              break;
            case 'analytics':
              isConnected = googleScope.includes('https://www.googleapis.com/auth/analytics.readonly');
              break;
          }
        }
        
        return {
          platform,
          isConnected,
          lastConnected: isConnected ? new Date().toISOString() : undefined,
          accountInfo: isConnected ? { connected: true } : null,
          scope: isConnected ? googleScope : null
        };
      });
      
      setServices(serviceStatuses);
      
      const connectedServices = serviceStatuses
        .filter(service => service.isConnected)
        .map(service => service.platform);
      
      onConnectionChange?.(connectedServices);
      
    } catch (error) {
      console.error('Error loading service status:', error);
      setError('Failed to load connection status');
    } finally {
      setLoading(false);
    }
  };

  // Connect to Google services via NextAuth
  const handleConnect = () => {
    setError(null);
    
    // Use NextAuth to sign in with Google (which now includes all our scopes)
    // This will trigger a re-authentication with the expanded scopes
    const currentUrl = window.location.href;
    window.location.href = `/api/auth/signin?callbackUrl=${encodeURIComponent(currentUrl)}`;
  };

  // Disconnect all Google services (NextAuth-based approach)
  const handleDisconnect = async (platform: string) => {
    if (!session?.user?.email) return;

    // Since we're using NextAuth tokens, disconnecting means signing out completely
    // Individual service disconnection isn't possible with this approach
    const confirmed = confirm(
      'This will sign you out completely since all Google services use the same authentication. Continue?'
    );
    
    if (confirmed) {
      window.location.href = '/api/auth/signout';
    }
  };

  // Load status on mount
  useEffect(() => {
    loadServiceStatus();
  }, [session?.user?.email]);

  // Handle URL parameters (success/error messages)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const error = params.get('error');
    
    if (success) {
      // Show success message and refresh status
      setTimeout(() => loadServiceStatus(), 1000);
    }
    
    if (error) {
      setError(error);
    }
  }, []);

  const connectedCount = services.filter(service => service.isConnected).length;
  const totalServices = Object.keys(serviceConfig).length;

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2 flex items-center">
            <Globe className="w-6 h-6 text-cyan-400 mr-2" />
            Google Services Integration
          </h2>
          <p className="text-gray-400 text-sm">
            {connectedCount > 0 
              ? `${connectedCount} of ${totalServices} services connected`
              : 'Connect your Google services to unlock powerful insights'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={loadServiceStatus}
            disabled={loading}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
            title="Refresh status"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          {connectedCount === 0 && (
            <button
              onClick={handleConnect}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Connect All Services</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center text-red-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        </div>
      )}

      {/* Service Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(serviceConfig).map(([platform, config]) => {
          const service = services.find(s => s.platform === platform);
          const isConnected = service?.isConnected || false;
          
          return (
            <div
              key={platform}
              className={`border rounded-lg p-4 transition-all ${
                isConnected 
                  ? 'border-green-500/30 bg-green-500/5' 
                  : 'border-gray-700 bg-gray-800/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`text-${config.color}-400`}>
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{config.name}</h3>
                    <p className="text-sm text-gray-400">{config.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isConnected ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <button
                        onClick={() => handleDisconnect(platform)}
                        className="text-gray-400 hover:text-red-400 text-xs px-2 py-1 hover:bg-red-500/10 rounded"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500 text-xs">Not connected</span>
                  )}
                </div>
              </div>
              
              {isConnected && service?.lastConnected && (
                <p className="text-xs text-gray-500">
                  Connected: {new Date(service.lastConnected).toLocaleDateString()}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Connect More Services Button */}
      {connectedCount > 0 && connectedCount < totalServices && (
        <div className="text-center">
          <button
            onClick={handleConnect}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Connect More Services</span>
          </button>
        </div>
      )}

      {/* Connection Benefits */}
      {connectedCount > 0 && (
        <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-blue-400 mb-2">✨ Connected Services Benefits:</h4>
          <ul className="text-sm text-blue-300 space-y-1">
            {connectedCount >= 1 && <li>• Access real-time performance data</li>}
            {connectedCount >= 2 && <li>• Cross-platform analytics and reporting</li>}
            {connectedCount >= 3 && <li>• Unified dashboard with all your metrics</li>}
            {connectedCount >= 4 && <li>• Complete Google ecosystem integration</li>}
          </ul>
        </div>
      )}
    </div>
  );
};