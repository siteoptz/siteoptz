import React, { useEffect } from 'react';

interface OptzRedirectProps {
  plan?: 'free' | 'starter' | 'pro' | 'enterprise';
  path?: string;
}

export const OptzRedirect: React.FC<OptzRedirectProps> = ({ 
  plan = 'free',
  path = ''
}) => {
  useEffect(() => {
    // Redirect to siteoptz.ai
    const baseUrl = 'https://siteoptz.ai';
    const redirectPath = path || `/dashboard/${plan}`;
    const fullUrl = `${baseUrl}${redirectPath}`;
    
    // Redirect in the same window
    window.location.href = fullUrl;
  }, [plan, path]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to dashboard...</p>
        <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
      </div>
    </div>
  );
};

export default OptzRedirect;