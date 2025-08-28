#!/usr/bin/env node

/**
 * Semantic HTML and Accessibility Test Script
 * Tests components for proper semantic HTML structure and accessibility
 */

const fs = require('fs');
const path = require('path');

class SemanticHTMLTester {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passes = [];
  }

  // Check if file contains semantic HTML elements
  checkSemanticElements(content, fileName) {
    const semanticElements = [
      'header', 'nav', 'main', 'article', 'section', 
      'aside', 'footer', 'figure', 'figcaption', 'time'
    ];

    const foundElements = [];
    const missingElements = [];

    semanticElements.forEach(element => {
      // Check for both JSX and HTML syntax
      const patterns = [
        `<${element}`,
        `<${element.charAt(0).toUpperCase() + element.slice(1)}`
      ];
      
      const found = patterns.some(pattern => content.includes(pattern));
      
      if (found) {
        foundElements.push(element);
      }
    });

    // Check for overuse of divs
    const divCount = (content.match(/<div/g) || []).length;
    const semanticCount = foundElements.length;

    if (divCount > semanticCount * 3) {
      this.warnings.push(`${fileName}: High div usage (${divCount} divs vs ${semanticCount} semantic elements)`);
    }

    if (foundElements.length > 0) {
      this.passes.push(`${fileName}: Uses semantic elements: ${foundElements.join(', ')}`);
    }

    return foundElements;
  }

  // Check for proper heading hierarchy
  checkHeadingHierarchy(content, fileName) {
    const headingMatches = content.match(/<h[1-6]/gi) || [];
    const headings = headingMatches.map(h => parseInt(h.charAt(2)));
    
    if (headings.length === 0) return;

    // Check for multiple h1s
    const h1Count = headings.filter(h => h === 1).length;
    if (h1Count > 1) {
      this.errors.push(`${fileName}: Multiple <h1> elements found (${h1Count})`);
    } else if (h1Count === 0 && headings.length > 0) {
      this.warnings.push(`${fileName}: No <h1> element found`);
    }

    // Check for skipped heading levels
    const uniqueHeadings = [...new Set(headings)].sort();
    for (let i = 1; i < uniqueHeadings.length; i++) {
      if (uniqueHeadings[i] - uniqueHeadings[i-1] > 1) {
        this.errors.push(`${fileName}: Skipped heading level from h${uniqueHeadings[i-1]} to h${uniqueHeadings[i]}`);
      }
    }

    if (h1Count === 1 && !this.errors.some(e => e.includes(fileName))) {
      this.passes.push(`${fileName}: Proper heading hierarchy`);
    }
  }

  // Check for ARIA attributes
  checkARIAAttributes(content, fileName) {
    const ariaAttributes = [
      'aria-label', 'aria-labelledby', 'aria-describedby',
      'aria-expanded', 'aria-controls', 'aria-current',
      'aria-hidden', 'aria-live', 'role'
    ];

    const foundARIA = [];
    
    ariaAttributes.forEach(attr => {
      if (content.includes(attr)) {
        foundARIA.push(attr);
      }
    });

    // Check for interactive elements without ARIA
    const hasButtons = content.includes('<button') || content.includes('<Button');
    const hasButtonARIA = content.includes('aria-label') || content.includes('aria-expanded');
    
    if (hasButtons && !hasButtonARIA) {
      this.warnings.push(`${fileName}: Interactive elements may need ARIA attributes`);
    }

    if (foundARIA.length > 0) {
      this.passes.push(`${fileName}: Uses ARIA attributes: ${foundARIA.join(', ')}`);
    }
  }

  // Check for alt text on images
  checkImageAltText(content, fileName) {
    const imageMatches = content.match(/<img[^>]*>/gi) || [];
    const imageComponentMatches = content.match(/<Image[^>]*>/gi) || [];
    
    const allImages = [...imageMatches, ...imageComponentMatches];
    const imagesWithoutAlt = allImages.filter(img => !img.includes('alt='));
    
    if (imagesWithoutAlt.length > 0) {
      this.errors.push(`${fileName}: ${imagesWithoutAlt.length} images without alt text`);
    } else if (allImages.length > 0) {
      this.passes.push(`${fileName}: All ${allImages.length} images have alt text`);
    }
  }

  // Check for form accessibility
  checkFormAccessibility(content, fileName) {
    const hasForm = content.includes('<form') || content.includes('<Form');
    if (!hasForm) return;

    const hasLabels = content.includes('<label') || content.includes('<Label');
    const hasFieldset = content.includes('<fieldset') || content.includes('<Fieldset');
    const hasAriaRequired = content.includes('aria-required') || content.includes('required');
    
    if (!hasLabels) {
      this.errors.push(`${fileName}: Form without labels`);
    }
    
    if (!hasFieldset && content.includes('<input') && 
        (content.match(/<input/g) || []).length > 3) {
      this.warnings.push(`${fileName}: Consider using fieldset for grouped form fields`);
    }
    
    if (!hasAriaRequired) {
      this.warnings.push(`${fileName}: Form fields may need required indicators`);
    }

    if (hasLabels && hasAriaRequired) {
      this.passes.push(`${fileName}: Form has proper accessibility features`);
    }
  }

  // Check for skip navigation
  checkSkipNavigation(content, fileName) {
    const hasSkipLink = content.includes('Skip to') || 
                       content.includes('skip-link') ||
                       content.includes('#main-content');
    
    if (fileName.includes('Layout') || fileName.includes('Header')) {
      if (hasSkipLink) {
        this.passes.push(`${fileName}: Has skip navigation`);
      } else {
        this.warnings.push(`${fileName}: Consider adding skip navigation`);
      }
    }
  }

  // Check for keyboard navigation support
  checkKeyboardSupport(content, fileName) {
    const hasTabIndex = content.includes('tabIndex') || content.includes('tabindex');
    const hasOnKeyDown = content.includes('onKeyDown') || content.includes('onkeydown');
    const hasFocusManagement = content.includes('focus()') || content.includes('Focus');
    
    if (hasTabIndex || hasOnKeyDown || hasFocusManagement) {
      this.passes.push(`${fileName}: Has keyboard navigation support`);
    }
  }

  // Check for color contrast issues (basic check)
  checkColorContrast(content, fileName) {
    // Check for common low-contrast patterns
    const lowContrastPatterns = [
      /text-gray-[234]00.*bg-gray-[234]00/,
      /text-white.*bg-yellow/,
      /text-gray-500.*bg-white/,
    ];
    
    lowContrastPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        this.warnings.push(`${fileName}: Potential color contrast issue detected`);
      }
    });
  }

  // Test a single file
  testFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    this.checkSemanticElements(content, fileName);
    this.checkHeadingHierarchy(content, fileName);
    this.checkARIAAttributes(content, fileName);
    this.checkImageAltText(content, fileName);
    this.checkFormAccessibility(content, fileName);
    this.checkSkipNavigation(content, fileName);
    this.checkKeyboardSupport(content, fileName);
    this.checkColorContrast(content, fileName);
  }

  // Test multiple files
  testFiles(pattern) {
    const componentsDir = path.join(__dirname, '../components');
    const pagesDir = path.join(__dirname, '../pages');
    
    // Test semantic components
    const semanticFiles = [
      path.join(componentsDir, 'SemanticLayout.tsx'),
      path.join(componentsDir, 'SemanticHeader.tsx'),
      path.join(componentsDir, 'SemanticFooter.tsx'),
      path.join(componentsDir, 'semantic/ToolCard.tsx'),
      path.join(componentsDir, 'semantic/ComparisonTable.tsx'),
    ];
    
    // Test existing components for comparison
    const existingFiles = [
      path.join(componentsDir, 'Layout.tsx'),
      path.join(componentsDir, 'Header.tsx'),
      path.join(componentsDir, 'Footer.tsx'),
    ];
    
    console.log('🔍 Testing Semantic HTML Components...\n');
    
    // Test new semantic components
    console.log('📋 New Semantic Components:');
    semanticFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.testFile(file);
      }
    });
    
    // Test existing components
    console.log('\n📋 Existing Components (for comparison):');
    existingFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.testFile(file);
      }
    });
  }

  // Generate report
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 SEMANTIC HTML TEST REPORT');
    console.log('='.repeat(60));
    
    if (this.passes.length > 0) {
      console.log('\n✅ PASSES (' + this.passes.length + ')');
      console.log('-'.repeat(40));
      this.passes.forEach(pass => console.log('  ✓ ' + pass));
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS (' + this.warnings.length + ')');
      console.log('-'.repeat(40));
      this.warnings.forEach(warning => console.log('  ⚠ ' + warning));
    }
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS (' + this.errors.length + ')');
      console.log('-'.repeat(40));
      this.errors.forEach(error => console.log('  ✗ ' + error));
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📈 SUMMARY');
    console.log('-'.repeat(40));
    console.log(`  Passes:   ${this.passes.length}`);
    console.log(`  Warnings: ${this.warnings.length}`);
    console.log(`  Errors:   ${this.errors.length}`);
    
    const score = Math.round(
      (this.passes.length / (this.passes.length + this.warnings.length + this.errors.length)) * 100
    );
    
    console.log(`\n  Overall Score: ${score}%`);
    
    if (score >= 80) {
      console.log('  Grade: 🌟 Excellent');
    } else if (score >= 60) {
      console.log('  Grade: ✅ Good');
    } else if (score >= 40) {
      console.log('  Grade: ⚠️  Needs Improvement');
    } else {
      console.log('  Grade: ❌ Poor');
    }
    
    console.log('='.repeat(60) + '\n');
    
    // Recommendations
    if (this.errors.length > 0 || this.warnings.length > 0) {
      console.log('💡 RECOMMENDATIONS');
      console.log('-'.repeat(40));
      
      if (this.errors.some(e => e.includes('Multiple <h1>'))) {
        console.log('  • Ensure only one <h1> per page');
      }
      if (this.errors.some(e => e.includes('without alt text'))) {
        console.log('  • Add alt text to all images');
      }
      if (this.warnings.some(w => w.includes('High div usage'))) {
        console.log('  • Replace <div> with semantic HTML elements where appropriate');
      }
      if (this.warnings.some(w => w.includes('skip navigation'))) {
        console.log('  • Add skip navigation links for accessibility');
      }
      if (this.warnings.some(w => w.includes('ARIA attributes'))) {
        console.log('  • Add ARIA labels to interactive elements');
      }
      
      console.log('\n');
    }
  }
}

// Run tests
const tester = new SemanticHTMLTester();
tester.testFiles();
tester.generateReport();