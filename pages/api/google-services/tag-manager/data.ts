// pages/api/google-services/tag-manager/data.ts
// API endpoint to fetch Google Tag Manager data

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

interface TagManagerData {
  accounts: Array<{
    accountId: string;
    name: string;
    path: string;
  }>;
  containers: Array<{
    accountId: string;
    containerId: string;
    name: string;
    publicId: string;
    path: string;
    usageContext: string[];
    fingerprint: string;
    tagManagerUrl: string;
  }>;
  tags: Array<{
    accountId: string;
    containerId: string;
    tagId: string;
    name: string;
    type: string;
    firingTriggerIds: string[];
    path: string;
  }>;
  triggers: Array<{
    accountId: string;
    containerId: string;
    triggerId: string;
    name: string;
    type: string;
    path: string;
  }>;
  variables: Array<{
    accountId: string;
    containerId: string;
    variableId: string;
    name: string;
    type: string;
    path: string;
  }>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const accessToken = (session as any).accessToken;
    
    if (!accessToken) {
      return res.status(401).json({ error: 'No Google access token found' });
    }

    // Check if Tag Manager scope is available
    const googleScope = (session as any).googleScope || '';
    if (!googleScope.includes('https://www.googleapis.com/auth/tagmanager.readonly')) {
      return res.status(403).json({ error: 'Tag Manager access not granted' });
    }

    console.log('🔍 Fetching Tag Manager data for user:', session.user.email);

    // Mock data for now - replace with actual Tag Manager API calls
    const mockData: TagManagerData = {
      accounts: [
        {
          accountId: '6000000001',
          name: 'SiteOptz Account',
          path: 'accounts/6000000001'
        }
      ],
      containers: [
        {
          accountId: '6000000001',
          containerId: '12345678',
          name: 'SiteOptz Website',
          publicId: 'GTM-ABC123',
          path: 'accounts/6000000001/containers/12345678',
          usageContext: ['WEB'],
          fingerprint: '1640995200000',
          tagManagerUrl: 'https://tagmanager.google.com/#/container/accounts/6000000001/containers/12345678'
        }
      ],
      tags: [
        {
          accountId: '6000000001',
          containerId: '12345678',
          tagId: '1',
          name: 'Google Analytics - GA4',
          type: 'gaawe',
          firingTriggerIds: ['2147479553'],
          path: 'accounts/6000000001/containers/12345678/tags/1'
        },
        {
          accountId: '6000000001',
          containerId: '12345678',
          tagId: '2',
          name: 'Google Ads Conversion Tracking',
          type: 'awct',
          firingTriggerIds: ['2147479554'],
          path: 'accounts/6000000001/containers/12345678/tags/2'
        },
        {
          accountId: '6000000001',
          containerId: '12345678',
          tagId: '3',
          name: 'Facebook Pixel',
          type: 'html',
          firingTriggerIds: ['2147479553'],
          path: 'accounts/6000000001/containers/12345678/tags/3'
        },
        {
          accountId: '6000000001',
          containerId: '12345678',
          tagId: '4',
          name: 'Hotjar Tracking',
          type: 'html',
          firingTriggerIds: ['2147479553'],
          path: 'accounts/6000000001/containers/12345678/tags/4'
        }
      ],
      triggers: [
        {
          accountId: '6000000001',
          containerId: '12345678',
          triggerId: '2147479553',
          name: 'All Pages',
          type: 'pageview',
          path: 'accounts/6000000001/containers/12345678/triggers/2147479553'
        },
        {
          accountId: '6000000001',
          containerId: '12345678',
          triggerId: '2147479554',
          name: 'Conversion - Form Submit',
          type: 'formSubmit',
          path: 'accounts/6000000001/containers/12345678/triggers/2147479554'
        },
        {
          accountId: '6000000001',
          containerId: '12345678',
          triggerId: '2147479555',
          name: 'Click - CTA Button',
          type: 'click',
          path: 'accounts/6000000001/containers/12345678/triggers/2147479555'
        }
      ],
      variables: [
        {
          accountId: '6000000001',
          containerId: '12345678',
          variableId: '1',
          name: 'Google Analytics Measurement ID',
          type: 'c',
          path: 'accounts/6000000001/containers/12345678/variables/1'
        },
        {
          accountId: '6000000001',
          containerId: '12345678',
          variableId: '2',
          name: 'Google Ads Conversion ID',
          type: 'c',
          path: 'accounts/6000000001/containers/12345678/variables/2'
        },
        {
          accountId: '6000000001',
          containerId: '12345678',
          variableId: '3',
          name: 'Page URL',
          type: 'u',
          path: 'accounts/6000000001/containers/12345678/variables/3'
        }
      ]
    };

    return res.status(200).json({
      success: true,
      data: mockData,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching Tag Manager data:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch Tag Manager data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}