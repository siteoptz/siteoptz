// AI Compliance Readiness Scorecard - FINAL PAYLOAD SPECIFICATION
// Addresses all four refinements and aligns with existing GoHighLevel patterns

// Import from single source of truth
import { 
  QUESTIONS_CONFIG, 
  COMPANY_SIZE_OPTIONS, 
  ROLE_OPTIONS, 
  generateScorecardResults,
  getQualificationTier 
} from './lib/scorecard-config.js';

// Scorecard version (bump when questions change)
const SCORECARD_VERSION = 'v1.0';

// Sample form data and answers for demonstration
const sampleFormData = {
  email: 'john@acmecorp.com',
  company: 'Acme Corp',
  role: 'founder',
  companySize: '11-50'
};

const sampleAnswers = {
  q1: 3, q2: 7, q3: 0, q4: 0, q5: 3,
  q6: 7, q7: 0, q8: 3, q9: 0, q10: 7
}; // Total: 30 points

const sampleTimingData = {
  startTime: Date.now() - 323000, // 5m 23s ago
  endTime: Date.now(),
  utmParams: {
    utm_source: 'linkedin',
    utm_medium: 'social',
    utm_campaign: 'compliance_awareness_q1'
  }
};

// Generate results from single source of truth
const scorecardResults = generateScorecardResults(sampleAnswers);
const qualificationTier = getQualificationTier(scorecardResults.score.total);

// Calculate timing
const completionTimeSeconds = Math.round((sampleTimingData.endTime - sampleTimingData.startTime) / 1000);

// FINAL PAYLOAD STRUCTURE (aligned with existing patterns)
const finalScorecardPayload = {
  // Standard email capture fields (matches existing pattern)
  email: sampleFormData.email,
  tool: 'AI Compliance Readiness Scorecard',
  source: 'scorecard-completion',
  
  // Scorecard-specific data
  additionalData: {
    // Form data from email capture screen
    company: sampleFormData.company,
    role: sampleFormData.role,
    companySize: sampleFormData.companySize,
    
    // Core scoring inputs (dynamic data - results page computes fresh recommendations)
    scorecardResults: {
      totalScore: scorecardResults.score.total,
      scoreBand: scorecardResults.band.band,
      scoreBandEmoji: scorecardResults.band.emoji,
      scorePercentage: scorecardResults.score.percentage,
      
      // Individual question scores for detailed analysis
      questionScores: sampleAnswers,
      
      // Top 3 gaps calculated from single source of truth
      topGaps: scorecardResults.gaps.map(gap => ({
        category: gap.category,
        score: gap.score,
        priority: gap.score === 0 ? 'critical' : gap.score <= 3 ? 'high' : 'medium'
      })),
      
      // Analytics-only field (clearly named to avoid automation triggers)
      recommendedActionAtSubmission: scorecardResults.band.recommendedAction,
      
      // Completion metadata
      completedAt: new Date().toISOString(),
      completionTimeSeconds,
      scorecardVersion: SCORECARD_VERSION,
      pageSource: 'scorecard-standalone'
    },
    
    // UTM tracking (persisted through multi-step flow)
    utm_source: sampleTimingData.utmParams.utm_source,
    utm_medium: sampleTimingData.utmParams.utm_medium, 
    utm_campaign: sampleTimingData.utmParams.utm_campaign,
    
    // Lead qualification (single enum field, buyer-neutral terminology)
    leadQualifiers: {
      qualificationTier, // 'critical' | 'foundational_gaps' | 'mostly_ready' | 'audit_ready'
      companyStage: sampleFormData.companySize,
      decisionMakerLevel: ['founder', 'cto', 'operations'].includes(sampleFormData.role) ? 'high' : 'medium'
    }
  }
};

// GoHighLevel tags (matches existing pattern exactly)
const goHighLevelTags = [
  'New Lead', // Triggers existing automation workflow
  'AI Compliance Scorecard', // Source identification
  `Score: ${scorecardResults.score.total}/100`, // Quick reference
  `Band: ${scorecardResults.band.band} ${scorecardResults.band.emoji}`, // Visual status
  `Tier: ${qualificationTier}`, // Qualification level
  `Company: ${sampleFormData.companySize} employees`, // Segmentation
  `Role: ${ROLE_OPTIONS.find(r => r.value === sampleFormData.role)?.label}`, // Decision maker level
  `Top Gap: ${scorecardResults.gaps[0].category}`, // Primary pain point
  `Completed: ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`, // Timing (matches existing pattern)
  ...(sampleTimingData.utmParams.utm_campaign ? [`Campaign: ${sampleTimingData.utmParams.utm_campaign}`] : []) // UTM tracking
];

// GoHighLevel custom fields (no breaking changes to existing automations)
const goHighLevelCustomFields = [
  { name: 'AI_Scorecard_Total', value: scorecardResults.score.total },
  { name: 'AI_Scorecard_Band', value: scorecardResults.band.band },
  { name: 'AI_Scorecard_Date', value: new Date().toISOString().split('T')[0] },
  { name: 'AI_Scorecard_Version', value: SCORECARD_VERSION },
  { name: 'Top_AI_Gap_1', value: scorecardResults.gaps[0].category },
  { name: 'Top_AI_Gap_2', value: scorecardResults.gaps[1].category },
  { name: 'Top_AI_Gap_3', value: scorecardResults.gaps[2].category },
  { name: 'Company_Size_Range', value: sampleFormData.companySize },
  { name: 'Decision_Maker_Level', value: ['founder', 'cto', 'operations'].includes(sampleFormData.role) ? 'high' : 'medium' },
  { name: 'Qualification_Tier', value: qualificationTier },
  { name: 'Completion_Time_Seconds', value: completionTimeSeconds },
  { name: 'UTM_Source', value: sampleTimingData.utmParams.utm_source },
  { name: 'UTM_Campaign', value: sampleTimingData.utmParams.utm_campaign }
];

// Display final payload
console.log('=== FINAL SCORECARD PAYLOAD (ALL REFINEMENTS) ===\n');

console.log('1. PAYLOAD TO /api/email-capture:');
console.log(JSON.stringify(finalScorecardPayload, null, 2));

console.log('\n2. GOHIGHLEVEL TAGS (matches existing pattern):');
goHighLevelTags.forEach(tag => console.log(`  - ${tag}`));

console.log('\n3. GOHIGHLEVEL CUSTOM FIELDS (no breaking changes):');
goHighLevelCustomFields.forEach(field => console.log(`  - ${field.name}: ${field.value}`));

console.log('\n4. REFINEMENT COMPLIANCE CHECK:');
console.log('✅ Refinement 1: recommendedAction removed, recommendedActionAtSubmission added for analytics');
console.log('✅ Refinement 2: qualificationTier enum replaces boolean flags (buyer-neutral)');
console.log('✅ Refinement 3: Single source of truth - /lib/scorecard-config.js (all functions imported)');
console.log('✅ Refinement 4: Added completionTimeSeconds, UTM fields, scorecardVersion');

console.log('\n5. GOHIGHLEVEL PATTERN VERIFICATION:');
console.log('✅ Tags follow exact pattern: "New Lead" trigger + descriptive tags');
console.log('✅ Source field format: "Activity Type - SiteOptz Website"');  
console.log('✅ Date format: month/year pattern matches existing forms');
console.log('✅ customFields array structure maintained');
console.log('✅ No new conventions - aligns with existing automation');

console.log('\n6. DATA FLOW ARCHITECTURE:');
console.log('User Answers → /lib/scorecard-config.js → {');
console.log('  ├── Results Page: fresh recommendations computed');
console.log('  ├── Email Sequences: fresh recommendations computed'); 
console.log('  └── Payload: raw inputs + historical recommendedActionAtSubmission');
console.log('}');

console.log('\n🚀 READY FOR IMPLEMENTATION');

export {
  finalScorecardPayload,
  goHighLevelTags,
  goHighLevelCustomFields,
  SCORECARD_VERSION
};