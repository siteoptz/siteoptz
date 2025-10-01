import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface OptzAnalyticsProps {
  host: string;
}

export default function OptzAnalytics({ host }: OptzAnalyticsProps) {
  return (
    <>
      <Head>
        <title>Analytics - Optz AI Optimization Platform</title>
        <meta name="description" content="Advanced AI analytics and insights. Monitor performance, track optimization results, and analyze AI workflow efficiency." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://${host}/analytics`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Link href="/optz" className="text-2xl font-bold text-gray-900">Optz</Link>
                <span className="ml-2 text-sm text-gray-500">Analytics</span>
              </div>
              <nav className="flex space-x-8">
                <Link href="/optz" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link href="/optz/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link href="/optz/optimization" className="text-gray-600 hover:text-gray-900">Optimization</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">AI Analytics & Insights</h1>
            <p className="text-gray-600 mt-2">Deep dive into your AI performance metrics and optimization opportunities</p>
          </div>

          {/* Filter Controls */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>All Models</option>
                  <option>GPT-4</option>
                  <option>Claude-3</option>
                  <option>Gemini Pro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Workflow</label>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>All Workflows</option>
                  <option>Content Generation</option>
                  <option>Data Analysis</option>
                  <option>Customer Support</option>
                </select>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-3xl font-bold text-gray-900">45,231</p>
                  <p className="text-sm text-green-600">+12.5% from last month</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className="text-3xl font-bold text-gray-900">1.2s</p>
                  <p className="text-sm text-green-600">-0.3s from last month</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-3xl font-bold text-gray-900">94.2%</p>
                  <p className="text-sm text-green-600">+2.1% from last month</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cost per Request</p>
                  <p className="text-3xl font-bold text-gray-900">$0.023</p>
                  <p className="text-sm text-green-600">-15% from last month</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume Over Time</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Request volume chart would go here</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time Distribution</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Response time histogram would go here</p>
              </div>
            </div>
          </div>

          {/* Model Performance Comparison */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Model Performance Comparison</h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Response Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost per Request</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GPT-4</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18,432</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.1s</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">96.2%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0.031</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Claude-3</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15,234</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.3s</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">94.8%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0.028</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Gemini Pro</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">11,565</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.0s</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92.1%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$0.015</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Optimization Recommendations */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Optimization Recommendations</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Switch to Gemini Pro for Cost Savings</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Your content generation workflow could save 48% on costs by switching from GPT-4 to Gemini Pro with minimal quality impact.
                    </p>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Apply Recommendation →
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Implement Request Batching</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Batch similar requests together to reduce API calls by 30% and improve overall efficiency.
                    </p>
                    <button className="mt-2 text-sm text-green-600 hover:text-green-800 font-medium">
                      Configure Batching →
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Optimize Prompt Length</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Reduce average prompt length by 15% to decrease token usage and improve response times.
                    </p>
                    <button className="mt-2 text-sm text-yellow-600 hover:text-yellow-800 font-medium">
                      Review Prompts →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
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
