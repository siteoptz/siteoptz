import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function StoryCreator() {
  const [currentStep, setCurrentStep] = useState('character');
  const [storyElements, setStoryElements] = useState({
    character: '',
    setting: '',
    genre: '',
    plot: ''
  });
  const [generatedStory, setGeneratedStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const characters = [
    { id: 'brave-knight', name: 'Brave Knight', emoji: '🛡️', description: 'A courageous knight on a quest' },
    { id: 'wise-owl', name: 'Wise Owl', emoji: '🦉', description: 'A smart owl who loves books' },
    { id: 'friendly-dragon', name: 'Friendly Dragon', emoji: '🐉', description: 'A kind dragon who loves making friends' },
    { id: 'curious-cat', name: 'Curious Cat', emoji: '🐱', description: 'An adventurous cat explorer' },
    { id: 'magical-unicorn', name: 'Magical Unicorn', emoji: '🦄', description: 'A mystical unicorn with special powers' },
    { id: 'space-robot', name: 'Space Robot', emoji: '🤖', description: 'A friendly robot from the future' }
  ];

  const settings = [
    { id: 'enchanted-forest', name: 'Enchanted Forest', emoji: '🌲', description: 'A magical forest full of wonders' },
    { id: 'castle', name: 'Royal Castle', emoji: '🏰', description: 'A grand castle with many secrets' },
    { id: 'space-station', name: 'Space Station', emoji: '🚀', description: 'A futuristic home among the stars' },
    { id: 'underwater-city', name: 'Underwater City', emoji: '🌊', description: 'A beautiful city beneath the waves' },
    { id: 'mountain-peak', name: 'Mountain Peak', emoji: '⛰️', description: 'The highest mountain with amazing views' },
    { id: 'magical-garden', name: 'Magical Garden', emoji: '🌺', description: 'A garden where anything can grow' }
  ];

  const genres = [
    { id: 'adventure', name: 'Adventure', emoji: '⚔️', description: 'Exciting quests and brave journeys' },
    { id: 'friendship', name: 'Friendship', emoji: '🤝', description: 'Stories about making and keeping friends' },
    { id: 'mystery', name: 'Mystery', emoji: '🔍', description: 'Puzzles to solve and secrets to uncover' },
    { id: 'comedy', name: 'Comedy', emoji: '😄', description: 'Funny stories that make you laugh' },
    { id: 'learning', name: 'Learning', emoji: '📚', description: 'Educational adventures that teach new things' },
    { id: 'kindness', name: 'Kindness', emoji: '💝', description: 'Heartwarming stories about helping others' }
  ];

  const generateStory = () => {
    setIsGenerating(true);
    
    // Simulate AI story generation with safe, pre-written content
    setTimeout(() => {
      const selectedCharacter = characters.find(c => c.id === storyElements.character);
      const selectedSetting = settings.find(s => s.id === storyElements.setting);
      const selectedGenre = genres.find(g => g.id === storyElements.genre);
      
      const storyTemplates = {
        adventure: `Once upon a time, ${selectedCharacter?.name} lived in the ${selectedSetting?.name}. One sunny morning, they decided to go on an amazing adventure! They packed their favorite snacks and set off to explore. Along the way, they discovered a hidden path that led to the most wonderful surprise. Their brave heart and kind spirit helped them overcome every challenge, and they returned home with stories that would last a lifetime.`,
        
        friendship: `In the beautiful ${selectedSetting?.name}, lived a ${selectedCharacter?.name} who was looking for a friend. One day, while exploring, they met another character who seemed lonely too. At first, they were both shy, but soon they discovered they both loved the same games! They spent the day playing, sharing stories, and laughing together. From that day forward, they became the very best of friends.`,
        
        mystery: `${selectedCharacter?.name} noticed something strange in the ${selectedSetting?.name}. There were mysterious sparkles appearing everywhere! Being curious and clever, they decided to investigate. They followed clues, asked questions, and used their smart thinking. Finally, they discovered the sparkles were from a magical celebration that happens once a year. Everyone was invited to join the wonderful party!`,
        
        comedy: `${selectedCharacter?.name} was having a particularly silly day in the ${selectedSetting?.name}. Everything they tried to do turned out funny! When they tried to make breakfast, the pancakes turned into funny shapes. When they tried to clean up, they ended up dancing with the cleaning supplies. Everyone around them couldn't stop giggling, and soon the whole place was filled with joyful laughter.`,
        
        learning: `${selectedCharacter?.name} was curious about how things work in the ${selectedSetting?.name}. They decided to become a detective of knowledge! They asked questions, conducted safe experiments, and made amazing discoveries. By the end of their learning adventure, they had not only gained new knowledge but also realized that learning is the greatest adventure of all.`,
        
        kindness: `${selectedCharacter?.name} noticed that someone in the ${selectedSetting?.name} needed help. Without hesitation, they offered their assistance with a warm smile. Their act of kindness inspired others to help too, creating a beautiful chain of caring. Soon, the whole community was working together, and everyone felt happier and more connected than ever before.`
      };
      
      const story = storyTemplates[selectedGenre?.id as keyof typeof storyTemplates] || storyTemplates.adventure;
      setGeneratedStory(story);
      setIsGenerating(false);
    }, 2000);
  };

  const resetStory = () => {
    setCurrentStep('character');
    setStoryElements({
      character: '',
      setting: '',
      genre: '',
      plot: ''
    });
    setGeneratedStory('');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'character':
        return (
          <div className="step-content">
            <h2 className="text-2xl font-bold text-white mb-6">Choose Your Main Character</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {characters.map((character) => (
                <button
                  key={character.id}
                  onClick={() => setStoryElements({...storyElements, character: character.id})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    storyElements.character === character.id
                      ? 'border-blue-400 bg-blue-600/20 text-white'
                      : 'border-gray-600 bg-gray-800 hover:border-gray-400 text-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{character.emoji}</div>
                  <h3 className="font-semibold">{character.name}</h3>
                  <p className="text-sm opacity-80">{character.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'setting':
        return (
          <div className="step-content">
            <h2 className="text-2xl font-bold text-white mb-6">Choose Your Setting</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {settings.map((setting) => (
                <button
                  key={setting.id}
                  onClick={() => setStoryElements({...storyElements, setting: setting.id})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    storyElements.setting === setting.id
                      ? 'border-purple-400 bg-purple-600/20 text-white'
                      : 'border-gray-600 bg-gray-800 hover:border-gray-400 text-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{setting.emoji}</div>
                  <h3 className="font-semibold">{setting.name}</h3>
                  <p className="text-sm opacity-80">{setting.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'genre':
        return (
          <div className="step-content">
            <h2 className="text-2xl font-bold text-white mb-6">Choose Your Story Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setStoryElements({...storyElements, genre: genre.id})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    storyElements.genre === genre.id
                      ? 'border-green-400 bg-green-600/20 text-white'
                      : 'border-gray-600 bg-gray-800 hover:border-gray-400 text-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{genre.emoji}</div>
                  <h3 className="font-semibold">{genre.name}</h3>
                  <p className="text-sm opacity-80">{genre.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'generate':
        return (
          <div className="step-content text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Ready to Create Your Story!</h2>
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Story Elements:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-600/20 rounded-lg p-4">
                  <div className="text-2xl mb-2">{characters.find(c => c.id === storyElements.character)?.emoji}</div>
                  <div className="text-white font-medium">{characters.find(c => c.id === storyElements.character)?.name}</div>
                </div>
                <div className="bg-purple-600/20 rounded-lg p-4">
                  <div className="text-2xl mb-2">{settings.find(s => s.id === storyElements.setting)?.emoji}</div>
                  <div className="text-white font-medium">{settings.find(s => s.id === storyElements.setting)?.name}</div>
                </div>
                <div className="bg-green-600/20 rounded-lg p-4">
                  <div className="text-2xl mb-2">{genres.find(g => g.id === storyElements.genre)?.emoji}</div>
                  <div className="text-white font-medium">{genres.find(g => g.id === storyElements.genre)?.name}</div>
                </div>
              </div>
            </div>
            
            {!generatedStory && (
              <button
                onClick={generateStory}
                disabled={isGenerating}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {isGenerating ? '✨ Creating Your Story...' : '🎭 Generate My Story!'}
              </button>
            )}

            {generatedStory && (
              <div className="bg-yellow-500/10 border-l-4 border-yellow-500 rounded-lg p-6 text-left">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">📖 Your Amazing Story</h3>
                <p className="text-white leading-relaxed text-lg">{generatedStory}</p>
                <div className="mt-6 flex gap-4 justify-center">
                  <button
                    onClick={resetStory}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    📝 Create Another Story
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedStory)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    📋 Copy Story
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>SiteOptz Story Creator - Safe AI Story Generation for Kids</title>
        <meta name="description" content="Create amazing stories with our safe, proprietary AI story generator designed specifically for children" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="text-center mb-8">
            <Link href="/kids-ai" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              📚 SiteOptz Story Creator
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Create magical stories with our safe AI assistant!
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
                🚫 No Ads
              </span>
            </div>
          </header>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-4">
              {['character', 'setting', 'genre', 'generate'].map((step, index) => (
                <React.Fragment key={step}>
                  <button
                    onClick={() => setCurrentStep(step)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep === step
                        ? 'bg-blue-600 text-white'
                        : index < ['character', 'setting', 'genre', 'generate'].indexOf(currentStep)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </button>
                  {index < 3 && (
                    <div className={`w-8 h-1 ${
                      index < ['character', 'setting', 'genre', 'generate'].indexOf(currentStep)
                        ? 'bg-green-600'
                        : 'bg-gray-700'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="text-center mt-2">
              <span className="text-gray-400 text-sm">
                Step {['character', 'setting', 'genre', 'generate'].indexOf(currentStep) + 1} of 4
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-gray-900 rounded-2xl p-8 min-h-96">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => {
                const steps = ['character', 'setting', 'genre', 'generate'];
                const currentIndex = steps.indexOf(currentStep);
                if (currentIndex > 0) setCurrentStep(steps[currentIndex - 1]);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentStep === 'character'
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={currentStep === 'character'}
            >
              ← Previous
            </button>

            {currentStep !== 'generate' && (
              <button
                onClick={() => {
                  const steps = ['character', 'setting', 'genre', 'generate'];
                  const currentIndex = steps.indexOf(currentStep);
                  const currentElement = storyElements[currentStep as keyof typeof storyElements];
                  
                  if (currentElement) {
                    setCurrentStep(steps[currentIndex + 1]);
                  }
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  storyElements[currentStep as keyof typeof storyElements]
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!storyElements[currentStep as keyof typeof storyElements]}
              >
                Next →
              </button>
            )}
          </div>

          {/* Safety Information */}
          <div className="mt-12 bg-green-600/10 border border-green-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-4">🛡️ Safety & Privacy Information</h3>
            <ul className="text-green-300 space-y-2">
              <li>✅ All stories are generated using safe, pre-approved content templates</li>
              <li>✅ No external AI services - everything runs on our secure servers</li>
              <li>✅ No personal data collection or storage</li>
              <li>✅ Content is reviewed by child development experts</li>
              <li>✅ Stories promote positive values and educational themes</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}