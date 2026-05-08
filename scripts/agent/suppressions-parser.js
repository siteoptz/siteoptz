#!/usr/bin/env node

/**
 * Agent Stack Suppressions Parser
 * Converts markdown suppression files to JSON format for validation
 */

const fs = require('fs');
const path = require('path');

class SuppressionsParser {
  constructor(options = {}) {
    this.strict = options.strict !== false; // Default to strict mode
    this.outputDir = options.outputDir || 'docs/agent-stack/generated';
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Parse all suppression markdown files
   */
  async parseAll() {
    const suppressionFiles = [
      'docs/agent-stack/security-suppressions.md',
      'docs/agent-stack/review-suppressions.md', 
      'docs/agent-stack/ui-suppressions.md'
    ];

    const results = [];
    
    for (const file of suppressionFiles) {
      if (fs.existsSync(file)) {
        const result = await this.parseFile(file);
        results.push(result);
      } else {
        this.logWarning(`Suppression file not found: ${file}`);
      }
    }

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Write combined results
    const combined = {
      parsed_at: new Date().toISOString(),
      files_processed: suppressionFiles.length,
      total_suppressions: results.reduce((sum, r) => sum + r.suppressions.length, 0),
      suppressions: results.flatMap(r => r.suppressions),
      errors: this.errors,
      warnings: this.warnings
    };

    const outputPath = path.join(this.outputDir, 'suppressions.json');
    fs.writeFileSync(outputPath, JSON.stringify(combined, null, 2));

    return combined;
  }

  /**
   * Parse a single markdown file
   */
  async parseFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const suppressions = [];
    
    // Find suppression sections (## Active Suppressions, ## Resolved Suppressions)
    const sectionRegex = /## (Active|Resolved) Suppressions\s*\n([\s\S]*?)(?=\n## |$)/g;
    let sectionMatch;

    while ((sectionMatch = sectionRegex.exec(content)) !== null) {
      const sectionType = sectionMatch[1].toLowerCase();
      const sectionContent = sectionMatch[2];

      // Find individual suppressions (### CATEGORY-NUMBER - Title)
      const suppressionRegex = /### ([A-Z]{2,3}-\d{3,4}) - ([^\n]+)\n([\s\S]*?)(?=\n### |$)/g;
      let suppressionMatch;

      while ((suppressionMatch = suppressionRegex.exec(sectionContent)) !== null) {
        const id = suppressionMatch[1];
        const title = suppressionMatch[2].trim();
        const body = suppressionMatch[3];

        try {
          const suppression = this.parseSuppressionBody(id, title, body, sectionType, filePath);
          suppressions.push(suppression);
        } catch (error) {
          this.logError(`Error parsing ${id} in ${filePath}: ${error.message}`);
        }
      }
    }

    return {
      file: filePath,
      suppressions
    };
  }

  /**
   * Parse the body of a suppression entry
   */
  parseSuppressionBody(id, title, body, sectionType, filePath) {
    const suppression = {
      id,
      title,
      type: this.inferTypeFromId(id),
      status: sectionType === 'active' ? 'active' : 'resolved'
    };

    // Extract fields using bullet point patterns
    const lines = body.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('- **')) continue;

      const fieldMatch = trimmed.match(/^- \*\*([^*]+)\*\*:\s*(.+)$/);
      if (!fieldMatch) continue;

      const fieldName = fieldMatch[1];
      const fieldValue = fieldMatch[2].trim();

      this.mapField(suppression, fieldName, fieldValue, id);
    }

    // Validate required fields
    this.validateSuppression(suppression, id, filePath);

    return suppression;
  }

  /**
   * Map markdown field names to JSON schema fields
   */
  mapField(suppression, fieldName, fieldValue, id) {
    const fieldMappings = {
      'Status': 'status',
      'Severity': 'severity', 
      'Tool': 'tool',
      'Lane': 'lane',
      'Category': 'category',
      'Rule ID': 'rule_id',
      'Scope': 'scope',
      'Impacted Flows': 'impacted_flows',
      'Introduced': 'introduced_on',
      'Expiry': 'expiry',
      'Owner': 'owner',
      'Rationale': 'rationale',
      'Issue Link': 'issue_link',
      'Last Reviewed': 'last_reviewed',
      'Approver': 'approver',
      'Mitigation': 'mitigation',
      'Resolution': 'resolution',
      'Resolution Date': 'resolution_date',
      'Resolved By': 'resolved_by'
    };

    const jsonField = fieldMappings[fieldName];
    if (!jsonField) {
      this.logWarning(`Unknown field '${fieldName}' in ${id}`);
      return;
    }

    // Handle special field types
    if (jsonField === 'impacted_flows') {
      suppression[jsonField] = fieldValue.split(',').map(s => s.trim());
    } else if (['introduced_on', 'expiry', 'last_reviewed', 'resolution_date'].includes(jsonField)) {
      suppression[jsonField] = this.parseDate(fieldValue, jsonField, id);
    } else if (jsonField === 'severity') {
      suppression[jsonField] = fieldValue.toLowerCase();
    } else if (jsonField === 'issue_link') {
      if (!this.isValidUrl(fieldValue)) {
        this.logError(`Invalid URL for ${jsonField} in ${id}: ${fieldValue}`);
      }
      suppression[jsonField] = fieldValue;
    } else {
      suppression[jsonField] = fieldValue;
    }
  }

  /**
   * Validate a parsed suppression
   */
  validateSuppression(suppression, id, filePath) {
    const requiredFields = ['id', 'status', 'severity', 'rule_id', 'scope', 'owner', 'rationale'];
    
    for (const field of requiredFields) {
      if (!suppression[field]) {
        this.logError(`Missing required field '${field}' in ${id} (${filePath})`);
      }
    }

    // Type-specific validations
    if (suppression.type === 'security' && !suppression.tool) {
      this.logError(`Security suppression ${id} missing required 'tool' field`);
    }
    
    if (suppression.type === 'review' && !suppression.lane) {
      this.logError(`Review suppression ${id} missing required 'lane' field`);
    }

    if (suppression.type === 'ui') {
      if (!suppression.category) {
        this.logError(`UI suppression ${id} missing required 'category' field`);
      }
      if (!suppression.impacted_flows) {
        this.logError(`UI suppression ${id} missing required 'impacted_flows' field`);
      }
    }

    // Expiry validation
    if (suppression.status === 'active' && !suppression.expiry) {
      this.logError(`Active suppression ${id} missing expiry date`);
    }

    // Expiry date validation
    if (suppression.expiry) {
      const expiryDate = new Date(suppression.expiry);
      const now = new Date();
      
      if (expiryDate < now) {
        this.logWarning(`Suppression ${id} has expired (${suppression.expiry})`);
      }
      
      // Check maximum expiry limits
      const introduced = new Date(suppression.introduced_on);
      const daysDiff = Math.ceil((expiryDate - introduced) / (1000 * 60 * 60 * 24));
      const maxDays = this.getMaxExpiryDays(suppression.type, suppression.severity);
      
      if (daysDiff > maxDays) {
        this.logWarning(`Suppression ${id} expiry exceeds maximum of ${maxDays} days (${daysDiff} days)`);
      }
    }
  }

  /**
   * Get maximum expiry days based on type and severity
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
   * Infer suppression type from ID prefix
   */
  inferTypeFromId(id) {
    if (id.startsWith('SEC-')) return 'security';
    if (id.startsWith('REV-')) return 'review'; 
    if (id.startsWith('UI-')) return 'ui';
    throw new Error(`Cannot infer type from ID: ${id}`);
  }

  /**
   * Parse date string to ISO format
   */
  parseDate(dateStr, fieldName, id) {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
    } catch (error) {
      this.logError(`Invalid date '${dateStr}' for ${fieldName} in ${id}`);
      return dateStr;
    }
  }

  /**
   * Validate URL format
   */
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Log error (blocks in strict mode, warns in permissive mode)
   */
  logError(message) {
    this.errors.push(message);
    if (this.strict) {
      console.error(`ERROR: ${message}`);
    } else {
      console.warn(`ERROR (ignored): ${message}`);
    }
  }

  /**
   * Log warning
   */
  logWarning(message) {
    this.warnings.push(message);
    console.warn(`WARNING: ${message}`);
  }

  /**
   * Check if parsing should fail
   */
  shouldFail() {
    return this.strict && this.errors.length > 0;
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    strict: !args.includes('--strict=false')
  };

  const parser = new SuppressionsParser(options);
  
  parser.parseAll()
    .then(result => {
      console.log(`\nParsing complete:`);
      console.log(`- Files processed: ${result.files_processed}`);
      console.log(`- Total suppressions: ${result.total_suppressions}`);
      console.log(`- Errors: ${result.errors.length}`);
      console.log(`- Warnings: ${result.warnings.length}`);
      
      if (parser.shouldFail()) {
        console.error('\nParsing failed due to errors in strict mode');
        process.exit(1);
      } else {
        console.log('\nParsing succeeded');
        process.exit(0);
      }
    })
    .catch(error => {
      console.error('Fatal error during parsing:', error);
      process.exit(1);
    });
}

module.exports = SuppressionsParser;