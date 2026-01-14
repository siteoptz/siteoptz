import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Puzzle {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'pattern' | 'sequence' | 'logic' | 'spatial';
  solution: string[];
  options: string[];
  hint: string;
}

export default function LogicBuilder() {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [score, setScore] = useState(0);
  const [completedPuzzles, setCompletedPuzzles] = useState<string[]>([]);

  const puzzles: Puzzle[] = [
    {
      id: 'pattern-1',
      title: 'Color Pattern',
      description: 'Complete the pattern by choosing the next colors',
      difficulty: 'easy',
      type: 'pattern',
      solution: ['🔴', '🟦'],
      options: ['🔴', '🟦', '🟢', '🟡', '🟣', '🟠'],
      hint: 'Look at how the colors alternate: red, blue, red, blue...'
    },
    {
      id: 'sequence-1',
      title: 'Number Sequence',
      description: 'Find the next two numbers in the sequence: 2, 4, 6, 8, ?',
      difficulty: 'easy',
      type: 'sequence',
      solution: ['10', '12'],
      options: ['10', '12', '14', '16', '9', '11'],
      hint: 'Each number increases by 2'
    },
    {
      id: 'logic-1',
      title: 'Animal Logic',
      description: 'If all cats have whiskers, and Fluffy is a cat, what can we say about Fluffy?',
      difficulty: 'medium',
      type: 'logic',
      solution: ['Fluffy has whiskers'],
      options: ['Fluffy has whiskers', 'Fluffy is small', 'Fluffy likes fish', 'Fluffy is black'],
      hint: 'Use the rule: If A is true and B is A, then B has the properties of A'
    },
    {
      id: 'spatial-1',
      title: 'Shape Puzzle',
      description: 'Which shape comes next in this sequence?',
      difficulty: 'medium',
      type: 'spatial',
      solution: ['🔷'],
      options: ['🔷', '🔶', '🟨', '⭐', '🔺', '🟩'],
      hint: 'The shapes rotate and change color in a pattern'
    },
    {
      id: 'pattern-2',
      title: 'Advanced Pattern',
      description: 'Complete this complex pattern: 🌟⭐🌟⭐🌟?',
      difficulty: 'hard',
      type: 'pattern',
      solution: ['⭐'],
      options: ['⭐', '🌟', '✨', '💫', '🔥', '☀️'],
      hint: 'Look at the alternating star types'
    },
    {
      id: 'logic-2',
      title: 'School Logic',
      description: 'Sarah is taller than Mike. Mike is taller than Amy. Who is the tallest?',
      difficulty: 'hard',
      type: 'logic',
      solution: ['Sarah'],
      options: ['Sarah', 'Mike', 'Amy', 'Cannot tell'],
      hint: 'Draw it out: Sarah > Mike > Amy'
    }
  ];

  const puzzleTypes = [
    { id: 'pattern', name: 'Patterns', icon: '🎨', description: 'Find and complete visual patterns' },
    { id: 'sequence', name: 'Sequences', icon: '🔢', description: 'Discover number and letter patterns' },
    { id: 'logic', name: 'Logic', icon: '🧠', description: 'Use reasoning to solve problems' },
    { id: 'spatial', name: 'Spatial', icon: '🔲', description: 'Work with shapes and spatial reasoning' }
  ];

  const checkAnswer = () => {
    if (!selectedPuzzle) return;
    
    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(selectedPuzzle.solution);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setCompletedPuzzles(prev => [...new Set([...prev, selectedPuzzle.id])]);
      setShowSolution(true);
      setTimeout(() => {
        alert('🎉 Excellent logical thinking! You earned 10 points!');
      }, 500);
    } else {
      alert('🤔 Not quite right. Try again or use a hint!');
    }
  };

  const resetPuzzle = () => {
    setSelectedPuzzle(null);
    setUserAnswer([]);
    setShowHint(false);
    setShowSolution(false);
  };

  const selectOption = (option: string) => {
    if (showSolution) return;
    
    if (!selectedPuzzle) return;
    
    if (selectedPuzzle.solution.length === 1) {
      setUserAnswer([option]);
    } else {
      if (userAnswer.length < selectedPuzzle.solution.length) {
        setUserAnswer(prev => [...prev, option]);
      }
    }
  };

  const removeLastAnswer = () => {
    setUserAnswer(prev => prev.slice(0, -1));
  };

  return (
    <>
      <Head>
        <title>SiteOptz Logic Builder - Critical Thinking Games for Kids</title>
        <meta name="description" content="Build critical thinking skills with fun logic puzzles and brain games" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="text-center mb-8">
            <Link href="/kids-ai" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              🧩 SiteOptz Logic Builder
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Build critical thinking skills with fun puzzles!
            </p>
            
            {/* Safety Badges */}
            <div className="flex justify-center gap-4 mb-8">
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🛡️ COPPA Safe
              </span>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🧠 Brain Training
              </span>
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🎯 Age Appropriate
              </span>
            </div>

            {/* Score Display */}
            <div className="bg-gray-900 rounded-lg p-4 inline-block">
              <div className="flex items-center gap-4 text-white">
                <span>🏆 Score: {score}</span>
                <span>🧩 Completed: {completedPuzzles.length}/{puzzles.length}</span>
              </div>
            </div>
          </header>

          {/* Puzzle Types */}
          {!selectedPuzzle && (
            <div className="bg-gray-900 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                🎯 Choose Your Challenge Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {puzzleTypes.map((type) => (
                  <div
                    key={type.id}
                    className="bg-gray-800 border-2 border-gray-600 rounded-lg p-6 text-center"
                  >
                    <div className="text-4xl mb-4">{type.icon}</div>
                    <h3 className="text-white font-semibold text-lg mb-2">{type.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{type.description}</p>
                    <div className="text-gray-300 text-sm">
                      {puzzles.filter(p => p.type === type.id).length} puzzles
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Puzzle Selection */}
          {!selectedPuzzle && (
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                🧩 Choose Your Puzzle
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {puzzles.map((puzzle) => (
                  <button
                    key={puzzle.id}
                    onClick={() => setSelectedPuzzle(puzzle)}
                    className="bg-gray-800 border-2 border-gray-600 hover:border-purple-400 rounded-lg p-6 text-left transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold">{puzzle.title}</h3>
                      {completedPuzzles.includes(puzzle.id) && (
                        <span className="text-green-400 text-xl">✅</span>
                      )}
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">{puzzle.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        puzzle.difficulty === 'easy' ? 'bg-green-600 text-white' :
                        puzzle.difficulty === 'medium' ? 'bg-yellow-600 text-black' :
                        'bg-red-600 text-white'
                      }`}>
                        {puzzle.difficulty}
                      </span>
                      <span className="text-gray-500 text-xs">{puzzle.type}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Puzzle */}
          {selectedPuzzle && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedPuzzle.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedPuzzle.difficulty === 'easy' ? 'bg-green-600 text-white' :
                      selectedPuzzle.difficulty === 'medium' ? 'bg-yellow-600 text-black' :
                      'bg-red-600 text-white'
                    }`}>
                      {selectedPuzzle.difficulty}
                    </span>
                  </div>
                  <button
                    onClick={resetPuzzle}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    ← Back
                  </button>
                </div>

                <div className="bg-blue-600/10 border border-blue-600 rounded-lg p-6 mb-6">
                  <h3 className="text-blue-400 font-semibold mb-3">🎯 Challenge:</h3>
                  <p className="text-white text-lg">{selectedPuzzle.description}</p>
                </div>

                {/* Answer Selection */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-4">Choose your answer(s):</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-4">
                    {selectedPuzzle.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => selectOption(option)}
                        className={`p-4 rounded-lg border-2 text-lg font-bold transition-all ${
                          userAnswer.includes(option)
                            ? 'border-blue-400 bg-blue-600/20 text-white'
                            : 'border-gray-600 bg-gray-800 hover:border-gray-400 text-gray-300'
                        }`}
                        disabled={showSolution}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {/* Current Answer Display */}
                  {userAnswer.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-gray-400 text-sm mb-2">Your answer:</h4>
                      <div className="flex items-center gap-2">
                        {userAnswer.map((answer, index) => (
                          <span key={index} className="text-2xl">{answer}</span>
                        ))}
                        {!showSolution && userAnswer.length > 0 && (
                          <button
                            onClick={removeLastAnswer}
                            className="ml-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Remove Last
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center flex-wrap">
                  {!showSolution && (
                    <>
                      <button
                        onClick={checkAnswer}
                        disabled={userAnswer.length === 0}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ✓ Check Answer
                      </button>
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-700 transition-all"
                      >
                        💡 {showHint ? 'Hide' : 'Show'} Hint
                      </button>
                    </>
                  )}
                  {showSolution && (
                    <button
                      onClick={resetPuzzle}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-all"
                    >
                      🎯 Try Another Puzzle
                    </button>
                  )}
                </div>

                {/* Hint Display */}
                {showHint && (
                  <div className="mt-6 bg-yellow-600/10 border border-yellow-600 rounded-lg p-6">
                    <h4 className="text-yellow-400 font-semibold mb-3">💡 Hint:</h4>
                    <p className="text-yellow-200">{selectedPuzzle.hint}</p>
                  </div>
                )}

                {/* Solution Display */}
                {showSolution && (
                  <div className="mt-6 bg-green-600/10 border border-green-600 rounded-lg p-6">
                    <h4 className="text-green-400 font-semibold mb-3">🎉 Solution:</h4>
                    <div className="flex items-center gap-2 mb-4">
                      {selectedPuzzle.solution.map((answer, index) => (
                        <span key={index} className="text-3xl text-white">{answer}</span>
                      ))}
                    </div>
                    <p className="text-green-200">
                      Great logical thinking! You&apos;ve completed this puzzle successfully.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Progress Dashboard */}
          {!selectedPuzzle && (
            <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-4 text-center">🧠 Your Logic Skills Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {puzzleTypes.map((type) => {
                  const typeCompleted = puzzles.filter(p => p.type === type.id && completedPuzzles.includes(p.id)).length;
                  const typeTotal = puzzles.filter(p => p.type === type.id).length;
                  const percentage = typeTotal > 0 ? (typeCompleted / typeTotal) * 100 : 0;
                  
                  return (
                    <div key={type.id} className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <h4 className="text-white font-semibold mb-2">{type.name}</h4>
                      <div className="text-white text-sm mb-2">{typeCompleted}/{typeTotal}</div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-white h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Safety Information */}
          <div className="mt-12 bg-green-600/10 border border-green-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-4">🛡️ Safe Learning Environment</h3>
            <ul className="text-green-300 space-y-2">
              <li>✅ Age-appropriate puzzles designed by educational experts</li>
              <li>✅ Progressive difficulty that builds confidence</li>
              <li>✅ Positive reinforcement for effort and improvement</li>
              <li>✅ No time pressure - learn at your own pace</li>
              <li>✅ Develops critical thinking and problem-solving skills</li>
              <li>✅ Completely safe offline environment</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}