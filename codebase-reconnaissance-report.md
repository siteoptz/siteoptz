# SiteOptz Codebase Reconnaissance Report

## 1. Stack Analysis
- **Framework**: Next.js 14.0.0 with TypeScript
- **Styling**: Tailwind CSS 3.3.0 with plugins (@tailwindcss/forms, @tailwindcss/typography, @tailwindcss/aspect-ratio)
- **UI Components**: Headless UI, Heroicons, Lucide React (no major UI library)
- **State Management**: React hooks, Next-Auth for authentication
- **Animation**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts, Chart.js, React-ChartJS-2
- **Notifications**: React Hot Toast

## 2. Routing Structure
**Pages-based routing** with key sections:
- `/` - Homepage (index.tsx)
- `/industries/[industry]` - Dynamic industry pages
- `/reviews/[toolName]` - Individual tool reviews 
- `/compare/[tool1]/vs/[tool2]` - Tool comparison pages
- `/tools/` - Various ROI calculators and tools
- `/categories/` - Tool category listings
- `/resources/`, `/guides/`, `/case-studies/` - Content sections
- `/api/` - API routes (70+ endpoints)
- Static pages: about, contact, pricing (disabled), testimonials

## 3. Industry Pages Pattern (`/industries/legal-compliance`)
**Components Used**:
- Dynamic route: `pages/industries/[industry].tsx`
- Data source: `content/industryContent.ts` (typed interfaces)
- Layout: Hero → Introduction → Business Cases → Implementation Examples → Benefits → FAQ → CTA

**Props/Data**:
- `industry`: String (industry name)
- `content`: IndustryContent interface from industryContent.ts
- `slug`: URL slug for routing

**Shared Layout**: Uses consistent dark theme styling (`bg-gradient-to-br from-black via-gray-900 to-black`), includes structured data for SEO (Service, FAQ, Breadcrumb schemas)

## 4. Pricing Component Pattern
**Data Source**: `public/data/aiToolsData.json` (single source of truth)
- Individual tool pricing stored in JSON with structure:
```json
"pricing": [
  {"plan": "Monthly", "price_per_month": 14, "billing_period": "monthly", "features": [...]}
]
```
- No centralized "Free/Starter/Pro/Enterprise" tiers - pricing is tool-specific
- Pricing is pulled from aiToolsData.json and rendered in tool review pages

## 5. Form/Lead-Capture Pattern
**Contact Form** (`pages/contact.tsx`):
- **Framework**: React Hook Form with manual validation
- **Submission**: Form posts to internal API endpoints
- **Validation**: Custom validation functions (validateField)
- **Integration**: GoHighLevel booking widget embedded
- **Lead Flow**: Forms → API routes → External CRM systems (configurable)

**Additional Forms**:
- Newsletter signup components
- ROI calculator forms throughout `/tools/` pages
- Booking widget integration (GoHighLevel)

## 6. Analytics Setup
**Multi-layered tracking**:
- **Google Analytics 4**: `G-06WK4MZERF` (hardcoded in _document.tsx)
- **Vercel Analytics**: `@vercel/analytics/react` component
- **Custom Analytics**: `utils/analytics-init.js` with key events tracking
- **Integration**: Initialized in _app.tsx, tracks route changes automatically
- **Enhanced Measurement**: Scroll, outbound clicks, site search, video engagement enabled

The codebase uses a comprehensive analytics stack with both first-party (Vercel) and third-party (GA4) tracking, plus custom event tracking for business metrics.