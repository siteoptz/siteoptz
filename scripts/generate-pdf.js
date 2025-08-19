#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const markdownpdf = require('markdown-pdf');

async function generatePDF() {
  console.log('Generating PDF from markdown...');
  
  const inputPath = path.join(__dirname, '../public/guides/ai-tools-comparison-guide-2025.md');
  const outputPath = path.join(__dirname, '../public/guides/ai-tools-comparison-guide-2025.pdf');
  
  // Check if markdown file exists
  if (!fs.existsSync(inputPath)) {
    console.error('Markdown file not found:', inputPath);
    process.exit(1);
  }
  
  // PDF options
  const options = {
    paperFormat: 'A4',
    paperBorder: '1in',
    renderDelay: 1000,
    cssPath: path.join(__dirname, 'pdf-styles.css'),
    runningsPath: path.join(__dirname, 'pdf-headers.js')
  };
  
  return new Promise((resolve, reject) => {
    markdownpdf(options).from(inputPath).to(outputPath, (err) => {
      if (err) {
        console.error('Error generating PDF:', err);
        reject(err);
      } else {
        console.log('PDF generated successfully:', outputPath);
        
        // Check file size
        const stats = fs.statSync(outputPath);
        console.log(`PDF size: ${(stats.size / 1024).toFixed(2)} KB`);
        
        resolve();
      }
    });
  });
}

// Run if called directly
if (require.main === module) {
  generatePDF().catch(console.error);
}

module.exports = { generatePDF };