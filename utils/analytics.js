// Analytics & Tracking Configuration for AI Tools Comparison System
// Based on PRD requirements for GA4 events and conversion tracking

// GA4 Event Tracking
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Email Capture Tracking
export const trackEmailCapture = (source, toolComparison = null) => {
  trackEvent('email_capture', {
    event_category: 'lead_generation',
    event_label: source,
    tool_comparison: toolComparison,
    value: 1 // Lead value
  });
  
  // Also track as conversion
  trackEvent('generate_lead', {
    currency: 'USD',
    value: 10.0, // Estimated lead value
    source: source
  });
};

// CTA Click Tracking
export const trackCTAClick = (toolName, ctaType, destination) => {
  trackEvent('cta_click', {
    event_category: 'affiliate',
    event_label: `${toolName.toLowerCase().replace(/\s+/g, '_')}_${ctaType}`,
    tool_name: toolName,
    cta_type: ctaType,
    destination: destination
  });
  
  // Track potential conversion
  trackEvent('click', {
    event_category: 'outbound',
    event_label: toolName,
    value: 1
  });
};

// Comparison View Tracking
export const trackComparisonView = (tool1, tool2, source = 'organic') => {
  trackEvent('comparison_view', {
    event_category: 'engagement',
    event_label: `${tool1}_vs_${tool2}`,
    tool_1: tool1,
    tool_2: tool2,
    traffic_source: source
  });
};

// Tool Selection in Calculator
export const trackToolSelection = (selectedTools, teamSize, usage) => {
  trackEvent('calculator_interaction', {
    event_category: 'engagement',
    event_label: 'tool_selection',
    selected_tools: selectedTools.join(','),
    team_size: teamSize,
    usage_level: usage
  });
};

// Pricing Calculator Usage
export const trackPricingCalculation = (tools, totalMonthly, totalYearly, teamSize) => {
  trackEvent('pricing_calculation', {
    event_category: 'engagement',
    event_label: 'calculation_complete',
    tools_compared: tools.length,
    monthly_total: totalMonthly,
    yearly_total: totalYearly,
    team_size: teamSize,
    value: totalMonthly // Monthly value for analytics
  });
};

// FAQ Interaction Tracking
export const trackFAQInteraction = (question, toolName = null) => {
  trackEvent('faq_interaction', {
    event_category: 'engagement',
    event_label: 'question_opened',
    question: question.substring(0, 100), // Limit length
    tool_context: toolName
  });
};

// Page Engagement Tracking
export const trackPageEngagement = (pageName, engagementTime) => {
  trackEvent('page_engagement', {
    event_category: 'engagement',
    event_label: pageName,
    engagement_time_msec: engagementTime,
    value: Math.floor(engagementTime / 1000) // Convert to seconds
  });
};

// Conversion Funnel Tracking
export const trackFunnelStep = (step, tool1, tool2) => {
  const funnelSteps = {
    'landing': 1,
    'comparison_viewed': 2,
    'calculator_used': 3,
    'email_captured': 4,
    'cta_clicked': 5
  };
  
  trackEvent('funnel_progression', {
    event_category: 'conversion',
    event_label: step,
    funnel_step: funnelSteps[step] || 0,
    comparison: `${tool1}_vs_${tool2}`
  });
};

// Search Console Performance Tracking
export const trackSearchPerformance = (keyword, position, clicks, impressions) => {
  trackEvent('search_performance', {
    event_category: 'seo',
    event_label: keyword,
    position: position,
    clicks: clicks,
    impressions: impressions,
    ctr: clicks / impressions
  });
};

// A/B Test Tracking
export const trackABTest = (testName, variant, conversion = false) => {
  trackEvent('ab_test', {
    event_category: 'experiment',
    event_label: `${testName}_${variant}`,
    test_name: testName,
    variant: variant,
    converted: conversion
  });
};

// Tool Review Page Tracking
export const trackToolReview = (toolName, scrollDepth, timeOnPage) => {
  trackEvent('tool_review_engagement', {
    event_category: 'content',
    event_label: toolName,
    scroll_depth: scrollDepth,
    time_on_page: timeOnPage,
    value: Math.floor(timeOnPage / 10) // Value based on engagement
  });
};

// Social Share Tracking
export const trackSocialShare = (platform, content, toolName) => {
  trackEvent('share', {
    method: platform,
    content_type: content,
    item_id: toolName,
    event_category: 'social',
    event_label: `${toolName}_${platform}`
  });
};

// Download Tracking (PDF guides, resources)
export const trackDownload = (fileName, source, toolContext = null) => {
  trackEvent('file_download', {
    event_category: 'resource',
    event_label: fileName,
    download_source: source,
    tool_context: toolContext,
    value: 1
  });
};

// Error Tracking
export const trackError = (errorType, errorMessage, context) => {
  trackEvent('exception', {
    description: `${errorType}: ${errorMessage}`,
    fatal: false,
    context: context,
    event_category: 'error'
  });
};

// User Journey Tracking
export class UserJourney {
  constructor() {
    this.journey = [];
    this.startTime = Date.now();
  }
  
  addStep(step, data = {}) {
    this.journey.push({
      step,
      timestamp: Date.now(),
      timeFromStart: Date.now() - this.startTime,
      data
    });
  }
  
  complete(conversion = false) {
    const totalTime = Date.now() - this.startTime;
    const steps = this.journey.map(j => j.step).join(' -> ');
    
    trackEvent('user_journey_complete', {
      event_category: 'behavior',
      event_label: steps,
      journey_duration: totalTime,
      journey_steps: this.journey.length,
      converted: conversion,
      value: conversion ? 10 : 1
    });
  }
}

// Enhanced Scroll Tracking
export const initScrollTracking = (pageName) => {
  if (typeof window === 'undefined') return;
  
  let maxScroll = 0;
  const milestones = [25, 50, 75, 90, 100];
  const tracked = new Set();
  
  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
    }
    
    // Track milestone scrolls
    milestones.forEach(milestone => {
      if (scrollPercent >= milestone && !tracked.has(milestone)) {
        tracked.add(milestone);
        trackEvent('scroll', {
          event_category: 'engagement',
          event_label: `${pageName}_${milestone}%`,
          scroll_depth: milestone,
          page: pageName
        });
      }
    });
  };
  
  let ticking = false;
  const scrollListener = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        trackScroll();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', scrollListener, { passive: true });
  
  // Track when user leaves page
  const beforeUnloadListener = () => {
    trackEvent('page_exit', {
      event_category: 'engagement',
      event_label: pageName,
      max_scroll_depth: maxScroll,
      page: pageName
    });
  };
  
  window.addEventListener('beforeunload', beforeUnloadListener);
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', scrollListener);
    window.removeEventListener('beforeunload', beforeUnloadListener);
  };
};

// Heat Map Data Collection (for tools like Hotjar)
export const collectHeatMapData = (elementType, elementText, position) => {
  if (typeof window !== 'undefined' && window.hj) {
    window.hj('identify', 'user_123', {
      element_type: elementType,
      element_text: elementText,
      position: position
    });
  }
};

// Performance Monitoring
export const trackPerformance = (pageName) => {
  if (typeof window === 'undefined') return;
  
  // Track Core Web Vitals
  if ('web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(metric => trackEvent('web_vital_cls', { ...metric, page: pageName }));
      getFID(metric => trackEvent('web_vital_fid', { ...metric, page: pageName }));
      getFCP(metric => trackEvent('web_vital_fcp', { ...metric, page: pageName }));
      getLCP(metric => trackEvent('web_vital_lcp', { ...metric, page: pageName }));
      getTTFB(metric => trackEvent('web_vital_ttfb', { ...metric, page: pageName }));
    });
  }
};

// Initialize Analytics
export const initAnalytics = (config = {}) => {
  if (typeof window === 'undefined') return;
  
  // Initialize GA4
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', config.GA4_ID || 'G-XXXXXXXXXX', {
    page_title: document.title,
    page_location: window.location.href
  });
  
  // Set custom dimensions
  gtag('config', config.GA4_ID || 'G-XXXXXXXXXX', {
    custom_map: {
      custom_dimension_1: 'tool_category',
      custom_dimension_2: 'comparison_type',
      custom_dimension_3: 'user_segment'
    }
  });
  
  console.log('🔍 Analytics initialized');
};

export default {
  trackEvent,
  trackEmailCapture,
  trackCTAClick,
  trackComparisonView,
  trackToolSelection,
  trackPricingCalculation,
  trackFAQInteraction,
  trackPageEngagement,
  trackFunnelStep,
  UserJourney,
  initScrollTracking,
  initAnalytics
};