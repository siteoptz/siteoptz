import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';
import Analytics from './components/Analytics';
import { TrendingUp, BarChart3, DollarSign, Target } from 'lucide-react';
import axios from 'axios';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [campaigns, setCampaigns] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchCampaigns();
  }, []);

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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setLoading(false);
    }
  };

  const handleCampaignCreate = async (campaignData) => {
    try {
      await axios.post('/api/campaigns', campaignData);
      fetchCampaigns();
      fetchDashboard();
      setActiveView('campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <TrendingUp size={32} />
            <h1>Marketing ROI Tracker</h1>
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
              className={activeView === 'new-campaign' ? 'active' : ''}
              onClick={() => setActiveView('new-campaign')}
            >
              + New Campaign
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {activeView === 'dashboard' && (
              <Dashboard data={dashboardData} campaigns={campaigns} />
            )}
            {activeView === 'campaigns' && (
              <CampaignList campaigns={campaigns} onRefresh={fetchCampaigns} />
            )}
            {activeView === 'analytics' && (
              <Analytics />
            )}
            {activeView === 'new-campaign' && (
              <CampaignForm onSubmit={handleCampaignCreate} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;