// Cyfe SSO Middleware for Auto-Login
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';

interface SSOTokenPayload {
  email: string;
  plan: string;
  username: string;
  companyName: string;
  dashboards: any[];
  expiresIn?: string;
}

interface AutoLoginUrlParams {
  token: string;
  plan: string;
  redirectTo?: string;
  autoLogin?: boolean;
}

export class CyfeSSOMiddleware {
  private static SECRET = process.env.CYFE_SSO_SECRET || process.env.NEXTAUTH_SECRET || 'default-sso-secret';
  private static DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://siteoptz.ai';

  /**
   * Generate a secure SSO token for Cyfe auto-login
   */
  static generateToken(payload: SSOTokenPayload): string {
    const { expiresIn = '24h', ...data } = payload;
    
    // Add timestamp and nonce for security
    const tokenData = {
      ...data,
      iat: Date.now(),
      nonce: crypto.randomBytes(16).toString('hex')
    };
    
    // Sign the token with JWT
    const token = jwt.sign(tokenData, this.SECRET, {
      expiresIn: expiresIn as string | number,
      algorithm: 'HS256'
    } as jwt.SignOptions);
    
    return token;
  }

  /**
   * Verify and decode SSO token
   */
  static verifyToken(token: string): SSOTokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.SECRET, {
        algorithms: ['HS256']
      }) as any;
      
      return {
        email: decoded.email,
        plan: decoded.plan,
        username: decoded.username,
        companyName: decoded.companyName,
        dashboards: decoded.dashboards || []
      };
    } catch (error) {
      console.error('SSO token verification failed:', error);
      return null;
    }
  }

  /**
   * Generate auto-login URL for Cyfe dashboards
   */
  static generateAutoLoginUrl(params: AutoLoginUrlParams): string {
    const { token, plan, redirectTo = `/dashboard/${plan}`, autoLogin = true } = params;
    
    // Create signature for additional security
    const signature = this.createUrlSignature(token);
    
    // Build the auto-login URL
    const url = new URL(`${this.DOMAIN}/sso/auto-login`);
    url.searchParams.set('sso_token', token);
    url.searchParams.set('signature', signature);
    url.searchParams.set('redirect', redirectTo);
    url.searchParams.set('auto_login', autoLogin.toString());
    url.searchParams.set('plan', plan);
    
    return url.toString();
  }

  /**
   * Generate a direct Cyfe dashboard login URL (no prompts)
   */
  static generateCyfeLoginUrl(userData: {
    email: string;
    plan: string;
    dashboardId?: string;
  }): string {
    // Generate short-lived token for immediate use
    const token = this.generateToken({
      ...userData,
      username: userData.email.split('@')[0],
      companyName: 'Company',
      dashboards: [],
      expiresIn: '5m' // Very short expiry for security
    });
    
    const signature = this.createUrlSignature(token);
    
    // Build URL that bypasses all login prompts
    const url = new URL(`${this.DOMAIN}/sso/login`);
    url.searchParams.set('sso_token', token);
    url.searchParams.set('signature', signature);
    url.searchParams.set('auto_login', 'true');
    
    if (userData.dashboardId) {
      url.searchParams.set('dashboard', userData.dashboardId);
    }
    
    return url.toString();
  }

  /**
   * Create URL signature for additional security
   */
  private static createUrlSignature(token: string): string {
    const hmac = crypto.createHmac('sha256', this.SECRET);
    hmac.update(token);
    return hmac.digest('hex').substring(0, 16); // Use first 16 chars for brevity
  }

  /**
   * Verify URL signature
   */
  static verifyUrlSignature(token: string, signature: string): boolean {
    const expectedSignature = this.createUrlSignature(token);
    return signature === expectedSignature;
  }

  /**
   * Middleware for Express/Next.js to handle SSO auto-login
   */
  static async handleAutoLogin(req: any, res: any): Promise<void> {
    const { sso_token, signature, redirect, auto_login, plan, dashboard } = req.query;
    
    // Verify signature
    if (!this.verifyUrlSignature(sso_token, signature)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // Verify token
    const tokenData = this.verifyToken(sso_token);
    if (!tokenData) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    // Set authentication cookies
    res.setHeader('Set-Cookie', [
      `optz-sso-email=${tokenData.email}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24}`,
      `optz-sso-plan=${tokenData.plan}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24}`,
      `optz-sso-username=${tokenData.username}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24}`,
      `optz-authenticated=true; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24}`
    ]);
    
    // Determine redirect URL
    let redirectUrl = redirect || `/dashboard/${plan}`;
    
    // If specific dashboard requested, redirect there
    if (dashboard) {
      redirectUrl = `/dashboard/${plan}/${dashboard}`;
    }
    
    // If auto_login is true, redirect immediately
    if (auto_login === 'true') {
      return res.redirect(redirectUrl);
    }
    
    // Otherwise, show a confirmation page
    res.status(200).json({
      success: true,
      message: 'Login successful',
      redirectUrl
    });
  }

  /**
   * Generate embedded dashboard URL with authentication
   */
  static generateEmbedUrl(params: {
    dashboardId: string;
    token: string;
    height?: string;
    width?: string;
  }): string {
    const { dashboardId, token, height = '600px', width = '100%' } = params;
    
    const url = new URL(`${this.DOMAIN}/embed/dashboard`);
    url.searchParams.set('id', dashboardId);
    url.searchParams.set('token', token);
    url.searchParams.set('height', height);
    url.searchParams.set('width', width);
    
    return url.toString();
  }
}

// Export for use in API routes
export default CyfeSSOMiddleware;