import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import { codingLevels, CodingLevel, CodingProject, getProjectsByLevel, canAccessLevel } from '../../data/kidsAICodingPlatform';
import LevelProgressCard from '../../components/kids/LevelProgressCard';
import CodingProjectCard from '../../components/kids/CodingProjectCard';
import SafetyBadge from '../../components/kids/SafetyBadge';

export default function KidsAICodingPlatform() {
  const { data: session } = useSession();
  const [selectedLevel, setSelectedLevel] = useState<string>('explorer');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Mock user progress - in real app, this would come from database
  const [userProgress] = useState({
    currentLevel: 'explorer',
    projectsCompleted: 1,
    skillsLearned: 3,
    timeSpent: 1.5,
    unlockedLevels: ['explorer', 'creator']
  });
  
  // Determine user tier based on session
  const userTier = session?.user ? 'parent-pro' : 'free';
  
  const selectedLevelData = codingLevels.find(level => level.id === selectedLevel);
  const projectsToShow = selectedLevelData ? selectedLevelData.projects : [];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projectsToShow
    : projectsToShow.filter(project => project.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🎯' },
    { id: 'story', name: 'Story Generators', icon: '📚' },
    { id: 'image', name: 'Image Creators', icon: '🖼️' },
    { id: 'chatbot', name: 'Chatbots', icon: '🤖' },
    { id: 'game', name: 'Games', icon: '🎮' },
    { id: 'creative', name: 'Creative Tools', icon: '🎨' },
    { id: 'utility', name: 'Utilities', icon: '🔧' }
  ];

  const handleStartProject = (projectId: string) => {
    // Map project IDs to actual project pages
    const projectRoutes = {
      'story-generator-basic': '/kids-ai/projects/story-generator',
      'simple-chatbot': '/kids-ai/projects/chatbot-builder',
      'color-palette-generator': '/kids-ai/projects/image-creator',
      'simple-game-maker': '/kids-ai/projects/ai-game-maker',
      'advanced-story-generator': '/kids-ai/projects/story-generator',
      'image-generator': '/kids-ai/projects/image-creator',
      'personality-chatbot': '/kids-ai/projects/chatbot-builder',
      'multi-modal-app': '/kids-ai/projects/ai-game-maker',
      'game-ai-companion': '/kids-ai/projects/ai-game-maker',
      'learning-assistant': '/kids-ai/projects/chatbot-builder',
      'custom-ai-model': '/kids-ai/projects/image-creator',
      'ai-startup-simulator': '/kids-ai/projects/ai-game-maker',
      'community-ai-tool': '/kids-ai/projects/story-generator'
    };

    const route = projectRoutes[projectId as keyof typeof projectRoutes];
    
    if (route) {
      // Navigate to the actual project page
      window.location.href = route;
    } else {
      // Fallback for unknown projects
      console.log('Starting project:', projectId);
      alert(`Welcome to ${projectId}! This project is under development.`);
    }
  };

  const handleLevelSelect = (levelId: string) => {
    if (userProgress.unlockedLevels.includes(levelId)) {
      setSelectedLevel(levelId);
    }
  };

  return (
    <>
      <SEOHead
        title="Kids AI Coding Platform | Build Real AI Projects | siteoptz.ai"
        description="Learn to code with AI! Kids build real projects like story generators, image creators, and chatbots using OpenAI and DALL-E in a safe environment."
        canonicalUrl="https://siteoptz.ai/kids-ai/coding"
        keywords={['kids coding with AI', 'children AI programming', 'safe AI coding for kids', 'OpenAI for kids', 'DALL-E kids projects']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="text-6xl mb-4">🚀</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Kids AI Coding Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Build <strong>real AI projects</strong> that actually work! Create story generators, image creators, 
              chatbots, and more using <strong>real AI APIs</strong> like OpenAI and DALL-E in a safe, guided environment.
            </p>
            
            {/* Trust Signals */}
            <div className="flex justify-center gap-4 flex-wrap mb-8">
              <SafetyBadge type="coppa" />
              <SafetyBadge type="safetyCertified" />
              <SafetyBadge type="teacherApproved" />
            </div>
            
            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="text-3xl mb-3">🛠️</div>
                <h3 className="text-lg font-bold text-white mb-2">Build Real Projects</h3>
                <p className="text-gray-400 text-sm">
                  Not just tutorials—create actual apps you can use and share
                </p>
              </div>
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-lg font-bold text-white mb-2">Real AI APIs</h3>
                <p className="text-gray-400 text-sm">
                  Use the same AI tools that power ChatGPT and professional apps
                </p>
              </div>
              <div className="bg-black border border-gray-800 rounded-xl p-6">
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="text-lg font-bold text-white mb-2">Learn at Your Pace</h3>
                <p className="text-gray-400 text-sm">
                  Progress through 4 levels from Explorer to Innovator
                </p>
              </div>
            </div>
          </div>

          {/* Learning Levels Overview */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Your Learning Journey</h2>
              <p className="text-gray-300">
                Progress through 4 levels, each with exciting projects and new skills
              </p>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-6">
              {codingLevels.map((level, index) => (
                <LevelProgressCard
                  key={level.id}
                  level={level}
                  isCurrentLevel={level.id === userProgress.currentLevel}
                  isUnlocked={userProgress.unlockedLevels.includes(level.id)}
                  progress={userProgress}
                  onSelectLevel={handleLevelSelect}
                />
              ))}
            </div>
          </div>

          {/* Project Browser */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedLevelData?.name} Projects
                </h2>
                <p className="text-gray-400">
                  {selectedLevelData?.description}
                </p>
              </div>
              
              {userTier === 'free' && (
                <div className="text-right">
                  <p className="text-gray-300 text-sm mb-2">🔒 Unlock all projects</p>
                  <Link 
                    href="/kids-ai/pricing" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
                  >
                    View Pricing →
                  </Link>
                </div>
              )}
            </div>
            
            {/* Category Filter */}
            <div className="bg-black border border-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Project Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      flex flex-col items-center p-3 rounded-lg transition-all duration-200
                      ${selectedCategory === category.id
                        ? 'bg-blue-600 text-white border-2 border-blue-400'
                        : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-gray-600'
                      }
                    `}
                  >
                    <span className="text-2xl mb-1">{category.icon}</span>
                    <span className="text-xs font-medium text-center">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Projects Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <CodingProjectCard
                  key={project.id}
                  project={project}
                  userTier={userTier}
                  userLevel={userProgress.currentLevel as 'explorer' | 'creator' | 'builder' | 'innovator'}
                  onStartProject={handleStartProject}
                />
              ))}
            </div>
            
            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                <p className="text-gray-300 mb-6">
                  Try selecting a different category or level.
                </p>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Show All Projects
                </button>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Why Kids Love Our Platform</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-bold text-white mb-2">Gamified Learning</h3>
                <p className="text-gray-300">
                  Earn badges, level up, and unlock new projects as you master AI coding skills.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-white mb-2">Safe Community</h3>
                <p className="text-gray-300">
                  Share projects with other young coders in our moderated, COPPA-compliant community.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-white mb-2">Real Results</h3>
                <p className="text-gray-300">
                  Build apps that actually work and can be used by friends and family.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-white mb-2">Parent Controls</h3>
                <p className="text-gray-300">
                  Full parent dashboard with progress tracking and safety controls.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-2">Personalized Path</h3>
                <p className="text-gray-300">
                  AI adapts to your child&apos;s learning style and suggests perfect next projects.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🏫</div>
                <h3 className="text-xl font-bold text-white mb-2">Classroom Ready</h3>
                <p className="text-gray-300">
                  Teacher tools and curriculum integration for schools and homeschooling.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Building with AI?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of young innovators learning to code with artificial intelligence
            </p>
            
            {userTier === 'free' && (
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="text-sm opacity-90 mb-2">
                  🎉 <strong>Free Access Includes:</strong>
                </p>
                <div className="text-sm opacity-80 grid md:grid-cols-2 gap-1 text-left max-w-2xl mx-auto">
                  <div>• 4 AI Project Types</div>
                  <div>• Story & Image Creation</div>
                  <div>• Chatbot & Game Building</div>
                  <div>• Save & Share Projects</div>
                </div>
              </div>
            )}
            
            <div className="flex gap-4 justify-center flex-wrap">
              {userTier === 'free' ? (
                <>
                  <button
                    onClick={() => handleStartProject('story-generator-basic')}
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                  >
                    Start Building for Free!
                  </button>
                  <Link
                    href="/kids-ai/pricing"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
                  >
                    View Pricing
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleStartProject('story-generator-basic')}
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                  >
                    Start Your First Project
                  </button>
                  <Link
                    href="/kids-ai/safety"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
                  >
                    Safety Guide
                  </Link>
                </>
              )}
            </div>
            
            <div className="mt-6 text-sm opacity-80">
              ✅ COPPA Compliant • ✅ Safe AI APIs • ✅ Parent Dashboard • ✅ 30-day Money-back Guarantee
            </div>
          </div>
        </div>
      </div>
    </>
  );
}