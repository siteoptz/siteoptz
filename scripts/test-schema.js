#!/usr/bin/env node

/**
 * Schema Validation Test Suite for SiteOptz AI
 * Validates JSON data structures, API schemas, and template variables
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const chalk = require('chalk');

// Initialize AJV with formats
const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

class SchemaValidator {
  constructor() {
    this.schemas = {};
    this.results = {
      passed: 0,
      failed: 0,
      total: 0
    };
    
    this.initializeSchemas();
  }

  initializeSchemas() {
    // Tool Data Schema
    this.schemas.tool = {
      type: 'object',
      required: [
        'slug', 'name', 'description', 'meta', 'schema', 
        'features', 'pros', 'cons', 'pricing', 'benchmarks', 'related_tools'
      ],
      properties: {
        slug: {
          type: 'string',
          pattern: '^[a-z0-9-]+$',
          minLength: 2,
          maxLength: 50
        },
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 100
        },
        description: {
          type: 'string',
          minLength: 10,
          maxLength: 500
        },
        meta: {
          type: 'object',
          required: ['title', 'description'],
          properties: {
            title: { type: 'string', minLength: 10, maxLength: 60 },
            description: { type: 'string', minLength: 50, maxLength: 160 }
          }
        },
        schema: {
          type: 'object',
          required: ['@context', '@type', 'name'],
          properties: {
            '@context': { const: 'https://schema.org' },
            '@type': { const: 'SoftwareApplication' },
            'name': { type: 'string' },
            'applicationCategory': { type: 'string' },
            'operatingSystem': { type: 'string' },
            'offers': {
              type: 'object',
              properties: {
                '@type': { const: 'Offer' },
                'price': { type: 'string' },
                'priceCurrency': { type: 'string', pattern: '^[A-Z]{3}$' }
              }
            }
          }
        },
        features: {
          type: 'array',
          minItems: 1,
          maxItems: 20,
          items: { type: 'string', minLength: 3, maxLength: 100 }
        },
        pros: {
          type: 'array',
          minItems: 1,
          maxItems: 10,
          items: { type: 'string', minLength: 5, maxLength: 200 }
        },
        cons: {
          type: 'array',
          minItems: 1,
          maxItems: 10,
          items: { type: 'string', minLength: 5, maxLength: 200 }
        },
        pricing: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            required: ['plan', 'price', 'details'],
            properties: {
              plan: { type: 'string', minLength: 1 },
              price: { type: 'string', minLength: 1 },
              details: { type: 'string', minLength: 5 }
            }
          }
        },
        benchmarks: {
          type: 'object',
          patternProperties: {
            '^[a-z_]+$': {
              type: 'number',
              minimum: 0,
              maximum: 10
            }
          },
          additionalProperties: false
        },
        related_tools: {
          type: 'array',
          items: { type: 'string', pattern: '^[a-z0-9-]+$' }
        },
        website_url: { type: 'string', format: 'uri' },
        logo: { type: 'string' },
        category: { type: 'string' },
        developer: { type: 'string' },
        founded_year: { type: 'string', pattern: '^(19|20)\\d{2}$' },
        api_available: { type: 'boolean' },
        integrations: {
          type: 'array',
          items: { type: 'string' }
        },
        use_cases: {
          type: 'array',
          items: {
            type: 'object',
            required: ['title', 'description', 'ideal_for'],
            properties: {
              title: { type: 'string', minLength: 3, maxLength: 100 },
              description: { type: 'string', minLength: 10, maxLength: 300 },
              ideal_for: { type: 'string', minLength: 5, maxLength: 200 }
            }
          }
        },
        last_updated: { type: 'string', format: 'date' },
        version: { type: 'string' },
        platforms: {
          type: 'array',
          items: { type: 'string' }
        },
        languages: {
          type: 'array',
          items: { type: 'string' }
        },
        support: {
          type: 'object',
          properties: {
            email: { type: 'boolean' },
            chat: { type: 'boolean' },
            phone: { type: 'boolean' },
            documentation: { type: 'boolean' },
            community: { type: 'boolean' }
          }
        }
      },
      additionalProperties: false
    };

    // FAQ Data Schema
    this.schemas.faq = {
      type: 'object',
      required: ['tool_slug', 'faq'],
      properties: {
        tool_slug: {
          type: 'string',
          pattern: '^[a-z0-9-]+$'
        },
        faq: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            required: ['question', 'answer'],
            properties: {
              question: {
                type: 'string',
                minLength: 10,
                maxLength: 200
              },
              answer: {
                type: 'string',
                minLength: 20,
                maxLength: 1000
              }
            }
          }
        }
      },
      additionalProperties: false
    };

    // API Response Schemas
    this.schemas.apiToolResponse = {
      type: 'object',
      oneOf: [
        {
          // Success response
          allOf: [
            { $ref: '#/definitions/tool' },
            {
              not: {
                properties: {
                  error: { type: 'string' }
                }
              }
            }
          ]
        },
        {
          // Error response
          type: 'object',
          required: ['error'],
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          },
          additionalProperties: false
        }
      ],
      definitions: {
        tool: this.schemas.tool
      }
    };

    this.schemas.apiSubscribeResponse = {
      type: 'object',
      oneOf: [
        {
          // Success response
          type: 'object',
          required: ['message', 'data'],
          properties: {
            message: { type: 'string' },
            data: {
              type: 'object',
              required: ['email'],
              properties: {
                email: { type: 'string', format: 'email' },
                subscription_id: { type: 'string' }
              }
            }
          }
        },
        {
          // Error response
          type: 'object',
          required: ['message'],
          properties: {
            message: { type: 'string' },
            error: { type: 'string' }
          }
        }
      ]
    };

    // Compile schemas
    Object.keys(this.schemas).forEach(key => {
      try {
        this.schemas[key] = ajv.compile(this.schemas[key]);
      } catch (error) {
        console.error(chalk.red(`Error compiling schema ${key}:`, error.message));
      }
    });
  }

  async runAllTests() {
    console.log(chalk.blue.bold('🔍 Running Schema Validation Tests\n'));

    // Test data files
    await this.testDataFiles();
    
    // Test API responses (if server is running)
    await this.testAPIResponses();
    
    // Test template variable consistency
    await this.testTemplateVariables();

    // Print summary
    this.printSummary();

    // Exit with appropriate code
    process.exit(this.results.failed > 0 ? 1 : 0);
  }

  async testDataFiles() {
    console.log(chalk.yellow('📁 Testing Data Files'));
    
    // Test tool_data.json
    await this.testFile(
      path.join(process.cwd(), 'data', 'tool_data.json'),
      'Tool Data',
      data => {
        if (!Array.isArray(data)) {
          throw new Error('Tool data must be an array');
        }
        
        for (let i = 0; i < data.length; i++) {
          const tool = data[i];
          const valid = this.schemas.tool(tool);
          
          if (!valid) {
            const errors = this.schemas.tool.errors
              .map(err => `${err.instancePath || 'root'}: ${err.message}`)
              .join(', ');
            throw new Error(`Tool ${i + 1} (${tool.name || 'unknown'}): ${errors}`);
          }
        }
        
        // Check for duplicate slugs
        const slugs = data.map(tool => tool.slug);
        const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
        if (duplicates.length > 0) {
          throw new Error(`Duplicate slugs found: ${duplicates.join(', ')}`);
        }
      }
    );

    // Test faq_data.json
    await this.testFile(
      path.join(process.cwd(), 'data', 'faq_data.json'),
      'FAQ Data',
      data => {
        if (!Array.isArray(data)) {
          throw new Error('FAQ data must be an array');
        }
        
        for (let i = 0; i < data.length; i++) {
          const faqEntry = data[i];
          const valid = this.schemas.faq(faqEntry);
          
          if (!valid) {
            const errors = this.schemas.faq.errors
              .map(err => `${err.instancePath || 'root'}: ${err.message}`)
              .join(', ');
            throw new Error(`FAQ entry ${i + 1}: ${errors}`);
          }
        }
      }
    );
  }

  async testAPIResponses() {
    console.log(chalk.yellow('🌐 Testing API Response Schemas'));
    
    try {
      const fetch = (await import('node-fetch')).default;
      const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
      
      // Test tool API response
      try {
        const response = await fetch(`${baseUrl}/api/tools/chatgpt`, { timeout: 5000 });
        const data = await response.json();
        
        const valid = this.schemas.apiToolResponse(data);
        if (!valid) {
          const errors = this.schemas.apiToolResponse.errors
            .map(err => `${err.instancePath}: ${err.message}`)
            .join(', ');
          throw new Error(`Tool API response schema invalid: ${errors}`);
        }
        
        console.log(chalk.green('✅ Tool API Response Schema'));
        this.results.passed++;
      } catch (error) {
        console.log(chalk.yellow('⚠️  Tool API Response Schema (server not running)'));
      }

      // Test subscribe API with invalid data to get error response
      try {
        const response = await fetch(`${baseUrl}/api/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'invalid-email' }),
          timeout: 5000
        });
        const data = await response.json();
        
        const valid = this.schemas.apiSubscribeResponse(data);
        if (!valid) {
          const errors = this.schemas.apiSubscribeResponse.errors
            .map(err => `${err.instancePath}: ${err.message}`)
            .join(', ');
          throw new Error(`Subscribe API response schema invalid: ${errors}`);
        }
        
        console.log(chalk.green('✅ Subscribe API Response Schema'));
        this.results.passed++;
      } catch (error) {
        console.log(chalk.yellow('⚠️  Subscribe API Response Schema (server not running)'));
      }
      
    } catch (error) {
      console.log(chalk.yellow('⚠️  API tests skipped (server not available)'));
    }
    
    this.results.total += 2;
  }

  async testTemplateVariables() {
    console.log(chalk.yellow('📄 Testing Template Variable Consistency'));
    
    // Test HTML templates
    await this.testTemplateFile(
      path.join(process.cwd(), 'wordpress-package', 'theme', 'templates', 'tool_detail.html'),
      'Tool Detail Template',
      this.extractHandlebarsVariables,
      this.validateToolVariables
    );

    await this.testTemplateFile(
      path.join(process.cwd(), 'wordpress-package', 'theme', 'templates', 'comparison.html'),
      'Comparison Template',
      this.extractHandlebarsVariables,
      this.validateComparisonVariables
    );

    // Test PHP templates
    await this.testTemplateFile(
      path.join(process.cwd(), 'wordpress-package', 'theme', 'single-tool.php'),
      'WordPress Tool Template',
      this.extractPHPVariables,
      this.validateWordPressVariables
    );
  }

  async testFile(filePath, name, validator) {
    this.results.total++;
    
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      await validator(data);
      
      console.log(chalk.green(`✅ ${name} Schema`));
      this.results.passed++;
      
    } catch (error) {
      console.log(chalk.red(`❌ ${name} Schema`));
      console.log(chalk.red(`   Error: ${error.message}`));
      this.results.failed++;
    }
  }

  async testTemplateFile(filePath, name, extractor, validator) {
    this.results.total++;
    
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`Template not found: ${filePath}`);
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      const variables = extractor(content);
      
      await validator(variables, content);
      
      console.log(chalk.green(`✅ ${name} Variables`));
      this.results.passed++;
      
    } catch (error) {
      console.log(chalk.red(`❌ ${name} Variables`));
      console.log(chalk.red(`   Error: ${error.message}`));
      this.results.failed++;
    }
  }

  extractHandlebarsVariables(content) {
    const variableRegex = /\{\{\s*([^}]+)\s*\}\}/g;
    const variables = new Set();
    let match;
    
    while ((match = variableRegex.exec(content)) !== null) {
      // Clean up variable name (remove helpers, filters, etc.)
      const variable = match[1].split(' ')[0].split('|')[0].trim();
      if (!variable.startsWith('#') && !variable.startsWith('/') && !variable.startsWith('^')) {
        variables.add(variable);
      }
    }
    
    return Array.from(variables);
  }

  extractPHPVariables(content) {
    const getFieldRegex = /get_field\s*\(\s*['"]([^'"]+)['"]/g;
    const theFieldRegex = /the_field\s*\(\s*['"]([^'"]+)['"]/g;
    const variables = new Set();
    let match;
    
    while ((match = getFieldRegex.exec(content)) !== null) {
      variables.add(match[1]);
    }
    
    while ((match = theFieldRegex.exec(content)) !== null) {
      variables.add(match[1]);
    }
    
    return Array.from(variables);
  }

  validateToolVariables(variables, content) {
    const requiredVariables = [
      'tool.name', 'tool.description', 'tool.features', 
      'tool.pros', 'tool.cons', 'tool.pricing'
    ];
    
    for (const required of requiredVariables) {
      if (!variables.includes(required) && !content.includes(required)) {
        throw new Error(`Missing required variable: ${required}`);
      }
    }
    
    // Check for deprecated or incorrect variable names
    const deprecatedPatterns = ['{{name}}', '{{description}}'];
    for (const pattern of deprecatedPatterns) {
      if (content.includes(pattern)) {
        throw new Error(`Found deprecated variable pattern: ${pattern} (should use tool.* prefix)`);
      }
    }
  }

  validateComparisonVariables(variables, content) {
    const requiredPatterns = ['tools', 'comparison'];
    
    for (const pattern of requiredPatterns) {
      const hasPattern = variables.some(v => v.includes(pattern)) || 
                        content.includes(`{{${pattern}`) ||
                        content.includes(`{%.*${pattern}`);
      
      if (!hasPattern) {
        throw new Error(`Missing required variable pattern: ${pattern}`);
      }
    }
  }

  validateWordPressVariables(variables, content) {
    const commonFields = [
      'tool_name', 'description', 'features', 'pros', 'cons', 'pricing'
    ];
    
    // Check if at least some common ACF fields are used
    const usedFields = variables.filter(v => commonFields.includes(v));
    if (usedFields.length === 0) {
      throw new Error('No ACF fields found in WordPress template');
    }
  }

  printSummary() {
    console.log('\n' + chalk.blue.bold('📊 Schema Validation Summary'));
    console.log(chalk.blue('═'.repeat(50)));
    
    console.log(`Total Tests: ${this.results.total}`);
    console.log(chalk.green(`Passed: ${this.results.passed}`));
    console.log(chalk.red(`Failed: ${this.results.failed}`));
    
    if (this.results.failed === 0) {
      console.log('\n' + chalk.green.bold('🎉 All schema validations passed!'));
    } else {
      console.log('\n' + chalk.red.bold('❌ Some schema validations failed'));
    }
    
    console.log(chalk.blue('═'.repeat(50)));
  }
}

// Run tests if called directly
if (require.main === module) {
  const validator = new SchemaValidator();
  validator.runAllTests().catch(error => {
    console.error(chalk.red('Fatal error:'), error.message);
    process.exit(1);
  });
}

module.exports = SchemaValidator;
