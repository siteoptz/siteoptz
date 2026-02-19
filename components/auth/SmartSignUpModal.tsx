import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { X, ChevronDown, Loader2, User, Mail, Phone, Building } from 'lucide-react';
import ExistingUserModal from './ExistingUserModal';

interface SmartSignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SmartSignUpModal: React.FC<SmartSignUpModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [checkingUser, setCheckingUser] = useState(false);
  const [showExistingUserModal, setShowExistingUserModal] = useState(false);
  const [existingUserData, setExistingUserData] = useState<any>(null);
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
    { value: '', label: 'Q2: What are the top 1–2 bottlenecks in your business right now where you believe AI could save you the most time or money?' },
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
    { value: '', label: 'Q3: How are you currently using AI tools in your business today?' },
    { value: 'No use yet, just exploring options.', label: 'No use yet, just exploring options.' },
    { value: 'Experimenting personally with AI tools', label: 'Experimenting personally with AI tools' },
    { value: 'A few workflows in ops/marketing', label: 'A few workflows in ops/marketing' },
    { value: 'Deeply integrated into core processes', label: 'Deeply integrated into core processes' }
  ];

  const priorityOutcomeOptions = [
    { value: '', label: 'Q4: If SiteOptz.ai could fully automate one outcome for you over the next 90 days, which would you prioritize first?' },
    { value: 'More qualified leads', label: 'More qualified leads' },
    { value: 'Better client visibility/reporting', label: 'Better client visibility/reporting' },
    { value: 'Faster decision making from data', label: 'Faster decision making from data' },
    { value: 'Reduced operational costs', label: 'Reduced operational costs' },
    { value: 'Increased team productivity', label: 'Increased team productivity' },
    { value: 'Improved customer satisfaction', label: 'Improved customer satisfaction' },
    { value: 'Competitive advantage in market', label: 'Competitive advantage in market' }
  ];

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
    if (!formData.email) return;

    const timeoutId = setTimeout(() => {
      checkUserExists(formData.email);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.bottlenecks || !formData.currentAIUsage || !formData.priorityOutcome) {
      alert('Please fill out all required fields before continuing.');
      return;
    }

    setLoading(true);
    
    try {
      // Submit to GHL first
      const ghlResponse = await fetch('/api/submit-to-ghl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (ghlResponse.ok) {
        console.log('✅ Successfully submitted to GHL');
      }

      // Close modal and redirect to OAuth signup
      onClose();
      window.location.href = '/auth/signup?source=ghl';
      
    } catch (error) {
      console.error('❌ Error during submission:', error);
      // Still redirect to OAuth on error
      onClose();
      window.location.href = '/auth/signup?source=ghl';
    } finally {
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

          {/* Form Fields */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="space-y-6">
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
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field with User Check */}
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
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Business Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Website
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.business}
                    onChange={(e) => setFormData(prev => ({ ...prev, business: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your business website (optional)"
                  />
                </div>
              </div>

              {/* Bottlenecks Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Bottlenecks *
                </label>
                <div className="relative">
                  <select
                    value={formData.bottlenecks}
                    onChange={(e) => setFormData(prev => ({ ...prev, bottlenecks: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    {bottleneckOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* AI Usage Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current AI Usage *
                </label>
                <div className="relative">
                  <select
                    value={formData.currentAIUsage}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentAIUsage: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    {currentAIUsageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Priority Outcome Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priority Outcome *
                </label>
                <div className="relative">
                  <select
                    value={formData.priorityOutcome}
                    onChange={(e) => setFormData(prev => ({ ...prev, priorityOutcome: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    {priorityOutcomeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800">
            <button
              onClick={handleSubmit}
              disabled={loading || checkingUser}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Submit & Create Account'
              )}
            </button>

            <p className="text-center text-gray-400 text-xs">
              Existing user?{' '}
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