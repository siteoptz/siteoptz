// components/dashboard/GrafanaDashboard.jsx
import React, { useState, useEffect } from 'react';

export default function GrafanaDashboard({ 
  dashboardId, 
  height = '800px',
  theme = 'dark',
  refresh = '5m',
  className = '',
  showToolbar = false
}) {
  const [iframeUrl, setIframeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!dashboardId) {
      setError('Dashboard ID is required');
      setLoading(false);
      return;
    }

    const grafanaUrl = process.env.NEXT_PUBLIC_GRAFANA_URL || 'http://localhost:3000';
    const params = new URLSearchParams({
      kiosk: showToolbar ? '0' : '1',
      theme: theme,
      refresh: refresh
    });

    const url = `${grafanaUrl}/d/${dashboardId}?${params.toString()}`;
    setIframeUrl(url);
    setLoading(false);
  }, [dashboardId, theme, refresh, showToolbar]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setError('Failed to load dashboard');
    setLoading(false);
  };

  if (error) {
    return (
      <div className="bg-black border border-gray-800 rounded-lg p-8 text-center">
        <div className="text-red-400 mb-2">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-black border border-gray-800 rounded-lg overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
            <p className="text-gray-300">Loading dashboard...</p>
          </div>
        </div>
      )}
      
      <iframe
        src={iframeUrl}
        width="100%"
        height={height}
        frameBorder="0"
        className="rounded-lg"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        title={`Grafana Dashboard ${dashboardId}`}
        allow="fullscreen"
        style={{ 
          backgroundColor: '#000',
          minHeight: height 
        }}
      />
    </div>
  );
}