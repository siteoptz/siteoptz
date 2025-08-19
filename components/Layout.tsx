import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Header />
      <main className={`flex-1 pt-16 lg:pt-20 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;