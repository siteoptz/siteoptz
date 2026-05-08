-- Production replacement for in-memory pending-plan-store.ts
-- Run on your Postgres (Supabase, Neon, etc.)

CREATE TABLE IF NOT EXISTS postdoserx_pending_oauth_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_normalized TEXT NOT NULL,
  plan TEXT NOT NULL,
  billing_cycle TEXT,
  stripe_checkout_session_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  consumed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_pending_email
  ON postdoserx_pending_oauth_plans (email_normalized)
  WHERE consumed_at IS NULL;

-- On webhook: INSERT ... ON CONFLICT (stripe_checkout_session_id) DO UPDATE ...
-- On OAuth signIn: SELECT * WHERE email_normalized = $1 AND consumed_at IS NULL;
-- then UPDATE SET consumed_at = NOW()
