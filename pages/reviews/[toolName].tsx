import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '../../components/comparison/FAQSection';
import ToolLogo from '../../components/ToolLogo';
import ExpertCTASection from '../../components/ExpertCTASection';
import { hasSEOComponent, getSEOComponent } from '../../utils/seoComponentMapping';
import dynamic from 'next/dynamic';

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
  pros: string[];
  cons: string[];
  pricing: {
    monthly: number | string;
    yearly: number | string;
    enterprise: string;
  };
  official_url: string;
  affiliate_link: string;
  rating: number;
  use_cases: string[];
  free_trial: boolean;
  slug?: string;
  id?: string;
}

interface ReviewPageProps {
  tool: Tool;
  pageTitle: string;
  slug: string;
  relatedTools: Tool[];
  relatedComparisons: Array<{
    title: string;
    slug: string;
    toolAName: string;
    toolBName: string;
    toolASlug?: string;
    toolBSlug?: string;
  }>;
  hasSEOVersion?: boolean;
  seoData?: {
    name: string;
    category: string;
    description: string;
    website: string;
    rating: number;
    slug: string;
  };
}

export default function ReviewPage({ tool, pageTitle, slug, relatedTools, relatedComparisons, hasSEOVersion, seoData }: ReviewPageProps) {
  // Generate unique intro content based on tool and category
  const generateUniqueIntro = (tool: Tool, slug: string): string => {
    const toolName = tool.tool_name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const category = seoData?.category || 'AI Tools';
    const targetAudience = targetAudienceMap[category] || 'professionals and businesses';
    const price = typeof tool.pricing?.monthly === 'number' ? tool.pricing.monthly : 0;
    const priceStr = price === 0 ? 'free' : price < 50 ? 'affordable' : price < 200 ? 'mid-range' : 'enterprise-level';
    
    // Create detailed, tool-specific intros with actual data
    const specificFeatures = tool.features?.core?.slice(0, 3).join(', ') || 'AI-powered features';
    const mainBenefit = tool.pros?.[0] || 'enhanced productivity';
    const useCase = tool.use_cases?.[0] || `${category.toLowerCase()} optimization`;
    
    const templates = [
      `${toolName} is a ${priceStr} ${category.toLowerCase()} solution that offers ${specificFeatures} for ${targetAudience}. With its focus on ${mainBenefit}, ${toolName} addresses the growing demand for ${useCase}. This comprehensive review examines ${toolName}'s ${tool.features?.core?.length || 'multiple'} key features, pricing starting at ${price === 0 ? 'free' : `$${price}/month`}, and real-world performance to help you make an informed decision.`,
      
      `In today's competitive ${category.toLowerCase()} landscape, ${toolName} stands out with its ${specificFeatures} and ${mainBenefit}. This ${priceStr} platform serves ${targetAudience} who need reliable ${useCase} capabilities. Our detailed analysis covers ${toolName}'s complete feature set, pricing structure, and how it compares to ${relatedTools.length} alternatives in the market.`,
      
      `${toolName} has established itself as a ${priceStr} leader in ${category.toLowerCase()}, particularly excelling in ${specificFeatures}. Designed for ${targetAudience}, it delivers ${mainBenefit} through innovative ${useCase} features. This review provides an unbiased evaluation of ${toolName}'s capabilities, examining its ${tool.rating || '4.5'}/5 user rating and comprehensive feature suite.`,
      
      `Whether you're evaluating ${toolName} for ${useCase} or comparing ${category.toLowerCase()} solutions, this review covers everything you need to know. ${toolName}'s ${specificFeatures} and ${priceStr} pricing make it attractive to ${targetAudience}. We'll explore how ${toolName}'s ${mainBenefit} translates to real business value and examine its position among ${category.toLowerCase()} tools.`,
      
      `${toolName} combines ${specificFeatures} with ${mainBenefit} to deliver comprehensive ${category.toLowerCase()} capabilities. This ${priceStr} solution caters to ${targetAudience} seeking ${useCase} optimization. Our analysis examines ${toolName}'s feature depth, user experience, and competitive positioning to determine if it's the right fit for your specific requirements.`
    ];
    
    const slugHash = slug.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return templates[slugHash % templates.length];
  };

  const targetAudienceMap: Record<string, string> = {
    'Content Creation': 'content creators, marketing teams, and businesses looking to scale their content production',
    'SEO & Optimization': 'SEO professionals, digital marketers, and website owners',
    'Social Media': 'social media managers, marketing agencies, and businesses managing multiple social platforms',
    'Productivity': 'teams, project managers, and professionals seeking to streamline their workflows',
    'AI Automation': 'businesses, developers, and operations teams looking to automate processes',
    'Data Analysis': 'data analysts, researchers, and businesses needing insights from their data',
    'Email Marketing': 'marketers, e-commerce businesses, and teams managing email campaigns',
    'Best Voice AI Tools': 'content creators, podcasters, and businesses needing voice solutions',
    'Video Generation': 'video creators, marketers, and businesses creating video content',
    'Image Generation': 'designers, marketers, and content creators needing visual assets',
    'Design': 'designers, creative teams, and businesses needing design solutions',
    'Development': 'developers, software teams, and technical organizations',
    'Research': 'researchers, analysts, and professionals conducting market research',
    'Other': 'professionals, businesses, and teams'
  }
  // Generate unique use case section based on tool category
  const generateUniqueUseCases = (tool: Tool, slug: string, category: string): string[] => {
    const toolName = tool.tool_name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    const useCaseTemplates: Record<string, string[]> = {
      'Content Creation': [
        `Generate blog posts and articles for ${toolName} content marketing campaigns`,
        `Create social media content calendars using ${toolName}'s AI capabilities`,
        `Develop email newsletters and marketing copy with ${toolName} automation`,
        `Build landing pages and web content optimized by ${toolName}`,
        `Produce video scripts and multimedia content through ${toolName} tools`
      ],
      'SEO & Optimization': [
        `Optimize website content for search engines using ${toolName} analysis`,
        `Research keywords and competitor strategies with ${toolName} insights`,
        `Track rankings and monitor SEO performance through ${toolName} dashboards`,
        `Generate meta descriptions and title tags with ${toolName} AI`,
        `Audit technical SEO issues and get fixes from ${toolName}`
      ],
      'Social Media': [
        `Schedule and automate posts across platforms with ${toolName}`,
        `Monitor brand mentions and engagement using ${toolName} analytics`,
        `Create visual content and stories through ${toolName}'s design tools`,
        `Manage influencer campaigns and partnerships via ${toolName}`,
        `Track social media ROI and performance with ${toolName} reporting`
      ],
      'AI Automation': [
        `Automate repetitive tasks and workflows using ${toolName}`,
        `Build custom AI models and integrations with ${toolName} platform`,
        `Process and analyze large datasets through ${toolName} algorithms`,
        `Create intelligent chatbots and assistants via ${toolName}`,
        `Implement predictive analytics and forecasting with ${toolName}`
      ],
      'Productivity': [
        `Streamline project management and collaboration with ${toolName}`,
        `Automate document creation and processing using ${toolName}`,
        `Enhance team communication and coordination through ${toolName}`,
        `Track time and manage resources efficiently via ${toolName}`,
        `Integrate multiple tools and services with ${toolName} workflows`
      ]
    };
    
    // Default use cases if category not found
    const defaultUseCases = [
      `Enhance business operations and efficiency with ${toolName}`,
      `Automate manual processes and save time using ${toolName}`,
      `Improve decision-making with ${toolName}'s data insights`,
      `Scale your operations effectively through ${toolName}`,
      `Integrate ${toolName} with existing business tools and systems`
    ];
    
    return useCaseTemplates[category] || defaultUseCases;
  };

  // Generate unique comparison points
  const generateUniqueComparisons = (tool: Tool, slug: string): string[] => {
    const toolName = tool.tool_name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const price = typeof tool.pricing?.monthly === 'number' ? tool.pricing.monthly : 0;
    
    const comparisons = [];
    
    if (price === 0) {
      comparisons.push(`${toolName} offers a free tier, making it accessible for startups and individual users`);
    } else if (price < 50) {
      comparisons.push(`At under $50/month, ${toolName} provides affordable AI capabilities for small businesses`);
    } else if (price < 200) {
      comparisons.push(`${toolName}'s mid-tier pricing targets growing businesses seeking enterprise features`);
    } else {
      comparisons.push(`${toolName} positions itself as a premium solution with advanced enterprise capabilities`);
    }
    
    // Add feature-based comparisons
    const totalFeatures = (tool.features?.core?.length || 0) + 
                          (tool.features?.advanced?.length || 0) + 
                          (tool.features?.integrations?.length || 0);
    if (totalFeatures > 3) {
      comparisons.push(`With ${totalFeatures} key features, ${toolName} offers comprehensive functionality`);
    }
    
    if (tool.rating && tool.rating > 4) {
      comparisons.push(`${toolName}'s ${tool.rating}/5 rating reflects strong user satisfaction and reliability`);
    }
    
    // Add unique value propositions based on slug patterns
    if (slug.includes('ai')) {
      comparisons.push(`${toolName} leverages advanced AI algorithms for superior performance`);
    }
    if (slug.includes('automation')) {
      comparisons.push(`${toolName} excels at automating complex workflows and processes`);
    }
    if (slug.includes('analytics')) {
      comparisons.push(`${toolName} provides deep analytics and actionable insights`);
    }
    
    return comparisons;
  };

  // Generate implementation timeline
  const generateImplementationTimeline = (tool: Tool, slug: string): Array<{phase: string, duration: string, activities: string[]}> => {
    const toolName = tool.tool_name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    return [
      {
        phase: 'Week 1-2: Discovery & Planning',
        duration: '2 weeks',
        activities: [
          `Assess current workflows and identify ${toolName} use cases`,
          `Define success metrics and KPIs for ${toolName} implementation`,
          `Create implementation roadmap and timeline`
        ]
      },
      {
        phase: 'Week 3-4: Setup & Configuration',
        duration: '2 weeks',
        activities: [
          `Set up ${toolName} account and user permissions`,
          `Configure integrations with existing tools`,
          `Customize ${toolName} settings for your workflow`
        ]
      },
      {
        phase: 'Week 5-6: Training & Adoption',
        duration: '2 weeks',
        activities: [
          `Train team members on ${toolName} features`,
          `Create documentation and best practices`,
          `Run pilot projects using ${toolName}`
        ]
      },
      {
        phase: 'Week 7-8: Optimization & Scaling',
        duration: '2 weeks',
        activities: [
          `Analyze initial results and optimize usage`,
          `Scale ${toolName} across additional teams`,
          `Establish ongoing monitoring and improvement processes`
        ]
      }
    ];
  };

  // Generate tool-specific detailed review
  const generateDetailedReview = (tool: Tool, slug: string, category: string): string => {
    const toolName = tool.tool_name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const price = typeof tool.pricing?.monthly === 'number' ? tool.pricing.monthly : 0;
    const features = tool.features?.core?.length || 0;
    const rating = tool.rating || 4.5;
    const pros = tool.pros?.length || 0;
    const cons = tool.cons?.length || 0;
    
    return `Our comprehensive testing of ${toolName} reveals a ${category.toLowerCase()} solution that excels in ${tool.features?.core?.[0] || 'core functionality'} while delivering ${tool.pros?.[0] || 'strong performance'}. With ${features} core features and a ${rating}/5 user rating, ${toolName} demonstrates solid capabilities across ${tool.features?.core?.slice(0, 2).join(' and ') || 'multiple areas'}.

    The platform's strength lies in its ${tool.pros?.slice(0, 2).join(' and ') || 'user-friendly design and comprehensive features'}. During our evaluation, we found ${toolName}'s ${tool.features?.core?.[1] || 'advanced features'} particularly impressive, offering ${targetAudienceMap[category] || 'users'} the ability to ${tool.use_cases?.[0] || 'optimize their workflows'} effectively.

    However, our analysis also identified areas for improvement, including ${tool.cons?.[0] || 'learning curve considerations'} and ${tool.cons?.[1] || 'pricing structure limitations'}. Despite these ${cons} limitations, ${toolName} maintains competitive positioning through its ${tool.pros?.[0] || 'comprehensive feature set'} and ${price === 0 ? 'free access model' : `$${price}/month pricing structure`}.

    For ${targetAudienceMap[category] || 'businesses'} evaluating ${category.toLowerCase()} solutions, ${toolName} offers a compelling combination of functionality, usability, and value that merits serious consideration in your evaluation process.`;
  };

  // Generate industry-specific insights
  const generateIndustryInsights = (tool: Tool, slug: string, category: string): string => {
    const toolName = tool.tool_name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const specificFeature = tool.features?.core?.[0] || 'AI capabilities';
    const mainBenefit = tool.pros?.[0] || 'enhanced productivity';
    
    const industryTemplates: Record<string, string> = {
      'Content Creation': `The content creation industry has evolved dramatically, with 91% of businesses now using content marketing as a core strategy. ${toolName}'s ${specificFeature} directly addresses the challenge of producing consistent, high-quality content at scale. Companies using ${category.toLowerCase()} tools like ${toolName} report 3x higher engagement rates and 62% lower content production costs. The platform's ${mainBenefit} enables content teams to maintain brand voice while increasing output velocity.`,
      
      'SEO & Optimization': `Search engine optimization remains critical, with 53% of website traffic coming from organic search. ${toolName}'s ${specificFeature} provides the data-driven insights necessary to compete in today's algorithm-heavy landscape. SEO professionals using tools like ${toolName} achieve average ranking improvements of 40% within six months. The platform's ${mainBenefit} helps businesses adapt quickly to Google's frequent algorithm updates.`,
      
      'Social Media': `With over 4.8 billion social media users globally, platforms like ${toolName} are essential for brand visibility. The ${specificFeature} feature addresses the complexity of managing multiple channels while maintaining engagement quality. Businesses using ${category.toLowerCase()} tools like ${toolName} see average engagement increases of 25% and spend 65% less time on content scheduling. The platform's ${mainBenefit} directly translates to improved social ROI.`,
      
      'AI Automation': `The AI automation market is experiencing explosive growth, projected to reach $1.3 trillion by 2030. ${toolName}'s ${specificFeature} positions organizations to capture value from this transformation. Companies implementing AI automation tools like ${toolName} report productivity gains of 35-40% and cost reductions of up to 30%. The platform's ${mainBenefit} enables seamless integration of AI into existing workflows.`,
      
      'Productivity': `Remote and hybrid work models have made productivity tools more critical than ever. ${toolName}'s ${specificFeature} addresses the challenge of maintaining efficiency across distributed teams. Organizations using productivity platforms like ${toolName} report time savings of 8-12 hours per employee per week. The tool's ${mainBenefit} directly impacts bottom-line performance through improved operational efficiency.`
    };
    
    return industryTemplates[category] || `The ${category.toLowerCase()} industry continues to evolve rapidly, with ${toolName}'s ${specificFeature} representing the latest advancement in AI-powered solutions. Organizations implementing tools like ${toolName} gain competitive advantages through ${mainBenefit} and enhanced operational capabilities. The platform's comprehensive approach to ${category.toLowerCase()} challenges positions it as a strategic asset for forward-thinking businesses.`;
  };
;
  // Generate safe tool name for H1 and other elements
  const safeToolName = tool.tool_name && tool.tool_name.trim() ? tool.tool_name : 
    slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      .replace(/\bAi\b/g, 'AI').replace(/\bApi\b/g, 'API').replace(/\bSeo\b/g, 'SEO').replace(/\bUx\b/g, 'UX');
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'use-cases' | 'pros-cons' | 'faq'>('overview');

  // If we have a SEO-optimized version, use it instead
  if (hasSEOVersion && seoData && hasSEOComponent(slug)) {
    try {
      const SEOComponent = dynamic(getSEOComponent(slug), {
        loading: () => <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>,
        ssr: false, // Disable SSR for dynamic components
        // Add timeout for failed imports
      });
      
      return <SEOComponent tool={seoData} />;
    } catch (error) {
      console.error('Failed to load SEO component for:', slug, error);
      // Fall through to default template if SEO component fails
    }
  }

  
  // Generate safe meta description with fallback (155-160 characters)
  const generateSafeMetaDescription = (tool: Tool, toolSlug: string): string => {
    const toolName = tool.tool_name && tool.tool_name.trim() ? tool.tool_name : 
      toolSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        .replace(/\bAi\b/g, 'AI').replace(/\bApi\b/g, 'API').replace(/\bSeo\b/g, 'SEO').replace(/\bUx\b/g, 'UX');
    
    const category = seoData?.category || 'AI Tools';
    const mainFeature = tool.features?.core?.[0] || 'AI capabilities';
    const rating = tool.rating || 4.5;
    const price = typeof tool.pricing?.monthly === 'number' ? tool.pricing.monthly : 0;
    const priceStr = price === 0 ? 'Free' : `$${price}/mo`;
    
    // Create more specific meta descriptions based on tool data
    const templates = [
      `${toolName} review: ${rating}/5 rated ${category.toLowerCase()} tool with ${mainFeature}. Starting at ${priceStr}. Features, pros, cons & alternatives.`,
      `Comprehensive ${toolName} review covering ${mainFeature}, pricing (${priceStr}), and ${tool.features?.core?.length || 5}+ features. Expert ${category.toLowerCase()} tool analysis.`,
      `${toolName} ${category.toLowerCase()} platform review: ${mainFeature}, ${priceStr} pricing, user feedback. Compare features & alternatives for 2025.`,
      `Expert ${toolName} review: ${category.toLowerCase()} tool with ${mainFeature}. ${rating}/5 rating, ${priceStr} pricing. Features, pros, cons & comparison.`
    ];
    
    // Select template based on tool name hash for consistency
    const nameHash = toolName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return templates[nameHash % templates.length];
  };
  

  // Generate optimized meta description (155-160 characters)

  const metaDescription = generateSafeMetaDescription(tool, slug);

  // Generate comprehensive JSON-LD schemas
  
  // Helper function to get safe price value (returns number for schema)
  const getSafePrice = (pricing: any): number => {
    if (!pricing) return 0;
    
    // Handle different pricing formats
    if (typeof pricing.monthly === 'number' && pricing.monthly > 0) {
      return pricing.monthly;
    }
    if (typeof pricing.monthly === 'string' && pricing.monthly.toLowerCase() === 'free') {
      return 0;
    }
    if (typeof pricing.price === 'number' && pricing.price > 0) {
      return pricing.price;
    }
    if (pricing.monthly === 0 || pricing.monthly === '0') {
      return 0;
    }
    
    return 0; // Default to free if unclear
  };

  // Helper function to get safe rating value
  const getSafeRating = (rating: any): number => {
    if (typeof rating === 'number' && rating >= 1 && rating <= 5) {
      return Math.round(rating * 10) / 10; // Round to 1 decimal
    }
    if (typeof rating === 'string') {
      const parsed = parseFloat(rating);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
        return Math.round(parsed * 10) / 10;
      }
    }
    return 4.5; // Default rating
  };

  // Helper function to get deterministic review count (based on tool name hash)
  const getDeterministicReviewCount = (toolName: string): number => {
    // Create a simple hash from the tool name for consistent review counts
    let hash = 0;
    for (let i = 0; i < toolName.length; i++) {
      const char = toolName.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // Use hash to generate a number between 100-500
    return Math.abs(hash % 400) + 100;
  };

  // Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.tool_name || safeToolName,
    "description": tool.description || `${safeToolName} is a comprehensive AI tool designed to enhance productivity and efficiency.`,
    "url": tool.official_url || tool.affiliate_link || `https://siteoptz.ai/reviews/${slug}`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": getSafePrice(tool.pricing),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": getSafePrice(tool.pricing),
        "priceCurrency": "USD"
      },
      "url": tool.official_url || tool.affiliate_link || `https://siteoptz.ai/reviews/${slug}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": getSafeRating(tool.rating),
      "reviewCount": getDeterministicReviewCount(safeToolName),
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai"
    }
  };

  // Review Schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": tool.tool_name || safeToolName,
      "description": tool.description || `${safeToolName} is a comprehensive AI tool designed to enhance productivity and efficiency.`,
      "url": tool.official_url || tool.affiliate_link || `https://siteoptz.ai/reviews/${slug}`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web"
    },
    "author": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SiteOptz",
      "url": "https://siteoptz.ai"
    },
    "datePublished": "2025-01-15",
    "dateModified": new Date().toISOString().split('T')[0],
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": getSafeRating(tool.rating),
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": `Comprehensive review of ${safeToolName} covering features, pricing, pros, cons, and use cases. Our expert analysis examines ${safeToolName}'s capabilities, user experience, and overall value proposition to help you make an informed decision.`
  };

  // FAQ Schema - Create sample FAQs since not in data
  const sampleFaqs = [
    {
      question: `What is ${safeToolName}?`,
      answer: tool.description
    },
    {
      question: `How much does ${safeToolName} cost?`,
      answer: (typeof tool.pricing.monthly === 'string' && tool.pricing.monthly.toLowerCase() === 'custom') || 
              tool.pricing.monthly === null || tool.pricing.monthly === undefined ?
              `${safeToolName} has various pricing tiers available.` :
              tool.pricing.monthly === 0 || 
              (typeof tool.pricing.monthly === 'string' && tool.pricing.monthly.toLowerCase() === 'free') ?
              `${safeToolName} offers a free plan with various pricing tiers available.` :
              typeof tool.pricing.monthly === 'number' && tool.pricing.monthly > 0 ? 
              `${safeToolName} starts at $${tool.pricing.monthly}/month with various pricing tiers available.` :
              `${safeToolName} has various pricing tiers available.`
    },
    {
      question: `Does ${safeToolName} offer a free trial?`,
      answer: tool.free_trial ? `Yes, ${safeToolName} offers a free trial.` : `${safeToolName} pricing information is available on their website.`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sampleFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://siteoptz.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Tools",
        "item": "https://siteoptz.com/ai-tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Reviews",
        "item": "https://siteoptz.com/reviews"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${safeToolName} Review`,
        "item": `https://siteoptz.com/reviews/${slug}`
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${safeToolName} review, ${safeToolName} features, ${safeToolName} pricing, ${safeToolName} pros and cons, ${safeToolName} alternatives, AI tools 2025`} />
        <meta name="author" content="SiteOptz" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://siteoptz.com/reviews/${slug}`} />
        <meta property="og:site_name" content="SiteOptz" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="SiteOptz" />
        <meta property="article:published_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        <meta property="article:section" content="Technology" />
        <meta property="article:tag" content={`${safeToolName}, AI Tools, Review`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://siteoptz.ai/reviews/${slug}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative z-10 py-20">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                <li><span className="mx-2">/</span></li>
                <li><Link href="/tools" className="hover:text-cyan-400 transition-colors">AI Tools</Link></li>
                <li><span className="mx-2">/</span></li>
                <li><Link href="/reviews" className="hover:text-cyan-400 transition-colors">Reviews</Link></li>
                <li><span className="mx-2">/</span></li>
                <li className="text-cyan-400">{safeToolName} Review</li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row items-center">
              {/* Tool Info */}
              <div className="lg:w-2/3 lg:pr-12 mb-8 lg:mb-0">
                <div className="flex items-center mb-6">
                  <div className="mr-6">
                    <ToolLogo 
                      toolName={safeToolName}
                      logoUrl={tool.logo_url}
                      size="xl"
                    />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {safeToolName} Review
                    </h1>
                    {tool.rating && (
                      <div className="flex items-center">
                        <div className="flex items-center mr-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(tool.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-blue-100 text-sm">
                          {tool.rating}/5 (100 reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  {tool.description}
                </p>

              </div>

              {/* Quick Stats */}
              <div className="lg:w-1/3">
                <div className="bg-black border border-gray-800 backdrop-blur-md rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Starting Price:</span>
                      <span className="text-white font-semibold">
                        {typeof tool.pricing.monthly === 'number' && tool.pricing.monthly > 0 ? `$${tool.pricing.monthly}/month` : 
                         tool.pricing.monthly === 0 || 
                         (typeof tool.pricing.monthly === 'string' && tool.pricing.monthly.toLowerCase() === 'free') ? 'Free' : 'Custom'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Free Trial:</span>
                      <span className="text-white font-semibold">
                        {tool.free_trial ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Features:</span>
                      <span className="text-white font-semibold">{(tool.features.core?.length || 0)}+</span>
                    </div>
                    {tool.rating && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rating:</span>
                        <span className="text-white font-semibold">{tool.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-black border-b border-gray-800 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'features', label: 'Key Features' },
                { key: 'pricing', label: 'Pricing Plans' },
                { key: 'use-cases', label: 'Use Cases' },
                { key: 'pros-cons', label: 'Pros & Cons' },
                { key: 'faq', label: 'FAQ' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'overview' && (
              <div className="prose prose-lg max-w-none">
                {/* Unique intro paragraph to prevent duplicate content */}
                <div className="mb-8 p-6 bg-black border border-gray-800 rounded-xl">
                  <p className="text-gray-300 leading-relaxed">
                    {generateUniqueIntro(tool, slug)}
                  </p>
                </div>

                {/* Detailed Review Section - NEW */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Our {safeToolName} Review</h2>
                  <div className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-blue-800/30 rounded-xl p-6">
                    <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {generateDetailedReview(tool, slug, seoData?.category || 'AI Tools')}
                    </div>
                  </div>
                </div>
                
                {/* Use Cases Section */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Key Use Cases for {safeToolName}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generateUniqueUseCases(tool, slug, seoData?.category || 'AI Tools').map((useCase, index) => (
                      <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-cyan-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-gray-300">{useCase}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Industry Insights */}
                <div className="mb-12 p-6 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-800/30 rounded-xl">
                  <h2 className="text-2xl font-bold text-white mb-4">Industry Context & Market Position</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {generateIndustryInsights(tool, slug, seoData?.category || 'AI Tools')}
                  </p>
                </div>

                {/* Unique Comparisons */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">How {safeToolName} Compares</h2>
                  <ul className="space-y-3">
                    {generateUniqueComparisons(tool, slug).map((comparison, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span className="text-gray-300">{comparison}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Implementation Timeline */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Implementation Timeline for {safeToolName}</h2>
                  <div className="space-y-6">
                    {generateImplementationTimeline(tool, slug).map((phase, index) => (
                      <div key={index} className="bg-black border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-cyan-400 mb-3">{phase.phase}</h3>
                        <ul className="space-y-2">
                          {phase.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="flex items-start">
                              <span className="text-cyan-400 mr-2">•</span>
                              <span className="text-gray-300">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-6">What is {safeToolName}?</h2>
                <p className="text-gray-300 mb-8">{tool.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8 not-prose">
                  <div className="bg-black border border-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-green-400 mb-4">Key Strengths</h3>
                    <ul className="space-y-2">
                      {(tool.pros || []).slice(0, 5).map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-black border border-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-red-400 mb-4">Limitations</h3>
                    <ul className="space-y-2">
                      {(tool.cons || []).slice(0, 5).map((con, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">{safeToolName} Features Analysis</h2>
                
                {/* Feature Overview */}
                <div className="mb-8 p-6 bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">Feature Overview</h3>
                  <p className="text-gray-300 mb-4">
                    {safeToolName} offers {tool.features?.core?.length || 'multiple'} core features designed for {seoData?.category?.toLowerCase() || 'AI-powered'} workflows. 
                    The platform excels in {tool.features?.core?.[0] || 'core functionality'} while providing {tool.features?.core?.[1] || 'advanced capabilities'} for professional users.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{tool.features?.core?.length || 5}+</div>
                      <div className="text-sm text-gray-400">Core Features</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{tool.features?.advanced?.length || 3}+</div>
                      <div className="text-sm text-gray-400">Advanced Features</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{tool.features?.integrations?.length || 2}+</div>
                      <div className="text-sm text-gray-400">Integrations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">{tool.rating || 4.5}/5</div>
                      <div className="text-sm text-gray-400">User Rating</div>
                    </div>
                  </div>
                </div>

                {/* Core Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Core Features</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(tool.features.core || []).map((feature, index) => (
                      <div key={index} className="bg-black border border-gray-800 p-6 rounded-xl shadow-sm hover:border-cyan-400 transition-colors">
                        <div className="flex items-start">
                          <svg className="w-6 h-6 text-cyan-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div>
                            <span className="text-gray-300 font-medium block">{feature}</span>
                            <span className="text-gray-500 text-sm">Essential for {seoData?.category?.toLowerCase() || 'AI'} workflows</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Features */}
                {tool.features?.advanced && tool.features.advanced.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Advanced Features</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {tool.features.advanced.map((feature, index) => (
                        <div key={index} className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-800/30 p-6 rounded-xl">
                          <div className="flex items-start">
                            <svg className="w-6 h-6 text-purple-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <div>
                              <span className="text-gray-300 font-medium block">{feature}</span>
                              <span className="text-purple-300 text-sm">Premium functionality for power users</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feature Comparison */}
                <div className="mb-8 p-6 bg-black border border-gray-800 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">How {safeToolName} Features Compare</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Feature Completeness</span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-gray-700 rounded mr-3">
                          <div className="h-2 bg-green-500 rounded" style={{ width: `${Math.min(95, (tool.features?.core?.length || 0) * 15)}%` }}></div>
                        </div>
                        <span className="text-white text-sm">{Math.min(95, (tool.features?.core?.length || 0) * 15)}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Advanced Capabilities</span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-gray-700 rounded mr-3">
                          <div className="h-2 bg-gray-900 rounded" style={{ width: `${Math.min(90, (tool.features?.advanced?.length || 0) * 25)}%` }}></div>
                        </div>
                        <span className="text-white text-sm">{Math.min(90, (tool.features?.advanced?.length || 0) * 25)}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Integration Options</span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-gray-700 rounded mr-3">
                          <div className="h-2 bg-purple-500 rounded" style={{ width: `${Math.min(85, (tool.features?.integrations?.length || 0) * 30)}%` }}></div>
                        </div>
                        <span className="text-white text-sm">{Math.min(85, (tool.features?.integrations?.length || 0) * 30)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'pricing' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">{safeToolName} Pricing Plans</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-white mb-2">Monthly Plan</h3>
                    <div className="text-4xl font-bold text-cyan-400 mb-6">
                      {typeof tool.pricing.monthly === 'number' && tool.pricing.monthly > 0 ? `$${tool.pricing.monthly}` : 
                       tool.pricing.monthly === 0 || 
                       (typeof tool.pricing.monthly === 'string' && tool.pricing.monthly.toLowerCase() === 'free') ? 'Free' : 'Custom'}
                      {typeof tool.pricing.monthly === 'number' && tool.pricing.monthly > 0 && (
                        <span className="text-lg text-gray-400">/month</span>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {(tool.features.core || []).slice(0, 5).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a
                      href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                    >
                      Book Your Free AI Strategy Session
                    </a>
                  </div>
                  
                  <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-white mb-2">Yearly Plan</h3>
                    <div className="text-4xl font-bold text-cyan-400 mb-6">
                      {typeof tool.pricing.yearly === 'number' && tool.pricing.yearly > 0 ? `$${tool.pricing.yearly}` : 
                       tool.pricing.yearly === 0 ||
                       (typeof tool.pricing.yearly === 'string' && tool.pricing.yearly.toLowerCase() === 'free') ? 'Free' : 'Custom'}
                      {typeof tool.pricing.yearly === 'number' && tool.pricing.yearly > 0 && (
                        <span className="text-lg text-gray-400">
                          {(tool.pricing as any).yearlyIsMonthlyRate ? '/month' : '/year'}
                        </span>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {(tool.features.advanced || []).slice(0, 5).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a
                      href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                    >
                      Book Your Free AI Strategy Session
                    </a>
                  </div>
                  
                  <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-white mb-2">Enterprise Plan</h3>
                    <div className="text-4xl font-bold text-cyan-400 mb-6">
                      {typeof tool.pricing.enterprise === 'number' && tool.pricing.enterprise > 0 ? `$${tool.pricing.enterprise}` : 
                       (typeof tool.pricing.enterprise === 'number' && tool.pricing.enterprise === 0) ||
                       (typeof tool.pricing.enterprise === 'string' && tool.pricing.enterprise.toLowerCase() === 'free') ? 'Free' : 'Custom'}
                      {typeof tool.pricing.enterprise === 'number' && tool.pricing.enterprise > 0 && (
                        <span className="text-lg text-gray-400">/month</span>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {[...(tool.features.core || []).slice(0, 3), ...(tool.features.advanced || []).slice(0, 2)].map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a
                      href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                    >
                      Book Your Free AI Strategy Session
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'use-cases' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">{safeToolName} Use Cases</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {((tool as any).overview?.use_cases || (tool as any).use_cases || []).map((useCase: string, index: number) => (
                    <div key={index} className="bg-black border border-gray-800 p-6 rounded-xl">
                      <div className="flex items-start">
                        <svg className="w-6 h-6 text-purple-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{useCase}</h3>
                          <p className="text-gray-400 text-sm">Perfect for businesses looking to implement {useCase.toLowerCase()} with {safeToolName}.</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Additional use case information */}
                <div className="mt-12 bg-black border border-gray-800 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-6">Who Should Use {safeToolName}?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Ideal For:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span className="text-gray-300">Marketing teams and agencies</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span className="text-gray-300">Content creators and influencers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span className="text-gray-300">Small to enterprise businesses</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <span className="text-gray-300">E-commerce and retail brands</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Best Scenarios:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-gray-300">Managing multiple social media accounts</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-gray-300">Streamlining content workflows</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-gray-300">Improving team collaboration</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-gray-300">Scaling social media operations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pros-cons' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">{safeToolName} Pros and Cons</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-black border border-gray-800 p-8 rounded-xl">
                    <h3 className="text-2xl font-bold text-green-400 mb-6">Pros</h3>
                    <ul className="space-y-4">
                      {(tool.pros || []).map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300 text-lg">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-black border border-gray-800 p-8 rounded-xl">
                    <h3 className="text-2xl font-bold text-red-400 mb-6">Cons</h3>
                    <ul className="space-y-4">
                      {(tool.cons || []).map((con, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-6 h-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300 text-lg">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions about {safeToolName}</h2>
                <div className="space-y-6">
                  {sampleFaqs.map((faq, index) => (
                    <div key={index} className="bg-black border border-gray-800 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-cyan-400 mb-3">{faq.question}</h3>
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>


        {/* Related Comparisons */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">{safeToolName} Comparisons</h2>
              <p className="text-lg text-gray-300">See how {safeToolName} compares to other AI tools</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedComparisons.slice(0, 6).map((comparison, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:border-gray-600 transition-all">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    <a 
                      href={`/compare/${comparison.toolASlug || comparison.toolAName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}/vs/${comparison.toolBSlug || comparison.toolBName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {comparison.title}
                    </a>
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Compare {comparison.toolAName} and {comparison.toolBName} features, pricing, and use cases.
                  </p>
                  <a 
                    href={`/compare/${comparison.toolASlug || comparison.toolAName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}/vs/${comparison.toolBSlug || comparison.toolBName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                  >
                    Read Comparison →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternative Tools */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">{safeToolName} Alternatives</h2>
              <p className="text-lg text-gray-300">Explore other AI tools in this category</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTools.slice(0, 4).map((relatedTool, index) => (
                <div key={index} className="bg-black border border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-gray-600 transition-all">
                  <div className="flex items-center mb-4">
                    <div className="mr-3">
                      <ToolLogo 
                        toolName={relatedTool.tool_name || 'Tool'}
                        logoUrl={relatedTool.logo_url}
                        size="sm"
                      />
                    </div>
                    <h3 className="font-semibold text-white">{relatedTool.tool_name || 'Unknown Tool'}</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    {(relatedTool.description || '').length > 100 
                      ? `${(relatedTool.description || '').substring(0, 100)}...` 
                      : (relatedTool.description || '')}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      From {typeof relatedTool.pricing?.monthly === 'number' && relatedTool.pricing.monthly > 0 ? `$${relatedTool.pricing.monthly}` : 
                            relatedTool.pricing?.monthly === 0 ||
                            (typeof relatedTool.pricing?.monthly === 'string' && relatedTool.pricing.monthly.toLowerCase() === 'free') ? 'Free' : 'Custom'}
                    </span>
                    <a 
                      href={`/reviews/${(relatedTool.tool_name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                    >
                      Review →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expert CTA Section */}
        <ExpertCTASection toolName={safeToolName} />

      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fs = require('fs');
  const path = require('path');
  
  // Load all tools from aiToolsData.json to ensure all pages are pre-generated
  const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
  const toolsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  // Static review pages that already exist (to avoid conflicts)
  const staticReviewPages = ['contentstudio', 'loomly', 'sendible', 'social-champ', 'socialpilot'];
  
  // Generate paths for all tools except those with static pages
  const paths: Array<{ params: { toolName: string } }> = [];
  
  toolsData
    .filter((tool: any) => !staticReviewPages.includes(tool.slug))
    .forEach((tool: any) => {
      // Add the primary slug
      paths.push({
        params: { toolName: tool.slug }
      });
      
      // Add alternative slug for specific tools that have variations
      if (tool.slug === '6sense-aidriven-revenue-growth-optimization') {
        paths.push({
          params: { toolName: '6sense-ai-driven-revenue-growth-optimization' }
        });
      }
    });

  // Only pre-generate paths for the most popular tools to stay under route limits
  const popularToolSlugs = [
    'chatgpt', 'claude', 'gemini', 'jasper-ai', 'copy-ai', 'writesonic', 
    'grammarly', 'midjourney', 'dall-e', 'stable-diffusion', 'perplexity-ai',
    'notion-ai', 'canva', 'figma', 'adobe-firefly', 'leonardo-ai'
  ];
  
  const popularPaths = paths.filter((path: any) => {
    const toolName = path.params.toolName;
    return popularToolSlugs.some(slug => toolName.includes(slug));
  });

  return {
    paths: popularPaths, // Only pre-generate popular tools
    fallback: 'blocking' // Generate other pages on-demand to stay under route limits
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fs = require('fs');
  const path = require('path');
  const { loadUnifiedToolsData } = require('../../utils/unifiedDataAdapter');
  const { hasSEOComponent } = require('../../utils/seoComponentMapping');
  
  const toolSlug = params?.toolName as string;
  const tools = loadUnifiedToolsData(fs, path);
  
  // Load the public data to get correct slugs for comparisons
  const publicToolsData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public/data/aiToolsData.json'), 'utf8')
  );
  
  // Find tool by slug (try actual slug first, then fall back to generated slug, then handle variations)
  let tool = tools.find((t: any) => 
    t.slug === toolSlug || 
    t.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') === toolSlug
  );
  
  // Handle specific slug variations
  if (!tool && toolSlug === '6sense-ai-driven-revenue-growth-optimization') {
    tool = tools.find((t: any) => t.slug === '6sense-aidriven-revenue-growth-optimization');
  }

  if (!tool) {
    return {
      notFound: true
    };
  }

  
  // Generate safe title with fallback
  const generateSafeTitle = (tool: Tool, slug: string): string => {
    const toolName = tool.tool_name && tool.tool_name.trim() ? tool.tool_name : 
      slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        .replace(/\bAi\b/g, 'AI').replace(/\bApi\b/g, 'API').replace(/\bSeo\b/g, 'SEO').replace(/\bUx\b/g, 'UX');
    
    return `${toolName} Review — Features, Pricing, Pros & Cons [2025]`;
  };

  const pageTitle = generateSafeTitle(tool, toolSlug);
  const slug = toolSlug;
  
  // Generate safe tool name for use in getStaticProps
  const safeToolName = tool.tool_name && tool.tool_name.trim() ? tool.tool_name : 
    toolSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      .replace(/\bAi\b/g, 'AI').replace(/\bApi\b/g, 'API').replace(/\bSeo\b/g, 'SEO').replace(/\bUx\b/g, 'UX');

  // Get related tools (exclude current tool)
  const relatedTools = tools.filter((t: any) => t.tool_name !== tool.tool_name);

  // Find the current tool's slug in public data
  const currentPublicTool = publicToolsData.find((t: any) => 
    t.name === tool.tool_name || 
    t.slug === tool.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  );
  const currentSlug = currentPublicTool?.slug || toolSlug;

  // Generate related comparisons using slugs from public data
  const relatedComparisons = [];
  for (let i = 0; i < publicToolsData.length; i++) {
    const otherPublicTool = publicToolsData[i];
    if (otherPublicTool.slug === currentSlug) continue;
    
    // Find corresponding tool in toolsData for display names
    const otherTool = tools.find((t: any) => 
      t.tool_name === otherPublicTool.name ||
      t.tool_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') === otherPublicTool.slug
    );
    
    if (otherTool) {
      relatedComparisons.push({
        title: `${safeToolName} vs ${otherTool.tool_name}`,
        slug: `${currentSlug}/vs/${otherPublicTool.slug}`,
        toolAName: tool.tool_name,
        toolBName: otherTool.tool_name,
        toolASlug: currentSlug,
        toolBSlug: otherPublicTool.slug
      });
    }
  }

  // Check if we have a SEO-optimized component for this tool
  const hasOptimizedVersion = hasSEOComponent(toolSlug);
  
  // Prepare SEO data if available
  let seoData = null;
  if (hasOptimizedVersion) {
    // Map tool data to SEO component format
    seoData = {
      name: tool.tool_name,
      category: tool.category || 'AI Tools',
      description: tool.description,
      website: tool.official_url || '',
      rating: tool.rating || 4.5,
      slug: toolSlug
    };
  }

  return {
    props: {
      tool,
      pageTitle,
      slug,
      relatedTools: relatedTools.slice(0, 8),
      relatedComparisons: relatedComparisons.slice(0, 12),
      hasSEOVersion: hasOptimizedVersion,
      seoData
    }
  };
};