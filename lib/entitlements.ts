/**
 * User tier entitlement helpers.
 *
 * Tier hierarchy (ascending): free < starter < pro < enterprise
 * Higher tiers include all lower-tier entitlements.
 *
 * User tier comes from NextAuth session.user.plan, which is
 * populated by extractPlanFromTags() in [...nextauth].ts from
 * the GHL contact's 'siteoptz-plan-<tier>' tag.
 */

export const TIER_HIERARCHY = ['free', 'starter', 'pro', 'enterprise'] as const;
export type Tier = typeof TIER_HIERARCHY[number];

export function hasAccessToTier(userTier: string | undefined, requiredTier: Tier): boolean {
  if (!userTier) return false;
  const userLevel = TIER_HIERARCHY.indexOf(userTier as Tier);
  const requiredLevel = TIER_HIERARCHY.indexOf(requiredTier);
  if (userLevel === -1 || requiredLevel === -1) return false;
  return userLevel >= requiredLevel;
}
