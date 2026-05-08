#!/usr/bin/env node

/**
 * Agent Stack Security Scanner
 * Local security scanning with secret detection and vulnerability checking
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class SecurityScanner {
  constructor(options = {}) {
    this.targetPath = options.targetPath || '.';
    this.outputDir = options.outputDir || 'docs/agent-stack/generated/security';
    this.interactive = options.interactive !== false;
    this.scanners = [
      { name: 'secrets', enabled: true, critical: true },
      { name: 'dependencies', enabled: true, critical: false },
      { name: 'files', enabled: true, critical: false },
      { name: 'patterns', enabled: true, critical: false }
    ];
    this.issues = [];
    this.suppressions = [];
  }

  /**
   * Run all security scans
   */
  async runScan() {
    console.log('🔒 Starting security scan...');
    console.log(`Target: ${this.targetPath}\n`);

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Load suppressions
    await this.loadSuppressions();

    // Run individual scanners
    for (const scanner of this.scanners) {
      if (scanner.enabled) {
        await this.runScanner(scanner);
      }
    }

    // Generate report
    const report = this.generateReport();
    this.printSummary(report);
    
    return report;
  }

  /**
   * Load security suppressions
   */
  async loadSuppressions() {
    try {
      const suppressionsPath = 'docs/agent-stack/generated/suppressions.json';
      if (fs.existsSync(suppressionsPath)) {
        const data = JSON.parse(fs.readFileSync(suppressionsPath, 'utf8'));
        this.suppressions = data.suppressions.filter(s => 
          s.type === 'security' && s.status === 'active'
        );
        console.log(`📋 Loaded ${this.suppressions.length} security suppressions`);
      }
    } catch (error) {
      console.warn('⚠️  Could not load suppressions:', error.message);
    }
  }

  /**
   * Run individual security scanner
   */
  async runScanner(scanner) {
    console.log(`🔍 Running ${scanner.name} scanner...`);

    try {
      switch (scanner.name) {
        case 'secrets':
          await this.scanSecrets();
          break;
        case 'dependencies':
          await this.scanDependencies();
          break;
        case 'files':
          await this.scanFiles();
          break;
        case 'patterns':
          await this.scanPatterns();
          break;
        default:
          console.warn(`Unknown scanner: ${scanner.name}`);
      }
    } catch (error) {
      this.addIssue('high', `${scanner.name} scanner failed`, {
        error: error.message,
        scanner: scanner.name
      });
    }
  }

  /**
   * Scan for secrets and credentials
   */
  async scanSecrets() {
    const secretPatterns = [
      {
        name: 'API Keys',
        pattern: /(?:api[_-]?key|apikey)[\s]*[=:]+[\s]*['"]?([a-zA-Z0-9\-_]{20,})['"]?/gi,
        severity: 'critical'
      },
      {
        name: 'JWT Tokens',
        pattern: /(?:jwt|token)[\s]*[=:]+[\s]*['"]?(eyJ[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+)['"]?/gi,
        severity: 'critical'
      },
      {
        name: 'Database URLs',
        pattern: /(?:database_url|db_url)[\s]*[=:]+[\s]*['"]?([^'"\s]+)['"]?/gi,
        severity: 'high'
      },
      {
        name: 'Private Keys',
        pattern: /-----BEGIN\s+(RSA\s+)?PRIVATE\s+KEY-----/gi,
        severity: 'critical'
      },
      {
        name: 'Environment Secrets',
        pattern: /(?:secret|password|pwd)[\s]*[=:]+[\s]*['"]?([^'"\s]{8,})['"]?/gi,
        severity: 'high'
      }
    ];

    const excludePatterns = [
      /\.env\.example/,
      /\.env\.template/,
      /node_modules\//,
      /\.git\//,
      /docs\/.*\.md$/
    ];

    await this.scanFilesForPatterns(secretPatterns, excludePatterns, 'secrets');
  }

  /**
   * Scan dependencies for vulnerabilities
   */
  async scanDependencies() {
    const packagePath = path.join(this.targetPath, 'package.json');
    if (!fs.existsSync(packagePath)) {
      console.log('📦 No package.json found, skipping dependency scan');
      return;
    }

    try {
      // Run npm audit if available
      const auditResult = await this.runCommand('npm', ['audit', '--json'], { cwd: this.targetPath });
      
      if (auditResult.stdout) {
        const audit = JSON.parse(auditResult.stdout);
        
        if (audit.vulnerabilities) {
          for (const [name, vuln] of Object.entries(audit.vulnerabilities)) {
            if (vuln.severity === 'critical' || vuln.severity === 'high') {
              this.addIssue(vuln.severity, `Vulnerable dependency: ${name}`, {
                vulnerability: vuln,
                package: name,
                scanner: 'dependencies'
              });
            }
          }
        }
      }
    } catch (error) {
      // npm audit might fail, that's okay
      console.log('📦 Dependency scan completed (audit not available)');
    }

    // Check for known risky packages
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const riskyPackages = ['eval', 'vm2', 'serialize-javascript'];
    
    for (const risky of riskyPackages) {
      if (pkg.dependencies?.[risky] || pkg.devDependencies?.[risky]) {
        this.addIssue('medium', `Potentially risky package: ${risky}`, {
          package: risky,
          scanner: 'dependencies'
        });
      }
    }
  }

  /**
   * Scan file permissions and sensitive files
   */
  async scanFiles() {
    const sensitiveFiles = [
      { pattern: /\.pem$/, severity: 'high', description: 'PEM certificate file' },
      { pattern: /\.key$/, severity: 'high', description: 'Private key file' },
      { pattern: /\.p12$/, severity: 'high', description: 'PKCS#12 certificate' },
      { pattern: /id_rsa$/, severity: 'critical', description: 'SSH private key' },
      { pattern: /\.env$/, severity: 'medium', description: 'Environment file' }
    ];

    await this.walkDirectory(this.targetPath, (filePath) => {
      for (const sensitive of sensitiveFiles) {
        if (sensitive.pattern.test(path.basename(filePath))) {
          // Check if file should be ignored (like .env.example)
          if (!filePath.includes('example') && !filePath.includes('template')) {
            this.addIssue(sensitive.severity, `Sensitive file found: ${sensitive.description}`, {
              file: filePath,
              scanner: 'files'
            });
          }
        }
      }
    });
  }

  /**
   * Scan for insecure code patterns
   */
  async scanPatterns() {
    const insecurePatterns = [
      {
        name: 'eval() usage',
        pattern: /\beval\s*\(/g,
        severity: 'high',
        description: 'Use of eval() can lead to code injection'
      },
      {
        name: 'innerHTML assignment',
        pattern: /\.innerHTML\s*=/g,
        severity: 'medium',
        description: 'Direct innerHTML assignment may enable XSS'
      },
      {
        name: 'document.write',
        pattern: /document\.write\s*\(/g,
        severity: 'medium',
        description: 'document.write can be exploited for XSS'
      },
      {
        name: 'setTimeout with string',
        pattern: /setTimeout\s*\(\s*['"`]/g,
        severity: 'medium',
        description: 'setTimeout with string can enable code injection'
      }
    ];

    await this.scanFilesForPatterns(insecurePatterns, [/node_modules\//, /\.git\//], 'patterns');
  }

  /**
   * Scan files for specific patterns
   */
  async scanFilesForPatterns(patterns, excludePatterns, scannerName) {
    await this.walkDirectory(this.targetPath, (filePath) => {
      // Skip excluded files
      if (excludePatterns.some(exclude => exclude.test(filePath))) {
        return;
      }

      // Only scan text files
      const ext = path.extname(filePath).toLowerCase();
      const textExtensions = ['.js', '.ts', '.jsx', '.tsx', '.json', '.env', '.md', '.txt', '.yml', '.yaml'];
      
      if (!textExtensions.includes(ext) && !fs.lstatSync(filePath).isFile()) {
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
                scanner: scannerName
              });
            }
          }
        }
      } catch (error) {
        // Skip binary files or files that can't be read
      }
    });
  }

  /**
   * Walk directory recursively
   */
  async walkDirectory(dirPath, callback) {
    const entries = fs.readdirSync(dirPath);
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry);
      const stats = fs.lstatSync(fullPath);
      
      if (stats.isDirectory()) {
        // Skip common directories that shouldn't be scanned
        if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(entry)) {
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
   * Run external command
   */
  async runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
      const child = spawn(command, args, { 
        stdio: 'pipe',
        ...options
      });

      let stdout = '';
      let stderr = '';

      child.stdout?.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr?.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        resolve({ code, stdout, stderr });
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Add security issue
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
   * Generate security report
   */
  generateReport() {
    const severityCounts = {
      critical: this.issues.filter(i => i.severity === 'critical').length,
      high: this.issues.filter(i => i.severity === 'high').length,
      medium: this.issues.filter(i => i.severity === 'medium').length,
      low: this.issues.filter(i => i.severity === 'low').length
    };

    const report = {
      timestamp: new Date().toISOString(),
      target: this.targetPath,
      scan_type: 'comprehensive',
      scanners_run: this.scanners.filter(s => s.enabled).map(s => s.name),
      suppressions_loaded: this.suppressions.length,
      summary: {
        total_issues: this.issues.length,
        severity_breakdown: severityCounts,
        security_status: this.getSecurityStatus(severityCounts)
      },
      issues: this.issues,
      recommendations: this.generateRecommendations(),
      metadata: {
        version: '1.0.0',
        agent_stack: true
      }
    };

    // Write report
    const reportPath = path.join(this.outputDir, `security-scan-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    const latestPath = path.join(this.outputDir, 'latest-security.json');
    fs.writeFileSync(latestPath, JSON.stringify(report, null, 2));

    return report;
  }

  /**
   * Determine security status
   */
  getSecurityStatus(severityCounts) {
    if (severityCounts.critical > 0) return 'CRITICAL';
    if (severityCounts.high > 0) return 'HIGH_RISK';
    if (severityCounts.medium > 5) return 'MEDIUM_RISK';
    if (severityCounts.low > 10) return 'LOW_RISK';
    return 'SECURE';
  }

  /**
   * Generate security recommendations
   */
  generateRecommendations() {
    const recommendations = [];
    
    const criticalIssues = this.issues.filter(i => i.severity === 'critical');
    const highIssues = this.issues.filter(i => i.severity === 'high');

    if (criticalIssues.length > 0) {
      recommendations.push({
        priority: 'immediate',
        action: `Address ${criticalIssues.length} critical security issue(s) immediately`,
        category: 'security'
      });
    }

    if (highIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        action: `Review and resolve ${highIssues.length} high-risk security issue(s)`,
        category: 'security'
      });
    }

    // Scanner-specific recommendations
    const secretIssues = this.issues.filter(i => i.scanner === 'secrets');
    if (secretIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        action: 'Move hardcoded secrets to environment variables',
        category: 'secrets'
      });
    }

    const depIssues = this.issues.filter(i => i.scanner === 'dependencies');
    if (depIssues.length > 0) {
      recommendations.push({
        priority: 'medium',
        action: 'Update vulnerable dependencies',
        category: 'dependencies'
      });
    }

    return recommendations;
  }

  /**
   * Print security summary
   */
  printSummary(report) {
    console.log('\n' + '='.repeat(60));
    console.log('🔒 SECURITY SCAN SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`Security Status: ${report.summary.security_status}`);
    console.log(`Total Issues: ${report.summary.total_issues}`);
    console.log(`Suppressions Applied: ${report.suppressions_loaded}`);
    
    console.log('\n🏷️  Issues by Severity:');
    for (const [severity, count] of Object.entries(report.summary.severity_breakdown)) {
      if (count > 0) {
        const emoji = { critical: '🔴', high: '🟠', medium: '🟡', low: '🔵' }[severity];
        console.log(`  ${emoji} ${severity}: ${count}`);
      }
    }

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

    console.log('\n📁 Report saved to:', path.join(this.outputDir, 'latest-security.json'));
    console.log('='.repeat(60));
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    targetPath: args[0] || '.',
    interactive: !process.env.CI
  };

  const scanner = new SecurityScanner(options);
  
  scanner.runScan()
    .then(report => {
      const exitCode = ['CRITICAL', 'HIGH_RISK'].includes(report.summary.security_status) ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('Fatal error during security scan:', error);
      process.exit(1);
    });
}

module.exports = SecurityScanner;