import React from 'react';
import Link from 'next/link';

interface ExpertCTASectionProps {
  toolName?: string;
}

export default function ExpertCTASection({ toolName }: ExpertCTASectionProps) {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-700/10 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-800 relative overflow-hidden">
          {/* Background gradient animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Work 1‑on‑1 With AI Experts Who Deliver Results
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Skip the sales demo—get a real strategy session for your business.
            </p>
            
            <p className="text-lg text-cyan-400 mb-8 font-medium">
              Walk away with a custom AI roadmap in 30 minutes.
            </p>
            
            <div className="flex justify-center">
              <a
                href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl text-lg inline-flex items-center group"
              >
                Get My 30‑Minute AI Roadmap
                <svg 
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            {/* Additional trust indicators */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-400">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No sales pitch
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Actionable insights
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% free consultation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}