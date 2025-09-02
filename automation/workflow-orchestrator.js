#!/usr/bin/env node

/**
 * Workflow Orchestrator for Complete AI Tool Addition Pipeline
 * 
 * Orchestrates the complete workflow:
 * 1. Discovery → 2. Enrichment → 3. Validation → 4. Staging → 5. Publishing
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const AutomatedToolAddition = require('./automated-tool-addition');
const BulkToolProcessor = require('./bulk-tool-processor');

class WorkflowOrchestrator {
  constructor() {
    this.processor = new BulkToolProcessor();
    this.automation = new AutomatedToolAddition();
    this.workflowId = `workflow-${Date.now()}`;
    this.outputDir = path.join(__dirname, '../data/workflows', this.workflowId);
    
    // Create workflow directory
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Parse CSV file to JSON format
   */
  async parseCSVFile(csvFilePath) {
    return new Promise((resolve, reject) => {
      const tools = [];
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          tools.push({
            name: row.name,
            description: row.description,
            website: row.website,
            developer: row.developer,
            discovered_at: new Date().toISOString()
          });
        })
        .on('end', () => {
          resolve(tools);
        })
        .on('error', reject);
    });
  }

  /**
   * Complete end-to-end workflow
   */
  async runCompleteWorkflow(options = {}) {
    const {
      sourceType = 'discover', // 'discover', 'csv', 'json'
      sourceFile = null,
      batchSize = 20,
      autoPublish = false,
      skipValidation = false
    } = options;

    console.log(`🚀 Starting complete AI tool addition workflow`);
    console.log(`📊 Workflow ID: ${this.workflowId}`);
    console.log(`📁 Output directory: ${this.outputDir}`);
    
    try {
      // Step 1: Source tools
      let rawTools;
      if (sourceType === 'discover') {
        const rawToolsFile = await this.processor.discoverNewTools();
        rawTools = JSON.parse(fs.readFileSync(rawToolsFile, 'utf8'));
      } else if (sourceType === 'csv') {
        console.log(`📄 Step 1: Parsing CSV file...`);
        rawTools = await this.parseCSVFile(sourceFile);
      } else {
        const rawToolsData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
        rawTools = rawToolsData.full_data || rawToolsData;
      }

      // Step 2: Enrich tools
      console.log(`\n🤖 Step 2: Enriching tool data...`);
      const enrichedTools = await this.processor.enrichToolData(rawTools);
      
      const enrichedFile = path.join(this.outputDir, 'enriched-tools.json');
      fs.writeFileSync(enrichedFile, JSON.stringify(enrichedTools, null, 2));
      console.log(`💾 Saved enriched tools: ${enrichedFile}`);

      // Step 3: Quality validation
      if (!skipValidation) {
        console.log(`\n🔍 Step 3: Quality control validation...`);
        const qualityPassed = this.processor.validateBatchQuality(enrichedTools);
        
        if (!qualityPassed) {
          console.log(`❌ Quality control failed. Please review issues and re-run.`);
          return false;
        }
      }

      // Step 4: Stage for review
      console.log(`\n📋 Step 4: Staging tools for review...`);
      const stagingFile = this.processor.stageForReview(enrichedTools);
      
      // Copy staging file to workflow directory
      const workflowStagingFile = path.join(this.outputDir, 'staging-summary.json');
      fs.copyFileSync(stagingFile, workflowStagingFile);

      // Step 5: Publish (if auto-publish enabled)
      if (autoPublish) {
        console.log(`\n🚀 Step 5: Publishing tools...`);
        await this.automation.processTools('json', enrichedFile, {
          batchSize,
          dryRun: false
        });
      } else {
        console.log(`\n⏸️  Step 5: Ready for manual review and publishing`);
        console.log(`   Run: node automation/automated-tool-addition.js --source json --file ${enrichedFile}`);
      }

      // Generate workflow summary
      this.generateWorkflowSummary(enrichedTools, {
        sourceType,
        sourceFile: sourceFile,
        enrichedFile,
        stagingFile: workflowStagingFile,
        autoPublish
      });

      return true;

    } catch (error) {
      console.error(`❌ Workflow failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Generate workflow summary report
   */
  generateWorkflowSummary(tools, metadata) {
    const summary = {
      workflow_id: this.workflowId,
      timestamp: new Date().toISOString(),
      metadata,
      statistics: {
        total_tools: tools.length,
        categories: this.getCategoryCounts(tools),
        avg_rating: (tools.reduce((sum, t) => sum + (t.rating || 0), 0) / tools.length).toFixed(2),
        pricing_distribution: this.getPricingDistribution(tools)
      },
      tools_summary: tools.map(t => ({
        name: t.name,
        category: t.category,
        rating: t.rating,
        starting_price: t.pricing?.[0]?.price_per_month || 0
      })),
      next_steps: [
        'Review staging summary in data/staging/',
        'Run quality checks on generated components',
        'Test build: npm run build',
        'Publish to production when ready'
      ]
    };

    const summaryFile = path.join(this.outputDir, 'workflow-summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    
    console.log(`\n📊 === WORKFLOW SUMMARY ===`);
    console.log(`🆔 Workflow ID: ${this.workflowId}`);
    console.log(`📊 Tools processed: ${tools.length}`);
    console.log(`📂 Categories: ${Object.keys(summary.statistics.categories).length}`);
    console.log(`⭐ Average rating: ${summary.statistics.avg_rating}/5`);
    console.log(`💰 Free tools: ${summary.statistics.pricing_distribution.free}`);
    console.log(`💰 Paid tools: ${summary.statistics.pricing_distribution.paid}`);
    console.log(`📄 Summary saved: ${summaryFile}`);
    
    return summary;
  }

  /**
   * Get category distribution
   */
  getCategoryCounts(tools) {
    const counts = {};
    tools.forEach(tool => {
      const cat = tool.category || 'Unknown';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }

  /**
   * Get pricing distribution
   */
  getPricingDistribution(tools) {
    let free = 0;
    let paid = 0;
    
    tools.forEach(tool => {
      const hasFreePlan = tool.pricing?.some(p => p.price_per_month === 0);
      if (hasFreePlan) {
        free++;
      } else {
        paid++;
      }
    });

    return { free, paid };
  }

  /**
   * Quick add single tool (simplified interface)
   */
  async quickAddTool(toolData) {
    console.log(`⚡ Quick add: ${toolData.name}`);
    
    const enriched = await this.processor.enrichSingleTool(toolData);
    const transformed = this.automation.transformToSiteOptzFormat(enriched);
    
    // Check for duplicates
    const duplicates = this.automation.detectDuplicates(transformed);
    if (duplicates.length > 0) {
      console.log(`❌ Duplicate detected: ${duplicates.map(d => d.type).join(', ')}`);
      return false;
    }

    // Validate
    const validation = this.automation.validateTool(transformed);
    if (!validation.isValid) {
      console.log(`❌ Validation failed: ${validation.errors.join(', ')}`);
      return false;
    }

    // Add to database
    this.automation.existingTools.push(transformed);
    this.automation.saveToolsData();
    
    // Generate production component
    await this.automation.generateProductionComponent(transformed);
    
    console.log(`✅ Successfully added: ${toolData.name}`);
    return true;
  }
}

// CLI Interface
async function main() {
  const orchestrator = new WorkflowOrchestrator();
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🎼 Workflow Orchestrator - Complete AI Tool Addition Pipeline

Commands:
  complete [options]     Run complete discovery → enrichment → staging → publishing workflow
  quick-add             Add single tool with interactive prompts
  
Complete Workflow Options:
  --source <type>       Source type: discover, csv, json (default: discover)
  --file <path>         Source file path (required for csv/json)
  --batch-size <n>      Processing batch size (default: 20)
  --auto-publish        Automatically publish after validation (default: false)
  --skip-validation     Skip quality control validation (default: false)

Examples:
  # Complete discovery workflow
  node automation/workflow-orchestrator.js complete

  # Process existing CSV file
  node automation/workflow-orchestrator.js complete --source csv --file data/new-tools.csv

  # Auto-publish after validation
  node automation/workflow-orchestrator.js complete --source json --file data/tools.json --auto-publish

  # Quick add single tool
  node automation/workflow-orchestrator.js quick-add
    `);
    return;
  }

  const command = args[0];
  
  switch (command) {
    case 'complete':
      const options = {
        sourceType: args.includes('--source') ? args[args.indexOf('--source') + 1] : 'discover',
        sourceFile: args.includes('--file') ? args[args.indexOf('--file') + 1] : null,
        batchSize: args.includes('--batch-size') ? parseInt(args[args.indexOf('--batch-size') + 1]) : 20,
        autoPublish: args.includes('--auto-publish'),
        skipValidation: args.includes('--skip-validation')
      };
      
      const success = await orchestrator.runCompleteWorkflow(options);
      process.exit(success ? 0 : 1);
      break;
      
    case 'quick-add':
      // Interactive tool addition
      console.log(`⚡ Quick Tool Addition`);
      console.log(`Enter tool information (press Ctrl+C to cancel):`);
      
      // In a real implementation, this would use readline for interactive input
      // For now, show example
      const exampleTool = {
        name: 'Example AI Tool',
        description: 'AI-powered solution for business automation and workflow optimization',
        website: 'https://example-ai-tool.com',
        developer: 'Example Corp'
      };
      
      console.log(`📝 Example tool data:`);
      console.log(JSON.stringify(exampleTool, null, 2));
      console.log(`\n💡 To add this tool, create a JSON file and use:`);
      console.log(`node automation/automated-tool-addition.js --source json --file your-tool.json`);
      break;
      
    default:
      console.log(`❌ Unknown command: ${command}`);
      console.log(`Use --help for usage information`);
      process.exit(1);
  }
}

module.exports = WorkflowOrchestrator;

// Execute CLI if run directly
if (require.main === module) {
  main().catch(error => {
    console.error('Workflow failed:', error);
    process.exit(1);
  });
}