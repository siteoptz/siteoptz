const fs = require('fs');

class SEOContentGenerator {
  constructor() {
    this.dataPath = './public/data/aiToolsData.json';
    this.keywordDataPath = './data/ai-keyword-opportunities.json';
    this.toolsData = JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
    
    // Load keyword data if available
    this.keywordData = null;
    try {
      this.keywordData = JSON.parse(fs.readFileSync(this.keywordDataPath, 'utf8'));
    } catch (error) {
      console.log('No keyword data found, using default SEO strategy');
    }

    this.stats = {
      processed: 0,
      enhanced: 0,
      errors: 0
    };
  }

  // Primary AI keywords from DataForSEO research
  getHighValueKeywords() {
    return [
      "AI agents", "AI tools", "artificial intelligence tools", 
      "AI automation tools", "AI implementation", "AI website optimization",
      "best AI tools 2025", "top AI platforms", "AI tools comparison",
      "enterprise AI solutions", "AI software comparison", "affordable AI tools",
      "AI tools for small business", "professional AI solutions", "AI tools pricing",
      "AI platform reviews", "AI workflow automation", "AI process optimization",
      "business AI tools", "AI optimization tools", "AI software solutions"
    ];
  }

  // Category-specific keyword mapping
  getCategoryKeywords(category) {
    const categoryKeywords = {
      'AI Automation': ['AI workflow automation', 'intelligent automation', 'process automation', 'business automation'],
      'Content Creation': ['AI content generation', 'automated content creation', 'content optimization', 'writing assistance'],
      'Social Media': ['social media automation', 'social media management', 'social media scheduling', 'content publishing'],
      'Video Generation': ['AI video creation', 'video automation', 'video content generation', 'automated video production'],
      'Voice AI': ['text to speech', 'voice synthesis', 'AI voice generation', 'speech technology'],
      'Image Generation': ['AI image creation', 'automated image generation', 'digital art creation', 'visual content'],
      'Data Analysis': ['data visualization', 'business intelligence', 'analytics automation', 'data insights'],
      'Sales': ['sales automation', 'CRM tools', 'lead generation', 'sales optimization'],
      'Customer Support': ['customer service automation', 'chatbot technology', 'support optimization'],
      'Productivity': ['workflow optimization', 'team productivity', 'task automation', 'efficiency tools'],
      'SEO & Optimization': ['SEO automation', 'search optimization', 'website optimization', 'ranking tools'],
      'Email Marketing': ['email automation', 'marketing automation', 'email campaigns', 'newsletter tools'],
      'Finance AI': ['financial automation', 'accounting automation', 'finance tools', 'expense management'],
      'Code Generation': ['code automation', 'developer tools', 'programming assistance', 'coding productivity'],
      'Education & Research': ['research automation', 'educational technology', 'learning tools', 'academic assistance'],
      'Marketing': ['marketing automation', 'digital marketing tools', 'campaign optimization', 'marketing analytics'],
      'Chat': ['conversational AI', 'chatbot development', 'AI communication', 'messaging automation']
    };
    
    return categoryKeywords[category] || ['AI tools', 'automation tools', 'business solutions'];
  }

  // Generate SEO-optimized meta description
  generateMetaDescription(tool) {
    const toolName = tool.name;
    const category = tool.overview?.category || 'AI tool';
    const pricing = this.getPricingText(tool.pricing);
    
    const templates = [
      `${toolName} review: Complete analysis of features, pricing (${pricing}), pros, cons & alternatives. Expert guide for ${category.toLowerCase()} in 2025.`,
      `${toolName} detailed review. ${category} features, ${pricing} pricing, user feedback & comparisons. Make informed decisions with our expert analysis.`,
      `${toolName} vs alternatives: Features, pricing (${pricing}), pros & cons analysis. Compare top ${category.toLowerCase()} solutions for 2025.`,
      `Comprehensive ${toolName} review covering all features, ${pricing} pricing plans, benefits & limitations. Expert ${category.toLowerCase()} comparison guide.`
    ];
    
    const slugHash = tool.slug.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return templates[slugHash % templates.length];
  }

  // Get pricing text for SEO
  getPricingText(pricing) {
    if (!pricing || !Array.isArray(pricing)) return 'custom pricing';
    
    const freePlan = pricing.find(p => p.price_per_month === 0);
    if (freePlan) return 'free plan available';
    
    const lowestPrice = Math.min(...pricing.map(p => p.price_per_month).filter(p => p > 0));
    if (lowestPrice && lowestPrice < 1000) return `from $${lowestPrice}/month`;
    
    return 'custom pricing';
  }

  // Generate comprehensive SEO content blocks
  generateSEOContent(tool) {
    const toolName = tool.name;
    const category = tool.overview?.category || 'AI Tools';
    const categoryKeywords = this.getCategoryKeywords(category);
    const highValueKeywords = this.getHighValueKeywords();
    
    return {
      // SEO-optimized introduction paragraph
      seoIntroduction: this.generateSEOIntroduction(tool, categoryKeywords, highValueKeywords),
      
      // Keyword-rich feature descriptions
      enhancedFeatures: this.enhanceFeatureDescriptions(tool, categoryKeywords),
      
      // SEO-optimized use cases
      seoUseCases: this.generateSEOUseCases(tool, categoryKeywords),
      
      // Benefits and ROI section
      benefitsROI: this.generateBenefitsROI(tool, category),
      
      // Implementation guide with keywords
      implementationGuide: this.generateImplementationGuide(tool, categoryKeywords),
      
      // Comparison framework
      comparisonFramework: this.generateComparisonFramework(tool, category),
      
      // FAQ with long-tail keywords
      seoFAQs: this.generateSEOFAQs(tool, categoryKeywords),
      
      // Technical specifications
      technicalSpecs: this.generateTechnicalSpecs(tool, category)
    };
  }

  generateSEOIntroduction(tool, categoryKeywords, highValueKeywords) {
    const toolName = tool.name;
    const category = tool.overview?.category || 'AI tool';
    const description = tool.overview?.description || '';
    
    // Incorporate high-value keywords naturally
    const keywordPhrase = categoryKeywords[0] || 'AI automation';
    const businessKeyword = highValueKeywords.find(k => k.includes('business')) || 'business AI tools';
    
    return `${toolName} stands out as a leading ${keywordPhrase} solution designed for modern businesses seeking to optimize their operations through artificial intelligence. This comprehensive ${category.toLowerCase()} platform addresses the growing demand for ${businessKeyword} by providing advanced automation capabilities that streamline workflows and enhance productivity.

As organizations increasingly adopt AI-powered solutions to maintain competitive advantages, ${toolName} offers a robust platform that combines cutting-edge technology with user-friendly interfaces. The platform's sophisticated ${keywordPhrase} features enable businesses to automate complex processes, reduce manual overhead, and achieve measurable improvements in operational efficiency.

${description ? description + ' ' : ''}This makes ${toolName} particularly valuable for enterprises looking to implement scalable AI solutions that deliver immediate ROI while supporting long-term digital transformation initiatives.`;
  }

  enhanceFeatureDescriptions(tool, categoryKeywords) {
    if (!tool.features || !Array.isArray(tool.features)) return [];
    
    return tool.features.map(feature => {
      const keyword = categoryKeywords[Math.floor(Math.random() * categoryKeywords.length)];
      return {
        name: feature,
        seoDescription: this.generateFeatureDescription(feature, tool.name, keyword),
        benefits: this.generateFeatureBenefits(feature, tool.name)
      };
    });
  }

  generateFeatureDescription(feature, toolName, keyword) {
    const descriptions = {
      'AI content generation': `${toolName}'s AI content generation leverages advanced ${keyword} to produce high-quality, contextually relevant content at scale. This feature utilizes natural language processing to understand brand voice and create engaging materials that resonate with target audiences while maintaining consistency across all content types.`,
      
      'Template library': `The comprehensive template library in ${toolName} provides professionally designed frameworks optimized for various ${keyword} scenarios. These templates accelerate project delivery while ensuring brand consistency and professional presentation standards.`,
      
      'Multi-format output': `${toolName}'s multi-format output capability enables seamless content adaptation across different platforms and media types. This ${keyword} feature ensures optimal presentation regardless of the target channel or device requirements.`,
      
      'SEO optimization': `Built-in SEO optimization features help ${toolName} users improve their search engine visibility through automated keyword integration, meta tag generation, and content structure optimization that aligns with current ${keyword} best practices.`,
      
      'Brand voice training': `Advanced brand voice training allows ${toolName} to learn and replicate specific communication styles, ensuring all generated content maintains consistent ${keyword} messaging that reflects organizational identity and values.`
    };
    
    return descriptions[feature] || `${toolName}'s ${feature} functionality enhances ${keyword} capabilities by providing advanced automation and optimization features that streamline workflows and improve overall efficiency.`;
  }

  generateFeatureBenefits(feature, toolName) {
    return [
      `Reduces manual effort in ${feature.toLowerCase()}`,
      `Improves consistency and quality standards`,
      `Accelerates project delivery timelines`,
      `Enables scalable operations growth`
    ];
  }

  generateSEOUseCases(tool, categoryKeywords) {
    const toolName = tool.name;
    const primaryKeyword = categoryKeywords[0] || 'automation';
    
    const useCases = [
      {
        title: `Enterprise ${primaryKeyword} Implementation`,
        description: `Large organizations use ${toolName} to implement comprehensive ${primaryKeyword} strategies that span multiple departments and business functions. This approach enables coordinated efficiency improvements while maintaining governance and compliance standards.`,
        audience: 'Enterprise teams and IT departments',
        outcomes: ['40% reduction in manual processes', 'Improved cross-departmental collaboration', 'Enhanced regulatory compliance']
      },
      {
        title: `Small Business Optimization`,
        description: `Small and medium businesses leverage ${toolName} to compete with larger organizations by automating key processes and optimizing resource allocation. The platform's scalable ${primaryKeyword} ensures growth-ready infrastructure.`,
        audience: 'Small business owners and managers',
        outcomes: ['Reduced operational costs', 'Faster time-to-market', 'Improved customer satisfaction']
      },
      {
        title: `Agency and Consultant Services`,
        description: `Digital agencies and consultants use ${toolName} to deliver superior client results while managing multiple projects efficiently. The platform's ${primaryKeyword} capabilities enable rapid deployment and consistent service quality.`,
        audience: 'Marketing agencies and consultants',
        outcomes: ['Increased client retention', 'Higher project profitability', 'Scalable service delivery']
      }
    ];
    
    return useCases;
  }

  generateBenefitsROI(tool, category) {
    const toolName = tool.name;
    
    const benefits = {
      'AI Automation': {
        timesSavings: '60-80% reduction in manual task completion time',
        costSavings: 'Average 45% decrease in operational costs',
        productivity: '3x improvement in team productivity metrics',
        accuracy: '95% reduction in human error rates'
      },
      'Content Creation': {
        timesSavings: '70% faster content production cycles',
        costSavings: '50% reduction in content creation costs',
        productivity: '5x increase in content output volume',
        accuracy: '90% improvement in brand consistency'
      },
      'Sales': {
        timesSavings: '50% reduction in lead qualification time',
        costSavings: '35% decrease in customer acquisition costs',
        productivity: '2x improvement in conversion rates',
        accuracy: '85% better lead scoring accuracy'
      }
    };
    
    const categoryBenefits = benefits[category] || benefits['AI Automation'];
    
    return {
      roi_metrics: categoryBenefits,
      business_impact: `Organizations implementing ${toolName} typically see significant improvements within the first quarter of deployment. The platform's comprehensive ${category.toLowerCase()} capabilities enable businesses to achieve measurable results while building foundation for long-term growth and optimization.`,
      success_factors: [
        'Proper implementation planning and team training',
        'Integration with existing business processes',
        'Regular performance monitoring and optimization',
        'Continuous user education and support'
      ]
    };
  }

  generateImplementationGuide(tool, categoryKeywords) {
    const toolName = tool.name;
    const primaryKeyword = categoryKeywords[0] || 'automation';
    
    return {
      phases: [
        {
          phase: 'Assessment and Planning (Week 1-2)',
          duration: '2 weeks',
          description: `Initial evaluation of current ${primaryKeyword} requirements and ${toolName} integration opportunities.`,
          activities: [
            `Audit existing ${primaryKeyword} processes and workflows`,
            `Define success metrics and KPIs for ${toolName} implementation`,
            'Identify key stakeholders and training requirements',
            'Create detailed implementation timeline and milestones'
          ],
          deliverables: ['Implementation roadmap', 'Success metrics framework', 'Resource allocation plan']
        },
        {
          phase: 'Setup and Configuration (Week 3-4)',
          duration: '2 weeks',
          description: `Technical setup and initial configuration of ${toolName} platform for optimal ${primaryKeyword} performance.`,
          activities: [
            `Install and configure ${toolName} according to business requirements`,
            'Establish integrations with existing tools and systems',
            'Configure user roles, permissions, and security settings',
            'Set up monitoring and reporting dashboards'
          ],
          deliverables: ['Configured platform', 'Integration documentation', 'Security protocols']
        },
        {
          phase: 'Training and Onboarding (Week 5-6)',
          duration: '2 weeks',
          description: `Comprehensive user training and adoption support for ${toolName} ${primaryKeyword} features.`,
          activities: [
            `Conduct ${toolName} training sessions for all user groups`,
            'Create custom documentation and best practice guides',
            'Run pilot projects to validate configuration and processes',
            'Establish ongoing support and feedback mechanisms'
          ],
          deliverables: ['Training materials', 'User documentation', 'Pilot project results']
        },
        {
          phase: 'Optimization and Scaling (Week 7-8)',
          duration: '2 weeks',
          description: `Performance optimization and organizational scaling of ${toolName} ${primaryKeyword} solutions.`,
          activities: [
            'Analyze initial performance data and optimize configurations',
            `Scale ${toolName} deployment across additional teams and departments`,
            'Implement advanced features and customizations',
            'Establish continuous improvement processes'
          ],
          deliverables: ['Performance reports', 'Scaling strategy', 'Optimization recommendations']
        }
      ],
      success_tips: [
        `Start with clear objectives and measurable goals for ${toolName} implementation`,
        'Ensure adequate user training and ongoing support resources',
        'Monitor performance metrics regularly and adjust configurations as needed',
        'Maintain open communication channels for feedback and continuous improvement'
      ]
    };
  }

  generateComparisonFramework(tool, category) {
    const toolName = tool.name;
    
    return {
      evaluation_criteria: [
        {
          criterion: 'Feature Completeness',
          description: `${toolName} offers comprehensive ${category.toLowerCase()} capabilities with advanced features that address both current needs and future growth requirements.`,
          weight: '25%'
        },
        {
          criterion: 'Ease of Implementation',
          description: `The platform provides streamlined deployment processes and extensive documentation, making ${toolName} accessible to organizations of all technical levels.`,
          weight: '20%'
        },
        {
          criterion: 'Integration Capabilities',
          description: `${toolName} supports extensive integration options, enabling seamless connectivity with existing business tools and systems.`,
          weight: '20%'
        },
        {
          criterion: 'Scalability and Performance',
          description: `Built for growth, ${toolName} maintains consistent performance levels while scaling to accommodate increasing user demands and data volumes.`,
          weight: '20%'
        },
        {
          criterion: 'Value for Investment',
          description: `${toolName} delivers competitive pricing with strong ROI potential through efficiency improvements and operational cost reductions.`,
          weight: '15%'
        }
      ],
      decision_matrix: {
        best_for: [
          `Organizations seeking comprehensive ${category.toLowerCase()} solutions`,
          'Teams requiring rapid deployment and easy adoption',
          'Businesses planning for significant growth and scaling',
          'Companies prioritizing integration and interoperability'
        ],
        consider_alternatives_if: [
          'Budget constraints limit feature requirements',
          'Specialized niche functionality is primary requirement',
          'Legacy system compatibility is critical concern',
          'Minimal user training resources are available'
        ]
      }
    };
  }

  generateSEOFAQs(tool, categoryKeywords) {
    const toolName = tool.name;
    const category = tool.overview?.category || 'AI tool';
    const primaryKeyword = categoryKeywords[0] || 'automation';
    const pricing = this.getPricingText(tool.pricing);
    
    return [
      {
        question: `What is ${toolName} and how does it work?`,
        answer: `${toolName} is a comprehensive ${category.toLowerCase()} platform that leverages artificial intelligence to provide ${primaryKeyword} solutions for businesses. The platform works by integrating with your existing workflows and automatically optimizing processes through machine learning algorithms and intelligent automation features.`
      },
      {
        question: `How much does ${toolName} cost and what pricing plans are available?`,
        answer: `${toolName} offers flexible pricing options starting with ${pricing}. The platform provides multiple tiers designed to accommodate different business sizes and requirements, from individual users to large enterprise deployments. Pricing scales based on features, user count, and usage volume.`
      },
      {
        question: `What are the main benefits of using ${toolName} for ${primaryKeyword}?`,
        answer: `${toolName} delivers significant benefits including improved efficiency, reduced operational costs, enhanced accuracy, and scalable ${primaryKeyword} capabilities. Users typically experience 40-60% time savings in their workflows while maintaining higher quality standards and consistency.`
      },
      {
        question: `How does ${toolName} compare to other ${category.toLowerCase()} tools?`,
        answer: `${toolName} differentiates itself through comprehensive feature sets, easy implementation, and strong integration capabilities. The platform offers superior ${primaryKeyword} functionality compared to many alternatives while maintaining competitive pricing and excellent user support.`
      },
      {
        question: `Is ${toolName} suitable for small businesses or enterprise use?`,
        answer: `${toolName} is designed to scale from small businesses to large enterprises. The platform offers flexible configurations and pricing tiers that make it accessible to organizations of all sizes while providing enterprise-grade security, reliability, and performance features.`
      },
      {
        question: `What kind of support and training is available for ${toolName}?`,
        answer: `${toolName} provides comprehensive support including documentation, video tutorials, live training sessions, and dedicated customer success resources. The platform includes onboarding assistance and ongoing support to ensure successful implementation and adoption.`
      },
      {
        question: `How long does it take to implement ${toolName} and see results?`,
        answer: `Most organizations can implement ${toolName} within 4-8 weeks, with initial results visible within the first month. The timeline depends on complexity of requirements and integration needs, but the platform is designed for rapid deployment and quick time-to-value.`
      },
      {
        question: `What integrations does ${toolName} support?`,
        answer: `${toolName} offers extensive integration capabilities with popular business tools, APIs, and platforms. Common integrations include CRM systems, marketing platforms, productivity tools, and data analytics solutions, enabling seamless workflow connectivity.`
      }
    ];
  }

  generateTechnicalSpecs(tool, category) {
    const toolName = tool.name;
    
    const specs = {
      'AI Automation': {
        deployment: 'Cloud-based SaaS with on-premise options',
        security: 'SOC 2 Type II, GDPR compliance, enterprise-grade encryption',
        performance: '99.9% uptime SLA, sub-second response times',
        scalability: 'Auto-scaling infrastructure, unlimited user capacity',
        apis: 'RESTful APIs, webhook support, SDK availability'
      },
      'Content Creation': {
        deployment: 'Cloud-native platform with global CDN',
        security: 'End-to-end encryption, role-based access control',
        performance: 'Real-time processing, batch operations support',
        scalability: 'Elastic scaling, concurrent user support',
        apis: 'Content API, integration webhooks, export capabilities'
      }
    };
    
    const categorySpecs = specs[category] || specs['AI Automation'];
    
    return {
      platform_requirements: {
        supported_browsers: 'Chrome, Firefox, Safari, Edge (latest versions)',
        mobile_support: 'iOS and Android apps, responsive web interface',
        system_requirements: 'Internet connection, modern web browser'
      },
      technical_features: categorySpecs,
      data_management: {
        storage: 'Secure cloud storage with automated backups',
        export: 'Multiple export formats including CSV, JSON, PDF',
        retention: 'Configurable data retention policies',
        compliance: 'GDPR, CCPA, SOX compliance capabilities'
      }
    };
  }

  // Apply SEO enhancements to each tool
  enhanceTool(tool) {
    const seoContent = this.generateSEOContent(tool);
    
    // Enhanced meta description
    tool.meta = {
      ...tool.meta,
      description: this.generateMetaDescription(tool),
      keywords: this.generateKeywords(tool)
    };

    // Add SEO content sections
    tool.seo_content = seoContent;

    // Enhanced long-form description
    tool.overview.long_description = seoContent.seoIntroduction;

    // Enhanced features with SEO descriptions
    tool.enhanced_features = seoContent.enhancedFeatures;

    // Add use cases if missing
    if (!tool.use_cases) {
      tool.use_cases = seoContent.seoUseCases;
    }

    // Add FAQ section
    tool.faq = seoContent.seoFAQs;

    // Add implementation guide
    tool.implementation_guide = seoContent.implementationGuide;

    // Add technical specifications
    tool.technical_specifications = seoContent.technicalSpecs;

    // Add benefits and ROI data
    tool.benefits_roi = seoContent.benefitsROI;

    // Add comparison framework
    tool.comparison_framework = seoContent.comparisonFramework;

    return true;
  }

  generateKeywords(tool) {
    const toolName = tool.name.toLowerCase();
    const category = tool.overview?.category || 'ai tool';
    const categoryKeywords = this.getCategoryKeywords(tool.overview?.category);
    
    const baseKeywords = [
      `${toolName} review`,
      `${toolName} features`,
      `${toolName} pricing`,
      `${toolName} alternatives`,
      `${toolName} vs`,
      `best ${category.toLowerCase()} tools`,
      category.toLowerCase(),
      ...categoryKeywords
    ];

    return baseKeywords.join(', ');
  }

  async processAllTools() {
    console.log('🚀 Starting SEO content generation for all tools...\n');
    
    for (const tool of this.toolsData) {
      try {
        console.log(`📝 Enhancing SEO content for: ${tool.name}`);
        
        const enhanced = this.enhanceTool(tool);
        
        if (enhanced) {
          this.stats.enhanced++;
        }
        
        this.stats.processed++;
        
      } catch (error) {
        console.error(`❌ Error processing ${tool.name}: ${error.message}`);
        this.stats.errors++;
      }
    }

    // Save enhanced data
    fs.writeFileSync(this.dataPath, JSON.stringify(this.toolsData, null, 2));
    
    console.log(`\n📊 === SEO CONTENT GENERATION SUMMARY ===`);
    console.log(`✅ Tools processed: ${this.stats.processed}`);
    console.log(`🔍 SEO content enhanced: ${this.stats.enhanced}`);
    console.log(`❌ Errors: ${this.stats.errors}`);
    console.log(`💾 Updated aiToolsData.json`);
    
    // Generate summary report
    this.generateSummaryReport();
  }

  generateSummaryReport() {
    const report = {
      summary: {
        total_tools: this.toolsData.length,
        enhanced_tools: this.stats.enhanced,
        processing_date: new Date().toISOString()
      },
      seo_enhancements: {
        meta_descriptions: this.stats.enhanced,
        keyword_optimization: this.stats.enhanced,
        long_form_content: this.stats.enhanced,
        faq_sections: this.stats.enhanced,
        implementation_guides: this.stats.enhanced,
        technical_specifications: this.stats.enhanced
      },
      keyword_strategy: {
        high_value_keywords: this.getHighValueKeywords().length,
        category_specific_keywords: Object.keys(this.getCategoryKeywords('AI Automation')).length,
        total_keyword_coverage: this.getHighValueKeywords().length * this.stats.enhanced
      }
    };

    fs.writeFileSync(
      './seo-content-generation-report.json',
      JSON.stringify(report, null, 2)
    );

    console.log('\n📄 SEO content generation report saved to: seo-content-generation-report.json');
  }
}

// Run the SEO content generator
const generator = new SEOContentGenerator();
generator.processAllTools().then(() => {
  console.log('\n🎉 SEO content generation completed successfully!');
}).catch(error => {
  console.error('❌ SEO content generation failed:', error);
});