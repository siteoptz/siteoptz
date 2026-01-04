import React from 'react';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { ArrowLeft, Code, Sparkles, Rocket } from 'lucide-react';

export default function KidsLearnPage() {
  return (
    <>
      <SEOHead
        title="Learn to Code with AI | siteoptz.ai Kids"
        description="Start your journey learning to build with AI. Interactive tutorials, coding challenges, and hands-on projects."
        canonicalUrl="https://siteoptz.ai/kids/learn"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link 
            href="/kids" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Kids Home
          </Link>

          <div className="text-center mb-12">
            <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Learn to Build with AI
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Interactive tutorials and projects to help you go from AI user to AI builder
            </p>
          </div>

          {/* Learning Levels */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link
              href="/kids/learn/explorer"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-purple-200 hover:border-purple-400"
            >
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  Level 1
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-purple-600 transition">
                  AI Explorer
                </h3>
                <p className="text-sm text-gray-600 mb-3">Ages 8-10</p>
                <p className="text-gray-600 text-sm">
                  Learn what AI is, how to use it, and why it matters
                </p>
                <div className="mt-4 text-purple-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Start Learning →
                </div>
              </div>
            </Link>

            {/* Placeholder for future levels */}
            <div className="bg-gray-100 rounded-xl shadow-md p-6 border-2 border-gray-200 opacity-60">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-400 rounded-full mb-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div className="bg-gray-300 text-gray-600 text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  Level 2
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-500">
                  AI Builder
                </h3>
                <p className="text-sm text-gray-500 mb-3">Ages 11-13</p>
                <p className="text-gray-500 text-sm">
                  Coming Soon
                </p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl shadow-md p-6 border-2 border-gray-200 opacity-60">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-400 rounded-full mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div className="bg-gray-300 text-gray-600 text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  Level 3
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-500">
                  AI Creator
                </h3>
                <p className="text-sm text-gray-500 mb-3">Ages 14-16</p>
                <p className="text-gray-500 text-sm">
                  Coming Soon
                </p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl shadow-md p-6 border-2 border-gray-200 opacity-60">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-400 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="bg-gray-300 text-gray-600 text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  Level 4
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-500">
                  AI Innovator
                </h3>
                <p className="text-sm text-gray-500 mb-3">Ages 17+</p>
                <p className="text-gray-500 text-sm">
                  Coming Soon
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">More Levels Coming Soon!</h2>
            <p className="text-lg text-gray-600 mb-6">
              We&apos;re working hard to bring you more learning levels. Level 1: AI Explorer is ready now!
            </p>
            <Link 
              href="/kids"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Back to Kids Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}