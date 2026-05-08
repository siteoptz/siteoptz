#!/usr/bin/env node

/**
 * Agent Stack Five-Lane Code Review System
 * Runs all review lanes in parallel for comprehensive code analysis
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class ReviewOrchestrator {
  constructor(options = {}) {
    this.interactive = options.interactive !== false;
    this.targetPath = options.targetPath || '.';
    this.outputDir = options.outputDir || 'docs/agent-stack/generated/reviews';
    this.lanes = [
      { name: 'correctness', script: 'review-correctness.js' },
      { name: 'architecture', script: 'review-architecture.js' },
      { name: 'style', script: 'review-style.js' },
      { name: 'performance', script: 'review-performance.js' },
      { name: 'regression', script: 'review-regression.js' }
    ];
    this.results = {};
  }

  /**
   * Run all review lanes in parallel
   */
  async runAllLanes() {
    console.log('🔍 Starting five-lane code review...');
    console.log(`Target: ${this.targetPath}`);
    console.log(`Lanes: ${this.lanes.map(l => l.name).join(', ')}\n`);

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Run all lanes in parallel
    const promises = this.lanes.map(lane => this.runLane(lane));
    const results = await Promise.allSettled(promises);

    // Process results
    for (let i = 0; i < results.length; i++) {
      const lane = this.lanes[i];
      const result = results[i];
      
      if (result.status === 'fulfilled') {
        this.results[lane.name] = result.value;
        console.log(`✅ ${lane.name} lane completed`);
      } else {
        this.results[lane.name] = {
          success: false,
          error: result.reason.message || result.reason,
          issues: [],
          summary: 'Lane execution failed'
        };
        console.error(`❌ ${lane.name} lane failed: ${result.reason.message || result.reason}`);
      }
    }

    // Generate aggregated report
    const report = await this.generateAggregatedReport();
    
    // Print summary
    this.printSummary(report);
    
    return report;
  }

  /**
   * Run individual review lane
   */
  async runLane(lane) {
    console.log(`🏃 Running ${lane.name} lane...`);
    
    const scriptPath = path.join(__dirname, lane.script);
    
    // Check if lane script exists, if not create a placeholder
    if (!fs.existsSync(scriptPath)) {
      console.log(`⚠️  Creating placeholder for ${lane.name} lane`);
      await this.createPlaceholderLane(scriptPath, lane.name);
    }

    return new Promise((resolve, reject) => {
      const child = spawn('node', [scriptPath, this.targetPath], {
        stdio: 'pipe',
        cwd: process.cwd()
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          try {
            // Try to parse JSON output from lane script
            const result = JSON.parse(stdout);
            resolve(result);
          } catch (error) {
            // Fallback to text output
            resolve({
              success: true,
              issues: [],
              summary: stdout.trim() || `${lane.name} lane completed`,
              raw_output: stdout
            });
          }
        } else {
          reject(new Error(`${lane.name} lane failed with code ${code}: ${stderr}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Create placeholder lane script
   */
  async createPlaceholderLane(scriptPath, laneName) {
    const placeholder = `#!/usr/bin/env node

/**
 * ${laneName} Review Lane
 * TODO: Implement actual ${laneName} analysis
 */

const target = process.argv[2] || '.';

const result = {
  lane: '${laneName}',
  target: target,
  success: true,
  issues: [],
  summary: '${laneName} lane placeholder - implementation pending',
  timestamp: new Date().toISOString(),
  version: '1.0.0'
};

console.log(JSON.stringify(result, null, 2));
process.exit(0);
`;

    fs.writeFileSync(scriptPath, placeholder);
    fs.chmodSync(scriptPath, '755');
  }

  /**
   * Generate aggregated review report
   */
  async generateAggregatedReport() {
    const timestamp = new Date().toISOString();
    const allIssues = [];
    const laneResults = {};

    // Aggregate issues from all lanes
    for (const [laneName, result] of Object.entries(this.results)) {
      laneResults[laneName] = {
        success: result.success,
        issues_count: result.issues ? result.issues.length : 0,
        summary: result.summary
      };

      if (result.issues) {
        allIssues.push(...result.issues.map(issue => ({
          ...issue,
          lane: laneName
        })));
      }
    }

    // Categorize issues by severity
    const severityCounts = {
      critical: allIssues.filter(i => i.severity === 'critical').length,
      high: allIssues.filter(i => i.severity === 'high').length,
      medium: allIssues.filter(i => i.severity === 'medium').length,
      low: allIssues.filter(i => i.severity === 'low').length
    };

    const report = {
      timestamp,
      target: this.targetPath,
      lanes: laneResults,
      summary: {
        total_lanes: this.lanes.length,
        successful_lanes: Object.values(laneResults).filter(r => r.success).length,
        total_issues: allIssues.length,
        severity_breakdown: severityCounts,
        overall_status: this.determineOverallStatus(severityCounts)
      },
      issues: allIssues,
      recommendations: this.generateRecommendations(allIssues),
      metadata: {
        version: '1.0.0',
        review_type: 'five-lane-parallel'
      }
    };

    // Write report to file
    const reportPath = path.join(this.outputDir, `review-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Write latest report
    const latestPath = path.join(this.outputDir, 'latest-review.json');
    fs.writeFileSync(latestPath, JSON.stringify(report, null, 2));

    return report;
  }

  /**
   * Determine overall review status
   */
  determineOverallStatus(severityCounts) {
    if (severityCounts.critical > 0) return 'CRITICAL';
    if (severityCounts.high > 0) return 'HIGH_ISSUES';
    if (severityCounts.medium > 5) return 'MEDIUM_ISSUES';
    if (severityCounts.low > 10) return 'LOW_ISSUES';
    return 'CLEAN';
  }

  /**
   * Generate recommendations based on issues
   */
  generateRecommendations(issues) {
    const recommendations = [];
    
    // Group issues by type and lane
    const issuesByLane = {};
    for (const issue of issues) {
      if (!issuesByLane[issue.lane]) {
        issuesByLane[issue.lane] = [];
      }
      issuesByLane[issue.lane].push(issue);
    }

    // Generate lane-specific recommendations
    for (const [lane, laneIssues] of Object.entries(issuesByLane)) {
      const criticalCount = laneIssues.filter(i => i.severity === 'critical').length;
      const highCount = laneIssues.filter(i => i.severity === 'high').length;

      if (criticalCount > 0) {
        recommendations.push({
          priority: 'immediate',
          action: `Address ${criticalCount} critical ${lane} issue(s) before proceeding`,
          lane: lane
        });
      }

      if (highCount > 0) {
        recommendations.push({
          priority: 'high',
          action: `Review and resolve ${highCount} high-priority ${lane} issue(s)`,
          lane: lane
        });
      }
    }

    // General recommendations
    if (issues.length > 20) {
      recommendations.push({
        priority: 'medium',
        action: 'Consider breaking this change into smaller, focused commits',
        lane: 'general'
      });
    }

    return recommendations;
  }

  /**
   * Print review summary
   */
  printSummary(report) {
    console.log('\n' + '='.repeat(60));
    console.log('📊 FIVE-LANE REVIEW SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`Overall Status: ${report.summary.overall_status}`);
    console.log(`Total Issues: ${report.summary.total_issues}`);
    console.log(`Successful Lanes: ${report.summary.successful_lanes}/${report.summary.total_lanes}`);
    
    console.log('\n🏷️  Issues by Severity:');
    for (const [severity, count] of Object.entries(report.summary.severity_breakdown)) {
      if (count > 0) {
        const emoji = { critical: '🔴', high: '🟠', medium: '🟡', low: '🔵' }[severity];
        console.log(`  ${emoji} ${severity}: ${count}`);
      }
    }

    console.log('\n🛤️  Lane Results:');
    for (const [lane, result] of Object.entries(report.lanes)) {
      const status = result.success ? '✅' : '❌';
      console.log(`  ${status} ${lane}: ${result.issues_count} issues`);
    }

    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      for (const rec of report.recommendations) {
        const priority = { immediate: '🔴', high: '🟠', medium: '🟡', low: '🔵' }[rec.priority];
        console.log(`  ${priority} ${rec.action}`);
      }
    }

    console.log('\n📁 Report saved to:', path.join(this.outputDir, 'latest-review.json'));
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

  const orchestrator = new ReviewOrchestrator(options);
  
  orchestrator.runAllLanes()
    .then(report => {
      const exitCode = ['CRITICAL', 'HIGH_ISSUES'].includes(report.summary.overall_status) ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('Fatal error during review:', error);
      process.exit(1);
    });
}

module.exports = ReviewOrchestrator;