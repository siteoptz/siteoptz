// Tool categories configuration
// This is the single source of truth for categories across the application

export const toolCategories = [
  'AI Automation',
  'Best Voice AI Tools',
  'Code Generation',
  'Content Creation',
  'Data Analysis',
  'Email Marketing',
  'Image Generation',
  'Paid Search & PPC',
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

// Display name mapping for categories
// Maps internal category names to user-friendly display names
export const categoryDisplayNames: Record<string, string> = {
  'Paid Search & PPC': 'Paid Search',
  // Add other mappings as needed
};

// Helper function to get display name for a category
export function getCategoryDisplayName(category: string): string {
  return categoryDisplayNames[category] || category;
}

// Helper function to get all categories with "All" option
export function getAllCategoriesWithAll(): Array<{ name: string; value: string }> {
  return [
    { name: 'All Categories', value: 'All' },
    ...toolCategories.map(cat => ({ name: getCategoryDisplayName(cat), value: cat }))
  ];
}