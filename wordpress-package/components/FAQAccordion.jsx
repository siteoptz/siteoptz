/**
 * FAQ Accordion Component - Structured Q&A Section
 * 
 * Interactive FAQ section with Schema.org markup for SEO.
 * Supports search, categories, and expandable answers.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Tag, HelpCircle, ExternalLink } from 'lucide-react';

const FAQAccordion = ({
  faqs = [],
  categories = [],
  searchable = true,
  showCategories = true,
  defaultExpanded = null,
  maxHeight = "400px",
  schemaMarkup = true,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [filteredFAQs, setFilteredFAQs] = useState(faqs);

  // Initialize expanded items
  useEffect(() => {
    if (defaultExpanded) {
      if (Array.isArray(defaultExpanded)) {
        setExpandedItems(new Set(defaultExpanded));
      } else {
        setExpandedItems(new Set([defaultExpanded]));
      }
    }
  }, [defaultExpanded]);

  // Filter FAQs based on search and category
  useEffect(() => {
    let filtered = faqs;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => 
        faq.category === selectedCategory || 
        (faq.tags && faq.tags.includes(selectedCategory))
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term) ||
        (faq.tags && faq.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }

    setFilteredFAQs(filtered);
  }, [faqs, searchTerm, selectedCategory]);

  // Toggle FAQ item
  const toggleItem = (index) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Generate schema markup
  const generateSchemaMarkup = () => {
    if (!schemaMarkup || filteredFAQs.length === 0) return null;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": filteredFAQs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    );
  };

  // Get unique categories from FAQs
  const getCategories = () => {
    if (categories.length > 0) return categories;
    
    const categorySet = new Set();
    faqs.forEach(faq => {
      if (faq.category) categorySet.add(faq.category);
      if (faq.tags) faq.tags.forEach(tag => categorySet.add(tag));
    });
    
    return Array.from(categorySet);
  };

  const availableCategories = getCategories();

  return (
    <div className={`faq-accordion ${className}`}>
      {generateSchemaMarkup()}
      
      <div className="faq-header">
        <div className="header-content">
          <HelpCircle className="header-icon" size={32} />
          <div>
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about AI tools and our platform.</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="faq-controls">
          {searchable && (
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          )}

          {showCategories && availableCategories.length > 0 && (
            <div className="category-filter">
              <Tag className="filter-icon" size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                <option value="all">All Categories</option>
                {availableCategories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="faq-content">
        {filteredFAQs.length === 0 ? (
          <div className="no-results">
            <HelpCircle size={48} />
            <h3>No FAQs found</h3>
            <p>Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="faq-list">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={`${faq.id || index}-${selectedCategory}-${searchTerm}`}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  className={`faq-question ${expandedItems.has(index) ? 'expanded' : ''}`}
                  onClick={() => toggleItem(index)}
                  aria-expanded={expandedItems.has(index)}
                >
                  <span className="question-text">{faq.question}</span>
                  <motion.div
                    className="expand-icon"
                    animate={{ rotate: expandedItems.has(index) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedItems.has(index) && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="answer-content">
                        <div 
                          className="answer-text"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                        
                        {/* Tags */}
                        {faq.tags && faq.tags.length > 0 && (
                          <div className="faq-tags">
                            {faq.tags.map(tag => (
                              <span key={tag} className="faq-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Related Links */}
                        {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                          <div className="related-links">
                            <h4>Related Resources:</h4>
                            <ul>
                              {faq.relatedLinks.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <a 
                                    href={link.url}
                                    target={link.external ? "_blank" : "_self"}
                                    rel={link.external ? "noopener noreferrer" : ""}
                                    className="related-link"
                                  >
                                    <span>{link.title}</span>
                                    {link.external && <ExternalLink size={14} />}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Last Updated */}
                        {faq.lastUpdated && (
                          <div className="last-updated">
                            Last updated: {new Date(faq.lastUpdated).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredFAQs.length > 10 && (
        <div className="load-more-container">
          <button className="load-more-btn">
            Load More FAQs
          </button>
        </div>
      )}

      {/* Component Styles */}
      <style jsx>{`
        .faq-accordion {
          background: white;
          border-radius: var(--radius-2xl);
          border: 1px solid var(--gray-200);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .faq-header {
          background: linear-gradient(135deg, var(--indigo-600), var(--indigo-700));
          color: white;
          padding: var(--space-8);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .header-icon {
          background: rgba(255, 255, 255, 0.2);
          padding: var(--space-2);
          border-radius: var(--radius-lg);
        }

        .header-content h2 {
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          margin-bottom: var(--space-2);
        }

        .header-content p {
          opacity: 0.9;
          line-height: 1.5;
        }

        .faq-controls {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 250px;
        }

        .search-icon {
          position: absolute;
          left: var(--space-3);
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
        }

        .search-input {
          width: 100%;
          padding: var(--space-3) var(--space-3) var(--space-3) var(--space-10);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: var(--text-base);
          backdrop-filter: blur(4px);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .search-input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.15);
        }

        .category-filter {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .filter-icon {
          color: rgba(255, 255, 255, 0.8);
        }

        .category-select {
          padding: var(--space-3);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          backdrop-filter: blur(4px);
          cursor: pointer;
        }

        .category-select option {
          background: var(--gray-900);
          color: white;
        }

        .faq-content {
          padding: var(--space-8);
        }

        .no-results {
          text-align: center;
          padding: var(--space-12);
          color: var(--text-secondary);
        }

        .no-results svg {
          color: var(--gray-400);
          margin-bottom: var(--space-4);
        }

        .no-results h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-2);
          color: var(--text-primary);
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .faq-item {
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: var(--transition-base);
        }

        .faq-item:hover {
          border-color: var(--indigo-300);
          box-shadow: var(--shadow-md);
        }

        .faq-question {
          width: 100%;
          padding: var(--space-6);
          background: white;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          transition: var(--transition-base);
        }

        .faq-question:hover {
          background: var(--gray-50);
        }

        .faq-question.expanded {
          background: var(--indigo-50);
          border-bottom: 1px solid var(--gray-200);
        }

        .question-text {
          font-size: var(--text-lg);
          font-weight: var(--font-semibold);
          color: var(--text-primary);
          line-height: 1.4;
        }

        .expand-icon {
          color: var(--indigo-600);
          flex-shrink: 0;
        }

        .faq-answer {
          overflow: hidden;
        }

        .answer-content {
          padding: var(--space-6);
          background: var(--gray-50);
        }

        .answer-text {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-4);
        }

        .answer-text h4 {
          color: var(--text-primary);
          font-weight: var(--font-semibold);
          margin: var(--space-4) 0 var(--space-2) 0;
        }

        .answer-text ul, .answer-text ol {
          margin: var(--space-2) 0;
          padding-left: var(--space-6);
        }

        .answer-text li {
          margin-bottom: var(--space-1);
        }

        .answer-text a {
          color: var(--indigo-600);
          text-decoration: none;
        }

        .answer-text a:hover {
          text-decoration: underline;
        }

        .faq-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
        }

        .faq-tag {
          padding: var(--space-1) var(--space-2);
          background: var(--indigo-100);
          color: var(--indigo-800);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: var(--font-medium);
        }

        .related-links {
          border-top: 1px solid var(--gray-200);
          padding-top: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .related-links h4 {
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--text-primary);
          margin-bottom: var(--space-2);
        }

        .related-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .related-links li {
          margin-bottom: var(--space-1);
        }

        .related-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          color: var(--indigo-600);
          text-decoration: none;
          font-size: var(--text-sm);
          transition: var(--transition-base);
        }

        .related-link:hover {
          color: var(--indigo-700);
          text-decoration: underline;
        }

        .last-updated {
          font-size: var(--text-xs);
          color: var(--text-tertiary);
          font-style: italic;
          border-top: 1px solid var(--gray-200);
          padding-top: var(--space-2);
        }

        .load-more-container {
          text-align: center;
          padding: var(--space-6);
          border-top: 1px solid var(--gray-200);
        }

        .load-more-btn {
          padding: var(--space-3) var(--space-6);
          background: var(--indigo-600);
          color: white;
          border: none;
          border-radius: var(--radius-lg);
          font-weight: var(--font-medium);
          cursor: pointer;
          transition: var(--transition-base);
        }

        .load-more-btn:hover {
          background: var(--indigo-700);
          transform: translateY(-1px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .faq-header {
            padding: var(--space-6);
          }

          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .faq-controls {
            flex-direction: column;
          }

          .search-container {
            min-width: auto;
          }

          .faq-content {
            padding: var(--space-4);
          }

          .faq-question {
            padding: var(--space-4);
          }

          .question-text {
            font-size: var(--text-base);
          }

          .answer-content {
            padding: var(--space-4);
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .faq-accordion {
            background: var(--gray-900);
            border-color: var(--gray-700);
          }

          .faq-item {
            border-color: var(--gray-700);
          }

          .faq-item:hover {
            border-color: var(--indigo-500);
          }

          .faq-question {
            background: var(--gray-900);
            color: var(--gray-100);
          }

          .faq-question:hover {
            background: var(--gray-800);
          }

          .faq-question.expanded {
            background: var(--indigo-900);
            border-color: var(--gray-700);
          }

          .answer-content {
            background: var(--gray-800);
          }

          .answer-text {
            color: var(--gray-300);
          }

          .faq-tag {
            background: var(--indigo-900);
            color: var(--indigo-200);
          }

          .related-links {
            border-color: var(--gray-700);
          }

          .last-updated {
            color: var(--gray-500);
          }

          .load-more-container {
            border-color: var(--gray-700);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .expand-icon {
            transition: none;
          }

          .faq-answer {
            transition: none;
          }

          .load-more-btn:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQAccordion;