import Head from "next/head";
import Link from "next/link";

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>AI Tools Pricing Calculator | SiteOptz.ai</title>
        <meta
          name="description"
          content="Calculate pricing for top AI tools. Compare plans, get quotes, and find the best AI solution for your budget."
        />
        <meta name="keywords" content="AI tools pricing, AI calculator, AI tool costs, SiteOptz" />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <section className="text-center">
          <h1 className="text-3xl font-bold mb-6">AI Tools Pricing Calculator</h1>
          <p className="text-gray-600 mb-8">
            Pricing calculator is temporarily under maintenance. Please check back soon!
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Meanwhile, explore our tools:</h2>
            <div className="space-y-3">
              <Link href="/tools" className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Browse All AI Tools
              </Link>
              <Link href="/compare" className="block w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Compare AI Tools
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}