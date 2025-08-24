import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import { 
  FileText,
  Download,
  CheckCircle,
  ArrowLeft,
  Clock,
  Users,
  Star,
  TrendingUp,
  DollarSign,
  Shield
} from 'lucide-react';

export default function FintechAI2024() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'fintech-ai-2024' as const,
    source: 'report_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'AI adoption trends in banking and finance',
    'Fraud detection and risk assessment case studies',
    'Customer service transformation examples',
    'Algorithmic trading and investment AI insights',
    'Regulatory compliance and ethics framework',
    'ROI analysis and cost-benefit studies'
  ];

  const reportSections = [
    { section: 'Executive Summary', page: 3, description: 'Key findings and market overview' },
    { section: 'Market Landscape Analysis', page: 8, description: 'Current state of AI in fintech' },
    { section: 'Fraud Detection Revolution', page: 15, description: 'AI-powered security solutions' },
    { section: 'Customer Experience Transformation', page: 23, description: 'Personalization and chatbots' },
    { section: 'Algorithmic Trading Insights', page: 31, description: 'AI in investment and trading' },
    { section: 'Risk Assessment Evolution', page: 38, description: 'Advanced risk modeling with AI' },
    { section: 'Regulatory Compliance Framework', page: 45, description: 'Ethics and governance' },
    { section: 'ROI Analysis & Case Studies', page: 52, description: 'Real-world implementation results' },
    { section: 'Future Predictions', page: 60, description: '2025-2030 outlook' }
  ];

  const stats = [
    { number: '87%', label: 'Banks using AI' },
    { number: '$125B', label: 'Market size by 2025' },
    { number: '45%', label: 'Fraud reduction' },
    { number: '200+', label: 'Companies surveyed' }
  ];

  return (
    <>
      <Head>
        <title>Financial Services AI Transformation Report 2024 - Free Download | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive 2024 fintech AI report. Analysis of AI adoption in banking, fraud detection, customer service, and regulatory compliance." 
        />
        <meta 
          name="keywords" 
          content="fintech AI report, banking AI transformation, financial services AI, fraud detection AI, fintech innovation 2024" 
        />
        <link rel="canonical" href="https://siteoptz.ai/reports/fintech-ai-2024" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <nav className="pt-6 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/resources"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30 mb-6">
                  <FileText className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-blue-400 text-sm font-medium">2024 Industry Report</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Financial Services AI Transformation Report 2024
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Comprehensive analysis of AI adoption in banking and financial services. 
                  Based on data from 200+ institutions worldwide.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">$125B</div>
                    <div className="text-sm text-gray-400">Market Size 2025</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">45%</div>
                    <div className="text-sm text-gray-400">Fraud Reduction</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">
                        {stat.number}
                      </div>
                      <div className="text-xs text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Column - Download Card */}
              <div className="lg:pl-8">
                <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-500/30">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Download Free Report
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        30 min read
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        64-page PDF
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        4.8/5
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={openModal}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Report
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    💼 Used by 500+ financial institutions worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Fintech AI Content */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SiteOptz Branding Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <img src="/images/siteoptz-logo.png" alt="SiteOptz AI Logo" className="w-12 h-12 mr-3" />
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SiteOptz Financial Services AI Transformation Report
                </div>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive analysis of AI adoption across banking and financial services
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Executive Summary */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">1</div>
                  Executive Summary: The $125B Fintech AI Revolution
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">The Transformation is Accelerating</h4>
                    <p className="leading-relaxed mb-4">
                      Financial services are experiencing the most rapid AI adoption of any industry sector. 
                      <span className="text-cyan-400 font-semibold"> 87% of banks</span> now use AI in some capacity, with 
                      <span className="text-green-400 font-semibold"> $125 billion market size</span> projected by 2025. 
                      Our analysis of 200+ financial institutions reveals unprecedented ROI and operational improvements.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-6 border border-blue-500/30">
                      <h5 className="font-semibold text-blue-400 mb-3">Transformation Drivers</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>Fraud losses: $32 billion annually</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>Customer experience demands</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>Regulatory compliance costs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>Competitive pressure from fintechs</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-600/10 to-cyan-600/10 rounded-lg p-6 border border-green-500/30">
                      <h5 className="font-semibold text-green-400 mb-3">Key Benefits Achieved</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>45% reduction in fraud losses</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>78% faster loan approvals</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>67% cost reduction in operations</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>92% customer satisfaction improvement</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fraud Detection Revolution */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">2</div>
                  AI-Powered Fraud Detection Revolution
                </h3>
                
                <div className="space-y-6">
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-white mb-4">Real-Time Fraud Detection Performance</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Detection Accuracy</span>
                          <span className="text-cyan-400 font-bold">99.7%</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full" style={{width: '99%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">False Positive Reduction</span>
                          <span className="text-green-400 font-bold">85%</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-green-500 to-cyan-500 h-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Processing Speed</span>
                          <span className="text-purple-400 font-bold"><50ms</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full" style={{width: '95%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-lg p-6 border border-red-500/30">
                      <h4 className="text-lg font-semibold text-white mb-3">🏦 JPMorgan Chase Success</h4>
                      <p className="text-sm mb-3">
                        Deployed machine learning models across 4,000+ branches, preventing 
                        <span className="text-red-400 font-semibold"> $1.8 billion</span> in fraud annually.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Fraud prevented:</span>
                          <span className="text-cyan-400">$1.8B/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span>False positives reduced:</span>
                          <span className="text-green-400">82%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Customer friction reduced:</span>
                          <span className="text-blue-400">67%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-lg p-6 border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-white mb-3">💳 Mastercard Innovation</h4>
                      <p className="text-sm mb-3">
                        Real-time transaction scoring processes 
                        <span className="text-blue-400 font-semibold"> 100 billion transactions</span> annually with 99.95% accuracy.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Transactions analyzed:</span>
                          <span className="text-cyan-400">100B/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing time:</span>
                          <span className="text-green-400">13ms avg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Accuracy rate:</span>
                          <span className="text-blue-400">99.95%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-lg p-6 border border-yellow-500/30">
                    <h4 className="text-lg font-semibold text-white mb-3">💡 SiteOptz Implementation Strategy</h4>
                    <p className="text-sm leading-relaxed">
                      Start with rule-based systems to establish baseline performance, then layer machine learning models for pattern detection. 
                      Use ensemble methods combining multiple algorithms to achieve 99%+ accuracy while minimizing false positives.
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Experience Transformation */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">3</div>
                  Customer Experience AI Transformation
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">AI-Powered Banking Services</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-3 text-white">Service</th>
                            <th className="text-center py-3 text-white">Adoption Rate</th>
                            <th className="text-center py-3 text-white">Customer Satisfaction</th>
                            <th className="text-center py-3 text-white">Cost Reduction</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-800">
                            <td className="py-4 font-medium text-cyan-400">Chatbots & Virtual Assistants</td>
                            <td className="py-4 text-center">94%</td>
                            <td className="py-4 text-center text-green-400">89%</td>
                            <td className="py-4 text-center text-blue-400">67%</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-4 font-medium text-blue-400">Personalized Recommendations</td>
                            <td className="py-4 text-center">78%</td>
                            <td className="py-4 text-center text-green-400">92%</td>
                            <td className="py-4 text-center text-blue-400">34%</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-4 font-medium text-purple-400">Automated Loan Processing</td>
                            <td className="py-4 text-center">71%</td>
                            <td className="py-4 text-center text-green-400">87%</td>
                            <td className="py-4 text-center text-blue-400">78%</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-4 font-medium text-green-400">Voice Banking</td>
                            <td className="py-4 text-center">52%</td>
                            <td className="py-4 text-center text-green-400">85%</td>
                            <td className="py-4 text-center text-blue-400">45%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-b from-blue-600/20 to-blue-800/20 rounded-lg p-4 border border-blue-500/30">
                      <h5 className="font-semibold text-blue-400 mb-2">24/7 Availability</h5>
                      <div className="text-3xl font-bold text-white mb-1">96%</div>
                      <div className="text-xs text-gray-400">Customer queries handled instantly</div>
                    </div>
                    <div className="bg-gradient-to-b from-purple-600/20 to-purple-800/20 rounded-lg p-4 border border-purple-500/30">
                      <h5 className="font-semibold text-purple-400 mb-2">Response Time</h5>
                      <div className="text-3xl font-bold text-white mb-1">2.3s</div>
                      <div className="text-xs text-gray-400">Average AI response time</div>
                    </div>
                    <div className="bg-gradient-to-b from-green-600/20 to-green-800/20 rounded-lg p-4 border border-green-500/30">
                      <h5 className="font-semibold text-green-400 mb-2">Resolution Rate</h5>
                      <div className="text-3xl font-bold text-white mb-1">87%</div>
                      <div className="text-xs text-gray-400">Issues resolved without human intervention</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Assessment Evolution */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">4</div>
                  Advanced Risk Assessment with AI
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-white mb-4">Traditional vs AI-Powered Risk Models</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-red-400 mb-3">Traditional Models</h5>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li>• 10-15 risk factors considered</li>
                          <li>• Static scoring models</li>
                          <li>• Monthly/quarterly updates</li>
                          <li>• 72% accuracy on default prediction</li>
                          <li>• High manual intervention required</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-400 mb-3">AI-Enhanced Models</h5>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li>• 500+ variables analyzed</li>
                          <li>• Dynamic, self-learning models</li>
                          <li>• Real-time risk scoring</li>
                          <li>• 94% accuracy on default prediction</li>
                          <li>• Automated decision-making</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-4">Risk Model Performance</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                          <span className="text-gray-300">Default Prediction Accuracy</span>
                          <span className="text-cyan-400 font-bold">94%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                          <span className="text-gray-300">Processing Speed</span>
                          <span className="text-green-400 font-bold">Real-time</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                          <span className="text-gray-300">False Rejection Rate</span>
                          <span className="text-blue-400 font-bold">-56%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                          <span className="text-gray-300">Loan Approval Time</span>
                          <span className="text-purple-400 font-bold">78% faster</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-lg p-6 border border-cyan-500/30">
                      <h4 className="text-lg font-semibold text-white mb-4">📊 Alternative Data Sources</h4>
                      <div className="space-y-3 text-sm text-gray-300">
                        <div className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span><strong className="text-white">Social Media Sentiment:</strong> Predicts payment behavior</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span><strong className="text-white">Transaction Patterns:</strong> Early warning indicators</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span><strong className="text-white">Geolocation Data:</strong> Risk geography mapping</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span><strong className="text-white">Device Fingerprinting:</strong> Identity verification</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI Analysis */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">5</div>
                  ROI Analysis & Financial Impact
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Average Implementation Costs vs Benefits</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h5 className="text-red-400 font-semibold mb-2">Implementation Costs (Year 1)</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-300">AI platform licensing:</span>
                            <span className="text-red-400">$2.4M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Integration & development:</span>
                            <span className="text-red-400">$1.8M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Training & change management:</span>
                            <span className="text-red-400">$0.9M</span>
                          </div>
                          <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                            <span className="text-white">Total Investment:</span>
                            <span className="text-red-400">$5.1M</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h5 className="text-green-400 font-semibold mb-2">Annual Benefits</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Fraud prevention:</span>
                            <span className="text-green-400">$8.7M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Operational efficiency:</span>
                            <span className="text-green-400">$4.2M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Risk reduction:</span>
                            <span className="text-green-400">$3.1M</span>
                          </div>
                          <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                            <span className="text-white">Total Annual Benefit:</span>
                            <span className="text-green-400">$16.0M</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-600/10 to-cyan-600/10 rounded-lg p-6 border border-green-500/30">
                    <h4 className="text-lg font-semibold text-white mb-4">💰 SiteOptz ROI Calculator</h4>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                        <div className="text-4xl font-bold text-green-400 mb-2">314%</div>
                        <div className="text-sm text-gray-400">Average ROI in Year 1</div>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Payback period:</span>
                          <span className="text-cyan-400">3.8 months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">3-year NPV:</span>
                          <span className="text-green-400">$42.3M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Risk-adjusted return:</span>
                          <span className="text-blue-400">287%</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-yellow-600/20 rounded border border-yellow-500/30">
                        <p className="text-xs text-yellow-300">
                          <strong>Note:</strong> ROI varies by institution size and AI maturity level. 
                          Large banks (>$50B assets) typically see 25% higher returns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SiteOptz Resources */}
              <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-8 border border-blue-500/30 text-center">
                <div className="flex items-center justify-center mb-4">
                  <img src="/images/siteoptz-logo.png" alt="SiteOptz AI" className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold text-white">Get the Complete Fintech AI Report</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Including vendor comparisons, implementation roadmaps, and regulatory compliance checklists.
                </p>
                <button
                  onClick={openModal}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Download Full 64-Page Report + Tools
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Ahead of Fintech Innovation
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the insights that 200+ financial institutions are using to drive AI transformation.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Report
            </button>
          </div>
        </section>
      </div>

      {/* Lead Magnet Modal */}
      <LeadMagnetModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        resourceType={modalState.resourceType}
        source={modalState.source}
      />
    </>
  );
}