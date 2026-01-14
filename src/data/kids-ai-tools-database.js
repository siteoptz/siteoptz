// Kids AI Tools Database - White Label Proprietary Apps
// Replaces third-party apps with our own branded solutions

export const kidsAIToolsDatabase = {
  categories: [
    {
      id: 'creative-writing',
      name: 'Creative Writing & Stories',
      description: 'AI-powered writing and storytelling tools designed for children',
      tools: [
        {
          id: 'siteoptz-story-creator',
          name: 'SiteOptz Story Creator',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 6, max: 16 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.2,
          parentRating: 4.9,
          reviewCount: 1580,
          categories: ['creative-writing', 'imagination'],
          description: 'Our proprietary AI story generator that helps kids create magical tales and adventures',
          features: ['Interactive story building', 'Character creation wizard', 'Illustration suggestions', 'Reading comprehension quizzes'],
          safetyNotes: 'COPPA compliant, no external links, parent-monitored content generation',
          appType: 'white-label',
          useCase: ['Creative writing', 'Reading comprehension', 'Imagination development'],
          replaces: 'StoryBird, Book Creator, other story apps'
        },
        {
          id: 'siteoptz-poetry-pal',
          name: 'SiteOptz Poetry Pal',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 8, max: 14 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 8.5,
          parentRating: 4.7,
          reviewCount: 890,
          categories: ['creative-writing', 'language-arts'],
          description: 'AI-powered poetry assistant that teaches kids about rhythm, rhyme, and literary devices',
          features: ['Rhyme suggestions', 'Meter guidance', 'Poetry forms tutorial', 'Vocabulary builder'],
          safetyNotes: 'Safe content only, educational focus, parental oversight',
          appType: 'white-label',
          useCase: ['Poetry writing', 'Language learning', 'Literary education'],
          replaces: 'Poetry apps, writing assistants'
        }
      ]
    },
    {
      id: 'math-learning',
      name: 'Math & Problem Solving',
      description: 'Interactive AI math tutors and problem-solving games',
      tools: [
        {
          id: 'siteoptz-math-wizard',
          name: 'SiteOptz Math Wizard',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 5, max: 18 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.8,
          parentRating: 4.9,
          reviewCount: 2140,
          categories: ['math-learning', 'problem-solving'],
          description: 'Our flagship AI math tutor that adapts to each child\'s learning pace and style',
          features: ['Adaptive learning path', 'Step-by-step explanations', 'Visual problem solving', 'Progress tracking', 'Gamified challenges'],
          safetyNotes: 'Educational content only, no social features, detailed progress reports for parents',
          appType: 'white-label',
          useCase: ['Math tutoring', 'Homework help', 'Skill assessment'],
          replaces: 'Khan Academy Kids, Prodigy Math, IXL'
        },
        {
          id: 'siteoptz-logic-builder',
          name: 'SiteOptz Logic Builder',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 7, max: 14 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.1,
          parentRating: 4.8,
          reviewCount: 1260,
          categories: ['math-learning', 'logic', 'critical-thinking'],
          description: 'AI-powered logic puzzles and reasoning games that build critical thinking skills',
          features: ['Progressive difficulty', 'Logic puzzle generator', 'Pattern recognition games', 'Critical thinking exercises'],
          safetyNotes: 'Age-appropriate content, educational focus, parent dashboard',
          appType: 'white-label',
          useCase: ['Logic training', 'Problem solving', 'Critical thinking'],
          replaces: 'Logic puzzle apps, brain training games'
        }
      ]
    },
    {
      id: 'science-discovery',
      name: 'Science & Discovery',
      description: 'Interactive science experiments and discovery tools',
      tools: [
        {
          id: 'siteoptz-science-lab',
          name: 'SiteOptz Science Lab',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 8, max: 16 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.4,
          parentRating: 4.8,
          reviewCount: 1890,
          categories: ['science-discovery', 'experiments'],
          description: 'Virtual science laboratory with AI-guided experiments and discoveries',
          features: ['Virtual experiments', 'AI science tutor', 'Safety protocols', 'Real-world applications', 'Interactive simulations'],
          safetyNotes: 'Virtual experiments only, educational content, safety-first approach',
          appType: 'white-label',
          useCase: ['Science learning', 'Experiment simulation', 'STEM education'],
          replaces: 'Science apps, virtual lab software'
        }
      ]
    },
    {
      id: 'art-creativity',
      name: 'Art & Digital Creativity',
      description: 'AI-powered art creation and creative expression tools',
      tools: [
        {
          id: 'siteoptz-art-studio',
          name: 'SiteOptz Art Studio',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 5, max: 16 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 8.7,
          parentRating: 4.8,
          reviewCount: 2050,
          categories: ['art-creativity', 'digital-art'],
          description: 'Kid-safe AI art creation tool with guided tutorials and creative prompts',
          features: ['Safe AI art generation', 'Drawing tutorials', 'Color theory lessons', 'Art history exploration', 'Creative challenges'],
          safetyNotes: 'Filtered content generation, no inappropriate imagery, educational art focus',
          appType: 'white-label',
          useCase: ['Art creation', 'Creative expression', 'Art education'],
          replaces: 'Kid art apps, drawing software, AI art generators'
        }
      ]
    },
    {
      id: 'coding-programming',
      name: 'Coding & Programming',
      description: 'Kid-friendly programming and computational thinking tools',
      tools: [
        {
          id: 'siteoptz-code-academy',
          name: 'SiteOptz Code Academy',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 8, max: 18 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.5,
          parentRating: 4.9,
          reviewCount: 1780,
          categories: ['coding-programming', 'computational-thinking'],
          description: 'AI-powered coding tutor that teaches programming through fun, interactive projects',
          features: ['Visual programming', 'AI coding assistant', 'Project-based learning', 'Code debugging help', 'Programming concepts'],
          safetyNotes: 'Educational coding environment, no external code execution, guided learning',
          appType: 'white-label',
          useCase: ['Learn programming', 'Computational thinking', 'Problem solving'],
          replaces: 'Scratch, Code.org, other kids coding platforms'
        }
      ]
    },
    {
      id: 'language-learning',
      name: 'Language & Communication',
      description: 'AI-powered language learning and communication tools',
      tools: [
        {
          id: 'siteoptz-language-buddy',
          name: 'SiteOptz Language Buddy',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 5, max: 16 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.3,
          parentRating: 4.8,
          reviewCount: 1940,
          categories: ['language-learning', 'communication'],
          description: 'AI language tutor that makes learning new languages fun and interactive for kids',
          features: ['Interactive conversations', 'Pronunciation practice', 'Cultural learning', 'Progress tracking', 'Fun language games'],
          safetyNotes: 'Educational conversations only, no personal information sharing, parent monitoring',
          appType: 'white-label',
          useCase: ['Language learning', 'Cultural awareness', 'Communication skills'],
          replaces: 'Duolingo Kids, language learning apps'
        }
      ]
    },
    {
      id: 'reading-comprehension',
      name: 'Reading & Comprehension',
      description: 'AI-powered reading assistance and comprehension tools',
      tools: [
        {
          id: 'siteoptz-reading-companion',
          name: 'SiteOptz Reading Companion',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 5, max: 14 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.4,
          parentRating: 4.8,
          reviewCount: 2120,
          categories: ['reading-comprehension', 'literacy'],
          description: 'AI reading tutor that helps kids improve comprehension and vocabulary',
          features: ['Reading level assessment', 'Comprehension questions', 'Vocabulary building', 'Reading recommendations', 'Progress tracking'],
          safetyNotes: 'Curated book content, age-appropriate materials, reading progress monitoring',
          appType: 'white-label',
          useCase: ['Reading improvement', 'Comprehension skills', 'Vocabulary building'],
          replaces: 'Epic! Books, reading apps, comprehension tools'
        }
      ]
    }
  ],
  
  // Metadata about our white-label approach
  whiteLabelInfo: {
    brandName: 'SiteOptz Kids',
    approach: 'proprietary',
    safetyFirst: true,
    coppaCompliant: true,
    noThirdPartyData: true,
    parentControlled: true,
    educationalFocus: true
  }
};

// Helper functions for filtering and finding tools
export function getToolsByAge(minAge, maxAge) {
  return kidsAIToolsDatabase.categories
    .flatMap(cat => cat.tools)
    .filter(tool => 
      tool.ageRange.min <= maxAge && tool.ageRange.max >= minAge
    );
}

export function getWhiteLabelTools() {
  return kidsAIToolsDatabase.categories
    .flatMap(cat => cat.tools)
    .filter(tool => tool.appType === 'white-label');
}

export function getCOPPACompliantTools() {
  return kidsAIToolsDatabase.categories
    .flatMap(cat => cat.tools)
    .filter(tool => tool.coppaCompliant);
}

export function getToolsByCategory(categoryId) {
  const category = kidsAIToolsDatabase.categories.find(cat => cat.id === categoryId);
  return category ? category.tools : [];
}

export function getHighestRatedTools(limit = 10) {
  return kidsAIToolsDatabase.categories
    .flatMap(cat => cat.tools)
    .sort((a, b) => b.parentRating - a.parentRating)
    .slice(0, limit);
}

export function getToolsByEducationalValue(minValue = 8.5) {
  return kidsAIToolsDatabase.categories
    .flatMap(cat => cat.tools)
    .filter(tool => tool.educationalValue >= minValue)
    .sort((a, b) => b.educationalValue - a.educationalValue);
}

// Search function
export function searchTools(searchTerm, filters = {}) {
  let tools = kidsAIToolsDatabase.categories.flatMap(cat => 
    cat.tools.map(tool => ({ ...tool, categoryName: cat.name, categoryId: cat.id }))
  );

  // Apply search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    tools = tools.filter(tool => 
      tool.name.toLowerCase().includes(term) ||
      tool.description.toLowerCase().includes(term) ||
      tool.features.some(feature => feature.toLowerCase().includes(term)) ||
      tool.useCase.some(useCase => useCase.toLowerCase().includes(term))
    );
  }

  // Apply age filter
  if (filters.ageRange) {
    tools = tools.filter(tool => 
      tool.ageRange.min <= filters.ageRange.max && 
      tool.ageRange.max >= filters.ageRange.min
    );
  }

  // Apply category filter
  if (filters.category && filters.category !== 'all') {
    tools = tools.filter(tool => tool.categoryId === filters.category);
  }

  // Apply COPPA filter
  if (filters.coppaOnly) {
    tools = tools.filter(tool => tool.coppaCompliant);
  }

  // Apply white-label filter
  if (filters.whiteLabelOnly) {
    tools = tools.filter(tool => tool.appType === 'white-label');
  }

  return tools;
}

export default kidsAIToolsDatabase;