# Premium Footer Setup Guide

## 🚀 **Quick Setup (3 Methods)**

### **Method 1: Replace Default Footer (Easiest)**
```bash
# In your theme directory
cp footer-ultra-premium.php footer.php
```
This will use the premium footer on ALL pages.

### **Method 2: Use WordPress Template System**
WordPress automatically loads footer files based on naming:
- `footer.php` - Default footer
- `footer-ultra-premium.php` - Premium footer variant

To use the premium footer in your templates:
```php
<?php get_footer('ultra-premium'); ?>
```

### **Method 3: Conditional Loading**
Use the `footer-conditional.php` file to switch between footers based on settings.

---

## 📝 **Implementation Steps**

### **Step 1: Upload Files**
Upload these files to your WordPress theme directory:
```
/wp-content/themes/your-theme/
├── footer.php (default)
├── footer-ultra-premium.php (premium)
├── footer-conditional.php (switcher)
└── page-premium.php (premium page template)
```

### **Step 2: Choose Loading Method**

#### **A. Global Premium Footer (All Pages)**
Edit your theme's main template files (`index.php`, `page.php`, `single.php`, etc.) and change:
```php
// Change this:
<?php get_footer(); ?>

// To this:
<?php get_footer('ultra-premium'); ?>
```

#### **B. Specific Pages Only**
1. Create a new page in WordPress
2. In Page Attributes, select "Premium Page" template
3. The page will automatically use the premium footer

#### **C. Conditional by Page Type**
Add to your `footer.php`:
```php
<?php
// Load different footers based on page type
if (is_front_page()) {
    get_template_part('footer', 'ultra-premium');
} elseif (is_page('pricing') || is_page('contact')) {
    get_template_part('footer', 'ultra-premium');
} else {
    get_template_part('footer', 'standard');
}
?>
```

---

## 🎨 **Customization via WordPress Admin**

### **Add to functions.php for Customizer Support:**
```php
// Add footer customizer options
function siteoptz_footer_customizer($wp_customize) {
    // Footer Section
    $wp_customize->add_section('premium_footer', array(
        'title' => 'Premium Footer Options',
        'priority' => 120,
    ));
    
    // Use Premium Footer
    $wp_customize->add_setting('use_premium_footer', array(
        'default' => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    
    $wp_customize->add_control('use_premium_footer', array(
        'label' => 'Use Premium Footer',
        'section' => 'premium_footer',
        'type' => 'checkbox',
    ));
    
    // Newsletter CTA
    $wp_customize->add_setting('show_newsletter_cta', array(
        'default' => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    
    $wp_customize->add_control('show_newsletter_cta', array(
        'label' => 'Show Newsletter Section',
        'section' => 'premium_footer',
        'type' => 'checkbox',
    ));
    
    // Footer Stats
    $wp_customize->add_setting('show_footer_stats', array(
        'default' => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    
    $wp_customize->add_control('show_footer_stats', array(
        'label' => 'Show Footer Statistics',
        'section' => 'premium_footer',
        'type' => 'checkbox',
    ));
}
add_action('customize_register', 'siteoptz_footer_customizer');
```

---

## 🔧 **Common WordPress Footer Hooks**

### **In your index.php, page.php, single.php files:**
```php
<?php
// Standard WordPress footer call
get_footer(); // Loads footer.php

// Load specific footer variant
get_footer('ultra-premium'); // Loads footer-ultra-premium.php

// Load footer with condition
if (is_front_page()) {
    get_footer('ultra-premium');
} else {
    get_footer();
}
?>
```

---

## 📦 **File Structure in WordPress Theme**

```
/wp-content/themes/siteoptz-premium/
├── style.css (theme info)
├── functions.php (theme functions)
├── index.php (main template)
├── header.php (default header)
├── header-premium.php (premium header)
├── footer.php (default footer)
├── footer-ultra-premium.php (premium footer)
├── page.php (default page template)
└── page-premium.php (premium page template)
```

---

## ✅ **Testing Your Footer**

### **1. Check if footer loads:**
```php
// Add to footer file to test
<?php echo '<!-- Premium Footer Loaded -->'; ?>
```

### **2. Verify in browser:**
- View page source
- Look for "Premium Footer Loaded" comment
- Check if newsletter form appears
- Test social links
- Verify responsive design

### **3. Debug if not loading:**
```php
// Add to functions.php
add_action('wp_footer', function() {
    echo '<!-- Footer Hook Fired -->';
});
```

---

## 🚨 **Troubleshooting**

### **Footer Not Showing:**
1. Check file name matches exactly: `footer-ultra-premium.php`
2. Verify `get_footer('ultra-premium')` is called
3. Ensure `wp_footer()` is in the footer file
4. Check theme directory path is correct

### **Styles Not Applied:**
1. Ensure CSS is either in `style.css` or inline in footer
2. Check if `wp_head()` is in header.php
3. Verify no CSS conflicts with existing theme

### **JavaScript Not Working:**
1. Ensure jQuery is loaded (WordPress includes it)
2. Check browser console for errors
3. Verify `wp_footer()` is called before `</body>`

---

## 🎯 **Quick Implementation**

**For immediate use, just run:**
```bash
# In your WordPress theme directory
cp footer-ultra-premium.php footer.php
```

This replaces your current footer with the premium version on all pages immediately.

---

## 📞 **Need Help?**

The premium footer is designed to work with any WordPress theme. If you need specific customization:

1. Check the WordPress Codex for `get_footer()`
2. Review your theme's structure
3. Test on a staging site first
4. Use WordPress Customizer for live preview