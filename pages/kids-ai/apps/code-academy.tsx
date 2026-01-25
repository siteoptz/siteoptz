import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import VibecodeBlockComponent from '../../../components/kids/VibecodeBlock';
import VibecodeCanvas from '../../../components/kids/VibecodeCanvas';
import { VibecodeBlock, executeBlocks } from '../../../lib/kids/vibecode-blocks';

interface Sprite {
  id: string;
  x: number;
  y: number;
  direction: number;
  emoji: string;
}

export default function CodeAcademy() {
  const [canvasBlocks, setCanvasBlocks] = useState<VibecodeBlock[]>([]);
  const [sprite, setSprite] = useState<Sprite>({
    id: 'player',
    x: 0,
    y: 0,
    direction: 0,
    emoji: '🤖',
  });
  const [grid, setGrid] = useState<(string | null)[][]>(Array(5).fill(null).map(() => Array(5).fill(null)));
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const codeBlocks: VibecodeBlock[] = [
    {
      id: 'move-right',
      type: 'move',
      category: 'action',
      shape: 'command',
      color: '#4C97FF',
      icon: '➡️',
      label: 'Move Right',
      code: 'sprite.x = Math.min(sprite.x + 1, 4);',
    },
    {
      id: 'move-left',
      type: 'move',
      category: 'action',
      shape: 'command',
      color: '#4C97FF',
      icon: '⬅️',
      label: 'Move Left',
      code: 'sprite.x = Math.max(sprite.x - 1, 0);',
    },
    {
      id: 'move-up',
      type: 'move',
      category: 'action',
      shape: 'command',
      color: '#4C97FF',
      icon: '⬆️',
      label: 'Move Up',
      code: 'sprite.y = Math.max(sprite.y - 1, 0);',
    },
    {
      id: 'move-down',
      type: 'move',
      category: 'action',
      shape: 'command',
      color: '#4C97FF',
      icon: '⬇️',
      label: 'Move Down',
      code: 'sprite.y = Math.min(sprite.y + 1, 4);',
    },
    {
      id: 'repeat-3',
      type: 'repeat',
      category: 'control',
      shape: 'command',
      color: '#FFAB19',
      icon: '🔄',
      label: 'Repeat 3 Times',
      inputs: [{ name: 'times', type: 'number', default: 3 }],
      code: 'for (let i = 0; i < 3; i++) {',
    },
    {
      id: 'repeat-5',
      type: 'repeat',
      category: 'control',
      shape: 'command',
      color: '#FFAB19',
      icon: '🔄',
      label: 'Repeat 5 Times',
      code: 'for (let i = 0; i < 5; i++) {',
    },
  ];

  const lessons = [
    {
      id: 'lesson-1',
      title: 'First Steps',
      description: 'Move your sprite to the star ⭐',
      target: { x: 2, y: 2 },
      blocks: codeBlocks.slice(0, 4),
    },
    {
      id: 'lesson-2',
      title: 'Loops',
      description: 'Use loops to move efficiently',
      target: { x: 4, y: 4 },
      blocks: codeBlocks,
    },
  ];

  const runCode = async () => {
    setIsRunning(true);
    const newGrid = Array(5).fill(null).map(() => Array(5).fill(null));
    newGrid[2][2] = '⭐'; // Target
    setGrid(newGrid);

    let currentSprite = { ...sprite, x: 0, y: 0 };

    // Execute blocks with animation
    for (let i = 0; i < canvasBlocks.length; i++) {
      const block = canvasBlocks[i];
      
      if (block.type === 'move') {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (block.id === 'move-right') currentSprite.x = Math.min(currentSprite.x + 1, 4);
        if (block.id === 'move-left') currentSprite.x = Math.max(currentSprite.x - 1, 0);
        if (block.id === 'move-up') currentSprite.y = Math.max(currentSprite.y - 1, 0);
        if (block.id === 'move-down') currentSprite.y = Math.min(currentSprite.y + 1, 4);
        
        setSprite({ ...currentSprite });
      } else if (block.type === 'repeat') {
        const times = block.inputs?.[0]?.default || 3;
        // Handle repeat logic
      }
    }

    // Check if reached target
    if (currentSprite.x === 2 && currentSprite.y === 2) {
      alert('🎉 Success! You reached the star!');
    }

    setIsRunning(false);
  };

  const resetSprite = () => {
    setSprite({ id: 'player', x: 0, y: 0, direction: 0, emoji: '🤖' });
    const newGrid = Array(5).fill(null).map(() => Array(5).fill(null));
    newGrid[2][2] = '⭐';
    setGrid(newGrid);
  };

  const loadLesson = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lessonId);
      resetSprite();
      // Set grid with target
      const newGrid = Array(5).fill(null).map(() => Array(5).fill(null));
      newGrid[lesson.target.y][lesson.target.x] = '⭐';
      setGrid(newGrid);
    }
  };

  useEffect(() => {
    // Initialize grid with star
    const newGrid = Array(5).fill(null).map(() => Array(5).fill(null));
    newGrid[2][2] = '⭐';
    setGrid(newGrid);
  }, []);

  return (
    <>
      <Head>
        <title>Code Academy - Learn Visual Programming | SiteOptz Kids</title>
        <meta name="description" content="Learn programming concepts through visual drag-and-drop coding. Perfect for kids!" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black py-8">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-8">
            <Link href="/kids-ai" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              🎓 Code Academy - Visual Programming
            </h1>
            <p className="text-gray-300">
              Learn programming concepts by moving your robot through challenges!
            </p>
          </header>

          <DndProvider backend={HTML5Backend}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Block Palette */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <h2 className="text-xl font-bold text-white mb-4">Code Blocks</h2>
                  <div className="space-y-2">
                    {codeBlocks.map((block) => (
                      <VibecodeBlockComponent key={block.id} block={block} />
                    ))}
                  </div>
                </div>

                {/* Lessons */}
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Lessons</h3>
                  {lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => loadLesson(lesson.id)}
                      className={`w-full mb-2 p-3 rounded-lg text-left transition-colors ${
                        selectedLesson === lesson.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <div className="font-semibold">{lesson.title}</div>
                      <div className="text-sm opacity-75">{lesson.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas & Grid */}
              <div className="lg:col-span-2">
                <VibecodeCanvas
                  blocks={canvasBlocks}
                  connections={[]}
                  onBlocksChange={setCanvasBlocks}
                  onConnectionsChange={() => {}}
                  onExecute={runCode}
                />

                {/* Game Grid */}
                <div className="mt-6 bg-gray-900 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-4">Game Grid</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {grid.map((row, y) =>
                      row.map((cell, x) => (
                        <div
                          key={`${x}-${y}`}
                          className={`
                            w-16 h-16 border-2 rounded-lg flex items-center justify-center text-2xl
                            ${sprite.x === x && sprite.y === y ? 'bg-blue-500 border-blue-300' : 'bg-gray-800 border-gray-600'}
                          `}
                        >
                          {sprite.x === x && sprite.y === y ? sprite.emoji : cell || ''}
                        </div>
                      ))
                    )}
                  </div>
                  <button
                    onClick={resetSprite}
                    className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Reset Position
                  </button>
                </div>
              </div>
            </div>
          </DndProvider>

          {/* Educational Info */}
          <div className="mt-8 bg-blue-900/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-3">🎓 What You&apos;re Learning</h3>
            <ul className="text-gray-300 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <li>✓ <strong>Sequential Thinking</strong>: Programs run step by step</li>
              <li>✓ <strong>Loops</strong>: Repeat actions efficiently</li>
              <li>✓ <strong>Problem Solving</strong>: Break down complex tasks</li>
              <li>✓ <strong>Debugging</strong>: Find and fix errors in logic</li>
              <li>✓ <strong>Computational Thinking</strong>: Approach problems logically</li>
              <li>✓ <strong>Planning</strong>: Think before coding</li>
            </ul>
          </div>

          {/* Progress Tracking */}
          {selectedLesson && (
            <div className="mt-6 bg-green-900/30 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Current Lesson: {lessons.find(l => l.id === selectedLesson)?.title}</h4>
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Progress:</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: canvasBlocks.length > 0 ? '50%' : '0%' }}></div>
                </div>
                <span className="text-sm text-gray-300">{canvasBlocks.length > 0 ? '50%' : '0%'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}