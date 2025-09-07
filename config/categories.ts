// Tool categories configuration
// This is the single source of truth for categories across the application

export const toolCategories = [
  'AI Automation',
  'AI Education',
  'AI For Business',
  'Lead Generation',
  'AI Translator',
  'AI Website Builder',
  'Best Voice AI Tools',
  'Code Generation',
  'Content Creation',
  'Data Analysis',
  'E-commerce',
  'Email Marketing',
  'Finance AI',
  'Health AI',
  'Image Generation',
  'Paid Search & PPC',
  'Productivity',
  'Research & Education',
  'SEO & Optimization',
  'Social Media',
  'UX',
  'Video Generation',
  'Voice AI',
  'Website Builder',
  'Writing',
] as const;

export type ToolCategory = typeof toolCategories[number];

// Helper function to format category name to URL slug
export function getCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-'); // Replace multiple dashes with single dash
}

// Helper function to format category for URL - now points directly to category pages
export function getCategoryUrl(category: string): string {
  return `/categories/${getCategorySlug(category)}`;
}

// Legacy function for backward compatibility (deprecated)
export function getLegacyCategoryUrl(category: string): string {
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