import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { 
  getPageConfig, 
  generateSoftwareApplicationSchema,
  buildCanonicalUrl 
} from '../seo/meta-config.js';
import { Search, TrendingUp, Zap, CheckCircle, Sparkles, Brain, BarChart3, Target, Users, Rocket, Calendar, ArrowRight, Clock, DollarSign, Star, Shield, Award, Lightbulb, Heart, Briefcase, Settings, ChevronDown } from 'lucide-react';
import ExternalLink from '../components/ExternalLink';
import { authoritativeLinks } from '../utils/externalLinks';
import HeroSection from '../components/HeroSection';


interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const pageConfig = getPageConfig('home');

  // Data from why-us page
  const valueProps = [
    {
      icon: Clock,
      title: "90-Day AI Wins, Not 9-Month Projects",
      description: "Fast implementation with proven playbooks that deliver measurable results in 90 days, not lengthy enterprise timelines.",
      stats: "Average 40% efficiency gains in first 90 days"
    },
    {
      icon: Settings,
      title: "Engineering + Strategy = Real Implementation",
      description: "Unlike pure strategy consultants, we actually build and optimize your AI stack with technical expertise.",
      stats: "90% client retention rate after implementation"
    },
    {
      icon: BarChart3,
      title: "Integrated CRO + SEO + AI Optimization",
      description: "Holistic approach that connects AI tools to revenue growth through conversion rate optimization and search performance.",
      stats: "$2.3M additional revenue tracked across clients"
    }
  ];

  const objections = [
    {
      objection: "We've tried AI consultants before with mixed results",
      rebuttal: "Our engineering-capable team doesn't just recommend—we implement, test, and optimize until you see ROI. Every engagement includes 90-day win metrics.",
      icon: Target
    },
    {
      objection: "AI consulting is too expensive for our stage/size",
      rebuttal: "Our transparent, outcome-based pricing scales with your business. Most clients see 3-5x ROI within 6 months through improved efficiency and growth.",
      icon: DollarSign
    },
    {
      objection: "We need to focus on core business, not experiment with AI",
      rebuttal: "AI isn't experimental anymore—it's competitive advantage. We handle the complexity so you can focus on your business while gaining efficiency and market edge.",
      icon: Zap
    }
  ];

  const process = [
    {
      phase: "Discovery & Strategy",
      duration: "Weeks 1-2",
      description: "Deep dive into your current processes, identify AI opportunities, and map ROI potential.",
      deliverables: ["Current state assessment", "AI opportunity matrix", "ROI projections"]
    },
    {
      phase: "Roadmap Development", 
      duration: "Weeks 3-4",
      description: "Create detailed implementation roadmap with prioritized quick wins and long-term strategy.",
      deliverables: ["90-day implementation roadmap", "Tool selection matrix", "Success metrics defined"]
    },
    {
      phase: "Implementation Support",
      duration: "Weeks 5-12", 
      description: "Hands-on implementation of AI tools, integrations, and optimization workflows.",
      deliverables: ["Live AI tool implementations", "Team training", "Performance dashboards"]
    },
    {
      phase: "Optimization & Scale",
      duration: "Ongoing",
      description: "Continuous monitoring, optimization, and scaling of your AI implementations for sustained ROI.",
      deliverables: ["Monthly optimization reviews", "Performance reports", "New opportunity identification"]
    }
  ];

  const stats = [
    { number: "3-5x", label: "Average ROI Within 6 Months" },
    { number: "40%+", label: "Productivity Improvements" },
    { number: "$2.3M", label: "Additional Revenue Tracked" },
    { number: "90%", label: "Client Retention Rate" }
  ];

  const proofPoints = [
    {
      icon: TrendingUp,
      title: "Averaged 40% efficiency gains",
      description: "Clients typically see 40%+ productivity improvements in their first 90 days through AI tool optimization."
    },
    {
      icon: DollarSign,
      title: "$2.3M additional revenue tracked", 
      description: "Combined AI + CRO + SEO implementations have generated over $2.3M in tracked additional revenue for clients."
    },
    {
      icon: Award,
      title: "90% client retention rate",
      description: "9 out of 10 clients continue with ongoing optimization after initial implementation, proving sustained value."
    }
  ];

  const pricingFaqs = [
    {
      question: "What's included in the Free AI Tool Discovery plan?",
      answer: "The Free plan includes daily AI tool spotlights delivered via email, basic tool comparison features, access to our AI tool database with 100+ tools, weekly AI trends reports, and a basic ROI calculator. It's perfect for businesses just starting their AI journey and wanting to explore options without commitment."
    },
    {
      question: "How is the Starter plan different from just browsing AI tools online?",
      answer: "The Starter plan ($497/year) provides structured implementation guidance with a complete database of 500+ validated AI tools, custom 90-day implementation roadmaps, proven tool selection frameworks, ready-to-use deployment templates, ROI tracking dashboards, and monthly expert-led webinars. You save 10-15 hours per week compared to DIY research."
    },
    {
      question: "What kind of consulting do I get with the Pro plan?",
      answer: "The Pro plan ($1,997/year) includes 4 hours of 1-on-1 AI strategy consulting per quarter with our experts. This covers custom AI tool recommendations, implementation project management, advanced analytics review, white-label report creation, and quarterly strategy optimization sessions. Perfect for agencies and enterprise teams."
    },
    {
      question: "Is the Enterprise plan worth the investment for larger organizations?",
      answer: "The Enterprise plan ($4,997/year) provides unlimited consulting hours, a dedicated AI strategy consultant, custom AI tool development support, enterprise integration assistance, team training workshops, 24-hour SLA, and on-site implementation support. Large organizations typically save $50,000+ in transformation mistakes and see 50-100% increase in AI ROI."
    },
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer: "Yes, you can upgrade your plan at any time and receive prorated pricing. Downgrades take effect at your next billing cycle. We also offer a 30-day money-back guarantee if you're not satisfied with the value provided by any paid plan."
    },
    {
      question: "Do you offer custom pricing for specific needs?",
      answer: "Yes, especially for Enterprise clients or organizations with unique requirements. We can create custom packages that include specific consulting hours, specialized training, custom tool development, or industry-specific implementation support. Contact us to discuss your specific needs."
    },
    {
      question: "What's the difference between this and hiring an AI consultant?",
      answer: "Traditional AI consultants charge $200-500/hour and focus on broad strategy. Our platform combines the best of both worlds: self-service tools and resources for efficiency, plus expert consulting when you need it. You get proven frameworks, implementation templates, and ongoing support at a fraction of traditional consulting costs."
    },
    {
      question: "How quickly can I expect to see ROI from these plans?",
      answer: "Free users typically save 2-3 hours per week on research. Starter users see 15-25% productivity increases within 90 days. Pro users achieve 30-50% efficiency improvements within 6 months. Enterprise clients often see 50-100% increases in AI ROI within the first year through avoided mistakes and optimized implementations."
    }
  ];

  const generalFaqs = [
    {
      question: "What makes AI tools consulting different from general AI strategy consulting?",
      answer: "AI tools consulting focuses specifically on selecting, implementing, and optimizing software tools that use artificial intelligence, rather than broad AI transformation. We help you choose the right AI-powered tools for marketing, sales, customer service, and operations, then ensure they're properly integrated and delivering ROI."
    },
    {
      question: "How long does AI tools implementation typically take?",
      answer: "Most AI tool implementations can be completed within 90 days using our proven playbooks. Simple integrations (like ChatGPT for customer service) can be live within 2-4 weeks, while complex multi-tool implementations typically take 8-12 weeks including testing and optimization."
    },
    {
      question: "What ROI can we expect from AI tools consulting?",
      answer: "Clients typically see 3-5x ROI within 6 months through improved efficiency, reduced manual work, and better conversion rates. Common gains include 40%+ productivity improvements, 25%+ faster response times, and 15-30% improvement in lead quality through AI-powered qualification."
    },
    {
      question: "Do you work with small to mid-size companies or only enterprises?",
      answer: "We specialize in SMB to mid-market companies ($1M-$50M revenue) because they need practical, fast-implementing solutions rather than lengthy enterprise projects. Our approach is designed for companies that need quick wins and measurable results."
    },
    {
      question: "What AI tools do you typically recommend and implement?",
      answer: "We're tool-agnostic and select based on your specific needs, but commonly implement tools like HubSpot AI, Intercom's AI features, Copy.ai, Jasper, Zapier with AI actions, and various SEO AI tools. We focus on tools that integrate well with your existing stack."
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/tools?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <>
      <SEOHead
        title={pageConfig.title}
        description={pageConfig.description}
        keywords={pageConfig.keywords}
        canonicalUrl={buildCanonicalUrl('/')}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SiteOptz",
          "url": "https://siteoptz.ai",
          "description": pageConfig.description,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://siteoptz.ai/tools?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Hero Section */}
        <HeroSection />

        {/* Stats */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center px-2">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-xs sm:text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stop Guessing Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 px-2">
                Stop Guessing Which AI Tools Will Drive ROI
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
                Most businesses struggle with AI tool sprawl, unclear ROI, and slow implementation. 
                You need a proven roadmap that connects AI tools to revenue growth, not another strategy deck.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
              <div>
                <div className="space-y-6">
                  {[
                    "Unclear which AI tools actually drive ROI for your business model",
                    "Tool sprawl with multiple AI subscriptions that don't talk to each other", 
                    "Slow implementation because your team lacks technical AI expertise",
                    "Missing SEO and website performance opportunities from AI integration"
                  ].map((pain, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <p className="text-gray-300">{pain}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-black border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Our Solution</h3>
                <p className="text-gray-300 mb-6">
                  End-to-end AI consulting that goes beyond strategy to actual implementation and optimization. 
                  We&apos;re the engineering-capable consultants who deliver 90-day wins, not 9-month projects.
                </p>
                <a
                  href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  See How We&apos;re Different <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 px-2">
                Why SaaS & E-commerce Leaders Choose SiteOptz
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                We&apos;re not your typical AI consultants. We combine strategic thinking with hands-on technical implementation to deliver real results.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {valueProps.map((prop, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-2xl p-6 lg:p-8 hover:border-gray-600 transition-all">
                  <div className="flex items-start sm:items-center mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <prop.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{prop.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{prop.description}</p>
                  <div className="text-sm font-semibold text-cyan-400">{prop.stats}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our End-to-End AI Consulting Process
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From strategy to implementation to optimization, we handle every step of your AI transformation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((phase, index) => (
                <div key={index} className="relative">
                  <div className="bg-black border border-gray-800 rounded-2xl p-6 h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{phase.phase}</h3>
                        <div className="text-sm text-gray-400">{phase.duration}</div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{phase.description}</p>
                    <div className="space-y-1">
                      {phase.deliverables.map((deliverable, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {deliverable}
                        </div>
                      ))}
                    </div>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Objections Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Common Concerns We Address
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We understand your hesitations about AI consulting. Here&apos;s how we&apos;re different.
              </p>
            </div>

            <div className="space-y-8">
              {objections.map((item, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-2xl p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">&quot;{item.objection}&quot;</h3>
                      <p className="text-gray-300 text-lg">{item.rebuttal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof Points Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Proven Results That Speak for Themselves
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {proofPoints.map((proof, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <proof.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{proof.title}</h3>
                  <p className="text-gray-300">{proof.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Implementation Services Section */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-2">
                AI Implementation Services
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                From strategy to deployment, we handle the complete AI transformation journey for your business.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {/* Free Package */}
              <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-green-500/50 group">
                <div className="text-center mb-6">
                  <div className="text-sm lg:text-lg font-semibold text-gray-400 mb-2">FREE</div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">$0</div>
                  <div className="text-sm text-gray-400">Forever</div>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white text-center">AI Tool Discovery</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Daily AI Tool Spotlight
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Basic Tool Comparison
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Free AI Tool Database
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    Weekly AI Trends Report
                  </li>
                </ul>
                
                <button
                  onClick={() => setShowRegister(true)}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 group-hover:scale-105"
                >
                  Get Started
                </button>
              </div>

              {/* Starter Package */}
              <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-cyan-500/50 group">
                <div className="text-center mb-6">
                  <div className="text-sm lg:text-lg font-semibold text-gray-400 mb-2">STARTER</div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">$497</div>
                  <div className="text-sm text-gray-400">/year</div>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white text-center">AI Implementation Guide</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    Complete AI Tool Database
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    90-day Implementation Roadmap
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    ROI Tracking Dashboard
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    Monthly Implementation Webinars
                  </li>
                </ul>
                
                <a 
                  href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 group-hover:scale-105"
                >
                  Get Started
                </a>
              </div>

              {/* Pro Package */}
              <div className="bg-gradient-to-b from-gray-900 to-black border-2 border-cyan-500 p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-cyan-500/25 group relative overflow-visible">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-3 sm:px-4 lg:px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs lg:text-sm font-bold rounded-full whitespace-nowrap">
                  MOST POPULAR
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-sm lg:text-lg font-semibold text-cyan-400 mb-2">PRO</div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">$1,997</div>
                  <div className="text-sm text-gray-400">/year</div>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white text-center">AI Strategy Command Center</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    AI Strategy Consulting (4h/quarter)
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    Custom AI Tool Recommendations
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    White-label AI Tool Reports
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                    API Access & Advanced Tools
                  </li>
                </ul>
                
                <a 
                  href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 group-hover:scale-105 shadow-lg"
                >
                  Get Started
                </a>
              </div>

              {/* Enterprise Package */}
              <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-500/50 group">
                <div className="text-center mb-6">
                  <div className="text-sm lg:text-lg font-semibold text-gray-400 mb-2">ENTERPRISE</div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">$4,997</div>
                  <div className="text-sm text-gray-400">/year</div>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white text-center">AI Transformation Partner</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                    Unlimited Consulting Hours
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                    Dedicated AI Strategy Consultant
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                    Custom AI Tool Development
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                    24-hour SLA Guarantee
                  </li>
                </ul>
                
                <a 
                  href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all duration-200 group-hover:scale-105"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Our Proven 4-Step AI Implementation Process Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-2">
                Our Proven 4-Step AI Implementation Process
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                A systematic approach that eliminates guesswork and delivers measurable results in 90 days.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Step 1 */}
              <div className="text-center px-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 text-white font-bold text-lg lg:text-xl">
                  1
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Discovery & Audit</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Analyze your current processes, identify inefficiencies, and map AI opportunities to your business goals.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center px-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 text-white font-bold text-lg lg:text-xl">
                  2
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Custom Strategy</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Create your personalized 90-day AI roadmap with specific tools, timelines, and success metrics.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center px-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 text-white font-bold text-lg lg:text-xl">
                  3
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Implementation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Deploy and integrate AI tools with your existing systems, including team training and workflow optimization.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center px-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 text-white font-bold text-lg lg:text-xl">
                  4
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-3">Optimize & Scale</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Monitor performance, iterate on strategies, and scale successful implementations across your organization.
                </p>
              </div>
            </div>

            {/* Process Benefits */}
            <div className="mt-16 bg-black border border-gray-800 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Why Our Process Works</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-white font-semibold">Data-Driven Approach</div>
                        <div className="text-gray-400 text-sm">Every recommendation backed by performance benchmarks</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-white font-semibold">Industry-Specific Experience</div>
                        <div className="text-gray-400 text-sm">Specialized knowledge across 20+ business sectors</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-white font-semibold">Risk-Free Implementation</div>
                        <div className="text-gray-400 text-sm">Phased rollout with success milestones</div>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">DIY vs. Professional Implementation</h3>
                  <div className="space-y-4 overflow-x-auto">
                    <div className="flex justify-between items-center min-w-0">
                      <span className="text-gray-300 text-sm lg:text-base">Time to Results</span>
                      <div className="flex gap-2 lg:gap-4 text-right">
                        <span className="text-red-400 text-xs lg:text-sm">6-12 months (DIY)</span>
                        <span className="text-cyan-400 font-semibold text-xs lg:text-sm">90 days (With Us)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center min-w-0">
                      <span className="text-gray-300 text-sm lg:text-base">Success Rate</span>
                      <div className="flex gap-2 lg:gap-4 text-right">
                        <span className="text-red-400 text-xs lg:text-sm">23% (DIY)</span>
                        <span className="text-cyan-400 font-semibold text-xs lg:text-sm">98% (With Us)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center min-w-0">
                      <span className="text-gray-300 text-sm lg:text-base">Cost of Mistakes</span>
                      <div className="flex gap-2 lg:gap-4 text-right">
                        <span className="text-red-400 text-xs lg:text-sm">$50K+ (DIY)</span>
                        <span className="text-cyan-400 font-semibold text-xs lg:text-sm">$0 (With Us)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Pricing FAQs */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Pricing & Plans FAQ
              </h2>
              <p className="text-xl text-gray-300">
                Common questions about our pricing tiers and what&apos;s included
              </p>
            </div>

            <div className="space-y-6">
              {pricingFaqs.map((faq, index) => (
                <details key={index} className="bg-black border border-gray-800 rounded-2xl p-6 group">
                  <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* General FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Frequently Asked Questions About AI Tools
              </h2>
              <p className="text-xl text-gray-300">
                Get answers to common questions about our AI consulting approach
              </p>
            </div>

            <div className="space-y-6">
              {generalFaqs.map((faq, index) => (
                <details key={index} className="bg-black border border-gray-800 rounded-2xl p-6 group">
                  <summary className="text-lg font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>






        {/* Industry Insights Section */}
        <section className="py-16 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Industry Insights & Research
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Stay informed with the latest AI research, market analysis, and industry standards from leading authorities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black border border-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-3">Market Research</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Latest AI market trends and forecasts from industry analysts.
                </p>
                <ExternalLink 
                  href={authoritativeLinks.gartner.url}
                  title={authoritativeLinks.gartner.title}
                  description={authoritativeLinks.gartner.description}
                  className="text-sm font-medium text-gray-400 hover:text-white"
                >
                  Gartner AI Analysis
                </ExternalLink>
              </div>

              <div className="bg-black border border-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-3">Academic Research</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Cutting-edge AI research from top universities and institutions.
                </p>
                <ExternalLink 
                  href={authoritativeLinks.stanfordAI.url}
                  title={authoritativeLinks.stanfordAI.title}
                  description={authoritativeLinks.stanfordAI.description}
                  className="text-sm font-medium text-gray-400 hover:text-white"
                >
                  Stanford AI Lab
                </ExternalLink>
              </div>

              <div className="bg-black border border-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-3">Industry Standards</h3>
                <p className="text-gray-300 text-sm mb-4">
                  AI safety guidelines and ethical standards from regulatory bodies.
                </p>
                <ExternalLink 
                  href={authoritativeLinks.nist.url}
                  title={authoritativeLinks.nist.title}
                  description={authoritativeLinks.nist.description}
                  className="text-sm font-medium text-gray-400 hover:text-white"
                >
                  NIST AI Framework
                </ExternalLink>
              </div>

              <div className="bg-black border border-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-3">Business Impact</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Strategic insights on AI adoption and business transformation.
                </p>
                <ExternalLink 
                  href={authoritativeLinks.mckinsey.url}
                  title={authoritativeLinks.mckinsey.title}
                  description={authoritativeLinks.mckinsey.description}
                  className="text-sm font-medium text-gray-400 hover:text-white"
                >
                  McKinsey AI Report
                </ExternalLink>
              </div>
            </div>
          </div>
        </section>


        {/* Final CTA Section */}
        <section className="bg-gray-950 text-white py-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8">
                <Calendar className="w-4 h-4 text-cyan-400" />
                Ready to Stop Wasting Time on Wrong AI Tools?
              </div>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Get Your Custom AI Roadmap
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2">
                In 30 Minutes
              </span>
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
              Join 500+ companies who chose professional AI implementation over costly trial-and-error.
              Book your free strategy session and get a custom roadmap worth $2,500.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a 
                href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105"
              >
                <Calendar className="w-6 h-6 group-hover:animate-bounce" />
                Book Free Strategy Session
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                href="/tools"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg rounded-2xl hover:bg-white/15 transition-all duration-300"
              >
                <TrendingUp className="w-6 h-6" />
                Browse Tools Database
              </Link>
            </div>
            
            <div className="text-sm text-gray-400">
              <span className="opacity-75">✓ No sales pitch guaranteed</span>
              <span className="mx-4 opacity-50">•</span>
              <span className="opacity-75">✓ Custom roadmap included</span>
              <span className="mx-4 opacity-50">•</span>
              <span className="opacity-75">✓ 98% success rate</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};