#!/usr/bin/env node

/**
 * Robots.txt Internal Resources Analysis
 * Identifies pages with issues accessing blocked internal resources
 */

const fs = require('fs');
const path = require('path');

class RobotsAnalyzer {
  constructor() {
    this.blockedPaths = [];
    this.issues = [];
    this.affectedFiles = [];
    this.apiCalls = [];
    this.scriptReferences = [];
    this.resourceReferences = [];
  }

  // Parse robots.txt to identify blocked paths
  parseRobotsTxt() {
    try {
      const robotsPath = path.join(__dirname, '../public/robots.txt');
      const robotsContent = fs.readFileSync(robotsPath, 'utf8');
      
      const lines = robotsContent.split('\n');
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('Disallow:')) {
          const blockedPath = trimmed.replace('Disallow:', '').trim();
          if (blockedPath) {
            this.blockedPaths.push(blockedPath);
          }
        }
      });
      
      console.log('🚫 Blocked paths from robots.txt:');
      this.blockedPaths.forEach(path => {
        console.log(`   ${path}`);
      });
      console.log('');
      
    } catch (error) {
      console.error('Error reading robots.txt:', error.message);
    }
  }

  // Recursively scan files for resource references
  scanDirectory(dirPath, extensions = ['.tsx', '.jsx', '.ts', '.js']) {
    try {
      const entries = fs.readdirSync(dirPath);
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          this.scanDirectory(fullPath, extensions);
        } else if (extensions.some(ext => entry.endsWith(ext))) {
          this.analyzeFile(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error scanning ${dirPath}:`, error.message);
    }
  }

  // Analyze individual file for blocked resource references
  analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(process.cwd(), filePath);
      const fileIssues = [];

      // Check for API calls to blocked paths
      this.blockedPaths.forEach(blockedPath => {
        const patterns = [
          // Direct API calls
          new RegExp(`fetch\\s*\\(\\s*['"\`]${blockedPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'),
          new RegExp(`fetch\\s*\\(\\s*['"\`][^'"\`]*${blockedPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'),
          
          // Script/link references
          new RegExp(`src\\s*=\\s*['"\`][^'"\`]*${blockedPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'),
          new RegExp(`href\\s*=\\s*['"\`][^'"\`]*${blockedPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'),
          
          // Import statements
          new RegExp(`import.*from\\s*['"\`][^'"\`]*${blockedPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'),
          
          // Dynamic imports
          new RegExp(`import\\s*\\(\\s*['"\`][^'"\`]*${blockedPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'),
        ];

        patterns.forEach(pattern => {
          const matches = content.match(pattern);
          if (matches) {
            matches.forEach(match => {
              fileIssues.push({
                type: 'blocked_resource',
                blockedPath: blockedPath,
                reference: match.substring(0, 100) + (match.length > 100 ? '...' : ''),
                line: this.findLineNumber(content, match)
              });
            });
          }
        });
      });

      // Specific checks for common problematic patterns
      const apiCallPattern = /fetch\s*\(\s*['"`]\/api\/[^'"`]+['"`]/gi;
      const apiMatches = content.match(apiCallPattern);
      if (apiMatches) {
        apiMatches.forEach(match => {
          fileIssues.push({
            type: 'api_call',
            blockedPath: '/api/',
            reference: match,
            line: this.findLineNumber(content, match)
          });
        });
      }

      // Check for _next references (usually auto-generated, but worth noting)
      const nextPattern = /['"`][^'"`]*\/_next\/[^'"`]+['"`]/gi;
      const nextMatches = content.match(nextPattern);
      if (nextMatches) {
        nextMatches.forEach(match => {
          fileIssues.push({
            type: 'next_reference',
            blockedPath: '/_next/',
            reference: match,
            line: this.findLineNumber(content, match)
          });
        });
      }

      // Check for scripts references
      const scriptsPattern = /['"`][^'"`]*\/scripts\/[^'"`]+['"`]/gi;
      const scriptsMatches = content.match(scriptsPattern);
      if (scriptsMatches) {
        scriptsMatches.forEach(match => {
          fileIssues.push({
            type: 'scripts_reference',
            blockedPath: '/scripts/',
            reference: match,
            line: this.findLineNumber(content, match)
          });
        });
      }

      if (fileIssues.length > 0) {
        this.issues.push({
          file: relativePath,
          issues: fileIssues
        });
      }

    } catch (error) {
      console.error(`Error analyzing ${filePath}:`, error.message);
    }
  }

  // Find line number of a match in content
  findLineNumber(content, match) {
    const index = content.indexOf(match);
    if (index === -1) return 'unknown';
    
    const beforeMatch = content.substring(0, index);
    const lineNumber = beforeMatch.split('\n').length;
    return lineNumber;
  }

  // Generate detailed report
  generateReport() {
    console.log('🔍 ROBOTS.TXT INTERNAL RESOURCES ANALYSIS');
    console.log('=' .repeat(60));
    
    if (this.issues.length === 0) {
      console.log('✅ No issues found with blocked internal resources!');
      return;
    }

    console.log(`\n❌ Found ${this.issues.length} files with potential robots.txt issues:\n`);
    
    // Group issues by type
    const issuesByType = {};
    let totalIssues = 0;

    this.issues.forEach(fileIssue => {
      fileIssue.issues.forEach(issue => {
        if (!issuesByType[issue.type]) {
          issuesByType[issue.type] = [];
        }
        issuesByType[issue.type].push({
          file: fileIssue.file,
          ...issue
        });
        totalIssues++;
      });
    });

    // Report by issue type
    Object.entries(issuesByType).forEach(([type, issues]) => {
      console.log(`\n📋 ${type.toUpperCase().replace(/_/g, ' ')} (${issues.length} issues):`);
      console.log('-'.repeat(50));
      
      issues.forEach(issue => {
        console.log(`  📄 ${issue.file}:${issue.line}`);
        console.log(`     Blocked path: ${issue.blockedPath}`);
        console.log(`     Reference: ${issue.reference}`);
        console.log('');
      });
    });

    // Summary and recommendations
    console.log('\n📊 SUMMARY:');
    console.log('-'.repeat(30));
    console.log(`Total files affected: ${this.issues.length}`);
    console.log(`Total issues: ${totalIssues}`);
    
    console.log('\n💡 RECOMMENDATIONS:');
    console.log('-'.repeat(30));
    
    if (issuesByType.api_call) {
      console.log('• API Calls: These are functional and should work since API routes are server-side');
      console.log('  However, search engines won\'t crawl API endpoints (which is correct)');
    }
    
    if (issuesByType.next_reference) {
      console.log('• _next/ References: These are Next.js internal assets, blocking is correct');
      console.log('  No action needed - this protects internal build assets');
    }
    
    if (issuesByType.scripts_reference) {
      console.log('• Scripts References: Check if these are needed by users vs search engines');
      console.log('  Consider moving user-facing scripts outside /scripts/ directory');
    }
    
    if (issuesByType.blocked_resource) {
      console.log('• Blocked Resources: Review if these resources should be accessible');
      console.log('  Update robots.txt if legitimate resources are being blocked');
    }

    console.log('\n🔧 NEXT STEPS:');
    console.log('-'.repeat(30));
    console.log('1. Review each flagged file to determine if the reference is intentional');
    console.log('2. For legitimate user-facing resources, consider updating robots.txt');
    console.log('3. For internal/build assets, current blocking is appropriate');
    console.log('4. Test that functionality still works despite robots.txt restrictions');
    console.log('');
  }

  // Run the analysis
  run() {
    console.log('🤖 Starting robots.txt internal resources analysis...\n');
    
    this.parseRobotsTxt();
    
    // Scan pages and components directories
    console.log('📁 Scanning pages directory...');
    this.scanDirectory(path.join(__dirname, '../pages'));
    
    console.log('📁 Scanning components directory...');
    this.scanDirectory(path.join(__dirname, '../components'));
    
    console.log('📁 Analysis complete.\n');
    
    this.generateReport();
  }
}

// Run the analysis
if (require.main === module) {
  const analyzer = new RobotsAnalyzer();
  analyzer.run();
}

module.exports = RobotsAnalyzer;