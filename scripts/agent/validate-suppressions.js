#!/usr/bin/env node

/**
 * Agent Stack Suppressions Validator
 * Validates parsed suppressions against JSON schema and business rules
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

class SuppressionsValidator {
  constructor(options = {}) {
    this.schemaPath = options.schemaPath || 'docs/agent-stack/suppression.schema.json';
    this.suppressionsPath = options.suppressionsPath || 'docs/agent-stack/generated/suppressions.json';
    this.ajv = new Ajv({ allErrors: true });
    addFormats(this.ajv);
    
    this.errors = [];
    this.warnings = [];
    this.stats = {
      total: 0,
      by_type: {},
      by_status: {},
      by_severity: {},
      expired: 0,
      expiring_soon: 0
    };
  }

  /**
   * Validate all suppressions
   */
  async validate() {
    console.log('Validating agent stack suppressions...');
    
    // Load schema
    const schema = this.loadSchema();
    const validate = this.ajv.compile(schema);
    
    // Load suppressions
    const data = this.loadSuppressions();
    
    // Validate each suppression
    for (const suppression of data.suppressions) {
      this.validateSuppression(suppression, validate);
      this.updateStats(suppression);
      this.validateBusinessRules(suppression);
    }
    
    // Generate report
    return this.generateReport();
  }

  /**
   * Load JSON schema
   */
  loadSchema() {
    try {
      const schemaContent = fs.readFileSync(this.schemaPath, 'utf8');
      return JSON.parse(schemaContent);
    } catch (error) {
      throw new Error(`Failed to load schema from ${this.schemaPath}: ${error.message}`);
    }
  }

  /**
   * Load suppressions data
   */
  loadSuppressions() {
    try {
      const suppressionsContent = fs.readFileSync(this.suppressionsPath, 'utf8');
      return JSON.parse(suppressionsContent);
    } catch (error) {
      throw new Error(`Failed to load suppressions from ${this.suppressionsPath}: ${error.message}`);
    }
  }

  /**
   * Validate individual suppression against schema
   */
  validateSuppression(suppression, validate) {
    const valid = validate(suppression);
    
    if (!valid) {
      for (const error of validate.errors) {
        this.logError(`Schema violation in ${suppression.id}: ${error.instancePath} ${error.message}`, suppression.id);
      }
    }
  }

  /**
   * Validate business rules
   */
  validateBusinessRules(suppression) {
    // Expiry validation
    this.validateExpiry(suppression);
    
    // ID format validation
    this.validateIdFormat(suppression);
    
    // Severity-specific validations
    this.validateSeverityRules(suppression);
    
    // Type-specific validations
    this.validateTypeRules(suppression);
    
    // Status-specific validations
    this.validateStatusRules(suppression);
  }

  /**
   * Validate expiry rules
   */
  validateExpiry(suppression) {
    if (suppression.status !== 'active') return;

    const now = new Date();
    const expiry = new Date(suppression.expiry);
    const introduced = new Date(suppression.introduced_on);
    
    // Check if expired
    if (expiry < now) {
      this.logError(`Suppression ${suppression.id} has expired (${suppression.expiry})`, suppression.id);
      this.stats.expired++;
    }
    
    // Check if expiring soon (7 days)
    const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry >= 0 && daysUntilExpiry <= 7) {
      this.logWarning(`Suppression ${suppression.id} expires in ${daysUntilExpiry} days`, suppression.id);
      this.stats.expiring_soon++;
    }
    
    // Check maximum duration
    const totalDays = Math.ceil((expiry - introduced) / (1000 * 60 * 60 * 24));
    const maxDays = this.getMaxExpiryDays(suppression.type, suppression.severity);
    
    if (totalDays > maxDays) {
      this.logError(`Suppression ${suppression.id} duration (${totalDays} days) exceeds maximum of ${maxDays} days`, suppression.id);
    }
  }

  /**
   * Validate ID format
   */
  validateIdFormat(suppression) {
    const expectedPrefix = this.getIdPrefix(suppression.type);
    if (!suppression.id.startsWith(expectedPrefix)) {
      this.logError(`Suppression ${suppression.id} has incorrect prefix for type ${suppression.type} (expected ${expectedPrefix})`, suppression.id);
    }
  }

  /**
   * Validate severity-specific rules
   */
  validateSeverityRules(suppression) {
    // Critical and High severity require approver
    if (['critical', 'high'].includes(suppression.severity) && !suppression.approver) {
      this.logError(`${suppression.severity} severity suppression ${suppression.id} requires approver field`, suppression.id);
    }
    
    // Critical suppressions should have short expiry
    if (suppression.severity === 'critical' && suppression.status === 'active') {
      const expiry = new Date(suppression.expiry);
      const introduced = new Date(suppression.introduced_on);
      const days = Math.ceil((expiry - introduced) / (1000 * 60 * 60 * 24));
      
      if (days > 7) {
        this.logWarning(`Critical suppression ${suppression.id} has expiry beyond 7 days (${days} days)`, suppression.id);
      }
    }
  }

  /**
   * Validate type-specific rules
   */
  validateTypeRules(suppression) {
    switch (suppression.type) {
      case 'security':
        if (!suppression.tool) {
          this.logError(`Security suppression ${suppression.id} missing required tool field`, suppression.id);
        }
        // Security suppressions should have mitigation for active critical/high
        if (['critical', 'high'].includes(suppression.severity) && 
            suppression.status === 'active' && !suppression.mitigation) {
          this.logWarning(`High/critical security suppression ${suppression.id} should have mitigation measures documented`, suppression.id);
        }
        break;
        
      case 'review':
        if (!suppression.lane) {
          this.logError(`Review suppression ${suppression.id} missing required lane field`, suppression.id);
        }
        // Validate lane values
        const validLanes = ['correctness', 'architecture', 'style', 'performance', 'regression'];
        if (suppression.lane && !validLanes.includes(suppression.lane)) {
          this.logError(`Review suppression ${suppression.id} has invalid lane: ${suppression.lane}`, suppression.id);
        }
        break;
        
      case 'ui':
        if (!suppression.category) {
          this.logError(`UI suppression ${suppression.id} missing required category field`, suppression.id);
        }
        if (!suppression.impacted_flows || suppression.impacted_flows.length === 0) {
          this.logError(`UI suppression ${suppression.id} missing required impacted_flows field`, suppression.id);
        }
        // Validate category values
        const validCategories = ['design_system', 'accessibility', 'mobile_experience', 'performance', 'user_flow'];
        if (suppression.category && !validCategories.includes(suppression.category)) {
          this.logError(`UI suppression ${suppression.id} has invalid category: ${suppression.category}`, suppression.id);
        }
        break;
    }
  }

  /**
   * Validate status-specific rules
   */
  validateStatusRules(suppression) {
    if (suppression.status === 'resolved') {
      const requiredFields = ['resolution', 'resolution_date', 'resolved_by'];
      for (const field of requiredFields) {
        if (!suppression[field]) {
          this.logError(`Resolved suppression ${suppression.id} missing required field: ${field}`, suppression.id);
        }
      }
    }
    
    if (suppression.status === 'active' && !suppression.expiry) {
      this.logError(`Active suppression ${suppression.id} missing expiry date`, suppression.id);
    }
  }

  /**
   * Update statistics
   */
  updateStats(suppression) {
    this.stats.total++;
    
    // Count by type
    this.stats.by_type[suppression.type] = (this.stats.by_type[suppression.type] || 0) + 1;
    
    // Count by status
    this.stats.by_status[suppression.status] = (this.stats.by_status[suppression.status] || 0) + 1;
    
    // Count by severity
    this.stats.by_severity[suppression.severity] = (this.stats.by_severity[suppression.severity] || 0) + 1;
  }

  /**
   * Get maximum expiry days for type/severity combination
   */
  getMaxExpiryDays(type, severity) {
    const limits = {
      security: { critical: 7, high: 14, medium: 30, low: 90 },
      review: { critical: 7, high: 14, medium: 30, low: 90 },
      ui: { critical: 7, high: 14, medium: 30, low: 60 }
    };
    
    return limits[type]?.[severity] || 90;
  }

  /**
   * Get expected ID prefix for type
   */
  getIdPrefix(type) {
    const prefixes = {
      security: 'SEC-',
      review: 'REV-',
      ui: 'UI-'
    };
    
    return prefixes[type] || 'UNK-';
  }

  /**
   * Log error
   */
  logError(message, suppressionId = null) {
    this.errors.push({ message, suppressionId });
    console.error(`ERROR: ${message}`);
  }

  /**
   * Log warning
   */
  logWarning(message, suppressionId = null) {
    this.warnings.push({ message, suppressionId });
    console.warn(`WARNING: ${message}`);
  }

  /**
   * Generate validation report
   */
  generateReport() {
    const report = {
      validation_date: new Date().toISOString(),
      schema_path: this.schemaPath,
      suppressions_path: this.suppressionsPath,
      validation_result: this.errors.length === 0 ? 'PASS' : 'FAIL',
      stats: this.stats,
      errors: this.errors,
      warnings: this.warnings,
      summary: {
        total_suppressions: this.stats.total,
        errors_count: this.errors.length,
        warnings_count: this.warnings.length,
        expired_count: this.stats.expired,
        expiring_soon_count: this.stats.expiring_soon
      }
    };

    // Write report to file
    const reportPath = 'docs/agent-stack/generated/validation-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }

  /**
   * Print summary to console
   */
  printSummary(report) {
    console.log('\n=== Suppressions Validation Summary ===');
    console.log(`Result: ${report.validation_result}`);
    console.log(`Total suppressions: ${report.stats.total}`);
    console.log(`Errors: ${report.errors.length}`);
    console.log(`Warnings: ${report.warnings.length}`);
    
    if (report.stats.expired > 0) {
      console.log(`⚠️  Expired suppressions: ${report.stats.expired}`);
    }
    
    if (report.stats.expiring_soon > 0) {
      console.log(`⏰ Expiring soon (7 days): ${report.stats.expiring_soon}`);
    }
    
    console.log('\nBy Type:');
    for (const [type, count] of Object.entries(report.stats.by_type)) {
      console.log(`  ${type}: ${count}`);
    }
    
    console.log('\nBy Status:');
    for (const [status, count] of Object.entries(report.stats.by_status)) {
      console.log(`  ${status}: ${count}`);
    }
    
    console.log('\nBy Severity:');
    for (const [severity, count] of Object.entries(report.stats.by_severity)) {
      console.log(`  ${severity}: ${count}`);
    }
    
    if (report.errors.length > 0) {
      console.log('\n=== ERRORS ===');
      for (const error of report.errors) {
        console.log(`❌ ${error.message}`);
      }
    }
    
    if (report.warnings.length > 0 && report.warnings.length <= 10) {
      console.log('\n=== WARNINGS ===');
      for (const warning of report.warnings) {
        console.log(`⚠️  ${warning.message}`);
      }
    } else if (report.warnings.length > 10) {
      console.log(`\n=== WARNINGS (showing first 10 of ${report.warnings.length}) ===`);
      for (const warning of report.warnings.slice(0, 10)) {
        console.log(`⚠️  ${warning.message}`);
      }
    }
    
    console.log('\n' + '='.repeat(45));
  }
}

// CLI interface
if (require.main === module) {
  const validator = new SuppressionsValidator();
  
  validator.validate()
    .then(report => {
      validator.printSummary(report);
      
      if (report.validation_result === 'FAIL') {
        console.error('\nValidation failed due to errors');
        process.exit(1);
      } else {
        console.log('\nValidation passed');
        process.exit(0);
      }
    })
    .catch(error => {
      console.error('Fatal error during validation:', error);
      process.exit(1);
    });
}

module.exports = SuppressionsValidator;