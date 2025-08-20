import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Home, Search, Zap } from 'lucide-react';

const Custom404: React.FC = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | SiteOptz.ai</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our AI tools directory and find the perfect AI solution for your business." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://siteoptz.ai/404" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              404
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              The AI tool or page you're looking for seems to have vanished into the digital void.
            </p>
            <p className="text-gray-400">
              Don't worry though - we have plenty of amazing AI tools to discover!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <Link 
              href="/tools"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg font-semibold hover:bg-gray-700 hover:border-gray-600 transition-all duration-200"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse AI Tools
            </Link>
          </div>

          {/* Popular Categories */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
              <Zap className="w-6 h-6 mr-2 text-cyan-400" />
              Popular AI Categories
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Content Creation', href: '/categories/content-creation' },
                { name: 'Voice AI Tools', href: '/categories/best-voice-ai-tools' },
                { name: 'Image Generation', href: '/categories/image-generation' },
                { name: 'Data Analysis', href: '/categories/data-analysis' },
                { name: 'SEO & Optimization', href: '/categories/seo-optimization' },
                { name: 'Social Media', href: '/categories/social-media' }
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block p-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:text-white hover:border-cyan-400 transition-all duration-200 text-sm"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-8 text-gray-500 text-sm">
            <p>Still can't find what you're looking for?</p>
            <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Contact our team for assistance
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;