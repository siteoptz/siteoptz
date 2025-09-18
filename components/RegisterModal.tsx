import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { X, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  onOpenLogin?: () => void;
  onSuccess?: (planName: string) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ 
  isOpen, 
  onClose, 
  planName = 'Free Plan',
  onOpenLogin,
  onSuccess
}) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    aiToolsInterest: '',
    businessSize: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (!isLogin) {
        // Registration - validate required fields
        if (!formData.aiToolsInterest) {
          setError('Please select your AI tools interest');
          setIsLoading(false);
          return;
        }
        
        if (!formData.businessSize) {
          setError('Please select your business size');
          setIsLoading(false);
          return;
        }
        
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        // Add new subscriber to GoHighLevel for free plan registration
        try {
          const registrationResponse = await fetch('/api/register-free-plan', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              name: formData.name,
              source: 'Free Plan Registration - Modal',
              planName: planName,
              userAgent: navigator.userAgent,
              referrer: document.referrer,
              registrationMethod: 'email',
              aiToolsInterest: formData.aiToolsInterest,
              businessSize: formData.businessSize
            }),
          });

          const registrationResult = await registrationResponse.json();
          
          if (registrationResult.success) {
            console.log('User registered in GoHighLevel:', registrationResult.data);
          } else {
            console.warn('GoHighLevel registration failed:', registrationResult.error);
            
            // Handle existing user case
            if (registrationResult.error === 'USER_EXISTS') {
              setError('User already exists. Please sign in instead.');
              setIsLogin(true); // Switch to login mode
              setIsLoading(false);
              return;
            }
            
            // Don't fail the registration process if other CRM integration fails
          }
        } catch (crmError) {
          console.error('CRM integration error:', crmError);
          // Don't fail the registration process if CRM integration fails
        }
        
        console.log('User registered:', { email: formData.email, name: formData.name });
        
        // Wait a moment for GoHighLevel to process the new user
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Sign in with credentials
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
      } else {
        // Success - mark as first time user
        if (!isLogin) {
          localStorage.setItem('isFirstTimeUser', 'true');
          // Call onSuccess with plan name for potential checkout redirect
          if (onSuccess && planName && !planName.includes('Free')) {
            onSuccess(planName);
            return;
          }
        }
        onClose();
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError('');
    
    console.log('🚀 DEBUGGING: handleGoogleAuth triggered');
    console.log('🚀 isLogin mode:', isLogin);
    console.log('🚀 formData:', formData);
    
    // Validate required fields for registration (only if not in login mode)
    if (!isLogin) {
      console.log('🚀 REGISTRATION MODE: Validating fields');
      
      if (!formData.aiToolsInterest) {
        setError('Please select your AI tools interest');
        setIsLoading(false);
        return;
      }
      
      if (!formData.businessSize) {
        setError('Please select your business size');
        setIsLoading(false);
        return;
      }
      
      console.log('🚀 REGISTRATION MODE: All fields validated ✅');
    } else {
      console.log('🚀 LOGIN MODE: Skipping field validation');
    }
    
    try {
      // For registration attempts, store a registration flag temporarily
      if (!isLogin) {
        console.log('🚀 REGISTRATION MODE: Storing business info in sessionStorage');
        
        // Set a flag in sessionStorage to indicate this is a registration attempt
        const registrationData = {
          isRegistrationAttempt: true,
          aiToolsInterest: formData.aiToolsInterest,
          businessSize: formData.businessSize,
          planName: planName,
          timestamp: Date.now()
        };
        
        sessionStorage.setItem('pendingOAuthRegistration', JSON.stringify(registrationData));
        console.log('✅ STORED registration data in sessionStorage for OAuth:', registrationData);
        
        // Also store in API for backend access
        try {
          const storeResponse = await fetch('/api/check-oauth-registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'store',
              email: 'temp-oauth-registration', // Temporary key since we don't have email yet
              registrationData: registrationData
            })
          });
          console.log('✅ STORED registration data in API backend:', await storeResponse.json());
        } catch (apiError) {
          console.warn('⚠️ Failed to store in API backend:', apiError);
        }
      } else {
        console.log('🚀 LOGIN MODE: Skipping business info storage');
      }
      
      console.log('🔵 Initiating Google OAuth, isLogin:', isLogin);
      console.log('🔵 Callback URL will be:', isLogin ? '/dashboard' : '/dashboard?registration=true');
      
      const result = await signIn('google', {
        callbackUrl: isLogin ? '/dashboard' : '/dashboard?registration=true',
        redirect: true, // Allow NextAuth to handle redirect
      });
      
      console.log('🔵 Google OAuth result:', result);
      
      if (result?.error) {
        console.error('❌ Google OAuth error:', result.error);
        setError('Google authentication failed. Please try again.');
        setIsLoading(false);
      } else {
        console.log('✅ Google OAuth successful, redirecting...');
        // The dashboard will handle the registration validation
        
        // Success - mark as first time user if registering and redirect
        if (!isLogin) {
          localStorage.setItem('isFirstTimeUser', 'true');
        }
        onClose();
        // For some reason, NextAuth might not redirect automatically in modal context
        // So we'll handle it manually
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.error('Google auth error:', error);
      setError('Google authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />
      
      <div className="flex min-h-screen items-start justify-center p-4 pt-16 sm:pt-24">
        {/* Modal */}
        <div className="relative w-full max-w-md transform rounded-2xl bg-gradient-to-br from-black via-gray-900 to-black border border-gray-700 p-6 shadow-2xl transition-all z-10 max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back!' : 'Get Started'}
            </h2>
            <p className="text-gray-300">
              {isLogin ? 'Sign in to your account' : `Start your journey with the ${planName}`}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* AI Tools Interest and Business Size fields for registration (shown before auth options) */}
          {!isLogin && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  What AI tools interest you most?
                </label>
                <select
                  name="aiToolsInterest"
                  value={formData.aiToolsInterest}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
                >
                  <option value="">Select Interest</option>
                  <option value="chatgpt">ChatGPT & Language Models</option>
                  <option value="image-generation">AI Image Generation</option>
                  <option value="video-creation">AI Video Creation</option>
                  <option value="writing-tools">AI Writing Tools</option>
                  <option value="automation">AI Automation</option>
                  <option value="voice-ai">Voice AI Tools</option>
                  <option value="design-tools">AI Design Tools</option>
                  <option value="research">AI Research Tools</option>
                  <option value="general">General AI Tools</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  What&apos;s your business size?
                </label>
                <select
                  name="businessSize"
                  value={formData.businessSize}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
                >
                  <option value="">Select Business Size</option>
                  <option value="small">Small Business (1-10 employees)</option>
                  <option value="medium">Medium Business (11-50 employees)</option>
                  <option value="large">Large Business (51-200 employees)</option>
                  <option value="enterprise">Enterprise (200+ employees)</option>
                  <option value="solo">Solo/Freelancer</option>
                  <option value="startup">Startup</option>
                  <option value="agency">Agency/Consultancy</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Google Auth Button */}
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (only for registration) */}
            {!isLogin && (
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 pl-10 pr-12 text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password field (only for registration) */}
            {!isLogin && (
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}


            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  if (isLogin) {
                    setIsLogin(false);
                  } else if (onOpenLogin) {
                    onClose();
                    onOpenLogin();
                  } else {
                    setIsLogin(true);
                  }
                }}
                className="text-green-400 hover:text-green-300 font-semibold transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Terms (only for registration) */}
          {!isLogin && (
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-green-400 hover:text-green-300">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-green-400 hover:text-green-300">Privacy Policy</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;