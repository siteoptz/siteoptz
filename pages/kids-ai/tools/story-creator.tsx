import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function StoryCreatorLanding() {
  return (
    <>
      <Head>
        <title>SiteOptz Story Creator - AI-Powered Creative Writing for Kids | Safe Storytelling Platform</title>
        <meta name="description" content="Unleash your child&apos;s creativity with SiteOptz Story Creator. AI-assisted creative writing platform for kids. COPPA compliant with parental oversight. Start your 7-day free trial!" />
        <meta name="keywords" content="creative writing kids, storytelling platform children, AI writing assistant kids, safe writing app, COPPA compliant creative platform" />
        
        <meta property="og:title" content="SiteOptz Story Creator - AI Creative Writing for Kids" />
        <meta property="og:description" content="Safe AI-powered creative writing platform for children. Unleash imagination with guided storytelling. Start free trial today!" />
        <meta property="og:url" content="https://siteoptz.ai/kids-ai/tools/story-creator" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">📖 SiteOptz Story Creator</h1>
              <p className="text-2xl text-violet-200 mb-8">AI-Powered Creative Writing & Storytelling for Kids</p>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Unleash your child&apos;s imagination! Our AI Story Creator helps children craft amazing stories 
                with guided prompts, character development, and creative writing assistance in a completely safe environment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/signup?plan=kids-ai&trial=7days&source=story-creator" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg">🚀 Start 7-Day FREE Trial</Link>
                <Link href="/kids-ai/apps/story-creator" className="bg-violet-600 hover:bg-violet-700 text-white text-xl font-semibold px-10 py-4 rounded-xl transition-colors border-2 border-violet-500">📖 Try Demo Now</Link>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Why Parents Choose SiteOptz Story Creator</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "✍️", title: "AI Writing Assistant", description: "Smart prompts and suggestions help children develop plots, characters, and dialogue naturally." },
                { icon: "🛡️", title: "100% Safe Environment", description: "COPPA compliant platform with appropriate content filters and complete parental oversight." },
                { icon: "📚", title: "Story Portfolio Building", description: "Create, save, and organize your child&apos;s stories into a digital portfolio for future sharing." },
                { icon: "👨‍👩‍👧‍👦", title: "Family Sharing", description: "Parents can read, review, and celebrate their child&apos;s creative writing achievements." },
                { icon: "🎭", title: "Genre Exploration", description: "Adventure, fantasy, mystery, sci-fi - explore different story types and writing styles." },
                { icon: "🏆", title: "Creative Confidence", description: "Build writing skills and creative confidence through guided, supportive story creation." }
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
            <div className="bg-gradient-to-r from-green-600/20 to-violet-600/20 rounded-2xl p-12 border border-green-500/30">
              <h2 className="text-4xl font-bold text-white mb-6">Unlock Your Child&apos;s Storytelling Potential</h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto mb-8">
                <div className="text-3xl font-bold text-white mb-2">7-Day FREE Trial</div>
                <div className="text-gray-300 mb-4">Then $19.99/month for unlimited access</div>
                <ul className="text-left text-gray-300 space-y-2 mb-6">
                  <li>✅ All 9 Kids AI Tools</li>
                  <li>✅ Unlimited story creation</li>
                  <li>✅ AI writing assistance</li>
                  <li>✅ Story portfolio</li>
                  <li>✅ Cancel anytime</li>
                </ul>
              </div>
              <Link href="/signup?plan=kids-ai&trial=7days&source=story-creator-cta" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block">📖 Start FREE Trial Now</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}