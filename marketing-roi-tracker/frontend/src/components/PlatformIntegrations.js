import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, AlertCircle, RefreshCw, ExternalLink, Settings } from 'lucide-react';
import './PlatformIntegrations.css';

const PlatformIntegrations = ({ user, token }) => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState({});

  const platforms = [
    {
      id: 'google_ads',
      name: 'Google Ads',
      description: 'Import campaigns, keywords, and performance data',
      icon: '🔍',
      color: '#4285f4',
      features: ['Campaign data', 'Keyword performance', 'Ad spend tracking', 'Conversion metrics']
    },
    {
      id: 'meta_ads',
      name: 'Meta Ads',
      description: 'Connect Facebook and Instagram advertising accounts',
      icon: '📘',
      color: '#1877f2',
      features: ['Facebook campaigns', 'Instagram ads', 'Audience insights', 'Creative performance']
    },
    {
      id: 'tiktok_ads',
      name: 'TikTok Ads',
      description: 'Track TikTok advertising campaigns and metrics',
      icon: '🎵',
      color: '#fe2c55',
      features: ['Video ad campaigns', 'Audience targeting', 'Creative analytics', 'Conversion tracking']
    },
    {
      id: 'google_analytics',
      name: 'Google Analytics',
      description: 'Import website traffic and conversion data',
      icon: '📊',
      color: '#ff6f00',
      features: ['Website traffic', 'Goal conversions', 'User behavior', 'Attribution data']
    }
  ];

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch('/api/platforms/connections', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setConnections(data);
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectPlatform = async (platformId) => {
    try {
      const response = await fetch(`/api/platforms/auth-url/${platformId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        window.open(data.authUrl, '_blank', 'width=600,height=700');
        
        // Listen for successful connection
        const checkConnection = setInterval(() => {
          fetchConnections();
        }, 2000);
        
        setTimeout(() => clearInterval(checkConnection), 30000);
      }
    } catch (error) {
      console.error('Error connecting platform:', error);
    }
  };

  const syncPlatformData = async (platformId) => {
    setSyncing({ ...syncing, [platformId]: true });
    
    try {
      const response = await fetch(`/api/platforms/sync/${platformId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Sync completed:', data);
        fetchConnections();
      }
    } catch (error) {
      console.error('Error syncing platform:', error);
    } finally {
      setSyncing({ ...syncing, [platformId]: false });
    }
  };

  const isConnected = (platformId) => {
    return connections.some(conn => conn.platform === platformId);
  };

  const getConnectionStatus = (platformId) => {
    return connections.find(conn => conn.platform === platformId);
  };

  if (loading) {
    return (
      <div className="integrations-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading platform connections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="integrations-container">
      <div className="integrations-header">
        <h2>Platform Integrations</h2>
        <p>Connect your marketing platforms to automatically sync campaign data and metrics</p>
        
        <div className="connection-stats">
          <div className="stat">
            <span className="stat-number">{connections.length}</span>
            <span className="stat-label">Connected Platforms</span>
          </div>
          <div className="stat">
            <span className="stat-number">{platforms.length - connections.length}</span>
            <span className="stat-label">Available Platforms</span>
          </div>
        </div>
      </div>

      <div className="platforms-grid">
        {platforms.map((platform) => {
          const connected = isConnected(platform.id);
          const connectionInfo = getConnectionStatus(platform.id);
          
          return (
            <div key={platform.id} className={`platform-card ${connected ? 'connected' : ''}`}>
              <div className="platform-header">
                <div className="platform-icon" style={{ backgroundColor: platform.color }}>
                  <span>{platform.icon}</span>
                </div>
                <div className="platform-info">
                  <h3>{platform.name}</h3>
                  <p>{platform.description}</p>
                </div>
                <div className="platform-status">
                  {connected ? (
                    <CheckCircle size={24} color="#10b981" />
                  ) : (
                    <AlertCircle size={24} color="#6b7280" />
                  )}
                </div>
              </div>

              <div className="platform-features">
                <h4>Includes:</h4>
                <ul>
                  {platform.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
              </div>

              {connected && connectionInfo && (
                <div className="connection-info">
                  <div className="connection-details">
                    <span className="connection-account">
                      Account: {connectionInfo.account_name || connectionInfo.account_id}
                    </span>
                    <span className="connection-date">
                      Connected: {new Date(connectionInfo.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="platform-actions">
                {connected ? (
                  <div className="connected-actions">
                    <button 
                      className="sync-btn"
                      onClick={() => syncPlatformData(platform.id)}
                      disabled={syncing[platform.id]}
                    >
                      <RefreshCw size={16} className={syncing[platform.id] ? 'spinning' : ''} />
                      {syncing[platform.id] ? 'Syncing...' : 'Sync Now'}
                    </button>
                    <button className="settings-btn">
                      <Settings size={16} />
                      Settings
                    </button>
                  </div>
                ) : (
                  <button 
                    className="connect-btn"
                    onClick={() => connectPlatform(platform.id)}
                  >
                    <Plus size={16} />
                    Connect {platform.name}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="integration-help">
        <div className="help-card">
          <h3>🚀 Getting Started</h3>
          <ol>
            <li>Click "Connect" on your preferred marketing platform</li>
            <li>Authorize access to your advertising accounts</li>
            <li>Your campaign data will be automatically imported</li>
            <li>View real-time ROI analytics in your dashboard</li>
          </ol>
        </div>

        <div className="help-card">
          <h3>📊 What Gets Synced</h3>
          <ul>
            <li><strong>Campaign Data:</strong> Names, budgets, status, dates</li>
            <li><strong>Performance Metrics:</strong> Impressions, clicks, conversions</li>
            <li><strong>Cost Data:</strong> Spend, CPC, CPA, total costs</li>
            <li><strong>Revenue Data:</strong> Conversion values, ROAS, ROI</li>
          </ul>
        </div>

        <div className="help-card">
          <h3>🔄 Sync Frequency</h3>
          <p>
            Data is automatically synced every hour for connected platforms. 
            You can also trigger manual syncs anytime using the "Sync Now" button.
          </p>
        </div>
      </div>

      {user?.plan === 'free' && (
        <div className="upgrade-banner">
          <h3>🚀 Unlock All Integrations</h3>
          <p>Connect unlimited platforms and get advanced analytics with our Pro plan</p>
          <button className="upgrade-btn">
            <ExternalLink size={16} />
            Upgrade to Pro - $199/month
          </button>
        </div>
      )}
    </div>
  );
};

export default PlatformIntegrations;