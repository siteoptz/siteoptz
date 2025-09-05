import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Target, 
  Users, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  Lightbulb,
  Heart,
  Zap,
  Shield,
  ArrowRight,
  Clock,
  DollarSign,
  BarChart3,
  Star,
  Briefcase,
  Settings,
  ChevronDown
} from 'lucide-react';

export default function WhyUs() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://siteoptz.ai/why-us#service",
        "name": "AI Tools Consulting & Implementation",
        "description": "Expert AI tools consulting for SaaS and e-commerce leaders. 90-day roadmap, implementation support, and optimization services.",
        "provider": {
          "@type": "Organization",
          "name": "SiteOptz",
          "url": "https://siteoptz.ai",
          "logo": "https://siteoptz.ai/images/siteoptz-logo.png",
          "sameAs": [
            "https://twitter.com/siteoptz",
            "https://linkedin.com/company/siteoptz"
          ]
        },
        "serviceType": "AI Consulting",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "AI Consulting Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Strategy Development",
                "description": "90-day AI roadmap and implementation planning"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "AI Tools Implementation",
                "description": "Hands-on implementation of AI tools and integrations"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "AI Performance Optimization",
                "description": "Ongoing monitoring and optimization of AI implementations"
              }
            }
          ]
        },
        "audience": {
          "@type": "Audience",
          "audienceType": "Business Leaders",
          "geographicArea": "Worldwide"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://siteoptz.ai/why-us#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What makes AI tools consulting different from general AI strategy consulting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI tools consulting focuses specifically on selecting, implementing, and optimizing software tools that use artificial intelligence, rather than broad AI transformation. We help you choose the right AI-powered tools for marketing, sales, customer service, and operations, then ensure they're properly integrated and delivering ROI."
            }
          },
          {
            "@type": "Question", 
            "name": "How long does AI tools implementation typically take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most AI tool implementations can be completed within 90 days using our proven playbooks. Simple integrations can be live within 2-4 weeks, while complex multi-tool implementations typically take 8-12 weeks including testing and optimization."
            }
          },
          {
            "@type": "Question",
            "name": "What ROI can we expect from AI tools consulting?", 
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Clients typically see 3-5x ROI within 6 months through improved efficiency, reduced manual work, and better conversion rates. Common gains include 40%+ productivity improvements, 25%+ faster response times, and 15-30% improvement in lead quality."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://siteoptz.ai/why-us#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://siteoptz.ai"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Why Us",
            "item": "https://siteoptz.ai/why-us"
          }
        ]
      }
    ]
  };

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

  const faqs = [
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
    },
    {
      question: "How do you measure success in AI implementations?",
      answer: "We establish clear KPIs upfront, typically including time savings (hours saved per week), cost reduction, revenue impact, and user adoption rates. Every implementation includes a 90-day review with concrete metrics and optimization recommendations."
    },
    {
      question: "Can you help if we already have some AI tools but they're not working well?",
      answer: "Yes, AI tool optimization is a major part of our service. Many companies have AI tools that are underutilized or poorly configured. We audit your current setup, identify gaps, and optimize for better performance and ROI."
    },
    {
      question: "What ongoing support do you provide after implementation?",
      answer: "We offer ongoing optimization services including monthly performance reviews, new tool evaluation, integration support, and training for your team. Most clients continue with monthly or quarterly optimization sessions to maximize their AI investment."
    },
    {
      question: "How do you ensure our team actually adopts the new AI tools?",
      answer: "Change management is built into our process. We provide comprehensive training, create custom workflows for your team, and establish success metrics. We also implement gradually to avoid overwhelming your team with too many changes at once."
    },
    {
      question: "What's included in your free AI strategy consultation?",
      answer: "The free consultation includes a 45-minute audit of your current processes, identification of your top 3 AI opportunities, a preliminary ROI estimate, and a custom 90-day quick wins roadmap. There's no obligation to continue, and you'll leave with actionable insights regardless."
    }
  ];

  return (
    <>
      <Head>
        <title>AI Tools Consulting & Implementation | SiteOptz.ai</title>
        <meta 
          name="description" 
          content="Expert AI tools consulting for SaaS & e-commerce leaders. Get your 90-day AI roadmap, implementation support, and optimization services." 
        />
        <meta 
          name="keywords" 
          content="AI tools consulting, AI implementation services, AI strategy consulting, AI tools roadmap, AI optimization consultant, AI consulting agency" 
        />
        <link rel="canonical" href="https://siteoptz.ai/why-us" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Tools Consulting & Implementation | SiteOptz.ai" />
        <meta property="og:description" content="Expert AI tools consulting for SaaS & e-commerce leaders. 90-day roadmap, implementation support, and optimization services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/why-us" />
        <meta property="og:image" content="https://siteoptz.ai/images/why-us-og.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Tools Consulting & Implementation | SiteOptz.ai" />
        <meta name="twitter:description" content="90-day AI wins, not 9-month projects. Engineering-capable consulting that delivers real implementation results." />
        <meta name="twitter:image" content="https://siteoptz.ai/images/why-us-twitter.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                AI Tools Roadmap & Implementation Consulting for Growing Businesses
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Stop guessing which AI tools will drive ROI. Get your 90-day roadmap, hands-on implementation, and optimization for SaaS, e-commerce, and services leaders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Free AI Strategy Consultation
                </a>
                <Link
                  href="/tools"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
                >
                  Browse Our AI Tools Database
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stop Guessing Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Stop Guessing Which AI Tools Will Drive ROI
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Most businesses struggle with AI tool sprawl, unclear ROI, and slow implementation. 
                You need a proven roadmap that connects AI tools to revenue growth, not another strategy deck.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
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
                  We're the engineering-capable consultants who deliver 90-day wins, not 9-month projects.
                </p>
                <a
                  href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  See How We're Different <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why SaaS & E-commerce Leaders Choose SiteOptz
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We're not your typical AI consultants. We combine strategic thinking with hands-on technical implementation to deliver real results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {valueProps.map((prop, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-all">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <prop.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{prop.title}</h3>
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
                We understand your hesitations about AI consulting. Here's how we're different.
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
                      <h3 className="text-xl font-bold text-white mb-3">"{item.objection}"</h3>
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

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Frequently Asked Questions About AI Tools Consulting
              </h2>
              <p className="text-xl text-gray-300">
                Get answers to common questions about our AI consulting approach
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
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

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Work Directly With Experts Who've Helped Businesses Scale With AI
            </h2>
            <p className="text-xl text-blue-100 mb-4">
              Not Another Demo. A Real Strategy Session For Your Business.
            </p>
            <p className="text-lg text-blue-200 mb-8">
              Get Your Custom AI Roadmap in 30 Minutes
            </p>
            <a
              href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              Schedule Your Free AI Strategy Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}