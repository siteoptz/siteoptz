#!/usr/bin/env node

/**
 * Image Validation Script
 * Validates that all tool logos referenced in data exist as files
 * Prevents broken image issues before deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🖼️  Validating tool images...\n');

// Load tools data
const toolsDataPath = path.join(process.cwd(), 'public/data/aiToolsData.json');
let toolsData;

try {
  toolsData = JSON.parse(fs.readFileSync(toolsDataPath, 'utf8'));
} catch (error) {
  console.log('❌ Error loading tools data:', error.message);
  process.exit(1);
}

// Track validation results
let totalTools = 0;
let validImages = 0;
let missingImages = 0;
let brokenReferences = 0;
const issues = [];

console.log(`📊 Validating ${toolsData.length} tools...\n`);

// Validate each tool
toolsData.forEach((tool, index) => {
  totalTools++;
  
  const toolNumber = `${index + 1}/${toolsData.length}`;
  console.log(`${toolNumber} Checking: ${tool.name}`);

  // Check if tool has logo property
  if (!tool.logo) {
    const issue = {
      tool: tool.name,
      slug: tool.slug,
      type: 'missing_property',
      issue: 'No logo property defined',
      severity: 'warning'
    };
    issues.push(issue);
    brokenReferences++;
    console.log(`   ⚠️  No logo property defined`);
    return;
  }

  // Convert logo path to filesystem path
  const logoPath = tool.logo.startsWith('/') ? tool.logo.slice(1) : tool.logo;
  const filePath = path.join(process.cwd(), 'public', logoPath);
  
  // Check multiple formats
  const extensions = ['.svg', '.png', '.jpg', '.jpeg'];
  const basePath = filePath.replace(/\.(svg|png|jpg|jpeg)$/i, '');
  
  let found = false;
  let foundFormat = null;
  
  for (const ext of extensions) {
    const testPath = basePath + ext;
    if (fs.existsSync(testPath)) {
      found = true;
      foundFormat = ext;
      
      // Check if it's readable and has content
      try {
        const stats = fs.statSync(testPath);
        if (stats.size === 0) {
          const issue = {
            tool: tool.name,
            slug: tool.slug,
            type: 'empty_file',
            issue: `Logo file exists but is empty: ${tool.logo}`,
            severity: 'error'
          };
          issues.push(issue);
          console.log(`   ❌ Logo file is empty: ${foundFormat}`);
          found = false;
        }
      } catch (error) {
        const issue = {
          tool: tool.name,
          slug: tool.slug,
          type: 'unreadable_file',
          issue: `Cannot read logo file: ${tool.logo} - ${error.message}`,
          severity: 'error'
        };
        issues.push(issue);
        console.log(`   ❌ Cannot read logo file: ${error.message}`);
        found = false;
      }
      break;
    }
  }
  
  if (found) {
    validImages++;
    console.log(`   ✅ Logo found: ${foundFormat}`);
    
    // Check if the referenced format matches the found format
    const referencedExt = path.extname(tool.logo);
    if (referencedExt !== foundFormat) {
      const issue = {
        tool: tool.name,
        slug: tool.slug,
        type: 'format_mismatch',
        issue: `Logo references ${referencedExt} but ${foundFormat} exists`,
        severity: 'warning'
      };
      issues.push(issue);
      console.log(`   ⚠️  Format mismatch: references ${referencedExt}, found ${foundFormat}`);
    }
  } else {
    missingImages++;
    const issue = {
      tool: tool.name,
      slug: tool.slug,
      type: 'missing_file',
      issue: `Logo file not found: ${tool.logo}`,
      severity: 'error'
    };
    issues.push(issue);
    console.log(`   ❌ Logo not found: ${tool.logo}`);
  }
});

// Generate summary
console.log('\n' + '='.repeat(60));
console.log('📋 IMAGE VALIDATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total tools: ${totalTools}`);
console.log(`Valid images: ${validImages} (${Math.round((validImages / totalTools) * 100)}%)`);
console.log(`Missing images: ${missingImages} (${Math.round((missingImages / totalTools) * 100)}%)`);
console.log(`Broken references: ${brokenReferences}`);
console.log(`Total issues: ${issues.length}`);

// Group issues by severity
const errors = issues.filter(i => i.severity === 'error');
const warnings = issues.filter(i => i.severity === 'warning');

if (errors.length > 0) {
  console.log(`\n❌ ERRORS (${errors.length}):`);
  errors.slice(0, 10).forEach(issue => {
    console.log(`   • ${issue.tool}: ${issue.issue}`);
  });
  if (errors.length > 10) {
    console.log(`   ... and ${errors.length - 10} more errors`);
  }
}

if (warnings.length > 0) {
  console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
  warnings.slice(0, 5).forEach(issue => {
    console.log(`   • ${issue.tool}: ${issue.issue}`);
  });
  if (warnings.length > 5) {
    console.log(`   ... and ${warnings.length - 5} more warnings`);
  }
}

// Save detailed report
const reportPath = path.join(process.cwd(), 'image-validation-report.json');
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalTools,
    validImages,
    missingImages,
    brokenReferences,
    totalIssues: issues.length,
    errorCount: errors.length,
    warningCount: warnings.length,
    successRate: Math.round((validImages / totalTools) * 100)
  },
  issues: issues
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n📄 Detailed report saved: ${reportPath}`);

// Suggest actions
if (missingImages > 0) {
  console.log(`\n💡 SUGGESTED ACTIONS:`);
  console.log(`   1. Run: npm run generate-logos`);
  console.log(`   2. Or manually add missing logo files to public/images/tools/`);
  console.log(`   3. Commit generated logos to fix broken images`);
}

console.log('='.repeat(60));

// Exit with appropriate code
const exitCode = errors.length > 0 ? 1 : 0;
if (exitCode === 0) {
  console.log('✅ IMAGE VALIDATION PASSED');
} else {
  console.log('❌ IMAGE VALIDATION FAILED');
  console.log('   Fix errors before deploying to prevent broken images');
}

process.exit(exitCode);