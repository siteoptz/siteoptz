# SiteOptz.ai - AI Tool Comparison Platform

A comprehensive AI tool comparison platform built with Next.js, featuring interactive pricing calculators, detailed feature comparisons, and SEO-optimized content.

## 🚀 Features

- **Interactive Tool Comparison**: Side-by-side comparison of AI tools with sortable feature matrices
- **Dynamic Pricing Calculator**: Real-time cost calculations based on team size and usage patterns
- **SEO Optimized**: Complete meta tags, JSON-LD schemas, and semantic HTML
- **Email Lead Capture**: Integrated email collection with multi-platform support
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **FAQ System**: Categorized FAQ sections with expandable answers
- **CTA Components**: Conversion-optimized call-to-action buttons

## 📁 Project Structure

```
siteoptz.ai/
├── components/
│   ├── SEOHead.jsx              # SEO meta tags and schemas
│   ├── CTAButton.jsx            # Call-to-action button components
│   └── comparison/
│       ├── HeroSection.jsx      # Tool comparison hero section
│       ├── ComparisonTable.jsx  # Interactive comparison table
│       ├── PricingCalculator.jsx # Dynamic pricing calculator
│       ├── FAQSection.jsx       # Categorized FAQ component
│       └── EmailCaptureForm.jsx # Lead capture modal
├── data/
│   └── aiToolsData.json         # AI tools database
├── pages/
│   ├── api/
│   │   └── subscribe.js         # Email subscription API endpoint
│   └── compare/
│       ├── index.jsx            # Main comparison hub page
│       ├── [tool].jsx           # Dynamic single tool pages
│       └── chatgpt-vs-claude.jsx # Specific comparison page
├── styles/
│   └── comparisons.css          # Custom CSS styles
└── utils/
    ├── seo.js                   # SEO utility functions
    ├── pricing.js               # Pricing calculation logic
    └── dataHelpers.js           # Data manipulation utilities
```

## 🛠 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with:
   ```env
   # Email Service Configuration
   MAILCHIMP_API_KEY=your_mailchimp_api_key
   MAILCHIMP_AUDIENCE_ID=your_audience_id
   MAILCHIMP_SERVER=us1

   CONVERTKIT_API_KEY=your_convertkit_api_key
   CONVERTKIT_FORM_ID=your_form_id

   HUBSPOT_ACCESS_TOKEN=your_hubspot_token

   SENDGRID_API_KEY=your_sendgrid_api_key
   NOTIFICATION_EMAIL=team@siteoptz.ai
   FROM_EMAIL=noreply@siteoptz.ai
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 📊 AI Tools Data Structure

The platform uses a centralized JSON database (`data/aiToolsData.json`) with the following structure:

```json
{
  "tools": [
    {
      "id": "unique-tool-id",
      "name": "Tool Name",
      "vendor": "Company Name",
      "category": "AI Assistant",
      "description": "Tool description",
      "logo": "/images/tools/tool-logo.png",
      "rating": 4.5,
      "reviewCount": 10000,
      "pricing": {
        "freeTier": true,
        "startingPrice": 20,
        "plans": [...]
      },
      "features": {
        "core": ["Feature 1", "Feature 2"],
        "advanced": ["Advanced Feature 1"],
        "integrations": ["Integration 1"]
      },
      "useCases": ["Use Case 1", "Use Case 2"],
      "targetAudience": ["Developers", "Content Creators"],
      "pros": ["Pro 1", "Pro 2"],
      "cons": ["Con 1", "Con 2"]
    }
  ]
}
```

## 🔧 Key Components

### SEOHead Component
- Dynamic meta tags generation
- JSON-LD schema markup
- Social media optimization
- Canonical URL management

### PricingCalculator Component
- Interactive team size input
- Usage tier selection
- Billing cycle comparison
- Real-time cost calculations
- ROI analysis

### ComparisonTable Component
- Sortable feature comparison
- Category-based filtering
- Winner determination logic
- Mobile-responsive design

### EmailCaptureForm Component
- Lead qualification questions
- Multi-service integration
- Form validation
- Success state handling

## 🎨 Styling

The platform uses a combination of:
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Component-specific styles in `styles/comparisons.css`
- **Responsive Design**: Mobile-first approach
- **Dark Mode Support**: System preference detection

## 📈 SEO Features

- **Dynamic Meta Tags**: Tool-specific titles and descriptions
- **JSON-LD Schemas**: Product, comparison, FAQ, and breadcrumb schemas
- **Semantic HTML**: Proper heading hierarchy and structure
- **Internal Linking**: Strategic cross-linking between comparisons
- **Performance Optimized**: Image optimization and lazy loading

## 📧 Email Integration

The platform supports multiple email marketing services:

- **Mailchimp**: List management and automation
- **ConvertKit**: Creator-focused email marketing
- **HubSpot**: CRM and lead nurturing
- **SendGrid**: Transactional email notifications

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
npm run export
# Deploy the 'out' directory
```

### Traditional Hosting
```bash
npm run build
npm start
```

## 📱 Pages and Routes

- **`/compare`** - Main comparison hub with tool selection
- **`/compare/[tool]`** - Single tool review pages
- **`/compare/chatgpt-vs-claude`** - Specific tool comparison
- **`/api/subscribe`** - Email subscription endpoint

## 🔍 Analytics and Tracking

The platform includes Google Analytics event tracking for:
- Tool selection and comparison starts
- Pricing calculator interactions
- CTA button clicks
- Email form submissions
- FAQ engagement

## 📝 Content Management

To add new AI tools:

1. Update `data/aiToolsData.json` with tool information
2. Add tool logo to `public/images/tools/`
3. Generate new comparison pages automatically through dynamic routing
4. Update any specific comparison pages if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [JSON-LD Schema Documentation](https://json-ld.org/)
- [Mailchimp API Documentation](https://mailchimp.com/developer/)

---

Built with ❤️ for the AI community by SiteOptz