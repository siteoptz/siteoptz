interface Props {
  score: number;
  band: string;
  completedAt: string | null;
}

const BAND_COLOR: Record<string, string> = {
  'Critical Risk': 'text-red-400',
  'Foundational Gaps': 'text-amber-400',
  'Mostly Ready': 'text-cyan-400',
  'Audit-Ready': 'text-green-400',
};

const BAND_SUBHEADLINE: Record<string, string> = {
  'Critical Risk': '3 gaps likely to stall your next enterprise deal',
  'Foundational Gaps': 'Closeable gaps before your next questionnaire',
  'Mostly Ready': 'Ahead of most Series A founders. Tighten before Series B.',
  'Audit-Ready': "You're in the top 10% of Series A founders we assess.",
};

export default function DealReadinessHeader({ score, band, completedAt }: Props) {
  const bandColor = BAND_COLOR[band] ?? 'text-gray-300';
  const subheadline = BAND_SUBHEADLINE[band] ?? '';

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6">
      <div className="text-5xl font-bold text-white mb-1">
        {score}
        <span className="text-2xl text-gray-400 font-normal">/100</span>
      </div>
      <div className={`text-xl font-semibold mb-2 ${bandColor}`}>{band}</div>
      {subheadline && (
        <p className="text-gray-300 text-sm mb-3">{subheadline}</p>
      )}
      {completedAt && (
        <p className="text-gray-500 text-xs">
          Last assessed {new Date(completedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
