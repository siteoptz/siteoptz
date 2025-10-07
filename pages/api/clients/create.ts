import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import nodemailer from 'nodemailer';

// Client database schema
interface CyfeClient {
  id: string;
  email: string;
  username: string;
  password: string; // hashed
  companyName: string;
  plan: 'trial' | 'basic' | 'pro' | 'enterprise';
  dashboardAccess: string[];
  createdAt: Date;
  createdBy: string;
  lastLogin?: Date;
  isActive: boolean;
  apiKey: string;
  whitelabelSettings?: {
    customDomain?: string;
    logoUrl?: string;
    primaryColor?: string;
    companyBranding?: boolean;
  };
}

// In production, this would be stored in a database
const clientsDB: CyfeClient[] = [];

// Export functions for use by other APIs
export const createOptzClient = async (clientData: any) => {
  try {
    return await createClientInternal(clientData);
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const getClientByEmail = async (email: string): Promise<CyfeClient | null> => {
  return clientsDB.find(client => client.email === email) || null;
};

// Email transporter configuration
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Generate secure password
const generatePassword = () => {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

// Send welcome email with credentials
const sendWelcomeEmail = async (client: {
  email: string;
  username: string;
  password: string;
  companyName: string;
}) => {
  const transporter = createEmailTransporter();
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@siteoptz.ai',
    to: client.email,
    subject: 'Welcome to SiteOptz Cyfe Dashboard - Your Access Credentials',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1>Welcome to SiteOptz Cyfe Dashboard</h1>
        </div>
        <div style="padding: 20px; background-color: #f7f7f7;">
          <h2>Hello ${client.companyName},</h2>
          <p>Your white-label dashboard access has been created. Please find your login credentials below:</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Access Details:</h3>
            <p><strong>Dashboard URL:</strong> <a href="https://optz.siteoptz.ai">https://optz.siteoptz.ai</a></p>
            <p><strong>Username:</strong> ${client.username}</p>
            <p><strong>Password:</strong> ${client.password}</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <strong>Important:</strong> Please change your password after your first login for security purposes.
          </div>
          
          <h3>Getting Started:</h3>
          <ol>
            <li>Visit the dashboard URL above</li>
            <li>Enter your username and password</li>
            <li>Explore your personalized analytics dashboard</li>
            <li>Configure your dashboard widgets and settings</li>
          </ol>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666;">
            <p>Best regards,<br>The SiteOptz Team</p>
            <p style="font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', client.email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

// Internal client creation function (reusable)
const createClientInternal = async (clientData: any, createdBy?: string) => {
  const { 
    email, 
    companyName, 
    plan = 'trial',
    sendCredentials = true,
    customUsername,
    dashboardAccess = ['basic'],
    isAutoProvisioned = false
  } = clientData;

  // Validate input
  if (!email || !companyName) {
    throw new Error('Email and company name are required');
  }

  // Check if client already exists
  const existingClient = clientsDB.find(c => c.email === email);
  if (existingClient) {
    throw new Error('Client with this email already exists');
  }

  // Generate credentials
  const username = customUsername || email.split('@')[0] + '_' + nanoid(4);
  const plainPassword = generatePassword();
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const apiKey = 'cyfe_' + nanoid(32);

  // Create new client
  const newClient: CyfeClient = {
    id: nanoid(),
    email,
    username,
    password: hashedPassword,
    companyName,
    plan,
    dashboardAccess,
    createdAt: new Date(),
    createdBy: createdBy || 'system',
    isActive: true,
    apiKey,
    whitelabelSettings: {
      companyBranding: plan === 'enterprise',
      primaryColor: '#667eea',
    }
  };

  // Save to database (in production, use actual database)
  clientsDB.push(newClient);

  // Send welcome email if requested
  if (sendCredentials && !isAutoProvisioned) {
    try {
      await sendWelcomeEmail({
        email,
        username,
        password: plainPassword,
        companyName
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Continue even if email fails
    }
  }

  // Log the activity
  console.log(`New Cyfe client created: ${email} by ${createdBy || 'system'}`);

  return {
    success: true,
    client: {
      id: newClient.id,
      email: newClient.email,
      username: newClient.username,
      companyName: newClient.companyName,
      plan: newClient.plan,
      dashboardAccess: newClient.dashboardAccess,
      apiKey: newClient.apiKey,
      credentials: isAutoProvisioned ? null : { username, password: plainPassword }
    }
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if user is authenticated and authorized
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await createClientInternal(req.body, session.user.email);
    return res.status(201).json(result);

  } catch (error) {
    console.error('Error creating client:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to create client',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Helper function to get all clients (for admin dashboard)
export async function getAllClients(createdBy?: string): Promise<CyfeClient[]> {
  if (createdBy) {
    return clientsDB.filter(c => c.createdBy === createdBy);
  }
  return clientsDB;
}

// Helper function to update client
export async function updateClient(id: string, updates: Partial<CyfeClient>): Promise<CyfeClient | null> {
  const index = clientsDB.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  clientsDB[index] = { ...clientsDB[index], ...updates };
  return clientsDB[index];
}

// Helper function to validate client login
export async function validateClientLogin(username: string, password: string): Promise<CyfeClient | null> {
  const client = clientsDB.find(c => c.username === username && c.isActive);
  if (!client) return null;
  
  const isValid = await bcrypt.compare(password, client.password);
  if (!isValid) return null;
  
  // Update last login
  client.lastLogin = new Date();
  
  return client;
}