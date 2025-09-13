// Analytics Initialization for SiteOptz.ai
// Initialize key events tracking and Google Analytics

import { initKeyEventsTracking } from './key-events-tracker';

// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-YOUR-ID';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;
  
  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  
  // Configure GA4
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
    // Enhanced measurement settings
    send_page_view: true,
    enhanced_measurement: {
      scroll: true,
      outbound_clicks: true,
      site_search: true,
      video_engagement: true,
      file_downloads: true
    }
  });
  
  console.log('📊 Google Analytics initialized');
};

// Track page views
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url
    });
  }
};

// Initialize all analytics
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;
  
  // Initialize Google Analytics
  initGA();
  
  // Initialize key events tracking
  initKeyEventsTracking({
    ga_tracking_id: GA_TRACKING_ID,
    debug: process.env.NODE_ENV === 'development'
  });
  
  // Track initial page view
  trackPageView(window.location.pathname);
  
  // Set up page view tracking for client-side navigation
  if (typeof window !== 'undefined') {
    const handleRouteChange = (url) => {
      trackPageView(url);
    };
    
    // Listen for route changes if using Next.js router
    if (window.next && window.next.router) {
      window.next.router.events.on('routeChangeComplete', handleRouteChange);
    }
  }
  
  console.log('🎯 Analytics system fully initialized');
};

// Export default initialization
export default initAnalytics;