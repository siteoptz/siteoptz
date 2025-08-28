# SiteOptz AI Tools Browser Extension

A Chrome/Firefox browser extension that helps users discover and compare AI tools directly from their browser.

## Features

### 🔍 **Smart AI Tool Discovery**
- Search through 1000+ AI tools instantly
- Filter by categories (SEO, Writing, Design, etc.)
- Smart suggestions based on current website context

### 🎯 **Context-Aware Suggestions**
- Detects when you're on coding sites (GitHub, Stack Overflow) and suggests developer tools
- Identifies content creation areas and recommends writing/design AI tools
- Provides relevant tool suggestions based on page content

### 🚀 **Quick Access**
- Popup interface for instant tool browsing
- Right-click context menu for selected text searches
- Direct links to tools and SiteOptz platform

### 🎨 **Clean Interface**
- Modern, intuitive design
- Category filtering with tool counts
- Tool ratings and pricing information
- Responsive layout optimized for browser extension

## Installation

### Chrome Web Store (Recommended)
*Coming soon - extension will be published to Chrome Web Store*

### Manual Installation (Development)

1. **Download the Extension**
   ```bash
   git clone https://github.com/your-repo/siteoptz-extension
   cd browser-extension
   ```

2. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" and select the `browser-extension` folder

3. **Load in Firefox**
   - Open Firefox and go to `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select any file in the `browser-extension` folder

## How to Use

### 1. Browse AI Tools
- Click the SiteOptz extension icon in your browser toolbar
- Use the search box to find specific tools
- Filter by category using the category tags
- Click any tool to visit its official website

### 2. Context Menu Search
- Select any text on a webpage
- Right-click and choose "Search AI tools for [selected text]"
- Opens SiteOptz search results in a new tab

### 3. Smart Suggestions
- The extension automatically detects when you might benefit from AI tools
- Shows discrete notifications on relevant pages
- Click "Explore" to see suggested tools for your current context

## API Integration

The extension uses the SiteOptz public API:

```javascript
// Search tools
https://siteoptz.ai/api/v1/tools?search=chatbot&limit=10

// Get categories
https://siteoptz.ai/api/v1/categories?include_count=true

// Get specific tool
https://siteoptz.ai/api/v1/tools/chatgpt
```

## Development

### Project Structure
```
browser-extension/
├── manifest.json          # Extension manifest
├── popup.html             # Extension popup interface
├── popup.js              # Popup functionality
├── background.js         # Background service worker
├── content.js            # Content script for page interaction
├── icons/                # Extension icons (16, 32, 48, 128px)
└── README.md            # This file
```

### Building for Production

1. **Update Version**
   ```json
   // manifest.json
   {
     "version": "1.0.1"
   }
   ```

2. **Create ZIP for Store Submission**
   ```bash
   zip -r siteoptz-extension-v1.0.1.zip . -x "*.git*" "README.md" "*.DS_Store*"
   ```

3. **Test Thoroughly**
   - Test all functionality in both Chrome and Firefox
   - Verify API endpoints are working
   - Check responsive design in popup
   - Test context menu functionality

### Key Files Explained

#### `manifest.json`
Defines extension metadata, permissions, and configuration for Chrome Extension Manifest V3.

#### `popup.html` & `popup.js`
The main interface users see when clicking the extension icon. Includes:
- Search functionality
- Category filtering
- Tool listing with ratings/pricing
- Direct links to tools

#### `background.js`
Service worker that handles:
- Extension installation/updates
- Context menu creation
- Message passing between components
- Background API calls

#### `content.js`
Runs on all web pages to:
- Detect AI tool opportunities
- Show contextual suggestions
- Extract page information for recommendations

## Privacy & Permissions

### Required Permissions
- **activeTab**: Read current tab URL for context suggestions
- **storage**: Save user preferences and usage statistics
- **contextMenus**: Add right-click menu options

### Privacy Commitment
- No personal data collection
- No browsing history tracking
- Only anonymous usage statistics (popup opens, searches)
- All data processing happens locally

## Browser Support

- **Chrome**: Version 88+ (Manifest V3)
- **Firefox**: Version 109+ (Manifest V3)
- **Edge**: Version 88+ (Chromium-based)
- **Opera**: Version 74+ (Chromium-based)

## Troubleshooting

### Common Issues

**Extension not loading:**
- Ensure you're using Chrome 88+ or Firefox 109+
- Check that Developer Mode is enabled
- Try reloading the extension

**API requests failing:**
- Check internet connection
- Verify SiteOptz.ai is accessible
- Check browser console for error messages

**Context suggestions not showing:**
- Clear extension storage: `chrome://extensions/` → SiteOptz → Storage
- Reload the extension
- Refresh the webpage

### Support

For technical support or feature requests:
- Email: extension@siteoptz.ai
- Visit: [SiteOptz.ai/contact](https://siteoptz.ai/contact)
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

## Changelog

### Version 1.0.0
- Initial release
- AI tool search and discovery
- Category filtering
- Context-aware suggestions
- Right-click context menu integration
- Chrome and Firefox support

## License

MIT License - see LICENSE file for details.

## Contributing

We welcome contributions! Please see our contributing guidelines and submit pull requests.

---

**Made with ❤️ by the SiteOptz.ai team**