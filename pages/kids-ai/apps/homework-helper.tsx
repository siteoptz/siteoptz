import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Question {
  id: string;
  subject: string;
  question: string;
  answer: string;
  explanation: string;
  difficulty: 'elementary' | 'middle' | 'high';
}

interface HelpSession {
  id: string;
  questions: Question[];
  currentQuestionIndex: number;
  startTime: Date;
}

export default function HomeworkHelper() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [gradeLevel, setGradeLevel] = useState<string>('');
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [currentSession, setCurrentSession] = useState<HelpSession | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: '🔢', description: 'Algebra, geometry, arithmetic, and more' },
    { id: 'science', name: 'Science', icon: '🔬', description: 'Biology, chemistry, physics, earth science' },
    { id: 'english', name: 'English', icon: '📚', description: 'Reading, writing, grammar, literature' },
    { id: 'history', name: 'History', icon: '🏛️', description: 'World history, American history, civics' },
    { id: 'geography', name: 'Geography', icon: '🌍', description: 'World geography, maps, cultures' },
    { id: 'other', name: 'Other', icon: '❓', description: 'Ask about any other subject' }
  ];

  const gradeLevels = [
    { id: 'elementary', name: 'Elementary (K-5)', ages: 'Ages 5-11' },
    { id: 'middle', name: 'Middle School (6-8)', ages: 'Ages 11-14' },
    { id: 'high', name: 'High School (9-12)', ages: 'Ages 14-18' }
  ];

  const sampleQuestions: { [key: string]: Question[] } = {
    math: [
      {
        id: '1',
        subject: 'Math',
        question: 'What is 15 × 12?',
        answer: '180',
        explanation: 'To multiply 15 × 12, you can break it down: 15 × 10 = 150, and 15 × 2 = 30. Then add them: 150 + 30 = 180.',
        difficulty: 'elementary'
      },
      {
        id: '2',
        subject: 'Math',
        question: 'Solve for x: 2x + 5 = 15',
        answer: 'x = 5',
        explanation: 'Subtract 5 from both sides: 2x = 10. Then divide both sides by 2: x = 5.',
        difficulty: 'middle'
      }
    ],
    science: [
      {
        id: '3',
        subject: 'Science',
        question: 'What are the three states of matter?',
        answer: 'Solid, liquid, and gas',
        explanation: 'Matter exists in three main states: solid (particles are tightly packed), liquid (particles are close but can move), and gas (particles are spread out and move freely).',
        difficulty: 'elementary'
      }
    ],
    english: [
      {
        id: '4',
        subject: 'English',
        question: 'What is a metaphor?',
        answer: 'A comparison without using &quot;like&quot; or &quot;as&quot;',
        explanation: 'A metaphor directly compares two unlike things without using &quot;like&quot; or &quot;as&quot;. For example: &quot;Life is a journey&quot; compares life to a journey.',
        difficulty: 'middle'
      }
    ]
  };

  const askQuestion = async () => {
    if (!userQuestion.trim() || !selectedSubject || !gradeLevel) return;

    setIsThinking(true);

    // Simulate AI processing
    setTimeout(() => {
      const relevantQuestions = sampleQuestions[selectedSubject] || [];
      const question = relevantQuestions[0] || {
        id: 'custom',
        subject: selectedSubject,
        question: userQuestion,
        answer: 'Let me help you with that step by step...',
        explanation: 'This is a great question! Here\'s how we can approach it: First, let\'s break down what we know. Then, we\'ll work through the solution together.',
        difficulty: gradeLevel as any
      };

      const session: HelpSession = {
        id: Date.now().toString(),
        questions: [question],
        currentQuestionIndex: 0,
        startTime: new Date()
      };

      setCurrentSession(session);
      setIsThinking(false);
    }, 2000);
  };

  const endSession = () => {
    setCurrentSession(null);
    setUserQuestion('');
    setSelectedSubject('');
    setGradeLevel('');
  };

  const currentQuestion = currentSession?.questions[currentSession.currentQuestionIndex];

  return (
    <>
      <Head>
        <title>SiteOptz Homework Helper - Safe AI Homework Assistance</title>
        <meta name="description" content="Get safe, educational homework help with step-by-step explanations" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-green-900 to-black py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="text-center mb-8">
            <Link href="/kids-ai" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              📝 SiteOptz Homework Helper
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Get safe, step-by-step homework help!
            </p>
            
            {/* Safety Badges */}
            <div className="flex justify-center gap-4 mb-8">
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🛡️ COPPA Safe
              </span>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                👨‍👩‍👧‍👦 Parent Oversight
              </span>
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                📚 Educational Focus
              </span>
            </div>
          </header>

          {/* Question Form */}
          {!currentSession && (
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                🤔 What do you need help with today?
              </h2>
              
              {/* Grade Level Selection */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">Choose your grade level:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {gradeLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setGradeLevel(level.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        gradeLevel === level.id
                          ? 'border-blue-400 bg-blue-600/20 text-white'
                          : 'border-gray-600 bg-gray-800 hover:border-gray-400 text-gray-300'
                      }`}
                    >
                      <h4 className="font-semibold">{level.name}</h4>
                      <p className="text-sm opacity-80">{level.ages}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Selection */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">Choose your subject:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedSubject === subject.id
                          ? 'border-green-400 bg-green-600/20 text-white'
                          : 'border-gray-600 bg-gray-800 hover:border-gray-400 text-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{subject.icon}</div>
                      <h4 className="font-semibold">{subject.name}</h4>
                      <p className="text-sm opacity-80">{subject.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Input */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">Ask your question:</h3>
                <textarea
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Type your homework question here... Be as specific as possible!"
                  className="w-full h-32 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none resize-none"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={askQuestion}
                  disabled={!userQuestion.trim() || !selectedSubject || !gradeLevel || isThinking}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isThinking ? '🤔 Thinking...' : '🚀 Get Help!'}
                </button>
              </div>
            </div>
          )}

          {/* AI Response */}
          {currentSession && currentQuestion && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">🤖</div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Your AI Homework Assistant</h3>
                    <p className="text-gray-400">{currentQuestion.subject} • Safe Learning Mode</p>
                  </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-600 rounded-lg p-6 mb-6">
                  <h4 className="text-blue-400 font-semibold mb-3">📋 Your Question:</h4>
                  <p className="text-white text-lg">{currentQuestion.question}</p>
                </div>

                <div className="bg-green-600/10 border border-green-600 rounded-lg p-6 mb-6">
                  <h4 className="text-green-400 font-semibold mb-3">✅ Answer:</h4>
                  <p className="text-white text-lg font-semibold">{currentQuestion.answer}</p>
                </div>

                <div className="bg-purple-600/10 border border-purple-600 rounded-lg p-6 mb-6">
                  <h4 className="text-purple-400 font-semibold mb-3">💡 Step-by-Step Explanation:</h4>
                  <p className="text-white leading-relaxed">{currentQuestion.explanation}</p>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={endSession}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    📝 Ask Another Question
                  </button>
                  <button
                    onClick={() => alert('Great job! This answer has been saved to your learning history.')}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    💾 Save This Help
                  </button>
                </div>
              </div>

              {/* Study Tips */}
              <div className="bg-yellow-600/10 border border-yellow-600 rounded-lg p-6">
                <h4 className="text-yellow-400 font-semibold mb-3">💡 Study Tips:</h4>
                <ul className="text-yellow-200 space-y-2">
                  <li>• Try to work through similar problems on your own to practice</li>
                  <li>• Ask your teacher if you need clarification on any concepts</li>
                  <li>• Review your notes and textbook for additional examples</li>
                  <li>• Don&apos;t hesitate to ask for help when you need it!</li>
                </ul>
              </div>
            </div>
          )}

          {/* Quick Help Examples */}
          {!currentSession && (
            <div className="mt-8 bg-gray-900 rounded-2xl p-8">
              <h3 className="text-white font-bold text-xl text-center mb-6">💡 Example Questions I Can Help With:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-600/10 border border-blue-600 rounded-lg p-4">
                  <h4 className="text-blue-400 font-semibold mb-2">🔢 Math Examples:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• &quot;How do I solve 3x + 7 = 22?&quot;</li>
                    <li>• &quot;What&apos;s the area of a triangle?&quot;</li>
                    <li>• &quot;How do I add fractions?&quot;</li>
                  </ul>
                </div>
                <div className="bg-green-600/10 border border-green-600 rounded-lg p-4">
                  <h4 className="text-green-400 font-semibold mb-2">🔬 Science Examples:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• &quot;What is photosynthesis?&quot;</li>
                    <li>• &quot;How does gravity work?&quot;</li>
                    <li>• &quot;What are the parts of a cell?&quot;</li>
                  </ul>
                </div>
                <div className="bg-purple-600/10 border border-purple-600 rounded-lg p-4">
                  <h4 className="text-purple-400 font-semibold mb-2">📚 English Examples:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• &quot;What&apos;s the difference between a simile and metaphor?&quot;</li>
                    <li>• &quot;How do I write a thesis statement?&quot;</li>
                    <li>• &quot;What are the parts of speech?&quot;</li>
                  </ul>
                </div>
                <div className="bg-orange-600/10 border border-orange-600 rounded-lg p-4">
                  <h4 className="text-orange-400 font-semibold mb-2">🏛️ History Examples:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• &quot;What caused the American Revolution?&quot;</li>
                    <li>• &quot;Who were the ancient Greeks?&quot;</li>
                    <li>• &quot;What was the Industrial Revolution?&quot;</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Safety Information */}
          <div className="mt-12 bg-green-600/10 border border-green-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-4">🛡️ Safe Homework Help</h3>
            <ul className="text-green-300 space-y-2">
              <li>✅ All explanations promote understanding, not just giving answers</li>
              <li>✅ Content is age-appropriate and curriculum-aligned</li>
              <li>✅ Parents can review all homework help sessions</li>
              <li>✅ No external links or unsafe content</li>
              <li>✅ Encourages learning and academic integrity</li>
              <li>✅ COPPA compliant with complete privacy protection</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}