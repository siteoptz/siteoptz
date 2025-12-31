import React, { useState } from 'react';
import Layout from '../../../../components/Layout';
import SEOHead from '../../../../components/SEOHead';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MessageSquare, Lightbulb, CheckCircle, XCircle } from 'lucide-react';

export default function UnderstandingPromptsPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  const examples = [
    {
      prompt: 'Tell me about dogs',
      rating: 'okay',
      better: 'Tell me 3 fun facts about golden retrievers',
      explanation: 'The better prompt is more specific! AI works better when you tell it exactly what you want.'
    },
    {
      prompt: 'Make a story',
      rating: 'okay',
      better: 'Write a short story about a robot who learns to paint, about 200 words',
      explanation: 'Adding details like the topic and length helps AI create exactly what you need!'
    },
    {
      prompt: 'What is space?',
      rating: 'good',
      better: 'Explain what space is in simple words that a 8-year-old can understand',
      explanation: 'Telling AI who the answer is for helps it use the right words and examples!'
    }
  ];

  const sections = [
    {
      title: 'What is a Prompt?',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <MessageSquare className="w-20 h-20 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Understanding Prompts</h2>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <p className="text-lg text-gray-700 mb-4">
              A <strong className="text-blue-600">prompt</strong> is like a question or instruction you give to AI.
            </p>
            <p className="text-lg text-gray-700">
              Just like when you ask your teacher or parent a question, you use prompts to ask AI things!
            </p>
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Example Prompts:
            </h3>
            <div className="space-y-3">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-gray-700">&quot;Tell me a joke about robots&quot;</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700">&quot;Write a story about a magical forest&quot;</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-700">&quot;Explain how rainbows are made in simple words&quot;</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Why Prompts Matter',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">Why Do Prompts Matter?</h3>
          
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
            <p className="text-lg text-gray-700 mb-4">
              <strong>Better prompts = Better answers!</strong>
            </p>
            <p className="text-gray-700">
              When you give clear, specific instructions to AI, you get better results. 
              It&apos;s like the difference between saying &quot;draw a picture&quot; vs 
              &quot;draw a picture of a purple cat wearing a hat.&quot;
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-6 h-6 text-red-600" />
                <h4 className="font-bold text-lg">Vague Prompt</h4>
              </div>
              <p className="text-gray-700 italic mb-3">&quot;Tell me about animals&quot;</p>
              <p className="text-sm text-gray-600">
                AI might tell you about ALL animals, which could be too much information!
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h4 className="font-bold text-lg">Specific Prompt</h4>
              </div>
              <p className="text-gray-700 italic mb-3">&quot;Tell me 3 interesting facts about penguins&quot;</p>
              <p className="text-sm text-gray-600">
                AI knows exactly what you want - 3 facts, about penguins, and make them interesting!
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'How to Write Good Prompts',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">Tips for Great Prompts</h3>

          <div className="space-y-4">
            <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Be Specific</h4>
                  <p className="text-gray-600 mb-2">
                    Instead of: &quot;Write a story&quot;
                  </p>
                  <p className="text-gray-700">
                    Try: &quot;Write a short story about a dragon who is afraid of fire&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Give Details</h4>
                  <p className="text-gray-600 mb-2">
                    Instead of: &quot;Tell me about space&quot;
                  </p>
                  <p className="text-gray-700">
                    Try: &quot;Explain what planets are, using simple words for kids&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Say How Much</h4>
                  <p className="text-gray-600 mb-2">
                    Instead of: &quot;Give me facts&quot;
                  </p>
                  <p className="text-gray-700">
                    Try: &quot;Give me 5 fun facts about sharks&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Be Polite</h4>
                  <p className="text-gray-700">
                    Using &quot;please&quot; doesn&apos;t change the answer, but it&apos;s always nice! 
                    AI likes polite prompts just like people do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Practice Examples',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">Let&apos;s Practice!</h3>
          <p className="text-lg text-gray-600 mb-6">
            Click on each example to see how we can make the prompt better:
          </p>

          <div className="space-y-6">
            {examples.map((example, index) => (
              <button
                key={index}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all text-left w-full ${
                  selectedExample === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
                onClick={() => setSelectedExample(selectedExample === index ? null : index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 ${
                    example.rating === 'okay' ? 'bg-yellow-500' : 'bg-green-500'
                  } text-white`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">Original Prompt:</p>
                      <p className="text-gray-700 italic bg-gray-50 p-3 rounded">&quot;{example.prompt}&quot;</p>
                    </div>
                    {selectedExample === index && (
                      <div className="mt-4 space-y-3 animate-fadeIn">
                        <div>
                          <p className="text-sm text-green-600 font-semibold mb-1">Better Prompt:</p>
                          <p className="text-gray-700 italic bg-green-50 p-3 rounded">&quot;{example.better}&quot;</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-gray-700">
                            <strong>Why it&apos;s better:</strong> {example.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mt-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              Remember!
            </h4>
            <p className="text-gray-700">
              The more details you give AI, the better it can help you! 
              It&apos;s like giving your friend clear directions instead of saying &quot;go somewhere.&quot;
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
          <h2 className="text-3xl font-bold mb-4">Great Job! 🎉</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            You now know how to write great prompts! Remember:
          </p>

          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto text-left">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">A <strong>prompt</strong> is how you talk to AI</span>
              </li>
              <li className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <span className="text-gray-700">Be <strong>specific</strong> - tell AI exactly what you want</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Add <strong>details</strong> - the more information, the better the answer</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Practice makes perfect - try different prompts and see what works!</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <p className="text-lg font-semibold text-gray-700 mb-4">Ready for the next lesson?</p>
            <Link
              href="/kids/learn/explorer/using-ai-tools"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Next: Using AI Tools Effectively
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
        title="Understanding Prompts - AI Explorer | siteoptz.ai Kids"
        description="Learn how to write great prompts to get better answers from AI. Perfect for kids ages 8-10."
        canonicalUrl="https://siteoptz.ai/kids/learn/explorer/understanding-prompts"
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
              <span>Lesson 2: Understanding Prompts</span>
              <span>Step {currentSection + 1} of {sections.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
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
                href="/kids/learn/explorer/using-ai-tools"
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