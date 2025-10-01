import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Zap, Target, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import './CampaignWizard.css';

const CampaignWizard = ({ onComplete, onCancel, connections, token }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Promotional',
    channel: 'Google Ads',
    budget: '',
    start_date: '',
    end_date: '',
    platform_connection_id: '',
    auto_sync: false,
    goals: [],
    target_audience: '',
    expected_roi: ''
  });

  const steps = [
    { number: 1, title: 'Campaign Details', icon: Target },
    { number: 2, title: 'Platform Connection', icon: Zap },
    { number: 3, title: 'Budget & Timeline', icon: DollarSign },
    { number: 4, title: 'Goals & Targeting', icon: Calendar },
    { number: 5, title: 'Review & Launch', icon: CheckCircle }
  ];

  const campaignTypes = [
    { value: 'Promotional', label: 'Promotional Campaign', description: 'Promote products or services with special offers' },
    { value: 'Brand Awareness', label: 'Brand Awareness', description: 'Increase visibility and brand recognition' },
    { value: 'Lead Generation', label: 'Lead Generation', description: 'Capture potential customer information' },
    { value: 'Product Launch', label: 'Product Launch', description: 'Introduce new products to market' },
    { value: 'Retargeting', label: 'Retargeting', description: 'Re-engage previous website visitors' },
    { value: 'Seasonal', label: 'Seasonal Campaign', description: 'Time-sensitive holiday or event campaigns' }
  ];

  const campaignGoals = [
    { id: 'sales', label: 'Increase Sales', description: 'Drive direct revenue and conversions' },
    { id: 'leads', label: 'Generate Leads', description: 'Capture contact information for follow-up' },
    { id: 'traffic', label: 'Website Traffic', description: 'Increase visitors to your website' },
    { id: 'engagement', label: 'Social Engagement', description: 'Boost likes, shares, and comments' },
    { id: 'awareness', label: 'Brand Awareness', description: 'Increase brand recognition and recall' },
    { id: 'app_installs', label: 'App Installs', description: 'Drive mobile app downloads' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goalId) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId) 
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.type && formData.channel;
      case 2:
        return true; // Platform connection is optional
      case 3:
        return formData.budget && formData.start_date;
      case 4:
        return formData.goals.length > 0;
      case 5:
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        onComplete(data);
      } else {
        console.error('Error creating campaign');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      // In production without backend, simulate successful creation
      const simulatedCampaign = {
        id: Date.now(),
        ...formData,
        status: 'active',
        spent: 0,
        revenue: 0,
        roi: 0
      };
      
      // Show success and call onComplete
      alert(`Campaign "${formData.name}" created successfully! This is a demo environment.`);
      onComplete(simulatedCampaign);
    }
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;
        
        return (
          <div key={step.number} className="step-item">
            <div className={`step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              {isCompleted ? <CheckCircle size={16} /> : <Icon size={16} />}
            </div>
            <span className={`step-label ${isActive ? 'active' : ''}`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`step-connector ${isCompleted ? 'completed' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderStep1 = () => (
    <div className="wizard-step">
      <h3>Campaign Details</h3>
      <p>Let's start by setting up the basic information for your campaign</p>

      <div className="form-group">
        <label>Campaign Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="e.g., Black Friday Sale 2024"
        />
      </div>

      <div className="form-group">
        <label>Campaign Type *</label>
        <div className="type-grid">
          {campaignTypes.map(type => (
            <div 
              key={type.value}
              className={`type-card ${formData.type === type.value ? 'selected' : ''}`}
              onClick={() => handleInputChange('type', type.value)}
            >
              <h4>{type.label}</h4>
              <p>{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Marketing Channel *</label>
        <select 
          value={formData.channel} 
          onChange={(e) => handleInputChange('channel', e.target.value)}
        >
          <option value="Google Ads">Google Ads</option>
          <option value="Meta Ads">Meta Ads (Facebook/Instagram)</option>
          <option value="TikTok Ads">TikTok Ads</option>
          <option value="LinkedIn Ads">LinkedIn Ads</option>
          <option value="Twitter Ads">Twitter Ads</option>
          <option value="Email Marketing">Email Marketing</option>
          <option value="Organic Social">Organic Social</option>
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="wizard-step">
      <h3>Platform Connection</h3>
      <p>Connect to your advertising platform for automated data sync</p>

      <div className="connection-options">
        <div className="connection-option manual">
          <div className="option-header">
            <input
              type="radio"
              name="connection_type"
              value=""
              checked={!formData.platform_connection_id}
              onChange={() => handleInputChange('platform_connection_id', '')}
            />
            <h4>Manual Entry</h4>
          </div>
          <p>Enter campaign data manually without platform connection</p>
          <div className="option-features">
            <span>✓ Full control over data entry</span>
            <span>✓ No API setup required</span>
            <span>⚠ Manual updates needed</span>
          </div>
        </div>

        {connections.map(connection => (
          <div key={connection.id} className="connection-option connected">
            <div className="option-header">
              <input
                type="radio"
                name="connection_type"
                value={connection.id}
                checked={formData.platform_connection_id === connection.id}
                onChange={() => handleInputChange('platform_connection_id', connection.id)}
              />
              <h4>{connection.platform_name}</h4>
              <span className="connected-badge">Connected</span>
            </div>
            <p>Account: {connection.account_name}</p>
            <div className="option-features">
              <span>✓ Automatic data sync</span>
              <span>✓ Real-time updates</span>
              <span>✓ Historical data import</span>
            </div>
          </div>
        ))}

        {connections.length === 0 && (
          <div className="no-connections">
            <p>No platform connections found. You can add connections later in the Integrations section.</p>
          </div>
        )}
      </div>

      {formData.platform_connection_id && (
        <div className="auto-sync-option">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.auto_sync}
              onChange={(e) => handleInputChange('auto_sync', e.target.checked)}
            />
            <span>Enable automatic data sync (hourly updates)</span>
          </label>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="wizard-step">
      <h3>Budget & Timeline</h3>
      <p>Set your campaign budget and schedule</p>

      <div className="form-row">
        <div className="form-group">
          <label>Total Budget ($) *</label>
          <input
            type="number"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            placeholder="5000"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Expected ROI (%)</label>
          <input
            type="number"
            value={formData.expected_roi}
            onChange={(e) => handleInputChange('expected_roi', e.target.value)}
            placeholder="150"
            min="0"
            step="1"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Start Date *</label>
          <input
            type="date"
            value={formData.start_date}
            onChange={(e) => handleInputChange('start_date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={formData.end_date}
            onChange={(e) => handleInputChange('end_date', e.target.value)}
            min={formData.start_date}
          />
        </div>
      </div>

      <div className="budget-insights">
        <h4>Budget Recommendations</h4>
        <div className="insight-cards">
          <div className="insight-card">
            <span className="insight-label">Daily Budget</span>
            <span className="insight-value">
              ${formData.budget && formData.start_date && formData.end_date ? 
                (formData.budget / Math.ceil((new Date(formData.end_date) - new Date(formData.start_date)) / (1000 * 60 * 60 * 24))).toFixed(2) : 
                '0.00'}
            </span>
          </div>
          <div className="insight-card">
            <span className="insight-label">Industry Avg CPA</span>
            <span className="insight-value">$25-50</span>
          </div>
          <div className="insight-card">
            <span className="insight-label">Estimated Reach</span>
            <span className="insight-value">
              {formData.budget ? (Math.round(formData.budget * 10)).toLocaleString() : '0'} impressions
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="wizard-step">
      <h3>Goals & Targeting</h3>
      <p>Define your campaign objectives and target audience</p>

      <div className="form-group">
        <label>Campaign Goals * (Select all that apply)</label>
        <div className="goals-grid">
          {campaignGoals.map(goal => (
            <div 
              key={goal.id}
              className={`goal-card ${formData.goals.includes(goal.id) ? 'selected' : ''}`}
              onClick={() => handleGoalToggle(goal.id)}
            >
              <h4>{goal.label}</h4>
              <p>{goal.description}</p>
              {formData.goals.includes(goal.id) && (
                <CheckCircle className="goal-check" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Target Audience Description</label>
        <textarea
          value={formData.target_audience}
          onChange={(e) => handleInputChange('target_audience', e.target.value)}
          placeholder="Describe your target audience (age, interests, location, etc.)"
          rows="4"
        />
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="wizard-step">
      <h3>Review & Launch</h3>
      <p>Review your campaign settings before launching</p>

      <div className="review-summary">
        <div className="summary-section">
          <h4>Campaign Details</h4>
          <div className="summary-item">
            <span>Name:</span>
            <strong>{formData.name}</strong>
          </div>
          <div className="summary-item">
            <span>Type:</span>
            <strong>{formData.type}</strong>
          </div>
          <div className="summary-item">
            <span>Channel:</span>
            <strong>{formData.channel}</strong>
          </div>
        </div>

        <div className="summary-section">
          <h4>Budget & Timeline</h4>
          <div className="summary-item">
            <span>Budget:</span>
            <strong>${parseFloat(formData.budget || 0).toLocaleString()}</strong>
          </div>
          <div className="summary-item">
            <span>Start Date:</span>
            <strong>{formData.start_date}</strong>
          </div>
          {formData.end_date && (
            <div className="summary-item">
              <span>End Date:</span>
              <strong>{formData.end_date}</strong>
            </div>
          )}
        </div>

        <div className="summary-section">
          <h4>Goals</h4>
          <div className="goals-list">
            {formData.goals.map(goalId => {
              const goal = campaignGoals.find(g => g.id === goalId);
              return goal ? <span key={goalId} className="goal-tag">{goal.label}</span> : null;
            })}
          </div>
        </div>

        {formData.platform_connection_id && (
          <div className="summary-section">
            <h4>Platform Connection</h4>
            <div className="connection-status">
              <CheckCircle size={16} color="#10b981" />
              <span>Connected - Auto-sync {formData.auto_sync ? 'enabled' : 'disabled'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="campaign-wizard">
      <div className="wizard-header">
        <h2>Create New Campaign</h2>
        {renderStepIndicator()}
      </div>

      <div className="wizard-content">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>

      <div className="wizard-actions">
        <div className="action-left">
          {currentStep > 1 && (
            <button className="btn-secondary" onClick={prevStep}>
              <ChevronLeft size={16} />
              Previous
            </button>
          )}
        </div>

        <div className="action-right">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          
          {currentStep < 5 ? (
            <button 
              className="btn-primary" 
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button className="btn-primary" onClick={handleSubmit}>
              Launch Campaign
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignWizard;