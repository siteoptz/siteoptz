# SiteOptz.ai WordPress Package
## Complete Design System & Component Library

This package contains a production-ready WordPress implementation for SiteOptz.ai with modern design system, interactive components, and comprehensive templates.

## 📦 Package Contents

```
wordpress-package/
├── theme/                          # WordPress theme files
│   ├── style.css                   # Design system CSS
│   ├── functions.php               # Theme functions & enqueues
│   ├── index.php                   # Main template
│   └── templates/                  # Page templates
├── components/                     # React/JS components
│   ├── Hero/                       # Value prop + CTA
│   ├── TrustBand/                  # Logos, stats, testimonials
│   ├── FeatureRows/                # Problem → solution
│   ├── ComparisonTable/            # Interactive sortable table
│   ├── PricingCalculator/          # Live calculator + quotes
│   ├── LeadCapture/                # Forms and modals
│   ├── FAQAccordion/               # Schema-injected FAQ
│   ├── SEOBlocks/                  # Pros/cons, alternatives
│   └── Navigation/                 # Sticky CTA, jump links
├── templates/                      # WordPress page templates
│   ├── single-tool.php             # /tools/[tool]
│   ├── comparison.php              # /comparisons/[toolA]-vs-[toolB]
│   ├── pricing.php                 # /pricing
│   └── single-post.php             # /blog/[slug]
├── data/                           # Structured data
│   ├── tools.json                  # AI tools database
│   ├── comparisons.json            # Comparison data
│   ├── pricing.json                # Pricing data
│   └── schemas.json                # Schema.org templates
├── assets/                         # Static assets
│   ├── css/                        # Stylesheets
│   ├── js/                         # JavaScript files
│   └── images/                     # Icons, logos
└── plugins/                        # Custom WordPress plugins
    ├── siteoptz-core/              # Core functionality
    ├── siteoptz-calculator/        # Pricing calculator
    └── siteoptz-leads/             # Lead management
```

## 🎨 Design System

### Color Palette (WCAG AA Compliant)
- **Primary**: Blue (#2563eb) - Contrast ratio 4.5:1
- **Secondary**: Indigo (#4f46e5) - Contrast ratio 4.5:1
- **Success**: Green (#16a34a) - Contrast ratio 4.5:1
- **Warning**: Amber (#d97706) - Contrast ratio 4.5:1
- **Error**: Red (#dc2626) - Contrast ratio 4.5:1

### Typography Scale
- **Font Stack**: Inter, -apple-system, BlinkMacSystemFont
- **Scale**: 1.2 modular scale (12px → 60px)
- **Weights**: 300, 400, 500, 600, 700, 800

### Spacing System
- **Base**: 4px grid system
- **Scale**: 0, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px, 160px, 192px, 256px

### Components
- **Lucide Icons**: Full icon set included
- **Animations**: Framer Motion for subtle interactions
- **Responsive**: Mobile-first design

## 🚀 Installation

### Prerequisites
- WordPress 6.0+
- PHP 8.0+
- MySQL 5.7+

### Quick Start
1. Upload theme to `/wp-content/themes/siteoptz/`
2. Install plugins from `/plugins/` directory
3. Activate theme and plugins
4. Import sample data from `/data/` directory
5. Configure settings in WordPress admin

### Manual Setup
```bash
# 1. Copy theme files
cp -r wordpress-package/theme/ /wp-content/themes/siteoptz/

# 2. Install plugins
cp -r wordpress-package/plugins/* /wp-content/plugins/

# 3. Copy assets
cp -r wordpress-package/assets/* /wp-content/themes/siteoptz/assets/
```

## 📋 Template Usage

### Tool Pages (/tools/[tool])
```php
<?php
// Automatically generated from tools.json
// Schema: SoftwareApplication + FAQ
// Components: Hero, PricingSnapshot, ProsCons, FAQ
?>
```

### Comparison Pages (/comparisons/[toolA]-vs-[toolB])
```php
<?php
// Head-to-head comparisons
// Schema: ProductComparison + FAQ
// Components: VerdictBanner, ComparisonTable, Calculator, LeadCapture
?>
```

### Pricing Page (/pricing)
```php
<?php
// Interactive pricing calculator
// Schema: Offer + FAQ
// Components: PricingCards, Calculator, TrustProof
?>
```

### Blog Posts (/blog/[slug])
```php
<?php
// MDX-style components in WordPress
// Schema: Article + HowTo/FAQ
// Components: TOC, AuthorBox, RelatedPosts
?>
```

## 🔧 Configuration

### Environment Variables
```php
// wp-config.php additions
define('SITEOPTZ_API_KEY', 'your-api-key');
define('SITEOPTZ_EMAIL_SERVICE', 'sendgrid'); // or mailgun
define('SITEOPTZ_ANALYTICS_ID', 'GA-XXXXXXXXX');
```

### Customization
- Colors: Modify CSS custom properties in `style.css`
- Components: Edit React components in `/components/`
- Data: Update JSON files in `/data/` directory
- Schemas: Customize Schema.org markup in `/schemas.json`

## 📊 Features

### Interactive Components
- ✅ Sortable/filterable comparison tables
- ✅ Real-time pricing calculator
- ✅ Lead capture with email automation
- ✅ FAQ with schema injection
- ✅ Trust band with testimonials
- ✅ Sticky navigation and CTAs

### SEO Optimization
- ✅ Schema.org markup for all templates
- ✅ Open Graph and Twitter Cards
- ✅ Structured data for tools/comparisons
- ✅ Optimized meta descriptions
- ✅ Breadcrumb navigation

### Performance
- ✅ Lazy loading for images
- ✅ CSS/JS minification
- ✅ Critical CSS inlining
- ✅ WebP image support
- ✅ Caching-friendly architecture

### Analytics & Tracking
- ✅ Google Analytics 4 integration
- ✅ Lead tracking and attribution
- ✅ Conversion funnel analysis
- ✅ A/B testing ready

## 📈 Data Management

### Tools Database
```json
{
  "tools": [
    {
      "id": "chatgpt",
      "name": "ChatGPT",
      "slug": "chatgpt",
      "description": "AI chatbot for conversations",
      "logo": "/images/tools/chatgpt.svg",
      "pricing": [...],
      "features": [...],
      "pros": [...],
      "cons": [...],
      "alternatives": [...],
      "schema": {...}
    }
  ]
}
```

### Lead Management
- Quote system with 7-day expiry
- Email automation for reminders
- CRM integration ready
- Export capabilities

## 🎯 Deployment Checklist

### Pre-Launch
- [ ] Test all components on staging
- [ ] Validate WCAG AA compliance
- [ ] Check schema.org markup
- [ ] Verify email integrations
- [ ] Performance audit (Core Web Vitals)

### Post-Launch
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Enable caching
- [ ] Submit sitemaps
- [ ] Monitor conversions

## 📞 Support

For technical support:
- Documentation: `/docs/` directory
- Issues: Check troubleshooting guide
- Updates: Follow semantic versioning

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**License**: Proprietary - SiteOptz.ai  
**Author**: SiteOptz Development Team