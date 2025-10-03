// Power BI Embedded Service for Enterprise Dashboard Integration
import { PowerBIEmbed } from 'powerbi-client';

export class PowerBIAnalyticsService {
  constructor() {
    this.clientId = process.env.POWERBI_CLIENT_ID;
    this.clientSecret = process.env.POWERBI_CLIENT_SECRET;
    this.tenantId = process.env.POWERBI_TENANT_ID;
    this.workspaceId = process.env.POWERBI_WORKSPACE_ID;
    this.apiUrl = 'https://api.powerbi.com/v1.0/myorg';
    this.authUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;
  }

  // Get access token using client credentials flow
  async getAccessToken() {
    try {
      const response = await fetch(this.authUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
          scope: 'https://analysis.windows.net/powerbi/api/.default'
        })
      });

      if (!response.ok) {
        throw new Error(`Auth failed: ${response.status}`);
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Failed to get Power BI access token:', error);
      throw error;
    }
  }

  // Generate embed token for specific report with row-level security
  async getEmbedToken(reportId, userId, userRole = 'Viewer') {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(
        `${this.apiUrl}/groups/${this.workspaceId}/reports/${reportId}/GenerateToken`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            accessLevel: 'View',
            identities: [{
              username: userId,
              roles: [userRole],
              datasets: [reportId]
            }],
            lifetimeInMinutes: 60
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Embed token generation failed: ${response.status}`);
      }

      const embedToken = await response.json();
      
      // Get report details for embed URL
      const reportResponse = await fetch(
        `${this.apiUrl}/groups/${this.workspaceId}/reports/${reportId}`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );

      const reportData = await reportResponse.json();

      return {
        token: embedToken.token,
        embedUrl: reportData.embedUrl,
        reportId: reportData.id,
        expiration: embedToken.expiration
      };
    } catch (error) {
      console.error('Failed to generate embed token:', error);
      throw error;
    }
  }

  // Get all available reports in workspace
  async getReports() {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(
        `${this.apiUrl}/groups/${this.workspaceId}/reports`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch reports: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Failed to get reports:', error);
      throw error;
    }
  }

  // Get all available dashboards
  async getDashboards() {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(
        `${this.apiUrl}/groups/${this.workspaceId}/dashboards`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch dashboards: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Failed to get dashboards:', error);
      throw error;
    }
  }

  // Push data to Power BI dataset
  async pushData(datasetId, tableName, rows) {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(
        `${this.apiUrl}/groups/${this.workspaceId}/datasets/${datasetId}/tables/${tableName}/rows`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rows })
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to push data: ${response.status}`);
      }

      return { success: true, rowsAdded: rows.length };
    } catch (error) {
      console.error('Failed to push data to Power BI:', error);
      throw error;
    }
  }

  // Create premium dashboard for pro users
  async createPremiumDashboard({ clientId, features, branding }) {
    try {
      const accessToken = await this.getAccessToken();
      
      // Get marketing performance report
      const marketingReportId = process.env.POWERBI_MARKETING_REPORT_ID;
      const embedConfig = await this.getEmbedToken(marketingReportId, clientId, 'PremiumUser');
      
      // Apply custom branding
      const brandedConfig = {
        ...embedConfig,
        settings: {
          filterPaneEnabled: features.includes('custom-filters'),
          navContentPaneEnabled: features.includes('navigation'),
          background: 'Transparent',
          customLayout: {
            displayOption: 'FitToWidth'
          },
          theme: {
            name: 'SiteOptz Premium',
            ...branding
          }
        }
      };

      return brandedConfig;
    } catch (error) {
      console.error('Failed to create premium dashboard:', error);
      throw error;
    }
  }

  // Export report as PDF/PowerPoint
  async exportReport(reportId, format = 'PDF') {
    try {
      const accessToken = await this.getAccessToken();
      
      // Start export job
      const exportResponse = await fetch(
        `${this.apiUrl}/groups/${this.workspaceId}/reports/${reportId}/ExportTo`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            format: format,
            powerBIReportConfiguration: {
              pages: 'All'
            }
          })
        }
      );

      if (!exportResponse.ok) {
        throw new Error(`Export failed: ${exportResponse.status}`);
      }

      const { id: exportId } = await exportResponse.json();
      
      // Poll for export completion
      let exportStatus = 'Running';
      let fileUrl = null;
      
      while (exportStatus === 'Running') {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        
        const statusResponse = await fetch(
          `${this.apiUrl}/groups/${this.workspaceId}/reports/${reportId}/exports/${exportId}`,
          {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          }
        );
        
        const statusData = await statusResponse.json();
        exportStatus = statusData.status;
        
        if (exportStatus === 'Succeeded') {
          fileUrl = statusData.resourceLocation;
        }
      }

      if (exportStatus === 'Failed') {
        throw new Error('Export failed');
      }

      // Download the file
      const fileResponse = await fetch(fileUrl, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      
      return fileResponse.blob();
    } catch (error) {
      console.error('Failed to export report:', error);
      throw error;
    }
  }

  // Refresh dataset
  async refreshDataset(datasetId) {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(
        `${this.apiUrl}/groups/${this.workspaceId}/datasets/${datasetId}/refreshes`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            notifyOption: 'MailOnFailure'
          })
        }
      );

      if (!response.ok && response.status !== 202) {
        throw new Error(`Refresh failed: ${response.status}`);
      }

      return { success: true, message: 'Dataset refresh initiated' };
    } catch (error) {
      console.error('Failed to refresh dataset:', error);
      throw error;
    }
  }
}

export default PowerBIAnalyticsService;