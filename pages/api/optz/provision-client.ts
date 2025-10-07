import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { createOptzClient, getClientByEmail } from '../clients/create';

interface ProvisionRequest {
  email: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  companyName?: string;
}

/**
 * Auto-provision white-label client accounts when users subscribe to plans
 * This API is called from the Stripe webhook or user upgrade flow
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, plan, companyName }: ProvisionRequest = req.body;

    if (!email || !plan) {
      return res.status(400).json({ error: 'Email and plan are required' });
    }

    // Check if client already exists
    const existingClient = await getClientByEmail(email);
    
    if (existingClient) {
      // Update existing client's plan if it's an upgrade
      const planHierarchy = { free: 0, starter: 1, pro: 2, enterprise: 3 };
      const currentPlanLevel = planHierarchy[existingClient.plan as keyof typeof planHierarchy] || 0;
      const newPlanLevel = planHierarchy[plan] || 0;
      
      if (newPlanLevel > currentPlanLevel) {
        // Upgrade the client's plan
        const updatedClient = await updateClientPlan(existingClient.id, plan);
        
        return res.status(200).json({
          success: true,
          message: 'Client plan upgraded successfully',
          client: {
            id: updatedClient.id,
            username: updatedClient.username,
            plan: updatedClient.plan,
            isUpgrade: true
          }
        });
      } else {
        // Same or lower plan - return existing client
        return res.status(200).json({
          success: true,
          message: 'Client already exists with same or higher plan',
          client: {
            id: existingClient.id,
            username: existingClient.username,
            plan: existingClient.plan,
            isUpgrade: false
          }
        });
      }
    }

    // Create new white-label client
    const dashboardAccess = getDashboardAccessByPlan(plan);
    
    const clientData = {
      email,
      companyName: companyName || extractCompanyFromEmail(email),
      plan,
      dashboardAccess,
      sendCredentials: false, // Don't send email for auto-provisioned accounts
      isAutoProvisioned: true
    };

    const result = await createOptzClient(clientData);

    if (result.success && 'client' in result) {
      return res.status(200).json({
        success: true,
        message: 'White-label client provisioned successfully',
        client: {
          id: result.client.id,
          username: result.client.username,
          plan: result.client.plan,
          dashboardAccess: result.client.dashboardAccess,
          isUpgrade: false
        }
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Failed to provision client',
        details: 'error' in result ? result.error : 'Unknown error'
      });
    }

  } catch (error) {
    console.error('Error in provision-client:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to provision client',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Update client plan (placeholder - implement actual database update)
 */
async function updateClientPlan(clientId: string, newPlan: string) {
  // TODO: Implement actual database update
  // For now, return mock data
  return {
    id: clientId,
    username: `client_${clientId.slice(-4)}`,
    plan: newPlan,
    dashboardAccess: getDashboardAccessByPlan(newPlan)
  };
}

/**
 * Get dashboard access permissions based on plan
 */
function getDashboardAccessByPlan(plan: string): string[] {
  const accessMap: Record<string, string[]> = {
    free: ['basic'],
    starter: ['basic', 'marketing'],
    pro: ['basic', 'marketing', 'advanced'],
    enterprise: ['basic', 'marketing', 'advanced', 'executive']
  };
  
  return accessMap[plan] || ['basic'];
}

/**
 * Extract company name from email domain
 */
function extractCompanyFromEmail(email: string): string {
  const domain = email.split('@')[1];
  const company = domain.split('.')[0];
  return company.charAt(0).toUpperCase() + company.slice(1);
}