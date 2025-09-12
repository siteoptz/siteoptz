/**
 * Canonical URL utility to ensure consistent URL structure
 * All canonical URLs should use the primary domain without www
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://siteoptz.ai';

/**
 * Build a canonical URL ensuring correct domain and protocol
 * @param path - The path to append to the base URL
 * @returns The properly formatted canonical URL
 */
export function buildCanonicalUrl(path: string): string {
  // Remove any leading slash from the path
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Ensure we're using the correct base URL without www
  const canonicalBase = BASE_URL.replace('www.', '');
  
  // Handle special cases for query parameters
  if (cleanPath.includes('?')) {
    // For URLs with query parameters, we might want to use the path without params
    // or redirect to a proper category page
    const [basePath, queryString] = cleanPath.split('?');
    
    // Handle tool category URLs
    if (basePath === '/tools' && queryString.includes('category=')) {
      const categoryMatch = queryString.match(/category=([^&]*)/);
      if (categoryMatch) {
        const category = decodeURIComponent(categoryMatch[1])
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        return `${canonicalBase}/categories/${category}`;
      }
    }
    
    // For other query parameters, return the base path
    return `${canonicalBase}${basePath}`;
  }
  
  return `${canonicalBase}${cleanPath}`;
}

/**
 * Get canonical URL for a tool page
 * Tools should use /reviews/{slug} as the canonical URL
 */
export function getToolCanonicalUrl(slug: string): string {
  return buildCanonicalUrl(`/reviews/${slug}`);
}

/**
 * Get canonical URL for a category page
 */
export function getCategoryCanonicalUrl(category: string): string {
  const categorySlug = category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return buildCanonicalUrl(`/categories/${categorySlug}`);
}

/**
 * Get canonical URL for an industry page
 */
export function getIndustryCanonicalUrl(industry: string): string {
  const industrySlug = industry
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return buildCanonicalUrl(`/industries/${industrySlug}`);
}

/**
 * Get canonical URL for a comparison page
 */
export function getComparisonCanonicalUrl(tool1: string, tool2: string): string {
  return buildCanonicalUrl(`/compare/${tool1}/vs/${tool2}`);
}