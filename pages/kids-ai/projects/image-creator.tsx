import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import SafetyBadge from '../../../components/kids/SafetyBadge';

interface ImageStyle {
  id: string;
  name: string;
  emoji: string;
  description: string;
  examples: string[];
}

interface ImageCategory {
  id: string;
  name: string;
  emoji: string;
  prompts: string[];
}

interface GeneratedImage {
  id: string;
  prompt: string;
  style: string;
  category: string;
  imageUrl: string;
  timestamp: Date;
  title: string;
  isPublic: boolean;
}

export default function KidsAIImageCreator() {
  const { data: session } = useSession();
  const userTier = session?.user ? 'parent-pro' : 'free';
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<string>('square');
  const [quality, setQuality] = useState<string>('standard');

  // Image categories for kids
  const imageCategories: ImageCategory[] = [
    {
      id: 'animals',
      name: 'Cute Animals',
      emoji: '🐾',
      prompts: [
        'A friendly cartoon puppy playing in a sunny park',
        'A wise old owl reading a book in a magical forest',
        'A playful kitten chasing rainbow butterflies',
        'A happy elephant wearing a party hat',
        'A brave little mouse on an adventure'
      ]
    },
    {
      id: 'fantasy',
      name: 'Fantasy Worlds',
      emoji: '🧚‍♀️',
      prompts: [
        'A magical castle floating on fluffy clouds',
        'A friendly dragon teaching children to read',
        'A sparkly fairy garden with glowing flowers',
        'A wizard\'s workshop filled with colorful potions',
        'A unicorn running through a rainbow meadow'
      ]
    },
    {
      id: 'space',
      name: 'Space Adventure',
      emoji: '🚀',
      prompts: [
        'A friendly robot exploring a colorful alien planet',
        'Children astronauts discovering a moon made of cheese',
        'A space station garden growing vegetables among the stars',
        'Cute alien friends having a picnic on Mars',
        'A rocket ship shaped like a banana flying to Jupiter'
      ]
    },
    {
      id: 'underwater',
      name: 'Ocean Friends',
      emoji: '🐠',
      prompts: [
        'A cheerful octopus teaching fish how to paint',
        'A mermaid\'s underwater library filled with books',
        'Dolphins playing volleyball with sea turtles',
        'A whale wearing glasses reading to small fish',
        'A coral reef school where seahorses learn math'
      ]
    },
    {
      id: 'vehicles',
      name: 'Cool Vehicles',
      emoji: '🚗',
      prompts: [
        'A train that runs on rainbow tracks through the clouds',
        'A flying bicycle with butterfly wings',
        'A submarine exploring a candy-filled ocean',
        'A race car powered by friendship and kindness',
        'A hot air balloon shaped like a giant cupcake'
      ]
    },
    {
      id: 'food',
      name: 'Yummy Food',
      emoji: '🍎',
      prompts: [
        'A pizza party with vegetables dancing on top',
        'Ice cream cones that sing happy songs',
        'A fruit salad having a dance party',
        'Cookies learning to bake themselves',
        'A taco truck driven by friendly avocados'
      ]
    }
  ];

  // Art styles appropriate for kids
  const imageStyles: ImageStyle[] = [
    {
      id: 'cartoon',
      name: 'Cartoon Style',
      emoji: '🎨',
      description: 'Bright, colorful cartoon illustrations perfect for children',
      examples: ['Disney-like characters', 'Animated movie style', 'Comic book art']
    },
    {
      id: 'watercolor',
      name: 'Watercolor Paint',
      emoji: '🖌️',
      description: 'Soft, dreamy watercolor paintings',
      examples: ['Children\'s book illustrations', 'Gentle brush strokes', 'Pastel colors']
    },
    {
      id: 'pixel',
      name: 'Pixel Art',
      emoji: '🕹️',
      description: 'Retro video game style pixel art',
      examples: ['8-bit characters', 'Video game sprites', 'Blocky art style']
    },
    {
      id: 'clay',
      name: 'Clay Animation',
      emoji: '🏺',
      description: 'Fun clay or playdough-style 3D art',
      examples: ['Stop-motion style', 'Chunky 3D models', 'Craft-like texture']
    },
    {
      id: 'storybook',
      name: 'Storybook Art',
      emoji: '📚',
      description: 'Classic children\'s book illustration style',
      examples: ['Picture book art', 'Hand-drawn illustrations', 'Warm, inviting scenes']
    }
  ];

  const generateImage = async () => {
    if (!selectedCategory && !customPrompt.trim()) {
      alert('Please select a category or write your own prompt!');
      return;
    }

    if (userTier === 'free' && generatedImages.length >= 3) {
      const upgrade = confirm('You\'ve used your 3 free images! Upgrade to generate unlimited images. Go to pricing page?');
      if (upgrade) {
        window.open('/kids-ai/pricing', '_blank');
      }
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate AI image generation delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const prompt = customPrompt.trim() || 
        (selectedCategory && imageCategories.find(cat => cat.id === selectedCategory)?.prompts[
          Math.floor(Math.random() * imageCategories.find(cat => cat.id === selectedCategory)!.prompts.length)
        ]) || 
        'A friendly cartoon character in a colorful world';

      const selectedStyleObj = imageStyles.find(style => style.id === selectedStyle);
      const fullPrompt = `${prompt}${selectedStyleObj ? `, in ${selectedStyleObj.description.toLowerCase()}` : ', in cartoon style'}`;

      // Generate mock image (in real app, this would call DALL-E API)
      const mockImageUrl = generateMockImage(prompt, selectedStyle);

      const newImage: GeneratedImage = {
        id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        prompt: fullPrompt,
        style: selectedStyleObj?.name || 'Cartoon Style',
        category: imageCategories.find(cat => cat.id === selectedCategory)?.name || 'Custom',
        imageUrl: mockImageUrl,
        timestamp: new Date(),
        title: generateImageTitle(prompt),
        isPublic: false
      };

      setGeneratedImages(prev => [newImage, ...prev]);
      setCurrentImage(newImage);
      
      // Reset form
      setCustomPrompt('');
      if (!userTier || userTier === 'free') {
        setSelectedCategory('');
        setSelectedStyle('');
      }

    } catch (error) {
      console.error('Error generating image:', error);
      alert('Oops! Something went wrong. Please try again!');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockImage = (prompt: string, style: string): string => {
    // Mock image URLs (in real app, these would come from DALL-E)
    const mockImages = [
      'https://picsum.photos/512/512?random=1',
      'https://picsum.photos/512/512?random=2',
      'https://picsum.photos/512/512?random=3',
      'https://picsum.photos/512/512?random=4',
      'https://picsum.photos/512/512?random=5'
    ];
    return mockImages[Math.floor(Math.random() * mockImages.length)];
  };

  const generateImageTitle = (prompt: string): string => {
    const words = prompt.split(' ').slice(0, 3);
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const shareImage = (image: GeneratedImage) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out my AI art: ${image.title}`,
        text: `I created this amazing image using AI: ${image.prompt}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Check out my AI art: ${image.title} - ${image.prompt}`);
      alert('Image details copied to clipboard!');
    }
  };

  const downloadImage = async (image: GeneratedImage) => {
    try {
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Download failed. Please try again!');
    }
  };

  return (
    <>
      <SEOHead
        title="AI Image Creator for Kids | Build Art with DALL-E | siteoptz.ai"
        description="Kids create amazing artwork using real AI image generation! Build images with DALL-E in a safe, educational environment. Perfect for young artists and creators."
        canonicalUrl="https://siteoptz.ai/kids-ai/projects/image-creator"
        keywords={['kids AI art', 'children image generator', 'DALL-E for kids', 'AI art creation', 'safe AI image generation']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🎨</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              AI Image Creator
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Create amazing artwork with <strong>real AI technology</strong>! Use DALL-E to bring your imagination to life 
              in a safe, fun environment designed just for kids.
            </p>
            
            {/* Trust Signals */}
            <div className="flex justify-center gap-4 flex-wrap mb-8">
              <SafetyBadge type="coppa" />
              <SafetyBadge type="safetyCertified" />
              <SafetyBadge type="teacherApproved" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Creation Panel */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span>🖼️</span>
                Create Your Image
              </h2>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Choose an Image Category:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {imageCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`
                        flex flex-col items-center p-3 rounded-lg transition-all duration-200
                        ${selectedCategory === category.id
                          ? 'bg-purple-600 text-white border-2 border-purple-400'
                          : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-gray-600'
                        }
                      `}
                    >
                      <span className="text-2xl mb-1">{category.emoji}</span>
                      <span className="text-xs font-medium text-center">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Pick an Art Style:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {imageStyles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`
                        flex items-start gap-3 p-3 rounded-lg transition-all duration-200 text-left
                        ${selectedStyle === style.id
                          ? 'bg-blue-600 text-white border-2 border-blue-400'
                          : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-gray-600'
                        }
                      `}
                    >
                      <span className="text-xl">{style.emoji}</span>
                      <div>
                        <div className="font-medium text-sm">{style.name}</div>
                        <div className="text-xs opacity-80">{style.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Prompt */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Or describe your own idea:
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Describe what you want to create... (e.g., 'A friendly robot dog playing with children in a colorful garden')"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 resize-none h-24 focus:border-blue-500 focus:outline-none"
                  maxLength={200}
                />
                <div className="text-xs text-gray-400 mt-1">
                  {customPrompt.length}/200 characters
                </div>
              </div>

              {/* Advanced Options for Premium Users */}
              {userTier !== 'free' && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors mb-3"
                  >
                    {showAdvanced ? '📐 Hide Advanced Options' : '📐 Show Advanced Options'}
                  </button>
                  
                  {showAdvanced && (
                    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Image Size:
                        </label>
                        <select
                          value={aspectRatio}
                          onChange={(e) => setAspectRatio(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                        >
                          <option value="square">Square (1:1)</option>
                          <option value="landscape">Landscape (16:9)</option>
                          <option value="portrait">Portrait (9:16)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Quality:
                        </label>
                        <select
                          value={quality}
                          onChange={(e) => setQuality(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                        >
                          <option value="standard">Standard</option>
                          <option value="hd">High Definition</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={generateImage}
                disabled={isGenerating || (!selectedCategory && !customPrompt.trim())}
                className={`
                  w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200
                  ${isGenerating
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 transform hover:scale-105'
                  }
                `}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Creating Your Image...
                  </div>
                ) : (
                  '🎨 Generate Image with AI!'
                )}
              </button>

              {/* Usage Counter for Free Users */}
              {userTier === 'free' && (
                <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Images Generated:</span>
                    <span className="text-white font-bold">{generatedImages.length}/3</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(generatedImages.length / 3) * 100}%` }}
                    ></div>
                  </div>
                  {generatedImages.length >= 3 && (
                    <p className="text-yellow-400 text-xs mt-2">
                      🔒 Upgrade to generate unlimited images!
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Results Panel */}
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span>🖼️</span>
                Your AI Artwork
              </h2>

              {currentImage ? (
                <div className="space-y-4">
                  {/* Main Image Display */}
                  <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={currentImage.imageUrl}
                      alt={currentImage.title}
                      className="w-full h-auto max-h-96 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                        {currentImage.style}
                      </span>
                    </div>
                  </div>

                  {/* Image Details */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white">{currentImage.title}</h3>
                    <p className="text-gray-300 text-sm">{currentImage.prompt}</p>
                    
                    <div className="flex gap-2 text-xs">
                      <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded">
                        {currentImage.category}
                      </span>
                      <span className="bg-purple-900 text-purple-300 px-2 py-1 rounded">
                        {currentImage.style}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => downloadImage(currentImage)}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        💾 Download
                      </button>
                      <button
                        onClick={() => shareImage(currentImage)}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        📤 Share
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Ready to Create?</h3>
                  <p className="text-gray-300 mb-6">
                    Choose a category and art style, then click generate to create your first AI image!
                  </p>
                  
                  {/* What Kids Learn */}
                  <div className="bg-gray-800 rounded-lg p-4 text-left">
                    <h4 className="text-sm font-bold text-blue-400 mb-2">🧠 What You'll Learn:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• How AI creates images from text descriptions</li>
                      <li>• Writing effective prompts for AI art tools</li>
                      <li>• Different art styles and techniques</li>
                      <li>• Creative problem solving and visual thinking</li>
                      <li>• Digital art concepts and composition</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gallery */}
          {generatedImages.length > 0 && (
            <div className="bg-black border border-gray-800 rounded-xl p-6 mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">🖼️ Your Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {generatedImages.map(image => (
                  <div 
                    key={image.id}
                    className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-all duration-200"
                    onClick={() => setCurrentImage(image)}
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="text-white font-medium text-sm truncate">{image.title}</h4>
                      <p className="text-gray-400 text-xs">{image.style}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🧠 How AI Creates Art</h2>
              <p className="text-xl opacity-90">
                Learn the amazing science behind AI image generation!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="text-lg font-bold mb-2">1. Write Description</h3>
                <p className="text-sm opacity-80">
                  You describe what you want to see using words and ideas.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🧠</div>
                <h3 className="text-lg font-bold mb-2">2. AI Understands</h3>
                <p className="text-sm opacity-80">
                  The AI reads your words and imagines what the picture should look like.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-lg font-bold mb-2">3. Magic Creation</h3>
                <p className="text-sm opacity-80">
                  Like a super-fast artist, the AI paints your idea pixel by pixel!
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/kids-ai/safety"
                className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🛡️ Learn About AI Safety
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}