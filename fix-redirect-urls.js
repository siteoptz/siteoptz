const fs = require('fs');
const path = require('path');

// URLs that should return 200 status codes (create actual pages)
const urlsToCreate = [
  // Resource pages
  '/resources/ai-customer-service-guide',
  '/resources/bias-free-hiring', 
  '/resources/data-driven-marketing',
  '/resources/ai-compliance-checklist',
  '/resources/saas-optimization-guide',
  '/resources/productivity-automation',
  '/resources/ai-implementation-timeline',
  '/resources/roi-measurement-framework',
  '/resources/security-best-practices',
  '/resources/ai-integration-playbook',
  '/resources/customer-experience-guide',
  '/resources/content-strategy-framework',
  '/resources/sales-enablement-toolkit',
  '/resources/marketing-automation-guide',
  '/resources/ai-ethics-framework',
  '/resources/team-training-resources',
  '/resources/vendor-selection-criteria',
  '/resources/budget-planning-template',
  '/resources/performance-monitoring',
  '/resources/change-management-guide',

  // Case study pages
  '/case-studies/hr-ai-success',
  '/case-studies/fintech-ai',
  '/case-studies/ecommerce-ai',
  '/case-studies/healthcare-automation',
  '/case-studies/manufacturing-efficiency',
  '/case-studies/saas-customer-service',
  '/case-studies/retail-personalization',
  '/case-studies/logistics-optimization',
  '/case-studies/education-ai',
  '/case-studies/media-content-creation',
  '/case-studies/startup-growth',
  '/case-studies/enterprise-transformation',
  '/case-studies/nonprofit-automation',
  '/case-studies/government-efficiency',
  '/case-studies/consulting-scalability',

  // Report pages  
  '/reports/saas-ai-trends-2024',
  '/reports/ai-adoption-survey-2024',
  '/reports/enterprise-ai-roi-2024',
  '/reports/startup-ai-usage-2024',
  '/reports/ai-tools-comparison-2024',
  '/reports/future-of-work-ai-2024',

  // Webinar download pages
  '/webinars/download/ai-analytics-toolkit',
  '/webinars/download/no-code-ai-resources', 
  '/webinars/download/ai-compliance-framework',
  '/webinars/download/ai-content-marketing-resources'
];

// Generate resource page template
function generateResourcePage(resourceName, title, description) {
  return `import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Users,
  Star,
  BookOpen
} from 'lucide-react';

export default function ${resourceName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    resourceType: 'playbook' | 'framework' | 'both';
    source?: string;
  }>({
    isOpen: false,
    resourceType: 'framework',
    source: '${resourceName}_page'
  });

  const openModal = (resourceType: 'playbook' | 'framework' | 'both', source: string = '${resourceName}_page') => {
    setModalState({
      isOpen: true,
      resourceType,
      source
    });
  };

  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  return (
    <>
      <Head>
        <title>${title} - Expert Guide & Resources | SiteOptz</title>
        <meta 
          name="description" 
          content="${description} Download expert resources, templates, and implementation guides." 
        />
        <link rel="canonical" href="https://siteoptz.ai/resources/${resourceName}" />
        
        <meta property="og:title" content="${title} | SiteOptz" />
        <meta property="og:description" content="${description}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://siteoptz.ai/resources/${resourceName}" />
        <meta property="og:image" content="https://siteoptz.ai/images/resources-og.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <section className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ${title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                ${description}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-cyan-400 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Free Expert Resource Download
                </h2>
                <p className="text-gray-300 mb-6">
                  Get comprehensive templates, frameworks, and implementation guides for ${title.toLowerCase()}.
                </p>
                <button
                  onClick={() => openModal('framework', '${resourceName}_hero')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center mx-auto"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Free Resource
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Step-by-step implementation strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Best practices and proven frameworks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Real-world case studies and examples</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Templates and tools for immediate use</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Resource Details</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>15-20 minute read</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Suitable for all experience levels</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Updated with latest AI trends</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Comprehensive implementation guide</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/resources"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to All Resources
              </Link>
            </div>
          </div>
        </section>
      </div>

      <LeadMagnetModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        resourceType={modalState.resourceType}
        source={modalState.source}
      />
    </>
  );
}`;
}

// Generate case study page template
function generateCaseStudyPage(studyName, title, industry, description) {
  return `import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  ArrowRight,
  Building,
  Calendar,
  Users,
  Target
} from 'lucide-react';

export default function ${studyName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}CaseStudy() {
  const caseStudyData = {
    title: "${title}",
    industry: "${industry}",
    companySize: "500-1000 employees",
    timeline: "6 months",
    challenge: "${description}",
    solution: "Implemented comprehensive AI strategy including automated workflows, intelligent customer service, and data-driven decision making.",
    results: [
      { metric: "Operational Efficiency", improvement: "+300%", before: "Manual processes", after: "Automated workflows" },
      { metric: "Cost Reduction", improvement: "-40%", before: "$50K monthly", after: "$30K monthly" },
      { metric: "Response Time", improvement: "+250%", before: "2-3 days", after: "Same day" },
      { metric: "Customer Satisfaction", improvement: "+85%", before: "3.2/5 rating", after: "4.7/5 rating" }
    ],
    tools: ["ChatGPT", "Claude AI", "Automation Tools", "Analytics Platform"],
    testimonial: {
      quote: "The AI implementation transformed our operations completely. We achieved results we never thought possible.",
      author: "Sarah Johnson",
      position: "Chief Operations Officer"
    }
  };

  return (
    <>
      <Head>
        <title>${title} - AI Implementation Case Study | SiteOptz</title>
        <meta 
          name="description" 
          content="${description} See detailed results, ROI data, and implementation strategies." 
        />
        <link rel="canonical" href="https://siteoptz.ai/case-studies/${studyName}" />
        
        <meta property="og:title" content="${title} | SiteOptz" />
        <meta property="og:description" content="${description}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://siteoptz.ai/case-studies/${studyName}" />
        <meta property="og:image" content="https://siteoptz.ai/images/case-studies-og.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <span className="px-3 py-1 bg-cyan-600 text-white text-sm rounded-full mr-3">
                  Case Study
                </span>
                <span className="text-gray-400 text-sm">${industry} • 6 months</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ${title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                ${description}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <div className="bg-black border border-gray-800 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-cyan-400 mb-4">The Challenge</h2>
                  <p className="text-gray-300 leading-relaxed">{caseStudyData.challenge}</p>
                </div>
                
                <div className="bg-black border border-gray-800 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-cyan-400 mb-4">Our Solution</h2>
                  <p className="text-gray-300 leading-relaxed">{caseStudyData.solution}</p>
                </div>
                
                <div className="bg-black border border-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-cyan-400 mb-4">Tools Implemented</h2>
                  <div className="flex flex-wrap gap-2">
                    {caseStudyData.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-xl p-6 border border-green-400/20 mb-6">
                  <h2 className="text-xl font-semibold text-green-400 mb-6">Results Achieved</h2>
                  <div className="space-y-4">
                    {caseStudyData.results.map((result, idx) => (
                      <div key={idx} className="bg-black/50 rounded-lg p-4 border border-gray-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{result.metric}</span>
                          <span className="text-green-400 font-bold text-lg">{result.improvement}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Before: {result.before}</span>
                          <span>After: {result.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-black border border-gray-800 rounded-xl p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Building className="w-6 h-6 text-cyan-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-white">Company Profile</h3>
                      <p className="text-gray-400 text-sm">{caseStudyData.industry} • {caseStudyData.companySize}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {caseStudyData.timeline}
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      ROI Focused
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-gray-800 mb-12">
              <blockquote className="text-xl text-white italic mb-4 text-center">
                &ldquo;{caseStudyData.testimonial.quote}&rdquo;
              </blockquote>
              <div className="text-center">
                <div className="text-cyan-400 font-medium">
                  — {caseStudyData.testimonial.author}
                </div>
                <div className="text-gray-400 text-sm">
                  {caseStudyData.testimonial.position}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/case-studies"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to All Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}`;
}

// Generate report page template
function generateReportPage(reportName, title, description) {
  return `import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  Award
} from 'lucide-react';

export default function ${reportName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    resourceType: 'playbook' | 'framework' | 'both';
    source?: string;
  }>({
    isOpen: false,
    resourceType: 'framework',
    source: '${reportName}_report'
  });

  const openModal = (resourceType: 'playbook' | 'framework' | 'both', source: string = '${reportName}_report') => {
    setModalState({
      isOpen: true,
      resourceType,
      source
    });
  };

  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  const reportStats = [
    { number: "500+", label: "Companies Surveyed", icon: Users },
    { number: "25", label: "Industry Sectors", icon: BarChart3 },
    { number: "92%", label: "Accuracy Rate", icon: Award },
    { number: "2024", label: "Latest Data", icon: Calendar }
  ];

  return (
    <>
      <Head>
        <title>${title} - Comprehensive Industry Report | SiteOptz</title>
        <meta 
          name="description" 
          content="${description} Download the complete report with data, insights, and industry benchmarks." 
        />
        <link rel="canonical" href="https://siteoptz.ai/reports/${reportName}" />
        
        <meta property="og:title" content="${title} | SiteOptz" />
        <meta property="og:description" content="${description}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://siteoptz.ai/reports/${reportName}" />
        <meta property="og:image" content="https://siteoptz.ai/images/reports-og.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full mr-3">
                  Industry Report
                </span>
                <span className="text-gray-400 text-sm">2024 Edition</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ${title}
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                ${description}
              </p>
            </div>

            {/* Report Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {reportStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-black border border-gray-800 rounded-xl p-4 text-center">
                    <IconComponent className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-2xl p-8 border border-purple-400/20 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Download Complete Report
                </h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Get the full ${title.toLowerCase()} with detailed analysis, charts, benchmarks, and actionable insights.
                </p>
                <button
                  onClick={() => openModal('framework', '${reportName}_hero')}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center mx-auto"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Free Report
                </button>
                <p className="text-xs text-gray-400 mt-3">PDF format • 25+ pages • Industry benchmarks included</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">What's Inside</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Comprehensive market analysis and trends</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Industry benchmarks and performance metrics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">ROI data from 500+ companies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Implementation recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Future predictions and strategic insights</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Key Findings</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-cyan-400 pl-4">
                    <div className="text-cyan-400 font-semibold mb-1">85% Adoption Rate</div>
                    <p className="text-gray-300 text-sm">Companies report significant AI adoption across operations</p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-4">
                    <div className="text-green-400 font-semibold mb-1">300% ROI Average</div>
                    <p className="text-gray-300 text-sm">Organizations achieving measurable return on AI investments</p>
                  </div>
                  <div className="border-l-4 border-purple-400 pl-4">
                    <div className="text-purple-400 font-semibold mb-1">12-Month Timeline</div>
                    <p className="text-gray-300 text-sm">Typical implementation and optimization timeframe</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/resources"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to All Resources
              </Link>
            </div>
          </div>
        </section>
      </div>

      <LeadMagnetModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        resourceType={modalState.resourceType}
        source={modalState.source}
      />
    </>
  );
}`;
}

// Generate webinar download page template
function generateWebinarDownloadPage(downloadName, title, description) {
  return `import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../../components/LeadMagnetModal';
import { 
  Download, 
  Play, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Users,
  Star,
  FileText
} from 'lucide-react';

export default function ${downloadName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Download() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    resourceType: 'playbook' | 'framework' | 'both';
    source?: string;
  }>({
    isOpen: false,
    resourceType: 'framework',
    source: '${downloadName}_download'
  });

  const openModal = (resourceType: 'playbook' | 'framework' | 'both', source: string = '${downloadName}_download') => {
    setModalState({
      isOpen: true,
      resourceType,
      source
    });
  };

  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  return (
    <>
      <Head>
        <title>${title} - Webinar Resources Download | SiteOptz</title>
        <meta 
          name="description" 
          content="${description} Download presentation slides, templates, and additional resources from our expert webinar." 
        />
        <link rel="canonical" href="https://siteoptz.ai/webinars/download/${downloadName}" />
        
        <meta property="og:title" content="${title} Resources | SiteOptz" />
        <meta property="og:description" content="${description}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://siteoptz.ai/webinars/download/${downloadName}" />
        <meta property="og:image" content="https://siteoptz.ai/images/webinars-og.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <section className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full mr-3">
                  Webinar Resources
                </span>
                <span className="text-gray-400 text-sm">Free Download</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ${title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                ${description}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-blue-400/20 mb-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Download Webinar Resources
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Get comprehensive resources including presentation slides, templates, checklists, and implementation guides.
                  </p>
                  <button
                    onClick={() => openModal('framework', '${downloadName}_main')}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Resources
                  </button>
                </div>
                
                <div className="bg-black/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Included Resources</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Complete presentation slides (PDF)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Implementation templates and checklists</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Additional reading materials and links</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Expert contact information for follow-up</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Webinar Highlights</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>60-minute expert session</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Live Q&A with industry experts</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Practical, actionable insights</span>
                  </div>
                  <div className="flex items-center">
                    <Play className="w-4 h-4 mr-3 text-cyan-400" />
                    <span>Recording available for review</span>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">What You'll Gain</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Proven implementation strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Industry best practices and frameworks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Tools and resources for immediate use</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Expert insights and recommendations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-6">
                <Link
                  href="/webinars"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Back to Webinars
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  More Resources
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <LeadMagnetModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        resourceType={modalState.resourceType}
        source={modalState.source}
      />
    </>
  );
}`;
}

// Resource page data
const resourcePages = [
  { name: 'ai-customer-service-guide', title: 'AI Customer Service Guide', description: 'Complete guide to implementing AI-powered customer service solutions, including chatbots, automation, and experience optimization.' },
  { name: 'bias-free-hiring', title: 'Bias-Free Hiring with AI', description: 'Learn how to use AI tools to eliminate hiring bias and create more diverse, equitable recruitment processes.' },
  { name: 'data-driven-marketing', title: 'Data-Driven Marketing Strategy', description: 'Transform your marketing with AI-powered analytics, personalization, and automated campaign optimization.' },
  { name: 'ai-compliance-checklist', title: 'AI Compliance Checklist', description: 'Comprehensive checklist covering AI ethics, data privacy, regulatory compliance, and risk management frameworks.' },
  { name: 'saas-optimization-guide', title: 'SaaS Optimization Guide', description: 'Optimize your SaaS business with AI-driven customer success, churn reduction, and growth acceleration strategies.' }
];

// Case study data
const caseStudyPages = [
  { name: 'hr-ai-success', title: 'HR AI Transformation Success', industry: 'Human Resources', description: 'How a mid-size company revolutionized their HR operations with AI, reducing hiring time by 60% and improving employee satisfaction.' },
  { name: 'fintech-ai', title: 'Fintech AI Implementation', industry: 'Financial Services', description: 'A fintech startup used AI to automate fraud detection and customer service, achieving 300% growth while maintaining security.' },
  { name: 'ecommerce-ai', title: 'E-commerce AI Personalization', industry: 'E-commerce', description: 'How an online retailer increased conversion rates by 150% using AI-powered personalization and recommendation engines.' },
  { name: 'healthcare-automation', title: 'Healthcare Process Automation', industry: 'Healthcare', description: 'A healthcare provider automated patient intake and scheduling, reducing wait times by 40% and improving patient satisfaction.' },
  { name: 'manufacturing-efficiency', title: 'Manufacturing AI Efficiency', industry: 'Manufacturing', description: 'Smart factory implementation reduced production costs by 25% while improving quality control through predictive maintenance.' }
];

// Report data
const reportPages = [
  { name: 'saas-ai-trends-2024', title: 'SaaS AI Trends 2024', description: 'Comprehensive analysis of AI adoption trends in SaaS companies, including implementation strategies and ROI benchmarks.' },
  { name: 'ai-adoption-survey-2024', title: 'AI Adoption Survey 2024', description: 'Survey results from 500+ companies on AI implementation challenges, successes, and future investment plans.' },
  { name: 'enterprise-ai-roi-2024', title: 'Enterprise AI ROI Report 2024', description: 'Detailed ROI analysis from enterprise AI implementations, including cost breakdowns and performance metrics.' }
];

// Webinar download data  
const webinarDownloadPages = [
  { name: 'ai-analytics-toolkit', title: 'AI Analytics Toolkit', description: 'Complete toolkit for implementing AI-powered business intelligence and data analysis solutions.' },
  { name: 'no-code-ai-resources', title: 'No-Code AI Resources', description: 'Resources and templates for building AI applications without coding, including platform comparisons and tutorials.' },
  { name: 'ai-compliance-framework', title: 'AI Compliance Framework', description: 'Framework for ensuring AI implementations meet regulatory requirements and ethical standards.' },
  { name: 'ai-content-marketing-resources', title: 'AI Content Marketing Resources', description: 'Templates, workflows, and tools for leveraging AI in content creation and marketing automation.' }
];

// Create directories if they don't exist
const createDirectories = () => {
  const dirs = [
    'pages/resources',
    'pages/case-studies',
    'pages/reports', 
    'pages/webinars/download'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};

console.log('Creating missing pages for URLs that should return 200...');

// Create directories
createDirectories();

// Generate resource pages
resourcePages.forEach(resource => {
  const filePath = `pages/resources/${resource.name}.tsx`;
  const content = generateResourcePage(resource.name, resource.title, resource.description);
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  }
});

// Generate case study pages
caseStudyPages.forEach(study => {
  const filePath = `pages/case-studies/${study.name}.tsx`;
  const content = generateCaseStudyPage(study.name, study.title, study.industry, study.description);
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  }
});

// Generate report pages
reportPages.forEach(report => {
  const filePath = `pages/reports/${report.name}.tsx`;
  const content = generateReportPage(report.name, report.title, report.description);
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  }
});

// Generate webinar download pages
webinarDownloadPages.forEach(download => {
  const filePath = `pages/webinars/download/${download.name}.tsx`;
  const content = generateWebinarDownloadPage(download.name, download.title, download.description);
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  }
});

console.log('Finished creating missing pages!');
console.log('Next step: Update redirect rules to remove wildcards that catch these new pages.');