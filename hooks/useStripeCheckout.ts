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
        console.error('API Error:', data);
        throw new Error(data.error || data.message || 'Failed to create checkout session');
      }

      if (!data.sessionId) {
        console.error('No session ID in response:', data);
        throw new Error('No checkout session ID received from server');
      }

      // Check if Stripe is loaded
      if (!stripePromise) {
        console.error('Stripe not initialized. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        throw new Error('Stripe is not configured. Please check your payment settings.');
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load. Please check your internet connection.');
      }
      
      console.log('Redirecting to Stripe checkout with sessionId:', data.sessionId);

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        console.error('Stripe redirect error:', stripeError);
        setLoading(false);
        throw new Error(stripeError.message || 'Failed to redirect to checkout');
      }

      // If we reach this point, the redirect should have happened
      console.log('Stripe redirect initiated successfully');
      
      // Note: We don't setLoading(false) here because the page will navigate away
      // The loading state will be reset when the component unmounts

    } catch (err: any) {
      console.error('Checkout error details:', err);
      setError(err.message || 'An error occurred during checkout');
      // Only set loading to false in error cases where we stay on the same page
      setLoading(false);
      throw err; // Re-throw to let the modal handle it
    }
  };

  return {
    redirectToCheckout,
    loading,
    error,
    clearError: () => setError(null),
  };
};