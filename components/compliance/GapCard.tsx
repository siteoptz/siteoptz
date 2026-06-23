import { FRAMEWORK_TAGS_BY_CATEGORY } from '@/lib/compliance-config';

interface Props {
  category: string;
  priority: string;
}

const PRIORITY_BADGE: Record<string, string> = {
  critical: 'bg-red-900 text-red-300 border border-red-700',
  high: 'bg-orange-900 text-orange-300 border border-orange-700',
  medium: 'bg-amber-900 text-amber-300 border border-amber-700',
  low: 'bg-blue-900 text-blue-300 border border-blue-700',
};

export default function GapCard({ category, priority }: Props) {
  const badgeClass = PRIORITY_BADGE[priority.toLowerCase()] ?? 'bg-gray-800 text-gray-400 border border-gray-700';
  const tags = FRAMEWORK_TAGS_BY_CATEGORY[category] ?? [];

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-white font-semibold text-sm">{category}</span>
        <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass}`}>
          {priority}
        </span>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded bg-gray-900 text-gray-400 border border-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {tags.length === 0 && <div className="mb-4" />}

      <a
        href="#"
        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
      >
        Fix this week →
      </a>
    </div>
  );
}
