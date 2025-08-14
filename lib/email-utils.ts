// Email validation and utility functions

export interface EmailValidationResult {
  isValid: boolean;
  errors: string[];
  suggestions?: string[];
}

// Common email validation patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const disposableDomains = [
  'tempmail.org',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'yopmail.com',
  'temp-mail.org',
  'throwaway.email',
  'maildrop.cc',
  'trashmail.com',
  'sharklasers.com'
];

const commonTypos = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'yahooo.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com'
};

export function validateEmail(email: string): EmailValidationResult {
  const errors: string[] = [];
  const suggestions: string[] = [];
  
  // Basic format validation
  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
    return { isValid: false, errors };
  }
  
  const trimmedEmail = email.trim().toLowerCase();
  
  if (!emailRegex.test(trimmedEmail)) {
    errors.push('Invalid email format');
    return { isValid: false, errors };
  }
  
  const [localPart, domain] = trimmedEmail.split('@');
  
  // Local part validation
  if (localPart.length > 64) {
    errors.push('Email local part too long (max 64 characters)');
  }
  
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    errors.push('Email cannot start or end with a dot');
  }
  
  if (localPart.includes('..')) {
    errors.push('Email cannot contain consecutive dots');
  }
  
  // Domain validation
  if (domain.length > 253) {
    errors.push('Email domain too long (max 253 characters)');
  }
  
  // Check for disposable domains
  if (disposableDomains.includes(domain)) {
    errors.push('Disposable email addresses are not allowed');
  }
  
  // Check for common typos and suggest corrections
  if (commonTypos[domain]) {
    suggestions.push(`Did you mean ${localPart}@${commonTypos[domain]}?`);
  }
  
  // Additional checks for suspicious patterns
  if (localPart.length < 2) {
    errors.push('Email local part too short');
  }
  
  // Check for valid TLD
  const tld = domain.split('.').pop();
  if (!tld || tld.length < 2) {
    errors.push('Invalid top-level domain');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    suggestions: suggestions.length > 0 ? suggestions : undefined
  };
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function getEmailDomain(email: string): string {
  return email.split('@')[1]?.toLowerCase() || '';
}

export function isBusinessEmail(email: string): boolean {
  const domain = getEmailDomain(email);
  const personalDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'aol.com',
    'protonmail.com',
    'yandex.com'
  ];
  
  return !personalDomains.includes(domain);
}

export function generateEmailHash(email: string): string {
  // Simple hash for email anonymization in analytics
  let hash = 0;
  const normalizedEmail = normalizeEmail(email);
  
  for (let i = 0; i < normalizedEmail.length; i++) {
    const char = normalizedEmail.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
}

// Email template utilities
export interface WelcomeEmailData {
  email: string;
  source: string;
  tool?: string;
  name?: string;
  interests?: string[];
}

export function getWelcomeEmailTemplate(data: WelcomeEmailData): {
  subject: string;
  templateId?: string;
  dynamicData: Record<string, any>;
} {
  const baseData = {
    recipient_email: data.email,
    recipient_name: data.name || 'AI Tool Explorer',
    source: data.source,
    unsubscribe_url: `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?email=${encodeURIComponent(data.email)}`,
    site_url: process.env.NEXT_PUBLIC_BASE_URL,
    current_year: new Date().getFullYear()
  };
  
  if (data.tool) {
    return {
      subject: `Welcome! Your ${data.tool} insights are coming`,
      templateId: process.env.SENDGRID_TOOL_WELCOME_TEMPLATE,
      dynamicData: {
        ...baseData,
        tool_name: data.tool,
        tool_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tools/${data.tool}`,
        personalized_content: true
      }
    };
  }
  
  return {
    subject: 'Welcome to SiteOptz.ai - Your AI Tool Resource',
    templateId: process.env.SENDGRID_GENERAL_WELCOME_TEMPLATE,
    dynamicData: {
      ...baseData,
      interests: data.interests?.join(', ') || 'AI Tools',
      personalized_content: false
    }
  };
}

// Analytics data preparation
export function prepareEmailAnalytics(email: string, source: string, tool?: string): {
  event: string;
  properties: Record<string, any>;
} {
  const domain = getEmailDomain(email);
  const isBusinessUser = isBusinessEmail(email);
  
  return {
    event: 'email_subscription',
    properties: {
      email_hash: generateEmailHash(email),
      email_domain: domain,
      source,
      tool: tool || null,
      is_business_email: isBusinessUser,
      timestamp: new Date().toISOString(),
      user_type: isBusinessUser ? 'business' : 'personal'
    }
  };
}