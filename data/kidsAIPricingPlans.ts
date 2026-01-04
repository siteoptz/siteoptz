// Kids AI Pricing Plans Configuration for Next.js/TypeScript
// Adapted from KIDS_AI_IMPLEMENTATION_INSTRUCTIONS.md

export interface KidsAIPricingPlan {
  id: string;
  name: string;
  price: number | 'custom';
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  stripePriceId: string | null;
  upgradeTo: string | null;
  contactSales?: boolean;
  popular?: boolean;
  badge?: string;
}

export interface KidsAIPricingPlans {
  [key: string]: KidsAIPricingPlan;
}

export const kidsAIPricingPlans: KidsAIPricingPlans = {
  'parent-pro': {
    id: 'parent-pro',
    name: 'Parent Pro',
    price: 19,
    period: 'month',
    description: 'Perfect for parents who want safe, educational AI tools for their children',
    features: [
      '✓ Browse 200+ safety-certified AI tools',
      '✓ COPPA compliance verification',
      '✓ Age-appropriate filtering (5-8, 9-12, 13-18)',
      '✓ Progress tracking dashboard',
      '✓ Parent review access',
      '✓ Safety alerts & recommendations',
      '✓ Educational value ratings',
      '✓ Cost comparison tools',
      '✓ Email support',
      '✓ 10 saved tools'
    ],
    limitations: [
      '✗ No classroom management',
      '✗ No bulk student tracking',
      '✗ No school district features'
    ],
    stripePriceId: 'price_parent_pro_monthly', // Replace with actual Stripe price ID
    upgradeTo: 'educator',
    popular: true,
    badge: 'Most Popular'
  },
  
  'educator': {
    id: 'educator',
    name: 'Educator',
    price: 49,
    period: 'month',
    description: 'Ideal for teachers and homeschooling parents',
    features: [
      '✓ Everything in Parent Pro',
      '✓ Classroom management tools',
      '✓ Student progress dashboards',
      '✓ Lesson plan integration',
      '✓ Teacher training resources',
      '✓ Bulk tool comparisons',
      '✓ Student activity tracking',
      '✓ Parent communication tools',
      '✓ Priority email support',
      '✓ Unlimited saved tools',
      '✓ Team collaboration (up to 5 teachers)'
    ],
    limitations: [
      '✗ No district-wide features',
      '✗ No custom integrations',
      '✗ No dedicated support'
    ],
    stripePriceId: 'price_educator_monthly',
    upgradeTo: 'school'
  },
  
  'school': {
    id: 'school',
    name: 'School/District',
    price: 'custom',
    period: 'month',
    description: 'Complete AI implementation for schools and districts',
    features: [
      '✓ Everything in Educator',
      '✓ District-wide tool licensing',
      '✓ Custom implementation support',
      '✓ Teacher training programs',
      '✓ COPPA compliance audits',
      '✓ Custom integrations',
      '✓ Dedicated account manager',
      '✓ Priority support (24/7)',
      '✓ Unlimited users',
      '✓ Custom reporting & analytics',
      '✓ Parent communication portal',
      '✓ Safety monitoring dashboard',
      '✓ Bulk student progress tracking',
      '✓ White-label options'
    ],
    limitations: [],
    stripePriceId: null, // Custom pricing
    upgradeTo: null,
    contactSales: true,
    badge: 'Enterprise'
  }
};

// Upgrade features comparison
export interface KidsAIUpgradeFeatures {
  [key: string]: string[];
}

export const kidsAIUpgradeFeatures: KidsAIUpgradeFeatures = {
  freeToParentPro: [
    'Safety-certified tools access',
    'COPPA compliance verification', 
    'Progress tracking',
    'Parent reviews',
    'Safety alerts'
  ],
  parentProToEducator: [
    'Classroom management',
    'Student dashboards',
    'Lesson plan integration',
    'Teacher training',
    'Team collaboration'
  ],
  educatorToSchool: [
    'District-wide licensing',
    'Custom implementation',
    'Dedicated support',
    'Custom integrations',
    'White-label options'
  ]
};

// Free tier capabilities
export const kidsAIFreeTier = {
  id: 'free',
  name: 'Free',
  price: 0,
  period: 'forever',
  description: 'Basic access to safety-certified AI tools for kids',
  features: [
    '✓ Browse 50+ free AI tools',
    '✓ Basic safety information',
    '✓ Age range filtering',
    '✓ COPPA compliance badges',
    '✓ Basic tool descriptions'
  ],
  limitations: [
    '✗ Limited tool details',
    '✗ No progress tracking',
    '✗ No parent reviews',
    '✗ No safety recommendations',
    '✗ No cost comparisons'
  ]
};

// Helper functions
export function getPlanFeatures(planId: string): string[] {
  return kidsAIPricingPlans[planId]?.features || [];
}

export function getPlanPrice(planId: string): number | 'custom' {
  return kidsAIPricingPlans[planId]?.price || 0;
}

export function getUpgradePath(currentPlan: string): string | null {
  return kidsAIPricingPlans[currentPlan]?.upgradeTo || null;
}

export function isFeatureIncluded(planId: string, feature: string): boolean {
  const plan = kidsAIPricingPlans[planId];
  return plan ? plan.features.some(f => f.includes(feature)) : false;
}

export function getStripePriceId(planId: string): string | null {
  return kidsAIPricingPlans[planId]?.stripePriceId || null;
}