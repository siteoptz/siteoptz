import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Content safety filter for children's content
const BLOCKED_WORDS = [
  'violence', 'weapon', 'gun', 'knife', 'blood', 'death', 'kill',
  'scary', 'horror', 'frightening', 'terror', 'monster', 'ghost',
  'inappropriate', 'adult', 'mature'
];

function isSafeForChildren(prompt: string, ageGroup: string): { safe: boolean; reason?: string } {
  const lowerPrompt = prompt.toLowerCase();
  
  // Check for blocked words
  for (const word of BLOCKED_WORDS) {
    if (lowerPrompt.includes(word)) {
      return { safe: false, reason: `Content contains inappropriate word: ${word}` };
    }
  }
  
  // Additional safety checks
  if (ageGroup === '5-8' && (lowerPrompt.includes('complex') || lowerPrompt.includes('difficult'))) {
    return { safe: false, reason: 'Content too complex for age group' };
  }
  
  return { safe: true };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    // Allow unauthenticated access for demo, but log usage
    // In production, you might want to require authentication
    const userId = session?.user?.email || 'anonymous';
    
    const { prompt, style = 'cartoon', ageGroup = '5-8', safetyLevel = 'strict' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Safety check
    const safetyCheck = isSafeForChildren(prompt, ageGroup);
    if (!safetyCheck.safe) {
      return res.status(400).json({ 
        error: 'Content does not meet safety guidelines',
        reason: safetyCheck.reason
      });
    }

    // Enhance prompt for children's book illustration
    const enhancedPrompt = `Children's picture book illustration, ${style} style, age-appropriate for ${ageGroup} years old, safe and educational content. ${prompt}. Bright, cheerful colors, friendly characters, educational and inspiring, suitable for children.`;

    // Generate image using DALL-E with strict content policy
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: enhancedPrompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      style: 'vivid',
      response_format: 'url',
    });

    const imageUrl = response.data[0]?.url;

    if (!imageUrl) {
      return res.status(500).json({ error: 'Failed to generate image' });
    }

    // Log usage for analytics (optional)
    console.log(`[Kids AI] Image generated for user: ${userId}, ageGroup: ${ageGroup}`);

    return res.status(200).json({
      success: true,
      imageUrl,
      prompt: enhancedPrompt,
      generatedAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Image generation error:', error);
    
    // Handle OpenAI API errors
    if (error.response) {
      return res.status(error.response.status || 500).json({
        error: 'Image generation failed',
        details: error.response.data?.error?.message || 'Unknown error'
      });
    }

    return res.status(500).json({
      error: 'Failed to generate image',
      details: error.message || 'Unknown error'
    });
  }
}