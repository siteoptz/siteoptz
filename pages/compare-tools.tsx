import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import toolsData from '../data/tools.json';
import EnhancedComparisonTable from '../components/comparison/EnhancedComparisonTable';

interface Tool {
  tool_name: string;
  vendor: string;
  logo_url: string;
  description: string;
  features: {
    core: string[];
    advanced: string[];
    integrations: string[];
  };
  pros: string[];
  cons: string[];
  pricing: {
    monthly: number;
    yearly: number;
    enterprise: string;
    plans: {
      plan_name: string;
      price: string;
      features_included: string[];
    }[];
  };
  official_url: string;
  affiliate_link: string;
  rating: number;
  review_count: number;
  best_use_cases: string[];
  target_audience: string[];
  free_trial: boolean;
  demo_available: boolean;
  faq: {
    question: string;
    answer: string;
  }[];
}

interface CompareToolsPageProps {
  tools: Tool[];
}

export default function CompareToolsPage({ tools }: CompareToolsPageProps) {
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [selectedToolsForComparison, setSelectedToolsForComparison] = useState<Tool[]>([]);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle comparison request
  const handleRequestComparison = (selectedTools: Tool[]) => {
    setSelectedToolsForComparison(selectedTools);
    setShowEmailCapture(true);
    
    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'comparison_request', {
        event_category: 'Engagement',
        event_label: selectedTools.map(t => t.tool_name).join(' vs '),
        value: selectedTools.length
      });
    }
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Track email capture
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_capture', {
          event_category: 'Lead Generation',
          event_label: 'Full Comparison Request',
          value: 1
        });
      }

      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Email submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close email capture modal
  const closeEmailCapture = () => {
    setShowEmailCapture(false);
    setIsSubmitted(false);
    setEmail('');
  };

  return (
    <>
      <Head>
        <title>Compare AI Tools - Interactive Comparison Table | SiteOptz</title>
        <meta 
          name="description" 
          content="Compare AI tools side-by-side with advanced filtering by price, features, ratings, and use cases. Select 2-3 tools for detailed comparison." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://siteoptz.com/compare-tools" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Compare AI Tools - Interactive Comparison Table" />
        <meta property="og:description" content="Compare AI tools side-by-side with advanced filtering by price, features, ratings, and use cases." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siteoptz.com/compare-tools" />
        
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "AI Tools Comparison Table",
              "description": "Interactive comparison table for AI tools with advanced filtering capabilities",
              "url": "https://siteoptz.com/compare-tools",
              "mainEntity": {
                "@type": "ItemList",
                "name": "AI Tools",
                "numberOfItems": tools.length,
                "itemListElement": tools.map((tool, index) => ({
                  "@type": "SoftwareApplication",
                  "position": index + 1,
                  "name": tool.tool_name,
                  "description": tool.description,
                  "url": tool.official_url,
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": tool.rating,
                    "reviewCount": tool.review_count
                  }
                }))
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                AI Tools Comparison Table
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Compare AI tools side-by-side with advanced filtering. Select multiple tools to request a detailed comparison report.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 text-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{tools.length}</div>
                  <div className="text-sm">AI Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">6</div>
                  <div className="text-sm">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm">Free to Compare</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EnhancedComparisonTable 
            allTools={tools} 
            onRequestComparison={handleRequestComparison}
          />
        </main>

        {/* Email Capture Modal */}
        {showEmailCapture && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5-1.891m0 0V15a2 2 0 012-2h6a2 2 0 012 2v3.309z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Get Your Custom Comparison Report
                    </h3>
                    <p className="text-gray-600">
                      We'll create a detailed comparison of your selected tools and send it to your email.
                    </p>
                  </div>

                  {/* Selected Tools Summary */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Selected Tools:</h4>
                    <div className="space-y-2">
                      {selectedToolsForComparison.map(tool => (
                        <div key={tool.tool_name} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-white rounded-lg p-2 mr-3">
                            <img 
                              src={tool.logo_url} 
                              alt={tool.tool_name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{tool.tool_name}</div>
                            <div className="text-sm text-gray-500">{tool.vendor}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email to receive the comparison"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={closeEmailCapture}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Get Comparison'}
                      </button>
                    </div>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    We'll send you a detailed PDF comparison and occasional updates about AI tools. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Comparison Report Requested!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We'll create your custom comparison report and send it to your email within 24 hours.
                    </p>
                    
                    <button
                      onClick={closeEmailCapture}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                      Continue Exploring
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      tools: toolsData.ai_tools
    }
  };
};