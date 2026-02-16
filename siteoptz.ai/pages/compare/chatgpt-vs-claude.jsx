import { useState } from 'react';
import Head from 'next/head';
import aiToolsData from '../../data/aiToolsData.json';
import SEOHead from '../../components/SEOHead';
import HeroSection from '../../components/comparison/HeroSection';
import ComparisonTable from '../../components/comparison/ComparisonTable';
import PricingCalculator from '../../components/comparison/PricingCalculator';
import FAQSection from '../../components/comparison/FAQSection';
import EmailCaptureForm from '../../components/comparison/EmailCaptureForm';
import { generateMetaTitle, generateMetaDescription } from '../../utils/seo';

/**
 * ChatGPT vs Claude comparison page
 * Detailed side-by-side comparison of OpenAI's ChatGPT and Anthropic's Claude
 */
export default function ChatGPTvsClaudePage({ chatgpt, claude }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(true);

  // Custom FAQs specific to ChatGPT vs Claude
  const customFAQs = [
    {
      question: "Which is better for creative writing: ChatGPT or Claude?",
      answer: "Both excel at creative writing, but with different strengths. ChatGPT tends to be more imaginative and can generate diverse creative content quickly. Claude often provides more nuanced, thoughtful creative pieces with better adherence to specific writing styles and constraints. For brainstorming and quick ideation, ChatGPT might have an edge. For refined, literary writing that requires careful attention to tone and style, Claude often performs better."
    },
    {
      question: "How do ChatGPT and Claude compare for coding assistance?",
      answer: "ChatGPT generally has stronger coding capabilities, especially for popular programming languages like Python, JavaScript, and web development frameworks. It can generate, debug, and explain code effectively. Claude is also capable at coding but tends to be more conservative and focuses on producing clean, well-documented code. ChatGPT might be better for rapid prototyping and exploring different coding approaches, while Claude excels at code review and explaining best practices."
    },
    {
      question: "Which AI has better reasoning and analytical capabilities?",
      answer: "Claude is generally considered to have superior reasoning and analytical capabilities. It excels at breaking down complex problems, providing step-by-step analysis, and maintaining logical consistency throughout long conversations. Claude is particularly strong at constitutional AI principles, making it better at avoiding harmful or biased responses. ChatGPT is highly capable but may sometimes provide responses that sound confident but lack deeper analytical rigor."
    },
    {
      question: "What are the main differences in their conversation styles?",
      answer: "ChatGPT tends to be more conversational and engaging, often providing responses that feel more human-like and natural. It's generally more willing to engage with creative or hypothetical scenarios. Claude is more measured and careful in its responses, often acknowledging uncertainty and providing more balanced viewpoints. Claude tends to be more transparent about its limitations and is generally more cautious about providing advice on sensitive topics."
    },
    {
      question: "How do their pricing models compare for business use?",
      answer: "ChatGPT offers a free tier with GPT-3.5 and paid plans starting at $20/month for GPT-4 access. For businesses, ChatGPT Plus and Enterprise plans provide additional features and higher usage limits. Claude's pricing varies by model tier, with Claude Instant being more cost-effective for high-volume use cases and Claude 2 being more expensive but offering superior performance. For API usage, both charge per token, with pricing depending on the specific model version used."
    },
    {
      question: "Which is better for research and fact-checking?",
      answer: "Claude generally performs better for research and fact-checking tasks. It's more likely to acknowledge when it doesn't know something and is better at citing limitations in its knowledge. Claude also tends to provide more balanced perspectives on controversial topics. However, neither AI has real-time internet access in their base versions, so both should be used cautiously for current events or recent information. Always verify important facts through authoritative sources."
    }
  ];

  const handleGetReport = () => {
    setShowEmailForm(true);
  };

  if (!chatgpt || !claude) {
    return <div>Loading comparison...</div>;
  }

  return (
    <>
      <SEOHead
        title={generateMetaTitle('ChatGPT', 'Claude')}
        description={generateMetaDescription('ChatGPT', 'Claude', {
          features: ['Natural language processing', 'Code generation', 'Creative writing'],
          context: 'detailed comparison of features, pricing, and capabilities'
        })}
        keywords="ChatGPT vs Claude, OpenAI vs Anthropic, AI assistant comparison, ChatGPT Claude comparison, best AI chatbot, AI tool comparison 2024"
        canonical="https://siteoptz.ai/compare/chatgpt-vs-claude"
        schemas={{
          comparison: {
            "@type": "ComparisonTable",
            "name": "ChatGPT vs Claude Comparison",
            "description": "Detailed comparison of ChatGPT and Claude AI assistants including features, pricing, and capabilities",
            "items": [
              {
                "@type": "Product",
                "name": chatgpt.name,
                "brand": chatgpt.vendor,
                "offers": {
                  "@type": "Offer",
                  "price": chatgpt.pricing.startingPrice || 0,
                  "priceCurrency": "USD"
                }
              },
              {
                "@type": "Product", 
                "name": claude.name,
                "brand": claude.vendor,
                "offers": {
                  "@type": "Offer",
                  "price": claude.pricing.startingPrice || 0,
                  "priceCurrency": "USD"
                }
              }
            ]
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://siteoptz.ai"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "AI Tool Comparison",
                "item": "https://siteoptz.ai/compare"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "ChatGPT vs Claude",
                "item": "https://siteoptz.ai/compare/chatgpt-vs-claude"
              }
            ]
          }
        }}
      />

      <div className="min-h-screen" style={{ backgroundColor: 'var(--surface-base)' }}>
        {/* Hero Section */}
        <HeroSection
          toolA={chatgpt}
          toolB={claude}
          onGetReport={handleGetReport}
        />

        {/* Quick Summary */}
        <div className="section-technical" style={{ backgroundColor: 'var(--surface-raised)' }}>
          <div className="container-technical">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-primary mb-6 tracking-tight uppercase">
                CHATGPT VS CLAUDE: COMPREHENSIVE ANALYSIS
              </h2>
              <p className="text-lg text-secondary max-w-4xl mx-auto font-mono tracking-wide">
                OPENAI_CHATGPT // ANTHROPIC_CLAUDE // TECHNICAL_COMPARISON // OPTIMAL_SELECTION_MATRIX
              </p>
            </div>

            {/* Key Differences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Creative Writing</h3>
                <p className="text-sm text-gray-600">
                  <strong>ChatGPT:</strong> More imaginative<br/>
                  <strong>Claude:</strong> More refined style
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coding</h3>
                <p className="text-sm text-gray-600">
                  <strong>ChatGPT:</strong> Stronger overall<br/>
                  <strong>Claude:</strong> Better documentation
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reasoning</h3>
                <p className="text-sm text-gray-600">
                  <strong>ChatGPT:</strong> Fast responses<br/>
                  <strong>Claude:</strong> Deeper analysis
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
                <p className="text-sm text-gray-600">
                  <strong>ChatGPT:</strong> $20/month Plus<br/>
                  <strong>Claude:</strong> Variable API pricing
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Feature-by-Feature Comparison
              </h2>
              <p className="text-lg text-gray-600">
                Detailed breakdown of capabilities, features, and specifications
              </p>
              
              {/* Toggle for showing all features */}
              <div className="mt-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={showAllFeatures}
                    onChange={(e) => setShowAllFeatures(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-sm text-gray-700">Show all features (including similarities)</span>
                </label>
              </div>
            </div>

            <ComparisonTable
              toolA={chatgpt}
              toolB={claude}
              showAllFeatures={showAllFeatures}
            />
          </div>
        </div>

        {/* Pricing Calculator */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Cost Comparison Calculator
              </h2>
              <p className="text-lg text-gray-600">
                Calculate and compare costs based on your team size and usage requirements
              </p>
            </div>

            <PricingCalculator
              toolA={chatgpt}
              toolB={claude}
              showComparison={true}
            />
          </div>
        </div>

        {/* Winner Summary */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Which Should You Choose?
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Choose ChatGPT */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg p-2 mr-4">
                    <img 
                      src={chatgpt.logo} 
                      alt="ChatGPT"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Choose ChatGPT if:</h3>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">You need strong coding and programming assistance</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">You want creative brainstorming and ideation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">You prefer a more conversational, engaging style</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">You want access to plugins and browse capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">You want a simple monthly subscription model</span>
                  </li>
                </ul>
              </div>

              {/* Choose Claude */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg p-2 mr-4">
                    <img 
                      src={claude.logo} 
                      alt="Claude"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Choose Claude if:</h3>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">You need superior reasoning and analytical capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">You want more thoughtful, nuanced responses</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">You prioritize safety and constitutional AI principles</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">You need better handling of longer conversations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">You want more transparent AI that acknowledges limitations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about ChatGPT vs Claude comparison
              </p>
            </div>

            <FAQSection
              toolA={chatgpt}
              toolB={claude}
              customFAQs={customFAQs}
            />
          </div>
        </div>

        {/* Email Capture Modal */}
        <EmailCaptureForm
          isOpen={showEmailForm}
          onClose={() => setShowEmailForm(false)}
          tools={[chatgpt, claude]}
          title="Get Your ChatGPT vs Claude Analysis Report"
          description="We'll create a detailed comparison report with pricing recommendations, feature analysis, and implementation guidance."
        />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const chatgpt = aiToolsData.tools.find(tool => tool.id === 'chatgpt');
  const claude = aiToolsData.tools.find(tool => tool.id === 'claude');

  if (!chatgpt || !claude) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      chatgpt,
      claude
    }
  };
}