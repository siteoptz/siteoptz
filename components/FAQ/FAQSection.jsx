import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const FAQSection = ({ 
  faqs, 
  title = "Frequently Asked Questions",
  description,
  showStructuredData = true,
  maxVisible = null,
  className = ''
}) => {
  const [openItems, setOpenItems] = useState(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Determine which FAQs to display
  const displayedFaqs = showAll || !maxVisible ? faqs : faqs.slice(0, maxVisible);
  const hasMore = maxVisible && faqs.length > maxVisible;

  // Generate FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <>
      {showStructuredData && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
          />
        </Head>
      )}
      
      <div className={`space-y-6 ${className}`}>
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {displayedFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-colors"
                  aria-expanded={openItems.has(index)}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                          openItems.has(index) ? 'rotate-180' : ''
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
                    </div>
                  </div>
                </button>
                
                {openItems.has(index) && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 pb-4"
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="border-t border-gray-200 pt-4">
                      <div className="prose max-w-none text-gray-700">
                        {faq.answer.split('\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-3 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      
                      {/* Additional content if available */}
                      {faq.links && faq.links.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm font-medium text-gray-900 mb-2">Related Links:</p>
                          <div className="flex flex-wrap gap-2">
                            {faq.links.map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={link.url}
                                className="text-sm text-blue-600 hover:text-blue-800 underline"
                                target={link.external ? "_blank" : "_self"}
                                rel={link.external ? "noopener noreferrer" : ""}
                              >
                                {link.title}
                                {link.external && (
                                  <svg className="w-3 h-3 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                )}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Tags if available */}
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

                      {/* Helpful rating */}
                      {faq.showHelpful !== false && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Was this helpful?</span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  // You can implement helpful tracking here
                                  console.log(`FAQ ${index} marked as helpful`);
                                }}
                                className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                              >
                                👍 Yes
                              </button>
                              <button
                                onClick={() => {
                                  // You can implement not helpful tracking here
                                  console.log(`FAQ ${index} marked as not helpful`);
                                }}
                                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                              >
                                👎 No
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={toggleShowAll}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                {showAll ? `Show Less (${maxVisible} of ${faqs.length})` : `Show More (${faqs.length - maxVisible} more)`}
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our team is here to help you choose the right AI tool for your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/tools"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Browse AI Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQSection;