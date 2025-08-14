import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import toolData from '../../data/tool_data.json';
import faqData from '../../data/faq_data.json';

interface ToolInfo {
  slug: string;
  name: string;
  description: string;
  meta: {
    title: string;
    description: string;
  };
  schema: any;
  features: string[];
  pros: string[];
  cons: string[];
  pricing: Array<{
    plan: string;
    price: string;
    details: string;
  }>;
  benchmarks: {
    speed_score: number;
    accuracy_score: number;
    cost_efficiency: number;
    content_quality?: number;
    ease_of_use?: number;
    value_for_money?: number;
    seo_features?: number;
    team_collaboration?: number;
    customer_support?: number;
  };
  related_tools: string[];
  website_url?: string;
  logo?: string;
  category?: string;
  developer?: string;
  founded_year?: string;
  api_available?: boolean;
  integrations?: string[];
  use_cases?: Array<{
    title: string;
    description: string;
    ideal_for: string;
  }>;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function ToolPage() {
  const router = useRouter();
  const { tool } = router.query;
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  
  if (!tool || typeof tool !== 'string') return null;
  
  const toolInfo = toolData.find((t: ToolInfo) => t.slug === tool);
  const toolFaqs = faqData.find((f: any) => f.tool_slug === tool)?.faq || [];
  
  if (!toolInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool not found</h1>
          <p className="text-gray-600 mb-6">The tool you're looking for doesn't exist.</p>
          <a 
            href="/tools" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse All Tools
          </a>
        </div>
      </div>
    );
  }

  // Calculate average rating
  const calculateAverageRating = () => {
    const { benchmarks } = toolInfo;
    const ratingFields = ['content_quality', 'ease_of_use', 'value_for_money'];
    let total = 0;
    let count = 0;
    
    ratingFields.forEach(field => {
      if (benchmarks[field as keyof typeof benchmarks] && typeof benchmarks[field as keyof typeof benchmarks] === 'number') {
        total += benchmarks[field as keyof typeof benchmarks] as number;
        count++;
      }
    });
    
    // Fallback to original fields if new ones don't exist
    if (count === 0) {
      const fallbackFields = ['speed_score', 'accuracy_score', 'cost_efficiency'];
      fallbackFields.forEach(field => {
        if (benchmarks[field as keyof typeof benchmarks]) {
          total += benchmarks[field as keyof typeof benchmarks] as number;
          count++;
        }
      });
    }
    
    return count > 0 ? total / count : 0;
  };

  const averageRating = calculateAverageRating();

  // Handle email subscription
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'tool_page', tool: toolInfo.name })
      });
      
      if (response.ok) {
        setEmailSubmitted(true);
        (e.target as HTMLFormElement).reset();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  // Toggle FAQ
  const toggleFAQ = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const content = button.nextElementSibling as HTMLElement;
    const icon = button.querySelector('svg') as SVGElement;
    
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
  };

  return (
    <>
      <Head>
        <title>{toolInfo.meta.title}</title>
        <meta name="description" content={toolInfo.meta.description} />
        <meta name="keywords" content={`${toolInfo.name}, AI tool, review, pricing, features, alternatives`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={toolInfo.meta.title} />
        <meta property="og:description" content={toolInfo.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://siteoptz.ai/tools/${tool}`} />
        <meta property="og:image" content={`https://siteoptz.ai/images/tools/${tool}.jpg`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={toolInfo.meta.title} />
        <meta name="twitter:description" content={toolInfo.meta.description} />
        <meta name="twitter:image" content={`https://siteoptz.ai/images/tools/${tool}.jpg`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://siteoptz.ai/tools/${tool}`} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...toolInfo.schema,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: averageRating.toFixed(1),
                reviewCount: "150"
              }
            })
          }}
        />
      </Head>
      
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">SiteOptz.ai</h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-500 hover:text-gray-900">Home</a>
                <a href="/tools" className="text-gray-500 hover:text-gray-900">Tools</a>
                <a href="/comparisons" className="text-gray-500 hover:text-gray-900">Comparisons</a>
                <a href="/about" className="text-gray-500 hover:text-gray-900">About</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tool Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                {toolInfo.logo ? (
                  <img 
                    src={toolInfo.logo} 
                    alt={`${toolInfo.name} logo`} 
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-white text-2xl font-bold">{toolInfo.name.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{toolInfo.name}</h1>
                <p className="text-xl text-gray-600 mb-4">{toolInfo.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {toolInfo.category || toolInfo.schema?.applicationCategory || 'AI Tool'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-600">{averageRating.toFixed(1)}/5</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <a 
                  href="#pricing" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Section */}
              <section className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{toolInfo.description}</p>
                
                {/* Additional Info */}
                {(toolInfo.developer || toolInfo.founded_year || toolInfo.api_available !== undefined) && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {toolInfo.developer && (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Developer</div>
                        <div className="font-medium">{toolInfo.developer}</div>
                      </div>
                    )}
                    {toolInfo.founded_year && (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Founded</div>
                        <div className="font-medium">{toolInfo.founded_year}</div>
                      </div>
                    )}
                    {toolInfo.api_available !== undefined && (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">API Available</div>
                        <div className="font-medium">{toolInfo.api_available ? 'Yes' : 'No'}</div>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* Features Section */}
              <section className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {toolInfo.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pros & Cons Section */}
              <section className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pros & Cons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Pros */}
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-4">Pros</h3>
                    <ul className="space-y-3">
                      {toolInfo.pros.map((pro, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Cons */}
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-4">Cons</h3>
                    <ul className="space-y-3">
                      {toolInfo.cons.map((con, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Performance Benchmarks */}
              {Object.keys(toolInfo.benchmarks).length > 0 && (
                <section className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Benchmarks</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {Object.entries(toolInfo.benchmarks).map(([key, value]) => {
                      const labels: { [key: string]: { label: string; color: string } } = {
                        content_quality: { label: 'Content Quality', color: 'text-blue-600' },
                        ease_of_use: { label: 'Ease of Use', color: 'text-green-600' },
                        seo_features: { label: 'SEO Features', color: 'text-purple-600' },
                        team_collaboration: { label: 'Team Collaboration', color: 'text-orange-600' },
                        value_for_money: { label: 'Value for Money', color: 'text-red-600' },
                        customer_support: { label: 'Customer Support', color: 'text-indigo-600' },
                        speed_score: { label: 'Speed Score', color: 'text-cyan-600' },
                        accuracy_score: { label: 'Accuracy Score', color: 'text-emerald-600' },
                        cost_efficiency: { label: 'Cost Efficiency', color: 'text-amber-600' }
                      };
                      
                      const benchmark = labels[key];
                      if (!benchmark || typeof value !== 'number') return null;
                      
                      return (
                        <div key={key} className="text-center">
                          <div className={`text-3xl font-bold mb-2 ${benchmark.color}`}>
                            {value}/10
                          </div>
                          <div className="text-sm text-gray-600">{benchmark.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Use Cases */}
              {toolInfo.use_cases && toolInfo.use_cases.length > 0 && (
                <section className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Use Cases</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {toolInfo.use_cases.map((useCase, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                        <p className="text-gray-600 mb-3">{useCase.description}</p>
                        <div className="text-sm text-blue-600 font-medium">
                          Ideal for: {useCase.ideal_for}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQ Section */}
              {toolFaqs.length > 0 && (
                <section className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {toolFaqs.map((faq: FAQ, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg">
                        <button 
                          className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                          onClick={toggleFAQ}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                            <svg className="w-5 h-5 text-gray-500 transform transition-transform" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </button>
                        <div className="px-6 pb-4 hidden">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Pricing Section */}
              <section id="pricing" className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Plans</h2>
                <div className="space-y-4">
                  {toolInfo.pricing.map((plan, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{plan.plan}</h3>
                      <p className="text-xl font-bold text-blue-600 mb-2">{plan.price}</p>
                      <p className="text-sm text-gray-600">{plan.details}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  {toolInfo.website_url && (
                    <a 
                      href={toolInfo.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Get Started
                    </a>
                  )}
                </div>
              </section>

              {/* Integrations */}
              {toolInfo.integrations && toolInfo.integrations.length > 0 && (
                <section className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Integrations</h2>
                  <div className="flex flex-wrap gap-2">
                    {toolInfo.integrations.map((integration, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {integration}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Tools */}
              <section className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
                <div className="space-y-4">
                  {toolInfo.related_tools.map((related, index) => (
                    <a 
                      key={index}
                      href={`/tools/${related}`} 
                      className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900">
                        {related.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <p className="text-sm text-gray-600">View comparison</p>
                    </a>
                  ))}
                </div>
              </section>

              {/* Email Capture */}
              <section className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Get AI Tool Insights</h2>
                <p className="text-blue-100 mb-6">Stay updated with the latest AI tool reviews, comparisons, and exclusive insights.</p>
                {emailSubmitted ? (
                  <div className="text-center">
                    <div className="text-green-100 font-medium">Thank you for subscribing!</div>
                    <div className="text-blue-200 text-sm mt-2">You'll receive your first insights soon.</div>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleEmailSubmit}>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Enter your email" 
                      required 
                      className="w-full px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button 
                      type="submit" 
                      className="w-full bg-white text-blue-600 px-4 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                    >
                      Subscribe Now
                    </button>
                  </form>
                )}
                <p className="text-sm text-blue-200 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">SiteOptz.ai</h3>
                <p className="text-gray-400">Your trusted source for AI tool reviews and comparisons.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Tools</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/tools" className="hover:text-white">All Tools</a></li>
                  <li><a href="/comparisons" className="hover:text-white">Comparisons</a></li>
                  <li><a href="/rankings" className="hover:text-white">Rankings</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/blog" className="hover:text-white">Blog</a></li>
                  <li><a href="/guides" className="hover:text-white">Guides</a></li>
                  <li><a href="/newsletter" className="hover:text-white">Newsletter</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/about" className="hover:text-white">About</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                  <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 SiteOptz.ai. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}