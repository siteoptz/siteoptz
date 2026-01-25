import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import VibecodeBlockComponent from '../../../components/kids/VibecodeBlock';
import VibecodeCanvas from '../../../components/kids/VibecodeCanvas';
import { VibecodeBlock, BlockConnection, executeBlocks } from '../../../lib/kids/vibecode-blocks';

interface StoryBlock extends VibecodeBlock {
  storyType: 'character' | 'setting' | 'action' | 'dialogue' | 'event';
  content: string;
}

export default function StoryCreator() {
  const [canvasBlocks, setCanvasBlocks] = useState<StoryBlock[]>([]);
  const [connections, setConnections] = useState<BlockConnection[]>([]);
  const [generatedStory, setGeneratedStory] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Story-specific blocks
  const storyBlocks: StoryBlock[] = [
    {
      id: 'character',
      type: 'character',
      category: 'data',
      shape: 'reporter',
      color: '#9B59B6',
      icon: '👤',
      label: 'Character',
      storyType: 'character',
      content: '',
      inputs: [{ name: 'name', type: 'string', default: 'Hero' }],
      code: 'const character = "{name}";',
    },
    {
      id: 'setting',
      type: 'setting',
      category: 'data',
      shape: 'reporter',
      color: '#3498DB',
      icon: '🌍',
      label: 'Setting',
      storyType: 'setting',
      content: '',
      inputs: [{ name: 'place', type: 'string', default: 'forest' }],
      code: 'const setting = "{place}";',
    },
    {
      id: 'action',
      type: 'action',
      category: 'action',
      shape: 'command',
      color: '#E74C3C',
      icon: '⚡',
      label: 'Action',
      storyType: 'action',
      content: '',
      inputs: [{ name: 'action', type: 'string', default: 'explores' }],
      code: 'story += character + " " + "{action}" + " in " + setting + ". ";',
    },
    {
      id: 'dialogue',
      type: 'dialogue',
      category: 'action',
      shape: 'command',
      color: '#F39C12',
      icon: '💬',
      label: 'Say',
      storyType: 'dialogue',
      content: '',
      inputs: [{ name: 'text', type: 'string', default: 'Hello!' }],
      code: 'story += "\\"" + "{text}" + "\\" said " + character + ". ";',
    },
    {
      id: 'event',
      type: 'event',
      category: 'event',
      shape: 'command',
      color: '#1ABC9C',
      icon: '✨',
      label: 'Event',
      storyType: 'event',
      content: '',
      inputs: [{ name: 'event', type: 'string', default: 'discovers treasure' }],
      code: 'story += "Suddenly, " + character + " {event}! ";',
    },
    {
      id: 'repeat-story',
      type: 'repeat',
      category: 'control',
      shape: 'command',
      color: '#FFAB19',
      icon: '🔄',
      label: 'Repeat',
      storyType: 'action',
      content: '',
      inputs: [{ name: 'times', type: 'number', default: 3 }],
      code: 'for (let i = 0; i < {times}; i++) {',
    },
  ];

  const templates = {
    'brave-robot': {
      name: 'The Brave Robot Adventure',
      blocks: [
        { ...storyBlocks[0], inputs: [{ name: 'name', type: 'string', default: 'Robo' }] },
        { ...storyBlocks[1], inputs: [{ name: 'place', type: 'string', default: 'space' }] },
        { ...storyBlocks[2], inputs: [{ name: 'action', type: 'string', default: 'flies' }] },
        { ...storyBlocks[4], inputs: [{ name: 'event', type: 'string', default: 'finds a new planet' }] },
      ],
    },
    'magic-garden': {
      name: 'The Magic Garden',
      blocks: [
        { ...storyBlocks[0], inputs: [{ name: 'name', type: 'string', default: 'Lily' }] },
        { ...storyBlocks[1], inputs: [{ name: 'place', type: 'string', default: 'garden' }] },
        { ...storyBlocks[5], inputs: [{ name: 'times', type: 'number', default: 5 }] },
        { ...storyBlocks[2], inputs: [{ name: 'action', type: 'string', default: 'waters flowers' }] },
      ],
    },
  };

  const executeStory = async () => {
    setIsExecuting(true);
    
    // Build story from blocks
    let story = 'Once upon a time, ';
    
    canvasBlocks.forEach((block, index) => {
      if (block.type === 'character') {
        story += block.inputs?.[0]?.default || 'Hero';
      } else if (block.type === 'setting') {
        story += 'lived in a ' + (block.inputs?.[0]?.default || 'forest');
      } else if (block.type === 'action') {
        story += '. They ' + (block.inputs?.[0]?.default || 'explored');
      } else if (block.type === 'dialogue') {
        story += '. "' + (block.inputs?.[0]?.default || 'Hello') + '" they said';
      } else if (block.type === 'event') {
        story += '. Suddenly, ' + (block.inputs?.[0]?.default || 'something amazing happened');
      }
      
      if (index < canvasBlocks.length - 1) {
        story += ' ';
      }
    });
    
    story += '. The end!';
    
    // Simulate AI enhancement
    setTimeout(() => {
      setGeneratedStory(story);
      setIsExecuting(false);
    }, 1500);
  };

  const loadTemplate = (templateKey: string) => {
    const template = templates[templateKey as keyof typeof templates];
    if (template) {
      setCanvasBlocks(template.blocks as StoryBlock[]);
      setSelectedTemplate(templateKey);
    }
  };

  return (
    <>
      <Head>
        <title>Story Creator - Vibecode Your Stories | SiteOptz Kids</title>
        <meta name="description" content="Create amazing stories using visual coding blocks. Learn sequencing and logic through storytelling!" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black py-8">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-8">
            <Link href="/kids-ai" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              📖 Story Creator - Vibecode Your Stories!
            </h1>
            <p className="text-gray-300">
              Build stories by connecting blocks. Learn how code works through storytelling!
            </p>
          </header>

          <DndProvider backend={HTML5Backend}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Block Palette */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <h2 className="text-xl font-bold text-white mb-4">Story Blocks</h2>
                  <div className="space-y-2">
                    {storyBlocks.map((block) => (
                      <VibecodeBlockComponent key={block.id} block={block} />
                    ))}
                  </div>
                </div>

                {/* Templates */}
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Quick Start Templates</h3>
                  {Object.entries(templates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => loadTemplate(key)}
                      className={`w-full mb-2 p-3 rounded-lg text-left transition-colors ${
                        selectedTemplate === key
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <div className="font-semibold">{template.name}</div>
                      <div className="text-sm opacity-75">Click to load</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas */}
              <div className="lg:col-span-2">
                <VibecodeCanvas
                  blocks={canvasBlocks}
                  connections={connections}
                  onBlocksChange={setCanvasBlocks}
                  onConnectionsChange={setConnections}
                  onExecute={executeStory}
                />

                {/* Generated Story Display */}
                {generatedStory && (
                  <div className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Your Story:</h3>
                    <p className="text-white text-lg leading-relaxed">{generatedStory}</p>
                    <button
                      onClick={() => setGeneratedStory('')}
                      className="mt-4 px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100"
                    >
                      Create Another Story
                    </button>
                  </div>
                )}

                {isExecuting && (
                  <div className="mt-6 text-center">
                    <div className="inline-block animate-spin text-4xl">✨</div>
                    <p className="text-gray-300 mt-2">Creating your story...</p>
                  </div>
                )}
              </div>
            </div>
          </DndProvider>

          {/* Educational Info */}
          <div className="mt-8 bg-blue-900/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-3">🎓 What You're Learning</h3>
            <ul className="text-gray-300 space-y-2">
              <li>✓ <strong>Sequencing</strong>: Blocks run in order, just like code</li>
              <li>✓ <strong>Variables</strong>: Character names and settings are stored data</li>
              <li>✓ <strong>Functions</strong>: Each block does a specific job</li>
              <li>✓ <strong>Logic Flow</strong>: How programs execute step-by-step</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}