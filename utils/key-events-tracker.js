// Key Events Tracker for SiteOptz.ai
// Enhanced event tracking utilities building on existing analytics

import { trackKeyEventWithConfig, validateEventData } from '../config/key-events-config.js';

// Enhanced event tracking with validation and error handling
export const trackKeyEvent = (eventType, eventData = {}) => {
  try {
    // Validate event data
    if (!validateEventData(eventType, eventData)) {
      console.error(`Invalid event data for ${eventType}:`, eventData);
      return false;
    }
    
    // Add default metadata
    const enhancedEventData = {
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      page_title: typeof window !== 'undefined' ? document.title : '',
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
      referrer: typeof window !== 'undefined' ? document.referrer : '',
      timestamp: Date.now(),
      session_id: getSessionId(),
      ...eventData
    };
    
    // Track the event
    const result = trackKeyEventWithConfig(eventType, enhancedEventData);
    
    // Store in local storage for offline tracking
    storeEventLocally(eventType, enhancedEventData);
    
    return result;
  } catch (error) {
    console.error(`Error tracking event ${eventType}:`, error);
    return false;
  }
};

// Session management
let sessionId = null;
export const getSessionId = () => {
  if (!sessionId) {
    sessionId = sessionStorage.getItem('siteoptz_session_id') || 
                'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('siteoptz_session_id', sessionId);
  }
  return sessionId;
};

// Local event storage for offline tracking
export const storeEventLocally = (eventType, eventData) => {
  if (typeof window === 'undefined') return;
  
  try {
    const events = JSON.parse(localStorage.getItem('siteoptz_events') || '[]');
    events.push({
      event_type: eventType,
      data: eventData,
      stored_at: Date.now()
    });
    
    // Keep only last 50 events
    if (events.length > 50) {
      events.splice(0, events.length - 50);
    }
    
    localStorage.setItem('siteoptz_events', JSON.stringify(events));
  } catch (error) {
    console.error('Error storing event locally:', error);
  }
};

// Send offline events to server
export const sendOfflineEvents = async () => {
  if (typeof window === 'undefined') return;
  
  try {
    const events = JSON.parse(localStorage.getItem('siteoptz_events') || '[]');
    if (events.length === 0) return;
    
    const response = await fetch('/api/analytics/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ events })
    });
    
    if (response.ok) {
      localStorage.removeItem('siteoptz_events');
      console.log(`📤 Sent ${events.length} offline events to server`);
    }
  } catch (error) {
    console.error('Error sending offline events:', error);
  }
};

// Specific event tracking functions
export const trackEmailCapture = (source, tool, category, additionalData = {}) => {
  return trackKeyEvent('email_capture', {
    source,
    tool,
    category,
    label: `email_capture_${source}`,
    ...additionalData
  });
};

export const trackComparisonView = (tool1, tool2, source = 'organic', additionalData = {}) => {
  return trackKeyEvent('comparison_view', {
    tool_1: tool1,
    tool_2: tool2,
    source,
    label: `${tool1}_vs_${tool2}`,
    ...additionalData
  });
};

export const trackCalculatorUsage = (selectedTools, teamSize, usage, totalCost, additionalData = {}) => {
  return trackKeyEvent('calculator_usage', {
    tools_selected: selectedTools,
    team_size: teamSize,
    usage_level: usage,
    total_cost: totalCost,
    label: `calculator_${selectedTools.length}_tools_${teamSize}_team`,
    ...additionalData
  });
};

export const trackAffiliateClick = (toolName, linkType, destination, position = 'unknown', additionalData = {}) => {
  return trackKeyEvent('affiliate_click', {
    tool_name: toolName,
    link_type: linkType,
    destination,
    position,
    label: `affiliate_${toolName}_${linkType}`,
    ...additionalData
  });
};

export const trackFAQInteraction = (question, toolName, additionalData = {}) => {
  return trackKeyEvent('faq_interaction', {
    question: question.substring(0, 100), // Limit length
    tool_context: toolName,
    label: `faq_${toolName || 'general'}`,
    ...additionalData
  });
};

export const trackWebinarRegistration = (webinarTitle, email, additionalData = {}) => {
  return trackKeyEvent('webinar_registration', {
    webinar_title: webinarTitle,
    email,
    label: `webinar_${webinarTitle.replace(/\s+/g, '_').toLowerCase()}`,
    ...additionalData
  });
};

export const trackGuideDownload = (fileName, source, toolContext, additionalData = {}) => {
  return trackKeyEvent('guide_download', {
    file_name: fileName,
    source,
    tool_context: toolContext,
    label: `download_${fileName.replace(/\s+/g, '_').toLowerCase()}`,
    ...additionalData
  });
};

// Funnel tracking
export const trackFunnelStep = (step, tool1, tool2, additionalData = {}) => {
  const funnelSteps = {
    'landing': 1,
    'comparison_viewed': 2,
    'calculator_used': 3,
    'email_captured': 4,
    'cta_clicked': 5,
    'converted': 6
  };
  
  return trackKeyEvent('funnel_step', {
    step,
    funnel_step_number: funnelSteps[step] || 0,
    comparison: tool1 && tool2 ? `${tool1}_vs_${tool2}` : null,
    label: `funnel_${step}`,
    ...additionalData
  });
};

// User journey tracking
export class EnhancedUserJourney {
  constructor() {
    this.journey = [];
    this.startTime = Date.now();
    this.sessionId = getSessionId();
  }
  
  addStep(step, data = {}) {
    const stepData = {
      step,
      timestamp: Date.now(),
      timeFromStart: Date.now() - this.startTime,
      sessionId: this.sessionId,
      ...data
    };
    
    this.journey.push(stepData);
    
    // Track the step
    trackFunnelStep(step, data.tool1, data.tool2, stepData);
    
    return stepData;
  }
  
  complete(conversion = false, conversionValue) {
    const totalTime = Date.now() - this.startTime;
    const steps = this.journey.map(j => j.step).join(' -> ');
    
    const completionData = {
      journey_duration: totalTime,
      journey_steps: this.journey.length,
      converted: conversion,
      conversion_value: conversionValue,
      journey_path: steps,
      session_id: this.sessionId
    };
    
    trackKeyEvent('journey_complete', completionData);
    
    if (conversion) {
      trackKeyEvent('conversion', {
        conversion_type: 'journey_complete',
        value: conversionValue || 10,
        journey_duration: totalTime,
        journey_steps: this.journey.length,
        ...completionData
      });
    }
    
    return completionData;
  }
  
  getSummary() {
    return {
      sessionId: this.sessionId,
      duration: Date.now() - this.startTime,
      steps: this.journey.length,
      path: this.journey.map(j => j.step),
      lastStep: this.journey[this.journey.length - 1]
    };
  }
}

// Performance tracking
export const trackPerformance = (pageName) => {
  if (typeof window === 'undefined') return;
  
  // Track Core Web Vitals
  if ('web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(metric => trackKeyEvent('web_vital_cls', { ...metric, page: pageName }));
      getFID(metric => trackKeyEvent('web_vital_fid', { ...metric, page: pageName }));
      getFCP(metric => trackKeyEvent('web_vital_fcp', { ...metric, page: pageName }));
      getLCP(metric => trackKeyEvent('web_vital_lcp', { ...metric, page: pageName }));
      getTTFB(metric => trackKeyEvent('web_vital_ttfb', { ...metric, page: pageName }));
    });
  }
  
  // Track page load time
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      
      trackKeyEvent('page_performance', {
        page: pageName,
        load_time_ms: loadTime,
        label: `performance_${pageName}`
      });
    }, 0);
  });
};

// Error tracking
export const trackError = (errorType, errorMessage, context = {}) => {
  return trackKeyEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    context,
    label: `error_${errorType}`,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    user_agent: typeof window !== 'undefined' ? navigator.userAgent : ''
  });
};

// A/B testing tracking
export const trackABTest = (testName, variant, conversion = false, additionalData = {}) => {
  return trackKeyEvent('ab_test', {
    test_name: testName,
    variant,
    converted: conversion,
    label: `ab_test_${testName}_${variant}`,
    ...additionalData
  });
};

// Initialize key events tracking
export const initKeyEventsTracking = (config = {}) => {
  if (typeof window === 'undefined') return;
  
  // Send any offline events
  sendOfflineEvents();
  
  // Set up periodic offline event sending
  setInterval(sendOfflineEvents, 30000); // Every 30 seconds
  
  // Track page view
  trackKeyEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    referrer: document.referrer
  });
  
  // Set up error tracking
  window.addEventListener('error', (event) => {
    trackError('javascript_error', event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });
  
  // Set up unhandled promise rejection tracking
  window.addEventListener('unhandledrejection', (event) => {
    trackError('unhandled_promise_rejection', event.reason, {
      promise: event.promise
    });
  });
  
  console.log('🎯 Key Events Tracking Initialized');
};

// Export all tracking functions
export default {
  trackKeyEvent,
  trackEmailCapture,
  trackComparisonView,
  trackCalculatorUsage,
  trackAffiliateClick,
  trackFAQInteraction,
  trackWebinarRegistration,
  trackGuideDownload,
  trackFunnelStep,
  trackPerformance,
  trackError,
  trackABTest,
  EnhancedUserJourney,
  initKeyEventsTracking,
  getSessionId,
  sendOfflineEvents
};
