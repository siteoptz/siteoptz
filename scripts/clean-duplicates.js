const fs = require('fs');

// Read the original file
const filePath = '/Users/siteoptz/siteoptz/content/categoryContent.ts';
const content = fs.readFileSync(filePath, 'utf8');

// Split into lines
const lines = content.split('\n');

// Track categories we've seen
const seenCategories = new Set();
const cleanLines = [];
let skipUntilNextCategory = false;
let insideCategory = false;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this is a category declaration
  const categoryMatch = line.match(/^  "([^"]+)": \{$/);
  
  if (categoryMatch) {
    const categoryName = categoryMatch[1];
    
    if (seenCategories.has(categoryName)) {
      // This is a duplicate, skip it
      console.log(`Skipping duplicate category: ${categoryName}`);
      skipUntilNextCategory = true;
      insideCategory = true;
      braceCount = 1; // We're starting inside the category object
      continue;
    } else {
      // First time seeing this category, keep it
      seenCategories.add(categoryName);
      cleanLines.push(line);
      skipUntilNextCategory = false;
      insideCategory = true;
      braceCount = 1;
      continue;
    }
  }
  
  if (skipUntilNextCategory && insideCategory) {
    // Count braces to know when we exit the current category
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    braceCount += openBraces - closeBraces;
    
    if (braceCount <= 0) {
      // We've exited the category
      insideCategory = false;
      skipUntilNextCategory = false;
      braceCount = 0;
    }
    continue; // Skip this line
  }
  
  if (insideCategory && !skipUntilNextCategory) {
    // Count braces to track when we exit
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    braceCount += openBraces - closeBraces;
    
    if (braceCount <= 0) {
      insideCategory = false;
      braceCount = 0;
    }
  }
  
  // Keep this line if we're not skipping
  if (!skipUntilNextCategory) {
    cleanLines.push(line);
  }
}

// Write the cleaned content
const cleanContent = cleanLines.join('\n');
fs.writeFileSync(filePath, cleanContent, 'utf8');

console.log('Duplicate categories removed successfully!');
console.log(`Kept categories: ${Array.from(seenCategories).join(', ')}`);