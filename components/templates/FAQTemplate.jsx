import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const FAQTemplate = ({ 
  faqs, 
  title, 
  description, 
  seoData, 
  categories 
}) => {
  const [openItems, setOpenItems] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  // Filter FAQs based on category and search term
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Generate FAQ structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredFaqs.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Get category counts
  const getCategoryCount = (category) => {
    if (category === 'all') return faqs.length;
    return faqs.filter(faq => faq.category === category).length;
  };

  return (
    <>
      <Head>
        <title>{seoData?.title || `${title} - Frequently Asked Questions`}</title>
        <meta name="description" content={seoData?.description || description} />
        <meta name="keywords" content={seoData?.keywords?.join(', ') || 'FAQ, questions, answers, help'} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData?.title || `${title} - FAQ`} />
        <meta property="og:description" content={seoData?.description || description} />
        <meta property="og:type" content="article" />
        
        {/* FAQ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              {title || 'Frequently Asked Questions'}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {description || 'Find answers to the most common questions about AI tools and how to choose the right one for your needs.'}
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({getCategoryCount('all')})
                </button>
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label} ({getCategoryCount(category.key)})
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.816-6.207-2.18C5.075 12.1 4.56 11.296 4.16 10.355m2.48 5.817A7.963 7.963 0 0012 21c2.34 0 4.5-.816 6.207-2.18" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs Found</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `No FAQs match your search "${searchTerm}". Try different keywords.`
                    : 'No FAQs available in this category.'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-4 text-left focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          <svg
                            className={`w-5 h-5 text-gray-500 transform transition-transform ${
                              openItems.has(index) ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>
                    
                    {openItems.has(index) && (
                      <div className="px-6 pb-4">
                        <div className="border-t border-gray-200 pt-4">
                          <div className="prose max-w-none text-gray-700">
                            {faq.answer.split('\n').map((paragraph, pIndex) => (
                              <p key={pIndex} className="mb-3 last:mb-0">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                          
                          {/* Related Links */}
                          {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-sm font-medium text-gray-900 mb-2">Related:</p>
                              <div className="flex flex-wrap gap-2">
                                {faq.relatedLinks.map((link, linkIndex) => (
                                  <a
                                    key={linkIndex}
                                    href={link.url}
                                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                                  >
                                    {link.title}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Tags */}
                          {faq.tags && faq.tags.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex flex-wrap gap-2">
                                {faq.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can&apos;t find what you&apos;re looking for? Our team is here to help you choose the right AI tool for your needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Contact Support
                </Link>
                <Link
                  href="/tools"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Browse AI Tools
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Questions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Most Popular Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.slice(0, 6).map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {faq.answer.length > 120 
                      ? `${faq.answer.substring(0, 120)}...` 
                      : faq.answer
                    }
                  </p>
                  <button
                    onClick={() => toggleItem(index)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                  >
                    Read more →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated on AI Tools
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest AI tool reviews, comparisons, and industry insights delivered to your inbox.
            </p>
            
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-gray-400 text-sm mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQTemplate;