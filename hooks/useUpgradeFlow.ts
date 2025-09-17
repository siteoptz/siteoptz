import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useStripeCheckout } from './useStripeCheckout';

interface UpgradeFlowState {
  isLoggedIn: boolean;
  isLoading: boolean;
  currentPlan: string | null;
  intendedUpgrade: {
    plan: string;
    price: number;
    billingCycle: string;
    timestamp: number;
  } | null;
}

interface UpgradeFlowActions {
  initiateUpgrade: (plan: 'starter' | 'pro', billingCycle?: 'monthly' | 'yearly') => Promise<void>;
  completeUpgrade: (plan: string) => void;
  clearIntendedUpgrade: () => void;
  checkIntendedUpgrade: () => void;
}

export function useUpgradeFlow(): UpgradeFlowState & UpgradeFlowActions {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { redirectToCheckout, loading, error } = useStripeCheckout();
  
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [intendedUpgrade, setIntendedUpgrade] = useState<{
    plan: string;
    price: number;
    billingCycle: string;
    timestamp: number;
  } | null>(null);

  const isLoggedIn = !!session?.user;
  const isLoading = status === 'loading' || loading;

  // Check for intended upgrade in localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('intendedUpgrade');
      if (stored) {
        try {
          const upgradeData = JSON.parse(stored);
          // Check if the upgrade is still valid (within 1 hour)
          const oneHour = 60 * 60 * 1000;
          if (Date.now() - upgradeData.timestamp < oneHour) {
            setIntendedUpgrade(upgradeData);
          } else {
            // Remove expired intended upgrade
            localStorage.removeItem('intendedUpgrade');
          }
        } catch (error) {
          console.error('Error parsing intended upgrade:', error);
          localStorage.removeItem('intendedUpgrade');
        }
      }
    }
  }, []);

  // Check for intended upgrade when user logs in
  useEffect(() => {
    if (isLoggedIn && intendedUpgrade) {
      // User has logged in and there's a pending upgrade
      console.log('User logged in with intended upgrade:', intendedUpgrade);
      
      // Track the login with intended upgrade
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'login_with_intended_upgrade', {
          event_category: 'upgrade',
          event_label: intendedUpgrade.plan,
          value: intendedUpgrade.price
        });
      }
    }
  }, [isLoggedIn, intendedUpgrade]);

  // Determine current plan based on user session
  useEffect(() => {
    if (session?.user) {
      // In a real app, you'd fetch this from your backend
      // For now, we'll assume all logged-in users are on the free plan
      setCurrentPlan('free');
    } else {
      setCurrentPlan(null);
    }
  }, [session]);

  const initiateUpgrade = useCallback(async (plan: 'starter' | 'pro', billingCycle: 'monthly' | 'yearly' = 'yearly') => {
    console.log('initiateUpgrade called', { plan, billingCycle, isLoggedIn });
    
    try {
      // Track upgrade initiation
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'upgrade_initiated', {
          event_category: 'upgrade',
          event_label: plan,
          value: plan === 'starter' ? (billingCycle === 'yearly' ? 497 : 59) : (billingCycle === 'yearly' ? 1997 : 199),
          user_logged_in: isLoggedIn
        });
      }

      if (!isLoggedIn) {
        console.log('User not logged in, redirecting to login');
        // Store intended upgrade and redirect to login
        const upgradeData = {
          plan,
          price: plan === 'starter' ? (billingCycle === 'yearly' ? 497 : 59) : (billingCycle === 'yearly' ? 1997 : 199),
          billingCycle,
          timestamp: Date.now()
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('intendedUpgrade', JSON.stringify(upgradeData));
        }

        setIntendedUpgrade(upgradeData);

        // Redirect to homepage with login modal
        console.log('Redirecting to /#login');
        if (typeof window !== 'undefined') {
          window.location.href = '/#login';
        } else {
          router.push('/#login');
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

    } catch (error) {
      console.error('Upgrade initiation error:', error);
      throw error;
    }
  }, [isLoggedIn, router, redirectToCheckout]);

  const completeUpgrade = useCallback((plan: string) => {
    // Clear intended upgrade
    if (typeof window !== 'undefined') {
      localStorage.removeItem('intendedUpgrade');
    }
    setIntendedUpgrade(null);
    setCurrentPlan(plan);

    // Track successful upgrade
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'upgrade_completed', {
        event_category: 'upgrade',
        event_label: plan,
        value: plan === 'starter' ? 497 : 1997
      });
    }

    console.log(`Upgrade completed to ${plan} plan`);
  }, []);

  const clearIntendedUpgrade = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('intendedUpgrade');
    }
    setIntendedUpgrade(null);
  }, []);

  const checkIntendedUpgrade = useCallback(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('intendedUpgrade');
      if (stored) {
        try {
          const upgradeData = JSON.parse(stored);
          setIntendedUpgrade(upgradeData);
        } catch (error) {
          console.error('Error parsing intended upgrade:', error);
          localStorage.removeItem('intendedUpgrade');
        }
      }
    }
  }, []);

  return {
    // State
    isLoggedIn,
    isLoading,
    currentPlan,
    intendedUpgrade,
    
    // Actions
    initiateUpgrade,
    completeUpgrade,
    clearIntendedUpgrade,
    checkIntendedUpgrade
  };
}

// Hook for managing upgrade button text and behavior
export function useUpgradeButton(plan: 'starter' | 'pro') {
  const { isLoggedIn, isLoading, currentPlan, initiateUpgrade } = useUpgradeFlow();

  const getButtonText = useCallback(() => {
    if (isLoading) {
      return 'Loading...';
    }
    
    if (!isLoggedIn) {
      return 'Select';
    }
    
    if (currentPlan === 'free') {
      return 'Upgrade';
    }
    
    // If user is already on a paid plan, show different text
    if (currentPlan === 'starter' && plan === 'pro') {
      return 'Upgrade to Pro';
    }
    
    return 'Upgrade';
  }, [isLoggedIn, isLoading, currentPlan, plan]);

  const getButtonIcon = useCallback(() => {
    if (isLoading) {
      return 'loading';
    }
    
    if (!isLoggedIn) {
      return 'user';
    }
    
    return 'crown';
  }, [isLoggedIn, isLoading]);

  const handleUpgrade = useCallback(async () => {
    try {
      await initiateUpgrade(plan);
    } catch (error) {
      console.error('Upgrade button error:', error);
      throw error;
    }
  }, [initiateUpgrade, plan]);

  return {
    buttonText: getButtonText(),
    buttonIcon: getButtonIcon(),
    isLoggedIn,
    isLoading,
    currentPlan,
    handleUpgrade
  };
}
