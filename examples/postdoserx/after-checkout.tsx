/**
 * pages/auth/after-checkout.tsx
 *
 * User lands here after Stripe success_url with ?session_id=...
 * Optionally verify session server-side, then send them to Google sign-in.
 */

import { GetServerSideProps } from 'next';
import Stripe from 'stripe';
import { setPendingPlanFromCheckout } from './pending-plan-store';

type Props = {
  sessionId: string | null;
  error: string | null;
};

export default function AfterCheckout({ sessionId, error }: Props) {
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Payment received</h1>
      <p className="text-gray-600 text-center max-w-md">
        Continue with Google to finish setting up your account. Use the{' '}
        <strong>same email</strong> you used at checkout so we can link your plan.
      </p>
      <a
        href={`/api/auth/signin/google?callbackUrl=${encodeURIComponent('/dashboard')}`}
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold"
      >
        Sign in with Google
      </a>
      {sessionId && (
        <p className="text-xs text-gray-400">Reference: {sessionId}</p>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const sessionId =
    typeof ctx.query.session_id === 'string' ? ctx.query.session_id : null;

  if (!sessionId) {
    return {
      props: { sessionId: null, error: 'Missing checkout session.' },
    };
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return {
      props: { sessionId, error: null },
    };
  }

  try {
    const stripe = new Stripe(secret, { apiVersion: '2025-08-27.basil' });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return {
        props: {
          sessionId,
          error: 'Payment not completed. Please try again or contact support.',
        },
      };
    }

    // Backup for slow/missing webhooks: same pending row the webhook would create (dev: in-memory)
    const email =
      session.customer_details?.email || session.customer_email || null;
    const plan = session.metadata?.plan;
    if (email && plan) {
      setPendingPlanFromCheckout(email, {
        plan,
        billingCycle: session.metadata?.billingCycle,
        stripeSessionId: session.id,
        stripeCustomerId:
          typeof session.customer === 'string'
            ? session.customer
            : session.customer?.id,
        stripeSubscriptionId:
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id,
      });
    }
  } catch {
    return {
      props: {
        sessionId,
        error: 'Could not verify payment. You can still try signing in.',
      },
    };
  }

  return {
    props: { sessionId, error: null },
  };
};
