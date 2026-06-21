export type ScorecardBand =
  | 'Critical Risk'
  | 'Foundational Gaps'
  | 'Mostly Ready'
  | 'Audit-Ready';

export interface ScorecardData {
  score: number;
  band: ScorecardBand;
  completedAt: string | null;
}

export interface ComplianceProfile {
  email: string;
  hasScorecard: boolean;
  scorecardData: ScorecardData | null;
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
} as const;
