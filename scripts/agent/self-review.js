#!/usr/bin/env node

/**
 * Agent Stack Self-Review Tool
 * Helps create and validate self-review documents
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class SelfReviewTool {
  constructor(options = {}) {
    this.interactive = options.interactive !== false;
    this.templatePath = options.templatePath || 'docs/agent-stack/templates/self-review.md';
    this.outputDir = options.outputDir || 'docs/agent-stack/reviews';
    this.reviewName = options.reviewName;
  }

  /**
   * Create new self-review document
   */
  async createSelfReview() {
    console.log('📝 Agent Stack Self-Review Tool');
    console.log('=' .repeat(40));
    
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    if (this.interactive && !this.reviewName) {
      this.reviewName = await this.promptForReviewName();
    }

    if (!this.reviewName) {
      console.error('❌ Review name is required');
      process.exit(1);
    }

    const template = this.loadTemplate();
    const reviewContent = await this.populateTemplate(template);
    const reviewPath = await this.saveReview(reviewContent);
    
    console.log(`\n✅ Self-review created successfully!`);
    console.log(`📁 Location: ${reviewPath}`);
    console.log(`\n💡 Next steps:`);
    console.log(`1. Complete the self-review checklist`);
    console.log(`2. Run validation commands`);
    console.log(`3. Document testing evidence`);
    console.log(`4. Submit for team review`);
    
    return { reviewPath, reviewName: this.reviewName };
  }

  /**
   * Load self-review template
   */
  loadTemplate() {
    try {
      if (!fs.existsSync(this.templatePath)) {
        console.warn(`⚠️  Template not found at ${this.templatePath}, using default`);
        return this.getDefaultTemplate();
      }
      
      return fs.readFileSync(this.templatePath, 'utf8');
    } catch (error) {
      console.warn(`⚠️  Error loading template: ${error.message}, using default`);
      return this.getDefaultTemplate();
    }
  }

  /**
   * Get default self-review template
   */
  getDefaultTemplate() {
    return `# Self-Review: [REVIEW_NAME]

**Date**: [DATE]
**Author**: [AUTHOR]
**Related Plan**: [PLAN_LINK]

## Implementation Summary

**What was built:**
[Brief description of what was actually implemented]

**Key files changed:**
- \`file1.tsx\` - [Brief description of changes]
- \`file2.js\` - [Brief description of changes]

**Deviation from plan:**
[Any changes from the original plan and why]

## Quality Checklist

### Functional Testing
- [ ] Core functionality works as expected
- [ ] Edge cases handled appropriately  
- [ ] Error scenarios tested
- [ ] User flows validated end-to-end

### Code Quality
- [ ] TypeScript strict mode compliance
- [ ] ESLint rules passing
- [ ] Prettier formatting applied
- [ ] No console.log or debug code left
- [ ] Proper error handling implemented

### Performance
- [ ] Bundle size impact assessed
- [ ] Large imports avoided or lazy-loaded
- [ ] Images optimized
- [ ] Caching strategies considered

### Security
- [ ] Input validation implemented
- [ ] No hardcoded secrets or tokens
- [ ] Proper authentication/authorization
- [ ] XSS prevention measures

### Accessibility
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified
- [ ] Color contrast meets WCAG guidelines
- [ ] Focus management implemented

## SiteOptz-Specific Validation

### Data Compliance
- [ ] aiToolsData.json schema followed (if modified)
- [ ] URL formats correct (\`/compare/tool1/vs/tool2\`)
- [ ] Tool slugs consistent and valid
- [ ] Required fields populated

### Design System
- [ ] Dark theme styling applied
- [ ] Correct gradient backgrounds used
- [ ] Component styling consistent
- [ ] Mobile responsiveness verified

### SEO and Rich Results
- [ ] Meta tags properly implemented
- [ ] Structured data schema valid
- [ ] Canonical URLs correct
- [ ] OpenGraph tags present

### Required Validations Passed
- [ ] \`npm run build\` succeeds
- [ ] \`npm run type-check\` passes
- [ ] \`npm run lint\` passes
- [ ] \`npm run validate-urls\` passes
- [ ] \`npm run validate-images\` passes
- [ ] \`npm run validate-schema\` passes

## Testing Evidence

### Manual Testing Performed
**Test Case 1**: [Description]
- **Steps**: [1, 2, 3...]
- **Expected**: [Expected result]
- **Actual**: [Actual result]
- **Status**: ✅ Pass / ❌ Fail

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Risk Assessment

### Identified Risks
**Risk 1**: [Description]
- **Likelihood**: High/Medium/Low
- **Impact**: High/Medium/Low
- **Mitigation**: [How it's addressed]

## Deployment Readiness

### Pre-deployment Checklist
- [ ] All validation commands pass
- [ ] Environment variables configured (if needed)
- [ ] Monitoring/logging configured
- [ ] Rollback plan prepared

## Approval

**Self-Review Status**: ✅ Complete / 🔄 In Progress / ❌ Blocked
**Ready for Team Review**: Yes / No
**Additional Reviews Needed**: [Security/Performance/Design/etc.]

---

**Review Completion Date**: [DATE]
**Deployment Date**: [PLANNED_DATE]
`;
  }

  /**
   * Populate template with basic information
   */
  async populateTemplate(template) {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const author = process.env.USER || process.env.USERNAME || 'Unknown';

    let content = template
      .replace(/\[REVIEW_NAME\]/g, this.reviewName)
      .replace(/\[DATE\]/g, dateStr)
      .replace(/\[AUTHOR\]/g, author)
      .replace(/\[PLANNED_DATE\]/g, dateStr);

    if (this.interactive) {
      content = await this.interactivePopulation(content);
    }

    return content;
  }

  /**
   * Interactive template population
   */
  async interactivePopulation(content) {
    console.log('\n📝 Let\'s fill in some basic information...\n');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    try {
      // What was built
      const implementation = await this.question(rl, '🔨 What was implemented? ');
      if (implementation.trim()) {
        content = content.replace('[Brief description of what was actually implemented]', implementation);
      }

      // Plan deviation
      const deviation = await this.question(rl, '🔄 Any deviations from the original plan? ');
      if (deviation.trim()) {
        content = content.replace('[Any changes from the original plan and why]', deviation);
      }

      // Related plan
      const planLink = await this.question(rl, '📋 Link to related planning document (optional): ');
      if (planLink.trim()) {
        content = content.replace('[PLAN_LINK]', planLink);
      } else {
        content = content.replace('[PLAN_LINK]', 'N/A');
      }

    } finally {
      rl.close();
    }

    return content;
  }

  /**
   * Prompt for review name
   */
  async promptForReviewName() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    try {
      const name = await this.question(rl, '📝 Enter review name (e.g., "Tool Comparison Feature Implementation"): ');
      return name.trim();
    } finally {
      rl.close();
    }
  }

  /**
   * Save review to file
   */
  async saveReview(content) {
    const filename = this.reviewName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);

    const timestamp = new Date().toISOString().split('T')[0];
    const reviewFilename = `${timestamp}-${filename}-review.md`;
    const reviewPath = path.join(this.outputDir, reviewFilename);

    fs.writeFileSync(reviewPath, content);
    return reviewPath;
  }

  /**
   * Validate existing self-review
   */
  async validateReview(reviewPath) {
    if (!fs.existsSync(reviewPath)) {
      throw new Error(`Review file not found: ${reviewPath}`);
    }

    const content = fs.readFileSync(reviewPath, 'utf8');
    const issues = [];
    const warnings = [];

    // Check for required sections
    const requiredSections = [
      'Implementation Summary',
      'Quality Checklist',
      'SiteOptz-Specific Validation',
      'Testing Evidence',
      'Deployment Readiness'
    ];

    for (const section of requiredSections) {
      if (!content.includes(section)) {
        issues.push(`Missing required section: ${section}`);
      }
    }

    // Check completion status
    const checkboxPattern = /- \[([ x])\]/g;
    const checkboxes = [...content.matchAll(checkboxPattern)];
    const completed = checkboxes.filter(match => match[1] === 'x').length;
    const total = checkboxes.length;
    
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    if (completionRate < 80) {
      warnings.push(`Low completion rate: ${Math.round(completionRate)}% (${completed}/${total} checkboxes)`);
    }

    // Check for SiteOptz-specific validations
    const siteOptzChecks = [
      'npm run validate-urls',
      'npm run validate-images',
      'npm run validate-schema',
      'Dark theme styling',
      'URL formats correct'
    ];

    for (const check of siteOptzChecks) {
      if (!content.includes(check)) {
        warnings.push(`Missing SiteOptz-specific check: ${check}`);
      }
    }

    // Check for placeholder text
    const placeholders = [
      '[Brief description',
      '[Description]',
      '[1, 2, 3...]',
      '[Expected result]'
    ];

    for (const placeholder of placeholders) {
      if (content.includes(placeholder)) {
        warnings.push(`Incomplete template placeholder: ${placeholder}`);
      }
    }

    return {
      valid: issues.length === 0,
      issues,
      warnings,
      completion_rate: Math.round(completionRate),
      completed_checks: completed,
      total_checks: total,
      path: reviewPath,
      lastModified: fs.statSync(reviewPath).mtime
    };
  }

  /**
   * Run validation commands mentioned in review
   */
  async runValidationCommands() {
    console.log('🔍 Running SiteOptz validation commands...\n');

    const commands = [
      { name: 'Build', cmd: 'npm run build' },
      { name: 'Type Check', cmd: 'npm run type-check' },
      { name: 'Lint', cmd: 'npm run lint' },
      { name: 'URL Validation', cmd: 'npm run validate-urls' },
      { name: 'Image Validation', cmd: 'npm run validate-images' },
      { name: 'Schema Validation', cmd: 'npm run validate-schema' }
    ];

    const results = [];

    for (const command of commands) {
      console.log(`⏳ Running ${command.name}...`);
      
      try {
        const { spawn } = require('child_process');
        const [cmd, ...args] = command.cmd.split(' ');
        
        const result = await new Promise((resolve) => {
          const child = spawn(cmd, args, { 
            stdio: 'pipe',
            cwd: process.cwd()
          });
          
          let output = '';
          child.stdout?.on('data', (data) => output += data.toString());
          child.stderr?.on('data', (data) => output += data.toString());
          
          child.on('close', (code) => {
            resolve({
              command: command.name,
              cmd: command.cmd,
              success: code === 0,
              output: output.trim()
            });
          });
        });

        results.push(result);
        
        if (result.success) {
          console.log(`✅ ${command.name} passed`);
        } else {
          console.log(`❌ ${command.name} failed`);
        }
        
      } catch (error) {
        results.push({
          command: command.name,
          cmd: command.cmd,
          success: false,
          error: error.message
        });
        console.log(`❌ ${command.name} failed: ${error.message}`);
      }
    }

    const passed = results.filter(r => r.success).length;
    const failed = results.length - passed;

    console.log(`\n📊 Validation Summary: ${passed} passed, ${failed} failed`);
    
    return {
      results,
      summary: { passed, failed, total: results.length },
      all_passed: failed === 0
    };
  }

  /**
   * List existing reviews
   */
  async listReviews() {
    if (!fs.existsSync(this.outputDir)) {
      console.log('📁 No reviews directory found');
      return [];
    }

    const files = fs.readdirSync(this.outputDir)
      .filter(file => file.endsWith('-review.md'))
      .map(file => {
        const fullPath = path.join(this.outputDir, file);
        const stats = fs.statSync(fullPath);
        return {
          name: file,
          path: fullPath,
          modified: stats.mtime,
          size: stats.size
        };
      })
      .sort((a, b) => b.modified - a.modified);

    console.log('\n📝 Existing Self-Reviews:');
    console.log('=' .repeat(40));

    if (files.length === 0) {
      console.log('No reviews found');
      return [];
    }

    for (const file of files) {
      const modifiedStr = file.modified.toISOString().split('T')[0];
      console.log(`📄 ${file.name}`);
      console.log(`   📅 Modified: ${modifiedStr}`);
      console.log(`   📏 Size: ${Math.round(file.size / 1024)}KB`);
      console.log('');
    }

    return files;
  }

  /**
   * Promise wrapper for readline question
   */
  question(rl, query) {
    return new Promise(resolve => {
      rl.question(query, resolve);
    });
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0] || 'create';

  const reviewer = new SelfReviewTool({
    interactive: !process.env.CI,
    reviewName: args[1]
  });

  switch (command) {
    case 'create':
      reviewer.createSelfReview()
        .then(() => process.exit(0))
        .catch(error => {
          console.error('❌ Error creating self-review:', error.message);
          process.exit(1);
        });
      break;

    case 'validate':
      if (!args[1]) {
        console.error('❌ Review file path required for validation');
        process.exit(1);
      }
      
      reviewer.validateReview(args[1])
        .then(result => {
          console.log(`📊 Self-Review Validation Results:`);
          console.log(`✅ Completion: ${result.completion_rate}% (${result.completed_checks}/${result.total_checks})`);
          
          if (result.valid) {
            console.log('✅ Structure validation passed');
          } else {
            console.log('❌ Structure validation failed:');
            for (const issue of result.issues) {
              console.log(`  - ${issue}`);
            }
          }
          
          if (result.warnings.length > 0) {
            console.log('⚠️  Warnings:');
            for (const warning of result.warnings) {
              console.log(`  - ${warning}`);
            }
          }
          
          process.exit(result.valid && result.completion_rate >= 80 ? 0 : 1);
        })
        .catch(error => {
          console.error('❌ Error validating review:', error.message);
          process.exit(1);
        });
      break;

    case 'validate-commands':
      reviewer.runValidationCommands()
        .then(result => {
          process.exit(result.all_passed ? 0 : 1);
        })
        .catch(error => {
          console.error('❌ Error running validation commands:', error.message);
          process.exit(1);
        });
      break;

    case 'list':
      reviewer.listReviews()
        .then(() => process.exit(0))
        .catch(error => {
          console.error('❌ Error listing reviews:', error.message);
          process.exit(1);
        });
      break;

    default:
      console.log('Agent Stack Self-Review Tool');
      console.log('');
      console.log('Usage:');
      console.log('  npm run agent:self-review create [name]          - Create new self-review');
      console.log('  npm run agent:self-review validate <file>        - Validate self-review');
      console.log('  npm run agent:self-review validate-commands      - Run validation commands');
      console.log('  npm run agent:self-review list                   - List existing reviews');
      console.log('');
      process.exit(1);
  }
}

module.exports = SelfReviewTool;