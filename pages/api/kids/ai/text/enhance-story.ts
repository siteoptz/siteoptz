import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface StoryEnhancementRequest {
  pages: string[];
  characters: Array<{ name: string; description: string }>;
  ageGroup: string;
  style: string;
}

function validateStoryContent(pages: string[]): { valid: boolean; reason?: string } {
  if (!pages || pages.length === 0) {
    return { valid: false, reason: 'No pages provided' };
  }

  if (pages.length > 20) {
    return { valid: false, reason: 'Too many pages (max 20)' };
  }

  // Check each page length
  for (const page of pages) {
    if (page.length > 500) {
      return { valid: false, reason: 'Page text too long (max 500 characters)' };
    }
  }

  return { valid: true };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.email || 'anonymous';

    const { pages, characters, ageGroup = '5-8', style = 'childrens-book' }: StoryEnhancementRequest = req.body;

    // Validate input
    const validation = validateStoryContent(pages);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.reason });
    }

    // Build character context
    const characterContext = characters.map(c => 
      `- ${c.name}: ${c.description}`
    ).join('\n');

    // Create system prompt for story enhancement
    const systemPrompt = `You are a children's book editor helping to improve stories for kids ages ${ageGroup}. 
Your job is to:
1. Enhance the story text to be more engaging and age-appropriate
2. Maintain character consistency throughout all pages
3. Ensure the story flows naturally from page to page
4. Use vocabulary appropriate for ${ageGroup} year olds
5. Keep the educational value and positive messages
6. Make the story fun and inspiring

Characters in this story:
${characterContext || 'No specific characters defined'}

Return ONLY the enhanced story pages as a JSON array, one string per page. Do not include any other text or explanation.`;

    // Build user prompt
    const userPrompt = `Please enhance this ${pages.length}-page story for children ages ${ageGroup}:

${pages.map((page, i) => `Page ${i + 1}: ${page}`).join('\n\n')}

Maintain the same number of pages and keep the core story intact, but make it more engaging, age-appropriate, and ensure character consistency.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      return res.status(500).json({ error: 'No response from AI' });
    }

    // Parse JSON response
    let enhancedData;
    try {
      enhancedData = JSON.parse(responseContent);
    } catch (parseError) {
      // If JSON parsing fails, try to extract array from text
      const arrayMatch = responseContent.match(/\[.*\]/s);
      if (arrayMatch) {
        enhancedData = JSON.parse(arrayMatch[0]);
      } else {
        // Fallback: split by page markers
        const pages = responseContent
          .split(/Page \d+:/)
          .filter(p => p.trim())
          .map(p => p.trim());
        enhancedData = { enhancedPages: pages };
      }
    }

    const enhancedPages = enhancedData.enhancedPages || enhancedData.pages || pages;

    // Ensure we have the same number of pages
    if (enhancedPages.length !== pages.length) {
      // Pad or truncate to match original length
      while (enhancedPages.length < pages.length) {
        enhancedPages.push(pages[enhancedPages.length]);
      }
      enhancedPages.splice(pages.length);
    }

    // Log usage
    console.log(`[Kids AI] Story enhanced for user: ${userId}, pages: ${pages.length}`);

    return res.status(200).json({
      success: true,
      enhancedPages,
      originalPages: pages,
      characters,
      ageGroup,
      enhancedAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Story enhancement error:', error);
    
    if (error.response) {
      return res.status(error.response.status || 500).json({
        error: 'Story enhancement failed',
        details: error.response.data?.error?.message || 'Unknown error'
      });
    }

    return res.status(500).json({
      error: 'Failed to enhance story',
      details: error.message || 'Unknown error'
    });
  }
}