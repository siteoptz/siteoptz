import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Target, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ data, campaigns }) => {
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

  const channelData = campaigns.reduce((acc, campaign) => {
    const existing = acc.find(item => item.channel === campaign.channel);
    if (existing) {
      existing.value += parseFloat(campaign.total_revenue || 0);
    } else {
      acc.push({ 
        channel: campaign.channel, 
        value: parseFloat(campaign.total_revenue || 0) 
      });
    }
    return acc;
  }, []);

  const recentMetrics = campaigns.slice(0, 5).map(c => ({
    name: c.name.substring(0, 15) + '...',
    roi: parseFloat(c.roi || 0),
    roas: parseFloat(c.roas || 0)
  }));

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Marketing Performance Dashboard</h2>
        <p>Real-time insights into your marketing ROI</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Overall ROI</span>
            <span className="metric-value">{data.overallROI || '0'}%</span>
            <span className="metric-change positive">
              <ArrowUp size={16} /> +12.5% from last month
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <DollarSign size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Total Revenue</span>
            <span className="metric-value">${(data.totalRevenue || 0).toLocaleString()}</span>
            <span className="metric-change positive">
              <ArrowUp size={16} /> +18.2% from last month
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <Target size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Total Conversions</span>
            <span className="metric-value">{(data.totalConversions || 0).toLocaleString()}</span>
            <span className="metric-change positive">
              <ArrowUp size={16} /> +7.8% from last month
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <Activity size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Active Campaigns</span>
            <span className="metric-value">{data.activeCampaigns || 0}</span>
            <span className="metric-change neutral">
              {data.totalCampaigns || 0} total campaigns
            </span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>ROI by Campaign</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recentMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="roi" fill="#8884d8" name="ROI %" />
              <Bar dataKey="roas" fill="#82ca9d" name="ROAS" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Revenue by Channel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.channel}: $${entry.value.toFixed(0)}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="campaign-performance">
        <h3>Top Performing Campaigns</h3>
        <div className="performance-table">
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Channel</th>
                <th>ROI</th>
                <th>ROAS</th>
                <th>CPA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.slice(0, 5).map((campaign) => (
                <tr key={campaign.id}>
                  <td className="campaign-name">{campaign.name}</td>
                  <td>{campaign.channel}</td>
                  <td className={parseFloat(campaign.roi) > 0 ? 'positive' : 'negative'}>
                    {campaign.roi}%
                  </td>
                  <td>{campaign.roas}x</td>
                  <td>${campaign.cpa}</td>
                  <td>
                    <span className={`status ${campaign.status}`}>
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;