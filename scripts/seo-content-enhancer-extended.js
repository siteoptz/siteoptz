#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Extended SEO Content Enhancer
 * Generates content for remaining page types not covered by the main script
 */

const EXTENDED_CONTENT = {
  generic: {
    getTitle: (pageName, section) => {
      const formattedName = pageName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      const sectionTitles = {
        'case-studies': `${formattedName} Case Study: Real-World AI Implementation Success`,
        'resources': `${formattedName} Guide 2025: Comprehensive AI Resource`,
        'reviews': `${formattedName} Review 2025: Complete Feature Analysis & Pricing`,
        'reports': `${formattedName} Report 2025: Industry Analysis & Insights`,
        'tools': `${formattedName} Calculator: AI ROI & Business Impact Analysis`,
        'webinars': `${formattedName} Webinar: Expert AI Implementation Training`,
        'podcasts': `${formattedName} Podcast Transcript: AI Industry Insights`
      };
      
      return sectionTitles[section] || `${formattedName}: AI Solutions & Implementation Guide`;
    },
    
    getDescription: (pageName, section) => {
      const formattedName = pageName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      const sectionDescriptions = {
        'case-studies': `Explore ${formattedName.toLowerCase()} AI implementation case study. Real results, strategies, challenges overcome, and ROI analysis from successful deployments.`,
        'resources': `Complete ${formattedName.toLowerCase()} guide for AI implementation. Best practices, tools, strategies, and expert insights for successful deployment.`,
        'reviews': `In-depth ${formattedName} review covering features, pricing, performance, pros & cons. Expert analysis and user feedback for informed decisions.`,
        'reports': `Comprehensive ${formattedName.toLowerCase()} industry report with market analysis, trends, forecasts, and strategic recommendations for businesses.`,
        'tools': `${formattedName} ROI calculator and analysis tool. Calculate potential AI investment returns and business impact with detailed metrics.`,
        'webinars': `${formattedName} expert webinar covering implementation strategies, best practices, and real-world use cases for AI deployment success.`,
        'podcasts': `${formattedName} podcast transcript with industry experts discussing trends, strategies, and implementation insights for AI solutions.`
      };
      
      return sectionDescriptions[section] || `Comprehensive guide to ${formattedName.toLowerCase()} AI implementation, featuring expert insights, best practices, and strategic recommendations.`;
    },

    generateContent: (pageName, section) => {
      const title = EXTENDED_CONTENT.generic.getTitle(pageName, section);
      const description = EXTENDED_CONTENT.generic.getDescription(pageName, section);
      const formattedName = pageName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      const contentSections = {
        'case-studies': [
          {
            title: 'Executive Summary',
            content: `This case study examines a successful ${formattedName.toLowerCase()} AI implementation that delivered measurable business results. We analyze the strategies, challenges, and outcomes to provide actionable insights for similar deployments.

**Key Achievements:**
- Significant operational efficiency improvements
- Cost reduction and ROI realization
- Enhanced customer satisfaction scores  
- Streamlined processes and workflows

The implementation demonstrates how strategic AI adoption can transform business operations and deliver competitive advantages.`
          },
          {
            title: 'Business Challenge & Context',
            content: `Organizations implementing ${formattedName.toLowerCase()} AI solutions typically face common challenges including operational inefficiencies, manual processes, and the need for data-driven insights.

**Common Pain Points:**
- Manual processes consuming excessive time and resources
- Inconsistent quality and performance metrics
- Limited scalability of existing operations
- Difficulty extracting actionable insights from data

**Strategic Objectives:**
- Automate repetitive and time-intensive tasks
- Improve accuracy and consistency of operations
- Scale operations without proportional resource increases
- Enable data-driven decision making processes`
          },
          {
            title: 'Implementation Strategy & Approach',
            content: `The ${formattedName.toLowerCase()} AI implementation followed a structured approach designed to minimize disruption while maximizing value realization.

**Phase 1: Assessment & Planning**
- Current state analysis and gap identification
- Technology requirements and infrastructure planning
- Stakeholder alignment and change management preparation
- Success metrics definition and measurement framework

**Phase 2: Solution Development**
- AI model selection and customization
- Integration with existing systems and workflows
- User interface design and experience optimization
- Testing and validation in controlled environments

**Phase 3: Deployment & Adoption**
- Phased rollout with continuous monitoring
- User training and support programs
- Performance optimization and fine-tuning
- Feedback collection and iterative improvements`
          },
          {
            title: 'Results & Business Impact',
            content: `The ${formattedName.toLowerCase()} AI implementation delivered substantial measurable improvements across multiple business dimensions.

**Operational Improvements:**
- Process efficiency increased by 40-60%
- Error rates reduced by 70-85%
- Processing time decreased by 50-70%
- Resource utilization optimized by 35-50%

**Business Benefits:**
- Cost savings of 25-40% in target areas
- Revenue opportunities from improved capacity
- Enhanced customer satisfaction and retention
- Competitive advantage through innovation

**Strategic Outcomes:**
- Foundation established for additional AI initiatives
- Organizational AI capabilities and expertise developed
- Data-driven culture and decision-making processes
- Scalable framework for future technology adoption`
          }
        ],
        
        'resources': [
          {
            title: 'Introduction & Overview',
            content: `${formattedName} represents a critical component of modern AI implementation strategies. This comprehensive guide provides practical insights, proven methodologies, and expert recommendations for successful deployment.

Understanding the ${formattedName.toLowerCase()} landscape requires knowledge of current technologies, best practices, and implementation approaches that drive measurable business value.

This resource combines industry expertise with real-world case studies to deliver actionable guidance for organizations at any stage of their AI journey.`
          },
          {
            title: 'Key Components & Technologies',
            content: `Successful ${formattedName.toLowerCase()} implementation requires understanding of core components and enabling technologies.

**Technology Stack:**
- Foundation platforms and infrastructure requirements
- Integration frameworks and API architectures  
- Data management and processing capabilities
- Security and compliance considerations

**Core Components:**
- User interfaces and experience design
- Business logic and workflow automation
- Analytics and reporting capabilities
- Monitoring and performance optimization

**Integration Points:**
- Existing enterprise systems and databases
- Third-party services and external APIs
- Cloud platforms and deployment environments
- Mobile and web application interfaces`
          },
          {
            title: 'Implementation Best Practices',
            content: `Following proven best practices ensures successful ${formattedName.toLowerCase()} implementation while minimizing common pitfalls and risks.

**Planning & Strategy:**
- Define clear objectives and success metrics
- Conduct thorough requirements analysis
- Plan for change management and user adoption
- Establish governance and oversight processes

**Technical Implementation:**
- Follow modular and scalable architecture patterns
- Implement robust testing and quality assurance
- Ensure security and compliance requirements
- Plan for monitoring and maintenance

**Organizational Readiness:**
- Invest in team training and skill development
- Establish cross-functional collaboration
- Create feedback loops and continuous improvement
- Document processes and knowledge transfer`
          },
          {
            title: 'Success Strategies & Recommendations',
            content: `Maximize your ${formattedName.toLowerCase()} implementation success with these proven strategies and expert recommendations.

**Strategic Approach:**
- Start with pilot projects to validate concepts
- Focus on high-impact use cases for initial deployment
- Build internal capabilities and expertise
- Establish partnerships with technology providers

**Operational Excellence:**
- Implement comprehensive monitoring and alerting
- Establish clear support and maintenance procedures
- Create user training and adoption programs
- Develop feedback mechanisms and improvement processes

**Long-term Success:**
- Plan for scalability and future expansion
- Stay current with technology developments
- Foster innovation and experimentation culture
- Measure and communicate value and impact`
          }
        ],

        'reviews': [
          {
            title: 'Platform Overview & Positioning',
            content: `${formattedName} represents a significant solution in the AI technology landscape, designed to address specific business challenges and use cases.

This comprehensive review examines the platform's capabilities, performance characteristics, and suitability for different organizational needs and requirements.

Our analysis covers technical features, pricing models, user experience, integration capabilities, and overall value proposition based on extensive evaluation and user feedback.`
          },
          {
            title: 'Core Features & Capabilities',
            content: `${formattedName} offers a comprehensive feature set designed to support various business requirements and use cases.

**Primary Features:**
- Core functionality and primary use case support
- Advanced analytics and reporting capabilities
- Integration tools and API access
- User management and security features

**Advanced Capabilities:**
- Machine learning and AI-powered features
- Automation and workflow management
- Customization and configuration options
- Mobile and cross-platform support

**Technical Specifications:**
- Performance and scalability characteristics
- Security and compliance certifications
- Data handling and privacy features
- Support and maintenance offerings`
          },
          {
            title: 'Pricing Analysis & Value Proposition',
            content: `Understanding ${formattedName} pricing structure and value proposition is essential for making informed technology investment decisions.

**Pricing Tiers:**
- Starter/Free tier limitations and capabilities
- Professional tier features and pricing
- Enterprise tier advanced features and custom pricing
- Add-on services and additional cost considerations

**Value Analysis:**
- Cost per user and usage-based pricing models
- Total cost of ownership including implementation
- ROI potential and payback period analysis
- Competitive pricing comparison with alternatives

**Investment Considerations:**
- Initial setup and onboarding costs
- Ongoing operational and maintenance expenses
- Training and change management investments
- Long-term scaling and expansion costs`
          },
          {
            title: 'User Experience & Performance',
            content: `Real-world ${formattedName} performance and user experience insights based on extensive testing and user feedback analysis.

**Performance Metrics:**
- System responsiveness and processing speed
- Reliability and uptime characteristics
- Scalability under varying load conditions
- Integration performance with existing systems

**User Experience:**
- Interface design and usability assessment
- Learning curve and adoption challenges
- Mobile and cross-platform experience
- Support quality and response times

**Strengths & Limitations:**
- Key advantages and differentiating features
- Areas for improvement and current limitations
- Competitive advantages and market position
- Suitability for different organization types and sizes`
          }
        ]
      };

      const sections = contentSections[section] || contentSections['resources'];
      
      return { title, description, sections, formattedName };
    }
  }
};

function generateGenericContent(pageName, section, filePath) {
  const { title, description, sections, formattedName } = EXTENDED_CONTENT.generic.generateContent(pageName, section);
  const componentName = toPascalCase(pageName.replace(/-/g, ' ') + ' ' + section.slice(0, -1));
  
  const bgColors = {
    'case-studies': 'bg-green-500/10',
    'resources': 'bg-blue-500/10', 
    'reviews': 'bg-purple-500/10',
    'reports': 'bg-cyan-500/10',
    'tools': 'bg-orange-500/10',
    'webinars': 'bg-pink-500/10',
    'podcasts': 'bg-indigo-500/10'
  };
  
  const gradients = {
    'case-studies': 'from-green-600 to-blue-600',
    'resources': 'from-blue-600 to-purple-600',
    'reviews': 'from-purple-600 to-cyan-600', 
    'reports': 'from-cyan-600 to-green-600',
    'tools': 'from-orange-600 to-red-600',
    'webinars': 'from-pink-600 to-purple-600',
    'podcasts': 'from-indigo-600 to-blue-600'
  };

  return `import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ${componentName}() {
  const title = "${title}";
  const description = "${description}";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="${getKeywordsFromTitle(title)}" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={\`https://siteoptz.ai/${section}/${pageName}\`} />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={\`https://siteoptz.ai/${section}/${pageName}\`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="SiteOptz" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 ${bgColors[section] || 'bg-blue-500/10'} rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
          {/* Navigation */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/${section}" className="hover:text-cyan-400 transition-colors">${section.charAt(0).toUpperCase() + section.slice(1)}</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-cyan-400">${formattedName}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              ${formattedName}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ${description.split('.')[0]}
            </p>
          </header>

          {/* Content Sections */}
          <div className="space-y-12">
            ${sections.map((section, index) => `
            <section className="bg-black/50 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">${section.title}</h2>
              <div className="prose prose-invert max-w-none">
                ${section.content.split('\n\n').map(paragraph => 
                  paragraph.startsWith('**') 
                    ? `<div className="space-y-2">${formatListContent(paragraph)}</div>`
                    : `<p className="text-gray-300 mb-4">${paragraph}</p>`
                ).join('\n                ')}
              </div>
            </section>`).join('')}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-gray-900/20 to-gray-800/20 border border-gray-800 rounded-2xl p-12 mt-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business with AI?
            </h3>
            <p className="text-gray-300 mb-8">
              Get personalized AI strategy recommendations from our experts and accelerate your transformation journey.
            </p>
            <a
              href="https://api.leadconnectorhq.com/widget/booking/yPjkVmsauPst8XlrOQUl"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r ${gradients[section] || 'from-blue-600 to-purple-600'} text-white hover:from-blue-700 hover:to-purple-700 font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Schedule Your AI Strategy Session
            </a>
          </div>
        </div>
      </div>
    </>
  );
}`;
}

// Utility functions
function toPascalCase(str) {
  return str.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase()).replace(/\s+/g, '');
}

function getKeywordsFromTitle(title) {
  return title.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 10)
    .join(', ');
}

function formatListContent(content) {
  return content.replace(/\*\*(.*?):\*\*/g, '<h4 className="font-semibold text-white mb-2">$1:</h4>')
               .replace(/^- (.*?)$/gm, '<p className="text-gray-300 ml-4 mb-2">• $1</p>');
}

function main() {
  console.log('🔧 Running Extended SEO Content Enhancement...');
  
  // Read CSV to get remaining pages
  const csvPath = '/Users/siteoptz/siteoptz-scraping/siteoptz.ai_http_4xx_client_errors_20250907.csv';
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n').slice(1);
  
  const pages = lines
    .filter(line => line.trim())
    .map(line => {
      const [url] = line.split(',');
      return url.replace('https://siteoptz.ai/', '').replace('https://www.siteoptz.ai/', '');
    })
    .filter((page, index, array) => array.indexOf(page) === index);

  let enhancedCount = 0;
  let totalPages = 0;

  pages.forEach(pagePath => {
    const parts = pagePath.split('/');
    const section = parts[0];
    const pageName = parts[1];
    
    if (!pageName || pageName.includes('.txt')) return;
    
    const filePath = `/Users/siteoptz/siteoptz/pages/${pagePath}.tsx`;
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return;
    }
    
    totalPages++;
    
    try {
      const currentContent = fs.readFileSync(filePath, 'utf8');
      
      // Only enhance if it contains placeholder content
      if (currentContent.includes('Coming Soon') || 
          currentContent.includes('Resource Coming Soon') ||
          currentContent.includes('We&apos;re preparing') ||
          currentContent.includes('Case Study Coming Soon')) {
        
        const newContent = generateGenericContent(pageName, section, filePath);
        fs.writeFileSync(filePath, newContent);
        enhancedCount++;
        console.log(`✅ Enhanced: ${pagePath}`);
      } else {
        console.log(`⏭️  Skipped (already enhanced): ${pagePath}`);
      }
    } catch (error) {
      console.log(`⚠️  Error enhancing ${pagePath}: ${error.message}`);
    }
  });
  
  console.log(`\n🎉 Extended SEO Enhancement Complete!`);
  console.log(`📊 Enhanced ${enhancedCount} additional pages out of ${totalPages} candidates`);
}

if (require.main === module) {
  main();
}

module.exports = { main };