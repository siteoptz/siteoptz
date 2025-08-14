import React, { useState, useEffect } from 'react';

const PricingCalculator = ({ 
  tool, 
  onEmailCapture,
  className = '',
  showEmailCapture = true 
}) => {
  const [users, setUsers] = useState(1);
  const [planType, setPlanType] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [additionalFeatures, setAdditionalFeatures] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [email, setEmail] = useState('');
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize with first available plan
  useEffect(() => {
    if (tool && tool.pricing && tool.pricing.plans && tool.pricing.plans.length > 0) {
      const defaultPlan = tool.pricing.plans.find(plan => 
        plan.price !== '$0' && !plan.price.toLowerCase().includes('custom')
      ) || tool.pricing.plans[0];
      
      setSelectedPlan(defaultPlan);
    }
  }, [tool]);

  // Calculate pricing when inputs change
  useEffect(() => {
    if (selectedPlan) {
      calculatePricing();
    }
  }, [users, planType, selectedPlan, additionalFeatures]);

  const calculatePricing = () => {
    if (!selectedPlan) return;

    // Extract base price from plan
    let basePrice = parseFloat(selectedPlan.price.replace(/[^0-9.]/g, '')) || 0;
    
    // Calculate for number of users
    let totalBase = basePrice * users;
    
    // Add additional features cost
    const featureCosts = Object.keys(additionalFeatures)
      .filter(key => additionalFeatures[key])
      .reduce((sum, key) => {
        // You can customize feature costs here
        const featureCost = getFeatureCost(key);
        return sum + (featureCost * users);
      }, 0);
    
    let finalTotal = totalBase + featureCosts;
    
    // Apply yearly discount if applicable
    if (planType === 'yearly') {
      const monthlyTotal = finalTotal * 12;
      const yearlyDiscount = 0.2; // 20% discount
      finalTotal = monthlyTotal * (1 - yearlyDiscount);
      setSavings(monthlyTotal - finalTotal);
    } else {
      setSavings(0);
    }
    
    setTotalCost(finalTotal);
  };

  const getFeatureCost = (featureKey) => {
    // Define additional feature costs
    const featureCosts = {
      'priority_support': 5,
      'advanced_analytics': 10,
      'custom_integrations': 15,
      'white_labeling': 25,
      'api_access': 20,
      'sso': 30
    };
    
    return featureCosts[featureKey] || 0;
  };

  const handleEmailCapture = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/email-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          tool: tool.toolName,
          calculatedCost: totalCost,
          users,
          planType,
          selectedPlan: selectedPlan?.name,
          source: 'pricing-calculator',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setEmailCaptured(true);
        
        // Store calculation in localStorage
        localStorage.setItem(`calculator_${tool.toolName}`, JSON.stringify({
          users,
          planType,
          selectedPlan: selectedPlan?.name,
          totalCost,
          savings,
          timestamp: Date.now()
        }));

        // Call external handler if provided
        if (onEmailCapture) {
          onEmailCapture({
            email,
            tool: tool.toolName,
            calculatedCost: totalCost,
            users,
            planType
          });
        }
      } else {
        throw new Error('Failed to capture email');
      }
    } catch (error) {
      console.error('Email capture failed:', error);
      // You might want to show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (!tool || !tool.pricing || !tool.pricing.plans) {
    return null;
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {tool.toolName} Pricing Calculator
        </h3>
        <p className="text-gray-600">
          Calculate your costs and see potential savings with different plans and team sizes.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Plan Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose Plan
            </label>
            <div className="space-y-2">
              {tool.pricing.plans.map((plan, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPlan?.name === plan.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPlan(plan);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedPlan?.name === plan.name}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900">{plan.name}</div>
                      <div className="text-sm text-gray-500">
                        {plan.features?.slice(0, 2).join(', ')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{plan.price}</div>
                      {plan.price !== '$0' && !plan.price.toLowerCase().includes('custom') && (
                        <div className="text-xs text-gray-500">per user</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Users
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setUsers(Math.max(1, users - 1))}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center font-bold text-gray-600"
              >
                -
              </button>
              <input
                type="number"
                value={users}
                onChange={(e) => setUsers(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center text-lg font-semibold border border-gray-300 rounded-lg py-2"
                min="1"
              />
              <button
                onClick={() => setUsers(users + 1)}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center font-bold text-gray-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Billing Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Billing Period
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPlanType('monthly')}
                className={`p-4 border rounded-lg text-center transition-colors ${
                  planType === 'monthly'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold">Monthly</div>
                <div className="text-sm">Pay monthly</div>
              </button>
              <button
                onClick={() => setPlanType('yearly')}
                className={`p-4 border rounded-lg text-center transition-colors relative ${
                  planType === 'yearly'
                    ? 'border-green-500 bg-green-50 text-green-600'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold">Yearly</div>
                <div className="text-sm">Save 20%</div>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save!
                </div>
              </button>
            </div>
          </div>

          {/* Additional Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Additional Features
            </label>
            <div className="space-y-3">
              {[
                { key: 'priority_support', name: 'Priority Support', cost: 5 },
                { key: 'advanced_analytics', name: 'Advanced Analytics', cost: 10 },
                { key: 'api_access', name: 'API Access', cost: 20 },
                { key: 'sso', name: 'Single Sign-On', cost: 30 }
              ].map((feature) => (
                <div key={feature.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={additionalFeatures[feature.key] || false}
                      onChange={(e) => setAdditionalFeatures(prev => ({
                        ...prev,
                        [feature.key]: e.target.checked
                      }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{feature.name}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    +${feature.cost}/user/month
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Cost Summary */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Cost Summary</h4>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {selectedPlan?.name} × {users} user{users !== 1 ? 's' : ''}
                </span>
                <span className="font-medium">
                  {formatPrice(parseFloat(selectedPlan?.price.replace(/[^0-9.]/g, '')) * users)}
                  {planType === 'yearly' ? '/year' : '/month'}
                </span>
              </div>
              
              {Object.keys(additionalFeatures).filter(key => additionalFeatures[key]).map(featureKey => (
                <div key={featureKey} className="flex justify-between">
                  <span className="text-gray-600">
                    {featureKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} × {users}
                  </span>
                  <span className="font-medium">
                    +{formatPrice(getFeatureCost(featureKey) * users)}
                    {planType === 'yearly' ? '/year' : '/month'}
                  </span>
                </div>
              ))}
              
              {savings > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Yearly discount (20%)</span>
                  <span className="font-medium">-{formatPrice(savings)}</span>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Cost</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPrice(totalCost)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {planType === 'yearly' ? 'per year' : 'per month'}
                  </div>
                </div>
              </div>
              
              {planType === 'yearly' && (
                <div className="mt-2 text-right text-sm text-gray-600">
                  {formatPrice(totalCost / 12)} per month
                </div>
              )}
            </div>
          </div>

          {/* Email Capture */}
          {showEmailCapture && !emailCaptured && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h4 className="text-lg font-bold mb-2">Get Your Custom Quote</h4>
              <p className="text-blue-100 mb-4 text-sm">
                Enter your email to receive a detailed pricing breakdown and save your calculation.
              </p>
              
              <form onSubmit={handleEmailCapture} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Get Custom Quote'}
                </button>
              </form>
              
              <p className="text-xs text-blue-200 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          )}

          {/* Success Message */}
          {emailCaptured && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-green-800">Quote Sent Successfully!</h4>
                  <p className="text-green-700 text-sm">Check your email for the detailed pricing breakdown.</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-3">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center block"
            >
              Start Free Trial
            </a>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors text-center block"
            >
              View All Plans
            </a>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          * Prices are estimates based on current published rates and may vary. 
          Contact {tool.toolName} directly for enterprise pricing and custom arrangements. 
          Annual savings calculated based on typical 20% yearly discount.
        </p>
      </div>
    </div>
  );
};

export default PricingCalculator;