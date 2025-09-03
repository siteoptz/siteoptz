import React from 'react';
import Link from 'next/link';
import { ArrowRight, Rocket, BarChart3, Play, CheckCircle, Sparkles } from 'lucide-react';

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
          {/* Free Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8 hover:bg-white/15 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-bold">FREE</span>
            <span>to use and explore</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-white mb-4">Discover the Best</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">
              AI Tools
            </span>
            <span className="block text-white mt-4">for Your Business</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Compare 500+ AI tools with expert reviews, pricing analysis, and performance benchmarks. 
            Make data-driven decisions to transform your business with the right AI solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link 
              href="/tools"
              className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105"
            >
              <Rocket className="w-6 h-6 group-hover:animate-bounce" />
              Explore AI Tools
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/compare"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg rounded-xl hover:bg-white/15 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>Expert Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>Unbiased Comparisons</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>Always Free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>Updated Daily</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400 text-sm">AI Tools Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">50K+</div>
              <div className="text-gray-400 text-sm">Users Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">4.8/5</div>
              <div className="text-gray-400 text-sm">Expert Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Support Available</div>
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