import React, { useState } from 'react';
import { trackWebinarRegistration, trackEmailCaptureWithLeadScore } from '../utils/key-events-tracker';

interface WebinarData {
  title: string;
  date: string;
  time: string;
  type?: 'live' | 'recorded' | 'series';
  instructor?: string;
  duration?: string;
  description?: string;
  topics?: string[];
}

interface WebinarRegistrationFormProps {
  webinar: WebinarData;
  source?: string;
  utmSource?: string;
  utmCampaign?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  className?: string;
  compact?: boolean;
}

const WebinarRegistrationForm: React.FC<WebinarRegistrationFormProps> = ({
  webinar,
  source = 'website',
  utmSource,
  utmCampaign,
  onSuccess,
  onError,
  className = '',
  compact = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    interests: [] as string[],
    timezone: 'EST'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roles = [
    'Marketing Manager',
    'Content Creator',
    'SEO Specialist',
    'Digital Marketer',
    'Business Owner',
    'Consultant',
    'Developer',
    'Other'
  ];

  const teamSizes = [
    '1 (Solo)',
    '2-5',
    '6-10',
    '11-25',
    '26-50',
    '50+'
  ];

  const interests = [
    'AI Tool Selection',
    'ROI Measurement',
    'Team Training',
    'Workflow Automation',
    'Cost Optimization',
    'Integration Strategies'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!compact && !formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!compact && !formData.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Track webinar registration
      trackWebinarRegistration(
        webinar.title,
        formData.email,
        {
          date: webinar.date,
          time: webinar.time,
          type: webinar.type,
          name: formData.name,
          company: formData.company,
          role: formData.role,
          source,
          utm_source: utmSource,
          utm_campaign: utmCampaign
        }
      );

      // Track enhanced email capture with lead scoring
      trackEmailCaptureWithLeadScore(
        formData.email,
        'webinar_registration',
        null,
        'education',
        {
          company: formData.company,
          jobTitle: formData.role,
          teamSize: formData.teamSize,
          useCase: 'webinar_attendance',
          interests: formData.interests,
          timeline: 'scheduled'
        }
      );

      // Submit to your backend
      const response = await fetch('/api/webinar-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          webinar: webinar.title,
          webinarDate: webinar.date,
          webinarTime: webinar.time,
          ...formData,
          source,
          utmSource,
          utmCampaign,
          registrationDate: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      
      setIsSubmitted(true);
      onSuccess?.(result);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setErrors({ submit: errorMessage });
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">
          You're Registered! 🎉
        </h3>
        <p className="text-green-800 mb-4">
          Thank you for registering for "{webinar.title}"
        </p>
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Date:</strong> {webinar.date}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Time:</strong> {webinar.time}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Type:</strong> {webinar.type || 'Live'} webinar
          </p>
        </div>
        <p className="text-sm text-green-700">
          Check your email for the calendar invite and joining instructions.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Register for Webinar
        </h3>
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-blue-900 mb-1">{webinar.title}</h4>
          <p className="text-sm text-blue-800 mb-2">{webinar.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-blue-700">
            <span><strong>Date:</strong> {webinar.date}</span>
            <span><strong>Time:</strong> {webinar.time}</span>
            {webinar.duration && <span><strong>Duration:</strong> {webinar.duration}</span>}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Your full name"
              required
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
              required
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        {!compact && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.company ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Your company name"
                  required
                />
                {errors.company && <p className="text-red-600 text-sm mt-1">{errors.company}</p>}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.role ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select your role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
                Team Size (Optional)
              </label>
              <select
                id="teamSize"
                value={formData.teamSize}
                onChange={(e) => handleInputChange('teamSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select team size</option>
                {teamSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What interests you most? (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {interests.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      formData.interests.includes(interest)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Registering...
            </span>
          ) : (
            `Register for ${webinar.type === 'live' ? 'Live' : 'Recorded'} Webinar`
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By registering, you agree to receive email communications about this webinar and future events.
        </p>
      </form>
    </div>
  );
};

export default WebinarRegistrationForm;