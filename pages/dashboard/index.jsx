// pages/dashboard/index.jsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DataCard from '../../components/dashboard/DataCard';
import ChartComponent from '../../components/dashboard/ChartComponent';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function DashboardIndex() {
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/login');
    }
    
    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/overview');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Marketing Dashboard - SiteOptz</title>
        <meta name="description" content="Comprehensive marketing analytics and insights dashboard" />
      </Head>

      <DashboardLayout user={session?.user}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
              <p className="text-gray-400 mt-1">Welcome back, {session?.user?.name}</p>
            </div>
            
            <div className="flex space-x-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700">
                Generate Insights
              </button>
              <button className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Export Data
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DataCard
              title="Total Revenue"
              value={dashboardData?.metrics?.total_revenue || 'Loading...'}
              change="+12.5%"
              trend="up"
              icon="💰"
            />
            <DataCard
              title="Total Clicks"
              value={dashboardData?.metrics?.total_clicks || 'Loading...'}
              change="+8.3%"
              trend="up"
              icon="👆"
            />
            <DataCard
              title="Conversion Rate"
              value={dashboardData?.metrics?.conversion_rate || 'Loading...'}
              change="-2.1%"
              trend="down"
              icon="📈"
            />
            <DataCard
              title="ROAS"
              value={dashboardData?.metrics?.roas || 'Loading...'}
              change="+15.7%"
              trend="up"
              icon="🎯"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartComponent
              type="line"
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                  label: 'Revenue',
                  data: [12000, 19000, 15000, 25000, 22000, 30000],
                  color: '#3B82F6'
                }]
              }}
              options={{ title: 'Revenue Trend' }}
            />
            
            <ChartComponent
              type="doughnut"
              data={{
                labels: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads'],
                values: [45, 30, 15, 10],
                colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
              }}
              options={{ title: 'Traffic Sources' }}
            />
          </div>

          <div className="bg-black border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'Google Ads campaign optimized', time: '2 hours ago', type: 'optimization' },
                { action: 'New insight generated for Meta campaigns', time: '4 hours ago', type: 'insight' },
                { action: 'Budget automation triggered', time: '6 hours ago', type: 'automation' },
                { action: 'Weekly report generated', time: '1 day ago', type: 'report' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'optimization' ? 'bg-green-400' :
                      activity.type === 'insight' ? 'bg-blue-400' :
                      activity.type === 'automation' ? 'bg-purple-400' :
                      'bg-gray-400'
                    }`}></div>
                    <span className="text-gray-300">{activity.action}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}