import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Users, TrendingUp, CheckCircle, Sparkles, Shield } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{backgroundColor: 'var(--color-background)'}}>
      {/* Clean professional background */}
      <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.03) 0%, transparent 70%)'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center relative z-10">
          {/* Free Consultation Badge */}
          <a 
            href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-2 surface-professional text-white text-sm font-medium tracking-wide mb-12 transition-normal hover:bg-surface-elevated cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span className="font-bold">FREE</span>
            <span>30-MINUTE STRATEGY SESSION</span>
            <span className="text-xs bg-white text-black px-2 py-1 font-bold">$2,500 VALUE</span>
          </a>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black mb-12 leading-tight tracking-tight">
            <span className="block text-white mb-6 font-light">STOP WASTING MONEY ON</span>
            <span className="block text-white mb-6 font-black">
              WRONG AI TOOLS
            </span>
            <span className="block text-gray-400 text-3xl lg:text-5xl font-normal tracking-wider">GET EXPERT IMPLEMENTATION</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto mb-16 leading-relaxed font-normal tracking-wide">
            FORTUNE 500 AI IMPLEMENTATION EXPERTS / 500+ AI SOLUTIONS DEPLOYED / $50M+ PRODUCTIVITY GAINS GENERATED<br/>
            CUSTOM AI TRANSFORMATION ROADMAP / MEASURABLE ROI IN 90 DAYS
          </p>

          {/* Primary CTA */}
          <div className="mb-8">
            <a 
              href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-12 py-6 button-professional--accent text-white font-bold text-xl transition-all duration-300 shadow-2xl transform hover:scale-105"
            >
              <Calendar className="w-6 h-6 group-hover:animate-bounce" />
              Book Free Strategy Session
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Secondary CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link 
              href="/tools"
              className="group inline-flex items-center gap-3 px-8 py-4 surface-elevated text-white font-semibold text-lg transition-all duration-300"
            >
              <TrendingUp className="w-5 h-5" />
              View Our Tool Database
            </Link>
            <span className="text-gray-400 font-medium">or</span>
            <Link 
              href="/compare"
              className="inline-flex items-center gap-2 font-semibold transition-colors" 
              style={{color: 'var(--color-text-accent)'}} 
              onMouseEnter={(e) => e.currentTarget.style.color = '#1D4ED8'} 
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-accent)'}
            >
              Compare Solutions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="card-professional">
              <div className="text-2xl font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>AI Strategy Audit</div>
              <div className="text-sm" style={{color: 'var(--color-text-secondary)'}}>Complete current-state analysis & gaps identification</div>
              <div className="text-xs font-semibold mt-1" style={{color: 'var(--color-text-accent)'}}>$5,000 Value</div>
            </div>
            <div className="card-professional">
              <div className="text-2xl font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>Custom Roadmap</div>
              <div className="text-sm" style={{color: 'var(--color-text-secondary)'}}>90-day implementation plan with ROI projections</div>
              <div className="text-xs font-semibold mt-1" style={{color: 'var(--color-text-accent)'}}>$3,500 Value</div>
            </div>
            <div className="card-professional">
              <div className="text-2xl font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>Executive Briefing</div>
              <div className="text-sm" style={{color: 'var(--color-text-secondary)'}}>C-suite presentation & budget justification</div>
              <div className="text-xs font-semibold mt-1" style={{color: 'var(--color-text-accent)'}}>$2,000 Value</div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm" style={{color: 'var(--color-text-secondary)'}}>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{color: 'var(--color-text-accent)'}} />
              <span>Fortune 500 Methodology</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{color: 'var(--color-text-accent)'}} />
              <span>ROI Guarantee or Refund</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{color: 'var(--color-text-accent)'}} />
              <span>Expert Implementation Team</span>
            </div>
          </div>

          {/* Stats Row - Consulting Focused */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{color: 'var(--color-text-primary)'}}>$50M+</div>
              <div className="text-sm" style={{color: 'var(--color-text-secondary)'}}>Productivity Gains Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{color: 'var(--color-text-accent)'}}>Fortune 500</div>
              <div className="text-sm" style={{color: 'var(--color-text-secondary)'}}>Companies Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{color: 'var(--color-text-accent)'}}>15x</div>
              <div className="text-sm" style={{color: 'var(--color-text-secondary)'}}>Average ROI Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{color: 'var(--color-text-accent)'}}>90</div>
              <div className="text-sm" style={{color: 'var(--color-text-secondary)'}}>Days to Measurable Results</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle accent element */}
      <div className="absolute top-1/2 right-20 w-12 h-12 opacity-10 animate-float delay-500 pointer-events-none" style={{backgroundColor: 'var(--color-text-accent)', borderRadius: 'var(--radius-small)'}}></div>
    </section>
  );
};

export default HeroSection;