/**
 * FAQ Component
 * Expandable FAQ section with search and categories
 */

import React, { useState, useEffect } from 'react';

const FAQ = ({ data = {}, category = 'general' }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [filteredFAQs, setFilteredFAQs] = useState([]);

  // Get all categories
  const categories = Object.keys(data);

  // Filter FAQs based on search and category
  useEffect(() => {
    let faqs = data[selectedCategory] || [];
    
    if (searchTerm) {
      faqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredFAQs(faqs);
  }, [searchTerm, selectedCategory, data]);

  // Toggle FAQ item
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setActiveIndex(null); // Close all items when searching
  };

  return (
    <div className="faq-component">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about AI tools and our platform</p>
      </div>

      {/* Search Bar */}
      <div className="faq-search">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" />
          </svg>
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={handleSearch}
            className="faq-search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="faq-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveIndex(null);
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="faq-list">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span className="question-text">{faq.question}</span>
                <span className="toggle-icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`faq-answer ${activeIndex === index ? 'expanded' : ''}`}
                style={{
                  maxHeight: activeIndex === index ? '500px' : '0',
                  opacity: activeIndex === index ? '1' : '0',
                  padding: activeIndex === index ? '20px' : '0 20px'
                }}
              >
                <div className="answer-content">
                  {faq.answer}
                  
                  {/* Related Links */}
                  {faq.links && (
                    <div className="related-links">
                      <h4>Related Resources:</h4>
                      <ul>
                        {faq.links.map((link, idx) => (
                          <li key={idx}>
                            <a href={link.url}>{link.text}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Helpful Vote */}
                  <div className="faq-feedback">
                    <span>Was this helpful?</span>
                    <button 
                      className="vote-btn"
                      onClick={() => handleVote(index, 'yes')}
                    >
                      👍 Yes
                    </button>
                    <button 
                      className="vote-btn"
                      onClick={() => handleVote(index, 'no')}
                    >
                      👎 No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No FAQs found matching "{searchTerm}"</p>
            <button onClick={() => setSearchTerm('')}>Clear search</button>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredFAQs.length > 10 && (
        <div className="faq-footer">
          <button className="load-more">
            Show More Questions
          </button>
        </div>
      )}

      {/* Contact Support */}
      <div className="faq-contact">
        <div className="contact-card">
          <h3>Still have questions?</h3>
          <p>Can't find what you're looking for? Our support team is here to help.</p>
          <div className="contact-options">
            <a href="/contact" className="btn btn-primary">
              Contact Support
            </a>
            <a href="/docs" className="btn btn-secondary">
              View Documentation
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-component {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .faq-header h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #1a202c;
        }

        .faq-header p {
          color: #64748b;
        }

        .faq-search {
          margin-bottom: 2rem;
        }

        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: #64748b;
        }

        .faq-search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .faq-search-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .clear-search {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #64748b;
          cursor: pointer;
        }

        .faq-categories {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .category-tab {
          padding: 0.5rem 1rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          color: #64748b;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }

        .category-tab:hover {
          background: #e2e8f0;
        }

        .category-tab.active {
          background: #667eea;
          border-color: #667eea;
          color: white;
        }

        .faq-list {
          margin-bottom: 2rem;
        }

        .faq-item {
          margin-bottom: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .faq-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .faq-item.active {
          border-color: #667eea;
        }

        .faq-question {
          width: 100%;
          padding: 1.25rem;
          background: white;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          text-align: left;
          font-size: 1rem;
          font-weight: 500;
          color: #1a202c;
          transition: background 0.3s;
        }

        .faq-question:hover {
          background: #f8fafc;
        }

        .toggle-icon {
          font-size: 1.5rem;
          color: #667eea;
          flex-shrink: 0;
        }

        .faq-answer {
          background: #f8fafc;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .answer-content {
          color: #4a5568;
          line-height: 1.6;
        }

        .related-links {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .related-links h4 {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .related-links ul {
          list-style: none;
          padding: 0;
        }

        .related-links li {
          margin-bottom: 0.25rem;
        }

        .related-links a {
          color: #667eea;
          text-decoration: none;
        }

        .related-links a:hover {
          text-decoration: underline;
        }

        .faq-feedback {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .vote-btn {
          padding: 0.25rem 0.75rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .vote-btn:hover {
          background: #f8fafc;
          border-color: #667eea;
        }

        .no-results {
          text-align: center;
          padding: 3rem;
          color: #64748b;
        }

        .faq-contact {
          margin-top: 3rem;
        }

        .contact-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
        }

        .contact-card h3 {
          margin-bottom: 0.5rem;
        }

        .contact-options {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1.5rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s;
        }

        .btn-primary {
          background: white;
          color: #667eea;
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

// Handle vote function
const handleVote = (index, vote) => {
  // In a real app, this would send data to an API
  console.log(`FAQ ${index} voted ${vote}`);
  // You could show a thank you message or update UI
};

export default FAQ;