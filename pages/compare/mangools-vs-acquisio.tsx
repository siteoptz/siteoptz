import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

interface ComparisonPageProps {
  tool1: {
    name: string;
    slug: string;
    category: string;
    description: string;
  };
  tool2: {
    name: string;
    slug: string;
    category: string;
    description: string;
  };
}

export default function MangoolsVsAcquisio({ tool1, tool2 }: ComparisonPageProps) {
  const title = `${tool1.name} vs ${tool2.name}: Comprehensive AI Tool Comparison 2025 | SiteOptz`;
  const description = `Compare ${tool1.name} and ${tool2.name} features, pricing, and capabilities. Expert analysis to help you choose the best AI tool for your business needs.`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${tool1.slug}, ${tool2.slug}, comparison, AI tools, ${tool1.category.toLowerCase()}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://siteoptz.ai/compare/${tool1.slug}-vs-${tool2.slug}`} />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://siteoptz.ai/compare/${tool1.slug}-vs-${tool2.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="SiteOptz" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        <nav className="relative z-10 pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/compare" className="hover:text-cyan-400 transition-colors">Compare</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-cyan-400">{tool1.name} vs {tool2.name}</li>
            </ol>
          </div>
        </nav>

        <section className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {tool1.name} vs {tool2.name}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive comparison of {tool1.name} and {tool2.name} to help you choose the best AI solution for your business needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-black/50 border border-gray-800 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-4">{tool1.name}</h2>
                  <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-full">
                    {tool1.category}
                  </span>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    {tool1.description}
                  </p>
                  <Link 
                    href={`/reviews/${tool1.slug}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Read {tool1.name} Review
                  </Link>
                </div>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-4">{tool2.name}</h2>
                  <span className="inline-block px-4 py-2 bg-purple-600 text-white text-sm rounded-full">
                    {tool2.category}
                  </span>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    {tool2.description}
                  </p>
                  <Link 
                    href={`/reviews/${tool2.slug}`}
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Read {tool2.name} Review
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-gray-800 rounded-2xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Need Help Choosing Between {tool1.name} and {tool2.name}?
              </h3>
              <p className="text-gray-300 mb-8">
                Get personalized recommendations from our AI experts
              </p>
              <a
                href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Schedule Expert Consultation
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      tool1: {
        name: "Mangools",
        slug: "mangools",
        category: "SEO & Optimization",
        description: "Beginner-friendly SEO toolkit with five integrated tools that simplify SEO without compromising functionality."
      },
      tool2: {
        name: "Acquisio",
        slug: "acquisio",
        category: "undefined",
        description: "undefined"
      }
    },
    revalidate: 86400
  };
};