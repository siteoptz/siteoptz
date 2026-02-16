import React, { useState } from 'react';
import {
  Settings,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  Shield,
  Zap,
  Database,
  Lock,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

interface PlatformConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  lastSync: string;
  campaigns: number;
  credentials: {
    apiKey?: string;
    accessToken?: string;
    refreshToken?: string;
    accountId?: string;
    webPropertyId?: string;
  };
  permissions: string[];
  features: string[];
  setupSteps: string[];
}

const platforms: PlatformConfig[] = [
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Connect your Google Ads account to track campaigns, keywords, and performance metrics.',
    icon: <Globe className="w-6 h-6" />,
    status: 'connected',
    lastSync: '2 minutes ago',
    campaigns: 12,
    credentials: {
      accessToken: '***hidden***',
      refreshToken: '***hidden***',
      accountId: '123-456-7890'
    },
    permissions: [
      'Read campaign data',
      'Read performance metrics',
      'Read cost data',
      'Read conversion data'
    ],
    features: [
      'Campaign performance tracking',
      'Keyword analysis',
      'Cost per acquisition (CPA)',
      'Return on ad spend (ROAS)',
      'Conversion tracking'
    ],
    setupSteps: [
      'Create Google Ads API credentials',
      'Authorize SiteOptz access',
      'Select account and campaigns',
      'Configure data sync frequency'
    ]
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads (Facebook/Instagram)',
    description: 'Integrate with Meta Ads Manager to monitor Facebook and Instagram campaign performance.',
    icon: <Smartphone className="w-6 h-6" />,
    status: 'connected',
    lastSync: '5 minutes ago',
    campaigns: 8,
    credentials: {
      accessToken: '***hidden***',
      accountId: 'act_123456789'
    },
    permissions: [
      'Read ad account data',
      'Read campaign insights',
      'Read creative performance',
      'Read audience insights'
    ],
    features: [
      'Campaign performance tracking',
      'Creative performance analysis',
      'Audience insights',
      'Cost per result tracking',
      'Conversion tracking'
    ],
    setupSteps: [
      'Create Meta Developer App',
      'Generate access token',
      'Configure permissions',
      'Select ad accounts'
    ]
  },
  {
    id: 'tiktok-ads',
    name: 'TikTok Ads',
    description: 'Connect TikTok Ads Manager to track video ad performance and engagement metrics.',
    icon: <Monitor className="w-6 h-6" />,
    status: 'connected',
    lastSync: '1 minute ago',
    campaigns: 5,
    credentials: {
      accessToken: '***hidden***',
      accountId: 'TikTok_123456'
    },
    permissions: [
      'Read campaign data',
      'Read ad performance',
      'Read audience data',
      'Read creative insights'
    ],
    features: [
      'Video ad performance',
      'Engagement metrics',
      'Audience demographics',
      'Cost per view (CPV)',
      'Click-through rates'
    ],
    setupSteps: [
      'Create TikTok Developer Account',
      'Generate API credentials',
      'Authorize application access',
      'Configure data permissions'
    ]
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Link Google Analytics to track website traffic, conversions, and user behavior.',
    icon: <Database className="w-6 h-6" />,
    status: 'connected',
    lastSync: '3 minutes ago',
    campaigns: 0,
    credentials: {
      accessToken: '***hidden***',
      webPropertyId: 'UA-123456789-1'
    },
    permissions: [
      'Read analytics data',
      'Read conversion data',
      'Read audience data',
      'Read ecommerce data'
    ],
    features: [
      'Traffic source analysis',
      'Conversion tracking',
      'User behavior insights',
      'Goal completions',
      'Revenue attribution'
    ],
    setupSteps: [
      'Create Google Analytics API credentials',
      'Configure OAuth 2.0',
      'Select properties and views',
      'Set up data collection'
    ]
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    description: 'Connect LinkedIn Campaign Manager for B2B advertising performance tracking.',
    icon: <Globe className="w-6 h-6" />,
    status: 'disconnected',
    lastSync: 'Never',
    campaigns: 0,
    credentials: {},
    permissions: [
      'Read campaign data',
      'Read account insights',
      'Read audience data',
      'Read creative performance'
    ],
    features: [
      'B2B campaign tracking',
      'Professional audience insights',
      'Lead generation metrics',
      'Cost per lead (CPL)',
      'Conversion tracking'
    ],
    setupSteps: [
      'Create LinkedIn Developer App',
      'Generate access tokens',
      'Configure API permissions',
      'Select ad accounts'
    ]
  },
  {
    id: 'twitter-ads',
    name: 'Twitter Ads',
    description: 'Integrate with Twitter Ads Manager for social media campaign analytics.',
    icon: <Globe className="w-6 h-6" />,
    status: 'disconnected',
    lastSync: 'Never',
    campaigns: 0,
    credentials: {},
    permissions: [
      'Read campaign data',
      'Read ad performance',
      'Read audience insights',
      'Read engagement data'
    ],
    features: [
      'Tweet engagement tracking',
      'Audience insights',
      'Cost per engagement',
      'Conversion tracking',
      'Hashtag performance'
    ],
    setupSteps: [
      'Create Twitter Developer Account',
      'Generate API keys',
      'Configure OAuth permissions',
      'Select ad accounts'
    ]
  }
];

export default function PlatformIntegrations() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformConfig | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showCredentials, setShowCredentials] = useState<string | null>(null);

  const handleConnect = async (platformId: string) => {
    setIsConnecting(true);
    // Simulate API connection
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsConnecting(false);
  };

  const handleDisconnect = async (platformId: string) => {
    // Simulate disconnection
    console.log(`Disconnecting ${platformId}`);
  };

  const handleRefresh = async (platformId: string) => {
    // Simulate data refresh
    console.log(`Refreshing data for ${platformId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'disconnected': return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
      case 'error': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'disconnected': return <Clock className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Zap className="w-7 h-7 text-purple-400 mr-3" />
            Platform Integrations
          </h2>
          <p className="text-gray-400 mt-1">
            Connect your marketing platforms for unified analytics and insights
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </button>
      </div>

      {/* Integration Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-900/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+2 this week</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {platforms.filter(p => p.status === 'connected').length}
          </h3>
          <p className="text-gray-400 text-sm">Connected Platforms</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-900/20 rounded-lg">
              <Database className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-medium">Real-time</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {platforms.reduce((sum, p) => sum + p.campaigns, 0)}
          </h3>
          <p className="text-gray-400 text-sm">Total Campaigns</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-900/20 rounded-lg">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-purple-400 text-sm font-medium">Secure</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">100%</h3>
          <p className="text-gray-400 text-sm">Data Security</p>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <div key={platform.id} className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-800 rounded-lg text-gray-300">
                  {platform.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{platform.name}</h3>
                  <p className="text-gray-400 text-sm">{platform.campaigns} campaigns</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs border ${getStatusColor(platform.status)}`}>
                {getStatusIcon(platform.status)}
                {platform.status}
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4">{platform.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Last Sync:</span>
                <span className="text-gray-300">{platform.lastSync}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Permissions:</span>
                <span className="text-gray-300">{platform.permissions.length} granted</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {platform.status === 'connected' ? (
                <>
                  <button
                    onClick={() => handleRefresh(platform.id)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all text-sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                  <button
                    onClick={() => setSelectedPlatform(platform)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </button>
                  <button
                    onClick={() => setShowCredentials(platform.id)}
                    className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
                  >
                    <Lock className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleConnect(platform.id)}
                  disabled={isConnecting}
                  className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50"
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Connect
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Platform Configuration Modal */}
      {selectedPlatform && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg text-gray-300">
                    {selectedPlatform.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedPlatform.name} Configuration</h3>
                    <p className="text-gray-400 text-sm">Manage your integration settings</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlatform(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedPlatform.status)}`}>
                  {getStatusIcon(selectedPlatform.status)}
                  {selectedPlatform.status}
                </div>
                <span className="text-gray-400">Last sync: {selectedPlatform.lastSync}</span>
              </div>

              {/* Credentials */}
              <div>
                <h4 className="text-white font-semibold mb-3">API Credentials</h4>
                <div className="space-y-3">
                  {Object.entries(selectedPlatform.credentials).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-gray-400 font-mono text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="text-white font-semibold mb-3">Granted Permissions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedPlatform.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-green-300 text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-white font-semibold mb-3">Available Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedPlatform.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                      <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-blue-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Settings
                </button>
                <button
                  onClick={() => handleDisconnect(selectedPlatform.id)}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all ml-auto"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Shield className="w-6 h-6 text-purple-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-purple-400 font-semibold mb-2">Secure Data Handling</h4>
            <p className="text-gray-300 text-sm mb-3">
              All platform credentials are encrypted and stored securely. We use OAuth 2.0 for authentication 
              and never store your passwords. API access is limited to read-only permissions for data analysis.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                End-to-end encryption
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                SOC 2 compliant
              </span>
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3" />
                Read-only access
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
