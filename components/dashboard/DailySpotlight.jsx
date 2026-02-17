import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DailySpotlight = ({ tools }) => {
  const [spotlightTool, setSpotlightTool] = useState(null);

  useEffect(() => {
    if (tools && tools.length > 0) {
      // Get today's date as seed for consistent daily selection
      const today = new Date();
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
      
      // Use day of year as seed for pseudo-random selection
      const toolIndex = dayOfYear % tools.length;
      setSpotlightTool(tools[toolIndex]);
    }
  }, [tools]);

  if (!spotlightTool) {
    return (
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-800 rounded mb-4"></div>
          <div className="h-4 bg-gray-800 rounded mb-2"></div>
          <div className="h-4 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
        <h2 className="text-lg font-semibold text-white">Featured Tool</h2>
      </div>
      
      <div className="flex items-start gap-4">
        {spotlightTool.logo && (
          <div className="flex-shrink-0">
            <Image
              src={spotlightTool.logo}
              alt={`${spotlightTool.name} logo`}
              width={48}
              height={48}
              className="rounded-lg"
            />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-white">{spotlightTool.name}</h3>
            {spotlightTool.rating && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded-full">
                <span className="text-yellow-400">★</span>
                <span className="text-sm text-gray-300">{spotlightTool.rating}</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {spotlightTool.overview?.description || spotlightTool.meta?.description}
          </p>
          
          {spotlightTool.features && (
            <div className="flex flex-wrap gap-2 mb-4">
              {spotlightTool.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
              {spotlightTool.features.length > 3 && (
                <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                  +{spotlightTool.features.length - 3} more
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {spotlightTool.pricing && spotlightTool.pricing[0] && (
                <div className="text-cyan-400 font-semibold">
                  {spotlightTool.pricing[0].price_per_month === 0 
                    ? 'Free' 
                    : `$${spotlightTool.pricing[0].price_per_month}/mo`
                  }
                </div>
              )}
              <div className="text-gray-400 text-sm">
                {spotlightTool.overview?.category || 'Software Tool'}
              </div>
            </div>
            
            <Link 
              href={`/reviews/${spotlightTool.slug}`}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySpotlight;