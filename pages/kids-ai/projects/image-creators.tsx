import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import { codingLevels, CodingProject } from '../../../data/kidsAICodingPlatform';
import CodingProjectCard from '../../../components/kids/CodingProjectCard';
import SafetyBadge from '../../../components/kids/SafetyBadge';

export default function ImageCreatorsCategory() {
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

  // Get all image-related projects from all levels
  const imageProjects: CodingProject[] = codingLevels.flatMap(level => 
    level.projects.filter(project => 
      project.category === 'image' || 
      project.category === 'creative' || 
      project.id === 'color-palette-generator'
    )
  );

  const handleStartProject = (projectId: string) => {
    // Map project IDs to actual project pages
    const projectRoutes = {
      'color-palette-generator': '/kids-ai/projects/image-creator',
      'image-generator': '/kids-ai/projects/image-creator',
      'multi-modal-app': '/kids-ai/projects/ai-game-maker'
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
        title="AI Image Creators for Kids | DALL-E & Creative AI Projects | siteoptz.ai"
        description="Kids explore AI image creation! Build art generators, color palettes, and creative AI tools using DALL-E and other image AI APIs in a safe environment."
        canonicalUrl="https://siteoptz.ai/kids-ai/projects/image-creators"
        keywords={['kids AI image creation', 'children DALL-E projects', 'AI art for kids', 'creative AI tools', 'image generation learning']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-6xl mb-4">🎨</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              AI Image Creators
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Explore the magic of <strong>AI-powered image creation</strong>! Learn to generate art, 
              design color palettes, and build creative tools using <strong>real AI APIs</strong> like DALL-E.
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
              <span className="text-white">Image Creators</span>
            </div>
          </div>

          {/* Category Overview */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">🖼️ What You&apos;ll Create</h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-pink-400 text-xl">🎨</span>
                    <div>
                      <h4 className="font-semibold text-white">AI Art Generators</h4>
                      <p className="text-sm">Create tools that generate beautiful artwork from text descriptions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">🌈</span>
                    <div>
                      <h4 className="font-semibold text-white">Color Palette Tools</h4>
                      <p className="text-sm">Build smart color generators for artists and designers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 text-xl">🎭</span>
                    <div>
                      <h4 className="font-semibold text-white">Creative Studios</h4>
                      <p className="text-sm">Combine images, stories, and audio into amazing creations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">🧠 Skills You&apos;ll Learn</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• Image prompting</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• Art direction</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• Color theory</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• Creative editing</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• API integration</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-300">• Visual design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Technologies Used */}
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-8 mb-16 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🤖 Real AI Technologies</h2>
              <p className="text-xl opacity-90">
                Work with the same AI tools used by professional artists and designers!
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-lg font-bold mb-2">DALL-E 3</h3>
                <p className="text-sm opacity-80">
                  OpenAI&apos;s most advanced image generation model for creating stunning artwork
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🧠</div>
                <h3 className="text-lg font-bold mb-2">GPT-4 Vision</h3>
                <p className="text-sm opacity-80">
                  AI that can understand and describe images for better creative control
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🎵</div>
                <h3 className="text-lg font-bold mb-2">Multi-Modal AI</h3>
                <p className="text-sm opacity-80">
                  Combine text, images, and audio for comprehensive creative projects
                </p>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">🚀 Image Creator Projects</h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {imageProjects.map(project => (
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
            <h2 className="text-3xl font-bold text-white mb-8 text-center">📈 Your Image AI Learning Path</h2>
            
            <div className="space-y-6">
              {/* Explorer Level */}
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">🧭 Explorer: Start with Colors</h3>
                  <p className="text-gray-300 mb-3">
                    Begin your journey by learning color theory and creating AI-powered color palette generators.
                  </p>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm text-blue-400 font-medium">Project: AI Color Magic</span>
                  </div>
                </div>
              </div>

              {/* Creator Level */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">🎨 Creator: Generate Art</h3>
                  <p className="text-gray-300 mb-3">
                    Learn to write effective prompts and create your own AI art studio using DALL-E.
                  </p>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm text-blue-400 font-medium">Project: AI Art Studio</span>
                  </div>
                </div>
              </div>

              {/* Builder Level */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">🔧 Builder: Multi-Modal Creation</h3>
                  <p className="text-gray-300 mb-3">
                    Combine images with stories and audio to create comprehensive creative applications.
                  </p>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <span className="text-sm text-orange-400 font-medium">Project: AI Content Studio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 mb-16 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">🌟 Student Success Stories</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-4xl mb-3">🎨</div>
                <h4 className="font-bold mb-2">Emma, age 11</h4>
                <p className="text-sm opacity-90">
                  &quot;I created an art generator that makes pictures of magical creatures! 
                  My friends love using it to design characters for our stories.&quot;
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-4xl mb-3">🌈</div>
                <h4 className="font-bold mb-2">Alex, age 13</h4>
                <p className="text-sm opacity-90">
                  &quot;My color palette tool helps my mom with her design work. 
                  I learned how AI understands colors and emotions!&quot;
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <div className="text-4xl mb-3">🎭</div>
                <h4 className="font-bold mb-2">Sofia, age 15</h4>
                <p className="text-sm opacity-90">
                  &quot;I built a creative studio that turns my poems into art and music. 
                  It&apos;s like having an AI creative partner!&quot;
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Art with AI?</h2>
            <p className="text-xl mb-6 opacity-90">
              Start your journey into AI-powered creativity today!
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => handleStartProject('color-palette-generator')}
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                🎨 Start with Color Magic
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