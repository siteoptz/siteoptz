# SiteOptz WordPress Plugins

## 📍 **Plugin Location**
```
/Users/siteoptz/siteoptz-scraping/wordpress-package/plugins/
```

## 🔌 **Included Plugins**

### **SiteOptz Core** (`siteoptz-core/`)
The main plugin that provides core functionality for the AI tools comparison platform.

### **SiteOptz Calculator** (`siteoptz-calculator/`)
Advanced pricing calculator with quote generation and email capture functionality.

### **SiteOptz Leads** (`siteoptz-leads/`)
Comprehensive lead management system with email marketing integrations.

#### **Features:**
- Custom post types (AI Tools, Comparisons)
- Custom taxonomies (Tool Categories, Tags)
- REST API endpoints
- Admin dashboard with statistics
- Tool import functionality
- Lead capture system
- Quote management
- Email notifications

#### **Files:**
- `siteoptz-core.php` - Main plugin file (800+ lines)
- `assets/css/siteoptz-core.css` - Frontend styles
- `assets/css/admin.css` - Admin panel styles  
- `assets/js/siteoptz-core.js` - Frontend JavaScript
- `assets/js/admin.js` - Admin panel JavaScript

## 🚀 **Installation**

### **Method 1: Upload via WordPress Admin**
1. Go to WordPress Admin > Plugins > Add New > Upload Plugin
2. Upload the `siteoptz-core.zip` file
3. Click "Install Now" then "Activate"

### **Method 2: Manual Installation**
```bash
# Copy plugin to WordPress
cp -r siteoptz-core /path/to/wordpress/wp-content/plugins/

# Set permissions
chmod -R 755 /path/to/wordpress/wp-content/plugins/siteoptz-core/

# Activate via WP-CLI
wp plugin activate siteoptz-core
```

## ⚙️ **Configuration**

### **After Activation:**
1. Go to **SiteOptz** in the WordPress admin menu
2. Configure settings in **SiteOptz > Settings**
3. Import sample tools via **SiteOptz > Import Tools**
4. Create your first AI tool at **AI Tools > Add New**

### **Required Settings:**
- **API Key**: For external integrations (optional)
- **Email Notifications**: Enable/disable email alerts
- **SMTP Configuration**: For sending emails

### **Custom Post Types Created:**
- **AI Tools** (`/tools/`) - Individual AI tool profiles
- **Comparisons** (`/comparisons/`) - Tool comparison pages

### **Taxonomies Created:**
- **Tool Categories** - Organize tools by type
- **Tool Tags** - Additional tool categorization

## 🔗 **REST API Endpoints**

### **Tools API:**
- `GET /wp-json/siteoptz/v1/tools` - List all tools
- `GET /wp-json/siteoptz/v1/tools/{id}` - Get single tool
- `POST /wp-json/siteoptz/v1/save-quote` - Save pricing quote
- `POST /wp-json/siteoptz/v1/capture-lead` - Capture email leads

### **Parameters:**
```javascript
// Get tools with filters
fetch('/wp-json/siteoptz/v1/tools?category=text-generation&per_page=10')

// Save a quote
fetch('/wp-json/siteoptz/v1/save-quote', {
  method: 'POST',
  body: JSON.stringify({
    email: 'user@example.com',
    tool: 'ChatGPT',
    totalCost: 29.99
  })
})
```

## 📊 **Database Tables**

The plugin creates these custom tables:

### **Leads Table** (`wp_siteoptz_leads`)
```sql
CREATE TABLE wp_siteoptz_leads (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    email varchar(100) NOT NULL,
    name varchar(100) DEFAULT '',
    company varchar(100) DEFAULT '',
    type varchar(50) DEFAULT '',
    source varchar(255) DEFAULT '',
    timestamp datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```

## 🎛️ **Admin Features**

### **Dashboard:**
- Tools count statistics
- Comparisons count
- Recent activity
- Quick action buttons

### **Tools Management:**
- Add/edit AI tools
- Bulk actions
- Import from JSON
- Custom meta fields:
  - Pricing information
  - Feature lists
  - Ratings (1-5 stars)
  - Website URLs

### **Import System:**
- JSON file upload
- Drag & drop interface
- Progress tracking
- Error handling
- Duplicate detection

### **Settings Page:**
- API configuration
- Email settings
- Connection testing
- Feature toggles

## 🔧 **Hooks & Filters**

### **Actions:**
```php
// After tool import
do_action('siteoptz_tool_imported', $tool_id, $tool_data);

// After lead capture
do_action('siteoptz_lead_captured', $lead_data);

// After quote saved
do_action('siteoptz_quote_saved', $quote_data);
```

### **Filters:**
```php
// Modify tool data before save
$tool_data = apply_filters('siteoptz_tool_data', $tool_data, $post_id);

// Modify API response
$response = apply_filters('siteoptz_api_response', $response, $request);

// Customize email content
$message = apply_filters('siteoptz_email_content', $message, $type, $data);
```

## 🎨 **Customization**

### **Override Templates:**
Copy plugin templates to your theme:
```
your-theme/
├── siteoptz/
│   ├── single-tool.php
│   ├── archive-tool.php
│   └── comparison-table.php
```

### **Custom CSS:**
```css
/* Override plugin styles */
.siteoptz-tool-card {
    border: 2px solid #your-color;
    border-radius: 12px;
}
```

### **Add Custom Fields:**
```php
// Add meta box for custom fields
add_action('add_meta_boxes', function() {
    add_meta_box(
        'custom-tool-fields',
        'Custom Fields',
        'custom_fields_callback',
        'ai_tool'
    );
});
```

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **Plugin Won't Activate**
```bash
# Check PHP version (requires 8.0+)
php --version

# Check file permissions
chmod -R 755 wp-content/plugins/siteoptz-core/

# Check error logs
tail -f wp-content/debug.log
```

#### **API Endpoints Not Working**
```bash
# Flush permalinks
wp rewrite flush

# Check .htaccess file
cat .htaccess
```

#### **Import Fails**
- Check file format (must be valid JSON)
- Verify file size (max 5MB)
- Ensure proper file permissions
- Check PHP memory limit

#### **Emails Not Sending**
- Configure SMTP settings
- Check spam folders
- Verify email server settings
- Test with SMTP plugin

### **Debug Mode:**
```php
// Add to wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('SITEOPTZ_DEBUG', true);
```

## 📚 **Development**

### **File Structure:**
```
siteoptz-core/
├── siteoptz-core.php          # Main plugin file
├── assets/
│   ├── css/
│   │   ├── siteoptz-core.css  # Frontend styles
│   │   └── admin.css          # Admin styles
│   └── js/
│       ├── siteoptz-core.js   # Frontend JavaScript
│       └── admin.js           # Admin JavaScript
├── includes/                   # Additional PHP files
├── templates/                  # Template files
└── languages/                  # Translation files
```

### **Coding Standards:**
- Follows WordPress coding standards
- PSR-4 autoloading ready
- Documented with DocBlocks
- Sanitized inputs/outputs
- Escaped data for security

### **Testing:**
```bash
# Run PHP CodeSniffer
phpcs --standard=WordPress siteoptz-core/

# Run tests
phpunit tests/
```

## 🔄 **Updates**

### **Automatic Updates:**
The plugin supports automatic updates through WordPress update system.

### **Manual Updates:**
1. Deactivate the plugin
2. Upload new version
3. Reactivate the plugin
4. Check for database updates in admin

## 🎯 **Performance**

### **Optimizations Included:**
- Database query caching
- Transient API usage
- Lazy loading of admin scripts
- Minified assets
- Conditional script loading

### **Caching:**
```php
// Cache tool data for 1 hour
$tools = wp_cache_get('siteoptz_tools');
if (false === $tools) {
    $tools = get_tools_data();
    wp_cache_set('siteoptz_tools', $tools, '', 3600);
}
```

## 📧 **Support**

### **Documentation:**
- Plugin settings have built-in help
- Contextual help tabs in admin
- Inline documentation in code

### **Requirements:**
- WordPress 6.0+
- PHP 8.0+
- MySQL 5.7+

### **Compatibility:**
- Multisite compatible
- Translation ready
- WCAG AA compliant admin
- Mobile responsive

---

**Ready to power your AI tools comparison platform!** 🚀