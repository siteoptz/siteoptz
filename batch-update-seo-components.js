const fs = require('fs');
const path = require('path');

// Tool-specific data for proper content generation
const toolSpecificData = {
  'claude': {
    category: 'AI Assistant',
    description: 'Anthropic\'s Claude is an advanced AI assistant focused on safety, helpfulness, and honest conversations.',
    pricing: [
      { plan: 'Free', price_per_month: 0, features: ['Claude 3 Haiku', 'Limited usage', 'Web interface'] },
      { plan: 'Pro', price_per_month: 20, features: ['Claude 3 Opus & Sonnet', 'Higher usage limits', 'Priority access'] },
      { plan: 'Team', price_per_month: 25, features: ['Team workspace', 'Admin controls', 'Early access'] }
    ],
    features: [
      'Advanced reasoning and analysis',
      'Document analysis up to 200k tokens',
      'Code generation and debugging',
      'Creative writing assistance',
      'Research and summarization',
      'Multi-language support'
    ],
    useCases: [
      'Content creation and editing',
      'Research and analysis',
      'Code development assistance',
      'Educational tutoring',
      'Business document analysis'
    ],
    pros: [
      'Superior reasoning capabilities',
      'Large context window (200k tokens)',
      'Strong safety measures',
      'Excellent for complex analysis',
      'High-quality code generation'
    ],
    cons: [
      'More expensive than some alternatives',
      'Limited image generation',
      'Smaller knowledge base than GPT-4',
      'No voice interface yet'
    ]
  },
  'midjourney': {
    category: 'Image Generation',
    description: 'Midjourney is a leading AI image generation platform that creates stunning artwork from text prompts.',
    pricing: [
      { plan: 'Basic', price_per_month: 10, features: ['200 images/month', 'Community gallery', 'General commercial terms'] },
      { plan: 'Standard', price_per_month: 30, features: ['Unlimited generations', 'Stealth mode', 'Priority queue'] },
      { plan: 'Pro', price_per_month: 60, features: ['Unlimited generations', 'Stealth mode', '12 concurrent jobs'] }
    ],
    features: [
      'Text-to-image generation',
      'Style and aesthetic control',
      'Aspect ratio customization',
      'Image variation generation',
      'Upscaling and enhancement',
      'Community gallery'
    ],
    useCases: [
      'Digital art creation',
      'Marketing visual content',
      'Concept art and prototyping',
      'Social media graphics',
      'Book and article illustrations'
    ],
    pros: [
      'Exceptional image quality',
      'Unique artistic styles',
      'Active community',
      'Regular model updates',
      'Commercial usage rights'
    ],
    cons: [
      'Discord-only interface',
      'No API access for Basic plan',
      'Learning curve for prompting',
      'Limited control over specific details'
    ]
  },
  'jasper-ai': {
    category: 'Content Creation',
    description: 'Jasper AI is a comprehensive content creation platform designed for marketing teams and businesses.',
    pricing: [
      { plan: 'Creator', price_per_month: 49, features: ['1 user', '50K words/month', '50+ templates'] },
      { plan: 'Pro', price_per_month: 69, features: ['5 users', 'Unlimited words', 'Brand voice', 'SEO mode'] },
      { plan: 'Business', price_per_month: 'Custom', features: ['Custom users', 'API access', 'Custom AI models'] }
    ],
    features: [
      'AI content generation',
      'Brand voice training',
      '50+ content templates',
      'SEO optimization tools',
      'Team collaboration',
      'Multi-language support'
    ],
    useCases: [
      'Blog content creation',
      'Marketing copy writing',
      'Social media content',
      'Email marketing campaigns',
      'Product descriptions'
    ],
    pros: [
      'Excellent marketing-focused content',
      'Strong brand voice consistency',
      'Comprehensive template library',
      'SEO optimization features',
      'Team collaboration tools'
    ],
    cons: [
      'Higher pricing than alternatives',
      'Requires training for best results',
      'Limited free tier',
      'Can produce repetitive content'
    ]
  }
};

// Function to generate tool-specific content
function generateToolContent(toolSlug, toolName, data) {
  const toolData = toolSpecificData[toolSlug] || {
    category: 'AI Tools',
    description: `${toolName} is an innovative AI solution designed to enhance productivity and streamline workflows.`,
    features: [
      'Advanced AI capabilities',
      'User-friendly interface', 
      'Integration support',
      'Scalable architecture',
      'Performance optimization'
    ],
    useCases: [
      'Business automation',
      'Content enhancement',
      'Workflow optimization',
      'Team collaboration'
    ],
    pros: [
      'Innovative technology',
      'User-friendly design',
      'Good performance',
      'Regular updates'
    ],
    cons: [
      'Learning curve',
      'Pricing considerations',
      'Feature limitations',
      'Integration complexity'
    ]
  };

  const keyFeaturesSection = `                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">When evaluating ${toolName}, understanding its core features is essential for determining fit. Our analysis reveals several standout capabilities that set ${toolName} apart in the ${toolData.category} market.</p>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mb-6 mt-10">Core Features Overview</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">${toolName} offers a comprehensive suite of features designed for ${toolData.category.toLowerCase()} applications:</p>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg"><strong className="text-white font-semibold">Primary Capabilities:</strong></p>
                    <ul className="list-disc list-inside mb-8 space-y-3 text-lg">
                      ${toolData.features.map(feature => 
                        `<li className="text-gray-300 mb-3 leading-relaxed"><strong className="text-white font-semibold">${feature}</strong>: Advanced implementation for enhanced productivity</li>`
                      ).join('\n                      ')}
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mb-6 mt-10">Performance Benchmarks</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">Our testing reveals ${toolName} consistently delivers reliable performance across different use cases. Speed, accuracy, and reliability scores place it among the top ${toolData.category.toLowerCase()} solutions available today.</p>
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">The feature set positions ${toolName} as a versatile solution suitable for various business sizes and industries. Whether you&apos;re looking for basic functionality or advanced capabilities, ${toolName} provides the tools needed to succeed.</p>`;

  const pricingSection = `                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">Understanding ${toolName} pricing is crucial for budget planning and ROI assessment. Our analysis breaks down each plan to help you choose the most cost-effective option.</p>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mb-6 mt-10">Pricing Structure Overview</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">${toolName} offers tiered pricing designed to accommodate different business needs and budgets:</p>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg"><strong className="text-white font-semibold">Plan Comparison:</strong></p>
                    <ul className="list-disc list-inside mb-8 space-y-3 text-lg">
                      ${toolData.pricing ? toolData.pricing.map(plan => 
                        `<li className="text-gray-300 mb-3 leading-relaxed"><strong className="text-white font-semibold">${plan.plan} ${plan.price_per_month === 0 ? '(Free)' : plan.price_per_month === 'Custom' ? '(Custom)' : `($${plan.price_per_month}/month)`}</strong>: ${plan.features.join(', ')}</li>`
                      ).join('\n                      ') : `<li className="text-gray-300 mb-3 leading-relaxed"><strong className="text-white font-semibold">Contact for Pricing</strong>: Custom pricing based on usage and requirements</li>`}
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mb-6 mt-10">Value Assessment</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">When evaluating ${toolName} pricing, consider these key factors for ROI optimization.</p>`;

  const useCasesSection = `                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">Understanding how ${toolName} performs in real-world scenarios helps evaluate its potential impact on your specific needs. Our research identifies several key use cases where ${toolName} excels.</p>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mb-6 mt-10">Primary Use Cases</h3>
                    <ul className="list-disc list-inside mb-8 space-y-3 text-lg">
                      ${toolData.useCases.map(useCase => 
                        `<li className="text-gray-300 mb-3 leading-relaxed"><strong className="text-white font-semibold">${useCase}</strong>: Optimized workflows for enhanced results</li>`
                      ).join('\n                      ')}
                    </ul>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">These applications demonstrate ${toolName}&apos;s versatility and potential impact across various business contexts.</p>`;

  const prosConsSection = `                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">Every tool has strengths and limitations. Our comprehensive evaluation identifies key advantages and potential drawbacks to help you make an informed decision.</p>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mb-6 mt-10">Advantages</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg"><strong className="text-white font-semibold">Key Strengths:</strong></p>
                    <ul className="list-disc list-inside mb-8 space-y-3 text-lg">
                      ${toolData.pros.map(pro => 
                        `<li className="text-gray-300 mb-3 leading-relaxed"><strong className="text-white font-semibold">${pro}</strong></li>`
                      ).join('\n                      ')}
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mb-6 mt-10">Limitations</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg"><strong className="text-white font-semibold">Areas for Improvement:</strong></p>
                    <ul className="list-disc list-inside mb-8 space-y-3 text-lg">
                      ${toolData.cons.map(con => 
                        `<li className="text-gray-300 mb-3 leading-relaxed"><strong className="text-white font-semibold">${con}</strong></li>`
                      ).join('\n                      ')}
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-cyan-400 mb-6 mt-10">Overall Assessment</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">${toolName} represents a strong choice in the ${toolData.category} category, with advantages typically outweighing limitations for most use cases.</p>`;

  return { keyFeaturesSection, pricingSection, useCasesSection, prosConsSection };
}

// Function to update a component file
function updateComponentFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);
    
    // Extract tool name from file path
    const fileName = path.basename(filePath, '.tsx');
    const toolSlug = fileName.replace('ReviewPage', '').toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2');
    const toolName = fileName.replace('ReviewPage', '').replace(/([a-z])([A-Z])/g, '$1 $2');
    
    console.log(`Tool: ${toolName}, Slug: ${toolSlug}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if this is a template-based component that needs updating
    if (!content.includes('When evaluating ' + toolName + ', understanding its core features is essential')) {
      console.log(`Skipping ${toolName} - already properly structured`);
      return false;
    }
    
    // Generate tool-specific content
    const { keyFeaturesSection, pricingSection, useCasesSection, prosConsSection } = generateToolContent(toolSlug, toolName, {});
    
    let updatedContent = content;
    
    // Update key features section
    const featuresRegex = /(<div className="space-y-6">[\s\S]*?When evaluating [^,]+, understanding its core features is essential[\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/;
    if (featuresRegex.test(updatedContent)) {
      updatedContent = updatedContent.replace(featuresRegex, `<div className="space-y-6">
${keyFeaturesSection}
                  </div>
                </div>
                
                
              </div>`);
    }
    
    // Update pricing section  
    const pricingRegex = /(<div className="space-y-6">[\s\S]*?Understanding [^,]+ pricing is crucial[\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/;
    if (pricingRegex.test(updatedContent)) {
      updatedContent = updatedContent.replace(pricingRegex, `<div className="space-y-6">
${pricingSection}
                  </div>
                </div>
                
                
              </div>`);
    }
    
    // Update use cases section
    const useCasesRegex = /(<div className="space-y-6">[\s\S]*?Understanding how [^,]+ performs in real-world scenarios[\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/;
    if (useCasesRegex.test(updatedContent)) {
      updatedContent = updatedContent.replace(useCasesRegex, `<div className="space-y-6">
${useCasesSection}
                  </div>
                </div>
                
                
              </div>`);
    }
    
    // Write the updated content back
    fs.writeFileSync(filePath, updatedContent);
    console.log(`✅ Updated: ${toolName}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting batch SEO component updates...\n');
  
  const componentsDir = './seo-optimization/production-components';
  const files = fs.readdirSync(componentsDir)
    .filter(file => file.endsWith('ReviewPage.tsx'))
    .map(file => path.join(componentsDir, file));
  
  console.log(`Found ${files.length} review page components\n`);
  
  let updated = 0;
  let skipped = 0;
  
  for (const file of files) {
    const success = updateComponentFile(file);
    if (success) {
      updated++;
    } else {
      skipped++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`✅ Updated: ${updated} components`);
  console.log(`⏭️  Skipped: ${skipped} components`);
  console.log(`📁 Total: ${files.length} components processed`);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { updateComponentFile, generateToolContent };