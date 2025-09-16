import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import UpgradeButton, { PlanUpgradeButton } from './UpgradeButton';
import StripePaymentModal from './StripePaymentModal';
import { useUpgradeFlow } from '../hooks/useUpgradeFlow';
import { 
  Crown, 
  Zap, 
  Check, 
  ArrowRight,
  User,
  CreditCard,
  Shield
} from 'lucide-react';

/**
 * Example component demonstrating the complete upgrade flow
 * This shows how to implement upgrade buttons that work for both
 * logged-in and non-logged-in users
 */
export default function UpgradeExample() {
  const { data: session } = useSession();
  const { isLoggedIn, currentPlan, intendedUpgrade, completeUpgrade } = useUpgradeFlow();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro'>('starter');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Handle upgrade button click
  const handleUpgradeClick = (plan: 'starter' | 'pro') => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  // Handle successful upgrade
  const handleUpgradeSuccess = (plan: string) => {
    completeUpgrade(plan);
    setShowPaymentModal(false);
    console.log(`Successfully upgraded to ${plan} plan`);
  };

  // Handle upgrade error
  const handleUpgradeError = (error: string) => {
    console.error('Upgrade error:', error);
    // You could show a toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Upgrade Your SiteOptz Plan
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Choose the perfect plan for your AI transformation journey
          </p>
          
          {/* User Status */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 mb-8">
            {isLoggedIn ? (
              <>
                <User className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">Logged in as:</span>
                <span className="text-white font-semibold">{session?.user?.email}</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                  {currentPlan || 'Free'} Plan
                </span>
              </>
            ) : (
              <>
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Not logged in</span>
                <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">
                  Free Plan
                </span>
              </>
            )}
          </div>

          {/* Intended Upgrade Notice */}
          {intendedUpgrade && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-blue-400 font-medium">Upgrade Pending</h3>
                  <p className="text-gray-300 text-sm">
                    You have a pending {intendedUpgrade.plan} plan upgrade. 
                    {isLoggedIn ? ' Complete your upgrade now!' : ' Please log in to continue.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-16 h-8 bg-gray-700 rounded-full transition-colors"
          >
            <div className={`absolute top-1 ${billingCycle === 'yearly' ? 'right-1' : 'left-1'} w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all`} />
          </button>
          <span className={`text-lg ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
            Yearly
            {billingCycle === 'yearly' && (
              <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                Save 50%
              </span>
            )}
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Starter Plan */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Starter</h3>
              </div>
              <p className="text-gray-400 mb-6">Perfect for growing businesses</p>
              
              <div className="mb-6">
                <div className="text-gray-500 line-through text-lg">${billingCycle === 'yearly' ? 997 : 99}</div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">
                    ${billingCycle === 'yearly' ? 497 : 59}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {billingCycle === 'yearly' ? '/year' : '/month'}
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <div className="text-green-400 text-sm font-medium mt-1">
                    Save $500 (50% off)
                  </div>
                )}
              </div>

              {/* Upgrade Button */}
              <UpgradeButton
                plan="starter"
                price={billingCycle === 'yearly' ? 497 : 59}
                billingCycle={billingCycle}
                size="lg"
                variant="primary"
                className="w-full mb-6"
                onUpgradeStart={() => console.log('Starting starter upgrade')}
                onUpgradeSuccess={handleUpgradeSuccess}
                onUpgradeError={handleUpgradeError}
              />
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                'Unlimited AI tool comparisons',
                'Advanced filtering & search',
                'Implementation roadmaps',
                'Weekly expert webinars',
                'Priority email support',
                'ROI tracking dashboard',
                'Export comparison reports',
                'Custom tool recommendations'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500 shadow-2xl shadow-blue-500/20 relative">
            {/* Recommended Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full">
                RECOMMENDED
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Pro</h3>
              </div>
              <p className="text-gray-400 mb-6">For teams serious about AI transformation</p>
              
              <div className="mb-6">
                <div className="text-gray-500 line-through text-lg">${billingCycle === 'yearly' ? 2997 : 299}</div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">
                    ${billingCycle === 'yearly' ? 1997 : 199}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {billingCycle === 'yearly' ? '/year' : '/month'}
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <div className="text-green-400 text-sm font-medium mt-1">
                    Save $1000 (33% off)
                  </div>
                )}
              </div>

              {/* Upgrade Button */}
              <UpgradeButton
                plan="pro"
                price={billingCycle === 'yearly' ? 1997 : 199}
                billingCycle={billingCycle}
                size="lg"
                variant="primary"
                className="w-full mb-6"
                onUpgradeStart={() => console.log('Starting pro upgrade')}
                onUpgradeSuccess={handleUpgradeSuccess}
                onUpgradeError={handleUpgradeError}
              />
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                'Everything in Starter',
                '1-on-1 expert consultations (4/month)',
                'Custom implementation plans',
                'Team collaboration tools',
                'API access',
                'White-label reports',
                'Advanced analytics',
                'Priority phone support',
                'Quarterly business reviews'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alternative Button Examples */}
        <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Alternative Button Styles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Secondary Style */}
            <div className="text-center">
              <h4 className="text-white font-medium mb-4">Secondary Style</h4>
              <UpgradeButton
                plan="starter"
                price={497}
                variant="secondary"
                size="md"
                onUpgradeStart={() => console.log('Secondary button clicked')}
              />
            </div>

            {/* Outline Style */}
            <div className="text-center">
              <h4 className="text-white font-medium mb-4">Outline Style</h4>
              <UpgradeButton
                plan="pro"
                price={1997}
                variant="outline"
                size="md"
                onUpgradeStart={() => console.log('Outline button clicked')}
              />
            </div>
          </div>
        </div>

        {/* Security & Guarantees */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              30-day money-back guarantee
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-green-400" />
              Secure payment by Stripe
            </span>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <StripePaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={selectedPlan}
        billingCycle={billingCycle}
        onSuccess={handleUpgradeSuccess}
        onError={handleUpgradeError}
      />
    </div>
  );
}
