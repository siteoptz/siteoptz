# postdoserx.com — Stripe → Google OAuth → GoHighLevel

**→ Shareable one-file spec for Claude:** [`CLAUDE_IMPLEMENTATION_BRIEF_POSTDOSERX.md`](./CLAUDE_IMPLEMENTATION_BRIEF_POSTDOSERX.md)

This adapts the SiteOptz-style flow with one critical change: **the customer pays in Stripe before they sign in with Google**. The **plan must come from Stripe** (webhook or server-side session retrieval), not from query parameters, so users cannot fake a tier.

## Recommended flow

1. **Pricing page** — User picks plan + billing cycle.
2. **Create Checkout Session** (no NextAuth session required) — Server sets `metadata.plan` and `metadata.billing_cycle`.  
   `success_url`: `https://postdoserx.com/auth/after-checkout?session_id={CHECKOUT_SESSION_ID}`
3. **User completes Stripe Checkout** — Stripe collects email (and payment).
4. **Webhook `checkout.session.completed`** (recommended) — Persist `{ email, plan, stripe_customer_id, subscription_id }` with a short TTL (e.g. 7 days) until OAuth links the account. This is the **source of truth**.
5. **After-checkout page** — Server verifies `session_id` with Stripe (optional double-check), then redirects to **Sign in with Google** (`/api/auth/signin/google?callbackUrl=/dashboard`).
6. **NextAuth `signIn` / `jwt` callback** — Look up pending plan by `user.email` (normalized). Create or update GHL contact with tag `postdoserx-plan-{plan}`. Clear pending row.

## Why webhook + email lookup?

NextAuth `signIn` / `jwt` callbacks **do not receive the raw Request**, so a fragile pattern is “pass plan in URL.” The webhook stores the plan keyed by **checkout email**; Google OAuth returns the same email when it’s the same person.

Edge case: Stripe email ≠ Google email → plan won’t match; handle support manually or ask them to use the same email.

## Environment variables (postdoserx)

```bash
# App
NEXTAUTH_URL=https://postdoserx.com
NEXTAUTH_SECRET=...

# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER_MONTHLY=price_...
# ... other price IDs

# GoHighLevel
GHL_API_KEY=...
GHL_LOCATION_ID=...

# Optional: separate signing secret if you use signed cookies
# CHECKOUT_SIGNING_SECRET=...
```

## Google Cloud Console

- **Authorized redirect URI**: `https://postdoserx.com/api/auth/callback/google`
- **Authorized JavaScript origin**: `https://postdoserx.com`

## GHL tags

Use a **distinct prefix** from SiteOptz to avoid collisions if you ever share a location:

- `postdoserx-plan-starter`
- `postdoserx-plan-pro`
- `postdoserx-oauth-signup`
- `postdoserx-stripe-subscriber`

## Files in this folder

| File | Purpose |
|------|---------|
| `create-checkout-session.ts` | Pre-auth checkout; metadata + success URL |
| `stripe-webhook.ts` | Record paid plan by email |
| `pending-plan-store.ts` | In-memory dev store; **replace with DB in production** |
| `nextauth-snippet.ts` | GHL + pending plan logic to merge into `[...nextauth].ts` |
| `after-checkout.tsx` | Page: verify session (optional) → redirect to Google sign-in |

**Production:** Replace `pending-plan-store.ts` with Postgres/Redis (table `pending_oauth_plans`: `email`, `plan`, `stripe_session_id`, `created_at`, `consumed_at`).

## Security checklist

- [ ] Never trust `?plan=` from the client after payment.
- [ ] Verify webhook with `STRIPE_WEBHOOK_SECRET`.
- [ ] Use HTTPS only in production.
- [ ] TTL on pending rows; delete after OAuth consumes or after 7 days.

## Webhook vs page load (race)

The webhook may arrive **after** the user hits `/auth/after-checkout`. For a reliable production setup:

- Keep the **webhook** as the primary writer to your DB, and/or
- In `getServerSideProps` for `after-checkout`, after `stripe.checkout.sessions.retrieve(session_id)`, if `payment_status === 'paid'`, **also** upsert the pending row by `customer_details.email` and `metadata.plan` (idempotent with `stripe_checkout_session_id`). That way local dev works even before webhooks are wired.

## Local development

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Use the printed `whsec_...` as `STRIPE_WEBHOOK_SECRET` in `.env.local`.
