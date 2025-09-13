import React from 'react';
import Link from 'next/link';
import { trackCTAClick } from '../utils/key-events-tracker';

interface EnhancedCTAButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'text_link' | 'button';
  position?: 'hero' | 'header' | 'sidebar' | 'footer' | 'inline' | 'popup' | 'pricing' | 'comparison';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string;
  external?: boolean;
  toolContext?: string;
  comparisonContext?: string;
  userIntent?: 'research' | 'purchase' | 'learn_more' | 'signup' | 'demo';
  funnelStage?: 'awareness' | 'consideration' | 'decision' | 'retention';
  abVariant?: string;
  destinationUrl?: string;
  section?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  trackingData?: Record<string, any>;
}

const EnhancedCTAButton: React.FC<EnhancedCTAButtonProps> = ({
  text,
  href,
  onClick,
  type = 'primary',
  position = 'inline',
  size = 'md',
  color,
  variant = 'solid',
  className = '',
  external = false,
  toolContext,
  comparisonContext,
  userIntent = 'learn_more',
  funnelStage = 'consideration',
  abVariant,
  destinationUrl,
  section,
  disabled = false,
  children,
  trackingData = {}
}) => {
  
  const handleClick = (e: React.MouseEvent) => {
    // Track CTA click with comprehensive data
    trackCTAClick({
      text,
      type,
      position,
      size,
      color,
      section,
      destinationUrl: destinationUrl || href,
      external,
      toolContext,
      comparisonContext,
      userIntent,
      funnelStage,
      abVariant
    }, trackingData);

    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }

    // Handle external links
    if (external && href && !e.defaultPrevented) {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Type-based styles
  const typeStyles = {
    primary: variant === 'solid' 
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500'
      : variant === 'outline'
      ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500'
      : 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    
    secondary: variant === 'solid'
      ? 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500'
      : variant === 'outline'
      ? 'border-2 border-gray-400 text-gray-600 hover:bg-gray-600 hover:text-white focus:ring-gray-500'
      : 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500',

    text_link: 'text-blue-600 hover:text-blue-800 underline font-medium',
    
    button: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
  };

  // Size-based styles
  const sizeStyles = {
    sm: type === 'text_link' ? 'text-sm' : 'px-3 py-1.5 text-sm',
    md: type === 'text_link' ? 'text-base' : 'px-4 py-2 text-base',
    lg: type === 'text_link' ? 'text-lg' : 'px-6 py-3 text-lg',
    xl: type === 'text_link' ? 'text-xl' : 'px-8 py-4 text-xl'
  };

  // Position-specific enhancements
  const positionEnhancements = {
    hero: 'shadow-lg transform hover:scale-105',
    header: 'shadow-sm',
    pricing: 'shadow-md hover:shadow-lg',
    comparison: 'shadow-md',
    popup: 'shadow-xl',
    footer: 'opacity-90 hover:opacity-100',
    sidebar: 'w-full',
    inline: ''
  };

  const buttonClasses = `${baseStyles} ${typeStyles[type]} ${sizeStyles[size]} ${positionEnhancements[position]} ${className}`;

  // Analytics attributes
  const analyticsAttrs = {
    'data-cta-type': type,
    'data-cta-position': position,
    'data-cta-text': text,
    'data-tool-context': toolContext,
    'data-user-intent': userIntent,
    'data-funnel-stage': funnelStage,
    'data-ab-variant': abVariant
  };

  // Render as Link for internal routes
  if (href && !external && !onClick) {
    return (
      <Link href={href} className={buttonClasses} onClick={handleClick} {...analyticsAttrs}>
        {children || text}
        {external && (
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </Link>
    );
  }

  // Render as external link
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        onClick={handleClick}
        {...analyticsAttrs}
      >
        {children || text}
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    );
  }

  // Render as button
  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      {...analyticsAttrs}
    >
      {children || text}
    </button>
  );
};

// Predefined CTA variants for common use cases
export const HeroCTA: React.FC<Omit<EnhancedCTAButtonProps, 'position' | 'type' | 'size'>> = (props) => (
  <EnhancedCTAButton {...props} position="hero" type="primary" size="lg" />
);

export const PricingCTA: React.FC<Omit<EnhancedCTAButtonProps, 'position' | 'userIntent'>> = (props) => (
  <EnhancedCTAButton {...props} position="pricing" userIntent="purchase" />
);

export const ComparisonCTA: React.FC<Omit<EnhancedCTAButtonProps, 'position' | 'funnelStage'>> = (props) => (
  <EnhancedCTAButton {...props} position="comparison" funnelStage="decision" />
);

export const FooterCTA: React.FC<Omit<EnhancedCTAButtonProps, 'position' | 'size'>> = (props) => (
  <EnhancedCTAButton {...props} position="footer" size="sm" />
);

export default EnhancedCTAButton;