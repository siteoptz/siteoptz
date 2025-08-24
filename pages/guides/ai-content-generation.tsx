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
  Zap,
  TrendingUp
} from 'lucide-react';

export default function AIContentGeneration() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'ai-content-generation' as const,
    source: 'guide_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'Content generation strategy frameworks',
    'Platform selection and comparison matrix',
    'Quality control and brand consistency',
    'SEO optimization with AI tools',
    'Workflow integration best practices',
    'Performance metrics and optimization'
  ];

  const guideContents = [
    { section: '1. Content Strategy Foundation', page: 3, description: 'Building your AI content strategy' },
    { section: '2. AI Content Tools Comparison', page: 8, description: 'Comprehensive platform analysis' },
    { section: '3. Quality Control Framework', page: 15, description: 'Ensuring brand consistency and quality' },
    { section: '4. SEO Integration Techniques', page: 22, description: 'Optimizing AI content for search' },
    { section: '5. Workflow Implementation', page: 28, description: 'Integrating AI into content workflows' },
    { section: '6. Performance Measurement', page: 35, description: 'Tracking ROI and content effectiveness' },
    { section: '7. Advanced Optimization', page: 42, description: 'Fine-tuning for maximum impact' },
    { section: '8. Case Studies & Examples', page: 48, description: 'Real-world implementation stories' }
  ];

  const stats = [
    { number: '3x', label: 'Faster content creation' },
    { number: '67%', label: 'Cost reduction' },
    { number: '89%', label: 'Quality consistency' },
    { number: '15+', label: 'Tools compared' }
  ];

  return (
    <>
      <Head>
        <title>AI Content Generation: Best Practices & Tools - Free Guide | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive guide to AI content generation. Learn best practices, tool comparisons, quality frameworks, and workflow integration strategies." 
        />
        <meta 
          name="keywords" 
          content="AI content generation, content marketing AI, AI writing tools, content automation, AI content strategy, content creation" 
        />
        <link rel="canonical" href="https://siteoptz.ai/guides/ai-content-generation" />
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
                  <BookOpen className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-green-400 text-sm font-medium">Content Generation Guide</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  AI Content Generation: Best Practices & Tools
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Master AI content creation with proven strategies, comprehensive tool comparisons, 
                  and quality control frameworks that ensure brand consistency.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">52</div>
                    <div className="text-sm text-gray-400">Page Guide</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-sm text-gray-400">Tools Compared</div>
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
                      Download Your Free Guide
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        12 min read
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        PDF Format
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
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Get Your Free Guide
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    ✨ No spam, just valuable insights delivered to your inbox
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Guide Content */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SiteOptz Branding Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <img src="/images/siteoptz-logo.png" alt="SiteOptz AI Logo" className="w-12 h-12 mr-3" />
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  SiteOptz AI Content Generation Masterclass
                </div>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transform your content strategy with AI-powered tools and proven methodologies
              </p>
            </div>

            {/* Content Strategy Foundation */}
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">1</div>
                  Content Strategy Foundation
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">The AI Content Revolution</h4>
                    <p className="leading-relaxed">
                      AI content generation has transformed from experimental technology to essential business capability. 
                      Companies using AI-powered content strategies report <span className="text-cyan-400 font-semibold">3x faster content creation</span> and 
                      <span className="text-green-400 font-semibold"> 67% cost reduction</span> compared to traditional methods.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-600/10 to-cyan-600/10 rounded-lg p-6 border border-green-500/30">
                    <h4 className="text-lg font-semibold text-white mb-3">📋 SiteOptz Content Strategy Framework</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-cyan-400 mb-2">Foundation Elements:</h5>
                        <ul className="space-y-1 text-sm">
                          <li>• Brand voice and tone guidelines</li>
                          <li>• Content pillars and themes</li>
                          <li>• Target audience personas</li>
                          <li>• Content quality standards</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-400 mb-2">Success Metrics:</h5>
                        <ul className="space-y-1 text-sm">
                          <li>• Content production velocity</li>
                          <li>• Engagement and conversion rates</li>
                          <li>• SEO performance improvements</li>
                          <li>• Cost per piece of content</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Tools Comparison */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">2</div>
                  AI Content Tools Comparison Matrix
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 text-white">Tool</th>
                        <th className="text-center py-3 text-white">Best For</th>
                        <th className="text-center py-3 text-white">Pricing</th>
                        <th className="text-center py-3 text-white">SiteOptz Rating</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-800">
                        <td className="py-4 font-medium text-cyan-400">ChatGPT Plus</td>
                        <td className="py-4 text-center">Blog posts, emails</td>
                        <td className="py-4 text-center">$20/month</td>
                        <td className="py-4 text-center">⭐⭐⭐⭐⭐</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 font-medium text-blue-400">Claude Pro</td>
                        <td className="py-4 text-center">Long-form content</td>
                        <td className="py-4 text-center">$20/month</td>
                        <td className="py-4 text-center">⭐⭐⭐⭐⭐</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 font-medium text-purple-400">Jasper AI</td>
                        <td className="py-4 text-center">Marketing copy</td>
                        <td className="py-4 text-center">$39/month</td>
                        <td className="py-4 text-center">⭐⭐⭐⭐</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-medium text-green-400">Copy.ai</td>
                        <td className="py-4 text-center">Social media</td>
                        <td className="py-4 text-center">$36/month</td>
                        <td className="py-4 text-center">⭐⭐⭐⭐</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quality Control Framework */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">3</div>
                  Quality Control & Brand Consistency
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-4">The SiteOptz Quality Checklist</h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-cyan-400">Brand Voice Alignment:</span>
                            <p className="text-sm mt-1">Ensure AI output matches your established tone and personality</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-blue-400">Factual Accuracy:</span>
                            <p className="text-sm mt-1">Verify all claims, statistics, and references</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-purple-400">SEO Optimization:</span>
                            <p className="text-sm mt-1">Include target keywords naturally and strategically</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-lg p-6 border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-white mb-4">🚀 Pro Tip from SiteOptz</h4>
                      <p className="text-sm leading-relaxed">
                        Create a &quot;Brand Prompt Library&quot; with 3-5 proven prompts that consistently generate 
                        on-brand content. This reduces editing time by up to 60% and ensures consistency across all AI-generated content.
                      </p>
                      <div className="mt-4 p-3 bg-gray-800 rounded border-l-4 border-cyan-400">
                        <p className="text-xs font-mono text-gray-300">
                          Example: &quot;Write in the voice of [Brand]: professional yet approachable, 
                          data-driven but accessible, focusing on practical solutions...&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Implementation Workflow */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">4</div>
                  The SiteOptz 30-Day Implementation Roadmap
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6 text-gray-300">
                  <div className="bg-gradient-to-b from-green-600/20 to-green-800/20 rounded-lg p-6 border border-green-500/30">
                    <h4 className="font-bold text-white mb-3">Week 1-2: Foundation</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Audit current content performance</li>
                      <li>• Define brand voice guidelines</li>
                      <li>• Select 2-3 AI tools for testing</li>
                      <li>• Create prompt templates</li>
                      <li>• Set up quality control process</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-b from-blue-600/20 to-blue-800/20 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="font-bold text-white mb-3">Week 3-4: Scale Up</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Launch pilot content campaigns</li>
                      <li>• Train team on AI workflows</li>
                      <li>• Implement feedback loops</li>
                      <li>• Optimize prompt library</li>
                      <li>• Measure initial performance</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-b from-purple-600/20 to-purple-800/20 rounded-lg p-6 border border-purple-500/30">
                    <h4 className="font-bold text-white mb-3">Week 5+: Optimize</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Analyze performance metrics</li>
                      <li>• Refine quality standards</li>
                      <li>• Scale successful formats</li>
                      <li>• Automate repetitive tasks</li>
                      <li>• Plan advanced integrations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ROI and Success Metrics */}
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3 text-sm font-bold text-white">5</div>
                  Measuring Success: ROI and KPIs
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Key Performance Indicators</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                        <span className="text-gray-300">Content Production Speed</span>
                        <span className="text-cyan-400 font-bold">+285% average</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                        <span className="text-gray-300">Cost per Piece</span>
                        <span className="text-green-400 font-bold">-67% reduction</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                        <span className="text-gray-300">Engagement Rate</span>
                        <span className="text-blue-400 font-bold">+45% increase</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                        <span className="text-gray-300">SEO Performance</span>
                        <span className="text-purple-400 font-bold">+123% organic traffic</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-600/10 to-orange-600/10 rounded-lg p-6 border border-yellow-500/30">
                    <h4 className="text-lg font-semibold text-white mb-4">💰 ROI Calculator</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Traditional content cost:</span>
                        <span className="text-red-400">$150/piece</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">AI-assisted cost:</span>
                        <span className="text-green-400">$45/piece</span>
                      </div>
                      <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
                        <span className="text-white">Monthly savings (10 pieces):</span>
                        <span className="text-cyan-400">$1,050</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Annual ROI:</span>
                        <span className="text-green-400">+342%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SiteOptz Exclusive Resources */}
              <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-xl p-8 border border-cyan-500/30 text-center">
                <div className="flex items-center justify-center mb-4">
                  <img src="/images/siteoptz-logo.png" alt="SiteOptz AI" className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold text-white">Exclusive SiteOptz Resources</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Get our complete toolkit including prompt libraries, quality checklists, and ROI calculators.
                </p>
                <button
                  onClick={openModal}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-colors"
                >
                  Download Complete Guide + Templates
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Transform Your Content Strategy Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of content creators who have revolutionized their workflows with AI.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Guide
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