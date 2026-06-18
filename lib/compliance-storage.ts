import type { ScorecardData, ComplianceProfile } from './compliance-config';

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

  return response.json() as Promise<Record<string, unknown>>;
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

export async function getScorecardData(userEmail: string): Promise<ScorecardData | null> {
  const contactId = await findGhlContactId(userEmail);
  if (!contactId) return null;

  const result = await fetchFullGhlContact(contactId);
  const contact = result.contact as Record<string, unknown> | undefined;
  if (!contact) return null;

  const fields = (contact.customFields as Array<{ key?: string; id?: string; value?: string; field_value?: unknown }>) ?? [];
  const scoreRaw = getCustomFieldValue(fields, 'scorecard_total_score');
  const band = getCustomFieldValue(fields, 'scorecard_band');
  const completedAt = getCustomFieldValue(fields, 'scorecard_completed_at');

  if (!band || scoreRaw === null) return null;

  return {
    score: Number(scoreRaw),
    band: band as ScorecardData['band'],
    completedAt,
  };
}

export async function getComplianceProfile(userEmail: string): Promise<ComplianceProfile> {
  const scorecardData = await getScorecardData(userEmail);
  return {
    email: userEmail,
    hasScorecard: scorecardData !== null,
    scorecardData,
  };
}
