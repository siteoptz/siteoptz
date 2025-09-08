import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AiSalesProcessAutomationTranscript() {
  const title = "Ai Sales Process Automation - Podcast Transcript | SiteOptz";
  const description = "Full transcript of our ai sales process automation podcast episode. Expert insights and actionable strategies for AI implementation.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="ai, sales, process, automation, podcast, transcript, AI insights" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://siteoptz.ai/podcasts/transcripts/ai-sales-process-automation`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-cyan-400">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/podcasts" className="hover:text-cyan-400">Podcasts</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-cyan-400">Ai Sales Process Automation</li>
            </ol>
          </nav>

          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ai Sales Process Automation
            </h1>
            <p className="text-xl text-gray-300">
              Full podcast transcript and insights
            </p>
          </header>

          <div className="bg-black/50 border border-gray-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Transcript Coming Soon</h2>
            <p className="text-gray-300 mb-6">
              We&apos;re preparing the full transcript for this ai sales process automation episode. 
              This will include key insights, expert quotes, and actionable takeaways from our discussion.
            </p>
            <p className="text-gray-300">
              In the meantime, explore our other podcast episodes or schedule a consultation 
              to discuss AI strategies for your business.
            </p>
          </div>

          <div className="text-center">
            <a
              href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Schedule AI Strategy Call
            </a>
          </div>
        </div>
      </div>
    </>
  );
}