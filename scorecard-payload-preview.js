// AI Compliance Readiness Scorecard - Lead Payload Preview
// This shows the payload structure for email capture submission

// Company Size options for dropdown
const COMPANY_SIZE_OPTIONS = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1,000 employees' },
  { value: '1000+', label: '1,000+ employees' }
];

// Role options for dropdown  
const ROLE_OPTIONS = [
  { value: 'founder', label: 'Founder/CEO' },
  { value: 'cto', label: 'CTO/Technical Lead' },
  { value: 'operations', label: 'Operations/COO' },
  { value: 'legal', label: 'Legal/Compliance' },
  { value: 'product', label: 'Product Manager' },
  { value: 'engineering', label: 'Engineering Manager' },
  { value: 'other', label: 'Other' }
];

// Sample form data that user submits
const sampleFormData = {
  email: 'john@acmecorp.com',
  company: 'Acme Corp',
  role: 'founder',
  companySize: '11-50'
};

// Sample scorecard results from previous phase
const sampleResults = {
  score: {
    total: 42,
    maxPossible: 100,
    percentage: 42
  },
  band: {
    band: 'Foundational Gaps',
    color: 'yellow',
    emoji: '🟡',
    description: 'You have the basics in place but significant gaps remain...',
    priority: 'Build the audit packet',
    recommendedAction: 'Download the Founder\'s Guide + Inventory Template'
  },
  gaps: [
    {
      category: 'Vendor Due Diligence',
      score: 0,
      maxScore: 10,
      risk: 'Unvetted vendors can expose customer data or fail audit requirements',
      fix: 'Create vendor security questionnaire, audit existing providers, require DPAs',
      resource: 'Starter tier includes vendor review checklist templates'
    },
    {
      category: 'AI Acceptable Use Policy',
      score: 0,
      maxScore: 10,
      risk: 'No policy means no protection against IP leakage or inappropriate AI use',
      fix: 'Draft policy covering approved tools, prohibited uses, data handling rules',
      resource: 'Starter tier includes copy-paste AI policy templates'
    },
    {
      category: 'Customer & Contractual Obligations',
      score: 0,
      maxScore: 10,
      risk: 'Breach of AI contractual commitments can trigger customer churn and legal exposure',
      fix: 'Audit all customer contracts for AI clauses, implement controls to honor commitments',
      resource: 'Enterprise tier includes contract review and compliance tracking'
    }
  ],
  benchmark: {
    averageScore: 42,
    userScore: 42,
    percentile: 42
  }
};

// Complete payload to /api/email-capture endpoint
const scorecardLeadPayload = {
  // Standard email capture fields
  email: sampleFormData.email,
  tool: 'AI Compliance Readiness Scorecard',
  source: 'scorecard-completion',
  
  // Scorecard-specific fields in additionalData
  additionalData: {
    // Form data from email capture screen
    company: sampleFormData.company,
    role: sampleFormData.role,
    companySize: sampleFormData.companySize,
    
    // Scorecard results for CRM tagging and lead scoring
    scorecardResults: {
      totalScore: sampleResults.score.total,
      scoreBand: sampleResults.band.band,
      scoreBandEmoji: sampleResults.band.emoji,
      scorePercentage: sampleResults.score.percentage,
      
      // Individual question scores for detailed analysis
      questionScores: {
        q1: 3,  // AI Tool Inventory
        q2: 7,  // Data Sensitivity Mapping  
        q3: 0,  // Vendor Due Diligence
        q4: 0,  // AI Acceptable Use Policy
        q5: 3,  // Regulatory Classification
        q6: 7,  // Risk Register
        q7: 0,  // Customer & Contractual Obligations
        q8: 3,  // Team Training
        q9: 0,  // Incident Response
        q10: 7  // Executive Ownership
      },
      
      // Top 3 gaps for targeted follow-up
      topGaps: sampleResults.gaps.map(gap => ({
        category: gap.category,
        score: gap.score,
        priority: gap.score === 0 ? 'critical' : gap.score <= 3 ? 'high' : 'medium'
      })),
      
      // Historical record for analytics only (not for automation)
      recommendedActionAtSubmission: sampleResults.band.recommendedAction,
      
      // Completion metadata
      completedAt: new Date().toISOString(),
      sessionDuration: '5m 23s', // Could track time from start to submit
      pageSource: 'scorecard-standalone' // vs 'governance-page-cta' etc
    },
    
    // Additional context for lead qualification
    leadQualifiers: {
      // Single tier classification (buyer-neutral terminology)
      qualificationTier: sampleResults.score.total <= 30 ? 'critical' : 
                        sampleResults.score.total <= 60 ? 'foundational_gaps' : 
                        sampleResults.score.total <= 85 ? 'mostly_ready' : 
                        'audit_ready',
      
      // Intent signals (derived from inputs, not stored recommendation)
      // These should be computed dynamically by marketing automation
      
      // Company context
      companyStage: sampleFormData.companySize,
      decisionMakerLevel: ['founder', 'cto', 'operations'].includes(sampleFormData.role) ? 'high' : 'medium'
    }
  }
};

// GoHighLevel tags that will be generated based on this payload
const expectedGHLTags = [
  'New Lead',                           // Triggers automation
  'AI Compliance Scorecard',            // Source tracking
  'Score: 42/100',                      // Quick reference
  'Band: Foundational Gaps 🟡',        // Visual status
  'Company: 11-50 employees',           // Segmentation
  'Role: Founder/CEO',                  // Decision maker level
  'Top Gap: Vendor Due Diligence',     // Primary pain point
  'Recommended: Founder\'s Guide',      // Next best action
  'Completed: January 2026',           // Timing
  'Priority: Build audit packet'        // Band priority
];

// Custom fields that could be set in GoHighLevel  
const expectedCustomFields = [
  { name: 'AI_Scorecard_Total', value: 42 },
  { name: 'AI_Scorecard_Band', value: 'Foundational Gaps' },
  { name: 'AI_Scorecard_Date', value: '2026-01-11' },
  { name: 'Top_AI_Gap_1', value: 'Vendor Due Diligence' },
  { name: 'Top_AI_Gap_2', value: 'AI Acceptable Use Policy' },
  { name: 'Top_AI_Gap_3', value: 'Customer & Contractual Obligations' },
  { name: 'Company_Size_Range', value: '11-50' },
  { name: 'Decision_Maker_Level', value: 'high' },
  { name: 'Qualification_Tier', value: 'foundational_gaps' }
];

console.log('=== SCORECARD LEAD PAYLOAD PREVIEW ===\n');

console.log('1. PAYLOAD TO /api/email-capture:');
console.log(JSON.stringify(scorecardLeadPayload, null, 2));

console.log('\n2. EXPECTED GHL TAGS:');
expectedGHLTags.forEach(tag => console.log(`  - ${tag}`));

console.log('\n3. SUGGESTED CUSTOM FIELDS:');
expectedCustomFields.forEach(field => console.log(`  - ${field.name}: ${field.value}`));

console.log('\n4. PAYLOAD STRUCTURE SUMMARY:');
console.log('✅ email: Standard field for contact creation');
console.log('✅ tool: "AI Compliance Readiness Scorecard"');  
console.log('✅ source: "scorecard-completion" for tracking');
console.log('✅ additionalData.company: For company name');
console.log('✅ additionalData.role: For decision maker assessment');
console.log('✅ additionalData.companySize: For market segmentation');
console.log('✅ additionalData.scorecardResults: Complete scoring data');
console.log('✅ additionalData.leadQualifiers: Sales intelligence');

console.log('\n5. LEAD SCORING IMPLICATIONS:');
console.log(`Total Score: ${sampleResults.score.total}/100 = ${sampleResults.band.band}`);
const qualificationTier = sampleResults.score.total <= 30 ? 'critical' : 
                          sampleResults.score.total <= 60 ? 'foundational_gaps' : 
                          sampleResults.score.total <= 85 ? 'mostly_ready' : 
                          'audit_ready';
console.log(`Qualification Tier: ${qualificationTier}`);
console.log(`Decision Maker Level: ${['founder', 'cto', 'operations'].includes(sampleFormData.role) ? 'High' : 'Medium'}`);
console.log(`Company Stage: ${sampleFormData.companySize} employees`);

console.log('\n6. DYNAMIC RECOMMENDATION LOGIC:');
console.log('Marketing/Sales should derive recommendations from:');
console.log('  • totalScore + scoreBand = urgency level');
console.log('  • role + companySize = buying authority');
console.log('  • topGaps = pain points to address');
console.log('  • questionScores = detailed conversation starters');
console.log('  • leadQualifiers = automated workflow triggers');
console.log('');
console.log('Historical recommendedActionAtSubmission included for analytics only.');

module.exports = {
  COMPANY_SIZE_OPTIONS,
  ROLE_OPTIONS,
  scorecardLeadPayload
};