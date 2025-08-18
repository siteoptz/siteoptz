import React, { useState } from 'react';
import { X, Download, CheckCircle, Building2, Users, TrendingUp, Shield } from 'lucide-react';

interface GuideDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (data: FormData) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  companySize: string;
  primaryInterest: string;
  timeline: string;
  marketingConsent: boolean;
}

export default function GuideDownloadModal({ isOpen, onClose, onDownload }: GuideDownloadModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    companySize: '',
    primaryInterest: '',
    timeline: '',
    marketingConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/download-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to process request');
      }
      
      await response.json();
      
      // Track successful download
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'guide_download', {
          event_category: 'Lead Generation',
          event_label: 'AI Tools Comparison Guide',
          value: 1,
          custom_parameters: {
            company_size: formData.companySize,
            role: formData.role,
            primary_interest: formData.primaryInterest,
            timeline: formData.timeline,
          }
        });
      }
      
      onDownload(formData);
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
          companySize: '',
          primaryInterest: '',
          timeline: '',
          marketingConsent: false,
        });
      }, 4000);
      
    } catch (error) {
      console.error('Error downloading guide:', error);
      setIsSubmitting(false);
      alert('Sorry, there was an error processing your request. Please try again or contact support.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity" 
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onClose();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close modal"
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white p-6 rounded-t-xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-light">Download Strategic Intelligence Report</h2>
                <p className="text-sm opacity-75 mt-1">Enterprise AI Tools Landscape 2025</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <Building2 className="w-6 h-6 mx-auto mb-1 opacity-60" />
                <div className="text-xs opacity-75">45 Pages</div>
              </div>
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-1 opacity-60" />
                <div className="text-xs opacity-75">200+ Tools</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-1 opacity-60" />
                <div className="text-xs opacity-75">ROI Models</div>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-1 opacity-60" />
                <div className="text-xs opacity-75">Risk Analysis</div>
              </div>
            </div>
          </div>
          
          {/* Success State */}
          {isSuccess ? (
            <div className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Success!</h3>
              <p className="text-gray-600 mb-4">Your download will begin shortly.</p>
              <p className="text-sm text-gray-500">Check your email for the complete guide.</p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="p-6">
              <p className="text-gray-600 mb-6">
                Get instant access to our comprehensive AI tools analysis, including detailed vendor comparisons, 
                implementation roadmaps, and ROI calculators.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Role</option>
                    <option value="C-Suite">C-Suite Executive</option>
                    <option value="VP/Director">VP/Director</option>
                    <option value="Manager">Manager</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Size *
                  </label>
                  <select
                    required
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Size</option>
                    <option value="1-50">1-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1,000 employees</option>
                    <option value="1001-5000">1,001-5,000 employees</option>
                    <option value="5001+">5,001+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Implementation Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Timeline</option>
                    <option value="Immediate">Immediate (&lt; 3 months)</option>
                    <option value="Short">3-6 months</option>
                    <option value="Medium">6-12 months</option>
                    <option value="Long">12+ months</option>
                    <option value="Exploring">Just exploring</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Interest Area
                </label>
                <select
                  value={formData.primaryInterest}
                  onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Interest</option>
                  <option value="Content Generation">Content Generation</option>
                  <option value="Code Development">Code Development</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Process Automation">Process Automation</option>
                  <option value="General AI Strategy">General AI Strategy</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                    className="mt-1 mr-2"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to receive strategic insights and updates about AI tools and best practices. 
                    You can unsubscribe at any time.
                  </span>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Your information is secure and will never be shared.
                </p>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download Guide
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}