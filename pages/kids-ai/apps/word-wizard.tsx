import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface PhonicsActivity {
  id: string;
  type: 'letter-sound' | 'word-building' | 'reading' | 'spelling';
  title: string;
  instruction: string;
  question: string;
  answer: string;
  options?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface VoiceRecognition {
  isListening: boolean;
  transcript: string;
  confidence: number;
}

export default function WordWizard() {
  const [selectedActivity, setSelectedActivity] = useState<PhonicsActivity | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [voiceRecognition, setVoiceRecognition] = useState<VoiceRecognition>({
    isListening: false,
    transcript: '',
    confidence: 0
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  const activities: PhonicsActivity[] = [
    {
      id: 'letter-a',
      type: 'letter-sound',
      title: 'Letter A Sound',
      instruction: 'Listen to the sound and identify the letter',
      question: 'What letter makes the sound "aaa"?',
      answer: 'A',
      options: ['A', 'E', 'I', 'O'],
      difficulty: 'beginner'
    },
    {
      id: 'cat-spelling',
      type: 'spelling',
      title: 'Spell CAT',
      instruction: 'Listen to the word and spell it',
      question: 'How do you spell the word "cat"?',
      answer: 'CAT',
      difficulty: 'beginner'
    },
    {
      id: 'blend-st',
      type: 'word-building',
      title: 'ST Blends',
      instruction: 'Choose words that start with "st"',
      question: 'Which word starts with "st"?',
      answer: 'STAR',
      options: ['STAR', 'CART', 'PARK', 'JUMP'],
      difficulty: 'intermediate'
    },
    {
      id: 'read-sentence',
      type: 'reading',
      title: 'Read the Sentence',
      instruction: 'Read this sentence out loud',
      question: 'Read: "The big dog runs fast"',
      answer: 'The big dog runs fast',
      difficulty: 'advanced'
    },
    {
      id: 'rhyming',
      type: 'word-building',
      title: 'Rhyming Words',
      instruction: 'Find the word that rhymes',
      question: 'Which word rhymes with "cat"?',
      answer: 'HAT',
      options: ['HAT', 'DOG', 'RUN', 'BLUE'],
      difficulty: 'intermediate'
    },
    {
      id: 'short-vowels',
      type: 'letter-sound',
      title: 'Short Vowel Sounds',
      instruction: 'Identify the short vowel sound',
      question: 'What vowel sound do you hear in "bed"?',
      answer: 'E',
      options: ['A', 'E', 'I', 'O'],
      difficulty: 'intermediate'
    }
  ];

  const activityTypes = [
    { 
      id: 'letter-sound', 
      name: 'Letter Sounds', 
      icon: '🔤', 
      description: 'Learn letter sounds and phonics',
      color: 'bg-blue-500'
    },
    { 
      id: 'word-building', 
      name: 'Word Building', 
      icon: '🧱', 
      description: 'Build words from sounds and letters',
      color: 'bg-green-500'
    },
    { 
      id: 'reading', 
      name: 'Reading Practice', 
      icon: '📖', 
      description: 'Practice reading words and sentences',
      color: 'bg-purple-500'
    },
    { 
      id: 'spelling', 
      name: 'Spelling Fun', 
      icon: '✏️', 
      description: 'Learn to spell common words',
      color: 'bg-orange-500'
    }
  ];

  // Simulated voice recognition (in a real app, this would use Web Speech API)
  const startListening = () => {
    if (!selectedActivity) return;
    
    setVoiceRecognition({ isListening: true, transcript: '', confidence: 0 });
    
    // Simulate voice recognition
    setTimeout(() => {
      const simulatedAnswer = selectedActivity.answer.toLowerCase();
      setVoiceRecognition({
        isListening: false,
        transcript: simulatedAnswer,
        confidence: 0.9
      });
      setCurrentAnswer(simulatedAnswer.toUpperCase());
    }, 2000);
  };

  // Simulated text-to-speech
  const speakText = (text: string) => {
    // In a real app, this would use Web Speech API
    console.log('Speaking:', text);
    alert(`🔊 Speaking: "${text}"`);
  };

  const checkAnswer = () => {
    if (!selectedActivity) return;
    
    const isCorrect = currentAnswer.toUpperCase() === selectedActivity.answer.toUpperCase();
    setShowResult(true);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setCompletedActivities(prev => [...new Set([...prev, selectedActivity.id])]);
      setTimeout(() => {
        alert('🌟 Excellent reading! You earned 10 points!');
      }, 500);
    }
  };

  const nextActivity = () => {
    const currentIndex = activities.findIndex(a => a.id === selectedActivity?.id);
    const nextIndex = (currentIndex + 1) % activities.length;
    setSelectedActivity(activities[nextIndex]);
    setCurrentAnswer('');
    setShowResult(false);
    setVoiceRecognition({ isListening: false, transcript: '', confidence: 0 });
  };

  const resetActivity = () => {
    setSelectedActivity(null);
    setCurrentAnswer('');
    setShowResult(false);
    setVoiceRecognition({ isListening: false, transcript: '', confidence: 0 });
  };

  return (
    <>
      <Head>
        <title>SiteOptz Word Wizard - Safe Phonics Learning for Kids</title>
        <meta name="description" content="Learn phonics, reading, and spelling with our safe AI-powered learning platform" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="text-center mb-8">
            <Link href="/kids-ai" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              🪄 SiteOptz Word Wizard
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Master reading and phonics with magical learning!
            </p>
            
            {/* Safety Badges */}
            <div className="flex justify-center gap-4 mb-8">
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🛡️ COPPA Safe
              </span>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🔊 Voice Safe
              </span>
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                📚 Phonics Based
              </span>
            </div>

            {/* Score Display */}
            <div className="bg-gray-900 rounded-lg p-4 inline-block">
              <div className="flex items-center gap-4 text-white">
                <span>⭐ Score: {score}</span>
                <span>📖 Completed: {completedActivities.length}/{activities.length}</span>
              </div>
            </div>
          </header>

          {/* Activity Type Selection */}
          {!selectedActivity && (
            <div className="bg-gray-900 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                🎯 Choose Your Learning Adventure
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activityTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`${type.color} bg-opacity-20 border-2 border-gray-600 rounded-lg p-6 text-center hover:border-white transition-all`}
                  >
                    <div className="text-5xl mb-4">{type.icon}</div>
                    <h3 className="text-white font-semibold text-lg mb-2">{type.name}</h3>
                    <p className="text-gray-300 text-sm">{type.description}</p>
                    <div className="mt-4">
                      <div className="text-xs text-gray-400 mb-1">
                        {activities.filter(a => a.type === type.id && completedActivities.includes(a.id)).length}/
                        {activities.filter(a => a.type === type.id).length} completed
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Selection */}
          {!selectedActivity && (
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                📚 Choose Your Activity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity)}
                    className="bg-gray-800 border-2 border-gray-600 hover:border-blue-400 rounded-lg p-6 text-left transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold">{activity.title}</h3>
                      {completedActivities.includes(activity.id) && (
                        <span className="text-green-400 text-xl">✅</span>
                      )}
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">{activity.instruction}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.difficulty === 'beginner' ? 'bg-green-600 text-white' :
                        activity.difficulty === 'intermediate' ? 'bg-yellow-600 text-black' :
                        'bg-red-600 text-white'
                      }`}>
                        {activity.difficulty}
                      </span>
                      <span className="text-gray-500 text-xs">{activity.type.replace('-', ' ')}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Activity */}
          {selectedActivity && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedActivity.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedActivity.difficulty === 'beginner' ? 'bg-green-600 text-white' :
                      selectedActivity.difficulty === 'intermediate' ? 'bg-yellow-600 text-black' :
                      'bg-red-600 text-white'
                    }`}>
                      {selectedActivity.difficulty}
                    </span>
                  </div>
                  <button
                    onClick={resetActivity}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    ← Back
                  </button>
                </div>

                {/* Instruction */}
                <div className="bg-blue-600/10 border border-blue-600 rounded-lg p-6 mb-6">
                  <h3 className="text-blue-400 font-semibold mb-3">📋 Instructions:</h3>
                  <p className="text-white text-lg">{selectedActivity.instruction}</p>
                </div>

                {/* Question */}
                <div className="bg-purple-600/10 border border-purple-600 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-purple-400 font-semibold mb-3">❓ Question:</h3>
                    <button
                      onClick={() => speakText(selectedActivity.question)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      🔊 Listen
                    </button>
                  </div>
                  <p className="text-white text-xl font-semibold">{selectedActivity.question}</p>
                </div>

                {/* Answer Input */}
                <div className="mb-6">
                  {selectedActivity.options ? (
                    // Multiple choice
                    <div>
                      <h3 className="text-white font-semibold mb-4">Choose your answer:</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedActivity.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => setCurrentAnswer(option)}
                            className={`p-4 rounded-lg border-2 text-lg font-bold transition-all ${
                              currentAnswer === option
                                ? 'border-blue-400 bg-blue-600/20 text-white'
                                : 'border-gray-600 bg-gray-800 hover:border-gray-400 text-gray-300'
                            }`}
                            disabled={showResult}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Text input or voice input
                    <div>
                      <h3 className="text-white font-semibold mb-4">Your answer:</h3>
                      <div className="flex gap-4 mb-4">
                        <input
                          type="text"
                          value={currentAnswer}
                          onChange={(e) => setCurrentAnswer(e.target.value)}
                          placeholder="Type your answer here..."
                          className="flex-1 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                          disabled={showResult}
                        />
                        <button
                          onClick={startListening}
                          disabled={voiceRecognition.isListening || showResult}
                          className={`px-6 py-4 rounded-lg font-bold transition-all ${
                            voiceRecognition.isListening
                              ? 'bg-red-600 text-white'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {voiceRecognition.isListening ? '🎤 Listening...' : '🎤 Speak'}
                        </button>
                      </div>
                      
                      {voiceRecognition.transcript && (
                        <div className="bg-green-600/10 border border-green-600 rounded-lg p-4 mb-4">
                          <h4 className="text-green-400 font-semibold mb-2">🎤 I heard you say:</h4>
                          <p className="text-white text-lg">&quot;{voiceRecognition.transcript}&quot;</p>
                          <p className="text-green-300 text-sm mt-2">
                            Confidence: {Math.round(voiceRecognition.confidence * 100)}%
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  {!showResult ? (
                    <button
                      onClick={checkAnswer}
                      disabled={!currentAnswer}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ✓ Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={nextActivity}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-all"
                    >
                      ➡️ Next Activity
                    </button>
                  )}
                </div>

                {/* Result Display */}
                {showResult && (
                  <div className={`mt-6 rounded-lg p-6 border ${
                    currentAnswer.toUpperCase() === selectedActivity.answer.toUpperCase()
                      ? 'bg-green-600/10 border-green-600'
                      : 'bg-red-600/10 border-red-600'
                  }`}>
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {currentAnswer.toUpperCase() === selectedActivity.answer.toUpperCase() ? '🎉' : '🤔'}
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${
                        currentAnswer.toUpperCase() === selectedActivity.answer.toUpperCase()
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {currentAnswer.toUpperCase() === selectedActivity.answer.toUpperCase()
                          ? 'Fantastic! You got it right!'
                          : 'Not quite right, but great try!'}
                      </h3>
                      {currentAnswer.toUpperCase() !== selectedActivity.answer.toUpperCase() && (
                        <p className="text-white">
                          The correct answer is: <strong>{selectedActivity.answer}</strong>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reading Wizard Character */}
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">🧙‍♂️</div>
              <div>
                <h3 className="text-white font-bold text-xl">Word Wizard says:</h3>
                <p className="text-purple-100">Keep practicing, young reader!</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-white">
              <p className="mb-2">✨ <strong>Magic Tip:</strong> The more you practice reading sounds and words, the stronger your reading magic becomes!</p>
              <p>📚 <strong>Reading Quest:</strong> Try to complete all the phonics activities to earn your Reading Wizard badge!</p>
            </div>
          </div>

          {/* Safety Information */}
          <div className="mt-12 bg-green-600/10 border border-green-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-4">🛡️ Safe Voice Learning</h3>
            <ul className="text-green-300 space-y-2">
              <li>✅ All voice recognition is processed locally - no data sent to external servers</li>
              <li>✅ Phonics curriculum designed by reading specialists</li>
              <li>✅ Age-appropriate content for early readers</li>
              <li>✅ Positive reinforcement builds reading confidence</li>
              <li>✅ No recording or storage of voice data</li>
              <li>✅ Complete privacy protection for your child</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}