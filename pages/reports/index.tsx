import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FileText, TrendingUp, BarChart3, Users, ArrowRight, Calendar, Download } from 'lucide-react';

const reports = [
  {
    title: 'AI Adoption Survey 2024',
    slug: 'ai-adoption-survey-2024',
    description: 'Comprehensive analysis of AI adoption trends across industries, featuring insights from 2,000+ businesses worldwide.',
    category: 'Industry Analysis',
    publishDate: '2024-12-01',
    readTime: '15 min read',
    featured: true
  },
  {
    title: 'AI Healthcare Report 2024',
    slug: 'ai-healthcare-2024',
    description: 'In-depth examination of AI implementation in healthcare, covering patient care, diagnostics, and operational efficiency.',
    category: 'Healthcare',
    publishDate: '2024-11-15',
    readTime: '20 min read',
    featured: true
  },
  {
    title: 'Claude vs GPT-4 Benchmark',
    slug: 'claude-gpt4-benchmark',
    description: 'Comprehensive performance comparison between Claude and GPT-4 across various business applications and use cases.',
    category: 'AI Comparison',
    publishDate: '2024-11-01',
    readTime: '12 min read',
    featured: true
  },
  {
    title: 'Enterprise AI ROI Report 2024',
    slug: 'enterprise-ai-roi-2024',
    description: 'Analysis of AI return on investment for enterprise implementations, featuring real ROI data from Fortune 500 companies.',
    category: 'Enterprise',
    publishDate: '2024-10-30',
    readTime: '18 min read',
    featured: false
  },
  {
    title: 'Fintech AI Report 2024',
    slug: 'fintech-ai-2024',
    description: 'Exploration of AI transformation in financial services, covering fraud detection, risk management, and customer experience.',
    category: 'Fintech',
    publishDate: '2024-10-15',
    readTime: '16 min read',
    featured: false
  },
  {
    title: 'Manufacturing AI Report 2024',
    slug: 'manufacturing-ai-2024',
    description: 'Comprehensive look at AI adoption in manufacturing, including Industry 4.0, predictive maintenance, and quality control.',
    category: 'Manufacturing',
    publishDate: '2024-10-01',
    readTime: '14 min read',
    featured: false
  },
  {
    title: 'Q4 2024 AI Market Report',
    slug: 'q4-2024-ai-market',
    description: 'Quarterly analysis of AI market trends, funding, acquisitions, and emerging technologies shaping the industry.',
    category: 'Market Analysis',
    publishDate: '2024-12-31',
    readTime: '10 min read',
    featured: false
  },
  {
    title: 'SaaS AI Trends Report 2024',
    slug: 'saas-ai-trends-2024',
    description: 'Analysis of AI integration in SaaS platforms, covering automation, personalization, and customer success applications.',
    category: 'SaaS',
    publishDate: '2024-09-15',
    readTime: '13 min read',
    featured: false
  }
];

export default function ReportsIndex() {
  const featuredReports = reports.filter(report => report.featured);
  const allReports = reports.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  return (
    <>
      <Head>
        <title>AI Industry Reports & Research | SiteOptz Analytics</title>
        <meta name="description" content="Access comprehensive AI industry reports, market analysis, and research insights. Download detailed studies on AI adoption, ROI, healthcare, fintech, and enterprise implementations." />
        <meta name="keywords" content="AI reports, AI market research, AI industry analysis, AI adoption survey, AI ROI, AI benchmarks" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://siteoptz.ai/reports" />
        
        <meta property="og:title" content="AI Industry Reports & Research | SiteOptz Analytics" />
        <meta property="og:description" content="Access comprehensive AI industry reports, market analysis, and research insights. Download detailed studies on AI adoption, ROI, healthcare, fintech, and enterprise implementations." />
        <meta property="og:url" content="https://siteoptz.ai/reports" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SiteOptz" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Industry Reports & Research | SiteOptz Analytics" />
        <meta name="twitter:description" content="Access comprehensive AI industry reports, market analysis, and research insights. Download detailed studies on AI adoption, ROI, healthcare, fintech, and enterprise implementations." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          {/* Navigation */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-cyan-400">Reports</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI Industry Reports
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive research and analysis on AI trends, adoption, and market insights from industry experts
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{reports.length}+</div>
                <div className="text-sm text-gray-400">Reports</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">10K+</div>
                <div className="text-sm text-gray-400">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">500+</div>
                <div className="text-sm text-gray-400">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">2024</div>
                <div className="text-sm text-gray-400">Latest Data</div>
              </div>
            </div>
          </header>

          {/* Featured Reports */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Reports</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredReports.map((report, index) => (
                <div key={report.slug} className="bg-black/50 border border-gray-800 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wide">{report.category}</span>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(report.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{report.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{report.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{report.readTime}</span>
                    <Link 
                      href={`/reports/${report.slug}`}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
                    >
                      Read Report
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All Reports */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">All Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allReports.map((report, index) => (
                <div key={report.slug} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wide mr-3">{report.category}</span>
                        <span className="text-xs text-gray-500">{report.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{report.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{report.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(report.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <Link 
                      href={`/reports/${report.slug}`}
                      className="ml-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated on AI Trends
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get notified when we publish new research and industry analysis
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Subscribe to Updates
                </a>
                <Link 
                  href="/contact"
                  className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Request Custom Research
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}