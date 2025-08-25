const fs = require('fs');
const path = require('path');

// Read the categoryContent.ts file
const filePath = path.join(__dirname, '..', 'content', 'categoryContent.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Extract just the object part by finding the start and end
const startMatch = content.match(/export const categoryContent: Record<string, any> = \{/);
const endMatch = content.match(/\};\s*\/\/ Helper function/);

if (!startMatch || !endMatch) {
  console.error('Could not find the categoryContent object boundaries');
  process.exit(1);
}

const startIndex = startMatch.index + startMatch[0].length;
const endIndex = endMatch.index;

const objectContent = content.slice(startIndex, endIndex);

// Now we need to extract and deduplicate categories
// Find all category entries
const categoryPattern = /^\s*"([^"]+)":\s*\{/gm;
let match;
const categories = [];
let lastIndex = 0;

while ((match = categoryPattern.exec(objectContent)) !== null) {
  if (categories.length > 0) {
    // Save the content of the previous category
    categories[categories.length - 1].content = objectContent.slice(lastIndex, match.index);
  }
  
  categories.push({
    name: match[1],
    startIndex: match.index,
    content: ''
  });
  
  lastIndex = match.index;
}

// Add content for the last category
if (categories.length > 0) {
  categories[categories.length - 1].content = objectContent.slice(lastIndex);
}

// Remove duplicates by keeping only the first occurrence of each category
const seenCategories = new Set();
const uniqueCategories = [];

for (const category of categories) {
  if (!seenCategories.has(category.name)) {
    seenCategories.add(category.name);
    uniqueCategories.push(category);
    console.log(`Keeping category: ${category.name}`);
  } else {
    console.log(`Removing duplicate category: ${category.name}`);
  }
}

// Reconstruct the object content
let newObjectContent = '';
for (let i = 0; i < uniqueCategories.length; i++) {
  const category = uniqueCategories[i];
  newObjectContent += `\n  "${category.name}": {${category.content}`;
  
  if (i < uniqueCategories.length - 1) {
    // Ensure proper comma separation
    if (!category.content.trim().endsWith(',')) {
      newObjectContent = newObjectContent.replace(/\s*$/, '') + ',';
    }
  } else {
    // Last category - ensure no trailing comma
    newObjectContent = newObjectContent.replace(/,\s*$/, '');
  }
}

// Reconstruct the entire file
const beforeObject = content.slice(0, startIndex);
const afterObject = content.slice(endIndex);
const newContent = beforeObject + newObjectContent + '\n' + afterObject;

// Write the cleaned file
fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Successfully removed duplicate categories. Kept ${uniqueCategories.length} unique categories.`);