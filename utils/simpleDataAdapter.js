/**
 * Simple data adapter - no more complex normalization
 * Just loads and validates the main aiToolsData.json file
 */

/**
 * Load AI tools data - SERVER SIDE ONLY
 */
export function loadSimpleToolsData(fs, path) {
  try {
    const dataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
    
    if (!fs.existsSync(dataPath)) {
      console.warn('aiToolsData.json not found');
      return [];
    }
    
    const tools = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Simple validation - ensure all tools have required structure
    return tools.map(tool => {
      // Ensure pricing is always an array
      if (!Array.isArray(tool.pricing)) {
        console.warn(`Tool ${tool.name} has invalid pricing format, setting to empty array`);
        tool.pricing = [];
      }
      
      // Ensure features is always an array  
      if (!Array.isArray(tool.features)) {
        console.warn(`Tool ${tool.name} has invalid features format, setting to empty array`);
        tool.features = [];
      }
      
      // Ensure pros/cons are arrays
      if (!Array.isArray(tool.pros)) tool.pros = [];
      if (!Array.isArray(tool.cons)) tool.cons = [];
      
      return tool;
    });
  } catch (error) {
    console.error('Error loading tools data:', error);
    return [];
  }
}

/**
 * Get tools by category
 */
export function getToolsByCategory(tools, category) {
  if (!category) return tools;
  return tools.filter(tool => tool.category === category);
}

/**
 * Search tools by name or description
 */
export function searchTools(tools, query) {
  if (!query) return tools;
  
  const searchTerm = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm) ||
    tool.description.toLowerCase().includes(searchTerm) ||
    (tool.overview?.developer || '').toLowerCase().includes(searchTerm)
  );
}

export default {
  loadSimpleToolsData,
  getToolsByCategory, 
  searchTools
};