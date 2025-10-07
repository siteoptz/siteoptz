// pages/index.tsx
// Main landing page for optz.siteoptz.ai white label solution

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

interface OptzLandingProps {
  isAuthenticated: boolean;
  userEmail?: string;
  host: string;
}

export default function OptzLanding({ isAuthenticated, userEmail, host }: OptzLandingProps) {
  return (
    <>
      <Head>
        <title>Marketing ROI Tracker - White Label Analytics Solution</title>
        <meta name="description" content="Professional marketing ROI tracking dashboard with Google Ads integration and real-time analytics. White label solution powered by Cyfe.com." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://${host}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Marketing ROI Tracker - White Label Solution" />
        <meta property="og:description" content="Professional marketing ROI tracking dashboard with Google Ads integration and real-time analytics." />
        <meta property="og:url" content={`https://${host}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Marketing ROI Tracker" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Marketing ROI Tracker - White Label Solution" />
        <meta name="twitter:description" content="Professional marketing ROI tracking dashboard with Google Ads integration and real-time analytics." />
      </Head>

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white">
                Marketing ROI Tracker
              </div>
              <div className="ml-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full">
                White Label Solution
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-300">Welcome, {userEmail}</span>
                  <Link
                    href="/dashboard/white-label"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Track Your Marketing ROI
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Like Never Before
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive marketing analytics dashboard powered by Google Ads integration 
              and real-time reporting through Cyfe.com white label solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  href="/dashboard/white-label"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
                >
                  Open Dashboard
                </Link>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
                >
                  Get Started Free
                </Link>
              )}
              <Link
                href="#features"
                className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Optimize ROI
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Professional-grade marketing analytics tools designed for agencies and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Google Ads Integration */}
            <div className="bg-black border border-gray-800 rounded-lg p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Google Ads Integration</h3>
              <p className="text-gray-300">
                Direct integration with Google Ads API for real-time campaign data, 
                spend tracking, and performance metrics.
              </p>
            </div>

            {/* Real-time Analytics */}
            <div className="bg-black border border-gray-800 rounded-lg p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Real-time Analytics</h3>
              <p className="text-gray-300">
                Live dashboard updates with key metrics including ROAS, CPC, 
                conversion rates, and campaign performance.
              </p>
            </div>

            {/* White Label Solution */}
            <div className="bg-black border border-gray-800 rounded-lg p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">White Label Ready</h3>
              <p className="text-gray-300">
                Fully customizable dashboard powered by Cyfe.com integration 
                for seamless client reporting and branding.
              </p>
            </div>

            {/* Additional Features */}
            <div className="bg-black border border-gray-800 rounded-lg p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Campaign Insights</h3>
              <p className="text-gray-300">
                Detailed campaign performance analysis with spend tracking, 
                click metrics, and ROI optimization recommendations.
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">API Powered</h3>
              <p className="text-gray-300">
                Built on robust APIs with secure authentication and 
                scalable data processing for enterprise-level usage.
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-lg p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-pink-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Export & Reports</h3>
              <p className="text-gray-300">
                Generate comprehensive reports with customizable layouts 
                and automated delivery for stakeholder updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Track Your Marketing ROI?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of marketers who trust our platform for their analytics needs.
          </p>
          {isAuthenticated ? (
            <Link
              href="/dashboard/white-label"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-block"
            >
              Access Your Dashboard
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-block"
            >
              Start Free Trial
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-4">
              Marketing ROI Tracker
            </div>
            <p className="text-gray-400 mb-4">
              Professional marketing analytics for the modern business.
            </p>
            <div className="text-gray-500 text-sm">
              © 2024 SiteOptz. All rights reserved. | White Label Solution by Cyfe.com
            </div>
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
  const session = await getServerSession(context.req, context.res, authOptions);

  // If user is authenticated and accessing optz.siteoptz.ai, redirect to white label dashboard
  if (session && host === 'optz.siteoptz.ai') {
    return {
      redirect: {
        destination: '/dashboard/white-label',
        permanent: false,
      },
    };
  }

  return {
    props: {
      isAuthenticated: !!session,
      userEmail: session?.user?.email || null,
      host,
    },
  };
};
