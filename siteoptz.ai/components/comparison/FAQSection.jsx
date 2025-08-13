import { useState } from 'react';
import { generateComparisonFAQs } from '../../utils/dataHelpers';

/**
 * FAQ section component with schema markup
 * @param {Object} props - Component props
 * @returns {JSX.Element} FAQ section component
 */
export default function FAQSection({ 
  toolA, 
  toolB = null, 
  customFAQs = [], 
  className = '' 
}) {
  const [openIndexes, setOpenIndexes] = useState(new Set());

  // Generate FAQs if not provided
  const faqs = customFAQs.length > 0 
    ? customFAQs 
    : generateComparisonFAQs(toolA, toolB);

  // Add common AI tool FAQs
  const additionalFAQs = [
    {
      question: "How do I choose the right AI tool for my business?",
      answer: "Consider your primary use cases, team size, budget, and technical requirements. Start with free trials when available, and evaluate how well each tool integrates with your existing workflow."
    },
    {
      question: "Are there any hidden costs with AI tools?",
      answer: "While most AI tools are transparent about pricing, watch for usage overage charges, API rate limits, and additional costs for premium features, integrations, or enterprise support."
    },
    {
      question: "Can I switch between AI tools if I'm not satisfied?",
      answer: "Yes, most AI tools allow you to export your data and cancel subscriptions. However, consider any training time invested and integration setup when switching platforms."
    }
  ];

  const allFAQs = [...faqs, ...additionalFAQs];

  // Group FAQs by category
  const groupedFAQs = groupFAQsByCategory(allFAQs);

  const toggleFAQ = (index) => {
    const newOpenIndexes = new Set(openIndexes);
    if (newOpenIndexes.has(index)) {
      newOpenIndexes.delete(index);
    } else {
      newOpenIndexes.add(index);
    }
    setOpenIndexes(newOpenIndexes);
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {Object.entries(groupedFAQs).map(([category, categoryFAQs]) => (
        <div key={category} className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Category Header */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center">
              <div className="text-blue-600 mr-3">
                <CategoryIcon category={category} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {getCategoryTitle(category)}
              </h3>
              <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {categoryFAQs.length} questions
              </span>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="divide-y divide-gray-200">
            {categoryFAQs.map((faq, categoryIndex) => {
              const globalIndex = `${category}-${categoryIndex}`;
              const isOpen = openIndexes.has(globalIndex);
              
              return (
                <div key={globalIndex} className="px-6 py-4">
                  <button
                    onClick={() => toggleFAQ(globalIndex)}
                    className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${globalIndex}`}
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
                  
                  <div 
                    id={`faq-answer-${globalIndex}`}
                    className={`mt-4 transition-all duration-200 ease-in-out ${
                      isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                  >
                    <div className="text-gray-700 leading-relaxed pl-2">
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
            <div className="text-2xl font-bold text-blue-900">{allFAQs.length}</div>
            <div className="text-sm text-blue-700">Questions Answered</div>
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
          <a
            href="/contact"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Contact an Expert
          </a>
          <a
            href="/guide"
            className="bg-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Free Tool Selection Guide
          </a>
        </div>
      </div>
    </div>
  );
}

// Helper functions and components

function groupFAQsByCategory(faqs) {
  const groups = {
    comparison: [],
    pricing: [],
    features: [],
    general: []
  };

  faqs.forEach(faq => {
    const question = faq.question.toLowerCase();
    
    if (question.includes('vs') || question.includes('compare') || question.includes('difference') || question.includes('better')) {
      groups.comparison.push(faq);
    } else if (question.includes('price') || question.includes('cost') || question.includes('pricing') || question.includes('plan')) {
      groups.pricing.push(faq);
    } else if (question.includes('feature') || question.includes('capability') || question.includes('function')) {
      groups.features.push(faq);
    } else {
      groups.general.push(faq);
    }
  });

  // Remove empty categories
  return Object.fromEntries(
    Object.entries(groups).filter(([_, faqs]) => faqs.length > 0)
  );
}

function getCategoryTitle(category) {
  const titles = {
    comparison: 'Tool Comparisons',
    pricing: 'Pricing & Plans',
    features: 'Features & Capabilities',
    general: 'General Questions'
  };
  return titles[category] || 'Questions';
}

function CategoryIcon({ category }) {
  const iconProps = {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  };

  switch (category) {
    case 'comparison':
      return (
        <svg {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'pricing':
      return (
        <svg {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      );
    case 'features':
      return (
        <svg {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}