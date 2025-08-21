/**
 * Configuration for specific AI tools to be scraped
 * Organized by category with full metadata
 */

export const specificToolsConfig = {
  // AI Assistants
  "ai-assistants": [
    {
      id: "grok",
      name: "Grok",
      url: "https://grok.x.ai",
      category: "AI Assistants",
      description: "AI assistant by xAI with real-time knowledge and witty personality",
      expectedPricing: { free: false, starting: 8 }
    }
  ],

  // Video Generation
  "video-generation": [
    {
      id: "google-veo",
      name: "Google Veo",
      url: "https://deepmind.google/technologies/veo/",
      category: "Video Generation",
      description: "Google's advanced AI video generation model",
      expectedPricing: { free: true, starting: 0 }
    },
    {
      id: "opus-clip",
      name: "OpusClip",
      url: "https://www.opus.pro",
      category: "Video Generation",
      description: "AI-powered video clipping and editing tool for content creators",
      expectedPricing: { free: true, starting: 0, pro: 9 }
    }
  ],

  // Meeting Assistants
  "meeting-assistants": [
    {
      id: "fathom",
      name: "Fathom",
      url: "https://fathom.video",
      category: "Meeting Assistants",
      description: "AI meeting assistant that records, transcribes, and summarizes meetings",
      expectedPricing: { free: true, starting: 0, pro: 19 }
    },
    {
      id: "nyota",
      name: "Nyota AI",
      url: "https://www.nyota.ai",
      category: "Meeting Assistants",
      description: "AI-powered meeting notes and action items automation",
      expectedPricing: { free: false, starting: 15 }
    }
  ],

  // Automation
  "automation": [
    {
      id: "n8n",
      name: "n8n",
      url: "https://n8n.io",
      category: "Automation",
      description: "Workflow automation tool with AI capabilities and node-based editor",
      expectedPricing: { free: true, starting: 0, pro: 20 }
    },
    {
      id: "make",
      name: "Make (formerly Integromat)",
      url: "https://www.make.com",
      category: "Automation",
      description: "Visual platform for automating workflows with AI integration",
      expectedPricing: { free: true, starting: 0, pro: 9 }
    }
  ],

  // Research
  "research": [
    {
      id: "deep-research",
      name: "Deep Research",
      url: "https://deepresearch.com",
      category: "Research & Education",
      description: "AI-powered research assistant for academic and professional research",
      expectedPricing: { free: false, starting: 29 }
    },
    {
      id: "notebook-lm",
      name: "NotebookLM",
      url: "https://notebooklm.google.com",
      category: "Research & Education",
      description: "Google's AI-powered research and note-taking assistant",
      expectedPricing: { free: true, starting: 0 }
    }
  ],

  // Writing
  "writing": [
    {
      id: "rytr",
      name: "Rytr",
      url: "https://rytr.me",
      category: "Content Creation",
      description: "AI writing assistant for creating high-quality content in seconds",
      expectedPricing: { free: true, starting: 0, pro: 9 }
    },
    {
      id: "sudowrite",
      name: "Sudowrite",
      url: "https://www.sudowrite.com",
      category: "Content Creation",
      description: "AI writing tool designed specifically for creative fiction writers",
      expectedPricing: { free: false, starting: 19 }
    }
  ],

  // Search Engines
  "search-engines": [
    {
      id: "google-ai-mode",
      name: "Google AI Overview",
      url: "https://google.com",
      category: "Search & Research",
      description: "Google Search with AI-powered overviews and summaries",
      expectedPricing: { free: true, starting: 0 }
    }
  ],

  // Graphic Design
  "graphic-design": [
    {
      id: "looka",
      name: "Looka",
      url: "https://looka.com",
      category: "Image Generation",
      description: "AI-powered logo maker and brand identity designer",
      expectedPricing: { free: false, starting: 20 }
    }
  ],

  // App Builders & Coding
  "app-builders": [
    {
      id: "lovable",
      name: "Lovable",
      url: "https://lovable.dev",
      category: "Code Generation",
      description: "AI-powered full-stack app builder with natural language",
      expectedPricing: { free: true, starting: 0, pro: 20 }
    }
  ],

  // Knowledge Management
  "knowledge-management": [
    {
      id: "guru",
      name: "Guru",
      url: "https://www.getguru.com",
      category: "Productivity",
      description: "AI-powered knowledge management and company wiki platform",
      expectedPricing: { free: true, starting: 0, pro: 10 }
    }
  ],

  // Email
  "email": [
    {
      id: "hubspot-email-writer",
      name: "HubSpot Email Writer",
      url: "https://www.hubspot.com/products/marketing/email",
      category: "Email Marketing",
      description: "AI-powered email writing and marketing automation by HubSpot",
      expectedPricing: { free: true, starting: 0, pro: 45 }
    },
    {
      id: "fyxer",
      name: "Fyxer AI",
      url: "https://fyxer.ai",
      category: "Email Marketing",
      description: "AI email assistant for writing and optimizing email campaigns",
      expectedPricing: { free: false, starting: 19 }
    },
    {
      id: "shortwave",
      name: "Shortwave",
      url: "https://www.shortwave.com",
      category: "Email Marketing",
      description: "AI-powered email client with smart inbox and automation",
      expectedPricing: { free: true, starting: 0, pro: 9 }
    }
  ],

  // Scheduling
  "scheduling": [
    {
      id: "reclaim-ai",
      name: "Reclaim AI",
      url: "https://reclaim.ai",
      category: "Productivity",
      description: "AI-powered calendar scheduling and time management assistant",
      expectedPricing: { free: true, starting: 0, pro: 8 }
    },
    {
      id: "clockwise",
      name: "Clockwise",
      url: "https://www.getclockwise.com",
      category: "Productivity",
      description: "AI calendar assistant that creates blocks of uninterrupted focus time",
      expectedPricing: { free: true, starting: 0, pro: 6.75 }
    }
  ],

  // Presentations
  "presentations": [
    {
      id: "gamma",
      name: "Gamma",
      url: "https://gamma.app",
      category: "Productivity",
      description: "AI-powered presentation and document creation platform",
      expectedPricing: { free: true, starting: 0, pro: 10 }
    },
    {
      id: "copilot-powerpoint",
      name: "Microsoft Copilot for PowerPoint",
      url: "https://www.microsoft.com/en-us/microsoft-365/powerpoint",
      category: "Productivity",
      description: "AI assistant integrated into PowerPoint for creating presentations",
      expectedPricing: { free: false, starting: 20 }
    }
  ],

  // Resume Builders
  "resume-builders": [
    {
      id: "teal",
      name: "Teal",
      url: "https://www.tealhq.com",
      category: "Productivity",
      description: "AI-powered resume builder and job application tracker",
      expectedPricing: { free: true, starting: 0, pro: 9 }
    },
    {
      id: "kickresume",
      name: "Kickresume",
      url: "https://www.kickresume.com",
      category: "Productivity",
      description: "AI resume and cover letter builder with professional templates",
      expectedPricing: { free: true, starting: 0, pro: 5 }
    }
  ],

  // Music Generation
  "music-generation": [
    {
      id: "suno",
      name: "Suno",
      url: "https://suno.com",
      category: "Audio & Music",
      description: "AI music generation platform that creates songs from text prompts",
      expectedPricing: { free: true, starting: 0, pro: 10 }
    },
    {
      id: "udio",
      name: "Udio",
      url: "https://www.udio.com",
      category: "Audio & Music",
      description: "AI-powered music creation tool for generating original songs",
      expectedPricing: { free: true, starting: 0, pro: 10 }
    }
  ],

  // Marketing
  "marketing": [
    {
      id: "adcreative-ai",
      name: "AdCreative.ai",
      url: "https://www.adcreative.ai",
      category: "Marketing & Advertising",
      description: "AI-powered ad creative generation for marketing campaigns",
      expectedPricing: { free: true, starting: 0, pro: 29 }
    },
    {
      id: "airops",
      name: "AirOps",
      url: "https://www.airops.com",
      category: "Marketing & Advertising",
      description: "AI workflow automation platform for marketing and operations",
      expectedPricing: { free: false, starting: 49 }
    }
  ]
};

// Helper function to get all tools as flat array
export function getAllTools() {
  const allTools = [];
  Object.values(specificToolsConfig).forEach(categoryTools => {
    allTools.push(...categoryTools);
  });
  return allTools;
}

// Helper function to get tools by category
export function getToolsByCategory(category) {
  return specificToolsConfig[category] || [];
}

// Export total count for tracking
export const TOTAL_TOOLS_COUNT = getAllTools().length;

console.log(`✅ Configured ${TOTAL_TOOLS_COUNT} specific AI tools for scraping`);

export default specificToolsConfig;