import React, { useState } from 'react';
import { X, Headphones, CheckCircle, Building2, Users, TrendingUp, Mic, Podcast } from 'lucide-react';

interface PodcastSubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (data: FormData) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  interests: string[];
  podcastFrequency: string;
  preferredFormat: string;
  marketingConsent: boolean;
}

export default function PodcastSubscribeModal({ isOpen, onClose, onSubscribe }: PodcastSubscribeModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    interests: [],
    podcastFrequency: '',
    preferredFormat: '',
    marketingConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('🎧 Submitting podcast subscription form:', formData);
    
    try {
      const apiUrl = '/api/subscribe';
      console.log(`🔍 Making API call to: ${apiUrl}`);
      
      // Prepare data for the existing subscribe API
      const subscribeData = {
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        company: formData.company,
        source: 'podcast-subscription',
        interests: formData.interests,
        useCase: `Role: ${formData.role}, Frequency: ${formData.podcastFrequency}, Format: ${formData.preferredFormat}`,
        referrer: 'AI Leadership Podcast Modal'
      };
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscribeData),
      });
      
      console.log(`📨 Response status: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        const error = await response.json();
        console.error('❌ API error response:', error);
        throw new Error(error.message || 'Failed to subscribe');
      }
      
      await response.json();
      
      // Track successful subscription
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'podcast_subscription', {
          event_category: 'Lead Generation',
          event_label: 'AI Leadership Podcast',
          value: 1,
          custom_parameters: {
            company: formData.company,
            role: formData.role,
            interests: formData.interests.join(', '),
            frequency: formData.podcastFrequency,
          }
        });
      }
      
      onSubscribe(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          role: '',
          interests: [],
          podcastFrequency: '',
          preferredFormat: '',
          marketingConsent: false,
        });
      }, 2000);
      
    } catch (error) {
      console.error('❌ Subscription error:', error);
      setIsSubmitting(false);
      alert('Failed to subscribe. Please try again.');
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
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const interestOptions = [
    'AI Strategy & Implementation',
    'Business Automation',
    'Marketing AI Tools',
    'Sales & CRM Automation',
    'Content Creation AI',
    'Data Analysis & BI',
    'Customer Service AI',
    'HR & Recruiting Tech',
    'Financial AI Solutions',
    'Industry 4.0 & Manufacturing'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Podcast className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Subscribe to AI Leadership Podcast</h2>
                <p className="text-purple-100 text-sm">Get weekly insights delivered to your inbox</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 transition-colors p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success State */}
        {isSuccess && (
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Welcome to the AI Leadership Community!</h3>
            <p className="text-gray-300 mb-4">
              You'll receive our weekly podcast updates and exclusive AI insights directly in your inbox.
            </p>
            <p className="text-gray-400 text-sm">This window will close automatically...</p>
          </div>
        )}

        {/* Form */}
        {!isSuccess && (
          <form onSubmit={handleSubmit} className="p-6">
            {/* Personal Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-400" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter your first name"
                    required
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-purple-400" />
                Professional Details
              </h3>
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
            </div>

            {/* Podcast Preferences */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Mic className="w-5 h-5 mr-2 text-purple-400" />
                Podcast Preferences
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    How often do you listen to podcasts?
                  </label>
                  <select
                    name="podcastFrequency"
                    value={formData.podcastFrequency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Occasionally">Occasionally</option>
                    <option value="New to podcasts">New to podcasts</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred listening format
                  </label>
                  <select
                    name="preferredFormat"
                    value={formData.preferredFormat}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select format</option>
                    <option value="Audio only">Audio only</option>
                    <option value="Audio with transcripts">Audio with transcripts</option>
                    <option value="Written summaries">Written summaries</option>
                    <option value="Video format">Video format</option>
                  </select>
                </div>
              </div>
              
              {/* Interest Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  What AI topics interest you most? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={(e) => handleInterestChange(interest, e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-gray-300 text-sm">{interest}</span>
                    </label>
                  ))}
                </div>
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
                  className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 mt-1"
                />
                <span className="text-gray-300 text-sm leading-relaxed">
                  I agree to receive email communications about new podcast episodes, AI insights, and related resources from SiteOptz. 
                  You can unsubscribe at any time.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <Headphones className="w-5 h-5" />
                  <span>Subscribe to Podcast</span>
                </>
              )}
            </button>

            {/* Benefits */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-lg">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-purple-400" />
                What you'll get:
              </h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Weekly podcast episode notifications</li>
                <li>• Exclusive AI strategy insights and case studies</li>
                <li>• Early access to premium content and resources</li>
                <li>• Invitations to special webinars and events</li>
                <li>• Direct access to ask questions to our experts</li>
              </ul>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}