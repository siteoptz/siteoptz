const { generateSiteOptzId } = require('./siteoptz-data-adapter');

// Calculate string similarity using Levenshtein distance
function calculateSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  
  if (s1 === s2) return 1;
  
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Levenshtein distance implementation
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Extract domain from URL
function extractDomain(url) {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url.startsWith('http') ? url : 'https://' + url);
    return urlObj.hostname.replace('www.', '').toLowerCase();
  } catch {
    return '';
  }
}

// Normalize tool name for comparison
function normalizeToolName(name) {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ')    // Normalize whitespace
    .replace(/\b(ai|tool|app|software|platform|solution)\b/g, '') // Remove common words
    .trim();
}

// Advanced duplicate detection
function findDuplicates(newTool, existingTools, options = {}) {
  const {
    nameSimilarityThreshold = 0.8,
    websiteMatchRequired = false,
    strictMode = false
  } = options;
  
  const duplicates = [];
  const possibleDuplicates = [];
  
  const newToolName = normalizeToolName(newTool.name);
  const newToolId = generateSiteOptzId(newTool.name);
  const newToolDomain = extractDomain(newTool.website || newTool.overview?.website);
  
  for (const existingTool of existingTools) {
    const existingToolName = normalizeToolName(existingTool.name);
    const existingToolDomain = extractDomain(existingTool.overview?.website || existingTool.website);
    
    // Exact matches (definite duplicates)
    if (
      newTool.id === existingTool.id ||
      newTool.slug === existingTool.slug ||
      newToolId === existingTool.id ||
      newToolId === existingTool.slug
    ) {
      duplicates.push({
        tool: existingTool,
        reason: 'Exact ID/slug match',
        confidence: 1.0
      });
      continue;
    }
    
    // Website domain match (very high confidence)
    if (newToolDomain && existingToolDomain && 
        newToolDomain === existingToolDomain && 
        newToolDomain !== '') {
      duplicates.push({
        tool: existingTool,
        reason: 'Website domain match',
        confidence: 0.95
      });
      continue;
    }
    
    // Name similarity check
    const nameSimilarity = calculateSimilarity(newToolName, existingToolName);
    
    if (nameSimilarity >= nameSimilarityThreshold) {
      if (strictMode && websiteMatchRequired && !newToolDomain) {
        possibleDuplicates.push({
          tool: existingTool,
          reason: `High name similarity (${(nameSimilarity * 100).toFixed(1)}%)`,
          confidence: nameSimilarity * 0.8 // Reduce confidence in strict mode
        });
      } else {
        duplicates.push({
          tool: existingTool,
          reason: `High name similarity (${(nameSimilarity * 100).toFixed(1)}%)`,
          confidence: nameSimilarity
        });
      }
    } else if (nameSimilarity >= 0.6) {
      // Possible duplicates (lower similarity)
      possibleDuplicates.push({
        tool: existingTool,
        reason: `Moderate name similarity (${(nameSimilarity * 100).toFixed(1)}%)`,
        confidence: nameSimilarity
      });
    }
    
    // Additional fuzzy matching
    if (newTool.name.length >= 3 && existingTool.name.length >= 3) {
      const words1 = newToolName.split(' ').filter(w => w.length > 2);
      const words2 = existingToolName.split(' ').filter(w => w.length > 2);
      
      // Check if any significant words match
      const commonWords = words1.filter(w1 => 
        words2.some(w2 => calculateSimilarity(w1, w2) > 0.8)
      );
      
      if (commonWords.length > 0 && commonWords.length / Math.max(words1.length, words2.length) > 0.5) {
        possibleDuplicates.push({
          tool: existingTool,
          reason: `Common significant words: ${commonWords.join(', ')}`,
          confidence: 0.7
        });
      }
    }
  }
  
  return {
    definite: duplicates,
    possible: possibleDuplicates
  };
}

// Remove duplicates from a tool array
function removeDuplicatesFromArray(tools, options = {}) {
  const {
    prioritizeNewer = true,
    prioritizeMoreComplete = true,
    keepBestRated = true
  } = options;
  
  const uniqueTools = [];
  const duplicateGroups = [];
  const processedIds = new Set();
  
  console.log(`\n🔍 Analyzing ${tools.length} tools for duplicates...`);
  
  for (const tool of tools) {
    const toolId = generateSiteOptzId(tool.name);
    
    if (processedIds.has(toolId)) {
      continue; // Already processed as part of a duplicate group
    }
    
    // Find all duplicates of this tool
    const duplicates = findDuplicates(tool, tools.filter(t => 
      generateSiteOptzId(t.name) !== toolId
    ), {
      nameSimilarityThreshold: 0.85,
      strictMode: false
    });
    
    const allVersions = [tool, ...duplicates.definite.map(d => d.tool)];
    
    if (allVersions.length > 1) {
      // Multiple versions found - select the best one
      let bestTool = selectBestVersion(allVersions, {
        prioritizeNewer,
        prioritizeMoreComplete,
        keepBestRated
      });
      
      uniqueTools.push(bestTool);
      duplicateGroups.push({
        kept: bestTool.name,
        removed: allVersions.filter(t => t !== bestTool).map(t => t.name),
        reason: 'Duplicate detection'
      });
      
      // Mark all IDs as processed
      allVersions.forEach(t => {
        processedIds.add(generateSiteOptzId(t.name));
      });
      
    } else {
      // No duplicates found
      uniqueTools.push(tool);
      processedIds.add(toolId);
    }
  }
  
  console.log(`✅ Duplicate removal complete:`);
  console.log(`   - Original tools: ${tools.length}`);
  console.log(`   - Unique tools: ${uniqueTools.length}`);
  console.log(`   - Duplicates removed: ${tools.length - uniqueTools.length}`);
  console.log(`   - Duplicate groups: ${duplicateGroups.length}`);
  
  if (duplicateGroups.length > 0 && duplicateGroups.length <= 10) {
    console.log(`\n📋 Duplicate groups:`);
    duplicateGroups.forEach((group, index) => {
      console.log(`   ${index + 1}. Kept "${group.kept}", removed: ${group.removed.join(', ')}`);
    });
  }
  
  return {
    uniqueTools,
    duplicateGroups,
    removedCount: tools.length - uniqueTools.length
  };
}

// Select the best version from duplicate tools
function selectBestVersion(tools, options = {}) {
  const {
    prioritizeNewer = true,
    prioritizeMoreComplete = true,
    keepBestRated = true
  } = options;
  
  if (tools.length === 1) return tools[0];
  
  // Score each tool
  const scoredTools = tools.map(tool => {
    let score = 0;
    
    // Completeness score (higher is better)
    if (tool.overview?.description) score += 2;
    if (tool.features?.length > 0) score += 1;
    if (tool.pricing?.length > 0) score += 1;
    if (tool.pros?.length > 0) score += 1;
    if (tool.cons?.length > 0) score += 1;
    if (tool.overview?.website) score += 2;
    if (tool.meta?.title) score += 1;
    if (tool.schema) score += 1;
    
    // Rating score
    if (keepBestRated && tool.rating) {
      score += tool.rating; // 0-5 points
    }
    
    // Review count (normalized)
    if (tool.reviewCount) {
      score += Math.min(tool.reviewCount / 1000, 2); // Max 2 points
    }
    
    // Recency score
    if (prioritizeNewer && tool.lastScraped) {
      const daysOld = (Date.now() - new Date(tool.lastScraped)) / (1000 * 60 * 60 * 24);
      if (daysOld < 7) score += 2;
      else if (daysOld < 30) score += 1;
    }
    
    return { tool, score };
  });
  
  // Return the highest scored tool
  return scoredTools.sort((a, b) => b.score - a.score)[0].tool;
}

// Merge duplicate tools with existing database
async function mergeWithExistingTools(newTools, existingTools, options = {}) {
  console.log(`\n🔗 Merging ${newTools.length} new tools with ${existingTools.length} existing tools...`);
  
  const mergedTools = [...existingTools];
  const stats = {
    added: 0,
    updated: 0,
    skipped: 0,
    duplicatesFound: [],
    errors: []
  };
  
  for (const newTool of newTools) {
    try {
      const duplicateCheck = findDuplicates(newTool, existingTools, {
        nameSimilarityThreshold: 0.8,
        strictMode: true
      });
      
      if (duplicateCheck.definite.length > 0) {
        // Found definite duplicate - update existing or skip
        const existingTool = duplicateCheck.definite[0].tool;
        const shouldUpdate = isUpdateWorthwhile(newTool, existingTool);
        
        if (shouldUpdate) {
          const updatedTool = mergeToolData(existingTool, newTool);
          const existingIndex = mergedTools.findIndex(t => t.id === existingTool.id);
          mergedTools[existingIndex] = updatedTool;
          stats.updated++;
          console.log(`🔄 Updated: ${newTool.name}`);
        } else {
          stats.skipped++;
          stats.duplicatesFound.push({
            newTool: newTool.name,
            existingTool: existingTool.name,
            reason: duplicateCheck.definite[0].reason
          });
        }
      } else {
        // No duplicates - add as new tool
        mergedTools.push(newTool);
        stats.added++;
        console.log(`✅ Added: ${newTool.name}`);
      }
      
    } catch (error) {
      stats.errors.push({
        tool: newTool.name,
        error: error.message
      });
      console.log(`❌ Error processing ${newTool.name}: ${error.message}`);
    }
  }
  
  console.log(`\n📊 Merge complete:`);
  console.log(`   - New tools added: ${stats.added}`);
  console.log(`   - Existing tools updated: ${stats.updated}`);
  console.log(`   - Duplicates skipped: ${stats.skipped}`);
  console.log(`   - Errors: ${stats.errors.length}`);
  
  return {
    mergedTools,
    stats
  };
}

// Check if updating an existing tool is worthwhile
function isUpdateWorthwhile(newTool, existingTool) {
  // Update if new tool has more complete information
  const newScore = calculateCompletenessScore(newTool);
  const existingScore = calculateCompletenessScore(existingTool);
  
  return newScore > existingScore * 1.2; // 20% improvement threshold
}

// Calculate completeness score for a tool
function calculateCompletenessScore(tool) {
  let score = 0;
  
  if (tool.overview?.description?.length > 50) score += 3;
  if (tool.features?.length > 0) score += 2;
  if (tool.pricing?.length > 0) score += 2;
  if (tool.pros?.length > 0) score += 1;
  if (tool.cons?.length > 0) score += 1;
  if (tool.overview?.website) score += 2;
  if (tool.rating) score += 1;
  if (tool.meta?.title) score += 1;
  
  return score;
}

// Merge data from new tool into existing tool
function mergeToolData(existingTool, newTool) {
  return {
    ...existingTool,
    // Update key fields if new tool has better data
    overview: {
      ...existingTool.overview,
      description: newTool.overview?.description?.length > existingTool.overview?.description?.length ? 
                   newTool.overview.description : existingTool.overview.description,
      website: newTool.overview?.website || existingTool.overview?.website,
      ...(newTool.overview || {})
    },
    features: [...new Set([
      ...(existingTool.features || []),
      ...(newTool.features || [])
    ])],
    tags: [...new Set([
      ...(existingTool.tags || []),
      ...(newTool.tags || [])
    ])],
    // Keep better rating data
    rating: newTool.rating || existingTool.rating,
    reviewCount: Math.max(existingTool.reviewCount || 0, newTool.reviewCount || 0),
    // Update timestamps
    lastUpdated: new Date().toISOString(),
    lastScraped: newTool.lastScraped || new Date().toISOString()
  };
}

module.exports = {
  findDuplicates,
  removeDuplicatesFromArray,
  mergeWithExistingTools,
  calculateSimilarity,
  normalizeToolName,
  extractDomain,
  selectBestVersion,
  isUpdateWorthwhile,
  mergeToolData
};