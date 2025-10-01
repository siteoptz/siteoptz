import React, { useState } from 'react';
import './CampaignForm.css';

const CampaignForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Promotional',
    channel: 'Google Ads',
    budget: '',
    start_date: '',
    end_date: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="campaign-form">
      <div className="form-header">
        <h2>Create New Campaign</h2>
        <p>Set up a new marketing campaign and start tracking ROI</p>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-section">
          <h3>Campaign Details</h3>
          
          <div className="form-group">
            <label>Campaign Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Summer Sale 2024"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Campaign Type *</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Promotional">Promotional</option>
                <option value="Seasonal">Seasonal</option>
                <option value="Branding">Branding</option>
                <option value="Product Launch">Product Launch</option>
                <option value="Email">Email</option>
                <option value="Content">Content</option>
                <option value="Video">Video</option>
                <option value="Social">Social</option>
              </select>
            </div>

            <div className="form-group">
              <label>Marketing Channel *</label>
              <select name="channel" value={formData.channel} onChange={handleChange}>
                <option value="Google Ads">Google Ads</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter">Twitter</option>
                <option value="YouTube">YouTube</option>
                <option value="Email">Email</option>
                <option value="Organic Search">Organic Search</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Budget & Timeline</h3>
          
          <div className="form-group">
            <label>Total Budget ($) *</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g., 5000"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary">Create Campaign</button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;