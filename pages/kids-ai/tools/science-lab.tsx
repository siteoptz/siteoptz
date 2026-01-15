import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ScienceLabLanding() {
  return (
    <>
      <Head>
        <title>SiteOptz Science Lab - AI-Powered STEM Learning for Kids | Safe Virtual Experiments</title>
        <meta name="description" content="Explore science safely with SiteOptz Science Lab. AI-powered virtual experiments for kids. COPPA compliant with parental oversight. Start your 7-day free trial!" />
        <meta name="keywords" content="science experiments kids, virtual lab children, STEM learning kids, AI science education, safe science experiments, COPPA compliant STEM" />
        
        <meta property="og:title" content="SiteOptz Science Lab - AI STEM Learning for Kids" />
        <meta property="og:description" content="Safe AI-powered virtual science experiments for children. Start free trial today!" />
        <meta property="og:url" content="https://siteoptz.ai/kids-ai/tools/science-lab" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">🔬 SiteOptz Science Lab</h1>
              <p className="text-2xl text-emerald-200 mb-8">AI-Powered Virtual Science Laboratory for Kids</p>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Spark your child&apos;s love for science! Our AI-powered virtual laboratory provides safe, 
                hands-on STEM experiences with realistic experiments, scientific method training, and discovery-based learning.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/signup?plan=kids-ai&trial=7days&source=science-lab" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg">🚀 Start 7-Day FREE Trial</Link>
                <Link href="/kids-ai/apps/science-lab" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-semibold px-10 py-4 rounded-xl transition-colors border-2 border-emerald-500">🔬 Try Demo Now</Link>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Why Parents Choose SiteOptz Science Lab</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "⚗️", title: "Safe Virtual Experiments", description: "Conduct real science experiments virtually - no safety concerns, unlimited materials, perfect results every time." },
                { icon: "🛡️", title: "100% Safe Environment", description: "COPPA compliant platform with zero external content and complete parental oversight of all activities." },
                { icon: "🔬", title: "Complete STEM Curriculum", description: "Biology, chemistry, physics, earth science, and engineering - comprehensive science education coverage." },
                { icon: "📊", title: "Scientific Method Mastery", description: "Learn hypothesis formation, experimentation, observation, and conclusion drawing through guided practice." },
                { icon: "🌟", title: "Age-Appropriate Learning", description: "Different complexity levels for elementary, middle school, and high school students with adaptive difficulty." },
                { icon: "🏆", title: "Discovery-Based Learning", description: "Encourage natural curiosity with open-ended exploration and guided discovery activities." }
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
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl p-12 border border-green-500/30">
              <h2 className="text-4xl font-bold text-white mb-6">Ignite Your Child&apos;s Scientific Curiosity</h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto mb-8">
                <div className="text-3xl font-bold text-white mb-2">7-Day FREE Trial</div>
                <div className="text-gray-300 mb-4">Then $19.99/month for unlimited access</div>
                <ul className="text-left text-gray-300 space-y-2 mb-6">
                  <li>✅ All 9 Kids AI Tools</li>
                  <li>✅ Virtual science experiments</li>
                  <li>✅ Complete STEM curriculum</li>
                  <li>✅ Safe learning environment</li>
                  <li>✅ Cancel anytime</li>
                </ul>
              </div>
              <Link href="/signup?plan=kids-ai&trial=7days&source=science-lab-cta" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block">🔬 Start FREE Trial Now</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}