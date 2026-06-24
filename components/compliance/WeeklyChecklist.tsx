import { useEffect, useRef, useState } from 'react';
import type { ChecklistItem, ComplianceState } from '@/lib/compliance-config';

interface Props {
  items: ChecklistItem[];
  initialState: Record<string, boolean>;
  onUpdate: (newState: Record<string, boolean>) => void;
}

function buildInitialChecked(items: ChecklistItem[], initialState: Record<string, boolean>): Record<string, boolean> {
  const state: Record<string, boolean> = {};
  items.forEach((item) => {
    state[item.id] = initialState[item.id] ?? false;
  });
  return state;
}

export default function WeeklyChecklist({ items, initialState, onUpdate }: Props) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    buildInitialChecked(items, initialState)
  );
  const [saveError, setSaveError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevStateRef = useRef<Record<string, boolean>>(buildInitialChecked(items, initialState));
  const pendingStateRef = useRef<Record<string, boolean>>(buildInitialChecked(items, initialState));

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!saveError) return;
    const t = setTimeout(() => setSaveError(null), 5000);
    return () => clearTimeout(t);
  }, [saveError]);

  function flushChecklist(stateToSave: Record<string, boolean>) {
    const beforeFailure = prevStateRef.current;
    prevStateRef.current = stateToSave;

    fetch('/api/compliance/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'set_checklist', checklistState: stateToSave }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('save failed');
        return res.json() as Promise<ComplianceState>;
      })
      .then((data) => {
        onUpdate(data.checklistState);
      })
      .catch(() => {
        setChecked(beforeFailure);
        prevStateRef.current = beforeFailure;
        setSaveError("Couldn't save — try again");
      });
  }

  function handleToggle(itemId: string) {
    const newValue = !checked[itemId];
    const newChecked = { ...checked, [itemId]: newValue };

    setChecked(newChecked);
    pendingStateRef.current = newChecked;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      flushChecklist(pendingStateRef.current);
    }, 1000);
  }

  const doneCount = items.filter((item) => checked[item.id]).length;

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-base">This Week&apos;s Checklist</h2>
        <span className="text-xs text-gray-400">{doneCount} of {items.length} done</span>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={checked[item.id] ?? false}
                onChange={() => handleToggle(item.id)}
                className="mt-0.5 shrink-0 w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className={`text-sm leading-snug ${checked[item.id] ? 'text-gray-500 line-through' : 'text-gray-300 group-hover:text-white'} transition-colors`}>
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {saveError && (
        <p className="mt-3 text-xs text-red-400">{saveError}</p>
      )}
    </div>
  );
}
