import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import SafetyBadge from '../../../components/kids/SafetyBadge';

interface GameCharacter {
  id: string;
  name: string;
  emoji: string;
  type: 'hero' | 'enemy' | 'friend';
  abilities: string[];
}

interface GameElement {
  id: string;
  type: 'setting' | 'object' | 'challenge' | 'reward';
  name: string;
  emoji: string;
  description: string;
}

interface GameLevel {
  id: string;
  name: string;
  setting: GameElement;
  characters: GameCharacter[];
  challenges: GameElement[];
  rewards: GameElement[];
  story: string;
}

interface AIGame {
  id: string;
  title: string;
  genre: string;
  description: string;
  levels: GameLevel[];
  totalLevels: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdAt: Date;
  isPublished: boolean;
  playCount: number;
}

export default function KidsAIGameMaker() {
  const { data: session } = useSession();
  const userTier = session?.user ? 'parent-pro' : 'free';
  
  const [gameTitle, setGameTitle] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [gameDifficulty, setGameDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [selectedCharacters, setSelectedCharacters] = useState<GameCharacter[]>([]);
  const [selectedSetting, setSelectedSetting] = useState<GameElement | null>(null);
  const [gameStory, setGameStory] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentGame, setCurrentGame] = useState<AIGame | null>(null);
  const [savedGames, setSavedGames] = useState<AIGame[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'play' | 'gallery'>('create');
  const [gameplayState, setGameplayState] = useState<{
    currentLevel: number;
    score: number;
    playerChoices: string[];
  }>({ currentLevel: 0, score: 0, playerChoices: [] });

  // Game genres for kids
  const gameGenres = [
    { id: 'adventure', name: 'Adventure Quest', emoji: '🗺️', description: 'Explore magical worlds and solve puzzles' },
    { id: 'puzzle', name: 'Brain Puzzles', emoji: '🧩', description: 'Think your way through clever challenges' },
    { id: 'friendship', name: 'Friendship Story', emoji: '👫', description: 'Make friends and help others on your journey' },
    { id: 'nature', name: 'Nature Explorer', emoji: '🌿', description: 'Discover animals and plants in the wild' },
    { id: 'space', name: 'Space Mission', emoji: '🚀', description: 'Travel to planets and meet alien friends' },
    { id: 'mystery', name: 'Detective Mystery', emoji: '🔍', description: 'Solve fun mysteries and find clues' }
  ];

  // Characters for games
  const gameCharacters: GameCharacter[] = [
    { id: 'brave-knight', name: 'Brave Knight', emoji: '⚔️', type: 'hero', abilities: ['Courage', 'Sword Fighting', 'Protection'] },
    { id: 'wise-wizard', name: 'Wise Wizard', emoji: '🧙‍♂️', type: 'hero', abilities: ['Magic Spells', 'Wisdom', 'Healing'] },
    { id: 'clever-fox', name: 'Clever Fox', emoji: '🦊', type: 'friend', abilities: ['Cunning', 'Speed', 'Problem Solving'] },
    { id: 'friendly-dragon', name: 'Friendly Dragon', emoji: '🐲', type: 'friend', abilities: ['Flying', 'Fire Breathing', 'Loyalty'] },
    { id: 'robot-helper', name: 'Robot Helper', emoji: '🤖', type: 'friend', abilities: ['Computing', 'Strength', 'Analysis'] },
    { id: 'magical-unicorn', name: 'Magical Unicorn', emoji: '🦄', type: 'friend', abilities: ['Healing Magic', 'Purity', 'Grace'] },
    { id: 'sneaky-goblin', name: 'Sneaky Goblin', emoji: '👹', type: 'enemy', abilities: ['Stealth', 'Trickery', 'Mischief'] },
    { id: 'grumpy-troll', name: 'Grumpy Troll', emoji: '👺', type: 'enemy', abilities: ['Strength', 'Blocking', 'Stubbornness'] }
  ];

  // Game settings
  const gameSettings: GameElement[] = [
    { id: 'enchanted-forest', type: 'setting', name: 'Enchanted Forest', emoji: '🌲', description: 'A magical forest full of talking trees and hidden secrets' },
    { id: 'crystal-cave', type: 'setting', name: 'Crystal Cave', emoji: '💎', description: 'A sparkling cave filled with colorful crystals and mysteries' },
    { id: 'floating-islands', type: 'setting', name: 'Floating Islands', emoji: '☁️', description: 'Magical islands floating in the sky connected by rainbow bridges' },
    { id: 'underwater-city', type: 'setting', name: 'Underwater City', emoji: '🏙️', description: 'A beautiful city beneath the ocean where mermaids live' },
    { id: 'space-station', type: 'setting', name: 'Space Station', emoji: '🛰️', description: 'A high-tech station orbiting a colorful planet' },
    { id: 'candy-kingdom', type: 'setting', name: 'Candy Kingdom', emoji: '🍭', description: 'A sweet land where everything is made of delicious candy' }
  ];

  // Game challenges and rewards
  const gameElements: GameElement[] = [
    // Challenges
    { id: 'riddle-door', type: 'challenge', name: 'Riddle Door', emoji: '🚪', description: 'A door that only opens when you solve a clever riddle' },
    { id: 'maze-puzzle', type: 'challenge', name: 'Magic Maze', emoji: '🌀', description: 'Navigate through a shifting magical maze' },
    { id: 'friendship-test', type: 'challenge', name: 'Friendship Test', emoji: '🤝', description: 'Help two characters become friends by solving their problem' },
    { id: 'memory-game', type: 'challenge', name: 'Memory Challenge', emoji: '🧠', description: 'Remember the pattern of magical lights to unlock the path' },
    
    // Rewards
    { id: 'magic-sword', type: 'reward', name: 'Magic Sword', emoji: '⚔️', description: 'A glowing sword that helps you in future adventures' },
    { id: 'wisdom-book', type: 'reward', name: 'Book of Wisdom', emoji: '📚', description: 'An ancient book that teaches you new spells' },
    { id: 'friendship-medal', type: 'reward', name: 'Friendship Medal', emoji: '🏅', description: 'A special medal showing your kindness to others' },
    { id: 'crystal-key', type: 'reward', name: 'Crystal Key', emoji: '🗝️', description: 'A magical key that opens secret doors' }
  ];

  const generateGame = async () => {
    if (!gameTitle.trim() || !selectedGenre || !selectedSetting || selectedCharacters.length === 0) {
      alert('Please fill in all the game details before generating!');
      return;
    }

    if (userTier === 'free' && savedGames.length >= 2) {
      const upgrade = confirm('Free users can create 2 games. Upgrade to create unlimited games?');
      if (upgrade) {
        window.open('/kids-ai/pricing', '_blank');
      }
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate AI game generation
      await new Promise(resolve => setTimeout(resolve, 4000));

      const genre = gameGenres.find(g => g.id === selectedGenre)!;
      const challenges = gameElements.filter(e => e.type === 'challenge').slice(0, 3);
      const rewards = gameElements.filter(e => e.type === 'reward').slice(0, 2);

      // Generate multiple levels
      const levels: GameLevel[] = [];
      const numLevels = gameDifficulty === 'Easy' ? 3 : gameDifficulty === 'Medium' ? 5 : 7;

      for (let i = 0; i < numLevels; i++) {
        const level: GameLevel = {
          id: `level_${i + 1}`,
          name: `Level ${i + 1}: ${generateLevelName(i, genre.name)}`,
          setting: selectedSetting,
          characters: selectedCharacters,
          challenges: [challenges[i % challenges.length]],
          rewards: [rewards[i % rewards.length]],
          story: generateLevelStory(i, selectedSetting, selectedCharacters, genre.name)
        };
        levels.push(level);
      }

      const newGame: AIGame = {
        id: `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: gameTitle,
        genre: genre.name,
        description: gameStory || `An exciting ${genre.name.toLowerCase()} where you play as ${selectedCharacters[0]?.name} in ${selectedSetting.name}!`,
        levels,
        totalLevels: numLevels,
        difficulty: gameDifficulty,
        createdAt: new Date(),
        isPublished: false,
        playCount: 0
      };

      setSavedGames(prev => [newGame, ...prev]);
      setCurrentGame(newGame);
      setActiveTab('play');
      setGameplayState({ currentLevel: 0, score: 0, playerChoices: [] });

      // Reset form
      setGameTitle('');
      setSelectedGenre('');
      setSelectedSetting(null);
      setSelectedCharacters([]);
      setGameStory('');

    } catch (error) {
      console.error('Error generating game:', error);
      alert('Oops! Something went wrong. Please try again!');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateLevelName = (levelIndex: number, genre: string): string => {
    const levelNames = {
      'Adventure Quest': ['The Journey Begins', 'Into the Unknown', 'Hidden Treasures', 'The Great Challenge', 'Victory Path', 'Master Quest', 'Ultimate Adventure'],
      'Brain Puzzles': ['First Puzzle', 'Mind Bender', 'Logic Master', 'Brain Teaser', 'Puzzle Champion', 'Genius Level', 'Ultimate Challenge'],
      'Friendship Story': ['Meeting Friends', 'Learning Together', 'Helping Others', 'Team Challenge', 'True Friendship', 'Community Hero', 'Best Friends Forever'],
      'Nature Explorer': ['Forest Discovery', 'Animal Friends', 'Plant Mysteries', 'Nature Secrets', 'Wildlife Adventure', 'Ecosystem Hero', 'Nature Guardian'],
      'Space Mission': ['Launch Day', 'First Planet', 'Alien Contact', 'Space Mystery', 'Cosmic Adventure', 'Galaxy Explorer', 'Universe Hero'],
      'Detective Mystery': ['First Clue', 'Following Leads', 'Hidden Evidence', 'Solving Puzzles', 'Big Discovery', 'Case Closed', 'Master Detective']
    };
    return levelNames[genre as keyof typeof levelNames]?.[levelIndex] || `Level ${levelIndex + 1}`;
  };

  const generateLevelStory = (levelIndex: number, setting: GameElement, characters: GameCharacter[], genre: string): string => {
    const hero = characters.find(c => c.type === 'hero') || characters[0];
    const friend = characters.find(c => c.type === 'friend');
    
    const stories = [
      `Welcome to ${setting.name}! You are ${hero.name}, and your adventure begins now. ${friend ? `Your friend ${friend.name} is here to help you.` : ''} Are you ready to explore?`,
      `Deeper in ${setting.name}, you discover something amazing! ${hero.name} must use their ${hero.abilities[0]} to overcome the next challenge. What will you choose to do?`,
      `The adventure continues! ${hero.name} and ${friend?.name || 'your companions'} face a big decision in ${setting.name}. Your choices will determine what happens next!`,
      `Things are getting exciting! ${hero.name} has learned so much on this journey through ${setting.name}. One more big challenge awaits!`,
      `The final challenge approaches! ${hero.name} must use everything they've learned in ${setting.name}. Victory is within reach!`
    ];
    
    return stories[levelIndex] || stories[stories.length - 1];
  };

  const playLevel = (choice: string) => {
    if (!currentGame) return;

    const newChoices = [...gameplayState.playerChoices, choice];
    const newScore = gameplayState.score + 10;
    
    setGameplayState(prev => ({
      ...prev,
      score: newScore,
      playerChoices: newChoices
    }));

    // Advance to next level after a short delay
    setTimeout(() => {
      if (gameplayState.currentLevel < currentGame.levels.length - 1) {
        setGameplayState(prev => ({
          ...prev,
          currentLevel: prev.currentLevel + 1
        }));
      } else {
        // Game completed!
        setSavedGames(prev => prev.map(game => 
          game.id === currentGame.id 
            ? { ...game, playCount: game.playCount + 1 }
            : game
        ));
        alert(`🎉 Congratulations! You completed "${currentGame.title}"!\nFinal Score: ${newScore} points`);
      }
    }, 2000);
  };

  const loadGame = (game: AIGame) => {
    setCurrentGame(game);
    setGameplayState({ currentLevel: 0, score: 0, playerChoices: [] });
    setActiveTab('play');
  };

  return (
    <>
      <SEOHead
        title="AI Game Maker for Kids | Create Interactive Games | siteoptz.ai"
        description="Kids create their own interactive AI games! Build adventure games, puzzles, and stories with AI assistance. Learn game design and programming concepts safely."
        canonicalUrl="https://siteoptz.ai/kids-ai/projects/ai-game-maker"
        keywords={['kids game maker', 'AI game creation children', 'interactive games for kids', 'educational game builder', 'safe game programming']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 bg-clip-text text-transparent">
              AI Game Maker
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Create your own <strong>interactive games</strong> with AI! Build adventures, puzzles, and stories 
              that respond to player choices using smart AI game logic.
            </p>
            
            {/* Trust Signals */}
            <div className="flex justify-center gap-4 flex-wrap mb-8">
              <SafetyBadge type="coppa" />
              <SafetyBadge type="safetyCertified" />
              <SafetyBadge type="teacherApproved" />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-black border border-gray-800 rounded-lg p-1 flex">
              {[
                { id: 'create', name: 'Create Game', icon: '🎮' },
                { id: 'play', name: 'Play Game', icon: '🕹️' },
                { id: 'gallery', name: 'My Games', icon: '🏆' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }
                  `}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Create Tab */}
          {activeTab === 'create' && (
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Creator Panel */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span>🎮</span>
                  Design Your Game
                </h2>

                {/* Game Title */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Game Title:
                  </label>
                  <input
                    type="text"
                    value={gameTitle}
                    onChange={(e) => setGameTitle(e.target.value)}
                    placeholder="e.g., The Magic Forest Adventure, Space Explorer Quest..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    maxLength={50}
                  />
                </div>

                {/* Genre Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Choose Game Type:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {gameGenres.map(genre => (
                      <button
                        key={genre.id}
                        onClick={() => setSelectedGenre(genre.id)}
                        className={`
                          flex items-start gap-3 p-3 rounded-lg transition-all duration-200 text-left
                          ${selectedGenre === genre.id
                            ? 'bg-purple-600 text-white border-2 border-purple-400'
                            : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-gray-600'
                          }
                        `}
                      >
                        <span className="text-xl">{genre.emoji}</span>
                        <div>
                          <div className="font-medium text-sm">{genre.name}</div>
                          <div className="text-xs opacity-80">{genre.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Setting Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Pick a Setting:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {gameSettings.map(setting => (
                      <button
                        key={setting.id}
                        onClick={() => setSelectedSetting(setting)}
                        className={`
                          flex flex-col items-center p-3 rounded-lg transition-all duration-200
                          ${selectedSetting?.id === setting.id
                            ? 'bg-blue-600 text-white border-2 border-blue-400'
                            : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-gray-600'
                          }
                        `}
                      >
                        <span className="text-2xl mb-1">{setting.emoji}</span>
                        <span className="text-xs font-medium text-center">{setting.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Character Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Choose Characters (Select 1-3):
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {gameCharacters.map(character => (
                      <button
                        key={character.id}
                        onClick={() => {
                          if (selectedCharacters.find(c => c.id === character.id)) {
                            setSelectedCharacters(prev => prev.filter(c => c.id !== character.id));
                          } else if (selectedCharacters.length < 3) {
                            setSelectedCharacters(prev => [...prev, character]);
                          }
                        }}
                        className={`
                          flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-left text-sm
                          ${selectedCharacters.find(c => c.id === character.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }
                        `}
                      >
                        <span className="text-lg">{character.emoji}</span>
                        <div>
                          <div className="font-medium">{character.name}</div>
                          <div className="text-xs opacity-75">{character.type}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Selected Characters */}
                  {selectedCharacters.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedCharacters.map(character => (
                        <span
                          key={character.id}
                          className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs flex items-center gap-2"
                        >
                          {character.emoji} {character.name}
                          <button
                            onClick={() => setSelectedCharacters(prev => prev.filter(c => c.id !== character.id))}
                            className="text-green-300 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Difficulty */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Game Difficulty:
                  </label>
                  <div className="flex gap-3">
                    {['Easy', 'Medium', 'Hard'].map(difficulty => (
                      <button
                        key={difficulty}
                        onClick={() => setGameDifficulty(difficulty as any)}
                        className={`
                          px-4 py-2 rounded-lg font-medium transition-all duration-200
                          ${gameDifficulty === difficulty
                            ? 'bg-yellow-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }
                        `}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Easy: 3 levels • Medium: 5 levels • Hard: 7 levels
                  </p>
                </div>

                {/* Game Story */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Game Description (Optional):
                  </label>
                  <textarea
                    value={gameStory}
                    onChange={(e) => setGameStory(e.target.value)}
                    placeholder="Describe what happens in your game..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 resize-none h-20 focus:border-purple-500 focus:outline-none"
                    maxLength={200}
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateGame}
                  disabled={isGenerating || !gameTitle.trim() || !selectedGenre || !selectedSetting || selectedCharacters.length === 0}
                  className={`
                    w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200
                    ${isGenerating || !gameTitle.trim() || !selectedGenre || !selectedSetting || selectedCharacters.length === 0
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105'
                    }
                  `}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Creating Your Game...
                    </div>
                  ) : (
                    '🎮 Generate AI Game!'
                  )}
                </button>

                {/* Usage Counter for Free Users */}
                {userTier === 'free' && (
                  <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">Games Created:</span>
                      <span className="text-white font-bold">{savedGames.length}/2</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(savedGames.length / 2) * 100}%` }}
                      ></div>
                    </div>
                    {savedGames.length >= 2 && (
                      <p className="text-yellow-400 text-xs mt-2">
                        🔒 Upgrade to create unlimited games!
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Preview Panel */}
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span>👁️</span>
                  Game Preview
                </h2>

                {gameTitle && selectedGenre && selectedSetting && selectedCharacters.length > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-white mb-2">{gameTitle}</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {gameGenres.find(g => g.id === selectedGenre)?.name} • {gameDifficulty} Difficulty
                      </p>
                      <p className="text-gray-300 text-sm">
                        {gameStory || `An exciting ${gameGenres.find(g => g.id === selectedGenre)?.name.toLowerCase()} where you explore ${selectedSetting.name}!`}
                      </p>
                    </div>

                    <div className="bg-blue-900 rounded-lg p-3">
                      <h4 className="text-blue-200 font-medium text-sm mb-2">Setting:</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{selectedSetting.emoji}</span>
                        <span className="text-white text-sm">{selectedSetting.name}</span>
                      </div>
                      <p className="text-blue-200 text-xs mt-1">{selectedSetting.description}</p>
                    </div>

                    <div>
                      <h4 className="text-gray-400 font-medium text-sm mb-2">Characters:</h4>
                      <div className="space-y-2">
                        {selectedCharacters.map(character => (
                          <div key={character.id} className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
                            <span className="text-lg">{character.emoji}</span>
                            <div>
                              <div className="text-white text-sm font-medium">{character.name}</div>
                              <div className="text-gray-400 text-xs">{character.type} • {character.abilities.join(', ')}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎮</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Your Game Preview</h3>
                    <p className="text-gray-300 mb-6">
                      Fill in the game details to see your creation come to life!
                    </p>
                    
                    <div className="bg-gray-800 rounded-lg p-4 text-left">
                      <h4 className="text-sm font-bold text-purple-400 mb-2">🧠 What You&apos;ll Learn:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Game design and storytelling</li>
                        <li>• Character development and plot structure</li>
                        <li>• Interactive decision-making systems</li>
                        <li>• AI-powered game mechanics</li>
                        <li>• Creative problem solving and logic</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Play Tab */}
          {activeTab === 'play' && (
            <div className="max-w-4xl mx-auto mb-16">
              {currentGame ? (
                <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
                  {/* Game Header */}
                  <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 border-b border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{currentGame.title}</h3>
                        <p className="text-gray-200 text-sm">{currentGame.genre} • Level {gameplayState.currentLevel + 1} of {currentGame.totalLevels}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">Score: {gameplayState.score}</div>
                        <div className="text-gray-200 text-sm">{currentGame.difficulty}</div>
                      </div>
                    </div>
                  </div>

                  {/* Current Level */}
                  {gameplayState.currentLevel < currentGame.levels.length ? (
                    <div className="p-6">
                      {(() => {
                        const level = currentGame.levels[gameplayState.currentLevel];
                        return (
                          <div className="space-y-6">
                            <div className="text-center">
                              <h2 className="text-xl font-bold text-white mb-2">{level.name}</h2>
                              <div className="flex justify-center gap-2 mb-4">
                                <span className="text-2xl">{level.setting.emoji}</span>
                                {level.characters.map(char => (
                                  <span key={char.id} className="text-2xl">{char.emoji}</span>
                                ))}
                              </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-4">
                              <p className="text-gray-200 leading-relaxed">{level.story}</p>
                            </div>

                            {level.challenges.map(challenge => (
                              <div key={challenge.id} className="bg-red-900 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-2xl">{challenge.emoji}</span>
                                  <h4 className="text-red-200 font-bold">{challenge.name}</h4>
                                </div>
                                <p className="text-red-100 text-sm">{challenge.description}</p>
                              </div>
                            ))}

                            <div className="space-y-3">
                              <h4 className="text-white font-bold">What do you choose to do?</h4>
                              {[
                                'Use your special abilities to overcome the challenge',
                                'Work together with your friends to find a solution',
                                'Look for clues and think carefully before acting',
                                'Try a creative and unexpected approach'
                              ].map((choice, index) => (
                                <button
                                  key={index}
                                  onClick={() => playLevel(choice)}
                                  className="w-full bg-gray-800 hover:bg-blue-700 text-white p-3 rounded-lg text-left transition-colors duration-200"
                                >
                                  {index + 1}. {choice}
                                </button>
                              ))}
                            </div>

                            {level.rewards.map(reward => (
                              <div key={reward.id} className="bg-green-900 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{reward.emoji}</span>
                                  <span className="text-green-200 text-sm">Possible Reward: {reward.name}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="text-6xl mb-4">🎉</div>
                      <h2 className="text-3xl font-bold text-white mb-2">Congratulations!</h2>
                      <p className="text-gray-300 mb-4">You completed &quot;{currentGame.title}&quot;!</p>
                      <p className="text-yellow-400 font-bold mb-6">Final Score: {gameplayState.score} points</p>
                      <button
                        onClick={() => setGameplayState({ currentLevel: 0, score: 0, playerChoices: [] })}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
                      >
                        🔄 Play Again
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 bg-black border border-gray-800 rounded-xl">
                  <div className="text-6xl mb-4">🕹️</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Ready to Play?</h3>
                  <p className="text-gray-300 mb-6">
                    Create a game first or load an existing one to start playing!
                  </p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
                  >
                    🎮 Create Your First Game
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">🏆 Your Game Collection</h2>
              
              {savedGames.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedGames.map(game => (
                    <div
                      key={game.id}
                      className="bg-black border border-gray-800 rounded-xl p-6 hover:transform hover:-translate-y-1 hover:shadow-lg hover:border-purple-500 transition-all duration-300"
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-white mb-1">{game.title}</h3>
                        <p className="text-gray-400 text-sm">{game.genre}</p>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{game.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Levels:</span>
                          <span className="text-white font-bold">{game.totalLevels}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Difficulty:</span>
                          <span className="text-white font-bold">{game.difficulty}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Times Played:</span>
                          <span className="text-white font-bold">{game.playCount}</span>
                        </div>
                        
                        <button
                          onClick={() => loadGame(game)}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
                        >
                          🕹️ Play Game
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🎮</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Games Yet</h3>
                  <p className="text-gray-300 mb-6">
                    Create your first game to see it appear here!
                  </p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
                  >
                    🎮 Create My First Game
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Educational Content */}
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🧠 How AI Games Work</h2>
              <p className="text-xl opacity-90">
                Learn the exciting science behind AI-powered interactive games!
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-bold mb-2">1. Smart Choices</h3>
                <p className="text-sm opacity-80">
                  AI analyzes your choices and creates different story paths based on what you decide.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="text-lg font-bold mb-2">2. Dynamic Stories</h3>
                <p className="text-sm opacity-80">
                  The game changes based on your actions, creating unique adventures every time you play.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-lg font-bold mb-2">3. Learning Fun</h3>
                <p className="text-sm opacity-80">
                  Games teach problem-solving, creativity, and decision-making in an exciting way!
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/kids-ai/safety"
                className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🛡️ Learn About Safe Gaming with AI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}