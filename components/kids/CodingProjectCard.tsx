import React from 'react';
import Link from 'next/link';
import { CodingProject } from '../../data/kidsAICodingPlatform';

interface CodingProjectCardProps {
  project: CodingProject;
  userTier?: 'free' | 'parent-pro' | 'educator' | 'school';
  userLevel?: 'explorer' | 'creator' | 'builder' | 'innovator';
  onStartProject?: (projectId: string) => void;
  className?: string;
}

const CodingProjectCard: React.FC<CodingProjectCardProps> = ({
  project,
  userTier = 'free',
  userLevel = 'explorer',
  onStartProject,
  className = ''
}) => {
  const isLocked = project.isPremium && userTier === 'free';
  const levelOrder = ['explorer', 'creator', 'builder', 'innovator'];
  const canAccess = levelOrder.indexOf(userLevel) >= levelOrder.indexOf(project.requiredLevel);
  
  const difficultyColors = {
    'Easy': 'bg-green-100 text-green-800 border-green-200',
    'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Hard': 'bg-orange-100 text-orange-800 border-orange-200',
    'Expert': 'bg-red-100 text-red-800 border-red-200'
  };

  const handleStartProject = () => {
    if (onStartProject && !isLocked && canAccess) {
      onStartProject(project.id);
    } else if (isLocked) {
      window.open('/kids-ai/pricing', '_blank');
    }
  };

  return (
    <div className={`
      coding-project-card bg-black border-2 border-gray-800 rounded-xl p-6 transition-all duration-300 
      hover:transform hover:-translate-y-1 hover:shadow-lg hover:border-blue-500 relative
      ${!canAccess ? 'opacity-60' : ''}
      ${className}
    `}>
      {/* Premium Badge */}
      {project.isPremium && (
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            PRO
          </span>
        </div>
      )}
      
      {/* Project Header */}
      <div className="project-header mb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{project.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${difficultyColors[project.difficulty]}`}>
                {project.difficulty}
              </span>
              <span className="text-gray-400 text-sm">⏱️ {project.estimatedTime}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        {project.description}
      </p>
      
      {/* Skills & AI APIs */}
      <div className="mb-4">
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Skills You&apos;ll Learn:</h4>
          <div className="flex flex-wrap gap-1">
            {project.skills.slice(0, 3).map((skill, idx) => (
              <span 
                key={idx}
                className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{project.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2">AI Tools:</h4>
          <div className="flex flex-wrap gap-1">
            {project.aiApis.map((api, idx) => (
              <span 
                key={idx}
                className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs font-medium"
              >
                {api}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">Completion Rate</span>
          <span className="text-xs text-gray-400">{project.completionRate}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.completionRate}%` }}
          ></div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="space-y-2">
        {!canAccess ? (
          <div className="text-center py-3">
            <p className="text-gray-400 text-sm mb-2">
              Requires {project.requiredLevel.charAt(0).toUpperCase() + project.requiredLevel.slice(1)} level
            </p>
            <span className="text-gray-500 text-xs">
              Complete previous levels to unlock
            </span>
          </div>
        ) : isLocked ? (
          <button 
            onClick={handleStartProject}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Upgrade to Start Building
          </button>
        ) : (
          <button 
            onClick={handleStartProject}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            Start Building 🚀
          </button>
        )}
        
        <div className="text-center">
          <span className="text-xs text-gray-500">
            Safe, guided environment • COPPA compliant
          </span>
        </div>
      </div>
      
      {/* Lock Overlay for Inaccessible Projects */}
      {!canAccess && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🔒</div>
            <p className="text-sm text-gray-300 font-medium">
              Complete previous levels
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingProjectCard;