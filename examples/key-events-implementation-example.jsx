// Key Events Implementation Example for SiteOptz.ai
// This file shows how to integrate key event tracking into your existing components

import React, { useEffect, useState } from 'react';
import { 
  trackKeyEvent, 
  trackEmailCapture, 
  trackComparisonView, 
  trackCalculatorUsage,
  trackAffiliateClick,
  trackFAQInteraction,
  trackFunnelStep,
  EnhancedUserJourney,
  initKeyEventsTracking
} from '../utils/key-events-tracker.js';

// Example: Enhanced Tool Comparison Component
export const EnhancedToolComparisonTable = ({ tools, tool1, tool2 }) => {
  const [userJourney] = useState(() => new EnhancedUserJourney());
  
  useEffect(() => {
    // Initialize key events tracking
    initKeyEventsTracking();
    
    // Track comparison view when component mounts
    trackComparisonView(tool1.name, tool2.name, 'direct_traffic', {
      page_section: 'comparison_table',
      tools_count: tools.length
    });
    
    // Add to user journey
    userJourney.addStep('comparison_viewed', {
      tool1: tool1.name,
      tool2: tool2.name,
      source: 'comparison_table'
    });
    
    // Track funnel step
    trackFunnelStep('comparison_viewed', tool1.name, tool2.name);
    
  }, [tool1, tool2, tools.length, userJourney]);
  
  const handleFeatureComparison = (feature, tool1Data, tool2Data) => {
    trackKeyEvent('feature_comparison', {
      feature,
      tool_1: tool1Data.name,
      tool_2: tool2Data.name,
      tool_1_value: tool1Data[feature],
      tool_2_value: tool2Data[feature],
      label: `feature_${feature}_comparison`,
      page_section: 'comparison_table'
    });
  };
  
  const handleToolClick = (toolName, linkType, destination) => {
    trackAffiliateClick(toolName, linkType, destination, 'comparison_table', {
      comparison_context: `${tool1.name}_vs_${tool2.name}`,
      page_section: 'comparison_table'
    });
    
    // Track funnel step
    trackFunnelStep('cta_clicked', tool1.name, tool2.name);
    
    // Add to user journey
    userJourney.addStep('cta_clicked', {
      tool: toolName,
      linkType,
      destination
    });
  };
  
  return (
    <div className="comparison-table">
      <h2>{tool1.name} vs {tool2.name} Comparison</h2>
      
      {/* Feature comparison rows */}
      {['pricing', 'features', 'ease_of_use', 'support'].map(feature => (
        <div key={feature} className="comparison-row">
          <div className="feature-name">{feature}</div>
          <div 
            className="tool-1-value"
            onClick={() => handleFeatureComparison(feature, tool1, tool2)}
          >
            {tool1[feature]}
          </div>
          <div 
            className="tool-2-value"
            onClick={() => handleFeatureComparison(feature, tool1, tool2)}
          >
            {tool2[feature]}
          </div>
        </div>
      ))}
      
      {/* CTA Buttons */}
      <div className="cta-buttons">
        <button 
          onClick={() => handleToolClick(tool1.name, 'pricing', tool1.pricing_url)}
          className="btn-primary"
        >
          Get {tool1.name} Pricing
        </button>
        <button 
          onClick={() => handleToolClick(tool2.name, 'pricing', tool2.pricing_url)}
          className="btn-primary"
        >
          Get {tool2.name} Pricing
        </button>
      </div>
    </div>
  );
};

// Example: Enhanced Pricing Calculator Component
export const EnhancedPricingCalculator = ({ tools }) => {
  const [selectedTools, setSelectedTools] = useState([]);
  const [teamSize, setTeamSize] = useState(1);
  const [usage, setUsage] = useState('light');
  const [userJourney] = useState(() => new EnhancedUserJourney());
  
  useEffect(() => {
    // Track calculator view
    trackKeyEvent('calculator_view', {
      tools_available: tools.length,
      label: 'pricing_calculator_view',
      page_section: 'pricing_calculator'
    });
    
    // Add to user journey
    userJourney.addStep('calculator_viewed', {
      tools_available: tools.length
    });
    
  }, [tools.length, userJourney]);
  
  const handleToolSelection = (tool, isSelected) => {
    const newSelectedTools = isSelected 
      ? [...selectedTools, tool]
      : selectedTools.filter(t => t.id !== tool.id);
    
    setSelectedTools(newSelectedTools);
    
    // Track tool selection
    trackKeyEvent('tool_selection', {
      tool_name: tool.name,
      selected: isSelected,
      total_selected: newSelectedTools.length,
      label: `tool_${isSelected ? 'selected' : 'deselected'}_${tool.name}`,
      page_section: 'pricing_calculator'
    });
    
    // Add to user journey
    userJourney.addStep('tool_selected', {
      tool: tool.name,
      selected: isSelected,
      totalSelected: newSelectedTools.length
    });
  };
  
  const handleTeamSizeChange = (newSize) => {
    setTeamSize(newSize);
    
    // Track team size change
    trackKeyEvent('team_size_change', {
      old_size: teamSize,
      new_size: newSize,
      tools_selected: selectedTools.length,
      label: `team_size_${newSize}`,
      page_section: 'pricing_calculator'
    });
  };
  
  const handleUsageChange = (newUsage) => {
    setUsage(newUsage);
    
    // Track usage change
    trackKeyEvent('usage_change', {
      old_usage: usage,
      new_usage: newUsage,
      tools_selected: selectedTools.length,
      team_size: teamSize,
      label: `usage_${newUsage}`,
      page_section: 'pricing_calculator'
    });
  };
  
  const calculateTotal = () => {
    const totalCost = selectedTools.reduce((sum, tool) => {
      return sum + (tool.pricing[usage] * teamSize);
    }, 0);
    
    // Track calculation
    trackCalculatorUsage(selectedTools, teamSize, usage, totalCost, {
      page_section: 'pricing_calculator',
      calculation_type: 'manual'
    });
    
    // Track funnel step
    trackFunnelStep('calculator_used', null, null, {
      tools_count: selectedTools.length,
      team_size: teamSize,
      total_cost: totalCost
    });
    
    // Add to user journey
    userJourney.addStep('calculation_completed', {
      tools: selectedTools.map(t => t.name),
      teamSize,
      usage,
      totalCost
    });
    
    return totalCost;
  };
  
  return (
    <div className="pricing-calculator">
      <h2>AI Tools Pricing Calculator</h2>
      
      {/* Tool Selection */}
      <div className="tool-selection">
        <h3>Select Tools</h3>
        {tools.map(tool => (
          <label key={tool.id} className="tool-option">
            <input
              type="checkbox"
              checked={selectedTools.some(t => t.id === tool.id)}
              onChange={(e) => handleToolSelection(tool, e.target.checked)}
            />
            {tool.name} - ${tool.pricing[usage]}/user/month
          </label>
        ))}
      </div>
      
      {/* Team Size */}
      <div className="team-size">
        <h3>Team Size</h3>
        <input
          type="number"
          min="1"
          max="100"
          value={teamSize}
          onChange={(e) => handleTeamSizeChange(parseInt(e.target.value))}
        />
      </div>
      
      {/* Usage Level */}
      <div className="usage-level">
        <h3>Usage Level</h3>
        <select value={usage} onChange={(e) => handleUsageChange(e.target.value)}>
          <option value="light">Light Usage</option>
          <option value="medium">Medium Usage</option>
          <option value="heavy">Heavy Usage</option>
        </select>
      </div>
      
      {/* Calculate Button */}
      <button onClick={calculateTotal} className="btn-calculate">
        Calculate Total Cost
      </button>
      
      {/* Results */}
      {selectedTools.length > 0 && (
        <div className="calculation-results">
          <h3>Monthly Cost: ${calculateTotal()}</h3>
          <h3>Yearly Cost: ${calculateTotal() * 12}</h3>
        </div>
      )}
    </div>
  );
};

// Example: Enhanced Email Capture Component
export const EnhancedEmailCaptureForm = ({ source, tool, category, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userJourney] = useState(() => new EnhancedUserJourney());
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Track email capture attempt
      trackKeyEvent('email_capture_attempt', {
        source,
        tool,
        category,
        email_domain: email.split('@')[1],
        label: `email_capture_attempt_${source}`,
        page_section: 'email_capture_form'
      });
      
      // Submit email (your existing logic)
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source, tool, category })
      });
      
      if (response.ok) {
        // Track successful email capture
        trackEmailCapture(source, tool, category, {
          email_domain: email.split('@')[1],
          name_provided: !!name,
          label: `email_capture_success_${source}`,
          page_section: 'email_capture_form'
        });
        
        // Track funnel step
        trackFunnelStep('email_captured', tool, null, {
          source,
          category,
          email_domain: email.split('@')[1]
        });
        
        // Add to user journey
        userJourney.addStep('email_captured', {
          source,
          tool,
          category,
          email_domain: email.split('@')[1]
        });
        
        onSuccess?.();
      } else {
        throw new Error('Email submission failed');
      }
      
    } catch (error) {
      // Track email capture failure
      trackKeyEvent('email_capture_failed', {
        source,
        tool,
        category,
        error_message: error.message,
        label: `email_capture_failed_${source}`,
        page_section: 'email_capture_form'
      });
      
      console.error('Email capture failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="email-capture-form">
      <h3>Get Your Free AI Tools Guide</h3>
      
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
      
      <button type="submit" disabled={isSubmitting} className="btn-submit">
        {isSubmitting ? 'Submitting...' : 'Get Free Guide'}
      </button>
    </form>
  );
};

// Example: Enhanced FAQ Component
export const EnhancedFAQSection = ({ faqs, toolContext = null }) => {
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const handleFAQClick = (faq, index) => {
    const isOpening = openFAQ !== index;
    setOpenFAQ(isOpening ? index : null);
    
    // Track FAQ interaction
    trackFAQInteraction(faq.question, toolContext, {
      faq_index: index,
      action: isOpening ? 'opened' : 'closed',
      label: `faq_${isOpening ? 'opened' : 'closed'}_${index}`,
      page_section: 'faq_section'
    });
  };
  
  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <button
            className="faq-question"
            onClick={() => handleFAQClick(faq, index)}
          >
            {faq.question}
          </button>
          
          {openFAQ === index && (
            <div className="faq-answer">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Example: Page-level integration
export const EnhancedComparisonPage = ({ tool1, tool2, tools, faqs }) => {
  const [userJourney] = useState(() => new EnhancedUserJourney());
  
  useEffect(() => {
    // Initialize tracking
    initKeyEventsTracking();
    
    // Track page view
    trackKeyEvent('page_view', {
      page_type: 'comparison_page',
      tool_1: tool1.name,
      tool_2: tool2.name,
      label: `page_view_${tool1.name}_vs_${tool2.name}`
    });
    
    // Start user journey
    userJourney.addStep('page_landed', {
      page_type: 'comparison_page',
      tool1: tool1.name,
      tool2: tool2.name,
      source: 'direct_traffic'
    });
    
    // Track funnel step
    trackFunnelStep('landing', tool1.name, tool2.name);
    
    // Track performance
    trackPerformance('comparison_page');
    
  }, [tool1, tool2, userJourney]);
  
  const handlePageExit = () => {
    // Complete user journey
    userJourney.complete(false); // No conversion yet
    
    // Track page exit
    trackKeyEvent('page_exit', {
      page_type: 'comparison_page',
      tool_1: tool1.name,
      tool_2: tool2.name,
      time_on_page: Date.now() - userJourney.startTime,
      label: `page_exit_${tool1.name}_vs_${tool2.name}`
    });
  };
  
  useEffect(() => {
    // Track page exit
    window.addEventListener('beforeunload', handlePageExit);
    
    return () => {
      window.removeEventListener('beforeunload', handlePageExit);
    };
  }, []);
  
  return (
    <div className="comparison-page">
      <EnhancedToolComparisonTable 
        tools={tools} 
        tool1={tool1} 
        tool2={tool2} 
      />
      
      <EnhancedPricingCalculator tools={tools} />
      
      <EnhancedEmailCaptureForm 
        source="comparison_page"
        tool={`${tool1.name}_vs_${tool2.name}`}
        category="ai_tools"
        onSuccess={() => {
          // Track successful conversion
          userJourney.complete(true, 10); // Conversion with value
        }}
      />
      
      <EnhancedFAQSection faqs={faqs} toolContext={`${tool1.name}_vs_${tool2.name}`} />
    </div>
  );
};

export default {
  EnhancedToolComparisonTable,
  EnhancedPricingCalculator,
  EnhancedEmailCaptureForm,
  EnhancedFAQSection,
  EnhancedComparisonPage
};
