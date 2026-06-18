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
