import React, { useState, useMemo } from 'react';
import { Calculator, Users, Zap, DollarSign, Calendar } from 'lucide-react';

export default function PricingCalculator({ selectedTools = [] }) {
  const [inputs, setInputs] = useState({
    teamSize: 1,
    monthlyUsage: 'low',
    paymentCycle: 'monthly',
  });

  // Usage multipliers
  const usageMultipliers = {
    low: 1,
    medium: 1.5,
    high: 2.5,
  };

  // Calculate pricing for each tool
  const calculations = useMemo(() => {
    const results = {};
    
    selectedTools.forEach(tool => {
      const basePrice = inputs.paymentCycle === 'yearly' 
        ? tool.pricingPlans?.find(p => p.annualPrice > 0)?.annualPrice || 0
        : tool.pricingPlans?.find(p => p.monthlyPrice > 0)?.monthlyPrice || 0;
      
      const usageMultiplier = usageMultipliers[inputs.monthlyUsage];
      
      // Calculate per-user pricing
      let perUserPrice = basePrice;
      if (basePrice < 50) {
        // For lower-priced tools, assume per-user pricing
        perUserPrice = basePrice * inputs.teamSize;
      } else {
        // For higher-priced tools, assume team pricing with discounts
        const teamDiscount = inputs.teamSize > 5 ? 0.8 : inputs.teamSize > 2 ? 0.9 : 1;
        perUserPrice = basePrice * teamDiscount;
      }

      // Apply usage multiplier
      const totalPrice = perUserPrice * usageMultiplier;
      
      // Calculate savings
      const monthlyPrice = inputs.paymentCycle === 'yearly' 
        ? tool.pricingPlans?.find(p => p.monthlyPrice > 0)?.monthlyPrice || 0 
        : basePrice;
      const yearlyPrice = inputs.paymentCycle === 'yearly' ? totalPrice : totalPrice * 12;
      const savings = inputs.paymentCycle === 'yearly' ? (monthlyPrice * 12 - yearlyPrice) : 0;

      results[tool.id] = {
        monthlyPrice: totalPrice,
        yearlyPrice,
        savings,
        basePrice,
        usageMultiplier
      };
    });

    return results;
  }, [selectedTools, inputs, usageMultipliers]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getUsageDescription = (usage) => {
    const descriptions = {
      low: 'Basic usage - up to 10 hours/month',
      medium: 'Regular usage - 10-40 hours/month',
      high: 'Heavy usage - 40+ hours/month'
    };
    return descriptions[usage] || '';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">AI Tool Pricing Calculator</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate the total cost for your team based on size, usage, and payment cycle.
        </p>
      </div>

      {/* Input Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-2">
            <Users className="w-5 h-5" />
            Team Configuration
          </h3>
          <p className="text-gray-600">
            Adjust these settings to see how pricing changes for your specific needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="teamSize" className="text-sm font-medium text-gray-700 block">Team Size</label>
            <input
              id="teamSize"
              type="number"
              min="1"
              max="100"
              value={inputs.teamSize}
              onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500">
              Number of team members using the tools
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="monthlyUsage" className="text-sm font-medium text-gray-700 block">Monthly Usage</label>
            <select
              id="monthlyUsage"
              value={inputs.monthlyUsage}
              onChange={(e) => handleInputChange('monthlyUsage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low Usage</option>
              <option value="medium">Medium Usage</option>
              <option value="high">High Usage</option>
            </select>
            <p className="text-xs text-gray-500">
              {getUsageDescription(inputs.monthlyUsage)}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="paymentCycle" className="text-sm font-medium text-gray-700 block">Payment Cycle</label>
            <select
              id="paymentCycle"
              value={inputs.paymentCycle}
              onChange={(e) => handleInputChange('paymentCycle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly (Save 10-20%)</option>
            </select>
            <p className="text-xs text-gray-500">
              Choose between monthly or annual billing
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      {selectedTools.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select Tools to Compare
          </h3>
          <p className="text-gray-500">
            Choose the AI tools you&apos;re interested in to see pricing comparisons.
          </p>
        </div>
      ) : (
        <>
          {/* Individual Tool Pricing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedTools.map(tool => {
              const calc = calculations[tool.id];
              if (!calc) return null;

              return (
                <div key={tool.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img 
                        src={tool.logo} 
                        alt={`${tool.name} logo`}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-logo.png';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                      <p className="text-gray-600">by {tool.vendor}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(calc.monthlyPrice)}
                        </div>
                        <div className="text-sm text-gray-600">Monthly</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(calc.yearlyPrice)}
                        </div>
                        <div className="text-sm text-gray-600">Yearly</div>
                      </div>
                    </div>

                    {calc.savings > 0 && (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-green-700">Yearly Savings:</span>
                        <span className="font-semibold text-green-700">
                          {formatCurrency(calc.savings)}
                        </span>
                      </div>
                    )}

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Base Price:</span>
                        <span>{formatCurrency(calc.basePrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Team Size:</span>
                        <span>{inputs.teamSize} {inputs.teamSize === 1 ? 'user' : 'users'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Usage Level:</span>
                        <span className="capitalize">{inputs.monthlyUsage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Total Cost Summary</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(Object.values(calculations).reduce((sum, calc) => sum + calc.monthlyPrice, 0))}
                </div>
                <div className="text-sm text-gray-600">Total Monthly Cost</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(Object.values(calculations).reduce((sum, calc) => sum + calc.yearlyPrice, 0))}
                </div>
                <div className="text-sm text-gray-600">Total Yearly Cost</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(Object.values(calculations).reduce((sum, calc) => sum + calc.savings, 0))}
                </div>
                <div className="text-sm text-gray-600">Potential Savings</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}