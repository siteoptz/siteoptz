import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useTrialFlow } from '@/hooks/useTrialFlow';
import { ArrowRight, Zap, Clock, Users, Shield } from 'lucide-react';

interface TrialButtonProps {
  variant?: 'start-free-trial' | 'start-7-day-trial';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  plan?: 'free' | 'starter' | 'pro';
  redirectAfterSignIn?: string;
  disabled?: boolean;
  loading?: boolean;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export default function TrialButton({
  variant = 'start-free-trial',
  size = 'lg',
  className = '',
  plan = 'free',
  redirectAfterSignIn = '/dashboard',
  disabled = false,
  loading = false,
  showIcon = true,
  children
}: TrialButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { processTrialSignup, loading: trialLoading, error: trialError } = useTrialFlow();

  const isLoading = loading || trialLoading || status === 'loading';

  const buttonText = children || (variant === 'start-7-day-trial' ? 'Start 7-Day Free Trial' : 'Start Free Trial');

  // Process trial signup after successful OAuth
  useEffect(() => {
    const handleTrialProcessing = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const isOAuthReturn = urlParams.get('oauth') === 'success';
      const urlPlan = urlParams.get('plan');
      
      if (session?.user && isOAuthReturn && urlPlan) {
        console.log('Processing trial signup after OAuth return');
        
        await processTrialSignup({
          trialType: variant === 'start-7-day-trial' ? '7-day' : (urlPlan as any),
          source: 'google-oauth',
          onSuccess: (data) => {
            console.log('Trial processing completed:', data);
            // Redirect to appropriate page
            if (urlPlan === 'free') {
              router.push(redirectAfterSignIn);
            } else {
              router.push('/dashboard?trial=active');
            }
          },
          onError: (error) => {
            console.error('Trial processing failed:', error);
            // Still redirect to dashboard but show error
            router.push('/dashboard?trial=error');
          }
        });
      }
    };

    if (session && typeof window !== 'undefined') {
      handleTrialProcessing();
    }
  }, [session, variant, processTrialSignup, redirectAfterSignIn, router]);

  // Handle button click
  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    
    if (disabled || isLoading) return;

    // Track button click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'trial_button_click', {
        event_category: 'registration',
        event_label: variant,
        plan: plan,
        value: 1
      });
    }

    // If user is already signed in, process trial immediately
    if (session?.user) {
      if (plan === 'free') {
        // For free plan, process trial and redirect
        await processTrialSignup({
          trialType: 'free',
          source: 'website',
          onSuccess: () => router.push(redirectAfterSignIn),
          onError: (error) => console.error('Trial signup error:', error)
        });
      } else {
        // For paid plans, redirect to upgrade page
        router.push(`/upgrade?plan=${plan}&trial=true`);
      }
      return;
    }

    // Initiate Google OAuth flow for new users
    try {
      const trialType = variant === 'start-7-day-trial' ? '7-day' : plan;
      const callbackUrl = `${window.location.origin}${redirectAfterSignIn}?plan=${plan}&trial=true&oauth=success`;

      await signIn('google', {
        callbackUrl: callbackUrl,
        redirect: true,
      });

      // Track OAuth initiation
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'oauth_initiated', {
          event_category: 'registration',
          event_label: 'google',
          plan: plan,
          trial_variant: variant
        });
      }
    } catch (error) {
      console.error('OAuth sign-in error:', error);
      
      // Track error
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'oauth_error', {
          event_category: 'registration',
          event_label: 'google',
          error: error instanceof Error ? error.message : 'unknown'
        });
      }
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  // Icon size based on button size
  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    font-semibold rounded-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    transform hover:scale-105 active:scale-95
    shadow-lg hover:shadow-xl
  `;

  // Gradient classes based on variant and plan
  const variantClasses = variant === 'start-7-day-trial' 
    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 focus:ring-purple-500'
    : plan === 'starter'
    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 focus:ring-blue-500'
    : plan === 'pro'
    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 focus:ring-purple-500'
    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 focus:ring-green-500';

  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses[size]} ${className}`;

  // Loading state
  if (isLoading) {
    return (
      <button 
        disabled 
        className={`${buttonClasses} opacity-75 cursor-not-allowed`}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
      type="button"
      aria-label={`${buttonText} - Sign up with Google OAuth`}
    >
      <span>{buttonText}</span>
      {showIcon && (
        <ArrowRight className={`${iconSize[size]} transition-transform group-hover:translate-x-1`} />
      )}
    </button>
  );
}

// Pre-configured trial button variants
export const StartFreeTrialButton = (props: Omit<TrialButtonProps, 'variant'>) => (
  <TrialButton variant="start-free-trial" {...props} />
);

export const Start7DayTrialButton = (props: Omit<TrialButtonProps, 'variant'>) => (
  <TrialButton variant="start-7-day-trial" {...props} />
);

// Feature highlight components to use alongside trial buttons
export const TrialFeatures = ({ variant }: { variant?: 'free' | 'starter' | 'pro' }) => {
  const features = {
    free: [
      { icon: <Zap className="w-4 h-4" />, text: 'Daily AI tool insights' },
      { icon: <Users className="w-4 h-4" />, text: 'Community access' },
      { icon: <Shield className="w-4 h-4" />, text: 'No credit card required' }
    ],
    starter: [
      { icon: <Clock className="w-4 h-4" />, text: 'Save 20+ hours/week' },
      { icon: <Zap className="w-4 h-4" />, text: 'Unlimited comparisons' },
      { icon: <Users className="w-4 h-4" />, text: 'Expert consultations' }
    ],
    pro: [
      { icon: <Users className="w-4 h-4" />, text: 'Team collaboration' },
      { icon: <Shield className="w-4 h-4" />, text: 'Priority support' },
      { icon: <Zap className="w-4 h-4" />, text: 'Custom integrations' }
    ]
  };

  const selectedFeatures = features[variant || 'free'];

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {selectedFeatures.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
          <span className="text-green-400">{feature.icon}</span>
          <span>{feature.text}</span>
        </div>
      ))}
    </div>
  );
};