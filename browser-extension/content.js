/**
 * SiteOptz Browser Extension - Content Script
 */

class SiteOptzContentScript {
  constructor() {
    this.isInitialized = false;
    this.suggestions = [];
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    this.isInitialized = true;
    
    // Listen for messages from popup/background
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'get_page_context') {
        this.getPageContext(sendResponse);
        return true;
      }
    });

    // Auto-detect potential AI tool needs on page
    this.detectAIToolNeeds();
  }

  getPageContext(sendResponse) {
    const context = {
      url: window.location.href,
      title: document.title,
      description: this.getMetaDescription(),
      keywords: this.extractPageKeywords(),
      domain: window.location.hostname
    };

    sendResponse({ success: true, context });
  }

  getMetaDescription() {
    const metaDescription = document.querySelector('meta[name="description"]');
    return metaDescription ? metaDescription.getAttribute('content') : '';
  }

  extractPageKeywords() {
    const keywords = new Set();
    const text = document.body.innerText.toLowerCase();
    
    // Common AI/tech keywords to look for
    const aiKeywords = [
      'artificial intelligence', 'ai', 'machine learning', 'ml',
      'automation', 'chatbot', 'analytics', 'data analysis',
      'content creation', 'writing', 'design', 'video editing',
      'seo', 'marketing', 'social media', 'productivity',
      'coding', 'programming', 'development', 'api',
      'workflow', 'business', 'startup', 'saas'
    ];

    aiKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        keywords.add(keyword);
      }
    });

    return Array.from(keywords);
  }

  detectAIToolNeeds() {
    // Detect forms that might benefit from AI tools
    this.detectForms();
    
    // Detect content areas that might benefit from AI writing
    this.detectContentAreas();
    
    // Detect developer tools usage
    this.detectDeveloperContext();
  }

  detectForms() {
    const forms = document.querySelectorAll('form');
    const textareas = document.querySelectorAll('textarea');
    const contentEditables = document.querySelectorAll('[contenteditable="true"]');

    if (forms.length > 0 || textareas.length > 0 || contentEditables.length > 0) {
      // Page has forms/text inputs - might benefit from AI writing tools
      this.addSuggestionToast('writing', 'AI writing tools could help you create better content here!');
    }
  }

  detectContentAreas() {
    // Look for common CMS indicators
    const cmsIndicators = [
      'wordpress', 'wix', 'squarespace', 'webflow', 'ghost',
      'medium', 'substack', 'notion', 'confluence'
    ];

    const url = window.location.href.toLowerCase();
    const hasContentEditor = document.querySelector('.editor, .rich-text, .wysiwyg, [data-editor]');

    if (cmsIndicators.some(cms => url.includes(cms)) || hasContentEditor) {
      this.addSuggestionToast('content-creation', 'Discover AI tools to enhance your content creation workflow!');
    }
  }

  detectDeveloperContext() {
    // Check for developer tools/websites
    const devSites = ['github.com', 'gitlab.com', 'bitbucket.org', 'stackoverflow.com', 'codepen.io'];
    const url = window.location.href.toLowerCase();
    const hasCode = document.querySelector('code, pre, .code, .highlight');

    if (devSites.some(site => url.includes(site)) || hasCode) {
      this.addSuggestionToast('developer-tools', 'Check out AI coding assistants and developer tools!');
    }
  }

  addSuggestionToast(category, message) {
    // Only show one toast per page load
    if (document.querySelector('.siteoptz-suggestion-toast')) return;

    const toast = document.createElement('div');
    toast.className = 'siteoptz-suggestion-toast';
    toast.innerHTML = `
      <div class="siteoptz-toast-content">
        <div class="siteoptz-toast-icon">🤖</div>
        <div class="siteoptz-toast-text">
          <strong>SiteOptz AI Tools</strong><br>
          ${message}
        </div>
        <div class="siteoptz-toast-actions">
          <button class="siteoptz-toast-btn siteoptz-toast-explore" data-category="${category}">Explore</button>
          <button class="siteoptz-toast-btn siteoptz-toast-close">×</button>
        </div>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .siteoptz-suggestion-toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        max-width: 320px;
        animation: siteoptzSlideIn 0.3s ease-out;
      }
      .siteoptz-toast-content {
        display: flex;
        align-items: flex-start;
        padding: 12px;
      }
      .siteoptz-toast-icon {
        font-size: 20px;
        margin-right: 8px;
        margin-top: 2px;
      }
      .siteoptz-toast-text {
        flex: 1;
        line-height: 1.4;
        color: #374151;
      }
      .siteoptz-toast-text strong {
        color: #111827;
      }
      .siteoptz-toast-actions {
        display: flex;
        gap: 4px;
        margin-left: 8px;
      }
      .siteoptz-toast-btn {
        background: none;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .siteoptz-toast-explore {
        background: #667eea;
        color: white;
        border-color: #667eea;
      }
      .siteoptz-toast-explore:hover {
        background: #5a67d8;
      }
      .siteoptz-toast-close {
        color: #6b7280;
        font-size: 16px;
        line-height: 1;
        padding: 4px 6px;
      }
      .siteoptz-toast-close:hover {
        background: #f3f4f6;
      }
      @keyframes siteoptzSlideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    // Add event listeners
    toast.addEventListener('click', (e) => {
      if (e.target.classList.contains('siteoptz-toast-explore')) {
        const category = e.target.dataset.category;
        window.open(`https://siteoptz.ai/tools?category=${category}&utm_source=extension&utm_medium=content_suggestion`, '_blank');
        toast.remove();
      } else if (e.target.classList.contains('siteoptz-toast-close')) {
        toast.remove();
      }
    });

    document.body.appendChild(toast);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 10000);
  }
}

// Initialize content script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SiteOptzContentScript();
  });
} else {
  new SiteOptzContentScript();
}