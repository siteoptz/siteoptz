# SiteOptz Theme Setup Guide

## Manual Configuration Steps

After importing content and activating the theme, configure these settings:

### 1. Site Identity
**Go to: Appearance > Customize > Site Identity**

- **Site Title**: SiteOptz.ai
- **Tagline**: AI Tools Comparison Platform
- **Site Icon**: Upload your favicon (32x32px)
- **Logo**: Upload your logo image

### 2. Theme Customization
**Go to: Appearance > Customize**

Available sections will depend on your active theme:
- **Site Identity** - Logo, site title, tagline
- **Colors** (if supported by theme) - Background, text colors
- **Typography** (if supported by theme) - Font selections
- **Header** - Header layout options
- **Footer** - Footer customization
- **Additional CSS** - Add custom CSS if needed:

```css
/* Custom color scheme (add to Additional CSS) */
:root {
    --primary-color: #3b82f6;
    --secondary-color: #1e40af;
    --accent-color: #10b981;
    --text-color: #1e293b;
}
```

### 3. Homepage Settings
**Go to: Settings > Reading**

- **Your homepage displays**: A static page
- **Homepage**: Select "Home" page
- **Posts page**: Select "Blog" page (if created)

### 4. Permalink Settings
**Go to: Settings > Permalinks**

- **Common Settings**: Post name
- **Custom Structure**: `/%postname%/`

### 5. Menu Configuration
**Go to: Appearance > Menus**

#### Create Primary Menu:
1. Click "Create a new menu"
2. Name: "Primary Menu"
3. Add pages:
   - Home
   - AI Tools
   - Comparisons
   - Pricing
   - Contact
4. **Menu Settings**: Check "Primary Navigation"
5. Save Menu

#### Create Footer Menu:
1. Create new menu: "Footer Menu"
2. Add custom links:
   - Privacy Policy
   - Terms of Service
   - Contact
3. **Menu Settings**: Check "Footer Navigation"
4. Save Menu

### 6. Widget Areas
**Go to: Appearance > Widgets**

#### Footer Widget Areas:
- **Footer Column 1**: Add "Text" widget with company info
- **Footer Column 2**: Add "Recent Posts" or "Categories"
- **Footer Column 3**: Add "Contact Info" or social links
- **Footer Column 4**: Add newsletter signup

### 7. Plugin Configuration

#### SiteOptz Core Settings:
**Go to: SiteOptz > Settings**

- **Email Notifications**: Enable
- **API Key**: (Optional - for external integrations)
- **SMTP Settings**: Configure for email sending

#### SiteOptz Calculator Settings:
**Go to: SiteOptz Calculator > Settings**

- **Currency**: USD ($)
- **Default Tool**: Select primary AI tool
- **Email Capture**: Enable

#### SiteOptz Leads Settings:
**Go to: SiteOptz Leads > Settings**

- **Email Service**: Choose (Mailchimp, ConvertKit, etc.)
- **API Key**: Enter service API key
- **Default List**: Set subscriber list ID
- **GDPR Compliance**: Enable

### 8. Advanced Settings

#### Performance:
- Install caching plugin (WP Rocket, W3 Total Cache)
- Optimize images (Smush, ShortPixel)
- Enable CDN if needed

#### SEO:
- Install Yoast SEO or RankMath
- Configure meta descriptions
- Set up XML sitemaps
- Add Google Analytics

#### Security:
- Install security plugin (Wordfence, Sucuri)
- Enable SSL certificate
- Set up regular backups

### 9. Content Setup

#### Create Additional Pages:
- Privacy Policy
- Terms of Service
- About Us
- Blog (if using posts)

#### Add AI Tools:
**Go to: AI Tools > Add New**

1. Add tool information:
   - Name, description, features
   - Pricing details
   - Rating (1-5 stars)
   - Website URL
   - Screenshots/images

2. Set categories and tags

3. Configure tool-specific settings

### 10. Testing Checklist

- [ ] Homepage displays correctly
- [ ] Navigation menus work
- [ ] AI Tools page displays tools
- [ ] Pricing calculator functions
- [ ] Contact forms submit
- [ ] Mobile responsiveness
- [ ] Page load speed
- [ ] Email notifications work
- [ ] Search functionality
- [ ] 404 error page

## Troubleshooting

### Common Issues:

**Menus not appearing:**
- Check theme location assignments
- Ensure menu items are published
- Clear cache if using caching plugin

**Styling issues:**
- Check if theme is properly activated
- Verify CSS files are loading
- Check browser console for errors

**Functionality not working:**
- Ensure plugins are activated
- Check PHP error logs
- Verify API keys are configured

**Performance issues:**
- Enable caching
- Optimize images
- Minimize plugins
- Check hosting resources

---

**Need Help?**
- Check plugin documentation
- Review error logs in cPanel/hosting panel
- Test in staging environment first