import React, { useState } from 'react';
import SEOHead from '../../../../components/SEOHead';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles, Brain, Bot, Lightbulb, CheckCircle } from 'lucide-react';

export default function WhatIsAIPage() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: 'Welcome!',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Sparkles className="w-20 h-20 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">What is AI?</h2>
            <p className="text-lg text-gray-600">
              Have you ever wondered how your phone knows what you want to search for? 
              Or how video games can play against you? That&apos;s AI!
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'AI is Like a Smart Helper',
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              Think of AI like this...
            </h3>
            <p className="text-lg text-gray-300 mb-4">
              Imagine you have a really smart friend who has read millions of books, 
              seen billions of pictures, and learned from lots of people. That friend 
              can help you do amazing things!
            </p>
            <p className="text-lg text-gray-300">
              <strong>AI (Artificial Intelligence)</strong> is like that smart friend - 
              but it&apos;s a computer program that has learned from tons of information!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 border-2 border-purple-500 rounded-xl p-6">
              <Bot className="w-12 h-12 text-purple-600 mb-4" />
              <h4 className="font-bold text-lg mb-2 text-white">Regular Computer</h4>
              <p className="text-gray-300">
                Does exactly what you tell it to do. Like a calculator - it only does math when you press buttons.
              </p>
            </div>
            <div className="bg-gray-900 border-2 border-blue-500 rounded-xl p-6">
              <Brain className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="font-bold text-lg mb-2 text-white">AI Computer</h4>
              <p className="text-gray-300">
                Can learn and make smart decisions! Like a friend who can guess what you want to say next.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'AI Around You',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6 text-white">AI is Already in Your Life!</h3>
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-xl p-6 border-2 border-green-500">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-white">🎮 Video Games</h4>
                  <p className="text-gray-300">
                    When you play against the computer in games, AI makes the computer smart enough to challenge you!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border-2 border-blue-500">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-white">📱 Your Phone</h4>
                  <p className="text-gray-300">
                    Voice assistants like Siri or Alexa use AI to understand what you&apos;re saying and answer your questions!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border-2 border-purple-500">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-white">🖼️ Photo Apps</h4>
                  <p className="text-gray-300">
                    Apps that can find all photos with &quot;dogs&quot; or &quot;cats&quot; use AI to recognize what&apos;s in pictures!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border-2 border-yellow-500">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-white">🤖 ChatGPT & Image Generators</h4>
                  <p className="text-gray-300">
                    When you ask ChatGPT questions or create pictures with AI, that&apos;s AI working for you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'How Does AI Learn?',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6 text-white">How Does AI Learn?</h3>
          
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 mb-6">
            <p className="text-lg text-gray-300 mb-6">
              <strong>AI learns like you do!</strong> Just like you learn by reading books, 
              watching videos, and practicing, AI learns by looking at lots and lots of examples.
            </p>

            <div className="space-y-4">
              <div className="bg-black border border-gray-700 rounded-lg p-4">
                <div className="font-bold text-purple-600 mb-2">1️⃣ Lots of Examples</div>
                <p className="text-gray-300">
                  AI looks at millions of pictures of cats to learn what a cat looks like
                </p>
              </div>
              <div className="bg-black border border-gray-700 rounded-lg p-4">
                <div className="font-bold text-blue-600 mb-2">2️⃣ Practice, Practice, Practice</div>
                <p className="text-gray-300">
                  AI practices by trying to identify cats in new pictures it hasn&apos;t seen before
                </p>
              </div>
              <div className="bg-black border border-gray-700 rounded-lg p-4">
                <div className="font-bold text-green-600 mb-2">3️⃣ Getting Better</div>
                <p className="text-gray-300">
                  Every time it makes a mistake, AI learns from it and gets better - just like you do!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border-2 border-yellow-500 rounded-xl p-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-white">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Fun Fact!
            </h4>
            <p className="text-gray-300">
              When you first learned to recognize dogs, you probably saw many dogs and learned 
              what makes a dog a dog. AI does the same thing, but with millions of examples!
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'You Did It!',
      content: (
        <div className="space-y-6 text-center">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">Awesome Job! 🎉</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            You now know what AI is! Remember:
          </p>

          <div className="bg-black border border-gray-800 rounded-xl p-8 max-w-2xl mx-auto">
            <ul className="space-y-4 text-left">
              <li className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-300"><strong>AI</strong> stands for Artificial Intelligence</span>
              </li>
              <li className="flex items-start gap-3">
                <Brain className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-300">AI is like a smart computer that can learn and make decisions</span>
              </li>
              <li className="flex items-start gap-3">
                <Bot className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-300">AI is already all around you - in games, phones, and apps!</span>
              </li>
              <li className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <span className="text-gray-300">AI learns by looking at lots of examples, just like you do!</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <p className="text-lg font-semibold text-gray-300 mb-4">Ready for the next lesson?</p>
            <Link
              href="/kids/learn/explorer/understanding-prompts"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Next: Understanding Prompts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <>
      <SEOHead
        title="What is AI? - AI Explorer | siteoptz.ai Kids"
        description="Learn what artificial intelligence is in simple, fun terms perfect for kids ages 8-10."
        canonicalUrl="https://siteoptz.ai/kids/learn/explorer/what-is-ai"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link 
            href="/kids/learn/explorer" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explorer Level
          </Link>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Lesson 1: What is AI?</span>
              <span>Step {currentSection + 1} of {sections.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-black border border-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8 min-h-[500px]">
            {sections[currentSection].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                currentSection === 0
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentSection < sections.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/kids/learn/explorer/understanding-prompts"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Next Lesson
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}