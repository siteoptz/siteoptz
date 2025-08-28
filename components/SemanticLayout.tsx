import React from 'react';
import Header from './SemanticHeader';
import Footer from './SemanticFooter';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Semantic HTML Layout Component
 * Uses proper HTML5 semantic elements for better accessibility and SEO
 */
const SemanticLayout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      {/* Main page container with semantic structure */}
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Header />
        
        {/* Main content area with proper semantic element and ARIA landmark */}
        <main 
          id="main-content"
          role="main"
          className={`flex-1 pt-16 lg:pt-20 ${className}`}
          tabIndex={-1}
        >
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SemanticLayout;