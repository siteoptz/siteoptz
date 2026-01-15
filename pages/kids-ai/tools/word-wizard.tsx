import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function WordWizardLanding() {
  return (
    <>
      <Head>
        <title>SiteOptz Word Wizard - AI-Powered Language Learning for Kids | Safe Vocabulary Builder</title>
        <meta name="description" content="Expand your child&apos;s vocabulary with SiteOptz Word Wizard. AI-powered language and reading platform for kids. COPPA compliant with parental oversight. Start your 7-day free trial!" />
        <meta name="keywords" content="vocabulary builder kids, language learning children, reading skills AI, phonics app kids, safe language education, COPPA compliant reading app" />
        
        <meta property="og:title" content="SiteOptz Word Wizard - AI Language Learning for Kids" />
        <meta property="og:description" content="Safe AI-powered vocabulary and language learning for children. Build reading and communication skills. Start free trial today!" />
        <meta property="og:url" content="https://siteoptz.ai/kids-ai/tools/word-wizard" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
              <Link href="/kids-ai" className="text-white hover:text-blue-300 transition-colors">← Back to Kids AI Directory</Link>
              <Link href="/signup?plan=kids-ai&trial=7days" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">Start Free Trial</Link>
            </nav>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <section className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">🔤 SiteOptz Word Wizard</h1>
              <p className="text-2xl text-amber-200 mb-8">AI-Powered Vocabulary & Language Learning for Kids</p>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Build your child&apos;s language superpowers! Our AI Word Wizard helps children master phonics, 
                expand vocabulary, improve reading comprehension, and develop strong communication skills through interactive learning.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/signup?plan=kids-ai&trial=7days&source=word-wizard" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg">🚀 Start 7-Day FREE Trial</Link>
                <Link href="/kids-ai/apps/word-wizard" className="bg-amber-600 hover:bg-amber-700 text-white text-xl font-semibold px-10 py-4 rounded-xl transition-colors border-2 border-amber-500">🔤 Try Demo Now</Link>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Why Parents Choose SiteOptz Word Wizard</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "🗣️", title: "AI Pronunciation Coach", description: "Advanced voice recognition helps children practice proper pronunciation and speaking skills." },
                { icon: "🛡️", title: "100% Safe Environment", description: "COPPA compliant platform with voice processing that never leaves the device for complete privacy." },
                { icon: "📖", title: "Comprehensive Reading Skills", description: "Phonics, sight words, vocabulary, reading comprehension, and fluency all in one platform." },
                { icon: "📊", title: "Language Progress Tracking", description: "Detailed analytics showing vocabulary growth, reading level improvements, and communication development." },
                { icon: "🎯", title: "Adaptive Difficulty", description: "Automatically adjusts word complexity and reading level based on your child&apos;s current abilities." },
                { icon: "🌟", title: "Multi-Modal Learning", description: "Visual, auditory, and interactive learning approaches to accommodate different learning styles." }
              ].map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center mb-16">
            <div className="bg-gradient-to-r from-green-600/20 to-amber-600/20 rounded-2xl p-12 border border-green-500/30">
              <h2 className="text-4xl font-bold text-white mb-6">Build Your Child&apos;s Language Foundation</h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto mb-8">
                <div className="text-3xl font-bold text-white mb-2">7-Day FREE Trial</div>
                <div className="text-gray-300 mb-4">Then $19.99/month for unlimited access</div>
                <ul className="text-left text-gray-300 space-y-2 mb-6">
                  <li>✅ All 9 Kids AI Tools</li>
                  <li>✅ AI pronunciation coach</li>
                  <li>✅ Vocabulary expansion</li>
                  <li>✅ Reading skill development</li>
                  <li>✅ Progress tracking</li>
                  <li>✅ Cancel anytime</li>
                </ul>
              </div>
              <Link href="/signup?plan=kids-ai&trial=7days&source=word-wizard-cta" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block">🔤 Start FREE Trial Now</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}