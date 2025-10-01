import React, { useState } from 'react';
import { Edit, Trash2, Eye, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import './CampaignList.css';
import axios from 'axios';

const CampaignList = ({ campaigns, onRefresh }) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [metrics, setMetrics] = useState([]);

  const viewMetrics = async (campaignId) => {
    try {
      const response = await axios.get(`/api/campaigns/${campaignId}/metrics`);
      setMetrics(response.data);
      setSelectedCampaign(campaigns.find(c => c.id === campaignId));
      setShowMetrics(true);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const addMetrics = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const metricsData = {
      date: formData.get('date'),
      impressions: parseInt(formData.get('impressions')),
      clicks: parseInt(formData.get('clicks')),
      conversions: parseInt(formData.get('conversions')),
      revenue: parseFloat(formData.get('revenue')),
      cost: parseFloat(formData.get('cost'))
    };

    try {
      await axios.post(`/api/campaigns/${selectedCampaign.id}/metrics`, metricsData);
      viewMetrics(selectedCampaign.id);
      onRefresh();
      e.target.reset();
    } catch (error) {
      console.error('Error adding metrics:', error);
    }
  };

  return (
    <div className="campaign-list">
      <div className="list-header">
        <h2>Marketing Campaigns</h2>
        <div className="list-stats">
          <span>{campaigns.length} total campaigns</span>
          <span>{campaigns.filter(c => c.status === 'active').length} active</span>
        </div>
      </div>

      <div className="campaigns-grid">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-card">
            <div className="campaign-header">
              <h3>{campaign.name}</h3>
              <span className={`campaign-status ${campaign.status}`}>
                {campaign.status}
              </span>
            </div>

            <div className="campaign-meta">
              <span className="campaign-channel">{campaign.channel}</span>
              <span className="campaign-type">{campaign.type}</span>
            </div>

            <div className="campaign-metrics">
              <div className="metric">
                <span className="metric-label">ROI</span>
                <span className={`metric-value ${parseFloat(campaign.roi) > 0 ? 'positive' : 'negative'}`}>
                  {parseFloat(campaign.roi) > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {campaign.roi}%
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">ROAS</span>
                <span className="metric-value">{campaign.roas}x</span>
              </div>
              <div className="metric">
                <span className="metric-label">Revenue</span>
                <span className="metric-value">
                  <DollarSign size={14} />
                  {(campaign.total_revenue || 0).toLocaleString()}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Budget</span>
                <span className="metric-value">
                  <DollarSign size={14} />
                  {campaign.budget.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="campaign-performance-bar">
              <div className="performance-label">Budget Utilization</div>
              <div className="performance-bar">
                <div 
                  className="performance-fill"
                  style={{ width: `${Math.min(100, (campaign.total_cost / campaign.budget) * 100)}%` }}
                />
              </div>
              <span className="performance-text">
                {((campaign.total_cost / campaign.budget) * 100).toFixed(1)}% used
              </span>
            </div>

            <div className="campaign-actions">
              <button onClick={() => viewMetrics(campaign.id)} className="action-btn view">
                <Eye size={16} /> View Details
              </button>
              <button className="action-btn edit">
                <Edit size={16} /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {showMetrics && selectedCampaign && (
        <div className="metrics-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedCampaign.name} - Metrics</h3>
              <button onClick={() => setShowMetrics(false)} className="close-btn">×</button>
            </div>

            <div className="add-metrics-form">
              <h4>Add New Metrics</h4>
              <form onSubmit={addMetrics}>
                <div className="form-row">
                  <input type="date" name="date" required />
                  <input type="number" name="impressions" placeholder="Impressions" required />
                  <input type="number" name="clicks" placeholder="Clicks" required />
                </div>
                <div className="form-row">
                  <input type="number" name="conversions" placeholder="Conversions" required />
                  <input type="number" step="0.01" name="revenue" placeholder="Revenue" required />
                  <input type="number" step="0.01" name="cost" placeholder="Cost" required />
                </div>
                <button type="submit" className="submit-btn">Add Metrics</button>
              </form>
            </div>

            <div className="metrics-table">
              <h4>Historical Metrics</h4>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Impressions</th>
                    <th>Clicks</th>
                    <th>Conversions</th>
                    <th>Revenue</th>
                    <th>Cost</th>
                    <th>ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((metric) => (
                    <tr key={metric.id}>
                      <td>{new Date(metric.date).toLocaleDateString()}</td>
                      <td>{metric.impressions.toLocaleString()}</td>
                      <td>{metric.clicks.toLocaleString()}</td>
                      <td>{metric.conversions}</td>
                      <td>${metric.revenue.toFixed(2)}</td>
                      <td>${metric.cost.toFixed(2)}</td>
                      <td className={metric.revenue > metric.cost ? 'positive' : 'negative'}>
                        {((metric.revenue - metric.cost) / metric.cost * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignList;