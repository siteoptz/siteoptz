import React, { useState } from 'react';
import { trackPricingQuoteRequest, trackEmailCaptureWithLeadScore } from '../utils/key-events-tracker';

interface PricingQuoteFormProps {
  toolsContext?: string[];
  source?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  className?: string;
  compact?: boolean;
}

const PricingQuoteForm: React.FC<PricingQuoteFormProps> = ({
  toolsContext = [],
  source = 'website',
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
    toolsInterested: toolsContext,
    currentSolution: '',
    budgetRange: '',
    timeline: '',
    useCase: '',
    painPoints: [] as string[],
    contactMethod: 'email',
    urgency: 'standard',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const teamSizes = [
    '1-5 people',
    '6-15 people', 
    '16-50 people',
    '51-100 people',
    '100+ people'
  ];

  const budgetRanges = [
    'Under $1,000/month',
    '$1,000 - $5,000/month',
    '$5,000 - $15,000/month',
    '$15,000 - $50,000/month',
    '$50,000+/month',
    'Enterprise (Custom)'
  ];

  const timelines = [
    'Immediately',
    'Within 1 month',
    'Within 3 months',
    '3-6 months',
    '6+ months',
    'Just exploring options'
  ];

  const useCases = [
    'Content Creation',
    'Marketing Automation',
    'SEO Optimization',
    'Social Media Management',
    'Customer Support',
    'Sales Automation',
    'Data Analysis',
    'Project Management',
    'Other'
  ];

  const painPoints = [
    'High costs of current tools',
    'Poor tool integration',
    'Steep learning curve',
    'Limited scalability',
    'Lack of support',
    'Missing key features',
    'Data security concerns',
    'Too many separate tools'
  ];

  const availableTools = [
    'ChatGPT', 'Claude', 'Jasper AI', 'Copy.ai', 'Writesonic',
    'Surfer SEO', 'SEMrush', 'Ahrefs', 'Canva', 'Midjourney',
    'HubSpot', 'Salesforce', 'Zapier', 'Slack', 'Notion'
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

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.teamSize) {
      newErrors.teamSize = 'Please select team size';
    }

    if (!formData.useCase) {
      newErrors.useCase = 'Please select a use case';
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
      // Track pricing quote request
      trackPricingQuoteRequest({
        email: formData.email,
        company: formData.company,
        teamSize: formData.teamSize,
        toolsInterested: formData.toolsInterested,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        useCase: formData.useCase,
        contactMethod: formData.contactMethod,
        urgency: formData.urgency,
        currentSolution: formData.currentSolution,
        painPoints: formData.painPoints,
        source
      });

      // Track enhanced email capture with lead scoring
      trackEmailCaptureWithLeadScore(
        formData.email,
        'pricing_quote',
        null,
        'enterprise_sales',
        {
          company: formData.company,
          jobTitle: formData.role,
          teamSize: formData.teamSize,
          useCase: formData.useCase,
          budget: formData.budgetRange,
          timeline: formData.timeline
        }
      );

      // Submit to your backend
      const response = await fetch('/api/pricing-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source,
          requestDate: new Date().toISOString(),
          leadScore: calculateLeadScore(formData)
        }),
      });

      if (!response.ok) {
        throw new Error('Quote request failed');
      }

      const result = await response.json();
      
      setIsSubmitted(true);
      onSuccess?.(result);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Quote request failed';
      setErrors({ submit: errorMessage });
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateLeadScore = (data: typeof formData) => {
    let score = 0;
    if (data.company) score += 20;
    if (data.teamSize.includes('50+') || data.teamSize.includes('100+')) score += 25;
    if (data.budgetRange.includes('15,000') || data.budgetRange.includes('50,000') || data.budgetRange.includes('Enterprise')) score += 30;
    if (data.timeline === 'Immediately' || data.timeline === 'Within 1 month') score += 15;
    if (data.role && (data.role.toLowerCase().includes('director') || data.role.toLowerCase().includes('ceo'))) score += 10;
    return Math.min(score, 100);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleToolToggle = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      toolsInterested: prev.toolsInterested.includes(tool)
        ? prev.toolsInterested.filter(t => t !== tool)
        : [...prev.toolsInterested, tool]
    }));
  };

  const handlePainPointToggle = (painPoint: string) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(painPoint)
        ? prev.painPoints.filter(p => p !== painPoint)
        : [...prev.painPoints, painPoint]
    }));
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-4">
          Quote Request Submitted! 🎉
        </h3>
        <div className="bg-white rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
          <div className="space-y-2 text-left text-sm text-gray-700">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span>Our team will review your requirements within 24 hours</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span>We&apos;ll prepare a customized proposal for your team</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span>Schedule a consultation to discuss your specific needs</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span>Get personalized tool recommendations and pricing</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-green-700">
          Check your email for confirmation and next steps.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Get Custom Pricing Quote
        </h3>
        <p className="text-gray-600">
          Tell us about your needs and we&apos;ll provide a personalized quote with recommended tools and pricing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {errors.submit}
          </div>
        )}

        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
          
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
                Business Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="your@company.com"
                required
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
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
                Your Role
              </label>
              <input
                type="text"
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Marketing Director"
              />
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Requirements</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
                Team Size *
              </label>
              <select
                id="teamSize"
                value={formData.teamSize}
                onChange={(e) => handleInputChange('teamSize', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.teamSize ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select team size</option>
                {teamSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              {errors.teamSize && <p className="text-red-600 text-sm mt-1">{errors.teamSize}</p>}
            </div>

            <div>
              <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-1">
                Primary Use Case *
              </label>
              <select
                id="useCase"
                value={formData.useCase}
                onChange={(e) => handleInputChange('useCase', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.useCase ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select primary use case</option>
                {useCases.map(useCase => (
                  <option key={useCase} value={useCase}>{useCase}</option>
                ))}
              </select>
              {errors.useCase && <p className="text-red-600 text-sm mt-1">{errors.useCase}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Budget Range
              </label>
              <select
                id="budgetRange"
                value={formData.budgetRange}
                onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                Implementation Timeline
              </label>
              <select
                id="timeline"
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select timeline</option>
                {timelines.map(timeline => (
                  <option key={timeline} value={timeline}>{timeline}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tools Interest */}
        {!compact && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Which tools are you interested in?
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTools.map(tool => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => handleToolToggle(tool)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    formData.toolsInterested.includes(tool)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pain Points */}
        {!compact && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              What are your current challenges? (Select all that apply)
            </label>
            <div className="space-y-2">
              {painPoints.map(painPoint => (
                <label key={painPoint} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.painPoints.includes(painPoint)}
                    onChange={() => handlePainPointToggle(painPoint)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{painPoint}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Information (Optional)
          </label>
          <textarea
            id="additionalInfo"
            rows={3}
            value={formData.additionalInfo}
            onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us more about your specific needs, current setup, or any questions you have..."
          />
        </div>

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
              Submitting Request...
            </span>
          ) : (
            'Get Custom Quote'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to be contacted by our team regarding your quote request.
        </p>
      </form>
    </div>
  );
};

export default PricingQuoteForm;