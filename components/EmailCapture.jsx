import React, { useState } from 'react';

const EmailCapture = ({ 
  toolName = null, 
  category = null, 
  leadMagnetTitle = null,
  leadMagnetDescription = null,
  downloadUrl = null 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    useCase: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Generate content based on props
  const generateContent = () => {
    if (toolName) {
      return {
        title: `Get Your Free ${toolName} Comparison Guide`,
        description: `Download our comprehensive ${toolName} comparison guide with pricing analysis, feature breakdowns, and real user reviews. Plus get exclusive tips and strategies.`,
        downloadText: `Download ${toolName} Guide`,
        fileName: `${toolName.toLowerCase().replace(/\s+/g, '-')}-comparison-guide.pdf`
      };
    } else if (category) {
      return {
        title: `Get Your Free ${category} AI Tools Guide`,
        description: `Download our comprehensive guide to the best ${category} AI tools in 2025. Includes pricing comparisons, feature analysis, and implementation strategies.`,
        downloadText: `Download ${category} Guide`,
        fileName: `${category.toLowerCase().replace(/\s+/g, '-')}-ai-tools-guide.pdf`
      };
    } else {
      return {
        title: leadMagnetTitle || "Get Your Free AI Tools Comparison Guide",
        description: leadMagnetDescription || "Download our comprehensive guide to the best AI tools in 2025. Includes pricing comparisons, feature analysis, and implementation strategies.",
        downloadText: "Download Free Guide",
        fileName: "ai-tools-comparison-guide.pdf"
      };
    }
  };

  const content = generateContent();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Track conversion
      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'email_capture',
          event_label: content.fileName,
          value: 1
        });
      }

      // Store email in localStorage for tracking
      const subscribers = JSON.parse(localStorage.getItem('aiToolsSubscribers') || '[]');
      subscribers.push({
        email: formData.email,
        name: formData.name,
        company: formData.company,
        useCase: formData.useCase,
        toolName,
        category,
        date: new Date().toISOString()
      });
      localStorage.setItem('aiToolsSubscribers', JSON.stringify(subscribers));

      setIsSubmitted(true);
      
      // Trigger download
      if (downloadUrl) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = content.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h3 className="text-xl font-semibold text-green-900 mb-2">
          Thank You!
        </h3>
        <p className="text-green-700 mb-4">
          Your guide has been sent to {formData.email}. Check your inbox and spam folder.
        </p>
        <div className="bg-white rounded-lg p-4 mb-4">
          <h4 className="font-medium text-gray-900 mb-2">What&apos;s Next?</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check your email for the download link</li>
            <li>• Follow us on social media for AI tool updates</li>
            <li>• Get notified when we publish new comparisons</li>
          </ul>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-green-600 hover:text-green-800 text-sm font-medium"
        >
          Submit another email
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-xl p-8 text-white">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-3xl font-bold mb-4">
            {content.title}
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Company (Optional)
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Primary Use Case
              </label>
              <select
                value={formData.useCase}
                onChange={(e) => handleInputChange('useCase', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-0 text-gray-900 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                <option value="general">General AI Tools</option>
                <option value="content-creation">Content Creation</option>
                <option value="seo-optimization">SEO & Optimization</option>
                <option value="social-media">Social Media</option>
                <option value="email-marketing">Email Marketing</option>
                <option value="visual-content">Visual Content</option>
                <option value="analytics">Analytics & Data</option>
                <option value="automation">Marketing Automation</option>
              </select>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-blue-500 bg-opacity-30 rounded-lg p-4">
            <h4 className="font-medium text-blue-100 mb-3">What You&apos;ll Get:</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Comprehensive pricing comparison
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Feature-by-feature analysis
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Real user reviews and ratings
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Implementation strategies
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Exclusive tips and best practices
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                {content.downloadText}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            )}
          </button>

          {/* Privacy Notice */}
          <p className="text-xs text-blue-200 text-center">
            By downloading this guide, you agree to receive occasional emails about AI tools and marketing tips. 
            You can unsubscribe at any time. We respect your privacy.
          </p>
        </form>

        {/* Social Proof */}
        <div className="mt-8 text-center">
          <p className="text-blue-200 text-sm mb-3">Trusted by 10,000+ marketers and businesses</p>
          <div className="flex justify-center space-x-4 text-blue-200">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★★★★★</span>
              <span className="text-sm">4.9/5 rating</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm">📧 50,000+ downloads</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCapture;

