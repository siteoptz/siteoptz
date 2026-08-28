import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { COMPLIANCE_DOCUMENTS } from '@/lib/compliance-config';
import { hasAccessToTier } from '@/lib/entitlements';
import fs from 'fs';
import path from 'path';

const PAID_TEMPLATES_DIR = path.join(process.cwd(), 'docs/governance-launch/templates/paid/docx');

// Map document id (from COMPLIANCE_DOCUMENTS) to filename on disk
const DOC_FILENAMES: Record<string, string> = {
  inventory: 'ai-tool-inventory-paid.docx',
  risk_register: 'ai-risk-register-paid.docx',
  incident_plan: 'ai-incident-response-plan-paid.docx',
  data_governance: 'ai-data-governance-policy-paid.docx',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ error: 'authentication required' });
  }

  const { doc } = req.query;
  const docId = Array.isArray(doc) ? doc[0] : doc;

  const document = COMPLIANCE_DOCUMENTS.find((d) => d.id === docId);
  if (!document || document.access !== 'locked') {
    return res.status(404).json({ error: 'document not found' });
  }

  const userTier = (session.user as any).plan as string | undefined;
  if (!document.requiredTier || !hasAccessToTier(userTier, document.requiredTier)) {
    return res.status(403).json({
      error: 'tier upgrade required',
      requiredTier: document.requiredTier,
    });
  }

  const filename = DOC_FILENAMES[document.id];
  if (!filename) {
    return res.status(404).json({ error: 'document not found' });
  }

  const filePath = path.join(PAID_TEMPLATES_DIR, filename);

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'document not found' });
    }

    const fileBuffer = fs.readFileSync(filePath);

    console.log('📥 Paid template downloaded:', {
      email: session.user.email,
      docId: document.id,
      tier: userTier,
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(fileBuffer);
  } catch (error) {
    console.error('Paid template download error:', error);
    return res.status(500).json({ error: 'unable to process download' });
  }
}
