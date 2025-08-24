import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Download,
  CheckCircle,
  Users,
  TrendingUp,
  Star,
  FileText,
  Clock,
  Award,
  ArrowRight,
  Mail,
  User,
  Building,
  Briefcase,
  Shield,
  Zap
} from 'lucide-react';

export default function AIImplementationPlaybook() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    primaryGoal: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const playbookFeatures = [
    "50-page comprehensive guide to AI implementation",
    "Step-by-step implementation roadmap",
    "ROI calculation frameworks and templates",
    "Risk assessment and mitigation strategies",
    "Team training and change management guides",
    "Technology selection criteria and checklists",
    "Success metrics and KPI tracking templates",
    "Real-world case studies from 20+ companies",
    "Budget planning worksheets and cost calculators",
    "Implementation timeline templates",
    "Vendor evaluation scorecards",
    "Post-implementation optimization strategies"
  ];

  const frameworkFeatures = [
    "Comprehensive tool evaluation matrix",
    "Business requirement assessment templates",
    "Cost-benefit analysis frameworks",
    "Integration capability checklists",
    "Security and compliance evaluation criteria",
    "Scalability and performance benchmarks",
    "User experience and training considerations",
    "Vendor comparison scorecards",
    "Decision-making flowcharts",
    "Implementation readiness assessments"
  ];

  const testimonials = [
    {
      quote: "This playbook saved us months of research and helped us avoid costly mistakes. The ROI framework alone was worth downloading.",
      author: "Sarah Chen, CTO at TechCorp",
      company: "Fortune 500 Technology Company",
      result: "Reduced implementation time by 60%"
    },
    {
      quote: "The tool selection framework helped us choose the perfect AI solution for our needs. Highly recommend for any business considering AI.",
      author: "Michael Rodriguez, Operations Director",
      company: "Manufacturing Company",
      result: "Saved $200K in vendor costs"
    },
    {
      quote: "Comprehensive, practical, and immediately actionable. This is the definitive guide for AI implementation we wish we had years ago.",
      author: "Lisa Park, Innovation Manager",
      company: "Healthcare Organization",
      result: "Successful AI deployment in 3 months"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'lead_generation', {
          event_category: 'download',
          event_label: 'ai_implementation_playbook',
          value: 1
        });
      }
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <>
        <Head>
          <title>Download Complete - AI Implementation Playbook | SiteOptz</title>
          <meta name="robots" content="noindex" />
        </Head>
        
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6">
              Your Downloads Are Ready!
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              We've sent both the AI Implementation Playbook and Tool Selection Framework to <strong>{formData.email}</strong>
            </p>
            
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-gray-700 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">What's Next?</h2>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Check your email for the download links
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Review the implementation roadmap
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Start with our tool selection framework
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Schedule a free consultation if needed
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                Schedule Free Consultation
              </Link>
              <Link
                href="/case-studies"
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
              >
                View Success Stories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Free AI Implementation Playbook + Tool Selection Framework | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive 50-page AI Implementation Playbook and Tool Selection Framework. Includes ROI templates, implementation roadmaps, and vendor evaluation tools." 
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://siteoptz.ai/downloads/ai-implementation-playbook" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30 mb-6">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-cyan-400 text-sm font-medium">Downloaded by 10,000+ Business Leaders</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  The Complete AI Implementation Playbook
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Get our comprehensive 50-page playbook plus exclusive Tool Selection Framework. 
                  Everything you need to successfully implement AI in your business.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <FileText className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">50</div>
                    <div className="text-sm text-gray-400">Page Playbook</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">3-6</div>
                    <div className="text-sm text-gray-400">Months to ROI</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  {playbookFeatures.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-6 border border-green-500/30">
                  <div className="flex items-center mb-3">
                    <Award className="w-6 h-6 text-green-400 mr-3" />
                    <span className="text-green-400 font-semibold">Bonus: Tool Selection Framework</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Includes comprehensive evaluation matrix, vendor scorecards, and decision-making templates 
                    to help you choose the perfect AI tools for your business needs.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Form */}
              <div className="lg:pl-8">
                <div className="bg-black border border-gray-700 rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Download Your Free Playbook
                    </h2>
                    <p className="text-gray-400">
                      Join 10,000+ business leaders who've transformed their companies with AI
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        placeholder="john@company.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        placeholder="Your Company"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Role *
                      </label>
                      <select
                        id="role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
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
                    
                    <div>
                      <label htmlFor="teamSize" className="block text-sm font-medium text-gray-300 mb-2">
                        Team Size
                      </label>
                      <select
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      >
                        <option value="">Select team size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-1000">201-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Preparing Your Download...
                        </div>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Get My Free Playbook + Framework
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Shield className="w-4 h-4" />
                      <span>Your information is secure and will never be shared</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                What's Included in Your Download
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Two comprehensive resources designed to accelerate your AI implementation success
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Playbook */}
              <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-500/30">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">AI Implementation Playbook</h3>
                    <p className="text-blue-300">50-page comprehensive guide</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {playbookFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Framework */}
              <div className="bg-gradient-to-br from-green-600/10 to-cyan-600/10 rounded-2xl p-8 border border-green-500/30">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Tool Selection Framework</h3>
                    <p className="text-green-300">Decision-making templates & scorecards</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {frameworkFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                What Business Leaders Are Saying
              </h2>
              <p className="text-xl text-gray-300">
                Join thousands who've transformed their businesses with our resources
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-colors"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-300 mb-4 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  
                  <div className="border-t border-gray-800 pt-4">
                    <div className="text-white font-medium mb-1">{testimonial.author}</div>
                    <div className="text-gray-400 text-sm mb-2">{testimonial.company}</div>
                    <div className="inline-flex items-center px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {testimonial.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Download your free resources and start your AI implementation journey today.
            </p>
            <a
              href="#top"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Get Your Free Playbook Now
            </a>
          </div>
        </section>
      </div>
    </>
  );
}