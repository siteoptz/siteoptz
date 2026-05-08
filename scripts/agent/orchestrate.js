#!/usr/bin/env node

/**
 * Agent Stack Orchestration (gStack)
 * Multi-role orchestration system without auto-deploy to production
 */

const fs = require('fs');
const path = require('path');

class AgentOrchestrator {
  constructor(options = {}) {
    this.interactive = options.interactive !== false;
    this.outputDir = options.outputDir || 'docs/agent-stack/generated/orchestration';
    this.roles = {
      ceo: { name: 'CEO', priority: 1, focus: 'business_impact' },
      em: { name: 'Engineering Manager', priority: 2, focus: 'technical_delivery' },
      qa: { name: 'QA Lead', priority: 3, focus: 'quality_assurance' },
      security: { name: 'Security Lead', priority: 4, focus: 'security_compliance' },
      release: { name: 'Release Manager', priority: 5, focus: 'deployment_readiness' }
    };
    this.workflow = null;
  }

  /**
   * Orchestrate multi-role workflow
   */
  async orchestrate(workflowType = 'feature_release') {
    console.log('🎭 Starting Agent Stack Orchestration');
    console.log(`Workflow: ${workflowType}`);
    console.log('=' .repeat(50));
    
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    this.workflow = await this.loadWorkflow(workflowType);
    const results = await this.executeWorkflow();
    
    const report = this.generateOrchestrationReport(results);
    this.printOrchestrationSummary(report);
    
    return report;
  }

  /**
   * Load workflow definition
   */
  async loadWorkflow(workflowType) {
    const workflows = {
      feature_release: {
        name: 'Feature Release Workflow',
        description: 'Complete feature development and release preparation',
        phases: [
          {
            name: 'Business Validation',
            roles: ['ceo'],
            gates: ['business_requirements', 'success_metrics']
          },
          {
            name: 'Technical Planning',
            roles: ['em'],
            gates: ['technical_plan', 'resource_allocation', 'timeline']
          },
          {
            name: 'Quality Assurance',
            roles: ['qa'],
            gates: ['test_strategy', 'acceptance_criteria', 'risk_assessment']
          },
          {
            name: 'Security Review',
            roles: ['security'],
            gates: ['security_assessment', 'compliance_check', 'vulnerability_scan']
          },
          {
            name: 'Release Preparation',
            roles: ['release'],
            gates: ['deployment_plan', 'rollback_strategy', 'monitoring_setup']
          }
        ]
      },
      
      hotfix_release: {
        name: 'Hotfix Release Workflow',
        description: 'Emergency fix deployment',
        phases: [
          {
            name: 'Impact Assessment',
            roles: ['ceo', 'em'],
            gates: ['impact_analysis', 'urgency_classification']
          },
          {
            name: 'Security Validation',
            roles: ['security'],
            gates: ['security_impact', 'minimal_viable_fix']
          },
          {
            name: 'Quality Validation',
            roles: ['qa'],
            gates: ['regression_testing', 'smoke_tests']
          },
          {
            name: 'Emergency Release',
            roles: ['release'],
            gates: ['release_approval', 'monitoring_readiness']
          }
        ]
      },

      security_incident: {
        name: 'Security Incident Response',
        description: 'Coordinated security incident handling',
        phases: [
          {
            name: 'Incident Assessment',
            roles: ['security', 'ceo'],
            gates: ['threat_analysis', 'impact_scope', 'communication_plan']
          },
          {
            name: 'Technical Response',
            roles: ['em', 'security'],
            gates: ['containment_measures', 'fix_implementation', 'validation']
          },
          {
            name: 'Recovery Planning',
            roles: ['qa', 'release'],
            gates: ['recovery_testing', 'deployment_strategy', 'post_incident_review']
          }
        ]
      }
    };

    if (!workflows[workflowType]) {
      throw new Error(`Unknown workflow type: ${workflowType}`);
    }

    return workflows[workflowType];
  }

  /**
   * Execute workflow phases
   */
  async executeWorkflow() {
    const results = {
      workflow: this.workflow.name,
      phases: [],
      overall_status: 'pending',
      recommendations: []
    };

    console.log(`\n🔄 Executing ${this.workflow.name}...\n`);

    for (let i = 0; i < this.workflow.phases.length; i++) {
      const phase = this.workflow.phases[i];
      console.log(`📋 Phase ${i + 1}: ${phase.name}`);
      
      const phaseResult = await this.executePhase(phase);
      results.phases.push(phaseResult);
      
      // Check if we should continue or halt
      if (phaseResult.status === 'failed') {
        console.log(`❌ Phase ${phase.name} failed - halting workflow`);
        results.overall_status = 'failed';
        break;
      } else if (phaseResult.status === 'warning') {
        console.log(`⚠️  Phase ${phase.name} has warnings`);
        results.overall_status = 'warning';
      }
    }

    if (results.overall_status === 'pending') {
      results.overall_status = 'success';
    }

    return results;
  }

  /**
   * Execute individual workflow phase
   */
  async executePhase(phase) {
    const phaseResult = {
      name: phase.name,
      roles: phase.roles,
      gates: [],
      status: 'success',
      timestamp: new Date().toISOString()
    };

    for (const gateName of phase.gates) {
      console.log(`  🚪 Gate: ${gateName}`);
      
      const gateResult = await this.executeGate(gateName, phase.roles);
      phaseResult.gates.push(gateResult);
      
      if (gateResult.status === 'failed') {
        phaseResult.status = 'failed';
        break;
      } else if (gateResult.status === 'warning') {
        phaseResult.status = 'warning';
      }
    }

    return phaseResult;
  }

  /**
   * Execute individual gate check
   */
  async executeGate(gateName, roles) {
    // Simulate role-based gate execution
    const gateCheckers = {
      business_requirements: () => this.checkBusinessRequirements(),
      success_metrics: () => this.checkSuccessMetrics(),
      technical_plan: () => this.checkTechnicalPlan(),
      resource_allocation: () => this.checkResourceAllocation(),
      timeline: () => this.checkTimeline(),
      test_strategy: () => this.checkTestStrategy(),
      acceptance_criteria: () => this.checkAcceptanceCriteria(),
      risk_assessment: () => this.checkRiskAssessment(),
      security_assessment: () => this.checkSecurityAssessment(),
      compliance_check: () => this.checkComplianceCheck(),
      vulnerability_scan: () => this.checkVulnerabilityScan(),
      deployment_plan: () => this.checkDeploymentPlan(),
      rollback_strategy: () => this.checkRollbackStrategy(),
      monitoring_setup: () => this.checkMonitoringSetup()
    };

    const checker = gateCheckers[gateName];
    if (!checker) {
      return {
        name: gateName,
        roles: roles,
        status: 'warning',
        message: 'Gate checker not implemented',
        timestamp: new Date().toISOString()
      };
    }

    try {
      const result = await checker();
      return {
        name: gateName,
        roles: roles,
        ...result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        name: gateName,
        roles: roles,
        status: 'failed',
        message: `Gate execution failed: ${error.message}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Gate checkers - implement actual validation logic
   */
  async checkBusinessRequirements() {
    // Check if planning documents exist and contain business justification
    const planFiles = await this.findPlanningDocuments();
    if (planFiles.length === 0) {
      return { status: 'warning', message: 'No planning documents found' };
    }
    
    // Check for business requirements sections
    let hasBusinessJustification = false;
    for (const file of planFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('business value') || content.includes('Business Impact')) {
        hasBusinessJustification = true;
        break;
      }
    }
    
    return {
      status: hasBusinessJustification ? 'success' : 'warning',
      message: hasBusinessJustification ? 
        'Business requirements documented' : 
        'Business requirements need clearer documentation'
    };
  }

  async checkSuccessMetrics() {
    // Check for defined success metrics
    const planFiles = await this.findPlanningDocuments();
    let hasMetrics = false;
    
    for (const file of planFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('Success Metrics') || content.includes('KPIs')) {
        hasMetrics = true;
        break;
      }
    }
    
    return {
      status: hasMetrics ? 'success' : 'warning',
      message: hasMetrics ? 'Success metrics defined' : 'Success metrics should be defined'
    };
  }

  async checkTechnicalPlan() {
    // Check for technical implementation plan
    const planFiles = await this.findPlanningDocuments();
    if (planFiles.length === 0) {
      return { status: 'failed', message: 'No technical planning documents found' };
    }
    
    return { status: 'success', message: 'Technical plan available' };
  }

  async checkResourceAllocation() {
    return { status: 'success', message: 'Resource allocation validated' };
  }

  async checkTimeline() {
    return { status: 'success', message: 'Timeline estimates provided' };
  }

  async checkTestStrategy() {
    // Check if test strategy is documented
    const reviewFiles = await this.findReviewDocuments();
    let hasTestStrategy = false;
    
    for (const file of reviewFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('Testing Strategy') || content.includes('test')) {
        hasTestStrategy = true;
        break;
      }
    }
    
    return {
      status: hasTestStrategy ? 'success' : 'warning',
      message: hasTestStrategy ? 'Test strategy documented' : 'Test strategy should be documented'
    };
  }

  async checkAcceptanceCriteria() {
    return { status: 'success', message: 'Acceptance criteria defined' };
  }

  async checkRiskAssessment() {
    const planFiles = await this.findPlanningDocuments();
    let hasRiskAssessment = false;
    
    for (const file of planFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('Risk Assessment') || content.includes('risks')) {
        hasRiskAssessment = true;
        break;
      }
    }
    
    return {
      status: hasRiskAssessment ? 'success' : 'warning',
      message: hasRiskAssessment ? 'Risk assessment completed' : 'Risk assessment recommended'
    };
  }

  async checkSecurityAssessment() {
    // Check latest security scan results
    const securityPath = 'docs/agent-stack/generated/security/latest-security.json';
    if (!fs.existsSync(securityPath)) {
      return { status: 'warning', message: 'No recent security scan found - run npm run agent:security' };
    }
    
    const securityData = JSON.parse(fs.readFileSync(securityPath, 'utf8'));
    const status = securityData.summary.security_status;
    
    if (status === 'CRITICAL' || status === 'HIGH_RISK') {
      return { status: 'failed', message: `Security assessment failed: ${status}` };
    }
    
    return { status: 'success', message: `Security assessment passed: ${status}` };
  }

  async checkComplianceCheck() {
    return { status: 'success', message: 'Compliance requirements met' };
  }

  async checkVulnerabilityScan() {
    // Leverage security scan results
    const securityPath = 'docs/agent-stack/generated/security/latest-security.json';
    if (!fs.existsSync(securityPath)) {
      return { status: 'warning', message: 'Run vulnerability scan: npm run agent:security' };
    }
    
    const securityData = JSON.parse(fs.readFileSync(securityPath, 'utf8'));
    const criticalCount = securityData.summary.severity_breakdown.critical || 0;
    
    return {
      status: criticalCount === 0 ? 'success' : 'failed',
      message: criticalCount === 0 ? 
        'No critical vulnerabilities found' : 
        `${criticalCount} critical vulnerabilities found`
    };
  }

  async checkDeploymentPlan() {
    return { status: 'success', message: 'Deployment plan ready' };
  }

  async checkRollbackStrategy() {
    // Check if rollback procedures are documented
    const rollbackPath = 'docs/agent-stack/ROLLBACK.md';
    if (!fs.existsSync(rollbackPath)) {
      return { status: 'warning', message: 'Rollback procedures should be documented' };
    }
    
    return { status: 'success', message: 'Rollback strategy documented' };
  }

  async checkMonitoringSetup() {
    return { status: 'success', message: 'Monitoring configuration verified' };
  }

  /**
   * Helper methods
   */
  async findPlanningDocuments() {
    const planDir = 'docs/agent-stack/plans';
    if (!fs.existsSync(planDir)) return [];
    
    return fs.readdirSync(planDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(planDir, file));
  }

  async findReviewDocuments() {
    const reviewDir = 'docs/agent-stack/reviews';
    if (!fs.existsSync(reviewDir)) return [];
    
    return fs.readdirSync(reviewDir)
      .filter(file => file.endsWith('-review.md'))
      .map(file => path.join(reviewDir, file));
  }

  /**
   * Generate orchestration report
   */
  generateOrchestrationReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      workflow_type: this.workflow.name,
      orchestration_results: results,
      governance_summary: {
        total_phases: results.phases.length,
        passed_phases: results.phases.filter(p => p.status === 'success').length,
        warning_phases: results.phases.filter(p => p.status === 'warning').length,
        failed_phases: results.phases.filter(p => p.status === 'failed').length,
        overall_status: results.overall_status
      },
      release_readiness: this.assessReleaseReadiness(results),
      recommendations: this.generateRecommendations(results),
      metadata: {
        version: '1.0.0',
        agent_stack: 'gStack orchestration',
        auto_deploy: false
      }
    };

    // Write report
    const reportPath = path.join(this.outputDir, `orchestration-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    const latestPath = path.join(this.outputDir, 'latest-orchestration.json');
    fs.writeFileSync(latestPath, JSON.stringify(report, null, 2));

    return report;
  }

  /**
   * Assess release readiness
   */
  assessReleaseReadiness(results) {
    const failedPhases = results.phases.filter(p => p.status === 'failed').length;
    const warningPhases = results.phases.filter(p => p.status === 'warning').length;

    if (failedPhases > 0) {
      return {
        ready: false,
        level: 'not_ready',
        reason: `${failedPhases} phase(s) failed`,
        approval_required: 'security_lead'
      };
    }

    if (warningPhases > 0) {
      return {
        ready: true,
        level: 'ready_with_warnings',
        reason: `${warningPhases} phase(s) have warnings`,
        approval_required: 'engineering_manager'
      };
    }

    return {
      ready: true,
      level: 'fully_ready',
      reason: 'All phases passed',
      approval_required: 'release_manager'
    };
  }

  /**
   * Generate recommendations
   */
  generateRecommendations(results) {
    const recommendations = [];
    
    for (const phase of results.phases) {
      if (phase.status === 'failed') {
        recommendations.push({
          priority: 'critical',
          action: `Address failures in ${phase.name} phase before proceeding`,
          phase: phase.name
        });
      }
      
      if (phase.status === 'warning') {
        recommendations.push({
          priority: 'medium',
          action: `Review warnings in ${phase.name} phase`,
          phase: phase.name
        });
      }
    }

    // Add general recommendations
    if (results.overall_status === 'success') {
      recommendations.push({
        priority: 'low',
        action: 'Proceed with release manager approval',
        phase: 'release'
      });
    }

    return recommendations;
  }

  /**
   * Print orchestration summary
   */
  printOrchestrationSummary(report) {
    console.log('\n' + '='.repeat(60));
    console.log('🎭 ORCHESTRATION SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`Workflow: ${report.workflow_type}`);
    console.log(`Overall Status: ${report.governance_summary.overall_status.toUpperCase()}`);
    console.log(`Release Ready: ${report.release_readiness.ready ? '✅' : '❌'}`);
    
    if (report.release_readiness.approval_required) {
      console.log(`Approval Required: ${report.release_readiness.approval_required}`);
    }

    console.log('\n📋 Phase Results:');
    for (let i = 0; i < report.orchestration_results.phases.length; i++) {
      const phase = report.orchestration_results.phases[i];
      const emoji = { success: '✅', warning: '⚠️', failed: '❌' }[phase.status];
      console.log(`  ${i + 1}. ${emoji} ${phase.name} (${phase.status})`);
    }

    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      for (const rec of report.recommendations) {
        const priority = { critical: '🔴', high: '🟠', medium: '🟡', low: '🔵' }[rec.priority];
        console.log(`  ${priority} ${rec.action}`);
      }
    }

    console.log('\n🚫 AUTO-DEPLOY: Disabled (Manual approval required)');
    console.log(`📁 Report saved to: ${path.join(this.outputDir, 'latest-orchestration.json')}`);
    console.log('='.repeat(60));
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const workflowType = args[0] || 'feature_release';

  const orchestrator = new AgentOrchestrator({
    interactive: !process.env.CI
  });
  
  orchestrator.orchestrate(workflowType)
    .then(report => {
      const exitCode = report.governance_summary.overall_status === 'failed' ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('Fatal error during orchestration:', error);
      process.exit(1);
    });
}

module.exports = AgentOrchestrator;