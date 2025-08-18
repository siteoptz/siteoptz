/**
 * External Authoritative Links for SEO and Credibility
 * Links to reputable sources, research papers, and industry authorities
 */

export const authoritativeLinks = {
  // AI Research & Academic Sources
  arXiv: {
    url: 'https://arxiv.org/list/cs.AI/recent',
    title: 'arXiv AI Research Papers',
    description: 'Latest artificial intelligence research publications'
  },
  stanfordAI: {
    url: 'https://ai.stanford.edu/',
    title: 'Stanford AI Research',
    description: 'Stanford Artificial Intelligence Laboratory'
  },
  mitAI: {
    url: 'https://www.csail.mit.edu/research/artificial-intelligence',
    title: 'MIT AI Research',
    description: 'MIT Computer Science and Artificial Intelligence Laboratory'
  },
  
  // Industry Reports & Analysis
  gartner: {
    url: 'https://www.gartner.com/en/information-technology/artificial-intelligence',
    title: 'Gartner AI Research',
    description: 'Gartner artificial intelligence market analysis and trends'
  },
  mckinsey: {
    url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2024',
    title: 'McKinsey State of AI Report',
    description: 'McKinsey Global Institute AI adoption and impact analysis'
  },
  pwcAI: {
    url: 'https://www.pwc.com/gx/en/issues/analytics/assets/pwc-ai-and-workforce-evolution.pdf',
    title: 'PwC AI and Workforce Evolution',
    description: 'PwC analysis on AI impact on business and workforce'
  },
  
  // Technology Standards & Governance
  ieee: {
    url: 'https://standards.ieee.org/initiatives/artificial-intelligence-systems/',
    title: 'IEEE AI Standards',
    description: 'IEEE standards for ethical design of artificial intelligence systems'
  },
  nist: {
    url: 'https://www.nist.gov/artificial-intelligence',
    title: 'NIST AI Risk Management Framework',
    description: 'National Institute of Standards and Technology AI guidelines'
  },
  
  // AI Safety & Ethics
  anthropic: {
    url: 'https://www.anthropic.com/safety',
    title: 'Anthropic AI Safety Research',
    description: 'Research on AI alignment and safety from Anthropic'
  },
  openaiSafety: {
    url: 'https://openai.com/safety/',
    title: 'OpenAI Safety Practices',
    description: 'OpenAI approach to developing safe artificial intelligence'
  },
  partnershipAI: {
    url: 'https://partnershiponai.org/',
    title: 'Partnership on AI',
    description: 'Industry collaboration on AI best practices and ethics'
  },
  
  // Market Research & Statistics
  statista: {
    url: 'https://www.statista.com/outlook/tmo/artificial-intelligence/worldwide',
    title: 'Statista AI Market Statistics',
    description: 'Global artificial intelligence market size and growth projections'
  },
  idc: {
    url: 'https://www.idc.com/getdoc.jsp?containerId=prUS51127123',
    title: 'IDC AI Software Market Forecast',
    description: 'IDC analysis of AI software platform market trends'
  },
  
  // Developer Resources & Documentation
  githubAI: {
    url: 'https://github.com/topics/artificial-intelligence',
    title: 'GitHub AI Projects',
    description: 'Open source artificial intelligence projects and repositories'
  },
  huggingface: {
    url: 'https://huggingface.co/docs',
    title: 'Hugging Face Documentation',
    description: 'Machine learning model hub and documentation'
  },
  tensorflowGuide: {
    url: 'https://www.tensorflow.org/guide',
    title: 'TensorFlow Developer Guide',
    description: 'Google TensorFlow machine learning framework documentation'
  },
  
  // Business & Enterprise AI
  deloitteAI: {
    url: 'https://www2.deloitte.com/us/en/insights/focus/cognitive-technologies.html',
    title: 'Deloitte AI Insights',
    description: 'Deloitte research on enterprise AI adoption and strategy'
  },
  accentureAI: {
    url: 'https://www.accenture.com/us-en/insights/artificial-intelligence-index',
    title: 'Accenture AI Research',
    description: 'Accenture analysis on AI business transformation and ROI'
  },
  
  // AI Education & Training
  coursera: {
    url: 'https://www.coursera.org/courses?query=artificial%20intelligence',
    title: 'Coursera AI Courses',
    description: 'Online artificial intelligence and machine learning courses'
  },
  edxAI: {
    url: 'https://www.edx.org/learn/artificial-intelligence',
    title: 'edX AI Programs',
    description: 'University-level AI education and certification programs'
  }
};

/**
 * Get relevant external links for a specific topic or tool category
 * @param {string} category - The category or topic (e.g., 'research', 'business', 'safety')
 * @returns {Array} Array of relevant authoritative links
 */
export const getLinksByCategory = (category) => {
  const categories = {
    research: ['arXiv', 'stanfordAI', 'mitAI', 'ieee'],
    business: ['gartner', 'mckinsey', 'deloitteAI', 'accentureAI'],
    safety: ['anthropic', 'openaiSafety', 'partnershipAI', 'nist'],
    development: ['githubAI', 'huggingface', 'tensorflowGuide'],
    market: ['statista', 'idc', 'pwcAI'],
    education: ['coursera', 'edxAI']
  };
  
  const linkKeys = categories[category] || [];
  return linkKeys.map(key => authoritativeLinks[key]).filter(Boolean);
};

/**
 * Generate a contextual external link for content
 * @param {string} context - The context where the link will be used
 * @param {string} toolName - Optional tool name for tool-specific links
 * @returns {Object} Relevant external link object
 */
export const getContextualLink = (context, toolName = null) => {
  const contextMap = {
    'ai-research': authoritativeLinks.arXiv,
    'market-analysis': authoritativeLinks.gartner,
    'safety-guidelines': authoritativeLinks.nist,
    'industry-standards': authoritativeLinks.ieee,
    'business-strategy': authoritativeLinks.mckinsey,
    'development-resources': authoritativeLinks.githubAI,
    'education': authoritativeLinks.coursera
  };
  
  return contextMap[context] || authoritativeLinks.gartner;
};

/**
 * Format external link for React component
 * @param {Object} link - Link object from authoritativeLinks
 * @returns {Object} Formatted link for React rendering
 */
export const formatExternalLink = (link) => {
  return {
    ...link,
    props: {
      href: link.url,
      target: '_blank',
      rel: 'noopener noreferrer nofollow',
      'aria-label': `External link to ${link.title}`
    }
  };
};