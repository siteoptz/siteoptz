import React from 'react';
import SEOHead from '../../../components/SEOHead';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles, Target, Users, Shield, CheckCircle } from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  href: string;
}

export default function ExplorerLevelPage() {
  const tutorials: Tutorial[] = [
    {
      id: 'what-is-ai',
      title: 'What is AI?',
      description: 'Learn what artificial intelligence is and how it works in simple terms',
      duration: '15 min',
      icon: <Sparkles className="w-6 h-6" />,
      href: '/kids/learn/explorer/what-is-ai'
    },
    {
      id: 'understanding-prompts',
      title: 'Understanding Prompts',
      description: 'Learn how to talk to AI and get the answers you want',
      duration: '20 min',
      icon: <BookOpen className="w-6 h-6" />,
      href: '/kids/learn/explorer/understanding-prompts'
    },
    {
      id: 'using-ai-tools',
      title: 'Using AI Tools Effectively',
      description: 'Discover how to use AI tools like ChatGPT and image generators the right way',
      duration: '25 min',
      icon: <Target className="w-6 h-6" />,
      href: '/kids/learn/explorer/using-ai-tools'
    },
    {
      id: 'ai-ethics',
      title: 'Is AI Always Right?',
      description: 'Learn about AI ethics and when to question what AI tells you',
      duration: '20 min',
      icon: <Shield className="w-6 h-6" />,
      href: '/kids/learn/explorer/ai-ethics'
    },
    {
      id: 'prompt-challenge',
      title: 'Prompt Engineering Challenge',
      description: 'Practice your prompt skills with fun challenges',
      duration: '30 min',
      icon: <Users className="w-6 h-6" />,
      href: '/kids/learn/explorer/prompt-challenge'
    }
  ];

  return (
    <>
      <SEOHead
        title="AI Explorer - Level 1 | siteoptz.ai Kids"
        description="Learn the basics of AI without code! Perfect for ages 8-10. Interactive lessons about what AI is, how to use it, and why it matters."
        canonicalUrl="https://siteoptz.ai/kids/learn/explorer"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <Link 
            href="/kids/learn" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Learning Hub
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Level 1: AI Explorer
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Perfect for ages 8-10
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Start your AI journey here! Learn what AI is, how to use it, and why it&apos;s important. 
              No coding required - just curiosity and fun!
            </p>
          </div>

          {/* Learning Goals */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">What You&apos;ll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">What AI Really Is</h3>
                  <p className="text-gray-600 text-sm">Understand AI in simple, fun terms</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">How to Talk to AI</h3>
                  <p className="text-gray-600 text-sm">Learn the art of writing good prompts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Using AI Tools</h3>
                  <p className="text-gray-600 text-sm">Get better results from AI tools</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">AI Ethics</h3>
                  <p className="text-gray-600 text-sm">Know when to trust AI and when to question it</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tutorials Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Tutorials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial, index) => (
                <Link
                  key={tutorial.id}
                  href={tutorial.href}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-blue-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-blue-600 group-hover:text-purple-600 transition">
                      {tutorial.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {tutorial.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-purple-600">Lesson {index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {tutorial.description}
                  </p>
                  <div className="mt-4 text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Start Learning →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Next Level CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Finished All Lessons?</h2>
            <p className="text-lg mb-6 opacity-90">
              Great job! You&apos;re ready to move to Level 2: AI Builder where you&apos;ll start building your own AI apps!
            </p>
            <Link
              href="/kids/learn"
              className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Explore More Levels
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}