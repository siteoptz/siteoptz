import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { 
  X, 
  CreditCard, 
  Shield, 
  Check, 
  AlertCircle,
  Loader2,
  Crown,
  User,
  ArrowRight,
  Zap
} from 'lucide-react';

interface StripePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: 'starter' | 'pro';
  billingCycle?: 'monthly' | 'yearly';
  onSuccess?: (plan: string) => void;
  onError?: (error: string) => void;
}

interface PlanDetails {
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
}

export default function StripePaymentModal({
  isOpen,
  onClose,
  plan,
  billingCycle = 'yearly',
  onSuccess,
  onError
}: StripePaymentModalProps) {
  const { data: session, status } = useSession();
  const { redirectToCheckout, loading, error, clearError } = useStripeCheckout();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'confirm' | 'processing' | 'success' | 'error'>('confirm');

  // Plan configuration
  const planConfig: Record<string, PlanDetails> = {
    starter: {
      name: 'Starter Plan',
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
      icon: <Zap className="w-6 h-6" />,
      color: 'blue'
    },
    pro: {
      name: 'Pro Plan',
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
      icon: <Crown className="w-6 h-6" />,
      color: 'purple'
    }
  };

  const planDetails = planConfig[plan];
  const isLoggedIn = !!session?.user;

  // Calculate savings
  const calculateSavings = () => {
    if (!planDetails.originalPrice) return null;
    const savings = planDetails.originalPrice - planDetails.price;
    const percentSavings = Math.round((savings / planDetails.originalPrice) * 100);
    return { amount: savings, percent: percentSavings };
  };

  const savings = calculateSavings();

  // Handle payment processing
  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setStep('processing');
      clearError();

      // Track payment initiation
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'payment_initiated', {
          event_category: 'upgrade',
          event_label: plan,
          value: planDetails.price,
          user_logged_in: isLoggedIn
        });
      }

      // Store intended upgrade in localStorage (for both logged in and non-logged in users)
      if (typeof window !== 'undefined') {
        localStorage.setItem('intendedUpgrade', JSON.stringify({
          plan,
          price: planDetails.price,
          billingCycle,
          timestamp: Date.now()
        }));
      }
      
      // Proceed with Stripe checkout
      await redirectToCheckout({
        plan,
        billingCycle,
        successUrl: `${window.location.origin}/dashboard?upgraded=true&plan=${plan}`,
        cancelUrl: `${window.location.origin}/upgrade?canceled=true`,
      });

      // If we reach here, the redirect should have happened
      // Set a timeout to reset the processing state if user stays on page (e.g., popup blocked)
      setTimeout(() => {
        if (isProcessing) {
          setStep('confirm');
          setIsProcessing(false);
          console.warn('Stripe checkout redirect may have been blocked. Please check popup blocker.');
        }
      }, 3000);

    } catch (err: any) {
      console.error('Payment error:', err);
      setStep('error');
      setIsProcessing(false);
      
      // Track payment error
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'payment_error', {
          event_category: 'upgrade',
          event_label: plan,
          error_message: err.message
        });
      }
      
      // Call error callback
      if (onError) {
        onError(err.message || 'An error occurred during payment');
      }
    }
  };

  // Reset modal state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setStep('confirm');
      clearError();
    }
  }, [isOpen, clearError]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isLoggedIn ? 'Upgrade Your Plan' : 'Subscribe to SiteOptz'}
                </h2>
                <p className="text-purple-100 text-sm">
                  {isLoggedIn ? 'Complete your upgrade' : 'Create your account and subscribe'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 transition-colors p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'confirm' && (
            <>
              {/* Plan Details */}
              <div className="mb-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {planDetails.icon}
                      <div>
                        <h3 className="text-xl font-bold text-white">{planDetails.name}</h3>
                        <p className="text-gray-400 text-sm">{planDetails.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {planDetails.originalPrice && (
                        <div className="text-gray-500 line-through text-lg">${planDetails.originalPrice}</div>
                      )}
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">${planDetails.price}</span>
                        <span className="text-gray-400 ml-2">{planDetails.period}</span>
                      </div>
                      {savings && (
                        <div className="text-green-400 text-sm font-medium">
                          Save ${savings.amount} ({savings.percent}% off)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {planDetails.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* User Status */}
              {!isLoggedIn && (
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-400" />
                    <div>
                      <h4 className="text-blue-400 font-medium">Account Required</h4>
                      <p className="text-gray-300 text-sm">
                        You&apos;ll be redirected to create an account before subscribing.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Security & Guarantees */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Cancel anytime, no questions asked</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <CreditCard className="w-4 h-4 text-green-400" />
                  <span>Secure payment processing by Stripe</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePayment}
                  disabled={loading || isProcessing}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading || isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isLoggedIn ? <Crown className="w-5 h-5" /> : <User className="w-5 h-5" />}
                      {isLoggedIn ? 'Upgrade Now' : 'Subscribe Now'}
                    </>
                  )}
                  {!loading && !isProcessing && <ArrowRight className="w-5 h-5" />}
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Processing Your Payment</h3>
              <p className="text-gray-400">
                Please wait while we redirect you to our secure payment processor...
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-400 mb-6">
                You&apos;ve been redirected to Stripe to complete your {isLoggedIn ? 'upgrade' : 'subscription'}.
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Close
              </button>
            </div>
          )}

          {step === 'error' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Payment Error</h3>
              <p className="text-gray-400 mb-6">
                {error || 'An error occurred while processing your payment. Please try again.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setStep('confirm')}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
