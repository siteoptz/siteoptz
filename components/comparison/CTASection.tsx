import { useState } from 'react';
import Image from 'next/image';

interface Tool {
  tool_name: string;
  logo_url: string;
  official_url: string;
  affiliate_link: string;
}

interface CTASectionProps {
  toolA: Tool;
  toolB: Tool;
}

export default function CTASection({ toolA, toolB }: CTASectionProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Track email capture event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_capture', {
          event_category: 'Lead Generation',
          event_label: 'AI Tool Comparison',
          value: 1
        });
      }

      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Email subscription failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Choose Your AI Tool?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Start your free trial today and experience the difference. Both tools offer risk-free trials to help you make the best decision.
          </p>
        </div>

        {/* Tool CTA Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Tool A CTA */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-xl p-3 shadow-lg">
                <Image
                  src={toolA.logo_url}
                  alt={`${toolA.tool_name} logo`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{toolA.tool_name}</h3>
              <p className="text-blue-100 mb-6">Start your free trial and explore all features</p>
              
              <div className="space-y-4">
                <a
                  href={toolA.affiliate_link || toolA.official_url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  onClick={() => {
                    // Track affiliate click
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'click', {
                        event_category: 'Affiliate',
                        event_label: toolA.tool_name,
                        event_action: 'try_free'
                      });
                    }
                  }}
                >
                  Try {toolA.tool_name} Free
                </a>
                
                <a
                  href={toolA.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border-2 border-blue-400 text-blue-100 hover:bg-blue-400 hover:text-blue-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              <div className="mt-6 text-xs text-blue-200">
                ✓ No credit card required ✓ Free trial available
              </div>
            </div>
          </div>

          {/* Tool B CTA */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-xl p-3 shadow-lg">
                <Image
                  src={toolB.logo_url}
                  alt={`${toolB.tool_name} logo`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{toolB.tool_name}</h3>
              <p className="text-blue-100 mb-6">Start your free trial and explore all features</p>
              
              <div className="space-y-4">
                <a
                  href={toolB.affiliate_link || toolB.official_url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  onClick={() => {
                    // Track affiliate click
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'click', {
                        event_category: 'Affiliate',
                        event_label: toolB.tool_name,
                        event_action: 'try_free'
                      });
                    }
                  }}
                >
                  Try {toolB.tool_name} Free
                </a>
                
                <a
                  href={toolB.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border-2 border-purple-400 text-purple-100 hover:bg-purple-400 hover:text-purple-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              <div className="mt-6 text-xs text-purple-200">
                ✓ No credit card required ✓ Free trial available
              </div>
            </div>
          </div>
        </div>

        {/* Email Capture Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <svg className="w-12 h-12 text-yellow-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 className="text-2xl font-bold text-white mb-2">Get Free AI Tool Comparison Report</h3>
              <p className="text-blue-100">
                Download our comprehensive PDF comparison guide plus get weekly updates on the latest AI tool reviews and exclusive deals.
              </p>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending PDF...
                    </div>
                  ) : (
                    'Download Free PDF'
                  )}
                </button>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="bg-green-500 bg-opacity-20 border border-green-400 rounded-lg p-4">
                  <div className="flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-100 font-medium">Thanks for subscribing!</span>
                  </div>
                  <p className="text-green-200 text-sm mt-2">
                    Check your email for confirmation and your first AI tool update.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 text-xs text-blue-200">
              📧 Weekly updates • 🎯 No spam • 🔒 Unsubscribe anytime
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-blue-100 mb-8">Trusted by over 50,000+ professionals worldwide</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            {/* Placeholder for company logos */}
            <div className="bg-white bg-opacity-10 rounded-lg p-6 h-16 flex items-center justify-center">
              <span className="text-white font-semibold">Company 1</span>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 h-16 flex items-center justify-center">
              <span className="text-white font-semibold">Company 2</span>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 h-16 flex items-center justify-center">
              <span className="text-white font-semibold">Company 3</span>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 h-16 flex items-center justify-center">
              <span className="text-white font-semibold">Company 4</span>
            </div>
          </div>
        </div>

        {/* Final Value Proposition */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h4 className="text-lg font-semibold text-white mb-2">Quick Setup</h4>
              <p className="text-blue-200 text-sm">Get started in minutes with both tools</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <div className="text-3xl mb-4">🛡️</div>
              <h4 className="text-lg font-semibold text-white mb-2">Risk-Free</h4>
              <p className="text-blue-200 text-sm">Free trials with no credit card required</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <div className="text-3xl mb-4">📈</div>
              <h4 className="text-lg font-semibold text-white mb-2">Proven Results</h4>
              <p className="text-blue-200 text-sm">Join thousands of satisfied users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}