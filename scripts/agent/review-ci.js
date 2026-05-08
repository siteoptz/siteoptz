#!/usr/bin/env node

/**
 * Agent Stack CI Review Runner
 * Non-interactive version for CI/CD pipelines
 */

const ReviewOrchestrator = require('./review.js');
const fs = require('fs');
const path = require('path');

class CIReviewRunner {
  constructor(options = {}) {
    this.orchestrator = new ReviewOrchestrator({
      interactive: false,
      targetPath: options.targetPath || '.',
      outputDir: options.outputDir || 'docs/agent-stack/generated/reviews'
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
      
      // Parse current enforcement phase from policy
      const phaseMatch = policyContent.match(/Current phase:\s*(\d+)/i);
      const currentPhase = phaseMatch ? parseInt(phaseMatch[1]) : 1;
      
      return {
        phase: currentPhase,
        blocking: currentPhase >= 2, // Phase 2+ starts blocking for correctness
        warningOnly: currentPhase === 1
      };
    } catch (error) {
      console.warn('Could not load enforcement policy, using defaults');
      return { phase: 1, blocking: false, warningOnly: true };
    }
  }

  /**
   * Run CI review process
   */
  async runCIReview() {
    console.log('🤖 Starting CI code review process...');
    console.log(`Enforcement Phase: ${this.enforcementPolicy.phase}`);
    console.log(`Mode: ${this.enforcementPolicy.warningOnly ? 'Warning Only' : 'Blocking'}\n`);

    try {
      // Run the review
      const report = await this.orchestrator.runAllLanes();
      
      // Generate CI-specific outputs
      const ciReport = this.generateCIReport(report);
      this.writeCIOutputs(ciReport);
      this.printCISummary(ciReport);
      
      // Determine exit code based on enforcement policy
      const exitCode = this.determineExitCode(ciReport);
      
      if (exitCode !== 0) {
        console.error('\n❌ CI review failed');
      } else {
        console.log('\n✅ CI review passed');
      }
      
      return { report: ciReport, exitCode };
      
    } catch (error) {
      console.error('💥 CI review failed with error:', error);
      return { error, exitCode: 1 };
    }
  }

  /**
   * Generate CI-specific report
   */
  generateCIReport(report) {
    const blocking_issues = this.getBlockingIssues(report.issues);
    const warning_issues = report.issues.filter(issue => !this.isBlockingIssue(issue));

    return {
      ...report,
      ci_metadata: {
        enforcement_phase: this.enforcementPolicy.phase,
        blocking_mode: !this.enforcementPolicy.warningOnly,
        run_timestamp: new Date().toISOString(),
        git_commit: process.env.GITHUB_SHA || 'unknown',
        pr_number: process.env.GITHUB_PR_NUMBER || null
      },
      blocking_issues,
      warning_issues,
      ci_summary: {
        blocking_count: blocking_issues.length,
        warning_count: warning_issues.length,
        should_block: this.shouldBlockBuild(blocking_issues),
        enforcement_decision: this.getEnforcementDecision(blocking_issues)
      }
    };
  }

  /**
   * Get issues that should block the build
   */
  getBlockingIssues(allIssues) {
    if (this.enforcementPolicy.warningOnly) {
      return []; // Phase 1: No blocking
    }

    return allIssues.filter(issue => this.isBlockingIssue(issue));
  }

  /**
   * Check if an issue should block the build
   */
  isBlockingIssue(issue) {
    // Phase 1: Warning only
    if (this.enforcementPolicy.phase === 1) {
      return false;
    }

    // Phase 2+: Block critical correctness issues
    if (this.enforcementPolicy.phase >= 2) {
      if (issue.lane === 'correctness' && ['critical', 'high'].includes(issue.severity)) {
        return true;
      }
    }

    // Phase 3+: Block architectural breaking changes
    if (this.enforcementPolicy.phase >= 3) {
      if (issue.lane === 'architecture' && issue.severity === 'critical') {
        return true;
      }
    }

    return false;
  }

  /**
   * Determine if build should be blocked
   */
  shouldBlockBuild(blockingIssues) {
    return !this.enforcementPolicy.warningOnly && blockingIssues.length > 0;
  }

  /**
   * Get enforcement decision explanation
   */
  getEnforcementDecision(blockingIssues) {
    if (this.enforcementPolicy.warningOnly) {
      return 'WARN_ONLY - Phase 1 enforcement policy';
    }

    if (blockingIssues.length === 0) {
      return 'PASS - No blocking issues found';
    }

    return `BLOCK - ${blockingIssues.length} blocking issue(s) found`;
  }

  /**
   * Determine CI exit code
   */
  determineExitCode(ciReport) {
    // Always pass in warning-only mode
    if (this.enforcementPolicy.warningOnly) {
      return 0;
    }

    // Block if we have blocking issues
    if (ciReport.ci_summary.should_block) {
      return 1;
    }

    // Check for lane failures
    const failedLanes = Object.entries(ciReport.lanes)
      .filter(([_, result]) => !result.success)
      .length;

    if (failedLanes > 0) {
      return 1;
    }

    return 0;
  }

  /**
   * Write CI-specific output files
   */
  writeCIOutputs(ciReport) {
    const outputDir = this.orchestrator.outputDir;

    // Write CI summary for GitHub Actions
    const ciSummary = {
      conclusion: ciReport.ci_summary.should_block ? 'failure' : 'success',
      summary: ciReport.summary,
      blocking_issues: ciReport.blocking_issues.length,
      warning_issues: ciReport.warning_issues.length,
      enforcement_phase: ciReport.ci_metadata.enforcement_phase
    };

    fs.writeFileSync(
      path.join(outputDir, 'ci-summary.json'),
      JSON.stringify(ciSummary, null, 2)
    );

    // Write markdown summary for PR comments
    const markdownSummary = this.generateMarkdownSummary(ciReport);
    fs.writeFileSync(
      path.join(outputDir, 'ci-summary.md'),
      markdownSummary
    );

    // Write full CI report
    fs.writeFileSync(
      path.join(outputDir, 'ci-report.json'),
      JSON.stringify(ciReport, null, 2)
    );
  }

  /**
   * Generate markdown summary for PR comments
   */
  generateMarkdownSummary(ciReport) {
    const summary = ciReport.summary;
    const blocking = ciReport.blocking_issues.length;
    const warnings = ciReport.warning_issues.length;

    let markdown = `## 🔍 Code Review Summary\n\n`;
    
    // Status badge
    const status = ciReport.ci_summary.should_block ? '❌ **BLOCKED**' : '✅ **PASSED**';
    markdown += `**Status:** ${status}\n`;
    markdown += `**Enforcement Phase:** ${ciReport.ci_metadata.enforcement_phase}\n\n`;

    // Issue counts
    markdown += `### 📊 Issue Summary\n\n`;
    markdown += `| Severity | Count | Type |\n`;
    markdown += `|----------|-------|------|\n`;
    
    if (blocking > 0) {
      markdown += `| 🔴 Blocking | ${blocking} | Build-blocking issues |\n`;
    }
    if (warnings > 0) {
      markdown += `| ⚠️ Warning | ${warnings} | Advisory issues |\n`;
    }
    if (blocking === 0 && warnings === 0) {
      markdown += `| ✅ Clean | 0 | No issues found |\n`;
    }

    // Lane results
    markdown += `\n### 🛤️ Lane Results\n\n`;
    for (const [lane, result] of Object.entries(ciReport.lanes)) {
      const emoji = result.success ? '✅' : '❌';
      markdown += `- ${emoji} **${lane}**: ${result.issues_count} issue(s)\n`;
    }

    // Blocking issues detail
    if (blocking > 0) {
      markdown += `\n### 🚨 Blocking Issues\n\n`;
      for (const issue of ciReport.blocking_issues) {
        markdown += `- **${issue.lane}** (${issue.severity}): ${issue.message}\n`;
        if (issue.file) {
          markdown += `  - File: \`${issue.file}\`\n`;
        }
        if (issue.line) {
          markdown += `  - Line: ${issue.line}\n`;
        }
      }
    }

    // Recommendations
    if (ciReport.recommendations.length > 0) {
      markdown += `\n### 💡 Recommendations\n\n`;
      for (const rec of ciReport.recommendations) {
        const emoji = { immediate: '🔴', high: '🟠', medium: '🟡', low: '🔵' }[rec.priority];
        markdown += `- ${emoji} ${rec.action}\n`;
      }
    }

    markdown += `\n---\n`;
    markdown += `*Generated by Agent Stack v1.0.0 at ${ciReport.ci_metadata.run_timestamp}*\n`;

    return markdown;
  }

  /**
   * Print CI-specific summary
   */
  printCISummary(ciReport) {
    console.log('\n' + '='.repeat(60));
    console.log('🤖 CI REVIEW SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`Decision: ${ciReport.ci_summary.enforcement_decision}`);
    console.log(`Blocking Issues: ${ciReport.ci_summary.blocking_count}`);
    console.log(`Warning Issues: ${ciReport.ci_summary.warning_count}`);
    console.log(`Enforcement Phase: ${ciReport.ci_metadata.enforcement_phase}`);
    
    if (ciReport.blocking_issues.length > 0) {
      console.log('\n🚨 BLOCKING ISSUES:');
      for (const issue of ciReport.blocking_issues.slice(0, 5)) { // Show first 5
        console.log(`  ❌ [${issue.lane}] ${issue.severity}: ${issue.message}`);
      }
      if (ciReport.blocking_issues.length > 5) {
        console.log(`  ... and ${ciReport.blocking_issues.length - 5} more`);
      }
    }

    console.log(`\n📁 CI outputs saved to: ${this.orchestrator.outputDir}/`);
    console.log('='.repeat(60));
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    targetPath: args[0] || '.'
  };

  const runner = new CIReviewRunner(options);
  
  runner.runCIReview()
    .then(result => {
      process.exit(result.exitCode);
    })
    .catch(error => {
      console.error('Fatal error in CI review:', error);
      process.exit(1);
    });
}

module.exports = CIReviewRunner;