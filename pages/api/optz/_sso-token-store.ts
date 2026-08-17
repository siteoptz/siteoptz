export interface SSOTokenData {
  email: string;
  plan: string;
  username: string;
  expiresAt: Date;
}

// In production, store tokens in database with expiration
const ssoTokens: Map<string, SSOTokenData> = new Map();

/**
 * Validate SSO token (exported for use by SSO auth endpoint)
 */
export const validateSSOToken = (token: string): SSOTokenData | null => {
  const tokenData = ssoTokens.get(token);

  if (!tokenData) {
    return null;
  }

  if (new Date() > tokenData.expiresAt) {
    ssoTokens.delete(token);
    return null;
  }

  // Token is valid - remove it (single use)
  ssoTokens.delete(token);
  return tokenData;
};
