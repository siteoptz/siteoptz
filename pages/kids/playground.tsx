import React from 'react';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Info } from 'lucide-react';
import AIPlayground from '../../components/kids/AIPlayground';

export default function KidsPlaygroundPage() {
  return (
    <>
      <SEOHead
        title="AI Playground | siteoptz.ai Kids"
        description="Experiment with AI tools in a safe, educational environment. Create stories, generate images, get coding help, and chat with AI."
        canonicalUrl="https://siteoptz.ai/kids/playground"
        keywords={['kids AI playground', 'safe AI tools', 'AI experimentation', 'kids coding', 'AI education']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link 
            href="/kids" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Kids Home
          </Link>

          <div className="text-center mb-12">
            <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Playground
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experiment safely with AI tools and see how they work! This is just a demo - sign up to unlock the full platform.
            </p>
          </div>

          {/* Safety Notice */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-black border border-gray-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-white mb-1">Demo Mode</p>
                  <p className="text-gray-300">
                    This is a demonstration of our AI Playground. All responses are simulated and safe for kids. 
                    The real platform will have actual AI integration with content moderation and parental controls.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Playground Component */}
          <div className="mb-12">
            <AIPlayground level="explorer" />
          </div>

          {/* Call to Action */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready for the Real Thing?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join our platform to access real AI tools, save your projects, track your progress, and learn with guided tutorials!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Get Started
              </Link>
              <Link
                href="/kids/parents"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                For Parents
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}