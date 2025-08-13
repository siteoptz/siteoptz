# AI Tools Data Extraction Template

## 📊 Data Extraction Process

### 1. PRD Analysis
For each AI tool, extract the following from your PRDs:

#### Basic Information
- **Tool Name**: Official product name
- **Vendor/Company**: Company that develops the tool
- **Category**: Primary category (Content Creation, SEO, Social Media, etc.)
- **Description**: 2-3 sentence overview
- **Target Audience**: Who the tool is designed for

#### Features Analysis
- **Core Features**: Main functionality (5-10 key features)
- **Advanced Features**: Premium/enterprise features
- **Integrations**: Third-party platform connections
- **Use Cases**: Primary applications and workflows

#### Pricing Structure
- **Free Tier**: What's included in free version
- **Paid Plans**: Monthly/yearly pricing for each tier
- **Enterprise**: Custom pricing details
- **Trial Period**: Free trial availability and duration

#### Pros & Cons
- **Pros**: 5-8 key benefits and advantages
- **Cons**: 3-5 limitations or drawbacks
- **User Feedback**: Common user complaints and praises

### 2. Keyword Research Analysis
Extract SEO and marketing data:

#### Primary Keywords
- **Main Keyword**: Primary search term (e.g., "ChatGPT")
- **Search Volume**: Monthly search volume
- **CPC**: Cost per click for advertising
- **Competition**: Keyword difficulty score

#### Secondary Keywords
- **Comparison Keywords**: "vs", "alternative", "competitor"
- **Feature Keywords**: Specific functionality terms
- **Use Case Keywords**: Industry/application specific terms
- **Pricing Keywords**: "cost", "pricing", "free trial"

#### Long-tail Keywords
- **Question Keywords**: "How to", "What is", "Why use"
- **Review Keywords**: "review", "comparison", "best"
- **Industry Keywords**: Specific vertical terms

### 3. Normalized Data Schema

```json
{
  "id": "unique-tool-identifier",
  "slug": "url-friendly-slug",
  "name": "Tool Name",
  "logo": "/images/tools/tool-logo.png",
  "description": "2-3 sentence description",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "pricingPlans": [
    {
      "planName": "Free",
      "monthlyPrice": 0,
      "annualPrice": 0,
      "details": "What's included"
    },
    {
      "planName": "Pro",
      "monthlyPrice": 20,
      "annualPrice": 200,
      "details": "What's included"
    }
  ],
  "pros": [
    "Pro 1",
    "Pro 2",
    "Pro 3"
  ],
  "cons": [
    "Con 1",
    "Con 2",
    "Con 3"
  ],
  "faq": [
    {
      "question": "Common question?",
      "answer": "Detailed answer"
    }
  ],
  "relatedKeywords": [
    "keyword1",
    "keyword2",
    "keyword3"
  ],
  "metaTitle": "Tool Name Review & Pricing [2025] | SiteOptz",
  "metaDescription": "Tool description for SEO",
  "schemaType": "SoftwareApplication"
}
```

### 4. Data Validation Checklist

#### Required Fields
- [ ] `id` - Unique identifier
- [ ] `slug` - URL-friendly version of name
- [ ] `name` - Official tool name
- [ ] `description` - Clear overview
- [ ] `features` - Array of key features
- [ ] `pricingPlans` - At least one pricing tier
- [ ] `pros` - Array of benefits
- [ ] `cons` - Array of limitations
- [ ] `faq` - Array of Q&A pairs
- [ ] `relatedKeywords` - SEO keywords
- [ ] `metaTitle` - SEO title
- [ ] `metaDescription` - SEO description

#### Optional Fields
- [ ] `logo` - Tool logo image path
- [ ] `schemaType` - Schema.org type (default: "SoftwareApplication")

### 5. Data Quality Standards

#### Content Guidelines
- **Descriptions**: 150-200 characters, clear and compelling
- **Features**: 8-15 features, specific and actionable
- **Pricing**: Accurate current pricing, include currency
- **Pros/Cons**: Balanced, honest assessment
- **FAQ**: 5-8 common questions with detailed answers
- **Keywords**: 10-20 relevant SEO keywords

#### SEO Guidelines
- **Meta Titles**: 50-60 characters, include tool name and year
- **Meta Descriptions**: 150-160 characters, compelling and descriptive
- **Keywords**: Include primary and secondary keywords
- **Schema**: Proper structured data markup

### 6. Data Entry Process

1. **Research Phase**: Gather all PRD and keyword research data
2. **Extraction Phase**: Fill out the template for each tool
3. **Validation Phase**: Check all required fields and data quality
4. **Review Phase**: Ensure accuracy and completeness
5. **Integration Phase**: Add to aiToolsData.json file

### 7. Example Completed Entry

```json
{
  "id": "chatgpt",
  "slug": "chatgpt",
  "name": "ChatGPT",
  "logo": "/images/tools/chatgpt-logo.png",
  "description": "ChatGPT is an AI-powered conversational assistant developed by OpenAI that can help with writing, coding, analysis, and creative tasks.",
  "features": [
    "Text generation and conversation",
    "Code assistance and debugging",
    "Language translation",
    "Creative writing support",
    "Problem solving",
    "Research assistance",
    "GPT-4 model access",
    "File upload and analysis",
    "Custom instructions",
    "Memory across conversations",
    "Web browsing",
    "Code interpreter",
    "DALL-E integration"
  ],
  "pricingPlans": [
    {
      "planName": "Free",
      "monthlyPrice": 0,
      "annualPrice": 0,
      "details": "Basic access with GPT-3.5 model"
    },
    {
      "planName": "Plus",
      "monthlyPrice": 20,
      "annualPrice": 200,
      "details": "Access to GPT-4, web browsing, code interpreter, and DALL-E"
    },
    {
      "planName": "Enterprise",
      "monthlyPrice": 0,
      "annualPrice": 0,
      "details": "Custom pricing for large organizations"
    }
  ],
  "pros": [
    "Most advanced AI model available",
    "Excellent for general-purpose tasks",
    "Mobile app available",
    "Strong coding capabilities",
    "Regular updates and improvements",
    "Large user community"
  ],
  "cons": [
    "Limited content templates",
    "No brand voice customization",
    "Basic SEO optimization",
    "No built-in plagiarism checker",
    "Limited team collaboration features"
  ],
  "faq": [
    {
      "question": "What is ChatGPT?",
      "answer": "ChatGPT is an AI-powered conversational assistant that can help with writing, coding, analysis, and creative tasks. It's developed by OpenAI and uses advanced language models."
    },
    {
      "question": "How much does ChatGPT cost?",
      "answer": "ChatGPT offers a free tier with GPT-3.5, while ChatGPT Plus costs $20/month and includes access to GPT-4, web browsing, and advanced features."
    }
  ],
  "relatedKeywords": [
    "AI chatbot",
    "OpenAI",
    "GPT-4",
    "conversational AI",
    "text generation",
    "coding assistant"
  ],
  "metaTitle": "ChatGPT Review & Pricing [2025] | SiteOptz",
  "metaDescription": "ChatGPT review: pricing, features, pros & cons, and alternatives. Expert analysis with real user feedback and implementation tips.",
  "schemaType": "SoftwareApplication"
}
```

## 🚀 Next Steps

1. **Gather PRDs**: Collect all existing product requirement documents
2. **Compile Keyword Research**: Aggregate all keyword data and search volumes
3. **Start Extraction**: Use this template to extract data for each tool
4. **Validate Data**: Ensure all required fields are complete and accurate
5. **Update Database**: Add completed entries to aiToolsData.json
6. **Test Pages**: Verify that new tool pages generate correctly

This structured approach will ensure consistent, high-quality data that works perfectly with your auto-generating tool pages!
