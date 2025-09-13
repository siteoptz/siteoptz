# 🔍 GA4 DebugView Setup Guide for SiteOptz.ai

## 📊 Overview

This guide shows you how to set up and use GA4 DebugView to test and verify that your key events are tracking correctly on siteoptz.ai.

## 🛠️ Setup Steps

### Step 1: Enable Debug Mode in GA4

#### Option A: Using gtag Configuration (Recommended)
```javascript
// In your analytics initialization
gtag('config', 'GA_MEASUREMENT_ID', {
  debug_mode: true,
  send_page_view: true
});
```

#### Option B: Using URL Parameter
Add `?debug_mode=true` to your URL:
```
https://siteoptz.ai/compare/chatgpt-vs-jasper-ai?debug_mode=true
```

#### Option C: Using Browser Extension
Install the "Google Analytics Debugger" Chrome extension and enable it.

### Step 2: Update Your Key Events Tracker

```javascript
// utils/key-events-tracker.js - Add debug mode support
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
      window.gtag('config', config.GA4_ID || 'G-XXXXXXXXXX', {
        debug_mode: true
      });
    }
  }
  
  // Send any offline events
  sendOfflineEvents();
  
  // Set up periodic offline event sending
  setInterval(sendOfflineEvents, 30000);
  
  // Track page view
  trackKeyEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    referrer: document.referrer,
    debug_mode: isDebugMode
  });
  
  // Set up error tracking
  window.addEventListener('error', (event) => {
    trackError('javascript_error', event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });
  
  console.log('🎯 Key Events Tracking Initialized', { debug_mode: isDebugMode });
};
```

### Step 3: Enhanced Event Tracking with Debug Info

```javascript
// utils/key-events-tracker.js - Enhanced tracking function
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
    
    // Add debug information
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
        session_id: getSessionId()
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
```

## 🔍 DebugView Access and Usage

### Step 1: Access DebugView in GA4

1. Go to your GA4 property
2. Navigate to **Configure** → **DebugView**
3. You should see real-time events as they happen

### Step 2: Test Your Events

Create a test page to verify all your key events:

```javascript
// test-events.html - Create this file for testing
<!DOCTYPE html>
<html>
<head>
    <title>GA4 Events Test - SiteOptz.ai</title>
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
            debug_mode: true
        });
    </script>
</head>
<body>
    <h1>GA4 Events Test Page</h1>
    
    <div id="test-results"></div>
    
    <button onclick="testEmailCapture()">Test Email Capture</button>
    <button onclick="testComparisonView()">Test Comparison View</button>
    <button onclick="testCalculatorUsage()">Test Calculator Usage</button>
    <button onclick="testAffiliateClick()">Test Affiliate Click</button>
    <button onclick="testFAQInteraction()">Test FAQ Interaction</button>
    <button onclick="testFunnelStep()">Test Funnel Step</button>
    
    <script type="module">
        import { 
            trackEmailCapture, 
            trackComparisonView, 
            trackCalculatorUsage,
            trackAffiliateClick,
            trackFAQInteraction,
            trackFunnelStep,
            initKeyEventsTracking
        } from './utils/key-events-tracker.js';
        
        // Initialize tracking
        initKeyEventsTracking({ debug_mode: true });
        
        // Test functions
        window.testEmailCapture = () => {
            const result = trackEmailCapture('test_page', 'chatgpt', 'ai_tools', {
                test_mode: true,
                email_domain: 'test.com'
            });
            logTestResult('Email Capture', result);
        };
        
        window.testComparisonView = () => {
            const result = trackComparisonView('chatgpt', 'jasper_ai', 'test', {
                test_mode: true
            });
            logTestResult('Comparison View', result);
        };
        
        window.testCalculatorUsage = () => {
            const result = trackCalculatorUsage(['chatgpt', 'jasper_ai'], 5, 'medium', 150, {
                test_mode: true
            });
            logTestResult('Calculator Usage', result);
        };
        
        window.testAffiliateClick = () => {
            const result = trackAffiliateClick('chatgpt', 'pricing', 'https://chat.openai.com/plus', 'test_button', {
                test_mode: true
            });
            logTestResult('Affiliate Click', result);
        };
        
        window.testFAQInteraction = () => {
            const result = trackFAQInteraction('What is the difference between ChatGPT and Jasper AI?', 'chatgpt', {
                test_mode: true
            });
            logTestResult('FAQ Interaction', result);
        };
        
        window.testFunnelStep = () => {
            const result = trackFunnelStep('comparison_viewed', 'chatgpt', 'jasper_ai', {
                test_mode: true
            });
            logTestResult('Funnel Step', result);
        };
        
        function logTestResult(eventType, result) {
            const resultsDiv = document.getElementById('test-results');
            const timestamp = new Date().toLocaleTimeString();
            const status = result ? '✅ SUCCESS' : '❌ FAILED';
            
            resultsDiv.innerHTML += `
                <div style="margin: 10px 0; padding: 10px; border: 1px solid #ccc;">
                    <strong>${eventType}</strong> - ${status} at ${timestamp}
                    <br>Result: ${JSON.stringify(result, null, 2)}
                </div>
            `;
        }
    </script>
</body>
</html>
```

## 📊 DebugView Verification Checklist

### ✅ Event Verification Steps

1. **Open DebugView** in GA4
2. **Load your test page** with `?debug_mode=true`
3. **Click test buttons** one by one
4. **Verify events appear** in DebugView within 1-2 seconds
5. **Check event parameters** match your expectations

### 🔍 What to Look For in DebugView

#### Event Structure
```
Event Name: email_capture
Parameters:
  - event_category: lead_generation
  - event_label: email_capture_test_page
  - value: 10
  - source: test_page
  - tool: chatgpt
  - category: ai_tools
  - debug_mode: true
  - timestamp: 1703123456789
  - session_id: session_1703123456789_abc123
```

#### Common Issues to Check
- **Missing events**: Check console for errors
- **Wrong parameters**: Verify event data structure
- **Timing issues**: Events should appear within 1-2 seconds
- **Session issues**: Check session_id consistency

## 🚨 Troubleshooting Common Issues

### Issue 1: Events Not Appearing in DebugView

**Solutions:**
```javascript
// Check if gtag is loaded
if (typeof gtag === 'undefined') {
    console.error('❌ gtag not loaded');
    return;
}

// Verify GA4 ID
console.log('GA4 ID:', 'GA_MEASUREMENT_ID');

// Check debug mode
console.log('Debug mode:', window.location.search.includes('debug_mode=true'));
```

### Issue 2: Events Appearing but Missing Parameters

**Solutions:**
```javascript
// Ensure all required parameters are included
const requiredParams = ['event_category', 'event_label', 'value'];
const missingParams = requiredParams.filter(param => !eventData[param]);

if (missingParams.length > 0) {
    console.warn('Missing parameters:', missingParams);
}
```

### Issue 3: Session ID Issues

**Solutions:**
```javascript
// Verify session ID generation
export const getSessionId = () => {
    if (!sessionId) {
        sessionId = sessionStorage.getItem('siteoptz_session_id') || 
                    'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('siteoptz_session_id', sessionId);
    }
    console.log('Session ID:', sessionId);
    return sessionId;
};
```

## 📈 Advanced Debugging Techniques

### 1. Event Validation Dashboard

```javascript
// Create a debug dashboard
export const createDebugDashboard = () => {
    if (typeof window === 'undefined') return;
    
    const dashboard = document.createElement('div');
    dashboard.id = 'ga4-debug-dashboard';
    dashboard.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        width: 300px;
        background: #f0f0f0;
        border: 1px solid #ccc;
        padding: 10px;
        z-index: 9999;
        font-family: monospace;
        font-size: 12px;
    `;
    
    dashboard.innerHTML = `
        <h3>GA4 Debug Dashboard</h3>
        <div id="debug-stats"></div>
        <button onclick="clearDebugStats()">Clear Stats</button>
    `;
    
    document.body.appendChild(dashboard);
    
    // Update stats every second
    setInterval(updateDebugStats, 1000);
};

const updateDebugStats = () => {
    const statsDiv = document.getElementById('debug-stats');
    if (!statsDiv) return;
    
    const events = JSON.parse(localStorage.getItem('siteoptz_events') || '[]');
    const sessionId = getSessionId();
    
    statsDiv.innerHTML = `
        <div>Session ID: ${sessionId}</div>
        <div>Events Stored: ${events.length}</div>
        <div>Debug Mode: ${window.location.search.includes('debug_mode=true')}</div>
        <div>GA4 Loaded: ${typeof gtag !== 'undefined'}</div>
        <div>Last Event: ${events[events.length - 1]?.event_type || 'None'}</div>
    `;
};

window.clearDebugStats = () => {
    localStorage.removeItem('siteoptz_events');
    updateDebugStats();
};
```

### 2. Real-time Event Monitor

```javascript
// Monitor all events in real-time
export const startEventMonitoring = () => {
    if (typeof window === 'undefined') return;
    
    // Override console.log to capture events
    const originalLog = console.log;
    console.log = function(...args) {
        if (args[0] && args[0].includes('Event tracked')) {
            // Log to debug dashboard
            logToDebugDashboard(args);
        }
        originalLog.apply(console, args);
    };
};

const logToDebugDashboard = (args) => {
    const logDiv = document.getElementById('debug-logs');
    if (logDiv) {
        const timestamp = new Date().toLocaleTimeString();
        logDiv.innerHTML += `<div>[${timestamp}] ${args.join(' ')}</div>`;
        logDiv.scrollTop = logDiv.scrollHeight;
    }
};
```

## 🎯 Testing Checklist

### ✅ Pre-Launch Testing

- [ ] All key events appear in DebugView
- [ ] Event parameters are correct
- [ ] Session IDs are consistent
- [ ] Debug mode works properly
- [ ] Error handling works
- [ ] Offline storage works
- [ ] Performance impact is minimal

### ✅ Production Testing

- [ ] Events work without debug mode
- [ ] No console errors in production
- [ ] Events appear in GA4 reports
- [ ] Conversion tracking works
- [ ] User journey tracking works

## 🚀 Next Steps

1. **Set up debug mode** in your development environment
2. **Create test page** with all your key events
3. **Verify events** in GA4 DebugView
4. **Fix any issues** found during testing
5. **Deploy to production** with confidence
6. **Monitor real-time** events in GA4

This setup will ensure your key events are working correctly before going live!
