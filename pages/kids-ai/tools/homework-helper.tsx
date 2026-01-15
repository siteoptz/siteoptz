import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function HomeworkHelperLanding() {
  return (
    <>
      <Head>
        <title>SiteOptz Homework Helper - AI Homework Assistance for Kids | Safe Educational Support</title>
        <meta name="description" content="Get safe AI homework help for your child with SiteOptz Homework Helper. Step-by-step explanations across all subjects. COPPA compliant with parental oversight. Start your 7-day free trial!" />
        <meta name="keywords" content="homework help kids, AI tutoring children, safe homework assistance, educational AI for kids, COPPA compliant homework help, children's study aid" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SiteOptz Homework Helper - AI Homework Assistance for Kids" />
        <meta property="og:description" content="Safe AI-powered homework help for children. COPPA compliant with full parental oversight. 7-day free trial available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/kids-ai/tools/homework-helper" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SiteOptz Homework Helper - AI Homework Tutor for Kids" />
        <meta name="twitter:description" content="Safe AI homework assistance for children. Start free trial today!" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SiteOptz Homework Helper",
              "applicationCategory": "Educational",
              "operatingSystem": "Web",
              "description": "AI-powered homework assistance platform designed specifically for children",
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

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
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
                📝 SiteOptz Homework Helper
              </h1>
              <p className="text-2xl text-purple-200 mb-8">
                AI-Powered Safe Homework Assistance for Kids
              </p>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Transform homework time from struggle to success! Our AI-powered homework assistant 
                provides safe, step-by-step explanations across all subjects. Help your child 
                understand concepts better while maintaining academic integrity and complete safety.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  href="/signup?plan=kids-ai&trial=7days&source=homework-helper" 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  🚀 Start 7-Day FREE Trial
                </Link>
                <Link 
                  href="/kids-ai/apps/homework-helper" 
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold px-10 py-4 rounded-xl transition-colors border-2 border-purple-500"
                >
                  📚 Try Demo Now
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
                  📚 Educational Focus
                </span>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Parents Choose SiteOptz Homework Helper
              </h2>
              <p className="text-xl text-gray-300">
                The safest and most effective homework assistance for children
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🧠",
                  title: "AI-Powered Understanding",
                  description: "Get step-by-step explanations that help children understand concepts, not just get answers. Promotes real learning and comprehension."
                },
                {
                  icon: "🛡️",
                  title: "100% Safe Environment",
                  description: "COPPA compliant platform with zero external content, no chat with strangers, and complete parental oversight of all homework sessions."
                },
                {
                  icon: "📚",
                  title: "All Subject Coverage",
                  description: "Math, Science, English, History, Geography, and more. Our AI tutor adapts to your child's grade level and curriculum requirements."
                },
                {
                  icon: "👨‍👩‍👧‍👦",
                  title: "Parental Dashboard",
                  description: "Monitor your child's homework sessions, track subject areas they need help with, and review all AI interactions for transparency."
                },
                {
                  icon: "🎯",
                  title: "Grade-Level Appropriate",
                  description: "Customized explanations for elementary (K-5), middle school (6-8), and high school (9-12) with age-appropriate language and examples."
                },
                {
                  icon: "⭐",
                  title: "Academic Integrity Focus",
                  description: "Teaches problem-solving methods and study skills rather than providing direct answers, maintaining academic honesty and ethics."
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

          {/* Subject Areas Section */}
          <section className="mb-16 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl p-12 border border-purple-500/30">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Complete Academic Support Across All Subjects
              </h2>
              <p className="text-xl text-gray-300">From elementary basics to high school advanced topics</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🔢",
                  subject: "Mathematics",
                  topics: ["Arithmetic & Algebra", "Geometry & Trigonometry", "Calculus & Statistics", "Problem-solving strategies"]
                },
                {
                  icon: "🔬",
                  subject: "Science",
                  topics: ["Biology & Life Science", "Chemistry & Physics", "Earth & Environmental Science", "Scientific method & experiments"]
                },
                {
                  icon: "📚",
                  subject: "English & Language Arts",
                  topics: ["Reading comprehension", "Grammar & Writing", "Literature analysis", "Essay structure & research"]
                },
                {
                  icon: "🌍",
                  subject: "Social Studies",
                  topics: ["World & US History", "Geography & Cultures", "Government & Civics", "Current events analysis"]
                }
              ].map((subject, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                  <div className="text-4xl mb-4">{subject.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{subject.subject}</h3>
                  <ul className="text-gray-300 space-y-2 text-sm text-left">
                    {subject.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>• {topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Transform Your Child's Learning Experience
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">🎯 Academic Benefits</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✅ Improves understanding of difficult concepts</li>
                  <li>✅ Builds confidence in problem-solving</li>
                  <li>✅ Develops independent study skills</li>
                  <li>✅ Reduces homework stress and frustration</li>
                  <li>✅ Prepares for tests and exams effectively</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">👨‍👩‍👧‍👦 Family Benefits</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✅ Reduces parent homework struggles</li>
                  <li>✅ Provides 24/7 homework assistance</li>
                  <li>✅ Maintains academic integrity standards</li>
                  <li>✅ Offers complete safety and oversight</li>
                  <li>✅ Creates positive learning environment</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Parents Love the Results
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Homework time went from battles to peaceful learning. My daughter actually understands her math now instead of just getting frustrated.",
                  author: "Jennifer M.",
                  role: "Mother of 3rd Grader"
                },
                {
                  quote: "Finally, safe homework help! I love that I can see exactly what help my son is getting and ensure it's appropriate.",
                  author: "Carlos R.", 
                  role: "Homeschool Dad"
                },
                {
                  quote: "The step-by-step explanations are perfect. Emma is learning the 'why' behind her assignments, not just the answers.",
                  author: "Lisa K.",
                  role: "Teacher & Mom"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-gray-300 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-purple-300 text-sm">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing CTA */}
          <section className="text-center mb-16">
            <div className="bg-gradient-to-r from-green-600/20 to-purple-600/20 rounded-2xl p-12 border border-green-500/30">
              <h2 className="text-4xl font-bold text-white mb-6">
                Make Homework Time Stress-Free
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of families already using safe AI homework assistance
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto mb-8">
                <div className="text-3xl font-bold text-white mb-2">7-Day FREE Trial</div>
                <div className="text-gray-300 mb-4">Then $19.99/month for unlimited access</div>
                <ul className="text-left text-gray-300 space-y-2 mb-6">
                  <li>✅ All 9 Kids AI Tools</li>
                  <li>✅ Unlimited homework help</li>
                  <li>✅ All subjects covered</li>
                  <li>✅ Parent oversight dashboard</li>
                  <li>✅ Academic integrity focus</li>
                  <li>✅ Cancel anytime</li>
                </ul>
              </div>
              
              <Link 
                href="/signup?plan=kids-ai&trial=7days&source=homework-helper-cta" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block"
              >
                📚 Start FREE Trial Now
              </Link>
              
              <p className="text-sm text-gray-400 mt-4">
                No credit card required • Cancel anytime • 100% satisfaction guarantee
              </p>
            </div>
          </section>

          {/* Safety & Academic Integrity */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Safety & Academic Integrity First
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🛡️",
                  title: "COPPA Compliant",
                  description: "Full compliance with children's online privacy protection regulations"
                },
                {
                  icon: "🎓",
                  title: "Academic Integrity",
                  description: "Teaches understanding rather than providing direct answers"
                },
                {
                  icon: "👥",
                  title: "No Social Features", 
                  description: "No chat, forums, or interaction with unknown individuals"
                },
                {
                  icon: "📊",
                  title: "Complete Transparency",
                  description: "Parents can review all homework assistance sessions"
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
            <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-2xl p-12 border border-purple-500/50">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Homework Time?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join over 12,000+ families using SiteOptz Homework Helper
              </p>
              <Link 
                href="/signup?plan=kids-ai&trial=7days&source=homework-helper-final" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-block"
              >
                📚 Start Your FREE Trial Today
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