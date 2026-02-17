import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { X, Mail, Lock, User, Building, Target, Loader2 } from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'auth' | 'questions'>('auth');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    business: '',
    interests: [] as string[],
    goals: [] as string[]
  });

  const interestOptions = [
    'AI Strategy & Planning',
    'Content Creation & Marketing',
    'Data Analysis & Insights',
    'Process Automation',
    'Customer Service & Support',
    'Sales & Lead Generation',
    'Product Development',
    'Cost Optimization'
  ];

  const goalOptions = [
    'Increase Productivity',
    'Reduce Operational Costs',
    'Improve Customer Experience',
    'Scale Business Operations',
    'Generate More Leads',
    'Enhance Decision Making',
    'Automate Repetitive Tasks',
    'Stay Competitive'
  ];

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signIn('google', {
        callbackUrl: '/dashboard?signup=true',
        redirect: true
      });
    } catch (error) {
      console.error('Google sign up error:', error);
      setLoading(false);
    }
  };

  const handleCredentialSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.name) return;
    
    setLoading(true);
    try {
      // TODO: Implement credential-based signup
      // This would require adding CredentialsProvider back to NextAuth config
      console.log('Credential signup:', formData);
      setStep('questions');
    } catch (error) {
      console.error('Credential sign up error:', error);
    }
    setLoading(false);
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Send qualifying data to backend/GHL
      console.log('User qualifying data:', {
        business: formData.business,
        interests: formData.interests,
        goals: formData.goals
      });
      
      // Close modal and redirect
      onClose();
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Question submission error:', error);
    }
    setLoading(false);
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
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
      <div className="relative bg-black border border-gray-800 rounded-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">
            {step === 'auth' ? 'Create Account' : 'Tell Us About You'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {step === 'auth' ? (
            <>
              {/* Google OAuth Button */}
              <button
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-black text-gray-400">or</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleCredentialSignUp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Create a password"
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.email || !formData.password || !formData.name}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <p className="text-center text-gray-400 text-sm mt-4">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    onClose();
                    signIn('google', { callbackUrl: '/dashboard' });
                  }}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Sign in
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Qualifying Questions */}
              <form onSubmit={handleQuestionSubmit} className="space-y-6">
                {/* Business Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What&apos;s the name of your business?
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.business}
                      onChange={(e) => setFormData(prev => ({ ...prev, business: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your business name"
                      required
                    />
                  </div>
                </div>

                {/* Main Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    What are your main interests? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {interestOptions.map((interest) => (
                      <label
                        key={interest}
                        className="flex items-center p-3 bg-gray-900 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                            formData.interests.includes(interest)
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-600'
                          }`}
                        >
                          {formData.interests.includes(interest) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-white text-sm">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    What are your goals? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {goalOptions.map((goal) => (
                      <label
                        key={goal}
                        className="flex items-center p-3 bg-gray-900 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.goals.includes(goal)}
                          onChange={() => handleGoalToggle(goal)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                            formData.goals.includes(goal)
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-600'
                          }`}
                        >
                          {formData.goals.includes(goal) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-white text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('auth')}
                    className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !formData.business || formData.interests.length === 0 || formData.goals.length === 0}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Completing...
                      </div>
                    ) : (
                      'Complete Setup'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;