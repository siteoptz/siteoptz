import React, { useState } from 'react';
import { getToolInitials, getToolColorGradient, getToolLogoPath } from '../utils/toolLogoUtils';

interface ToolLogoProps {
  toolName: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const ToolLogo: React.FC<ToolLogoProps> = ({ 
  toolName, 
  logoUrl, 
  size = 'md',
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(
    logoUrl || getToolLogoPath(toolName)
  );

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg'
  };

  const handleImageError = () => {
    if (!imageError && currentSrc) {
      // Try PNG format if SVG fails
      if (currentSrc.includes('.svg')) {
        setCurrentSrc(currentSrc.replace('.svg', '.png'));
        return;
      }
      // Try JPG format if PNG fails
      if (currentSrc.includes('.png')) {
        setCurrentSrc(currentSrc.replace('.png', '.jpg'));
        return;
      }
    }
    // If all formats fail, show initials
    setImageError(true);
  };

  const initials = getToolInitials(toolName);
  const gradient = getToolColorGradient(toolName);

  if (imageError || !currentSrc) {
    // Display initials with colored background
    return (
      <div 
        className={`${sizeClasses[size]} ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center font-bold text-white shadow-md`}
        title={toolName}
      >
        {initials}
      </div>
    );
  }

  return (
    <img 
      src={currentSrc}
      alt={`${toolName} logo`}
      className={`${sizeClasses[size]} ${className} object-contain rounded-lg`}
      onError={handleImageError}
      title={toolName}
    />
  );
};

export default ToolLogo;