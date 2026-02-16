import { useState } from 'react';
import Link from 'next/link';

const ImplementationGuides = () => {
  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: 'S' },
    { id: 'integration', label: 'Integration', icon: 'I' },
    { id: 'workflow', label: 'Workflows', icon: 'W' },
    { id: 'best-practices', label: 'Best Practices', icon: 'B' }
  ];

  const guides = {
    'getting-started': [
      {
        title: "Setting Up Your First AI Tool",
        description: "Complete walkthrough of account creation, setup, and first use",
        difficulty: "Beginner",
        timeToComplete: "15 min",
        steps: ["Create account", "Configure settings", "Run first test", "Review results"],
        featured: true
      },
      {
        title: "Understanding AI Tool Pricing",
        description: "Navigate pricing tiers and choose the right plan for your needs",
        difficulty: "Beginner",
        timeToComplete: "10 min",
        steps: ["Compare plans", "Calculate usage", "Choose tier", "Set up billing"]
      },
      {
        title: "Free Trial Maximization Guide",
        description: "Get the most out of your free trial periods",
        difficulty: "Beginner",
        timeToComplete: "12 min",
        steps: ["Plan usage", "Test key features", "Document results", "Make decision"]
      }
    ],
    'integration': [
      {
        title: "API Integration Basics",
        description: "Connect AI tools to your existing workflows via API",
        difficulty: "Intermediate",
        timeToComplete: "30 min",
        steps: ["Get API keys", "Test connection", "Build integration", "Handle errors"],
        featured: true
      },
      {
        title: "Browser Extension Setup",
        description: "Install and configure browser extensions for AI tools",
        difficulty: "Beginner",
        timeToComplete: "8 min",
        steps: ["Install extension", "Grant permissions", "Configure settings", "Test functionality"]
      },
      {
        title: "Slack/Teams Integration",
        description: "Bring AI tools into your team communication channels",
        difficulty: "Intermediate",
        timeToComplete: "20 min",
        steps: ["Add bot", "Configure permissions", "Set up commands", "Train team"]
      }
    ],
    'workflow': [
      {
        title: "Content Creation Workflow",
        description: "Streamline content production with AI writing tools",
        difficulty: "Intermediate",
        timeToComplete: "25 min",
        steps: ["Plan content", "Generate drafts", "Edit and refine", "Publish workflow"],
        featured: true
      },
      {
        title: "Data Analysis Pipeline",
        description: "Automate data processing and insights generation",
        difficulty: "Advanced",
        timeToComplete: "45 min",
        steps: ["Data preparation", "AI processing", "Results interpretation", "Report generation"]
      },
      {
        title: "Customer Support Automation",
        description: "Enhance support with AI-powered responses",
        difficulty: "Intermediate",
        timeToComplete: "35 min",
        steps: ["Set up chatbot", "Train responses", "Escalation rules", "Monitor performance"]
      }
    ],
    'best-practices': [
      {
        title: "Prompt Engineering Mastery",
        description: "Write effective prompts for better AI responses",
        difficulty: "Intermediate",
        timeToComplete: "20 min",
        steps: ["Understand context", "Structure prompts", "Use examples", "Iterate and improve"],
        featured: true
      },
      {
        title: "Data Privacy and Security",
        description: "Keep your data safe when using AI tools",
        difficulty: "Beginner",
        timeToComplete: "15 min",
        steps: ["Review privacy policies", "Configure settings", "Audit data usage", "Set boundaries"]
      },
      {
        title: "ROI Measurement Framework",
        description: "Track and measure the impact of AI tools",
        difficulty: "Advanced",
        timeToComplete: "40 min",
        steps: ["Define metrics", "Set baselines", "Track usage", "Calculate ROI"]
      }
    ]
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-400 bg-green-900/30';
      case 'intermediate': return 'text-yellow-400 bg-yellow-900/30';
      case 'advanced': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Implementation Guides</h2>
        <Link 
          href="/guides"
          className="text-cyan-400 hover:text-cyan-300 text-sm underline"
        >
          View all guides →
        </Link>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="w-5 h-5 bg-cyan-600 rounded flex items-center justify-center text-white text-xs font-bold">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Featured Guide */}
      {guides[selectedCategory] && (
        <div className="space-y-4">
          {guides[selectedCategory]
            .filter(guide => guide.featured)
            .map((guide, index) => (
              <div
                key={`featured-${index}`}
                className="border border-cyan-600/30 bg-gradient-to-r from-cyan-900/10 to-blue-900/10 rounded-lg p-5 mb-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 text-sm">Featured</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(guide.difficulty)}`}>
                    {guide.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{guide.title}</h3>
                <p className="text-gray-300 mb-4">{guide.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-4 h-4 bg-gray-600 rounded flex items-center justify-center text-white text-xs">T</span>
                    {guide.timeToComplete}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-4 h-4 bg-gray-600 rounded flex items-center justify-center text-white text-xs">#</span>
                    {guide.steps.length} steps
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.steps.map((step, stepIndex) => (
                    <span
                      key={stepIndex}
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                    >
                      {stepIndex + 1}. {step}
                    </span>
                  ))}
                </div>
                
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                  Start Guide
                </button>
              </div>
            ))}

          {/* Other Guides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guides[selectedCategory]
              .filter(guide => !guide.featured)
              .map((guide, index) => (
                <div
                  key={index}
                  className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white">{guide.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(guide.difficulty)}`}>
                      {guide.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3">{guide.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-gray-600 rounded flex items-center justify-center text-white text-xs">T</span>
                        {guide.timeToComplete}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-gray-600 rounded flex items-center justify-center text-white text-xs">#</span>
                        {guide.steps.length} steps
                      </span>
                    </div>
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm underline">
                      Start →
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Quick Tips Section */}
      <div className="mt-8 pt-6 border-t border-gray-800">
        <h3 className="text-md font-medium text-white mb-4">Quick Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-cyan-400 mb-1">Start Small</h4>
            <p className="text-xs text-gray-400">Begin with one AI tool and master it before adding more to your workflow.</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-cyan-400 mb-1">Test Thoroughly</h4>
            <p className="text-xs text-gray-400">Always test AI tools with your actual data before committing to a paid plan.</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-cyan-400 mb-1">Monitor Usage</h4>
            <p className="text-xs text-gray-400">Track your usage patterns to optimize costs and identify upgrade opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationGuides;