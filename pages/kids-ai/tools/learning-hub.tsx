import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function LearningHubLanding() {
  return (
    <>
      <Head>
        <title>SiteOptz Learning Hub - AI-Powered Personalized Education for Kids | Safe Adaptive Learning</title>
        <meta name="description" content="Personalized AI learning for your child with SiteOptz Learning Hub. Adaptive curriculum across all subjects. COPPA compliant with parental oversight. Start your 7-day free trial!" />
        <meta name="keywords" content="personalized learning kids, AI education platform, adaptive learning children, safe educational AI, COPPA compliant learning, children's online education" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SiteOptz Learning Hub - AI Personalized Education for Kids" />
        <meta property="og:description" content="Safe AI-powered personalized learning for children. COPPA compliant with full parental oversight. 7-day free trial available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/kids-ai/tools/learning-hub" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SiteOptz Learning Hub - AI Personalized Learning for Kids" />
        <meta name="twitter:description" content="Safe AI-powered personalized education for children. Start free trial today!" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SiteOptz Learning Hub",
              "applicationCategory": "Educational",
              "operatingSystem": "Web",
              "description": "AI-powered personalized learning platform designed specifically for children",
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

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
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
                🏫 SiteOptz Learning Hub
              </h1>
              <p className="text-2xl text-blue-200 mb-8">
                AI-Powered Personalized Learning Platform for Kids
              </p>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Give your child a truly personalized education! Our AI Learning Hub adapts to your 
                child's unique learning style, pace, and interests. With comprehensive curriculum 
                coverage and complete safety, it's like having a personal tutor available 24/7.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  href="/signup?plan=kids-ai&trial=7days&source=learning-hub" 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  🚀 Start 7-Day FREE Trial
                </Link>
                <Link 
                  href="/kids-ai/apps/learning-hub" 
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-10 py-4 rounded-xl transition-colors border-2 border-blue-500"
                >
                  🎯 Try Demo Now
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex justify-center gap-6 text-sm">
                <span className="bg-green-600/20 text-green-300 px-4 py-2 rounded-full border border-green-500">
                  🛡️ COPPA Safe
                </span>
                <span className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full border border-blue-500">
                  🧠 Adaptive AI
                </span>
                <span className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full border border-purple-500">
                  📊 Progress Tracking
                </span>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Parents Choose SiteOptz Learning Hub
              </h2>
              <p className="text-xl text-gray-300">
                The most advanced personalized learning platform for children
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🧠",
                  title: "Adaptive AI Learning",
                  description: "Our AI continuously adjusts difficulty, pace, and teaching style based on your child's performance and learning preferences."
                },
                {
                  icon: "🛡️",
                  title: "100% Safe Environment",
                  description: "COPPA compliant platform with zero external content, no social features, and complete parental oversight of all learning activities."
                },
                {
                  icon: "📚",
                  title: "Comprehensive Curriculum",
                  description: "Math, Science, Reading, Art, and more - all aligned with educational standards and designed for different learning styles."
                },
                {
                  icon: "📊",
                  title: "Advanced Progress Tracking",
                  description: "Detailed analytics showing your child's strengths, areas for improvement, and personalized recommendations for continued growth."
                },
                {
                  icon: "🎯",
                  title: "Personalized Learning Paths",
                  description: "Custom learning journeys that adapt to your child's interests, skills, and academic goals for maximum engagement."
                },
                {
                  icon: "🏆",
                  title: "Achievement & Motivation",
                  description: "Gamified learning with badges, streaks, and achievements that keep children motivated and engaged in their education."
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

          {/* Learning Subjects Section */}
          <section className="mb-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-blue-500/30">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Complete Learning Experience Across All Subjects
              </h2>
              <p className="text-xl text-gray-300">Personalized curriculum that grows with your child</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🔢",
                  subject: "Mathematics",
                  description: "From counting to calculus",
                  features: ["Interactive problem solving", "Visual math concepts", "Adaptive difficulty", "Progress tracking"]
                },
                {
                  icon: "📚",
                  subject: "Reading & Language",
                  description: "Literacy and communication",
                  features: ["Phonics and sight words", "Reading comprehension", "Vocabulary building", "Writing skills"]
                },
                {
                  icon: "🔬",
                  subject: "Science Discovery",
                  description: "STEM exploration",
                  features: ["Virtual experiments", "Scientific method", "Nature studies", "Technology basics"]
                },
                {
                  icon: "🎨",
                  subject: "Creative Arts",
                  description: "Artistic expression",
                  features: ["Digital art creation", "Music exploration", "Creative storytelling", "Design thinking"]
                }
              ].map((subject, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl mb-4 text-center">{subject.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2 text-center">{subject.subject}</h3>
                  <p className="text-blue-300 text-sm mb-4 text-center">{subject.description}</p>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    {subject.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Adaptive Learning Benefits */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                How Adaptive AI Transforms Learning
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">🎯 Personalized Experience</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✅ Adapts to your child's learning pace</li>
                  <li>✅ Identifies and strengthens weak areas</li>
                  <li>✅ Builds on existing knowledge and interests</li>
                  <li>✅ Provides appropriate challenge level</li>
                  <li>✅ Offers multiple learning modalities (visual, auditory, kinesthetic)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">📈 Measurable Results</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✅ Tracks learning progress in real-time</li>
                  <li>✅ Provides detailed performance analytics</li>
                  <li>✅ Identifies learning patterns and trends</li>
                  <li>✅ Offers personalized improvement suggestions</li>
                  <li>✅ Celebrates achievements and milestones</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Amazing Results for Families
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The personalization is incredible! My daughter went from struggling with math to loving it. The AI really understands how she learns best.",
                  author: "Amanda T.",
                  role: "Mother of 9-year-old"
                },
                {
                  quote: "Safe, educational, and effective. The progress tracking helps me support my son's learning journey perfectly.",
                  author: "Michael S.", 
                  role: "Homeschool Dad"
                },
                {
                  quote: "My twins have completely different learning styles and the platform adapts to each one perfectly. It's like having two personal tutors!",
                  author: "Rachel M.",
                  role: "Parent & Educator"
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
                Give Your Child Personalized Education
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of families already using AI-powered personalized learning
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto mb-8">
                <div className="text-3xl font-bold text-white mb-2">7-Day FREE Trial</div>
                <div className="text-gray-300 mb-4">Then $19.99/month for unlimited access</div>
                <ul className="text-left text-gray-300 space-y-2 mb-6">
                  <li>✅ All 9 Kids AI Tools</li>
                  <li>✅ Adaptive AI learning</li>
                  <li>✅ Complete curriculum coverage</li>
                  <li>✅ Advanced progress tracking</li>
                  <li>✅ Parent dashboard & insights</li>
                  <li>✅ Cancel anytime</li>
                </ul>
              </div>
              
              <Link 
                href="/signup?plan=kids-ai&trial=7days&source=learning-hub-cta" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block"
              >
                🏫 Start FREE Trial Now
              </Link>
              
              <p className="text-sm text-gray-400 mt-4">
                No credit card required • Cancel anytime • 100% satisfaction guarantee
              </p>
            </div>
          </section>

          {/* Safety & Educational Standards */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Safety & Educational Excellence
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🛡️",
                  title: "COPPA Compliant",
                  description: "Complete compliance with children's online privacy protection"
                },
                {
                  icon: "🎓",
                  title: "Curriculum Aligned",
                  description: "Content aligned with national educational standards and best practices"
                },
                {
                  icon: "👨‍🏫",
                  title: "Educator Approved", 
                  description: "Developed with certified teachers and child development experts"
                },
                {
                  icon: "📊",
                  title: "Research-Based",
                  description: "Built on proven educational research and learning science principles"
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
            <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl p-12 border border-blue-500/50">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Personalize Your Child's Education?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join over 18,000+ families using SiteOptz Learning Hub
              </p>
              <Link 
                href="/signup?plan=kids-ai&trial=7days&source=learning-hub-final" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block"
              >
                🏫 Start Your FREE Trial Today
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