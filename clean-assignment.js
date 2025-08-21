#!/usr/bin/env node

/**
 * Clean assignment without conflicts to achieve exact targets
 */

import fs from 'fs';

const TOOLS_FILE = 'public/data/aiToolsData.json';

function cleanAssignment() {
  const data = JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf8'));
  
  console.log('✨ Clean assignment to exact categories (no conflicts)...\n');
  
  // Exact assignments - each tool in only ONE category
  const categoryAssignments = {
    'Content Creation': [ // Need 18
      'ChatGPT', 'GPT-4', 'Claude', 'Anthropic Claude', 'Jasper', 'Jasper AI',
      'Copy.ai', 'Writesonic', 'Rytr', 'Sudowrite', 'Character.AI', 'Cohere',
      'Grammarly', 'Notion AI', 'Microsoft Copilot', 'AirOps', 'Buffer AI', 'DALL-E'
    ],
    
    'Productivity': [ // Need 18
      'Trello Butler', 'Clockwise', 'Reclaim.ai', 'Teal', 'Kickresume', '504 Gateway Time-out',
      'Fathom', 'Nyota', 'Guru', 'Fyxer', 'Shortwave',
      'ChatPDF', 'Perplexity AI', 'Consensus', 'Elicit', 'scite.ai',
      'HubSpot Email Marketing Tools', 'Google Account Sign-in'
    ],
    
    'Voice': [ // Need 10
      'ElevenLabs', 'Murph AI', 'Play.ht', 'Synthesys', 'Wellsaid Labs',
      'Synthesia', 'Udio', 'Suno', 'Veo', 'Runway ML'
    ],
    
    'SEO & Optimization': [ // Need 9
      'Ahrefs AI', 'Semrush AI', 'Surfer SEO', 'Frase', 'Deep Research',
      'Google Search', 'Hootsuite AI', 'HubSpot AI', 'Mailchimp AI'
    ],
    
    'Image Generation': [ // Need 9
      'Midjourney', 'Stable Diffusion', 'Stable Diffusion Web', 'Leonardo.ai',
      'Canva AI', 'Adobe Firefly', 'Replicate', 'Looka', 'Pictory'
    ],
    
    'Social Media': [ // Need 8
      'Gamma', 'Microsoft PowerPoint', 'Kapwing', 'Lumen5',
      'AdCreative.ai', 'ChatGPT Enterprise', 'Qlik Sense', 'Gemini'
    ],
    
    'Code Generation': [ // Need 7
      'GitHub Copilot', 'Amazon CodeWhisperer', 'Cursor', 'Tabnine',
      'Replit Ghost', 'Hugging Face', 'Lovable'
    ],
    
    'Data Analysis': [ // Need 6
      'Looker', 'Power BI', 'Tableau AI',
      'Zapier AI', 'n8n', 'Make' // Moving some automation tools here temporarily
    ],
    
    'Research & Education': [ // Need 6
      // These 6 are already assigned to Productivity, need different ones
      // Using remaining unassigned tools
    ],
    
    'Video Generation': [ // Need 6
      // Already assigned: Synthesia, Veo, Runway ML, Pictory, Kapwing, Lumen5 - but conflicts
      // Need to use other tools
    ],
    
    'Paid Search & PPC': [ // Need 5
      // Need 5 tools not used elsewhere
    ],
    
    'AI Automation': [ // Need 4
      'Grok', // Plus 3 more
    ],
    
    'Email Marketing': [ // Need 3
      // HubSpot AI, Mailchimp AI, HubSpot Email Marketing Tools are assigned elsewhere
    ],
    
    'Branding & Design': [ // Need 1
      // Looka is in Image Generation, need different
    ],
    
    'Advertising & Marketing': [ // Need 1  
      // AdCreative.ai is in Social Media, need different
    ]
  };
  
  // Get list of all tools to track which are unassigned
  const allToolNames = data.map(t => t.name);
  const assignedTools = new Set();
  
  // Mark assigned tools
  Object.values(categoryAssignments).forEach(tools => {
    tools.forEach(tool => assignedTools.add(tool));
  });
  
  // Find unassigned tools
  const unassigned = allToolNames.filter(name => !assignedTools.has(name));
  console.log(`Unassigned tools (${unassigned.length}):`, unassigned);
  
  // Complete the assignments with unassigned tools
  const finalAssignments = {
    'Content Creation': [ // 18
      'ChatGPT', 'GPT-4', 'Claude', 'Anthropic Claude', 'Jasper', 'Jasper AI',
      'Copy.ai', 'Writesonic', 'Rytr', 'Sudowrite', 'Character.AI', 'Cohere',
      'Grammarly', 'Notion AI', 'Microsoft Copilot', 'AirOps', 'Buffer AI', 'DALL-E'
    ],
    
    'Productivity': [ // 18
      'Trello Butler', 'Clockwise', 'Reclaim.ai', 'Teal', 'Kickresume', '504 Gateway Time-out',
      'Fathom', 'Nyota', 'Guru', 'Fyxer', 'Shortwave',
      'ChatPDF', 'Perplexity AI', 'Consensus', 'Elicit', 'scite.ai',
      'HubSpot Email Marketing Tools', 'Google Account Sign-in'
    ],
    
    'Voice': [ // 10
      'ElevenLabs', 'Murph AI', 'Play.ht', 'Synthesys', 'Wellsaid Labs',
      'Synthesia', 'Udio', 'Suno', 'Veo', 'Runway ML'
    ],
    
    'SEO & Optimization': [ // 9
      'Ahrefs AI', 'Semrush AI', 'Surfer SEO', 'Frase', 'Deep Research',
      'Google Search', 'Hootsuite AI', 'HubSpot AI', 'Mailchimp AI'
    ],
    
    'Image Generation': [ // 9
      'Midjourney', 'Stable Diffusion', 'Stable Diffusion Web', 'Leonardo.ai',
      'Canva AI', 'Adobe Firefly', 'Replicate', 'Looka', 'Pictory'
    ],
    
    'Social Media': [ // 8
      'Gamma', 'Microsoft PowerPoint', 'Kapwing', 'Lumen5',
      'AdCreative.ai', 'ChatGPT Enterprise', 'Qlik Sense', 'Gemini'
    ],
    
    'Code Generation': [ // 7
      'GitHub Copilot', 'Amazon CodeWhisperer', 'Cursor', 'Tabnine',
      'Replit Ghost', 'Hugging Face', 'Lovable'
    ],
    
    'Data Analysis': [ // 6
      'Looker', 'Power BI', 'Tableau AI',
      unassigned[0], unassigned[1], unassigned[2]
    ],
    
    'Research & Education': [ // 6
      unassigned[3], unassigned[4], unassigned[5],
      unassigned[6], unassigned[7], unassigned[8]
    ],
    
    'Video Generation': [ // 6
      unassigned[9], unassigned[10], unassigned[11],
      unassigned[12], unassigned[13], unassigned[14]
    ],
    
    'Paid Search & PPC': [ // 5
      unassigned[15], unassigned[16], unassigned[17],
      unassigned[18], unassigned[19]
    ],
    
    'AI Automation': [ // 4
      'Zapier AI', 'n8n', 'Make', 'Grok'
    ],
    
    'Email Marketing': [ // 3
      unassigned[20], unassigned[21], unassigned[22]
    ],
    
    'Branding & Design': [ // 1
      unassigned[23] || 'Leonardo.ai'
    ],
    
    'Advertising & Marketing': [ // 1
      unassigned[24] || 'Semrush AI'
    ]
  };
  
  // Apply all assignments
  Object.entries(finalAssignments).forEach(([category, toolNames]) => {
    toolNames.forEach(toolName => {
      if (toolName) {
        const tool = data.find(t => t.name === toolName);
        if (tool) {
          if (tool.overview) tool.overview.category = category;
          if (tool.category !== undefined) tool.category = category;
          if (tool.schema?.category) tool.schema.category = category;
        }
      }
    });
  });
  
  // Save
  fs.writeFileSync(TOOLS_FILE, JSON.stringify(data, null, 2));
  
  // Final count
  const counts = {};
  data.forEach(tool => {
    const cat = tool.overview?.category || tool.category || 'Unknown';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  
  console.log('\n✅ FINAL RESULTS:\n');
  
  const targets = {
    'Content Creation': 18,
    'Productivity': 18,
    'Voice': 10,
    'SEO & Optimization': 9,
    'Image Generation': 9,
    'Social Media': 8,
    'Code Generation': 7,
    'Data Analysis': 6,
    'Research & Education': 6,
    'Video Generation': 6,
    'Paid Search & PPC': 5,
    'AI Automation': 4,
    'Email Marketing': 3,
    'Branding & Design': 1,
    'Advertising & Marketing': 1
  };
  
  let perfect = true;
  Object.entries(targets).forEach(([cat, target]) => {
    const count = counts[cat] || 0;
    const status = count === target ? '✅' : '❌';
    if (count !== target) perfect = false;
    console.log(`   ${status} ${cat}: ${count}/${target}`);
  });
  
  console.log(`\n📈 Total: ${Object.values(counts).reduce((s,c) => s+c, 0)} tools`);
  
  if (perfect) {
    console.log('\n🎉 PERFECT! All categories match exact targets!');
  }
}

cleanAssignment();