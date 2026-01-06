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
      '✓ Full AI Coding Platform access',
      '✓ Explorer & Creator level projects',
      '✓ Real AI APIs (OpenAI GPT-4, basic DALL-E)',
      '✓ Progress tracking dashboard',
      '✓ Project sharing with friends',
      '✓ Parent review access',
      '✓ Safety alerts & recommendations',
      '✓ Educational value ratings',
      '✓ Email support'
    ],
    limitations: [
      '✗ No Builder or Innovator levels',
      '✗ No classroom management',
      '✗ No bulk student tracking',
      '✗ No advanced AI model training'
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
      '✓ All 4 coding levels (Explorer to Innovator)',
      '✓ Advanced AI APIs (DALL-E 3, custom models)',
      '✓ Classroom management tools',
      '✓ Student progress dashboards',
      '✓ Lesson plan integration',
      '✓ Teacher training resources',
      '✓ Bulk tool comparisons',
      '✓ Student activity tracking',
      '✓ Parent communication tools',
      '✓ Priority email support',
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
      '✓ Custom AI model training for students',
      '✓ District-wide coding platform deployment',
      '✓ Advanced project collaboration tools',
      '✓ AI ethics & safety curriculum',
      '✓ Custom implementation support',
      '✓ Teacher training programs',
      '✓ COPPA compliance audits',
      '✓ Custom integrations',
      '✓ Dedicated account manager',
      '✓ Priority support (24/7)',
      '✓ Unlimited users',
      '✓ Custom reporting & analytics',
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
  description: 'Basic access to safety-certified AI tools plus beginner coding projects',
  features: [
    '✓ Browse 50+ free AI tools',
    '✓ Basic safety information',
    '✓ Age range filtering',
    '✓ COPPA compliance badges',
    '✓ 2 free AI coding projects (Explorer level)',
    '✓ Basic story generator project',
    '✓ Simple chatbot tutorial'
  ],
  limitations: [
    '✗ Limited tool details',
    '✗ No progress tracking',
    '✗ No parent reviews',
    '✗ Only Explorer level projects',
    '✗ No advanced AI APIs (DALL-E, GPT-4)',
    '✗ No project sharing features'
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