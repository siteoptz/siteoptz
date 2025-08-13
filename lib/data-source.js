// Data Source Layer - Supports JSON, Database, and CMS Collections
import fs from 'fs';
import path from 'path';

// Configuration
const DATA_SOURCES = {
  JSON: 'json',
  DATABASE: 'database', 
  CMS: 'cms'
};

const CONFIG = {
  dataSource: process.env.DATA_SOURCE || DATA_SOURCES.JSON,
  jsonPath: process.env.JSON_DATA_PATH || './data/tool_data.json',
  databaseUrl: process.env.DATABASE_URL,
  cmsApiKey: process.env.CMS_API_KEY,
  cmsEndpoint: process.env.CMS_ENDPOINT
};

class DataSource {
  constructor() {
    this.source = CONFIG.dataSource;
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  // Get all tools
  async getAllTools() {
    const cacheKey = 'all_tools';
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    let tools = [];
    
    switch (this.source) {
      case DATA_SOURCES.JSON:
        tools = await this.getFromJSON();
        break;
      case DATA_SOURCES.DATABASE:
        tools = await this.getFromDatabase();
        break;
      case DATA_SOURCES.CMS:
        tools = await this.getFromCMS();
        break;
      default:
        throw new Error(`Unsupported data source: ${this.source}`);
    }

    this.setCache(cacheKey, tools);
    return tools;
  }

  // Get single tool by slug/ID
  async getToolBySlug(slug) {
    const cacheKey = `tool_${slug}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const tools = await this.getAllTools();
    const tool = tools.find(t => this.getToolSlug(t) === slug);
    
    if (tool) {
      this.setCache(cacheKey, tool);
    }
    
    return tool;
  }

  // Get tools by category/keyword
  async getToolsByCategory(category) {
    const tools = await this.getAllTools();
    return tools.filter(tool => 
      tool.target_keywords?.some(keyword => 
        keyword.toLowerCase().includes(category.toLowerCase())
      )
    );
  }

  // Search tools
  async searchTools(query) {
    const tools = await this.getAllTools();
    const searchTerm = query.toLowerCase();
    
    return tools.filter(tool => 
      tool.tool_name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.key_features?.some(feature => 
        feature.toLowerCase().includes(searchTerm)
      ) ||
      tool.target_keywords?.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      )
    );
  }

  // Add new tool
  async addTool(toolData) {
    switch (this.source) {
      case DATA_SOURCES.JSON:
        return await this.addToJSON(toolData);
      case DATA_SOURCES.DATABASE:
        return await this.addToDatabase(toolData);
      case DATA_SOURCES.CMS:
        return await this.addToCMS(toolData);
      default:
        throw new Error(`Unsupported data source: ${this.source}`);
    }
  }

  // Update existing tool
  async updateTool(slug, toolData) {
    switch (this.source) {
      case DATA_SOURCES.JSON:
        return await this.updateInJSON(slug, toolData);
      case DATA_SOURCES.DATABASE:
        return await this.updateInDatabase(slug, toolData);
      case DATA_SOURCES.CMS:
        return await this.updateInCMS(slug, toolData);
      default:
        throw new Error(`Unsupported data source: ${this.source}`);
    }
  }

  // Delete tool
  async deleteTool(slug) {
    switch (this.source) {
      case DATA_SOURCES.JSON:
        return await this.deleteFromJSON(slug);
      case DATA_SOURCES.DATABASE:
        return await this.deleteFromDatabase(slug);
      case DATA_SOURCES.CMS:
        return await this.deleteFromCMS(slug);
      default:
        throw new Error(`Unsupported data source: ${this.source}`);
    }
  }

  // JSON Data Source Methods
  async getFromJSON() {
    try {
      const filePath = path.resolve(process.cwd(), CONFIG.jsonPath);
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading JSON data:', error);
      return [];
    }
  }

  async addToJSON(toolData) {
    try {
      const tools = await this.getFromJSON();
      const newTool = {
        ...toolData,
        id: this.generateId(),
        created_at: new Date().toISOString()
      };
      tools.push(newTool);
      await this.saveToJSON(tools);
      return newTool;
    } catch (error) {
      console.error('Error adding tool to JSON:', error);
      throw error;
    }
  }

  async updateInJSON(slug, toolData) {
    try {
      const tools = await this.getFromJSON();
      const index = tools.findIndex(t => this.getToolSlug(t) === slug);
      if (index === -1) throw new Error('Tool not found');
      
      tools[index] = {
        ...tools[index],
        ...toolData,
        updated_at: new Date().toISOString()
      };
      await this.saveToJSON(tools);
      return tools[index];
    } catch (error) {
      console.error('Error updating tool in JSON:', error);
      throw error;
    }
  }

  async deleteFromJSON(slug) {
    try {
      const tools = await this.getFromJSON();
      const filteredTools = tools.filter(t => this.getToolSlug(t) !== slug);
      await this.saveToJSON(filteredTools);
      return true;
    } catch (error) {
      console.error('Error deleting tool from JSON:', error);
      throw error;
    }
  }

  async saveToJSON(tools) {
    const filePath = path.resolve(process.cwd(), CONFIG.jsonPath);
    fs.writeFileSync(filePath, JSON.stringify(tools, null, 2));
  }

  // Database Data Source Methods (PostgreSQL example)
  async getFromDatabase() {
    // Implementation for database connection
    // This would use a library like pg, mysql2, or prisma
    console.log('Database source not implemented yet');
    return [];
  }

  async addToDatabase(toolData) {
    console.log('Database source not implemented yet');
    throw new Error('Database source not implemented');
  }

  async updateInDatabase(slug, toolData) {
    console.log('Database source not implemented yet');
    throw new Error('Database source not implemented');
  }

  async deleteFromDatabase(slug) {
    console.log('Database source not implemented yet');
    throw new Error('Database source not implemented');
  }

  // CMS Data Source Methods (Strapi, Contentful, etc.)
  async getFromCMS() {
    // Implementation for CMS API calls
    console.log('CMS source not implemented yet');
    return [];
  }

  async addToCMS(toolData) {
    console.log('CMS source not implemented yet');
    throw new Error('CMS source not implemented');
  }

  async updateInCMS(slug, toolData) {
    console.log('CMS source not implemented yet');
    throw new Error('CMS source not implemented');
  }

  async deleteFromCMS(slug) {
    console.log('CMS source not implemented yet');
    throw new Error('CMS source not implemented');
  }

  // Utility Methods
  getToolSlug(tool) {
    return tool.slug || tool.tool_name?.toLowerCase().replace(/\s+/g, '-');
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Cache Methods
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache() {
    this.cache.clear();
  }

  // Export/Import Methods
  async exportData(format = 'json') {
    const tools = await this.getAllTools();
    
    switch (format) {
      case 'json':
        return JSON.stringify(tools, null, 2);
      case 'csv':
        return this.convertToCSV(tools);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  async importData(data, format = 'json') {
    let tools = [];
    
    switch (format) {
      case 'json':
        tools = typeof data === 'string' ? JSON.parse(data) : data;
        break;
      case 'csv':
        tools = this.convertFromCSV(data);
        break;
      default:
        throw new Error(`Unsupported import format: ${format}`);
    }

    // Validate and save
    for (const tool of tools) {
      await this.addTool(tool);
    }
    
    return tools.length;
  }

  convertToCSV(tools) {
    if (tools.length === 0) return '';
    
    const headers = Object.keys(tools[0]);
    const csvRows = [
      headers.join(','),
      ...tools.map(tool => 
        headers.map(header => {
          const value = tool[header];
          if (Array.isArray(value)) {
            return `"${value.join('; ')}"`;
          }
          return `"${value || ''}"`;
        }).join(',')
      )
    ];
    
    return csvRows.join('\n');
  }

  convertFromCSV(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.replace(/"/g, ''));
      const tool = {};
      
      headers.forEach((header, index) => {
        const value = values[index];
        if (value && value.includes('; ')) {
          tool[header] = value.split('; ');
        } else {
          tool[header] = value;
        }
      });
      
      return tool;
    });
  }
}

// Create singleton instance
const dataSource = new DataSource();

export default dataSource;
export { DATA_SOURCES, CONFIG };
