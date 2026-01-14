import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface CodeBlock {
  id: string;
  type: 'action' | 'loop' | 'condition' | 'variable';
  text: string;
  color: string;
  icon: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objective: string;
  targetCode: CodeBlock[];
}

export default function CodeAcademy() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [userCode, setUserCode] = useState<CodeBlock[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<CodeBlock[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [character, setCharacter] = useState({ x: 0, y: 0 });
  const [gridSize] = useState(5);

  const codeBlocks: CodeBlock[] = [
    { id: 'move-right', type: 'action', text: 'Move Right', color: 'bg-blue-500', icon: '➡️' },
    { id: 'move-left', type: 'action', text: 'Move Left', color: 'bg-blue-500', icon: '⬅️' },
    { id: 'move-up', type: 'action', text: 'Move Up', color: 'bg-blue-500', icon: '⬆️' },
    { id: 'move-down', type: 'action', text: 'Move Down', color: 'bg-blue-500', icon: '⬇️' },
    { id: 'repeat-3', type: 'loop', text: 'Repeat 3 times', color: 'bg-green-500', icon: '🔄' },
    { id: 'repeat-5', type: 'loop', text: 'Repeat 5 times', color: 'bg-green-500', icon: '🔄' },
    { id: 'if-wall', type: 'condition', text: 'If wall ahead', color: 'bg-yellow-500', icon: '❓' },
    { id: 'turn-left', type: 'action', text: 'Turn Left', color: 'bg-blue-500', icon: '↪️' },
    { id: 'turn-right', type: 'action', text: 'Turn Right', color: 'bg-blue-500', icon: '↩️' },
    { id: 'collect', type: 'action', text: 'Collect Item', color: 'bg-purple-500', icon: '💎' }
  ];

  const lessons: Lesson[] = [
    {
      id: 'lesson-1',
      title: 'First Steps',
      description: 'Learn to move your character around the grid',
      difficulty: 'beginner',
      objective: 'Move your character to the star (⭐) using the move blocks',
      targetCode: [
        { id: 'move-right', type: 'action', text: 'Move Right', color: 'bg-blue-500', icon: '➡️' },
        { id: 'move-right', type: 'action', text: 'Move Right', color: 'bg-blue-500', icon: '➡️' },
        { id: 'move-down', type: 'action', text: 'Move Down', color: 'bg-blue-500', icon: '⬇️' }
      ]
    },
    {
      id: 'lesson-2',
      title: 'Going in Circles',
      description: 'Use loops to repeat actions efficiently',
      difficulty: 'beginner',
      objective: 'Move in a square pattern using fewer blocks with loops',
      targetCode: [
        { id: 'repeat-4', type: 'loop', text: 'Repeat 4 times', color: 'bg-green-500', icon: '🔄' }
      ]
    },
    {
      id: 'lesson-3',
      title: 'Treasure Hunt',
      description: 'Navigate around obstacles to collect treasure',
      difficulty: 'intermediate',
      objective: 'Collect all the diamonds (💎) while avoiding obstacles',
      targetCode: []
    }
  ];

  const startLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setUserCode([]);
    setIsComplete(false);
    setCharacter({ x: 0, y: 0 });
    
    // Set available blocks based on lesson
    if (lesson.difficulty === 'beginner') {
      setAvailableBlocks(codeBlocks.slice(0, 6));
    } else {
      setAvailableBlocks(codeBlocks);
    }
  };

  const addBlock = (block: CodeBlock) => {
    if (userCode.length < 10) {
      setUserCode([...userCode, { ...block, id: `${block.id}-${Date.now()}` }]);
    }
  };

  const removeBlock = (index: number) => {
    const newCode = [...userCode];
    newCode.splice(index, 1);
    setUserCode(newCode);
  };

  const clearCode = () => {
    setUserCode([]);
    setCharacter({ x: 0, y: 0 });
    setIsComplete(false);
  };

  const runCode = () => {
    if (!selectedLesson) return;
    
    let currentPos = { x: 0, y: 0 };
    
    // Simulate code execution
    userCode.forEach((block, index) => {
      setTimeout(() => {
        switch (block.id.split('-')[0] + '-' + block.id.split('-')[1]) {
          case 'move-right':
            if (currentPos.x < gridSize - 1) currentPos.x += 1;
            break;
          case 'move-left':
            if (currentPos.x > 0) currentPos.x -= 1;
            break;
          case 'move-up':
            if (currentPos.y > 0) currentPos.y -= 1;
            break;
          case 'move-down':
            if (currentPos.y < gridSize - 1) currentPos.y += 1;
            break;
        }
        setCharacter({ ...currentPos });
        
        // Check if reached target (for lesson 1)
        if (selectedLesson.id === 'lesson-1' && currentPos.x === 2 && currentPos.y === 1) {
          setIsComplete(true);
        }
      }, index * 500);
    });
  };

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isCharacter = character.x === x && character.y === y;
        const isTarget = selectedLesson?.id === 'lesson-1' && x === 2 && y === 1;
        
        grid.push(
          <div
            key={`${x}-${y}`}
            className={`w-16 h-16 border-2 border-gray-600 flex items-center justify-center text-2xl ${
              isCharacter ? 'bg-blue-600' : isTarget ? 'bg-yellow-600' : 'bg-gray-800'
            }`}
          >
            {isCharacter ? '🤖' : isTarget ? '⭐' : ''}
          </div>
        );
      }
    }
    return grid;
  };

  return (
    <>
      <Head>
        <title>SiteOptz Code Academy - Safe Visual Programming for Kids</title>
        <meta name="description" content="Learn programming concepts with our safe, visual coding platform designed for children" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-green-900 to-black py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <header className="text-center mb-8">
            <Link href="/kids-ai" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              💻 SiteOptz Code Academy
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Learn programming with safe visual coding!
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
                🧩 Visual Coding
              </span>
            </div>
          </header>

          {/* Lesson Selection */}
          {!selectedLesson && (
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                🎯 Choose Your Lesson
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-gray-800 border-2 border-gray-600 rounded-lg p-6 hover:border-green-400 transition-all cursor-pointer"
                    onClick={() => startLesson(lesson)}
                  >
                    <div className="text-3xl mb-4">💡</div>
                    <h3 className="text-white font-semibold text-lg mb-2">{lesson.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{lesson.description}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lesson.difficulty === 'beginner' ? 'bg-green-600 text-white' :
                      lesson.difficulty === 'intermediate' ? 'bg-yellow-600 text-black' :
                      'bg-red-600 text-white'
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coding Interface */}
          {selectedLesson && (
            <div className="space-y-6">
              {/* Lesson Header */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedLesson.title}</h2>
                    <p className="text-gray-400">{selectedLesson.objective}</p>
                  </div>
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    ← Back to Lessons
                  </button>
                </div>
                {isComplete && (
                  <div className="bg-green-600/20 border border-green-600 rounded-lg p-4 text-center">
                    <span className="text-3xl">🎉</span>
                    <h3 className="text-green-400 font-semibold text-lg">Congratulations!</h3>
                    <p className="text-green-300">You completed the lesson!</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Available Blocks */}
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">🧩 Code Blocks</h3>
                  <div className="space-y-2">
                    {availableBlocks.map((block) => (
                      <button
                        key={block.id}
                        onClick={() => addBlock(block)}
                        className={`w-full ${block.color} text-white p-3 rounded-lg hover:opacity-80 transition-all flex items-center gap-3`}
                      >
                        <span className="text-lg">{block.icon}</span>
                        <span className="font-medium">{block.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Code Area */}
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-semibold">📝 Your Code</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={clearCode}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        Clear
                      </button>
                      <button
                        onClick={runCode}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                        disabled={userCode.length === 0}
                      >
                        ▶️ Run
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 min-h-40">
                    {userCode.length === 0 ? (
                      <div className="text-gray-500 text-center py-8">
                        Drag code blocks here to build your program
                      </div>
                    ) : (
                      userCode.map((block, index) => (
                        <div
                          key={block.id}
                          className={`${block.color} text-white p-2 rounded flex justify-between items-center`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{block.icon}</span>
                            <span className="font-medium">{block.text}</span>
                          </div>
                          <button
                            onClick={() => removeBlock(index)}
                            className="text-white hover:text-red-300 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Game Grid */}
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">🎮 Game World</h3>
                  <div className={`grid grid-cols-${gridSize} gap-1 bg-gray-700 p-2 rounded-lg`}>
                    {renderGrid()}
                  </div>
                  <div className="mt-4 text-gray-300 text-sm">
                    <p>🤖 = Your character</p>
                    <p>⭐ = Target destination</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Programming Concepts */}
          {!selectedLesson && (
            <div className="mt-12 bg-gray-900 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white text-center mb-8">🧠 What You&apos;ll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔄</div>
                  <h4 className="text-white font-semibold mb-2">Loops</h4>
                  <p className="text-gray-400 text-sm">Repeat actions efficiently</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">❓</div>
                  <h4 className="text-white font-semibold mb-2">Conditions</h4>
                  <p className="text-gray-400 text-sm">Make decisions in code</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">📦</div>
                  <h4 className="text-white font-semibold mb-2">Functions</h4>
                  <p className="text-gray-400 text-sm">Organize your code</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🧩</div>
                  <h4 className="text-white font-semibold mb-2">Problem Solving</h4>
                  <p className="text-gray-400 text-sm">Break down complex tasks</p>
                </div>
              </div>
            </div>
          )}

          {/* Safety Information */}
          <div className="mt-12 bg-green-600/10 border border-green-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-4">🛡️ Safe Coding Environment</h3>
            <ul className="text-green-300 space-y-2">
              <li>✅ Visual drag-and-drop programming - no typing required</li>
              <li>✅ Age-appropriate challenges that build computational thinking</li>
              <li>✅ All code runs locally - no external servers or connections</li>
              <li>✅ No social features or external sharing capabilities</li>
              <li>✅ Curriculum designed by computer science educators</li>
              <li>✅ Gradual progression from basic to advanced concepts</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}