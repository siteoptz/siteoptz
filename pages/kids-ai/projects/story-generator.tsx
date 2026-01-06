import React, { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import SafetyBadge from '../../../components/kids/SafetyBadge';

interface StoryElement {
  id: string;
  type: 'character' | 'setting' | 'object' | 'mood';
  value: string;
  emoji: string;
}

interface GeneratedStory {
  title: string;
  content: string;
  moral?: string;
  timestamp: Date;
}

const storyElements = {
  characters: [
    { id: 'dragon', type: 'character' as const, value: 'friendly dragon', emoji: '🐲' },
    { id: 'princess', type: 'character' as const, value: 'brave princess', emoji: '👸' },
    { id: 'robot', type: 'character' as const, value: 'helpful robot', emoji: '🤖' },
    { id: 'wizard', type: 'character' as const, value: 'wise wizard', emoji: '🧙‍♂️' },
    { id: 'cat', type: 'character' as const, value: 'magical cat', emoji: '🐱' },
    { id: 'astronaut', type: 'character' as const, value: 'space explorer', emoji: '👨‍🚀' }
  ],
  settings: [
    { id: 'castle', type: 'setting' as const, value: 'enchanted castle', emoji: '🏰' },
    { id: 'forest', type: 'setting' as const, value: 'mystical forest', emoji: '🌲' },
    { id: 'space', type: 'setting' as const, value: 'distant planet', emoji: '🪐' },
    { id: 'underwater', type: 'setting' as const, value: 'underwater kingdom', emoji: '🌊' },
    { id: 'city', type: 'setting' as const, value: 'future city', emoji: '🏙️' },
    { id: 'mountain', type: 'setting' as const, value: 'snowy mountain', emoji: '⛰️' }
  ],
  objects: [
    { id: 'sword', type: 'object' as const, value: 'golden sword', emoji: '⚔️' },
    { id: 'book', type: 'object' as const, value: 'magic spell book', emoji: '📚' },
    { id: 'crystal', type: 'object' as const, value: 'glowing crystal', emoji: '💎' },
    { id: 'map', type: 'object' as const, value: 'treasure map', emoji: '🗺️' },
    { id: 'key', type: 'object' as const, value: 'mysterious key', emoji: '🔑' },
    { id: 'potion', type: 'object' as const, value: 'healing potion', emoji: '🧪' }
  ],
  moods: [
    { id: 'adventure', type: 'mood' as const, value: 'exciting adventure', emoji: '⚡' },
    { id: 'friendship', type: 'mood' as const, value: 'heartwarming friendship', emoji: '❤️' },
    { id: 'mystery', type: 'mood' as const, value: 'thrilling mystery', emoji: '🔍' },
    { id: 'comedy', type: 'mood' as const, value: 'funny comedy', emoji: '😄' },
    { id: 'courage', type: 'mood' as const, value: 'story of courage', emoji: '💪' },
    { id: 'discovery', type: 'mood' as const, value: 'amazing discovery', emoji: '✨' }
  ]
};

export default function StoryGeneratorProject() {
  const { data: session } = useSession();
  const [selectedElements, setSelectedElements] = useState<StoryElement[]>([]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedStories, setSavedStories] = useState<GeneratedStory[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  // Determine user tier
  const userTier = session?.user ? 'parent-pro' : 'free';
  const canUseAdvanced = userTier !== 'free';

  const toggleElement = (element: StoryElement) => {
    setSelectedElements(prev => {
      const exists = prev.find(el => el.id === element.id);
      if (exists) {
        return prev.filter(el => el.id !== element.id);
      } else {
        return [...prev, element];
      }
    });
  };

  const generateStory = async () => {
    if (selectedElements.length === 0 && !customPrompt.trim()) {
      alert('Please select some story elements or write a custom prompt!');
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate AI story generation (in real app, this would call OpenAI API)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const elements = selectedElements.map(el => el.value).join(', ');
      const prompt = customPrompt || `Create a story with: ${elements}`;

      // Mock generated story (in real app, this would be from AI)
      const mockStory: GeneratedStory = {
        title: generateStoryTitle(selectedElements),
        content: generateMockStory(selectedElements, customPrompt),
        moral: generateMoral(selectedElements),
        timestamp: new Date()
      };

      setGeneratedStory(mockStory);
      
      // Scroll to story
      setTimeout(() => {
        storyRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error('Error generating story:', error);
      alert('Oops! Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveStory = () => {
    if (generatedStory) {
      setSavedStories(prev => [generatedStory, ...prev]);
      alert('Story saved! 📚');
    }
  };

  const shareStory = () => {
    if (generatedStory && canUseAdvanced) {
      // In real app, this would integrate with sharing platform
      navigator.clipboard.writeText(generatedStory.content);
      alert('Story copied to clipboard! Share it with friends! 🎉');
    } else if (!canUseAdvanced) {
      alert('Upgrade to Parent Pro to share your stories! 🚀');
    }
  };

  const resetStory = () => {
    setSelectedElements([]);
    setCustomPrompt('');
    setGeneratedStory(null);
  };

  return (
    <>
      <SEOHead
        title="AI Story Generator | Kids Coding Project | siteoptz.ai"
        description="Build your own AI-powered story generator! Kids learn to create amazing stories using AI while building a real application."
        canonicalUrl="https://siteoptz.ai/kids-ai/projects/story-generator"
      />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                href="/kids-ai/coding"
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                ← Back to Projects
              </Link>
              <SafetyBadge type="coppa" />
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">📚</div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Magic Story Creator
              </h1>
              <p className="text-xl text-gray-300 mb-2">
                Build amazing stories with AI help! Pick your characters, settings, and watch the magic happen.
              </p>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-400">
                <span>⏱️ 30 minutes</span>
                <span>•</span>
                <span>🎯 Explorer Level</span>
                <span>•</span>
                <span>🤖 OpenAI GPT</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Story Builder */}
            <div className="space-y-6">
              {/* Character Selection */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  👥 Choose Your Characters
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {storyElements.characters.map((character) => (
                    <button
                      key={character.id}
                      onClick={() => toggleElement(character)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedElements.find(el => el.id === character.id)
                          ? 'border-blue-500 bg-blue-900/30'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-2xl mb-1">{character.emoji}</div>
                      <div className="text-white text-sm font-medium">{character.value}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Setting Selection */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  🏰 Pick Your Setting
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {storyElements.settings.map((setting) => (
                    <button
                      key={setting.id}
                      onClick={() => toggleElement(setting)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedElements.find(el => el.id === setting.id)
                          ? 'border-blue-500 bg-blue-900/30'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-2xl mb-1">{setting.emoji}</div>
                      <div className="text-white text-sm font-medium">{setting.value}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Object & Mood Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">🎯 Objects</h3>
                  <div className="space-y-2">
                    {storyElements.objects.slice(0, 3).map((object) => (
                      <button
                        key={object.id}
                        onClick={() => toggleElement(object)}
                        className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                          selectedElements.find(el => el.id === object.id)
                            ? 'border-blue-500 bg-blue-900/30'
                            : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        }`}
                      >
                        <span className="text-lg mr-2">{object.emoji}</span>
                        <span className="text-white text-sm">{object.value}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-black border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">💫 Story Mood</h3>
                  <div className="space-y-2">
                    {storyElements.moods.slice(0, 3).map((mood) => (
                      <button
                        key={mood.id}
                        onClick={() => toggleElement(mood)}
                        className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                          selectedElements.find(el => el.id === mood.id)
                            ? 'border-blue-500 bg-blue-900/30'
                            : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        }`}
                      >
                        <span className="text-lg mr-2">{mood.emoji}</span>
                        <span className="text-white text-sm">{mood.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advanced Options */}
              {canUseAdvanced && (
                <div className="bg-black border border-gray-800 rounded-xl p-6">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
                  >
                    <span>⚙️ Advanced Options</span>
                    {showAdvanced ? '▼' : '▶'}
                  </button>
                  
                  {showAdvanced && (
                    <div>
                      <label className="block text-white mb-2">Custom Story Prompt:</label>
                      <textarea
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="Describe your own story idea..."
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white resize-none"
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={generateStory}
                disabled={isGenerating}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                  isGenerating
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                } text-white`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Creating Your Story...
                  </div>
                ) : (
                  '✨ Generate My Story!'
                )}
              </button>

              {/* Selected Elements Preview */}
              {selectedElements.length > 0 && (
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Your Story Will Include:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedElements.map((element) => (
                      <span
                        key={element.id}
                        className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <span>{element.emoji}</span>
                        <span>{element.value}</span>
                        <button
                          onClick={() => toggleElement(element)}
                          className="ml-1 text-blue-300 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Generated Story Display */}
            <div className="space-y-6">
              {generatedStory ? (
                <div ref={storyRef} className="bg-black border border-gray-800 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">{generatedStory.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={saveStory}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={shareStory}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        📤 Share
                      </button>
                      <button
                        onClick={resetStory}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                      >
                        🔄 New Story
                      </button>
                    </div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {generatedStory.content}
                    </div>
                    
                    {generatedStory.moral && (
                      <div className="mt-6 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                        <h4 className="text-blue-300 font-semibold mb-2">Story Lesson:</h4>
                        <p className="text-blue-200 italic">{generatedStory.moral}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-6xl mb-4">📖</div>
                  <h3 className="text-xl font-bold text-white mb-2">Your Story Will Appear Here</h3>
                  <p className="text-gray-400">
                    Select your story elements and click &quot;Generate My Story!&quot; to see the magic happen.
                  </p>
                </div>
              )}

              {/* Learning Section */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🎓 What You&apos;re Learning</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <div>
                      <div className="text-white font-medium">AI Prompt Engineering</div>
                      <div className="text-gray-400 text-sm">How to give AI clear instructions to get better results</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <div>
                      <div className="text-white font-medium">Creative Thinking</div>
                      <div className="text-gray-400 text-sm">Combining different elements to create unique stories</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <div>
                      <div className="text-white font-medium">Story Structure</div>
                      <div className="text-gray-400 text-sm">Understanding characters, settings, and plot development</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">✓</span>
                    <div>
                      <div className="text-white font-medium">User Interface Design</div>
                      <div className="text-gray-400 text-sm">Creating buttons and interactive elements</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Saved Stories */}
              {savedStories.length > 0 && (
                <div className="bg-black border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">📚 Your Saved Stories</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {savedStories.map((story, index) => (
                      <div key={index} className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium">{story.title}</h4>
                            <p className="text-gray-400 text-sm">
                              {story.timestamp.toLocaleDateString()}
                            </p>
                          </div>
                          <button className="text-blue-400 hover:text-blue-300 text-sm">
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper functions for story generation
function generateStoryTitle(elements: StoryElement[]): string {
  const characters = elements.filter(el => el.type === 'character');
  const settings = elements.filter(el => el.type === 'setting');
  
  if (characters.length > 0 && settings.length > 0) {
    return `The ${characters[0].value.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')} and the ${settings[0].value.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')}`;
  }
  
  return 'An Amazing Adventure';
}

function generateMockStory(elements: StoryElement[], customPrompt: string): string {
  if (customPrompt.trim()) {
    return `Once upon a time, ${customPrompt.toLowerCase()}...

The adventure began on a bright sunny morning when our hero discovered something extraordinary. With courage in their heart and determination in their spirit, they embarked on a journey that would change everything.

Through challenges and obstacles, they learned the true meaning of friendship, bravery, and believing in oneself. Along the way, they met incredible companions who helped them discover their inner strength.

In the end, they realized that the greatest adventures come not from the places we go, but from the courage we find within ourselves and the kindness we show to others.

And they lived happily ever after, ready for their next great adventure!`;
  }

  const characters = elements.filter(el => el.type === 'character');
  const settings = elements.filter(el => el.type === 'setting');
  const objects = elements.filter(el => el.type === 'object');
  const moods = elements.filter(el => el.type === 'mood');

  const character = characters[0]?.value || 'a brave hero';
  const setting = settings[0]?.value || 'a magical land';
  const object = objects[0]?.value || 'a special treasure';
  const mood = moods[0]?.value || 'an exciting adventure';

  return `Once upon a time, there lived a ${character} in a beautiful ${setting}. 

One day, while exploring the wonders of their home, the ${character} discovered a mysterious ${object} hidden away in a secret place. This ${object} glowed with an inner light that seemed to pulse with ancient magic.

As they held the ${object}, the ${character} felt a surge of energy and knew that this was the beginning of ${mood}. The ${object} whispered secrets of faraway lands and untold wonders waiting to be discovered.

With newfound courage, the ${character} set off on an incredible journey. Along the way, they met other friendly creatures who became their companions. Together, they faced challenges that tested their wit, courage, and friendship.

Through their adventures, the ${character} learned that true magic comes from believing in yourself and being kind to others. The ${object} was just the key to unlocking the magic that was inside them all along.

In the end, the ${character} returned to the ${setting} as a hero, ready to share their wisdom and help others discover their own magical adventures.

And they all lived happily ever after!`;
}

function generateMoral(elements: StoryElement[]): string {
  const morals = [
    "True friendship is the greatest treasure of all.",
    "Courage isn't about not being afraid, it's about doing what's right despite your fears.",
    "The magic you seek is already within you.",
    "Kindness is a superpower that can change the world.",
    "Every challenge is an opportunity to grow stronger.",
    "Believing in yourself is the first step to achieving anything."
  ];
  
  return morals[Math.floor(Math.random() * morals.length)];
}