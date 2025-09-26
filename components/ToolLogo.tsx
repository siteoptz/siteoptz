import React, { useState, useEffect } from 'react';
import { getToolInitials, getToolColorGradient, getToolLogoPath } from '../utils/toolLogoUtils';

interface ToolLogoProps {
  toolName: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallbackType?: 'initials' | 'placeholder' | 'auto';
}

const ToolLogo: React.FC<ToolLogoProps> = ({ 
  toolName, 
  logoUrl, 
  size = 'md',
  className = '',
  fallbackType = 'auto'
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg'
  };

  // Initialize image source
  useEffect(() => {
    const initialSrc = logoUrl || getToolLogoPath(toolName);
    if (initialSrc) {
      setCurrentSrc(initialSrc);
    } else {
      setImageError(true);
    }
  }, [logoUrl, toolName]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
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
      // Try JPEG format if JPG fails
      if (currentSrc.includes('.jpg')) {
        setCurrentSrc(currentSrc.replace('.jpg', '.jpeg'));
        return;
      }
      // Try fallback placeholder
      if (!currentSrc.includes('placeholder-logo')) {
        setCurrentSrc('/images/placeholder-logo.svg');
        return;
      }
    }
    // If all formats fail, show initials
    setImageError(true);
  };

  const initials = getToolInitials(toolName);
  const gradient = getToolColorGradient(toolName);

  // Show loading state or initials while image loads
  if (imageError || !currentSrc) {
    // Display initials with colored background
    return (
      <div 
        className={`${sizeClasses[size]} ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center font-bold text-white shadow-md`}
        title={`${toolName} (No logo available)`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div 
          className={`${sizeClasses[size]} ${className} bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse`}
          title={`Loading ${toolName} logo...`}
        />
      )}
      
      {/* Image container with consistent sizing */}
      <div 
        className={`${sizeClasses[size]} ${className} bg-white rounded-lg flex items-center justify-center p-1 border border-gray-100 transition-opacity duration-200 ${
          imageLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
        }`}
      >
        <img 
          src={currentSrc}
          alt={`${toolName} logo`}
          className="max-w-full max-h-full object-contain"
          onLoad={handleImageLoad}
          onError={handleImageError}
          title={toolName}
        />
      </div>
    </div>
  );
};

export default ToolLogo;