import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export interface TrialFlowOptions {
  trialType: 'free' | 'starter' | 'pro' | '7-day';
  source?: 'website' | 'google-oauth' | 'direct';
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useTrialFlow() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processTrialSignup = useCallback(async (options: TrialFlowOptions) => {
    if (!session?.user?.email) {
      setError('User must be signed in to process trial signup');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ghl/trial-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trialType: options.trialType,
          source: options.source || 'website',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Trial signup failed');
      }

      const result = await response.json();

      // Track successful trial signup
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'trial_signup_complete', {
          event_category: 'registration',
          event_label: options.trialType,
          ghl_contact_id: result.data.contactId,
          pipeline_added: result.data.pipelineAdded,
          workflow_triggered: result.data.workflowTriggered,
          value: 1
        });
      }

      console.log('✅ Trial signup processed:', result);
      
      if (options.onSuccess) {
        options.onSuccess(result.data);
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      
      console.error('❌ Trial signup error:', errorMessage);

      // Track error
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'trial_signup_error', {
          event_category: 'registration',
          event_label: options.trialType,
          error: errorMessage
        });
      }

      if (options.onError) {
        options.onError(errorMessage);
      }

      return false;
    } finally {
      setLoading(false);
    }
  }, [session]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    processTrialSignup,
    loading,
    error,
    clearError,
    isSignedIn: !!session?.user
  };
}