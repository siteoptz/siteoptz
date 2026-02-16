// components/dashboard/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import Header from './Header';
import InsightPanel from './InsightPanel';

export default function DashboardLayout({ children, user }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const path = router.pathname;
    if (path.includes('google-ads')) setActiveTab('google-ads');
    else if (path.includes('meta-ads')) setActiveTab('meta-ads');
    else if (path.includes('analytics')) setActiveTab('analytics');
    else if (path.includes('insights')) setActiveTab('insights');
    else if (path.includes('automation')) setActiveTab('automation');
    else setActiveTab('overview');
    
    fetchInsights();
  }, [router.pathname]);

  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/insights/recent');
      const data = await response.json();
      setInsights(data.insights || []);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <Header user={user} />
          
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                {children}
              </div>
              
              <div className="space-y-6">
                <InsightPanel insights={insights} loading={loading} />
                
                <div className="bg-black border border-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => router.push('/dashboard/insights')}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Generate New Insights
                    </button>
                    <button 
                      onClick={() => router.push('/dashboard/automation')}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200"
                    >
                      Create Automation
                    </button>
                    <button className="w-full bg-gray-800 border border-gray-700 text-gray-300 px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                      Export Report
                    </button>
                  </div>
                </div>

                <div className="bg-black border border-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Connected Accounts</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Google Ads', status: 'connected', color: 'bg-green-500' },
                      { name: 'Meta Ads', status: 'connected', color: 'bg-green-500' },
                      { name: 'TikTok Ads', status: 'disconnected', color: 'bg-red-500' },
                      { name: 'LinkedIn Ads', status: 'disconnected', color: 'bg-red-500' }
                    ].map((account, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${account.color}`}></div>
                          <span className="text-gray-300">{account.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          account.status === 'connected' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-red-900 text-red-300'
                        }`}>
                          {account.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all duration-200">
                    Connect More Accounts
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}