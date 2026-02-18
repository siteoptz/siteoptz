import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { X, ChevronDown, Loader2, User, Mail, Phone, Building } from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    bottlenecks: '',
    currentAIUsage: '',
    priorityOutcome: ''
  });

  const bottleneckOptions = [
    { value: '', label: 'What are the top 1–2 bottlenecks in your business right now where you believe AI could save you the most time or money?' },
    { value: 'Lead Generation and Qualification', label: 'Lead Generation and Qualification' },
    { value: 'Reporting & Analytics', label: 'Reporting & Analytics' },
    { value: 'Content Creation and Marketing', label: 'Content Creation and Marketing' },
    { value: 'Client Follow-Up and Communication', label: 'Client Follow-Up and Communication' },
    { value: 'Data Analysis and Insights', label: 'Data Analysis and Insights' },
    { value: 'Process Automation and Workflows', label: 'Process Automation and Workflows' },
    { value: 'Customer service and support', label: 'Customer service and support' },
    { value: 'Project Management and Tracking', label: 'Project Management and Tracking' }
  ];

  const currentAIUsageOptions = [
    { value: '', label: 'How are you currently using AI tools in your business today?' },
    { value: 'No use yet, just exploring options.', label: 'No use yet, just exploring options.' },
    { value: 'Experimenting personally with AI tools', label: 'Experimenting personally with AI tools' },
    { value: 'A few workflows in ops/marketing', label: 'A few workflows in ops/marketing' },
    { value: 'Deeply integrated into core processes', label: 'Deeply integrated into core processes' }
  ];

  const priorityOutcomeOptions = [
    { value: '', label: 'If SiteOptz.ai could fully automate one outcome for you over the next 90 days, which would you prioritize first?' },
    { value: 'More qualified leads', label: 'More qualified leads' },
    { value: 'Better client visibility/reporting', label: 'Better client visibility/reporting' },
    { value: 'Faster decision making from data', label: 'Faster decision making from data' },
    { value: 'Reduced operational costs', label: 'Reduced operational costs' },
    { value: 'Increased team productivity', label: 'Increased team productivity' },
    { value: 'Improved customer satisfaction', label: 'Improved customer satisfaction' },
    { value: 'Competitive advantage in market', label: 'Competitive advantage in market' }
  ];

  const submitToGHL = async (formData: any) => {
    try {
      // Submit directly to GHL form endpoint
      const response = await fetch('/api/submit-ghl-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: 'sugm3qdEBmvskAdbKwaS',
          ...formData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit to GHL');
      }

      console.log('Successfully submitted to GHL');
      return true;
    } catch (error) {
      console.error('GHL submission error:', error);
      return false;
    }
  };

  const handleGoogleOAuth = async () => {
    if (!formData.name || !formData.email || !formData.bottlenecks || !formData.currentAIUsage || !formData.priorityOutcome) {
      alert('Please fill out all required fields before continuing.');
      return;
    }

    setLoading(true);
    
    try {
      // Submit to GHL first
      const ghlSuccess = await submitToGHL(formData);
      
      if (ghlSuccess) {
        console.log('Form data submitted to GHL, proceeding with OAuth');
      } else {
        console.log('GHL submission failed, but proceeding with OAuth');
      }

      // Proceed with Google OAuth
      await signIn('google', {
        callbackUrl: '/dashboard?signup=true',
        redirect: true
      });
      
    } catch (error) {
      console.error('OAuth error:', error);
      setLoading(false);
    }
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
      <div className="relative bg-black border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            Discovery Call Application
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Custom Form Fields */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <form className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
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

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Business Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.business}
                  onChange={(e) => setFormData(prev => ({ ...prev, business: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your business name"
                />
              </div>
            </div>

            {/* Question 1: Bottlenecks */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                What are the top 1–2 bottlenecks in your business right now? *
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
                How are you currently using AI tools? *
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
                What would you prioritize automating first? *
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
          </form>
        </div>

        {/* Google OAuth Section */}
        <div className="p-6 border-t border-gray-800 bg-black rounded-b-xl">
          <p className="text-center text-gray-300 text-sm mb-4">
            Complete all required fields above, then create your account
          </p>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleOAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
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
                Create Account with Google
              </>
            )}
          </button>

          {/* Existing User Link */}
          <p className="text-center text-gray-400 text-sm">
            Existing user?{' '}
            <button
              onClick={() => {
                onClose();
                signIn('google', { callbackUrl: '/dashboard' });
              }}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;