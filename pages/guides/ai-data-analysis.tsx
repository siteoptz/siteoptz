import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import { 
  BookOpen,
  Download,
  CheckCircle,
  ArrowLeft,
  Clock,
  Users,
  Star,
  Target,
  BarChart3,
  Database
} from 'lucide-react';

export default function AIDataAnalysis() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'ai-data-analysis' as const,
    source: 'guide_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'AI data analysis fundamentals',
    'Tool selection criteria and comparison',
    'Data preparation and cleaning workflows',
    'Implementation timeline and roadmap',
    'Visualization and reporting best practices',
    'Security, compliance, and ROI measurement'
  ];

  const guideContents = [
    { section: '1. Data Analysis Fundamentals', page: 3, description: 'Understanding AI-powered analytics' },
    { section: '2. Tool Selection Framework', page: 9, description: 'Choosing the right AI analytics tools' },
    { section: '3. Data Preparation Strategy', page: 16, description: 'Cleaning and structuring your data' },
    { section: '4. Implementation Roadmap', page: 24, description: '90-day implementation timeline' },
    { section: '5. Visualization Techniques', page: 32, description: 'Creating compelling data stories' },
    { section: '6. Security & Compliance', page: 39, description: 'Protecting sensitive data' },
    { section: '7. ROI Measurement', page: 45, description: 'Measuring analytics impact' },
    { section: '8. Advanced Techniques', page: 52, description: 'Machine learning integration' }
  ];

  const stats = [
    { number: '5x', label: 'Faster insights' },
    { number: '78%', label: 'Time savings' },
    { number: '92%', label: 'Accuracy improvement' },
    { number: '12+', label: 'Tools compared' }
  ];

  return (
    <>
      <Head>
        <title>Data Analysis with AI: A Beginner&apos;s Roadmap - Free Guide | SiteOptz</title>
        <meta 
          name="description" 
          content="Transform your data analysis workflow with AI. Download our comprehensive beginner's roadmap including tool selection, implementation timeline, and best practices." 
        />
        <meta 
          name="keywords" 
          content="AI data analysis, data analytics tools, business intelligence AI, data science, AI analytics, data visualization" 
        />
        <link rel="canonical" href="https://siteoptz.ai/guides/ai-data-analysis" />
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
                  <BarChart3 className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-blue-400 text-sm font-medium">Data Analysis Roadmap</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Data Analysis with AI: A Beginner&apos;s Roadmap
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Transform your data analysis workflow with AI tools and proven methodologies. 
                  From tool selection to advanced insights generation.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Database className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">90</div>
                    <div className="text-sm text-gray-400">Day Timeline</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">58</div>
                    <div className="text-sm text-gray-400">Page Guide</div>
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
                      Download Your Free Roadmap
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        18 min read
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        PDF Format
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        4.7/5
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
                    Get Your Free Roadmap
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    📊 Includes templates and tool comparison matrix
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Data Analysis Content */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SiteOptz Branding Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <img src="/images/siteoptz-logo.png" alt="SiteOptz AI Logo" className="w-12 h-12 mr-3" />
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  SiteOptz AI Data Analysis Masterclass
                </div>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transform raw data into actionable insights with AI-powered analytics
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Data Analysis Fundamentals */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">1</div>
                  AI Data Analysis Fundamentals
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">The Power of AI-Driven Analytics</h4>
                    <p className="leading-relaxed mb-4">
                      Traditional data analysis methods process <span className="text-red-400 font-semibold">only 12% of available data</span>. 
                      AI-powered analytics can process <span className="text-green-400 font-semibold">100% of your data</span> in real-time, 
                      uncovering patterns invisible to human analysts.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-6 border border-blue-500/30">
                      <h5 className="font-semibold text-cyan-400 mb-3">Traditional Analytics</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">✗</span>
                          <span>Manual data processing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">✗</span>
                          <span>Limited to structured data</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">✗</span>
                          <span>Retrospective insights only</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">✗</span>
                          <span>Hours to generate reports</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-600/10 to-cyan-600/10 rounded-lg p-6 border border-green-500/30">
                      <h5 className="font-semibold text-green-400 mb-3">AI-Powered Analytics</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>Automated processing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>Handles all data types</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>Predictive & prescriptive</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>Real-time insights</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tool Selection Framework */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">2</div>
                  AI Analytics Tool Selection Matrix
                </h3>
                
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 text-white">Platform</th>
                        <th className="text-center py-3 text-white">Best For</th>
                        <th className="text-center py-3 text-white">Learning Curve</th>
                        <th className="text-center py-3 text-white">Starting Price</th>
                        <th className="text-center py-3 text-white">SiteOptz Score</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-800">
                        <td className="py-4 font-medium text-cyan-400">Google Analytics 4 + AI</td>
                        <td className="py-4 text-center">Web analytics</td>
                        <td className="py-4 text-center">Moderate</td>
                        <td className="py-4 text-center">Free</td>
                        <td className="py-4 text-center">9.2/10</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 font-medium text-blue-400">Tableau with Einstein</td>
                        <td className="py-4 text-center">Enterprise BI</td>
                        <td className="py-4 text-center">Steep</td>
                        <td className="py-4 text-center">$75/user</td>
                        <td className="py-4 text-center">8.8/10</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 font-medium text-purple-400">Power BI with Copilot</td>
                        <td className="py-4 text-center">Business analytics</td>
                        <td className="py-4 text-center">Moderate</td>
                        <td className="py-4 text-center">$10/user</td>
                        <td className="py-4 text-center">9.0/10</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 font-medium text-green-400">DataRobot</td>
                        <td className="py-4 text-center">AutoML</td>
                        <td className="py-4 text-center">Easy</td>
                        <td className="py-4 text-center">Custom</td>
                        <td className="py-4 text-center">8.5/10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-lg p-6 border border-yellow-500/30">
                  <h4 className="text-lg font-semibold text-white mb-3">💡 SiteOptz Selection Tip</h4>
                  <p className="text-sm text-gray-300">
                    Start with <span className="text-cyan-400 font-semibold">Power BI + Copilot</span> for the best balance of features, 
                    ease of use, and cost. It integrates seamlessly with existing Microsoft tools and offers natural language queries.
                  </p>
                </div>
              </div>

              {/* Data Preparation Strategy */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">3</div>
                  Data Preparation & Quality Framework
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-white mb-4">The 80/20 Rule of Data Science</h4>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
                          <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full" style={{width: '80%'}}></div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">80% Data Preparation</p>
                      </div>
                      <div className="ml-4">
                        <div className="bg-gray-700 rounded-full h-4 overflow-hidden" style={{width: '60px'}}>
                          <div className="bg-gradient-to-r from-green-500 to-cyan-500 h-full" style={{width: '20%'}}></div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">20% Analysis</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      AI reduces data prep time by <span className="text-green-400 font-semibold">65%</span> through automated cleaning, 
                      normalization, and feature engineering.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-b from-blue-600/20 to-blue-800/20 rounded-lg p-4 border border-blue-500/30">
                      <h5 className="font-semibold text-blue-400 mb-2">Data Collection</h5>
                      <ul className="space-y-1 text-xs text-gray-300">
                        <li>• API integrations</li>
                        <li>• Database connections</li>
                        <li>• File uploads</li>
                        <li>• Real-time streams</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-b from-purple-600/20 to-purple-800/20 rounded-lg p-4 border border-purple-500/30">
                      <h5 className="font-semibold text-purple-400 mb-2">Data Cleaning</h5>
                      <ul className="space-y-1 text-xs text-gray-300">
                        <li>• Remove duplicates</li>
                        <li>• Handle missing values</li>
                        <li>• Fix inconsistencies</li>
                        <li>• Standardize formats</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-b from-green-600/20 to-green-800/20 rounded-lg p-4 border border-green-500/30">
                      <h5 className="font-semibold text-green-400 mb-2">Data Enrichment</h5>
                      <ul className="space-y-1 text-xs text-gray-300">
                        <li>• Feature engineering</li>
                        <li>• External data fusion</li>
                        <li>• Calculated metrics</li>
                        <li>• Predictive scoring</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Implementation Roadmap */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">4</div>
                  90-Day Implementation Timeline
                </h3>
                
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
                    
                    <div className="space-y-8">
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold z-10">
                          D1-30
                        </div>
                        <div className="ml-6 flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2">Foundation Phase</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>✓ Audit existing data infrastructure</li>
                            <li>✓ Define key business metrics</li>
                            <li>✓ Select and procure AI tools</li>
                            <li>✓ Set up data pipelines</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold z-10">
                          D31-60
                        </div>
                        <div className="ml-6 flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2">Pilot Phase</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>✓ Launch pilot dashboards</li>
                            <li>✓ Train key stakeholders</li>
                            <li>✓ Implement automated reports</li>
                            <li>✓ Gather feedback and iterate</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold z-10">
                          D61-90
                        </div>
                        <div className="ml-6 flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2">Scale Phase</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>✓ Roll out to all departments</li>
                            <li>✓ Implement predictive models</li>
                            <li>✓ Establish governance framework</li>
                            <li>✓ Measure ROI and optimize</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Metrics */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">5</div>
                  Success Metrics & ROI
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Performance Improvements</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Analysis Speed</span>
                          <span className="text-cyan-400 font-bold">5x Faster</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Data Accuracy</span>
                          <span className="text-green-400 font-bold">92% → 99.2%</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-green-500 to-cyan-500 h-full" style={{width: '92%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Insights Generated</span>
                          <span className="text-purple-400 font-bold">+312%</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full" style={{width: '78%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-600/10 to-cyan-600/10 rounded-lg p-6 border border-green-500/30">
                    <h4 className="text-lg font-semibold text-white mb-4">📊 SiteOptz ROI Calculator</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Analyst hours saved/month:</span>
                        <span className="text-cyan-400">120 hrs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Average hourly rate:</span>
                        <span className="text-gray-400">$75</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Monthly labor savings:</span>
                        <span className="text-green-400">$9,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">AI tool investment:</span>
                        <span className="text-red-400">-$2,500</span>
                      </div>
                      <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                        <span className="text-white">Net monthly benefit:</span>
                        <span className="text-green-400">$6,500</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Annual ROI:</span>
                        <span className="text-cyan-400">+260%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SiteOptz Resources */}
              <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-xl p-8 border border-cyan-500/30 text-center">
                <div className="flex items-center justify-center mb-4">
                  <img src="/images/siteoptz-logo.png" alt="SiteOptz AI" className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold text-white">Get the Complete SiteOptz Data Analytics Toolkit</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Including dashboard templates, SQL queries, Python scripts, and implementation checklists.
                </p>
                <button
                  onClick={openModal}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Download Complete Roadmap + Resources
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Data Analysis Transformation
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join over 12,000 professionals who have revolutionized their data workflows with AI.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Roadmap
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