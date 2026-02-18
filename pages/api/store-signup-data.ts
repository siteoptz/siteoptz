import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formData } = req.body;
    
    if (!formData || !formData.email) {
      return res.status(400).json({ error: 'Invalid form data' });
    }

    // Store in secure HTTP-only cookie that persists through OAuth redirect
    const cookieData = JSON.stringify({
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      business: formData.business,
      bottlenecks: formData.bottlenecks,
      currentAIUsage: formData.currentAIUsage,
      priorityOutcome: formData.priorityOutcome,
      timestamp: Date.now()
    });

    // Set secure cookie with 1 hour expiry
    const cookie = serialize('signup_data', cookieData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 1 hour
      path: '/'
    });

    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({ success: true, message: 'Data stored in secure cookie' });
  } catch (error) {
    console.error('Cookie storage error:', error);
    res.status(500).json({ error: 'Failed to store data' });
  }
}