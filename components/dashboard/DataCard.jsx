// components/dashboard/DataCard.jsx
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

export default function DataCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  description,
  onClick,
  className = '' 
}) {
  const isPositiveTrend = trend === 'up';
  const changeColor = isPositiveTrend ? 'text-green-400' : 'text-red-400';
  const changeIcon = isPositiveTrend ? ArrowUpIcon : ArrowDownIcon;
  const ChangeIcon = changeIcon;

  return (
    <div 
      className={`bg-black border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-200 cursor-pointer ${className}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e);
        }
      }}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="text-2xl">
              {typeof icon === 'string' ? icon : icon}
            </div>
          )}
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-bold text-white">
          {value}
        </div>

        {change && (
          <div className="flex items-center space-x-1">
            <ChangeIcon className={`w-4 h-4 ${changeColor}`} />
            <span className={`text-sm font-medium ${changeColor}`}>
              {change}
            </span>
            <span className="text-gray-500 text-sm">vs last period</span>
          </div>
        )}

        {description && (
          <p className="text-gray-500 text-sm">{description}</p>
        )}
      </div>
    </div>
  );
}