import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
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
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

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
      ctaText: 'Start Free Trial',
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
      ctaText: 'Start Pro Trial',
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

  const handleUpgrade = (planName: string, price: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'upgrade_cta_click', {
        event_category: 'upgrade',
        event_label: planName,
        value: price
      });
    }
    
    // Handle upgrade logic here
    if (planName === 'Enterprise') {
      router.push('/contact?subject=enterprise');
    } else {
      router.push(`/checkout?plan=${planName.toLowerCase()}&billing=${billingCycle}`);
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
            {session && (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg border border-gray-700 mb-12">
                <span className="text-gray-400">Current Plan:</span>
                <span className="text-white font-semibold">Free Plan</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Active</span>
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
                <p className="text-gray-400 text-sm">Or your money back. We're that confident.</p>
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
                      disabled={tier.name === 'Free'}
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        tier.name === 'Free'
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : tier.recommended
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {tier.ctaText}
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

        {/* Feature Comparison Table */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Compare Plans
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-6 text-gray-400">Features</th>
                    <th className="text-center py-4 px-6 text-gray-400">Free</th>
                    <th className="text-center py-4 px-6 text-white bg-gray-800/50">Starter</th>
                    <th className="text-center py-4 px-6 text-white">Pro</th>
                    <th className="text-center py-4 px-6 text-white">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-6 text-gray-300">AI Tool Comparisons</td>
                    <td className="text-center py-4 px-6 text-gray-500">3/day</td>
                    <td className="text-center py-4 px-6 text-white bg-gray-800/50">Unlimited</td>
                    <td className="text-center py-4 px-6 text-white">Unlimited</td>
                    <td className="text-center py-4 px-6 text-white">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-6 text-gray-300">Expert Consultations</td>
                    <td className="text-center py-4 px-6"><X className="w-5 h-5 text-gray-500 mx-auto" /></td>
                    <td className="text-center py-4 px-6 bg-gray-800/50"><X className="w-5 h-5 text-gray-500 mx-auto" /></td>
                    <td className="text-center py-4 px-6 text-white">4/month</td>
                    <td className="text-center py-4 px-6 text-white">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-6 text-gray-300">Implementation Roadmaps</td>
                    <td className="text-center py-4 px-6 text-gray-500">Basic</td>
                    <td className="text-center py-4 px-6 text-white bg-gray-800/50">Advanced</td>
                    <td className="text-center py-4 px-6 text-white">Custom</td>
                    <td className="text-center py-4 px-6 text-white">Custom</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-6 text-gray-300">Team Collaboration</td>
                    <td className="text-center py-4 px-6"><X className="w-5 h-5 text-gray-500 mx-auto" /></td>
                    <td className="text-center py-4 px-6 bg-gray-800/50"><X className="w-5 h-5 text-gray-500 mx-auto" /></td>
                    <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                    <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-6 text-gray-300">Priority Support</td>
                    <td className="text-center py-4 px-6"><X className="w-5 h-5 text-gray-500 mx-auto" /></td>
                    <td className="text-center py-4 px-6 bg-gray-800/50 text-white">Email</td>
                    <td className="text-center py-4 px-6 text-white">Phone + Email</td>
                    <td className="text-center py-4 px-6 text-white">Dedicated Manager</td>
                  </tr>
                </tbody>
              </table>
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
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
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
      </div>
    </>
  );
};

export default UpgradePage;