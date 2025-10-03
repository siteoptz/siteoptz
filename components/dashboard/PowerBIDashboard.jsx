// Power BI Embedded Dashboard Component for Premium Pro Plans
import React, { useEffect, useRef, useState } from 'react';
import * as pbi from 'powerbi-client';
import { useSession } from 'next-auth/react';
import { Loader2, AlertCircle, Maximize2, Download, RefreshCw } from 'lucide-react';

const PowerBIDashboard = ({ 
  reportId, 
  className = '',
  height = '600px',
  showToolbar = true,
  allowExport = true,
  theme = 'dark'
}) => {
  const reportContainerRef = useRef(null);
  const powerbiRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;

    const embedReport = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get embed token from API
        const response = await fetch('/api/powerbi/embed-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reportId })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get embed token');
        }

        const { embedToken, embedUrl } = await response.json();

        // Power BI embed configuration
        const config = {
          type: 'report',
          id: reportId,
          embedUrl,
          accessToken: embedToken,
          tokenType: pbi.models.TokenType.Embed,
          permissions: pbi.models.Permissions.All,
          settings: {
            panes: {
              filters: {
                visible: true,
                expanded: false
              },
              pageNavigation: {
                visible: true,
                position: pbi.models.PageNavigationPosition.Left
              },
              bookmarks: {
                visible: false
              }
            },
            visualRenderedEvents: true,
            filterPaneEnabled: true,
            navContentPaneEnabled: true,
            background: theme === 'dark' ? pbi.models.BackgroundType.Transparent : pbi.models.BackgroundType.Default,
            theme: {
              themeJson: {
                name: 'SiteOptz Theme',
                dataColors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'],
                background: theme === 'dark' ? '#000000' : '#FFFFFF',
                foreground: theme === 'dark' ? '#FFFFFF' : '#000000',
                tableAccent: '#3B82F6'
              }
            },
            layoutType: pbi.models.LayoutType.Custom,
            customLayout: {
              pageSize: {
                type: pbi.models.PageSizeType.Custom,
                width: 1280,
                height: 720
              },
              displayOption: pbi.models.DisplayOption.FitToWidth,
              pagesLayout: {}
            }
          }
        };

        // Get the Power BI service
        const powerbiService = new pbi.service.Service(
          pbi.factories.hpmFactory,
          pbi.factories.wpmpFactory,
          pbi.factories.routerFactory
        );

        // Clear any existing report
        if (reportContainerRef.current) {
          powerbiService.reset(reportContainerRef.current);
        }

        // Embed the report
        const report = powerbiService.embed(reportContainerRef.current, config);
        powerbiRef.current = report;

        // Handle report events
        report.off('loaded');
        report.on('loaded', () => {
          console.log('Power BI Report loaded successfully');
          setLoading(false);
        });

        report.off('rendered');
        report.on('rendered', () => {
          console.log('Power BI Report rendered');
        });

        report.off('error');
        report.on('error', (event) => {
          console.error('Power BI Report error:', event.detail);
          setError(event.detail);
          setLoading(false);
        });

        // Page change tracking
        report.off('pageChanged');
        report.on('pageChanged', (event) => {
          console.log('Page changed to:', event.detail.newPage.displayName);
        });

      } catch (err) {
        console.error('Failed to embed Power BI report:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    embedReport();

    // Cleanup
    return () => {
      if (powerbiRef.current) {
        powerbiRef.current.off('loaded');
        powerbiRef.current.off('rendered');
        powerbiRef.current.off('error');
        powerbiRef.current.off('pageChanged');
      }
    };
  }, [reportId, session, theme]);

  const handleFullscreen = () => {
    if (!isFullscreen) {
      reportContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleExport = async (format = 'PDF') => {
    try {
      if (!powerbiRef.current) return;

      const pages = await powerbiRef.current.getPages();
      const activePage = pages.find(p => p.isActive);
      
      if (activePage) {
        await powerbiRef.current.print();
      }
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handleRefresh = async () => {
    try {
      if (powerbiRef.current) {
        await powerbiRef.current.refresh();
      }
    } catch (err) {
      console.error('Refresh failed:', err);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-black border border-gray-800 rounded-lg ${className}`} style={{ height }}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
          <p className="text-gray-400">Loading Power BI Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-black border border-red-900 rounded-lg ${className}`} style={{ height }}>
        <div className="text-center p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-red-400 font-semibold mb-2">Dashboard Error</h3>
          <p className="text-gray-400 text-sm mb-4">{error}</p>
          {error.includes('Pro plan') && (
            <a 
              href="/upgrade" 
              className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Upgrade to Pro
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-black border border-gray-800 rounded-lg overflow-hidden ${className}`}>
      {showToolbar && (
        <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/images/siteoptz-logo.png" alt="SiteOptz" className="h-6" />
              <span className="text-white font-semibold">Premium Analytics Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              {allowExport && (
                <button
                  onClick={() => handleExport('PDF')}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Export"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleFullscreen}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div 
        ref={reportContainerRef} 
        className="w-full"
        style={{ height: showToolbar ? `calc(${height} - 60px)` : height }}
      />
    </div>
  );
};

export default PowerBIDashboard;