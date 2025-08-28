import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const APIDocsPage = () => {
  return (
    <>
      <Head>
        <title>AI Tools API Documentation | SiteOptz.ai</title>
        <meta name="description" content="Complete API documentation for SiteOptz AI tools data. Build amazing integrations with our comprehensive REST API." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              SiteOptz AI Tools API
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Access comprehensive data on 1000+ AI tools through our RESTful API
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-700">v1.0 Stable</span>
              </div>
              <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                <span className="text-sm text-blue-700">REST API</span>
              </div>
              <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                <span className="text-sm text-purple-700">Rate Limited</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <h3 className="font-semibold text-gray-900 mb-4">Documentation</h3>
                <nav className="space-y-2">
                  <a href="#getting-started" className="block text-sm text-gray-600 hover:text-blue-600">Getting Started</a>
                  <a href="#authentication" className="block text-sm text-gray-600 hover:text-blue-600">Authentication</a>
                  <a href="#rate-limiting" className="block text-sm text-gray-600 hover:text-blue-600">Rate Limiting</a>
                  <a href="#endpoints" className="block text-sm text-gray-600 hover:text-blue-600">API Endpoints</a>
                  <a href="#tools-list" className="block text-sm text-gray-600 hover:text-blue-600 ml-4">List Tools</a>
                  <a href="#tool-detail" className="block text-sm text-gray-600 hover:text-blue-600 ml-4">Tool Details</a>
                  <a href="#categories" className="block text-sm text-gray-600 hover:text-blue-600 ml-4">Categories</a>
                  <a href="#compare" className="block text-sm text-gray-600 hover:text-blue-600 ml-4">Compare Tools</a>
                  <a href="#examples" className="block text-sm text-gray-600 hover:text-blue-600">Code Examples</a>
                  <a href="#widgets" className="block text-sm text-gray-600 hover:text-blue-600">Embed Widgets</a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Getting Started */}
              <section id="getting-started" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
                <p className="text-gray-600 mb-6">
                  The SiteOptz AI Tools API provides programmatic access to our comprehensive database of AI tools. 
                  Get detailed information about tools, compare features, and integrate AI tool data into your applications.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Base URL</h4>
                  <code className="text-sm text-gray-800 bg-white px-2 py-1 rounded">
                    https://siteoptz.ai/api/v1
                  </code>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">🚀 Quick Start</h4>
                  <p className="text-blue-800 text-sm">
                    Our API is currently open and doesn&apos;t require authentication. 
                    Simply make HTTP requests to our endpoints to get started!
                  </p>
                </div>
              </section>

              {/* Rate Limiting */}
              <section id="rate-limiting" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate Limiting</h2>
                <p className="text-gray-600 mb-4">
                  To ensure fair usage, our API implements rate limiting:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                  <li><strong>100 requests per minute</strong> per IP address</li>
                  <li>Rate limit resets every 60 seconds</li>
                  <li>Exceeded limits return HTTP 429 status</li>
                </ul>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Response Headers</h4>
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`X-RateLimit-Limit: 100
X-RateLimit-Window: 60s`}
                  </pre>
                </div>
              </section>

              {/* Endpoints */}
              <section id="endpoints" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h2>

                {/* List Tools */}
                <div id="tools-list" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">GET /tools</h3>
                  <p className="text-gray-600 mb-4">Retrieve a list of AI tools with filtering and pagination.</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Query Parameters</h4>
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-medium">Parameter</th>
                          <th className="text-left py-2 px-3 font-medium">Type</th>
                          <th className="text-left py-2 px-3 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600">
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3"><code>category</code></td>
                          <td className="py-2 px-3">string</td>
                          <td className="py-2 px-3">Filter by tool category</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3"><code>search</code></td>
                          <td className="py-2 px-3">string</td>
                          <td className="py-2 px-3">Search in name, description, tags</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3"><code>limit</code></td>
                          <td className="py-2 px-3">integer</td>
                          <td className="py-2 px-3">Results per page (default: 20, max: 100)</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3"><code>offset</code></td>
                          <td className="py-2 px-3">integer</td>
                          <td className="py-2 px-3">Pagination offset (default: 0)</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3"><code>sort</code></td>
                          <td className="py-2 px-3">string</td>
                          <td className="py-2 px-3">Sort by: name, rating, price</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3"><code>fields</code></td>
                          <td className="py-2 px-3">string</td>
                          <td className="py-2 px-3">Comma-separated fields to include</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-white mb-2">Example Request</h4>
                    <pre className="text-green-300 text-sm overflow-x-auto">
{`GET /api/v1/tools?category=seo&limit=5&sort=rating

curl "https://siteoptz.ai/api/v1/tools?category=seo&limit=5"`}
                    </pre>
                  </div>
                </div>

                {/* Tool Details */}
                <div id="tool-detail" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">GET /tools/{slug}</h3>
                  <p className="text-gray-600 mb-4">Get detailed information about a specific AI tool.</p>
                  
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-white mb-2">Example Request</h4>
                    <pre className="text-green-300 text-sm overflow-x-auto">
{`GET /api/v1/tools/chatgpt

curl "https://siteoptz.ai/api/v1/tools/chatgpt"`}
                    </pre>
                  </div>
                </div>

                {/* Categories */}
                <div id="categories" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">GET /categories</h3>
                  <p className="text-gray-600 mb-4">Get all available tool categories with optional counts.</p>
                  
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-white mb-2">Example Request</h4>
                    <pre className="text-green-300 text-sm overflow-x-auto">
{`GET /api/v1/categories?include_count=true

curl "https://siteoptz.ai/api/v1/categories?include_count=true"`}
                    </pre>
                  </div>
                </div>

                {/* Compare Tools */}
                <div id="compare" className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">POST /tools/compare</h3>
                  <p className="text-gray-600 mb-4">Compare multiple AI tools side by side.</p>
                  
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-white mb-2">Example Request</h4>
                    <pre className="text-green-300 text-sm overflow-x-auto">
{`POST /api/v1/tools/compare
Content-Type: application/json

{
  "slugs": ["chatgpt", "claude", "gemini"],
  "fields": ["name", "pricing", "features"]
}`}
                    </pre>
                  </div>
                </div>
              </section>

              {/* Code Examples */}
              <section id="examples" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Code Examples</h2>
                
                {/* JavaScript */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">JavaScript / Node.js</h3>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-300 text-sm overflow-x-auto">
{`// Fetch all SEO tools
const response = await fetch('https://siteoptz.ai/api/v1/tools?category=seo');
const data = await response.json();

console.log(\`Found \${data.meta.total} SEO tools\`);
data.data.forEach(tool => {
  console.log(\`- \${tool.name}: \${tool.overview?.description}\`);
});

// Compare tools
const comparison = await fetch('https://siteoptz.ai/api/v1/tools/compare', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ slugs: ['chatgpt', 'claude'] })
});
const compareData = await comparison.json();`}
                    </pre>
                  </div>
                </div>

                {/* Python */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Python</h3>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-300 text-sm overflow-x-auto">
{`import requests

# Get writing tools
response = requests.get('https://siteoptz.ai/api/v1/tools?category=writing&limit=10')
tools = response.json()

for tool in tools[&apos;data&apos;]:
    print(f&quot;{tool[&apos;name&apos;]}: {tool[&apos;overview&apos;][&apos;description&apos;]}&quot;)

# Search for AI tools
search_response = requests.get('https://siteoptz.ai/api/v1/tools?search=chatbot')
search_results = search_response.json()`}
                    </pre>
                  </div>
                </div>
              </section>

              {/* Embed Widgets */}
              <section id="widgets" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Embeddable Widgets</h2>
                <p className="text-gray-600 mb-6">
                  Embed AI tool data directly into your website with our JavaScript widgets.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">🚧 Coming Soon</h4>
                  <p className="text-blue-800 text-sm">
                    Embeddable widgets are currently in development. They will allow you to display 
                    AI tool listings, comparisons, and search functionality on your website.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Tool List Widget</h4>
                    <p className="text-gray-600 text-sm mb-3">Display a customizable list of AI tools</p>
                    <div className="bg-gray-100 rounded p-2 text-xs text-gray-600">
                      &lt;div id=&quot;siteoptz-tools&quot;&gt;&lt;/div&gt;
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Search Widget</h4>
                    <p className="text-gray-600 text-sm mb-3">Add AI tool search to your site</p>
                    <div className="bg-gray-100 rounded p-2 text-xs text-gray-600">
                      &lt;div id=&quot;siteoptz-search&quot;&gt;&lt;/div&gt;
                    </div>
                  </div>
                </div>
              </section>

              {/* Support */}
              <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
                <p className="text-gray-600 mb-6">
                  Have questions about our API or need support with your integration?
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Contact Support
                  </Link>
                  <a 
                    href="mailto:api@siteoptz.ai" 
                    className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Email Us
                  </a>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default APIDocsPage;