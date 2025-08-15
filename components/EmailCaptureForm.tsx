import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { CheckCircle, Mail, ArrowRight, User, Building, Sparkles, X } from 'lucide-react';

interface EmailCaptureFormProps {
  tool?: string;
  category?: string;
  source?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  compact?: boolean;
  showModal?: boolean;
  onClose?: () => void;
}

interface FormData {
  email: string;
  name: string;
  company: string;
  useCase: string;
  interests: string[];
}

interface FormStep {
  id: number;
  title: string;
  description: string;
  fields: string[];
}

const FORM_STEPS: FormStep[] = [
  {
    id: 1,
    title: "Let's get started",
    description: "Enter your email to receive AI insights",
    fields: ['email']
  },
  {
    id: 2,
    title: "Tell us about yourself",
    description: "Help us personalize your experience",
    fields: ['name', 'company']
  },
  {
    id: 3,
    title: "What interests you most?",
    description: "Select your AI tool preferences",
    fields: ['useCase', 'interests']
  }
];

const USE_CASES = [
  { value: 'content-creation', label: 'Content Creation', icon: '✍️' },
  { value: 'seo', label: 'SEO & Marketing', icon: '📈' },
  { value: 'productivity', label: 'Productivity', icon: '⚡' },
  { value: 'development', label: 'Development', icon: '💻' },
  { value: 'social-media', label: 'Social Media', icon: '📱' },
  { value: 'general', label: 'General AI', icon: '🤖' }
];

const INTERESTS = [
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'claude', label: 'Claude' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'jasper', label: 'Jasper AI' },
  { value: 'writesonic', label: 'Writesonic' },
  { value: 'copy-ai', label: 'Copy.ai' },
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'surfer-seo', label: 'Surfer SEO' }
];

export default function EmailCaptureForm({
  tool,
  category,
  source = 'footer',
  onSuccess,
  onError,
  compact = false,
  showModal = false,
  onClose
}: EmailCaptureFormProps) {
  const [currentStep, setCurrentStep] = useState(compact ? 1 : 1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    company: '',
    useCase: 'general',
    interests: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Track form analytics
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_view', {
        event_category: 'email_capture',
        event_label: source,
        custom_parameter_1: tool || category || 'general'
      });
    }
  }, [source, tool, category]);

  // Debug current step changes
  useEffect(() => {
    console.log('Current step changed to:', currentStep, 'compact:', compact);
  }, [currentStep, compact]);

  const validateField = (field: string, value: any): string => {
    switch (field) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email';
        return '';
      case 'name':
        if (!value?.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      default:
        return '';
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentStepData = FORM_STEPS[currentStep - 1];
    const errors: Record<string, string> = {};
    let isValid = true;

    currentStepData.fields.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = useCallback((field: keyof FormData, value: any) => {
    console.log('Input change:', field, value);
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [validationErrors]);

  const handleInterestToggle = useCallback((interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  }, []);

  const handleNext = useCallback(() => {
    console.log('handleNext called', { currentStep, compact, formData });
    if (validateCurrentStep()) {
      console.log('Validation passed for step', currentStep);
      if (compact || currentStep === FORM_STEPS.length) {
        console.log('Submitting form');
        handleSubmit();
      } else {
        console.log('Moving to next step', currentStep + 1);
        setCurrentStep(prev => prev + 1);
        
        // Track step progression
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_step_complete', {
            event_category: 'email_capture',
            event_label: `step_${currentStep}`,
            value: currentStep
          });
        }
      }
    } else {
      console.log('Validation failed for step', currentStep, validationErrors);
    }
  }, [currentStep, compact, formData, validationErrors]);

  const handleBack = useCallback(() => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  }, []);

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          company: formData.company,
          useCase: formData.useCase,
          interests: formData.interests,
          tool,
          category,
          source,
          referrer: typeof window !== 'undefined' ? document.referrer : undefined
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Subscription failed');
      }

      // Track successful conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'email_capture',
          event_label: source,
          value: 1,
          custom_parameter_1: tool || category || 'general'
        });
      }

      setIsSubmitted(true);
      onSuccess?.();

      // Send copy to info@siteoptz.com
      await fetch('/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'info@siteoptz.com',
          tool: 'New Newsletter Subscription',
          calculatedCost: null,
          users: 1,
          planType: 'notification',
          source: `${source} - New subscriber: ${formData.email}`,
          additionalData: {
            subscriberEmail: formData.email,
            subscriberName: formData.name,
            subscriberCompany: formData.company,
            useCase: formData.useCase,
            interests: formData.interests,
            tool,
            category
          }
        }),
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
      onError?.(errorMessage);
      
      // Track error
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_error', {
          event_category: 'email_capture',
          event_label: errorMessage,
          value: 0
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateContent = () => {
    if (tool) {
      return {
        title: `Get ${tool} Insights`,
        description: `Stay updated with the latest ${tool} features, pricing, and comparisons.`
      };
    } else if (category) {
      return {
        title: `${category} AI Tools`,
        description: `Discover the best ${category} AI tools and stay ahead with expert insights.`
      };
    } else {
      return {
        title: 'Stay Ahead with AI Insights',
        description: 'Get the latest AI tool reviews, comparisons, and exclusive insights delivered weekly.'
      };
    }
  };

  const content = generateContent();
  const currentStepData = FORM_STEPS[currentStep - 1];

  // Create stable form content to prevent re-renders
  const renderFormContent = () => (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl overflow-hidden"
         style={{ pointerEvents: 'auto' }}>
      
      <div className="text-center pb-4 p-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {content.title}
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          {content.description}
        </p>
      </div>

      {!compact && (
        <div className="px-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            {FORM_STEPS.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id}
                </div>
                {step.id < FORM_STEPS.length && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-6 pt-2">
        {!compact && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900">{currentStepData.title}</h3>
            <p className="text-sm text-gray-600">{currentStepData.description}</p>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {(compact || currentStep === 1) && (
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
                    validationErrors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  style={{ pointerEvents: 'auto' }}
                  autoFocus={showModal}
                  tabIndex={0}
                  required
                />
              </div>
              {validationErrors.email && (
                <p className="text-red-600 text-sm">{validationErrors.email}</p>
              )}
            </div>
          )}

          {!compact && currentStep === 2 && (
            <>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
                      validationErrors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    style={{ pointerEvents: 'auto' }}
                    tabIndex={0}
                    required
                  />
                </div>
                {validationErrors.name && (
                  <p className="text-red-600 text-sm">{validationErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-700 block">
                  Company (Optional)
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Enter your company name"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    style={{ pointerEvents: 'auto' }}
                    tabIndex={0}
                  />
                </div>
              </div>
            </>
          )}

          {!compact && currentStep === 3 && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Primary Use Case
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {USE_CASES.map((useCase) => (
                    <button
                      key={useCase.value}
                      type="button"
                      onClick={() => handleInputChange('useCase', useCase.value)}
                      className={`p-3 text-left border rounded-lg transition-all ${
                        formData.useCase === useCase.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400 text-gray-900'
                      }`}
                    >
                      <div className="text-lg">{useCase.icon}</div>
                      <div className="text-sm font-medium">{useCase.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Interested AI Tools (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest.value}
                      type="button"
                      onClick={() => handleInterestToggle(interest.value)}
                      className={`px-3 py-1 text-sm border rounded-full transition-all ${
                        formData.interests.includes(interest.value)
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 hover:border-gray-400 text-gray-900'
                      }`}
                    >
                      {interest.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className={`flex ${!compact && currentStep > 1 ? 'justify-between' : 'justify-center'} gap-3`}>
            {!compact && currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center">
                  <span>{compact || currentStep === FORM_STEPS.length ? 'Subscribe' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By subscribing, you agree to receive our newsletter. You can unsubscribe at any time.
            {!compact && ' No spam, ever! 🚫📧'}
          </p>
        </form>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className={`${showModal ? 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' : ''}`}>
        <div className={`w-full max-w-md mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl ${showModal ? 'relative' : ''}`}>
          {showModal && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-green-600 hover:text-green-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="p-8 text-center">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-green-900 mb-3">
              🎉 Welcome to SiteOptz!
            </h3>
            
            <div className="bg-white/50 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium mb-2">
                Thank you for subscribing to our AI insights newsletter!
              </p>
              <p className="text-green-700 text-sm">
                You&apos;ve joined over 50,000+ AI enthusiasts who stay ahead with the latest tool reviews, 
                comparisons, and exclusive insights.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
              <div className="space-y-2 text-left text-sm text-blue-800">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span>Check your inbox for a welcome email (don&apos;t forget spam folder!)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span>Get exclusive AI tool insights every week</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span>Access to member-only tool comparisons and guides</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span>Early access to new AI tool reviews</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex space-x-3">
                <Link 
                  href="/tools"
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                >
                  Explore AI Tools
                </Link>
                <Link 
                  href="/compare"
                  className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-center"
                >
                  Compare Tools
                </Link>
              </div>
              
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    email: '',
                    name: '',
                    company: '',
                    useCase: 'general',
                    interests: []
                  });
                }}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Subscribe Another Email
              </button>
              
              {showModal && onClose && (
                <button 
                  onClick={onClose}
                  className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Close
                </button>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-green-200">
              <p className="text-xs text-green-600">
                Follow us for daily AI updates: 
                <button className="font-medium hover:underline ml-1 text-green-600">Twitter</button> • 
                <button className="font-medium hover:underline ml-1 text-green-600">LinkedIn</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showModal) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center p-4" 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
          pointerEvents: 'auto'
        }}
        onClick={(e) => {
          // Close modal when clicking backdrop
          if (e.target === e.currentTarget && onClose) {
            onClose();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && onClose) {
            onClose();
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-form-title"
      >
        <div 
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl" 
          style={{ pointerEvents: 'auto' }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="document"
        >
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {renderFormContent()}
        </div>
      </div>
    );
  }

  return renderFormContent();
}