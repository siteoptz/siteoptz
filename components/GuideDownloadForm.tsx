import React, { useState } from 'react';
import { trackGuideDownload, trackLeadMagnetDownload } from '../utils/key-events-tracker';

interface GuideData {
  title: string;
  fileName: string;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'zip';
  fileSize?: string;
  category: 'guide' | 'ebook' | 'template' | 'checklist' | 'toolkit' | 'whitepaper';
  topic: string;
  description?: string;
  downloadUrl: string;
  gated?: boolean;
}

interface GuideDownloadFormProps {
  guide: GuideData;
  source?: string;
  toolContext?: string;
  referrer?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  className?: string;
  compact?: boolean;
}

const GuideDownloadForm: React.FC<GuideDownloadFormProps> = ({
  guide,
  source = 'website',
  toolContext,
  referrer,
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
    useCase: '',
    teamSize: '',
    interests: [] as string[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const useCases = [
    'Team Training',
    'Process Improvement',
    'Strategic Planning',
    'Client Presentations',
    'Internal Analysis',
    'Research & Development'
  ];

  const interests = [
    'AI Implementation',
    'Cost Optimization',
    'Productivity Tools',
    'Marketing Automation',
    'Data Analysis',
    'Workflow Optimization'
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

    if (!compact && !formData.useCase) {
      newErrors.useCase = 'Please select how you plan to use this guide';
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
      // Track guide download
      trackGuideDownload(
        guide.fileName,
        source,
        toolContext,
        {
          fileType: guide.fileType,
          fileSize: guide.fileSize,
          category: guide.category,
          topic: guide.topic,
          gated: guide.gated || false,
          emailRequired: true,
          email: formData.email,
          method: 'form_fill'
        }
      );

      // Track as lead magnet if it's gated content
      if (guide.gated) {
        trackLeadMagnetDownload(
          guide.title,
          formData.email,
          {
            type: guide.category,
            value: getContentValue(guide.category),
            stage: 'awareness',
            source,
            name: formData.name,
            company: formData.company,
            trigger: 'form_submit'
          }
        );
      }

      // Submit to your backend
      const response = await fetch('/api/guide-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guide: {
            title: guide.title,
            fileName: guide.fileName,
            category: guide.category,
            topic: guide.topic
          },
          user: formData,
          source,
          toolContext,
          referrer,
          downloadDate: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Download request failed');
      }

      const result = await response.json();
      
      // Trigger download
      if (guide.downloadUrl) {
        const link = document.createElement('a');
        link.href = guide.downloadUrl;
        link.download = guide.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      setIsDownloaded(true);
      onSuccess?.(result);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Download failed';
      setErrors({ submit: errorMessage });
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getContentValue = (category: string) => {
    const values = {
      ebook: 15,
      guide: 12,
      template: 8,
      checklist: 5,
      toolkit: 20,
      whitepaper: 18
    };
    return values[category as keyof typeof values] || 10;
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

  const getFileIcon = (fileType: string) => {
    const icons = {
      pdf: (
        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 18h12V6l-4-4H4v16zm8-14l2 2h-2V4z"/>
        </svg>
      ),
      docx: (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 2h8l4 4v12H4V2zm8 2v2h2l-2-2z"/>
        </svg>
      ),
      xlsx: (
        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 2h8l4 4v12H4V2zm8 2v2h2l-2-2z"/>
        </svg>
      ),
      zip: (
        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 2h8l4 4v12H4V2zm8 2v2h2l-2-2z"/>
        </svg>
      )
    };
    return icons[fileType as keyof typeof icons] || icons.pdf;
  };

  if (isDownloaded) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">
          Download Started! 📥
        </h3>
        <p className="text-green-800 mb-4">
          Your download of "{guide.title}" should begin automatically.
        </p>
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>What's next?</strong>
          </p>
          <div className="space-y-1 text-sm text-gray-700">
            <p>• Check your downloads folder for the file</p>
            <p>• Watch your email for additional resources</p>
            <p>• Join our newsletter for more AI insights</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsDownloaded(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              role: '',
              useCase: '',
              teamSize: '',
              interests: []
            });
          }}
          className="text-green-600 hover:text-green-800 text-sm font-medium"
        >
          Download Another Resource
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 ${className}`}>
      <div className="mb-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0">
            {getFileIcon(guide.fileType)}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {guide.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {guide.description}
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {guide.category.toUpperCase()}
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {guide.fileType.toUpperCase()}
              </span>
              {guide.fileSize && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {guide.fileSize}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-800 text-sm">
            <strong>Free Download:</strong> Get instant access to this {guide.category} and join 50,000+ professionals getting AI insights.
          </p>
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
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Your name"
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
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role (Optional)
                </label>
                <input
                  type="text"
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your role"
                />
              </div>
            </div>

            <div>
              <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-1">
                How will you use this {guide.category}? *
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
                <option value="">Select use case</option>
                {useCases.map(useCase => (
                  <option key={useCase} value={useCase}>{useCase}</option>
                ))}
              </select>
              {errors.useCase && <p className="text-red-600 text-sm mt-1">{errors.useCase}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What else interests you? (Optional)
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
              Preparing Download...
            </span>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Download {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By downloading, you'll also receive our weekly AI insights newsletter. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};

export default GuideDownloadForm;