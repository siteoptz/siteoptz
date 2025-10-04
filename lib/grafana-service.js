// lib/grafana-service.js
export class GrafanaService {
  constructor(apiKey, grafanaUrl = 'http://localhost:3000') {
    this.apiKey = apiKey;
    this.grafanaUrl = grafanaUrl;
  }

  async applySiteOptzBranding() {
    const brandingConfig = {
      logo: 'https://siteoptz.ai/images/logo.png',
      favicon: 'https://siteoptz.ai/images/favicon.ico',
      appTitle: 'SiteOptz Analytics',
      colors: {
        primary: '#3B82F6',
        secondary: '#1F2937',
        accent: '#10B981'
      },
      theme: {
        name: 'SiteOptz Dark',
        colors: {
          background: '#000000',
          cardBackground: '#111111',
          border: '#1F2937',
          text: '#FFFFFF',
          textSecondary: '#9CA3AF'
        }
      }
    };

    try {
      const response = await fetch(`${this.grafanaUrl}/api/org/preferences`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(brandingConfig)
      });

      if (!response.ok) {
        throw new Error(`Failed to apply branding: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error applying SiteOptz branding:', error);
      throw error;
    }
  }

  async createDashboard(dashboardConfig) {
    try {
      const response = await fetch(`${this.grafanaUrl}/api/dashboards/db`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dashboard: dashboardConfig,
          overwrite: false
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create dashboard: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating dashboard:', error);
      throw error;
    }
  }

  async getDashboard(dashboardId) {
    try {
      const response = await fetch(`${this.grafanaUrl}/api/dashboards/uid/${dashboardId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get dashboard: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      throw error;
    }
  }

  getEmbedUrl(dashboardId, options = {}) {
    const params = new URLSearchParams({
      kiosk: '1',
      theme: options.theme || 'dark',
      refresh: options.refresh || '5m',
      ...options.params
    });

    return `${this.grafanaUrl}/d/${dashboardId}?${params.toString()}`;
  }
}

export default GrafanaService;