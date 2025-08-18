import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

interface ExternalLinkProps {
  href: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

/**
 * External Link Component with SEO optimizations
 * Automatically adds proper rel attributes and external link indicators
 */
const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  title,
  description,
  children,
  showIcon = true,
  className = ''
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      title={description || title}
      aria-label={`External link to ${title}`}
      className={`inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors ${className}`}
    >
      {children}
      {showIcon && (
        <ExternalLinkIcon className="w-4 h-4 ml-1 flex-shrink-0" aria-hidden="true" />
      )}
    </a>
  );
};

export default ExternalLink;