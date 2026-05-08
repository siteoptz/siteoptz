#!/usr/bin/env node

/**
 * Agent Stack CI Security Scanner
 * Non-interactive security scanning for CI/CD pipelines
 */

const SecurityScanner = require('./security.js');
const fs = require('fs');
const path = require('path');

class CISecurityScanner {
  constructor(options = {}) {
    this.scanner = new SecurityScanner({
      interactive: false,
      targetPath: options.targetPath || '.',
      outputDir: options.outputDir || 'docs/agent-stack/generated/security'
    });
    this.enforcementPolicy = this.loadEnforcementPolicy();
  }

  /**
   * Load enforcement policy
   */
  loadEnforcementPolicy() {
    try {
      const policyPath = 'docs/agent-stack/ENFORCEMENT_POLICY.md';
      const policyContent = fs.readFileSync(policyPath, 'utf8');
      
      // Parse current enforcement phase
      const phaseMatch = policyContent.match(/Current phase:\s*(\d+)/i);
      const currentPhase = phaseMatch ? parseInt(phaseMatch[1]) : 1;
      
      return {
        phase: currentPhase,
        blocking: currentPhase >= 1, // Security blocking starts in Phase 1
        warningOnly: false // Security is special - can block even in Phase 1 for critical issues
      };
    } catch (error) {
      console.warn('Could not load enforcement policy, using defaults');
      return { phase: 1, blocking: true, warningOnly: false };
    }
  }

  /**
   * Run CI security scan
   */
  async runCIScan() {
    console.log('🛡️  Starting CI security scan...');
    console.log(`Enforcement Phase: ${this.enforcementPolicy.phase}`);
    console.log(`Security Blocking: ${this.enforcementPolicy.blocking ? 'Enabled' : 'Disabled'}\n`);

    try {
      // Run the security scan
      const report = await this.scanner.runScan();
      
      // Generate CI-specific report
      const ciReport = this.generateCISecurityReport(report);
      this.writeCIOutputs(ciReport);
      this.printCISummary(ciReport);
      
      // Determine exit code
      const exitCode = this.determineExitCode(ciReport);
      
      if (exitCode !== 0) {
        console.error('\n❌ CI security scan failed');
      } else {
        console.log('\n✅ CI security scan passed');
      }
      
      return { report: ciReport, exitCode };
      
    } catch (error) {
      console.error('💥 CI security scan failed with error:', error);
      return { error, exitCode: 1 };
    }
  }

  /**
   * Generate CI-specific security report
   */
  generateCISecurityReport(report) {
    const blocking_issues = this.getBlockingSecurityIssues(report.issues);
    const warning_issues = report.issues.filter(issue => !this.isBlockingSecurityIssue(issue));

    return {
      ...report,
      ci_security_metadata: {
        enforcement_phase: this.enforcementPolicy.phase,
        blocking_enabled: this.enforcementPolicy.blocking,
        scan_timestamp: new Date().toISOString(),
        git_commit: process.env.GITHUB_SHA || 'unknown',
        pr_number: process.env.GITHUB_PR_NUMBER || null
      },
      blocking_issues,
      warning_issues,
      security_decision: {
        blocking_count: blocking_issues.length,
        warning_count: warning_issues.length,
        should_block: this.shouldBlockBuild(blocking_issues),
        decision_reason: this.getDecisionReason(blocking_issues)
      }
    };
  }

  /**
   * Get security issues that should block the build
   */
  getBlockingSecurityIssues(allIssues) {
    return allIssues.filter(issue => this.isBlockingSecurityIssue(issue));
  }

  /**
   * Check if a security issue should block the build
   */
  isBlockingSecurityIssue(issue) {
    // Critical security issues always block (even in Phase 1)
    if (issue.severity === 'critical') {
      return true;
    }

    // High severity blocks for secrets and sensitive data
    if (issue.severity === 'high') {
      if (issue.scanner === 'secrets' || issue.scanner === 'files') {
        return true;
      }
    }

    return false;
  }

  /**
   * Determine if build should be blocked
   */
  shouldBlockBuild(blockingIssues) {
    if (!this.enforcementPolicy.blocking) {
      return false;
    }

    return blockingIssues.length > 0;
  }

  /**
   * Get decision reason explanation
   */
  getDecisionReason(blockingIssues) {
    if (!this.enforcementPolicy.blocking) {
      return 'WARN_ONLY - Security blocking disabled';
    }

    if (blockingIssues.length === 0) {
      return 'PASS - No blocking security issues found';
    }

    const critical = blockingIssues.filter(i => i.severity === 'critical').length;
    const high = blockingIssues.filter(i => i.severity === 'high').length;

    if (critical > 0) {
      return `BLOCK - ${critical} critical security issue(s) found`;
    }

    if (high > 0) {
      return `BLOCK - ${high} high-risk security issue(s) found`;
    }

    return `BLOCK - ${blockingIssues.length} blocking issue(s) found`;
  }

  /**
   * Determine CI exit code
   */
  determineExitCode(ciReport) {
    // Check if we should block the build
    if (ciReport.security_decision.should_block) {
      return 1;
    }

    // Check for scan failures
    if (ciReport.summary.security_status === 'SCAN_ERROR') {
      return 1;
    }

    return 0;
  }

  /**
   * Write CI-specific output files
   */
  writeCIOutputs(ciReport) {
    const outputDir = this.scanner.outputDir;

    // Write CI summary for GitHub Actions
    const ciSummary = {
      conclusion: ciReport.security_decision.should_block ? 'failure' : 'success',
      security_status: ciReport.summary.security_status,
      blocking_issues: ciReport.security_decision.blocking_count,
      warning_issues: ciReport.security_decision.warning_count,
      enforcement_phase: ciReport.ci_security_metadata.enforcement_phase,
      scan_timestamp: ciReport.ci_security_metadata.scan_timestamp
    };

    fs.writeFileSync(
      path.join(outputDir, 'ci-security-summary.json'),
      JSON.stringify(ciSummary, null, 2)
    );

    // Write SARIF format for GitHub Security tab
    const sarif = this.generateSARIF(ciReport);
    fs.writeFileSync(
      path.join(outputDir, 'security-results.sarif'),
      JSON.stringify(sarif, null, 2)
    );

    // Write markdown summary for PR comments
    const markdownSummary = this.generateSecurityMarkdown(ciReport);
    fs.writeFileSync(
      path.join(outputDir, 'ci-security-summary.md'),
      markdownSummary
    );

    // Write full CI security report
    fs.writeFileSync(
      path.join(outputDir, 'ci-security-report.json'),
      JSON.stringify(ciReport, null, 2)
    );
  }

  /**
   * Generate SARIF format for GitHub Security tab
   */
  generateSARIF(ciReport) {
    const sarif = {
      version: '2.1.0',
      $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
      runs: [{
        tool: {
          driver: {
            name: 'Agent Stack Security Scanner',
            version: '1.0.0',
            informationUri: 'https://github.com/siteoptz/agent-stack'
          }
        },
        results: []
      }]
    };

    for (const issue of ciReport.issues) {
      const result = {
        ruleId: `agent-stack-${issue.scanner}`,
        level: this.mapSeverityToSARIF(issue.severity),
        message: { text: issue.message },
        locations: []
      };

      if (issue.file) {
        result.locations.push({
          physicalLocation: {
            artifactLocation: { uri: issue.file },
            region: issue.line ? { startLine: issue.line } : undefined
          }
        });
      }

      sarif.runs[0].results.push(result);
    }

    return sarif;
  }

  /**
   * Map severity to SARIF level
   */
  mapSeverityToSARIF(severity) {
    const mapping = {
      critical: 'error',
      high: 'error',
      medium: 'warning',
      low: 'note'
    };
    return mapping[severity] || 'warning';
  }

  /**
   * Generate markdown summary for PR comments
   */
  generateSecurityMarkdown(ciReport) {
    const blocking = ciReport.security_decision.blocking_count;
    const warnings = ciReport.security_decision.warning_count;

    let markdown = `## 🛡️ Security Scan Summary\n\n`;
    
    // Status badge
    const status = ciReport.security_decision.should_block ? '❌ **BLOCKED**' : '✅ **PASSED**';
    markdown += `**Status:** ${status}\n`;
    markdown += `**Security Status:** ${ciReport.summary.security_status}\n`;
    markdown += `**Enforcement Phase:** ${ciReport.ci_security_metadata.enforcement_phase}\n\n`;

    // Issue counts
    markdown += `### 🔍 Security Issues\n\n`;
    markdown += `| Severity | Count | Status |\n`;
    markdown += `|----------|-------|--------|\n`;
    
    if (blocking > 0) {
      markdown += `| 🔴 Blocking | ${blocking} | Build-blocking |\n`;
    }
    if (warnings > 0) {
      markdown += `| ⚠️ Warning | ${warnings} | Advisory |\n`;
    }
    if (blocking === 0 && warnings === 0) {
      markdown += `| ✅ Clean | 0 | No issues found |\n`;
    }

    // Scanner results
    markdown += `\n### 🔍 Scanner Results\n\n`;
    const scannerStats = this.getScannerStats(ciReport.issues);
    
    for (const [scanner, count] of Object.entries(scannerStats)) {
      const emoji = this.getScannerEmoji(scanner);
      markdown += `- ${emoji} **${scanner}**: ${count} issue(s)\n`;
    }

    // Blocking issues detail
    if (blocking > 0) {
      markdown += `\n### 🚨 Blocking Security Issues\n\n`;
      for (const issue of ciReport.blocking_issues.slice(0, 10)) { // Show first 10
        markdown += `- **${issue.severity.toUpperCase()}**: ${issue.message}\n`;
        if (issue.file) {
          markdown += `  - 📁 \`${issue.file}\`${issue.line ? `:${issue.line}` : ''}\n`;
        }
        if (issue.scanner) {
          markdown += `  - 🔍 Scanner: ${issue.scanner}\n`;
        }
      }
      
      if (ciReport.blocking_issues.length > 10) {
        markdown += `\n*... and ${ciReport.blocking_issues.length - 10} more blocking issues*\n`;
      }
    }

    // Recommendations
    if (ciReport.recommendations && ciReport.recommendations.length > 0) {
      markdown += `\n### 💡 Security Recommendations\n\n`;
      for (const rec of ciReport.recommendations) {
        const emoji = { immediate: '🔴', high: '🟠', medium: '🟡', low: '🔵' }[rec.priority];
        markdown += `- ${emoji} ${rec.action}\n`;
      }
    }

    // Suppressions info
    if (ciReport.suppressions_loaded > 0) {
      markdown += `\n### 📋 Suppressions\n\n`;
      markdown += `${ciReport.suppressions_loaded} active security suppressions applied.\n`;
    }

    markdown += `\n---\n`;
    markdown += `*Security scan completed at ${ciReport.ci_security_metadata.scan_timestamp}*\n`;
    markdown += `*Agent Stack Security Scanner v1.0.0*\n`;

    return markdown;
  }

  /**
   * Get scanner statistics
   */
  getScannerStats(issues) {
    const stats = {};
    for (const issue of issues) {
      const scanner = issue.scanner || 'unknown';
      stats[scanner] = (stats[scanner] || 0) + 1;
    }
    return stats;
  }

  /**
   * Get emoji for scanner type
   */
  getScannerEmoji(scanner) {
    const emojis = {
      secrets: '🔑',
      dependencies: '📦',
      files: '📁',
      patterns: '🔍',
      unknown: '❓'
    };
    return emojis[scanner] || '🔍';
  }

  /**
   * Print CI security summary
   */
  printCISummary(ciReport) {
    console.log('\n' + '='.repeat(60));
    console.log('🛡️ CI SECURITY SCAN SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`Decision: ${ciReport.security_decision.decision_reason}`);
    console.log(`Security Status: ${ciReport.summary.security_status}`);
    console.log(`Blocking Issues: ${ciReport.security_decision.blocking_count}`);
    console.log(`Warning Issues: ${ciReport.security_decision.warning_count}`);
    console.log(`Enforcement Phase: ${ciReport.ci_security_metadata.enforcement_phase}`);
    
    if (ciReport.blocking_issues.length > 0) {
      console.log('\n🚨 BLOCKING SECURITY ISSUES:');
      for (const issue of ciReport.blocking_issues.slice(0, 5)) {
        console.log(`  🔴 [${issue.scanner}] ${issue.severity}: ${issue.message}`);
        if (issue.file) {
          console.log(`     📁 ${issue.file}${issue.line ? `:${issue.line}` : ''}`);
        }
      }
      if (ciReport.blocking_issues.length > 5) {
        console.log(`  ... and ${ciReport.blocking_issues.length - 5} more`);
      }
    }

    console.log(`\n📁 Security outputs saved to: ${this.scanner.outputDir}/`);
    console.log('='.repeat(60));
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    targetPath: args[0] || '.'
  };

  const scanner = new CISecurityScanner(options);
  
  scanner.runCIScan()
    .then(result => {
      process.exit(result.exitCode);
    })
    .catch(error => {
      console.error('Fatal error in CI security scan:', error);
      process.exit(1);
    });
}

module.exports = CISecurityScanner;