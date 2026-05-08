/**
 * DEV-ONLY pending plan store. Replace with Postgres/Redis in production.
 *
 * Key: normalized email
 * Value: { plan, stripeSessionId, createdAt }
 */

type PendingEntry = {
  plan: string;
  billingCycle?: string;
  stripeSessionId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: number;
};

const store = new Map<string, PendingEntry>();
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function setPendingPlanFromCheckout(
  email: string,
  data: Omit<PendingEntry, 'createdAt'>
) {
  const key = normalizeEmail(email);
  store.set(key, { ...data, createdAt: Date.now() });
}

export function consumePendingPlan(email: string): PendingEntry | null {
  const key = normalizeEmail(email);
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() - entry.createdAt > TTL_MS) {
    store.delete(key);
    return null;
  }
  store.delete(key);
  return entry;
}

export function peekPendingPlan(email: string): PendingEntry | null {
  const key = normalizeEmail(email);
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() - entry.createdAt > TTL_MS) {
    store.delete(key);
    return null;
  }
  return entry;
}
