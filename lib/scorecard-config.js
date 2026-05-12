// AI Compliance Readiness Scorecard - Configuration & Logic
// SINGLE SOURCE OF TRUTH for questions, scoring, and gap analysis

// Questions configuration from markdown (docs/02_readiness_scorecard.md)
export const QUESTIONS_CONFIG = [
  {
    id: 'q1',
    category: 'AI Tool Inventory',
    question: 'Could you list every AI tool, model, and API your company uses today — including the ones individual employees signed up for?',
    options: [
      { value: 0, label: 'No — we genuinely don\'t know what\'s in use' },
      { value: 3, label: 'Roughly — we know the main ones, but shadow AI is a black box' },
      { value: 7, label: 'Yes for sanctioned tools — we have a list, updated occasionally' },
      { value: 10, label: 'Yes, comprehensively — auto-tracked, updated continuously, includes shadow AI' }
    ],
    gapRecommendation: {
      risk: 'Enterprise buyers can\'t assess your AI attack surface without an inventory',
      fix: 'Survey all employees about AI tools they use, audit billing records, create master spreadsheet',
      siteoptzResource: 'Pro tier includes automated discovery and inventory templates'
    }
  },
  {
    id: 'q2', 
    category: 'Data Sensitivity Mapping',
    question: 'Do you know which AI tools touch customer data, employee data, or other sensitive information?',
    options: [
      { value: 0, label: 'No — we haven\'t mapped this' },
      { value: 3, label: 'Some — we know our customer-facing AI features, but not internal use' },
      { value: 7, label: 'Mostly — we have a data flow diagram for sanctioned tools' },
      { value: 10, label: 'Yes — every tool is classified by data sensitivity and documented' }
    ],
    gapRecommendation: {
      risk: 'GDPR, HIPAA, and enterprise security reviews all require data flow mapping',
      fix: 'Map each AI tool to data types it processes, document in risk register',
      siteoptzResource: 'Pro tier includes data flow templates and classification guides'
    }
  },
  {
    id: 'q3',
    category: 'Vendor Due Diligence', 
    question: 'Before adopting a new AI vendor, do you review their SOC 2, data residency, sub-processors, and AI-specific terms?',
    options: [
      { value: 0, label: 'No — we sign up and start using' },
      { value: 3, label: 'Sometimes — for big purchases, not for individual seats' },
      { value: 7, label: 'Yes for new procurement, but legacy tools were never reviewed' },
      { value: 10, label: 'Yes for everything, with a formal vendor review checklist on file' }
    ],
    gapRecommendation: {
      risk: 'Unvetted vendors can expose customer data or fail audit requirements',
      fix: 'Create vendor security questionnaire, audit existing providers, require DPAs',
      siteoptzResource: 'Starter tier includes vendor review checklist templates'
    }
  },
  {
    id: 'q4',
    category: 'AI Acceptable Use Policy',
    question: 'Do you have a written AI acceptable use policy that employees have read and acknowledged?',
    options: [
      { value: 0, label: 'No policy exists' },
      { value: 3, label: 'Draft policy exists but isn\'t communicated or enforced' },
      { value: 7, label: 'Policy exists, employees know about it, but no formal acknowledgment' },
      { value: 10, label: 'Policy exists, every employee has signed it, refreshed annually' }
    ],
    gapRecommendation: {
      risk: 'No policy means no protection against IP leakage or inappropriate AI use',
      fix: 'Draft policy covering approved tools, prohibited uses, data handling rules',
      siteoptzResource: 'Starter tier includes copy-paste AI policy templates'
    }
  },
  {
    id: 'q5',
    category: 'Regulatory Classification',
    question: 'Have you classified your AI systems against the EU AI Act, NIST AI RMF, or other regulations that apply to your business?',
    options: [
      { value: 0, label: 'No — we haven\'t done this exercise' },
      { value: 3, label: 'We know roughly which regulations apply, but not which of our systems fall under each' },
      { value: 7, label: 'Partial mapping done — main systems classified, edge cases not' },
      { value: 10, label: 'Yes — every AI system is classified, documented, and reviewed quarterly' }
    ],
    gapRecommendation: {
      risk: 'EU AI Act fines up to 7% of global revenue; US regulations expanding rapidly',
      fix: 'Classify each AI system by risk level, document compliance requirements',
      siteoptzResource: 'Pro tier includes framework mapping and compliance tracking'
    }
  },
  {
    id: 'q6',
    category: 'Risk Register',
    question: 'If an enterprise buyer asked for your AI risk register today, could you produce it within 48 hours?',
    options: [
      { value: 0, label: 'No — we\'d have to build it from scratch' },
      { value: 3, label: 'We could pull something together, but it wouldn\'t be comprehensive' },
      { value: 7, label: 'Yes, we have one — but it\'s not current or formatted for external use' },
      { value: 10, label: 'Yes — current, comprehensive, and ready to share' }
    ],
    gapRecommendation: {
      risk: 'Enterprise deals stall when buyers can\'t assess your AI risk posture',
      fix: 'Create formal risk register documenting AI controls and mitigation measures', 
      siteoptzResource: 'Pro tier generates audit-ready risk registers automatically'
    }
  },
  {
    id: 'q7',
    category: 'Customer & Contractual Obligations',
    question: 'Have you reviewed your customer contracts and DPAs to identify AI-related commitments (e.g., "we will not train on your data")?',
    options: [
      { value: 0, label: 'No — we haven\'t audited contracts for AI clauses' },
      { value: 3, label: 'Aware in principle, but no systematic review' },
      { value: 7, label: 'Reviewed for top customers, not the long tail' },
      { value: 10, label: 'Complete contract review, with controls in place to honor each commitment' }
    ],
    gapRecommendation: {
      risk: 'Breach of AI contractual commitments can trigger customer churn and legal exposure',
      fix: 'Audit all customer contracts for AI clauses, implement controls to honor commitments',
      siteoptzResource: 'Enterprise tier includes contract review and compliance tracking'
    }
  },
  {
    id: 'q8',
    category: 'Team Training',
    question: 'Has your team received training on responsible AI use, data handling, and policy compliance in the last 12 months?',
    options: [
      { value: 0, label: 'No formal training' },
      { value: 3, label: 'Informal — shared a Slack message or a link to an article' },
      { value: 7, label: 'Yes, but only for technical staff or only at onboarding' },
      { value: 10, label: 'Yes — company-wide, refreshed annually, with completion tracked' }
    ],
    gapRecommendation: {
      risk: 'Untrained teams can inadvertently violate policies and expose sensitive data',
      fix: 'Implement company-wide AI training program with completion tracking',
      siteoptzResource: 'Pro tier includes training templates and tracking tools'
    }
  },
  {
    id: 'q9',
    category: 'Incident Response',
    question: 'Do you have a documented plan for what happens if an AI tool leaks data, produces a discriminatory output, or fails in production?',
    options: [
      { value: 0, label: 'No plan' },
      { value: 3, label: 'Generic incident response plan exists but no AI-specific procedures' },
      { value: 7, label: 'AI-specific plan drafted but never tested' },
      { value: 10, label: 'Plan exists, tested via tabletop exercises, with named owners' }
    ],
    gapRecommendation: {
      risk: 'AI incidents without response plans can escalate to PR crises and legal liability',
      fix: 'Create AI incident response playbook with escalation procedures and contact lists',
      siteoptzResource: 'Pro tier includes incident response templates and training'
    }
  },
  {
    id: 'q10',
    category: 'Executive Ownership',
    question: 'Is AI governance owned by a named executive with the authority to enforce policy and stop non-compliant deployments?',
    options: [
      { value: 0, label: 'No — it\'s nobody\'s job' },
      { value: 3, label: 'Distributed across founders/leadership informally' },
      { value: 7, label: 'Named owner, but limited authority or bandwidth' },
      { value: 10, label: 'Yes — named executive, board-level visibility, regular reporting' }
    ],
    gapRecommendation: {
      risk: 'No executive ownership means no accountability when things go wrong',
      fix: 'Assign AI governance to named executive with board reporting responsibility',
      siteoptzResource: 'Enterprise tier includes governance framework and executive dashboards'
    }
  }
];

// Form configuration
export const COMPANY_SIZE_OPTIONS = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1,000 employees' },
  { value: '1000+', label: '1,000+ employees' }
];

export const ROLE_OPTIONS = [
  { value: 'founder', label: 'Founder/CEO' },
  { value: 'cto', label: 'CTO/Technical Lead' },
  { value: 'operations', label: 'Operations/COO' },
  { value: 'legal', label: 'Legal/Compliance' },
  { value: 'product', label: 'Product Manager' },
  { value: 'engineering', label: 'Engineering Manager' },
  { value: 'other', label: 'Other' }
];

// Scoring functions
export function calculateScore(answers) {
  const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  return {
    total: totalScore,
    maxPossible: QUESTIONS_CONFIG.length * 10,
    percentage: Math.round((totalScore / (QUESTIONS_CONFIG.length * 10)) * 100)
  };
}

export function getScoreBand(totalScore) {
  if (totalScore <= 30) {
    return {
      band: 'Critical Risk',
      color: 'red',
      emoji: '🔴',
      description: 'Your AI stack is currently undocumented and unaccountable. Most enterprise procurement and Series A diligence would stop here. You need foundational work — an inventory, a policy, and an owner — in the next 30 days.',
      priority: 'Stop the bleeding',
      recommendedAction: 'Book a free AI risk strategy call'
    };
  } else if (totalScore <= 60) {
    return {
      band: 'Foundational Gaps',
      color: 'yellow', 
      emoji: '🟡',
      description: 'You have the basics in place but significant gaps remain. You\'d likely fail an enterprise AI questionnaire or a sophisticated VC\'s diligence. The good news: most of this is fixable in 60–90 days with the right templates and process.',
      priority: 'Build the audit packet',
      recommendedAction: 'Download the Founder\'s Guide + Inventory Template'
    };
  } else if (totalScore <= 85) {
    return {
      band: 'Mostly Ready',
      color: 'green',
      emoji: '🟢', 
      description: 'You have a real governance posture. You\'d pass most diligence, but specific frameworks (EU AI Act, ISO 42001) and edge cases (shadow AI, vendor sub-processors) are likely where you\'ll get challenged.',
      priority: 'Harden the edges',
      recommendedAction: 'Compare Pro vs. Enterprise tier'
    };
  } else {
    return {
      band: 'Audit-Ready',
      color: 'gold',
      emoji: '🏆',
      description: 'You\'re in the top 5% of companies your size. You\'re ready for enterprise deals, sophisticated diligence, and regulatory audits.',
      priority: 'Maintain — quarterly reviews and continuous monitoring',
      recommendedAction: 'Talk about Enterprise certification path'
    };
  }
}

export function getTopThreeGaps(answers) {
  // Create array of questions with their scores and IDs
  const questionScores = QUESTIONS_CONFIG.map(question => ({
    ...question,
    score: answers[question.id] || 0
  }));

  // Sort by score (lowest first) and take the top 3
  const lowestScoring = questionScores
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return lowestScoring.map(question => ({
    category: question.category,
    score: question.score,
    maxScore: 10,
    risk: question.gapRecommendation.risk,
    fix: question.gapRecommendation.fix,
    resource: question.gapRecommendation.siteoptzResource
  }));
}

export function getQualificationTier(totalScore) {
  if (totalScore <= 30) return 'critical';
  if (totalScore <= 60) return 'foundational_gaps'; 
  if (totalScore <= 85) return 'mostly_ready';
  return 'audit_ready';
}

// Main scoring function that combines everything
export function generateScorecardResults(answers) {
  const scoreData = calculateScore(answers);
  const scoreBand = getScoreBand(scoreData.total);
  const topGaps = getTopThreeGaps(answers);
  const qualificationTier = getQualificationTier(scoreData.total);

  return {
    score: scoreData,
    band: scoreBand, 
    gaps: topGaps,
    qualificationTier,
    // Benchmark data (could be dynamic based on company size in future)
    benchmark: {
      averageScore: 42,
      userScore: scoreData.total,
      percentile: Math.min(95, Math.max(5, Math.round((scoreData.total / 100) * 100)))
    }
  };
}