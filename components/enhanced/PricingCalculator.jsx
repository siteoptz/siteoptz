import React, { useState, useEffect, useMemo } from 'react';
import ToolLogo from '../ToolLogo';

const PricingCalculator = ({ tools = [], selectedTools = [], onCalculationUpdate }) => {
  const [teamSize, setTeamSize] = useState(5);
  const [monthlyUsage, setMonthlyUsage] = useState('medium');
  const [paymentCycle, setPaymentCycle] = useState('monthly');
  const [calculations, setCalculations] = useState({});

  // Usage multipliers based on usage level
  const usageMultipliers = {
    low: { multiplier: 0.7, description: 'Light usage - Basic features' },
    medium: { multiplier: 1.0, description: 'Standard usage - Regular features' },
    high: { multiplier: 1.5, description: 'Heavy usage - Advanced features' },
    enterprise: { multiplier: 2.0, description: 'Enterprise usage - All features' }
  };

  // Calculate pricing for each tool
  const calculateToolPricing = useMemo(() => {
    const toolsToCalculate = selectedTools.length > 0 ? selectedTools : tools.slice(0, 5);
    
    return toolsToCalculate.map(tool => {
      const pricing = tool.pricing || [];
      let selectedPlan = pricing[0]; // Default to first plan

      // Select appropriate plan based on team size and usage
      if (teamSize > 10 || monthlyUsage === 'enterprise') {
        selectedPlan = pricing.find(p => p.plan?.toLowerCase().includes('enterprise')) || 
                     pricing[pricing.length - 1] || pricing[0];
      } else if (teamSize > 3 || monthlyUsage === 'high') {
        selectedPlan = pricing.find(p => p.plan?.toLowerCase().includes('pro') || 
                                        p.plan?.toLowerCase().includes('business')) || 
                      pricing[1] || pricing[0];
      }

      const basePrice = selectedPlan?.price_per_month || 0;
      const usageMultiplier = usageMultipliers[monthlyUsage]?.multiplier || 1;
      
      // Calculate total cost
      let monthlyCost = 0;
      if (basePrice > 0) {
        monthlyCost = basePrice * teamSize * usageMultiplier;
      }
      
      const yearlyCost = monthlyCost * 12;
      const yearlyDiscount = paymentCycle === 'yearly' ? 0.15 : 0; // 15% yearly discount
      const finalMonthlyCost = monthlyCost * (1 - yearlyDiscount);
      const finalYearlyCost = finalMonthlyCost * 12;

      return {
        tool,
        selectedPlan,
        basePrice,
        monthlyCost: finalMonthlyCost,
        yearlyCost: finalYearlyCost,
        savings: monthlyCost * 12 - finalYearlyCost,
        usageLevel: monthlyUsage,
        teamSize
      };
    });
  }, [tools, selectedTools, teamSize, monthlyUsage, paymentCycle]);

  // Update calculations when inputs change
  useEffect(() => {
    const newCalculations = calculateToolPricing.reduce((acc, calc) => {
      acc[calc.tool.id] = calc;
      return acc;
    }, {});
    
    setCalculations(newCalculations);
    if (onCalculationUpdate) {
      onCalculationUpdate(newCalculations);
    }
  }, [calculateToolPricing, onCalculationUpdate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTotalCost = () => {
    const total = calculateToolPricing.reduce((sum, calc) => sum + calc.monthlyCost, 0);
    return paymentCycle === 'yearly' ? total * 12 : total;
  };

  const getTotalSavings = () => {
    if (paymentCycle === 'monthly') return 0;
    return calculateToolPricing.reduce((sum, calc) => sum + calc.savings, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing Calculator</h2>
        <p className="text-gray-600">
          Estimate your monthly and yearly costs based on team size and usage patterns.
        </p>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Team Size */}
        <div>
          <label htmlFor="team-size" className="block text-sm font-medium text-gray-700 mb-2">
            Team Size
          </label>
          <div className="relative">
            <input
              id="team-size"
              type="range"
              min="1"
              max="50"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span className="font-medium text-gray-900">{teamSize} users</span>
              <span>50+</span>
            </div>
          </div>
        </div>

        {/* Monthly Usage */}
        <div>
          <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-2">
            Usage Level
          </label>
          <select
            id="usage"
            value={monthlyUsage}
            onChange={(e) => setMonthlyUsage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {Object.entries(usageMultipliers).map(([key, { description }]) => (
              <option key={key} value={key}>
                {description}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Cycle */}
        <div>
          <label htmlFor="payment-cycle" className="block text-sm font-medium text-gray-700 mb-2">
            Payment Cycle
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setPaymentCycle('monthly')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${
                paymentCycle === 'monthly'
                  ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } border`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPaymentCycle('yearly')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md relative ${
                paymentCycle === 'yearly'
                  ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } border`}
            >
              Yearly
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded">
                -15%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {calculateToolPricing.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tools selected for calculation</p>
            <p className="text-sm mt-1">Select tools from the comparison table above</p>
          </div>
        ) : (
          <>
            {/* Individual Tool Costs */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tool</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                      {paymentCycle === 'yearly' ? 'Annual Cost' : 'Monthly Cost'}
                    </th>
                    {paymentCycle === 'yearly' && (
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Savings</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {calculateToolPricing.map((calc) => (
                    <tr key={calc.tool.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="mr-3">
                            <ToolLogo 
                              toolName={calc.tool.name}
                              logoUrl={calc.tool.logo}
                              size="sm"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{calc.tool.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">
                          {calc.selectedPlan?.plan || 'Basic'}
                          {calc.basePrice === 0 && ' (Free)'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-medium text-gray-900">
                          {calc.monthlyCost === 0 
                            ? 'Free' 
                            : formatCurrency(paymentCycle === 'yearly' ? calc.yearlyCost : calc.monthlyCost)
                          }
                        </span>
                      </td>
                      {paymentCycle === 'yearly' && (
                        <td className="px-4 py-3 text-right">
                          <span className="text-sm font-medium text-green-600">
                            {calc.savings > 0 ? formatCurrency(calc.savings) : '-'}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Cost Summary */}
            <div className="border-t pt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium text-gray-900">
                    Total {paymentCycle === 'yearly' ? 'Annual' : 'Monthly'} Cost:
                  </span>
                  <span className="text-2xl font-bold text-indigo-600">
                    {formatCurrency(getTotalCost())}
                  </span>
                </div>
                
                {paymentCycle === 'yearly' && getTotalSavings() > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Annual Savings:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(getTotalSavings())}
                    </span>
                  </div>
                )}

                <div className="mt-3 text-xs text-gray-500">
                  <p>Calculation based on {teamSize} user(s) with {usageMultipliers[monthlyUsage]?.description.toLowerCase()}</p>
                </div>
              </div>
            </div>

            {/* ROI Insights */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">💡 Cost Optimization Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Annual billing typically saves 15-20% compared to monthly</li>
                <li>• Consider starting with lower-tier plans and upgrading as needed</li>
                <li>• Some tools offer volume discounts for larger teams</li>
                {getTotalCost() > 500 && (
                  <li>• For enterprise needs, contact vendors directly for custom pricing</li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PricingCalculator;