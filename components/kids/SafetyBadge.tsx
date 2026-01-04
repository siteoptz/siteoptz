import React from 'react';

interface SafetyBadgeProps {
  type?: 'coppa' | 'safetyCertified' | 'teacherApproved';
  className?: string;
}

const SafetyBadge: React.FC<SafetyBadgeProps> = ({ 
  type = 'coppa', 
  className = '' 
}) => {
  const badges = {
    coppa: {
      text: 'COPPA',
      tooltip: 'COPPA Compliant - Verified safe for children',
      color: '#4caf50',
      bgColor: '#e8f5e9'
    },
    safetyCertified: {
      text: 'Safety Certified',
      tooltip: 'Safety verified and certified by siteoptz.ai',
      color: '#2196f3',
      bgColor: '#e3f2fd'
    },
    teacherApproved: {
      text: 'Teacher Approved',
      tooltip: 'Approved by certified educators',
      color: '#ff9800',
      bgColor: '#fff3e0'
    }
  };

  const badge = badges[type] || badges.coppa;

  return (
    <span 
      className={`safety-badge ${className}`}
      style={{ 
        backgroundColor: badge.bgColor,
        color: badge.color,
        border: `1px solid ${badge.color}`,
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '0.75em',
        fontWeight: 'bold',
        display: 'inline-block',
        cursor: 'help'
      }}
      title={badge.tooltip}
    >
      ✓ {badge.text}
    </span>
  );
};

export default SafetyBadge;