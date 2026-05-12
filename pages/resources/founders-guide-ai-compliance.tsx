import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import LeadMagnetModal from '../../components/LeadMagnetModal';
import ClientsSlider from '../../components/ClientsSlider';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Users,
  Star,
  BookOpen,
  Shield,
  Target,
  Zap
} from 'lucide-react';

export default function FoundersGuideAiCompliance() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    resourceType: 'founders-guide';
    source?: string;
  }>({
    isOpen: false,
    resourceType: 'founders-guide',
    source: 'founders-guide-ai-compliance_page'
  });

  const openModal = (source: string = 'founders-guide-ai-compliance_page') => {
    setModalState({
      isOpen: true,
      resourceType: 'founders-guide',
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
        <title>The Founder's Guide to AI Compliance Before Your Series A | SiteOptz</title>
        <meta 
          name="description" 
          content="Free 15-page guide: What to fix in the next 30 days so AI questions stop killing your deals. Based on AI implementations at 500+ companies including AT&T, P&G, and US Air Force." 
        />
        <meta name="keywords" content="AI compliance for startups, Series A AI governance, EU AI Act for SaaS, AI risk register template, startup AI policy" />
        <link rel="canonical" href="https://siteoptz.ai/resources/founders-guide-ai-compliance" />
        
        <meta property="og:title" content="The Founder's Guide to AI Compliance Before Your Series A" />
        <meta property="og:description" content="Free 15-page guide: What to fix in the next 30 days so AI questions stop killing your deals." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://siteoptz.ai/resources/founders-guide-ai-compliance" />
        <meta property="og:image" content="https://siteoptz.ai/images/founders-guide-cover.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Founder's Guide to AI Compliance Before Your Series A" />
        <meta name="twitter:description" content="Free 15-page guide: What to fix in the next 30 days so AI questions stop killing your deals." />
        <meta name="twitter:image" content="https://siteoptz.ai/images/founders-guide-cover.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section with Cover Image */}
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  The Founder's Guide to AI Compliance Before Your Series A
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                  What to fix in the next 30 days so AI questions stop killing your deals
                </p>
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-cyan-400/30 rounded-lg p-4 mb-8">
                  <p className="text-cyan-400 font-semibold">
                    Based on AI implementations at 500+ companies including AT&T, P&G, and US Air Force
                  </p>
                </div>
                <button
                  onClick={() => openModal('founders-guide-ai-compliance_hero')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
                >
                  <Download className="w-6 h-6 mr-3" />
                  Download Free Guide (15 Pages)
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right: Cover Image */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-gray-800">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                    <div className="text-center p-8">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">15-Page PDF Guide</h3>
                      <p className="text-gray-400 text-sm">Cover design placeholder</p>
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  FREE
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  15 Pages
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Strip */}
        <ClientsSlider />

        {/* What's Inside Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                What's Inside This Guide
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to answer AI questions confidently in investor meetings and enterprise sales calls
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Target,
                  title: "The 5 questions every modern VC will ask about AI",
                  description: "Real diligence questions from 10+ early-stage funds with what 'good' answers look like"
                },
                {
                  icon: Shield,
                  title: "7 compliance gaps that kill enterprise deals", 
                  description: "From 'no AI inventory' to 'no incident plan' — the gaps that cost you customers"
                },
                {
                  icon: CheckCircle,
                  title: "Your minimum viable AI governance program",
                  description: "5 artifacts in priority order: inventory, policy, vendor checklist, risk register, incident plan"
                },
                {
                  icon: FileText,
                  title: "Sample AI Acceptable Use Policy (copy-paste ready)",
                  description: "400-500 words of actual policy text you can customize and implement immediately"
                },
                {
                  icon: Clock,
                  title: "30-day action plan with week-by-week implementation",
                  description: "Literal week-by-week plan you can execute without hiring anyone"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => openModal('founders-guide-ai-compliance_whats-inside')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center mx-auto"
              >
                <Download className="w-5 h-5 mr-2" />
                Get Your Free Copy Now
              </button>
            </div>
          </div>
        </section>

        {/* Resource Details Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Why This Guide Matters</h3>
                <ul className="space-y-4">
                  {[
                    "Stop losing deals to AI compliance questions",
                    "Answer VC diligence questions confidently", 
                    "Build investor trust before Series A",
                    "Protect against regulatory exposure",
                    "Enable enterprise customer conversations"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-black border border-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Resource Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <BookOpen className="w-5 h-5 mr-3 text-cyan-400" />
                    <span><strong className="text-white">15 pages</strong> of actionable content</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-3 text-cyan-400" />
                    <span><strong className="text-white">30-minute read</strong> with immediate takeaways</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users className="w-5 h-5 mr-3 text-cyan-400" />
                    <span>Perfect for <strong className="text-white">pre-Series A</strong> to Series B founders</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Star className="w-5 h-5 mr-3 text-cyan-400" />
                    <span><strong className="text-white">Copy-paste templates</strong> included</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Shield className="w-5 h-5 mr-3 text-cyan-400" />
                    <span>Based on <strong className="text-white">500+ real implementations</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA to AI Risk Scorecard */}
        <section className="py-20 bg-gradient-to-r from-orange-600/20 to-red-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-black border border-orange-500/30 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Want a Personalized Assessment First?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Take our 5-minute AI Compliance Readiness Scorecard to get a personalized version of this guide based on your specific gaps.
              </p>
              <Link
                href="/ai-governance/scorecard"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg rounded-xl hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Zap className="w-6 h-6 mr-3" />
                Run Free AI Risk Scorecard
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
              <p className="text-sm text-gray-400 mt-4">
                5 minutes • Personalized results • No sales call required
              </p>
            </div>
          </div>
        </section>

        {/* Back to Resources */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
}