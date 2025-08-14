/**
 * Hero Component - Value Prop + Instant CTA
 * 
 * Modern hero section with animated entrance, value proposition,
 * and instant CTA buttons for calculator or comparison start.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Search, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';

const Hero = ({
  title = "Find Your Perfect AI Tool in Minutes",
  subtitle = "Compare pricing, features, and performance of 100+ AI tools. Get personalized recommendations based on your specific needs.",
  stats = [
    { label: "AI Tools Compared", value: "100+", icon: Star },
    { label: "Happy Users", value: "50K+", icon: Users },
    { label: "Money Saved", value: "$2M+", icon: TrendingUp }
  ],
  primaryCTA = {
    text: "Start Comparison",
    href: "/comparisons",
    icon: Search
  },
  secondaryCTA = {
    text: "Calculate Pricing",
    href: "/pricing",
    icon: Calculator
  }
}) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          {/* Main Content */}
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="hero-title">
              {title}
            </h1>
            
            <p className="hero-subtitle">
              {subtitle}
            </p>
            
            {/* CTA Buttons */}
            <div className="hero-actions">
              <motion.a
                href={primaryCTA.href}
                className="btn btn-primary btn-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <primaryCTA.icon size={20} />
                {primaryCTA.text}
                <ArrowRight size={16} />
              </motion.a>
              
              <motion.a
                href={secondaryCTA.href}
                className="btn btn-secondary btn-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <secondaryCTA.icon size={20} />
                {secondaryCTA.text}
              </motion.a>
            </div>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="hero-stat"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + (index * 0.1),
                  type: "spring",
                  stiffness: 200
                }}
              >
                <div className="hero-stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="hero-stat-content">
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Background Animation */}
        <div className="hero-background">
          <motion.div
            className="hero-gradient-orb hero-gradient-orb--1"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="hero-gradient-orb hero-gradient-orb--2"
            animate={{
              x: [0, -150, 0],
              y: [0, 100, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowRight size={20} className="rotate-90" />
        </motion.div>
      </motion.div>
      
      {/* Component Styles */}
      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
          color: white;
          overflow: hidden;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 1000px;
          margin: 0 auto;
          padding: var(--space-20) 0;
        }
        
        .hero-title {
          font-size: clamp(var(--text-4xl), 5vw, var(--text-6xl));
          font-weight: var(--font-extrabold);
          line-height: 1.1;
          margin-bottom: var(--space-6);
          background: linear-gradient(135deg, #ffffff, #e0e7ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-subtitle {
          font-size: var(--text-xl);
          line-height: 1.6;
          margin-bottom: var(--space-10);
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: var(--space-16);
        }
        
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: var(--space-12);
          flex-wrap: wrap;
          margin-top: var(--space-16);
        }
        
        .hero-stat {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: var(--space-4) var(--space-6);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .hero-stat-icon {
          background: rgba(255, 255, 255, 0.2);
          padding: var(--space-2);
          border-radius: var(--radius-lg);
        }
        
        .hero-stat-value {
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          line-height: 1;
        }
        
        .hero-stat-label {
          font-size: var(--text-sm);
          opacity: 0.8;
        }
        
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }
        
        .hero-gradient-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .hero-gradient-orb--1 {
          width: 400px;
          height: 400px;
          top: 10%;
          right: 10%;
        }
        
        .hero-gradient-orb--2 {
          width: 300px;
          height: 300px;
          bottom: 20%;
          left: 10%;
        }
        
        .hero-scroll-indicator {
          position: absolute;
          bottom: var(--space-8);
          left: 50%;
          transform: translateX(-50%);
          opacity: 0.7;
        }
        
        .rotate-90 {
          transform: rotate(90deg);
        }
        
        @media (max-width: 768px) {
          .hero-content {
            padding: var(--space-16) 0;
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .hero-stats {
            gap: var(--space-6);
          }
          
          .hero-stat {
            flex-direction: column;
            text-align: center;
            gap: var(--space-2);
          }
          
          .hero-gradient-orb {
            display: none; /* Hide orbs on mobile for performance */
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .hero-gradient-orb {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;