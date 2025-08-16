import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function CallToAction() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <motion.section
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-8 py-12 md:px-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See How SiteOptz.ai Can Grow Your Business
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join 92+ companies already accelerating their growth with our AI-powered platform
            </p>

            {/* Email Capture Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Success!
                    </>
                  ) : (
                    <>
                      Get Started
                      <ArrowRightIcon className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-white text-sm"
                >
                  Thank you! We'll be in touch within 24 hours.
                </motion.p>
              )}
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Schedule a Demo
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
              >
                Explore AI Tools
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">30-Day</div>
                  <div className="text-sm text-blue-100">Money-Back Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">SOC 2</div>
                  <div className="text-sm text-blue-100">Type II Certified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm text-blue-100">Uptime SLA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-blue-100">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}