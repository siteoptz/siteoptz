#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🛠️ Fixing SEO component exports by removing getStaticProps...');

// Get all components with getStaticProps
const componentDir = 'seo-optimization/production-components/';
const files = fs.readdirSync(componentDir).filter(f => f.endsWith('.tsx'));

let fixedCount = 0;
let errorCount = 0;

console.log(`📁 Found ${files.length} component files`);

// Process each file
files.forEach(filename => {
  const filepath = path.join(componentDir, filename);
  
  try {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Check if it has getStaticProps
    if (content.includes('getStaticProps')) {
      console.log(`🔧 Fixing ${filename}...`);
      
      // Remove getStaticProps export and everything after it
      const lines = content.split('\n');
      const getStaticPropsIndex = lines.findIndex(line => line.includes('export const getStaticProps'));
      
      if (getStaticPropsIndex !== -1) {
        // Keep everything before getStaticProps
        content = lines.slice(0, getStaticPropsIndex).join('\n');
        
        // Ensure file ends properly
        if (!content.trim().endsWith('}') && !content.trim().endsWith(';')) {
          // Find the last export default function and ensure it's closed
          const exportDefaultIndex = content.lastIndexOf('export default');
          if (exportDefaultIndex !== -1) {
            content = content.trim() + '\n';
          }
        }
        
        // Write the fixed content
        fs.writeFileSync(filepath, content);
        fixedCount++;
        console.log(`✅ Fixed ${filename}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filename}:`, error.message);
    errorCount++;
  }
});

console.log('\n📊 Results:');
console.log(`✅ Fixed components: ${fixedCount}`);
console.log(`❌ Errors: ${errorCount}`);
console.log(`📝 Total components: ${files.length}`);

console.log('\n🎯 SEO components should now load properly without getStaticProps conflicts');