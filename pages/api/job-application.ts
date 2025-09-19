import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

// Configure API to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

interface JobApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentLocation: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  eligibleToWork: string;
  startDate: string;
  expectedSalary?: string;
  experience: string;
  motivation: string;
  positionTitle: string;
  positionDepartment: string;
  positionLocation: string;
  positionType: string;
  source: string;
  applicationDate: string;
  resumeFile?: formidable.File;
  coverLetterFile?: formidable.File;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('=== Job Application API Called ===');
  
  try {
    // Ensure upload directory exists
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Parse form data including files
    console.log('Creating formidable instance...');
    const form = new IncomingForm({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      filter: function({ name, originalFilename, mimetype }) {
        // Allow all non-file fields and specific file types
        if (!mimetype) {
          return true; // Non-file fields
        }
        return mimetype.includes('application/pdf') ||
               mimetype.includes('application/msword') ||
               mimetype.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      }
    });

    console.log('Parsing form data...');
    
    let fields, files;
    try {
      [fields, files] = await form.parse(req);
      console.log('Form parsed successfully. Fields:', Object.keys(fields));
      console.log('Files received:', Object.keys(files));
    } catch (parseError) {
      console.error('Form parsing error:', parseError);
      throw parseError;
    }

    // Extract form data
    const applicationData: Partial<JobApplicationData> = {};
    
    // Process text fields
    Object.entries(fields).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        applicationData[key as keyof JobApplicationData] = value[0] as any;
      } else {
        applicationData[key as keyof JobApplicationData] = value as any;
      }
    });

    console.log('Text fields processed. Application data keys:', Object.keys(applicationData));

    // Process file uploads
    if (files.resume && Array.isArray(files.resume)) {
      applicationData.resumeFile = files.resume[0];
      console.log('Resume file processed:', applicationData.resumeFile?.originalFilename);
    }
    if (files.coverLetter && Array.isArray(files.coverLetter)) {
      applicationData.coverLetterFile = files.coverLetter[0];
      console.log('Cover letter processed:', applicationData.coverLetterFile?.originalFilename);
    }

    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'currentLocation',
      'eligibleToWork', 'startDate', 'experience', 'motivation',
      'positionTitle'
    ];

    const missingFields = [];
    for (const field of requiredFields) {
      if (!applicationData[field as keyof JobApplicationData]) {
        missingFields.push(field);
      }
    }

    console.log('Validating required fields...');
    
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}`,
        fields: missingFields
      });
    }

    // Validate resume upload
    if (!applicationData.resumeFile) {
      console.log('Resume file missing');
      return res.status(400).json({ 
        message: 'Resume file is required',
        field: 'resume'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email || '')) {
      console.log('Invalid email format:', applicationData.email);
      return res.status(400).json({ 
        message: 'Invalid email format',
        field: 'email'
      });
    }

    console.log('All validations passed. Processing application...');

    // Submit to GoHighLevel CRM - simplified data structure
    const ghlData = {
      email: applicationData.email,
      name: `${applicationData.firstName} ${applicationData.lastName}`,
      phone: applicationData.phone,
      source: 'job_application',
      customFields: {
        position_title: applicationData.positionTitle,
        current_location: applicationData.currentLocation,
        eligible_to_work: applicationData.eligibleToWork,
        start_date: applicationData.startDate
      },
      tags: ['job_applicant']
    };

    // GoHighLevel integration disabled for careers page as requested
    console.log('GoHighLevel integration disabled for job applications');
    const contactId = null;

    // Email notifications (simplified for now)
    console.log('Email notifications temporarily disabled for debugging');
    console.log(`Application received for ${applicationData.positionTitle} from ${applicationData.email}`);

    // Clean up uploaded files after processing
    console.log('Cleaning up uploaded files...');
    try {
      if (applicationData.resumeFile?.filepath && fs.existsSync(applicationData.resumeFile.filepath)) {
        console.log('Deleting resume file:', applicationData.resumeFile.filepath);
        fs.unlinkSync(applicationData.resumeFile.filepath);
      }
      if (applicationData.coverLetterFile?.filepath && fs.existsSync(applicationData.coverLetterFile.filepath)) {
        console.log('Deleting cover letter file:', applicationData.coverLetterFile.filepath);
        fs.unlinkSync(applicationData.coverLetterFile.filepath);
      }
      console.log('File cleanup completed successfully');
    } catch (cleanupError) {
      console.error('Error cleaning up files:', cleanupError);
    }

    console.log('Sending success response...');
    res.status(200).json({
      message: 'Application submitted successfully',
      contactId: contactId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Job application submission error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
    });
  }
}

function generateApplicationEmailHTML(data: Partial<JobApplicationData>): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Job Application</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">New Job Application Received</h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">Position Applied For</h3>
                <p><strong>${data.positionTitle}</strong> - ${data.positionDepartment}</p>
                <p>${data.positionLocation} • ${data.positionType}</p>
            </div>

            <h3 style="color: #1e40af;">Applicant Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Name:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.firstName} ${data.lastName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.email}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.phone}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Location:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.currentLocation}</td>
                </tr>
                ${data.linkedinUrl ? `
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>LinkedIn:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><a href="${data.linkedinUrl}">${data.linkedinUrl}</a></td>
                </tr>
                ` : ''}
                ${data.portfolioUrl ? `
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Portfolio:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><a href="${data.portfolioUrl}">${data.portfolioUrl}</a></td>
                </tr>
                ` : ''}
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Work Authorization:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.eligibleToWork}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Start Date:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.startDate}</td>
                </tr>
                ${data.expectedSalary ? `
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Expected Salary:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.expectedSalary}</td>
                </tr>
                ` : ''}
            </table>

            <h3 style="color: #1e40af;">Relevant Experience</h3>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p style="margin: 0; white-space: pre-wrap;">${data.experience}</p>
            </div>

            <h3 style="color: #1e40af;">Motivation</h3>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p style="margin: 0; white-space: pre-wrap;">${data.motivation}</p>
            </div>

            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #1e40af;"><strong>Note:</strong> Resume and cover letter (if provided) are attached to this email.</p>
            </div>

            <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
                Application submitted on ${new Date(data.applicationDate || '').toLocaleString()}
            </p>
        </div>
    </body>
    </html>
  `;
}

function generateConfirmationEmailHTML(data: Partial<JobApplicationData>): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Application Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2563eb; margin: 0;">SiteOptz</h1>
                <p style="color: #64748b; margin: 5px 0;">Turning AI Into ROI</p>
            </div>

            <h2 style="color: #1e40af;">Thank You for Your Application!</h2>
            
            <p>Dear ${data.firstName},</p>
            
            <p>Thank you for your interest in the <strong>${data.positionTitle}</strong> position at SiteOptz. We've successfully received your application and wanted to confirm the details:</p>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">Application Summary</h3>
                <p><strong>Position:</strong> ${data.positionTitle}</p>
                <p><strong>Department:</strong> ${data.positionDepartment}</p>
                <p><strong>Location:</strong> ${data.positionLocation}</p>
                <p><strong>Type:</strong> ${data.positionType}</p>
                <p><strong>Submitted:</strong> ${new Date(data.applicationDate || '').toLocaleString()}</p>
            </div>

            <h3 style="color: #1e40af;">What Happens Next?</h3>
            <ol>
                <li><strong>Application Review (1-2 weeks):</strong> Our hiring team will carefully review your application and qualifications.</li>
                <li><strong>Initial Screening:</strong> If you're a good fit, we'll reach out to schedule a brief phone/video call.</li>
                <li><strong>Interview Process:</strong> This may include technical assessments and interviews with team members.</li>
                <li><strong>Final Decision:</strong> We'll keep you updated throughout the process.</li>
            </ol>

            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #1e40af; margin-top: 0;">In the Meantime</h4>
                <p>Feel free to explore more about SiteOptz:</p>
                <ul style="margin: 10px 0;">
                    <li><a href="https://siteoptz.ai/about" style="color: #2563eb;">Learn about our mission</a></li>
                    <li><a href="https://siteoptz.ai/tools" style="color: #2563eb;">Explore our AI tools</a></li>
                    <li><a href="https://siteoptz.ai/blog" style="color: #2563eb;">Read our latest insights</a></li>
                </ul>
            </div>

            <p>We appreciate your interest in joining our team and look forward to learning more about you. If you have any questions about your application or our process, don't hesitate to reach out to <a href="mailto:careers@siteoptz.ai" style="color: #2563eb;">careers@siteoptz.ai</a>.</p>

            <p style="margin-top: 30px;">Best regards,<br>
            <strong>The SiteOptz Hiring Team</strong></p>

            <div style="border-top: 1px solid #e2e8f0; margin-top: 40px; padding-top: 20px; text-align: center;">
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                    © ${new Date().getFullYear()} SiteOptz. All rights reserved.<br>
                    <a href="https://siteoptz.ai" style="color: #2563eb;">siteoptz.ai</a>
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}