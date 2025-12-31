import React, { useState } from 'react';
import Layout from '../../../../components/Layout';
import SEOHead from '../../../../components/SEOHead';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Trophy, CheckCircle, Lightbulb, Target, Sparkles } from 'lucide-react';

export default function PromptChallengePage() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set());

  const challenges = [
    {
      title: 'Challenge 1: Story Time',
      description: 'You want AI to write you a story about a robot.',
      task: 'Write a better prompt that will get you a great story!',
      hint: 'Try adding: what kind of robot? how long should the story be? what should happen?',
      examplePrompt: 'Write a story',
      goodPrompt: 'Write a short, fun story about a friendly robot named Robby who discovers a hidden garden. Make it about 200 words and include a happy ending.',
      tips: [
        'Specify the character details (name, personality)',
        'Include what happens in the story',
        'Say how long it should be',
        'Add what kind of ending you want'
      ]
    },
    {
      title: 'Challenge 2: Homework Helper',
      description: 'You need help understanding why we have seasons on Earth.',
      task: 'Write a prompt that will help you learn about seasons.',
      hint: 'Try adding: who is this for? how should it be explained? what details do you need?',
      examplePrompt: 'Tell me about seasons',
      goodPrompt: 'Explain why we have seasons on Earth in simple words that a 10-year-old can understand. Include why some places are hot while others are cold at the same time.',
      tips: [
        'Say who it&apos;s for (your age helps!)',
        'Ask for simple explanations',
        'Include what specifically you want to know',
        'Mention examples if helpful'
      ]
    },
    {
      title: 'Challenge 3: Creative Art',
      description: 'You want to create a picture of your favorite animal in a cool style.',
      task: 'Write a prompt for an AI image generator.',
      hint: 'Try adding: what animal? what style? what colors? what setting?',
      examplePrompt: 'Make a picture of an animal',
      goodPrompt: 'Create an image of a majestic lion with a golden mane, in a digital art style, standing on a rocky cliff at sunset, vibrant orange and purple sky in the background.',
      tips: [
        'Be specific about the animal',
        'Describe the style you want (cartoon, realistic, etc.)',
        'Include colors and mood',
        'Add details about the setting or background'
      ]
    },
    {
      title: 'Challenge 4: Fun Facts',
      description: 'You want to learn interesting things about space for a school project.',
      task: 'Write a prompt to get fun, accurate facts about space.',
      hint: 'Try adding: how many facts? what topics? what level of detail?',
      examplePrompt: 'Tell me about space',
      goodPrompt: 'Give me 5 fun and interesting facts about planets in our solar system, explained in a way that a 9-year-old can understand. Include one fact about each of these planets: Jupiter, Saturn, Mars, and Neptune.',
      tips: [
        'Say exactly how many facts you want',
        'Specify the topic (planets, not just space)',
        'Mention the age level for explanations',
        'Ask for specific examples if needed'
      ]
    },
    {
      title: 'Challenge 5: Problem Solver',
      description: 'You want help thinking of ideas for a school science fair project.',
      task: 'Write a prompt that will give you good project ideas.',
      hint: 'Try adding: what grade are you in? what interests you? what materials do you have?',
      examplePrompt: 'Give me a science project',
      goodPrompt: 'Suggest 3 fun science fair project ideas for a 4th grader who likes nature and plants. The projects should use materials I can find at home, and each should teach something about how plants grow.',
      tips: [
        'Include your grade or age level',
        'Mention what you&apos;re interested in',
        'Say what materials you have access to',
        'Specify how many ideas you want'
      ]
    }
  ];

  const handleAnswerChange = (challengeIndex: number, value: string) => {
    setUserAnswers({
      ...userAnswers,
      [challengeIndex]: value
    });
  };

  const toggleHint = (challengeIndex: number) => {
    setShowHints({
      ...showHints,
      [challengeIndex]: !showHints[challengeIndex]
    });
  };

  const markComplete = (challengeIndex: number) => {
    setCompletedChallenges(new Set([...completedChallenges, challengeIndex]));
  };

  const currentChallengeData = challenges[currentChallenge];
  const isComplete = completedChallenges.has(currentChallenge);

  return (
    <>
      <SEOHead
        title="Prompt Engineering Challenge - AI Explorer | siteoptz.ai Kids"
        description="Practice your prompt engineering skills with fun challenges! Perfect for kids ages 8-10."
        canonicalUrl="https://siteoptz.ai/kids/learn/explorer/prompt-challenge"
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

          {/* Header */}
          <div className="text-center mb-8">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Prompt Engineering Challenge
            </h1>
            <p className="text-lg text-gray-600">
              Practice what you&apos;ve learned! Complete all 5 challenges to become a prompt master!
            </p>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-gray-600">
                Challenge {currentChallenge + 1} of {challenges.length}
              </span>
              <span className="text-sm font-semibold text-gray-600">
                Completed: {completedChallenges.size} / {challenges.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-yellow-500 to-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedChallenges.size / challenges.length) * 100}%` }}
              />
            </div>
            <div className="flex gap-2 mt-4">
              {challenges.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded ${
                    completedChallenges.has(index)
                      ? 'bg-green-500'
                      : index === currentChallenge
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Challenge Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold">{currentChallengeData.title}</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">{currentChallengeData.description}</p>
              <p className="font-semibold text-gray-800 mb-6">{currentChallengeData.task}</p>
            </div>

            {/* Bad Example */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
              <p className="text-sm text-red-700 font-semibold mb-2">❌ Weak Prompt:</p>
              <p className="text-gray-700 italic bg-white p-3 rounded">&quot;{currentChallengeData.examplePrompt}&quot;</p>
              <p className="text-sm text-gray-600 mt-2">Why is this weak? It&apos;s too vague and doesn&apos;t give enough details!</p>
            </div>

            {/* User Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                ✍️ Your Better Prompt:
              </label>
              <textarea
                value={userAnswers[currentChallenge] || ''}
                onChange={(e) => handleAnswerChange(currentChallenge, e.target.value)}
                placeholder="Write your improved prompt here..."
                className="w-full h-32 p-4 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-gray-700"
              />
            </div>

            {/* Hint */}
            <div className="mb-6">
              <button
                onClick={() => toggleHint(currentChallenge)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-3"
              >
                <Lightbulb className="w-5 h-5" />
                {showHints[currentChallenge] ? 'Hide Hint' : 'Show Hint'}
              </button>
              {showHints[currentChallenge] && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                  <p className="text-gray-700">{currentChallengeData.hint}</p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Tips for This Challenge:
              </h3>
              <ul className="space-y-2">
                {currentChallengeData.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Show Answer */}
            {userAnswers[currentChallenge] && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <p className="text-sm text-green-700 font-semibold mb-2">✅ Example of a Great Prompt:</p>
                <p className="text-gray-700 italic bg-white p-4 rounded mb-3">&quot;{currentChallengeData.goodPrompt}&quot;</p>
                <p className="text-sm text-gray-600">
                  Compare your prompt to this one! Did you include specific details? Did you say what you want clearly?
                </p>
              </div>
            )}

            {/* Complete Button */}
            {userAnswers[currentChallenge] && !isComplete && (
              <button
                onClick={() => markComplete(currentChallenge)}
                className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-6 h-6" />
                Mark Challenge Complete!
              </button>
            )}

            {isComplete && (
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl p-6 text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                <p className="text-xl font-bold">Great job! Challenge {currentChallenge + 1} complete! 🎉</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentChallenge(Math.max(0, currentChallenge - 1))}
              disabled={currentChallenge === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                currentChallenge === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Challenge
            </button>

            {currentChallenge < challenges.length - 1 ? (
              <button
                onClick={() => setCurrentChallenge(currentChallenge + 1)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Next Challenge
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="text-center">
                {completedChallenges.size === challenges.length ? (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 text-white">
                    <Trophy className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-4">🏆 Congratulations! 🏆</h2>
                    <p className="text-xl mb-6">You&apos;ve completed all challenges! You&apos;re now a Prompt Master!</p>
                    <Link
                      href="/kids/learn/explorer"
                      className="inline-block px-8 py-4 bg-white text-orange-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
                    >
                      Back to Explorer Level
                    </Link>
                  </div>
                ) : (
                  <p className="text-gray-600 font-semibold">
                    Complete all challenges to become a Prompt Master! 🏆
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}