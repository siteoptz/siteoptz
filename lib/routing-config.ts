/**
 * Post-authentication landing URLs.
 *
 * The compliance dashboard is the product landing page. Legacy
 * Optz.ai tiered dashboards (/dashboard/free, /dashboard/starter,
 * /dashboard/pro) exist in the codebase but are not the current
 * product direction.
 *
 * All Google OAuth callbackUrl values and dashboard fallback
 * redirects should read from these constants so future changes
 * happen in one place.
 */

export const DEFAULT_AUTHED_LANDING = '/dashboard/compliance';
export const SIGNUP_LANDING = '/dashboard/compliance?signup=true';
