/**
 * Merge these patterns into postdoserx pages/api/auth/[...nextauth].ts
 *
 * Dependencies: consumePendingPlan from ./pending-plan-store (or DB equivalent),
 * createPostdoserxGHLContact / searchGHLContact from ./ghl-helpers-snippet.ts
 */

const PLAN_TAG_PREFIX = 'postdoserx-plan-';

function extractPostdoserxPlanFromTags(tags: string[]): string {
  if (!tags?.length) return 'free';
  const tag = tags.find((t) => t.startsWith(PLAN_TAG_PREFIX));
  if (tag) return tag.replace(PLAN_TAG_PREFIX, '');
  return 'free';
}

/**
 * Example signIn callback — replace your createGHLContact tags with postdoserx prefix.
 *
 * async signIn({ user, account }) {
 *   if (account?.provider !== 'google' || !user.email) return true;
 *
 *   const pending = consumePendingPlan(user.email);
 *   const planFromStripe = pending?.plan ?? null;
 *
 *   const existing = await searchGHLContact(user.email);
 *
 *   if (!existing) {
 *     const plan = planFromStripe || 'free';
 *     await createPostdoserxGHLContact(user.email, user.name || 'User', plan, {
 *       stripeSessionId: pending?.stripeSessionId,
 *       stripeCustomerId: pending?.stripeCustomerId,
 *       stripeSubscriptionId: pending?.stripeSubscriptionId,
 *     });
 *   } else if (planFromStripe) {
 *     await updateGHLContactPlanTags(existing.id, planFromStripe);
 *   }
 *
 *   return true;
 * }
 */

/**
 * Example jwt callback — read plan from GHL after contact exists, or from pending if you
 * prefer to set token.plan before GHL sync:
 *
 * async jwt({ token, user, account }) {
 *   if (account && user?.email) {
 *     const pending = peekPendingPlan(user.email); // or consume in signIn only
 *     const ghl = await searchGHLContact(user.email);
 *     if (ghl) {
 *       token.plan = extractPostdoserxPlanFromTags(ghl.tags || []);
 *     } else if (pending) {
 *       token.plan = pending.plan;
 *     } else {
 *       token.plan = 'free';
 *     }
 *   }
 *   return token;
 * }
 */

export { extractPostdoserxPlanFromTags, PLAN_TAG_PREFIX };
