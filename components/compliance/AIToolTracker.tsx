import { useEffect, useRef, useState } from 'react';
import type { AIToolEntry, ComplianceState } from '@/lib/compliance-config';

interface Props {
  initialTools: AIToolEntry[];
  onUpdate: (newTools: AIToolEntry[]) => void;
}

type EditingId = string | 'new-main' | 'new-shadow' | null;

interface FormValues {
  name: string;
  vendor: AIToolEntry['vendor'];
  sensitivity: AIToolEntry['sensitivity'];
  status: AIToolEntry['status'];
}

const VENDORS: AIToolEntry['vendor'][] = ['OpenAI', 'Anthropic', 'Google', 'AWS', 'Other'];
const SENSITIVITIES: AIToolEntry['sensitivity'][] = ['Customer', 'Internal', 'Public', 'Unknown'];
const STATUSES: AIToolEntry['status'][] = ['Active', 'Reviewed', 'Shadow'];

const DEFAULT_MAIN_FORM: FormValues = {
  name: '',
  vendor: 'OpenAI',
  sensitivity: 'Unknown',
  status: 'Active',
};

const DEFAULT_SHADOW_FORM: FormValues = {
  name: '',
  vendor: 'OpenAI',
  sensitivity: 'Unknown',
  status: 'Shadow',
};

export default function AIToolTracker({ initialTools, onUpdate }: Props) {
  const [tools, setTools] = useState<AIToolEntry[]>(initialTools);
  const [editingId, setEditingId] = useState<EditingId>(null);
  const [formValues, setFormValues] = useState<FormValues>(DEFAULT_MAIN_FORM);
  const [saveError, setSaveError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    if (!saveError) return;
    const t = setTimeout(() => setSaveError(null), 5000);
    return () => clearTimeout(t);
  }, [saveError]);

  function patchTools(updatedTools: AIToolEntry[], prevTools: AIToolEntry[], immediate: boolean) {
    const doFetch = () => {
      fetch('/api/compliance/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_tools', tools: updatedTools }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('save failed');
          return res.json() as Promise<ComplianceState>;
        })
        .then((data) => {
          setTools(data.aiTools);
          onUpdate(data.aiTools);
        })
        .catch(() => {
          setTools(prevTools);
          setSaveError("Couldn't save — try again");
        });
    };

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (immediate) {
      doFetch();
    } else {
      debounceRef.current = setTimeout(doFetch, 1000);
    }
  }

  function startEdit(tool: AIToolEntry) {
    setEditingId(tool.id);
    setFormValues({ name: tool.name, vendor: tool.vendor, sensitivity: tool.sensitivity, status: tool.status });
  }

  function startAdd(type: 'main' | 'shadow') {
    setEditingId(type === 'shadow' ? 'new-shadow' : 'new-main');
    setFormValues(type === 'shadow' ? { ...DEFAULT_SHADOW_FORM } : { ...DEFAULT_MAIN_FORM });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function saveTool() {
    if (!formValues.name.trim()) {
      setSaveError('Name is required');
      return;
    }

    const isNew = editingId === 'new-main' || editingId === 'new-shadow';
    const newId = isNew ? crypto.randomUUID() : (editingId as string);

    const entry: AIToolEntry = {
      id: newId,
      name: formValues.name.trim(),
      vendor: formValues.vendor,
      sensitivity: formValues.sensitivity,
      status: formValues.status,
    };

    const prevTools = tools;
    const updatedTools = isNew
      ? [...tools, entry]
      : tools.map((t) => (t.id === editingId ? entry : t));

    setTools(updatedTools);
    setEditingId(null);
    setSaveError(null);
    patchTools(updatedTools, prevTools, false);
  }

  function deleteTool(id: string) {
    const prevTools = tools;
    const updatedTools = tools.filter((t) => t.id !== id);
    setTools(updatedTools);
    patchTools(updatedTools, prevTools, true);
  }

  const mainTools = tools.filter((t) => t.status !== 'Shadow');
  const shadowTool = tools.find((t) => t.status === 'Shadow') ?? null;

  function updateForm(field: keyof FormValues, value: string) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  function renderForm(type: 'main' | 'shadow') {
    const statusOptions = STATUSES.filter((s) => s !== 'Shadow');
    const gridClass = type === 'shadow' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3';

    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3">
        <input
          type="text"
          placeholder="Tool name *"
          value={formValues.name}
          onChange={(e) => updateForm('name', e.target.value)}
          className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600"
        />
        <div className={`grid ${gridClass} gap-2`}>
          <select
            value={formValues.vendor}
            onChange={(e) => updateForm('vendor', e.target.value)}
            className="bg-black border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-cyan-600"
          >
            {VENDORS.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          <select
            value={formValues.sensitivity}
            onChange={(e) => updateForm('sensitivity', e.target.value)}
            className="bg-black border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-cyan-600"
          >
            {SENSITIVITIES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {type !== 'shadow' && (
            <select
              value={formValues.status}
              onChange={(e) => updateForm('status', e.target.value)}
              className="bg-black border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-cyan-600"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={cancelEdit}
            className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveTool}
            className="px-4 py-1.5 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  function renderToolCard(tool: AIToolEntry) {
    if (editingId === tool.id) {
      return <div key={tool.id}>{renderForm('main')}</div>;
    }
    return (
      <div key={tool.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-white text-sm font-medium">{tool.name}</span>
          <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
            {tool.vendor}
          </span>
        </div>
        <div className="flex gap-2 mb-3 text-xs text-gray-500">
          <span>{tool.sensitivity}</span>
          <span>·</span>
          <span>{tool.status}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => startEdit(tool)}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTool(tool.id)}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  const canAddMain = mainTools.length < 3 && editingId === null;

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6">
      <h2 className="text-white font-semibold text-base mb-4">
        Your AI Tools (3 + shadow slot)
      </h2>

      {saveError && (
        <p className="mb-3 text-xs text-red-400">{saveError}</p>
      )}

      <div className="space-y-3 mb-4">
        {mainTools.map((tool) => renderToolCard(tool))}

        {editingId === 'new-main' && renderForm('main')}

        {canAddMain && (
          <button
            onClick={() => startAdd('main')}
            className="w-full border border-dashed border-gray-700 rounded-lg py-3 text-sm text-gray-500 hover:text-gray-300 hover:border-gray-600 transition-colors"
          >
            + Add tool
          </button>
        )}
      </div>

      <div className="border border-dashed border-gray-700 rounded-lg p-4 bg-gray-950">
        <p className="text-xs text-gray-500 mb-3">
          Shadow AI: the tool someone in your team is using without telling you
        </p>
        {shadowTool ? (
          editingId === shadowTool.id ? (
            renderForm('shadow')
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-white text-sm font-medium">{shadowTool.name}</span>
                <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                  {shadowTool.vendor}
                </span>
              </div>
              <div className="flex gap-2 mb-3 text-xs text-gray-500">
                <span>{shadowTool.sensitivity}</span>
                <span>·</span>
                <span>{shadowTool.status}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(shadowTool)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTool(shadowTool.id)}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        ) : editingId === 'new-shadow' ? (
          renderForm('shadow')
        ) : editingId === null ? (
          <button
            onClick={() => startAdd('shadow')}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            + Add shadow tool
          </button>
        ) : null}
      </div>
    </div>
  );
}
