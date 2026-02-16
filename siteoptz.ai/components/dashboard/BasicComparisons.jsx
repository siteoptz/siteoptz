import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BasicComparisons = ({ tools }) => {
  const [comparisonsUsed, setComparisonsUsed] = useState(0);
  const [featuredComparisons, setFeaturedComparisons] = useState([]);
  const DAILY_LIMIT = 3;

  useEffect(() => {
    // Get today's comparisons usage from localStorage
    const today = new Date().toDateString();
    const storedData = localStorage.getItem('dailyComparisons');
    
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data.date === today) {
        setComparisonsUsed(data.used || 0);
      } else {
        // New day, reset counter
        localStorage.setItem('dailyComparisons', JSON.stringify({ date: today, used: 0 }));
        setComparisonsUsed(0);
      }
    } else {
      // First time, initialize
      localStorage.setItem('dailyComparisons', JSON.stringify({ date: today, used: 0 }));
    }

    // Set up featured comparisons
    if (tools && tools.length > 0) {
      const popular = [
        { tool1: 'chatgpt', tool2: 'claude' },
        { tool1: 'chatgpt', tool2: 'gemini' },
        { tool1: 'claude', tool2: 'perplexity' },
        { tool1: 'jasper-ai', tool2: 'chatgpt' },
        { tool1: 'gemini', tool2: 'claude' },
      ];
      
      const validComparisons = popular.filter(comp => 
        tools.find(t => t.slug === comp.tool1) && tools.find(t => t.slug === comp.tool2)
      ).slice(0, 6);
      
      setFeaturedComparisons(validComparisons);
    }
  }, [tools]);

  const handleComparisonClick = (tool1, tool2) => {
    if (comparisonsUsed >= DAILY_LIMIT) {
      alert(`You've reached your daily limit of ${DAILY_LIMIT} comparisons. Upgrade to Pro for unlimited comparisons!`);
      return;
    }

    const today = new Date().toDateString();
    const newUsed = comparisonsUsed + 1;
    
    localStorage.setItem('dailyComparisons', JSON.stringify({ 
      date: today, 
      used: newUsed 
    }));
    
    setComparisonsUsed(newUsed);
    
    // Navigate to comparison
    window.location.href = `/compare/${tool1}/vs/${tool2}`;
  };

  const handleKeyPress = (event, tool1, tool2) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleComparisonClick(tool1, tool2);
    }
  };

  const getToolData = (slug) => {
    return tools?.find(t => t.slug === slug);
  };

  const remainingComparisons = Math.max(0, DAILY_LIMIT - comparisonsUsed);

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Quick Comparisons</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">
            {remainingComparisons}/{DAILY_LIMIT} remaining today
          </div>
          <div className="w-16 h-2 bg-gray-800 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${((DAILY_LIMIT - remainingComparisons) / DAILY_LIMIT) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {remainingComparisons === 0 && (
        <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="text-orange-400">⚠️</div>
            <div>
              <h3 className="text-orange-300 font-medium">Daily Limit Reached</h3>
              <p className="text-orange-200/80 text-sm">
                You&apos;ve used all {DAILY_LIMIT} comparisons for today. 
                <Link href="/#pricing" className="text-cyan-400 hover:text-cyan-300 ml-1 underline">
                  Upgrade to Pro
                </Link> for unlimited comparisons.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredComparisons.map((comparison, index) => {
          const tool1 = getToolData(comparison.tool1);
          const tool2 = getToolData(comparison.tool2);
          
          if (!tool1 || !tool2) return null;
          
          const isDisabled = remainingComparisons === 0;

          return (
            <div
              key={`${tool1.slug}-${tool2.slug}`}
              className={`relative border border-gray-800 rounded-lg p-4 transition-all duration-200 ${
                isDisabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:border-gray-700 hover:bg-gray-900/50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400'
              }`}
              onClick={() => !isDisabled && handleComparisonClick(tool1.slug, tool2.slug)}
              onKeyDown={(e) => !isDisabled && handleKeyPress(e, tool1.slug, tool2.slug)}
              tabIndex={isDisabled ? -1 : 0}
              role="button"
              aria-label={`Compare ${tool1.name} and ${tool2.name}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {tool1.logo && (
                    <Image
                      src={tool1.logo}
                      alt={`${tool1.name} logo`}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                  )}
                  <span className="text-white text-sm font-medium">{tool1.name}</span>
                </div>
                
                <div className="text-gray-500 text-xs font-bold">VS</div>
                
                <div className="flex items-center gap-3">
                  <span className="text-white text-sm font-medium">{tool2.name}</span>
                  {tool2.logo && (
                    <Image
                      src={tool2.logo}
                      alt={`${tool2.name} logo`}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                  )}
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-400">
                <span>{tool1.overview?.category || 'AI Tool'}</span>
                <span>{tool2.overview?.category || 'AI Tool'}</span>
              </div>
              
              {isDisabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-1">🔒</div>
                    <div className="text-gray-300 text-xs">Upgrade for access</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {remainingComparisons > 0 && (
        <div className="mt-4 text-center">
          <Link
            href="/compare"
            className="text-cyan-400 hover:text-cyan-300 text-sm underline"
          >
            Browse all AI tool comparisons →
          </Link>
        </div>
      )}
    </div>
  );
};

export default BasicComparisons;