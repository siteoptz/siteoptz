/**
 * Content safety utilities for kids' AI applications
 * COPPA-compliant content filtering
 */

export interface SafetyCheckResult {
  safe: boolean;
  reason?: string;
  confidence: number;
}

const INAPPROPRIATE_WORDS = [
  // Violence
  'violence', 'weapon', 'gun', 'knife', 'blood', 'death', 'kill', 'murder',
  // Scary content
  'scary', 'horror', 'frightening', 'terror', 'monster', 'ghost', 'demon',
  // Inappropriate content
  'inappropriate', 'adult', 'mature', 'explicit',
  // Negative emotions (context-dependent, but flag for review)
  'hate', 'anger', 'revenge'
];

const AGE_APPROPRIATE_VOCABULARY = {
  '5-8': {
    maxComplexity: 'simple',
    maxLength: 200,
    allowedTopics: ['friendship', 'adventure', 'learning', 'animals', 'nature', 'family']
  },
  '6-10': {
    maxComplexity: 'moderate',
    maxLength: 300,
    allowedTopics: ['friendship', 'adventure', 'learning', 'animals', 'nature', 'family', 'science', 'history']
  },
  '8-12': {
    maxComplexity: 'moderate',
    maxLength: 500,
    allowedTopics: ['friendship', 'adventure', 'learning', 'animals', 'nature', 'family', 'science', 'history', 'technology']
  }
};

export function checkContentSafety(
  content: string,
  ageGroup: string = '5-8',
  contentType: 'text' | 'image' | 'code' = 'text'
): SafetyCheckResult {
  const lowerContent = content.toLowerCase();
  
  // Check for inappropriate words
  for (const word of INAPPROPRIATE_WORDS) {
    if (lowerContent.includes(word)) {
      return {
        safe: false,
        reason: `Content contains inappropriate word: ${word}`,
        confidence: 0.9
      };
    }
  }
  
  // Age-appropriate checks
  const ageRules = AGE_APPROPRIATE_VOCABULARY[ageGroup as keyof typeof AGE_APPROPRIATE_VOCABULARY];
  if (ageRules) {
    if (content.length > ageRules.maxLength) {
      return {
        safe: false,
        reason: `Content too long for age group ${ageGroup}`,
        confidence: 0.7
      };
    }
  }
  
  // Code-specific safety
  if (contentType === 'code') {
    const dangerousPatterns = [
      /eval\s*\(/i,
      /exec\s*\(/i,
      /__import__/i,
      /open\s*\(/i,
      /file\s*\(/i
    ];
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(content)) {
        return {
          safe: false,
          reason: 'Code contains potentially dangerous operations',
          confidence: 0.95
        };
      }
    }
  }
  
  return {
    safe: true,
    confidence: 0.8
  };
}

export function sanitizePrompt(prompt: string, ageGroup: string): string {
  let sanitized = prompt;
  
  // Remove inappropriate words
  for (const word of INAPPROPRIATE_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    sanitized = sanitized.replace(regex, '');
  }
  
  // Ensure age-appropriate language
  const ageRules = AGE_APPROPRIATE_VOCABULARY[ageGroup as keyof typeof AGE_APPROPRIATE_VOCABULARY];
  if (ageRules) {
    // Truncate if too long
    if (sanitized.length > ageRules.maxLength) {
      sanitized = sanitized.substring(0, ageRules.maxLength) + '...';
    }
  }
  
  return sanitized.trim();
}