# SiteOptz.ai WordPress Deployment Guide
## Complete Setup Instructions for Production

This guide provides step-by-step instructions for deploying the SiteOptz.ai WordPress package to production.

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- WordPress 6.0+
- PHP 8.0+
- MySQL 5.7+
- HTTPS enabled domain
- Email service (SendGrid/Mailgun)

### 1. Upload Theme
```bash
# Upload theme folder to WordPress
wp-content/themes/siteoptz/

# Or via WP Admin
Appearance > Themes > Add New > Upload Theme
```

### 2. Install Plugins
```bash
# Upload custom plugins
wp-content/plugins/siteoptz-core/
wp-content/plugins/siteoptz-calculator/
wp-content/plugins/siteoptz-leads/

# Activate via WP Admin
Plugins > Installed Plugins > Activate All
```

### 3. Import Sample Data
```bash
# Via WP CLI
wp import wordpress-package/data/sample-data.xml

# Or via WP Admin
Tools > Import > WordPress Importer
```

### 4. Configure Settings
- **Theme**: Activate "SiteOptz.ai" theme
- **Permalinks**: Set to "Post name" structure
- **Email**: Configure SMTP settings
- **API Keys**: Add to wp-config.php

---

## 📋 Detailed Installation

### Step 1: Server Requirements

#### Minimum Server Specs
- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 20GB SSD
- **Bandwidth**: Unlimited

#### Software Requirements
```bash
# PHP Extensions Required
php-gd
php-mbstring
php-xml
php-curl
php-zip
php-mysql
php-imagick

# Recommended PHP Settings
memory_limit = 512M
max_execution_time = 300
upload_max_filesize = 64M
post_max_size = 64M
```

### Step 2: WordPress Installation

#### Fresh WordPress Install
```bash
# Download WordPress
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz

# Set permissions
chown -R www-data:www-data wordpress/
chmod -R 755 wordpress/
```

#### Database Setup
```sql
-- Create database and user
CREATE DATABASE siteoptz_wp;
CREATE USER 'siteoptz_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON siteoptz_wp.* TO 'siteoptz_user'@'localhost';
FLUSH PRIVILEGES;
```

### Step 3: Theme Installation

#### Upload Theme Files
```bash
# Copy theme to WordPress
cp -r wordpress-package/theme/* /wp-content/themes/siteoptz/

# Set correct permissions
chown -R www-data:www-data /wp-content/themes/siteoptz/
chmod -R 755 /wp-content/themes/siteoptz/
```

#### Activate Theme
1. Login to WP Admin
2. Go to **Appearance > Themes**
3. Find "SiteOptz.ai" theme
4. Click **Activate**

### Step 4: Plugin Installation

#### Core Plugin (siteoptz-core)
```bash
# Upload core plugin
cp -r wordpress-package/plugins/siteoptz-core/ /wp-content/plugins/

# Activate via WP CLI
wp plugin activate siteoptz-core
```

#### Calculator Plugin (siteoptz-calculator)
```bash
# Upload calculator plugin  
cp -r wordpress-package/plugins/siteoptz-calculator/ /wp-content/plugins/

# Activate via WP CLI
wp plugin activate siteoptz-calculator
```

#### Leads Plugin (siteoptz-leads)
```bash
# Upload leads plugin
cp -r wordpress-package/plugins/siteoptz-leads/ /wp-content/plugins/

# Activate via WP CLI
wp plugin activate siteoptz-leads
```

### Step 5: Configuration

#### wp-config.php Settings
```php
// Add to wp-config.php
define('SITEOPTZ_VERSION', '1.0.0');
define('SITEOPTZ_API_KEY', 'your-api-key-here');
define('SITEOPTZ_ENV', 'production'); // or 'staging'

// Email Configuration
define('SITEOPTZ_SMTP_HOST', 'smtp.sendgrid.net');
define('SITEOPTZ_SMTP_USER', 'apikey');
define('SITEOPTZ_SMTP_PASS', 'your-sendgrid-api-key');
define('SITEOPTZ_SMTP_PORT', 587);

// Analytics
define('GOOGLE_ANALYTICS_ID', 'G-XXXXXXXXXX');
define('GOOGLE_TAG_MANAGER_ID', 'GTM-XXXXXXX');

// Performance
define('WP_CACHE', true);
define('COMPRESS_CSS', true);
define('COMPRESS_SCRIPTS', true);
define('CONCATENATE_SCRIPTS', false);

// Security
define('DISALLOW_FILE_EDIT', true);
define('WP_AUTO_UPDATE_CORE', true);
```

#### Permalink Structure
```bash
# Set permalinks via WP CLI
wp rewrite structure '/%postname%/'
wp rewrite flush
```

### Step 6: Content Import

#### Tools Data Import
```bash
# Import tools via WP CLI
wp siteoptz import-tools wordpress-package/data/tools-sample.json

# Or manual import via Admin
SiteOptz > Import > Tools Data
```

#### Sample Content
```bash
# Import sample posts and pages
wp import wordpress-package/data/sample-content.xml

# Configure theme settings manually
# See: wordpress-package/data/theme-setup-guide.md
# For complete step-by-step configuration instructions
```

### Step 7: Menu Setup

#### Import Navigation Menus
```bash
# Import navigation menus
wp import wordpress-package/data/menus-export.xml
```

#### Or Create Manually:
1. Go to **Appearance > Menus**
2. Create "Primary Menu":
   - Home
   - Tools
   - Comparisons
   - Pricing
   - Contact
3. Create "Footer Menu":
   - Privacy Policy
   - Terms of Service
   - Contact
4. Assign menus to locations

### Step 8: Widget Configuration

#### Footer Widgets
1. Go to **Appearance > Widgets**
2. Add to "Footer Widgets":
   - Newsletter signup
   - Social media links
   - Recent posts
   - Tool categories

### Step 9: Performance Optimization

#### Caching Setup
```bash
# Install W3 Total Cache or similar
wp plugin install w3-total-cache --activate

# Or use Redis/Memcached
wp plugin install redis-cache --activate
```

#### Image Optimization  
```bash
# Install image optimization
wp plugin install smush --activate

# Configure WebP support
wp plugin install webp-express --activate
```

#### CDN Configuration
```bash
# Configure CloudFlare or similar CDN
# Update wp-config.php with CDN URLs
define('SITEOPTZ_CDN_URL', 'https://cdn.siteoptz.ai');
```

### Step 10: Security Hardening

#### Security Plugins
```bash
# Install security plugin
wp plugin install wordfence --activate

# Or use Sucuri
wp plugin install sucuri-scanner --activate
```

#### File Permissions
```bash
# Set correct file permissions
find /wp-content/ -type d -exec chmod 755 {} \;
find /wp-content/ -type f -exec chmod 644 {} \;
chmod 600 wp-config.php
```

#### Hide WordPress Version
```php
// Add to functions.php
remove_action('wp_head', 'wp_generator');

function siteoptz_remove_version_strings($src) {
    global $wp_version;
    parse_str(parse_url($src, PHP_URL_QUERY), $query);
    if (isset($query['ver']) && $query['ver'] === $wp_version) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('script_loader_src', 'siteoptz_remove_version_strings');
add_filter('style_loader_src', 'siteoptz_remove_version_strings');
```

---

## 🔧 Advanced Configuration

### Custom Post Types & Fields

The theme automatically registers:
- **Tools** (`tool`) - AI tool listings
- **Comparisons** (`comparison`) - Tool comparisons  
- **Testimonials** (`testimonial`) - User testimonials

#### ACF Field Groups (if using ACF)
```bash
# Import ACF field groups
wp acf import wordpress-package/data/acf-fields.json
```

### API Configuration

#### REST API Endpoints
The theme creates these endpoints:
- `GET /wp-json/siteoptz/v1/tools` - Tools data
- `GET /wp-json/siteoptz/v1/comparisons` - Comparisons
- `POST /wp-json/siteoptz/v1/quote` - Save quote
- `POST /wp-json/siteoptz/v1/lead` - Capture lead

#### Rate Limiting
```php
// Add to functions.php
function siteoptz_api_rate_limit() {
    // Implement rate limiting logic
    $ip = $_SERVER['REMOTE_ADDR'];
    $requests = get_transient("api_requests_$ip") ?: 0;
    
    if ($requests >= 100) { // 100 requests per hour
        wp_die('Rate limit exceeded', 'Too Many Requests', ['response' => 429]);
    }
    
    set_transient("api_requests_$ip", $requests + 1, HOUR_IN_SECONDS);
}
add_action('rest_api_init', 'siteoptz_api_rate_limit');
```

### Email Configuration

#### SendGrid Setup
```php
// wp-config.php
define('SITEOPTZ_SENDGRID_API_KEY', 'SG.xxxxxx');

// functions.php
function siteoptz_configure_phpmailer($phpmailer) {
    $phpmailer->isSMTP();
    $phpmailer->Host = 'smtp.sendgrid.net';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = 587;
    $phpmailer->Username = 'apikey';
    $phpmailer->Password = SITEOPTZ_SENDGRID_API_KEY;
    $phpmailer->SMTPSecure = 'tls';
    $phpmailer->From = 'noreply@siteoptz.ai';
    $phpmailer->FromName = 'SiteOptz.ai';
}
add_action('phpmailer_init', 'siteoptz_configure_phpmailer');
```

### Analytics Integration

#### Google Analytics 4
```javascript
// Added automatically by theme
gtag('config', '<?php echo GOOGLE_ANALYTICS_ID; ?>', {
    // Enhanced ecommerce for lead tracking
    custom_map: {
        'dimension1': 'tool_name',
        'dimension2': 'plan_selected'
    }
});
```

#### Lead Tracking Events
```javascript
// Quote saved event
gtag('event', 'generate_lead', {
    'event_category': 'engagement',
    'event_label': tool_name,
    'value': plan_price
});

// Tool comparison event
gtag('event', 'compare_tools', {
    'event_category': 'engagement', 
    'event_label': tools_compared.join(' vs ')
});
```

---

## 🧪 Testing & Quality Assurance

### Pre-Launch Checklist

#### Functionality Tests
- [ ] Homepage loads correctly
- [ ] Tool pages display properly
- [ ] Comparison tables work
- [ ] Pricing calculator functions
- [ ] Email capture works
- [ ] Quote system saves/emails
- [ ] Search functionality works
- [ ] Mobile responsive design
- [ ] Forms submit successfully
- [ ] 404 pages display correctly

#### Performance Tests
```bash
# Run Lighthouse audit
lighthouse https://siteoptz.ai --output-path=./lighthouse-report.html

# Check Core Web Vitals
curl -s "https://www.googleapis.com/pagespeedingest/v5/runPagespeed?url=https://siteoptz.ai&strategy=mobile" | jq
```

#### SEO Tests
- [ ] Meta titles and descriptions
- [ ] Schema markup validates
- [ ] Open Graph tags present
- [ ] XML sitemap generates
- [ ] Robots.txt configured
- [ ] SSL certificate active
- [ ] Page speed > 90
- [ ] Mobile usability passes

#### Security Tests
```bash
# Run WPScan
wpscan --url https://siteoptz.ai --api-token YOUR_API_TOKEN

# Check SSL
sslscan siteoptz.ai

# Test headers
curl -I https://siteoptz.ai
```

### Load Testing
```bash
# Install Apache Bench
apt-get install apache2-utils

# Test homepage
ab -n 1000 -c 10 https://siteoptz.ai/

# Test API endpoint
ab -n 500 -c 5 https://siteoptz.ai/wp-json/siteoptz/v1/tools
```

---

## 📊 Monitoring & Maintenance

### Uptime Monitoring
- **Pingdom**: Monitor uptime and performance
- **UptimeRobot**: Free uptime monitoring
- **New Relic**: Application performance monitoring

### Error Tracking
```php
// wp-config.php - Enable error logging
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('SCRIPT_DEBUG', false);

// Custom error handler
function siteoptz_error_handler($errno, $errstr, $errfile, $errline) {
    error_log("Error: [$errno] $errstr in $errfile on line $errline");
    
    // Send critical errors to Slack/email
    if ($errno == E_ERROR || $errno == E_PARSE) {
        wp_mail(
            'admin@siteoptz.ai', 
            'Critical Error on SiteOptz.ai', 
            "Error: $errstr in $errfile:$errline"
        );
    }
}
set_error_handler('siteoptz_error_handler');
```

### Backup Strategy
```bash
# Daily database backups
0 2 * * * /usr/local/bin/wp db export /backups/siteoptz-$(date +\%Y\%m\%d).sql

# Weekly full site backups  
0 3 * * 0 tar -czf /backups/siteoptz-full-$(date +\%Y\%m\%d).tar.gz /var/www/siteoptz.ai

# Sync to S3
0 4 * * * aws s3 sync /backups/ s3://siteoptz-backups/
```

### Update Process
```bash
# Staging updates
wp core update --allow-root
wp plugin update --all --allow-root
wp theme update siteoptz --allow-root

# Test staging site
# Deploy to production if tests pass
```

---

## 🔗 Post-Launch Tasks

### Search Console Setup
1. Verify domain in Google Search Console
2. Submit XML sitemap
3. Monitor indexing status
4. Set up performance alerts

### Social Media Integration
```html
<!-- Open Graph tags added automatically -->
<meta property="og:site_name" content="SiteOptz.ai">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@siteoptz">
```

### Content Strategy
- [ ] Create editorial calendar
- [ ] Set up automatic tool data updates
- [ ] Plan comparison content
- [ ] Schedule social media posts
- [ ] Set up email newsletters

### Legal Compliance
- [ ] Update Privacy Policy
- [ ] Create Terms of Service  
- [ ] Add Cookie Notice
- [ ] Configure GDPR compliance
- [ ] Set up data retention policies

---

## 📞 Support & Resources

### Documentation
- **Theme Docs**: `/wordpress-package/docs/`
- **Component Library**: `/wordpress-package/components/README.md`
- **API Reference**: `/wordpress-package/docs/api.md`

### Troubleshooting
- **Common Issues**: See `/wordpress-package/docs/troubleshooting.md`
- **Error Codes**: Check error log at `/wp-content/debug.log`
- **Performance Issues**: Use Query Monitor plugin

### Development Environment
```bash
# Local development with Docker
docker-compose up -d
wp core install --url=http://localhost --title="SiteOptz Dev" --admin_user=admin --admin_email=dev@siteoptz.ai
```

### Version Control
```bash
# Git setup for theme development
git init
git add .
git commit -m "Initial SiteOptz.ai deployment"
git remote add origin https://github.com/siteoptz/wordpress-theme
```

---

**🎉 Deployment Complete!**

Your SiteOptz.ai WordPress site is now ready for production. Monitor the first 48 hours closely and be prepared to address any issues that arise.

For support, contact the development team or refer to the documentation in the `/docs/` directory.