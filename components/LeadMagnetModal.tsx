import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  X,
  Download,
  CheckCircle,
  User,
  Mail,
  Building,
  Briefcase,
  Users,
  Target,
  Shield,
  Star,
  Award
} from 'lucide-react';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceType: 'playbook' | 'framework' | 'both' | 'ai-chatbot-implementation' | 'ai-content-generation' | 'ai-data-analysis' | 'ai-healthcare-2024' | 'gpt4-turbo-business' | 'q4-2024-ai-market' | 'claude3-vs-gpt4';
  source?: string;
}

const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({ 
  isOpen, 
  onClose, 
  resourceType,
  source = 'resources_page'
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    primaryGoal: '',
    howHeard: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resourceConfig = {
    playbook: {
      title: 'AI Implementation Playbook',
      subtitle: 'Complete 50-page implementation guide',
      description: 'Get our comprehensive playbook with step-by-step roadmaps, ROI calculators, and proven strategies.',
      benefits: [
        '50-page comprehensive implementation guide',
        'Step-by-step roadmap and timeline templates',
        'ROI calculation frameworks and worksheets',
        'Risk assessment and mitigation strategies',
        'Real case studies from 20+ companies'
      ],
      downloadUrl: '/downloads/ai-implementation-playbook',
      color: 'blue'
    },
    framework: {
      title: 'AI Tool Selection Framework',
      subtitle: 'Smart tool selection in 5 steps',
      description: 'Choose the perfect AI tools with our proven evaluation framework and vendor comparison templates.',
      benefits: [
        '20+ evaluation criteria across 5 categories',
        'Weighted scoring system and templates',
        'Cost-benefit analysis calculators',
        'Vendor comparison scorecards',
        'Common mistakes and success tips'
      ],
      downloadUrl: '/downloads/ai-tool-selection-framework',
      color: 'green'
    },
    both: {
      title: 'Complete AI Success Bundle',
      subtitle: 'Playbook + Framework combo',
      description: 'Get both resources: complete implementation guidance plus smart tool selection framework.',
      benefits: [
        'AI Implementation Playbook (50+ pages)',
        'Tool Selection Framework with templates',
        'Combined ROI calculators and worksheets',
        'Comprehensive vendor evaluation tools',
        'Complete success methodology'
      ],
      downloadUrl: '/downloads/ai-implementation-playbook',
      color: 'purple'
    },
    'ai-chatbot-implementation': {
      title: 'AI Chatbot Implementation Guide',
      subtitle: '35-page comprehensive guide',
      description: 'Learn how to implement AI chatbots from strategy to deployment with real-world case studies.',
      benefits: [
        'Complete implementation roadmap',
        'Platform selection and comparison',
        'Integration best practices',
        'ROI measurement frameworks',
        'Real success stories and case studies'
      ],
      downloadUrl: '/guides/ai-chatbot-implementation',
      color: 'blue'
    },
    'ai-content-generation': {
      title: 'AI Content Generation Guide',
      subtitle: 'Best practices and tools',
      description: 'Master AI content creation with proven strategies, tool comparisons, and quality frameworks.',
      benefits: [
        'Content strategy development',
        'Tool comparison and selection',
        'Quality control frameworks',
        'SEO optimization techniques',
        'Workflow integration guides'
      ],
      downloadUrl: '/guides/ai-content-generation',
      color: 'green'
    },
    'ai-data-analysis': {
      title: 'AI Data Analysis Roadmap',
      subtitle: 'Beginner to expert guide',
      description: 'Transform your data analysis workflow with AI tools and proven methodologies.',
      benefits: [
        'Data analysis fundamentals',
        'Tool selection criteria',
        'Implementation timeline',
        'Automation workflows',
        'Performance optimization'
      ],
      downloadUrl: '/guides/ai-data-analysis',
      color: 'blue'
    },
    'ai-healthcare-2024': {
      title: 'State of AI in Healthcare 2024',
      subtitle: 'Industry report with ROI data',
      description: 'Comprehensive analysis of AI adoption in healthcare with data from 200+ institutions.',
      benefits: [
        'Market analysis and trends',
        'ROI data from 200+ hospitals',
        'Implementation case studies',
        'Regulatory compliance guide',
        'Future predictions and opportunities'
      ],
      downloadUrl: '/reports/ai-healthcare-2024',
      color: 'purple'
    },
    'gpt4-turbo-business': {
      title: 'GPT-4 Turbo Business Guide',
      subtitle: 'Complete implementation guide',
      description: 'Master GPT-4 Turbo implementation with cost analysis and proven deployment strategies.',
      benefits: [
        'GPT-4 Turbo features overview',
        'Business use cases and applications',
        'Implementation strategy roadmap',
        'Cost analysis and ROI calculations',
        'Performance optimization tips'
      ],
      downloadUrl: '/guides/gpt4-turbo-business',
      color: 'green'
    },
    'q4-2024-ai-market': {
      title: 'Q4 2024 AI Market Analysis',
      subtitle: 'Latest market research',
      description: 'Latest market research on AI tools landscape, trends, and growth projections.',
      benefits: [
        'Market size and growth data',
        'Competitive landscape analysis',
        'Investment and funding trends',
        'Emerging technologies overview',
        '2025 predictions and opportunities'
      ],
      downloadUrl: '/reports/q4-2024-ai-market',
      color: 'blue'
    },
    'claude3-vs-gpt4': {
      title: 'Claude 3 vs GPT-4 Comparison',
      subtitle: 'Detailed analysis report',
      description: 'Detailed comparison analysis to help you choose the right AI model for your needs.',
      benefits: [
        'Performance benchmarks and testing',
        'Feature comparison matrix',
        'Cost analysis and pricing',
        'Use case recommendations',
        'Implementation guidelines'
      ],
      downloadUrl: '/downloads/ai-implementation-playbook',
      color: 'purple'
    }
  };

  const config = resourceConfig[resourceType];
  const colorClasses = {
    blue: {
      gradient: 'from-blue-600 to-purple-600',
      border: 'border-blue-500/30',
      bg: 'from-blue-600/20 to-purple-600/20',
      text: 'text-blue-400',
      button: 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
    },
    green: {
      gradient: 'from-green-600 to-cyan-600',
      border: 'border-green-500/30',
      bg: 'from-green-600/20 to-cyan-600/20',
      text: 'text-green-400',
      button: 'from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700'
    },
    purple: {
      gradient: 'from-purple-600 to-pink-600',
      border: 'border-purple-500/30',
      bg: 'from-purple-600/20 to-pink-600/20',
      text: 'text-purple-400',
      button: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
    }
  };

  const colors = colorClasses[config.color as keyof typeof colorClasses];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.role) newErrors.role = 'Role is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Call the actual API endpoint to send emails
      const response = await fetch('/api/download-resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          companySize: formData.teamSize || 'Not specified',
          primaryInterest: resourceType,
          resourceType: resourceType,
          timeline: 'Not specified',
          marketingConsent: false,
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || `Server error: ${response.status}`);
      }

      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'lead_generation', {
          event_category: 'download',
          event_label: `${resourceType}_${source}`,
          value: 1
        });
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        role: '',
        teamSize: '',
        primaryGoal: '',
        howHeard: ''
      });
      setErrors({});
      setIsSubmitted(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={handleClose}
        onKeyDown={(e) => e.key === 'Escape' && handleClose()}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      ></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="overflow-y-auto max-h-[90vh]">
            {isSubmitted ? (
              // Success State
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  Your Download Is Ready!
                </h2>
                
                <p className="text-xl text-gray-300 mb-6">
                  We&apos;ve sent the {config.title} to <strong>{formData.email}</strong>
                </p>
                
                <div className={`bg-gradient-to-r ${colors.bg} rounded-xl p-6 border ${colors.border} mb-8`}>
                  <h3 className="text-lg font-semibold text-white mb-4">What&apos;s Next?</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-sm">Check your email for the download link</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-sm">Review the implementation strategies</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-sm">Schedule a free consultation if needed</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className={`px-6 py-3 bg-gradient-to-r ${colors.button} text-white font-semibold rounded-lg transition-colors flex items-center justify-center`}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Schedule Free Consultation
                  </Link>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Continue Reading
                  </button>
                </div>
              </div>
            ) : (
              // Form State
              <div className="grid lg:grid-cols-2">
                {/* Left side - Resource info */}
                <div className={`bg-gradient-to-br ${colors.bg} p-8 border-r border-gray-800`}>
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className={`${colors.text} text-sm font-medium`}>
                      {resourceType === 'both' ? '15,000+' : resourceType === 'playbook' ? '10,000+' : '8,500+'} Downloads
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {config.title}
                  </h2>
                  
                  <p className={`${colors.text} text-sm font-medium mb-4`}>
                    {config.subtitle}
                  </p>
                  
                  <p className="text-gray-300 mb-6">
                    {config.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {config.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`bg-gradient-to-r ${colors.border} bg-opacity-20 rounded-lg p-4 border`}>
                    <div className="flex items-center mb-2">
                      <Award className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-yellow-400 font-semibold text-sm">Proven Results</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Companies using our frameworks achieve 60% faster implementation and $200K+ average savings.
                    </div>
                  </div>
                </div>
                
                {/* Right side - Form */}
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Get Your Free Download
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Join thousands of business leaders transforming with AI
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
                              errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : `border-gray-600 ${colors.text.replace('text-', 'focus:border-')} ${colors.text.replace('text-', 'focus:ring-')}`
                            }`}
                            placeholder="John"
                          />
                        </div>
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2.5 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
                            errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : `border-gray-600 ${colors.text.replace('text-', 'focus:border-')} ${colors.text.replace('text-', 'focus:ring-')}`
                          }`}
                          placeholder="Smith"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Business Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
                            errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : `border-gray-600 ${colors.text.replace('text-', 'focus:border-')} ${colors.text.replace('text-', 'focus:ring-')}`
                          }`}
                          placeholder="john@company.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                        Company *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
                            errors.company ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : `border-gray-600 ${colors.text.replace('text-', 'focus:border-')} ${colors.text.replace('text-', 'focus:ring-')}`
                          }`}
                          placeholder="Your Company"
                        />
                      </div>
                      {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Role *
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                          id="role"
                          name="role"
                          required
                          value={formData.role}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-1 ${
                            errors.role ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : `border-gray-600 ${colors.text.replace('text-', 'focus:border-')} ${colors.text.replace('text-', 'focus:ring-')}`
                          }`}
                        >
                          <option value="">Select your role</option>
                          <option value="ceo">CEO/Founder</option>
                          <option value="cto">CTO/Technology Leader</option>
                          <option value="coo">COO/Operations</option>
                          <option value="vp">VP/Director</option>
                          <option value="manager">Manager</option>
                          <option value="consultant">Consultant</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="teamSize" className="block text-sm font-medium text-gray-300 mb-1">
                          Team Size
                        </label>
                        <select
                          id="teamSize"
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-1 ${colors.text.replace('text-', 'focus:border-')} ${colors.text.replace('text-', 'focus:ring-')}`}
                        >
                          <option value="">Select size</option>
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-1000">201-1000</option>
                          <option value="1000+">1000+</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="primaryGoal" className="block text-sm font-medium text-gray-300 mb-1">
                          Primary Goal
                        </label>
                        <select
                          id="primaryGoal"
                          name="primaryGoal"
                          value={formData.primaryGoal}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-1 ${colors.text.replace('text-', 'focus:border-')} ${colors.text.replace('text-', 'focus:ring-')}`}
                        >
                          <option value="">Select goal</option>
                          <option value="reduce-costs">Reduce costs</option>
                          <option value="increase-productivity">Increase productivity</option>
                          <option value="improve-customer-experience">Improve customer experience</option>
                          <option value="automate-processes">Automate processes</option>
                          <option value="gain-insights">Gain insights from data</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-3 bg-gradient-to-r ${colors.button} text-white font-semibold rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Preparing Download...
                        </div>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Get My Free {resourceType === 'both' ? 'Bundle' : resourceType === 'playbook' ? 'Playbook' : 'Framework'}
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 pt-2">
                      <Shield className="w-3 h-3" />
                      <span>Secure • No spam • Unsubscribe anytime</span>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnetModal;