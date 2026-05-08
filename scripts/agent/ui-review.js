#!/usr/bin/env node

/**
 * Agent Stack UI/Design Review
 * Frontend design quality enforcement with SiteOptz-specific requirements
 */

const fs = require('fs');
const path = require('path');

class UIReviewer {
  constructor(options = {}) {
    this.targetPath = options.targetPath || '.';
    this.outputDir = options.outputDir || 'docs/agent-stack/generated/ui';
    this.interactive = options.interactive !== false;
    this.issues = [];
    this.suppressions = [];
    this.checkers = [
      { name: 'dark_theme', enabled: true, critical: true },
      { name: 'accessibility', enabled: true, critical: true },
      { name: 'mobile_responsive', enabled: true, critical: false },
      { name: 'design_system', enabled: true, critical: false },
      { name: 'performance', enabled: true, critical: false }
    ];
  }

  /**
   * Run UI review
   */
  async runReview() {
    console.log('🎨 Starting UI/Design review...');
    console.log(`Target: ${this.targetPath}\n`);

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Load suppressions
    await this.loadSuppressions();

    // Run individual checkers
    for (const checker of this.checkers) {
      if (checker.enabled) {
        await this.runChecker(checker);
      }
    }

    // Generate report
    const report = this.generateReport();
    this.printSummary(report);
    
    return report;
  }

  /**
   * Load UI suppressions
   */
  async loadSuppressions() {
    try {
      const suppressionsPath = 'docs/agent-stack/generated/suppressions.json';
      if (fs.existsSync(suppressionsPath)) {
        const data = JSON.parse(fs.readFileSync(suppressionsPath, 'utf8'));
        this.suppressions = data.suppressions.filter(s => 
          s.type === 'ui' && s.status === 'active'
        );
        console.log(`📋 Loaded ${this.suppressions.length} UI suppressions`);
      }
    } catch (error) {
      console.warn('⚠️  Could not load suppressions:', error.message);
    }
  }

  /**
   * Run individual UI checker
   */
  async runChecker(checker) {
    console.log(`🔍 Running ${checker.name} checker...`);

    try {
      switch (checker.name) {
        case 'dark_theme':
          await this.checkDarkTheme();
          break;
        case 'accessibility':
          await this.checkAccessibility();
          break;
        case 'mobile_responsive':
          await this.checkMobileResponsive();
          break;
        case 'design_system':
          await this.checkDesignSystem();
          break;
        case 'performance':
          await this.checkPerformance();
          break;
        default:
          console.warn(`Unknown checker: ${checker.name}`);
      }
    } catch (error) {
      this.addIssue('high', `${checker.name} checker failed`, {
        error: error.message,
        checker: checker.name
      });
    }
  }

  /**
   * Check dark theme compliance (SiteOptz mandatory requirement)
   */
  async checkDarkTheme() {
    const darkThemePatterns = [
      {
        name: 'Correct Background Gradient',
        pattern: /bg-gradient-to-br\s+from-black\s+via-gray-900\s+to-black/g,
        required: true,
        severity: 'critical'
      },
      {
        name: 'Card Styling',
        pattern: /bg-black\s+border\s+border-gray-800/g,
        required: true,
        severity: 'high'
      },
      {
        name: 'Text Colors',
        pattern: /text-(white|gray-300|gray-400|cyan-400)/g,
        required: true,
        severity: 'medium'
      },
      {
        name: 'Button Gradients',
        pattern: /bg-gradient-to-r\s+from-blue-600\s+to-purple-600/g,
        required: true,
        severity: 'medium'
      }
    ];

    const lightThemeViolations = [
      {
        name: 'Light Background',
        pattern: /bg-(white|gray-100|gray-50)/g,
        severity: 'critical',
        description: 'Light backgrounds violate dark theme requirement'
      },
      {
        name: 'Dark Text on Light',
        pattern: /text-(black|gray-900|gray-800)/g,
        severity: 'high',
        description: 'Dark text suggests light theme usage'
      }
    ];

    await this.scanComponentsForPatterns(darkThemePatterns, 'dark_theme_compliance');
    await this.scanComponentsForPatterns(lightThemeViolations, 'dark_theme_violations');
  }

  /**
   * Check accessibility compliance
   */
  async checkAccessibility() {
    const a11yPatterns = [
      {
        name: 'Missing Alt Text',
        pattern: /<img(?![^>]*alt=)/gi,
        severity: 'high',
        description: 'Images missing alt text for screen readers'
      },
      {
        name: 'Unlabeled Inputs',
        pattern: /<input(?![^>]*aria-label)(?![^>]*id=["'][^"']*["'][^>]*>[\s\S]*?<label[^>]*for=["']\1["'])/gi,
        severity: 'high',
        description: 'Form inputs missing proper labels'
      },
      {
        name: 'Missing Button Text',
        pattern: /<button[^>]*>[\s]*<\/button>/gi,
        severity: 'medium',
        description: 'Buttons with no accessible text'
      },
      {
        name: 'Color Only Information',
        pattern: /\bcolor:\s*red\b(?![^}]*content:)/gi,
        severity: 'medium',
        description: 'Information conveyed by color alone'
      }
    ];

    await this.scanComponentsForPatterns(a11yPatterns, 'accessibility');
  }

  /**
   * Check mobile responsiveness
   */
  async checkMobileResponsive() {
    const mobilePatterns = [
      {
        name: 'Missing Mobile Breakpoints',
        pattern: /className=["'][^"']*\b(lg:|xl:|2xl:)(?![^"']*\b(sm:|md:))/g,
        severity: 'medium',
        description: 'Large breakpoints without smaller ones'
      },
      {
        name: 'Fixed Width Elements',
        pattern: /\bw-\[[\d]+px\]/g,
        severity: 'low',
        description: 'Fixed width elements may not be mobile-friendly'
      },
      {
        name: 'Small Touch Targets',
        pattern: /\b(h-[1-8]|w-[1-8])\b/g,
        severity: 'medium',
        description: 'Touch targets may be too small for mobile'
      }
    ];

    await this.scanComponentsForPatterns(mobilePatterns, 'mobile_responsive');
  }

  /**
   * Check design system compliance
   */
  async checkDesignSystem() {
    const designSystemPatterns = [
      {
        name: 'Hardcoded Colors',
        pattern: /#[0-9a-fA-F]{6}|rgb\(|rgba\(/g,
        severity: 'low',
        description: 'Hardcoded colors instead of design tokens'
      },
      {
        name: 'Inconsistent Spacing',
        pattern: /\b(p|m|space)-([\d]+\.[\d]+|[\d]{2,})/g,
        severity: 'low',
        description: 'Non-standard spacing values'
      },
      {
        name: 'Inline Styles',
        pattern: /style=["'][^"']+["']/g,
        severity: 'medium',
        description: 'Inline styles instead of utility classes'
      }
    ];

    await this.scanComponentsForPatterns(designSystemPatterns, 'design_system');
  }

  /**
   * Check performance-related UI patterns
   */
  async checkPerformance() {
    const performancePatterns = [
      {
        name: 'Large Images Without Optimization',
        pattern: /<img[^>]*src=["'][^"']*\.(jpg|jpeg|png)["'][^>]*>/gi,
        severity: 'medium',
        description: 'Images should use Next.js Image component for optimization'
      },
      {
        name: 'Unoptimized Animations',
        pattern: /transition-all/g,
        severity: 'low',
        description: 'transition-all can cause performance issues'
      },
      {
        name: 'Heavy Component Imports',
        pattern: /import.*from\s+["'](?!\.)[^"']*["']/g,
        severity: 'low',
        description: 'Consider dynamic imports for heavy components'
      }
    ];

    await this.scanComponentsForPatterns(performancePatterns, 'performance');
  }

  /**
   * Scan component files for patterns
   */
  async scanComponentsForPatterns(patterns, category) {
    const componentDirs = ['components', 'pages', 'src/components', 'src/pages'];
    
    for (const dir of componentDirs) {
      const dirPath = path.join(this.targetPath, dir);
      if (fs.existsSync(dirPath)) {
        await this.walkDirectory(dirPath, (filePath) => {
          this.scanFileForPatterns(filePath, patterns, category);
        });
      }
    }
  }

  /**
   * Scan individual file for patterns
   */
  scanFileForPatterns(filePath, patterns, category) {
    const ext = path.extname(filePath).toLowerCase();
    const componentExtensions = ['.js', '.jsx', '.ts', '.tsx', '.vue'];
    
    if (!componentExtensions.includes(ext)) {
      return;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      for (const pattern of patterns) {
        const matches = content.matchAll(pattern.pattern);
        for (const match of matches) {
          const lineNumber = this.getLineNumber(content, match.index);
          
          if (!this.isSuppressed(pattern.name, filePath)) {
            this.addIssue(pattern.severity, pattern.description || pattern.name, {
              file: filePath,
              line: lineNumber,
              match: match[0],
              category: category,
              pattern: pattern.name
            });
          }
        }
      }
    } catch (error) {
      // Skip files that can't be read
    }
  }

  /**
   * Walk directory recursively
   */
  async walkDirectory(dirPath, callback) {
    if (!fs.existsSync(dirPath)) return;
    
    const entries = fs.readdirSync(dirPath);
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry);
      const stats = fs.lstatSync(fullPath);
      
      if (stats.isDirectory()) {
        // Skip common directories that shouldn't be scanned
        if (!['node_modules', '.git', '.next', 'dist', 'build', 'out'].includes(entry)) {
          await this.walkDirectory(fullPath, callback);
        }
      } else {
        callback(fullPath);
      }
    }
  }

  /**
   * Get line number from string index
   */
  getLineNumber(content, index) {
    const lines = content.substring(0, index).split('\n');
    return lines.length;
  }

  /**
   * Check if issue is suppressed
   */
  isSuppressed(ruleName, filePath) {
    return this.suppressions.some(supp => {
      return supp.rule_id === ruleName && 
             (supp.scope === '*' || filePath.includes(supp.scope));
    });
  }

  /**
   * Add UI issue
   */
  addIssue(severity, message, details = {}) {
    this.issues.push({
      severity,
      message,
      timestamp: new Date().toISOString(),
      ...details
    });
  }

  /**
   * Generate UI review report
   */
  generateReport() {
    const severityCounts = {
      critical: this.issues.filter(i => i.severity === 'critical').length,
      high: this.issues.filter(i => i.severity === 'high').length,
      medium: this.issues.filter(i => i.severity === 'medium').length,
      low: this.issues.filter(i => i.severity === 'low').length
    };

    const categoryStats = {};
    for (const issue of this.issues) {
      const cat = issue.category || 'unknown';
      categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    }

    const report = {
      timestamp: new Date().toISOString(),
      target: this.targetPath,
      review_type: 'ui_design',
      checkers_run: this.checkers.filter(c => c.enabled).map(c => c.name),
      suppressions_loaded: this.suppressions.length,
      summary: {
        total_issues: this.issues.length,
        severity_breakdown: severityCounts,
        category_breakdown: categoryStats,
        ui_status: this.getUIStatus(severityCounts)
      },
      issues: this.issues,
      recommendations: this.generateRecommendations(),
      siteoptz_compliance: this.checkSiteOptzCompliance(),
      metadata: {
        version: '1.0.0',
        framework: 'Next.js',
        design_system: 'TailwindCSS'
      }
    };

    // Write report
    const reportPath = path.join(this.outputDir, `ui-review-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    const latestPath = path.join(this.outputDir, 'latest-ui-review.json');
    fs.writeFileSync(latestPath, JSON.stringify(report, null, 2));

    return report;
  }

  /**
   * Determine UI status
   */
  getUIStatus(severityCounts) {
    if (severityCounts.critical > 0) return 'CRITICAL_ISSUES';
    if (severityCounts.high > 0) return 'HIGH_ISSUES';
    if (severityCounts.medium > 10) return 'MEDIUM_ISSUES';
    if (severityCounts.low > 20) return 'LOW_ISSUES';
    return 'COMPLIANT';
  }

  /**
   * Check SiteOptz-specific compliance
   */
  checkSiteOptzCompliance() {
    const darkThemeIssues = this.issues.filter(i => i.category === 'dark_theme_violations');
    const a11yIssues = this.issues.filter(i => i.category === 'accessibility');
    const mobileIssues = this.issues.filter(i => i.category === 'mobile_responsive');

    return {
      dark_theme_compliance: darkThemeIssues.length === 0,
      accessibility_score: Math.max(0, 100 - (a11yIssues.length * 5)),
      mobile_readiness: mobileIssues.length < 5,
      overall_compliance: darkThemeIssues.length === 0 && 
                         a11yIssues.length < 3 && 
                         mobileIssues.length < 5
    };
  }

  /**
   * Generate UI recommendations
   */
  generateRecommendations() {
    const recommendations = [];
    
    const criticalIssues = this.issues.filter(i => i.severity === 'critical');
    const highIssues = this.issues.filter(i => i.severity === 'high');

    if (criticalIssues.length > 0) {
      recommendations.push({
        priority: 'immediate',
        action: `Address ${criticalIssues.length} critical UI issue(s) immediately`,
        category: 'critical'
      });
    }

    if (highIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        action: `Review and resolve ${highIssues.length} high-priority UI issue(s)`,
        category: 'high'
      });
    }

    // Category-specific recommendations
    const darkThemeIssues = this.issues.filter(i => i.category === 'dark_theme_violations');
    if (darkThemeIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        action: 'Implement mandatory dark theme styling across all components',
        category: 'dark_theme'
      });
    }

    const a11yIssues = this.issues.filter(i => i.category === 'accessibility');
    if (a11yIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        action: 'Improve accessibility compliance for better user experience',
        category: 'accessibility'
      });
    }

    const mobileIssues = this.issues.filter(i => i.category === 'mobile_responsive');
    if (mobileIssues.length > 5) {
      recommendations.push({
        priority: 'medium',
        action: 'Enhance mobile responsiveness across components',
        category: 'mobile'
      });
    }

    return recommendations;
  }

  /**
   * Print UI review summary
   */
  printSummary(report) {
    console.log('\n' + '='.repeat(60));
    console.log('🎨 UI/DESIGN REVIEW SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`UI Status: ${report.summary.ui_status}`);
    console.log(`Total Issues: ${report.summary.total_issues}`);
    console.log(`Suppressions Applied: ${report.suppressions_loaded}`);
    
    console.log('\n🏷️  Issues by Severity:');
    for (const [severity, count] of Object.entries(report.summary.severity_breakdown)) {
      if (count > 0) {
        const emoji = { critical: '🔴', high: '🟠', medium: '🟡', low: '🔵' }[severity];
        console.log(`  ${emoji} ${severity}: ${count}`);
      }
    }

    console.log('\n📊 Issues by Category:');
    for (const [category, count] of Object.entries(report.summary.category_breakdown)) {
      const emoji = this.getCategoryEmoji(category);
      console.log(`  ${emoji} ${category}: ${count}`);
    }

    console.log('\n📋 SiteOptz Compliance:');
    const compliance = report.siteoptz_compliance;
    console.log(`  🌙 Dark Theme: ${compliance.dark_theme_compliance ? '✅' : '❌'}`);
    console.log(`  ♿ Accessibility: ${compliance.accessibility_score}%`);
    console.log(`  📱 Mobile Ready: ${compliance.mobile_readiness ? '✅' : '❌'}`);
    console.log(`  🎯 Overall: ${compliance.overall_compliance ? '✅' : '❌'}`);

    if (report.issues.length > 0) {
      console.log('\n🚨 Top Issues:');
      const topIssues = report.issues
        .sort((a, b) => {
          const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return severityOrder[b.severity] - severityOrder[a.severity];
        })
        .slice(0, 5);

      for (const issue of topIssues) {
        const emoji = { critical: '🔴', high: '🟠', medium: '🟡', low: '🔵' }[issue.severity];
        console.log(`  ${emoji} ${issue.message}`);
        if (issue.file) {
          console.log(`     📁 ${issue.file}${issue.line ? `:${issue.line}` : ''}`);
        }
      }
    }

    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      for (const rec of report.recommendations) {
        const priority = { immediate: '🔴', high: '🟠', medium: '🟡', low: '🔵' }[rec.priority];
        console.log(`  ${priority} ${rec.action}`);
      }
    }

    console.log('\n📁 Report saved to:', path.join(this.outputDir, 'latest-ui-review.json'));
    console.log('='.repeat(60));
  }

  /**
   * Get emoji for category
   */
  getCategoryEmoji(category) {
    const emojis = {
      dark_theme_compliance: '🌙',
      dark_theme_violations: '🌙',
      accessibility: '♿',
      mobile_responsive: '📱',
      design_system: '🎨',
      performance: '⚡',
      unknown: '❓'
    };
    return emojis[category] || '🔍';
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    targetPath: args[0] || '.',
    interactive: !process.env.CI
  };

  const reviewer = new UIReviewer(options);
  
  reviewer.runReview()
    .then(report => {
      const exitCode = ['CRITICAL_ISSUES', 'HIGH_ISSUES'].includes(report.summary.ui_status) ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('Fatal error during UI review:', error);
      process.exit(1);
    });
}

module.exports = UIReviewer;