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
      description: 'AI-powered learning tools for math, reading, science, and more',
      tools: [
        {
          id: 'khan-academy-kids',
          name: 'Khan Academy Kids',
          provider: 'Khan Academy',
          pricing: 'Free',
          ageRange: { min: 2, max: 8 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.5,
          parentRating: 4.8,
          reviewCount: 1250,
          categories: ['learning-tutoring', 'math', 'reading'],
          description: 'Free, comprehensive learning app for young children with personalized learning paths',
          features: ['Math practice', 'Reading comprehension', 'Social-emotional learning', 'Creative activities'],
          safetyNotes: 'COPPA compliant, no ads, comprehensive parent controls',
          website: 'https://learn.khanacademy.org/khan-academy-kids/',
          useCase: ['Homeschool', 'Supplemental learning', 'Early education'],
          detailsRequiresPremium: false
        },
        {
          id: 'socratic-by-google',
          name: 'Socratic by Google',
          provider: 'Google',
          pricing: 'Free',
          ageRange: { min: 13, max: 18 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 8.5,
          parentRating: 4.3,
          reviewCount: 890,
          categories: ['learning-tutoring', 'homework-help'],
          description: 'AI-powered homework helper using Google AI to provide explanations',
          features: ['Math problem solving', 'Science explanations', 'History help', 'Literature analysis'],
          safetyNotes: 'COPPA compliant, minimal data collection, educational focus',
          website: 'https://socratic.org/',
          useCase: ['Homework help', 'Test preparation', 'Concept clarification'],
          detailsRequiresPremium: true
        },
        {
          id: 'prodigy-math',
          name: 'Prodigy Math Game',
          provider: 'Prodigy Education',
          pricing: 'Freemium - $8.95/month premium',
          ageRange: { min: 6, max: 14 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 8.2,
          parentRating: 4.1,
          reviewCount: 2100,
          categories: ['learning-tutoring', 'math', 'games'],
          description: 'Curriculum-aligned math game that adapts to each student\'s learning pace',
          features: ['Adaptive math curriculum', 'Game-based learning', 'Progress tracking', 'Teacher tools'],
          safetyNotes: 'COPPA compliant, secure environment, parent dashboard',
          website: 'https://www.prodigygame.com/',
          useCase: ['Math practice', 'Classroom learning', 'Homeschool curriculum'],
          detailsRequiresPremium: true
        },
        {
          id: 'photomath',
          name: 'Photomath',
          provider: 'Google LLC',
          pricing: 'Freemium - $9.99/month premium',
          ageRange: { min: 10, max: 18 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 7.8,
          parentRating: 4.4,
          reviewCount: 1500,
          categories: ['learning-tutoring', 'math', 'homework-help'],
          description: 'AI-powered camera calculator that provides step-by-step math solutions',
          features: ['Photo-based problem solving', 'Step-by-step explanations', 'Multiple solution methods', 'Graphing calculator'],
          safetyNotes: 'COPPA compliant, focused on education, minimal personal data required',
          website: 'https://photomath.app/',
          useCase: ['Homework assistance', 'Math tutoring', 'Concept learning'],
          detailsRequiresPremium: true
        }
      ]
    },
    {
      id: 'creativity-art',
      name: 'Creativity & Art',
      description: 'AI art and creative tools designed for children',
      tools: [
        {
          id: 'drawing-desk',
          name: 'Drawing Desk',
          provider: '4Axis Technologies',
          pricing: 'Freemium - $2.99/month premium',
          ageRange: { min: 5, max: 16 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 7.5,
          parentRating: 4.2,
          reviewCount: 750,
          categories: ['creativity-art', 'drawing'],
          description: 'Creative drawing app with AI-assisted tools for young artists',
          features: ['Digital drawing tools', 'AI color suggestions', 'Tutorial guides', 'Gallery sharing'],
          safetyNotes: 'COPPA compliant, moderated sharing, parent approval for uploads',
          website: 'https://www.4axistech.com/drawing-desk/',
          useCase: ['Digital art creation', 'Creative expression', 'Art education'],
          detailsRequiresPremium: true
        },
        {
          id: 'scratch-jr',
          name: 'ScratchJr',
          provider: 'MIT Media Lab',
          pricing: 'Free',
          ageRange: { min: 5, max: 7 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.0,
          parentRating: 4.6,
          reviewCount: 980,
          categories: ['creativity-art', 'coding', 'programming'],
          description: 'Introductory programming language for young children to create interactive stories',
          features: ['Visual programming', 'Character animation', 'Story creation', 'No reading required'],
          safetyNotes: 'COPPA compliant, no online features, completely safe offline use',
          website: 'https://www.scratchjr.org/',
          useCase: ['Early coding education', 'Creative storytelling', 'Logic development'],
          detailsRequiresPremium: false
        }
      ]
    },
    {
      id: 'coding-programming',
      name: 'Coding & Programming',
      description: 'Kid-friendly AI coding tools and tutorials',
      tools: [
        {
          id: 'scratch',
          name: 'Scratch',
          provider: 'MIT Media Lab',
          pricing: 'Free',
          ageRange: { min: 8, max: 16 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.3,
          parentRating: 4.7,
          reviewCount: 3200,
          categories: ['coding-programming', 'creativity'],
          description: 'Visual programming language for creating interactive stories, games, and animations',
          features: ['Block-based programming', 'Community sharing', 'Tutorials', 'Creative projects'],
          safetyNotes: 'COPPA compliant, moderated community, extensive safety features',
          website: 'https://scratch.mit.edu/',
          useCase: ['Programming education', 'Creative coding', 'Computer science fundamentals'],
          detailsRequiresPremium: false
        },
        {
          id: 'code-org',
          name: 'Code.org',
          provider: 'Code.org',
          pricing: 'Free',
          ageRange: { min: 4, max: 18 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 9.1,
          parentRating: 4.5,
          reviewCount: 2800,
          categories: ['coding-programming', 'learning-tutoring'],
          description: 'Comprehensive computer science curriculum for all ages',
          features: ['Age-appropriate curricula', 'Teacher resources', 'Progress tracking', 'Diverse characters'],
          safetyNotes: 'COPPA compliant, designed for schools, extensive privacy protections',
          website: 'https://code.org/',
          useCase: ['Computer science education', 'Classroom learning', 'Self-paced learning'],
          detailsRequiresPremium: false
        }
      ]
    },
    {
      id: 'language-learning',
      name: 'Language Learning',
      description: 'AI-powered language learning tools for children',
      tools: [
        {
          id: 'duolingo-kids',
          name: 'Duolingo ABC',
          provider: 'Duolingo',
          pricing: 'Free',
          ageRange: { min: 3, max: 8 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 8.7,
          parentRating: 4.4,
          reviewCount: 1100,
          categories: ['language-learning', 'reading'],
          description: 'Learn to read with phonics using fun, interactive lessons',
          features: ['Phonics-based learning', 'Interactive stories', 'Progress tracking', 'Offline mode'],
          safetyNotes: 'COPPA compliant, no ads, designed specifically for children',
          website: 'https://www.duolingo.com/abc',
          useCase: ['Reading education', 'Early literacy', 'Homeschool supplement'],
          detailsRequiresPremium: false
        }
      ]
    },
    {
      id: 'homework-help',
      name: 'Homework Help',
      description: 'AI tutoring and homework assistance tools',
      tools: [
        {
          id: 'brainly',
          name: 'Brainly',
          provider: 'Brainly Inc.',
          pricing: 'Freemium - $15/month premium',
          ageRange: { min: 13, max: 18 },
          coppaCompliant: true,
          safetyCertified: true,
          educationalValue: 7.2,
          parentRating: 3.9,
          reviewCount: 650,
          categories: ['homework-help', 'learning-tutoring'],
          description: 'Peer-to-peer homework help platform with AI-powered search',
          features: ['Q&A community', 'Expert answers', 'Subject coverage', 'Study tools'],
          safetyNotes: 'COPPA compliant, moderated content, community guidelines enforced',
          website: 'https://brainly.com/',
          useCase: ['Homework assistance', 'Study help', 'Peer learning'],
          detailsRequiresPremium: true
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