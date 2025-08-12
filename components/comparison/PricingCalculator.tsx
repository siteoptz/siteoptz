import { useState, useMemo } from 'react';
import Image from 'next/image';

interface Tool {
  tool_name: string;
  vendor: string;
  logo_url: string;
  description: string;
  features: {
    core: string[];
    advanced: string[];
    integrations: string[];
  };
  pros: string[];
  cons: string[];
  pricing: {
    monthly: number;
    yearly: number;
    enterprise: string;
    plans: {
      plan_name: string;
      price: string;
      features_included: string[];
    }[];
  };
  official_url: string;
  affiliate_link: string;
  rating: number;
  review_count: number;
  best_use_cases: string[];
  target_audience: string[];
  free_trial: boolean;
  demo_available: boolean;
}

interface PricingCalculatorProps {
  toolA: Tool;
  toolB: Tool;
}

interface CalculatorInputs {
  numberOfUsers: number;
  estimatedMonthlyUsage: number;
  paymentCycle: 'monthly' | 'yearly';
}

interface PricingResult {
  tool: Tool;
  basePricePerUser: number;
  totalMonthlyPrice: number;
  totalYearlyPrice: number;
  displayPrice: number;
  savings: number;
  recommendedPlan: string;
  usageNote: string;
}

export default function PricingCalculator({ toolA, toolB }: PricingCalculatorProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    numberOfUsers: 5,
    estimatedMonthlyUsage: 1000,
    paymentCycle: 'monthly'
  });

  // Extract numeric price from pricing string
  const extractPrice = (priceString: string): number => {
    if (priceString.toLowerCase().includes('free') || priceString.includes('$0')) {
      return 0;
    }
    const match = priceString.match(/\$(\d+(?:\.\d{2})?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  // Calculate pricing for each tool
  const calculateToolPricing = (tool: Tool): PricingResult => {
    const plans = tool.pricing.plans;
    let selectedPlan = plans[0];
    let basePricePerUser = extractPrice(selectedPlan.price);

    // Determine best plan based on team size and usage
    if (inputs.numberOfUsers > 10 && plans.length > 2) {
      // Use enterprise/team plan for larger teams
      selectedPlan = plans[plans.length - 1];
      basePricePerUser = extractPrice(selectedPlan.price);
    } else if (inputs.numberOfUsers > 1 && plans.length > 1) {
      // Use team/pro plan for multi-user teams
      selectedPlan = plans[1];
      basePricePerUser = extractPrice(selectedPlan.price);
    }

    // Calculate usage-based adjustments
    let usageMultiplier = 1;
    let usageNote = '';

    if (inputs.estimatedMonthlyUsage > 10000) {
      usageMultiplier = 1.5;
      usageNote = 'High usage may require additional credits';
    } else if (inputs.estimatedMonthlyUsage > 5000) {
      usageMultiplier = 1.2;
      usageNote = 'Medium usage included in plan';
    } else {
      usageNote = 'Usage fits within standard plan limits';
    }

    // Calculate total costs
    const adjustedPricePerUser = basePricePerUser * usageMultiplier;
    const totalMonthlyPrice = adjustedPricePerUser * inputs.numberOfUsers;
    const totalYearlyPrice = totalMonthlyPrice * 12;

    // Calculate yearly savings (typically 15-20% discount)
    const yearlyDiscount = 0.17; // 17% average yearly discount
    const discountedYearlyPrice = totalYearlyPrice * (1 - yearlyDiscount);
    const savings = totalYearlyPrice - discountedYearlyPrice;

    // Determine display price based on payment cycle
    const displayPrice = inputs.paymentCycle === 'yearly' 
      ? discountedYearlyPrice / 12 // Monthly equivalent of yearly price
      : totalMonthlyPrice;

    return {
      tool,
      basePricePerUser: adjustedPricePerUser,
      totalMonthlyPrice,
      totalYearlyPrice: discountedYearlyPrice,
      displayPrice,
      savings: inputs.paymentCycle === 'yearly' ? savings : 0,
      recommendedPlan: selectedPlan.plan_name,
      usageNote
    };
  };

  // Calculate results for both tools
  const pricingResults = useMemo(() => {
    return {
      toolA: calculateToolPricing(toolA),
      toolB: calculateToolPricing(toolB)
    };
  }, [toolA, toolB, inputs]);

  // Determine which tool is more cost-effective
  const cheaperTool = pricingResults.toolA.displayPrice <= pricingResults.toolB.displayPrice 
    ? pricingResults.toolA 
    : pricingResults.toolB;

  const expensiveTool = pricingResults.toolA.displayPrice > pricingResults.toolB.displayPrice 
    ? pricingResults.toolA 
    : pricingResults.toolB;

  const costDifference = expensiveTool.displayPrice - cheaperTool.displayPrice;

  // Handle CTA clicks
  const handleCTAClick = (tool: Tool, action: 'signup' | 'contact') => {
    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'pricing_cta_click', {
        event_category: 'Engagement',
        event_label: `${tool.tool_name} - ${action}`,
        value: Math.round(pricingResults[tool === toolA ? 'toolA' : 'toolB'].displayPrice)
      });
    }

    // Open appropriate link
    if (action === 'signup') {
      window.open(tool.affiliate_link || tool.official_url, '_blank');
    } else {
      window.open(`${tool.official_url}/contact`, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Calculator</h2>
        <p className="text-gray-600">
          Calculate estimated costs based on your team size and usage requirements
        </p>
      </div>

      {/* Input Fields */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Requirements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Number of Users */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Users
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="500"
                value={inputs.numberOfUsers}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  numberOfUsers: Math.max(1, parseInt(e.target.value) || 1)
                }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Team members who will use the tool</p>
          </div>

          {/* Estimated Monthly Usage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Monthly Usage
            </label>
            <div className="relative">
              <input
                type="number"
                min="100"
                max="100000"
                step="100"
                value={inputs.estimatedMonthlyUsage}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  estimatedMonthlyUsage: Math.max(100, parseInt(e.target.value) || 1000)
                }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">API calls, messages, or generations per month</p>
          </div>

          {/* Payment Cycle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Cycle
            </label>
            <div className="relative">
              <select
                value={inputs.paymentCycle}
                onChange={(e) => setInputs(prev => ({ 
                  ...prev, 
                  paymentCycle: e.target.value as 'monthly' | 'yearly'
                }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly (Save ~17%)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Choose billing frequency</p>
          </div>
        </div>
      </div>

      {/* Pricing Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Tool A Results */}
        <div className="border border-gray-200 rounded-xl p-6 relative">
          {pricingResults.toolA === cheaperTool && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Best Value
              </span>
            </div>
          )}
          
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-50 rounded-lg p-2 mr-4">
              <Image
                src={toolA.logo_url}
                alt={`${toolA.tool_name} pricing calculator logo - ${toolA.vendor} AI tool cost estimation`}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{toolA.tool_name}</h3>
              <p className="text-sm text-gray-500">{pricingResults.toolA.recommendedPlan}</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Price per user</span>
              <span className="font-semibold">${pricingResults.toolA.basePricePerUser.toFixed(2)}/month</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Total {inputs.paymentCycle} cost</span>
              <span className="font-semibold">
                ${pricingResults.toolA.displayPrice.toFixed(2)}
                {inputs.paymentCycle === 'yearly' ? '/month (billed yearly)' : '/month'}
              </span>
            </div>

            {inputs.paymentCycle === 'yearly' && pricingResults.toolA.savings > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Yearly savings</span>
                <span className="font-semibold">${pricingResults.toolA.savings.toFixed(2)}/year</span>
              </div>
            )}

            <div className="pt-2 border-t border-gray-200">
              <div className="text-2xl font-bold text-blue-600">
                ${(pricingResults.toolA.displayPrice * inputs.numberOfUsers).toFixed(2)}
                <span className="text-base font-normal text-gray-500">
                  /{inputs.paymentCycle === 'yearly' ? 'month' : 'month'}
                </span>
              </div>
              {inputs.paymentCycle === 'yearly' && (
                <p className="text-sm text-gray-500">
                  ${(pricingResults.toolA.totalYearlyPrice).toFixed(2)} billed annually
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">{pricingResults.toolA.usageNote}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleCTAClick(toolA, 'signup')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Sign Up for {toolA.tool_name}
            </button>
            <button
              onClick={() => handleCTAClick(toolA, 'contact')}
              className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>

        {/* Tool B Results */}
        <div className="border border-gray-200 rounded-xl p-6 relative">
          {pricingResults.toolB === cheaperTool && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Best Value
              </span>
            </div>
          )}
          
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-50 rounded-lg p-2 mr-4">
              <Image
                src={toolB.logo_url}
                alt={`${toolB.tool_name} pricing calculator logo - ${toolB.vendor} AI tool cost estimation`}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{toolB.tool_name}</h3>
              <p className="text-sm text-gray-500">{pricingResults.toolB.recommendedPlan}</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Price per user</span>
              <span className="font-semibold">${pricingResults.toolB.basePricePerUser.toFixed(2)}/month</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Total {inputs.paymentCycle} cost</span>
              <span className="font-semibold">
                ${pricingResults.toolB.displayPrice.toFixed(2)}
                {inputs.paymentCycle === 'yearly' ? '/month (billed yearly)' : '/month'}
              </span>
            </div>

            {inputs.paymentCycle === 'yearly' && pricingResults.toolB.savings > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Yearly savings</span>
                <span className="font-semibold">${pricingResults.toolB.savings.toFixed(2)}/year</span>
              </div>
            )}

            <div className="pt-2 border-t border-gray-200">
              <div className="text-2xl font-bold text-purple-600">
                ${(pricingResults.toolB.displayPrice * inputs.numberOfUsers).toFixed(2)}
                <span className="text-base font-normal text-gray-500">
                  /{inputs.paymentCycle === 'yearly' ? 'month' : 'month'}
                </span>
              </div>
              {inputs.paymentCycle === 'yearly' && (
                <p className="text-sm text-gray-500">
                  ${(pricingResults.toolB.totalYearlyPrice).toFixed(2)} billed annually
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">{pricingResults.toolB.usageNote}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleCTAClick(toolB, 'signup')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Sign Up for {toolB.tool_name}
            </button>
            <button
              onClick={() => handleCTAClick(toolB, 'contact')}
              className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Cost Comparison Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Cost Comparison Summary</h3>
        
        {costDifference > 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-blue-800">
                <span className="font-semibold">{cheaperTool.tool.tool_name}</span> is{' '}
                <span className="font-bold">${costDifference.toFixed(2)} cheaper</span>{' '}
                per user per {inputs.paymentCycle === 'yearly' ? 'month (billed yearly)' : 'month'}
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Total savings: ${(costDifference * inputs.numberOfUsers).toFixed(2)}{' '}
                {inputs.paymentCycle === 'yearly' ? 'per month' : 'per month'}
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={() => handleCTAClick(cheaperTool.tool, 'signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
              >
                Choose {cheaperTool.tool.tool_name}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-blue-800">
            Both tools have the same estimated cost for your requirements.
          </p>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          * Estimates based on published pricing. Actual costs may vary based on specific usage patterns, 
          enterprise discounts, and additional features. Contact sales for exact pricing.
        </p>
      </div>
    </div>
  );
}