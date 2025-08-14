# Next.js + Tailwind AI Tools Components

## 🎯 Overview

This is a complete set of reusable Next.js components with Tailwind CSS styling for building an AI tools comparison website. The components are designed to work with the existing `aiToolsData.json` and `faqData.json` structure.

## 📦 Components

### 1. **ToolComparisonTable** (`ToolComparisonTable.tsx`)
Interactive comparison table for comparing multiple AI tools side-by-side.

**Features:**
- Select up to 4 tools for comparison
- Star ratings for benchmarks
- Pros/cons visualization
- Responsive design with sticky headers
- Dynamic tool selection

**Usage:**
```tsx
<ToolComparisonTable 
  tools={tools} 
  defaultSelected={['chatgpt', 'claude', 'gemini']}
/>
```

### 2. **PricingCalculator** (`PricingCalculator.tsx`)
Advanced pricing calculator with email capture for lead generation.

**Features:**
- Multi-tool selection
- User/seat calculation
- Annual savings estimation
- Email capture form
- Plan customization
- Real-time total calculation

**Usage:**
```tsx
<PricingCalculator 
  tools={tools} 
  onEmailSubmit={(email, selectedTools) => {
    // Handle email submission
  }}
/>
```

### 3. **FAQSection** (`FAQSection.tsx`)
Expandable FAQ section with search and schema markup.

**Features:**
- Search functionality
- Expand/collapse all
- JSON-LD schema integration
- Related questions
- Smooth animations
- Show more/less pagination

**Usage:**
```tsx
<FAQSection 
  faqs={faqs} 
  toolName="ChatGPT"
  showSearch={true}
  maxInitialDisplay={5}
/>
```

## 📁 Data Structure

The components expect data in this format:

### Tool Data (`aiToolsData.json`)
```json
{
  "id": "chatgpt",
  "slug": "chatgpt",
  "name": "ChatGPT",
  "logo": "/images/tools/chatgpt-logo.png",
  "meta": {
    "title": "...",
    "description": "..."
  },
  "overview": {
    "developer": "OpenAI",
    "release_year": 2022,
    "description": "..."
  },
  "features": ["..."],
  "pros": ["..."],
  "cons": ["..."],
  "pricing": [
    {
      "plan": "Free",
      "price_per_month": 0,
      "features": ["..."]
    }
  ],
  "benchmarks": {
    "speed": 9.0,
    "accuracy": 8.5,
    "integration": 8.0,
    "ease_of_use": 9.0,
    "value": 8.5
  },
  "related_tools": ["claude", "gemini"]
}
```

### FAQ Data (`faqData.json`)
```json
{
  "chatgpt": [
    {
      "question": "What is ChatGPT?",
      "answer": "...",
      "schema": {
        "@type": "Question",
        "name": "...",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "..."
        }
      }
    }
  ]
}
```

## 🚀 Page Examples

### Individual Tool Page (`pages/tools/[slug].tsx`)
Dynamic pages for each AI tool with:
- Tool overview and scoring
- Features grid
- Pros/cons comparison
- Pricing plans
- Pricing calculator
- Comparison with alternatives
- FAQ section

### Comparison Page (`pages/tools/compare.tsx`)
Main comparison page featuring:
- Interactive comparison table
- Multi-tool pricing calculator
- Combined FAQ section
- Email capture for leads

## 🎨 Styling

All components use:
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Responsive design** (mobile-first)
- **Gradient backgrounds** for visual appeal
- **Shadow effects** for depth
- **Smooth animations** for interactions

## 📋 Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0",
    "tailwindcss": "^3.3.0"
  }
}
```

## 🔧 Installation

1. Copy all component files to your `components/` directory
2. Copy page templates to your `pages/` directory
3. Ensure data files are in `public/data/`
4. Install dependencies:
```bash
npm install lucide-react
```

## 🌟 Features

- ✅ **SEO Optimized**: Schema markup, meta tags, structured data
- ✅ **Performance**: Static generation, lazy loading, optimized images
- ✅ **Lead Generation**: Email capture, pricing calculator
- ✅ **Responsive**: Mobile, tablet, and desktop layouts
- ✅ **Interactive**: Dynamic comparisons, real-time calculations
- ✅ **Accessible**: ARIA labels, keyboard navigation
- ✅ **Type-Safe**: Full TypeScript support

## 📱 Mobile Optimization

All components are fully responsive with:
- Touch-friendly interfaces
- Horizontal scrolling for tables
- Collapsible sections
- Optimized font sizes
- Proper tap targets

## 🔄 Updates

To add new tools:
1. Update `aiToolsData.json` with tool data
2. Add FAQs to `faqData.json`
3. Run build process
4. Deploy changes

## 📈 Analytics Integration

Components emit events for:
- Tool selection
- Email capture
- FAQ interactions
- Pricing calculations

Integrate with your analytics provider (GA4, Mixpanel, etc.) by adding event handlers to the component props.

## 🚢 Production Checklist

- [ ] Update tool logos to WebP format
- [ ] Configure email API endpoint
- [ ] Set up analytics tracking
- [ ] Test all responsive breakpoints
- [ ] Validate schema markup
- [ ] Optimize images
- [ ] Set up CDN for assets
- [ ] Configure caching headers

## 📝 License

Components are ready for production use on SiteOptz.ai

---

Built with Next.js, Tailwind CSS, and optimized for AI tool comparison websites.