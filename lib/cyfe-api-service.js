/**
 * Cyfe API Service - Handles all interactions with Cyfe dashboard API
 * Provides widget management, data pushing, and SSO functionality
 */

export class CyfeAPIService {
  constructor() {
    this.apiKey = process.env.CYFE_API_KEY;
    this.baseUrl = process.env.CYFE_BASE_URL || 'https://api.cyfe.com';
    this.whiteLabelDomain = process.env.CYFE_WHITE_LABEL_DOMAIN || 'siteoptz.ai';
    this.clientId = process.env.CYFE_CLIENT_ID;
    this.ssoSecret = process.env.CYFE_SSO_SECRET;
  }

  /**
   * Get all available widgets from Cyfe
   */
  async getAllWidgets() {
    try {
      console.log('🔍 Fetching all widgets from Cyfe API...');
      
      const response = await fetch(`${this.baseUrl}/widgets`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'SiteOptz-Integration/1.0'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Failed to fetch widgets:', response.status, errorText);
        throw new Error(`Failed to fetch widgets: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ Successfully fetched ${data.length || 0} widgets`);
      return data;
    } catch (error) {
      console.error('❌ Error in getAllWidgets:', error);
      throw error;
    }
  }

  /**
   * Get specific widget data by ID
   */
  async getWidgetData(widgetId) {
    try {
      console.log(`🔍 Fetching widget data for ID: ${widgetId}`);
      
      const response = await fetch(`${this.baseUrl}/widgets/${widgetId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'SiteOptz-Integration/1.0'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Failed to fetch widget ${widgetId}:`, response.status, errorText);
        throw new Error(`Failed to fetch widget ${widgetId}: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ Successfully fetched widget data for ${widgetId}`);
      return data;
    } catch (error) {
      console.error(`❌ Error fetching widget ${widgetId}:`, error);
      throw error;
    }
  }

  /**
   * Push data to a specific widget
   */
  async pushDataToWidget(widgetId, data) {
    try {
      console.log(`📊 Pushing data to widget ${widgetId}:`, data);
      
      const response = await fetch(`${this.baseUrl}/widgets/${widgetId}/push`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'SiteOptz-Integration/1.0'
        },
        body: JSON.stringify({
          data: data,
          timestamp: new Date().toISOString(),
          source: 'siteoptz-integration'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Failed to push data to widget ${widgetId}:`, response.status, errorText);
        throw new Error(`Failed to push data to widget ${widgetId}: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`✅ Successfully pushed data to widget ${widgetId}`);
      return result;
    } catch (error) {
      console.error(`❌ Error pushing data to widget ${widgetId}:`, error);
      throw error;
    }
  }

  /**
   * Generate SSO token for authenticated user access
   */
  async generateSSOToken(userEmail, userId) {
    try {
      console.log(`🔐 Generating SSO token for user: ${userEmail}`);
      
      const response = await fetch(`${this.baseUrl}/auth/sso/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'SiteOptz-Integration/1.0'
        },
        body: JSON.stringify({
          email: userEmail,
          user_id: userId,
          domain: this.whiteLabelDomain,
          client_id: this.clientId,
          timestamp: Date.now(),
          expires_in: 3600 // 1 hour
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Failed to generate SSO token:', response.status, errorText);
        throw new Error(`Failed to generate SSO token: ${response.status} ${response.statusText}`);
      }

      const ssoData = await response.json();
      console.log(`✅ Successfully generated SSO token for ${userEmail}`);
      return ssoData;
    } catch (error) {
      console.error('❌ Error generating SSO token:', error);
      throw error;
    }
  }

  /**
   * Create a new widget in Cyfe
   */
  async createWidget(widgetConfig) {
    try {
      console.log('🆕 Creating new widget:', widgetConfig.name);
      
      const response = await fetch(`${this.baseUrl}/widgets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'SiteOptz-Integration/1.0'
        },
        body: JSON.stringify({
          ...widgetConfig,
          created_by: 'siteoptz-integration',
          domain: this.whiteLabelDomain
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Failed to create widget:', response.status, errorText);
        throw new Error(`Failed to create widget: ${response.status} ${response.statusText}`);
      }

      const widget = await response.json();
      console.log(`✅ Successfully created widget: ${widget.id}`);
      return widget;
    } catch (error) {
      console.error('❌ Error creating widget:', error);
      throw error;
    }
  }

  /**
   * Update widget configuration
   */
  async updateWidget(widgetId, updates) {
    try {
      console.log(`📝 Updating widget ${widgetId}:`, updates);
      
      const response = await fetch(`${this.baseUrl}/widgets/${widgetId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'SiteOptz-Integration/1.0'
        },
        body: JSON.stringify({
          ...updates,
          updated_by: 'siteoptz-integration',
          updated_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Failed to update widget ${widgetId}:`, response.status, errorText);
        throw new Error(`Failed to update widget ${widgetId}: ${response.status} ${response.statusText}`);
      }

      const widget = await response.json();
      console.log(`✅ Successfully updated widget ${widgetId}`);
      return widget;
    } catch (error) {
      console.error(`❌ Error updating widget ${widgetId}:`, error);
      throw error;
    }
  }

  /**
   * Get dashboard configuration for white-label domain
   */
  async getDashboardConfig() {
    try {
      console.log('🎛️ Fetching dashboard configuration...');
      
      const response = await fetch(`${this.baseUrl}/dashboard/config`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'SiteOptz-Integration/1.0',
          'X-Domain': this.whiteLabelDomain
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Failed to fetch dashboard config:', response.status, errorText);
        throw new Error(`Failed to fetch dashboard config: ${response.status} ${response.statusText}`);
      }

      const config = await response.json();
      console.log('✅ Successfully fetched dashboard configuration');
      return config;
    } catch (error) {
      console.error('❌ Error fetching dashboard config:', error);
      throw error;
    }
  }

  /**
   * Validate API connection and credentials
   */
  async validateConnection() {
    try {
      console.log('🔍 Validating Cyfe API connection...');
      
      const response = await fetch(`${this.baseUrl}/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'SiteOptz-Integration/1.0'
        }
      });

      if (!response.ok) {
        console.error('❌ API connection validation failed:', response.status);
        return false;
      }

      const validation = await response.json();
      console.log('✅ API connection validated successfully');
      return validation.valid === true;
    } catch (error) {
      console.error('❌ Error validating API connection:', error);
      return false;
    }
  }
}

// Export default instance
export const cyfeService = new CyfeAPIService();