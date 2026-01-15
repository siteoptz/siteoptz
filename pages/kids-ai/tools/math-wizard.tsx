import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function MathWizardLanding() {
  return (
    <>
      <Head>
        <title>SiteOptz Math Wizard - AI-Powered Math Learning for Kids | Safe Math Tutoring</title>
        <meta name="description" content="Make math fun for your child with SiteOptz Math Wizard. AI-powered interactive math lessons. COPPA compliant with parental oversight. Start your 7-day free trial!" />
        <meta name="keywords" content="math learning kids, AI math tutor children, interactive math games, safe math education, COPPA compliant math app" />
        
        <meta property="og:title" content="SiteOptz Math Wizard - AI Math Learning for Kids" />
        <meta property="og:description" content="Safe AI-powered math education for children. Make math fun and engaging. Start free trial today!" />
        <meta property="og:url" content="https://siteoptz.ai/kids-ai/tools/math-wizard" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900">
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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">🔢 SiteOptz Math Wizard</h1>
              <p className="text-2xl text-cyan-200 mb-8">AI-Powered Interactive Math Learning for Kids</p>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Transform math anxiety into math confidence! Our AI Math Wizard makes learning mathematics 
                fun and interactive with personalized lessons, visual explanations, and engaging problem-solving adventures.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/signup?plan=kids-ai&trial=7days&source=math-wizard" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg">🚀 Start 7-Day FREE Trial</Link>
                <Link href="/kids-ai/apps/math-wizard" className="bg-cyan-600 hover:bg-cyan-700 text-white text-xl font-semibold px-10 py-4 rounded-xl transition-colors border-2 border-cyan-500">🔢 Try Demo Now</Link>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Why Parents Choose SiteOptz Math Wizard</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "🧮", title: "AI-Powered Personalization", description: "Adapts to your child&apos;s learning style and pace with visual, interactive explanations." },
                { icon: "🛡️", title: "100% Safe Environment", description: "COPPA compliant platform with complete parental oversight and zero external content." },
                { icon: "🎯", title: "Comprehensive Curriculum", description: "From basic counting to advanced algebra - complete K-12 math curriculum coverage." },
                { icon: "📊", title: "Progress Tracking", description: "Detailed analytics showing your child&apos;s math skill development and areas for improvement." },
                { icon: "🎮", title: "Gamified Learning", description: "Math adventures, challenges, and rewards that make learning mathematics exciting and fun." },
                { icon: "🏆", title: "Confidence Building", description: "Step-by-step guidance that builds mathematical confidence and eliminates math anxiety." }
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
            <div className="bg-gradient-to-r from-green-600/20 to-cyan-600/20 rounded-2xl p-12 border border-green-500/30">
              <h2 className="text-4xl font-bold text-white mb-6">Make Math Fun for Your Child</h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto mb-8">
                <div className="text-3xl font-bold text-white mb-2">7-Day FREE Trial</div>
                <div className="text-gray-300 mb-4">Then $19.99/month for unlimited access</div>
                <ul className="text-left text-gray-300 space-y-2 mb-6">
                  <li>✅ All 9 Kids AI Tools</li>
                  <li>✅ Complete math curriculum</li>
                  <li>✅ Interactive lessons</li>
                  <li>✅ Progress tracking</li>
                  <li>✅ Cancel anytime</li>
                </ul>
              </div>
              <Link href="/signup?plan=kids-ai&trial=7days&source=math-wizard-cta" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block">🔢 Start FREE Trial Now</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}