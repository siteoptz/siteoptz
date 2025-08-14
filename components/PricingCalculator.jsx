import React, { useState, useEffect } from 'react';
import aiToolsData from '../aiToolsData.json';

const PricingCalculator = ({ selectedTools = [] }) => {
  const [inputs, setInputs] = useState({
    teamSize: 1,
    monthlyUsage: 'low', // low, medium, high
    paymentCycle: 'monthly', // monthly, yearly
    selectedTools: selectedTools
  });

  const [calculations, setCalculations] = useState({});

  // Usage multipliers
  const usageMultipliers = {
    low: 1,
    medium: 1.5,
    high: 2.5
  };

  // Calculate pricing for each tool
  useEffect(() => {
    const newCalculations = {};
    
    inputs.selectedTools.forEach(tool => {
      const basePrice = inputs.paymentCycle === 'yearly' ? tool.pricing.yearly : tool.pricing.monthly;
      const usageMultiplier = usageMultipliers[inputs.monthlyUsage];
      
      // Calculate per-user pricing
      let perUserPrice = basePrice;
      if (tool.pricing.monthly < 50) {
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
      const monthlyPrice = inputs.paymentCycle === 'yearly' ? tool.pricing.monthly : basePrice;
      const yearlyPrice = inputs.paymentCycle === 'yearly' ? totalPrice : totalPrice * 12;
      const savings = inputs.paymentCycle === 'yearly' ? (monthlyPrice * 12 - yearlyPrice) : 0;

      newCalculations[tool.tool_name] = {
        monthlyPrice: inputs.paymentCycle === 'yearly' ? yearlyPrice / 12 : totalPrice,
        yearlyPrice: inputs.paymentCycle === 'yearly' ? yearlyPrice : totalPrice * 12,
        savings: savings,
        perUserPrice: perUserPrice / inputs.teamSize,
        totalPrice: totalPrice
      };
    });

    setCalculations(newCalculations);
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToolToggle = (tool) => {
    setInputs(prev => ({
      ...prev,
      selectedTools: prev.selectedTools.find(t => t.tool_name === tool.tool_name)
        ? prev.selectedTools.filter(t => t.tool_name !== tool.tool_name)
        : [...prev.selectedTools, tool]
    }));
  };

  const getUsageDescription = (usage) => {
    switch (usage) {
      case 'low': return 'Light usage (1-2 hours/week)';
      case 'medium': return 'Moderate usage (5-10 hours/week)';
      case 'high': return 'Heavy usage (20+ hours/week)';
      default: return '';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Tool Pricing Calculator</h2>
      
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Size
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={inputs.teamSize}
            onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Usage
          </label>
          <select
            value={inputs.monthlyUsage}
            onChange={(e) => handleInputChange('monthlyUsage', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Low Usage</option>
            <option value="medium">Medium Usage</option>
            <option value="high">High Usage</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">{getUsageDescription(inputs.monthlyUsage)}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Cycle
          </label>
          <select
            value={inputs.paymentCycle}
            onChange={(e) => handleInputChange('paymentCycle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly (Save 10-20%)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tools to Compare
          </label>
          <div className="text-sm text-gray-600">
            {inputs.selectedTools.length} selected
          </div>
        </div>
      </div>

      {/* Tool Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Tools to Compare</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {aiToolsData.map(tool => (
            <button
              key={tool.tool_name}
              onClick={() => handleToolToggle(tool)}
              className={`p-3 rounded-lg border-2 text-left transition-colors ${
                inputs.selectedTools.find(t => t.tool_name === tool.tool_name)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <img 
                  src={tool.logo_url} 
                  alt={`${tool.tool_name} logo`}
                  className="w-6 h-6 rounded mr-2"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-logo.png';
                  }}
                />
                <span className="text-sm font-medium">{tool.tool_name}</span>
              </div>
              <div className="text-xs text-gray-500">
                {formatCurrency(tool.pricing.monthly)}/mo
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Results */}
      {inputs.selectedTools.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Pricing Comparison</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {inputs.selectedTools.map(tool => {
              const calc = calculations[tool.tool_name];
              if (!calc) return null;

              return (
                <div key={tool.tool_name} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={tool.logo_url} 
                      alt={`${tool.tool_name} logo`}
                      className="w-8 h-8 rounded mr-3"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-logo.png';
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{tool.tool_name}</h4>
                      <p className="text-sm text-gray-500">{tool.vendor}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Monthly Cost:</span>
                      <span className="font-semibold">{formatCurrency(calc.monthlyPrice)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Yearly Cost:</span>
                      <span className="font-semibold">{formatCurrency(calc.yearlyPrice)}</span>
                    </div>

                    {calc.savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="text-sm">Yearly Savings:</span>
                        <span className="font-semibold">{formatCurrency(calc.savings)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Per User/Month:</span>
                      <span className="font-semibold">{formatCurrency(calc.perUserPrice)}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <a
                        href={tool.affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium text-center block transition-colors"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Cost Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600">Total Monthly Cost</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    inputs.selectedTools.reduce((sum, tool) => {
                      const calc = calculations[tool.tool_name];
                      return sum + (calc ? calc.monthlyPrice : 0);
                    }, 0)
                  )}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Yearly Cost</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    inputs.selectedTools.reduce((sum, tool) => {
                      const calc = calculations[tool.tool_name];
                      return sum + (calc ? calc.yearlyPrice : 0);
                    }, 0)
                  )}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Savings</div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    inputs.selectedTools.reduce((sum, tool) => {
                      const calc = calculations[tool.tool_name];
                      return sum + (calc ? calc.savings : 0);
                    }, 0)
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {inputs.selectedTools.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select Tools to Compare</h3>
          <p className="text-gray-500">Choose the AI tools you&apos;re interested in to see pricing comparisons.</p>
        </div>
      )}
    </div>
  );
};

export default PricingCalculator;


