export type ScorecardBand =
  | 'Critical Risk'
  | 'Foundational Gaps'
  | 'Mostly Ready'
  | 'Audit-Ready';

export interface ScorecardGap {
  category: string;
  score: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface ScorecardData {
  score: number;
  band: ScorecardBand;
  completedAt: string | null;
  topGaps: ScorecardGap[];
}

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface AIToolEntry {
  id: string;            // generated client-side, stored in GHL
  name: string;
  vendor: 'OpenAI' | 'Anthropic' | 'Google' | 'AWS' | 'Other';
  sensitivity: 'Customer' | 'Internal' | 'Public' | 'Unknown';
  status: 'Active' | 'Reviewed' | 'Shadow';
}

export interface ComplianceState {
  checklistState: Record<string, boolean>;  // itemId -> completed
  aiTools: AIToolEntry[];
}

export interface ComplianceDocument {
  id: string;
  title: string;
  description: string;
  meta: string;            // short descriptor, e.g. "2 pages · editable"
  access: 'free' | 'locked';
  downloadUrl?: string;    // present only for free documents
}

export interface ComplianceProfile {
  email: string;
  hasScorecard: boolean;
  scorecardData: ScorecardData | null;
  checklistState: Record<string, boolean>;
  aiTools: AIToolEntry[];
}

export const SCORE_BANDS = {
  CRITICAL_RISK: 'Critical Risk' as const,
  FOUNDATIONAL_GAPS: 'Foundational Gaps' as const,
  MOSTLY_READY: 'Mostly Ready' as const,
  AUDIT_READY: 'Audit-Ready' as const,
} satisfies Record<string, ScorecardBand>;

// GHL custom field IDs — environment-specific to this GHL account.
// GHL returns customFields with opaque UUIDs in the 'id' property,
// not human-readable names. If these fields are recreated in GHL,
// the IDs change and these constants must be updated.
// To re-derive: hit /api/compliance/debug-contact while signed in
// as a user with completed scorecard data.
export const GHL_FIELD_IDS = {
  SCORECARD_PERCENTAGE: '2jNSoItwPya7aev34Wmg',
  SCORECARD_BAND: '6MTa9lHQC9OJk7xf6Gsu',
  SCORECARD_COMPLETED_AT: 'C2m9o4usV3ZljD0VY0hK',
  SCORECARD_TOP_GAPS: 'U4te8hlCjx2Fkf34p4tz',
  COMPLIANCE_CHECKLIST: 'rFxoGvPsvgR2XI7mU2JL',
  COMPLIANCE_AI_TOOLS: 'w6xkevytIHgTwE9sobCh',
} as const;

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 'doc_ai_tools', label: 'Document every AI tool touching customer data' },
  { id: 'draft_aup', label: 'Draft AI acceptable use policy (template ready in Documents)' },
  { id: 'assign_owner', label: 'Assign one owner for AI vendor security questions' },
  { id: 'identify_blockers', label: 'Identify your top 3 enterprise deal blockers' },
  { id: 'schedule_block', label: 'Schedule a 2-hour block this week to start the response' },
];

// Governance template library shown in the dashboard Documents section.
// Free documents are downloadable now; locked documents are previews that
// convert to the Starter plan. Source templates live in
// docs/governance-launch/templates/ — free copies are served from public/.
export const COMPLIANCE_DOCUMENTS: ComplianceDocument[] = [
  {
    id: 'aup',
    title: 'AI Acceptable Use Policy',
    description: 'A 2-page, fill-in-the-blank policy your team can adopt this week — approved tools, prohibited uses, data rules, and a signature block.',
    meta: 'Word doc · 2 pages · framework-mapped',
    access: 'free',
    downloadUrl: '/downloads/governance/ai-acceptable-use-policy.docx',
  },
  {
    id: 'vendor_checklist',
    title: 'AI Vendor Review Checklist',
    description: 'One page per vendor: SOC 2, sub-processors, training terms, data residency, DPA, and breach SLA — with a clear approve/reject decision guide.',
    meta: 'Word doc · checklist',
    access: 'free',
    downloadUrl: '/downloads/governance/ai-vendor-review-checklist.docx',
  },
  {
    id: 'inventory',
    title: 'AI Tool Inventory',
    description: 'The single spreadsheet that anchors your whole program — every tool, owner, data sensitivity, and review date, including shadow AI.',
    meta: 'Spreadsheet template',
    access: 'locked',
  },
  {
    id: 'risk_register',
    title: 'AI Risk Register',
    description: 'Score and track your top AI risks with likelihood × impact, existing controls, mitigation plans, and named owners.',
    meta: 'Scored register',
    access: 'locked',
  },
  {
    id: 'incident_plan',
    title: 'AI Incident Response Plan',
    description: 'A one-page runbook: incident roles, severity levels, response steps, breach-notification protocol, and post-incident review.',
    meta: '1 page · runbook',
    access: 'locked',
  },
];

export const FRAMEWORK_TAGS_BY_CATEGORY: Record<string, string[]> = {
  'AI Tool Inventory': [
    'NIST AI RMF: MAP 1.1',
    'ISO 42001: 6.1.2',
    'EU AI Act Art. 51',
  ],
  'Data Sensitivity Mapping': [
    'NIST AI RMF: MAP 2.2',
    'SOC 2: CC6.1',
    'GDPR Art. 35',
  ],
  'Vendor Due Diligence': [
    'SOC 2: CC9.2',
    'NIST AI RMF: GOVERN 6.2',
    'ISO 27001: A.15.1',
  ],
  'AI Acceptable Use Policy': [
    'NIST AI RMF: GOVERN 1.1',
    'ISO 42001: 5.2',
    'EU AI Act Art. 9',
  ],
  'Regulatory Classification': [
    'EU AI Act Art. 6',
    'NIST AI RMF: MAP 1.5',
    'ISO 42001: 4.1',
  ],
  'Risk Register': [
    'NIST AI RMF: MEASURE 2.2',
    'SOC 2: CC3.2',
    'ISO 27001: 6.1.2',
  ],
  'Customer & Contractual Obligations': [
    'GDPR Art. 28',
    'EU AI Act Art. 13',
    'SOC 2: CC2.3',
  ],
  'Team Training': [
    'NIST AI RMF: GOVERN 4.1',
    'EU AI Act Art. 4',
    'ISO 42001: 7.3',
  ],
  'Incident Response': [
    'NIST AI RMF: RESPOND 1.1',
    'SOC 2: CC7.3',
    'ISO 27001: A.16.1',
  ],
  'Executive Ownership': [
    'NIST AI RMF: GOVERN 2.2',
    'ISO 42001: 5.1',
    'EU AI Act Art. 17',
  ],
};
