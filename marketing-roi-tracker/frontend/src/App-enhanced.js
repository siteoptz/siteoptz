import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CampaignList from './components/CampaignList';
import CampaignWizard from './components/CampaignWizard';
import PlatformIntegrations from './components/PlatformIntegrations';
import Analytics from './components/Analytics';
import { TrendingUp, BarChart3, DollarSign, Target, Zap, User, LogOut, Plus } from 'lucide-react';
import axios from 'axios';

// Set default axios base URL
axios.defaults.baseURL = 'http://localhost:5001';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [campaigns, setCampaigns] = useState([]);
  const [connections, setConnections] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const [insights, setInsights] = useState({ insights: [], recommendations: [] });
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    // Check for stored authentication
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      initializeApp();
    }
  }, [user, token]);

  const initializeApp = async () => {
    try {
      await Promise.all([
        fetchDashboard(),
        fetchCampaigns(),
        fetchConnections(),
        fetchInsights()
      ]);
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    try {
      const response = await axios.get('/api/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('/api/campaigns');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const fetchConnections = async () => {
    try {
      const response = await axios.get('/api/platforms/connections');
      setConnections(response.data);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const fetchInsights = async () => {
    try {
      const response = await axios.get('/api/insights');
      setInsights(response.data);
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  };

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    
    if (userToken !== 'demo-token') {
      localStorage.setItem('token', userToken);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setActiveView('dashboard');
  };

  const handleCampaignCreate = async (campaignData) => {
    try {
      await fetchCampaigns();
      await fetchDashboard();
      setShowWizard(false);
      setActiveView('campaigns');
    } catch (error) {
      console.error('Error after campaign creation:', error);
    }
  };

  const refreshData = async () => {
    await initializeApp();
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <TrendingUp size={32} />
            <h1>Optz BI</h1>
          </div>
          
          <nav className="nav-menu">
            <button 
              className={activeView === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveView('dashboard')}
            >
              <BarChart3 size={20} />
              Dashboard
            </button>
            <button 
              className={activeView === 'campaigns' ? 'active' : ''}
              onClick={() => setActiveView('campaigns')}
            >
              <Target size={20} />
              Campaigns
            </button>
            <button 
              className={activeView === 'analytics' ? 'active' : ''}
              onClick={() => setActiveView('analytics')}
            >
              <DollarSign size={20} />
              Analytics
            </button>
            <button 
              className={activeView === 'integrations' ? 'active' : ''}
              onClick={() => setActiveView('integrations')}
            >
              <Zap size={20} />
              Integrations
              {connections.length > 0 && (
                <span className="connection-badge">{connections.length}</span>
              )}
            </button>
            <button 
              className="new-campaign-btn"
              onClick={() => setShowWizard(true)}
            >
              <Plus size={20} />
              New Campaign
            </button>
          </nav>

          <div className="user-menu">
            <div className="user-info">
              <User size={20} />
              <span>{user.name}</span>
              <span className="user-plan">{user.plan}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {/* Show campaign wizard as overlay */}
        {showWizard && (
          <div className="wizard-overlay">
            <CampaignWizard 
              onComplete={handleCampaignCreate}
              onCancel={() => setShowWizard(false)}
              connections={connections}
              token={token}
            />
          </div>
        )}

        {/* Insights banner */}
        {(insights.insights.length > 0 || insights.recommendations.length > 0) && activeView === 'dashboard' && (
          <div className="insights-banner">
            <div className="insights-content">
              <h3>💡 AI Insights</h3>
              {insights.insights.slice(0, 1).map((insight, index) => (
                <div key={index} className={`insight-item ${insight.type}`}>
                  <strong>{insight.title}</strong>
                  <p>{insight.message}</p>
                </div>
              ))}
              {insights.recommendations.slice(0, 1).map((rec, index) => (
                <div key={index} className={`insight-item recommendation`}>
                  <strong>💰 {rec.title}</strong>
                  <p>{rec.message}</p>
                  <span className="impact">{rec.expectedImpact}</span>
                </div>
              ))}
            </div>
            <button className="insights-expand" onClick={() => setActiveView('analytics')}>
              View All Insights
            </button>
          </div>
        )}

        {/* Main content area */}
        <div className="main-content">
          {activeView === 'dashboard' && (
            <Dashboard 
              data={dashboardData} 
              campaigns={campaigns}
              connections={connections}
              insights={insights}
              onRefresh={refreshData}
            />
          )}
          
          {activeView === 'campaigns' && (
            <CampaignList 
              campaigns={campaigns} 
              onRefresh={fetchCampaigns}
              token={token}
              onNewCampaign={() => setShowWizard(true)}
            />
          )}
          
          {activeView === 'analytics' && (
            <Analytics 
              insights={insights}
              campaigns={campaigns}
              token={token}
              onRefresh={fetchInsights}
            />
          )}
          
          {activeView === 'integrations' && (
            <PlatformIntegrations 
              user={user}
              token={token}
              onConnectionUpdate={fetchConnections}
            />
          )}
        </div>
      </main>

      {/* Status bar showing connection and sync status */}
      <div className="status-bar">
        <div className="status-item">
          <span className={`status-indicator ${connections.length > 0 ? 'connected' : 'disconnected'}`}></span>
          <span>{connections.length} platforms connected</span>
        </div>
        
        <div className="status-item">
          <span className="status-indicator synced"></span>
          <span>Last sync: {new Date().toLocaleTimeString()}</span>
        </div>

        <div className="status-item">
          <span>Plan: <strong>{user.plan?.toUpperCase()}</strong></span>
          {user.plan === 'free' && (
            <button className="upgrade-link">Upgrade to Pro</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;