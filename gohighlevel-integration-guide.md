# 🚀 GoHighLevel Integration Guide for SiteOptz.ai

## 📊 Overview

This guide shows you how to add new subscribers to GoHighLevel pipelines and workflows using their API, perfect for your AI tool implementation and consulting business.

## 🔑 Prerequisites

### 1. GoHighLevel API Access
- GoHighLevel account with API access
- API key from your GoHighLevel dashboard
- Location ID (if using multi-location account)

### 2. Get Your API Credentials
1. Log into your GoHighLevel account
2. Go to **Settings** → **API Keys**
3. Create a new API key or use existing one
4. Note your **Location ID** from the URL or settings

## 🛠️ API Integration Setup

### 1. Environment Configuration
```bash
# Create environment file
touch .env.gohighlevel

# Add to .env.gohighlevel
GOHIGHLEVEL_API_KEY=your_api_key_here
GOHIGHLEVEL_LOCATION_ID=your_location_id_here
GOHIGHLEVEL_BASE_URL=https://services.leadconnectorhq.com
```

### 2. Install Required Dependencies
```bash
npm install axios dotenv
# or
yarn add axios dotenv
```

## 📝 Adding Subscribers to Pipelines

### 1. Basic Subscriber Addition
```javascript
// utils/gohighlevel-api.js
const axios = require('axios');
require('dotenv').config({ path: '.env.gohighlevel' });

class GoHighLevelAPI {
  constructor() {
    this.apiKey = process.env.GOHIGHLEVEL_API_KEY;
    this.locationId = process.env.GOHIGHLEVEL_LOCATION_ID;
    this.baseURL = process.env.GOHIGHLEVEL_BASE_URL;
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      }
    });
  }

  // Add subscriber to pipeline
  async addSubscriberToPipeline(pipelineId, subscriberData) {
    try {
      const response = await this.client.post(`/pipelines/${pipelineId}/subscribers`, {
        locationId: this.locationId,
        ...subscriberData
      });
      
      return response.data;
    } catch (error) {
      console.error('Error adding subscriber to pipeline:', error.response?.data || error.message);
      throw error;
    }
  }

  // Add subscriber to workflow
  async addSubscriberToWorkflow(workflowId, subscriberData) {
    try {
      const response = await this.client.post(`/workflows/${workflowId}/subscribers`, {
        locationId: this.locationId,
        ...subscriberData
      });
      
      return response.data;
    } catch (error) {
      console.error('Error adding subscriber to workflow:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = GoHighLevelAPI;
```

### 2. Enhanced Subscriber Management
```javascript
// utils/gohighlevel-subscriber-manager.js
const GoHighLevelAPI = require('./gohighlevel-api');

class SubscriberManager {
  constructor() {
    this.api = new GoHighLevelAPI();
  }

  // Add subscriber with custom fields
  async addSubscriberWithCustomFields(pipelineId, subscriberData, customFields = {}) {
    const enhancedData = {
      ...subscriberData,
      customFields: customFields
    };

    return await this.api.addSubscriberToPipeline(pipelineId, enhancedData);
  }

  // Add subscriber to multiple pipelines
  async addSubscriberToMultiplePipelines(pipelineIds, subscriberData) {
    const results = [];
    
    for (const pipelineId of pipelineIds) {
      try {
        const result = await this.api.addSubscriberToPipeline(pipelineId, subscriberData);
        results.push({ pipelineId, success: true, data: result });
      } catch (error) {
        results.push({ pipelineId, success: false, error: error.message });
      }
    }
    
    return results;
  }

  // Add subscriber with tags
  async addSubscriberWithTags(pipelineId, subscriberData, tags = []) {
    const enhancedData = {
      ...subscriberData,
      tags: tags
    };

    return await this.api.addSubscriberToPipeline(pipelineId, enhancedData);
  }
}

module.exports = SubscriberManager;
```

## 🎯 SiteOptz.ai Specific Implementation

### 1. AI Tool Implementation Pipeline
```javascript
// utils/siteoptz-gohighlevel.js
const SubscriberManager = require('./gohighlevel-subscriber-manager');

class SiteOptzGoHighLevel {
  constructor() {
    this.subscriberManager = new SubscriberManager();
    
    // Define your pipeline IDs
    this.pipelines = {
      freeTrial: 'pipeline_id_for_free_trial',
      starterPlan: 'pipeline_id_for_starter_plan',
      proPlan: 'pipeline_id_for_pro_plan',
      enterprisePlan: 'pipeline_id_for_enterprise_plan'
    };
    
    this.workflows = {
      emailCapture: 'workflow_id_for_email_capture',
      implementationGuide: 'workflow_id_for_implementation_guide',
      consultingScheduler: 'workflow_id_for_consulting_scheduler'
    };
  }

  // Add free trial subscriber
  async addFreeTrialSubscriber(subscriberData) {
    const customFields = {
      plan_type: 'free',
      source: subscriberData.source || 'website',
      ai_tools_interest: subscriberData.aiToolsInterest || 'general',
      business_size: subscriberData.businessSize || 'unknown'
    };

    const tags = ['free-trial', 'ai-tools', 'new-subscriber'];

    return await this.subscriberManager.addSubscriberWithTags(
      this.pipelines.freeTrial,
      subscriberData,
      tags
    );
  }

  // Add starter plan subscriber
  async addStarterPlanSubscriber(subscriberData) {
    const customFields = {
      plan_type: 'starter',
      source: subscriberData.source || 'website',
      implementation_priority: subscriberData.priority || 'medium',
      team_size: subscriberData.teamSize || 'unknown',
      current_ai_tools: subscriberData.currentTools || 'none'
    };

    const tags = ['starter-plan', 'ai-implementation', 'paying-customer'];

    return await this.subscriberManager.addSubscriberWithTags(
      this.pipelines.starterPlan,
      subscriberData,
      tags
    );
  }

  // Add pro plan subscriber
  async addProPlanSubscriber(subscriberData) {
    const customFields = {
      plan_type: 'pro',
      source: subscriberData.source || 'website',
      consulting_hours: subscriberData.consultingHours || 4,
      implementation_timeline: subscriberData.timeline || '3-months',
      budget_range: subscriberData.budget || 'unknown'
    };

    const tags = ['pro-plan', 'ai-consulting', 'enterprise-customer'];

    return await this.subscriberManager.addSubscriberWithTags(
      this.pipelines.proPlan,
      subscriberData,
      tags
    );
  }

  // Add enterprise subscriber
  async addEnterpriseSubscriber(subscriberData) {
    const customFields = {
      plan_type: 'enterprise',
      source: subscriberData.source || 'website',
      company_size: subscriberData.companySize || 'unknown',
      implementation_scope: subscriberData.scope || 'full-transformation',
      decision_makers: subscriberData.decisionMakers || 'unknown',
      budget_range: subscriberData.budget || 'enterprise'
    };

    const tags = ['enterprise-plan', 'ai-transformation', 'high-value-customer'];

    return await this.subscriberManager.addSubscriberWithTags(
      this.pipelines.enterprisePlan,
      subscriberData,
      tags
    );
  }

  // Add subscriber to email capture workflow
  async addToEmailCaptureWorkflow(subscriberData) {
    return await this.api.addSubscriberToWorkflow(
      this.workflows.emailCapture,
      subscriberData
    );
  }

  // Add subscriber to implementation guide workflow
  async addToImplementationWorkflow(subscriberData) {
    return await this.api.addSubscriberToWorkflow(
      this.workflows.implementationGuide,
      subscriberData
    );
  }
}

module.exports = SiteOptzGoHighLevel;
```

## 🔄 Integration with Your Pricing System

### 1. Update Email Capture Form
```javascript
// components/EmailCaptureForm.jsx
import React, { useState } from 'react';
import { SiteOptzGoHighLevel } from '../utils/siteoptz-gohighlevel';

const EmailCaptureForm = ({ source, tool, category, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const goHighLevel = new SiteOptzGoHighLevel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Submit to your API
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          source,
          tool,
          category
        })
      });

      if (response.ok) {
        // Add to GoHighLevel pipeline
        await goHighLevel.addFreeTrialSubscriber({
          email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' '),
          source,
          aiToolsInterest: tool || category,
          businessSize: 'unknown'
        });

        // Add to email capture workflow
        await goHighLevel.addToEmailCaptureWorkflow({
          email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' '),
          source
        });

        onSuccess?.();
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="email-capture-form">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Get Free Guide'}
      </button>
      
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EmailCaptureForm;
```

### 2. Update Pricing Page
```javascript
// components/PricingPage.jsx
import React, { useState } from 'react';
import { SiteOptzGoHighLevel } from '../utils/siteoptz-gohighlevel';

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const goHighLevel = new SiteOptzGoHighLevel();

  const handlePlanSelect = async (planId, planData) => {
    try {
      // Add to appropriate pipeline based on plan
      switch (planId) {
        case 'free':
          await goHighLevel.addFreeTrialSubscriber(planData);
          break;
        case 'starter':
          await goHighLevel.addStarterPlanSubscriber(planData);
          break;
        case 'pro':
          await goHighLevel.addProPlanSubscriber(planData);
          break;
        case 'enterprise':
          await goHighLevel.addEnterpriseSubscriber(planData);
          break;
      }

      // Redirect to checkout or next step
      window.location.href = `/checkout/${planId}`;
    } catch (error) {
      console.error('Error adding to pipeline:', error);
    }
  };

  return (
    <div className="pricing-page">
      {/* Your pricing cards */}
      <div className="pricing-grid">
        {pricingPlans.map(plan => (
          <div key={plan.id} className="pricing-card">
            <h3>{plan.name}</h3>
            <div className="price">${plan.price}</div>
            <button 
              onClick={() => handlePlanSelect(plan.id, {
                source: 'pricing-page',
                planType: plan.id,
                timestamp: new Date().toISOString()
              })}
              className="cta-button"
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
```

## 📊 API Endpoints for Your Backend

### 1. Subscribe API Endpoint
```javascript
// pages/api/subscribe.js
import { SiteOptzGoHighLevel } from '../../utils/siteoptz-gohighlevel';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, source, tool, category, planType } = req.body;
    
    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    const goHighLevel = new SiteOptzGoHighLevel();
    
    // Add to appropriate pipeline based on plan type
    let result;
    switch (planType) {
      case 'free':
        result = await goHighLevel.addFreeTrialSubscriber({
          email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' '),
          source,
          aiToolsInterest: tool || category
        });
        break;
      case 'starter':
        result = await goHighLevel.addStarterPlanSubscriber({
          email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' '),
          source,
          implementationPriority: 'medium'
        });
        break;
      case 'pro':
        result = await goHighLevel.addProPlanSubscriber({
          email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' '),
          source,
          consultingHours: 4
        });
        break;
      case 'enterprise':
        result = await goHighLevel.addEnterpriseSubscriber({
          email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' '),
          source,
          companySize: 'enterprise'
        });
        break;
      default:
        result = await goHighLevel.addFreeTrialSubscriber({
          email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' '),
          source,
          aiToolsInterest: tool || category
        });
    }

    // Add to email capture workflow
    await goHighLevel.addToEmailCaptureWorkflow({
      email,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' '),
      source
    });

    res.status(200).json({ 
      success: true, 
      message: 'Subscriber added successfully',
      goHighLevelId: result.id
    });

  } catch (error) {
    console.error('Error adding subscriber:', error);
    res.status(500).json({ 
      error: 'Failed to add subscriber',
      details: error.message
    });
  }
}
```

## 🔧 Testing Your Integration

### 1. Test Script
```javascript
// test-gohighlevel.js
const SiteOptzGoHighLevel = require('./utils/siteoptz-gohighlevel');

async function testGoHighLevelIntegration() {
  const goHighLevel = new SiteOptzGoHighLevel();
  
  try {
    // Test free trial subscriber
    const freeTrialResult = await goHighLevel.addFreeTrialSubscriber({
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      source: 'test',
      aiToolsInterest: 'chatgpt',
      businessSize: 'small'
    });
    
    console.log('✅ Free trial subscriber added:', freeTrialResult);
    
    // Test starter plan subscriber
    const starterResult = await goHighLevel.addStarterPlanSubscriber({
      email: 'starter@example.com',
      firstName: 'Starter',
      lastName: 'User',
      source: 'test',
      implementationPriority: 'high',
      teamSize: '5-10'
    });
    
    console.log('✅ Starter plan subscriber added:', starterResult);
    
  } catch (error) {
    console.error('❌ Error testing GoHighLevel integration:', error);
  }
}

testGoHighLevelIntegration();
```

### 2. Run Test
```bash
node test-gohighlevel.js
```

## 📈 Analytics Integration

### 1. Track GoHighLevel Events
```javascript
// utils/gohighlevel-analytics.js
export const trackGoHighLevelEvent = (eventType, subscriberData, pipelineId) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'gohighlevel_subscriber_added', {
      event_category: 'lead_generation',
      event_label: eventType,
      pipeline_id: pipelineId,
      subscriber_email: subscriberData.email,
      plan_type: subscriberData.planType || 'free',
      source: subscriberData.source
    });
  }
};
```

## 🚀 Best Practices

### 1. Error Handling
- Always wrap API calls in try-catch blocks
- Log errors for debugging
- Provide fallback behavior if GoHighLevel is unavailable

### 2. Data Validation
- Validate email formats
- Sanitize input data
- Check required fields before API calls

### 3. Rate Limiting
- Implement rate limiting to avoid API limits
- Use batch operations when possible
- Cache frequently accessed data

### 4. Security
- Store API keys securely
- Use environment variables
- Implement proper authentication

This integration will help you automatically add subscribers to your GoHighLevel pipelines and workflows based on their interactions with your AI tool implementation and consulting platform.
