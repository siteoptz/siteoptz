import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calendar, Filter, Download, TrendingUp } from 'lucide-react';
import './Analytics.css';
import axios from 'axios';

const Analytics = () => {
  const [roiTrend, setRoiTrend] = useState([]);
  const [channelPerformance, setChannelPerformance] = useState([]);
  const [period, setPeriod] = useState('30');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [trendResponse, channelResponse] = await Promise.all([
        axios.get(`/api/analytics/roi-trend?period=${period}`),
        axios.get('/api/analytics/channel-performance')
      ]);
      
      setRoiTrend(trendResponse.data);
      setChannelPerformance(channelResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Revenue,Cost,ROI,Conversions\n"
      + roiTrend.map(row => 
          `${row.date},${row.revenue},${row.cost},${row.roi.toFixed(2)},${row.conversions}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "roi_analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="analytics">
      <div className="analytics-header">
        <div>
          <h2>Analytics & Insights</h2>
          <p>Deep dive into your marketing performance metrics</p>
        </div>
        <div className="header-actions">
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            className="period-select"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button onClick={exportData} className="export-btn">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading analytics...</div>
      ) : (
        <>
          <div className="analytics-grid">
            <div className="analytics-card full-width">
              <h3>ROI Trend Over Time</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={roiTrend}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    name="Revenue ($)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#82ca9d" 
                    fillOpacity={1} 
                    fill="url(#colorCost)" 
                    name="Cost ($)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="roi" 
                    stroke="#ff7300" 
                    strokeWidth={2}
                    name="ROI (%)"
                    dot={{ r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="analytics-card">
              <h3>Channel Performance Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={channelPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="channel" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value} />
                  <Legend />
                  <Bar dataKey="roi" fill="#8884d8" name="ROI %" />
                  <Bar dataKey="conversions" fill="#82ca9d" name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="analytics-card">
              <h3>Revenue by Channel</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={channelPerformance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="channel" type="category" stroke="#6b7280" />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="revenue" fill="#667eea" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="insights-section">
            <h3>Key Insights</h3>
            <div className="insights-grid">
              <div className="insight-card">
                <div className="insight-icon">
                  <TrendingUp size={24} />
                </div>
                <div className="insight-content">
                  <h4>Best Performing Channel</h4>
                  <p>{channelPerformance.length > 0 ? 
                    channelPerformance.reduce((a, b) => a.roi > b.roi ? a : b).channel : 'N/A'}</p>
                  <span className="insight-metric">
                    {channelPerformance.length > 0 ? 
                      Math.max(...channelPerformance.map(c => c.roi)).toFixed(1) : '0'}% ROI
                  </span>
                </div>
              </div>

              <div className="insight-card">
                <div className="insight-icon">
                  <Calendar size={24} />
                </div>
                <div className="insight-content">
                  <h4>Average Daily Revenue</h4>
                  <p>${roiTrend.length > 0 ? 
                    (roiTrend.reduce((sum, day) => sum + day.revenue, 0) / roiTrend.length).toFixed(2) : '0'}</p>
                  <span className="insight-metric">
                    Last {period} days
                  </span>
                </div>
              </div>

              <div className="insight-card">
                <div className="insight-icon">
                  <Filter size={24} />
                </div>
                <div className="insight-content">
                  <h4>Conversion Trend</h4>
                  <p>{roiTrend.length > 0 ? 
                    roiTrend.reduce((sum, day) => sum + day.conversions, 0) : '0'} total</p>
                  <span className="insight-metric">
                    {roiTrend.length > 0 ? 
                      (roiTrend.reduce((sum, day) => sum + day.conversions, 0) / roiTrend.length).toFixed(1) : '0'} avg/day
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;