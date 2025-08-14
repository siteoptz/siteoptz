import React, { useState } from 'react';
import Link from 'next/link';
import aiToolsData from '../aiToolsData.json';

const FAQSection = ({ toolName = null, category = null }) => {
  const [openItems, setOpenItems] = useState(new Set());

  // Generate FAQs based on tool or category
  const generateFAQs = () => {
    if (toolName) {
      return getToolSpecificFAQs(toolName);
    } else if (category) {
      return getCategoryFAQs(category);
    } else {
      return getGeneralFAQs();
    }
  };

  const getToolSpecificFAQs = (toolName) => {
    const tool = aiToolsData.find(t => t.tool_name === toolName);
    if (!tool) return getGeneralFAQs();

    return [
      {
        question: `What is ${toolName} and what does it do?`,
        answer: `${toolName} is an AI-powered tool by ${tool.vendor} that specializes in ${tool.category.toLowerCase()}. It offers features like ${tool.features.core.slice(0, 3).join(', ')}, making it ideal for ${tool.use_cases.slice(0, 2).join(' and ')}.`
      },
      {
        question: `How much does ${toolName} cost?`,
        answer: `${toolName} pricing starts at $${tool.pricing.monthly}/month or $${tool.pricing.yearly}/year. ${tool.free_trial ? 'They offer a free trial to get started.' : 'Contact them for enterprise pricing.'}`
      },
      {
        question: `What are the main pros and cons of ${toolName}?`,
        answer: `Key advantages include ${tool.pros.slice(0, 3).join(', ')}. However, some limitations include ${tool.cons.slice(0, 2).join(' and ')}.`
      },
      {
        question: `Is ${toolName} suitable for my business?`,
        answer: `${toolName} is best suited for ${tool.use_cases.slice(0, 3).join(', ')}. If you're looking for ${tool.category.toLowerCase()} solutions, it's worth considering.`
      },
      {
        question: `Does ${toolName} integrate with other tools?`,
        answer: `Yes, ${toolName} integrates with ${tool.features.integrations.slice(0, 4).join(', ')} and offers API access for custom integrations.`
      },
      {
        question: `How does ${toolName} compare to alternatives?`,
        answer: `${toolName} stands out for its ${tool.pros.slice(0, 2).join(' and ')}, but alternatives might offer ${tool.cons.slice(0, 2).join(' or ')}. Consider your specific needs when choosing.`
      }
    ];
  };

  const getCategoryFAQs = (category) => {
    const categoryTools = aiToolsData.filter(t => t.category === category);
    const avgPrice = categoryTools.reduce((sum, t) => sum + t.pricing.monthly, 0) / categoryTools.length;

    return [
      {
        question: `What are the best ${category} AI tools in 2025?`,
        answer: `Top ${category} AI tools include ${categoryTools.slice(0, 3).map(t => t.tool_name).join(', ')}, and ${categoryTools.slice(3, 5).map(t => t.tool_name).join(' and ')}. Each offers unique features for different use cases.`
      },
      {
        question: `How much do ${category} AI tools typically cost?`,
        answer: `${category} AI tools typically range from $${Math.min(...categoryTools.map(t => t.pricing.monthly))} to $${Math.max(...categoryTools.map(t => t.pricing.monthly))} per month, with an average of $${avgPrice.toFixed(0)}/month.`
      },
      {
        question: `What should I look for when choosing a ${category} AI tool?`,
        answer: `Consider factors like pricing, features (${categoryTools[0]?.features.core.slice(0, 3).join(', ')}), integrations, ease of use, and customer support. Also evaluate your specific use case and team size.`
      },
      {
        question: `Are there free ${category} AI tools available?`,
        answer: `Yes, many ${category} AI tools offer free trials or freemium plans. ${categoryTools.filter(t => t.free_trial).slice(0, 3).map(t => t.tool_name).join(', ')} all offer free trials to get started.`
      },
      {
        question: `How do I integrate ${category} AI tools with my existing workflow?`,
        answer: `Most ${category} AI tools offer integrations with popular platforms like ${categoryTools[0]?.features.integrations.slice(0, 4).join(', ')}. Check each tool's integration capabilities before choosing.`
      },
      {
        question: `What's the ROI of using ${category} AI tools?`,
        answer: `ROI varies by use case, but ${category} AI tools typically save 5-20 hours per week, improve quality by 30-50%, and can increase productivity by 25-40%. Calculate based on your team's hourly rate and current inefficiencies.`
      }
    ];
  };

  const getGeneralFAQs = () => {
    return [
      {
        question: "What are AI tools and how do they work?",
        answer: "AI tools are software applications that use artificial intelligence and machine learning to automate tasks, generate content, analyze data, or provide insights. They work by processing large amounts of data to learn patterns and make predictions or generate outputs based on user inputs."
      },
      {
        question: "How do I choose the right AI tool for my business?",
        answer: "Start by identifying your specific needs and use cases. Consider factors like pricing, features, integrations, ease of use, customer support, and scalability. Read reviews, try free trials, and compare multiple options before making a decision."
      },
      {
        question: "Are AI tools expensive?",
        answer: "AI tool pricing varies widely, from free tiers to enterprise solutions costing thousands per month. Most tools offer tiered pricing based on usage, features, and team size. Many provide free trials to test before committing."
      },
      {
        question: "Do I need technical skills to use AI tools?",
        answer: "Most modern AI tools are designed to be user-friendly and don't require technical skills. They typically offer intuitive interfaces, templates, and guided workflows. However, some advanced features may require basic technical knowledge."
      },
      {
        question: "How do AI tools integrate with existing software?",
        answer: "Most AI tools offer integrations through APIs, webhooks, or direct connections to popular platforms like WordPress, Shopify, HubSpot, Zapier, and more. Check each tool's integration capabilities to ensure compatibility with your existing workflow."
      },
      {
        question: "What's the ROI of implementing AI tools?",
        answer: "ROI varies by use case, but AI tools typically save 5-20 hours per week, improve output quality by 30-50%, and can increase productivity by 25-40%. Calculate ROI based on your team's hourly rate, current inefficiencies, and expected improvements."
      },
      {
        question: "Are AI tools secure and safe to use?",
        answer: "Reputable AI tools implement enterprise-grade security measures including data encryption, secure APIs, and compliance with regulations like GDPR. Always review each tool's security policies and data handling practices before use."
      },
      {
        question: "How often do AI tools update their features?",
        answer: "AI tools typically update monthly or quarterly with new features, improvements, and bug fixes. Major updates may include new AI models, enhanced integrations, or expanded capabilities. Most tools provide update notifications and documentation."
      }
    ];
  };

  const faqs = generateFAQs();

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  // Generate JSON-LD schema
  const generateJSONLD = () => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJSONLD())
        }}
      />

      {/* FAQ Component */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
          {toolName && ` about ${toolName}`}
          {category && ` about ${category} AI Tools`}
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.has(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openItems.has(index) ? (
                    <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 4a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 0110 4z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
              </button>
              
              {openItems.has(index) && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Need More Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Related Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/ai-tools-guide" className="text-blue-600 hover:text-blue-800">
                    Complete AI Tools Guide
                  </Link>
                </li>
                <li>
                  <Link href="/ai-tools-comparison" className="text-blue-600 hover:text-blue-800">
                    AI Tools Comparison
                  </Link>
                </li>
                <li>
                  <Link href="/ai-tools-pricing" className="text-blue-600 hover:text-blue-800">
                    Pricing Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Get Expert Advice</h4>
              <p className="text-sm text-gray-600 mb-3">
                Still unsure which AI tool is right for you?
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQSection;

