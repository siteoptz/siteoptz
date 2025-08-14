import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import Head from 'next/head';

interface FAQ {
  question: string;
  answer: string;
  schema?: {
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  };
}

interface FAQSectionProps {
  faqs: FAQ[];
  toolName?: string;
  showSearch?: boolean;
  maxInitialDisplay?: number;
}

export default function FAQSection({ 
  faqs, 
  toolName, 
  showSearch = true,
  maxInitialDisplay = 5 
}: FAQSectionProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const expandAll = () => {
    setExpandedItems(faqs.map((_, index) => index));
  };

  const collapseAll = () => {
    setExpandedItems([]);
  };

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery
    ? faqs.filter(
        faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  // Determine which FAQs to display
  const displayedFaqs = showAll ? filteredFaqs : filteredFaqs.slice(0, maxInitialDisplay);

  // Generate schema markup for all FAQs
  const generateFAQSchema = () => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
    return JSON.stringify(faqSchema);
  };

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateFAQSchema() }}
        />
      </Head>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="w-8 h-8" />
                <h2 className="text-2xl font-bold">
                  {toolName ? `${toolName} FAQs` : 'Frequently Asked Questions'}
                </h2>
              </div>
              <p className="text-indigo-100">
                Find answers to common questions {toolName && `about ${toolName}`}
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={expandAll}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Search Bar */}
          {showSearch && (
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-gray-600">
                  Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              )}
            </div>
          )}

          {/* Mobile Expand/Collapse Buttons */}
          <div className="flex md:hidden gap-2 mb-4">
            <button
              onClick={expandAll}
              className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              Collapse All
            </button>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {displayedFaqs.map((faq, index) => {
              const isExpanded = expandedItems.includes(index);
              
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    aria-expanded={isExpanded}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </button>
                  
                  <div
                    id={`faq-answer-${index}`}
                    className={`transition-all duration-200 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-4">
                      <div className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                      
                      {/* Related Questions (optional) */}
                      {index < 2 && isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            Related Questions:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {faqs
                              .filter((_, i) => i !== index)
                              .slice(0, 2)
                              .map((relatedFaq, relIdx) => (
                                <button
                                  key={relIdx}
                                  onClick={() => {
                                    const relatedIndex = faqs.findIndex(
                                      f => f.question === relatedFaq.question
                                    );
                                    toggleExpanded(relatedIndex);
                                    // Scroll to the related question
                                    const element = document.getElementById(`faq-answer-${relatedIndex}`);
                                    element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                  }}
                                  className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
                                >
                                  {relatedFaq.question.length > 40
                                    ? relatedFaq.question.substring(0, 40) + '...'
                                    : relatedFaq.question}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          {filteredFaqs.length > maxInitialDisplay && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                {showAll ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show More ({filteredFaqs.length - maxInitialDisplay} more) <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Empty State */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-600">No FAQs found</p>
              {searchQuery && (
                <p className="text-sm text-gray-500 mt-2">
                  Try searching with different keywords
                </p>
              )}
            </div>
          )}

          {/* FAQ Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div>
                <span className="font-semibold text-gray-900">{faqs.length}</span> Total FAQs
              </div>
              <div>
                <span className="font-semibold text-gray-900">{expandedItems.length}</span> Expanded
              </div>
              {searchQuery && (
                <div>
                  <span className="font-semibold text-gray-900">{filteredFaqs.length}</span> Matching
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}