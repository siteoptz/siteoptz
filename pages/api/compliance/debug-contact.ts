// TEMPORARY DEBUG ENDPOINT — REMOVE AFTER DIAGNOSING compliance_checklist AND compliance_ai_tools FIELD UUIDS
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
      allCustomFields: [],
    });
  }

  const result = await fetchFullGhlContact(contactId);
  const contact = result.contact as Record<string, unknown> | undefined;
  const allCustomFields = (contact?.customFields ?? []) as Array<Record<string, unknown>>;

  return res.status(200).json({
    contactId,
    customFieldsCount: allCustomFields.length,
    allCustomFields,
  });
}
