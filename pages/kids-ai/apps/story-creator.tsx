import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BookOpen, Image, Video, Download, Plus, Trash2, Edit3, Play } from 'lucide-react';

interface StoryPage {
  id: string;
  pageNumber: number;
  text: string;
  illustrationPrompt: string;
  illustrationUrl?: string;
  characterName?: string;
  characterDescription?: string;
}

interface StoryCharacter {
  id: string;
  name: string;
  description: string;
  appearance: string;
  personality: string;
  imageUrl?: string;
}

interface StoryTemplate {
  id: string;
  name: string;
  description: string;
  category: 'adventure' | 'friendship' | 'learning' | 'fantasy' | 'science';
  ageRange: { min: number; max: number };
  structure: {
    pages: number;
    suggestedText: string[];
  };
  characters: StoryCharacter[];
}

export default function StoryCreator() {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyPages, setStoryPages] = useState<StoryPage[]>([]);
  const [characters, setCharacters] = useState<StoryCharacter[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'ebook'>('edit');
  const [isGeneratingIllustration, setIsGeneratingIllustration] = useState(false);
  const [drawingStyle, setDrawingStyle] = useState('cartoon');
  const [ageGroup, setAgeGroup] = useState('5-8');

  const templates: StoryTemplate[] = [
    {
      id: 'adventure-robot',
      name: 'Space Robot Adventure',
      description: 'A brave robot explores new planets',
      category: 'adventure',
      ageRange: { min: 5, max: 10 },
      structure: {
        pages: 6,
        suggestedText: [
          'Once upon a time, there was a brave robot named Robo.',
          'Robo lived on a space station far from Earth.',
          'One day, Robo decided to explore a new planet.',
          'On the planet, Robo met friendly alien creatures.',
          'Together, they discovered a beautiful crystal cave.',
          'Robo returned home with amazing stories to tell!'
        ]
      },
      characters: [
        {
          id: 'robo',
          name: 'Robo',
          description: 'A friendly robot explorer',
          appearance: 'Silver robot with blue eyes, round body, and wheels',
          personality: 'Curious, brave, and kind'
        }
      ]
    },
    {
      id: 'magic-garden',
      name: 'The Magic Garden',
      description: 'A girl discovers a magical garden',
      category: 'fantasy',
      ageRange: { min: 5, max: 8 },
      structure: {
        pages: 5,
        suggestedText: [
          'Lily loved to play in her backyard.',
          'One morning, she found a tiny door in the garden wall.',
          'When she opened it, she entered a magical garden!',
          'The flowers could talk and the butterflies sang songs.',
          'Lily promised to visit every day and care for the garden.'
        ]
      },
      characters: [
        {
          id: 'lily',
          name: 'Lily',
          description: 'A curious young girl',
          appearance: 'Girl with brown hair, wearing a yellow dress',
          personality: 'Curious, caring, and adventurous'
        }
      ]
    },
    {
      id: 'dino-discovery',
      name: 'Dinosaur Discovery',
      description: 'Learning about dinosaurs through adventure',
      category: 'learning',
      ageRange: { min: 6, max: 10 },
      structure: {
        pages: 7,
        suggestedText: [
          'Max loved dinosaurs more than anything.',
          'He visited the museum every weekend.',
          'One day, a magic fossil came to life!',
          'A friendly T-Rex named Rex appeared.',
          'Rex showed Max how dinosaurs really lived.',
          'They learned about herbivores and carnivores.',
          'Max became a real paleontologist!'
        ]
      },
      characters: [
        {
          id: 'max',
          name: 'Max',
          description: 'A dinosaur-loving boy',
          appearance: 'Boy with glasses, wearing a dinosaur t-shirt',
          personality: 'Smart, enthusiastic, and curious'
        },
        {
          id: 'rex',
          name: 'Rex',
          description: 'A friendly T-Rex',
          appearance: 'Large green T-Rex with a friendly smile',
          personality: 'Wise, gentle, and patient'
        }
      ]
    }
  ];

  const drawingStyles = [
    { id: 'cartoon', name: 'Cartoon', description: 'Bright and colorful' },
    { id: 'watercolor', name: 'Watercolor', description: 'Soft and dreamy' },
    { id: 'digital', name: 'Digital Art', description: 'Modern and vibrant' },
    { id: 'sketch', name: 'Sketch', description: 'Simple line drawings' },
    { id: '3d', name: '3D Style', description: 'Three-dimensional look' }
  ];

  const loadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    setSelectedTemplate(templateId);
    setStoryTitle(template.name);
    setCharacters(template.characters);
    
    const pages: StoryPage[] = template.structure.suggestedText.map((text, index) => ({
      id: `page-${index}`,
      pageNumber: index + 1,
      text,
      illustrationPrompt: generateIllustrationPrompt(text, template.characters[0], drawingStyle),
      characterName: template.characters[0]?.name,
      characterDescription: template.characters[0]?.appearance
    }));

    setStoryPages(pages);
    setCurrentPage(0);
  };

  const generateIllustrationPrompt = (text: string, character: StoryCharacter, style: string): string => {
    return `Children's book illustration, ${style} style, age-appropriate, showing: ${text}. Character: ${character?.appearance || 'friendly character'}. Bright colors, safe for children, educational content.`;
  };

  const addPage = () => {
    const newPage: StoryPage = {
      id: `page-${Date.now()}`,
      pageNumber: storyPages.length + 1,
      text: '',
      illustrationPrompt: '',
      characterName: characters[0]?.name,
      characterDescription: characters[0]?.appearance
    };
    setStoryPages([...storyPages, newPage]);
    setCurrentPage(storyPages.length);
  };

  const updatePage = (pageId: string, updates: Partial<StoryPage>) => {
    setStoryPages(pages => 
      pages.map(page => 
        page.id === pageId ? { ...page, ...updates } : page
      )
    );
  };

  const deletePage = (pageId: string) => {
    const filtered = storyPages.filter(p => p.id !== pageId);
    // Renumber pages
    const renumbered = filtered.map((page, index) => ({
      ...page,
      pageNumber: index + 1
    }));
    setStoryPages(renumbered);
    if (currentPage >= renumbered.length) {
      setCurrentPage(Math.max(0, renumbered.length - 1));
    }
  };

  const generateIllustration = async (pageId: string) => {
    const page = storyPages.find(p => p.id === pageId);
    if (!page) return;

    setIsGeneratingIllustration(true);
    
    // Simulate AI image generation for demo
    setTimeout(() => {
      const placeholderImage = `https://via.placeholder.com/400x300/6366f1/ffffff?text=Page+${page.pageNumber}+Illustration`;
      updatePage(pageId, { illustrationUrl: placeholderImage });
      setIsGeneratingIllustration(false);
    }, 2000);
  };

  const enhanceStoryWithAI = async () => {
    // Simulate AI enhancement
    alert('✨ AI enhancement feature coming soon! This will improve your story text while maintaining character consistency.');
  };

  const exportAsEbook = () => {
    // Generate downloadable story data
    const ebookData = {
      title: storyTitle,
      pages: storyPages,
      characters,
      style: drawingStyle,
      ageGroup,
      createdAt: new Date().toISOString()
    };
    
    // Create downloadable file
    const blob = new Blob([JSON.stringify(ebookData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${storyTitle.replace(/\s+/g, '-')}-story.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentPageData = storyPages[currentPage];

  return (
    <>
      <Head>
        <title>Story Creator - Create Picture Books with AI | SiteOptz Kids</title>
        <meta name="description" content="Create professional children's picture books with AI-powered illustrations. Learn storytelling and character consistency." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black py-8">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-8">
            <Link href="/kids-ai" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
              ← Back to Kids AI Directory
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              📖 Story Creator - AI Picture Book Studio
            </h1>
            <p className="text-gray-300">
              Create professional children&apos;s stories with consistent characters and AI-powered illustrations
            </p>
          </header>

          {/* Template Selection */}
          {storyPages.length === 0 && (
            <div className="mb-8 bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Choose a Story Template</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template.id)}
                    className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 text-left transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                    <p className="text-gray-300 mb-3">{template.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{template.structure.pages} pages</span>
                      <span>•</span>
                      <span>Ages {template.ageRange.min}-{template.ageRange.max}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {storyPages.length > 0 && (
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Sidebar - Pages & Settings */}
              <div className="lg:col-span-1 space-y-4">
                {/* Story Settings */}
                <div className="bg-gray-900 rounded-lg p-4">
                  <input
                    type="text"
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    placeholder="Story Title"
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg mb-4"
                  />
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-300 mb-1 block">Age Group</label>
                      <select
                        value={ageGroup}
                        onChange={(e) => setAgeGroup(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg"
                      >
                        <option value="5-8">Ages 5-8</option>
                        <option value="6-10">Ages 6-10</option>
                        <option value="8-12">Ages 8-12</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-gray-300 mb-1 block">Drawing Style</label>
                      <select
                        value={drawingStyle}
                        onChange={(e) => setDrawingStyle(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg"
                      >
                        {drawingStyles.map(style => (
                          <option key={style.id} value={style.id}>
                            {style.name} - {style.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pages List */}
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Pages</h3>
                    <button
                      onClick={addPage}
                      className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {storyPages.map((page, index) => (
                      <button
                        key={page.id}
                        onClick={() => setCurrentPage(index)}
                        className={`w-full p-3 rounded-lg text-left transition-colors ${
                          currentPage === index
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Page {page.pageNumber}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePage(page.id);
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs mt-1 line-clamp-2 opacity-75">
                          {page.text || 'Empty page'}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Characters */}
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Characters</h3>
                  {characters.map(character => (
                    <div key={character.id} className="mb-3 p-3 bg-gray-800 rounded-lg">
                      <div className="font-semibold text-white">{character.name}</div>
                      <div className="text-sm text-gray-400">{character.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Editor */}
              <div className="lg:col-span-2">
                <div className="bg-gray-900 rounded-lg p-6">
                  {/* View Mode Toggle */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setViewMode('edit')}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        viewMode === 'edit'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Edit3 className="w-4 h-4 inline mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => setViewMode('preview')}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        viewMode === 'preview'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Play className="w-4 h-4 inline mr-2" />
                      Preview
                    </button>
                    <button
                      onClick={() => setViewMode('ebook')}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        viewMode === 'ebook'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 inline mr-2" />
                      E-book
                    </button>
                  </div>

                  {viewMode === 'edit' && currentPageData && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-300 mb-2 block">Page {currentPageData.pageNumber} Text</label>
                        <textarea
                          value={currentPageData.text}
                          onChange={(e) => updatePage(currentPageData.id, { text: e.target.value })}
                          placeholder="Write your story text here..."
                          className="w-full h-32 px-4 py-3 bg-gray-800 text-white rounded-lg resize-none"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 mb-2 block">Illustration</label>
                        {currentPageData.illustrationUrl ? (
                          <div className="relative">
                            <img
                              src={currentPageData.illustrationUrl}
                              alt={`Page ${currentPageData.pageNumber}`}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => generateIllustration(currentPageData.id)}
                              className="absolute top-2 right-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                            >
                              Regenerate
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              updatePage(currentPageData.id, {
                                illustrationPrompt: generateIllustrationPrompt(
                                  currentPageData.text,
                                  characters.find(c => c.name === currentPageData.characterName) || characters[0],
                                  drawingStyle
                                )
                              });
                              generateIllustration(currentPageData.id);
                            }}
                            disabled={isGeneratingIllustration || !currentPageData.text}
                            className="w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center hover:border-purple-500 transition-colors disabled:opacity-50"
                          >
                            {isGeneratingIllustration ? (
                              <div className="text-center">
                                <div className="animate-spin text-4xl mb-2">✨</div>
                                <p className="text-gray-300">Generating illustration...</p>
                              </div>
                            ) : (
                              <div className="text-center">
                                <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" alt="" />
                                <p className="text-gray-300">Generate AI Illustration</p>
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {viewMode === 'preview' && (
                    <div className="space-y-6">
                      {storyPages.map(page => (
                        <div key={page.id} className="bg-white rounded-lg p-6 min-h-[400px]">
                          {page.illustrationUrl && (
                            <img
                              src={page.illustrationUrl}
                              alt={`Page ${page.pageNumber}`}
                              className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                          )}
                          <p className="text-gray-800 text-lg leading-relaxed">{page.text}</p>
                          <div className="text-sm text-gray-500 mt-4">Page {page.pageNumber}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {viewMode === 'ebook' && (
                    <div className="bg-white rounded-lg p-8">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{storyTitle}</h2>
                        <p className="text-gray-600">A Story Created with SiteOptz Kids</p>
                      </div>
                      {storyPages.map(page => (
                        <div key={page.id} className="mb-8 pb-8 border-b border-gray-200 last:border-0">
                          {page.illustrationUrl && (
                            <img
                              src={page.illustrationUrl}
                              alt={`Page ${page.pageNumber}`}
                              className="w-full max-w-2xl mx-auto mb-4 rounded-lg"
                            />
                          )}
                          <p className="text-gray-800 text-xl leading-relaxed text-center max-w-2xl mx-auto">
                            {page.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900 rounded-lg p-4 space-y-4">
                  <button
                    onClick={enhanceStoryWithAI}
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                  >
                    ✨ Enhance Story with AI
                  </button>
                  
                  <button
                    onClick={exportAsEbook}
                    className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Export E-book
                  </button>

                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="text-white font-semibold mb-3">🎓 Learning Concepts</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>✓ <strong>Story Structure</strong>: Beginning, middle, end</li>
                      <li>✓ <strong>Character Consistency</strong>: Same character across pages</li>
                      <li>✓ <strong>Visual Storytelling</strong>: Text and images work together</li>
                      <li>✓ <strong>Narrative Flow</strong>: How stories progress</li>
                      <li>✓ <strong>Creative Writing</strong>: Expressing ideas through words</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}