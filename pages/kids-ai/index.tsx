import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import SEOHead from '../../components/SEOHead';
import { kidsAIToolsDatabase, KidsAITool } from '../../data/kidsAIToolsDatabase';
import KidsAIToolCard from '../../components/kids/KidsAIToolCard';
import AgeFilter from '../../components/kids/AgeFilter';
import SafetyBadge from '../../components/kids/SafetyBadge';

export default function KidsAIDirectory() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [coppaOnly, setCoppaOnly] = useState(true);
  const [filteredTools, setFilteredTools] = useState<KidsAITool[]>([]);

  // Determine user tier based on session (placeholder logic)
  const userTier = session?.user ? 'parent-pro' : 'free'; // This should be replaced with actual plan detection

  useEffect(() => {
    // Filter logic
    let tools = kidsAIToolsDatabase.categories.flatMap(cat => 
      cat.tools.map(tool => ({ ...tool, category: cat.id }))
    );

    // Filter by COPPA
    if (coppaOnly) {
      tools = tools.filter(tool => tool.coppaCompliant);
    }

    // Filter by age
    if (selectedAge !== 'all') {
      const ageRanges = {
        '5-8': { min: 5, max: 8 },
        '9-12': { min: 9, max: 12 },
        '13-18': { min: 13, max: 18 }
      };
      const range = ageRanges[selectedAge as keyof typeof ageRanges];
      if (range) {
        tools = tools.filter(tool => 
          tool.ageRange.min <= range.max && tool.ageRange.max >= range.min
        );
      }
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      tools = tools.filter(tool => tool.categories.includes(selectedCategory));
    }

    // Filter by search
    if (searchTerm) {
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTools(tools);
  }, [selectedCategory, selectedAge, searchTerm, coppaOnly]);

  const handleViewDetails = (tool: KidsAITool) => {
    // Navigate to tool detail page or show modal
    console.log('View details for:', tool.name);
    // In a real app, this might navigate to /kids-ai/tools/[toolId]
  };

  return (
    <>
      <SEOHead
        title="Safe AI Tools for Kids | siteoptz.ai"
        description="Discover 200+ safety-certified, COPPA-compliant AI tools for children ages 5-18. Educational AI tools reviewed by parents and educators."
        canonicalUrl="https://siteoptz.ai/kids-ai"
        keywords={['kids AI tools', 'COPPA compliant AI', 'safe AI for children', 'educational AI tools', 'parental controls AI']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <header className="text-center mb-12 px-8 py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🧒 Safe AI Tools for Kids
            </h1>
            <p className="text-xl mb-6 opacity-95">
              Discover safety-certified, educational AI tools for children ages 5-18
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <SafetyBadge type="coppa" />
              <SafetyBadge type="safetyCertified" />
              <SafetyBadge type="teacherApproved" />
            </div>
          </header>

          {/* Filters */}
          <div className="bg-black border border-gray-800 rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                type="search"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {kidsAIToolsDatabase.categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-end">
              <AgeFilter selectedAge={selectedAge} onAgeChange={setSelectedAge} />
              
              <label className="flex items-center gap-3 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={coppaOnly}
                  onChange={(e) => setCoppaOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm font-medium">COPPA Compliant Only</span>
              </label>
            </div>
          </div>

          {/* Results Header */}
          <div className="bg-black border border-gray-800 rounded-lg p-4 mb-6 flex justify-between items-center flex-wrap gap-4">
            <p className="text-white">
              <span className="font-semibold text-blue-400">{filteredTools.length}</span> safety-certified tools found
            </p>
            {userTier === 'free' && (
              <div className="flex items-center gap-4">
                <p className="text-gray-300 text-sm">🔒 Upgrade to view full tool details and reviews</p>
                <Link 
                  href="/kids-ai/pricing" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View Pricing →
                </Link>
              </div>
            )}
          </div>

          {/* Tools Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {filteredTools.map(tool => (
              <KidsAIToolCard
                key={tool.id}
                tool={tool}
                userTier={userTier}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
              <p className="text-gray-300 mb-6">
                No tools found matching your criteria. Try adjusting your filters.
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedAge('all');
                  setSearchTerm('');
                  setCoppaOnly(true);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Explore Safe AI with Your Kids?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of parents already using our safety-certified AI tool directory
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/kids-ai/pricing"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Full Access
              </Link>
              <Link
                href="/kids-ai/safety"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Safety Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}