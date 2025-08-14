/**
 * Trust Band Component - Social Proof & Credibility
 * 
 * Displays logos, stats, and testimonials to build trust and credibility.
 * Supports automatic logo carousel and animated counters.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, TrendingUp, Award, CheckCircle } from 'lucide-react';

const TrustBand = ({
  type = "logos", // "logos", "stats", "testimonials", "mixed"
  title = "Trusted by 50,000+ professionals worldwide",
  logos = [],
  stats = [],
  testimonials = [],
  autoPlay = true,
  showRatings = true,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate content
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      if (type === "testimonials") {
        setCurrentIndex(prev => (prev + 1) % testimonials.length);
      } else if (type === "logos") {
        setCurrentIndex(prev => (prev + 1) % Math.ceil(logos.length / 6));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, type, testimonials.length, logos.length]);

  // Animated counter hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [end, duration]);
    
    return count;
  };

  const renderLogos = () => (
    <div className="trust-logos-container">
      <motion.div
        className="trust-logos-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
      >
        {logos.slice(currentIndex * 6, (currentIndex * 6) + 6).map((logo, index) => (
          <motion.div
            key={`${logo.name}-${index}`}
            className="trust-logo-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
          >
            <img
              src={logo.url}
              alt={logo.name}
              className="trust-logo-image"
              loading="lazy"
            />
            <span className="trust-logo-tooltip">{logo.name}</span>
          </motion.div>
        ))}
      </motion.div>
      
      {logos.length > 6 && (
        <div className="trust-pagination">
          {Array.from({ length: Math.ceil(logos.length / 6) }).map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show logos ${index * 6 + 1}-${Math.min((index + 1) * 6, logos.length)}`}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderStats = () => (
    <div className="trust-stats-container">
      <div className="trust-stats-grid">
        {stats.map((stat, index) => {
          const IconComponent = {
            users: Users,
            trending: TrendingUp,
            award: Award,
            check: CheckCircle,
            star: Star
          }[stat.icon] || TrendingUp;
          
          const animatedValue = useCounter(
            typeof stat.value === 'string' ? 
              parseInt(stat.value.replace(/[^\d]/g, '')) : 
              stat.value
          );
          
          return (
            <motion.div
              key={stat.label}
              className="trust-stat-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="stat-icon">
                <IconComponent size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-value">
                  {typeof stat.value === 'string' ? 
                    stat.value.replace(/\d+/, animatedValue.toLocaleString()) :
                    animatedValue.toLocaleString()
                  }
                  {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderTestimonials = () => (
    <div className="trust-testimonials-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="testimonial-card"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {testimonials[currentIndex] && (
            <>
              <div className="testimonial-content">
                <blockquote className="testimonial-quote">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                <div className="testimonial-author">
                  {testimonials[currentIndex].avatar && (
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="author-avatar"
                    />
                  )}
                  <div className="author-info">
                    <cite className="author-name">{testimonials[currentIndex].name}</cite>
                    <div className="author-title">
                      {testimonials[currentIndex].title}
                      {testimonials[currentIndex].company && (
                        <span className="author-company"> at {testimonials[currentIndex].company}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {showRatings && testimonials[currentIndex].rating && (
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < testimonials[currentIndex].rating ? 'star-filled' : 'star-empty'}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      
      {testimonials.length > 1 && (
        <div className="testimonial-navigation">
          <button
            className="nav-btn prev"
            onClick={() => setCurrentIndex(prev => 
              prev === 0 ? testimonials.length - 1 : prev - 1
            )}
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            className="nav-btn next"
            onClick={() => setCurrentIndex(prev => 
              (prev + 1) % testimonials.length
            )}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );

  const renderMixed = () => (
    <div className="trust-mixed-container">
      <div className="mixed-content">
        {/* Quick stats */}
        <div className="mixed-stats">
          {stats.slice(0, 3).map((stat, index) => {
            const animatedValue = useCounter(
              typeof stat.value === 'string' ? 
                parseInt(stat.value.replace(/[^\d]/g, '')) : 
                stat.value
            );
            
            return (
              <div key={stat.label} className="mixed-stat">
                <div className="mixed-stat-value">
                  {typeof stat.value === 'string' ? 
                    stat.value.replace(/\d+/, animatedValue.toLocaleString()) :
                    animatedValue.toLocaleString()
                  }
                </div>
                <div className="mixed-stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
        {/* Featured testimonial */}
        {testimonials[0] && (
          <div className="mixed-testimonial">
            <blockquote className="mixed-quote">
              "{testimonials[0].quote}"
            </blockquote>
            <cite className="mixed-author">
              — {testimonials[0].name}, {testimonials[0].company}
            </cite>
          </div>
        )}
        
        {/* Top logos */}
        <div className="mixed-logos">
          {logos.slice(0, 4).map((logo, index) => (
            <img
              key={logo.name}
              src={logo.url}
              alt={logo.name}
              className="mixed-logo"
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className={`trust-band trust-band--${type} ${className}`}>
      <div className="container">
        {title && (
          <motion.h2
            className="trust-band-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
        )}
        
        <div className="trust-band-content">
          {type === "logos" && renderLogos()}
          {type === "stats" && renderStats()}
          {type === "testimonials" && renderTestimonials()}
          {type === "mixed" && renderMixed()}
        </div>
      </div>

      {/* Component Styles */}
      <style jsx>{`
        .trust-band {
          padding: var(--space-16) 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--gray-200);
          border-bottom: 1px solid var(--gray-200);
        }

        .trust-band-title {
          text-align: center;
          font-size: var(--text-2xl);
          font-weight: var(--font-semibold);
          color: var(--text-secondary);
          margin-bottom: var(--space-12);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Logo Styles */
        .trust-logos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: var(--space-8);
          align-items: center;
          justify-items: center;
          margin-bottom: var(--space-6);
        }

        .trust-logo-item {
          position: relative;
          padding: var(--space-4);
          border-radius: var(--radius-lg);
          transition: var(--transition-base);
          cursor: pointer;
        }

        .trust-logo-image {
          height: 40px;
          width: auto;
          max-width: 120px;
          object-fit: contain;
          filter: grayscale(100%) opacity(0.6);
          transition: var(--transition-base);
        }

        .trust-logo-item:hover .trust-logo-image {
          filter: grayscale(0%) opacity(1);
          transform: scale(1.1);
        }

        .trust-logo-tooltip {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gray-900);
          color: white;
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-sm);
          font-size: var(--text-xs);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: var(--transition-base);
        }

        .trust-logo-item:hover .trust-logo-tooltip {
          opacity: 1;
        }

        /* Stats Styles */
        .trust-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-8);
          max-width: 800px;
          margin: 0 auto;
        }

        .trust-stat-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-6);
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--gray-200);
          transition: var(--transition-base);
        }

        .trust-stat-item:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--blue-300);
        }

        .stat-icon {
          background: var(--blue-50);
          padding: var(--space-3);
          border-radius: var(--radius-lg);
          color: var(--blue-600);
          flex-shrink: 0;
        }

        .stat-value {
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-suffix {
          font-size: var(--text-lg);
          color: var(--text-secondary);
        }

        .stat-label {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin-top: var(--space-1);
        }

        /* Testimonial Styles */
        .trust-testimonials-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: white;
          padding: var(--space-10);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--gray-200);
        }

        .testimonial-quote {
          font-size: var(--text-xl);
          line-height: 1.6;
          color: var(--text-primary);
          margin: 0 0 var(--space-6) 0;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .author-avatar {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-full);
          object-fit: cover;
        }

        .author-name {
          font-weight: var(--font-semibold);
          color: var(--text-primary);
          font-style: normal;
        }

        .author-title {
          color: var(--text-secondary);
          font-size: var(--text-sm);
        }

        .author-company {
          color: var(--blue-600);
        }

        .testimonial-rating {
          display: flex;
          gap: var(--space-1);
          margin-top: var(--space-4);
        }

        .star-filled {
          color: var(--amber-500);
        }

        .star-empty {
          color: var(--gray-300);
        }

        .testimonial-navigation {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          margin-top: var(--space-8);
        }

        .nav-btn {
          background: white;
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-full);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-base);
          font-size: var(--text-xl);
          color: var(--gray-600);
        }

        .nav-btn:hover {
          background: var(--gray-50);
          border-color: var(--gray-400);
        }

        .testimonial-indicators {
          display: flex;
          gap: var(--space-2);
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          background: var(--gray-300);
          border: none;
          cursor: pointer;
          transition: var(--transition-base);
        }

        .indicator.active {
          background: var(--blue-600);
        }

        /* Mixed Layout Styles */
        .mixed-content {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: var(--space-12);
          align-items: center;
        }

        .mixed-stats {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .mixed-stat {
          text-align: center;
        }

        .mixed-stat-value {
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
        }

        .mixed-stat-label {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .mixed-testimonial {
          text-align: center;
          padding: var(--space-6);
          background: white;
          border-radius: var(--radius-xl);
          border: 1px solid var(--gray-200);
        }

        .mixed-quote {
          font-size: var(--text-lg);
          line-height: 1.6;
          margin: 0 0 var(--space-4) 0;
          font-style: italic;
        }

        .mixed-author {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          font-style: normal;
        }

        .mixed-logos {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          align-items: center;
        }

        .mixed-logo {
          height: 24px;
          width: auto;
          max-width: 80px;
          object-fit: contain;
          filter: grayscale(100%) opacity(0.6);
          transition: var(--transition-base);
        }

        .mixed-logo:hover {
          filter: grayscale(0%) opacity(1);
        }

        /* Pagination */
        .trust-pagination {
          display: flex;
          justify-content: center;
          gap: var(--space-2);
          margin-top: var(--space-6);
        }

        .pagination-dot {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          background: var(--gray-300);
          border: none;
          cursor: pointer;
          transition: var(--transition-base);
        }

        .pagination-dot.active {
          background: var(--blue-600);
          transform: scale(1.2);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .trust-band-title {
            font-size: var(--text-xl);
          }

          .trust-logos-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-4);
          }

          .trust-logo-image {
            height: 32px;
          }

          .trust-stats-grid {
            grid-template-columns: 1fr;
            gap: var(--space-4);
          }

          .trust-stat-item {
            padding: var(--space-4);
          }

          .testimonial-card {
            padding: var(--space-6);
          }

          .testimonial-quote {
            font-size: var(--text-lg);
          }

          .mixed-content {
            grid-template-columns: 1fr;
            gap: var(--space-8);
            text-align: center;
          }

          .mixed-stats {
            flex-direction: row;
            justify-content: space-around;
          }

          .mixed-logos {
            flex-direction: row;
            justify-content: center;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .trust-band {
            background: var(--gray-800);
            border-color: var(--gray-700);
          }

          .testimonial-card,
          .trust-stat-item,
          .mixed-testimonial {
            background: var(--gray-900);
            border-color: var(--gray-700);
          }

          .nav-btn {
            background: var(--gray-800);
            border-color: var(--gray-600);
            color: var(--gray-300);
          }

          .nav-btn:hover {
            background: var(--gray-700);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .trust-logo-item,
          .trust-stat-item,
          .testimonial-card {
            transition: none;
          }

          .trust-logo-image {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustBand;