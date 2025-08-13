import React, { useState, useEffect } from 'react';

const PricingCalculator = ({ tools, selectedTools = [], onGetQuote }) => {
  const [teamSize, setTeamSize] = useState(1);
  const [selectedPlans, setSelectedPlans] = useState({});
  const [usageLevels, setUsageLevels] = useState({});
  const [timeframe, setTimeframe] = useState('monthly');
  const [totalCost, setTotalCost] = useState(0);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize selected plans and usage levels
  useEffect(() => {
    const initialPlans = {};
    const initialUsage = {};
    tools.forEach(tool => {
      initialPlans[tool.tool_name] = 'basic';
      initialUsage[tool.tool_name] = 50; // Default 50% usage
    });
    setSelectedPlans(initialPlans);
    setUsageLevels(initialUsage);
  }, [tools]);

  // Calculate total cost when selections change
  useEffect(() => {
    let total = 0;
    tools.forEach(tool => {
      const plan = selectedPlans[tool.tool_name];
      const usage = usageLevels[tool.tool_name] || 50;
      const planKey = plan === 'free' ? 'free' : plan === 'pro' ? 'pro' : 'basic';
      const pricing = tool.pricing[planKey];
      
      if (pricing && pricing !== 'No free plan available') {
        const priceMatch = pricing.match(/\$(\d+(?:\.\d+)?)/);
        if (priceMatch) {
          const basePrice = parseFloat(priceMatch[1]);
          const usageMultiplier = usage / 100;
          total += basePrice * teamSize * usageMultiplier;
        }
      }
    });
    
    if (timeframe === 'annual') {
      total = total * 12 * 0.8; // 20% discount for annual
    } else if (timeframe === 'monthly') {
      total = total;
    }
    
    setTotalCost(total);
  }, [selectedPlans, usageLevels, teamSize, timeframe, tools]);

  const getPlanPrice = (tool, plan) => {
    const pricing = tool.pricing[plan];
    if (!pricing || pricing === 'No free plan available') return 0;
    
    const priceMatch = pricing.match(/\$(\d+(?:\.\d+)?)/);
    return priceMatch ? parseFloat(priceMatch[1]) : 0;
  };

  const getPlanName = (tool, plan) => {
    const pricing = tool.pricing[plan];
    if (!pricing) return 'N/A';
    
    const nameMatch = pricing.match(/^([^-]+)/);
    return nameMatch ? nameMatch[1].trim() : plan;
  };

  const handlePlanChange = (toolName, plan) => {
    setSelectedPlans(prev => ({
      ...prev,
      [toolName]: plan
    }));
  };

  const handleUsageChange = (toolName, usage) => {
    setUsageLevels(prev => ({
      ...prev,
      [toolName]: usage
    }));
  };

  const handleGetQuote = () => {
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Call the onGetQuote callback with the quote data
      if (onGetQuote) {
        await onGetQuote({
          email,
          tools: tools.map(tool => ({
            name: tool.tool_name,
            plan: selectedPlans[tool.tool_name],
            usage: usageLevels[tool.tool_name],
            price: getPlanPrice(tool, selectedPlans[tool.tool_name])
          })),
          teamSize,
          timeframe,
          totalCost
        });
      }
      
      // Reset form
      setEmail('');
      setShowEmailForm(false);
      setIsSubmitting(false);
      
      // Show success message
      alert('Quote request submitted successfully! We\'ll be in touch soon.');
    } catch (error) {
      console.error('Error submitting quote:', error);
      setIsSubmitting(false);
      alert('Error submitting quote. Please try again.');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getUsageLabel = (usage) => {
    if (usage <= 25) return 'Light';
    if (usage <= 50) return 'Moderate';
    if (usage <= 75) return 'Heavy';
    return 'Enterprise';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing Calculator</h2>
        <p className="text-gray-600">Calculate the total cost for your team and get a custom quote</p>
      </div>

      {/* Team Size Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Team Size
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="1"
            max="100"
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Number of team members"
          />
          <span className="text-sm text-gray-500">
            {teamSize} team member{teamSize > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Timeframe Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Billing Cycle
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="monthly"
              checked={timeframe === 'monthly'}
              onChange={(e) => setTimeframe(e.target.value)}
              className="mr-2"
              aria-label="Monthly billing"
            />
            <span className="text-sm">Monthly</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="annual"
              checked={timeframe === 'annual'}
              onChange={(e) => setTimeframe(e.target.value)}
              className="mr-2"
              aria-label="Annual billing with 20% discount"
            />
            <span className="text-sm">Annual (20% off)</span>
          </label>
        </div>
      </div>

      {/* Tool Selection with Plan Dropdowns and Usage Sliders */}
      <div className="space-y-6 mb-6">
        {tools.map((tool) => {
          const selectedPlan = selectedPlans[tool.tool_name];
          const usage = usageLevels[tool.tool_name] || 50;
          const planPrice = getPlanPrice(tool, selectedPlan);
          const usageMultiplier = usage / 100;
          const adjustedPrice = planPrice * teamSize * usageMultiplier;
          
          return (
            <div key={tool.tool_name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xs" aria-hidden="true">
                      {tool.tool_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{tool.tool_name}</h3>
                    <p className="text-sm text-gray-500">{tool.description?.substring(0, 80)}...</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-indigo-600">
                    {formatPrice(adjustedPrice)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {timeframe === 'annual' ? 'per year' : 'per month'}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Plan Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan
                  </label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => handlePlanChange(tool.tool_name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={`Select plan for ${tool.tool_name}`}
                  >
                    {['free', 'basic', 'pro'].map((plan) => {
                      const price = getPlanPrice(tool, plan);
                      const planName = getPlanName(tool, plan);
                      return (
                        <option key={plan} value={plan}>
                          {planName} {price > 0 ? `(${formatPrice(price)}/mo)` : '(Free)'}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Usage Level Slider */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usage Level: {getUsageLabel(usage)} ({usage}%)
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={usage}
                      onChange={(e) => handleUsageChange(tool.tool_name, parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      aria-label={`Usage level for ${tool.tool_name}`}
                    />
                    <span className="text-sm text-gray-500 w-12 text-right">
                      {usage}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Light</span>
                    <span>Moderate</span>
                    <span>Heavy</span>
                    <span>Enterprise</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Cost Display */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Total Cost</h3>
            <p className="text-sm text-gray-500">
              {timeframe === 'annual' ? 'Per year' : 'Per month'} for {teamSize} team member{teamSize > 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-indigo-600">
              {formatPrice(totalCost)}
            </div>
            <div className="text-sm text-gray-500">
              {timeframe === 'annual' ? 'Billed annually' : 'Billed monthly'}
            </div>
          </div>
        </div>
      </div>

      {/* Savings Notice */}
      {timeframe === 'annual' && totalCost > 0 && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-green-600 mr-2">💰</span>
            <span className="text-sm text-green-800">
              You save {formatPrice(totalCost * 0.25)} per year with annual billing!
            </span>
          </div>
        </div>
      )}

      {/* Get Quote Button */}
      <div className="text-center">
        <button
          onClick={handleGetQuote}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          aria-label="Get custom quote for selected tools"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Get Custom Quote
        </button>
      </div>

      {/* Email Capture Form */}
      {showEmailForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Get Your Custom Quote</h3>
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email address"
                    aria-label="Email address for quote"
                  />
                </div>
                
                <div className="mb-4 p-3 bg-gray-50 rounded">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Quote Summary:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Team Size: {teamSize} member{teamSize > 1 ? 's' : ''}</li>
                    <li>Billing: {timeframe === 'annual' ? 'Annual' : 'Monthly'}</li>
                    <li>Total Cost: {formatPrice(totalCost)}</li>
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCalculator;
