import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const PricingCalculatorTemplate = ({ 
  tool, 
  calculatorConfig, 
  seoData 
}) => {
  const [users, setUsers] = useState(calculatorConfig.defaultUsers || 1);
  const [planType, setPlanType] = useState(calculatorConfig.defaultPlan || 'monthly');
  const [features, setFeatures] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [email, setEmail] = useState('');

  // Calculate pricing based on inputs
  useEffect(() => {
    calculatePricing();
  }, [users, planType, features]);

  const calculatePricing = () => {
    const selectedPlan = tool.pricing.plans.find(plan => 
      plan.name.toLowerCase().includes(planType) || 
      (planType === 'monthly' && plan.price.includes('/month'))
    ) || tool.pricing.plans[1]; // Default to second plan if no match

    if (!selectedPlan) return;

    // Extract base price
    const basePrice = parseFloat(selectedPlan.price.replace(/[^0-9.]/g, '')) || 0;
    
    // Calculate total based on users and plan type
    let calculatedTotal = basePrice * users;
    
    // Add feature costs if any
    const featureCosts = Object.keys(features)
      .filter(key => features[key])
      .reduce((sum, key) => {
        const cost = calculatorConfig.additionalFeatures?.[key]?.cost || 0;
        return sum + cost;
      }, 0);
    
    calculatedTotal += featureCosts * users;
    
    // Calculate yearly savings
    if (planType === 'yearly') {
      const monthlyCost = calculatedTotal * 12;
      const yearlyDiscount = calculatorConfig.yearlyDiscount || 0.2;
      calculatedTotal = monthlyCost * (1 - yearlyDiscount);
      setSavings(monthlyCost - calculatedTotal);
    } else {
      setSavings(0);
    }
    
    setTotalCost(calculatedTotal);
  };

  const handleFeatureToggle = (featureKey) => {
    setFeatures(prev => ({
      ...prev,
      [featureKey]: !prev[featureKey]
    }));
  };

  const handleEmailCapture = async (e) => {
    e.preventDefault();
    
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
          source: 'pricing-calculator'
        }),
      });

      if (response.ok) {
        setEmailCaptured(true);
        // Store in localStorage for persistence
        localStorage.setItem('calculatorState', JSON.stringify({
          tool: tool.toolName,
          users,
          planType,
          features,
          totalCost,
          timestamp: Date.now()
        }));
      }
    } catch (error) {
      console.error('Email capture failed:', error);
    }
  };

  // Generate structured data for the calculator
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${tool.toolName} Pricing Calculator`,
    "description": `Calculate your ${tool.toolName} costs based on team size and features`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": tool.pricing.plans.map(plan => ({
      "@type": "Offer",
      "name": plan.name,
      "price": plan.price.replace(/[^0-9.]/g, ''),
      "priceCurrency": "USD"
    }))
  };

  return (
    <>
      <Head>
        <title>{seoData?.title || `${tool.toolName} Pricing Calculator - Calculate Your Costs`}</title>
        <meta name="description" content={seoData?.description || `Calculate your ${tool.toolName} costs with our interactive pricing calculator. Get accurate estimates based on team size and features.`} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              {tool.toolName} Pricing Calculator
            </h1>
            <p className="text-xl text-blue-100">
              Calculate your exact costs and see potential savings
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Panel */}
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Configure Your Plan</h2>
                  
                  {/* Number of Users */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Users
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setUsers(Math.max(1, users - 1))}
                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 font-bold"
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
                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Plan Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        {calculatorConfig.yearlyDiscount && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            Save {Math.round(calculatorConfig.yearlyDiscount * 100)}%
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Additional Features */}
                  {calculatorConfig.additionalFeatures && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Additional Features
                      </label>
                      <div className="space-y-3">
                        {Object.entries(calculatorConfig.additionalFeatures).map(([key, feature]) => (
                          <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={features[key] || false}
                                onChange={() => handleFeatureToggle(key)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <div className="ml-3">
                                <div className="font-medium text-gray-900">{feature.name}</div>
                                <div className="text-sm text-gray-500">{feature.description}</div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              +${feature.cost}/user/month
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Plan Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Included Features</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {tool.pricing.plans.find(plan => 
                        plan.name.toLowerCase().includes(planType) ||
                        (planType === 'monthly' && plan.price.includes('/month'))
                      )?.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Results Panel */}
              <div className="space-y-8">
                {/* Cost Summary */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Base cost ({users} user{users !== 1 ? 's' : ''})</span>
                      <span className="font-medium">
                        ${((totalCost - (Object.keys(features).filter(k => features[k]).length * (calculatorConfig.additionalFeatures?.[Object.keys(features).find(k => features[k])]?.cost || 0) * users)) / (planType === 'yearly' ? 12 : 1)).toFixed(2)}
                        {planType === 'yearly' ? '/year' : '/month'}
                      </span>
                    </div>
                    
                    {Object.keys(features).filter(k => features[k]).map(featureKey => (
                      <div key={featureKey} className="flex justify-between items-center">
                        <span className="text-gray-600">
                          {calculatorConfig.additionalFeatures[featureKey].name} ({users} user{users !== 1 ? 's' : ''})
                        </span>
                        <span className="font-medium">
                          +${(calculatorConfig.additionalFeatures[featureKey].cost * users * (planType === 'yearly' ? 12 : 1)).toFixed(2)}
                          {planType === 'yearly' ? '/year' : '/month'}
                        </span>
                      </div>
                    ))}
                    
                    {savings > 0 && (
                      <div className="flex justify-between items-center text-green-600">
                        <span>Yearly discount</span>
                        <span className="font-medium">-${savings.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Cost</span>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">
                          ${totalCost.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {planType === 'yearly' ? 'per year' : 'per month'}
                        </div>
                      </div>
                    </div>
                    
                    {planType === 'yearly' && (
                      <div className="mt-2 text-sm text-gray-600 text-right">
                        ${(totalCost / 12).toFixed(2)} per month
                      </div>
                    )}
                  </div>

                  {savings > 0 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <div className="text-green-800 font-medium">
                        You save ${savings.toFixed(2)} with yearly billing!
                      </div>
                    </div>
                  )}
                </div>

                {/* Email Capture */}
                {!emailCaptured ? (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Get Your Custom Quote</h3>
                    <p className="mb-4 text-blue-100">
                      Enter your email to receive a detailed quote and exclusive pricing insights.
                    </p>
                    
                    <form onSubmit={handleEmailCapture} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <button
                        type="submit"
                        className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Get My Custom Quote
                      </button>
                    </form>
                    
                    <p className="text-xs text-blue-200 mt-3">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-green-800">Quote Sent!</h3>
                        <p className="text-green-700">Check your email for the detailed quote.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start your free trial or upgrade your plan today.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Start Free Trial
                    </a>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      View All Plans
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How Does {tool.toolName} Compare?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">${tool.pricing.price}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{tool.toolName}</div>
                <div className="text-sm text-gray-600">Starting price</div>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold text-gray-400 mb-2">$XX</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Competitor A</div>
                <div className="text-sm text-gray-600">Typical pricing</div>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold text-gray-400 mb-2">$XX</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Competitor B</div>
                <div className="text-sm text-gray-600">Typical pricing</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PricingCalculatorTemplate;