/**
 * SiteOptz AI Tools Widget
 * Embeddable JavaScript widget for displaying AI tools data
 * Version: 1.0.0
 */

(function() {
  'use strict';

  const SITEOPTZ_API_BASE = 'https://siteoptz.ai/api/v1';
  const WIDGET_VERSION = '1.0.0';

  // Default configuration
  const DEFAULT_CONFIG = {
    apiBase: SITEOPTZ_API_BASE,
    theme: 'light',
    limit: 12,
    category: null,
    search: null,
    showLogo: true,
    showPricing: true,
    showRating: true,
    showDescription: true,
    columns: 'auto', // auto, 1, 2, 3, 4
    linkTarget: '_blank'
  };

  // CSS styles for the widget
  const WIDGET_STYLES = `
    .siteoptz-widget {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #374151;
    }
    .siteoptz-widget * {
      box-sizing: border-box;
    }
    .siteoptz-widget-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      color: #6B7280;
    }
    .siteoptz-widget-spinner {
      border: 2px solid #E5E7EB;
      border-radius: 50%;
      border-top: 2px solid #3B82F6;
      width: 20px;
      height: 20px;
      animation: siteoptz-spin 1s linear infinite;
      margin-right: 8px;
    }
    @keyframes siteoptz-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .siteoptz-widget-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    .siteoptz-widget-grid.columns-1 { grid-template-columns: 1fr; }
    .siteoptz-widget-grid.columns-2 { grid-template-columns: repeat(2, 1fr); }
    .siteoptz-widget-grid.columns-3 { grid-template-columns: repeat(3, 1fr); }
    .siteoptz-widget-grid.columns-4 { grid-template-columns: repeat(4, 1fr); }
    .siteoptz-widget-card {
      background: white;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 1rem;
      transition: box-shadow 0.2s ease;
      text-decoration: none;
      color: inherit;
      display: block;
    }
    .siteoptz-widget-card:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .siteoptz-widget-header {
      display: flex;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .siteoptz-widget-logo {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      margin-right: 0.75rem;
      background: #F3F4F6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #6B7280;
      font-size: 12px;
    }
    .siteoptz-widget-logo img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      object-fit: cover;
    }
    .siteoptz-widget-name {
      font-weight: 600;
      font-size: 16px;
      color: #111827;
      margin: 0;
    }
    .siteoptz-widget-category {
      background: #EEF2FF;
      color: #3730A3;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
      margin-left: auto;
      font-weight: 500;
    }
    .siteoptz-widget-description {
      color: #6B7280;
      font-size: 13px;
      margin: 0.5rem 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .siteoptz-widget-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.75rem;
      font-size: 12px;
    }
    .siteoptz-widget-rating {
      display: flex;
      align-items: center;
      color: #F59E0B;
    }
    .siteoptz-widget-rating-value {
      margin-left: 0.25rem;
      color: #6B7280;
    }
    .siteoptz-widget-pricing {
      color: #059669;
      font-weight: 600;
    }
    .siteoptz-widget-error {
      padding: 1rem;
      background: #FEE2E2;
      border: 1px solid #FECACA;
      border-radius: 8px;
      color: #DC2626;
    }
    .siteoptz-widget-powered {
      text-align: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #E5E7EB;
      font-size: 11px;
      color: #9CA3AF;
    }
    .siteoptz-widget-powered a {
      color: #3B82F6;
      text-decoration: none;
    }
    .siteoptz-widget-search {
      margin-bottom: 1rem;
    }
    .siteoptz-widget-search input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid #D1D5DB;
      border-radius: 6px;
      font-size: 14px;
    }
    .siteoptz-widget-search input:focus {
      outline: none;
      border-color: #3B82F6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    /* Dark theme */
    .siteoptz-widget.theme-dark {
      background: #111827;
      color: #F9FAFB;
    }
    .siteoptz-widget.theme-dark .siteoptz-widget-card {
      background: #1F2937;
      border-color: #374151;
    }
    .siteoptz-widget.theme-dark .siteoptz-widget-name {
      color: #F9FAFB;
    }
    .siteoptz-widget.theme-dark .siteoptz-widget-description {
      color: #D1D5DB;
    }
    .siteoptz-widget.theme-dark .siteoptz-widget-powered {
      border-color: #374151;
      color: #9CA3AF;
    }
    .siteoptz-widget.theme-dark .siteoptz-widget-search input {
      background: #374151;
      border-color: #4B5563;
      color: #F9FAFB;
    }
  `;

  class SiteOptzWidget {
    constructor(containerId, config = {}) {
      this.containerId = containerId;
      this.config = { ...DEFAULT_CONFIG, ...config };
      this.container = document.getElementById(containerId);
      this.currentSearch = '';
      
      if (!this.container) {
        console.error(`SiteOptz Widget: Container with id "${containerId}" not found`);
        return;
      }

      this.init();
    }

    async init() {
      this.injectStyles();
      this.render();
      await this.loadData();
    }

    injectStyles() {
      if (document.getElementById('siteoptz-widget-styles')) return;
      
      const style = document.createElement('style');
      style.id = 'siteoptz-widget-styles';
      style.textContent = WIDGET_STYLES;
      document.head.appendChild(style);
    }

    render() {
      this.container.className = `siteoptz-widget theme-${this.config.theme}`;
      this.container.innerHTML = `
        ${this.config.search !== false ? this.renderSearch() : ''}
        <div class="siteoptz-widget-content">
          ${this.renderLoading()}
        </div>
        <div class="siteoptz-widget-powered">
          Powered by <a href="https://siteoptz.ai" target="_blank">SiteOptz.ai</a>
        </div>
      `;

      if (this.config.search !== false) {
        const searchInput = this.container.querySelector('.siteoptz-widget-search input');
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            this.currentSearch = e.target.value;
            this.loadData();
          }, 300);
        });
      }
    }

    renderSearch() {
      return `
        <div class="siteoptz-widget-search">
          <input type="text" placeholder="Search AI tools..." />
        </div>
      `;
    }

    renderLoading() {
      return `
        <div class="siteoptz-widget-loading">
          <div class="siteoptz-widget-spinner"></div>
          Loading AI tools...
        </div>
      `;
    }

    renderError(message) {
      return `
        <div class="siteoptz-widget-error">
          <strong>Error:</strong> ${message}
        </div>
      `;
    }

    async loadData() {
      const content = this.container.querySelector('.siteoptz-widget-content');
      content.innerHTML = this.renderLoading();

      try {
        const params = new URLSearchParams();
        
        if (this.config.limit) params.append('limit', this.config.limit);
        if (this.config.category) params.append('category', this.config.category);
        if (this.currentSearch) params.append('search', this.currentSearch);
        if (this.config.sort) params.append('sort', this.config.sort);
        
        const response = await fetch(`${this.config.apiBase}/tools?${params}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'API request failed');
        }

        content.innerHTML = this.renderTools(data.data);
        
      } catch (error) {
        console.error('SiteOptz Widget Error:', error);
        content.innerHTML = this.renderError('Failed to load AI tools. Please try again later.');
      }
    }

    renderTools(tools) {
      if (!tools || tools.length === 0) {
        return `
          <div style="text-align: center; padding: 2rem; color: #6B7280;">
            No AI tools found for your search.
          </div>
        `;
      }

      const columnsClass = this.config.columns !== 'auto' ? `columns-${this.config.columns}` : '';
      
      return `
        <div class="siteoptz-widget-grid ${columnsClass}">
          ${tools.map(tool => this.renderTool(tool)).join('')}
        </div>
      `;
    }

    renderTool(tool) {
      const toolUrl = tool.overview?.website || tool.affiliate_link || '#';
      const logoSrc = tool.logo || '';
      const logoContent = logoSrc ? 
        `<img src="${logoSrc}" alt="${tool.name}" />` : 
        tool.name.charAt(0).toUpperCase();
      
      const rating = tool.schema?.aggregateRating?.ratingValue;
      const category = tool.overview?.category;
      const pricing = tool.pricing?.[0]?.price_per_month;

      return `
        <a href="${toolUrl}" class="siteoptz-widget-card" target="${this.config.linkTarget}">
          <div class="siteoptz-widget-header">
            ${this.config.showLogo ? `
              <div class="siteoptz-widget-logo">
                ${logoContent}
              </div>
            ` : ''}
            <h3 class="siteoptz-widget-name">${tool.name}</h3>
            ${category && this.config.category !== category ? `
              <span class="siteoptz-widget-category">${category}</span>
            ` : ''}
          </div>
          
          ${this.config.showDescription && tool.overview?.description ? `
            <p class="siteoptz-widget-description">${tool.overview.description}</p>
          ` : ''}
          
          <div class="siteoptz-widget-meta">
            ${this.config.showRating && rating ? `
              <div class="siteoptz-widget-rating">
                ★
                <span class="siteoptz-widget-rating-value">${rating}</span>
              </div>
            ` : '<div></div>'}
            
            ${this.config.showPricing && pricing !== undefined ? `
              <div class="siteoptz-widget-pricing">
                ${pricing === 0 ? 'Free' : `$${pricing}/mo`}
              </div>
            ` : ''}
          </div>
        </a>
      `;
    }
  }

  // Search Widget
  class SiteOptzSearchWidget {
    constructor(containerId, config = {}) {
      this.containerId = containerId;
      this.config = { 
        ...DEFAULT_CONFIG, 
        ...config,
        placeholder: config.placeholder || 'Search AI tools...',
        showResults: config.showResults !== false,
        maxResults: config.maxResults || 5
      };
      this.container = document.getElementById(containerId);
      this.isSearching = false;
      
      if (!this.container) {
        console.error(`SiteOptz Search Widget: Container with id "${containerId}" not found`);
        return;
      }

      this.init();
    }

    async init() {
      this.injectStyles();
      this.render();
    }

    injectStyles() {
      if (document.getElementById('siteoptz-widget-styles')) return;
      
      const style = document.createElement('style');
      style.id = 'siteoptz-widget-styles';
      style.textContent = WIDGET_STYLES + `
        .siteoptz-search-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #D1D5DB;
          border-radius: 0 0 6px 6px;
          max-height: 300px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .siteoptz-search-container {
          position: relative;
        }
        .siteoptz-search-result {
          padding: 0.75rem;
          border-bottom: 1px solid #F3F4F6;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .siteoptz-search-result:hover {
          background: #F9FAFB;
        }
        .siteoptz-search-result:last-child {
          border-bottom: none;
        }
        .siteoptz-search-result-logo {
          width: 24px;
          height: 24px;
          margin-right: 0.75rem;
          border-radius: 4px;
          background: #F3F4F6;
        }
        .siteoptz-search-result-info h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }
        .siteoptz-search-result-info p {
          margin: 0;
          font-size: 12px;
          color: #6B7280;
        }
      `;
      document.head.appendChild(style);
    }

    render() {
      this.container.className = `siteoptz-widget siteoptz-search-widget theme-${this.config.theme}`;
      this.container.innerHTML = `
        <div class="siteoptz-search-container">
          <input 
            type="text" 
            placeholder="${this.config.placeholder}"
            class="siteoptz-widget-search-input"
            style="width: 100%; padding: 0.75rem; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px;"
          />
          ${this.config.showResults ? '<div class="siteoptz-search-results" style="display: none;"></div>' : ''}
        </div>
      `;

      const input = this.container.querySelector('input');
      const results = this.container.querySelector('.siteoptz-search-results');
      let searchTimeout;

      input.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
          if (results) results.style.display = 'none';
          return;
        }

        searchTimeout = setTimeout(() => {
          this.search(query);
        }, 300);
      });

      // Handle clicks outside to close results
      document.addEventListener('click', (e) => {
        if (!this.container.contains(e.target) && results) {
          results.style.display = 'none';
        }
      });
    }

    async search(query) {
      if (!this.config.showResults) return;
      
      const results = this.container.querySelector('.siteoptz-search-results');
      if (!results) return;

      this.isSearching = true;
      results.innerHTML = '<div style="padding: 1rem; text-align: center; color: #6B7280;">Searching...</div>';
      results.style.display = 'block';

      try {
        const response = await fetch(`${this.config.apiBase}/tools?search=${encodeURIComponent(query)}&limit=${this.config.maxResults}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Search failed');
        }

        this.renderSearchResults(data.data, results);
        
      } catch (error) {
        console.error('SiteOptz Search Error:', error);
        results.innerHTML = '<div style="padding: 1rem; text-align: center; color: #DC2626;">Search failed. Please try again.</div>';
      } finally {
        this.isSearching = false;
      }
    }

    renderSearchResults(tools, container) {
      if (!tools || tools.length === 0) {
        container.innerHTML = '<div style="padding: 1rem; text-align: center; color: #6B7280;">No tools found.</div>';
        return;
      }

      container.innerHTML = tools.map(tool => {
        const toolUrl = tool.overview?.website || tool.affiliate_link || '#';
        const logoSrc = tool.logo || '';
        
        return `
          <div class="siteoptz-search-result" onclick="window.open('${toolUrl}', '${this.config.linkTarget}')">
            <div class="siteoptz-search-result-logo">
              ${logoSrc ? `<img src="${logoSrc}" alt="${tool.name}" style="width: 100%; height: 100%; border-radius: 4px; object-fit: cover;" />` : ''}
            </div>
            <div class="siteoptz-search-result-info">
              <h4>${tool.name}</h4>
              <p>${tool.overview?.description || ''}</p>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Global API
  window.SiteOptz = {
    Widget: SiteOptzWidget,
    SearchWidget: SiteOptzSearchWidget,
    version: WIDGET_VERSION
  };

  // Auto-initialize widgets with data attributes
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize tool widgets
    const widgets = document.querySelectorAll('[data-siteoptz-widget]');
    widgets.forEach(element => {
      const config = {};
      const attributes = element.attributes;
      
      for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        if (attr.name.startsWith('data-siteoptz-')) {
          const key = attr.name.replace('data-siteoptz-', '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          let value = attr.value;
          
          // Convert string values to appropriate types
          if (value === 'true') value = true;
          else if (value === 'false') value = false;
          else if (/^\d+$/.test(value)) value = parseInt(value);
          
          config[key] = value;
        }
      }
      
      new SiteOptzWidget(element.id, config);
    });

    // Initialize search widgets
    const searchWidgets = document.querySelectorAll('[data-siteoptz-search]');
    searchWidgets.forEach(element => {
      const config = {};
      const attributes = element.attributes;
      
      for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        if (attr.name.startsWith('data-siteoptz-')) {
          const key = attr.name.replace('data-siteoptz-', '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          let value = attr.value;
          
          if (value === 'true') value = true;
          else if (value === 'false') value = false;
          else if (/^\d+$/.test(value)) value = parseInt(value);
          
          config[key] = value;
        }
      }
      
      new SiteOptzSearchWidget(element.id, config);
    });
  });

})();