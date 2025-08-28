import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Simple file-based API key storage (for demo purposes)
// In production, use a proper database
const API_KEYS_FILE = path.join(process.cwd(), 'data/api-keys.json');

interface ApiKey {
  id: string;
  key: string;
  name: string;
  email: string;
  created: string;
  lastUsed?: string;
  requestCount: number;
  rateLimit: number;
  isActive: boolean;
}

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(API_KEYS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(API_KEYS_FILE)) {
    fs.writeFileSync(API_KEYS_FILE, '[]');
  }
}

function loadApiKeys(): ApiKey[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(API_KEYS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveApiKeys(keys: ApiKey[]) {
  ensureDataDir();
  fs.writeFileSync(API_KEYS_FILE, JSON.stringify(keys, null, 2));
}

function generateApiKey(): string {
  return 'soz_' + crypto.randomBytes(32).toString('hex');
}

/**
 * API Key Management Endpoint
 * 
 * @route GET /api/auth/api-keys - List user's API keys
 * @route POST /api/auth/api-keys - Create new API key
 * @route DELETE /api/auth/api-keys - Delete API key
 * @route PUT /api/auth/api-keys - Update API key
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        return handleGetKeys(req, res);
      case 'POST':
        return handleCreateKey(req, res);
      case 'PUT':
        return handleUpdateKey(req, res);
      case 'DELETE':
        return handleDeleteKey(req, res);
      default:
        return res.status(405).json({ 
          error: 'Method Not Allowed',
          message: 'Only GET, POST, PUT, DELETE methods are allowed'
        });
    }
  } catch (error) {
    console.error('API Key Management Error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while managing API keys'
    });
  }
}

// GET - List API keys for user
async function handleGetKeys(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;
  
  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Email is required'
    });
  }

  const keys = loadApiKeys();
  const userKeys = keys
    .filter(key => key.email === email)
    .map(key => ({
      id: key.id,
      name: key.name,
      created: key.created,
      lastUsed: key.lastUsed,
      requestCount: key.requestCount,
      rateLimit: key.rateLimit,
      isActive: key.isActive,
      keyPreview: key.key.substring(0, 12) + '...' // Show only first 12 chars
    }));

  return res.status(200).json({
    success: true,
    data: userKeys,
    meta: {
      total: userKeys.length,
      active: userKeys.filter(k => k.isActive).length
    }
  });
}

// POST - Create new API key
async function handleCreateKey(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, rateLimit = 100 } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Name and email are required'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid email format'
    });
  }

  const keys = loadApiKeys();
  
  // Check user doesn't have too many keys
  const userKeyCount = keys.filter(key => key.email === email && key.isActive).length;
  if (userKeyCount >= 5) {
    return res.status(429).json({
      error: 'Too Many Keys',
      message: 'Maximum 5 active API keys per user'
    });
  }

  // Create new key
  const newKey: ApiKey = {
    id: crypto.randomUUID(),
    key: generateApiKey(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    created: new Date().toISOString(),
    requestCount: 0,
    rateLimit: Math.min(rateLimit, 1000), // Cap at 1000 requests
    isActive: true
  };

  keys.push(newKey);
  saveApiKeys(keys);

  return res.status(201).json({
    success: true,
    data: {
      id: newKey.id,
      key: newKey.key, // Full key only shown once
      name: newKey.name,
      created: newKey.created,
      rateLimit: newKey.rateLimit
    },
    message: 'API key created successfully. Store this key securely - it will not be shown again.'
  });
}

// PUT - Update API key
async function handleUpdateKey(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, email, rateLimit, isActive } = req.body;
  
  if (!id || !email) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Key ID and email are required'
    });
  }

  const keys = loadApiKeys();
  const keyIndex = keys.findIndex(key => key.id === id && key.email === email);
  
  if (keyIndex === -1) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'API key not found'
    });
  }

  // Update key
  if (name) keys[keyIndex].name = name.trim();
  if (typeof rateLimit === 'number') keys[keyIndex].rateLimit = Math.min(rateLimit, 1000);
  if (typeof isActive === 'boolean') keys[keyIndex].isActive = isActive;

  saveApiKeys(keys);

  return res.status(200).json({
    success: true,
    data: {
      id: keys[keyIndex].id,
      name: keys[keyIndex].name,
      rateLimit: keys[keyIndex].rateLimit,
      isActive: keys[keyIndex].isActive
    },
    message: 'API key updated successfully'
  });
}

// DELETE - Delete API key
async function handleDeleteKey(req: NextApiRequest, res: NextApiResponse) {
  const { id, email } = req.query;
  
  if (!id || !email) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Key ID and email are required'
    });
  }

  const keys = loadApiKeys();
  const keyIndex = keys.findIndex(key => key.id === id && key.email === email);
  
  if (keyIndex === -1) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'API key not found'
    });
  }

  keys.splice(keyIndex, 1);
  saveApiKeys(keys);

  return res.status(200).json({
    success: true,
    message: 'API key deleted successfully'
  });
}