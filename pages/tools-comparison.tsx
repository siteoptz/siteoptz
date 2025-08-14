import Head from "next/head";
import fs from "fs";
import path from "path";
import ToolComparisonTable from "../components/ToolComparisonTable";
import PricingCalculator from "../components/PricingCalculator";
import FAQSection from "../components/FAQSection";

// Generate FAQ Schema for SEO
function generateFAQSchema(faqs: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export async function getStaticProps() {
  // Load data from public/data directory (Claude output location)
  const toolsPath = path.join(process.cwd(), "public", "data", "aiToolsData.json");
  const faqPath = path.join(process.cwd(), "public", "data", "faqData.json");

  const toolsData = JSON.parse(fs.readFileSync(toolsPath, "utf-8"));
  const faqData = JSON.parse(fs.readFileSync(faqPath, "utf-8"));

  // Convert FAQ data to flat array for the FAQ component
  const allFaqs = Object.values(faqData).flat();

  return {
    props: {
      tools: toolsData,
      faqs: allFaqs,
    },
    // Revalidate every hour
    revalidate: 3600
  };
}

export default function ToolsPage({ 
  tools, 
  faqs 
}: { 
  tools: any[]; 
  faqs: any[]; 
}) {
  // Generate FAQ schema for SEO
  const faqSchema = generateFAQSchema(faqs.slice(0, 20)); // Limit to first 20 for performance

  // Handle email submissions from pricing calculator
  const handleEmailSubmit = (email: string, selectedTools: any[]) => {
    console.log('Email captured:', email, 'Tools:', selectedTools);
    
    // Send to your API endpoint
    fetch('/api/capture-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        selectedTools,
        source: 'tools-comparison',
        timestamp: new Date().toISOString()
      })
    }).catch(console.error);

    // Optional: Track with analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'email_capture', {
        event_category: 'engagement',
        event_label: 'pricing_calculator'
      });
    }
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Best AI Tools Comparison 2025 | SiteOptz.ai</title>
        <meta
          name="description"
          content="Compare top AI tools with interactive benchmarks, pricing calculator, and detailed features. Find the best AI solution for your business needs."
        />
        <meta 
          name="keywords" 
          content="AI tools comparison, ChatGPT vs Claude, AI pricing calculator, best AI tools 2025, AI benchmarks, SiteOptz" 
        />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Best AI Tools Comparison 2025 | SiteOptz.ai" />
        <meta property="og:description" content="Compare top AI tools with interactive benchmarks and pricing calculator." />
        <meta property="og:url" content="https://siteoptz.ai/tools-comparison" />
        <meta property="og:image" content="https://siteoptz.ai/images/ai-tools-comparison.jpg" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best AI Tools Comparison 2025" />
        <meta name="twitter:description" content="Interactive comparison of top AI tools with pricing and benchmarks." />
        
        {/* FAQ Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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
                  "name": "AI Tools Comparison",
                  "item": "https://siteoptz.ai/tools-comparison"
                }
              ]
            })
          }}
        />
        
        {/* Additional SEO */}
        <link rel="canonical" href="https://siteoptz.ai/tools-comparison" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Compare the Best AI Tools of 2025
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Interactive comparison table, real-time pricing calculator, and comprehensive FAQs. 
                Find the perfect AI tool for your needs.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                  <div className="text-2xl font-bold">{tools.length}</div>
                  <div className="text-sm text-blue-200">AI Tools</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                  <div className="text-2xl font-bold">{faqs.length}</div>
                  <div className="text-sm text-blue-200">FAQs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                  <div className="text-2xl font-bold">2025</div>
                  <div className="text-sm text-blue-200">Updated</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
          
          {/* Navigation */}
          <nav className="bg-white rounded-lg shadow-sm p-4 sticky top-0 z-10">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#comparison" className="text-blue-600 hover:text-blue-700 font-medium">
                📊 Comparison Table
              </a>
              <a href="#calculator" className="text-blue-600 hover:text-blue-700 font-medium">
                💰 Pricing Calculator
              </a>
              <a href="#faqs" className="text-blue-600 hover:text-blue-700 font-medium">
                ❓ FAQs
              </a>
            </div>
          </nav>

          {/* Comparison Table Section */}
          <section id="comparison">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Interactive AI Tools Comparison
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Compare features, benchmarks, pros & cons across the top AI tools. 
                Select up to 4 tools for detailed analysis.
              </p>
            </div>
            <ToolComparisonTable 
              tools={tools} 
              defaultSelected={['chatgpt', 'claude', 'gemini']}
            />
          </section>

          {/* Pricing Calculator Section */}
          <section id="calculator">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI Tools Pricing Calculator
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Calculate your monthly and annual costs across multiple AI tools. 
                Configure plans and team sizes to get accurate pricing estimates.
              </p>
            </div>
            <PricingCalculator 
              tools={tools}
              onEmailSubmit={handleEmailSubmit}
            />
          </section>

          {/* FAQ Section */}
          <section id="faqs">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about AI tools, pricing, features, and implementation.
              </p>
            </div>
            <FAQSection 
              faqs={faqs}
              showSearch={true}
              maxInitialDisplay={6}
            />
          </section>

          {/* Bottom CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Choose Your AI Stack?
            </h2>
            <p className="text-lg md:text-xl mb-6 text-blue-100 max-w-2xl mx-auto">
              Get personalized recommendations based on your specific needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Free Consultation
              </button>
              <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Download Guide
              </button>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}