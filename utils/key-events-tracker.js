// Key Events Tracker for SiteOptz.ai
// Enhanced event tracking utilities building on existing analytics

import { trackKeyEventWithConfig, validateEventData } from '../config/key-events-config.js';

// GA4 Configuration
const GA4_MEASUREMENT_ID = 'G-06WK4MZERF';

// Initialize GA4 tracking with debug support
export const initKeyEventsTracking = (config = {}) => {
  if (typeof window === 'undefined') return;
  
  // Check for debug mode
  const isDebugMode = config.debug_mode || 
                     window.location.search.includes('debug_mode=true') ||
                     localStorage.getItem('ga_debug_mode') === 'true';
  
  if (isDebugMode) {
    console.log('🔍 GA4 Debug Mode Enabled');
    
    // Enable GA4 debug mode
    if (window.gtag) {
      window.gtag('config', GA4_MEASUREMENT_ID, {
        debug_mode: true,
        send_page_view: true
      });
    }
  }
  
  // Send any offline events - TEMPORARILY DISABLED
  // sendOfflineEvents();
  
  // Set up periodic offline event sending - TEMPORARILY DISABLED
  // setInterval(sendOfflineEvents, 30000);
  
  // Track initial page view - TEMPORARILY DISABLED
  // trackKeyEvent('page_view', {
  //   page_title: document.title,
  //   page_location: window.location.href,
  //   referrer: document.referrer,
  //   debug_mode: isDebugMode
  // });
  
  // Set up error tracking
  window.addEventListener('error', (event) => {
    trackError('javascript_error', event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });
  
  console.log('🎯 Key Events Tracking Initialized', { 
    debug_mode: isDebugMode,
    measurement_id: GA4_MEASUREMENT_ID 
  });
};

// Enhanced event tracking with validation and error handling
export const trackKeyEvent = (eventType, eventData = {}) => {
  try {
    // Check if debug mode is enabled
    const isDebugMode = window.location.search.includes('debug_mode=true') ||
                       localStorage.getItem('ga_debug_mode') === 'true';
    
    // Validate event data
    if (!validateEventData(eventType, eventData)) {
      console.error(`❌ Invalid event data for ${eventType}:`, eventData);
      return false;
    }
    
    // Add default metadata and debug info
    const enhancedEventData = {
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      page_title: typeof window !== 'undefined' ? document.title : '',
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
      referrer: typeof window !== 'undefined' ? document.referrer : '',
      timestamp: Date.now(),
      session_id: getSessionId(),
      debug_mode: isDebugMode,
      ...eventData
    };
    
    // Track the event
    const result = trackKeyEventWithConfig(eventType, enhancedEventData);
    
    // Enhanced debug logging
    if (isDebugMode) {
      console.log(`🔍 DEBUG: Event tracked - ${eventType}`, {
        event_type: eventType,
        event_data: enhancedEventData,
        timestamp: new Date().toISOString(),
        session_id: getSessionId(),
        measurement_id: GA4_MEASUREMENT_ID
      });
    }
    
    // Store in local storage for offline tracking
    storeEventLocally(eventType, enhancedEventData);
    
    return result;
  } catch (error) {
    console.error(`❌ Error tracking event ${eventType}:`, error);
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
    priority: 'high',
    ...additionalData
  });
};

// Enhanced email capture with lead scoring
export const trackEmailCaptureWithLeadScore = (email, source, tool, category, leadData = {}) => {
  const leadScore = calculateLeadScore(leadData);
  return trackKeyEvent('email_capture', {
    email: hashEmail(email), // Hash for privacy
    source,
    tool,
    category,
    lead_score: leadScore,
    lead_quality: leadScore > 70 ? 'high' : leadScore > 40 ? 'medium' : 'low',
    company: leadData.company,
    job_title: leadData.jobTitle,
    team_size: leadData.teamSize,
    use_case: leadData.useCase,
    label: `email_capture_${source}_${leadScore}`,
    priority: 'high',
    ...leadData
  });
};

// Newsletter signup tracking
export const trackNewsletterSignup = (email, source, preferences = [], additionalData = {}) => {
  return trackKeyEvent('newsletter_signup', {
    email: hashEmail(email),
    source,
    preferences,
    preferences_count: preferences.length,
    label: `newsletter_${source}`,
    priority: 'medium',
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
    commission_potential: additionalData.commission || 0,
    conversion_probability: additionalData.conversionProb || 0,
    user_journey_stage: additionalData.journeyStage || 'research',
    comparison_context: additionalData.comparisonContext,
    label: `affiliate_${toolName}_${linkType}`,
    priority: 'medium',
    ...additionalData
  });
};

// Enhanced tool signup tracking
export const trackToolSignup = (toolName, signupData, additionalData = {}) => {
  return trackKeyEvent('tool_signup', {
    tool_name: toolName,
    signup_source: signupData.source || 'direct',
    referral_code: signupData.referralCode,
    plan_selected: signupData.plan,
    plan_price: signupData.price,
    trial_duration: signupData.trialDuration,
    conversion_time: signupData.conversionTime, // time from first visit to signup
    touchpoints: signupData.touchpoints || 1,
    comparison_influenced: signupData.comparisonInfluenced || false,
    calculator_used: signupData.calculatorUsed || false,
    email: hashEmail(signupData.email),
    label: `signup_${toolName}_${signupData.plan || 'unknown'}`,
    priority: 'high',
    value: 25
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

export const trackWebinarRegistration = (webinarTitle, email, registrationData = {}, additionalData = {}) => {
  return trackKeyEvent('webinar_registration', {
    webinar_title: webinarTitle,
    webinar_date: registrationData.date,
    webinar_time: registrationData.time,
    webinar_type: registrationData.type || 'live', // live, recorded, series
    email: hashEmail(email),
    attendee_name: registrationData.name,
    attendee_company: registrationData.company,
    attendee_role: registrationData.role,
    registration_source: registrationData.source || 'website',
    utm_source: registrationData.utm_source,
    utm_campaign: registrationData.utm_campaign,
    label: `webinar_${webinarTitle.replace(/\s+/g, '_').toLowerCase()}`,
    priority: 'high',
    ...additionalData
  });
};

// Webinar attendance tracking
export const trackWebinarAttendance = (webinarTitle, email, attendanceData = {}) => {
  return trackKeyEvent('webinar_attendance', {
    webinar_title: webinarTitle,
    email: hashEmail(email),
    attendance_duration: attendanceData.duration,
    attendance_percentage: attendanceData.percentage,
    joined_late: attendanceData.joinedLate || false,
    left_early: attendanceData.leftEarly || false,
    engagement_score: attendanceData.engagementScore,
    questions_asked: attendanceData.questionsAsked || 0,
    polls_participated: attendanceData.pollsParticipated || 0,
    label: `webinar_attend_${webinarTitle.replace(/\s+/g, '_').toLowerCase()}`,
    priority: 'high',
    value: 30,
    category: 'engagement'
  });
};

export const trackGuideDownload = (fileName, source, toolContext, downloadData = {}, additionalData = {}) => {
  return trackKeyEvent('guide_download', {
    file_name: fileName,
    file_type: downloadData.fileType || getFileExtension(fileName),
    file_size: downloadData.fileSize,
    download_method: downloadData.method || 'direct', // direct, email_gate, form_fill
    source,
    tool_context: toolContext,
    content_category: downloadData.category || 'guide',
    content_topic: downloadData.topic,
    gated_content: downloadData.gated || false,
    email_required: downloadData.emailRequired || false,
    user_email: downloadData.email ? hashEmail(downloadData.email) : null,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    referrer_page: downloadData.referrer,
    label: `download_${fileName.replace(/\s+/g, '_').toLowerCase()}`,
    priority: 'medium',
    ...additionalData
  });
};

// Lead magnet download tracking
export const trackLeadMagnetDownload = (magnetTitle, email, magnetData = {}) => {
  return trackKeyEvent('lead_magnet_download', {
    magnet_title: magnetTitle,
    magnet_type: magnetData.type || 'ebook', // ebook, template, checklist, toolkit
    email: hashEmail(email),
    download_trigger: magnetData.trigger || 'form_submit',
    content_value: magnetData.value || 12,
    funnel_stage: magnetData.stage || 'awareness',
    user_name: magnetData.name,
    user_company: magnetData.company,
    lead_source: magnetData.source,
    label: `lead_magnet_${magnetTitle.replace(/\s+/g, '_').toLowerCase()}`,
    priority: 'high'
  });
};

// Resource access tracking
export const trackResourceAccess = (resourceType, resourceTitle, accessData = {}) => {
  return trackKeyEvent('resource_view', {
    resource_type: resourceType, // blog, case_study, whitepaper, video, podcast
    resource_title: resourceTitle,
    access_method: accessData.method || 'direct',
    reading_time: accessData.readingTime,
    engagement_depth: accessData.engagementDepth, // low, medium, high
    shared: accessData.shared || false,
    bookmarked: accessData.bookmarked || false,
    label: `resource_${resourceType}_${resourceTitle.replace(/\s+/g, '_').toLowerCase()}`,
    priority: 'low'
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

// Pricing quote request tracking
export const trackPricingQuoteRequest = (quoteData, additionalData = {}) => {
  return trackKeyEvent('pricing_quote_request', {
    email: hashEmail(quoteData.email),
    company: quoteData.company,
    team_size: quoteData.teamSize,
    tools_interested: quoteData.toolsInterested || [],
    budget_range: quoteData.budgetRange,
    timeline: quoteData.timeline,
    use_case: quoteData.useCase,
    contact_method: quoteData.contactMethod || 'email',
    urgency: quoteData.urgency || 'standard',
    current_solution: quoteData.currentSolution,
    pain_points: quoteData.painPoints || [],
    quote_source: quoteData.source || 'website',
    label: `quote_request_${quoteData.company || 'unknown'}`,
    priority: 'high',
    ...additionalData
  });
};

// Consultation request tracking
export const trackConsultationRequest = (consultationData, additionalData = {}) => {
  return trackKeyEvent('consultation_request', {
    email: hashEmail(consultationData.email),
    name: consultationData.name,
    company: consultationData.company,
    role: consultationData.role,
    consultation_type: consultationData.type || 'general', // general, technical, strategic
    preferred_date: consultationData.preferredDate,
    preferred_time: consultationData.preferredTime,
    topics: consultationData.topics || [],
    current_challenges: consultationData.challenges,
    goals: consultationData.goals,
    label: `consultation_${consultationData.type || 'general'}`,
    priority: 'high',
    value: 25
  });
};

// CTA click tracking with enhanced data
export const trackCTAClick = (ctaData, additionalData = {}) => {
  const eventType = getCTAEventType(ctaData.type, ctaData.position);
  
  return trackKeyEvent(eventType, {
    cta_text: ctaData.text,
    cta_type: ctaData.type, // primary, secondary, text_link, button
    cta_position: ctaData.position, // hero, header, sidebar, footer, inline, popup
    cta_color: ctaData.color,
    cta_size: ctaData.size,
    page_section: ctaData.section,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    destination_url: ctaData.destinationUrl,
    external_link: ctaData.external || false,
    tool_context: ctaData.toolContext,
    comparison_context: ctaData.comparisonContext,
    ab_test_variant: ctaData.abVariant,
    user_intent: ctaData.userIntent, // research, purchase, learn_more
    funnel_stage: ctaData.funnelStage,
    label: `cta_${ctaData.type}_${ctaData.position}`,
    priority: getCTAPriority(ctaData.position),
    ...additionalData
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

// Helper functions
const hashEmail = (email) => {
  if (!email) return null;
  // Simple hash for privacy - in production use a proper hashing function
  return btoa(email).substring(0, 8) + '...';
};

const calculateLeadScore = (leadData) => {
  let score = 0;
  if (leadData.company) score += 20;
  if (leadData.jobTitle && leadData.jobTitle.toLowerCase().includes('manager')) score += 15;
  if (leadData.jobTitle && leadData.jobTitle.toLowerCase().includes('director')) score += 25;
  if (leadData.jobTitle && leadData.jobTitle.toLowerCase().includes('ceo')) score += 30;
  if (leadData.teamSize && leadData.teamSize > 10) score += 20;
  if (leadData.budget && leadData.budget > 1000) score += 15;
  if (leadData.timeline && leadData.timeline === 'immediate') score += 10;
  return Math.min(score, 100);
};

const getFileExtension = (fileName) => {
  return fileName.split('.').pop()?.toLowerCase() || 'unknown';
};

const getCTAEventType = (type, position) => {
  if (position === 'hero') return 'hero_cta_click';
  if (position === 'footer') return 'footer_cta_click';
  if (position === 'pricing') return 'pricing_cta_click';
  if (position === 'comparison') return 'comparison_cta_click';
  if (type === 'primary') return 'primary_cta_click';
  if (type === 'secondary') return 'secondary_cta_click';
  return 'cta_click';
};

const getCTAPriority = (position) => {
  const priorities = {
    hero: 'high',
    header: 'high',
    pricing: 'high',
    comparison: 'high',
    sidebar: 'medium',
    inline: 'medium',
    footer: 'low',
    popup: 'medium'
  };
  return priorities[position] || 'medium';
};

// Additional helper function for enhanced initialization
const setupAdvancedTracking = () => {
  if (typeof window === 'undefined') return;
  
  // Send any offline events - TEMPORARILY DISABLED
  // sendOfflineEvents();
  
  // Set up periodic offline event sending - TEMPORARILY DISABLED
  // setInterval(sendOfflineEvents, 30000); // Every 30 seconds
  
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
};

// Export all tracking functions
export default {
  trackKeyEvent,
  trackEmailCapture,
  trackEmailCaptureWithLeadScore,
  trackNewsletterSignup,
  trackComparisonView,
  trackCalculatorUsage,
  trackAffiliateClick,
  trackToolSignup,
  trackFAQInteraction,
  trackWebinarRegistration,
  trackWebinarAttendance,
  trackGuideDownload,
  trackLeadMagnetDownload,
  trackResourceAccess,
  trackPricingQuoteRequest,
  trackConsultationRequest,
  trackCTAClick,
  trackFunnelStep,
  trackPerformance,
  trackError,
  trackABTest,
  EnhancedUserJourney,
  initKeyEventsTracking,
  getSessionId,
  sendOfflineEvents
};
