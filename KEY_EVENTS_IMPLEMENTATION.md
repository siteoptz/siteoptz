# Key Events Implementation Guide for SiteOptz.ai

## Overview
This document outlines the comprehensive key events tracking implementation for SiteOptz.ai, designed to track user interactions, conversions, and journey analytics.

## Implementation Files

### Core Tracking Files
- **`/config/key-events-config.js`** - Central configuration for all event types and values
- **`/utils/key-events-tracker.js`** - Main tracking utility with all tracking functions
- **`/utils/analytics-init.js`** - Analytics initialization and GA4 integration

### Enhanced Components
- **`/components/TrackableButton.tsx`** - Button component with built-in tracking
- **`/components/EmailCaptureForm.tsx`** - Enhanced email capture with journey tracking
- **`/components/PricingCalculator.tsx`** - Calculator with usage tracking

### Page Implementations
- **`/pages/compare/[tool1]/vs/[tool2].tsx`** - Comparison pages with scroll and interaction tracking
- **`/pages/_app.tsx`** - App-level analytics initialization

## Event Categories

### 1. Lead Generation Events
```javascript
// Email Capture
trackEmailCapture(source, tool, category, {
  email: 'user@example.com',
  capture_location: 'comparison_cta'
});

// Webinar Registration  
trackWebinarRegistration(webinarTitle, email, {
  webinar_date: '2025-01-15'
});

// Guide Download
trackGuideDownload(fileName, source, toolContext, {
  download_type: 'pdf'
});
```

### 2. Engagement Events
```javascript
// Comparison View
trackComparisonView('chatgpt', 'jasper-ai', 'organic', {
  comparison_type: 'ai_writing_tools'
});

// Calculator Usage
trackCalculatorUsage(selectedTools, teamSize, usageLevel, totalCost, {
  session_id: 'abc123'
});

// FAQ Interaction
trackFAQInteraction(question, 'chatgpt_vs_jasper', {
  faq_position: 1
});
```

### 3. Conversion Events
```javascript
// Affiliate Click
trackAffiliateClick(toolName, 'cta', destination, 'hero', {
  comparison_context: 'chatgpt_vs_jasper'
});

// Funnel Step
trackFunnelStep('calculator_used', tool1, tool2, {
  tools_count: 3,
  team_size: 5
});
```

## User Journey Tracking

```javascript
// Initialize journey
const journey = new EnhancedUserJourney();

// Add steps
journey.addStep('comparison_viewed', {
  tool1: 'chatgpt',
  tool2: 'jasper-ai'
});

journey.addStep('calculator_used', {
  tools_selected: 3
});

// Complete journey
journey.complete(true, 25); // converted = true, value = 25
```

## Implementation in Components

### Comparison Pages
```jsx
import { trackComparisonView, EnhancedUserJourney } from '../utils/key-events-tracker';

useEffect(() => {
  // Track page view
  trackComparisonView(tool1, tool2, 'organic');
  
  // Initialize journey
  const journey = new EnhancedUserJourney();
  journey.addStep('comparison_viewed', { tool1, tool2 });
  
  // Track scroll depth
  const handleScroll = () => {
    // Track 25%, 50%, 75%, 90% scroll milestones
  };
}, []);
```

### Trackable Buttons
```jsx
<TrackableButton
  href="https://partner.example.com"
  toolName="chatgpt"
  linkType="affiliate"
  position="hero"
  variant="primary"
  external
>
  Try ChatGPT Free
</TrackableButton>
```

### Email Capture Forms
```jsx
<EmailCaptureForm
  source="comparison_page"
  tool="chatgpt"
  category="ai_writing"
  onSuccess={() => console.log('Lead captured!')}
  leadMagnet={{
    type: 'guide',
    title: 'AI Tools Comparison Guide',
    value: 15
  }}
/>
```

## Google Analytics 4 Integration

### Setup
1. Add GA tracking ID to environment variables:
```env
NEXT_PUBLIC_GA_TRACKING_ID=G-YOUR-TRACKING-ID
```

2. Analytics automatically initializes in `_app.tsx`

### Event Mapping
All key events are automatically mapped to GA4 events:
- Email captures → `generate_lead`
- Conversions → `conversion`
- Page views → `page_view`
- Custom events → tracked with custom parameters

## Key Event Values

| Event Type | Value | Category | Conversion |
|------------|-------|----------|------------|
| email_capture | 10 | lead_generation | Yes |
| webinar_registration | 15 | lead_generation | Yes |
| guide_download | 5 | lead_generation | Yes |
| pricing_quote_request | 20 | lead_generation | Yes |
| comparison_view | 1 | engagement | No |
| calculator_usage | 3 | engagement | No |
| affiliate_click | 2 | affiliate | No |
| tool_signup | 25 | conversion | Yes |

## Testing & Validation

### 1. Console Logging
All events are logged to console in development:
```
🎯 Key Event Tracked: email_capture {...}
💰 Conversion Tracked: email_capture {...}
```

### 2. Local Storage
Events are stored locally for offline tracking:
- Check localStorage: `siteoptz_events`
- Session ID: `siteoptz_session_id`

### 3. GA4 Debug View
Use GA4 DebugView to validate events:
1. Enable debug mode
2. Check real-time events
3. Verify parameters

## Performance Tracking

### Core Web Vitals
Automatically tracked on all pages:
- CLS (Cumulative Layout Shift)
- FID (First Input Delay)
- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- TTFB (Time to First Byte)

### Page Load Tracking
```javascript
trackPerformance('comparison_page');
```

## Error Tracking

Automatic error tracking for:
- JavaScript errors
- Unhandled promise rejections
- Form submission errors
- API failures

```javascript
trackError('api_error', 'Failed to load comparison data', {
  endpoint: '/api/compare',
  status: 500
});
```

## A/B Testing Support

```javascript
trackABTest('hero_cta_color', 'blue', true, {
  page: 'comparison',
  conversion_value: 15
});
```

## Offline Event Handling

Events are automatically:
1. Stored locally when offline
2. Sent when connection restored
3. Synced every 30 seconds
4. Limited to last 50 events

## Best Practices

1. **Always track key interactions**: Email captures, CTAs, tool selections
2. **Use journey tracking**: Track complete user paths for funnel analysis
3. **Include context**: Add relevant metadata to all events
4. **Test thoroughly**: Use console logs and GA4 DebugView
5. **Handle errors gracefully**: All tracking wrapped in try-catch

## Troubleshooting

### Events not appearing in GA4
1. Check console for errors
2. Verify GA tracking ID
3. Check network tab for gtag requests
4. Use GA4 DebugView

### TypeScript errors
- Use `undefined` instead of `null` for optional parameters
- Cast string literals with `as any` when needed
- Import tracking functions from `/utils/key-events-tracker`

### Performance issues
- Events are batched and debounced
- Local storage limited to 50 events
- Scroll tracking throttled

## Future Enhancements

- [ ] Custom dashboard for event analytics
- [ ] Real-time conversion notifications
- [ ] Advanced funnel visualization
- [ ] Cohort analysis
- [ ] Predictive analytics based on journey patterns

## Support

For issues or questions about key events implementation:
- Check console logs for debugging info
- Review this documentation
- Contact: info@siteoptz.com