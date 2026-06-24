import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getComplianceProfile, setChecklistState, updateAITools } from '@/lib/compliance-storage';
import type { AIToolEntry } from '@/lib/compliance-config';

const VALID_VENDORS = ['OpenAI', 'Anthropic', 'Google', 'AWS', 'Other'] as const;
const VALID_SENSITIVITIES = ['Customer', 'Internal', 'Public', 'Unknown'] as const;
const VALID_STATUSES = ['Active', 'Reviewed', 'Shadow'] as const;

function isValidTool(tool: unknown): tool is AIToolEntry {
  if (!tool || typeof tool !== 'object') return false;
  const t = tool as Record<string, unknown>;
  return (
    typeof t.id === 'string' && t.id.length > 0 &&
    typeof t.name === 'string' && t.name.length > 0 &&
    typeof t.vendor === 'string' && (VALID_VENDORS as readonly string[]).includes(t.vendor) &&
    typeof t.sensitivity === 'string' && (VALID_SENSITIVITIES as readonly string[]).includes(t.sensitivity) &&
    typeof t.status === 'string' && (VALID_STATUSES as readonly string[]).includes(t.status)
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const profile = await getComplianceProfile(session.user.email);
      return res.status(200).json(profile);
    } catch (error) {
      console.error('Compliance profile fetch error:', error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to fetch profile',
      });
    }
  }

  if (req.method === 'PATCH') {
    const { action } = req.body ?? {};

    if (action === 'set_checklist') {
      const { checklistState } = req.body;
      if (
        typeof checklistState !== 'object' ||
        checklistState === null ||
        Array.isArray(checklistState) ||
        Object.keys(checklistState as Record<string, unknown>).length > 50 ||
        !Object.values(checklistState as Record<string, unknown>).every((v) => typeof v === 'boolean')
      ) {
        return res.status(400).json({
          error: 'set_checklist requires checklistState (object with string keys and boolean values, max 50 keys)',
        });
      }
      try {
        const state = await setChecklistState(session.user.email, checklistState as Record<string, boolean>);
        return res.status(200).json(state);
      } catch (error) {
        console.error('Compliance checklist update error:', error);
        return res.status(500).json({
          error: error instanceof Error ? error.message : 'Failed to update checklist',
        });
      }
    }

    if (action === 'update_tools') {
      const { tools } = req.body;
      if (!Array.isArray(tools)) {
        return res.status(400).json({ error: 'update_tools requires tools (array)' });
      }
      if (tools.length > 20) {
        return res.status(400).json({ error: 'Too many tools (max 20)' });
      }
      if (!tools.every(isValidTool)) {
        return res.status(400).json({
          error: 'Invalid tool entry. Each tool requires: id, name, vendor (OpenAI|Anthropic|Google|AWS|Other), sensitivity (Customer|Internal|Public|Unknown), status (Active|Reviewed|Shadow)',
        });
      }
      try {
        const state = await updateAITools(session.user.email, tools);
        return res.status(200).json(state);
      } catch (error) {
        console.error('Compliance AI tools update error:', error);
        return res.status(500).json({
          error: error instanceof Error ? error.message : 'Failed to update AI tools',
        });
      }
    }

    return res.status(400).json({ error: 'action must be "set_checklist" or "update_tools"' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
