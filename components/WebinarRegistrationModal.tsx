import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Video, CheckCircle, User, Mail, Building, Briefcase } from 'lucide-react';

interface WebinarRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  webinar: {
    title: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    speaker: string;
    category: string;
    level: string;
    attendees: number;
    topics: string[];
  } | null;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  experience: string;
  interests: string[];
  marketingConsent: boolean;
}

export default function WebinarRegistrationModal({ isOpen, onClose, webinar }: WebinarRegistrationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    experience: '',
    interests: [],
    marketingConsent: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const experienceOptions = [
    'Beginner (New to AI)',
    'Intermediate (Some AI experience)',
    'Advanced (Regular AI user)',
    'Expert (AI implementation leader)'
  ];

  const interestOptions = [
    'AI Strategy & Implementation',
    'Tool Selection & Comparison',
    'Business Process Automation',
    'Customer Service AI',
    'Marketing & Content AI',
    'Data Analysis & BI',
    'Cost Optimization',
    'Team Training & Change Management'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      console.log('📅 Submitting webinar registration:', formData);
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          company: formData.company,
          source: 'webinar_registration',
          interests: formData.interests,
          useCase: `Webinar Registration: ${webinar?.title}`,
          referrer: 'Webinar Registration Modal',
          webinarTitle: webinar?.title,
          webinarDate: webinar?.date,
          webinarTime: webinar?.time,
          role: formData.role,
          phone: formData.phone,
          experience: formData.experience,
          marketingConsent: formData.marketingConsent
        }),
      });

      console.log(`📨 Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      await response.json();
      
      // Track successful registration
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'webinar_registration', {
          event_category: 'Lead Generation',
          event_label: webinar?.title,
          value: 1,
          custom_parameters: {
            webinar_category: webinar?.category,
            webinar_level: webinar?.level,
            company: formData.company,
            role: formData.role,
            experience: formData.experience
          }
        });
      }
      
      setIsSuccess(true);
      
    } catch (error) {
      console.error('❌ Webinar registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (error) setError('');
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        role: '',
        phone: '',
        experience: '',
        interests: [],
        marketingConsent: false,
      });
      setIsSuccess(false);
      setError('');
      onClose();
    }
  };

  if (!isOpen || !webinar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-xl">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-blue-200 transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Register for Webinar</h2>
              <p className="text-blue-100 text-sm">Secure your spot for this expert session</p>
            </div>
          </div>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Registration Confirmed!</h3>
            <p className="text-gray-300 mb-6">
              You&apos;re registered for <strong>{webinar.title}</strong>
            </p>
            
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-6 mb-6 border border-blue-500/30">
              <h4 className="font-semibold text-white mb-4">What&apos;s Next?</h4>
              <div className="grid md:grid-cols-2 gap-4 text-left text-sm text-gray-300">
                <div className="flex items-start">
                  <Mail className="w-4 h-4 mr-2 mt-0.5 text-blue-400" />
                  <span>Check your email for webinar details and calendar invite</span>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-4 h-4 mr-2 mt-0.5 text-blue-400" />
                  <span>Add the event to your calendar: {webinar.date} at {webinar.time}</span>
                </div>
                <div className="flex items-start">
                  <Video className="w-4 h-4 mr-2 mt-0.5 text-blue-400" />
                  <span>Join link will be sent 1 hour before the session</span>
                </div>
                <div className="flex items-start">
                  <Users className="w-4 h-4 mr-2 mt-0.5 text-blue-400" />
                  <span>Prepare your questions for the live Q&A</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-4 mb-6 border border-green-500/30">
              <p className="text-green-400 font-semibold mb-2">🎯 Session Details</p>
              <div className="text-sm text-gray-300 space-y-1">
                <p><strong>Date:</strong> {webinar.date}</p>
                <p><strong>Time:</strong> {webinar.time}</p>
                <p><strong>Duration:</strong> {webinar.duration}</p>
                <p><strong>Speaker:</strong> {webinar.speaker}</p>
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6">
            {/* Webinar Info */}
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-4 mb-6 border border-blue-500/20">
              <h3 className="text-white font-semibold mb-2">{webinar.title}</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                  {webinar.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-400" />
                  {webinar.time} ({webinar.duration})
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-400" />
                  {webinar.speaker}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-blue-400" />
                  {webinar.attendees} registered
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            {/* Personal Information */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                Personal Information
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-400" />
                Contact Details
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-400" />
                Professional Details
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select your role</option>
                    <option value="C-Level Executive">C-Level Executive</option>
                    <option value="VP/Director">VP/Director</option>
                    <option value="Manager">Manager</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Individual Contributor">Individual Contributor</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                    <option value="Student/Academic">Student/Academic</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Your AI Experience Level
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your experience level</option>
                {experienceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                What topics interest you most? (Select all that apply)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {interestOptions.map((interest) => (
                  <label key={interest} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={(e) => handleInterestChange(interest, e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-300 text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Marketing Consent */}
            <div className="mb-6">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                />
                <span className="text-gray-300 text-sm leading-relaxed">
                  I agree to receive email communications about upcoming webinars, AI insights, and related resources from SiteOptz. 
                  You can unsubscribe at any time.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || !formData.company || !formData.role}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <Video className="w-5 h-5" />
                  <span>Register for Webinar</span>
                </>
              )}
            </button>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Your information is secure and will never be shared with third parties.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}