import React from 'react';
import { UserPlan } from '../../types/userPlan';

interface UsageMeterProps {
  label: string;
  current: number;
  limit: number;
  icon: React.ReactNode;
  color?: 'cyan' | 'purple' | 'green' | 'amber';
  showProgressBar?: boolean;
}

export const UsageMeter: React.FC<UsageMeterProps> = ({
  label,
  current,
  limit,
  icon,
  color = 'cyan',
  showProgressBar = true
}) => {
  const colorClasses = {
    cyan: 'text-cyan-400 bg-cyan-500',
    purple: 'text-purple-400 bg-purple-500',
    green: 'text-green-400 bg-green-500',
    amber: 'text-amber-400 bg-amber-500'
  };

  const percentage = limit === 0 ? 100 : Math.min((current / limit) * 100, 100);
  const isUnlimited = limit === 0;

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white">
            {current}/{isUnlimited ? '∞' : limit}
          </p>
        </div>
        <div className={`${colorClasses[color].split(' ')[0]}`}>
          {icon}
        </div>
      </div>
      {showProgressBar && (
        <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`${colorClasses[color].split(' ')[1]} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
      {limit > 0 && current >= limit && (
        <p className="text-red-400 text-xs mt-2">Limit reached</p>
      )}
    </div>
  );
};