import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function LogicBuilderLanding() {
  return (
    <>
      <Head>
        <title>SiteOptz Logic Builder - AI-Powered Critical Thinking for Kids | Safe Puzzle Platform</title>
        <meta name="description" content="Develop your child's critical thinking with SiteOptz Logic Builder. AI-powered puzzles and logic games. COPPA compliant with parental oversight. Start your 7-day free trial!" />
        <meta name="keywords" content="logic games kids, critical thinking children, puzzle games kids, AI brain training, safe educational games, COPPA compliant puzzles" />
        
        <meta property="og:title" content="SiteOptz Logic Builder - AI Critical Thinking for Kids" />
        <meta property="og:description" content="Safe AI-powered logic and critical thinking games for children. Start free trial today!" />
        <meta property="og:url" content="https://siteoptz.ai/kids-ai/tools/logic-builder" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SiteOptz Logic Builder",
            "applicationCategory": "Educational",
            "description": "AI-powered critical thinking and logic puzzle platform for children"
          })
        }} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-purple-900">
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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">🧩 SiteOptz Logic Builder</h1>
              <p className="text-2xl text-orange-200 mb-8">AI-Powered Critical Thinking & Logic Games for Kids</p>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Supercharge your child's critical thinking skills! Our AI-powered logic puzzles and brain training games 
                develop problem-solving abilities, logical reasoning, and analytical thinking in a fun, safe environment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/signup?plan=kids-ai&trial=7days&source=logic-builder" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg">🚀 Start 7-Day FREE Trial</Link>
                <Link href="/kids-ai/apps/logic-builder" className="bg-orange-600 hover:bg-orange-700 text-white text-xl font-semibold px-10 py-4 rounded-xl transition-colors border-2 border-orange-500">🧩 Try Demo Now</Link>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Why Parents Choose SiteOptz Logic Builder</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "🧠", title: "AI-Adaptive Challenges", description: "Puzzles that automatically adjust difficulty based on your child's progress and skill level." },
                { icon: "🛡️", title: "100% Safe Environment", description: "COPPA compliant with zero external content and complete parental oversight." },
                { icon: "🏆", title: "Progressive Skill Building", description: "Structured learning path from basic logic to advanced problem-solving strategies." },
                { icon: "📊", title: "Critical Thinking Analytics", description: "Track your child's logical reasoning development with detailed progress reports." },
                { icon: "🎯", title: "Multiple Logic Types", description: "Pattern recognition, spatial reasoning, deduction, sequences, and mathematical logic." },
                { icon: "🎮", title: "Gamified Learning", description: "Turn brain training into fun adventures with achievements, levels, and rewards." }
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
            <div className="bg-gradient-to-r from-green-600/20 to-orange-600/20 rounded-2xl p-12 border border-green-500/30">
              <h2 className="text-4xl font-bold text-white mb-6">Build Your Child's Critical Thinking Skills</h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto mb-8">
                <div className="text-3xl font-bold text-white mb-2">7-Day FREE Trial</div>
                <div className="text-gray-300 mb-4">Then $19.99/month for unlimited access</div>
                <ul className="text-left text-gray-300 space-y-2 mb-6">
                  <li>✅ All 9 Kids AI Tools</li>
                  <li>✅ Adaptive logic puzzles</li>
                  <li>✅ Progress tracking</li>
                  <li>✅ Cancel anytime</li>
                </ul>
              </div>
              <Link href="/signup?plan=kids-ai&trial=7days&source=logic-builder-cta" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block">🧩 Start FREE Trial Now</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}