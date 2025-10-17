/**
 * Authentication utilities for SiteOptz.ai
 * Handles login/register with GoHighLevel integration
 */

// Authentication class for managing user authentication
class SiteOptzAuth {
  constructor() {
    this.user = this.loadUser();
    this.initHashRouting();
  }

  /**
   * Initialize hash-based routing for login/register
   */
  initHashRouting() {
    if (typeof window !== 'undefined') {
      // Listen for hash changes
      window.addEventListener('hashchange', () => this.handleHashRoute());
      
      // Check initial hash
      window.addEventListener('load', () => this.handleHashRoute());
      
      // Handle initial route
      this.handleHashRoute();
    }
  }

  /**
   * Handle hash-based routing
   */
  handleHashRoute() {
    if (typeof window === 'undefined') return;
    
    const hash = window.location.hash.toLowerCase();
    
    if (hash === '#login' || hash === '#/login') {
      this.showLoginModal();
    } else if (hash === '#register' || hash === '#/register') {
      this.showRegisterModal();
    } else if (hash === '#logout' || hash === '#/logout') {
      this.logout();
    }
  }

  /**
   * Show login modal
   */
  showLoginModal() {
    // Dispatch event for React components to handle
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('siteoptz:show-login'));
    }
  }

  /**
   * Show register modal
   */
  showRegisterModal() {
    // Dispatch event for React components to handle
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('siteoptz:show-register'));
    }
  }

  /**
   * Handle login
   */
  async login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      // Log response for debugging
      console.log('Login API response status:', response.status);
      
      const data = await response.json();
      console.log('Login API response data:', data);

      if (data.success) {
        // Save user data
        this.saveUser(data.user);
        
        // Log successful login for debugging
        console.log('Login successful:', {
          email: data.user.email,
          plan: data.user.plan,
          redirectUrl: data.redirectUrl
        });
        
        // Dispatch success event
        this.dispatchAuthEvent('login', data.user);
        
        // Ensure we have a valid redirect URL with the plan
        const redirectUrl = data.redirectUrl || `https://optz.siteoptz.ai/dashboard/${data.user.plan || 'free'}`;
        
        // Redirect to dashboard after short delay
        setTimeout(() => {
          console.log('Redirecting to:', redirectUrl);
          window.location.href = redirectUrl;
        }, 1500);
        
        return {
          success: true,
          user: data.user,
          message: data.message,
          redirectUrl: redirectUrl
        };
      } else {
        // Handle specific error types
        if (data.error === 'user_not_found') {
          return {
            success: false,
            error: 'user_not_found',
            message: data.message,
            action: 'redirect_to_register'
          };
        } else if (data.error === 'invalid_password') {
          return {
            success: false,
            error: 'invalid_password',
            message: data.message
          };
        } else {
          return {
            success: false,
            error: data.error || 'login_failed',
            message: data.message || 'Login failed. Please try again.'
          };
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'network_error',
        message: 'Unable to connect. Please check your connection and try again.'
      };
    }
  }

  /**
   * Handle registration
   */
  async register(name, email, password, plan = 'free') {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, plan })
      });

      const data = await response.json();

      if (data.success) {
        // Save user data
        this.saveUser(data.user);
        
        // Dispatch success event
        this.dispatchAuthEvent('register', data.user);
        
        // Redirect to dashboard after short delay
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 1500);
        
        return {
          success: true,
          user: data.user,
          message: data.message,
          redirectUrl: data.redirectUrl
        };
      } else {
        // Handle specific error types
        if (data.error === 'user_exists') {
          return {
            success: false,
            error: 'user_exists',
            message: data.message,
            action: 'redirect_to_login'
          };
        } else {
          return {
            success: false,
            error: data.error || 'registration_failed',
            message: data.message || 'Registration failed. Please try again.'
          };
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'network_error',
        message: 'Unable to connect. Please check your connection and try again.'
      };
    }
  }

  /**
   * Logout user
   */
  logout() {
    this.user = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('siteoptz_user');
      window.location.hash = '';
      this.dispatchAuthEvent('logout');
    }
  }

  /**
   * Save user to localStorage
   */
  saveUser(userData) {
    this.user = userData;
    if (typeof window !== 'undefined') {
      localStorage.setItem('siteoptz_user', JSON.stringify(userData));
    }
  }

  /**
   * Load user from localStorage
   */
  loadUser() {
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem('siteoptz_user');
        return userData ? JSON.parse(userData) : null;
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.user;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!(this.user && this.user.authenticated);
  }

  /**
   * Check if user has access to specific plan
   */
  hasAccessToPlan(requiredPlan) {
    if (!this.user) return false;
    
    const planHierarchy = {
      'free': 1,
      'starter': 2,
      'pro': 3,
      'enterprise': 4
    };
    
    const userLevel = planHierarchy[this.user.plan] || 0;
    const requiredLevel = planHierarchy[requiredPlan] || 0;
    
    return userLevel >= requiredLevel;
  }

  /**
   * Dispatch authentication events
   */
  dispatchAuthEvent(type, data = null) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(`siteoptz:${type}`, { detail: data }));
    }
  }
}

// Create singleton instance
let authInstance = null;

export const getAuth = () => {
  if (typeof window !== 'undefined' && !authInstance) {
    authInstance = new SiteOptzAuth();
  }
  return authInstance;
};

// Export convenience functions
export const login = (email, password) => {
  const auth = getAuth();
  return auth ? auth.login(email, password) : Promise.reject(new Error('Auth not initialized'));
};

export const register = (name, email, password, plan) => {
  const auth = getAuth();
  return auth ? auth.register(name, email, password, plan) : Promise.reject(new Error('Auth not initialized'));
};

export const logout = () => {
  const auth = getAuth();
  return auth ? auth.logout() : null;
};

export const getCurrentUser = () => {
  const auth = getAuth();
  return auth ? auth.getCurrentUser() : null;
};

export const isAuthenticated = () => {
  const auth = getAuth();
  return auth ? auth.isAuthenticated() : false;
};

export default {
  getAuth,
  login,
  register,
  logout,
  getCurrentUser,
  isAuthenticated
};