import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function TestStripe() {
  const [stripeKey, setStripeKey] = useState<string | undefined>();
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if the key is available
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    setStripeKey(key);
    
    // Try to load Stripe
    if (key) {
      loadStripe(key)
        .then((stripe) => {
          setStripeLoaded(!!stripe);
          if (!stripe) {
            setError('Stripe failed to load even with key present');
          }
        })
        .catch((err) => {
          setError(`Error loading Stripe: ${err.message}`);
        });
    }
  }, []);

  const testCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: 'starter',
          billingCycle: 'monthly',
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);
      
      if (!response.ok) {
        setError(`API Error: ${data.message || 'Unknown error'}`);
      } else {
        setError(null);
        alert(`Success! Session ID: ${data.sessionId}`);
      }
    } catch (err: any) {
      setError(`Fetch Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Stripe Configuration Test</h1>
      
      <div className="space-y-4 max-w-2xl">
        <div className="p-4 bg-gray-900 rounded-lg">
          <h2 className="font-semibold mb-2">Environment Variables:</h2>
          <p>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: {stripeKey ? `${stripeKey.substring(0, 20)}...` : 'NOT SET'}</p>
          <p className="text-xs text-gray-400 mt-2">
            Note: This should start with pk_test_ for test mode or pk_live_ for live mode
          </p>
        </div>

        <div className="p-4 bg-gray-900 rounded-lg">
          <h2 className="font-semibold mb-2">Stripe Library Status:</h2>
          <p>Loaded: {stripeLoaded ? '✅ Yes' : '❌ No'}</p>
        </div>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <h2 className="font-semibold mb-2">Error:</h2>
            <p>{error}</p>
          </div>
        )}

        <div className="p-4 bg-gray-900 rounded-lg">
          <h2 className="font-semibold mb-4">Test Checkout API:</h2>
          <button
            onClick={testCheckout}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Test Create Checkout Session
          </button>
        </div>

        <div className="p-4 bg-gray-900 rounded-lg">
          <h2 className="font-semibold mb-2">Troubleshooting:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Make sure your .env.local file has NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY set</li>
            <li>The key should start with pk_test_ for test mode</li>
            <li>After updating .env.local, restart the dev server</li>
            <li>Check browser console for any errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
}