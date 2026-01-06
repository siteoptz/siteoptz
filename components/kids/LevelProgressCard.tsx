import React from 'react';
import { CodingLevel } from '../../data/kidsAICodingPlatform';

interface LevelProgressCardProps {
  level: CodingLevel;
  isCurrentLevel?: boolean;
  isUnlocked?: boolean;
  progress?: {
    projectsCompleted: number;
    skillsLearned: number;
    timeSpent: number;
  };
  onSelectLevel?: (levelId: string) => void;
  className?: string;
}

const LevelProgressCard: React.FC<LevelProgressCardProps> = ({
  level,
  isCurrentLevel = false,
  isUnlocked = true,
  progress = { projectsCompleted: 0, skillsLearned: 0, timeSpent: 0 },
  onSelectLevel,
  className = ''
}) => {
  const calculateProgress = (): number => {
    if (!isUnlocked) return 0;
    
    const criteria = level.unlockCriteria;
    const projectProgress = Math.min(progress.projectsCompleted / Math.max(criteria.projectsCompleted, 1), 1);
    const skillProgress = Math.min(progress.skillsLearned / Math.max(criteria.skillsLearned, 1), 1);
    const timeProgress = Math.min(progress.timeSpent / Math.max(criteria.timeSpent, 1), 1);
    
    return Math.round(((projectProgress + skillProgress + timeProgress) / 3) * 100);
  };

  const overallProgress = calculateProgress();
  const isCompleted = overallProgress >= 90;

  const handleClick = () => {
    if (onSelectLevel && isUnlocked) {
      onSelectLevel(level.id);
    }
  };

  return (
    <div 
      className={`
        level-progress-card transition-all duration-300 cursor-pointer
        ${isCurrentLevel 
          ? 'bg-gradient-to-br from-blue-900 to-purple-900 border-2 border-blue-400 shadow-lg scale-105' 
          : isUnlocked
          ? 'bg-black border-2 border-gray-800 hover:border-gray-600 hover:transform hover:-translate-y-1'
          : 'bg-gray-900 border-2 border-gray-700 opacity-60 cursor-not-allowed'
        }
        rounded-xl p-6 relative
        ${className}
      `}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={isUnlocked ? 0 : -1}
      role="button"
      aria-label={`Select ${level.name} level`}
    >
      {/* Level Badge */}
      <div className="absolute top-4 right-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
          style={{ 
            backgroundColor: level.badge.bgColor, 
            color: level.badge.color,
            border: `2px solid ${level.badge.color}`
          }}
        >
          {level.badge.icon}
        </div>
      </div>
      
      {/* Level Header */}
      <div className="mb-4 pr-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{level.icon}</span>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {level.name}
            </h3>
            <p className="text-gray-400 text-sm">
              Ages {level.ageRange.min}-{level.ageRange.max}
            </p>
          </div>
        </div>
        <p className="text-gray-300 text-sm">
          {level.description}
        </p>
      </div>
      
      {/* Progress Section */}
      {isUnlocked ? (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-300">Progress</span>
            <span className="text-sm font-bold text-white">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                isCompleted 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                  : isCurrentLevel
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-gradient-to-r from-gray-600 to-gray-500'
              }`}
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          
          {/* Completion Status */}
          {isCompleted && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-400 text-lg">✅</span>
              <span className="text-green-400 text-sm font-semibold">Level Completed!</span>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500 text-lg">🔒</span>
            <span className="text-gray-400 text-sm font-semibold">Locked</span>
          </div>
          <div className="text-xs text-gray-500">
            Complete previous levels to unlock
          </div>
        </div>
      )}
      
      {/* Skills Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-2">Skills You&apos;ll Master:</h4>
        <div className="flex flex-wrap gap-1">
          {level.skills.slice(0, 3).map((skill, idx) => (
            <span 
              key={idx}
              className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
            >
              {skill}
            </span>
          ))}
          {level.skills.length > 3 && (
            <span className="text-gray-500 text-xs px-2 py-1">
              +{level.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      {/* Projects Count */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          <span className="font-semibold">{level.projects.length}</span> projects
        </div>
        <div className="text-sm text-gray-400">
          {isCurrentLevel ? (
            <span className="text-blue-400 font-semibold">Current Level</span>
          ) : isCompleted ? (
            <span className="text-green-400 font-semibold">Mastered</span>
          ) : isUnlocked ? (
            <span className="text-gray-300">Available</span>
          ) : (
            <span className="text-gray-500">Locked</span>
          )}
        </div>
      </div>
      
      {/* Requirements for locked levels */}
      {!isUnlocked && level.unlockCriteria.projectsCompleted > 0 && (
        <div className="mt-3 p-3 bg-gray-800 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">To unlock:</div>
          <div className="text-xs text-gray-300 space-y-1">
            {level.unlockCriteria.projectsCompleted > 0 && (
              <div>• Complete {level.unlockCriteria.projectsCompleted} projects</div>
            )}
            {level.unlockCriteria.skillsLearned > 0 && (
              <div>• Learn {level.unlockCriteria.skillsLearned} skills</div>
            )}
            {level.unlockCriteria.timeSpent > 0 && (
              <div>• Spend {level.unlockCriteria.timeSpent} hours coding</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelProgressCard;