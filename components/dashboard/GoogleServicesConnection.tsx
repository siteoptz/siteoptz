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

  // Load connection status
  const loadServiceStatus = async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      const response = await fetch('/api/marketing-platforms/google-unified/status');
      
      if (!response.ok) {
        throw new Error(`Failed to load status: ${response.status}`);
      }
      
      const data = await response.json();
      setServices(data.services || []);
      
      const connectedServices = data.services
        ?.filter((service: GoogleServiceStatus) => service.isConnected)
        ?.map((service: GoogleServiceStatus) => service.platform) || [];
      
      onConnectionChange?.(connectedServices);
      
    } catch (error) {
      console.error('Error loading service status:', error);
      setError('Failed to load connection status');
    } finally {
      setLoading(false);
    }
  };

  // Connect to Google services
  const handleConnect = () => {
    setError(null);
    
    // Generate the unified OAuth URL with all scopes
    const baseUrl = window.location.origin;
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      setError('Google Client ID not configured');
      return;
    }
    
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: `${baseUrl}/api/marketing-platforms/google-unified/callback`,
      scope: [
        'https://www.googleapis.com/auth/adwords',
        'https://www.googleapis.com/auth/webmasters.readonly', 
        'https://www.googleapis.com/auth/tagmanager.readonly',
        'https://www.googleapis.com/auth/analytics.readonly'
      ].join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
      state: 'google_unified_auth_state',
      include_granted_scopes: 'true'
    });
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    window.location.href = authUrl;
  };

  // Disconnect a specific service
  const handleDisconnect = async (platform: string) => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      const response = await fetch('/api/marketing-platforms/google-unified/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to disconnect: ${response.status}`);
      }
      
      await loadServiceStatus();
      
    } catch (error) {
      console.error('Error disconnecting service:', error);
      setError(`Failed to disconnect ${platform}`);
    } finally {
      setLoading(false);
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