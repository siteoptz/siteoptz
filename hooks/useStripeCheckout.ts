import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface CheckoutOptions {
  plan: string;
  billingCycle: 'monthly' | 'yearly';
  successUrl?: string;
  cancelUrl?: string;
}

export const useStripeCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToCheckout = async (options: CheckoutOptions) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Starting checkout with options:', options);
      
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      const data = await response.json();
      console.log('Checkout session response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create checkout session');
      }

      // Check if Stripe is loaded
      if (!stripePromise) {
        throw new Error('Stripe publishable key not configured. Please check your environment variables.');
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load. Please check your internet connection.');
      }
      
      console.log('Redirecting to Stripe checkout with sessionId:', data.sessionId);
      console.log('Stripe instance:', stripe);

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        console.error('Stripe redirect error:', stripeError);
        throw new Error(stripeError.message);
      }

      // If we reach this point, the redirect should have happened
      console.log('Stripe redirect completed without error');
      
      // Note: We don't setLoading(false) here because the page will navigate away
      // The loading state will be reset when the component unmounts

    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'An error occurred during checkout');
      // Only set loading to false in error cases where we stay on the same page
      setLoading(false);
    }
  };

  return {
    redirectToCheckout,
    loading,
    error,
    clearError: () => setError(null),
  };
};