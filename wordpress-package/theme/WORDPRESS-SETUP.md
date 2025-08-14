# 🔗 WordPress Pages Setup Guide

## 📄 **Create These WordPress Pages**

After installing the theme, you need to create the actual WordPress pages that will use the templates.

### **Step 1: Create Pricing Page**

1. **WordPress Admin** → **Pages** → **Add New**
2. **Title:** "Pricing" 
3. **Slug:** "pricing" (in Permalink settings)
4. **Page Attributes** → **Template:** "Pricing Page"
5. **Content:** (optional, the template handles everything)
6. **Publish**

**Result:** `siteoptz.ai/pricing/` will now show the pricing page

### **Step 2: Create Comparisons Page**

1. **WordPress Admin** → **Pages** → **Add New**
2. **Title:** "Comparisons"
3. **Slug:** "comparisons"
4. **Page Attributes** → **Template:** "AI Tools Comparisons"
5. **Content:** (optional, template handles content)
6. **Publish**

**Result:** `siteoptz.ai/comparisons/` will now work

### **Step 3: Create Navigation Menu**

1. **WordPress Admin** → **Appearance** → **Menus**
2. **Create a new menu** → Name: "Main Menu"
3. **Add menu items:**
   - Home (link to homepage)
   - AI Tools (link to `/ai-tools/`)
   - Categories (custom link to `/category/ai-writing/`)
   - Comparisons (link to your Comparisons page)
   - Pricing (link to your Pricing page)
4. **Menu Settings** → Check "Primary Menu"
5. **Save Menu**

### **Step 4: Fix Category Links**

The theme creates AI tool categories automatically. To access them:

1. **WordPress Admin** → **AI Tools** → **AI Categories**
2. You'll see categories like:
   - Chatbots (slug: `chatbots`)
   - Image Generation (slug: `image-generation`)
   - Code Assistant (slug: `code-assistant`)
   - Writing (slug: `writing`)
   - Video Creation (slug: `video-creation`)
   - Data Analysis (slug: `data-analysis`)

**URLs will be:**
- `siteoptz.ai/ai-category/writing/`
- `siteoptz.ai/ai-category/chatbots/`
- etc.

### **Step 5: Set Homepage**

**Option A: Use Built-in Homepage**
- The theme's `index.php` already includes hero section, categories, tools grid, and get-started section
- Just keep default WordPress settings

**Option B: Create Custom Homepage**
1. **Pages** → **Add New**
2. **Title:** "Homepage"
3. **Content:** Add shortcodes:
```
[ai_tools_grid count="6" columns="3"]

<h2>Compare AI Tools</h2>
[ai_comparison tools="ChatGPT,Midjourney,GitHub Copilot"]

<h2>Calculate ROI</h2>
[ai_calculator]

<h2>FAQ</h2>
[ai_faq]
```
4. **Settings** → **Reading** → **Static Page** → Select your page

### **Step 6: Create Individual Tool Pages**

AI tools are automatically created with the theme. To add more:

1. **AI Tools** → **Add New**
2. Fill in all fields:
   - Title: "Tool Name"
   - Content: Tool description
   - Featured Image: Tool logo/screenshot
   - Price: "Free", "$20/mo", etc.
   - Website URL: Official tool website
   - Rating: 1-5 stars
   - Features: Comma-separated list
   - Pros: Comma-separated list
   - Cons: Comma-separated list
3. **Assign Category**
4. **Publish**

---

## 🔧 **Fix Your Specific URLs**

### **For `siteoptz.ai/pricing/`:**
✅ Create "Pricing" page with "Pricing Page" template

### **For `siteoptz.ai/comparisons/`:**
✅ Create "Comparisons" page with "AI Tools Comparisons" template

### **For `siteoptz.ai/category/ai-writing/`:**
- Check **AI Tools** → **AI Categories**
- Look for "Writing" category
- URL should be `/ai-category/writing/` (not `/category/ai-writing/`)
- Or create a redirect from `/category/ai-writing/` to `/ai-category/writing/`

### **For `siteoptz.ai/#get-started`:**
✅ Already added to homepage - scroll down to see "Get Started" section

---

## 📋 **Quick Checklist**

- [ ] Install and activate theme
- [ ] Verify 6 sample AI tools were created
- [ ] Create "Pricing" page with template
- [ ] Create "Comparisons" page with template  
- [ ] Set up navigation menu
- [ ] Check category URLs work
- [ ] Test homepage get-started section

---

## 🎯 **Testing Your Pages**

1. **Pricing Page:**
   - Should show interactive pricing cards
   - Filter buttons should work
   - ROI calculator should function
   - Comparison table should display

2. **Comparisons Page:**
   - Category cards should be clickable
   - Comparison tables should load
   - Interactive elements should work

3. **Category Pages:**
   - Should show tools in that category
   - Comparison tables with category tools
   - FAQ specific to category

4. **Homepage:**
   - Hero section with search
   - Categories grid
   - Recent tools display
   - Get-started section at bottom

---

## 🔄 **Permalink Settings**

Make sure your WordPress permalinks are set correctly:

1. **Settings** → **Permalinks**
2. Choose "Post name" or "Custom Structure: `/%postname%/`"
3. **Save Changes**

This ensures clean URLs like `/pricing/` instead of `/?page_id=123`

---

## 🛠️ **If Links Still Don't Work**

1. **Check if pages exist:**
   - Go to **Pages** → **All Pages**
   - Confirm "Pricing" and "Comparisons" pages exist

2. **Check templates are assigned:**
   - Edit each page
   - Verify correct template is selected in Page Attributes

3. **Check menu setup:**
   - **Appearance** → **Menus**
   - Ensure menu is assigned to "Primary Menu" location

4. **Flush permalinks:**
   - **Settings** → **Permalinks** → **Save Changes** (this refreshes URL structure)

**All your links should now work properly!**