// Tool categories configuration
// This is the single source of truth for categories across the application

export const toolCategories = [
  'Audio Generation',
  'Code Generation',
  'Content Creation',
  'Data Analysis',
  'Email Marketing',
  'Image Generation',
  'Productivity',
  'Research & Education',
  'SEO & Optimization',
  'Social Media',
  'Video Generation',
] as const;

export type ToolCategory = typeof toolCategories[number];

// Helper function to format category for URL
export function getCategoryUrl(category: string): string {
  return `/tools?category=${encodeURIComponent(category)}`;
}

// Helper function to get all categories with "All" option
export function getAllCategoriesWithAll(): Array<{ name: string; value: string }> {
  return [
    { name: 'All Categories', value: 'All' },
    ...toolCategories.map(cat => ({ name: cat, value: cat }))
  ];
}