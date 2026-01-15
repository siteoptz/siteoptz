import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ArtStudioLanding() {
  return (
    <>
      <Head>
        <title>SiteOptz Art Studio - AI-Powered Digital Art Platform for Kids | Safe Creative Learning</title>
        <meta name="description" content="Unlock your child's creativity with SiteOptz Art Studio. Safe AI-powered digital art tools designed for kids. COPPA compliant with parental oversight. Start your 7-day free trial today!" />
        <meta name="keywords" content="kids art app, digital art for children, AI art tools kids, safe creative platform, children's digital art, COPPA compliant art app" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SiteOptz Art Studio - AI Digital Art Platform for Kids" />
        <meta property="og:description" content="Safe AI-powered creative tools for children. COPPA compliant with full parental oversight. 7-day free trial available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/kids-ai/tools/art-studio" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SiteOptz Art Studio - AI Art Platform for Kids" />
        <meta name="twitter:description" content="Safe AI-powered creative tools for children. Start free trial today!" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SiteOptz Art Studio",
              "applicationCategory": "Educational",
              "operatingSystem": "Web",
              "description": "AI-powered digital art platform designed specifically for children",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "7-day free trial"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Children",
                "suggestedMinAge": 5,
                "suggestedMaxAge": 18
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
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
                🎨 SiteOptz Art Studio
              </h1>
              <p className="text-2xl text-blue-200 mb-8">
                AI-Powered Digital Art Platform Designed Specifically for Kids
              </p>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Unlock your child's creative potential with our safe, AI-enhanced digital art platform. 
                From painting to 3D modeling, our COPPA-compliant tools inspire artistic expression 
                while ensuring complete safety and parental oversight.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  href="/signup?plan=kids-ai&trial=7days&source=art-studio" 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  🚀 Start 7-Day FREE Trial
                </Link>
                <Link 
                  href="/kids-ai/apps/art-studio" 
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold px-10 py-4 rounded-xl transition-colors border-2 border-purple-500"
                >
                  📱 Try Demo Now
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
                  🎨 Educational Focus
                </span>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Parents Choose SiteOptz Art Studio
              </h2>
              <p className="text-xl text-gray-300">
                The safest and most comprehensive digital art platform for children
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎨",
                  title: "AI-Enhanced Creativity",
                  description: "Smart brushes, color suggestions, and composition guidance help children create amazing artwork while learning art fundamentals."
                },
                {
                  icon: "🛡️",
                  title: "100% Safe Environment",
                  description: "COPPA compliant platform with zero external content, no chat features, and complete parental oversight of all activities."
                },
                {
                  icon: "🎓",
                  title: "Educational Art Lessons",
                  description: "Structured lessons covering color theory, composition, digital techniques, and art history appropriate for each age group."
                },
                {
                  icon: "👨‍👩‍👧‍👦",
                  title: "Parental Dashboard",
                  description: "Monitor your child's progress, view their creations, and receive detailed reports on their artistic development."
                },
                {
                  icon: "🌟",
                  title: "Age-Appropriate Tools",
                  description: "Different interfaces and complexity levels for ages 5-8, 9-12, and 13-18 ensuring optimal learning experiences."
                },
                {
                  icon: "💾",
                  title: "Portfolio Building",
                  description: "Help children build a digital art portfolio with export options for printing, sharing with family, and college applications."
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

          {/* Benefits Section */}
          <section className="mb-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-12 border border-purple-500/30">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Proven Benefits for Child Development
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">🧠 Cognitive Development</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✅ Enhances spatial reasoning and visual processing</li>
                  <li>✅ Improves problem-solving and critical thinking</li>
                  <li>✅ Develops fine motor skills and hand-eye coordination</li>
                  <li>✅ Strengthens memory and attention span</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">🎭 Creative & Emotional Growth</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✅ Builds confidence through artistic achievement</li>
                  <li>✅ Provides healthy emotional expression outlet</li>
                  <li>✅ Encourages original thinking and innovation</li>
                  <li>✅ Develops appreciation for visual arts and culture</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                What Parents Are Saying
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "My 8-year-old has created the most amazing digital paintings! The AI suggestions help her learn while keeping her creativity flowing.",
                  author: "Sarah M.",
                  role: "Parent of 2"
                },
                {
                  quote: "Finally, a safe creative platform! No worries about inappropriate content or online predators. Just pure artistic fun.",
                  author: "Michael R.", 
                  role: "Homeschool Parent"
                },
                {
                  quote: "The portfolio feature is incredible. We're saving all of Emma's artwork for her college applications. She's so proud!",
                  author: "Jessica L.",
                  role: "Art Teacher & Mom"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-gray-300 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-blue-300 text-sm">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing CTA */}
          <section className="text-center mb-16">
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl p-12 border border-green-500/30">
              <h2 className="text-4xl font-bold text-white mb-6">
                Start Your Child's Creative Journey Today
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of families already using SiteOptz Art Studio
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto mb-8">
                <div className="text-3xl font-bold text-white mb-2">7-Day FREE Trial</div>
                <div className="text-gray-300 mb-4">Then $19.99/month for unlimited access</div>
                <ul className="text-left text-gray-300 space-y-2 mb-6">
                  <li>✅ All 9 Kids AI Tools</li>
                  <li>✅ Unlimited creations</li>
                  <li>✅ Parent dashboard</li>
                  <li>✅ Portfolio downloads</li>
                  <li>✅ Cancel anytime</li>
                </ul>
              </div>
              
              <Link 
                href="/signup?plan=kids-ai&trial=7days&source=art-studio-cta" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block"
              >
                🎨 Start FREE Trial Now
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
                  description: "Full compliance with children's online privacy protection"
                },
                {
                  icon: "🔒",
                  title: "No External Content",
                  description: "Zero third-party content or external website access"
                },
                {
                  icon: "👥",
                  title: "No Social Features", 
                  description: "No chat, messaging, or interaction with strangers"
                },
                {
                  icon: "📊",
                  title: "Parent Oversight",
                  description: "Complete visibility into your child's activities"
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

          {/* FAQ */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Is SiteOptz Art Studio really safe for my child?",
                  answer: "Yes! We're fully COPPA compliant with no external content, no social features, and complete parental oversight. Your child creates in a completely safe, controlled environment."
                },
                {
                  question: "What ages is this appropriate for?",
                  answer: "Art Studio is designed for children ages 5-18, with different interfaces and complexity levels for each age group (5-8, 9-12, 13-18)."
                },
                {
                  question: "Can I cancel anytime?",
                  answer: "Absolutely! Cancel anytime during your free trial or subscription with no penalties. Your child's artwork is always available for download."
                },
                {
                  question: "Will my child's artwork be private?",
                  answer: "Yes! All artwork remains completely private to your family. We never share, sell, or use your child's creations for any purpose."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-white font-semibold text-lg mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl p-12 border border-purple-500/50">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Unlock Your Child's Creativity?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join over 10,000+ families using SiteOptz Art Studio
              </p>
              <Link 
                href="/signup?plan=kids-ai&trial=7days&source=art-studio-final" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block"
              >
                🎨 Start Your FREE Trial Today
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