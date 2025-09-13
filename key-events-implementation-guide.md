# 🎯 Key Events Implementation Guide for SiteOptz.ai

## 📊 Overview

This guide provides a comprehensive approach to implementing key events for siteoptz.ai, building on your existing analytics infrastructure.

## 🔑 Essential Key Events

### 1. **Lead Generation Events**
```javascript
// Email capture from different sources
trackEmailCapture('comparison_page', 'chatgpt_vs_jasper');
trackEmailCapture('pricing_calculator', 'team_size_5');
trackEmailCapture('webinar_registration', 'ai_automation_webinar');

// Lead magnet downloads
trackDownload('ai_tools_guide_2025.pdf', 'comparison_page', 'chatgpt_vs_jasper');
trackDownload('pricing_calculator_guide.pdf', 'pricing_calculator');
```

### 2. **Tool Comparison Events**
```javascript
// Comparison page views
trackComparisonView('chatgpt', 'jasper_ai', 'organic_search');
trackComparisonView('claude', 'chatgpt', 'direct_traffic');

// Comparison interactions
trackEvent('comparison_filter_applied', {
  event_category: 'engagement',
  event_label: 'price_range_$50_$200',
  tools_compared: ['chatgpt', 'jasper_ai']
});

// Feature comparison clicks
trackEvent('feature_comparison_click', {
  event_category: 'engagement',
  event_label: 'pricing_comparison',
  tool_1: 'chatgpt',
  tool_2: 'jasper_ai',
  feature: 'pricing'
});
```

### 3. **Pricing Calculator Events**
```javascript
// Calculator usage
trackPricingCalculation(
  ['chatgpt', 'jasper_ai'], 
  150, // monthly total
  1500, // yearly total
  5 // team size
);

// Tool selection in calculator
trackToolSelection(['chatgpt', 'claude'], 10, 'heavy_usage');

// Calculator interactions
trackEvent('calculator_team_size_changed', {
  event_category: 'engagement',
  event_label: 'team_size_updated',
  old_size: 5,
  new_size: 10,
  tools_selected: ['chatgpt', 'jasper_ai']
});
```

### 4. **Affiliate & Conversion Events**
```javascript
// Affiliate link clicks
trackCTAClick('ChatGPT Plus', 'pricing_button', 'https://chat.openai.com/plus');
trackCTAClick('Jasper AI', 'free_trial', 'https://jasper.ai/free-trial');

// Conversion tracking
trackEvent('affiliate_conversion', {
  event_category: 'conversion',
  event_label: 'chatgpt_plus_signup',
  tool_name: 'chatgpt',
  plan_type: 'plus',
  value: 20.00,
  currency: 'USD'
});
```

### 5. **Content Engagement Events**
```javascript
// FAQ interactions
trackFAQInteraction('What is the difference between ChatGPT and Jasper AI?', 'chatgpt_vs_jasper');

// Content scroll tracking
trackEvent('content_section_viewed', {
  event_category: 'engagement',
  event_label: 'pricing_comparison_section',
  page: 'chatgpt_vs_jasper',
  section: 'pricing'
});

// Social sharing
trackSocialShare('twitter', 'comparison', 'chatgpt_vs_jasper');
```

### 6. **User Journey Events**
```javascript
// Funnel progression
trackFunnelStep('landing', 'chatgpt', 'jasper_ai');
trackFunnelStep('comparison_viewed', 'chatgpt', 'jasper_ai');
trackFunnelStep('calculator_used', 'chatgpt', 'jasper_ai');
trackFunnelStep('email_captured', 'chatgpt', 'jasper_ai');
trackFunnelStep('cta_clicked', 'chatgpt', 'jasper_ai');

// User journey completion
const journey = new UserJourney();
journey.addStep('page_landed', { source: 'google_search' });
journey.addStep('comparison_viewed', { tools: ['chatgpt', 'jasper_ai'] });
journey.addStep('calculator_used', { team_size: 5 });
journey.addStep('email_captured', { source: 'pricing_calculator' });
journey.complete(true); // true = converted
```

## 🛠️ Implementation Steps

### Step 1: Update Analytics Configuration

```javascript
// utils/analytics.js - Add these new event functions
export const trackKeyEvent = (eventType, eventData) => {
  const eventMap = {
    'lead_generated': trackEmailCapture,
    'tool_comparison': trackComparisonView,
    'pricing_calculated': trackPricingCalculation,
    'affiliate_clicked': trackCTAClick,
    'content_engaged': trackFAQInteraction,
    'funnel_progressed': trackFunnelStep
  };
  
  const trackFunction = eventMap[eventType];
  if (trackFunction) {
    trackFunction(eventData.source, eventData.tool, eventData.additional);
  }
  
  // Always track as generic event too
  trackEvent(eventType, eventData);
};

// Enhanced conversion tracking
export const trackConversion = (conversionType, value, metadata = {}) => {
  trackEvent('conversion', {
    event_category: 'conversion',
    event_label: conversionType,
    value: value,
    currency: 'USD',
    ...metadata
  });
  
  // Track as GA4 conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
      value: value,
      currency: 'USD',
      ...metadata
    });
  }
};
```

### Step 2: Create Event Configuration

```javascript
// config/events.js
export const KEY_EVENTS_CONFIG = {
  // Lead generation events
  lead_events: {
    email_capture: {
      value: 10,
      category: 'lead_generation',
      conversion: true
    },
    webinar_registration: {
      value: 15,
      category: 'lead_generation',
      conversion: true
    },
    guide_download: {
      value: 5,
      category: 'lead_generation',
      conversion: true
    }
  },
  
  // Engagement events
  engagement_events: {
    comparison_view: {
      value: 1,
      category: 'engagement',
      conversion: false
    },
    calculator_usage: {
      value: 3,
      category: 'engagement',
      conversion: false
    },
    faq_interaction: {
      value: 1,
      category: 'engagement',
      conversion: false
    }
  },
  
  // Conversion events
  conversion_events: {
    affiliate_click: {
      value: 2,
      category: 'affiliate',
      conversion: false
    },
    tool_signup: {
      value: 25,
      category: 'conversion',
      conversion: true
    }
  }
};

// Event validation and tracking
export const trackKeyEventWithConfig = (eventType, eventData) => {
  const config = KEY_EVENTS_CONFIG[eventType];
  if (!config) {
    console.warn(`Unknown event type: ${eventType}`);
    return;
  }
  
  const trackingData = {
    event_category: config.category,
    event_label: eventData.label || eventType,
    value: config.value,
    ...eventData
  };
  
  trackEvent(eventType, trackingData);
  
  if (config.conversion) {
    trackConversion(eventType, config.value, eventData);
  }
};
```

### Step 3: Implement in Components

```javascript
// components/ToolComparisonTable.tsx
import { trackKeyEventWithConfig } from '../config/events';

const ToolComparisonTable = ({ tools }) => {
  const handleToolComparison = (tool1, tool2) => {
    trackKeyEventWithConfig('comparison_view', {
      tool_1: tool1.name,
      tool_2: tool2.name,
      source: 'comparison_table',
      label: `${tool1.name}_vs_${tool2.name}`
    });
  };
  
  const handleFeatureClick = (feature, tool1, tool2) => {
    trackKeyEventWithConfig('engagement_events', {
      event_type: 'feature_comparison_click',
      feature: feature,
      tool_1: tool1.name,
      tool_2: tool2.name,
      label: `feature_${feature}_comparison`
    });
  };
  
  // ... component implementation
};

// components/PricingCalculator.tsx
const PricingCalculator = ({ tools }) => {
  const handleCalculation = (selectedTools, teamSize, usage) => {
    const monthlyTotal = calculateMonthlyCost(selectedTools, teamSize, usage);
    
    trackKeyEventWithConfig('calculator_usage', {
      tools_selected: selectedTools.map(t => t.name),
      team_size: teamSize,
      usage_level: usage,
      monthly_total: monthlyTotal,
      label: `calculator_${selectedTools.length}_tools_${teamSize}_team`
    });
  };
  
  // ... component implementation
};

// components/EmailCaptureForm.tsx
const EmailCaptureForm = ({ source, tool, category }) => {
  const handleEmailSubmit = async (emailData) => {
    try {
      // Submit email
      await submitEmail(emailData);
      
      // Track successful email capture
      trackKeyEventWithConfig('email_capture', {
        source: source,
        tool: tool,
        category: category,
        label: `email_capture_${source}`,
        email_domain: emailData.email.split('@')[1]
      });
      
    } catch (error) {
      // Track failed email capture
      trackEvent('email_capture_failed', {
        event_category: 'error',
        event_label: source,
        error_message: error.message
      });
    }
  };
  
  // ... component implementation
};
```

### Step 4: Set Up Google Analytics 4 Goals

```javascript
// In your GA4 property, create these custom events as conversions:

// 1. Email Capture Conversion
gtag('event', 'generate_lead', {
  event_category: 'lead_generation',
  event_label: 'email_capture',
  value: 10
});

// 2. Tool Comparison Engagement
gtag('event', 'comparison_view', {
  event_category: 'engagement',
  event_label: 'tool_comparison',
  value: 1
});

// 3. Pricing Calculator Usage
gtag('event', 'calculator_usage', {
  event_category: 'engagement',
  event_label: 'pricing_calculator',
  value: 3
});

// 4. Affiliate Click
gtag('event', 'affiliate_click', {
  event_category: 'affiliate',
  event_label: 'tool_signup',
  value: 2
});
```

### Step 5: Create Event Dashboard

```javascript
// utils/eventDashboard.js
export const getEventSummary = () => {
  // This would typically connect to your analytics API
  return {
    total_events: 0,
    conversions: 0,
    top_events: [],
    conversion_rate: 0,
    revenue_attributed: 0
  };
};

// Real-time event monitoring
export const monitorEvents = () => {
  if (typeof window !== 'undefined') {
    // Listen for all tracked events
    window.addEventListener('siteoptz_event', (event) => {
      console.log('Event tracked:', event.detail);
      
      // Send to your analytics endpoint
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event.detail)
      });
    });
  }
};
```

## 📈 Key Metrics to Track

### Primary KPIs
1. **Lead Generation Rate**: Email captures per 100 visitors
2. **Conversion Rate**: Affiliate clicks per email capture
3. **Engagement Rate**: Time spent on comparison pages
4. **Tool Comparison Rate**: Number of tools compared per session

### Secondary KPIs
1. **Email Capture Sources**: Which sources generate most leads
2. **Popular Tool Comparisons**: Most compared tool pairs
3. **Calculator Usage**: Team size and tool selection patterns
4. **Content Engagement**: FAQ interactions and scroll depth

## 🔧 Testing & Validation

### 1. Event Testing
```javascript
// Test event tracking
const testEvents = () => {
  // Test email capture
  trackKeyEventWithConfig('email_capture', {
    source: 'test',
    tool: 'chatgpt',
    label: 'test_email_capture'
  });
  
  // Test comparison view
  trackKeyEventWithConfig('comparison_view', {
    tool_1: 'chatgpt',
    tool_2: 'jasper_ai',
    source: 'test',
    label: 'test_comparison'
  });
  
  console.log('Test events sent');
};
```

### 2. GA4 Debug Mode
```javascript
// Enable GA4 debug mode for testing
gtag('config', 'GA_MEASUREMENT_ID', {
  debug_mode: true
});
```

### 3. Real-time Monitoring
```javascript
// Monitor events in real-time
const eventMonitor = {
  events: [],
  
  track: (event) => {
    this.events.push({
      ...event,
      timestamp: Date.now()
    });
    
    // Keep only last 100 events
    if (this.events.length > 100) {
      this.events = this.events.slice(-100);
    }
  },
  
  getSummary: () => {
    return {
      total: this.events.length,
      byType: this.events.reduce((acc, event) => {
        acc[event.event_type] = (acc[event.event_type] || 0) + 1;
        return acc;
      }, {}),
      recent: this.events.slice(-10)
    };
  }
};
```

## 🚀 Next Steps

1. **Implement the event configuration** in your existing analytics system
2. **Add event tracking** to your key components
3. **Set up GA4 conversions** for your most important events
4. **Create dashboards** to monitor key metrics
5. **Test thoroughly** before going live
6. **Monitor and optimize** based on real data

## 📊 Expected Results

With proper key event implementation, you should see:
- **20-30% increase** in lead generation tracking accuracy
- **Better conversion attribution** for affiliate links
- **Improved user journey insights** for optimization
- **Enhanced ROI measurement** for marketing campaigns

This implementation builds on your existing robust analytics infrastructure and provides comprehensive tracking for all key user interactions on siteoptz.ai.
