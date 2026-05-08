/**
 * GoHighLevel helpers for postdoserx — adapt URLs/headers to your GHL v2 API.
 * Tag convention: postdoserx-plan-{plan}
 */

const TAG_PREFIX = 'postdoserx-plan-';

export async function searchGHLContact(email: string): Promise<any | null> {
  if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) return null;

  const url = new URL(
    'https://services.leadconnectorhq.com/contacts/search/duplicate'
  );
  url.searchParams.set('locationId', process.env.GHL_LOCATION_ID);
  url.searchParams.set('email', email);

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_KEY}`,
      Version: '2021-07-28',
    },
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.contact ?? null;
}

export async function createPostdoserxGHLContact(
  email: string,
  name: string,
  plan: string,
  extra?: {
    stripeSessionId?: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  }
) {
  if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) return null;

  const tags = [
    `${TAG_PREFIX}${plan}`,
    'postdoserx-oauth-signup',
    'postdoserx-stripe-checkout-first',
  ];

  const body: Record<string, unknown> = {
    locationId: process.env.GHL_LOCATION_ID,
    email,
    name,
    tags,
    source: 'PostDoseRx — Stripe then Google',
  };

  // Optional: map Stripe IDs to GHL custom fields if you create those fields in GHL
  if (extra?.stripeCustomerId) {
    // body.customFields = [{ id: 'YOUR_FIELD_ID', field_value: extra.stripeCustomerId }]
  }

  const res = await fetch('https://services.leadconnectorhq.com/contacts/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_KEY}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error(await res.text());
    return null;
  }
  return res.json();
}

export async function updateGHLContactPlanTags(
  contactId: string,
  plan: string
) {
  if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) return false;

  // Implement PATCH to merge tags without removing others — GHL API varies by version.
  // Pseudocode: GET contact → merge tags → PUT/PATCH
  console.log('TODO: merge tags for', contactId, TAG_PREFIX + plan);
  return true;
}
