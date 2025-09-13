import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import FAQSection from '../../components/comparison/FAQSection';
import { generateComparisonSEO, generateComparisonSchema } from '../../utils/seoMetaGenerator';
import comparisonData from '../../data/comparison-schema.json';
import { trackComparisonView, trackFAQInteraction, trackEmailCapture, trackAffiliateClick, EnhancedUserJourney } from '../../utils/key-events-tracker';

interface ChatGPTvsJasperProps {
  chatgpt: any;
  jasper: any;
}

const ChatGPTvsJasperPage: React.FC<ChatGPTvsJasperProps> = ({ chatgpt, jasper }) => {
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [userJourney, setUserJourney] = useState<any>(null);

  useEffect(() => {
    // Initialize user journey tracking
    const journey = new EnhancedUserJourney();
    journey.addStep('comparison_viewed', {
      tool1: 'chatgpt',
      tool2: 'jasper-ai',
      page_section: 'hero'
    });
    setUserJourney(journey);

    // Track comparison view
    trackComparisonView('chatgpt', 'jasper-ai', 'organic', {
      page_title: 'ChatGPT vs Jasper AI Comparison',
      comparison_type: 'ai_writing_tools'
    });

    // Track scroll depth
    let scrollDepth = 0;
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      if (scrolled > 25 && scrollDepth < 25) {
        scrollDepth = 25;
        journey.addStep('scroll_milestone', { depth: '25%' });
      } else if (scrolled > 50 && scrollDepth < 50) {
        scrollDepth = 50;
        journey.addStep('scroll_milestone', { depth: '50%' });
      } else if (scrolled > 75 && scrollDepth < 75) {
        scrollDepth = 75;
        journey.addStep('scroll_milestone', { depth: '75%' });
      } else if (scrolled > 90 && scrollDepth < 90) {
        scrollDepth = 90;
        journey.addStep('scroll_milestone', { depth: '90%' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO Configuration
  const seoData = generateComparisonSEO(chatgpt, jasper);
  const comparisonSchema = generateComparisonSchema(chatgpt, jasper, null);

  // FAQ data specific to ChatGPT vs Jasper
  const faqs = [
    {
      question: "Which is better for content creation: ChatGPT or Jasper AI?",
      answer: "It depends on your needs. ChatGPT excels at conversational AI and general writing tasks with exceptional versatility at $20/month. Jasper AI specializes in marketing content with 50+ templates, brand voice consistency, and SEO optimization for $39/month. Choose ChatGPT for budget-conscious general use, Jasper for professional content marketing."
    },
    {
      question: "What's the main pricing difference between ChatGPT and Jasper AI?",
      answer: "ChatGPT Plus costs $20/month while Jasper AI Starter is $39/month. ChatGPT Team is $25/month per user, and Jasper Boss Mode is $99/month. ChatGPT offers better value for individual use, while Jasper provides more specialized marketing features for the higher price."
    },
    {
      question: "Does ChatGPT or Jasper AI have better SEO features?",
      answer: "Jasper AI has significantly better SEO features with built-in content optimization, SEO-focused templates, and Surfer SEO integration. ChatGPT has basic SEO capabilities but lacks specialized optimization tools. For content marketing and SEO, Jasper is the clear winner."
    },
    {
      question: "Which tool has better integrations: ChatGPT or Jasper AI?",
      answer: "Both tools offer good integrations. ChatGPT integrates with Microsoft products, various APIs, and browser extensions. Jasper integrates with WordPress, Shopify, HubSpot, Google Docs, and marketing tools. Jasper has better marketing-specific integrations, while ChatGPT has broader general integrations."
    },
    {
      question: "Can ChatGPT replace Jasper AI for business use?",
      answer: "For general business writing and AI assistance, ChatGPT can replace Jasper at a lower cost. However, for content marketing teams needing brand voice consistency, SEO optimization, and marketing-specific templates, Jasper AI provides specialized features that ChatGPT lacks. The choice depends on your specific business needs."
    },
    {
      question: "Which tool is easier to use for beginners?",
      answer: "ChatGPT is more intuitive for beginners with its simple chat interface and conversational approach. Jasper AI has a steeper learning curve due to its 50+ templates and specialized features, but offers guided workflows. New users often find ChatGPT more accessible initially."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'AI Tools', url: '/tools' },
    { name: 'Compare', url: '/compare' },
    { name: 'ChatGPT vs Jasper AI', url: '/compare/chatgpt-vs-jasper-ai' }
  ];

  // Email capture handler
  const handleEmailCapture = (email: string) => {
    // This would integrate with your email service
    console.log('Email captured:', email);
    setEmailCaptured(true);
    
    // Track email capture with enhanced tracking
    trackEmailCapture('comparison_page', 'chatgpt_vs_jasper' as any, 'ai_writing_tools', {
      email,
      comparison_context: 'chatgpt_vs_jasper',
      capture_location: 'comparison_cta'
    });

    // Update user journey
    if (userJourney) {
      userJourney.addStep('email_captured', {
        source: 'comparison_page',
        tool_context: 'chatgpt_vs_jasper'
      });
    }
    
    // Legacy tracking for compatibility
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'email_capture', {
        event_category: 'lead_generation',
        event_label: 'chatgpt_vs_jasper_comparison'
      });
    }
  };

  // FAQ interaction handler
  const handleFAQClick = (question: string) => {
    trackFAQInteraction(question, 'chatgpt_vs_jasper' as any, {
      comparison_context: true,
      faq_position: faqs.findIndex(f => f.question === question) + 1
    });

    if (userJourney) {
      userJourney.addStep('faq_interaction', {
        question: question.substring(0, 50),
        context: 'comparison_page'
      });
    }
  };

  // Affiliate link handler
  const handleAffiliateLinkClick = (toolName: string, linkType: string, position: string) => {
    trackAffiliateClick(toolName, linkType, `https://partner.${toolName}.com`, position, {
      comparison_context: 'chatgpt_vs_jasper',
      page_section: position
    });

    if (userJourney) {
      userJourney.addStep('cta_clicked', {
        tool: toolName,
        link_type: linkType,
        position
      });
      // Mark journey as potentially converted
      userJourney.complete(true, 25);
    }
  };

  return (
    <>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={typeof seoData.keywords === 'string' ? seoData.keywords.split(', ') : seoData.keywords}
        canonicalUrl={seoData.canonical}
        schemaData={comparisonSchema}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <nav className="flex justify-center mb-8" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className="inline-flex items-center">
                      {index > 0 && (
                        <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {index === breadcrumbs.length - 1 ? (
                        <span className="text-sm font-medium text-gray-500">{breadcrumb.name}</span>
                      ) : (
                        <Link href={breadcrumb.url} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                          {breadcrumb.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                ChatGPT vs Jasper AI
                <span className="block text-3xl lg:text-4xl text-blue-600 mt-2">
                  Complete Comparison [2025]
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Choosing between ChatGPT and Jasper AI? This comprehensive comparison breaks down everything you need to know in 2025. 
                Save hours of research with our detailed analysis of pricing, features, and real user experiences.
              </p>

              {/* Quick Answer */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-12 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Answer</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold text-lg">C</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Choose ChatGPT if:</h3>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Budget-conscious ($20/month vs $39/month)</li>
                      <li>• Need general AI assistance</li>
                      <li>• Want mobile app access</li>
                      <li>• Prefer conversational interface</li>
                      <li>• Individual or small team use</li>
                    </ul>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-lg">J</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Choose Jasper AI if:</h3>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Content marketing focus</li>
                      <li>• Need brand voice consistency</li>
                      <li>• Want SEO optimization features</li>
                      <li>• Use 50+ content templates</li>
                      <li>• Marketing team collaboration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-16 bg-white" id="comparison">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Comparison Table</h2>
              <p className="text-gray-600">Detailed comparison table coming soon.</p>
            </div>
          </div>
        </section>

        {/* Detailed Analysis Section */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Detailed Analysis</h2>
            
            {/* Feature Comparison */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Feature Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Feature</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">ChatGPT</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Jasper AI</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Winner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 font-medium">Content Types</td>
                      <td className="py-3 px-4 text-center">15+ formats</td>
                      <td className="py-3 px-4 text-center">50+ templates</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          Jasper AI
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Brand Voice</td>
                      <td className="py-3 px-4 text-center">Limited</td>
                      <td className="py-3 px-4 text-center">Advanced</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          Jasper AI
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">SEO Optimization</td>
                      <td className="py-3 px-4 text-center">Basic</td>
                      <td className="py-3 px-4 text-center">Advanced</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          Jasper AI
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Pricing</td>
                      <td className="py-3 px-4 text-center">$20/month</td>
                      <td className="py-3 px-4 text-center">$39/month</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          ChatGPT
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Mobile App</td>
                      <td className="py-3 px-4 text-center">Yes</td>
                      <td className="py-3 px-4 text-center">No</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          ChatGPT
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pricing Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pricing Analysis</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">ChatGPT Pricing</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>ChatGPT Plus:</strong> $20/month</li>
                    <li><strong>ChatGPT Team:</strong> $25/month per user</li>
                    <li><strong>ChatGPT Enterprise:</strong> Custom pricing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Jasper AI Pricing</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Jasper AI Starter:</strong> $39/month</li>
                    <li><strong>Jasper AI Boss Mode:</strong> $99/month</li>
                    <li><strong>Jasper AI Business:</strong> Custom pricing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Calculator */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Calculate Your Costs</h2>
              <p className="text-gray-600">Pricing calculator coming soon.</p>
            </div>
          </div>
        </section>

        {/* Email Capture Section */}
        <section className="py-16 bg-blue-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get the Complete AI Tools Guide</h2>
            <p className="text-xl text-gray-600 mb-8">
              Download our comprehensive PDF comparison of ChatGPT vs Jasper AI, including exclusive insights and decision framework.
            </p>
            
            {!emailCaptured ? (
              <form 
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as any).email.value;
                  handleEmailCapture(email);
                }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Download PDF
                </button>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-green-800">
                  ✅ Thank you! Check your email for the download link.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-900">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Choose?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Both tools offer free trials. Test them yourself to see which fits your needs better.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={jasper.overview?.website || 'https://jasper.ai'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click', {
                      event_category: 'affiliate',
                      event_label: 'jasper_ai_cta'
                    });
                  }
                }}
              >
                Try Jasper AI Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              <a
                href={chatgpt.overview?.website || 'https://chat.openai.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click', {
                      event_category: 'affiliate',
                      event_label: 'chatgpt_cta'
                    });
                  }
                }}
              >
                Get ChatGPT Plus
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <FAQSection faqs={faqs} />
          </div>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Load ChatGPT and Jasper AI data from comparison schema
  const chatgptData = comparisonData.aiToolsComparisonData.find(tool => 
    tool.tool_name.toLowerCase() === 'chatgpt'
  );
  
  const jasperData = comparisonData.aiToolsComparisonData.find(tool => 
    tool.tool_name.toLowerCase().includes('jasper')
  );

  if (!chatgptData || !jasperData) {
    return {
      notFound: true
    };
  }

  // Transform data to match expected structure
  const chatgpt = {
    ...chatgptData,
    name: chatgptData.tool_name,
    slug: 'chatgpt',
    overview: {
      category: 'AI Chatbot',
      website: 'https://chat.openai.com'
    }
  };

  const jasper = {
    ...jasperData,
    name: jasperData.tool_name,
    slug: 'jasper-ai',
    overview: {
      category: 'AI Content Generator',
      website: 'https://jasper.ai'
    }
  };

  return {
    props: {
      chatgpt,
      jasper
    },
    revalidate: 86400 // Revalidate every 24 hours
  };
};

export default ChatGPTvsJasperPage;