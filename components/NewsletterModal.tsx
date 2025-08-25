import React, { useState } from 'react';
import { X, Mail, CheckCircle, Users } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

interface FormData {
  email: string;
  name: string;
  company: string;
}

export default function NewsletterModal({ isOpen, onClose, source = 'newsletter' }: NewsletterModalProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    company: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      console.log('📧 Submitting newsletter subscription:', formData);
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          company: formData.company,
          source: source,
          interests: ['AI Newsletter'],
          useCase: 'Newsletter Subscription',
          referrer: 'Newsletter Modal'
        }),
      });

      console.log(`📨 Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Subscription failed');
      }

      await response.json();
      
      // Track successful subscription
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'newsletter_subscription', {
          event_category: 'Lead Generation',
          event_label: source,
          value: 1,
        });
      }
      
      setIsSuccess(true);
      
    } catch (error) {
      console.error('❌ Newsletter subscription error:', error);
      setError(error instanceof Error ? error.message : 'Subscription failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ email: '', name: '', company: '' });
      setIsSuccess(false);
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 rounded-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-t-xl relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-blue-200 transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Subscribe to Our Newsletter</h2>
              <p className="text-blue-100 text-sm">Get weekly AI insights and tool updates</p>
            </div>
          </div>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Welcome to SiteOptz!</h3>
            <p className="text-gray-300 mb-4">
              Thank you for subscribing! You&apos;ll receive weekly AI insights, tool reviews, and exclusive updates.
            </p>
            
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg p-4 mb-6 border border-blue-500/30">
              <h4 className="font-semibold text-white mb-2">What&apos;s Next?</h4>
              <div className="space-y-2 text-left text-sm text-gray-300">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span>Check your inbox for a welcome email</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span>Get exclusive AI tool insights every week</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span>Early access to podcast episodes</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-colors"
            >
              Continue Listening
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6">
            <p className="text-gray-300 mb-6 text-center">
              Join 50,000+ AI enthusiasts getting weekly insights on the latest tools, strategies, and industry trends.
            </p>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
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
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Company"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !formData.email}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Subscribing...
                </>
              ) : (
                <>
                  <Users className="w-5 h-5 mr-2" />
                  Subscribe to Newsletter
                </>
              )}
            </button>
            
            <p className="text-xs text-gray-400 mt-4 text-center">
              You can unsubscribe at any time. We respect your privacy and will never share your email.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}