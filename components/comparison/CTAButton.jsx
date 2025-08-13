import React from 'react';
import { ArrowRight, ExternalLink, Download, Star } from 'lucide-react';

export default function CTAButton({ 
  variant = 'primary',
  size = 'default',
  href = null,
  onClick = null,
  children,
  icon = 'arrow',
  className = '',
  disabled = false,
  loading = false,
  ...props 
}) {
  const getIcon = () => {
    switch (icon) {
      case 'external':
        return <ExternalLink className="w-4 h-4" />;
      case 'download':
        return <Download className="w-4 h-4" />;
      case 'star':
        return <Star className="w-4 h-4" />;
      case 'arrow':
      default:
        return <ArrowRight className="w-4 h-4" />;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300';
      case 'outline':
        return 'bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-700';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'primary':
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-10 py-5 text-xl';
      case 'default':
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const baseClasses = 'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();

  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  if (href) {
    return (
      <a 
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`${buttonClasses} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </div>
        ) : (
          <>
            {children}
            {getIcon()}
          </>
        )}
      </a>
    );
  }

  return (
    <button
      className={`${buttonClasses} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      ) : (
        <>
          {children}
          {getIcon()}
        </>
      )}
    </button>
  );
}

// Predefined CTA button variants for common use cases
export const TryToolButton = ({ tool, className = '' }) => (
  <CTAButton
    variant="primary"
    size="lg"
    href={tool?.affiliateLink || tool?.website}
    icon="external"
    className={className}
  >
    Try {tool?.name || 'Tool'} Free
  </CTAButton>
);

export const CompareButton = ({ tool1, tool2, className = '' }) => (
  <CTAButton
    variant="outline"
    size="lg"
    href={`/compare/${tool1?.slug || tool1?.name?.toLowerCase()}-vs-${tool2?.slug || tool2?.name?.toLowerCase()}`}
    className={className}
  >
    Compare {tool1?.name} vs {tool2?.name}
  </CTAButton>
);

export const DownloadGuideButton = ({ tool, className = '' }) => (
  <CTAButton
    variant="success"
    size="lg"
    icon="download"
    className={className}
  >
    Download {tool?.name || 'AI Tools'} Guide
  </CTAButton>
);

export const ViewReviewButton = ({ tool, className = '' }) => (
  <CTAButton
    variant="secondary"
    size="default"
    href={`/reviews/${tool?.slug || tool?.name?.toLowerCase()}`}
    className={className}
  >
    Read Full Review
  </CTAButton>
);
