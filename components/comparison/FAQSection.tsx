import { useState } from 'react';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggleFAQ = (index: number) => {
    const newOpenIndexes = new Set(openIndexes);
    if (newOpenIndexes.has(index)) {
      newOpenIndexes.delete(index);
    } else {
      newOpenIndexes.add(index);
    }
    setOpenIndexes(newOpenIndexes);
  };

  // Group FAQs by relevance (simple keyword matching)
  const groupedFAQs = faqs.reduce((groups, faq, index) => {
    const question = faq.question.toLowerCase();
    let category = 'general';
    
    if (question.includes('pricing') || question.includes('cost') || question.includes('price')) {
      category = 'pricing';
    } else if (question.includes('features') || question.includes('capabilities')) {
      category = 'features';
    } else if (question.includes('vs') || question.includes('compare') || question.includes('better')) {
      category = 'comparison';
    } else if (question.includes('use') || question.includes('business') || question.includes('team')) {
      category = 'usage';
    }
    
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push({ ...faq, originalIndex: index });
    
    return groups;
  }, {} as Record<string, Array<FAQ & { originalIndex: number }>>);

  const categoryTitles = {
    comparison: 'Tool Comparisons',
    pricing: 'Pricing & Plans',
    features: 'Features & Capabilities',
    usage: 'Usage & Implementation',
    general: 'General Questions'
  };

  const categoryIcons = {
    comparison: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    pricing: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    features: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    usage: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    general: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  if (faqs.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs Available</h3>
        <p className="text-gray-600">Check back later for frequently asked questions about these tools.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedFAQs).map(([category, categoryFAQs]) => (
        <div key={category} className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Category Header */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center">
              <div className="text-blue-600 mr-3">
                {categoryIcons[category as keyof typeof categoryIcons]}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {categoryTitles[category as keyof typeof categoryTitles]}
              </h3>
              <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {categoryFAQs.length} questions
              </span>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="divide-y divide-gray-200">
            {categoryFAQs.map((faq, categoryIndex) => {
              const globalIndex = faq.originalIndex;
              const isOpen = openIndexes.has(globalIndex);
              
              return (
                <div key={globalIndex} className="px-6 py-4">
                  <button
                    onClick={() => toggleFAQ(globalIndex)}
                    className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-900 pr-4">
                        {faq.question}
                      </h4>
                      <div className={`flex-shrink-0 transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}>
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                  
                  <div className={`mt-4 transition-all duration-200 ease-in-out ${
                    isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}>
                    <div className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* FAQ Summary Stats */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-900">{faqs.length}</div>
            <div className="text-sm text-blue-700">Total Questions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-900">{Object.keys(groupedFAQs).length}</div>
            <div className="text-sm text-blue-700">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-900">{openIndexes.size}</div>
            <div className="text-sm text-blue-700">Currently Open</div>
          </div>
        </div>
      </div>

      {/* Additional Help */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Still Have Questions?</h3>
        <p className="text-blue-100 mb-4">
          Our AI tool experts are here to help you make the right choice for your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Contact an Expert
          </Link>
          <Link
            href="/compare"
            className="bg-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Free Tool Selection Guide
          </Link>
        </div>
      </div>
    </div>
  );
}