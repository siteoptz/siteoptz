import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../lib/email-service';

interface EmailResult {
  success: boolean;
  messageId?: string;
  provider?: string;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, html, text, from, bcc } = req.body;

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({ 
        error: 'Missing required fields: to, subject, and either html or text' 
      });
    }

    const result = await sendEmail({ to, subject, html, text, from, bcc }) as EmailResult;

    if (result.success) {
      res.status(200).json({
        success: true,
        messageId: result.messageId || null,
        provider: result.provider || 'unknown'
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Unknown error'
      });
    }
  } catch (error: any) {
    console.error('Send email API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}