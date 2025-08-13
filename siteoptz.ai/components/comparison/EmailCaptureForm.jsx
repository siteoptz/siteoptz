import { useState } from 'react';

/**
 * Email capture form component with integration support
 * @param {Object} props - Component props
 * @returns {JSX.Element} Email capture form component
 */
export default function EmailCaptureForm({
  isOpen,
  onClose,
  tools = [],
  title = "Get Your Free Comparison Report",
  description = "We'll create a detailed comparison and send it to your email.",
  className = ''
}) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    company: '',
    teamSize: '',
    useCase: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Track form submission attempt
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_capture_attempt', {
          event_category: 'Lead Generation',
          event_label: 'Comparison Report Request',
          value: tools.length
        });
      }

      // Submit to API
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tools: tools.map(tool => tool.name).join(', '),
          source: 'comparison_page',
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Track successful submission
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_capture_success', {
          event_category: 'Lead Generation',
          event_label: 'Comparison Report Request',
          value: 1
        });
      }

      setIsSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          email: '',
          firstName: '',
          company: '',
          teamSize: '',
          useCase: '',
          timeline: ''
        });
      }, 2000);

    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('Email capture error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle close
  const handleClose = () => {
    if (!isSubmitting) {
      setIsSubmitted(false);
      setError('');
      onClose();
    }
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${className}`}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5-1.891m0 0V15a2 2 0 012-2h6a2 2 0 012 2v3.309z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>

            {/* Selected Tools Summary */}
            {tools.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Tools to Compare:</h4>
                <div className="space-y-2">
                  {tools.map(tool => (
                    <div key={tool.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      {tool.logo && (
                        <div className="w-10 h-10 bg-white rounded-lg p-2 mr-3">
                          <img 
                            src={tool.logo} 
                            alt={`${tool.name} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{tool.name}</div>
                        <div className="text-sm text-gray-500">{tool.vendor}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email - Required */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Team Size */}
              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Team Size
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select team size</option>
                  <option value="1">Just me</option>
                  <option value="2-10">2-10 people</option>
                  <option value="11-50">11-50 people</option>
                  <option value="51-200">51-200 people</option>
                  <option value="201+">201+ people</option>
                </select>
              </div>

              {/* Use Case */}
              <div>
                <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Use Case
                </label>
                <select
                  id="useCase"
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select primary use case</option>
                  <option value="content-creation">Content Creation</option>
                  <option value="customer-support">Customer Support</option>
                  <option value="development">Software Development</option>
                  <option value="research">Research & Analysis</option>
                  <option value="marketing">Marketing & Sales</option>
                  <option value="education">Education & Training</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Timeline */}
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                  Implementation Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select timeline</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="3-months">Within 3 months</option>
                  <option value="6-months">Within 6 months</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.email}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Get Comparison'}
                </button>
              </div>
            </form>

            {/* Privacy Note */}
            <p className="text-xs text-gray-500 text-center mt-4">
              We'll send you a detailed comparison report and occasional updates about AI tools. 
              Unsubscribe anytime. View our <a href="/privacy" className="text-blue-600 hover:underline">privacy policy</a>.
            </p>
          </>
        ) : (
          /* Success State */
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Report Requested Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              We'll create your custom comparison report and send it to your email within 24 hours.
            </p>
            
            {/* What's Next */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <h4 className="font-medium text-blue-900 mb-2">What happens next:</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>✓ We'll analyze the tools you selected</li>
                <li>✓ Create a detailed comparison report</li>
                <li>✓ Include pricing recommendations for your use case</li>
                <li>✓ Send everything to your email within 24 hours</li>
              </ul>
            </div>
            
            <button
              onClick={handleClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
}