import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Rocket, 
  TrendingUp, 
  Building2, 
  CheckCircle, 
  ArrowRight,
  Brain,
  BarChart3,
  Users,
  Zap,
  Shield,
  Clock,
  Award,
  Target,
  DollarSign,
  Calendar,
  Phone
} from 'lucide-react';

const serviceTiers = [
  {
    name: 'Starter',
    price: '$5K-15K',
    description: 'Perfect for small businesses ready to implement their first AI solution',
    duration: '30-day support',
    features: [
      'Single AI tool implementation',
      'Process automation setup',
      'Team training sessions',
      '30-day optimization support',
      'ROI tracking dashboard',
      'Documentation & best practices'
    ],
    ideal: 'Small businesses, startups',
    highlighted: false
  },
  {
    name: 'Growth',
    price: '$25K-50K',
    description: 'Scale your AI capabilities across multiple departments',
    duration: '90-day partnership',
    features: [
      'Multi-tool AI integration',
      'Custom workflow automation',
      'API integrations',
      '90-day optimization cycle',
      'Performance monitoring',
      'Quarterly business reviews',
      'Priority support channel'
    ],
    ideal: 'Mid-market companies',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: '$75K+',
    description: 'Complete AI transformation with ongoing partnership',
    duration: '12-month partnership',
    features: [
      'Full AI ecosystem design',
      'Enterprise-wide implementation',
      'Custom AI model development',
      '12-month strategic partnership',
      'Dedicated success manager',
      'Compliance & security audit',
      'C-suite advisory sessions',
      '24/7 support access'
    ],
    ideal: 'Large enterprises',
    highlighted: false
  }
];

const competitiveAdvantages = [
  {
    icon: DollarSign,
    title: '$50M+ Productivity Gains',
    description: 'Proven track record across 500+ implementations with measurable ROI'
  },
  {
    icon: Shield,
    title: '90-Day Guarantee',
    description: 'The only AI consultancy offering performance guarantees'
  },
  {
    icon: Building2,
    title: 'Fortune 500 Proven',
    description: 'Enterprise credibility with mid-market accessibility'
  },
  {
    icon: Zap,
    title: 'Full-Stack Implementation',
    description: 'Beyond strategy - we build and deploy custom solutions'
  },
  {
    icon: Brain,
    title: 'Industry Expertise',
    description: 'Specialized playbooks for healthcare, finance, and manufacturing'
  },
  {
    icon: Clock,
    title: 'Ongoing Optimization',
    description: 'Continuous improvement, not just initial setup'
  }
];

const industries = [
  {
    name: 'Healthcare',
    savings: '$12M average savings',
    useCases: ['Patient data analysis', 'Diagnostic assistance', 'Administrative automation']
  },
  {
    name: 'Manufacturing',
    savings: '$8M productivity gain',
    useCases: ['Predictive maintenance', 'Quality control', 'Supply chain optimization']
  },
  {
    name: 'Finance',
    savings: '45% faster processing',
    useCases: ['Risk assessment', 'Fraud detection', 'Customer service automation']
  }
];

export default function ServicesPage() {
  const [selectedTier, setSelectedTier] = useState('Growth');

  return (
    <>
      <Head>
        <title>AI Implementation Services | Enterprise AI Solutions | SiteOptz</title>
        <meta name="description" content="Transform your business with proven AI implementation services. $50M+ in productivity gains, 90-day guarantee, Fortune 500 proven solutions with mid-market accessibility." />
        <meta name="keywords" content="AI implementation, enterprise AI, AI consulting, AI transformation, business automation" />
        <link rel="canonical" href="https://siteoptz.ai/services" />
        
        <meta property="og:title" content="AI Implementation Services - $50M+ in Proven Results | SiteOptz" />
        <meta property="og:description" content="Enterprise AI transformation with guaranteed results. From $5K starter packages to full enterprise solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/services" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "SiteOptz AI Implementation Services",
              "description": "Enterprise AI consulting and implementation services",
              "url": "https://siteoptz.ai/services",
              "priceRange": "$5,000 - $75,000+",
              "areaServed": "Global",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Implementation Packages",
                "itemListElement": serviceTiers.map(tier => ({
                  "@type": "Offer",
                  "name": tier.name,
                  "price": tier.price,
                  "description": tier.description
                }))
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="pt-20 pb-16 relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                <Award className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-medium">$50M+ in Productivity Gains</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Enterprise AI Implementation
              </h1>
              <p className="text-2xl text-cyan-400 font-semibold mb-4">
                Turning AI Into ROI™
              </p>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                The only AI consultancy with a 90-day performance guarantee. 
                Fortune 500 proven solutions, now accessible to mid-market companies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/assessment" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all">
                  Get AI Readiness Assessment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/roi-calculator" className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all">
                  Calculate Your ROI
                  <BarChart3 className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                <div className="text-gray-400">Implementations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">$50M+</div>
                <div className="text-gray-400">Productivity Gains</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">90-Day</div>
                <div className="text-gray-400">Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">3.2x</div>
                <div className="text-gray-400">Average ROI</div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Tiers */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Implementation Packages
              </h2>
              <p className="text-xl text-gray-300">
                Proven solutions tailored to your business size and needs
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {serviceTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative bg-gray-900 border ${
                    tier.highlighted ? 'border-cyan-500' : 'border-gray-800'
                  } rounded-2xl p-8 hover:border-cyan-500/50 transition-all`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-cyan-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">{tier.price}</div>
                    <div className="text-gray-400 text-sm mb-4">{tier.duration}</div>
                    <p className="text-gray-300">{tier.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <div className="text-sm text-gray-400 mb-4">Ideal for: {tier.ideal}</div>
                    <button
                      onClick={() => setSelectedTier(tier.name)}
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        tier.highlighted
                          ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700'
                          : 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose SiteOptz
              </h2>
              <p className="text-xl text-gray-300">
                Proven results that set us apart from generic AI consultants
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {competitiveAdvantages.map((advantage, index) => (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center mb-4">
                    <advantage.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{advantage.title}</h3>
                  <p className="text-gray-400">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Expertise */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Industry-Specific Solutions
              </h2>
              <p className="text-xl text-gray-300">
                Specialized playbooks with compliance and regulatory expertise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{industry.name}</h3>
                  <div className="text-cyan-400 font-semibold mb-4">{industry.savings}</div>
                  <ul className="space-y-2">
                    {industry.useCases.map((useCase, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                        <span className="text-gray-300">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Compliance & Security Expertise
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300">HIPAA</span>
                <span className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300">SOX</span>
                <span className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300">GDPR</span>
                <span className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300">ISO 27001</span>
                <span className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300">PCI DSS</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 500+ companies that have achieved measurable ROI with our AI implementation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/assessment" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all">
                Start Free Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/consultation" className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all">
                <Phone className="w-5 h-5" />
                Schedule Consultation
              </Link>
            </div>
            
            <p className="text-gray-400">
              Or call us directly: <span className="text-cyan-400 font-semibold">1-800-AI-OPTZ</span>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}