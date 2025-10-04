// pages/dashboard/analytics.js
import React, { useState } from 'react';
import Head from 'next/head';
import GrafanaDashboard from '../../components/dashboard/GrafanaDashboard';

export default function AnalyticsDashboard() {
  const [selectedDashboard, setSelectedDashboard] = useState('siteoptz-analytics');
  const [theme, setTheme] = useState('dark');
  const [refreshInterval, setRefreshInterval] = useState('5m');

  const dashboards = [
    { id: 'siteoptz-analytics', name: 'Main Analytics', description: 'Overall site performance metrics' },
    { id: 'user-engagement', name: 'User Engagement', description: 'User behavior and interaction metrics' },
    { id: 'tool-comparisons', name: 'Tool Comparisons', description: 'Popular tool comparison analytics' },
    { id: 'revenue-metrics', name: 'Revenue Metrics', description: 'Conversion and revenue tracking' }
  ];

  return (
    <>
      <Head>
        <title>Analytics Dashboard - SiteOptz</title>
        <meta name="description" content="Real-time analytics and insights for SiteOptz AI tools comparison platform" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Analytics Dashboard
            </h1>
            <p className="text-gray-300">
              Real-time insights and performance metrics for SiteOptz platform
            </p>
          </div>

          <div className="bg-black border border-gray-800 rounded-lg p-6 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-400 text-sm mb-2">
                  Select Dashboard
                </label>
                <select
                  value={selectedDashboard}
                  onChange={(e) => setSelectedDashboard(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  {dashboards.map(dashboard => (
                    <option key={dashboard.id} value={dashboard.id}>
                      {dashboard.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Refresh Interval
                </label>
                <select
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(e.target.value)}
                  className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="5s">5 seconds</option>
                  <option value="10s">10 seconds</option>
                  <option value="30s">30 seconds</option>
                  <option value="1m">1 minute</option>
                  <option value="5m">5 minutes</option>
                  <option value="10m">10 minutes</option>
                  <option value="30m">30 minutes</option>
                  <option value="1h">1 hour</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-400 text-sm">
                {dashboards.find(d => d.id === selectedDashboard)?.description}
              </p>
            </div>
          </div>

          <div className="bg-black border border-gray-800 rounded-lg p-4">
            <GrafanaDashboard
              dashboardId={selectedDashboard}
              height="800px"
              theme={theme}
              refresh={refreshInterval}
              showToolbar={false}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-sm font-medium">Total Visits</h3>
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-white">Loading...</p>
              <p className="text-sm text-green-400 mt-1">+12.5% from last week</p>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-sm font-medium">Tool Comparisons</h3>
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-white">Loading...</p>
              <p className="text-sm text-green-400 mt-1">+8.3% from last week</p>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-sm font-medium">Avg. Session Duration</h3>
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-white">Loading...</p>
              <p className="text-sm text-red-400 mt-1">-2.1% from last week</p>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-sm font-medium">Conversion Rate</h3>
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-white">Loading...</p>
              <p className="text-sm text-green-400 mt-1">+15.7% from last week</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}