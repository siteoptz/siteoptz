// Branding Service for White-Label Dashboard Customization
export class BrandingService {
  // Apply SiteOptz branding theme
  static applySiteOptzBranding() {
    return {
      // Color scheme
      primaryColor: '#3B82F6',      // SiteOptz blue
      secondaryColor: '#1F2937',    // Dark gray
      accentColor: '#10B981',       // Green
      warningColor: '#F59E0B',      // Amber
      errorColor: '#EF4444',        // Red
      successColor: '#10B981',      // Green
      
      // Typography
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      headingFontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem'
      },
      
      // Logo and branding assets
      logoUrl: '/images/siteoptz-logo.png',
      logoAltText: 'SiteOptz Analytics',
      faviconUrl: '/images/favicon.ico',
      brandName: 'SiteOptz',
      
      // Custom CSS for dashboard components
      customCSS: `
        /* Dashboard container styles */
        .powerbi-container {
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          background: linear-gradient(to bottom right, #000000, #111827, #000000);
          border: 1px solid rgba(75, 85, 99, 0.3);
        }
        
        /* Header styles */
        .powerbi-header {
          background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px 12px 0 0;
          font-weight: 600;
        }
        
        /* Widget/Card styles */
        .dashboard-widget {
          background: rgba(17, 24, 39, 0.5);
          border: 1px solid rgba(75, 85, 99, 0.3);
          border-radius: 8px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .dashboard-widget:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
        }
        
        /* Chart styles */
        .chart-container {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 1rem;
        }
        
        /* Button styles */
        .primary-button {
          background: linear-gradient(to right, #3B82F6, #8B5CF6);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .primary-button:hover {
          background: linear-gradient(to right, #2563EB, #7C3AED);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        /* Navigation styles */
        .nav-item {
          color: rgba(255, 255, 255, 0.7);
          padding: 0.75rem 1rem;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        
        .nav-item:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #3B82F6;
        }
        
        .nav-item.active {
          background: linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
          color: white;
          border-left: 3px solid #3B82F6;
        }
        
        /* Table styles */
        .data-table {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          overflow: hidden;
        }
        
        .data-table th {
          background: linear-gradient(to right, #1F2937, #111827);
          color: #3B82F6;
          font-weight: 600;
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(75, 85, 99, 0.3);
        }
        
        .data-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(75, 85, 99, 0.2);
          color: rgba(255, 255, 255, 0.9);
        }
        
        .data-table tr:hover {
          background: rgba(59, 130, 246, 0.05);
        }
        
        /* Metric card styles */
        .metric-card {
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 0.8));
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        
        .metric-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(to right, #3B82F6, #8B5CF6);
        }
        
        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin: 0.5rem 0;
        }
        
        .metric-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .metric-change {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          margin-top: 0.5rem;
        }
        
        .metric-change.positive {
          background: rgba(16, 185, 129, 0.1);
          color: #10B981;
        }
        
        .metric-change.negative {
          background: rgba(239, 68, 68, 0.1);
          color: #EF4444;
        }
        
        /* Loading state */
        .loading-skeleton {
          background: linear-gradient(90deg, rgba(75, 85, 99, 0.2) 0%, rgba(75, 85, 99, 0.3) 50%, rgba(75, 85, 99, 0.2) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
          border-radius: 6px;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* Scrollbar styles */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3B82F6, #8B5CF6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563EB, #7C3AED);
        }
      `,
      
      // Power BI specific theme configuration
      powerBITheme: {
        name: 'SiteOptz Premium',
        dataColors: [
          '#3B82F6', // Primary blue
          '#10B981', // Success green
          '#F59E0B', // Warning amber
          '#EF4444', // Error red
          '#8B5CF6', // Purple
          '#EC4899', // Pink
          '#14B8A6', // Teal
          '#F97316', // Orange
          '#06B6D4', // Cyan
          '#84CC16'  // Lime
        ],
        background: '#000000',
        foreground: '#FFFFFF',
        tableAccent: '#3B82F6',
        good: '#10B981',
        neutral: '#F59E0B',
        bad: '#EF4444',
        maximum: '#3B82F6',
        center: '#F59E0B',
        minimum: '#EF4444',
        null: '#374151'
      }
    };
  }
  
  // Apply custom client branding
  static applyCustomBranding(clientConfig) {
    const defaultBranding = this.applySiteOptzBranding();
    
    return {
      ...defaultBranding,
      ...clientConfig,
      customCSS: `
        ${defaultBranding.customCSS}
        ${clientConfig.customCSS || ''}
      `,
      powerBITheme: {
        ...defaultBranding.powerBITheme,
        ...(clientConfig.powerBITheme || {})
      }
    };
  }
  
  // Get branding for specific plan tier
  static getBrandingByPlan(planType) {
    const baseBranding = this.applySiteOptzBranding();
    
    switch (planType) {
      case 'enterprise':
        return {
          ...baseBranding,
          features: {
            customLogo: true,
            customColors: true,
            customFonts: true,
            customDomain: true,
            removeWatermark: true,
            customCSS: true,
            customLayouts: true,
            whiteLabel: true
          }
        };
        
      case 'premium':
        return {
          ...baseBranding,
          features: {
            customLogo: true,
            customColors: true,
            customFonts: false,
            customDomain: false,
            removeWatermark: true,
            customCSS: false,
            customLayouts: false,
            whiteLabel: false
          }
        };
        
      case 'pro':
      default:
        return {
          ...baseBranding,
          features: {
            customLogo: false,
            customColors: false,
            customFonts: false,
            customDomain: false,
            removeWatermark: false,
            customCSS: false,
            customLayouts: false,
            whiteLabel: false
          }
        };
    }
  }
  
  // Generate CSS variables for theming
  static generateCSSVariables(branding) {
    return `
      :root {
        --primary-color: ${branding.primaryColor};
        --secondary-color: ${branding.secondaryColor};
        --accent-color: ${branding.accentColor};
        --warning-color: ${branding.warningColor};
        --error-color: ${branding.errorColor};
        --success-color: ${branding.successColor};
        --font-family: ${branding.fontFamily};
        --heading-font-family: ${branding.headingFontFamily};
      }
    `;
  }
  
  // Export branding configuration
  static exportBrandingConfig(branding) {
    return JSON.stringify(branding, null, 2);
  }
  
  // Import branding configuration
  static importBrandingConfig(configString) {
    try {
      const config = JSON.parse(configString);
      return this.applyCustomBranding(config);
    } catch (error) {
      console.error('Invalid branding configuration:', error);
      return this.applySiteOptzBranding();
    }
  }
}

export default BrandingService;