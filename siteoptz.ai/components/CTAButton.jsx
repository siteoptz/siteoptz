import { useState } from 'react';

/**
 * Standardized CTA button component with tracking and customization
 * @param {Object} props - Component props
 * @returns {JSX.Element} CTA button component
 */
export default function CTAButton({
  href,
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  external = false,
  trackingEvent,
  trackingData = {},
  className = '',
  icon,
  iconPosition = 'right',
  ...props
}) {
  const [isClicked, setIsClicked] = useState(false);

  // Handle click with tracking
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    // Track the event if tracking is enabled
    if (trackingEvent && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', trackingEvent, {
        event_category: 'CTA',
        event_label: children,
        ...trackingData
      });
    }

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);

    if (onClick) {
      onClick(e);
    }
  };

  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${isClicked ? 'transform scale-95' : 'transform scale-100'}
    ${fullWidth ? 'w-full' : ''}
  `;

  // Variant styles
  const variantStyles = {
    primary: `
      bg-blue-600 text-white border border-blue-600
      hover:bg-blue-700 hover:border-blue-700
      focus:ring-blue-500
      shadow-md hover:shadow-lg
    `,
    secondary: `
      bg-white text-blue-600 border border-blue-600
      hover:bg-blue-50
      focus:ring-blue-500
      shadow-md hover:shadow-lg
    `,
    outline: `
      bg-transparent text-gray-700 border border-gray-300
      hover:bg-gray-50 hover:border-gray-400
      focus:ring-gray-500
    `,
    ghost: `
      bg-transparent text-gray-700 border-transparent
      hover:bg-gray-100
      focus:ring-gray-500
    `,
    success: `
      bg-green-600 text-white border border-green-600
      hover:bg-green-700 hover:border-green-700
      focus:ring-green-500
      shadow-md hover:shadow-lg
    `,
    warning: `
      bg-orange-600 text-white border border-orange-600
      hover:bg-orange-700 hover:border-orange-700
      focus:ring-orange-500
      shadow-md hover:shadow-lg
    `,
    danger: `
      bg-red-600 text-white border border-red-600
      hover:bg-red-700 hover:border-red-700
      focus:ring-red-500
      shadow-md hover:shadow-lg
    `
  };

  // Size styles
  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  // Combine all styles
  const finalClassName = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.medium}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Loading spinner
  const LoadingSpinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // External link icon
  const ExternalIcon = () => (
    <svg 
      className="w-4 h-4" 
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
  );

  // Render button content
  const renderContent = () => (
    <>
      {loading && <LoadingSpinner />}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
      {external && !icon && !loading && (
        <span className="ml-2"><ExternalIcon /></span>
      )}
    </>
  );

  // Render as link or button
  if (href && !disabled && !loading) {
    return (
      <a
        href={href}
        className={finalClassName}
        onClick={handleClick}
        target={external ? '_blank' : '_self'}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={finalClassName}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
}

/**
 * Specialized CTA buttons for common use cases
 */

// Try Now button for tool trials
export function TryNowButton({ tool, size = 'medium', fullWidth = false, className = '' }) {
  return (
    <CTAButton
      href={tool.affiliateLink || tool.website}
      variant="primary"
      size={size}
      fullWidth={fullWidth}
      external
      trackingEvent="try_now_click"
      trackingData={{ 
        tool_name: tool.name,
        source: 'comparison_page'
      }}
      className={className}
    >
      Try {tool.name} Free
    </CTAButton>
  );
}

// Learn More button
export function LearnMoreButton({ tool, size = 'medium', variant = 'secondary', className = '' }) {
  return (
    <CTAButton
      href={tool.website}
      variant={variant}
      size={size}
      external
      trackingEvent="learn_more_click"
      trackingData={{ 
        tool_name: tool.name,
        source: 'comparison_page'
      }}
      className={className}
    >
      Learn More
    </CTAButton>
  );
}

// Contact Sales button
export function ContactSalesButton({ tool, size = 'medium', variant = 'outline', className = '' }) {
  const contactUrl = `${tool.website}/contact`;
  
  return (
    <CTAButton
      href={contactUrl}
      variant={variant}
      size={size}
      external
      trackingEvent="contact_sales_click"
      trackingData={{ 
        tool_name: tool.name,
        source: 'pricing_calculator'
      }}
      className={className}
    >
      Contact Sales
    </CTAButton>
  );
}

// Get Free Report button for email capture
export function FreeReportButton({ tools, onClick, size = 'large', className = '' }) {
  const toolNames = tools.map(t => t.name).join(' vs ');
  
  return (
    <CTAButton
      variant="success"
      size={size}
      onClick={onClick}
      trackingEvent="free_report_request"
      trackingData={{ 
        tools: toolNames,
        tool_count: tools.length
      }}
      className={className}
      icon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      }
    >
      Get Free Comparison Report
    </CTAButton>
  );
}

// Compare Tools button
export function CompareToolsButton({ size = 'medium', className = '' }) {
  return (
    <CTAButton
      href="/compare"
      variant="outline"
      size={size}
      trackingEvent="compare_tools_click"
      trackingData={{ source: 'hero_section' }}
      className={className}
      icon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      }
    >
      Compare All Tools
    </CTAButton>
  );
}