import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { calculateToolPricing, compareToolPricing, USAGE_TIERS } from '../../utils/pricing';
import { TryNowButton, ContactSalesButton } from '../CTAButton';

/**
 * Interactive pricing calculator component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Pricing calculator component
 */
export default function PricingCalculator({ 
  toolA, 
  toolB, 
  className = '',
  showComparison = true 
}) {
  const [calculatorInputs, setCalculatorInputs] = useState({
    teamSize: 5,
    usageTier: 'MODERATE',
    billingCycle: 'monthly'
  });

  // Calculate pricing for both tools
  const pricingResults = useMemo(() => {
    const resultA = calculateToolPricing(toolA, calculatorInputs);
    const resultB = showComparison ? calculateToolPricing(toolB, calculatorInputs) : null;
    
    return {
      toolA: resultA,
      toolB: resultB,
      comparison: showComparison && resultB ? compareToolPricing(resultA, resultB) : null
    };
  }, [toolA, toolB, calculatorInputs, showComparison]);

  // Handle input changes
  const updateInput = useCallback((field, value) => {
    setCalculatorInputs(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Handle CTA clicks with tracking
  const handleCTAClick = useCallback((tool, action) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'pricing_cta_click', {
        event_category: 'Engagement',
        event_label: `${tool.name} - ${action}`,
        value: Math.round(pricingResults[tool === toolA ? 'toolA' : 'toolB']?.totalMonthlyCost || 0)
      });
    }
  }, [toolA, toolB, pricingResults]);

  return (
    <div className={`bg-white rounded-xl shadow-lg border p-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Calculator</h2>
        <p className="text-gray-600">
          Calculate estimated costs based on your team size and usage requirements
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Requirements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Team Size Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Size
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="500"
                value={calculatorInputs.teamSize}
                onChange={(e) => updateInput('teamSize', Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter team size"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Number of users who will use the tool</p>
          </div>

          {/* Usage Tier Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usage Level
            </label>
            <select
              value={calculatorInputs.usageTier}
              onChange={(e) => updateInput('usageTier', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            >
              {Object.entries(USAGE_TIERS).map(([key, tier]) => (
                <option key={key} value={key}>
                  {tier.label} - {tier.description}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Expected usage intensity</p>
          </div>

          {/* Billing Cycle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Billing Cycle
            </label>
            <select
              value={calculatorInputs.billingCycle}
              onChange={(e) => updateInput('billingCycle', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly (Save ~17%)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Choose billing frequency for best value</p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className={`grid gap-8 mb-8 ${showComparison ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'}`}>
        {/* Tool A Results */}
        <PricingCard 
          tool={toolA}
          pricing={pricingResults.toolA}
          isWinner={pricingResults.comparison?.cheaperTool.tool === toolA.name}
          onCTAClick={handleCTAClick}
        />

        {/* Tool B Results (only if comparing) */}
        {showComparison && pricingResults.toolB && (
          <PricingCard 
            tool={toolB}
            pricing={pricingResults.toolB}
            isWinner={pricingResults.comparison?.cheaperTool.tool === toolB.name}
            onCTAClick={handleCTAClick}
          />
        )}
      </div>

      {/* Comparison Summary */}
      {showComparison && pricingResults.comparison && (
        <ComparisonSummary 
          comparison={pricingResults.comparison}
          billingCycle={calculatorInputs.billingCycle}
          teamSize={calculatorInputs.teamSize}
        />
      )}

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

/**
 * Individual pricing card component
 */
function PricingCard({ tool, pricing, isWinner, onCTAClick }) {
  return (
    <div className="border border-gray-200 rounded-xl p-6 relative">
      {/* Best Value Badge */}
      {isWinner && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Best Value
          </span>
        </div>
      )}
      
      {/* Tool Header */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-50 rounded-lg p-2 mr-4">
          <Image
            src={tool.logo}
            alt={`${tool.name} pricing calculator logo - ${tool.vendor} AI tool cost estimation`}
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
          <p className="text-sm text-gray-500">{pricing.selectedPlan}</p>
        </div>
      </div>

      {/* Pricing Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Price per user</span>
          <span className="font-semibold">${pricing.pricePerUser.toFixed(2)}/month</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total monthly cost</span>
          <span className="font-semibold">${pricing.totalMonthlyCost.toFixed(2)}</span>
        </div>

        {pricing.billingCycle === 'yearly' && pricing.yearlySavings > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span>Yearly savings</span>
            <span className="font-semibold">${pricing.yearlySavings.toFixed(2)}/year</span>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <div className="text-3xl font-bold text-blue-600">
            ${pricing.totalMonthlyCost.toFixed(2)}
            <span className="text-base font-normal text-gray-500">/month</span>
          </div>
          {pricing.billingCycle === 'yearly' && (
            <p className="text-sm text-gray-500">
              ${pricing.totalYearlyCost.toFixed(2)} billed annually
            </p>
          )}
        </div>
      </div>

      {/* Features & Limitations */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Plan Features:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {pricing.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        
        {pricing.limitations.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-500">
              Limitations: {pricing.limitations.slice(0, 2).join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <TryNowButton 
          tool={tool}
          size="medium"
          fullWidth
          onClick={() => onCTAClick(tool, 'signup')}
        />
        <ContactSalesButton 
          tool={tool}
          size="medium"
          variant="outline"
          onClick={() => onCTAClick(tool, 'contact')}
        />
      </div>
    </div>
  );
}

/**
 * Comparison summary component
 */
function ComparisonSummary({ comparison, billingCycle, teamSize }) {
  const { cheaperTool, expensiveTool, costDifference, recommendation } = comparison;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-3">Cost Comparison Summary</h3>
      
      {costDifference > 0 ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-blue-800">
                <span className="font-semibold">{cheaperTool.tool}</span> is{' '}
                <span className="font-bold">${costDifference.toFixed(2)} cheaper</span>{' '}
                per month for your team
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Annual savings: ${(costDifference * 12).toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Recommendation:</h4>
            <p className="text-blue-800 text-sm">{recommendation}</p>
          </div>
        </div>
      ) : (
        <p className="text-blue-800">
          Both tools have similar costs for your team size and usage requirements.
        </p>
      )}
    </div>
  );
}