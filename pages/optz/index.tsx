import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface OptzHomeProps {
  host: string;
}

export default function OptzHome({ host }: OptzHomeProps) {
  return (
    <>
      <Head>
        <title>Optz - AI Optimization Platform | SiteOptz</title>
        <meta name="description" content="Advanced AI optimization tools and analytics platform for businesses. Optimize your AI workflows with Optz." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://${host}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Optz - AI Optimization Platform" />
        <meta property="og:description" content="Advanced AI optimization tools and analytics platform for businesses." />
        <meta property="og:url" content={`https://${host}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Optz" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Optz - AI Optimization Platform" />
        <meta name="twitter:description" content="Advanced AI optimization tools and analytics platform for businesses." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Optz</h1>
                <span className="ml-2 text-sm text-gray-500">by SiteOptz</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/optz/analytics" className="text-gray-600 hover:text-gray-900">
                  Analytics
                </Link>
                <Link href="/optz/optimization" className="text-gray-600 hover:text-gray-900">
                  Optimization
                </Link>
                <Link href="/optz/insights" className="text-gray-600 hover:text-gray-900">
                  Insights
                </Link>
                <Link href="/optz/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI Optimization
              <span className="block text-blue-600">Platform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Optimize your AI workflows, analyze performance, and unlock insights with our advanced optimization platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/optz/dashboard"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/optz/demo"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Demo
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">
                Deep insights into your AI performance with real-time analytics and comprehensive reporting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Optimization</h3>
              <p className="text-gray-600">
                Automatically optimize your AI workflows for maximum efficiency and performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Insights</h3>
              <p className="text-gray-600">
                Get actionable insights and recommendations to improve your AI implementation.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-blue-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your AI?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of businesses already using Optz to optimize their AI workflows.
            </p>
            <Link
              href="/optz/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Start Free Trial
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Optz</h3>
                <p className="text-gray-400">
                  Advanced AI optimization platform for modern businesses.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/optz/features" className="hover:text-white">Features</Link></li>
                  <li><Link href="/optz/pricing" className="hover:text-white">Pricing</Link></li>
                  <li><Link href="/optz/integrations" className="hover:text-white">Integrations</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/optz/docs" className="hover:text-white">Documentation</Link></li>
                  <li><Link href="/optz/support" className="hover:text-white">Support</Link></li>
                  <li><Link href="/optz/blog" className="hover:text-white">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/optz/about" className="hover:text-white">About</Link></li>
                  <li><Link href="/optz/contact" className="hover:text-white">Contact</Link></li>
                  <li><Link href="/optz/privacy" className="hover:text-white">Privacy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Optz by SiteOptz. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const host = req.headers.host || 'optz.siteoptz.ai';

  return {
    props: {
      host,
    },
  };
};
