import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Mail, Download } from 'lucide-react';

const FAQSection = ({ toolName = null, category = null, faqs = [] }) => {
  const [openItems, setOpenItems] = useState(new Set());

  // Generate FAQs based on tool or category
  const generateFAQs = () => {
    if (faqs && faqs.length > 0) {
      return faqs;
    }
    
    if (toolName) {
      return getToolSpecificFAQs(toolName);
    } else if (category) {
      return getCategoryFAQs(category);
    } else {
      return getGeneralFAQs();
    }
  };

  const getToolSpecificFAQs = (toolName) => {
    return [
      {
        question: `What is ${toolName} and what does it do?`,
        answer: `${toolName} is an AI-powered tool that helps with various tasks. It offers advanced features and capabilities to improve your workflow and productivity.`
      },
      {
        question: `How much does ${toolName} cost?`,
        answer: `${toolName} offers various pricing plans starting from free tiers to enterprise solutions. Check their official website for the most current pricing information.`
      },
      {
        question: `What are the main pros and cons of ${toolName}?`,
        answer: `${toolName} offers excellent features and capabilities, but like any tool, it has its limitations. Consider your specific needs when evaluating.`
      },
      {
        question: `Is ${toolName} suitable for my business?`,
        answer: `${toolName} is designed to help businesses of all sizes. It's particularly useful for teams looking to improve their workflow and productivity.`
      },
      {
        question: `Does ${toolName} integrate with other tools?`,
        answer: `Yes, ${toolName} offers various integrations with popular tools and platforms. Check their integration page for the complete list.`
      },
      {
        question: `How does ${toolName} compare to alternatives?`,
        answer: `${toolName} stands out for its unique features and capabilities, but alternatives might offer different strengths. Consider your specific needs when choosing.`
      }
    ];
  };

  const getCategoryFAQs = (category) => {
    return [
      {
        question: `What are the best ${category} AI tools in 2025?`,
        answer: `Top ${category} AI tools include several excellent options, each offering unique features for different use cases. Research and compare based on your specific needs.`
      },
      {
        question: `How much do ${category} AI tools typically cost?`,
        answer: `${category} AI tools typically range from free tiers to enterprise solutions. Most offer monthly and annual pricing options with discounts for longer commitments.`
      },
      {
        question: `What should I look for when choosing a ${category} AI tool?`,
        answer: `Consider factors like pricing, features, integrations, ease of use, and customer support. Also evaluate your specific use case and team size.`
      },
      {
        question: `Are there free ${category} AI tools available?`,
        answer: `Yes, many ${category} AI tools offer free trials or freemium plans. This allows you to test the tool before committing to a paid plan.`
      },
      {
        question: `How do I integrate ${category} AI tools with my existing workflow?`,
        answer: `Most ${category} AI tools offer integrations with popular platforms. Check each tool's integration capabilities before choosing.`
      },
      {
        question: `What's the ROI of using ${category} AI tools?`,
        answer: `ROI varies by use case, but ${category} AI tools typically save time, improve quality, and increase productivity. Calculate based on your team's needs and current inefficiencies.`
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
      "mainEntity": faqs.map((faq, index) => ({
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
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions
            {toolName && ` about ${toolName}`}
            {category && ` about ${category} AI Tools`}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <div className="pb-3 p-4">
                <button
                  className="w-full p-0 h-auto flex justify-between items-center hover:bg-transparent"
                  onClick={() => toggleItem(index)}
                >
                  <h3 className="text-left text-base font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  <span className="ml-4 flex-shrink-0">
                    {openItems.has(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </button>
              </div>
              
              {openItems.has(index) && (
                <div className="pt-0 p-4 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Need More Help?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Related Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="/ai-tools-guide" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Complete AI Tools Guide
                  </a>
                </li>
                <li>
                  <a href="/ai-tools-comparison" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    AI Tools Comparison
                  </a>
                </li>
                <li>
                  <a href="/ai-tools-pricing" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Pricing Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Get Expert Advice</h4>
              <p className="text-sm text-gray-600 mb-3">
                Still unsure which AI tool is right for you?
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                <Mail className="w-4 h-4 mr-2" />
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

