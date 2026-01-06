// Kids AI Coding Platform Data Structure
// Build Real Projects with AI APIs in a Safe Environment

export interface CodingProject {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  estimatedTime: string;
  skills: string[];
  aiApis: string[];
  preview: {
    image: string;
    demoUrl?: string;
  };
  requiredLevel: 'explorer' | 'creator' | 'builder' | 'innovator';
  isPremium: boolean;
  completionRate: number;
  category: 'story' | 'image' | 'chatbot' | 'game' | 'utility' | 'creative';
}

export interface CodingLevel {
  id: 'explorer' | 'creator' | 'builder' | 'innovator';
  name: string;
  description: string;
  icon: string;
  ageRange: { min: number; max: number };
  skills: string[];
  projects: CodingProject[];
  requirements: string[];
  badge: {
    color: string;
    bgColor: string;
    icon: string;
  };
  unlockCriteria: {
    projectsCompleted: number;
    skillsLearned: number;
    timeSpent: number; // in hours
  };
}

export const codingLevels: CodingLevel[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Start your AI coding journey with simple, fun projects',
    icon: '🧭',
    ageRange: { min: 8, max: 12 },
    skills: ['Basic coding concepts', 'AI tool usage', 'Creative thinking', 'Problem solving'],
    requirements: ['No coding experience needed', 'Curiosity and creativity'],
    badge: {
      color: '#4CAF50',
      bgColor: '#E8F5E9',
      icon: '🌱'
    },
    unlockCriteria: {
      projectsCompleted: 0,
      skillsLearned: 0,
      timeSpent: 0
    },
    projects: [
      {
        id: 'story-generator-basic',
        title: 'Magic Story Creator',
        description: 'Create amazing stories with AI help! Just pick characters and settings.',
        icon: '📚',
        difficulty: 'Easy',
        estimatedTime: '30 minutes',
        skills: ['Prompt writing', 'Creative thinking'],
        aiApis: ['OpenAI GPT-3.5'],
        preview: {
          image: '/images/projects/story-generator-preview.jpg'
        },
        requiredLevel: 'explorer',
        isPremium: false,
        completionRate: 89,
        category: 'story'
      },
      {
        id: 'simple-chatbot',
        title: 'My First AI Friend',
        description: 'Build a friendly chatbot that can talk about your favorite topics.',
        icon: '🤖',
        difficulty: 'Easy',
        estimatedTime: '45 minutes',
        skills: ['Conversation design', 'AI prompting'],
        aiApis: ['OpenAI GPT-3.5'],
        preview: {
          image: '/images/projects/chatbot-preview.jpg'
        },
        requiredLevel: 'explorer',
        isPremium: false,
        completionRate: 76,
        category: 'chatbot'
      },
      {
        id: 'color-palette-generator',
        title: 'AI Color Magic',
        description: 'Generate beautiful color palettes for your art projects using AI.',
        icon: '🎨',
        difficulty: 'Easy',
        estimatedTime: '25 minutes',
        skills: ['Color theory basics', 'AI prompting'],
        aiApis: ['OpenAI GPT-4'],
        preview: {
          image: '/images/projects/color-palette-preview.jpg'
        },
        requiredLevel: 'explorer',
        isPremium: true,
        completionRate: 82,
        category: 'creative'
      }
    ]
  },
  {
    id: 'creator',
    name: 'Creator',
    description: 'Build more complex projects and learn to customize AI responses',
    icon: '🎨',
    ageRange: { min: 10, max: 14 },
    skills: ['Advanced prompting', 'Basic programming', 'UI design', 'Data handling'],
    requirements: ['Complete 2 Explorer projects', 'Basic computer skills'],
    badge: {
      color: '#2196F3',
      bgColor: '#E3F2FD',
      icon: '✨'
    },
    unlockCriteria: {
      projectsCompleted: 2,
      skillsLearned: 4,
      timeSpent: 2
    },
    projects: [
      {
        id: 'advanced-story-generator',
        title: 'Interactive Story World',
        description: 'Create choose-your-own-adventure stories with multiple endings.',
        icon: '📖',
        difficulty: 'Medium',
        estimatedTime: '1 hour',
        skills: ['Story structure', 'Conditional logic', 'User interaction'],
        aiApis: ['OpenAI GPT-4'],
        preview: {
          image: '/images/projects/interactive-story-preview.jpg'
        },
        requiredLevel: 'creator',
        isPremium: true,
        completionRate: 68,
        category: 'story'
      },
      {
        id: 'image-generator',
        title: 'AI Art Studio',
        description: 'Generate custom images and artwork using DALL-E AI.',
        icon: '🖼️',
        difficulty: 'Medium',
        estimatedTime: '50 minutes',
        skills: ['Image prompting', 'Art direction', 'Creative editing'],
        aiApis: ['DALL-E 3'],
        preview: {
          image: '/images/projects/ai-art-studio-preview.jpg'
        },
        requiredLevel: 'creator',
        isPremium: true,
        completionRate: 71,
        category: 'image'
      },
      {
        id: 'personality-chatbot',
        title: 'Character Chat AI',
        description: 'Build chatbots with different personalities and backgrounds.',
        icon: '👥',
        difficulty: 'Medium',
        estimatedTime: '1.5 hours',
        skills: ['Character development', 'Conversation flow', 'Personality design'],
        aiApis: ['OpenAI GPT-4'],
        preview: {
          image: '/images/projects/character-chat-preview.jpg'
        },
        requiredLevel: 'creator',
        isPremium: true,
        completionRate: 63,
        category: 'chatbot'
      }
    ]
  },
  {
    id: 'builder',
    name: 'Builder',
    description: 'Combine multiple AI tools and create full applications',
    icon: '🔧',
    ageRange: { min: 12, max: 16 },
    skills: ['API integration', 'App development', 'User experience', 'Project management'],
    requirements: ['Complete 3 Creator projects', 'Understanding of coding basics'],
    badge: {
      color: '#FF9800',
      bgColor: '#FFF3E0',
      icon: '🏗️'
    },
    unlockCriteria: {
      projectsCompleted: 5,
      skillsLearned: 8,
      timeSpent: 5
    },
    projects: [
      {
        id: 'multi-modal-app',
        title: 'AI Content Studio',
        description: 'Build an app that generates stories, images, and audio together.',
        icon: '🎭',
        difficulty: 'Hard',
        estimatedTime: '2 hours',
        skills: ['Multi-API integration', 'Content coordination', 'App architecture'],
        aiApis: ['OpenAI GPT-4', 'DALL-E 3', 'Text-to-Speech'],
        preview: {
          image: '/images/projects/content-studio-preview.jpg'
        },
        requiredLevel: 'builder',
        isPremium: true,
        completionRate: 54,
        category: 'creative'
      },
      {
        id: 'game-ai-companion',
        title: 'Smart Game Buddy',
        description: 'Create an AI companion for games that learns and adapts.',
        icon: '🎮',
        difficulty: 'Hard',
        estimatedTime: '2.5 hours',
        skills: ['Game logic', 'AI training', 'User adaptation'],
        aiApis: ['OpenAI GPT-4', 'Custom ML models'],
        preview: {
          image: '/images/projects/game-buddy-preview.jpg'
        },
        requiredLevel: 'builder',
        isPremium: true,
        completionRate: 47,
        category: 'game'
      },
      {
        id: 'learning-assistant',
        title: 'Personal Study AI',
        description: 'Build a personalized learning assistant for any subject.',
        icon: '🎓',
        difficulty: 'Hard',
        estimatedTime: '3 hours',
        skills: ['Educational design', 'Adaptive learning', 'Knowledge management'],
        aiApis: ['OpenAI GPT-4', 'Knowledge retrieval'],
        preview: {
          image: '/images/projects/study-ai-preview.jpg'
        },
        requiredLevel: 'builder',
        isPremium: true,
        completionRate: 51,
        category: 'utility'
      }
    ]
  },
  {
    id: 'innovator',
    name: 'Innovator',
    description: 'Create original AI applications and contribute to the community',
    icon: '🚀',
    ageRange: { min: 14, max: 18 },
    skills: ['Advanced programming', 'AI model training', 'Innovation', 'Community contribution'],
    requirements: ['Complete 4 Builder projects', 'Demonstrate creative problem-solving'],
    badge: {
      color: '#9C27B0',
      bgColor: '#F3E5F5',
      icon: '💡'
    },
    unlockCriteria: {
      projectsCompleted: 9,
      skillsLearned: 15,
      timeSpent: 10
    },
    projects: [
      {
        id: 'custom-ai-model',
        title: 'Train Your Own AI',
        description: 'Learn to fine-tune AI models for specific tasks and domains.',
        icon: '🧠',
        difficulty: 'Expert',
        estimatedTime: '4 hours',
        skills: ['Machine learning', 'Model training', 'Data science'],
        aiApis: ['OpenAI Fine-tuning', 'Custom training APIs'],
        preview: {
          image: '/images/projects/custom-ai-preview.jpg'
        },
        requiredLevel: 'innovator',
        isPremium: true,
        completionRate: 32,
        category: 'utility'
      },
      {
        id: 'ai-startup-simulator',
        title: 'AI Startup Builder',
        description: 'Create and pitch your own AI startup idea with working prototypes.',
        icon: '🏢',
        difficulty: 'Expert',
        estimatedTime: '5 hours',
        skills: ['Business development', 'Prototyping', 'Presentation skills'],
        aiApis: ['Multiple AI services', 'Business APIs'],
        preview: {
          image: '/images/projects/startup-simulator-preview.jpg'
        },
        requiredLevel: 'innovator',
        isPremium: true,
        completionRate: 28,
        category: 'utility'
      },
      {
        id: 'community-ai-tool',
        title: 'Community AI Project',
        description: 'Collaborate with other innovators to build tools for the community.',
        icon: '🌟',
        difficulty: 'Expert',
        estimatedTime: '6+ hours',
        skills: ['Collaboration', 'Open source', 'Community management'],
        aiApis: ['Various based on project'],
        preview: {
          image: '/images/projects/community-project-preview.jpg'
        },
        requiredLevel: 'innovator',
        isPremium: true,
        completionRate: 25,
        category: 'utility'
      }
    ]
  }
];

// Helper functions
export function getLevelByRequirement(level: string): CodingLevel | undefined {
  return codingLevels.find(l => l.id === level);
}

export function getProjectsByLevel(level: string): CodingProject[] {
  const levelData = getLevelByRequirement(level);
  return levelData ? levelData.projects : [];
}

export function getFreeProjects(): CodingProject[] {
  return codingLevels.flatMap(level => 
    level.projects.filter(project => !project.isPremium)
  );
}

export function getPremiumProjects(): CodingProject[] {
  return codingLevels.flatMap(level => 
    level.projects.filter(project => project.isPremium)
  );
}

export function getProjectById(projectId: string): CodingProject | undefined {
  return codingLevels
    .flatMap(level => level.projects)
    .find(project => project.id === projectId);
}

export function canAccessLevel(
  currentLevel: string, 
  targetLevel: string,
  userProgress: {
    projectsCompleted: number;
    skillsLearned: number;
    timeSpent: number;
  }
): boolean {
  const target = getLevelByRequirement(targetLevel);
  if (!target) return false;
  
  const criteria = target.unlockCriteria;
  return (
    userProgress.projectsCompleted >= criteria.projectsCompleted &&
    userProgress.skillsLearned >= criteria.skillsLearned &&
    userProgress.timeSpent >= criteria.timeSpent
  );
}

export function getNextLevel(currentLevel: string): CodingLevel | null {
  const levels = ['explorer', 'creator', 'builder', 'innovator'];
  const currentIndex = levels.indexOf(currentLevel);
  
  if (currentIndex === -1 || currentIndex === levels.length - 1) {
    return null;
  }
  
  return getLevelByRequirement(levels[currentIndex + 1]) || null;
}