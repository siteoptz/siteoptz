// Data helper functions for production deployment

export const fetchAIToolsData = async () => {
  try {
    const response = await fetch('/data/aiToolsData.json');
    if (!response.ok) {
      throw new Error('Failed to fetch AI tools data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching AI tools data:', error);
    return [];
  }
};

export const fetchFAQData = async () => {
  try {
    const response = await fetch('/data/faqData.json');
    if (!response.ok) {
      throw new Error('Failed to fetch FAQ data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching FAQ data:', error);
    return {};
  }
};

export const getToolBySlug = (tools, slug) => {
  return tools.find(tool => tool.slug === slug);
};

export const getToolById = (tools, id) => {
  return tools.find(tool => tool.id === id);
};

export const getRelatedTools = (tools, currentTool, limit = 4) => {
  return tools
    .filter(tool => tool.id !== currentTool.id)
    .filter(tool => currentTool.related_tools?.includes(tool.id))
    .slice(0, limit);
};

export const generateSitemap = (tools) => {
  const baseUrl = 'https://siteoptz.ai';
  const urls = [
    { url: `${baseUrl}/tools`, priority: 1.0 },
    { url: `${baseUrl}/compare`, priority: 0.9 }
  ];

  // Add individual tool pages
  tools.forEach(tool => {
    urls.push({
      url: `${baseUrl}/tools/${tool.slug}`,
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0]
    });
  });

  // Add comparison pages
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      urls.push({
        url: `${baseUrl}/compare/${tools[i].slug}-vs-${tools[j].slug}`,
        priority: 0.7,
        lastmod: new Date().toISOString().split('T')[0]
      });
    }
  }

  return urls;
};