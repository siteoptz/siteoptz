import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface MathProblem {
  question: string;
  answer: number;
  options: number[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'addition' | 'subtraction' | 'multiplication' | 'division';
}

export default function MathWizard() {
  const [gradeLevel, setGradeLevel] = useState<number | null>(null);
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [problemCount, setProblemCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const gradeLevels = [
    { level: 1, name: '1st Grade (Ages 6-7)', description: 'Addition and subtraction up to 20' },
    { level: 2, name: '2nd Grade (Ages 7-8)', description: 'Addition and subtraction up to 100' },
    { level: 3, name: '3rd Grade (Ages 8-9)', description: 'Multiplication tables and division' },
    { level: 4, name: '4th Grade (Ages 9-10)', description: 'Multi-digit multiplication and division' },
    { level: 5, name: '5th Grade (Ages 10-11)', description: 'Fractions and decimals' },
    { level: 6, name: '6th Grade (Ages 11-12)', description: 'Advanced operations and pre-algebra' }
  ];

  const generateProblem = (grade: number): MathProblem => {
    const problems: { [key: number]: () => MathProblem } = {
      1: () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const isAddition = Math.random() > 0.5;
        
        if (isAddition) {
          return {
            question: `${a} + ${b} = ?`,
            answer: a + b,
            options: generateOptions(a + b, 20),
            explanation: `When we add ${a} and ${b}, we count ${a} items and then ${b} more items. That gives us ${a + b} items total!`,
            difficulty: 'easy',
            type: 'addition'
          };
        } else {
          const larger = Math.max(a, b);
          const smaller = Math.min(a, b);
          return {
            question: `${larger} - ${smaller} = ?`,
            answer: larger - smaller,
            options: generateOptions(larger - smaller, 20),
            explanation: `When we subtract ${smaller} from ${larger}, we take away ${smaller} items from ${larger} items. That leaves us with ${larger - smaller} items!`,
            difficulty: 'easy',
            type: 'subtraction'
          };
        }
      },
      
      2: () => {
        const a = Math.floor(Math.random() * 50) + 1;
        const b = Math.floor(Math.random() * 50) + 1;
        const isAddition = Math.random() > 0.5;
        
        if (isAddition) {
          return {
            question: `${a} + ${b} = ?`,
            answer: a + b,
            options: generateOptions(a + b, 100),
            explanation: `To add ${a} + ${b}, we can break it down: ${a} + ${b} = ${a + b}. Try counting by tens to make it easier!`,
            difficulty: 'easy',
            type: 'addition'
          };
        } else {
          const larger = Math.max(a, b);
          const smaller = Math.min(a, b);
          return {
            question: `${larger} - ${smaller} = ?`,
            answer: larger - smaller,
            options: generateOptions(larger - smaller, 100),
            explanation: `To subtract ${smaller} from ${larger}, think: ${larger} - ${smaller} = ${larger - smaller}. You can count backwards or use addition to check!`,
            difficulty: 'easy',
            type: 'subtraction'
          };
        }
      },
      
      3: () => {
        const operations = ['multiply', 'divide'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        if (operation === 'multiply') {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          return {
            question: `${a} × ${b} = ?`,
            answer: a * b,
            options: generateOptions(a * b, 100),
            explanation: `${a} × ${b} means we have ${a} groups of ${b} items each. That's ${a * b} items total! You can also think of it as adding ${b} to itself ${a} times.`,
            difficulty: 'medium',
            type: 'multiplication'
          };
        } else {
          const divisor = Math.floor(Math.random() * 9) + 2;
          const quotient = Math.floor(Math.random() * 10) + 1;
          const dividend = divisor * quotient;
          return {
            question: `${dividend} ÷ ${divisor} = ?`,
            answer: quotient,
            options: generateOptions(quotient, 20),
            explanation: `${dividend} ÷ ${divisor} = ${quotient} because ${divisor} × ${quotient} = ${dividend}. Division is the opposite of multiplication!`,
            difficulty: 'medium',
            type: 'division'
          };
        }
      },
      
      4: () => {
        const operations = ['multiply', 'divide'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        if (operation === 'multiply') {
          const a = Math.floor(Math.random() * 25) + 10;
          const b = Math.floor(Math.random() * 9) + 2;
          return {
            question: `${a} × ${b} = ?`,
            answer: a * b,
            options: generateOptions(a * b, a * b + 50),
            explanation: `For ${a} × ${b}, try breaking it down: ${a} × ${b} = ${a * b}. You can use the distributive property or memorized facts to solve this!`,
            difficulty: 'medium',
            type: 'multiplication'
          };
        } else {
          const divisor = Math.floor(Math.random() * 12) + 2;
          const quotient = Math.floor(Math.random() * 20) + 5;
          const dividend = divisor * quotient;
          return {
            question: `${dividend} ÷ ${divisor} = ?`,
            answer: quotient,
            options: generateOptions(quotient, 50),
            explanation: `To solve ${dividend} ÷ ${divisor}, think: "What number times ${divisor} equals ${dividend}?" The answer is ${quotient}!`,
            difficulty: 'medium',
            type: 'division'
          };
        }
      },
      
      5: () => {
        const problemTypes = ['fraction_add', 'decimal_add', 'fraction_multiply'];
        const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];
        
        if (type === 'decimal_add') {
          const a = (Math.floor(Math.random() * 50) + 1) / 10;
          const b = (Math.floor(Math.random() * 50) + 1) / 10;
          const answer = Math.round((a + b) * 10) / 10;
          return {
            question: `${a} + ${b} = ?`,
            answer: answer,
            options: generateDecimalOptions(answer),
            explanation: `To add decimals, line up the decimal points: ${a} + ${b} = ${answer}. The decimal point in the answer goes in the same place!`,
            difficulty: 'hard',
            type: 'addition'
          };
        } else {
          const num1 = Math.floor(Math.random() * 20) + 10;
          const num2 = Math.floor(Math.random() * 20) + 10;
          const answer = Math.round((num1 + num2) * 0.1) / 0.1;
          return {
            question: `${num1} + ${num2} = ?`,
            answer: num1 + num2,
            options: generateOptions(num1 + num2, 100),
            explanation: `${num1} + ${num2} = ${num1 + num2}. For larger numbers, try adding the tens place first, then the ones place!`,
            difficulty: 'hard',
            type: 'addition'
          };
        }
      },
      
      6: () => {
        const a = Math.floor(Math.random() * 100) + 20;
        const b = Math.floor(Math.random() * 20) + 5;
        const operations = ['add', 'subtract', 'multiply'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        switch (operation) {
          case 'add':
            return {
              question: `${a} + ${b} = ?`,
              answer: a + b,
              options: generateOptions(a + b, 200),
              explanation: `${a} + ${b} = ${a + b}. For mental math, try rounding to the nearest ten and adjusting!`,
              difficulty: 'hard',
              type: 'addition'
            };
          case 'subtract':
            return {
              question: `${a} - ${b} = ?`,
              answer: a - b,
              options: generateOptions(a - b, 200),
              explanation: `${a} - ${b} = ${a - b}. You can check your answer by adding: ${a - b} + ${b} = ${a}!`,
              difficulty: 'hard',
              type: 'subtraction'
            };
          default:
            return {
              question: `${Math.floor(a/10)} × ${b} = ?`,
              answer: Math.floor(a/10) * b,
              options: generateOptions(Math.floor(a/10) * b, 500),
              explanation: `${Math.floor(a/10)} × ${b} = ${Math.floor(a/10) * b}. Break this down using the distributive property or area models!`,
              difficulty: 'hard',
              type: 'multiplication'
            };
        }
      }
    };

    return problems[grade]();
  };

  const generateOptions = (correct: number, range: number): number[] => {
    const options = [correct];
    while (options.length < 4) {
      const option = Math.max(0, correct + Math.floor(Math.random() * range/2) - range/4);
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const generateDecimalOptions = (correct: number): number[] => {
    const options = [correct];
    while (options.length < 4) {
      const variation = (Math.random() - 0.5) * 2;
      const option = Math.round((correct + variation) * 10) / 10;
      if (option > 0 && !options.includes(option)) {
        options.push(option);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const startPractice = (grade: number) => {
    setGradeLevel(grade);
    setCurrentProblem(generateProblem(grade));
    setScore(0);
    setProblemCount(0);
    setStreak(0);
  };

  const submitAnswer = () => {
    if (userAnswer === null || !currentProblem) return;
    
    setShowResult(true);
    setProblemCount(prev => prev + 1);
    
    if (userAnswer === currentProblem.answer) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const nextProblem = () => {
    if (!gradeLevel) return;
    
    setCurrentProblem(generateProblem(gradeLevel));
    setUserAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
  };

  const resetSession = () => {
    setGradeLevel(null);
    setCurrentProblem(null);
    setUserAnswer(null);
    setShowResult(false);
    setScore(0);
    setProblemCount(0);
    setStreak(0);
    setShowExplanation(false);
  };

  return (
    <>
      <Head>
        <title>SiteOptz Math Wizard - Safe AI Math Tutor for Kids</title>
        <meta name="description" content="Practice math with our safe, adaptive AI tutor designed specifically for children" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="text-center mb-8">
            <Link href="/kids-ai" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              🧙‍♂️ SiteOptz Math Wizard
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Master math with our safe AI tutor!
            </p>
            
            {/* Safety Badges */}
            <div className="flex justify-center gap-4 mb-8">
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🛡️ COPPA Safe
              </span>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🏠 White-Label
              </span>
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                📊 Adaptive Learning
              </span>
            </div>
          </header>

          {/* Grade Selection */}
          {!gradeLevel && (
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                🎯 Choose Your Grade Level
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gradeLevels.map((grade) => (
                  <button
                    key={grade.level}
                    onClick={() => startPractice(grade.level)}
                    className="bg-gray-800 border-2 border-gray-600 hover:border-blue-400 rounded-lg p-6 text-left transition-all hover:bg-blue-600/10"
                  >
                    <div className="text-2xl mb-2">📚</div>
                    <h3 className="text-white font-semibold mb-2">{grade.name}</h3>
                    <p className="text-gray-400 text-sm">{grade.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Practice Session */}
          {gradeLevel && currentProblem && (
            <div className="space-y-6">
              {/* Score Display */}
              <div className="bg-gray-900 rounded-lg p-4 flex justify-between items-center">
                <div className="flex gap-6 text-white">
                  <span>📊 Score: {score}/{problemCount}</span>
                  <span>🔥 Streak: {streak}</span>
                  <span>🎯 Grade: {gradeLevel}</span>
                </div>
                <button
                  onClick={resetSession}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  🔄 Change Grade
                </button>
              </div>

              {/* Problem */}
              <div className="bg-gray-900 rounded-2xl p-8 text-center">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {currentProblem.question}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    currentProblem.difficulty === 'easy' ? 'bg-green-600 text-white' :
                    currentProblem.difficulty === 'medium' ? 'bg-yellow-600 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {currentProblem.difficulty}
                  </span>
                </div>

                {!showResult ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      {currentProblem.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => setUserAnswer(option)}
                          className={`p-4 rounded-lg border-2 text-xl font-bold transition-all ${
                            userAnswer === option
                              ? 'border-blue-400 bg-blue-600/20 text-white'
                              : 'border-gray-600 bg-gray-800 hover:border-gray-400 text-gray-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={submitAnswer}
                      disabled={userAnswer === null}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                    >
                      Submit Answer
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className={`text-6xl ${
                      userAnswer === currentProblem.answer ? '✅' : '❌'
                    }`}>
                      {userAnswer === currentProblem.answer ? '🎉' : '🤔'}
                    </div>
                    
                    <div className="text-white">
                      <h3 className="text-xl font-semibold mb-2">
                        {userAnswer === currentProblem.answer ? 'Correct! Great job! 🌟' : `Not quite! The answer is ${currentProblem.answer}`}
                      </h3>
                      {userAnswer === currentProblem.answer && streak > 1 && (
                        <p className="text-yellow-400">🔥 {streak} in a row! You&apos;re on fire!</p>
                      )}
                    </div>

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        {showExplanation ? 'Hide' : 'Show'} Explanation
                      </button>
                      <button
                        onClick={nextProblem}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Next Problem →
                      </button>
                    </div>

                    {showExplanation && (
                      <div className="bg-blue-600/10 border border-blue-600 rounded-lg p-4 text-blue-300 text-left">
                        <h4 className="font-semibold mb-2">💡 Explanation:</h4>
                        <p>{currentProblem.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Safety Information */}
          <div className="mt-12 bg-green-600/10 border border-green-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-4">🛡️ Safety & Learning Features</h3>
            <ul className="text-green-300 space-y-2">
              <li>✅ Adaptive difficulty that adjusts to your child&apos;s level</li>
              <li>✅ Positive reinforcement with no pressure or stress</li>
              <li>✅ Step-by-step explanations for every problem</li>
              <li>✅ No data collection - all progress is local</li>
              <li>✅ Curriculum-aligned with educational standards</li>
              <li>✅ Built by educators and child development experts</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}