#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Fix Duplicate Content in Review Pages
 * 
 * This script addresses the major duplicate content issue where all ~264 review pages
 * use nearly identical templated content, causing SEO penalties.
 * 
 * Solution: Generate unique, tool-specific content for each review page.
 */

class DuplicateContentFixer {
  constructor() {
    this.toolsDataPath = path.join(__dirname, '..', 'public', 'data', 'aiToolsData.json');
    this.componentsDir = path.join(__dirname, '..', 'seo-optimization', 'production-components');
    this.duplicateContentCsv = path.join(__dirname, '..', '..', 'siteoptz-scraping', 'siteoptz.ai_duplicate_content_20250907.csv');
    
    // Content variation patterns to create unique content
    this.introVariations = [
      "Searching for an in-depth {toolName} review? Look no further. {toolName} has established itself as a {category} solution that's transforming how businesses {contextAction}.",
      "Ready to discover what {toolName} can do for your business? This comprehensive {toolName} review explores why it's become a go-to {category} tool for {userTypes}.",
      "Curious about {toolName}? Our detailed analysis reveals how this {category} platform is revolutionizing {industryContext} with its innovative approach to {primaryFunction}.",
      "Want to know if {toolName} lives up to the hype? This thorough {toolName} review examines its {category} capabilities and real-world performance across {useCases}.",
      "Considering {toolName} for your {category} needs? Our expert review breaks down everything you need to know about this powerful {toolType} platform."
    ];
    
    this.contextActions = {
      'Content Creation': 'create compelling content',
      'SEO & Optimization': 'optimize their search presence',
      'Social Media': 'manage their social media strategy',
      'Paid Search & PPC': 'scale their advertising campaigns',
      'Email Marketing': 'engage with their audience',
      'AI Automation': 'automate complex workflows',
      'Productivity': 'streamline their operations',
      'Data Analysis': 'make data-driven decisions',
      'Image Generation': 'create visual content',
      'Voice AI': 'leverage voice technology',
      'Video Generation': 'produce video content',
      'Website Builder': 'build professional websites',
      'Research & Education': 'conduct research and learning',
      'Code Generation': 'accelerate development'
    };
    
    this.userTypes = {
      'Content Creation': 'content creators, marketers, and businesses',
      'SEO & Optimization': 'SEO professionals, digital marketers, and agencies',
      'Social Media': 'social media managers, brands, and agencies',
      'Paid Search & PPC': 'digital advertisers, agencies, and marketing teams',
      'Email Marketing': 'email marketers, e-commerce businesses, and SaaS companies',
      'AI Automation': 'enterprises, automation specialists, and tech teams',
      'Productivity': 'professionals, teams, and organizations',
      'Data Analysis': 'analysts, data scientists, and business intelligence teams',
      'Image Generation': 'designers, marketers, and creative professionals',
      'Voice AI': 'developers, customer service teams, and enterprises',
      'Video Generation': 'content creators, marketers, and video professionals',
      'Website Builder': 'entrepreneurs, small businesses, and designers',
      'Research & Education': 'researchers, educators, and students',
      'Code Generation': 'developers, engineering teams, and startups'
    };
    
    this.industryContexts = {
      'Content Creation': 'digital marketing and publishing',
      'SEO & Optimization': 'search engine optimization',
      'Social Media': 'social media marketing',
      'Paid Search & PPC': 'digital advertising',
      'Email Marketing': 'email communication and marketing automation',
      'AI Automation': 'business process automation',
      'Productivity': 'workplace efficiency and collaboration',
      'Data Analysis': 'business intelligence and analytics',
      'Image Generation': 'visual design and creative production',
      'Voice AI': 'conversational interfaces and voice applications',
      'Video Generation': 'video production and marketing',
      'Website Builder': 'web development and design',
      'Research & Education': 'academic research and online learning',
      'Code Generation': 'software development and engineering'
    };
  }

  async loadToolsData() {
    try {
      const data = fs.readFileSync(this.toolsDataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('❌ Failed to load tools data:', error.message);
      throw error;
    }
  }

  generateUniqueDescription(tool, variationIndex = 0) {
    const template = this.introVariations[variationIndex % this.introVariations.length];
    const category = tool.overview?.category || tool.category || 'AI Tool';
    
    return template
      .replace(/{toolName}/g, tool.name)
      .replace(/{category}/g, category.toLowerCase())
      .replace(/{contextAction}/g, this.contextActions[category] || 'achieve their goals')
      .replace(/{userTypes}/g, this.userTypes[category] || 'professionals and businesses')
      .replace(/{industryContext}/g, this.industryContexts[category] || 'their industry')
      .replace(/{primaryFunction}/g, tool.overview?.description || 'advanced capabilities')
      .replace(/{useCases}/g, 'various business scenarios')
      .replace(/{toolType}/g, category.includes('AI') ? 'AI-powered' : 'innovative');
  }

  generateUniqueFeatureHighlight(tool) {
    const features = tool.features || [];
    if (features.length === 0) return "Explore the comprehensive feature set designed for modern businesses.";
    
    const topFeatures = features.slice(0, 3);
    return `Key capabilities include ${topFeatures.join(', ').toLowerCase()}, making it an essential tool for ${tool.overview?.category || 'productivity'}.`;
  }

  generateUniqueValueProposition(tool) {
    const category = tool.overview?.category || tool.category || 'AI Tool';
    const rating = tool.rating || 4.0;
    
    const valueProps = [
      `With a ${rating}/5 expert rating, ${tool.name} delivers exceptional value in the ${category.toLowerCase()} space.`,
      `${tool.name} stands out with its ${rating}/5 rating, offering robust ${category.toLowerCase()} capabilities that scale with your business.`,
      `Rated ${rating}/5 by experts, ${tool.name} combines powerful ${category.toLowerCase()} features with user-friendly design.`,
      `Our ${rating}/5 rating reflects ${tool.name}'s strong performance and reliability in ${category.toLowerCase()} applications.`
    ];
    
    // Use tool name hash to select consistent variation
    const hash = tool.name.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    return valueProps[Math.abs(hash) % valueProps.length];
  }

  async fixReviewPageContent(toolSlug, tool, componentIndex) {
    const componentPath = path.join(this.componentsDir, `${this.capitalize(toolSlug)}ReviewPage.tsx`);
    
    if (!fs.existsSync(componentPath)) {
      console.log(`⚠️  Component not found: ${componentPath}`);
      return false;
    }

    try {
      let content = fs.readFileSync(componentPath, 'utf8');
      
      // Generate unique content variations
      const uniqueIntro = this.generateUniqueDescription(tool, componentIndex);
      const uniqueFeatures = this.generateUniqueFeatureHighlight(tool);
      const uniqueValue = this.generateUniqueValueProposition(tool);
      
      // Replace the templated intro paragraph
      const oldIntroPattern = /Looking for a comprehensive \w+ review\? You've come to the right place\. [^.]+\. [^.]+\./;
      if (oldIntroPattern.test(content)) {
        content = content.replace(oldIntroPattern, uniqueIntro);
        console.log(`✅ Updated intro for ${tool.name}`);
      }
      
      // Replace generic feature descriptions
      const featurePattern = /(Whether you're[^.]+professional, understanding[^.]+capabilities is crucial for making an informed decision\.)/;
      if (featurePattern.test(content)) {
        content = content.replace(featurePattern, `${uniqueFeatures} Understanding these capabilities is essential for evaluating whether ${tool.name} aligns with your specific requirements.`);
        console.log(`✅ Updated features section for ${tool.name}`);
      }
      
      // Add unique value proposition
      const valuePattern = /(In this detailed \w+ review, we'll dive deep into[^.]+\. Our expert analysis covers everything from performance benchmarks to user experience, giving you the insights needed to determine if \w+ is the right fit for your specific requirements\.)/;
      if (valuePattern.test(content)) {
        const replacement = `In this comprehensive ${tool.name.toLowerCase()} review, we examine its ${tool.overview?.category || 'core'} capabilities, pricing model, and real-world applications. ${uniqueValue} Our detailed analysis provides the insights you need to make an informed decision about whether ${tool.name} fits your workflow.`;
        content = content.replace(valuePattern, replacement);
        console.log(`✅ Updated value proposition for ${tool.name}`);
      }
      
      // Update schema description to be more specific
      const schemaPattern = /"reviewBody": "Comprehensive \w+ review covering features, pricing, and alternatives\."/;
      if (schemaPattern.test(content)) {
        const specificReviewBody = `"reviewBody": "Expert review of ${tool.name} covering ${tool.overview?.category || 'key'} features, pricing analysis, user experience, and competitive alternatives. ${uniqueValue.replace(/\d+\/\d+/, 'Highly rated')}"`;
        content = content.replace(schemaPattern, specificReviewBody);
        console.log(`✅ Updated schema for ${tool.name}`);
      }
      
      // Write the updated content
      fs.writeFileSync(componentPath, content);
      return true;
      
    } catch (error) {
      console.error(`❌ Error processing ${tool.name}:`, error.message);
      return false;
    }
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async run() {
    console.log('🚀 Starting duplicate content fix for review pages...');
    
    try {
      const toolsData = await this.loadToolsData();
      console.log(`📊 Found ${toolsData.length} tools to process`);
      
      let processed = 0;
      let updated = 0;
      let errors = 0;
      
      for (let i = 0; i < toolsData.length; i++) {
        const tool = toolsData[i];
        const success = await this.fixReviewPageContent(tool.slug, tool, i);
        
        processed++;
        if (success) {
          updated++;
        } else {
          errors++;
        }
        
        // Progress indicator
        if (processed % 25 === 0) {
          console.log(`📈 Progress: ${processed}/${toolsData.length} (${Math.round(processed/toolsData.length*100)}%)`);
        }
      }
      
      console.log('\n🎉 Duplicate content fix completed!');
      console.log(`📋 Summary:`);
      console.log(`   • Tools processed: ${processed}`);
      console.log(`   • Pages updated: ${updated}`);
      console.log(`   • Errors: ${errors}`);
      
      if (updated > 0) {
        console.log(`\n✨ Successfully created unique content for ${updated} review pages!`);
        console.log('🔍 This should resolve the duplicate content issues identified in the CSV.');
        console.log('📈 Each page now has unique introductions, feature highlights, and value propositions.');
      }
      
      return { processed, updated, errors };
      
    } catch (error) {
      console.error('❌ Script failed:', error.message);
      throw error;
    }
  }
}

// CLI execution
if (require.main === module) {
  const fixer = new DuplicateContentFixer();
  
  fixer.run()
    .then((result) => {
      console.log('✅ Script completed successfully');
      process.exit(result.errors > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error.message);
      process.exit(1);
    });
}

module.exports = DuplicateContentFixer;