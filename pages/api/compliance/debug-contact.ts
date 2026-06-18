// TEMPORARY DEBUG ENDPOINT — REMOVE AFTER DIAGNOSING FIELD STRUCTURE
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { findGhlContactId, fetchFullGhlContact } from '@/lib/compliance-storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const email = session.user.email;

  const contactId = await findGhlContactId(email);
  if (!contactId) {
    return res.status(200).json({
      contactId: null,
      customFieldsCount: 0,
      customFieldsPreview: [],
      scorecardRelatedFields: [],
    });
  }

  const result = await fetchFullGhlContact(contactId);
  const contact = result.contact as Record<string, unknown> | undefined;
  const customFields = (contact?.customFields ?? []) as Array<Record<string, unknown>>;

  const scorecardRelatedFields = customFields.filter((f) => {
    const key = String(f.key ?? '').toLowerCase();
    const id = String(f.id ?? '').toLowerCase();
    const name = String(f.fieldKey ?? f.name ?? '').toLowerCase();
    return key.includes('scorecard') || id.includes('scorecard') || name.includes('scorecard');
  });

  return res.status(200).json({
    contactId,
    customFieldsCount: customFields.length,
    fullFirstFieldRaw: JSON.stringify(customFields[0] ?? null, null, 2),
    fullFirstFieldKeys: customFields[0] ? Object.keys(customFields[0]) : [],
    customFieldsPreview: customFields.slice(0, 10),
    scorecardRelatedFields,
  });
}
