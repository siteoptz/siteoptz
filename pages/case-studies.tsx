import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  BarChart3,
  ArrowRight,
  Building2,
  Zap,
  Shield,
  Award,
  Target,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  companySize: string;
  challenge: string;
  solution: string;
  results: {
    roi: string;
    savings: string;
    productivity: string;
    timeline: string;
  };
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  packageUsed: string;
  featured: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'healthcare-automation',
    title: 'Healthcare System Automates Patient Data Processing',
    company: 'Regional Medical Center',
    industry: 'Healthcare',
    companySize: '500+ employees',
    challenge: 'Manual patient data entry consuming 40+ hours weekly, leading to delayed care and administrative bottlenecks.',
    solution: 'Implemented AI-powered document processing and automated patient data workflows with HIPAA-compliant systems.',
    results: {
      roi: '340%',
      savings: '$1.2M annually',
      productivity: '65% faster processing',
      timeline: '4 months'
    },
    metrics: [
      { label: 'Processing Time', value: '15 minutes', improvement: '↓ 75%' },
      { label: 'Data Accuracy', value: '99.7%', improvement: '↑ 15%' },
      { label: 'Staff Hours Saved', value: '2,080/year', improvement: '↑ 65%' },
      { label: 'Patient Satisfaction', value: '94%', improvement: '↑ 23%' }
    ],
    testimonial: {
      quote: "The AI implementation transformed our operations. We&apos;re now focusing on patient care instead of paperwork.",
      author: "Dr. Sarah Chen",
      position: "Chief Medical Officer"
    },
    packageUsed: 'Enterprise',
    featured: true
  },
  {
    id: 'manufacturing-predictive',
    title: 'Manufacturing Giant Reduces Downtime with Predictive Maintenance',
    company: 'Industrial Components Inc.',
    industry: 'Manufacturing',
    companySize: '1,200 employees',
    challenge: 'Unplanned equipment failures causing $500K monthly losses and production delays.',
    solution: 'Deployed IoT sensors and AI models for predictive maintenance across 50+ production lines.',
    results: {
      roi: '420%',
      savings: '$6.2M annually',
      productivity: '87% reduction in downtime',
      timeline: '6 months'
    },
    metrics: [
      { label: 'Unplanned Downtime', value: '2.3 hours/month', improvement: '↓ 87%' },
      { label: 'Maintenance Costs', value: '$45K/month', improvement: '↓ 62%' },
      { label: 'Production Efficiency', value: '94%', improvement: '↑ 28%' },
      { label: 'Equipment Lifespan', value: '+3.2 years', improvement: '↑ 35%' }
    ],
    testimonial: {
      quote: "Predictive maintenance has revolutionized our operations. We prevent problems before they happen.",
      author: "Mike Rodriguez",
      position: "VP of Operations"
    },
    packageUsed: 'Enterprise',
    featured: true
  },
  {
    id: 'finance-fraud-detection',
    title: 'Financial Services Enhances Fraud Detection',
    company: 'Metro Credit Union',
    industry: 'Finance',
    companySize: '250 employees',
    challenge: 'Rising fraud losses and manual review processes delaying legitimate transactions.',
    solution: 'Implemented real-time AI fraud detection with automated risk scoring and compliance reporting.',
    results: {
      roi: '280%',
      savings: '$850K annually',
      productivity: '92% faster detection',
      timeline: '3 months'
    },
    metrics: [
      { label: 'Fraud Detection Rate', value: '98.5%', improvement: '↑ 45%' },
      { label: 'False Positives', value: '0.8%', improvement: '↓ 78%' },
      { label: 'Review Time', value: '2 minutes', improvement: '↓ 92%' },
      { label: 'Member Satisfaction', value: '96%', improvement: '↑ 18%' }
    ],
    testimonial: {
      quote: "Our fraud detection is now best-in-class. Members experience seamless transactions while we stay protected.",
      author: "Lisa Thompson",
      position: "Chief Risk Officer"
    },
    packageUsed: 'Growth',
    featured: false
  },
  {
    id: 'ecommerce-personalization',
    title: 'E-commerce Platform Boosts Sales with AI Personalization',
    company: 'Fashion Forward Online',
    industry: 'Retail',
    companySize: '125 employees',
    challenge: 'Low conversion rates and generic customer experience leading to cart abandonment.',
    solution: 'Deployed AI-powered personalization engine with dynamic pricing and recommendation systems.',
    results: {
      roi: '385%',
      savings: '$2.1M annually',
      productivity: '156% increase in conversions',
      timeline: '2 months'
    },
    metrics: [
      { label: 'Conversion Rate', value: '8.4%', improvement: '↑ 156%' },
      { label: 'Average Order Value', value: '$127', improvement: '↑ 43%' },
      { label: 'Cart Abandonment', value: '32%', improvement: '↓ 58%' },
      { label: 'Customer Lifetime Value', value: '$890', improvement: '↑ 67%' }
    ],
    testimonial: {
      quote: "AI personalization transformed our business. Customers love the experience and our sales have skyrocketed.",
      author: "Jennifer Park",
      position: "CEO"
    },
    packageUsed: 'Growth',
    featured: false
  },
  {
    id: 'logistics-optimization',
    title: 'Logistics Company Optimizes Routes with AI',
    company: 'Express Delivery Solutions',
    industry: 'Logistics',
    companySize: '800 employees',
    challenge: 'Inefficient routing causing delayed deliveries and high fuel costs.',
    solution: 'Implemented AI route optimization with real-time traffic analysis and dynamic scheduling.',
    results: {
      roi: '290%',
      savings: '$1.8M annually',
      productivity: '35% reduction in delivery time',
      timeline: '3 months'
    },
    metrics: [
      { label: 'Delivery Time', value: '1.2 hours', improvement: '↓ 35%' },
      { label: 'Fuel Costs', value: '$125K/month', improvement: '↓ 28%' },
      { label: 'On-time Delivery', value: '96%', improvement: '↑ 24%' },
      { label: 'Customer Satisfaction', value: '92%', improvement: '↑ 19%' }
    ],
    testimonial: {
      quote: "AI route optimization has made us the fastest delivery service in our market. Customers choose us for reliability.",
      author: "David Chang",
      position: "Operations Director"
    },
    packageUsed: 'Growth',
    featured: false
  },
  {
    id: 'legal-document-review',
    title: 'Law Firm Accelerates Document Review Process',
    company: 'Corporate Legal Partners',
    industry: 'Legal Services',
    companySize: '75 employees',
    challenge: 'Manual document review taking weeks and costing $200K per case.',
    solution: 'Deployed AI-powered legal document analysis with automated contract review and risk assessment.',
    results: {
      roi: '450%',
      savings: '$680K annually',
      productivity: '85% faster review',
      timeline: '2 months'
    },
    metrics: [
      { label: 'Review Time', value: '2.5 days', improvement: '↓ 85%' },
      { label: 'Accuracy Rate', value: '97%', improvement: '↑ 12%' },
      { label: 'Cost per Case', value: '$35K', improvement: '↓ 82%' },
      { label: 'Client Satisfaction', value: '95%', improvement: '↑ 28%' }
    ],
    testimonial: {
      quote: "AI has revolutionized our practice. We deliver faster, more accurate results while significantly reducing costs.",
      author: "Amanda Foster",
      position: "Managing Partner"
    },
    packageUsed: 'Starter',
    featured: false
  }
];

export default function CaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedPackage, setSelectedPackage] = useState('All');

  const industries = ['All', ...Array.from(new Set(caseStudies.map(cs => cs.industry)))];
  const packages = ['All', 'Starter', 'Growth', 'Enterprise'];

  const filteredCaseStudies = caseStudies.filter(cs => {
    return (selectedIndustry === 'All' || cs.industry === selectedIndustry) &&
           (selectedPackage === 'All' || cs.packageUsed === selectedPackage);
  });

  const featuredStudies = caseStudies.filter(cs => cs.featured);

  return (
    <>
      <Head>
        <title>AI Implementation Case Studies | $50M+ in Proven Results | SiteOptz</title>
        <meta name="description" content="See how 500+ companies achieved measurable ROI with our AI implementation services. Real case studies with detailed ROI breakdowns across healthcare, finance, and manufacturing." />
        <meta name="keywords" content="AI case studies, AI implementation results, AI ROI examples, enterprise AI success stories" />
        <link rel="canonical" href="https://siteoptz.ai/case-studies" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="pt-20 pb-16 relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">$50M+ in Productivity Gains</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Proven AI Success Stories
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Real case studies from 500+ implementations showing measurable ROI, 
                productivity gains, and business transformation across industries.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">340%</div>
                  <div className="text-gray-400">Average ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">3.2M</div>
                  <div className="text-gray-400">Avg Annual Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">75%</div>
                  <div className="text-gray-400">Productivity Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">4.2</div>
                  <div className="text-gray-400">Months to ROI</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Case Studies */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Featured Success Stories
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {featuredStudies.map((study) => (
                <div key={study.id} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-cyan-400 text-sm font-medium mb-2">{study.industry}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{study.title}</h3>
                      <div className="text-gray-400">{study.companySize}</div>
                    </div>
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-3 py-1">
                      <span className="text-cyan-400 text-sm font-medium">{study.packageUsed}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-1">ROI</div>
                      <div className="text-2xl font-bold text-green-400">{study.results.roi}</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-1">Annual Savings</div>
                      <div className="text-2xl font-bold text-cyan-400">{study.results.savings}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Results</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {study.metrics.slice(0, 4).map((metric, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">{metric.label}</span>
                          <div className="text-right">
                            <div className="text-white font-semibold">{metric.value}</div>
                            <div className="text-green-400 text-xs">{metric.improvement}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <blockquote className="border-l-4 border-cyan-500 pl-4 mb-6">
                    <p className="text-gray-300 italic mb-2">&quot;{study.testimonial.quote}&quot;</p>
                    <footer className="text-sm">
                      <cite className="text-white font-medium">{study.testimonial.author}</cite>
                      <span className="text-gray-400">, {study.testimonial.position}</span>
                    </footer>
                  </blockquote>

                  <Link href={`/case-studies/${study.id}`} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Case Studies */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                All Case Studies
              </h2>
              <p className="text-xl text-gray-300">
                Explore results across different industries and implementation packages
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-12 justify-center">
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-400 text-sm self-center mr-2">Industry:</span>
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedIndustry === industry
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-400 text-sm self-center mr-2">Package:</span>
                {packages.map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedPackage === pkg
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {pkg}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((study) => (
                <div key={study.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-cyan-400 text-sm font-medium">{study.industry}</div>
                    <div className="bg-gray-800 rounded px-2 py-1">
                      <span className="text-xs text-gray-400">{study.packageUsed}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">{study.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{study.results.roi}</div>
                      <div className="text-xs text-gray-400">ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-cyan-400">{study.results.savings}</div>
                      <div className="text-xs text-gray-400">Savings</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{study.challenge}</p>
                  
                  <Link href={`/case-studies/${study.id}`} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                    Read Case Study
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let&apos;s discuss how we can achieve similar results for your organization
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all">
                Start Free Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/consultation" className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all">
                Schedule Consultation
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}