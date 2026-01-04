import React, { useState } from 'react';
import SEOHead from '../../../../components/SEOHead';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertCircle, Lightbulb, Zap } from 'lucide-react';

export default function UsingAIToolsPage() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: 'Welcome!',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Target className="w-20 h-20 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Using AI Tools Effectively</h2>
            <p className="text-lg text-gray-600">
              Now that you know what AI is and how to write prompts, 
              let&apos;s learn how to use AI tools like ChatGPT and image generators the right way!
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Different AI Tools',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">Types of AI Tools</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                  💬
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Chat AI (like ChatGPT)</h4>
                  <p className="text-gray-700 mb-2">
                    These AI tools can talk with you, answer questions, write stories, 
                    help with homework, and explain things in simple ways.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Good for:</strong> Questions, stories, explanations, homework help
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                  🎨
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Image AI (like DALL-E, Midjourney)</h4>
                  <p className="text-gray-700 mb-2">
                    These AI tools create pictures and art from your descriptions. 
                    You describe what you want, and they draw it!
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Good for:</strong> Creating pictures, artwork, illustrations
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                  🎵
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Other AI Tools</h4>
                  <p className="text-gray-700 mb-2">
                    There are also AI tools for music, video, coding, and more! 
                    Each one is good at different things.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Good for:</strong> Creating music, videos, code, and other creative projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Tips for Using AI Tools',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">Top Tips for Using AI Tools</h3>

          <div className="space-y-4">
            <div className="bg-white border-2 border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">1. Start Simple</h4>
                  <p className="text-gray-700">
                    Begin with easy questions or requests. Once you see how the AI responds, 
                    you can ask more complicated things!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">2. Ask Follow-Up Questions</h4>
                  <p className="text-gray-700">
                    If the answer isn&apos;t quite right, ask again with more details! 
                    AI can have conversations with you, just like talking to a friend.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">3. Be Patient</h4>
                  <p className="text-gray-700">
                    Sometimes AI needs a moment to think! Creating images or complex answers 
                    can take a few seconds. Be patient and let it work.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Target className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">4. Try Different Prompts</h4>
                  <p className="text-gray-700">
                    If you don&apos;t like the first result, try asking the same question 
                    in a different way. Different words can give you different results!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">5. Check the Results</h4>
                  <p className="text-gray-700">
                    Always look at what AI gives you. If something seems wrong or doesn&apos;t make sense, 
                    ask again or check with a parent or teacher!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Common Mistakes to Avoid',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">Common Mistakes to Avoid</h3>

          <div className="space-y-4">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-red-700">Mistake 1: Being Too Vague</h4>
                  <p className="text-gray-700 mb-2">
                    <span className="italic">Bad:</span> &quot;Make something&quot;
                  </p>
                  <p className="text-gray-700">
                    <span className="italic">Better:</span> &quot;Create a picture of a blue dragon flying over a castle&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-red-700">Mistake 2: Not Giving Context</h4>
                  <p className="text-gray-700 mb-2">
                    <span className="italic">Bad:</span> &quot;Explain math&quot;
                  </p>
                  <p className="text-gray-700">
                    <span className="italic">Better:</span> &quot;Explain how to add fractions in a way a 10-year-old can understand&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2 text-red-700">Mistake 3: Giving Up Too Quickly</h4>
                  <p className="text-gray-700 mb-2">
                    If the first answer isn&apos;t perfect, try asking again with more details or 
                    ask a follow-up question. AI can learn from your conversation!
                  </p>
                  <p className="text-gray-700">
                    Remember: Practice makes perfect!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mt-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Good News!
            </h4>
            <p className="text-gray-700">
              Everyone makes mistakes when learning! The important thing is to keep trying 
              and learning from what works and what doesn&apos;t. Even AI experts are still learning!
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Practice Exercise',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">Let&apos;s Practice!</h3>
          <p className="text-lg text-gray-600 mb-6">
            Here are some scenarios. Think about what you would ask AI:
          </p>

          <div className="space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3">Scenario 1: Homework Help</h4>
              <p className="text-gray-700 mb-4">
                You need help understanding why the sky is blue for your science project.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-2">Good prompt:</p>
                <p className="text-gray-700 italic">
                  &quot;Explain why the sky is blue in simple words that a 10-year-old can understand&quot;
                </p>
              </div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3">Scenario 2: Creative Writing</h4>
              <p className="text-gray-700 mb-4">
                You want to write a story about a robot for a school assignment.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-2">Good prompt:</p>
                <p className="text-gray-700 italic">
                  &quot;Write a short story about a friendly robot who wants to learn how to paint, about 300 words&quot;
                </p>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3">Scenario 3: Creating Art</h4>
              <p className="text-gray-700 mb-4">
                You want to create a picture of your favorite animal in a cool style.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-2">Good prompt:</p>
                <p className="text-gray-700 italic">
                  &quot;Create an image of a golden retriever wearing sunglasses, in a cartoon style, colorful background&quot;
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mt-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Your Turn!
            </h4>
            <p className="text-gray-700">
              Try thinking of your own scenario and what prompt you would use. 
              Remember: be specific, give details, and say exactly what you need!
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
          <h2 className="text-3xl font-bold mb-4">Excellent Work! 🎉</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            You now know how to use AI tools effectively! Remember:
          </p>

          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto text-left">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Target className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">Different AI tools do different things - choose the right one for your task</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <span className="text-gray-700">Start simple, then ask follow-up questions</span>
              </li>
              <li className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Be specific and give details in your prompts</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <span className="text-gray-700">Always check the results - AI isn&apos;t always perfect!</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Practice makes perfect - keep trying and learning!</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <p className="text-lg font-semibold text-gray-700 mb-4">Ready for the next lesson?</p>
            <Link
              href="/kids/learn/explorer/ai-ethics"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Next: Is AI Always Right?
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
        title="Using AI Tools Effectively - AI Explorer | siteoptz.ai Kids"
        description="Learn how to use AI tools like ChatGPT and image generators effectively. Tips and tricks for kids ages 8-10."
        canonicalUrl="https://siteoptz.ai/kids/learn/explorer/using-ai-tools"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link 
            href="/kids/learn/explorer" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explorer Level
          </Link>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Lesson 3: Using AI Tools Effectively</span>
              <span>Step {currentSection + 1} of {sections.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 min-h-[500px]">
            {sections[currentSection].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                currentSection === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                href="/kids/learn/explorer/ai-ethics"
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