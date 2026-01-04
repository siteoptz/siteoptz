import React from 'react';

interface AgeGroup {
  id: string;
  label: string;
  range: { min: number; max: number } | null;
}

interface AgeFilterProps {
  selectedAge: string;
  onAgeChange: (ageGroupId: string) => void;
  className?: string;
}

const AgeFilter: React.FC<AgeFilterProps> = ({ 
  selectedAge, 
  onAgeChange, 
  className = '' 
}) => {
  const ageGroups: AgeGroup[] = [
    { id: 'all', label: 'All Ages', range: null },
    { id: '5-8', label: 'Ages 5-8', range: { min: 5, max: 8 } },
    { id: '9-12', label: 'Ages 9-12', range: { min: 9, max: 12 } },
    { id: '13-18', label: 'Ages 13-18', range: { min: 13, max: 18 } }
  ];

  return (
    <div className={`age-filter ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Filter by Age:
      </label>
      <div className="flex gap-2 flex-wrap">
        {ageGroups.map(group => (
          <button
            key={group.id}
            className={`
              px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-200
              ${selectedAge === group.id 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
              }
            `}
            onClick={() => onAgeChange(group.id)}
          >
            {group.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgeFilter;