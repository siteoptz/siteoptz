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

// TODO: revert to unexported `async function` once debug-contact.ts is removed
export async function findGhlContactId(email: string): Promise<string | null> {
  const { apiKey, locationId } = getGhlCredentials();

  console.log(`[COMPLIANCE_DIAG] findGhlContactId: searching for email="${email}"`);

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

  console.log(`[COMPLIANCE_DIAG] findGhlContactId: GHL response status=${response.status}`);

  if (!response.ok) {
    const errorText = await response.text();
    console.log(`[COMPLIANCE_DIAG] findGhlContactId: non-ok response body="${errorText}"`);
    throw new Error(`GHL contact search failed: ${response.status} - ${errorText}`);
  }

  const data = (await response.json()) as Record<string, unknown>;
  const contact = data.contact as Record<string, unknown> | undefined;

  console.log(`[COMPLIANCE_DIAG] findGhlContactId: data.contact exists=${!!contact}`);

  const contactId = contact?.id ? String(contact.id) : null;
  console.log(`[COMPLIANCE_DIAG] findGhlContactId: returning contactId=${contactId}`);

  return contactId;
}

// TODO: revert to unexported `async function` once debug-contact.ts is removed
export async function fetchFullGhlContact(contactId: string): Promise<Record<string, unknown>> {
  const { apiKey } = getGhlCredentials();

  console.log(`[COMPLIANCE_DIAG] fetchFullGhlContact: fetching contactId="${contactId}"`);

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

  console.log(`[COMPLIANCE_DIAG] fetchFullGhlContact: GHL response status=${response.status}`);

  if (!response.ok) {
    const errorText = await response.text();
    console.log(`[COMPLIANCE_DIAG] fetchFullGhlContact: non-ok response body="${errorText}"`);
    throw new Error(`GHL contact fetch failed: ${response.status} - ${errorText}`);
  }

  const result = (await response.json()) as Record<string, unknown>;
  const contact = result.contact as Record<string, unknown> | undefined;

  console.log(`[COMPLIANCE_DIAG] fetchFullGhlContact: result.contact exists=${!!contact}`);

  const customFields = contact?.customFields;
  if (Array.isArray(customFields) && customFields.length > 0) {
    const preview = JSON.stringify(customFields).slice(0, 200);
    console.log(`[COMPLIANCE_DIAG] fetchFullGhlContact: customFields preview="${preview}"`);
  } else {
    console.log(`[COMPLIANCE_DIAG] fetchFullGhlContact: no customFields (value=${JSON.stringify(customFields)})`);
  }

  return result;
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
  console.log(`[COMPLIANCE_DIAG] getScorecardData: findGhlContactId returned=${contactId}`);

  if (!contactId) {
    console.log(`[COMPLIANCE_DIAG] getScorecardData: returning null — no GHL contact found for email`);
    return null;
  }

  const result = await fetchFullGhlContact(contactId);
  const contact = result.contact as Record<string, unknown> | undefined;
  console.log(`[COMPLIANCE_DIAG] getScorecardData: fetchFullGhlContact contact exists=${!!contact}`);

  if (!contact) {
    console.log(`[COMPLIANCE_DIAG] getScorecardData: returning null — fetchFullGhlContact returned no contact`);
    return null;
  }

  const fields = (contact.customFields as Array<{ key?: string; id?: string; value?: string; field_value?: unknown }>) ?? [];
  const scoreRaw = getCustomFieldValue(fields, 'scorecard_total_score');
  const band = getCustomFieldValue(fields, 'scorecard_band');
  const completedAt = getCustomFieldValue(fields, 'scorecard_completed_at');

  console.log(`[COMPLIANCE_DIAG] getScorecardData: extracted scoreRaw=${scoreRaw}, band=${band}, completedAt=${completedAt}`);

  if (!band || scoreRaw === null) {
    console.log(`[COMPLIANCE_DIAG] getScorecardData: returning null — missing required fields (band=${band}, scoreRaw=${scoreRaw})`);
    return null;
  }

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
