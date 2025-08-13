// Pricing calculator logic and formulas

/**
 * Usage tiers for pricing calculations
 */
export const USAGE_TIERS = {
  LIGHT: { label: 'Light', multiplier: 1, description: 'Basic usage, occasional tasks' },
  MODERATE: { label: 'Moderate', multiplier: 1.5, description: 'Regular usage, daily tasks' },
  HEAVY: { label: 'Heavy', multiplier: 2.5, description: 'Intensive usage, critical workflows' }
};

/**
 * Team size tiers with volume discounts
 */
export const TEAM_SIZE_TIERS = {
  INDIVIDUAL: { min: 1, max: 1, discount: 0 },
  SMALL: { min: 2, max: 10, discount: 0.05 },
  MEDIUM: { min: 11, max: 50, discount: 0.10 },
  LARGE: { min: 51, max: 200, discount: 0.15 },
  ENTERPRISE: { min: 201, max: Infinity, discount: 0.20 }
};

/**
 * Calculate pricing for a specific tool based on usage parameters
 * @param {Object} tool - Tool data object
 * @param {Object} params - Pricing parameters
 * @returns {Object} Calculated pricing details
 */
export function calculateToolPricing(tool, params) {
  const { teamSize, usageTier, billingCycle } = params;
  
  // Find the most appropriate plan based on team size
  const selectedPlan = findOptimalPlan(tool.pricing.plans, teamSize);
  
  // Extract base price
  const basePrice = extractPriceFromPlan(selectedPlan);
  
  // Apply usage multiplier
  const usageMultiplier = USAGE_TIERS[usageTier]?.multiplier || 1;
  const adjustedPrice = basePrice * usageMultiplier;
  
  // Apply team size discount
  const teamDiscount = getTeamSizeDiscount(teamSize);
  const discountedPrice = adjustedPrice * (1 - teamDiscount);
  
  // Calculate monthly and yearly costs
  const monthlyPricePerUser = discountedPrice;
  const yearlyPricePerUser = monthlyPricePerUser * 12;
  
  // Apply yearly billing discount (typically 15-20%)
  const yearlyDiscount = 0.17;
  const yearlyDiscountedPrice = yearlyPricePerUser * (1 - yearlyDiscount);
  
  // Calculate total costs
  const totalMonthlyCost = monthlyPricePerUser * teamSize;
  const totalYearlyCost = billingCycle === 'yearly' 
    ? (yearlyDiscountedPrice * teamSize) / 12 // Monthly equivalent
    : totalMonthlyCost;
  
  // Calculate savings
  const yearlySavings = billingCycle === 'yearly' 
    ? (yearlyPricePerUser - yearlyDiscountedPrice) * teamSize
    : 0;

  return {
    tool: tool.name,
    selectedPlan: selectedPlan.name,
    basePrice,
    pricePerUser: billingCycle === 'yearly' ? yearlyDiscountedPrice / 12 : monthlyPricePerUser,
    totalMonthlyCost: totalYearlyCost,
    totalYearlyCost: yearlyDiscountedPrice * teamSize,
    yearlySavings,
    usageMultiplier,
    teamDiscount,
    billingCycle,
    features: selectedPlan.features || [],
    limitations: selectedPlan.limitations || []
  };
}

/**
 * Find the optimal plan based on team size and features
 * @param {Array} plans - Array of pricing plans
 * @param {number} teamSize - Number of team members
 * @returns {Object} Optimal plan
 */
function findOptimalPlan(plans, teamSize) {
  // Sort plans by price (excluding custom/enterprise)
  const standardPlans = plans.filter(plan => 
    plan.price !== 'Custom' && typeof plan.price === 'number'
  );
  
  // For small teams (1-5), prefer lower-tier plans
  if (teamSize <= 5) {
    return standardPlans.find(plan => plan.price > 0) || standardPlans[0];
  }
  
  // For medium teams (6-25), prefer business/team plans
  if (teamSize <= 25) {
    const businessPlan = standardPlans.find(plan => 
      plan.name.toLowerCase().includes('team') || 
      plan.name.toLowerCase().includes('business') ||
      plan.name.toLowerCase().includes('pro')
    );
    return businessPlan || standardPlans[standardPlans.length - 1];
  }
  
  // For large teams, prefer enterprise or highest tier
  const enterprisePlan = plans.find(plan => 
    plan.name.toLowerCase().includes('enterprise') ||
    plan.price === 'Custom'
  );
  
  return enterprisePlan || standardPlans[standardPlans.length - 1];
}

/**
 * Extract numeric price from plan data
 * @param {Object} plan - Pricing plan object
 * @returns {number} Numeric price
 */
function extractPriceFromPlan(plan) {
  if (typeof plan.price === 'number') {
    return plan.price;
  }
  
  if (typeof plan.price === 'string') {
    // Handle "Custom" or other non-numeric strings
    if (plan.price.toLowerCase().includes('custom')) {
      return 100; // Default enterprise pricing estimate
    }
    
    // Extract number from string like "$20/month"
    const match = plan.price.match(/\d+(\.\d{2})?/);
    return match ? parseFloat(match[0]) : 0;
  }
  
  return 0;
}

/**
 * Get team size discount based on number of users
 * @param {number} teamSize - Number of team members
 * @returns {number} Discount percentage (0-1)
 */
function getTeamSizeDiscount(teamSize) {
  for (const tier of Object.values(TEAM_SIZE_TIERS)) {
    if (teamSize >= tier.min && teamSize <= tier.max) {
      return tier.discount;
    }
  }
  return 0;
}

/**
 * Compare two tools and determine value proposition
 * @param {Object} pricingA - Pricing results for tool A
 * @param {Object} pricingB - Pricing results for tool B
 * @returns {Object} Comparison analysis
 */
export function compareToolPricing(pricingA, pricingB) {
  const costDifference = Math.abs(pricingA.totalMonthlyCost - pricingB.totalMonthlyCost);
  const percentageDifference = (costDifference / Math.min(pricingA.totalMonthlyCost, pricingB.totalMonthlyCost)) * 100;
  
  const cheaperTool = pricingA.totalMonthlyCost <= pricingB.totalMonthlyCost ? pricingA : pricingB;
  const expensiveTool = pricingA.totalMonthlyCost > pricingB.totalMonthlyCost ? pricingA : pricingB;
  
  return {
    cheaperTool,
    expensiveTool,
    costDifference,
    percentageDifference,
    yearlySavingsDifference: Math.abs(pricingA.yearlySavings - pricingB.yearlySavings),
    recommendation: generateRecommendation(pricingA, pricingB, costDifference, percentageDifference)
  };
}

/**
 * Generate pricing recommendation based on comparison
 * @param {Object} pricingA - Pricing results for tool A
 * @param {Object} pricingB - Pricing results for tool B
 * @param {number} costDifference - Absolute cost difference
 * @param {number} percentageDifference - Percentage difference
 * @returns {string} Recommendation text
 */
function generateRecommendation(pricingA, pricingB, costDifference, percentageDifference) {
  const cheaperTool = pricingA.totalMonthlyCost <= pricingB.totalMonthlyCost ? pricingA : pricingB;
  
  if (percentageDifference < 10) {
    return `Both tools have similar pricing. Choose based on features and specific needs rather than cost.`;
  }
  
  if (percentageDifference < 25) {
    return `${cheaperTool.tool} is moderately cheaper. Consider the feature differences to determine best value.`;
  }
  
  return `${cheaperTool.tool} offers significant cost savings of $${costDifference.toFixed(2)}/month. This could be a major factor in your decision.`;
}

/**
 * Calculate ROI based on productivity improvements
 * @param {Object} params - ROI calculation parameters
 * @returns {Object} ROI analysis
 */
export function calculateROI(params) {
  const { 
    toolCost, 
    teamSize, 
    avgHourlyCost = 50, 
    productivityImprovement = 0.20, // 20% improvement
    hoursPerMonth = 160 
  } = params;
  
  const monthlyLaborCost = teamSize * avgHourlyCost * hoursPerMonth;
  const productivitySavings = monthlyLaborCost * productivityImprovement;
  const netSavings = productivitySavings - toolCost;
  const roi = (netSavings / toolCost) * 100;
  const paybackPeriod = toolCost / productivitySavings;
  
  return {
    monthlyLaborCost,
    productivitySavings,
    netSavings,
    roi,
    paybackPeriod: Math.ceil(paybackPeriod),
    breakEvenPoint: toolCost / productivitySavings
  };
}

/**
 * Generate usage recommendations based on team size and use case
 * @param {number} teamSize - Number of team members
 * @param {string} useCase - Primary use case
 * @returns {Object} Usage recommendations
 */
export function getUsageRecommendations(teamSize, useCase) {
  const recommendations = {
    individual: {
      tier: 'LIGHT',
      reasoning: 'Perfect for personal productivity and occasional AI assistance'
    },
    small: {
      tier: 'MODERATE', 
      reasoning: 'Good balance for small teams with regular AI tool usage'
    },
    medium: {
      tier: 'MODERATE',
      reasoning: 'Suitable for teams with varied AI tool needs across departments'
    },
    large: {
      tier: 'HEAVY',
      reasoning: 'Essential for large teams with AI-dependent workflows'
    }
  };
  
  let sizeCategory = 'individual';
  if (teamSize > 1 && teamSize <= 10) sizeCategory = 'small';
  else if (teamSize > 10 && teamSize <= 50) sizeCategory = 'medium';
  else if (teamSize > 50) sizeCategory = 'large';
  
  // Adjust based on use case
  const useCaseAdjustments = {
    'content-creation': { tier: 'HEAVY', boost: 'Content creation requires intensive AI usage' },
    'customer-support': { tier: 'HEAVY', boost: 'Customer support benefits from constant AI assistance' },
    'development': { tier: 'MODERATE', boost: 'Development work uses AI for specific coding tasks' },
    'research': { tier: 'MODERATE', boost: 'Research involves regular but not constant AI usage' },
    'general': { tier: null, boost: null }
  };
  
  const baseRec = recommendations[sizeCategory];
  const useCaseAdj = useCaseAdjustments[useCase] || useCaseAdjustments.general;
  
  if (useCaseAdj.tier && useCaseAdj.tier !== baseRec.tier) {
    return {
      tier: useCaseAdj.tier,
      reasoning: `${baseRec.reasoning}. ${useCaseAdj.boost}`
    };
  }
  
  return baseRec;
}