import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface SEOComponentProps {
  tool: {
    name: string;
    category: string;
    description: string;
    website: string;
    rating: number;
    slug: string;
  };
}

const Tool10webReviewPage: React.FC<SEOComponentProps> = ({ tool }) => {
  return (
    <>
      <Head>
        <title>{tool.name} Review - Features, Pricing & Alternatives [2025] | SiteOptz</title>
        <meta name="description" content={`Comprehensive ${tool.name} review. Compare features, pricing, and alternatives.`} />
        <link rel="canonical" href={`https://siteoptz.ai/reviews/${tool.slug}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {tool.name} Review
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {tool.description}
            </p>
            <Link
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Visit {tool.name}
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What is {tool.name}?
            </h2>
            <p className="text-gray-700 mb-4">
              {tool.description}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Get Your Free AI Assessment</h3>
            <p className="text-blue-100 mb-6">
              Discover how {tool.name} and other AI tools can transform your business workflow.
            </p>
            <Link
              href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
            >
              Get Your Free AI Assessment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tool10webReviewPage;
