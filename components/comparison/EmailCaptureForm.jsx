import React, { useState } from 'react';
import { CheckCircle, Mail, Download } from 'lucide-react';

export default function EmailCaptureForm({ tool = null, category = null }) {
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
    if (tool) {
      return {
        title: `Get Your Free ${tool.name} Comparison Guide`,
        description: `Download our comprehensive ${tool.name} comparison guide with pricing analysis, feature breakdowns, and real user reviews. Plus get exclusive tips and strategies.`,
        downloadText: `Download ${tool.name} Guide`,
        fileName: `${tool.name.toLowerCase().replace(/\s+/g, '-')}-comparison-guide.pdf`
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
        title: "Get Your Free AI Tools Comparison Guide",
        description: "Download our comprehensive guide to the best AI tools in 2025. Includes pricing comparisons, feature analysis, and implementation strategies.",
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
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          company: formData.company,
          useCase: formData.useCase,
          toolName: tool?.name,
          category,
          source: 'comparison_page'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      // Track conversion
      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'email_capture',
          event_label: content.fileName,
          value: 1
        });
      }

      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        email: '',
        name: '',
        company: '',
        useCase: 'general'
      });

    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Subscription error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
        <div className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-900 mb-2">
            Thank You!
          </h3>
          <p className="text-green-700 mb-6">
            Your guide has been sent to your email. Check your inbox (and spam folder) for the download link.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Get Another Guide
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
      <div className="text-center pb-4 p-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {content.title}
        </h2>
        <p className="text-gray-600">
          {content.description}
        </p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-gray-700 block">
              Company (Optional)
            </label>
            <input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Enter your company name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="useCase" className="text-sm font-medium text-gray-700 block">
              Primary Use Case
            </label>
            <select
              value={formData.useCase}
              onChange={(e) => handleInputChange('useCase', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="content-creation">Content Creation</option>
              <option value="seo">SEO & Marketing</option>
              <option value="social-media">Social Media</option>
              <option value="productivity">Productivity</option>
              <option value="development">Development</option>
              <option value="general">General AI Assistance</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2 justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center">
                <Download className="w-4 h-4" />
                {content.downloadText}
              </div>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By subscribing, you agree to receive our newsletter and marketing emails. 
            You can unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}
