import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const FAQ = ({ 
  faqs = [], 
  title = "Frequently Asked Questions", 
  subtitle = "Get answers to common questions about AI tools",
  category = null,
  showCategories = false,
  maxItems = null,
  autoLoad = true
}) => {
  const [openItems, setOpenItems] = useState(new Set());
  const [allFaqs, setAllFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(autoLoad);

  // Load FAQ data from JSON file
  useEffect(() => {
    const loadFaqData = async () => {
      try {
        if (faqs.length > 0) {
          // Use provided FAQs if available
          setAllFaqs(faqs);
          setFilteredFaqs(faqs);
        } else {
          // Load from JSON file
          const response = await fetch('/data/faq_data.json');
          const data = await response.json();
          setAllFaqs(data);
          setFilteredFaqs(data);
        }
      } catch (error) {
        console.error('Error loading FAQ data:', error);
        // Fallback to default FAQs
        const defaultFaqs = [
          {
            id: "faq-default-1",
            question: "What is the best AI tool for content creation?",
            answer: "The best AI tool depends on your specific needs. Jasper AI is excellent for marketing content, ChatGPT is great for general writing, and Copy.ai is perfect for copywriting. Consider your budget, team size, and specific use cases when choosing.",
            category: "content-creation"
          },
          {
            id: "faq-default-2", 
            question: "How much do AI tools typically cost?",
            answer: "AI tool pricing varies widely. Most tools offer free tiers with limited features, while paid plans typically range from $10-$50 per month per user. Enterprise plans can cost $100+ per month. Many tools offer annual discounts of 20-30%.",
            category: "pricing"
          }
        ];
        setAllFaqs(defaultFaqs);
        setFilteredFaqs(defaultFaqs);
      } finally {
        setIsLoading(false);
      }
    };

    if (autoLoad) {
      loadFaqData();
    }
  }, [faqs, autoLoad]);

  // Filter FAQs based on category and search term
  useEffect(() => {
    let filtered = [...allFaqs];

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(searchLower) ||
        faq.answer.toLowerCase().includes(searchLower) ||
        (faq.keywords && faq.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchLower)
        ))
      );
    }

    // Limit items if specified
    if (maxItems) {
      filtered = filtered.slice(0, maxItems);
    }

    setFilteredFaqs(filtered);
  }, [allFaqs, selectedCategory, searchTerm, maxItems]);

  // Get unique categories
  const categories = ['all', ...new Set(allFaqs.map(faq => faq.category))];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const toggleAll = () => {
    if (openItems.size === filteredFaqs.length) {
      setOpenItems(new Set());
    } else {
      setOpenItems(new Set(filteredFaqs.map(faq => faq.id)));
    }
  };

  // Generate FAQPage schema markup
  const generateFAQSchema = () => {
    if (filteredFaqs.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": filteredFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Schema markup */}
      <Head>
        {filteredFaqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateFAQSchema())
            }}
          />
        )}
      </Head>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              aria-label="Search frequently asked questions"
            />
            <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filter */}
          {showCategories && categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={selectedCategory === cat}
                >
                  {cat === 'all' ? 'All Categories' : cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          )}

          {/* Results count and toggle all */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredFaqs.length} FAQ{filteredFaqs.length !== 1 ? 's' : ''} found
              {searchTerm && ` for &quot;${searchTerm}&quot;`}
              {selectedCategory !== 'all' && ` in ${selectedCategory.replace('-', ' ')}`}
            </span>
            {filteredFaqs.length > 1 && (
              <button
                onClick={toggleAll}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
                aria-label={openItems.size === filteredFaqs.length ? 'Collapse all FAQs' : 'Expand all FAQs'}
              >
                {openItems.size === filteredFaqs.length ? 'Collapse All' : 'Expand All'}
              </button>
            )}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inside"
                aria-expanded={openItems.has(faq.id)}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                        openItems.has(faq.id) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </button>
              
              {openItems.has(faq.id) && (
                <div 
                  id={`faq-answer-${faq.id}`}
                  className="px-6 py-4 bg-white border-t border-gray-200"
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                >
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                  
                  {/* Keywords/tags */}
                  {faq.keywords && faq.keywords.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {faq.keywords.slice(0, 3).map((keyword, keywordIndex) => (
                          <span
                            key={keywordIndex}
                            className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No FAQs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm 
                ? `No FAQs match &quot;${searchTerm}&quot;. Try adjusting your search terms.`
                : 'No FAQs available in this category.'
              }
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-8 p-6 bg-indigo-50 rounded-lg text-center">
          <h3 className="text-lg font-medium text-indigo-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-indigo-700 mb-4">
            Can&apos;t find what you&apos;re looking for? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Contact Support
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center px-4 py-2 border border-indigo-300 text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Compare Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
