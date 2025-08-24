import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import { 
  Download,
  CheckCircle,
  ArrowLeft,
  Clock,
  Users,
  Star,
  Heart,
  TrendingUp,
  DollarSign,
  BarChart3
} from 'lucide-react';

export default function AIHealthcare2024() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    resourceType: 'ai-healthcare-2024' as const,
    source: 'report_page'
  });

  const openModal = () => {
    setModalState({ ...modalState, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const benefits = [
    'Market analysis and AI adoption trends in healthcare',
    'ROI data from 200+ hospitals and healthcare institutions',
    'Implementation case studies and success stories',
    'Technology landscape and vendor analysis',
    'Regulatory compliance frameworks and guidelines',
    'Future predictions and investment opportunities'
  ];

  const tableOfContents = [
    { section: '1. Executive Summary', page: '3', description: 'Key findings and market overview' },
    { section: '2. Market Analysis', page: '8', description: 'AI adoption rates and growth trends' },
    { section: '3. ROI Data & Benchmarks', page: '18', description: 'Financial impact across 200+ institutions' },
    { section: '4. Implementation Case Studies', page: '28', description: 'Real-world success stories and lessons' },
    { section: '5. Technology Landscape', page: '38', description: 'Vendor analysis and solution comparison' },
    { section: '6. Regulatory Compliance', page: '48', description: 'HIPAA, FDA, and international guidelines' },
    { section: '7. Future Predictions', page: '55', description: '2025-2027 market projections' },
    { section: '8. Investment Opportunities', page: '62', description: 'Emerging trends and growth areas' }
  ];

  const stats = [
    { number: '200+', label: 'Hospitals surveyed' },
    { number: '34%', label: 'Average ROI increase' },
    { number: '$2.3M', label: 'Average cost savings' },
    { number: '87%', label: 'Improved patient outcomes' }
  ];

  return (
    <>
      <Head>
        <title>State of AI in Healthcare 2024 Report - Free Download | SiteOptz</title>
        <meta 
          name="description" 
          content="Download our comprehensive 65-page State of AI in Healthcare 2024 report. Includes ROI data from 200+ hospitals, case studies, and market analysis." 
        />
        <meta 
          name="keywords" 
          content="AI healthcare report 2024, healthcare AI adoption, medical AI ROI, healthcare technology trends, digital health" 
        />
        <link rel="canonical" href="https://siteoptz.ai/reports/ai-healthcare-2024" />
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
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-full border border-red-500/30 mb-6">
                  <Heart className="w-4 h-4 text-red-400 mr-2" />
                  <span className="text-red-400 text-sm font-medium">Healthcare AI Industry Report</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  State of AI in Healthcare 2024
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Comprehensive analysis of AI adoption in healthcare, featuring ROI data from 200+ hospitals 
                  and clinics, implementation case studies, and market predictions for 2025.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">65</div>
                    <div className="text-sm text-gray-400">Pages of Data</div>
                  </div>
                  <div className="text-center p-4 bg-black/50 rounded-lg border border-gray-800">
                    <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">200+</div>
                    <div className="text-sm text-gray-400">Institutions</div>
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
                <div className="bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-2xl p-8 border border-red-500/30">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Download Your Free Report
                    </h2>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        25 min read
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
                    className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Get Your Free Report
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    🏥 Trusted by healthcare leaders worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                What&apos;s Inside the Report
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive analysis of AI adoption trends, ROI data, and future opportunities in healthcare.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {tableOfContents.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-black border border-gray-800 rounded-xl mb-4 hover:border-cyan-400 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.section}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-cyan-400 font-mono text-sm ml-4">
                    Page {item.page}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Ahead in Healthcare Innovation
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Download the complete report and discover how leading healthcare institutions are leveraging AI.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition-colors text-lg"
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