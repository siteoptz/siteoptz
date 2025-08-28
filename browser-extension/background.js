/**
 * SiteOptz Browser Extension - Background Script
 */

// Install/Update handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings
    chrome.storage.local.set({
      installDate: Date.now(),
      version: chrome.runtime.getManifest().version,
      settings: {
        showNotifications: true,
        autoSearch: true,
        theme: 'light'
      }
    });

    // Open welcome page
    chrome.tabs.create({
      url: 'https://siteoptz.ai/tools?utm_source=extension&utm_medium=install'
    });
  }
});

// Message handler
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'popup_opened':
      // Track popup usage (privacy-friendly)
      chrome.storage.local.get(['usage'], (result) => {
        const usage = result.usage || { popupOpens: 0, lastOpened: null };
        usage.popupOpens++;
        usage.lastOpened = Date.now();
        chrome.storage.local.set({ usage });
      });
      break;

    case 'search_tools':
      handleToolSearch(message.query, sendResponse);
      return true; // Keep message channel open for async response

    case 'get_tool_suggestions':
      handleToolSuggestions(message.url, sendResponse);
      return true;

    default:
      break;
  }
});

// Context menu setup
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'searchSiteOptz',
    title: 'Search AI tools for "%s"',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    id: 'openSiteOptz',
    title: 'Open SiteOptz AI Tools',
    contexts: ['page']
  });
});

// Context menu click handler
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'searchSiteOptz':
      const searchQuery = encodeURIComponent(info.selectionText);
      chrome.tabs.create({
        url: `https://siteoptz.ai/tools?search=${searchQuery}&utm_source=extension&utm_medium=context_menu`
      });
      break;

    case 'openSiteOptz':
      chrome.tabs.create({
        url: 'https://siteoptz.ai/tools?utm_source=extension&utm_medium=context_menu'
      });
      break;
  }
});

// Tool search handler
async function handleToolSearch(query, sendResponse) {
  try {
    const response = await fetch(`https://siteoptz.ai/api/v1/tools?search=${encodeURIComponent(query)}&limit=10`);
    const data = await response.json();
    
    if (data.success) {
      sendResponse({ success: true, tools: data.data });
    } else {
      sendResponse({ success: false, error: data.message || 'Search failed' });
    }
  } catch (error) {
    console.error('Tool search error:', error);
    sendResponse({ success: false, error: 'Network error occurred' });
  }
}

// Tool suggestions based on current website
async function handleToolSuggestions(url, sendResponse) {
  try {
    // Simple keyword mapping for suggestions
    const urlKeywords = extractKeywords(url);
    let suggestions = [];

    if (urlKeywords.length > 0) {
      const query = urlKeywords.join(' ');
      const response = await fetch(`https://siteoptz.ai/api/v1/tools?search=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      
      if (data.success) {
        suggestions = data.data;
      }
    }

    sendResponse({ success: true, suggestions, keywords: urlKeywords });
  } catch (error) {
    console.error('Suggestion error:', error);
    sendResponse({ success: false, error: 'Failed to get suggestions' });
  }
}

// Extract keywords from URL for tool suggestions
function extractKeywords(url) {
  const keywords = [];
  const urlLower = url.toLowerCase();

  // Common website patterns and their related tool categories
  const patterns = {
    'github.com': ['developer-tools', 'code', 'programming'],
    'stackoverflow': ['developer-tools', 'programming'],
    'medium.com': ['writing', 'content-creation'],
    'wordpress': ['content-creation', 'website-builder'],
    'shopify': ['e-commerce', 'business'],
    'linkedin': ['business', 'productivity'],
    'twitter.com': ['social-media', 'marketing'],
    'facebook.com': ['social-media', 'marketing'],
    'instagram.com': ['social-media', 'design'],
    'youtube.com': ['video', 'content-creation'],
    'figma.com': ['design', 'ui-ux'],
    'canva.com': ['design', 'content-creation'],
    'notion': ['productivity', 'note-taking'],
    'google.com/docs': ['productivity', 'writing'],
    'trello.com': ['productivity', 'project-management'],
    'slack.com': ['productivity', 'communication'],
    'zoom': ['communication', 'video-conferencing'],
    'analytics': ['analytics', 'data'],
    'marketing': ['marketing', 'advertising'],
    'seo': ['seo', 'marketing'],
    'design': ['design', 'creative'],
    'video': ['video', 'multimedia'],
    'photo': ['image', 'photography'],
    'blog': ['writing', 'content-creation'],
    'ecommerce': ['e-commerce', 'business'],
    'crm': ['business', 'customer-management']
  };

  // Check URL against patterns
  for (const [pattern, relatedKeywords] of Object.entries(patterns)) {
    if (urlLower.includes(pattern)) {
      keywords.push(...relatedKeywords);
    }
  }

  // Remove duplicates and return
  return [...new Set(keywords)];
}

// Periodic cleanup of storage
chrome.alarms.create('cleanup', { delayInMinutes: 60, periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'cleanup') {
    chrome.storage.local.get(['usage'], (result) => {
      const usage = result.usage || {};
      const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      
      // Clean up old data if needed
      if (usage.lastOpened && usage.lastOpened < oneWeekAgo) {
        chrome.storage.local.clear();
      }
    });
  }
});