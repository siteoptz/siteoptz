import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Download,
  CheckCircle,
  Users,
  TrendingUp,
  Star,
  Zap,
  Target,
  Award,
  ArrowRight,
  Mail,
  User,
  Building,
  Briefcase,
  Shield,
  BarChart3,
  FileText,
  Search
} from 'lucide-react';

export default function AIToolSelectionFramework() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    currentChallenge: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const frameworkComponents = [
    "Business Requirements Assessment Template",
    "AI Use Case Prioritization Matrix",
    "Vendor Evaluation Scorecard (20+ criteria)",
    "Cost-Benefit Analysis Calculator",
    "Technical Integration Checklist",
    "Security & Compliance Evaluation Guide",
    "Implementation Timeline Planner",
    "ROI Projection Worksheets",
    "Pilot Program Planning Template",
    "Success Metrics Definition Framework"
  ];

  const evaluationCriteria = [
    {
      category: "Functionality",
      criteria: ["Feature completeness", "Accuracy & performance", "Customization options", "API capabilities"]
    },
    {
      category: "Business Fit",
      criteria: ["Industry alignment", "Use case match", "Scalability potential", "Integration ease"]
    },
    {
      category: "Technical",
      criteria: ["Architecture compatibility", "Data requirements", "Security features", "Performance benchmarks"]
    },
    {
      category: "Commercial",
      criteria: ["Pricing model", "Total cost of ownership", "Contract terms", "Support quality"]
    }
  ];

  const successStories = [
    {
      company: "Manufacturing Corp",
      challenge: "Needed AI for quality control",
      result: "Selected perfect computer vision solution",
      savings: "$500K annually",
      timeToValue: "2 months"
    },
    {
      company: "FinTech Startup",
      challenge: "Choosing fraud detection AI",
      result: "Found cost-effective solution",
      savings: "$200K in licensing",
      timeToValue: "6 weeks"
    },
    {
      company: "Retail Chain",
      challenge: "AI for inventory optimization",
      result: "Implemented scalable solution",
      savings: "$1.2M inventory reduction",
      timeToValue: "4 months"
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
          event_label: 'ai_tool_selection_framework',
          value: 1
        });
      }
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <>
        <Head>
          <title>Download Complete - AI Tool Selection Framework | SiteOptz</title>
          <meta name="robots" content="noindex" />
        </Head>
        
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6">
              Your Framework Is Ready!
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              We&apos;ve sent the AI Tool Selection Framework to <strong>{formData.email}</strong>
            </p>
            
            <div className="bg-gradient-to-r from-green-600/20 to-cyan-600/20 rounded-2xl p-8 border border-gray-700 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">What You&apos;ll Get:</h2>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Evaluation scorecards for 20+ criteria
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Cost-benefit analysis templates
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Implementation planning guides
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  ROI calculation worksheets
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/downloads/ai-implementation-playbook"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Get Implementation Playbook Too
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
              >
                Schedule Consultation
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
        <title>Free AI Tool Selection Framework - Choose the Right AI Solution | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive AI Tool Selection Framework. Includes vendor evaluation scorecards, decision matrices, and cost-benefit analysis templates to choose the perfect AI solution." 
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://siteoptz.ai/downloads/ai-tool-selection-framework" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600/20 to-cyan-600/20 rounded-full border border-green-500/30 mb-6">
                  <Award className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-green-400 text-sm font-medium">Used by 8,500+ Companies</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  AI Tool Selection Framework
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Stop wasting time and money on the wrong AI tools. Our proven framework 
                  helps you evaluate, compare, and select the perfect AI solution for your business needs.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">20+</div>
                    <div className="text-sm text-gray-400">Evaluation Criteria</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <BarChart3 className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">5-Step</div>
                    <div className="text-sm text-gray-400">Selection Process</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  {frameworkComponents.slice(0, 6).map((component, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{component}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center mb-3">
                    <Star className="w-6 h-6 text-yellow-400 mr-3" />
                    <span className="text-yellow-400 font-semibold">Average Results</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white font-bold text-lg">60%</div>
                      <div className="text-gray-300">Faster tool selection</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">$200K+</div>
                      <div className="text-gray-300">Average cost savings</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Form */}
              <div className="lg:pl-8">
                <div className="bg-black border border-gray-700 rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Get Your Free Framework
                    </h2>
                    <p className="text-gray-400">
                      Join 8,500+ companies making smarter AI tool decisions
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
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
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
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
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
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
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
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
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
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
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
                      <label htmlFor="currentChallenge" className="block text-sm font-medium text-gray-300 mb-2">
                        Primary AI Challenge
                      </label>
                      <select
                        id="currentChallenge"
                        name="currentChallenge"
                        value={formData.currentChallenge}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                      >
                        <option value="">Select primary challenge</option>
                        <option value="too-many-options">Too many AI tools to choose from</option>
                        <option value="budget-constraints">Limited budget/resources</option>
                        <option value="integration-concerns">Integration complexity</option>
                        <option value="roi-uncertainty">Uncertain about ROI</option>
                        <option value="team-readiness">Team not ready for AI</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Preparing Your Framework...
                        </div>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Download Free Framework
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Shield className="w-4 h-4" />
                      <span>Secure download • No spam • Unsubscribe anytime</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Framework Breakdown */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Complete Evaluation Framework
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our systematic approach covers every aspect of AI tool selection
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {evaluationCriteria.map((category, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-green-400 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">{category.category}</h3>
                  <div className="space-y-2">
                    {category.criteria.map((criterion, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-400">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Framework Success Stories
              </h2>
              <p className="text-xl text-gray-300">
                See how companies used our framework to make better AI decisions
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-600/10 to-cyan-600/10 rounded-xl p-6 border border-green-500/30 hover:border-green-400 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{story.company}</h3>
                  <p className="text-gray-400 text-sm mb-4">{story.challenge}</p>
                  <p className="text-green-400 mb-4">{story.result}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-black/50 rounded-lg p-3">
                      <div className="text-white font-bold">{story.savings}</div>
                      <div className="text-gray-400 text-xs">Saved</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3">
                      <div className="text-white font-bold">{story.timeToValue}</div>
                      <div className="text-gray-400 text-xs">Time to Value</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Components */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Complete Framework Contents
              </h2>
            </div>
            
            <div className="bg-black border border-gray-800 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {frameworkComponents.map((component, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{component}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-green-900/50 to-cyan-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stop Guessing, Start Selecting Smart
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Download the framework that&apos;s helped 8,500+ companies choose the right AI tools.
            </p>
            <a
              href="#top"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Get Your Free Framework
            </a>
          </div>
        </section>
      </div>
    </>
  );
}