import React, { useState } from 'react';
import Layout from '../../../../components/Layout';
import SEOHead from '../../../../components/SEOHead';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Shield, CheckCircle, XCircle, AlertTriangle, Lightbulb, Brain } from 'lucide-react';

export default function AIEthicsPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

  const scenarios = [
    {
      situation: 'AI says 2+2=5',
      correct: 'Question it! AI can make mistakes',
      explanation: 'AI can get things wrong, especially with math. Always check facts!'
    },
    {
      situation: 'AI creates a story that seems unfair',
      correct: 'Think about it - is it fair?',
      explanation: 'AI learns from people, and sometimes people have unfair ideas. Use your own judgment!'
    },
    {
      situation: 'AI gives you an answer for homework',
      correct: 'Use it as a helper, not to copy',
      explanation: 'AI can help you learn, but copying answers doesn&apos;t help you understand!'
    },
    {
      situation: 'AI says something mean about someone',
      correct: 'That&apos;s not okay - tell an adult',
      explanation: 'AI should never be used to be mean. If you see something like this, tell a parent or teacher!'
    }
  ];

  const sections = [
    {
      title: 'Welcome!',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Shield className="w-20 h-20 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Is AI Always Right?</h2>
            <p className="text-lg text-gray-600">
              AI is amazing, but it&apos;s not perfect! Let&apos;s learn when to trust AI 
              and when to use your own brain to think about things.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'AI Makes Mistakes',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">AI Can Make Mistakes Too!</h3>
          
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
            <p className="text-lg text-gray-700 mb-4">
              Just like you and me, AI doesn&apos;t always get everything right. 
              Sometimes AI makes mistakes or gives answers that don&apos;t make sense.
            </p>
            <p className="text-gray-700">
              <strong>That&apos;s okay!</strong> The important thing is to think about what AI tells you 
              and use your own brain too!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="w-8 h-8 text-red-600" />
                <h4 className="font-bold text-lg">AI Got It Wrong</h4>
              </div>
              <p className="text-gray-700">
                Sometimes AI gives wrong answers, especially with:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Math problems</li>
                <li>• Facts about current events</li>
                <li>• Personal opinions</li>
                <li>• Very new information</li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h4 className="font-bold text-lg">Use Your Brain!</h4>
              </div>
              <p className="text-gray-700">
                Always think about what AI tells you:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Does it make sense?</li>
                <li>• Is it fair and kind?</li>
                <li>• Should I check with someone?</li>
                <li>• What do I think about this?</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'AI and Fairness',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">Is AI Always Fair?</h3>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <p className="text-lg text-gray-700 mb-4">
              AI learns from information created by people. Sometimes people have unfair ideas, 
              and AI can learn those unfair ideas too.
            </p>
            <p className="text-gray-700">
              <strong>Your job is to think:</strong> Is what AI is saying fair? Is it kind? 
              Does it treat everyone the same?
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Brain className="w-6 h-6 text-purple-600" />
                Think About This:
              </h4>
              <p className="text-gray-700 mb-3">
                If AI says something like &quot;only boys can be astronauts&quot; or 
                &quot;some people are better than others,&quot; that&apos;s not fair!
              </p>
              <p className="text-gray-600 text-sm">
                Everyone can be anything they want to be. AI might have learned wrong information, 
                but you know better!
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                What You Can Do:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Use your own judgment</li>
                <li>• Ask: &quot;Is this fair?&quot;</li>
                <li>• Talk to parents or teachers about things that seem unfair</li>
                <li>• Remember: Everyone deserves respect and kindness</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Using AI Responsibly',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">Using AI the Right Way</h3>

          <div className="space-y-4">
            <div className="bg-white border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">✅ Use AI as a Helper</h4>
                  <p className="text-gray-700">
                    AI is great for getting ideas, learning new things, and helping with homework. 
                    But it&apos;s a helper, not a replacement for your own thinking!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">✅ Check the Facts</h4>
                  <p className="text-gray-700">
                    If AI tells you something important, especially for school, 
                    check it with a teacher or parent. Better to be sure!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">❌ Don&apos;t Copy Without Learning</h4>
                  <p className="text-gray-700">
                    Using AI to write your whole essay without understanding it doesn&apos;t help you learn. 
                    Use AI to help you understand, then write in your own words!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">❌ Don&apos;t Be Mean</h4>
                  <p className="text-gray-700">
                    Never use AI to create mean messages, fake information, or hurt anyone. 
                    Being kind is always the right choice!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mt-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Remember:
            </h4>
            <p className="text-gray-700">
              AI is a tool, and like any tool, it&apos;s all about how you use it. 
              Use it to help you learn, create, and grow - not to skip learning or be unkind!
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Practice Scenarios',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">What Would You Do?</h3>
          <p className="text-lg text-gray-600 mb-6">
            Click on each scenario to see what you should do:
          </p>

          <div className="space-y-4">
            {scenarios.map((scenario, index) => (
              <button
                key={index}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all text-left w-full ${
                  selectedScenario === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
                onClick={() => setSelectedScenario(selectedScenario === index ? null : index)}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">Situation:</p>
                      <p className="text-gray-700 font-semibold">{scenario.situation}</p>
                    </div>
                    {selectedScenario === index && (
                      <div className="mt-4 space-y-3 animate-fadeIn">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-sm text-green-700 font-semibold mb-1">✅ What to do:</p>
                          <p className="text-gray-700">{scenario.correct}</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-gray-700">
                            <strong>Why:</strong> {scenario.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mt-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Key Takeaway:
            </h4>
            <p className="text-gray-700">
              Always use your brain along with AI! Think about what AI tells you, 
              check if it makes sense, and never be afraid to ask questions or get help from adults.
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
          <h2 className="text-3xl font-bold mb-4">Amazing Work! 🎉</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            You now understand AI ethics! Remember:
          </p>

          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto text-left">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">AI can make mistakes - always think about what it tells you</span>
              </li>
              <li className="flex items-start gap-3">
                <Brain className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Use your own judgment - is it fair? Is it kind?</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Use AI as a helper to learn, not to skip learning</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <span className="text-gray-700">Never use AI to be mean or create fake information</span>
              </li>
              <li className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <span className="text-gray-700">When in doubt, ask a parent or teacher!</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <p className="text-lg font-semibold text-gray-700 mb-4">Ready for the final challenge?</p>
            <Link
              href="/kids/learn/explorer/prompt-challenge"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Next: Prompt Engineering Challenge
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
        title="AI Ethics - Is AI Always Right? | siteoptz.ai Kids"
        description="Learn about AI ethics and when to trust AI. Critical thinking about AI for kids ages 8-10."
        canonicalUrl="https://siteoptz.ai/kids/learn/explorer/ai-ethics"
      />
      
      <Layout className="bg-gradient-to-b from-purple-50 via-blue-50 to-white">
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
              <span>Lesson 4: Is AI Always Right?</span>
              <span>Step {currentSection + 1} of {sections.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-600 to-blue-600 h-3 rounded-full transition-all duration-300"
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
                href="/kids/learn/explorer/prompt-challenge"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Next Lesson
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}