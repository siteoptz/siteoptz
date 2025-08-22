#!/usr/bin/env node

/**
 * Add Paid Search category with 5 specified tools
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function addPaidSearchCategory() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('💰 Adding Paid Search category with 5 tools...\n');
  
  // Create backup
  const backupFile = 'public/data/aiToolsData-paid-search-backup.json';
  fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
  console.log(`📋 Backup created: ${backupFile}\n`);
  
  // Paid Search tools to add
  const paidSearchTools = [
    {
      name: 'Optmyzr',
      description: 'AI-powered PPC management platform that automates Google Ads, Microsoft Ads, and Amazon Ads optimization with advanced bidding strategies and performance insights.',
      overview: {
        developer: 'Optmyzr',
        release_year: 2023,
        category: 'Paid Search',
        description: 'AI-powered PPC management platform that automates Google Ads, Microsoft Ads, and Amazon Ads optimization with advanced bidding strategies and performance insights.',
        website: 'https://www.optmyzr.com/',
        support: 'Email, Chat',
        integrations: ['Google Ads', 'Microsoft Ads', 'Amazon Ads', 'Facebook Ads'],
        pricing: {
          free_tier: false,
          starting_price: 208,
          pricing_model: 'Subscription'
        }
      },
      features: ['PPC Automation', 'Bid Management', 'Keyword Research', 'Performance Analytics'],
      use_cases: ['PPC Campaign Management', 'Ad Optimization', 'Keyword Analysis'],
      pricing: {
        free_tier: false,
        starting_price: 208,
        pricing_model: 'Subscription'
      },
      category: 'Paid Search',
      tags: ['paid search', 'ai tool', 'ppc management']
    },
    {
      name: 'Adzooma',
      description: 'AI-driven advertising platform that manages Google Ads, Microsoft Ads, and Facebook Ads with automated optimization and performance monitoring.',
      overview: {
        developer: 'Adzooma',
        release_year: 2023,
        category: 'Paid Search',
        description: 'AI-driven advertising platform that manages Google Ads, Microsoft Ads, and Facebook Ads with automated optimization and performance monitoring.',
        website: 'https://www.adzooma.com/',
        support: 'Email, Chat, Phone',
        integrations: ['Google Ads', 'Microsoft Ads', 'Facebook Ads'],
        pricing: {
          free_tier: true,
          starting_price: 0,
          pricing_model: 'Freemium'
        }
      },
      features: ['Multi-Platform Management', 'Automated Optimization', 'Performance Reports', 'Bid Management'],
      use_cases: ['Cross-Platform Advertising', 'Campaign Optimization', 'Performance Tracking'],
      pricing: {
        free_tier: true,
        starting_price: 0,
        pricing_model: 'Freemium'
      },
      category: 'Paid Search',
      tags: ['paid search', 'ai tool', 'advertising platform']
    },
    {
      name: 'AdEspresso',
      description: 'Facebook and Instagram advertising platform with AI-powered ad creation, A/B testing, and optimization tools for social media campaigns.',
      overview: {
        developer: 'AdEspresso (Hootsuite)',
        release_year: 2023,
        category: 'Paid Search',
        description: 'Facebook and Instagram advertising platform with AI-powered ad creation, A/B testing, and optimization tools for social media campaigns.',
        website: 'https://adespresso.com/',
        support: 'Email, Chat',
        integrations: ['Facebook Ads', 'Instagram Ads', 'Google Ads'],
        pricing: {
          free_tier: false,
          starting_price: 49,
          pricing_model: 'Subscription'
        }
      },
      features: ['Social Media Advertising', 'A/B Testing', 'Creative Optimization', 'Analytics'],
      use_cases: ['Facebook Advertising', 'Instagram Marketing', 'Social Media Optimization'],
      pricing: {
        free_tier: false,
        starting_price: 49,
        pricing_model: 'Subscription'
      },
      category: 'Paid Search',
      tags: ['paid search', 'ai tool', 'social media advertising']
    },
    {
      name: 'Wordstream',
      description: 'AI-powered online advertising platform that helps businesses manage Google Ads, Microsoft Ads, and Facebook Ads with smart automation and optimization.',
      overview: {
        developer: 'WordStream',
        release_year: 2023,
        category: 'Paid Search',
        description: 'AI-powered online advertising platform that helps businesses manage Google Ads, Microsoft Ads, and Facebook Ads with smart automation and optimization.',
        website: 'https://www.wordstream.com/',
        support: 'Email, Chat, Phone',
        integrations: ['Google Ads', 'Microsoft Ads', 'Facebook Ads'],
        pricing: {
          free_tier: false,
          starting_price: 264,
          pricing_model: 'Subscription'
        }
      },
      features: ['Smart Automation', 'Cross-Platform Management', 'Performance Monitoring', 'Keyword Tools'],
      use_cases: ['PPC Management', 'Ad Optimization', 'Campaign Automation'],
      pricing: {
        free_tier: false,
        starting_price: 264,
        pricing_model: 'Subscription'
      },
      category: 'Paid Search',
      tags: ['paid search', 'ai tool', 'advertising automation']
    },
    {
      name: 'Marin Software',
      description: 'Enterprise-grade digital advertising platform with AI-powered bidding, cross-channel campaign management, and advanced analytics for large-scale advertisers.',
      overview: {
        developer: 'Marin Software',
        release_year: 2023,
        category: 'Paid Search',
        description: 'Enterprise-grade digital advertising platform with AI-powered bidding, cross-channel campaign management, and advanced analytics for large-scale advertisers.',
        website: 'https://www.marinsoftware.com/',
        support: 'Email, Chat, Phone, Dedicated Support',
        integrations: ['Google Ads', 'Microsoft Ads', 'Facebook Ads', 'Amazon Ads', 'Apple Search Ads'],
        pricing: {
          free_tier: false,
          starting_price: 1000,
          pricing_model: 'Enterprise'
        }
      },
      features: ['Enterprise Bidding', 'Cross-Channel Management', 'Advanced Analytics', 'Custom Reporting'],
      use_cases: ['Enterprise Advertising', 'Large-Scale Campaign Management', 'Multi-Channel Optimization'],
      pricing: {
        free_tier: false,
        starting_price: 1000,
        pricing_model: 'Enterprise'
      },
      category: 'Paid Search',
      tags: ['paid search', 'ai tool', 'enterprise advertising']
    }
  ];
  
  // Add each tool to the database
  console.log('➕ Adding Paid Search tools:');
  paidSearchTools.forEach(tool => {
    console.log(`   ✅ ${tool.name} - ${tool.description.substring(0, 80)}...`);
    data.push(tool);
  });
  
  // Save updated data
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Verify addition
  const paidSearchCount = data.filter(tool => 
    (tool.overview?.category || tool.category) === 'Paid Search'
  ).length;
  
  console.log(`\n✅ Successfully added Paid Search category with ${paidSearchCount} tools!`);
  
  // Show updated totals
  const totalTools = data.length;
  console.log(`📈 Total tools in database: ${totalTools}`);
  
  // Show all categories with counts
  const categoryCounts = {};
  data.forEach(tool => {
    const cat = tool.overview?.category || tool.category || 'Unknown';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  
  console.log('\n📊 Updated Category Distribution:');
  Object.entries(categoryCounts)
    .sort(([,a], [,b]) => b - a)
    .forEach(([cat, count]) => {
      const status = cat === 'Paid Search' ? '🆕' : '  ';
      console.log(`   ${status} ${cat}: ${count} tools`);
    });
  
  console.log('\n🎉 Paid Search category successfully added!');
}

addPaidSearchCategory();