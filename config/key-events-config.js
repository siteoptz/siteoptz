// Key Events Configuration for SiteOptz.ai
// This file defines all key events and their tracking parameters

export const KEY_EVENTS_CONFIG = {
  // Lead Generation Events
  lead_events: {
    email_capture: {
      value: 10,
      category: 'lead_generation',
      conversion: true,
      description: 'User submits email for lead magnet or newsletter'
    },
    webinar_registration: {
      value: 15,
      category: 'lead_generation', 
      conversion: true,
      description: 'User registers for a webinar'
    },
    guide_download: {
      value: 5,
      category: 'lead_generation',
      conversion: true,
      description: 'User downloads a guide or resource'
    },
    pricing_quote_request: {
      value: 20,
      category: 'lead_generation',
      conversion: true,
      description: 'User requests a custom pricing quote'
    }
  },

  // Engagement Events
  engagement_events: {
    comparison_view: {
      value: 1,
      category: 'engagement',
      conversion: false,
      description: 'User views a tool comparison page'
    },
    calculator_usage: {
      value: 3,
      category: 'engagement',
      conversion: false,
      description: 'User uses the pricing calculator'
    },
    faq_interaction: {
      value: 1,
      category: 'engagement',
      conversion: false,
      description: 'User interacts with FAQ section'
    },
    tool_selection: {
      value: 2,
      category: 'engagement',
      conversion: false,
      description: 'User selects tools in calculator'
    },
    feature_comparison: {
      value: 1,
      category: 'engagement',
      conversion: false,
      description: 'User compares specific features'
    }
  },

  // Conversion Events
  conversion_events: {
    affiliate_click: {
      value: 2,
      category: 'affiliate',
      conversion: false,
      description: 'User clicks on affiliate link'
    },
    tool_signup: {
      value: 25,
      category: 'conversion',
      conversion: true,
      description: 'User signs up for a tool (tracked via affiliate)'
    },
    cta_click: {
      value: 1,
      category: 'conversion',
      conversion: false,
      description: 'User clicks on call-to-action button'
    }
  },

  // User Journey Events
  journey_events: {
    funnel_step: {
      value: 1,
      category: 'journey',
      conversion: false,
      description: 'User progresses through conversion funnel'
    },
    page_engagement: {
      value: 1,
      category: 'journey',
      conversion: false,
      description: 'User engages with page content'
    },
    scroll_milestone: {
      value: 1,
      category: 'journey',
      conversion: false,
      description: 'User reaches scroll milestones'
    }
  }
};

// Event validation and tracking function
export const trackKeyEventWithConfig = (eventType, eventData = {}) => {
  // Find the event configuration
  let config = null;
  let eventCategory = null;
  
  for (const [category, events] of Object.entries(KEY_EVENTS_CONFIG)) {
    if (events[eventType]) {
      config = events[eventType];
      eventCategory = category;
      break;
    }
  }
  
  if (!config) {
    console.warn(`Unknown event type: ${eventType}`);
    return;
  }
  
  // Prepare tracking data
  const trackingData = {
    event_category: config.category,
    event_label: eventData.label || eventType,
    value: config.value,
    event_type: eventType,
    event_category_group: eventCategory,
    timestamp: Date.now(),
    ...eventData
  };
  
  // Track the event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventType, trackingData);
  }
  
  // Track as conversion if configured
  if (config.conversion) {
    trackConversion(eventType, config.value, eventData);
  }
  
  // Log for debugging
  console.log(`🎯 Key Event Tracked: ${eventType}`, trackingData);
  
  return trackingData;
};

// Enhanced conversion tracking
export const trackConversion = (conversionType, value, metadata = {}) => {
  const conversionData = {
    event_category: 'conversion',
    event_label: conversionType,
    value: value,
    currency: 'USD',
    conversion_type: conversionType,
    timestamp: Date.now(),
    ...metadata
  };
  
  // Track as GA4 conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', conversionData);
    
    // Also track as generate_lead for GA4
    if (conversionType.includes('email') || conversionType.includes('lead')) {
      window.gtag('event', 'generate_lead', {
        currency: 'USD',
        value: value,
        ...metadata
      });
    }
  }
  
  console.log(`💰 Conversion Tracked: ${conversionType}`, conversionData);
  return conversionData;
};

// Event validation helper
export const validateEventData = (eventType, eventData) => {
  const requiredFields = {
    email_capture: ['source', 'email'],
    comparison_view: ['tool_1', 'tool_2'],
    calculator_usage: ['tools_selected', 'team_size'],
    affiliate_click: ['tool_name', 'link_type'],
    webinar_registration: ['webinar_title', 'email']
  };
  
  const required = requiredFields[eventType] || [];
  const missing = required.filter(field => !eventData[field]);
  
  if (missing.length > 0) {
    console.warn(`Missing required fields for ${eventType}:`, missing);
    return false;
  }
  
  return true;
};

// Get event summary for analytics
export const getEventSummary = () => {
  const summary = {
    total_event_types: Object.keys(KEY_EVENTS_CONFIG).reduce((acc, category) => {
      return acc + Object.keys(KEY_EVENTS_CONFIG[category]).length;
    }, 0),
    categories: Object.keys(KEY_EVENTS_CONFIG),
    conversion_events: [],
    engagement_events: []
  };
  
  // Categorize events
  Object.entries(KEY_EVENTS_CONFIG).forEach(([category, events]) => {
    Object.entries(events).forEach(([eventType, config]) => {
      if (config.conversion) {
        summary.conversion_events.push(eventType);
      } else {
        summary.engagement_events.push(eventType);
      }
    });
  });
  
  return summary;
};

// Export default configuration
export default KEY_EVENTS_CONFIG;
