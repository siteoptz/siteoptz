// Kids AI Tools Database for Next.js/TypeScript
// Adapted from KIDS_AI_IMPLEMENTATION_INSTRUCTIONS.md

export interface KidsAITool {
  id: string;
  name: string;
  provider: string;
  pricing: string;
  ageRange: {
    min: number;
    max: number;
  };
  coppaCompliant: boolean;
  safetyCertified: boolean;
  educationalValue: number; // 1-10 scale
  parentRating: number; // 1-5 scale
  reviewCount: number;
  categories: string[];
  description: string;
  features: string[];
  safetyNotes: string;
  website: string;
  useCase: string[];
  detailsRequiresPremium?: boolean;
}

export interface KidsAICategory {
  id: string;
  name: string;
  description: string;
  tools: KidsAITool[];
}

export interface KidsAIToolsDatabase {
  categories: KidsAICategory[];
}

export const kidsAIToolsDatabase: KidsAIToolsDatabase = {
  categories: [
    {
      id: 'learning-tutoring',
      name: 'Learning & Tutoring',
      description: 'SiteOptz proprietary AI-powered learning tools for math, reading, science, and more',
      tools: [
        {
          id: 'siteoptz-learning-hub',
          name: 'SiteOptz Learning Hub',
          provider: 'SiteOptz Kids',
          pricing: 'Free with Pro features',
          ageRange: { min: 5, max: 12 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.8,
          parentRating: 4.9,
          reviewCount: 2500,
          categories: ['learning-tutoring', 'math', 'reading'],
          description: 'Our comprehensive white-label learning platform with personalized AI tutoring - completely safe and ad-free',
          features: ['Adaptive AI tutoring', 'Reading comprehension games', 'Math wizardry', 'Parent dashboard'],
          safetyNotes: 'COPPA compliant by design, zero third-party data sharing, complete parental control',
          website: '/kids-ai/apps/learning-hub',
          useCase: ['Homeschool', 'Supplemental learning', 'Safe AI education'],
          detailsRequiresPremium: false
        },
        {
          id: 'siteoptz-math-wizard',
          name: 'SiteOptz Math Wizard',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 6, max: 14 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.6,
          parentRating: 4.8,
          reviewCount: 1890,
          categories: ['learning-tutoring', 'math'],
          description: 'Our proprietary AI-powered math tutor that adapts to each child - replacing third-party alternatives',
          features: ['Step-by-step problem solving', 'Adaptive difficulty', 'Progress tracking', 'Gamified learning'],
          safetyNotes: 'White-label safety: No external tracking, no ads, complete data protection',
          website: '/kids-ai/apps/math-wizard',
          useCase: ['Math practice', 'Homework help', 'Confidence building'],
          detailsRequiresPremium: false
        },
        {
          id: 'siteoptz-homework-helper',
          name: 'SiteOptz Homework Helper',
          provider: 'SiteOptz Kids',
          pricing: 'Free with Pro features',
          ageRange: { min: 10, max: 18 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.4,
          parentRating: 4.7,
          reviewCount: 1200,
          categories: ['learning-tutoring', 'homework-help'],
          description: 'Safe AI homework assistance without the risks of third-party platforms',
          features: ['Subject-specific help', 'Safe AI explanations', 'Parent oversight', 'Progress monitoring'],
          safetyNotes: 'Proprietary safety: All AI processing on secure servers, no external data sharing',
          website: '/kids-ai/apps/homework-helper',
          useCase: ['Homework assistance', 'Study support', 'Concept reinforcement'],
          detailsRequiresPremium: false
        }
      ]
    },
    {
      id: 'creativity-art',
      name: 'Creativity & Art',
      description: 'SiteOptz proprietary AI art and creative tools designed for children',
      tools: [
        {
          id: 'siteoptz-art-studio',
          name: 'SiteOptz Art Studio',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 4, max: 16 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.2,
          parentRating: 4.8,
          reviewCount: 1450,
          categories: ['creativity-art', 'drawing'],
          description: 'Our safe, proprietary AI-powered art creation platform - no third-party tracking',
          features: ['AI-assisted drawing', 'Safe color palettes', 'Creative tutorials', 'Parent-controlled sharing'],
          safetyNotes: 'White-label security: All artwork stored locally, no external uploads, complete privacy',
          website: '/kids-ai/apps/art-studio',
          useCase: ['Digital art creation', 'Creative expression', 'Safe art education'],
          detailsRequiresPremium: false
        },
        {
          id: 'siteoptz-story-creator',
          name: 'SiteOptz Story Creator',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 5, max: 12 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.5,
          parentRating: 4.9,
          reviewCount: 2100,
          categories: ['creativity-art', 'writing', 'storytelling'],
          description: 'Our proprietary AI story creation tool - safe alternative to third-party story platforms',
          features: ['AI story assistance', 'Character creation', 'Safe content filters', 'Parent dashboard'],
          safetyNotes: 'Proprietary safety: Stories processed locally, no external AI services, complete content control',
          website: '/kids-ai/apps/story-creator',
          useCase: ['Creative writing', 'Storytelling', 'Reading skills'],
          detailsRequiresPremium: false
        }
      ]
    },
    {
      id: 'coding-programming',
      name: 'Coding & Programming',
      description: 'SiteOptz proprietary kid-friendly AI coding tools and tutorials',
      tools: [
        {
          id: 'siteoptz-code-academy',
          name: 'SiteOptz Code Academy',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 6, max: 16 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.7,
          parentRating: 4.9,
          reviewCount: 1800,
          categories: ['coding-programming', 'creativity'],
          description: 'Our safe, proprietary visual programming platform - no external community risks',
          features: ['Block-based programming', 'Safe project sharing', 'Interactive tutorials', 'Parent oversight'],
          safetyNotes: 'White-label security: All projects stored locally, no external sharing, complete safety',
          website: '/kids-ai/apps/code-academy',
          useCase: ['Programming education', 'Safe coding', 'Logic development'],
          detailsRequiresPremium: false
        },
        {
          id: 'siteoptz-logic-builder',
          name: 'SiteOptz Logic Builder',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 4, max: 12 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.3,
          parentRating: 4.8,
          reviewCount: 1250,
          categories: ['coding-programming', 'learning-tutoring'],
          description: 'Our proprietary logic and problem-solving platform designed for complete safety',
          features: ['Visual logic puzzles', 'Step-by-step guidance', 'Progress tracking', 'Safe environment'],
          safetyNotes: 'Proprietary platform: No external connections, offline-capable, parent-controlled',
          website: '/kids-ai/apps/logic-builder',
          useCase: ['Logic development', 'Problem solving', 'Critical thinking'],
          detailsRequiresPremium: false
        }
      ]
    },
    {
      id: 'language-learning',
      name: 'Language Learning',
      description: 'SiteOptz proprietary AI-powered language learning tools for children',
      tools: [
        {
          id: 'siteoptz-word-wizard',
          name: 'SiteOptz Word Wizard',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 3, max: 10 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.4,
          parentRating: 4.8,
          reviewCount: 1600,
          categories: ['language-learning', 'reading'],
          description: 'Our safe, proprietary phonics and reading platform - no third-party data collection',
          features: ['Phonics-based learning', 'Interactive stories', 'Voice recognition', 'Progress tracking'],
          safetyNotes: 'White-label safety: All voice data processed locally, no external servers, complete privacy',
          website: '/kids-ai/apps/word-wizard',
          useCase: ['Reading education', 'Phonics learning', 'Language development'],
          detailsRequiresPremium: false
        }
      ]
    },
    {
      id: 'science-exploration',
      name: 'Science & Exploration',
      description: 'SiteOptz proprietary AI science learning tools',
      tools: [
        {
          id: 'siteoptz-science-lab',
          name: 'SiteOptz Science Lab',
          provider: 'SiteOptz Kids',
          pricing: 'Free',
          ageRange: { min: 8, max: 16 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.6,
          parentRating: 4.9,
          reviewCount: 980,
          categories: ['science-exploration', 'learning-tutoring'],
          description: 'Our proprietary virtual science laboratory - safe experimentation without external risks',
          features: ['Virtual experiments', 'Interactive simulations', 'Scientific method', 'Safe learning'],
          safetyNotes: 'Proprietary safety: All simulations run locally, no external data, complete control',
          website: '/kids-ai/apps/science-lab',
          useCase: ['Science education', 'Virtual experiments', 'STEM learning'],
          detailsRequiresPremium: false
        }
      ]
    }
  ]
};

// Helper functions
export function getToolsByAge(minAge: number, maxAge: number): KidsAITool[] {
  return kidsAIToolsDatabase.categories
    .flatMap(cat => cat.tools)
    .filter(tool => 
      tool.ageRange.min <= maxAge && tool.ageRange.max >= minAge
    );
}

export function getCOPPACompliantTools(): KidsAITool[] {
  return kidsAIToolsDatabase.categories
    .flatMap(cat => cat.tools)
    .filter(tool => tool.coppaCompliant);
}

export function getToolsByCategory(categoryId: string): KidsAITool[] {
  return kidsAIToolsDatabase.categories
    .flatMap(cat => cat.tools)
    .filter(tool => tool.categories.includes(categoryId));
}

export function getAllTools(): KidsAITool[] {
  return kidsAIToolsDatabase.categories.flatMap(cat => cat.tools);
}

export function searchTools(searchTerm: string): KidsAITool[] {
  const term = searchTerm.toLowerCase();
  return getAllTools().filter(tool => 
    tool.name.toLowerCase().includes(term) ||
    tool.description.toLowerCase().includes(term) ||
    tool.features.some(feature => feature.toLowerCase().includes(term))
  );
}