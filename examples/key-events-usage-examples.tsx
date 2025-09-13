// Key Events Usage Examples for SiteOptz.ai
// This file shows how to implement all the new key event tracking

import React from 'react';
import EnhancedCTAButton, { HeroCTA, PricingCTA, ComparisonCTA } from '../components/EnhancedCTAButton';
import WebinarRegistrationForm from '../components/WebinarRegistrationForm';
import PricingQuoteForm from '../components/PricingQuoteForm';
import GuideDownloadForm from '../components/GuideDownloadForm';
import { 
  trackEmailCaptureWithLeadScore, 
  trackWebinarRegistration,
  trackGuideDownload,
  trackPricingQuoteRequest,
  trackCTAClick,
  trackToolSignup,
  trackResourceAccess
} from '../utils/key-events-tracker';

const KeyEventsExamples: React.FC = () => {
  // Example 1: Enhanced CTA Buttons
  const CTAExamples = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">CTA Button Examples</h3>
      
      {/* Hero CTA */}
      <HeroCTA
        text="Start Free Trial"
        href="https://partner.example.com/signup"
        external
        toolContext="chatgpt"
        userIntent="signup"
        funnelStage="decision"
      />
      
      {/* Comparison CTA */}
      <ComparisonCTA
        text="Try ChatGPT Now"
        href="/signup"
        toolContext="chatgpt"
        comparisonContext="chatgpt_vs_claude"
        userIntent="purchase"
      />
      
      {/* Pricing CTA */}
      <PricingCTA
        text="Get Enterprise Quote"
        onClick={() => {
          // Track custom pricing request
          trackPricingQuoteRequest({
            email: 'user@example.com',
            company: 'Example Corp',
            teamSize: '50+',
            toolsInterested: ['chatgpt', 'claude'],
            budgetRange: '$15,000+/month',
            timeline: 'Immediately',
            useCase: 'Content Creation',
            source: 'pricing_page'
          });
        }}
        userIntent="purchase"
        type="primary"
      />
      
      {/* Custom CTA with advanced tracking */}
      <EnhancedCTAButton
        text="Download AI Guide"
        type="secondary"
        position="sidebar"
        onClick={() => {
          // Track guide download
          trackGuideDownload(
            'AI Implementation Guide.pdf',
            'sidebar_cta',
            'chatgpt',
            {
              fileType: 'pdf',
              fileSize: '2.5MB',
              category: 'guide',
              topic: 'AI Implementation',
              gated: true,
              emailRequired: true,
              email: 'user@example.com'
            }
          );
        }}
        userIntent="learn_more"
        funnelStage="awareness"
      />
    </div>
  );

  // Example 2: Webinar Registration
  const WebinarExample = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Webinar Registration Example</h3>
      
      <WebinarRegistrationForm
        webinar={{
          title: "AI Tools ROI Masterclass",
          date: "March 15, 2024",
          time: "2:00 PM EST",
          type: "live",
          instructor: "John Smith",
          duration: "60 minutes",
          description: "Learn how to calculate and maximize ROI from AI tools",
          topics: ["ROI Calculation", "Tool Selection", "Performance Metrics"]
        }}
        source="blog_post"
        utmSource="linkedin"
        utmCampaign="ai_roi_masterclass"
        onSuccess={(data) => {
          console.log('Webinar registration successful:', data);
        }}
      />
    </div>
  );

  // Example 3: Guide Download
  const GuideDownloadExample = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Guide Download Example</h3>
      
      <GuideDownloadForm
        guide={{
          title: "Complete AI Tools Comparison Guide 2024",
          fileName: "AI-Tools-Guide-2024.pdf",
          fileType: "pdf",
          fileSize: "3.2MB",
          category: "guide",
          topic: "AI Tool Selection",
          description: "Comprehensive 50-page guide comparing 100+ AI tools across categories",
          downloadUrl: "/downloads/ai-tools-guide-2024.pdf",
          gated: true
        }}
        source="comparison_page"
        toolContext="chatgpt_vs_claude"
        onSuccess={(data) => {
          console.log('Guide download successful:', data);
        }}
      />
    </div>
  );

  // Example 4: Pricing Quote Form
  const PricingQuoteExample = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Pricing Quote Example</h3>
      
      <PricingQuoteForm
        toolsContext={['chatgpt', 'claude', 'jasper-ai']}
        source="pricing_page"
        onSuccess={(data) => {
          console.log('Quote request successful:', data);
        }}
      />
    </div>
  );

  // Example 5: Manual Event Tracking
  const ManualTrackingExamples = () => {
    
    const handleEmailCapture = () => {
      // Enhanced email capture with lead scoring
      trackEmailCaptureWithLeadScore(
        'user@company.com',
        'newsletter_signup',
        'chatgpt',
        'newsletter',
        {
          company: 'Tech Corp',
          jobTitle: 'Marketing Director',
          teamSize: '25',
          useCase: 'Content Creation',
          interests: ['AI Writing', 'SEO'],
          timeline: 'immediate'
        }
      );
    };

    const handleWebinarRegistration = () => {
      trackWebinarRegistration(
        'AI Strategy Workshop',
        'user@company.com',
        {
          date: '2024-03-20',
          time: '3:00 PM EST',
          type: 'live',
          name: 'John Doe',
          company: 'Tech Corp',
          role: 'Marketing Director',
          source: 'email_campaign'
        }
      );
    };

    const handleToolSignup = () => {
      trackToolSignup(
        'ChatGPT',
        {
          source: 'comparison_page',
          plan: 'Pro',
          price: 20,
          trialDuration: 14,
          conversionTime: 86400000, // 24 hours in ms
          touchpoints: 3,
          comparisonInfluenced: true,
          calculatorUsed: true,
          email: 'user@company.com'
        }
      );
    };

    const handleResourceAccess = () => {
      trackResourceAccess(
        'blog',
        'How to Choose the Right AI Writing Tool',
        {
          method: 'search',
          readingTime: 300, // 5 minutes
          engagementDepth: 'high',
          shared: true,
          bookmarked: false
        }
      );
    };

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Manual Tracking Examples</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleEmailCapture}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Track Email Capture
          </button>
          
          <button
            onClick={handleWebinarRegistration}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Track Webinar Registration
          </button>
          
          <button
            onClick={handleToolSignup}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Track Tool Signup
          </button>
          
          <button
            onClick={handleResourceAccess}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Track Resource Access
          </button>
        </div>
      </div>
    );
  };

  // Example 6: Advanced CTA Tracking
  const AdvancedCTATracking = () => {
    
    const handleAdvancedCTAClick = (position: string, intent: string) => {
      trackCTAClick({
        text: 'Get Started Now',
        type: 'primary',
        position,
        size: 'lg',
        color: 'blue',
        section: 'hero',
        destinationUrl: '/signup',
        external: false,
        toolContext: 'chatgpt',
        comparisonContext: 'chatgpt_vs_claude',
        userIntent: intent,
        funnelStage: 'decision',
        abVariant: 'version_a'
      });
    };

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Advanced CTA Tracking</h3>
        
        <div className="space-y-2">
          <button
            onClick={() => handleAdvancedCTAClick('hero', 'signup')}
            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Hero CTA - Sign Up Intent
          </button>
          
          <button
            onClick={() => handleAdvancedCTAClick('pricing', 'purchase')}
            className="block w-full bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Pricing CTA - Purchase Intent
          </button>
          
          <button
            onClick={() => handleAdvancedCTAClick('comparison', 'research')}
            className="block w-full bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            Comparison CTA - Research Intent
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Key Events Tracking Examples</h1>
      
      <CTAExamples />
      <WebinarExample />
      <GuideDownloadExample />
      <PricingQuoteExample />
      <ManualTrackingExamples />
      <AdvancedCTATracking />
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Usage Notes:</h3>
        <ul className="text-sm space-y-1">
          <li>• All events are automatically sent to Google Analytics 4</li>
          <li>• Events are stored locally for offline tracking</li>
          <li>• Lead scoring is calculated automatically for email captures</li>
          <li>• CTA tracking includes position, intent, and funnel stage data</li>
          <li>• All forms include validation and error handling</li>
          <li>• Events include session tracking and user journey mapping</li>
        </ul>
      </div>
    </div>
  );
};

export default KeyEventsExamples;