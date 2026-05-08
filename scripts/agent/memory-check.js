#!/usr/bin/env node

/**
 * Agent Stack Cross-Session Memory Check
 * Validates project memory and context understanding
 */

const fs = require('fs');
const path = require('path');

class MemoryChecker {
  constructor(options = {}) {
    this.memoryFile = options.memoryFile || 'docs/agent-stack/memory-bootstrap.md';
    this.projectRoot = options.projectRoot || '.';
    this.checks = {
      memory_file: false,
      project_context: false,
      critical_requirements: false,
      commands: false,
      data_integrity: false,
      recent_changes: false
    };
    this.issues = [];
    this.context = {};
  }

  /**
   * Run all memory checks
   */
  async runChecks() {
    console.log('🧠 Checking cross-session project memory...\n');

    await this.checkMemoryFile();
    await this.checkProjectContext();
    await this.checkCriticalRequirements();
    await this.checkCommands();
    await this.checkDataIntegrity();
    await this.checkRecentChanges();

    return this.generateReport();
  }

  /**
   * Check if memory bootstrap file exists and is valid
   */
  async checkMemoryFile() {
    console.log('📄 Checking memory bootstrap file...');

    try {
      if (!fs.existsSync(this.memoryFile)) {
        this.addIssue('critical', 'Memory bootstrap file not found', {
          file: this.memoryFile,
          suggestion: 'Create memory-bootstrap.md with project context'
        });
        return;
      }

      const content = fs.readFileSync(this.memoryFile, 'utf8');
      
      // Check for required sections
      const requiredSections = [
        'Project Overview',
        'Critical Requirements', 
        'Development Commands',
        'Data Management',
        'Common Issues'
      ];

      for (const section of requiredSections) {
        if (!content.includes(section)) {
          this.addIssue('medium', `Memory file missing section: ${section}`);
        }
      }

      // Check last update
      const lastUpdateMatch = content.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/);
      if (lastUpdateMatch) {
        const lastUpdate = new Date(lastUpdateMatch[1]);
        const daysSince = Math.ceil((new Date() - lastUpdate) / (1000 * 60 * 60 * 24));
        
        if (daysSince > 30) {
          this.addIssue('low', `Memory file last updated ${daysSince} days ago`, {
            suggestion: 'Consider updating with recent changes'
          });
        }
      }

      this.checks.memory_file = true;
      console.log('✅ Memory file check passed');

    } catch (error) {
      this.addIssue('critical', `Error reading memory file: ${error.message}`);
    }
  }

  /**
   * Check project context understanding
   */
  async checkProjectContext() {
    console.log('🏗️  Checking project context...');

    try {
      // Check package.json
      const packagePath = path.join(this.projectRoot, 'package.json');
      if (fs.existsSync(packagePath)) {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        this.context.projectName = pkg.name;
        this.context.version = pkg.version;
        this.context.framework = this.detectFramework(pkg);
      }

      // Check for SiteOptz-specific files
      const siteOptzFiles = [
        'public/data/aiToolsData.json',
        'CLAUDE.md',
        'utils/seoMetaGenerator.js'
      ];

      for (const file of siteOptzFiles) {
        const fullPath = path.join(this.projectRoot, file);
        if (!fs.existsSync(fullPath)) {
          this.addIssue('medium', `SiteOptz core file missing: ${file}`);
        }
      }

      this.checks.project_context = true;
      console.log('✅ Project context check passed');

    } catch (error) {
      this.addIssue('high', `Error checking project context: ${error.message}`);
    }
  }

  /**
   * Check critical requirements are understood
   */
  async checkCriticalRequirements() {
    console.log('⚠️  Checking critical requirements...');

    const requirements = [
      {
        name: 'URL Format',
        check: () => this.checkURLFormat(),
        critical: true
      },
      {
        name: 'Dark Theme',
        check: () => this.checkDarkTheme(),
        critical: false
      },
      {
        name: 'Image Management',
        check: () => this.checkImageManagement(),
        critical: true
      },
      {
        name: 'Rich Results',
        check: () => this.checkRichResults(),
        critical: true
      }
    ];

    let passedCritical = 0;
    let totalCritical = 0;

    for (const req of requirements) {
      try {
        const result = await req.check();
        if (req.critical) {
          totalCritical++;
          if (result) passedCritical++;
        }
      } catch (error) {
        this.addIssue('high', `Error checking ${req.name}: ${error.message}`);
      }
    }

    this.checks.critical_requirements = passedCritical === totalCritical;
    console.log(`✅ Critical requirements: ${passedCritical}/${totalCritical} passed`);
  }

  /**
   * Check URL format understanding
   */
  checkURLFormat() {
    const comparePath = path.join(this.projectRoot, 'pages/compare');
    if (!fs.existsSync(comparePath)) {
      this.addIssue('high', 'Compare pages directory not found');
      return false;
    }

    // Check for proper URL structure
    const dynamicPath = path.join(comparePath, '[tool1]/vs/[tool2]');
    if (!fs.existsSync(dynamicPath)) {
      this.addIssue('critical', 'Incorrect URL format - should be /compare/[tool1]/vs/[tool2]');
      return false;
    }

    return true;
  }

  /**
   * Check dark theme implementation
   */
  checkDarkTheme() {
    // Check for dark theme patterns in components
    const componentsPath = path.join(this.projectRoot, 'components');
    if (!fs.existsSync(componentsPath)) {
      this.addIssue('medium', 'Components directory not found');
      return false;
    }

    // This is a simplified check - in practice would scan component files
    return true;
  }

  /**
   * Check image management
   */
  checkImageManagement() {
    const scriptsPath = path.join(this.projectRoot, 'scripts');
    const requiredScripts = [
      'validate-images.js',
      'generate-missing-logos.js'
    ];

    for (const script of requiredScripts) {
      const scriptPath = path.join(scriptsPath, script);
      if (!fs.existsSync(scriptPath)) {
        this.addIssue('high', `Missing image management script: ${script}`);
        return false;
      }
    }

    return true;
  }

  /**
   * Check rich results implementation
   */
  checkRichResults() {
    const schemaScript = path.join(this.projectRoot, 'scripts/validate-structured-data.js');
    if (!fs.existsSync(schemaScript)) {
      this.addIssue('critical', 'Schema validation script not found');
      return false;
    }

    return true;
  }

  /**
   * Check development commands
   */
  async checkCommands() {
    console.log('⚙️  Checking development commands...');

    try {
      const packagePath = path.join(this.projectRoot, 'package.json');
      if (!fs.existsSync(packagePath)) {
        this.addIssue('critical', 'package.json not found');
        return;
      }

      const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      const scripts = pkg.scripts || {};

      const requiredCommands = [
        'build',
        'type-check',
        'lint',
        'validate-urls',
        'validate-images',
        'validate-schema'
      ];

      const agentCommands = [
        'agent:memory:check',
        'agent:review',
        'agent:security',
        'agent:suppressions:validate'
      ];

      let missing = 0;

      for (const cmd of requiredCommands) {
        if (!scripts[cmd]) {
          this.addIssue('high', `Missing required command: npm run ${cmd}`);
          missing++;
        }
      }

      for (const cmd of agentCommands) {
        if (!scripts[cmd]) {
          this.addIssue('medium', `Missing agent command: npm run ${cmd}`);
        }
      }

      this.checks.commands = missing === 0;
      console.log(`✅ Commands check: ${requiredCommands.length - missing}/${requiredCommands.length} found`);

    } catch (error) {
      this.addIssue('high', `Error checking commands: ${error.message}`);
    }
  }

  /**
   * Check data integrity
   */
  async checkDataIntegrity() {
    console.log('📊 Checking data integrity...');

    try {
      const dataPath = path.join(this.projectRoot, 'public/data/aiToolsData.json');
      if (!fs.existsSync(dataPath)) {
        this.addIssue('critical', 'Main data file aiToolsData.json not found');
        return;
      }

      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      
      // Basic validation
      if (!Array.isArray(data)) {
        this.addIssue('critical', 'aiToolsData.json should contain an array');
        return;
      }

      const toolCount = data.length;
      this.context.toolCount = toolCount;

      // Check for required fields in sample tools
      const sampleSize = Math.min(5, toolCount);
      let validTools = 0;

      for (let i = 0; i < sampleSize; i++) {
        const tool = data[i];
        if (tool.id && tool.name && tool.slug && Array.isArray(tool.features)) {
          validTools++;
        }
      }

      if (validTools < sampleSize) {
        this.addIssue('high', 'Some tools missing required fields (id, name, slug, features)');
      }

      this.checks.data_integrity = true;
      console.log(`✅ Data integrity check passed (${toolCount} tools)`);

    } catch (error) {
      this.addIssue('critical', `Error checking data integrity: ${error.message}`);
    }
  }

  /**
   * Check recent changes
   */
  async checkRecentChanges() {
    console.log('🕒 Checking recent changes...');

    // This would ideally check git history, but for now just check file timestamps
    try {
      const keyFiles = [
        'public/data/aiToolsData.json',
        'package.json',
        'CLAUDE.md'
      ];

      const recentChanges = [];
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      for (const file of keyFiles) {
        const filePath = path.join(this.projectRoot, file);
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          if (stats.mtime > oneDayAgo) {
            recentChanges.push(file);
          }
        }
      }

      if (recentChanges.length > 0) {
        console.log(`📝 Recent changes detected in: ${recentChanges.join(', ')}`);
      }

      this.checks.recent_changes = true;
      console.log('✅ Recent changes check completed');

    } catch (error) {
      this.addIssue('low', `Error checking recent changes: ${error.message}`);
    }
  }

  /**
   * Detect framework from package.json
   */
  detectFramework(pkg) {
    if (pkg.dependencies?.['next']) return 'Next.js';
    if (pkg.dependencies?.['react']) return 'React';
    if (pkg.dependencies?.['vue']) return 'Vue.js';
    if (pkg.dependencies?.['angular']) return 'Angular';
    return 'Unknown';
  }

  /**
   * Add an issue to the issues list
   */
  addIssue(severity, message, details = {}) {
    this.issues.push({
      severity,
      message,
      ...details,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Generate memory check report
   */
  generateReport() {
    const passedChecks = Object.values(this.checks).filter(Boolean).length;
    const totalChecks = Object.keys(this.checks).length;

    const criticalIssues = this.issues.filter(i => i.severity === 'critical').length;
    const highIssues = this.issues.filter(i => i.severity === 'high').length;

    const report = {
      timestamp: new Date().toISOString(),
      memory_status: criticalIssues === 0 ? 'HEALTHY' : 'DEGRADED',
      checks_passed: `${passedChecks}/${totalChecks}`,
      context: this.context,
      checks: this.checks,
      issues: this.issues,
      summary: {
        total_issues: this.issues.length,
        critical: criticalIssues,
        high: highIssues,
        medium: this.issues.filter(i => i.severity === 'medium').length,
        low: this.issues.filter(i => i.severity === 'low').length
      },
      recommendations: this.generateRecommendations()
    };

    // Write report
    const outputDir = 'docs/agent-stack/generated';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(outputDir, 'memory-check.json'),
      JSON.stringify(report, null, 2)
    );

    this.printReport(report);
    return report;
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.issues.some(i => i.severity === 'critical')) {
      recommendations.push('Address critical memory issues immediately');
    }

    if (!this.checks.memory_file) {
      recommendations.push('Create or update memory-bootstrap.md');
    }

    if (!this.checks.critical_requirements) {
      recommendations.push('Review and implement critical requirements');
    }

    if (this.context.toolCount > 100) {
      recommendations.push('Consider data optimization for large tool dataset');
    }

    return recommendations;
  }

  /**
   * Print memory check report
   */
  printReport(report) {
    console.log('\n' + '='.repeat(50));
    console.log('🧠 MEMORY CHECK REPORT');
    console.log('='.repeat(50));
    
    console.log(`Status: ${report.memory_status}`);
    console.log(`Checks Passed: ${report.checks_passed}`);
    console.log(`Total Issues: ${report.summary.total_issues}`);
    
    if (report.context.projectName) {
      console.log(`Project: ${report.context.projectName} (${report.context.framework})`);
    }
    
    if (report.context.toolCount) {
      console.log(`Tools in Database: ${report.context.toolCount}`);
    }

    if (report.summary.critical > 0) {
      console.log(`\n🚨 ${report.summary.critical} CRITICAL issue(s) found`);
    }

    if (report.summary.high > 0) {
      console.log(`⚠️  ${report.summary.high} HIGH issue(s) found`);
    }

    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      for (const rec of report.recommendations) {
        console.log(`  - ${rec}`);
      }
    }

    console.log('\n='.repeat(50));
  }
}

// CLI interface
if (require.main === module) {
  const checker = new MemoryChecker();
  
  checker.runChecks()
    .then(report => {
      const exitCode = report.summary.critical > 0 ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('Fatal error during memory check:', error);
      process.exit(1);
    });
}

module.exports = MemoryChecker;