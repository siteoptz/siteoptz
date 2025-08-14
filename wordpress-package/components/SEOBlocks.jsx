/**
 * SEO Blocks Component - Content Blocks with Schema Markup
 * 
 * Flexible content blocks optimized for SEO with structured data.
 * Supports articles, reviews, products, and organization markup.
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, User, Tag, ExternalLink, Award, TrendingUp } from 'lucide-react';

const SEOBlocks = ({
  blocks = [],
  schemaType = "Article", // "Article", "Review", "Product", "Organization", "FAQPage"
  showBreadcrumbs = true,
  showAuthor = true,
  showPublishDate = true,
  className = ""
}) => {

  // Generate structured data based on schema type
  const generateStructuredData = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    
    const schemaGenerators = {
      Article: () => ({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": blocks[0]?.title || "AI Tools Comparison",
        "description": blocks[0]?.description || "Comprehensive guide to AI tools",
        "author": {
          "@type": "Organization",
          "name": "SiteOptz.ai"
        },
        "publisher": {
          "@type": "Organization",
          "name": "SiteOptz.ai",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": typeof window !== 'undefined' ? window.location.href : ''
        }
      }),

      Review: () => ({
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "Product",
          "name": blocks[0]?.title || "AI Tool"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": blocks[0]?.rating || 5,
          "bestRating": 5
        },
        "author": {
          "@type": "Organization",
          "name": "SiteOptz.ai"
        },
        "datePublished": new Date().toISOString()
      }),

      Product: () => ({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": blocks[0]?.title || "AI Tool",
        "description": blocks[0]?.description || "Professional AI tool",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": blocks[0]?.rating || 4.5,
          "reviewCount": blocks[0]?.reviewCount || 100
        },
        "offers": {
          "@type": "Offer",
          "price": blocks[0]?.price || "0",
          "priceCurrency": "USD"
        }
      }),

      Organization: () => ({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SiteOptz.ai",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "description": "AI tools comparison and recommendation platform",
        "sameAs": [
          "https://twitter.com/siteoptz",
          "https://linkedin.com/company/siteoptz"
        ]
      })
    };

    return schemaGenerators[schemaType] ? schemaGenerators[schemaType]() : null;
  };

  // Inject structured data
  useEffect(() => {
    const structuredData = generateStructuredData();
    if (!structuredData) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [blocks, schemaType]);

  // Render different block types
  const renderBlock = (block, index) => {
    const blockComponents = {
      hero: () => (
        <div className="seo-block seo-block--hero">
          <div className="hero-content">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {block.title}
            </motion.h1>
            
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {block.description}
            </motion.p>

            {block.cta && (
              <motion.div
                className="hero-cta"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <a href={block.cta.url} className="cta-button">
                  {block.cta.text}
                  <ExternalLink size={16} />
                </a>
              </motion.div>
            )}
          </div>

          {block.image && (
            <div className="hero-image">
              <img src={block.image.url} alt={block.image.alt} />
            </div>
          )}
        </div>
      ),

      content: () => (
        <div className="seo-block seo-block--content">
          <div className="content-header">
            {block.title && (
              <h2 className="content-title">{block.title}</h2>
            )}
            
            {block.meta && (
              <div className="content-meta">
                {showAuthor && block.meta.author && (
                  <div className="meta-item">
                    <User size={16} />
                    <span>By {block.meta.author}</span>
                  </div>
                )}
                
                {showPublishDate && block.meta.date && (
                  <div className="meta-item">
                    <Calendar size={16} />
                    <time dateTime={block.meta.date}>
                      {new Date(block.meta.date).toLocaleDateString()}
                    </time>
                  </div>
                )}

                {block.meta.readTime && (
                  <div className="meta-item">
                    <span>{block.meta.readTime} min read</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div 
            className="content-body"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />

          {block.tags && (
            <div className="content-tags">
              <Tag size={16} />
              <div className="tags-list">
                {block.tags.map(tag => (
                  <span key={tag} className="content-tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      ),

      comparison: () => (
        <div className="seo-block seo-block--comparison">
          <h2 className="comparison-title">{block.title}</h2>
          
          <div className="comparison-grid">
            {block.items.map((item, itemIndex) => (
              <motion.div
                key={item.name}
                className="comparison-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: itemIndex * 0.1 }}
              >
                <div className="item-header">
                  {item.logo && (
                    <img src={item.logo} alt={item.name} className="item-logo" />
                  )}
                  <h3 className="item-name">{item.name}</h3>
                  
                  {item.rating && (
                    <div className="item-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < item.rating ? 'star-filled' : 'star-empty'}
                          />
                        ))}
                      </div>
                      <span className="rating-value">{item.rating}</span>
                    </div>
                  )}
                </div>

                <div className="item-content">
                  <p className="item-description">{item.description}</p>
                  
                  {item.features && (
                    <div className="item-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {item.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.pricing && (
                    <div className="item-pricing">
                      <span className="price-label">Starting at</span>
                      <span className="price-value">{item.pricing}</span>
                    </div>
                  )}
                </div>

                {item.cta && (
                  <div className="item-cta">
                    <a href={item.cta.url} className="item-button">
                      {item.cta.text}
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ),

      features: () => (
        <div className="seo-block seo-block--features">
          <div className="features-header">
            <h2 className="features-title">{block.title}</h2>
            {block.description && (
              <p className="features-description">{block.description}</p>
            )}
          </div>

          <div className="features-grid">
            {block.features.map((feature, featureIndex) => (
              <motion.div
                key={feature.title}
                className="feature-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: featureIndex * 0.1 }}
              >
                <div className="feature-icon">
                  {feature.icon === 'award' && <Award size={24} />}
                  {feature.icon === 'trending' && <TrendingUp size={24} />}
                  {feature.icon === 'star' && <Star size={24} />}
                </div>
                
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                {feature.link && (
                  <a href={feature.link.url} className="feature-link">
                    {feature.link.text}
                    <ExternalLink size={14} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ),

      cta: () => (
        <div className="seo-block seo-block--cta">
          <div className="cta-content">
            <h2 className="cta-title">{block.title}</h2>
            <p className="cta-description">{block.description}</p>
            
            <div className="cta-buttons">
              {block.buttons.map((button, buttonIndex) => (
                <motion.a
                  key={button.text}
                  href={button.url}
                  className={`cta-button ${button.style || 'primary'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: buttonIndex * 0.1 }}
                >
                  {button.text}
                  {button.external && <ExternalLink size={16} />}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      )
    };

    return blockComponents[block.type] ? blockComponents[block.type]() : null;
  };

  return (
    <div className={`seo-blocks ${className}`}>
      {showBreadcrumbs && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li><a href="/">Home</a></li>
            <li><a href="/tools">AI Tools</a></li>
            <li aria-current="page">Comparison</li>
          </ol>
        </nav>
      )}

      <div className="blocks-container">
        {blocks.map((block, index) => (
          <motion.section
            key={`${block.type}-${index}`}
            className={`block-wrapper block-wrapper--${block.type}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {renderBlock(block, index)}
          </motion.section>
        ))}
      </div>

      {/* Component Styles */}
      <style jsx>{`
        .seo-blocks {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-4);
        }

        .breadcrumbs {
          margin-bottom: var(--space-8);
        }

        .breadcrumb-list {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: var(--text-sm);
        }

        .breadcrumb-list li:not(:last-child)::after {
          content: '/';
          margin-left: var(--space-2);
          color: var(--text-secondary);
        }

        .breadcrumb-list a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition-base);
        }

        .breadcrumb-list a:hover {
          color: var(--text-primary);
        }

        .breadcrumb-list li[aria-current="page"] {
          color: var(--text-primary);
          font-weight: var(--font-medium);
        }

        .blocks-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-12);
        }

        .block-wrapper {
          width: 100%;
        }

        /* Hero Block */
        .seo-block--hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-12);
          align-items: center;
          padding: var(--space-16) 0;
          background: linear-gradient(135deg, var(--blue-50), var(--indigo-50));
          border-radius: var(--radius-2xl);
          margin: var(--space-8) 0;
        }

        .hero-title {
          font-size: var(--text-5xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: var(--space-6);
        }

        .hero-description {
          font-size: var(--text-xl);
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-8);
        }

        .hero-cta {
          display: flex;
          gap: var(--space-4);
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-4) var(--space-6);
          background: var(--blue-600);
          color: white;
          text-decoration: none;
          border-radius: var(--radius-lg);
          font-weight: var(--font-semibold);
          transition: var(--transition-base);
        }

        .cta-button:hover {
          background: var(--blue-700);
          transform: translateY(-2px);
        }

        .hero-image img {
          width: 100%;
          height: auto;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
        }

        /* Content Block */
        .seo-block--content {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--gray-200);
        }

        .content-header {
          margin-bottom: var(--space-8);
        }

        .content-title {
          font-size: var(--text-3xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
          margin-bottom: var(--space-4);
        }

        .content-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          color: var(--text-secondary);
          font-size: var(--text-sm);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .content-body {
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: var(--space-6);
        }

        .content-body h2,
        .content-body h3,
        .content-body h4 {
          color: var(--text-primary);
          margin: var(--space-6) 0 var(--space-3) 0;
        }

        .content-body h2 {
          font-size: var(--text-2xl);
        }

        .content-body h3 {
          font-size: var(--text-xl);
        }

        .content-body h4 {
          font-size: var(--text-lg);
        }

        .content-body p {
          margin-bottom: var(--space-4);
        }

        .content-body ul,
        .content-body ol {
          margin: var(--space-4) 0;
          padding-left: var(--space-6);
        }

        .content-body li {
          margin-bottom: var(--space-2);
        }

        .content-tags {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding-top: var(--space-6);
          border-top: 1px solid var(--gray-200);
        }

        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .content-tag {
          padding: var(--space-1) var(--space-3);
          background: var(--blue-100);
          color: var(--blue-800);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
        }

        /* Comparison Block */
        .seo-block--comparison {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--gray-200);
        }

        .comparison-title {
          font-size: var(--text-3xl);
          font-weight: var(--font-bold);
          text-align: center;
          margin-bottom: var(--space-8);
          color: var(--text-primary);
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-6);
        }

        .comparison-item {
          background: var(--gray-50);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          border: 1px solid var(--gray-200);
          transition: var(--transition-base);
        }

        .comparison-item:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .item-header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }

        .item-logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .item-name {
          font-size: var(--text-xl);
          font-weight: var(--font-semibold);
          color: var(--text-primary);
          flex: 1;
        }

        .item-rating {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .stars {
          display: flex;
          gap: var(--space-1);
        }

        .star-filled {
          color: var(--amber-500);
        }

        .star-empty {
          color: var(--gray-300);
        }

        .rating-value {
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
          color: var(--text-secondary);
        }

        .item-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-4);
        }

        .item-features h4 {
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--text-primary);
          margin-bottom: var(--space-2);
        }

        .item-features ul {
          list-style: none;
          padding: 0;
          margin-bottom: var(--space-4);
        }

        .item-features li {
          padding: var(--space-1) 0;
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .item-features li::before {
          content: '✓';
          color: var(--green-600);
          font-weight: bold;
          margin-right: var(--space-2);
        }

        .item-pricing {
          display: flex;
          align-items: baseline;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
        }

        .price-label {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .price-value {
          font-size: var(--text-lg);
          font-weight: var(--font-bold);
          color: var(--text-primary);
        }

        .item-button {
          display: inline-block;
          padding: var(--space-3) var(--space-4);
          background: var(--blue-600);
          color: white;
          text-decoration: none;
          border-radius: var(--radius-md);
          font-weight: var(--font-medium);
          text-align: center;
          transition: var(--transition-base);
          width: 100%;
        }

        .item-button:hover {
          background: var(--blue-700);
        }

        /* Features Block */
        .seo-block--features {
          padding: var(--space-12) 0;
        }

        .features-header {
          text-align: center;
          margin-bottom: var(--space-12);
        }

        .features-title {
          font-size: var(--text-3xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
          margin-bottom: var(--space-4);
        }

        .features-description {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-8);
        }

        .feature-item {
          text-align: center;
          padding: var(--space-6);
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--gray-200);
          transition: var(--transition-base);
        }

        .feature-item:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-4px);
        }

        .feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: var(--blue-100);
          color: var(--blue-600);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-4);
        }

        .feature-title {
          font-size: var(--text-xl);
          font-weight: var(--font-semibold);
          color: var(--text-primary);
          margin-bottom: var(--space-3);
        }

        .feature-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-4);
        }

        .feature-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          color: var(--blue-600);
          text-decoration: none;
          font-weight: var(--font-medium);
          transition: var(--transition-base);
        }

        .feature-link:hover {
          color: var(--blue-700);
        }

        /* CTA Block */
        .seo-block--cta {
          background: linear-gradient(135deg, var(--blue-600), var(--indigo-600));
          color: white;
          text-align: center;
          padding: var(--space-16);
          border-radius: var(--radius-2xl);
          margin: var(--space-12) 0;
        }

        .cta-title {
          font-size: var(--text-4xl);
          font-weight: var(--font-bold);
          margin-bottom: var(--space-4);
        }

        .cta-description {
          font-size: var(--text-xl);
          opacity: 0.9;
          margin-bottom: var(--space-8);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        .cta-button.primary {
          background: white;
          color: var(--blue-600);
        }

        .cta-button.primary:hover {
          background: var(--gray-100);
        }

        .cta-button.secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .cta-button.secondary:hover {
          background: white;
          color: var(--blue-600);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .seo-blocks {
            padding: var(--space-2);
          }

          .seo-block--hero {
            grid-template-columns: 1fr;
            padding: var(--space-8);
            text-align: center;
          }

          .hero-title {
            font-size: var(--text-3xl);
          }

          .hero-description {
            font-size: var(--text-lg);
          }

          .comparison-grid {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-button {
            width: 100%;
            max-width: 300px;
          }

          .content-meta {
            flex-direction: column;
            gap: var(--space-2);
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .seo-block--content,
          .seo-block--comparison,
          .feature-item {
            background: var(--gray-900);
            border-color: var(--gray-700);
          }

          .comparison-item {
            background: var(--gray-800);
            border-color: var(--gray-700);
          }

          .seo-block--hero {
            background: linear-gradient(135deg, var(--gray-800), var(--gray-900));
          }
        }
      `}</style>
    </div>
  );
};

export default SEOBlocks;