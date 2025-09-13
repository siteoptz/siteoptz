import React from 'react';
import { trackAffiliateClick, trackFunnelStep } from '../utils/key-events-tracker';

interface TrackableButtonProps {
  href?: string;
  onClick?: () => void;
  toolName?: string;
  linkType: 'cta' | 'affiliate' | 'comparison' | 'learn_more';
  position?: string;
  className?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  external?: boolean;
  trackingData?: Record<string, any>;
}

const TrackableButton: React.FC<TrackableButtonProps> = ({
  href,
  onClick,
  toolName,
  linkType,
  position = 'unknown',
  className = '',
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  external = false,
  trackingData = {}
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // Track the click event
    if (linkType === 'affiliate' && toolName) {
      trackAffiliateClick(
        toolName,
        linkType,
        href || 'internal',
        position,
        {
          ...trackingData,
          button_variant: variant,
          button_size: size
        }
      );
      
      // Track funnel step for CTA clicks
      trackFunnelStep('cta_clicked', toolName, undefined, {
        link_type: linkType,
        position,
        destination: href
      });
    } else if (linkType === 'cta') {
      // Track general CTA clicks
      trackFunnelStep('cta_clicked', toolName, undefined, {
        link_type: linkType,
        position,
        button_text: typeof children === 'string' ? children : 'button',
        ...trackingData
      });
    }
    
    // Call custom onClick handler if provided
    if (onClick) {
      onClick();
    }
    
    // Handle navigation for links
    if (href && !e.defaultPrevented) {
      if (external) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else if (!onClick) {
        window.location.href = href;
      }
    }
  };
  
  // Style variants
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;
  
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={buttonClasses}
        data-tool={toolName}
        data-link-type={linkType}
        data-position={position}
      >
        {children}
        {external && (
          <svg
            className="ml-2 -mr-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    );
  }
  
  return (
    <button
      onClick={handleClick}
      className={buttonClasses}
      data-tool={toolName}
      data-link-type={linkType}
      data-position={position}
    >
      {children}
    </button>
  );
};

export default TrackableButton;