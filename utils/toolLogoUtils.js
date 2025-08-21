/**
 * Utility functions for generating tool logos and initials
 */

/**
 * Generate initials from a tool name
 * @param {string} toolName - The name of the tool
 * @returns {string} The initials (max 2 characters)
 */
export function getToolInitials(toolName) {
  if (!toolName) return 'AI';
  
  // Remove common suffixes
  const cleanName = toolName
    .replace(/\s+(AI|GPT|Bot|App|Tool|Platform|Studio|Pro|Plus|Labs?)$/i, '')
    .trim();
  
  // Split by spaces, hyphens, or dots
  const words = cleanName.split(/[\s\-\.]+/).filter(w => w.length > 0);
  
  if (words.length === 0) return 'AI';
  
  if (words.length === 1) {
    // For single words, take first 2 characters
    return words[0].substring(0, 2).toUpperCase();
  } else {
    // For multiple words, take first letter of first two words
    return (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
  }
}

/**
 * Generate a consistent color based on tool name
 * @param {string} toolName - The name of the tool
 * @returns {string} A Tailwind CSS gradient class
 */
export function getToolColorGradient(toolName) {
  if (!toolName) return 'from-blue-500 to-purple-500';
  
  // Define gradient combinations
  const gradients = [
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-purple-500 to-pink-500',
    'from-cyan-500 to-blue-500',
    'from-yellow-500 to-orange-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-teal-500 to-cyan-500',
    'from-red-500 to-pink-500',
    'from-amber-500 to-orange-500',
    'from-lime-500 to-green-500',
    'from-emerald-500 to-teal-500',
    'from-violet-500 to-purple-500',
    'from-fuchsia-500 to-pink-500',
    'from-sky-500 to-blue-500',
    'from-rose-500 to-pink-500',
    'from-slate-500 to-gray-500',
  ];
  
  // Generate a consistent index based on the tool name
  let hash = 0;
  for (let i = 0; i < toolName.length; i++) {
    hash = ((hash << 5) - hash) + toolName.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

/**
 * Generate a single background color based on tool name
 * @param {string} toolName - The name of the tool
 * @returns {string} A Tailwind CSS background color class
 */
export function getToolBackgroundColor(toolName) {
  if (!toolName) return 'bg-blue-600';
  
  // Define color options
  const colors = [
    'bg-blue-600',
    'bg-green-600',
    'bg-purple-600',
    'bg-orange-600',
    'bg-cyan-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-red-600',
    'bg-teal-600',
    'bg-yellow-600',
    'bg-amber-600',
    'bg-lime-600',
    'bg-emerald-600',
    'bg-violet-600',
    'bg-fuchsia-600',
    'bg-sky-600',
    'bg-rose-600',
    'bg-slate-600',
  ];
  
  // Generate a consistent index based on the tool name
  let hash = 0;
  for (let i = 0; i < toolName.length; i++) {
    hash = ((hash << 5) - hash) + toolName.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

/**
 * Check if a tool has a known logo
 * @param {string} toolName - The name of the tool
 * @returns {boolean} Whether the tool has a known logo
 */
export function hasKnownLogo(toolName) {
  if (!toolName) return false;
  
  // List of tools with known logos (add more as needed)
  const knownLogos = [
    'chatgpt',
    'claude',
    'gemini',
    'jasper',
    'copilot',
    'midjourney',
    'dall-e',
    'stable diffusion',
    'github copilot',
    'perplexity',
    'bard',
    'notion',
    'grammarly'
  ];
  
  const normalizedName = toolName.toLowerCase().replace(/[\s\-\.]+/g, '');
  return knownLogos.some(logo => 
    normalizedName.includes(logo.replace(/[\s\-\.]+/g, ''))
  );
}

/**
 * Get the logo path for a tool
 * @param {string} toolName - The name of the tool
 * @returns {string} The path to the logo file
 */
export function getToolLogoPath(toolName) {
  if (!toolName) return null;
  
  const toolSlug = toolName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  // Return the expected logo path (will be checked for existence on the client)
  return `/images/tools/${toolSlug}-logo.svg`;
}