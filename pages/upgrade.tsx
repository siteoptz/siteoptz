import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { useUpgradeFlow } from '../hooks/useUpgradeFlow';
import { useUserPlan } from '../hooks/useUserPlan';
import StripePaymentModal from '../components/StripePaymentModal';
import Link from 'next/link';
import { 
  Check, 
  X, 
  Zap, 
  Trophy, 
  Star, 
  ArrowRight,
  Clock,
  TrendingUp,
  Users,
  Shield,
  HeadphonesIcon,
  Sparkles,
  ChevronDown,
  ChevronUp,
  DollarSign,
  BarChart3,
  Target,
  Rocket
} from 'lucide-react';

interface PricingTier {
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  description: string;
  features: string[];
  limitations?: string[];
  recommended?: boolean;
  ctaText: string;
  color: string;
  icon: React.ReactNode;
}

const UpgradePage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('starter');
  const [showFAQ, setShowFAQ] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentModalPlan, setPaymentModalPlan] = useState<'starter' | 'pro'>('starter');
  const { redirectToCheckout, loading, error, clearError } = useStripeCheckout();
  const { isLoggedIn, isLoading, intendedUpgrade, initiateUpgrade, completeUpgrade } = useUpgradeFlow();
  const { userPlan, loading: userPlanLoading } = useUserPlan();

  // Plan hierarchy for conditional logic
  const planHierarchy = {
    'Free': 0,
    'Starter': 1,
    'Pro': 2,
    'Enterprise': 3
  };

  // Function to check if user can upgrade to a specific plan
  const canUpgradeTo = (targetPlan: string): boolean => {
    if (!isLoggedIn || !userPlan) return true; // Non-logged users can select any plan
    
    const currentPlanLevel = planHierarchy[userPlan.plan.charAt(0).toUpperCase() + userPlan.plan.slice(1) as keyof typeof planHierarchy] || 0;
    const targetPlanLevel = planHierarchy[targetPlan as keyof typeof planHierarchy] || 0;
    
    return targetPlanLevel > currentPlanLevel;
  };

  // Function to check if this is the user's current plan
  const isCurrentPlan = (planName: string): boolean => {
    if (!isLoggedIn || !userPlan) return false;
    
    const userPlanName = userPlan.plan.charAt(0).toUpperCase() + userPlan.plan.slice(1);
    return userPlanName === planName;
  };
  

  // Handle intended upgrade when user logs in
  useEffect(() => {
    if (isLoggedIn && intendedUpgrade) {
      // User has logged in with a pending upgrade, show payment modal
      setPaymentModalPlan(intendedUpgrade.plan as 'starter' | 'pro');
      setShowPaymentModal(true);
    }
  }, [isLoggedIn, intendedUpgrade]);

  // Pricing tiers based on strategy document
  const pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Get started with daily AI insights',
      features: [
        'Daily AI tool spotlight',
        'Basic tool comparisons',
        'Limited to 3 comparisons/day',
        'Community support',
        'Basic implementation guides'
      ],
      limitations: [
        'No expert consultation',
        'Limited tool access',
        'No team features',
        'No priority support'
      ],
      ctaText: 'Current Plan',
      color: 'gray',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      name: 'Starter',
      price: billingCycle === 'yearly' ? 497 : 59,
      originalPrice: billingCycle === 'yearly' ? 997 : 99,
      period: billingCycle === 'yearly' ? '/year' : '/month',
      description: 'Perfect for growing businesses',
      features: [
        'Unlimited AI tool comparisons',
        'Advanced filtering & search',
        'Implementation roadmaps',
        'Weekly expert webinars',
        'Priority email support',
        'ROI tracking dashboard',
        'Export comparison reports',
        'Custom tool recommendations'
      ],
      ctaText: 'Upgrade Now',
      color: 'blue',
      icon: <Rocket className="w-6 h-6" />,
      recommended: true
    },
    {
      name: 'Pro',
      price: billingCycle === 'yearly' ? 1997 : 199,
      originalPrice: billingCycle === 'yearly' ? 2997 : 299,
      period: billingCycle === 'yearly' ? '/year' : '/month',
      description: 'For teams serious about AI transformation',
      features: [
        'Everything in Starter',
        '1-on-1 expert consultations (4/month)',
        'Custom implementation plans',
        'Team collaboration tools',
        'API access',
        'White-label reports',
        'Advanced analytics',
        'Priority phone support',
        'Quarterly business reviews'
      ],
      ctaText: 'Upgrade Now',
      color: 'purple',
      icon: <Trophy className="w-6 h-6" />
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'yearly' ? 4997 : 499,
      period: billingCycle === 'yearly' ? '/year' : '/month',
      description: 'Complete AI transformation partner',
      features: [
        'Everything in Pro',
        'Unlimited consultations',
        'Dedicated success manager',
        'Custom training programs',
        'SLA guarantees',
        'Custom integrations',
        'On-site workshops',
        'Executive reporting',
        'Strategic planning sessions'
      ],
      ctaText: 'Contact Sales',
      color: 'gradient',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  // FAQ items for objection handling
  const faqItems = [
    {
      question: "Can I cancel anytime?",
      answer: "Yes! You can cancel your subscription at any time. If you cancel, you&apos;ll continue to have access until the end of your billing period."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Absolutely! We offer a 30-day money-back guarantee. If you&apos;re not satisfied, we&apos;ll refund your payment, no questions asked."
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle."
    },
    {
      question: "Do you offer team discounts?",
      answer: "Yes! Contact our sales team for custom pricing on teams of 5 or more users."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans."
    }
  ];

  // Testimonials for social proof
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechStart",
      content: "SiteOptz helped us save 20+ hours per week on AI tool research. The ROI was immediate.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "CEO at GrowthCo",
      content: "The expert consultations alone are worth 10x the price. Game-changing for our AI strategy.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Operations Director",
      content: "We increased productivity by 35% in just 3 months. The implementation roadmaps are gold.",
      rating: 5
    }
  ];

  // Track page view
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'upgrade_page_view', {
        event_category: 'upgrade',
        event_label: 'upgrade_page',
        value: 1
      });
    }
  }, []);

  const handleUpgrade = async (planName: string, price: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'upgrade_cta_click', {
        event_category: 'upgrade',
        event_label: planName,
        value: price
      });
    }
    
    // Clear any previous errors
    clearError();
    
    // Handle Enterprise plan differently (contact sales)
    if (planName === 'Enterprise') {
      router.push('/contact?subject=enterprise');
      return;
    }

    // Handle Free plan (redirect to register)
    if (planName === 'Free') {
      router.push('/#register');
      return;
    }
    
    // For paid plans, check if user is logged in
    if (isLoggedIn) {
      // Show payment modal for logged-in users
      setPaymentModalPlan(planName.toLowerCase() as 'starter' | 'pro');
      setShowPaymentModal(true);
    } else {
      // Use the upgrade flow for non-logged-in users (will redirect to login)
      try {
        await initiateUpgrade(planName.toLowerCase() as 'starter' | 'pro', billingCycle);
      } catch (err) {
        console.error('Upgrade error:', err);
      }
    }
  };

  // Calculate savings
  const calculateSavings = (monthly: number, yearly: number) => {
    const yearlySavings = (monthly * 12) - yearly;
    const percentSavings = Math.round((yearlySavings / (monthly * 12)) * 100);
    return { amount: yearlySavings, percent: percentSavings };
  };

  return (
    <>
      <Head>
        <title>Upgrade Your Plan - SiteOptz AI Tools Platform</title>
        <meta name="description" content="Unlock unlimited AI tool comparisons, expert consultations, and implementation support. Transform your business with AI." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30 mb-6">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">Limited Time: Launch Pricing - Save 50%</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Stop Wasting Months on 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"> AI Tool Research</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Get expert guidance, proven frameworks, and implementation support to transform your business with AI. 
              Join 10,000+ companies already seeing results.
            </p>

            {/* Current Plan Status */}
            {session && userPlan && (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg border border-gray-700 mb-12">
                <span className="text-gray-400">Current Plan:</span>
                <span className="text-white font-semibold">
                  {userPlan.plan.charAt(0).toUpperCase() + userPlan.plan.slice(1)} Plan
                </span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                  {userPlan.status.charAt(0).toUpperCase() + userPlan.status.slice(1)}
                </span>
              </div>
            )}

            {/* Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <Clock className="w-10 h-10 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-2">Save 20+ Hours/Week</h3>
                <p className="text-gray-400 text-sm">Stop endless research. Get instant, curated recommendations.</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <TrendingUp className="w-10 h-10 text-green-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-2">30% Productivity Gain</h3>
                <p className="text-gray-400 text-sm">Implement the right tools with expert guidance.</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <DollarSign className="w-10 h-10 text-yellow-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-2">10x ROI Guaranteed</h3>
                <p className="text-gray-400 text-sm">Or your money back. We&apos;re that confident.</p>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-16 h-8 bg-gray-700 rounded-full transition-colors"
              >
                <div className={`absolute top-1 ${billingCycle === 'yearly' ? 'right-1' : 'left-1'} w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all`} />
              </button>
              <span className={`text-lg ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
                Yearly
                {billingCycle === 'yearly' && (
                  <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Save 50%</span>
                )}
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border ${
                    tier.recommended ? 'border-blue-500 shadow-2xl shadow-blue-500/20' : 'border-gray-700'
                  } ${tier.name === 'Free' ? 'opacity-75' : ''}`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full">
                        RECOMMENDED
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      {tier.icon}
                      <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                    
                    <div className="mb-6">
                      {tier.originalPrice && (
                        <div className="text-gray-500 line-through text-lg">${tier.originalPrice}</div>
                      )}
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-white">${tier.price}</span>
                        <span className="text-gray-400 ml-2">{tier.period}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleUpgrade(tier.name, tier.price)}
                      disabled={
                        loading || 
                        isLoading || 
                        userPlanLoading ||
                        isCurrentPlan(tier.name) || 
                        (isLoggedIn && !canUpgradeTo(tier.name))
                      }
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        loading || isLoading || userPlanLoading
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                          : isCurrentPlan(tier.name)
                          ? tier.name === 'Free'
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white cursor-not-allowed opacity-75'
                            : tier.name === 'Starter'
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-not-allowed opacity-75'
                            : tier.name === 'Pro'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white cursor-not-allowed opacity-75'
                            : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white cursor-not-allowed opacity-75'
                          : (isLoggedIn && !canUpgradeTo(tier.name))
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                          : tier.name === 'Free'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                          : tier.name === 'Starter'
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700'
                          : tier.name === 'Pro'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500'
                          : tier.name === 'Enterprise'
                          ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {loading || isLoading || userPlanLoading 
                        ? 'Loading...' 
                        : isCurrentPlan(tier.name) 
                        ? 'Current Plan'
                        : (isLoggedIn && !canUpgradeTo(tier.name))
                        ? 'Not Available'
                        : isLoggedIn 
                        ? 'Upgrade Now' 
                        : 'Select'
                      }
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {tier.limitations && tier.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-500 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 px-6 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Trusted by 10,000+ Businesses
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Compare Plans Section */}
        <section className="py-20 px-6 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Compare Plans
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Choose the plan that matches your AI implementation needs. All plans include our core AI tool database and expert analysis.
              </p>
            </div>

            {/* Feature Comparison Tables */}
            <div className="space-y-16">
              
              {/* AI Tool Discovery & Analysis */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  🚀 AI Tool Discovery & Analysis
                </h3>
                <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
                  Stop wasting months researching AI tools. Get instant access to pre-validated tools with 50+ hours of analysis already done for you.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-6 text-gray-400 font-medium">Feature</th>
                        <th className="text-center py-4 px-6 text-gray-400 font-medium">Free</th>
                        <th className="text-center py-4 px-6 text-white font-medium bg-blue-500/20">Starter</th>
                        <th className="text-center py-4 px-6 text-white font-medium">Pro</th>
                        <th className="text-center py-4 px-6 text-white font-medium">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Daily AI Tool Spotlight</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">AI Tool Database Access</td>
                        <td className="text-center py-4 px-6 text-gray-500">Limited (3/day)</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">Unlimited</td>
                        <td className="text-center py-4 px-6 text-green-400">Unlimited</td>
                        <td className="text-center py-4 px-6 text-green-400">Unlimited</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Advanced Filtering & Search</td>
                        <td className="text-center py-4 px-6 text-gray-500">Basic</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Trend Analysis & Market Signals</td>
                        <td className="text-center py-4 px-6 text-gray-500">Daily Only</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Custom Tool Recommendations</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Pro Tool Picks (Top 5%)</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Implementation & Strategy */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  🎯 Implementation & Strategy
                </h3>
                <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
                  50+ hours of implementation research done for you on every AI tool. Get expert guidance to implement faster and avoid costly mistakes.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-6 text-gray-400 font-medium">Feature</th>
                        <th className="text-center py-4 px-6 text-gray-400 font-medium">Free</th>
                        <th className="text-center py-4 px-6 text-white font-medium bg-blue-500/20">Starter</th>
                        <th className="text-center py-4 px-6 text-white font-medium">Pro</th>
                        <th className="text-center py-4 px-6 text-white font-medium">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Implementation Roadmaps</td>
                        <td className="text-center py-4 px-6 text-gray-500">Basic (3 guides)</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">50+ Guides</td>
                        <td className="text-center py-4 px-6 text-green-400">50+ Guides</td>
                        <td className="text-center py-4 px-6 text-green-400">50+ Guides</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">ROI Analysis & Calculations</td>
                        <td className="text-center py-4 px-6 text-gray-500">Daily Only</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Integration Planning</td>
                        <td className="text-center py-4 px-6 text-gray-500">Daily Only</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Risk Assessment</td>
                        <td className="text-center py-4 px-6 text-gray-500">Daily Only</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Custom Implementation Plans</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Strategic Planning Sessions</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Expert Support & Consulting */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  👨‍💼 Expert Support & Consulting
                </h3>
                <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
                  Get expert guidance to implement AI tools faster and avoid costly mistakes. Our AI implementation experts are here to help.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-6 text-gray-400 font-medium">Feature</th>
                        <th className="text-center py-4 px-6 text-gray-400 font-medium">Free</th>
                        <th className="text-center py-4 px-6 text-white font-medium bg-blue-500/20">Starter</th>
                        <th className="text-center py-4 px-6 text-white font-medium">Pro</th>
                        <th className="text-center py-4 px-6 text-white font-medium">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Community Support</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Priority Email Support</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Weekly Expert Webinars</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">1-on-1 Expert Consultations</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">4/month</td>
                        <td className="text-center py-4 px-6 text-green-400">Unlimited</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Priority Phone Support</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Dedicated Success Manager</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Quarterly Business Reviews</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Team & Collaboration */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  👥 Team & Collaboration
                </h3>
                <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
                  Scale AI implementation across your team with collaboration tools and management features.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-6 text-gray-400 font-medium">Feature</th>
                        <th className="text-center py-4 px-6 text-gray-400 font-medium">Free</th>
                        <th className="text-center py-4 px-6 text-white font-medium bg-blue-500/20">Starter</th>
                        <th className="text-center py-4 px-6 text-white font-medium">Pro</th>
                        <th className="text-center py-4 px-6 text-white font-medium">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Team Members</td>
                        <td className="text-center py-4 px-6 text-gray-500">1</td>
                        <td className="text-center py-4 px-6 text-gray-500 bg-blue-500/10">1</td>
                        <td className="text-center py-4 px-6 text-green-400">Up to 10</td>
                        <td className="text-center py-4 px-6 text-green-400">Unlimited</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Team Collaboration Tools</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Shared Workspaces</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Role-Based Access Control</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Team Progress Tracking</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Custom Training Programs</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Advanced Features & Integrations */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  ⚡ Advanced Features & Integrations
                </h3>
                <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
                  Get custom research in minutes, not weeks. AI agents work 24/7 for you with advanced integrations and automation.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-6 text-gray-400 font-medium">Feature</th>
                        <th className="text-center py-4 px-6 text-gray-400 font-medium">Free</th>
                        <th className="text-center py-4 px-6 text-white font-medium bg-blue-500/20">Starter</th>
                        <th className="text-center py-4 px-6 text-white font-medium">Pro</th>
                        <th className="text-center py-4 px-6 text-white font-medium">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Export Comparison Reports</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">ROI Tracking Dashboard</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400 bg-blue-500/10">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">API Access</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">White-label Reports</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Advanced Analytics</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">Custom Integrations</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">SLA Guarantees</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300">On-site Workshops</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-gray-500">-</td>
                        <td className="text-center py-4 px-6 text-green-400">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Transform Your Business with AI?
                </h3>
                <p className="text-gray-300 mb-6">
                  Join thousands of companies already seeing results. Start with our free plan or dive right in with Starter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => handleUpgrade('Starter', 497)}
                    disabled={
                      loading || 
                      isLoading || 
                      userPlanLoading ||
                      isCurrentPlan('Starter') || 
                      (isLoggedIn && !canUpgradeTo('Starter'))
                    }
                    className={`px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                      loading || isLoading || userPlanLoading
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                        : isCurrentPlan('Starter')
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-not-allowed opacity-75'
                        : (isLoggedIn && !canUpgradeTo('Starter'))
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700'
                    }`}
                  >
                    {loading || isLoading || userPlanLoading 
                      ? 'Loading...' 
                      : isCurrentPlan('Starter') 
                      ? 'Current Plan'
                      : (isLoggedIn && !canUpgradeTo('Starter'))
                      ? 'Not Available'
                      : isLoggedIn 
                      ? 'Upgrade Now' 
                      : 'Start Free Trial'
                    }
                  </button>
                  <Link
                    href="/contact"
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/15 transition-all"
                  >
                    Talk to Sales
                  </Link>
                </div>
                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    30-day money-back guarantee
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    No credit card required
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    10,000+ happy customers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 bg-gray-900/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg border border-gray-700">
                  <button
                    onClick={() => setShowFAQ(showFAQ === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-white font-medium">{item.question}</span>
                    {showFAQ === idx ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {showFAQ === idx && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-400">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of companies already seeing results. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleUpgrade('Starter', 497)}
                disabled={
                  loading || 
                  isLoading || 
                  userPlanLoading ||
                  isCurrentPlan('Starter') || 
                  (isLoggedIn && !canUpgradeTo('Starter'))
                }
                className={`px-8 py-4 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl ${
                  loading || isLoading || userPlanLoading
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                    : isCurrentPlan('Starter')
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-not-allowed opacity-75'
                    : (isLoggedIn && !canUpgradeTo('Starter'))
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700'
                }`}
              >
                {loading || isLoading || userPlanLoading 
                  ? 'Loading...' 
                  : isCurrentPlan('Starter') 
                  ? 'Current Plan'
                  : (isLoggedIn && !canUpgradeTo('Starter'))
                  ? 'Not Available'
                  : isLoggedIn 
                  ? 'Upgrade Now' 
                  : 'Select'
                }
                {!loading && !isLoading && !userPlanLoading && !isCurrentPlan('Starter') && (isLoggedIn ? canUpgradeTo('Starter') : true) && <ArrowRight className="inline-block ml-2 w-5 h-5" />}
              </button>
              <Link
                href="/contact"
                className="px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 border border-gray-700"
              >
                <HeadphonesIcon className="inline-block mr-2 w-5 h-5" />
                Talk to Sales
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                30-day money-back guarantee
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" />
                No credit card required
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                10,000+ happy customers
              </span>
            </div>
          </div>
        </section>

        {/* Stripe Payment Modal */}
        <StripePaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            // Clear intended upgrade if user closes modal
            if (intendedUpgrade) {
              completeUpgrade('cancelled');
            }
          }}
          plan={paymentModalPlan}
          billingCycle={billingCycle}
          onSuccess={(plan) => {
            setShowPaymentModal(false);
            completeUpgrade(plan);
            console.log(`Successfully upgraded to ${plan}`);
            // Redirect to dashboard or show success message
            router.push('/dashboard?upgraded=true');
          }}
          onError={(error) => {
            console.error(`Payment error: ${error}`);
            // Could show a toast notification here
          }}
        />
      </div>
    </>
  );
};

export default UpgradePage;