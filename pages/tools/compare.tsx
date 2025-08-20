import { GetStaticProps } from 'next';
import { useState } from 'react';
import ToolComparisonTable from '../../components/ToolComparisonTable';
import PricingCalculator from '../../components/PricingCalculator';
import FAQSection from '../../components/FAQSection';
import SEOHead from '../../components/SEOHead';
import fs from 'fs';
import path from 'path';

interface Tool {
  id: string;
  slug: string;
  name: string;
  logo: string;
  meta: {
    title: string;
    description: string;
  };
  overview: {
    developer: string;
    release_year: number;
    description: string;
  };
  features: string[];
  pros: string[];
  cons: string[];
  pricing: {
    plan: string;
    price_per_month: number;
    features: string[];
  }[];
  benchmarks: {
    speed: number;
    accuracy: number;
    integration: number;
    ease_of_use: number;
    value: number;
  };
}

interface FAQ {
  question: string;
  answer: string;
  schema?: any;
}

interface ComparePageProps {
  tools: Tool[];
  faqs: { [key: string]: FAQ[] };
}

export default function ComparePage({ tools, faqs }: ComparePageProps) {
  const [emailList, setEmailList] = useState<{ email: string; timestamp: Date }[]>([]);

  const handleEmailSubmit = (email: string, selectedTools: any[]) => {
    console.log('Email submitted:', email, 'Selected tools:', selectedTools);
    setEmailList(prev => [...prev, { email, timestamp: new Date() }]);
    
    // Here you would typically send this to your API
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, selectedTools })
    }).catch(console.error);
  };

  // Combine all FAQs for the comparison page
  const allFaqs: FAQ[] = [];
  tools.forEach(tool => {
    if (faqs[tool.id]) {
      allFaqs.push(...faqs[tool.id]);
    }
  });

  // Remove duplicates
  const uniqueFaqs = allFaqs.filter((faq, index, self) =>
    index === self.findIndex((f) => f.question === faq.question)
  );

  // SEO Data
  const pageTitle = "Compare AI Tools - ChatGPT vs Claude vs Gemini [2025]";
  const pageDescription = "Compare the best AI tools side-by-side. See pricing, features, and performance benchmarks for ChatGPT, Claude, Gemini, and more.";
  const canonicalUrl = "https://siteoptz.ai/tools/compare";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "breadcrumb": {
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
          "name": "Tools",
          "item": "https://siteoptz.ai/tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Compare",
          "item": canonicalUrl
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        schemaData={schemaData}
        keywords={["compare AI tools", "AI tool comparison", "ChatGPT vs Claude", "best AI tools", "AI pricing calculator"]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Compare AI Tools Side-by-Side
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Find the perfect AI tool for your needs. Compare features, pricing, and performance 
              across the most popular AI platforms.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="font-semibold">{tools.length}</span> Tools Available
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="font-semibold">Real-time</span> Pricing Calculator
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="font-semibold">{uniqueFaqs.length}</span> FAQs Answered
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Comparison Table Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Interactive Comparison Table
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select up to 4 tools to compare their features, pricing, and performance metrics
              </p>
            </div>
            <ToolComparisonTable 
              tools={tools} 
              defaultSelected={['chatgpt', 'claude', 'gemini']}
            />
          </section>

          {/* Pricing Calculator Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Calculate Your Total Investment
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Build your AI stack and see exactly how much you&apos;ll pay monthly and annually
              </p>
            </div>
            <PricingCalculator 
              tools={tools} 
              onEmailSubmit={handleEmailSubmit}
            />
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get answers to the most common questions about these AI tools
              </p>
            </div>
            <FAQSection 
              faqs={uniqueFaqs.slice(0, 10)} 
              showSearch={true}
              maxInitialDisplay={5}
            />
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Choose Your AI Tools?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Get personalized recommendations based on your specific needs and budget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Get Recommendations
              </button>
              <button className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Book Consultation
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Read data from public directory
  const aiToolsPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
  const faqPath = path.join(process.cwd(), 'public/data/faqData.json');
  
  const tools = JSON.parse(fs.readFileSync(aiToolsPath, 'utf8'));
  const faqs = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
  
  return {
    props: {
      tools,
      faqs
    },
    revalidate: 3600 // Revalidate every hour
  };
};