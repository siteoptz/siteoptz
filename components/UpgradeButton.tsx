import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { 
  CreditCard, 
  User, 
  ArrowRight, 
  Loader2,
  Crown,
  Zap
} from 'lucide-react';

interface UpgradeButtonProps {
  plan: 'starter' | 'pro';
  price: number;
  billingCycle?: 'monthly' | 'yearly';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  showIcon?: boolean;
  onUpgradeStart?: () => void;
  onUpgradeSuccess?: (plan: string) => void;
  onUpgradeError?: (error: string) => void;
  onShowRegister?: (plan: string) => void;
}

export default function UpgradeButton({
  plan,
  price,
  billingCycle = 'yearly',
  className = '',
  size = 'md',
  variant = 'primary',
  showIcon = true,
  onUpgradeStart,
  onUpgradeSuccess,
  onUpgradeError,
  onShowRegister
}: UpgradeButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { redirectToCheckout, loading, error, clearError } = useStripeCheckout();
  const [isProcessing, setIsProcessing] = useState(false);

  // Determine button text based on login status
  const getButtonText = () => {
    if (loading || isProcessing) {
      return 'Processing...';
    }
    
    if (status === 'loading') {
      return 'Loading...';
    }
    
    if (!session?.user) {
      return 'Select';
    }
    
    return 'Upgrade Now';
  };

  // Get button icon based on login status
  const getButtonIcon = () => {
    if (loading || isProcessing) {
      return <Loader2 className="w-4 h-4 animate-spin" />;
    }
    
    if (!session?.user) {
      return <User className="w-4 h-4" />;
    }
    
    return <Crown className="w-4 h-4" />;
  };

  // Handle upgrade/subscribe action
  const handleUpgrade = async () => {
    try {
      setIsProcessing(true);
      clearError();
      
      // Call the onUpgradeStart callback
      if (onUpgradeStart) {
        onUpgradeStart();
      }

      // Track the upgrade attempt
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'upgrade_button_click', {
          event_category: 'upgrade',
          event_label: plan,
          value: price,
          user_logged_in: !!session?.user
        });
      }

      // If user is not logged in, collect email and proceed with Stripe checkout
      if (!session?.user) {
        // Store the intended plan in localStorage for after login
        if (typeof window !== 'undefined') {
          localStorage.setItem('intendedUpgrade', JSON.stringify({
            plan,
            price,
            billingCycle,
            timestamp: Date.now()
          }));
        }
        
        // For non-logged-in users, we'll let Stripe collect the email
        // The API will handle this case by not requiring authentication
        await redirectToCheckout({
          plan,
          billingCycle,
          successUrl: `${window.location.origin}/dashboard?upgraded=true&plan=${plan}`,
          cancelUrl: `${window.location.origin}/upgrade?canceled=true`,
        });

        // Call success callback
        if (onUpgradeSuccess) {
          onUpgradeSuccess(plan);
        }
        return;
      }

      // User is logged in, proceed with Stripe checkout
      await redirectToCheckout({
        plan,
        billingCycle,
        successUrl: `${window.location.origin}/dashboard?upgraded=true&plan=${plan}`,
        cancelUrl: `${window.location.origin}/upgrade?canceled=true`,
      });

      // Call success callback
      if (onUpgradeSuccess) {
        onUpgradeSuccess(plan);
      }

    } catch (err: any) {
      console.error('Upgrade error:', err);
      
      // Call error callback
      if (onUpgradeError) {
        onUpgradeError(err.message || 'An error occurred during upgrade');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700',
    outline: 'bg-transparent text-blue-400 border-2 border-blue-400 hover:bg-blue-400 hover:text-white'
  };

  const isDisabled = loading || isProcessing || status === 'loading';

  return (
    <button
      onClick={handleUpgrade}
      disabled={isDisabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
        font-semibold rounded-lg transition-all duration-200 transform hover:scale-105
        flex items-center justify-center gap-2
        ${isDisabled ? 'opacity-50 cursor-not-allowed transform-none' : ''}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
      `}
    >
      {showIcon && getButtonIcon()}
      <span>{getButtonText()}</span>
      {!isDisabled && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}

// Additional component for plan-specific upgrade buttons
interface PlanUpgradeButtonProps {
  plan: 'starter' | 'pro';
  billingCycle?: 'monthly' | 'yearly';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
}

export function PlanUpgradeButton({
  plan,
  billingCycle = 'yearly',
  className = '',
  size = 'md',
  variant = 'primary'
}: PlanUpgradeButtonProps) {
  const planConfig = {
    starter: {
      price: billingCycle === 'yearly' ? 497 : 59,
      name: 'Starter',
      description: 'Perfect for growing businesses'
    },
    pro: {
      price: billingCycle === 'yearly' ? 1997 : 199,
      name: 'Pro',
      description: 'For teams serious about AI transformation'
    }
  };

  const config = planConfig[plan];

  return (
    <div className="text-center">
      <UpgradeButton
        plan={plan}
        price={config.price}
        billingCycle={billingCycle}
        className={className}
        size={size}
        variant={variant}
        onUpgradeStart={() => {
          console.log(`Starting ${plan} upgrade process`);
        }}
        onUpgradeSuccess={(plan) => {
          console.log(`Successfully upgraded to ${plan}`);
        }}
        onUpgradeError={(error) => {
          console.error(`Upgrade error: ${error}`);
        }}
      />
      <p className="text-sm text-gray-400 mt-2">{config.description}</p>
    </div>
  );
}
