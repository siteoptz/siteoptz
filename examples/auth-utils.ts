// Authentication Utilities for SiteOptz.ai Login Modal
// These utilities handle validation, API calls, and GoHighLevel integration

import axios from 'axios';

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateForm = (formData: { email: string; password: string }) => {
  const errors: Record<string, string> = {};

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 8 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Analytics tracking
export const trackAuthEvent = (eventType: string, method: string, success: boolean, userId?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventType, {
      event_category: 'authentication',
      event_label: method,
      value: success ? 1 : 0,
      user_id: userId
    });
  }

  // Also track with custom analytics
  if (typeof window !== 'undefined' && window.SiteOptzTracking) {
    window.SiteOptzTracking.trackEvent('auth_event', {
      event_type: eventType,
      method: method,
      success: success,
      user_id: userId,
      timestamp: Date.now()
    });
  }
};

// GoHighLevel integration
export const addToGoHighLevelPipeline = async (user: any, authMethod: string) => {
  try {
    const response = await axios.post('/api/gohighlevel/add-subscriber', {
      email: user.email,
      firstName: user.name?.split(' ')[0] || user.firstName || '',
      lastName: user.name?.split(' ').slice(1).join(' ') || user.lastName || '',
      source: 'login',
      planType: 'free',
      isReturningUser: true,
      authMethod: authMethod,
      customFields: {
        login_date: new Date().toISOString(),
        auth_method: authMethod,
        user_agent: navigator.userAgent,
        referrer: document.referrer
      }
    });

    console.log('✅ User added to GoHighLevel pipeline:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error adding to GoHighLevel pipeline:', error);
    throw error;
  }
};

// API utilities
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/auth/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const response = await axios.post('/api/auth/google');
    return response.data;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

// Session management
export const getStoredAuthData = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('siteoptz_auth');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error getting stored auth data:', error);
    return null;
  }
};

export const storeAuthData = (authData: any) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('siteoptz_auth', JSON.stringify(authData));
  } catch (error) {
    console.error('Error storing auth data:', error);
  }
};

export const clearAuthData = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('siteoptz_auth');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

// Error handling
export const getAuthErrorMessage = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// Form utilities
export const sanitizeInput = (input: string): string => {
  return input.trim().toLowerCase();
};

export const formatUserData = (user: any) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    firstName: user.name?.split(' ')[0] || user.firstName,
    lastName: user.name?.split(' ').slice(1).join(' ') || user.lastName,
    image: user.image,
    plan: user.plan || 'free',
    createdAt: user.createdAt,
    lastLogin: new Date().toISOString()
  };
};

// Security utilities
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken;
};

// Rate limiting
export const checkRateLimit = (key: string, limit: number = 5, windowMs: number = 60000): boolean => {
  if (typeof window === 'undefined') return true;
  
  const now = Date.now();
  const attempts = JSON.parse(localStorage.getItem(`rate_limit_${key}`) || '[]');
  
  // Remove old attempts
  const recentAttempts = attempts.filter((attempt: number) => now - attempt < windowMs);
  
  if (recentAttempts.length >= limit) {
    return false;
  }
  
  // Add current attempt
  recentAttempts.push(now);
  localStorage.setItem(`rate_limit_${key}`, JSON.stringify(recentAttempts));
  
  return true;
};

// Password strength checker
export const checkPasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  
  return {
    score,
    strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong',
    checks
  };
};

// Email domain validation
export const validateEmailDomain = (email: string, allowedDomains?: string[]): boolean => {
  if (!allowedDomains || allowedDomains.length === 0) return true;
  
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
};

// Remember me functionality
export const setRememberMe = (remember: boolean, userData: any) => {
  if (remember) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30); // 30 days
    
    const data = {
      ...userData,
      expiresAt: expirationDate.toISOString()
    };
    
    storeAuthData(data);
  } else {
    // Store in sessionStorage instead
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('siteoptz_auth', JSON.stringify(userData));
    }
  }
};

// Auto-login check
export const checkAutoLogin = (): any => {
  const stored = getStoredAuthData();
  
  if (!stored) return null;
  
  if (stored.expiresAt) {
    const expirationDate = new Date(stored.expiresAt);
    if (expirationDate < new Date()) {
      clearAuthData();
      return null;
    }
  }
  
  return stored;
};

// Logout utilities
export const handleLogout = async () => {
  try {
    // Clear local storage
    clearAuthData();
    
    // Clear session storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('siteoptz_auth');
    }
    
    // Track logout event
    trackAuthEvent('logout', 'manual', true);
    
    // Redirect to home page
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Utility for checking if user is authenticated
export const isAuthenticated = (): boolean => {
  const authData = checkAutoLogin();
  return !!authData;
};

// Utility for getting current user
export const getCurrentUser = () => {
  return checkAutoLogin();
};

// Export all utilities
export default {
  validateEmail,
  validatePassword,
  validateForm,
  trackAuthEvent,
  addToGoHighLevelPipeline,
  loginWithEmail,
  loginWithGoogle,
  getStoredAuthData,
  storeAuthData,
  clearAuthData,
  getAuthErrorMessage,
  sanitizeInput,
  formatUserData,
  generateCSRFToken,
  validateCSRFToken,
  checkRateLimit,
  checkPasswordStrength,
  validateEmailDomain,
  setRememberMe,
  checkAutoLogin,
  handleLogout,
  isAuthenticated,
  getCurrentUser
};
