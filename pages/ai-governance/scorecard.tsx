import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, Shield } from 'lucide-react';

export default function ScorecardPlaceholder() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          tool: 'AI Risk Scorecard',
          source: 'scorecard-waitlist',
          additionalData: {
            scorecard_waitlist: true,
            page: 'ai-governance-scorecard-placeholder',
            timestamp: new Date().toISOString()
          }
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Show error state or retry logic here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI Compliance Readiness Scorecard — Launching Soon | SiteOptz</title>
        <meta name="description" content="Get your free AI compliance readiness scorecard. Launching February 2026. Join the waitlist for early access." />
        <meta name="keywords" content="AI compliance scorecard, AI risk assessment, AI governance readiness" />
        <link rel="canonical" href="https://siteoptz.ai/ai-governance/scorecard" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Compliance Readiness Scorecard — Launching Soon" />
        <meta property="og:description" content="Get your free AI compliance readiness scorecard. Join the waitlist for early access." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.ai/ai-governance/scorecard" />
        <meta property="og:image" content="https://siteoptz.ai/images/scorecard-placeholder-og.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Compliance Readiness Scorecard — Launching Soon" />
        <meta name="twitter:description" content="Get your free AI compliance readiness scorecard. Join the waitlist for early access." />
        <meta name="twitter:image" content="https://siteoptz.ai/images/scorecard-placeholder-twitter.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Navigation breadcrumb */}
        <div className="pt-20 pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/ai-governance"
              className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AI Governance
            </Link>
          </div>
        </div>

        {/* Main content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <Shield className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                AI Compliance Readiness Scorecard
              </h1>
              
              <div className="flex items-center justify-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-cyan-400" />
                <span className="text-xl text-cyan-400 font-semibold">
                  Launching February 2026
                </span>
              </div>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Get your free 5-minute AI compliance readiness assessment. Identify your top 3 governance gaps and get a personalized action plan.
              </p>
            </div>

            {/* Main card */}
            <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Be the first to know when it's ready
                </h2>
                <p className="text-gray-300 mb-8">
                  Join the waitlist and we'll notify you as soon as the AI Compliance Readiness Scorecard launches. Plus, get early access to exclusive compliance resources.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isSubmitting ? 'Joining Waitlist...' : 'Join the Waitlist'}
                    </button>
                  </div>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-400">
                      No spam. Unsubscribe at any time.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    You're on the list!
                  </h3>
                  <p className="text-gray-300 mb-6">
                    We'll email you as soon as the AI Compliance Readiness Scorecard is ready.
                  </p>
                  <Link
                    href="/ai-governance"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                  >
                    Continue to AI Governance
                  </Link>
                </div>
              )}
            </div>

            {/* What to expect */}
            <div className="bg-black border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                What to Expect from the Scorecard
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">5-Minute Assessment</h4>
                  <p className="text-gray-300 text-sm">Quick questions about your AI usage, data handling, and compliance readiness</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Top 3 Gaps</h4>
                  <p className="text-gray-300 text-sm">Identify your biggest compliance risks ranked by urgency and impact</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Action Plan</h4>
                  <p className="text-gray-300 text-sm">Personalized next steps to improve your compliance posture</p>
                </div>
              </div>
            </div>

            {/* CTA back to main page */}
            <div className="text-center mt-8">
              <p className="text-gray-300 mb-4">
                Ready to get started with AI governance now?
              </p>
              <Link
                href="/ai-governance"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                Explore AI Compliance Copilot
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}