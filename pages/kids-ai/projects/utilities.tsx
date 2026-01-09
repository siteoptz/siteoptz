import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import { codingLevels, CodingProject } from '../../../data/kidsAICodingPlatform';
import CodingProjectCard from '../../../components/kids/CodingProjectCard';
import SafetyBadge from '../../../components/kids/SafetyBadge';

export default function UtilitiesCategory() {
  const { data: session } = useSession();
  const userTier = session?.user ? 'parent-pro' : 'free';
  
  // Mock user progress - in real app, this would come from database
  const [userProgress] = useState({
    currentLevel: 'explorer',
    projectsCompleted: 1,
    skillsLearned: 3,
    timeSpent: 1.5,
    unlockedLevels: ['explorer', 'creator']
  });

  // Get all utility-related projects from all levels
  const utilityProjects: CodingProject[] = codingLevels.flatMap(level => 
    level.projects.filter(project => project.category === 'utility')
  );

  // Add some explorer-level utility projects that we'll create
  const explorerUtilityProjects: CodingProject[] = [
    {
      id: 'homework-helper',
      title: 'AI Homework Buddy',
      description: 'Create a helpful AI assistant that helps explain homework concepts and provides study tips.',
      icon: '📚',
      difficulty: 'Easy',
      estimatedTime: '35 minutes',
      skills: ['AI prompting', 'Educational design', 'Question formation'],
      aiApis: ['OpenAI GPT-3.5'],
      preview: {
        image: '/images/projects/homework-helper-preview.jpg'
      },
      requiredLevel: 'explorer',
      isPremium: false,
      completionRate: 85,
      category: 'utility'
    },
    {
      id: 'daily-planner',
      title: 'Smart Day Planner',
      description: 'Build an AI-powered daily planner that helps kids organize their activities and tasks.',
      icon: '📅',
      difficulty: 'Easy',
      estimatedTime: '40 minutes',
      skills: ['Planning', 'Time management', 'AI assistance'],
      aiApis: ['OpenAI GPT-3.5'],
      preview: {
        image: '/images/projects/daily-planner-preview.jpg'
      },
      requiredLevel: 'explorer',
      isPremium: false,
      completionRate: 78,
      category: 'utility'
    },
    {
      id: 'language-helper',
      title: 'Language Learning Pal',
      description: 'Create a friendly AI that helps you practice new languages through fun conversations.',
      icon: '🌍',
      difficulty: 'Easy',
      estimatedTime: '45 minutes',
      skills: ['Language learning', 'Conversation practice', 'Cultural awareness'],
      aiApis: ['OpenAI GPT-3.5'],
      preview: {
        image: '/images/projects/language-helper-preview.jpg'
      },
      requiredLevel: 'explorer',
      isPremium: false,
      completionRate: 81,
      category: 'utility'
    }
  ];

  // Combine existing utility projects with new explorer projects
  const allUtilityProjects = [...explorerUtilityProjects, ...utilityProjects];

  const handleStartProject = (projectId: string) => {
    // Map project IDs to actual project pages
    const projectRoutes = {
      'homework-helper': '/kids-ai/projects/chatbot-builder',
      'daily-planner': '/kids-ai/projects/chatbot-builder',
      'language-helper': '/kids-ai/projects/chatbot-builder',
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

  return (
    <>
      <SEOHead
        title="AI Utilities for Kids | Build Helpful AI Tools | siteoptz.ai"
        description="Kids build practical AI utilities! Create homework helpers, study assistants, language tutors, and productivity tools using real AI APIs in a safe environment."
        canonicalUrl="https://siteoptz.ai/kids-ai/projects/utilities"
        keywords={['kids AI utilities', 'educational AI tools', 'AI homework helper', 'study assistants for kids', 'productivity tools children']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-6xl mb-4">🔧</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI Utilities
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Build <strong>practical AI tools</strong> that make life easier! Create homework helpers, 
              study assistants, and productivity tools using <strong>real AI APIs</strong>.
            </p>
            
            {/* Trust Signals */}
            <div className="flex justify-center gap-4 flex-wrap mb-8">
              <SafetyBadge type="coppa" />
              <SafetyBadge type="safetyCertified" />
              <SafetyBadge type="teacherApproved" />
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/kids-ai/coding" className="hover:text-blue-400 transition-colors">
                AI Coding Platform
              </Link>
              <span>→</span>
              <span className="text-white">Utilities</span>
            </div>
          </div>

          {/* Category Overview */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">🛠️ What You&apos;ll Build</h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">📚</span>
                    <div>
                      <h4 className="font-semibold text-white">Study Assistants</h4>
                      <p className="text-sm">Create AI helpers that explain concepts and provide study support</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">📅</span>
                    <div>
                      <h4 className="font-semibold text-white">Productivity Tools</h4>
                      <p className="text-sm">Build smart planners and organizers for daily activities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">🌍</span>
                    <div>
                      <h4 className="font-semibold text-white">Learning Companions</h4>
                      <p className="text-sm">Design AI tutors for language learning and skill development</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">🧠 Skills You&apos;ll Learn</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• Educational design</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• Problem solving</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• User experience</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• Knowledge management</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• Productivity systems</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• AI fine-tuning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Problem-Solution Examples */}
          <div className="bg-gradient-to-r from-blue-900 to-green-900 rounded-2xl p-8 mb-16 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">💡 Real Problems, AI Solutions</h2>
              <p className="text-xl opacity-90">
                Learn to identify problems and solve them with AI!
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-3xl mb-3">😵‍💫</div>
                <h3 className="text-lg font-bold mb-2">Problem</h3>
                <p className="text-sm opacity-90 mb-4">
                  &quot;Math homework is confusing and I need help understanding the concepts.&quot;
                </p>
                <div className="text-3xl mb-2">✨</div>
                <h4 className="font-semibold mb-2">AI Solution</h4>
                <p className="text-sm opacity-80">
                  Build an AI homework helper that explains concepts in simple terms!
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-3xl mb-3">🤯</div>
                <h3 className="text-lg font-bold mb-2">Problem</h3>
                <p className="text-sm opacity-90 mb-4">
                  &quot;I forget my daily activities and lose track of important tasks.&quot;
                </p>
                <div className="text-3xl mb-2">✨</div>
                <h4 className="font-semibold mb-2">AI Solution</h4>
                <p className="text-sm opacity-80">
                  Create a smart planner that reminds you and suggests optimal schedules!
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-3xl mb-3">😅</div>
                <h3 className="text-lg font-bold mb-2">Problem</h3>
                <p className="text-sm opacity-90 mb-4">
                  &quot;I want to learn Spanish but need someone to practice with.&quot;
                </p>
                <div className="text-3xl mb-2">✨</div>
                <h4 className="font-semibold mb-2">AI Solution</h4>
                <p className="text-sm opacity-80">
                  Build a language learning pal that practices conversations with you!
                </p>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">🚀 Utility Projects</h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {allUtilityProjects.map(project => (
                <CodingProjectCard
                  key={project.id}
                  project={project}
                  userTier={userTier}
                  userLevel={userProgress.currentLevel as 'explorer' | 'creator' | 'builder' | 'innovator'}
                  onStartProject={handleStartProject}
                />
              ))}
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">📈 Your Utility AI Learning Path</h2>
            
            <div className="space-y-6">
              {/* Explorer Level */}
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">🧭 Explorer: Build Your First Helper</h3>
                  <p className="text-gray-300 mb-3">
                    Start with simple AI assistants that help with daily tasks like homework and planning.
                  </p>
                  <div className="grid md:grid-cols-3 gap-2">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <span className="text-sm text-blue-400 font-medium">📚 Homework Buddy</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <span className="text-sm text-green-400 font-medium">📅 Daily Planner</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <span className="text-sm text-purple-400 font-medium">🌍 Language Pal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Builder Level */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">🔧 Builder: Advanced Learning Tools</h3>
                  <p className="text-gray-300 mb-3">
                    Create sophisticated study assistants that adapt to your learning style.
                  </p>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm text-orange-400 font-medium">🎓 Personal Study AI</span>
                  </div>
                </div>
              </div>

              {/* Innovator Level */}
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">🚀 Innovator: Train Your Own AI</h3>
                  <p className="text-gray-300 mb-3">
                    Learn to customize AI models and build tools for your community.
                  </p>
                  <div className="grid md:grid-cols-3 gap-2">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <span className="text-sm text-purple-400 font-medium">🧠 Custom AI Model</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <span className="text-sm text-pink-400 font-medium">🏢 Startup Builder</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <span className="text-sm text-cyan-400 font-medium">🌟 Community Tool</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Utilities Matter */}
          <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-2xl p-8 mb-16 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">🌟 Why Build AI Utilities?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-bold mb-2">Solve Real Problems</h3>
                <p className="text-sm opacity-90">
                  Learn to identify challenges and build AI solutions that actually help people.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-lg font-bold mb-2">Boost Productivity</h3>
                <p className="text-sm opacity-90">
                  Discover how AI can make daily tasks easier and more efficient for everyone.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-lg font-bold mb-2">Enhance Learning</h3>
                <p className="text-sm opacity-90">
                  Build tools that make studying and skill development more effective and fun.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-lg font-bold mb-2">Help Others</h3>
                <p className="text-sm opacity-90">
                  Create utilities that benefit your family, friends, and community.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Helpful AI Tools?</h2>
            <p className="text-xl mb-6 opacity-90">
              Start creating AI utilities that make life better today!
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => handleStartProject('homework-helper')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                📚 Build Homework Helper
              </button>
              <Link
                href="/kids-ai/coding"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                🚀 View All Projects
              </Link>
            </div>
            
            <div className="mt-6 text-sm opacity-80">
              ✅ COPPA Compliant • ✅ Safe AI APIs • ✅ Parent Dashboard
            </div>
          </div>
        </div>
      </div>
    </>
  );
}