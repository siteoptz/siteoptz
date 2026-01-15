import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function CodeAcademyLanding() {
  return (
    <>
      <Head>
        <title>SiteOptz Code Academy - AI-Powered Programming Learning for Kids | Safe Coding Education</title>
        <meta name="description" content="Teach your child programming with SiteOptz Code Academy. AI-powered coding lessons designed for kids. COPPA compliant with parental oversight. Start your 7-day free trial today!" />
        <meta name="keywords" content="kids coding app, learn programming children, AI coding tutor kids, safe coding platform, children's programming education, COPPA compliant coding" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SiteOptz Code Academy - AI Programming Platform for Kids" />
        <meta property="og:description" content="Safe AI-powered coding education for children. COPPA compliant with full parental oversight. 7-day free trial available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/kids-ai/tools/code-academy" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SiteOptz Code Academy - AI Coding Platform for Kids" />
        <meta name="twitter:description" content="Safe AI-powered programming education for children. Start free trial today!" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SiteOptz Code Academy",
              "applicationCategory": "Educational",
              "operatingSystem": "Web",
              "description": "AI-powered programming education platform designed specifically for children",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "7-day free trial"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Children",
                "suggestedMinAge": 7,
                "suggestedMaxAge": 18
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
              <Link href="/kids-ai" className="text-white hover:text-blue-300 transition-colors">
                ← Back to Kids AI Directory
              </Link>
              <Link 
                href="/signup?plan=kids-ai&trial=7days" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Start Free Trial
              </Link>
            </nav>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                💻 SiteOptz Code Academy
              </h1>
              <p className="text-2xl text-green-200 mb-8">
                AI-Powered Programming Education Platform for Kids
              </p>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Give your child the gift of coding! Our AI-powered platform makes learning programming 
                fun and engaging for kids aged 7-18. From visual block coding to advanced languages, 
                we provide a safe, comprehensive coding education with complete parental oversight.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  href="/signup?plan=kids-ai&trial=7days&source=code-academy" 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  🚀 Start 7-Day FREE Trial
                </Link>
                <Link 
                  href="/kids-ai/apps/code-academy" 
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-10 py-4 rounded-xl transition-colors border-2 border-blue-500"
                >
                  💻 Try Demo Now
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex justify-center gap-6 text-sm">
                <span className="bg-green-600/20 text-green-300 px-4 py-2 rounded-full border border-green-500">
                  🛡️ COPPA Safe
                </span>
                <span className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full border border-blue-500">
                  👨‍👩‍👧‍👦 Parent Approved
                </span>
                <span className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full border border-purple-500">
                  💻 Future-Ready Skills
                </span>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Parents Choose SiteOptz Code Academy
              </h2>
              <p className="text-xl text-gray-300">
                The safest and most effective programming education for children
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🤖",
                  title: "AI-Powered Learning",
                  description: "Personalized coding lessons that adapt to your child's pace and learning style, with instant feedback and guidance."
                },
                {
                  icon: "🛡️",
                  title: "100% Safe Environment",
                  description: "COPPA compliant platform with zero external links, no chat features, and complete parental oversight of all coding activities."
                },
                {
                  icon: "🎮",
                  title: "Gamified Learning",
                  description: "Turn coding into an adventure! Complete coding quests, unlock achievements, and build projects in a game-like environment."
                },
                {
                  icon: "📊",
                  title: "Progress Tracking",
                  description: "Detailed parent dashboard showing your child's coding progress, completed projects, and skill development over time."
                },
                {
                  icon: "🌱",
                  title: "Age-Appropriate Curriculum",
                  description: "Structured learning paths for ages 7-10 (visual coding), 11-14 (beginner languages), and 15-18 (advanced programming)."
                },
                {
                  icon: "🏆",
                  title: "Real Projects & Portfolio",
                  description: "Help children build actual games, websites, and apps while creating a portfolio for future college and career opportunities."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum Section */}
          <section className="mb-16 bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-2xl p-12 border border-blue-500/30">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Complete Programming Curriculum
              </h2>
              <p className="text-xl text-gray-300">From visual coding to advanced programming</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-semibold text-white mb-4">Ages 7-10</h3>
                <h4 className="text-lg font-semibold text-green-300 mb-3">Visual Block Coding</h4>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Scratch-style visual programming</li>
                  <li>• Basic logic and algorithms</li>
                  <li>• Simple games and animations</li>
                  <li>• Problem-solving fundamentals</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-2xl font-semibold text-white mb-4">Ages 11-14</h3>
                <h4 className="text-lg font-semibold text-blue-300 mb-3">Beginner Languages</h4>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Python programming basics</li>
                  <li>• HTML/CSS web development</li>
                  <li>• JavaScript fundamentals</li>
                  <li>• Interactive websites and apps</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-semibold text-white mb-4">Ages 15-18</h3>
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Advanced Programming</h4>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Advanced Python and frameworks</li>
                  <li>• React and modern web development</li>
                  <li>• Mobile app development</li>
                  <li>• Data science and AI basics</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Future-Ready Skills for Your Child
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">🧠 Cognitive Development</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✅ Enhances logical thinking and problem-solving</li>
                  <li>✅ Improves mathematical and analytical skills</li>
                  <li>✅ Develops attention to detail and debugging mindset</li>
                  <li>✅ Strengthens memory and sequential processing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">💼 Career Preparation</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✅ Prepares for high-demand tech careers</li>
                  <li>✅ Builds portfolio for college applications</li>
                  <li>✅ Develops entrepreneurial thinking</li>
                  <li>✅ Creates competitive advantage in any field</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Success Stories from Families
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "My 12-year-old built her first website in just 2 weeks! The AI tutor made coding so much easier to understand.",
                  author: "David K.",
                  role: "Software Engineer & Dad"
                },
                {
                  quote: "Safe coding education was exactly what we needed. No worries about online safety while my son learns programming.",
                  author: "Maria S.", 
                  role: "Homeschool Mom"
                },
                {
                  quote: "The progress tracking is amazing. I can see exactly what coding concepts Jake is learning each day.",
                  author: "Robert T.",
                  role: "Parent & Educator"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-gray-300 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-green-300 text-sm">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing CTA */}
          <section className="text-center mb-16">
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl p-12 border border-green-500/30">
              <h2 className="text-4xl font-bold text-white mb-6">
                Give Your Child a Programming Head Start
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of families building their children's future with coding
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto mb-8">
                <div className="text-3xl font-bold text-white mb-2">7-Day FREE Trial</div>
                <div className="text-gray-300 mb-4">Then $19.99/month for unlimited access</div>
                <ul className="text-left text-gray-300 space-y-2 mb-6">
                  <li>✅ All 9 Kids AI Tools</li>
                  <li>✅ Complete coding curriculum</li>
                  <li>✅ AI tutor and guidance</li>
                  <li>✅ Project portfolio building</li>
                  <li>✅ Parent progress dashboard</li>
                  <li>✅ Cancel anytime</li>
                </ul>
              </div>
              
              <Link 
                href="/signup?plan=kids-ai&trial=7days&source=code-academy-cta" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block"
              >
                💻 Start FREE Trial Now
              </Link>
              
              <p className="text-sm text-gray-400 mt-4">
                No credit card required • Cancel anytime • 100% satisfaction guarantee
              </p>
            </div>
          </section>

          {/* Safety & Security */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Your Child's Safety Is Our Priority
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🛡️",
                  title: "COPPA Compliant",
                  description: "Full compliance with children's online privacy protection laws"
                },
                {
                  icon: "🔒",
                  title: "No External Links",
                  description: "Completely closed environment with no access to external websites"
                },
                {
                  icon: "👥",
                  title: "No Social Features", 
                  description: "No chat, forums, or interaction with strangers"
                },
                {
                  icon: "📊",
                  title: "Parent Oversight",
                  description: "Complete visibility and control over your child's learning"
                }
              ].map((item, index) => (
                <div key={index} className="bg-green-600/20 rounded-xl p-6 border border-green-500/30 text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-green-200 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-600/30 to-green-600/30 rounded-2xl p-12 border border-blue-500/50">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Launch Your Child's Coding Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join over 15,000+ families using SiteOptz Code Academy
              </p>
              <Link 
                href="/signup?plan=kids-ai&trial=7days&source=code-academy-final" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block"
              >
                💻 Start Your FREE Trial Today
              </Link>
              <p className="text-sm text-gray-400 mt-6">
                7-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}