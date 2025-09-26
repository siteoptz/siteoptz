# Reusable Page Templates

This directory contains three reusable Next.js/React page templates for SiteOptz.ai's AI tool comparison platform.

## 📁 Templates Overview

### 1. `comparison.jsx` - Head-to-Head Comparisons
For comparing two specific AI tools (e.g., "ChatGPT vs Claude")

### 2. `review.jsx` - Single Tool Deep Dives  
For comprehensive reviews of individual AI tools

### 3. `ranking.jsx` - Multi-Tool Ranking Pages
For ranking multiple tools in a category (e.g., "Top 10 AI Writing Tools")

## 🧩 Required Components

All templates use these shared components:

- `../components/table.jsx` - Sortable comparison table
- `../components/pricing-calculator.jsx` - Interactive pricing calculator
- `../components/faq.jsx` - Expandable FAQ section

## 📋 Template Features

### ✅ All Templates Include:
- **Hero Section** with headline, subheading, and CTA button
- **SEO Meta Tags** pulled dynamically from tool data
- **Structured Data** (Schema.org) for search engines
- **Fully Responsive Design** with Tailwind CSS
- **Email Capture Form** integrated with CRM API
- **Related Links Section** for internal linking
- **Open Graph & Twitter Cards** for social sharing

### 🔧 Technical Features:
- **Dynamic Data Binding** from `tool_data.json`
- **Server-Side Rendering** with Next.js
- **Performance Optimized** with proper caching
- **Accessibility Compliant** with ARIA labels
- **SEO Optimized** with proper heading hierarchy

## 🚀 Usage Examples

### 1. Comparison Template Usage

```jsx
import ComparisonTemplate from '../templates/comparison';
import toolData from '../data/tool_data.json';

export default function ChatGPTVsClaude() {
  const chatgpt = toolData.find(t => t.tool_name === 'ChatGPT');
  const claude = toolData.find(t => t.tool_name === 'Claude');
  
  return (
    <ComparisonTemplate
      tool1={chatgpt}
      tool2={claude}
      headline="ChatGPT vs Claude: Complete Comparison [2025]"
      subheading="Which AI assistant is better for your needs? We compare features, pricing, and performance."
      ctaText="Compare Now"
      ctaLink="#comparison"
      comparisonPoints={[
        'Starting Price',
        'Free Plan',
        'Key Features',
        'Best For',
        'Rating',
        'Pros',
        'Cons'
      ]}
      faqs={[
        {
          question: "Which is better for coding?",
          answer: "ChatGPT excels at code generation while Claude is better at code analysis and explanation."
        }
      ]}
      relatedTools={[
        toolData.find(t => t.tool_name === 'Perplexity'),
        toolData.find(t => t.tool_name === 'Gemini')
      ]}
    />
  );
}
```

### 2. Review Template Usage

```jsx
import ReviewTemplate from '../templates/review';
import toolData from '../data/tool_data.json';

export default function JasperAIReview() {
  const jasper = toolData.find(t => t.tool_name === 'Jasper AI');
  
  return (
    <ReviewTemplate
      tool={jasper}
      headline="Jasper AI Review: Complete Guide [2025]"
      subheading="Is Jasper AI worth the investment? Our comprehensive review covers everything you need to know."
      ctaText="Try Jasper AI"
      ctaLink="https://jasper.ai"
      pros={[
        "Excellent content quality",
        "User-friendly interface",
        "Great for marketing content",
        "Strong brand voice features"
      ]}
      cons={[
        "Can be expensive",
        "Limited free plan",
        "Steep learning curve"
      ]}
      faqs={[
        {
          question: "How much does Jasper AI cost?",
          answer: "Jasper AI starts at $39/month for the Creator plan and goes up to $99/month for Teams."
        }
      ]}
      relatedTools={[
        toolData.find(t => t.tool_name === 'Copy.ai'),
        toolData.find(t => t.tool_name === 'ChatGPT')
      ]}
      reviewContent={
        <div>
          <h3>Our Experience with Jasper AI</h3>
          <p>After testing Jasper AI for 3 months, we found it to be an excellent tool for content creation...</p>
        </div>
      }
    />
  );
}
```

### 3. Ranking Template Usage

```jsx
import RankingTemplate from '../templates/ranking';
import toolData from '../data/tool_data.json';

export default function TopAIWritingTools() {
  const writingTools = toolData.filter(t => 
    t.target_keywords.some(k => k.includes('writing') || k.includes('content'))
  );
  
  return (
    <RankingTemplate
      tools={writingTools}
      headline="Top 10 AI Writing Tools in 2025"
      subheading="The best AI-powered writing assistants ranked by performance, features, and value."
      ctaText="Compare All Tools"
      ctaLink="#ranking"
      category="AI Writing Tools"
      rankingCriteria={[
        "Content Quality",
        "Ease of Use", 
        "Pricing",
        "Features",
        "Customer Support",
        "Performance"
      ]}
      faqs={[
        {
          question: "What is the best free AI writing tool?",
          answer: "ChatGPT offers the best free tier for general writing, while Copy.ai has a generous free plan for marketing content."
        }
      ]}
      relatedCategories={[
        {
          name: "SEO Tools",
          description: "AI-powered SEO optimization tools",
          link: "/seo-tools-ranking"
        },
        {
          name: "Design Tools", 
          description: "AI design and visual content tools",
          link: "/design-tools-ranking"
        }
      ]}
    />
  );
}
```

## 📊 Data Structure Requirements

### Tool Object Structure:
```json
{
  "tool_name": "Tool Name",
  "description": "Tool description",
  "key_features": ["Feature 1", "Feature 2"],
  "pricing": {
    "free": "Free plan details",
    "basic": "Basic plan - $X/month - details",
    "pro": "Pro plan - $X/month - details",
    "enterprise": "Enterprise plan details"
  },
  "target_keywords": ["keyword1", "keyword2"],
  "meta_description": "SEO description",
  "schema_type": "SoftwareApplication"
}
```

### FAQ Object Structure:
```json
{
  "question": "FAQ question?",
  "answer": "FAQ answer text."
}
```

## 🎨 Customization Options

### Styling:
- All templates use Tailwind CSS classes
- Color scheme: Indigo/Purple gradient theme
- Responsive breakpoints: sm, md, lg, xl
- Customizable via Tailwind config

### Content:
- Dynamic data binding from JSON files
- Customizable hero sections
- Flexible FAQ content
- Optional review content sections

### SEO:
- Dynamic meta tags from tool data
- Structured data generation
- Open Graph and Twitter Cards
- Internal linking structure

## 🔧 Integration Points

### CRM Integration:
```jsx
// Email capture form submission
const handleEmailSubmit = async (email) => {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    // Handle response
  } catch (error) {
    console.error('Subscription error:', error);
  }
};
```

### Analytics Integration:
```jsx
// Track page views and interactions
useEffect(() => {
  // Google Analytics
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_title: headline,
    page_location: window.location.href
  });
}, [headline]);
```

## 📈 Performance Optimization

### Best Practices:
- Use `next/image` for optimized images
- Implement proper caching strategies
- Lazy load non-critical components
- Optimize bundle sizes with code splitting

### SEO Optimization:
- Proper heading hierarchy (H1 → H2 → H3)
- Meta descriptions under 155 characters
- Structured data for rich snippets
- Internal linking for site authority

## 🚀 Deployment

### Build Process:
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables:
```env
NEXT_PUBLIC_SITE_URL=https://siteoptz.ai
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
CRM_API_KEY=your_crm_api_key
```

## 📝 Maintenance

### Regular Updates:
- Update tool data in `tool_data.json`
- Refresh pricing information monthly
- Update FAQ content based on user feedback
- Monitor and optimize page performance

### Content Management:
- Use the data source layer for dynamic content
- Implement CMS integration for easy updates
- Set up automated data validation
- Create content update workflows

---

**Created for SiteOptz.ai**  
**Version:** 1.0.0  
**Last Updated:** December 2024


