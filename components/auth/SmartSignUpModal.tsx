import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { X, Loader2, Mail } from 'lucide-react';
import ExistingUserModal from './ExistingUserModal';

interface SmartSignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: 'starter' | 'pro';
  billingCycle?: 'monthly' | 'yearly';
}

const SmartSignUpModal: React.FC<SmartSignUpModalProps> = ({ isOpen, onClose, plan, billingCycle = 'yearly' }) => {
  const [loading, setLoading] = useState(false);
  const [checkingUser, setCheckingUser] = useState(false);
  const [showExistingUserModal, setShowExistingUserModal] = useState(false);
  const [existingUserData, setExistingUserData] = useState<any>(null);
  const [email, setEmail] = useState('');


  // Check for existing user when email is entered
  const checkUserExists = async (email: string) => {
    if (!email || !email.includes('@')) return;

    setCheckingUser(true);
    
    try {
      const response = await fetch('/api/check-user-exists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      
      if (result.exists) {
        setExistingUserData(result.contact);
        setShowExistingUserModal(true);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setCheckingUser(false);
    }
  };

  // Debounced email check
  React.useEffect(() => {
    if (!email) return;

    const timeoutId = setTimeout(() => {
      checkUserExists(email);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [email]);

  const handleGoogleSignUp = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    
    try {
      // Close modal and start Google OAuth directly
      onClose();
      
      // Determine callback URL based on plan
      let callbackUrl = '/dashboard/free?signup=true';
      if (plan) {
        // For paid plans, redirect to dashboard with upgrade flag
        callbackUrl = `/dashboard?signup=true&plan=${plan}&billing=${billingCycle}`;
      }
      
      signIn('google', { 
        callbackUrl
      });
    } catch (error) {
      console.error('❌ Error during OAuth:', error);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] p-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          onKeyDown={(e) => e.key === 'Escape' && onClose()}
          role="button"
          tabIndex={0}
          aria-label="Close modal"
        />
        
        {/* Modal */}
        <div className="relative bg-black border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-white">
              Join SiteOptz.ai
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">
                Get Started with AI Automation
              </h3>
              <p className="text-gray-400 mb-6">
                Join thousands of businesses using SiteOptz.ai to streamline their operations with AI-powered solutions.
              </p>
            </div>

            {/* Email Field for User Check */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
                {checkingUser && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Google Sign Up Button */}
            <button
              onClick={handleGoogleSignUp}
              disabled={loading || checkingUser || !email}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => {
                  onClose();
                  signIn('google', { callbackUrl: '/dashboard/free' });
                }}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Existing User Modal */}
      {showExistingUserModal && existingUserData && (
        <ExistingUserModal
          isOpen={showExistingUserModal}
          onClose={() => {
            setShowExistingUserModal(false);
            setExistingUserData(null);
          }}
          userEmail={existingUserData.email}
          userName={existingUserData.name}
        />
      )}
    </>
  );
};

export default SmartSignUpModal;