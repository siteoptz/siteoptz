import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Play, RotateCcw, CheckCircle, HelpCircle, Eye, Star, Trophy, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';

interface Challenge {
  id: string;
  level: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Movement' | 'Loops' | 'Variables' | 'Functions' | 'Objects';
  objective: string;
  description: string;
  startingCode: string;
  solution: string;
  hints: string[];
  concepts: string[];
  points: number;
}

interface GameState {
  robotX: number;
  robotY: number;
  items: Array<{ x: number; y: number; type: 'banana' | 'star' | 'diamond' }>;
  collected: number;
  moves: number;
}

export default function CodeAcademy() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [gameState, setGameState] = useState<GameState>({
    robotX: 0,
    robotY: 0,
    items: [{ x: 2, y: 2, type: 'banana' }],
    collected: 0,
    moves: 0
  });
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [feedback, setFeedback] = useState<string>('');

  const challenges: Challenge[] = [
    {
      id: 'move-basic',
      level: 1,
      title: 'First Steps',
      difficulty: 'Beginner',
      category: 'Movement',
      objective: 'Move CodeMonkey to collect the banana!',
      description: 'Use moveRight() and moveDown() to reach the banana at position (2,2)',
      startingCode: `# Move CodeMonkey to the banana!
# Use these commands:
# moveRight() - moves 1 space right
# moveDown() - moves 1 space down

`,
      solution: `moveRight()
moveRight()
moveDown()
moveDown()`,
      hints: [
        'CodeMonkey starts at position (0,0)',
        'The banana is at position (2,2)',
        'You need to move right 2 times and down 2 times',
        'Try: moveRight(), moveRight(), moveDown(), moveDown()'
      ],
      concepts: ['Sequential execution', 'Basic movement commands'],
      points: 100
    },
    {
      id: 'loops-intro',
      level: 2,
      title: 'Loop the Loop',
      difficulty: 'Beginner',
      category: 'Loops',
      objective: 'Use a loop to move efficiently!',
      description: 'Instead of writing moveRight() 4 times, use a for loop',
      startingCode: `# Use a for loop to move right 4 times
# Syntax: for i in range(count):
#     command()

`,
      solution: `for i in range(4):
    moveRight()`,
      hints: [
        'Loops help you repeat actions',
        'Use for i in range(4): to repeat 4 times',
        'Don\'t forget to indent the moveRight() command',
        'range(4) means 0, 1, 2, 3 (4 times total)'
      ],
      concepts: ['For loops', 'Code efficiency', 'Indentation'],
      points: 200
    },
    {
      id: 'variables-distance',
      level: 3,
      title: 'Variable Journey',
      difficulty: 'Intermediate',
      category: 'Variables',
      objective: 'Use variables to store the distance!',
      description: 'Create a variable for distance and use it in your loop',
      startingCode: `# Create a variable called distance
# Set it to 3
# Use it in a for loop to move right

`,
      solution: `distance = 3
for i in range(distance):
    moveRight()`,
      hints: [
        'Variables store values: distance = 3',
        'Use the variable in range(): range(distance)',
        'This makes your code flexible and reusable',
        'Try changing the distance value and see what happens'
      ],
      concepts: ['Variables', 'Code reusability', 'Dynamic values'],
      points: 300
    },
    {
      id: 'functions-move',
      level: 4,
      title: 'Function Factory',
      difficulty: 'Intermediate',
      category: 'Functions',
      objective: 'Create a function to move in patterns!',
      description: 'Write a function that moves right then down',
      startingCode: `# Create a function called moveRightDown()
# It should move right once, then down once
# Call the function 2 times

def moveRightDown():
    # Your code here
    pass

# Call your function here
`,
      solution: `def moveRightDown():
    moveRight()
    moveDown()

moveRightDown()
moveRightDown()`,
      hints: [
        'Functions group commands together',
        'Use def functionName(): to create a function',
        'Replace pass with your moveRight() and moveDown() commands',
        'Call the function by writing its name with ()'
      ],
      concepts: ['Function definition', 'Function calls', 'Code organization'],
      points: 400
    },
    {
      id: 'objects-robot',
      level: 5,
      title: 'Robot Properties',
      difficulty: 'Advanced',
      category: 'Objects',
      objective: 'Use object properties to control movement!',
      description: 'Access robot.energy and robot.speed to move efficiently',
      startingCode: `# The robot object has properties:
# robot.energy (how many moves left)
# robot.speed (how far to move each time)

# Move right using robot.speed
# Check robot.energy before moving

`,
      solution: `if robot.energy > 0:
    for i in range(robot.speed):
        moveRight()
        robot.energy -= 1`,
      hints: [
        'Objects have properties accessed with dot notation',
        'Check if robot.energy > 0 before moving',
        'Use robot.speed to determine how many times to move',
        'Decrease robot.energy after each move'
      ],
      concepts: ['Objects', 'Properties', 'Conditional statements', 'Object state'],
      points: 500
    }
  ];

  const currentChallenge = challenges[currentChallengeIndex];

  const initializeGameState = useCallback(() => {
    const challenge = challenges[currentChallengeIndex];
    let items = [];
    
    switch (challenge.id) {
      case 'move-basic':
        items = [{ x: 2, y: 2, type: 'banana' as const }];
        break;
      case 'loops-intro':
        items = [{ x: 4, y: 0, type: 'star' as const }];
        break;
      case 'variables-distance':
        items = [{ x: 3, y: 0, type: 'diamond' as const }];
        break;
      case 'functions-move':
        items = [{ x: 2, y: 2, type: 'star' as const }];
        break;
      case 'objects-robot':
        items = [{ x: 3, y: 0, type: 'diamond' as const }];
        break;
      default:
        items = [{ x: 2, y: 2, type: 'banana' as const }];
    }

    setGameState({
      robotX: 0,
      robotY: 0,
      items,
      collected: 0,
      moves: 0
    });
    setUserCode(challenge.startingCode);
    setFeedback('');
    setShowSolution(false);
    setCurrentHintIndex(0);
  }, [currentChallengeIndex]);

  const executeCode = async () => {
    setIsRunning(true);
    setFeedback('');
    
    const initialState = { ...gameState, robotX: 0, robotY: 0, collected: 0, moves: 0 };
    setGameState(initialState);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const success = await simulateCodeExecution(userCode);
      if (success) {
        setFeedback('🎉 Success! Challenge completed!');
        if (!completedChallenges.has(currentChallenge.id)) {
          setCompletedChallenges(prev => new Set([...prev, currentChallenge.id]));
          setUserPoints(prev => prev + currentChallenge.points);
        }
      } else {
        setFeedback('🤔 Not quite right. Try again or use a hint!');
      }
    } catch (error) {
      setFeedback('❌ Code error: Check your syntax and try again');
    }
    
    setIsRunning(false);
  };

  const simulateCodeExecution = async (code: string): Promise<boolean> => {
    let robotX = 0;
    let robotY = 0;
    let moves = 0;
    const maxMoves = 20;
    
    const robot = { energy: 10, speed: 1 };
    
    const commands = {
      moveRight: () => {
        if (moves < maxMoves && robotX < 4) {
          robotX++;
          moves++;
          setGameState(prev => ({ ...prev, robotX, moves }));
          return true;
        }
        return false;
      },
      moveLeft: () => {
        if (moves < maxMoves && robotX > 0) {
          robotX--;
          moves++;
          setGameState(prev => ({ ...prev, robotX, moves }));
          return true;
        }
        return false;
      },
      moveDown: () => {
        if (moves < maxMoves && robotY < 4) {
          robotY++;
          moves++;
          setGameState(prev => ({ ...prev, robotY, moves }));
          return true;
        }
        return false;
      },
      moveUp: () => {
        if (moves < maxMoves && robotY > 0) {
          robotY--;
          moves++;
          setGameState(prev => ({ ...prev, robotY, moves }));
          return true;
        }
        return false;
      }
    };

    const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
    
    for (const line of lines) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const trimmedLine = line.trim();
      
      if (trimmedLine.includes('moveRight()')) {
        commands.moveRight();
      } else if (trimmedLine.includes('moveLeft()')) {
        commands.moveLeft();
      } else if (trimmedLine.includes('moveDown()')) {
        commands.moveDown();
      } else if (trimmedLine.includes('moveUp()')) {
        commands.moveUp();
      }
    }
    
    const targetItem = gameState.items[0];
    return robotX === targetItem.x && robotY === targetItem.y;
  };

  const resetCode = () => {
    setUserCode(currentChallenge.startingCode);
    initializeGameState();
  };

  const showNextHint = () => {
    if (currentHintIndex < currentChallenge.hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  const checkSolution = () => {
    const cleanUserCode = userCode.replace(/\s+/g, ' ').toLowerCase();
    const cleanSolution = currentChallenge.solution.replace(/\s+/g, ' ').toLowerCase();
    
    if (cleanUserCode.includes(cleanSolution.substring(0, Math.min(cleanSolution.length, 20)))) {
      setFeedback('✅ Your solution looks correct! Click Run to test it.');
    } else {
      setFeedback('🔍 Your solution doesn\'t match the expected pattern. Keep trying!');
    }
  };

  const nextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    }
  };

  const previousChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    initializeGameState();
  }, [currentChallengeIndex, initializeGameState]);

  const getItemEmoji = (type: string) => {
    switch (type) {
      case 'banana': return '🍌';
      case 'star': return '⭐';
      case 'diamond': return '💎';
      default: return '🍌';
    }
  };

  return (
    <>
      <Head>
        <title>Code Academy - Learn Real Programming | SiteOptz Kids</title>
        <meta name="description" content="Learn real programming with Python-like syntax through fun coding challenges!" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-8">
            <Link href="/kids-ai" className="text-cyan-400 hover:text-cyan-300 mb-4 inline-block">
              ← Back to Kids AI Directory
            </Link>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  🐒 CodeMonkey Academy
                </h1>
                <p className="text-gray-300">
                  Master real programming through interactive challenges!
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-2 rounded-lg">
                  <Trophy className="text-yellow-400 w-5 h-5" />
                  <span className="text-yellow-400 font-bold">{userPoints} pts</span>
                </div>
                <div className="text-gray-300">
                  Challenge {currentChallengeIndex + 1} of {challenges.length}
                </div>
              </div>
            </div>
          </header>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Code Editor Section */}
            <div className="space-y-6">
              {/* Challenge Info */}
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{currentChallenge.title}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        currentChallenge.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        currentChallenge.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {currentChallenge.difficulty}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold">
                        {currentChallenge.category}
                      </span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-bold">
                        Level {currentChallenge.level}
                      </span>
                    </div>
                  </div>
                  {completedChallenges.has(currentChallenge.id) && (
                    <CheckCircle className="text-green-400 w-8 h-8" />
                  )}
                </div>
                
                <p className="text-gray-200">{currentChallenge.objective}</p>
                <p className="text-gray-400 mt-2">{currentChallenge.description}</p>
                
                <div className="mt-4">
                  <h4 className="text-white font-semibold mb-2">Concepts You&apos;ll Learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentChallenge.concepts.map((concept, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Code Editor */}
              <div className="bg-black border border-gray-800 rounded-lg">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                    Code Editor
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 text-sm"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Hints
                    </button>
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Solution
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-green-400 focus:outline-none resize-none"
                    placeholder="Write your Python code here..."
                    style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
                  />
                </div>
                
                <div className="flex items-center gap-3 p-4 border-t border-gray-800">
                  <button
                    onClick={executeCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                  >
                    <Play className="w-4 h-4" />
                    {isRunning ? 'Running...' : 'Run Code'}
                  </button>
                  
                  <button
                    onClick={resetCode}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  
                  <button
                    onClick={checkSolution}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Check
                  </button>
                </div>
              </div>

              {/* Feedback */}
              {feedback && (
                <div className={`p-4 rounded-lg border ${
                  feedback.includes('Success') ? 'bg-green-900/30 border-green-600 text-green-400' :
                  feedback.includes('correct') ? 'bg-blue-900/30 border-blue-600 text-blue-400' :
                  'bg-red-900/30 border-red-600 text-red-400'
                }`}>
                  {feedback}
                </div>
              )}

              {/* Hints */}
              {showHints && (
                <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
                  <h4 className="text-yellow-400 font-bold mb-3">💡 Hints</h4>
                  <div className="space-y-2">
                    {currentChallenge.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                      <div key={index} className="text-yellow-200 text-sm">
                        <span className="font-bold">{index + 1}.</span> {hint}
                      </div>
                    ))}
                    {currentHintIndex < currentChallenge.hints.length - 1 && (
                      <button
                        onClick={showNextHint}
                        className="mt-2 text-yellow-400 hover:text-yellow-300 text-sm underline"
                      >
                        Show next hint →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Solution */}
              {showSolution && (
                <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-4">
                  <h4 className="text-purple-400 font-bold mb-3">🎯 Solution</h4>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    {currentChallenge.solution}
                  </pre>
                </div>
              )}
            </div>

            {/* Game Visualization */}
            <div className="space-y-6">
              {/* Game Grid */}
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  🎮 Game World
                  <span className="text-sm text-gray-400">Moves: {gameState.moves}</span>
                </h3>
                
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {Array.from({ length: 25 }, (_, index) => {
                    const x = index % 5;
                    const y = Math.floor(index / 5);
                    const isRobot = gameState.robotX === x && gameState.robotY === y;
                    const item = gameState.items.find(item => item.x === x && item.y === y);
                    
                    return (
                      <div
                        key={`${x}-${y}`}
                        className={`
                          w-16 h-16 border-2 rounded-lg flex items-center justify-center text-2xl
                          ${isRobot ? 'bg-blue-500 border-blue-300' : 'bg-gray-800 border-gray-600'}
                          transition-all duration-300
                        `}
                      >
                        {isRobot ? '🐒' : item ? getItemEmoji(item.type) : ''}
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Robot: ({gameState.robotX}, {gameState.robotY})</span>
                  <span>Items collected: {gameState.collected}</span>
                </div>
              </div>

              {/* Challenge Navigation */}
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h3 className="text-white font-bold mb-4">Challenge Progress</h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={previousChallenge}
                    disabled={currentChallengeIndex === 0}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex-1 text-center">
                    <div className="text-white font-semibold">
                      {currentChallengeIndex + 1} / {challenges.length}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentChallengeIndex + 1) / challenges.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <button
                    onClick={nextChallenge}
                    disabled={currentChallengeIndex === challenges.length - 1}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {challenges.map((challenge, index) => (
                    <button
                      key={challenge.id}
                      onClick={() => setCurrentChallengeIndex(index)}
                      className={`
                        w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold transition-colors
                        ${
                          index === currentChallengeIndex
                            ? 'bg-blue-600 text-white'
                            : completedChallenges.has(challenge.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }
                      `}
                    >
                      {completedChallenges.has(challenge.id) ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        index + 1
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Learning Concepts */}
              <div className="bg-black border border-gray-800 rounded-lg p-6">
                <h3 className="text-white font-bold mb-4">🎓 Programming Concepts</h3>
                <div className="space-y-3">
                  {[
                    { concept: 'Sequential Execution', icon: '📝', description: 'Code runs line by line' },
                    { concept: 'Loops & Iteration', icon: '🔄', description: 'Repeat actions efficiently' },
                    { concept: 'Variables & Data', icon: '📦', description: 'Store and use values' },
                    { concept: 'Functions & Methods', icon: '🔧', description: 'Organize code into reusable blocks' },
                    { concept: 'Objects & Properties', icon: '🏗️', description: 'Model real-world entities' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="text-white font-semibold">{item.concept}</div>
                        <div className="text-gray-400 text-sm">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}