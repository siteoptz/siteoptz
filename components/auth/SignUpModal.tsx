import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { X, Building, ChevronDown, Loader2 } from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'auth' | 'questions'>('auth');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    business: '',
    bottlenecks: '',
    currentAIUsage: '',
    priorityOutcome: ''
  });

  const bottleneckOptions = [
    { value: '', label: 'Select your top bottlenecks...' },
    { value: 'lead-generation', label: 'Lead generation and qualification' },
    { value: 'reporting-analytics', label: 'Reporting and analytics' },
    { value: 'content-creation', label: 'Content creation and marketing' },
    { value: 'client-follow-up', label: 'Client follow-up and communication' },
    { value: 'data-analysis', label: 'Data analysis and insights' },
    { value: 'process-automation', label: 'Process automation and workflows' },
    { value: 'customer-service', label: 'Customer service and support' },
    { value: 'project-management', label: 'Project management and tracking' }
  ];

  const currentAIUsageOptions = [
    { value: '', label: 'Select your current AI usage...' },
    { value: 'no-use', label: 'No use yet - just exploring options' },
    { value: 'experimenting', label: 'Experimenting personally with AI tools' },
    { value: 'few-workflows', label: 'A few workflows in ops/marketing' },
    { value: 'deeply-integrated', label: 'Deeply integrated into core processes' }
  ];

  const priorityOutcomeOptions = [
    { value: '', label: 'Select your top priority...' },
    { value: 'qualified-leads', label: 'More qualified leads' },
    { value: 'client-reporting', label: 'Better client visibility/reporting' },
    { value: 'faster-decisions', label: 'Faster decision-making from data' },
    { value: 'cost-reduction', label: 'Reduced operational costs' },
    { value: 'team-productivity', label: 'Increased team productivity' },
    { value: 'customer-satisfaction', label: 'Improved customer satisfaction' },
    { value: 'competitive-advantage', label: 'Competitive advantage in market' }
  ];

  const handleGoogleSignUp = async () => {
    if (step === 'auth') {
      // Move to questions step for Google OAuth users
      setStep('questions');
    } else {
      // Complete signup with Google OAuth
      setLoading(true);
      try {
        // Store qualifying data in localStorage for the OAuth callback
        localStorage.setItem('signupQualifyingData', JSON.stringify({
          business: formData.business,
          bottlenecks: formData.bottlenecks,
          currentAIUsage: formData.currentAIUsage,
          priorityOutcome: formData.priorityOutcome
        }));
        
        await signIn('google', {
          callbackUrl: '/dashboard?signup=true',
          redirect: true
        });
      } catch (error) {
        console.error('Google sign up error:', error);
        setLoading(false);
      }
    }
  };


  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trigger Google OAuth with qualifying data
    handleGoogleSignUp();
  };


  if (!isOpen) return null;

  return (
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
      <div className="relative bg-black border border-gray-800 rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto my-8">
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

              <p className="text-center text-gray-400 text-sm">
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

                {/* Question 1: Bottlenecks */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What are the top 1–2 bottlenecks in your business right now where you believe AI could save you the most time or money?
                  </label>
                  <div className="relative">
                    <select
                      value={formData.bottlenecks}
                      onChange={(e) => setFormData(prev => ({ ...prev, bottlenecks: e.target.value }))}
                      className="w-full appearance-none px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {bottleneckOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Question 2: Current AI Usage */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    How are you currently using AI tools in your business today?
                  </label>
                  <div className="relative">
                    <select
                      value={formData.currentAIUsage}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentAIUsage: e.target.value }))}
                      className="w-full appearance-none px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {currentAIUsageOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Question 3: Priority Outcome */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    If SiteOptz.ai could fully automate one outcome for you over the next 90 days, which would you prioritize first?
                  </label>
                  <div className="relative">
                    <select
                      value={formData.priorityOutcome}
                      onChange={(e) => setFormData(prev => ({ ...prev, priorityOutcome: e.target.value }))}
                      className="w-full appearance-none px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {priorityOutcomeOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
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
                    disabled={loading || !formData.business || !formData.bottlenecks || !formData.currentAIUsage || !formData.priorityOutcome}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Completing...
                      </div>
                    ) : (
                      'Continue with Google'
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