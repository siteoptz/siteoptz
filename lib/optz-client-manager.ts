// Optz Client Manager - Handles client/user creation and management
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

interface OptzClient {
  id: string;
  email: string;
  username: string;
  password: string; // Hashed password
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  companyName: string;
  isActive: boolean;
  ghlContactId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateClientParams {
  email: string;
  plan: string;
  username: string;
  password: string; // Already hashed
  companyName: string;
  isActive: boolean;
  ghlContactId?: string;
  metadata?: Record<string, any>;
}

interface ClientResult {
  success: boolean;
  data?: OptzClient;
  error?: string;
}

// In-memory storage for development (replace with database in production)
const clients: Map<string, OptzClient> = new Map();

/**
 * Create a new Optz client/user
 */
export async function createOptzClient(params: CreateClientParams): Promise<ClientResult> {
  try {
    const { 
      email, 
      plan, 
      username, 
      password, 
      companyName, 
      isActive, 
      ghlContactId,
      metadata 
    } = params;

    // Check if client already exists
    const existingClient = await getClientByEmail(email);
    if (existingClient) {
      return {
        success: false,
        error: 'Client with this email already exists'
      };
    }

    // Create new client
    const client: OptzClient = {
      id: crypto.randomBytes(16).toString('hex'),
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password, // Already hashed
      plan: plan as OptzClient['plan'],
      companyName,
      isActive,
      ghlContactId,
      metadata,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to storage (in production, save to database)
    clients.set(client.email, client);
    
    // Also save by ID for quick lookup
    clients.set(client.id, client);

    console.log('Optz client created:', {
      id: client.id,
      email: client.email,
      plan: client.plan,
      companyName: client.companyName
    });

    // Return client without password
    const { password: _, ...safeClient } = client;
    
    return {
      success: true,
      data: client
    };
    
  } catch (error: any) {
    console.error('Error creating Optz client:', error);
    return {
      success: false,
      error: error.message || 'Failed to create client'
    };
  }
}

/**
 * Get client by email
 */
export async function getClientByEmail(email: string): Promise<OptzClient | null> {
  try {
    // In production, query database
    const client = clients.get(email.toLowerCase());
    return client || null;
  } catch (error) {
    console.error('Error getting client by email:', error);
    return null;
  }
}

/**
 * Get client by ID
 */
export async function getClientById(id: string): Promise<OptzClient | null> {
  try {
    // In production, query database
    const client = clients.get(id);
    return client || null;
  } catch (error) {
    console.error('Error getting client by ID:', error);
    return null;
  }
}

/**
 * Update client plan
 */
export async function updateClientPlan(
  email: string, 
  newPlan: OptzClient['plan']
): Promise<ClientResult> {
  try {
    const client = await getClientByEmail(email);
    
    if (!client) {
      return {
        success: false,
        error: 'Client not found'
      };
    }

    // Update plan
    client.plan = newPlan;
    client.updatedAt = new Date();

    // Save to storage
    clients.set(client.email, client);
    clients.set(client.id, client);

    console.log('Client plan updated:', {
      email: client.email,
      newPlan
    });

    return {
      success: true,
      data: client
    };
    
  } catch (error: any) {
    console.error('Error updating client plan:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Verify client password
 */
export async function verifyClientPassword(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const client = await getClientByEmail(email);
    
    if (!client) {
      return false;
    }

    // Compare password with hashed password
    const isValid = await bcrypt.compare(password, client.password);
    return isValid;
    
  } catch (error) {
    console.error('Error verifying client password:', error);
    return false;
  }
}

/**
 * Get all clients (for admin purposes)
 */
export async function getAllClients(): Promise<OptzClient[]> {
  try {
    // Filter out duplicate entries (by ID vs email)
    const uniqueClients: OptzClient[] = [];
    const seenIds = new Set<string>();
    
    for (const client of clients.values()) {
      if (!seenIds.has(client.id)) {
        seenIds.add(client.id);
        uniqueClients.push(client);
      }
    }
    
    return uniqueClients;
    
  } catch (error) {
    console.error('Error getting all clients:', error);
    return [];
  }
}

/**
 * Delete client (soft delete - sets isActive to false)
 */
export async function deleteClient(email: string): Promise<ClientResult> {
  try {
    const client = await getClientByEmail(email);
    
    if (!client) {
      return {
        success: false,
        error: 'Client not found'
      };
    }

    // Soft delete
    client.isActive = false;
    client.updatedAt = new Date();

    // Save to storage
    clients.set(client.email, client);
    clients.set(client.id, client);

    console.log('Client soft deleted:', client.email);

    return {
      success: true,
      data: client
    };
    
  } catch (error: any) {
    console.error('Error deleting client:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Count clients by plan (for analytics)
 */
export async function countClientsByPlan(): Promise<Record<string, number>> {
  try {
    const counts: Record<string, number> = {
      free: 0,
      starter: 0,
      pro: 0,
      enterprise: 0
    };

    const allClients = await getAllClients();
    
    for (const client of allClients) {
      if (client.isActive) {
        counts[client.plan] = (counts[client.plan] || 0) + 1;
      }
    }

    return counts;
    
  } catch (error) {
    console.error('Error counting clients by plan:', error);
    return {
      free: 0,
      starter: 0,
      pro: 0,
      enterprise: 0
    };
  }
}

// Export types
export type { OptzClient, CreateClientParams, ClientResult };