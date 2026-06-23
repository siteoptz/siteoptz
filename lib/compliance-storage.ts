import { GHL_FIELD_IDS } from './compliance-config';
import type { ScorecardData, ComplianceProfile, AIToolEntry, ComplianceState } from './compliance-config';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';

function getGhlCredentials(): { apiKey: string; locationId: string } {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !locationId) {
    throw new Error('GHL credentials not configured: GHL_API_KEY and GHL_LOCATION_ID are required');
  }
  return { apiKey, locationId };
}

async function findGhlContactId(email: string): Promise<string | null> {
  const { apiKey, locationId } = getGhlCredentials();

  const response = await fetch(
    `${GHL_API_BASE}/contacts/search/duplicate?email=${encodeURIComponent(email)}&locationId=${encodeURIComponent(locationId)}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GHL contact search failed: ${response.status} - ${errorText}`);
  }

  const data = (await response.json()) as Record<string, unknown>;
  const contact = data.contact as Record<string, unknown> | undefined;

  return contact?.id ? String(contact.id) : null;
}

async function fetchFullGhlContact(contactId: string): Promise<Record<string, unknown>> {
  const { apiKey } = getGhlCredentials();

  const response = await fetch(
    `${GHL_API_BASE}/contacts/${encodeURIComponent(contactId)}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GHL contact fetch failed: ${response.status} - ${errorText}`);
  }

  return (await response.json()) as Record<string, unknown>;
}

async function writeCustomFieldsToGhl(
  contactId: string,
  fields: Array<{ id: string; field_value: string }>
): Promise<void> {
  const { apiKey } = getGhlCredentials();

  const response = await fetch(
    `${GHL_API_BASE}/contacts/${encodeURIComponent(contactId)}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify({ customFields: fields }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GHL contact update failed: ${response.status} - ${errorText}`);
  }
}

function getCustomFieldValue(
  customFields: Array<{ key?: string; id?: string; value?: string; field_value?: unknown }>,
  fieldId: string
): string | null {
  if (!Array.isArray(customFields)) return null;
  const field = customFields.find((f) => f.key === fieldId || f.id === fieldId);
  if (!field) return null;
  const raw = field.value ?? field.field_value;
  return raw !== undefined && raw !== null ? String(raw) : null;
}

function parseJsonField<T>(raw: string | null, fieldName: string, defaultValue: T): T {
  if (!raw || raw === '{}' || raw === '[]' || raw === '') return defaultValue;
  try {
    return JSON.parse(raw) as T;
  } catch {
    console.warn(`compliance-storage: malformed JSON in GHL field "${fieldName}", returning default`);
    return defaultValue;
  }
}

function extractComplianceStateFromContact(contact: Record<string, unknown>): ComplianceState {
  const fields = (contact.customFields as Array<{ key?: string; id?: string; value?: string; field_value?: unknown }>) ?? [];
  const checklistRaw = getCustomFieldValue(fields, GHL_FIELD_IDS.COMPLIANCE_CHECKLIST);
  const aiToolsRaw = getCustomFieldValue(fields, GHL_FIELD_IDS.COMPLIANCE_AI_TOOLS);

  return {
    checklistState: parseJsonField<Record<string, boolean>>(checklistRaw, 'COMPLIANCE_CHECKLIST', {}),
    aiTools: parseJsonField<AIToolEntry[]>(aiToolsRaw, 'COMPLIANCE_AI_TOOLS', []),
  };
}

export async function getScorecardData(userEmail: string): Promise<ScorecardData | null> {
  const contactId = await findGhlContactId(userEmail);

  if (!contactId) return null;

  const result = await fetchFullGhlContact(contactId);
  const contact = result.contact as Record<string, unknown> | undefined;

  if (!contact) return null;

  const fields = (contact.customFields as Array<{ key?: string; id?: string; value?: string; field_value?: unknown }>) ?? [];
  const scoreRaw = getCustomFieldValue(fields, GHL_FIELD_IDS.SCORECARD_PERCENTAGE);
  const band = getCustomFieldValue(fields, GHL_FIELD_IDS.SCORECARD_BAND);
  const completedAt = getCustomFieldValue(fields, GHL_FIELD_IDS.SCORECARD_COMPLETED_AT);

  if (!band || scoreRaw === null) return null;

  return {
    score: Number(scoreRaw),
    band: band as ScorecardData['band'],
    completedAt,
  };
}

export async function getComplianceState(userEmail: string): Promise<ComplianceState> {
  const contactId = await findGhlContactId(userEmail);
  if (!contactId) return { checklistState: {}, aiTools: [] };

  const result = await fetchFullGhlContact(contactId);
  const contact = result.contact as Record<string, unknown> | undefined;
  if (!contact) return { checklistState: {}, aiTools: [] };

  return extractComplianceStateFromContact(contact);
}

export async function updateChecklist(
  userEmail: string,
  itemId: string,
  completed: boolean
): Promise<ComplianceState> {
  const contactId = await findGhlContactId(userEmail);
  if (!contactId) throw new Error(`No GHL contact found for ${userEmail}`);

  const result = await fetchFullGhlContact(contactId);
  const contact = result.contact as Record<string, unknown> | undefined;
  const current = contact ? extractComplianceStateFromContact(contact) : { checklistState: {}, aiTools: [] };

  const updatedChecklistState: Record<string, boolean> = { ...current.checklistState, [itemId]: completed };

  await writeCustomFieldsToGhl(contactId, [
    { id: GHL_FIELD_IDS.COMPLIANCE_CHECKLIST, field_value: JSON.stringify(updatedChecklistState) },
  ]);

  return { checklistState: updatedChecklistState, aiTools: current.aiTools };
}

export async function updateAITools(
  userEmail: string,
  tools: AIToolEntry[]
): Promise<ComplianceState> {
  const contactId = await findGhlContactId(userEmail);
  if (!contactId) throw new Error(`No GHL contact found for ${userEmail}`);

  const result = await fetchFullGhlContact(contactId);
  const contact = result.contact as Record<string, unknown> | undefined;
  const current = contact ? extractComplianceStateFromContact(contact) : { checklistState: {}, aiTools: [] };

  await writeCustomFieldsToGhl(contactId, [
    { id: GHL_FIELD_IDS.COMPLIANCE_AI_TOOLS, field_value: JSON.stringify(tools) },
  ]);

  return { checklistState: current.checklistState, aiTools: tools };
}

export async function getComplianceProfile(userEmail: string): Promise<ComplianceProfile> {
  const [scorecardData, complianceState] = await Promise.all([
    getScorecardData(userEmail),
    getComplianceState(userEmail),
  ]);
  return {
    email: userEmail,
    hasScorecard: scorecardData !== null,
    scorecardData,
    checklistState: complianceState.checklistState,
    aiTools: complianceState.aiTools,
  };
}
