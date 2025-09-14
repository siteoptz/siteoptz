import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onOpenRegister }) => {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'magic' | 'password' | 'code'>('magic');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: false,
      });
      
      if (result?.error) {
        setError('Google authentication failed. Please try again.');
        setIsLoading(false);
      } else {
        onClose();
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Google auth error:', error);
      setError('Google authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // For now, we'll simulate sending a magic link
      // In a real implementation, you'd integrate with a service like Supabase, Auth0, or similar
      setTimeout(() => {
        setMagicLinkSent(true);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setError('Failed to send magic link. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
      } else {
        onClose();
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Password login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code) {
      setError('Please enter both email and verification code');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Implementation for one-time code verification would go here
      // This would typically integrate with your auth provider
      setError('One-time code authentication is not yet implemented');
      setIsLoading(false);
    } catch (error) {
      setError('Code verification failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
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
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-300">
              Sign in with your email - we&apos;ll send you a magic link, or use your password if you&apos;ve set one up.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Magic Link Sent Message */}
          {magicLinkSent && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-green-400 text-sm text-center">
                Magic link sent! Check your email and click the link to sign in.
              </p>
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
              <span className="px-2 bg-black text-gray-400">Or</span>
            </div>
          </div>

          {/* Login Method Tabs */}
          <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
            <button
              onClick={() => setLoginMethod('magic')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                loginMethod === 'magic'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Send One-Time Code
            </button>
            <button
              onClick={() => setLoginMethod('password')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                loginMethod === 'password'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign in with Password
            </button>
          </div>

          {/* Login Forms */}
          {loginMethod === 'magic' && (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || magicLinkSent}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : magicLinkSent ? 'Magic Link Sent!' : 'Send Magic Link'}
              </button>
            </form>
          )}

          {loginMethod === 'password' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
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
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => {
                  if (onOpenRegister) {
                    onClose();
                    onOpenRegister();
                  } else {
                    onClose();
                  }
                }}
                className="text-green-400 hover:text-green-300 font-semibold transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;