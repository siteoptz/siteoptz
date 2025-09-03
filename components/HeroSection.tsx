import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Users, TrendingUp, CheckCircle, Sparkles, Shield } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center relative z-10">
          {/* Free Consultation Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-400/30 rounded-full text-white/90 text-sm font-medium mb-8 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-bold">FREE</span>
            <span>30-Minute Strategy Session</span>
            <span className="text-xs bg-cyan-400 text-black px-2 py-1 rounded-full font-bold">$2,500 VALUE</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-white mb-4">Stop Drowning in</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">
              AI Tool Options
            </span>
            <span className="block text-white mt-4">Get Your Custom Roadmap</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Your AI Tools Roadmap & Implementation Partner. We&apos;ve deployed 500+ AI tools for Fortune 500 companies. 
            Get a custom 90-day AI strategy that actually works for your business.
          </p>

          {/* Primary CTA */}
          <div className="mb-8">
            <Link 
              href="/contact"
              className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105"
            >
              <Calendar className="w-6 h-6 group-hover:animate-bounce" />
              Book Free Strategy Session
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Secondary CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link 
              href="/tools"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg rounded-xl hover:bg-white/15 transition-all duration-300"
            >
              <TrendingUp className="w-5 h-5" />
              View Our Tool Database
            </Link>
            <span className="text-gray-400 font-medium">or</span>
            <Link 
              href="/compare"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Compare Solutions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-cyan-400 mb-2">Custom Roadmap</div>
              <div className="text-sm text-gray-300">90-day implementation plan</div>
              <div className="text-xs text-cyan-400 font-semibold mt-1">Worth $2,500</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-blue-400 mb-2">Implementation Strategy</div>
              <div className="text-sm text-gray-300">Technical setup & training</div>
              <div className="text-xs text-blue-400 font-semibold mt-1">Worth $1,800</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-purple-400 mb-2">Performance Benchmarking</div>
              <div className="text-sm text-gray-300">KPIs & success tracking</div>
              <div className="text-xs text-purple-400 font-semibold mt-1">Worth $1,200</div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>No Sales Pitch Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>Custom Roadmap Included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>98% Success Rate</span>
            </div>
          </div>

          {/* Stats Row - Consulting Focused */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400 text-sm">AI Tools Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">98%</div>
              <div className="text-gray-400 text-sm">Client Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">10x</div>
              <div className="text-gray-400 text-sm">Average ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2">90</div>
              <div className="text-gray-400 text-sm">Days to Success</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl opacity-20 animate-float delay-500 pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;