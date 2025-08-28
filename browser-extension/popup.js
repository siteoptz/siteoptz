/**
 * SiteOptz Browser Extension - Popup Script
 */

const API_BASE = 'https://siteoptz.ai/api/v1';

class SiteOptzPopup {
  constructor() {
    this.currentSearch = '';
    this.currentCategory = '';
    this.allTools = [];
    this.categories = [];
    this.isLoading = false;

    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadCategories();
    await this.loadTools();
  }

  bindEvents() {
    const searchInput = document.getElementById('searchInput');
    const categoryTags = document.getElementById('categoryTags');

    // Search functionality
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.currentSearch = e.target.value.trim();
        this.filterAndRenderTools();
      }, 300);
    });

    // Category selection
    categoryTags.addEventListener('click', (e) => {
      if (e.target.classList.contains('category-tag')) {
        // Remove active class from all tags
        categoryTags.querySelectorAll('.category-tag').forEach(tag => {
          tag.classList.remove('active');
        });
        
        // Add active class to clicked tag
        e.target.classList.add('active');
        
        // Update current category
        this.currentCategory = e.target.dataset.category || '';
        this.filterAndRenderTools();
      }
    });
  }

  async loadCategories() {
    try {
      const response = await fetch(`${API_BASE}/categories?include_count=true`);
      const data = await response.json();
      
      if (data.success) {
        this.categories = data.data;
        this.renderCategories();
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  }

  renderCategories() {
    const container = document.getElementById('categoryTags');
    const existingAll = container.querySelector('[data-category=""]');
    
    // Keep the "All" button and add others
    const categoryHTML = this.categories
      .slice(0, 8) // Limit to first 8 categories for space
      .map(category => {
        return `<div class="category-tag" data-category="${category.name}">${category.name} (${category.count})</div>`;
      })
      .join('');
    
    container.innerHTML = `
      <div class="category-tag active" data-category="">All</div>
      ${categoryHTML}
    `;
  }

  async loadTools() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.showLoading();

    try {
      const response = await fetch(`${API_BASE}/tools?limit=50&sort=rating`);
      const data = await response.json();
      
      if (data.success) {
        this.allTools = data.data;
        this.filterAndRenderTools();
      } else {
        throw new Error(data.message || 'Failed to load tools');
      }
    } catch (error) {
      console.error('Failed to load tools:', error);
      this.showError('Failed to load AI tools. Please try again later.');
    } finally {
      this.isLoading = false;
    }
  }

  filterAndRenderTools() {
    let filteredTools = [...this.allTools];

    // Filter by category
    if (this.currentCategory) {
      filteredTools = filteredTools.filter(tool => 
        tool.overview?.category === this.currentCategory
      );
    }

    // Filter by search
    if (this.currentSearch) {
      const searchTerm = this.currentSearch.toLowerCase();
      filteredTools = filteredTools.filter(tool =>
        tool.name?.toLowerCase().includes(searchTerm) ||
        tool.overview?.description?.toLowerCase().includes(searchTerm) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    this.renderTools(filteredTools);
  }

  renderTools(tools) {
    const container = document.getElementById('results');
    
    if (!tools || tools.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <p>No AI tools found for your search.</p>
          <p style="font-size: 12px; color: #9ca3af;">Try a different search term or category.</p>
        </div>
      `;
      return;
    }

    const toolsHTML = tools.map(tool => this.renderTool(tool)).join('');
    container.innerHTML = toolsHTML;
  }

  renderTool(tool) {
    const toolUrl = tool.overview?.website || tool.affiliate_link || `https://siteoptz.ai/tools/${tool.slug}`;
    const logoSrc = tool.logo || '';
    const logoContent = logoSrc ? 
      `<img src="${logoSrc}" alt="${tool.name}" />` : 
      tool.name.charAt(0).toUpperCase();
    
    const rating = tool.schema?.aggregateRating?.ratingValue;
    const category = tool.overview?.category;
    const pricing = tool.pricing?.[0]?.price_per_month;
    const description = tool.overview?.description || 'No description available.';

    return `
      <div class="tool-item" onclick="window.open('${toolUrl}', '_blank')">
        <div class="tool-header">
          <div class="tool-logo">${logoContent}</div>
          <div class="tool-name">${tool.name}</div>
          ${category ? `<div class="tool-category">${category}</div>` : ''}
        </div>
        <div class="tool-description">${description}</div>
        <div class="tool-meta">
          ${rating ? `<div class="tool-rating">★ ${rating}</div>` : '<div></div>'}
          ${pricing !== undefined ? `<div class="tool-pricing">${pricing === 0 ? 'Free' : `$${pricing}/mo`}</div>` : ''}
        </div>
      </div>
    `;
  }

  showLoading() {
    const container = document.getElementById('results');
    container.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        Loading AI tools...
      </div>
    `;
  }

  showError(message) {
    const container = document.getElementById('results');
    container.innerHTML = `
      <div class="error">
        <strong>Error:</strong> ${message}
      </div>
    `;
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SiteOptzPopup();
});

// Track usage analytics (privacy-friendly)
chrome.runtime.sendMessage({ type: 'popup_opened' });