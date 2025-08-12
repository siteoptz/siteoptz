# Comparison Page Component Consistency Guide

## ✅ Standardized Component Order

All comparison pages (`/compare/[slug]`) follow this exact structure:

### 1. Hero Section
- **Location**: `components/comparison/HeroSection.tsx`
- **Elements**:
  - ✅ Tool logos (80x80px, centered in white rounded containers)
  - ✅ Tool names (2xl font-bold)
  - ✅ Tool descriptions/taglines (text-blue-100)
  - ✅ Key features (top 4 core features with checkmarks)
  - ✅ Starting price preview
  - ✅ CTA buttons ("Try {Tool} Free")
- **Styling**: Gradient background (blue-600 via purple-600 to blue-800)

### 2. Interactive Comparison Table
- **Location**: `components/comparison/ComparisonTable.tsx`
- **Elements**:
  - ✅ Side-by-side feature comparison
  - ✅ Pricing comparison (starting price, free plan availability)
  - ✅ User ratings (X/5 ⭐ format)
  - ✅ Review counts (formatted with commas)
  - ✅ Sortable columns
  - ✅ Winner indicators for each row
  - ✅ Category grouping (pricing, features, analysis, reviews)
- **Interactivity**: Click to sort, toggle show all features

### 3. Pricing Calculator
- **Location**: `components/comparison/PricingCalculator.tsx`
- **Parameters**:
  - ✅ Team size (1-1000 users)
  - ✅ Messages per month (100-100,000)
  - ✅ Billing frequency (monthly/yearly)
  - ✅ Premium features toggle
  - ✅ Advanced plan toggle
- **Output**: Real-time cost calculation with savings estimates

### 4. FAQ Section
- **Location**: `components/comparison/FAQSection.tsx`
- **Features**:
  - ✅ Combined FAQs from both tools
  - ✅ Automatic categorization (pricing, features, comparison, usage, general)
  - ✅ Expandable/collapsible accordion interface
  - ✅ Schema markup for FAQPage

### 5. Email Capture & CTA Section
- **Location**: `components/comparison/CTASection.tsx`
- **Elements**:
  - ✅ Tool-specific CTA cards with logos
  - ✅ "Try {Tool} Free" primary buttons
  - ✅ "Learn More" secondary buttons
  - ✅ Email capture form for PDF download
  - ✅ "Download Free PDF" value proposition
  - ✅ Success state handling
  - ✅ Analytics tracking for all clicks

## 🎨 Design Consistency

### Color Scheme
- **Primary**: Blue gradient (blue-600 to purple-600 to blue-800)
- **Secondary**: Purple accents for Tool B
- **Success**: Green (emerald-500)
- **Warning**: Yellow (yellow-400)
- **Text**: White on dark backgrounds, gray-900 on light

### Typography
- **Headlines**: text-4xl md:text-5xl font-bold
- **Subheads**: text-2xl font-bold
- **Body**: text-blue-100 (on dark), text-gray-700 (on light)
- **Small text**: text-sm text-gray-500

### Spacing
- **Section padding**: py-20
- **Container**: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- **Card spacing**: gap-8
- **Internal padding**: p-8

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Default (single column)
- **Tablet**: md: (2 columns for tool cards)
- **Desktop**: lg: (full layout)

### Grid Layouts
- **Hero cards**: grid md:grid-cols-2
- **Comparison table**: Horizontal scroll on mobile
- **Calculator**: grid md:grid-cols-2 lg:grid-cols-4
- **CTA cards**: grid md:grid-cols-2

## 🔧 Technical Standards

### Component Interfaces
All components use consistent `Tool` interface:
```typescript
interface Tool {
  tool_name: string;
  vendor: string;
  logo_url: string;
  description: string;
  features: {
    core: string[];
    advanced: string[];
    integrations: string[];
  };
  pricing: {
    plans: Array<{
      plan_name: string;
      price: string;
      features_included: string[];
    }>;
  };
  rating: number;
  review_count: number;
  // ... other properties
}
```

### Analytics Tracking
- ✅ Affiliate link clicks
- ✅ Email capture events
- ✅ CTA button interactions
- ✅ Feature comparison usage

### SEO Implementation
- ✅ Schema markup (Product, Offer, FAQ, Breadcrumb)
- ✅ Dynamic meta descriptions (155-160 chars)
- ✅ Canonical URLs
- ✅ Internal linking to related comparisons
- ✅ Structured data for rich snippets

## ✅ Quality Checklist

Before deploying any comparison page, verify:

### Content
- [ ] Both tool logos display correctly
- [ ] All pricing information is current
- [ ] Feature lists are comprehensive
- [ ] FAQs are relevant and accurate
- [ ] CTA links work and track properly

### Functionality
- [ ] Comparison table sorts correctly
- [ ] Pricing calculator updates in real-time
- [ ] FAQ accordions expand/collapse
- [ ] Email form submits successfully
- [ ] All buttons track analytics events

### Design
- [ ] Consistent spacing and typography
- [ ] Responsive design works on all devices
- [ ] Colors match brand guidelines
- [ ] Loading states display properly
- [ ] Success messages show correctly

### SEO
- [ ] Meta tags are unique and descriptive
- [ ] Schema markup validates
- [ ] Internal links point to correct pages
- [ ] Page loads in under 3 seconds
- [ ] All images have alt text

## 🚀 Performance Standards

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Page Size**: < 500KB
- **JavaScript Bundle**: < 200KB

This consistency ensures all 78 comparison pages provide identical user experience while maintaining flexibility for different tool combinations.