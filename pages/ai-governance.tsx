import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  AlertTriangle, 
  FileText,
  Zap,
  Clock,
  Target,
  Users,
  Building,
  Gavel,
  TrendingUp,
  X
} from 'lucide-react';
import FAQSection from '../components/FAQSection';
import ClientsSlider from '../components/ClientsSlider';
import PricingCalculator from '../components/PricingCalculator';

export default function AIGovernancePage() {
  // Pricing data with compliance column
  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      features: [
        "AI Risk Self-Assessment",
        "10-question scorecard",
        "Basic risk identification",
        "Community support"
      ]
    },
    {
      name: "Starter",
      price: "497",
      features: [
        "AI tool inventory template",
        "5 starter policy templates", 
        "Basic compliance checklist",
        "Email support"
      ]
    },
    {
      name: "Pro", 
      price: "1997",
      features: [
        "Full Compliance Copilot dashboard",
        "Risk register generation",
        "Framework mapping (NIST, ISO)",
        "Priority support"
      ]
    },
    {
      name: "Enterprise",
      price: "4997", 
      features: [
        "Audit-ready documentation package",
        "Customer/investor data room",
        "Quarterly compliance review",
        "Dedicated success manager"
      ]
    }
  ];

  const complianceFeatures = [
    "AI Risk Self-Assessment (10-question scorecard)",
    "+ AI tool inventory template + 5 starter policy templates",
    "+ Full Compliance Copilot dashboard + risk register + framework mapping",
    "+ Audit-ready documentation package + customer/investor data room + quarterly compliance review"
  ];

  // FAQ data specific to AI Governance
  const faqData = [
    {
      question: "Is this a replacement for our lawyer?",
      answer: "No. It's a replacement for the 200 hours your lawyer would otherwise bill while assembling AI documentation from scratch. We hand your lawyer a complete package they review and sign off on."
    },
    {
      question: "Do we need a CISO or security team to use this?", 
      answer: "No. The Copilot is designed for companies without dedicated security headcount. Your CTO, ops lead, or founder can drive it."
    },
    {
      question: "How is this different from Vanta or Drata?",
      answer: "Vanta and Drata are SOC 2 platforms that added AI modules. We're AI implementation experts who added compliance. The difference shows up in two places: setup time (days vs. months) and the depth of AI-specific framework coverage."
    },
    {
      question: "What if our AI stack changes?",
      answer: "The dashboard re-scans continuously. When a developer adds a new OpenAI integration or your team starts using a new tool, the risk register updates automatically."
    },
    {
      question: "Do you support our industry's specific regulations?",
      answer: "We cover the cross-cutting frameworks (EU AI Act, NIST, SOC 2, GDPR) plus industry-specific overlays for healthcare (HIPAA), finance (SR 11-7, NYDFS), legal, HR (NYC Local Law 144), and education (FERPA). If your industry has a specific framework, ask."
    },
    {
      question: "Can we use this without buying SiteOptz consulting?",
      answer: "Yes. The standalone Compliance Copilot add-on is $99–$299/mo and doesn't require any other SiteOptz plan."
    },
    {
      question: "How long does implementation take?",
      answer: "Most customers go from kickoff to audit-ready documentation in 14 days. Enterprise clients with complex stacks: 21–30 days."
    }
  ];

  return (
    <>
      <Head>
        <title>AI Compliance Copilot | AI Governance & Risk Management for SMBs | SiteOptz</title>
        <meta 
          name="description" 
          content="Document every AI tool, map every compliance risk, and generate audit-ready policies in days — not months. Built for companies that need to close enterprise deals and pass due diligence without a $50,000 governance platform." 
        />
        <meta name="keywords" content="AI governance, AI compliance, AI risk management, EU AI Act, NIST AI RMF, SOC 2 AI controls, AI policy templates" />
        <link rel="canonical" href="https://siteoptz.ai/ai-governance" />
        
        <meta property="og:title" content="AI Compliance Copilot | AI Governance & Risk Management for SMBs | SiteOptz" />
        <meta property="og:description" content="Document every AI tool, map every compliance risk, and generate audit-ready policies in days — not months." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://siteoptz.ai/ai-governance" />
        <meta property="og:image" content="https://siteoptz.ai/images/ai-governance-og.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Compliance Copilot | AI Governance & Risk Management for SMBs" />
        <meta name="twitter:description" content="Document every AI tool, map every compliance risk, and generate audit-ready policies in days — not months." />
        <meta name="twitter:image" content="https://siteoptz.ai/images/ai-governance-og.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                YOUR AI STACK IS A LIABILITY<br />
                <span className="text-red-400">UNTIL YOU CAN PROVE IT ISN'T</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                You picked the right AI tools. You deployed them for ROI. Now your biggest customer wants a risk assessment, 
                your investor wants AI governance documentation, and your auditor wants a register of every model that touches customer data.
              </p>
              <p className="text-2xl lg:text-3xl font-bold text-cyan-400 mb-12">
                We give you all three — in 14 days, not 14 months.
              </p>
              
              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  href="/ai-governance#scorecard"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg rounded-xl hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Shield className="w-6 h-6" />
                  Run My Free AI Risk Scorecard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Users className="w-6 h-6" />
                  Book a Compliance Strategy Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Built for companies under $50M revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No security team required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Audit-ready in 14 days</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Your AI Stack Just Became a Sales Blocker
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Three things changed in 2025–2026 that turned AI compliance from "nice to have" into "deal-killer":
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Building,
                  title: "Enterprise procurement now asks",
                  description: "Every Fortune 500 RFP now includes AI risk questions. Companies that can't answer them lose the deal — usually without ever knowing why."
                },
                {
                  icon: TrendingUp,
                  title: "Investors now require it",
                  description: "Series A and later rounds increasingly include AI governance in due diligence. Founders showing up with a slide deck and no risk register lose 2–4 weeks of fundraising momentum."
                },
                {
                  icon: Gavel,
                  title: "Regulators now enforce it", 
                  description: "The EU AI Act, Colorado AI Act, NYC bias audit law, and a dozen state-level AI laws are now in effect or imminent. If you sell across borders or have remote employees, you're probably exposed."
                }
              ].map((problem, index) => (
                <div key={index} className="bg-black border border-red-500/30 rounded-xl p-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                    <problem.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                  <p className="text-gray-300">{problem.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-xl text-gray-300">
                The companies that win are the ones that show up with documentation already in hand. Everyone else watches deals slip.
              </p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Meet the AI Compliance Copilot
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
                A single dashboard that scans your AI stack, maps every compliance risk, and generates the documentation your buyers, investors, and auditors need.
              </p>
              <h3 className="text-2xl font-bold text-white mb-8">What it does</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Target,
                  title: "Auto-inventories every AI tool your team uses",
                  description: "OpenAI, Anthropic, Google, AWS Bedrock, plus shadow AI tools your team installed without telling anyone."
                },
                {
                  icon: AlertTriangle,
                  title: "Flags every risk in plain English",
                  description: "Which models touch PII, which vendors lack SOC 2, which deployments are subject to EU AI Act high-risk classifications, which prompts could leak customer data."
                },
                {
                  icon: FileText,
                  title: "Generates policies on demand",
                  description: "AI acceptable use policy, vendor review checklist, data handling SOP, incident response playbook. All editable, all branded to your company."
                },
                {
                  icon: Shield,
                  title: "Produces the audit packet",
                  description: "Risk register, control mapping (NIST AI RMF, ISO 42001, SOC 2 CC), and the one-page executive summary every enterprise buyer asks for."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frameworks Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Frameworks We Cover
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Pre-mapped to the regulations and frameworks your buyers care about:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "EU AI Act — risk classification, prohibited practices, high-risk system documentation",
                "NIST AI Risk Management Framework (AI RMF 1.0) — Govern, Map, Measure, Manage", 
                "ISO/IEC 42001 — AI management system standard",
                "SOC 2 — AI-specific controls under CC, A, and C trust services criteria",
                "GDPR — Article 22 automated decision-making, DPIA requirements",
                "HIPAA — AI handling of PHI, BAA requirements for AI vendors",
                "State laws — Colorado AI Act, NYC Local Law 144, California ADMT regulations"
              ].map((framework, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{framework}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-cyan-400 font-semibold">
                If your buyer asks "are you compliant with X?" — the answer is in the dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                How It Works (4 Steps)
              </h2>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Connect & Scan (Day 1–3)",
                  description: "Connect your AI providers (OpenAI, Anthropic, AWS, Google) and dev tools (GitHub, Vercel). We auto-detect every AI integration in your codebase and operations.",
                  days: "Day 1–3"
                },
                {
                  step: "2", 
                  title: "Risk Mapping (Day 4–7)",
                  description: "We classify every AI use case against the frameworks that apply to your business — based on industry, geography, and customer base.",
                  days: "Day 4–7"
                },
                {
                  step: "3",
                  title: "Policy & Documentation Generation (Day 8–11)", 
                  description: "The platform generates your full policy stack: acceptable use, vendor review, data handling, incident response, model risk register.",
                  days: "Day 8–11"
                },
                {
                  step: "4",
                  title: "Audit-Ready Package (Day 12–14)",
                  description: "You walk into your next enterprise meeting, due diligence call, or audit with a 1-pager, a 20-page detailed risk register, and policies signed by the right people.",
                  days: "Day 12–14"
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Who This Is For
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                "You're approaching an enterprise deal and procurement is asking AI risk questions you can't answer in your sleep.",
                "You're raising a round and your data room is missing the AI governance section every modern VC now expects.",
                "You're scaling past 25 employees and 'we don't really have an AI policy' stopped being a defensible answer six months ago.",
                "You're in healthcare, finance, legal, or HR tech and AI regulation in your industry is moving faster than your legal team can read."
              ].map((scenario, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300 text-lg">{scenario}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-black border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                How We Compare
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Feature</th>
                      <th className="text-center py-4 px-6 text-gray-400 font-medium">Legal Counsel</th>
                      <th className="text-center py-4 px-6 text-gray-400 font-medium">Vanta / Drata</th>
                      <th className="text-center py-4 px-6 text-gray-400 font-medium">DIY Internal</th>
                      <th className="text-center py-4 px-6 text-white font-medium bg-blue-500/20">SiteOptz AI Compliance Copilot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: "Setup cost",
                        legal: "$5,000–$15,000",
                        vanta: "$25,000+", 
                        diy: "200+ hours",
                        siteoptz: "$0"
                      },
                      {
                        feature: "Monthly cost",
                        legal: "$300/hour as needed",
                        vanta: "$1,500–$4,000/mo",
                        diy: "Internal salary", 
                        siteoptz: "Included in plan"
                      },
                      {
                        feature: "AI-specific",
                        legal: "❌ Generic legal",
                        vanta: "⚠️ Bolt-on module",
                        diy: "❌",
                        siteoptz: "✅ Built for AI"
                      },
                      {
                        feature: "Requires security team",
                        legal: "❌",
                        vanta: "✅ Yes",
                        diy: "✅ Yes",
                        siteoptz: "❌ No"
                      },
                      {
                        feature: "Time to audit-ready",
                        legal: "8–12 weeks",
                        vanta: "4–6 months", 
                        diy: "6+ months",
                        siteoptz: "14 days"
                      },
                      {
                        feature: "Updates as you change",
                        legal: "❌ Static docs",
                        vanta: "⚠️ Manual",
                        diy: "❌",
                        siteoptz: "✅ Auto-updates"
                      }
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-4 px-6 text-gray-300 font-medium">{row.feature}</td>
                        <td className="py-4 px-6 text-center text-gray-400">{row.legal}</td>
                        <td className="py-4 px-6 text-center text-gray-400">{row.vanta}</td>
                        <td className="py-4 px-6 text-center text-gray-400">{row.diy}</td>
                        <td className="py-4 px-6 text-center text-white font-semibold bg-blue-500/10">{row.siteoptz}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Pricing — Integrated Across All Tiers
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                AI Compliance Copilot isn't a separate product. It's layered into every SiteOptz plan.
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-2xl p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Plan</th>
                      <th className="text-center py-4 px-6 text-gray-400 font-medium">Price</th>
                      <th className="text-left py-4 px-6 text-white font-medium bg-blue-500/20">Compliance Layer Included</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingPlans.map((plan, index) => (
                      <tr key={plan.name} className="border-b border-gray-800">
                        <td className="py-4 px-6">
                          <div className="font-bold text-white text-lg">{plan.name}</div>
                          <div className="text-sm text-gray-400 mt-1">
                            {plan.features.slice(0, 2).join(" • ")}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="text-2xl font-bold text-white">
                            {plan.price === "0" ? "Free" : `$${plan.price}`}
                            {plan.price !== "0" && <span className="text-sm text-gray-400">/year</span>}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-gray-300">{complianceFeatures[index]}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-300 mb-6">
                Need standalone compliance without the full implementation suite? 
                Ask about the <strong className="text-white">Compliance Copilot Add-On</strong> ($99–$299/mo).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/upgrade"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  See Full Pricing
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-cyan-700 transition-colors"
                >
                  Talk to a Compliance Consultant
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <ClientsSlider />

        {/* Customer Testimonials */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400 fill-current">⭐</div>
                  ))}
                </div>
                <blockquote className="text-lg text-gray-300 mb-4">
                  "We had three enterprise deals stalled on AI questionnaires we couldn't answer. SiteOptz turned that around in two weeks. All three closed."
                </blockquote>
                <div className="text-sm text-gray-400">
                  — Client, Series B SaaS Company
                </div>
              </div>

              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400 fill-current">⭐</div>
                  ))}
                </div>
                <blockquote className="text-lg text-gray-300 mb-4">
                  "Our Series B data room was missing exactly one thing. SiteOptz filled it in 10 days."
                </blockquote>
                <div className="text-sm text-gray-400">
                  — CTO, FinTech Startup
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
            </div>
            
            <FAQSection faqs={faqData} toolName="AI Governance" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stop Losing Deals to a Question You Should've Answered Last Quarter
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Your competitors are showing up to enterprise meetings with AI governance docs in hand. 
              Your investors are asking what you don't yet have. Your auditors are about to.
            </p>
            <p className="text-2xl font-bold text-cyan-400 mb-12">
              Run the free AI Risk Scorecard now. Get your top 3 gaps in 5 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/ai-governance#scorecard"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg rounded-xl hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Zap className="w-6 h-6" />
                Start Free Scorecard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Users className="w-6 h-6" />
                Book a Strategy Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No sales pitch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>5-minute completion</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}