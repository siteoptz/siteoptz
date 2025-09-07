import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function SalesAiCaseStudy() {
  const title = "Sales Ai Case Study | SiteOptz";
  const description = "Explore how businesses successfully implemented AI solutions for sales ai. Real results, lessons learned, and implementation strategies.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="sales, ai, AI implementation, case study, success story" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://siteoptz.ai/case-studies/sales-ai`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Navigation */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-cyan-400">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/case-studies" className="hover:text-cyan-400">Case Studies</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-cyan-400">Sales Ai</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sales Ai Case Study
            </h1>
            <p className="text-xl text-gray-300">
              Real-world AI implementation success story
            </p>
          </header>

          {/* Content */}
          <div className="bg-black/50 border border-gray-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Coming Soon</h2>
            <p className="text-gray-300 mb-6">
              We&apos;re currently preparing a detailed case study on sales ai. 
              This comprehensive analysis will include real implementation strategies, 
              results achieved, and lessons learned.
            </p>
            <p className="text-gray-300">
              In the meantime, explore our other resources or schedule a consultation 
              to discuss your specific AI implementation needs.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Schedule AI Strategy Consultation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}