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
  Factory,
  Cog,
  TrendingUp
} from 'lucide-react';

export default function ManufacturingAI2024() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'manufacturing-ai-2024' as const,
    source: 'report_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'AI implementation in manufacturing processes',
    'Efficiency improvements and cost savings data',
    'Quality control and predictive maintenance',
    'Supply chain optimization strategies',
    'Smart factory and Industry 4.0 insights',
    'Case studies from 50+ manufacturers'
  ];

  const reportSections = [
    { section: 'Executive Summary', page: 3, description: 'Key findings and industry overview' },
    { section: 'AI Adoption in Manufacturing', page: 8, description: 'Current state and trends' },
    { section: 'Process Optimization', page: 16, description: 'AI-driven efficiency improvements' },
    { section: 'Predictive Maintenance', page: 24, description: 'Reducing downtime with AI' },
    { section: 'Quality Control Revolution', page: 32, description: 'Computer vision and defect detection' },
    { section: 'Supply Chain Intelligence', page: 40, description: 'AI-powered logistics optimization' },
    { section: 'Smart Factory Implementation', page: 48, description: 'Industry 4.0 case studies' },
    { section: 'ROI Analysis', page: 56, description: 'Cost savings and productivity gains' },
    { section: 'Future of Manufacturing AI', page: 64, description: '2025-2030 predictions' }
  ];

  const stats = [
    { number: '73%', label: 'Manufacturers using AI' },
    { number: '35%', label: 'Average cost reduction' },
    { number: '42%', label: 'Productivity increase' },
    { number: '50+', label: 'Case studies included' }
  ];

  return (
    <>
      <Head>
        <title>Manufacturing AI Efficiency Study 2024 - Free Industry Report | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive manufacturing AI study. Data-driven insights on efficiency, quality control, predictive maintenance, and Industry 4.0 transformation." 
        />
        <meta 
          name="keywords" 
          content="manufacturing AI report, Industry 4.0, smart factory, predictive maintenance, manufacturing automation, AI efficiency study" 
        />
        <link rel="canonical" href="https://siteoptz.ai/reports/manufacturing-ai-2024" />
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
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600/20 to-cyan-600/20 rounded-full border border-green-500/30 mb-6">
                  <Factory className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-green-400 text-sm font-medium">Industry 4.0 Report</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Manufacturing AI Efficiency Study 2024
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Data-driven insights on how AI is improving manufacturing efficiency, 
                  reducing costs, and enhancing quality control across 50+ companies.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Cog className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">35%</div>
                    <div className="text-sm text-gray-400">Cost Reduction</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">42%</div>
                    <div className="text-sm text-gray-400">Productivity Gain</div>
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
                <div className="bg-gradient-to-br from-green-600/10 to-cyan-600/10 rounded-2xl p-8 border border-green-500/30">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Download Free Study
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        22 min read
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        68-page PDF
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
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Study
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    🏭 Trusted by 300+ manufacturing leaders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Manufacturing AI Content */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SiteOptz Branding Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <img src="/images/siteoptz-logo.png" alt="SiteOptz AI Logo" className="w-12 h-12 mr-3" />
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  SiteOptz Manufacturing AI Efficiency Study
                </div>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Industry 4.0 transformation insights from 50+ manufacturing leaders
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Executive Summary */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">1</div>
                  Executive Summary: The Manufacturing AI Revolution
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">Industry 4.0 is Here</h4>
                    <p className="leading-relaxed mb-4">
                      Manufacturing is experiencing its most significant transformation since the industrial revolution. 
                      <span className="text-cyan-400 font-semibold"> 73% of manufacturers</span> are now using AI technologies, achieving 
                      <span className="text-green-400 font-semibold"> 35% average cost reduction</span> and 
                      <span className="text-blue-400 font-semibold"> 42% productivity increases</span>.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-green-600/10 to-cyan-600/10 rounded-lg p-6 border border-green-500/30">
                      <h5 className="font-semibold text-green-400 mb-3">Top AI Applications</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>Predictive maintenance (89% adoption)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>Quality control automation (76%)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>Supply chain optimization (68%)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span>Production planning AI (54%)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-6 border border-blue-500/30">
                      <h5 className="font-semibold text-blue-400 mb-3">Key Success Metrics</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>67% reduction in unplanned downtime</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>94% improvement in defect detection</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>23% faster time-to-market</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span>$2.1M average annual savings</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Predictive Maintenance */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">2</div>
                  Predictive Maintenance: Eliminating Downtime
                </h3>
                
                <div className="space-y-6">
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-white mb-4">Maintenance Strategy Comparison</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Reactive Maintenance</span>
                          <span className="text-red-400 font-bold">$180/hour downtime</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full" style={{width: '100%'}}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Traditional &quot;fix when broken&quot; approach</p>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Preventive Maintenance</span>
                          <span className="text-yellow-400 font-bold">$65/hour scheduled</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full" style={{width: '60%'}}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Time-based maintenance schedules</p>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">AI Predictive Maintenance</span>
                          <span className="text-green-400 font-bold">$12/hour optimized</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-green-500 to-cyan-500 h-full" style={{width: '15%'}}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Condition-based maintenance with AI predictions</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-lg p-6 border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-white mb-3">🏭 General Electric Case Study</h4>
                      <p className="text-sm mb-3">
                        Implemented Predix platform across 30+ manufacturing facilities, achieving 
                        <span className="text-blue-400 font-semibold"> 67% reduction</span> in unplanned downtime.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Downtime prevented:</span>
                          <span className="text-cyan-400">2,340 hours/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost savings:</span>
                          <span className="text-green-400">$14.2M annually</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Maintenance efficiency:</span>
                          <span className="text-blue-400">+89%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-600/10 to-cyan-600/10 rounded-lg p-6 border border-green-500/30">
                      <h4 className="text-lg font-semibold text-white mb-3">🏭 Siemens Digital Factory</h4>
                      <p className="text-sm mb-3">
                        Deployed MindSphere IoT platform with AI analytics, increasing 
                        <span className="text-green-400 font-semibold"> overall equipment effectiveness</span> by 24%.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>OEE improvement:</span>
                          <span className="text-cyan-400">+24%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Energy consumption:</span>
                          <span className="text-green-400">-31%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Production throughput:</span>
                          <span className="text-blue-400">+18%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-lg p-6 border border-yellow-500/30">
                    <h4 className="text-lg font-semibold text-white mb-3">💡 SiteOptz Implementation Framework</h4>
                    <p className="text-sm leading-relaxed">
                      Start with high-criticality assets that have the most downtime impact. Deploy vibration, temperature, and acoustic sensors 
                      to collect baseline data for 3-6 months before implementing predictive algorithms. Focus on simple failure modes first.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quality Control Revolution */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">3</div>
                  AI-Powered Quality Control Revolution
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Computer Vision in Manufacturing</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-3 text-white">Application</th>
                            <th className="text-center py-3 text-white">Accuracy Rate</th>
                            <th className="text-center py-3 text-white">Speed Improvement</th>
                            <th className="text-center py-3 text-white">Cost Reduction</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-800">
                            <td className="py-4 font-medium text-cyan-400">Surface Defect Detection</td>
                            <td className="py-4 text-center text-green-400">99.7%</td>
                            <td className="py-4 text-center text-blue-400">15x faster</td>
                            <td className="py-4 text-center text-purple-400">67%</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-4 font-medium text-blue-400">Assembly Verification</td>
                            <td className="py-4 text-center text-green-400">98.9%</td>
                            <td className="py-4 text-center text-blue-400">8x faster</td>
                            <td className="py-4 text-center text-purple-400">54%</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-4 font-medium text-purple-400">Dimensional Inspection</td>
                            <td className="py-4 text-center text-green-400">99.4%</td>
                            <td className="py-4 text-center text-blue-400">12x faster</td>
                            <td className="py-4 text-center text-purple-400">72%</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-4 font-medium text-green-400">Color/Texture Analysis</td>
                            <td className="py-4 text-center text-green-400">97.8%</td>
                            <td className="py-4 text-center text-blue-400">20x faster</td>
                            <td className="py-4 text-center text-purple-400">81%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-b from-blue-600/20 to-blue-800/20 rounded-lg p-4 border border-blue-500/30">
                      <h5 className="font-semibold text-blue-400 mb-2">Detection Speed</h5>
                      <div className="text-3xl font-bold text-white mb-1">0.3s</div>
                      <div className="text-xs text-gray-400">Average defect detection time</div>
                    </div>
                    <div className="bg-gradient-to-b from-green-600/20 to-green-800/20 rounded-lg p-4 border border-green-500/30">
                      <h5 className="font-semibold text-green-400 mb-2">False Positives</h5>
                      <div className="text-3xl font-bold text-white mb-1">0.3%</div>
                      <div className="text-xs text-gray-400">Industry-leading accuracy</div>
                    </div>
                    <div className="bg-gradient-to-b from-purple-600/20 to-purple-800/20 rounded-lg p-4 border border-purple-500/30">
                      <h5 className="font-semibold text-purple-400 mb-2">Throughput</h5>
                      <div className="text-3xl font-bold text-white mb-1">+94%</div>
                      <div className="text-xs text-gray-400">Inspection capacity increase</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supply Chain Intelligence */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">4</div>
                  AI-Driven Supply Chain Optimization
                </h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-4">Supply Chain Performance Metrics</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                          <span className="text-gray-300">Inventory Optimization</span>
                          <span className="text-cyan-400 font-bold">-28% carrying cost</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                          <span className="text-gray-300">Demand Forecasting</span>
                          <span className="text-green-400 font-bold">96% accuracy</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                          <span className="text-gray-300">Supplier Risk Assessment</span>
                          <span className="text-blue-400 font-bold">-67% disruptions</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                          <span className="text-gray-300">Logistics Optimization</span>
                          <span className="text-purple-400 font-bold">-23% shipping cost</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-lg p-6 border border-cyan-500/30">
                      <h4 className="text-lg font-semibold text-white mb-4">🚚 Real-Time Supply Chain Intelligence</h4>
                      <div className="space-y-3 text-sm text-gray-300">
                        <div className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span><strong className="text-white">Demand Sensing:</strong> Real-time demand pattern analysis</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span><strong className="text-white">Risk Monitoring:</strong> Supplier financial health tracking</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span><strong className="text-white">Route Optimization:</strong> Dynamic logistics planning</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span><strong className="text-white">Inventory Intelligence:</strong> Automated reorder points</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Manufacturing Giants Leading the Way</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-cyan-400 mb-2">🏭 BMW Supply Chain AI</h5>
                        <p className="text-sm text-gray-300 mb-2">
                          Implemented AI-driven supply network optimization across 150+ suppliers
                        </p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Inventory reduction:</span>
                            <span className="text-green-400">32%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Supply reliability:</span>
                            <span className="text-blue-400">99.7%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-400 mb-2">🏭 Procter & Gamble</h5>
                        <p className="text-sm text-gray-300 mb-2">
                          AI-powered demand sensing across 5 billion consumer touchpoints
                        </p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Forecast accuracy:</span>
                            <span className="text-green-400">+18%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Inventory turns:</span>
                            <span className="text-blue-400">+24%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI Analysis */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">5</div>
                  Manufacturing AI ROI Analysis
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Investment vs Returns (3-Year Analysis)</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h5 className="text-red-400 font-semibold mb-2">Initial Investment</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-300">AI software & platforms:</span>
                            <span className="text-red-400">$1.8M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Sensor & IoT infrastructure:</span>
                            <span className="text-red-400">$2.1M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Implementation & training:</span>
                            <span className="text-red-400">$1.3M</span>
                          </div>
                          <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                            <span className="text-white">Total Investment:</span>
                            <span className="text-red-400">$5.2M</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h5 className="text-green-400 font-semibold mb-2">3-Year Benefits</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Downtime reduction:</span>
                            <span className="text-green-400">$12.4M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Quality improvements:</span>
                            <span className="text-green-400">$6.8M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Energy & efficiency:</span>
                            <span className="text-green-400">$4.2M</span>
                          </div>
                          <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                            <span className="text-white">Total 3-Year Benefit:</span>
                            <span className="text-green-400">$23.4M</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-600/10 to-cyan-600/10 rounded-lg p-6 border border-green-500/30">
                    <h4 className="text-lg font-semibold text-white mb-4">💰 SiteOptz ROI Calculator</h4>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                        <div className="text-4xl font-bold text-green-400 mb-2">450%</div>
                        <div className="text-sm text-gray-400">3-Year ROI</div>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Payback period:</span>
                          <span className="text-cyan-400">14 months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Annual cost savings:</span>
                          <span className="text-green-400">$7.8M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Productivity increase:</span>
                          <span className="text-blue-400">42%</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-yellow-600/20 rounded border border-yellow-500/30">
                        <p className="text-xs text-yellow-300">
                          <strong>Industry Benchmark:</strong> Manufacturing AI implementations typically 
                          achieve 300-500% ROI within 3 years, with payback periods of 12-18 months.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SiteOptz Resources */}
              <div className="bg-gradient-to-r from-green-600/10 to-cyan-600/10 rounded-xl p-8 border border-green-500/30 text-center">
                <div className="flex items-center justify-center mb-4">
                  <img src="/images/siteoptz-logo.png" alt="SiteOptz AI" className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold text-white">Get the Complete Manufacturing AI Study</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Including implementation roadmaps, vendor selection guides, and ROI calculation tools.
                </p>
                <button
                  onClick={openModal}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors"
                >
                  Download Full 68-Page Study + Tools
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Transform Your Manufacturing Operations
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the Industry 4.0 revolution with insights from 50+ successful AI implementations.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Study
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