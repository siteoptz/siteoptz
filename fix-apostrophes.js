const fs = require('fs');
const path = require('path');

// Files that need apostrophe fixes
const filesToFix = [
  'pages/resources/ai-compliance-checklist.tsx',
  'pages/resources/ai-customer-service-guide.tsx', 
  'pages/resources/bias-free-hiring.tsx',
  'pages/resources/data-driven-marketing.tsx',
  'pages/resources/saas-optimization-guide.tsx',
  'pages/webinars/download/ai-analytics-toolkit.tsx',
  'pages/webinars/download/ai-compliance-framework.tsx',
  'pages/webinars/download/ai-content-marketing-resources.tsx',
  'pages/webinars/download/no-code-ai-resources.tsx'
];

console.log('Fixing unescaped apostrophes in React files...');

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix specific patterns with apostrophes
    content = content.replace(/What You'll Learn/g, "What You&apos;ll Learn");
    content = content.replace(/What's Inside/g, "What&apos;s Inside");
    content = content.replace(/You'll Gain/g, "You&apos;ll Gain");
    content = content.replace(/What You'll Get/g, "What You&apos;ll Get");
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('Finished fixing apostrophes\!');
EOF < /dev/null