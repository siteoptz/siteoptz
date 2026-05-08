#!/usr/bin/env node

/**
 * Agent Stack Planning Tool
 * Helps create and validate planning documents
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class PlanningTool {
  constructor(options = {}) {
    this.interactive = options.interactive !== false;
    this.templatePath = options.templatePath || 'docs/agent-stack/templates/plan.md';
    this.outputDir = options.outputDir || 'docs/agent-stack/plans';
    this.planName = options.planName;
  }

  /**
   * Create new planning document
   */
  async createPlan() {
    console.log('📋 Agent Stack Planning Tool');
    console.log('=' .repeat(40));
    
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    if (this.interactive && !this.planName) {
      this.planName = await this.promptForPlanName();
    }

    if (!this.planName) {
      console.error('❌ Plan name is required');
      process.exit(1);
    }

    const template = this.loadTemplate();
    const planContent = await this.populateTemplate(template);
    const planPath = await this.savePlan(planContent);
    
    console.log(`\n✅ Plan created successfully!`);
    console.log(`📁 Location: ${planPath}`);
    console.log(`\n💡 Next steps:`);
    console.log(`1. Review and complete the planning document`);
    console.log(`2. Get stakeholder approval`);
    console.log(`3. Begin implementation`);
    console.log(`4. Run 'npm run agent:self-review' when complete`);
    
    return { planPath, planName: this.planName };
  }

  /**
   * Load planning template
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
   * Get default planning template
   */
  getDefaultTemplate() {
    return `# Planning Document: [PLAN_NAME]

**Date**: [DATE]
**Author**: [AUTHOR]

## Problem Statement

**What problem are we solving?**
[Describe the issue, user need, or business requirement]

**Why is this important?**
[Impact, urgency, business value]

**Who is affected?**
[Users, developers, systems, etc.]

## Proposed Solution

**High-level approach:**
[Brief overview of the solution strategy]

**Key components:**
- [ ] Component 1
- [ ] Component 2
- [ ] Component 3

## Implementation Plan

### Phase 1: [Name]
**Timeline**: [Estimated duration]

**Tasks:**
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

**Definition of Done:**
- [ ] Criteria 1
- [ ] Criteria 2

## Risk Assessment

### High Risks
- **Risk 1**: [Description] → *Mitigation*: [Strategy]

### Dependencies
- [ ] Dependency 1: [Description, owner, timeline]

## Quality Requirements

### Testing Strategy
- [ ] Unit tests for [components]
- [ ] Integration tests for [flows]
- [ ] Manual testing for [scenarios]

### SiteOptz-Specific Checklist
- [ ] URL format validation (\`/compare/tool1/vs/tool2\`)
- [ ] Dark theme compliance
- [ ] Image validation
- [ ] Rich results structured data

## Validation Plan

### Success Metrics
- **Metric 1**: [How to measure]

### Acceptance Criteria
- [ ] Functional requirement 1
- [ ] Non-functional requirement 1

---

**Planning Status**: Draft
**Next Review Date**: [DATE]
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
      .replace(/\[PLAN_NAME\]/g, this.planName)
      .replace(/\[DATE\]/g, dateStr)
      .replace(/\[AUTHOR\]/g, author);

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
      // Problem statement
      const problem = await this.question(rl, '❓ What problem are we solving? ');
      if (problem.trim()) {
        content = content.replace('[Describe the issue, user need, or business requirement]', problem);
      }

      // Importance
      const importance = await this.question(rl, '⚡ Why is this important? ');
      if (importance.trim()) {
        content = content.replace('[Impact, urgency, business value]', importance);
      }

      // Solution approach
      const approach = await this.question(rl, '💡 High-level solution approach? ');
      if (approach.trim()) {
        content = content.replace('[Brief overview of the solution strategy]', approach);
      }

      // Timeline estimate
      const timeline = await this.question(rl, '⏱️  Estimated timeline for Phase 1? ');
      if (timeline.trim()) {
        content = content.replace('[Estimated duration]', timeline);
      }

    } finally {
      rl.close();
    }

    return content;
  }

  /**
   * Prompt for plan name
   */
  async promptForPlanName() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    try {
      const name = await this.question(rl, '📝 Enter plan name (e.g., "Add Tool Comparison Feature"): ');
      return name.trim();
    } finally {
      rl.close();
    }
  }

  /**
   * Save plan to file
   */
  async savePlan(content) {
    const filename = this.planName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);

    const timestamp = new Date().toISOString().split('T')[0];
    const planFilename = `${timestamp}-${filename}.md`;
    const planPath = path.join(this.outputDir, planFilename);

    fs.writeFileSync(planPath, content);
    return planPath;
  }

  /**
   * Validate existing plan
   */
  async validatePlan(planPath) {
    if (!fs.existsSync(planPath)) {
      throw new Error(`Plan file not found: ${planPath}`);
    }

    const content = fs.readFileSync(planPath, 'utf8');
    const issues = [];

    // Check for required sections
    const requiredSections = [
      'Problem Statement',
      'Proposed Solution', 
      'Implementation Plan',
      'Risk Assessment',
      'Quality Requirements'
    ];

    for (const section of requiredSections) {
      if (!content.includes(section)) {
        issues.push(`Missing required section: ${section}`);
      }
    }

    // Check for placeholder text
    const placeholders = [
      '[Describe the issue',
      '[Brief overview',
      '[Estimated duration]',
      '[How to measure]'
    ];

    for (const placeholder of placeholders) {
      if (content.includes(placeholder)) {
        issues.push(`Incomplete template placeholder: ${placeholder}`);
      }
    }

    // Check for SiteOptz-specific requirements
    if (!content.includes('URL format validation')) {
      issues.push('Missing SiteOptz URL format validation requirement');
    }

    if (!content.includes('Dark theme compliance')) {
      issues.push('Missing SiteOptz dark theme compliance requirement');
    }

    return {
      valid: issues.length === 0,
      issues,
      path: planPath,
      lastModified: fs.statSync(planPath).mtime
    };
  }

  /**
   * List existing plans
   */
  async listPlans() {
    if (!fs.existsSync(this.outputDir)) {
      console.log('📁 No plans directory found');
      return [];
    }

    const files = fs.readdirSync(this.outputDir)
      .filter(file => file.endsWith('.md'))
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

    console.log('\n📋 Existing Plans:');
    console.log('=' .repeat(40));

    if (files.length === 0) {
      console.log('No plans found');
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

  const planner = new PlanningTool({
    interactive: !process.env.CI,
    planName: args[1]
  });

  switch (command) {
    case 'create':
      planner.createPlan()
        .then(() => process.exit(0))
        .catch(error => {
          console.error('❌ Error creating plan:', error.message);
          process.exit(1);
        });
      break;

    case 'list':
      planner.listPlans()
        .then(() => process.exit(0))
        .catch(error => {
          console.error('❌ Error listing plans:', error.message);
          process.exit(1);
        });
      break;

    case 'validate':
      if (!args[1]) {
        console.error('❌ Plan file path required for validation');
        process.exit(1);
      }
      
      planner.validatePlan(args[1])
        .then(result => {
          if (result.valid) {
            console.log('✅ Plan validation passed');
          } else {
            console.log('❌ Plan validation failed:');
            for (const issue of result.issues) {
              console.log(`  - ${issue}`);
            }
          }
          process.exit(result.valid ? 0 : 1);
        })
        .catch(error => {
          console.error('❌ Error validating plan:', error.message);
          process.exit(1);
        });
      break;

    default:
      console.log('Agent Stack Planning Tool');
      console.log('');
      console.log('Usage:');
      console.log('  npm run agent:plan create [name]     - Create new plan');
      console.log('  npm run agent:plan list             - List existing plans');  
      console.log('  npm run agent:plan validate <file>  - Validate existing plan');
      console.log('');
      process.exit(1);
  }
}

module.exports = PlanningTool;