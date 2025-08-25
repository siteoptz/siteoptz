import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
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

  try {
    // Parse form data including files
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'uploads'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      filter: (part) => {
        return part.mimetype?.includes('application/pdf') ||
               part.mimetype?.includes('application/msword') ||
               part.mimetype?.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
               !part.mimetype; // Allow non-file fields
      }
    });

    // Ensure upload directory exists
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const [fields, files] = await form.parse(req);

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

    // Process file uploads
    if (files.resume && Array.isArray(files.resume)) {
      applicationData.resumeFile = files.resume[0];
    }
    if (files.coverLetter && Array.isArray(files.coverLetter)) {
      applicationData.coverLetterFile = files.coverLetter[0];
    }

    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'currentLocation',
      'eligibleToWork', 'startDate', 'experience', 'motivation',
      'positionTitle'
    ];

    for (const field of requiredFields) {
      if (!applicationData[field as keyof JobApplicationData]) {
        return res.status(400).json({ 
          message: `Missing required field: ${field}`,
          field 
        });
      }
    }

    // Validate resume upload
    if (!applicationData.resumeFile) {
      return res.status(400).json({ 
        message: 'Resume is required',
        field: 'resume'
      });
    }

    // Submit to GoHighLevel CRM
    const ghlData = {
      email: applicationData.email,
      name: `${applicationData.firstName} ${applicationData.lastName}`,
      phone: applicationData.phone,
      source: 'job_application',
      
      // Custom fields for job application
      position_title: applicationData.positionTitle,
      position_department: applicationData.positionDepartment,
      position_location: applicationData.positionLocation,
      position_type: applicationData.positionType,
      current_location: applicationData.currentLocation,
      linkedin_url: applicationData.linkedinUrl || '',
      portfolio_url: applicationData.portfolioUrl || '',
      eligible_to_work: applicationData.eligibleToWork,
      start_date: applicationData.startDate,
      expected_salary: applicationData.expectedSalary || '',
      relevant_experience: applicationData.experience,
      motivation: applicationData.motivation,
      application_date: applicationData.applicationDate,
      
      // File information (we'll store file paths for now)
      resume_uploaded: 'yes',
      cover_letter_uploaded: applicationData.coverLetterFile ? 'yes' : 'no',
      
      // Tags for organization
      tags: ['job_applicant', `position_${applicationData.positionTitle?.toLowerCase().replace(/\s+/g, '_')}`]
    };

    // Submit to GoHighLevel
    const ghlResponse = await fetch(`${process.env.GHL_API_URL}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ghlData),
    });

    let contactId = null;
    if (ghlResponse.ok) {
      const ghlResult = await ghlResponse.json();
      contactId = ghlResult.contact?.id;
      console.log('Job application submitted to GoHighLevel:', contactId);
    } else {
      console.error('Failed to submit to GoHighLevel:', await ghlResponse.text());
      // Continue processing even if GHL fails
    }

    // Send notification email to HR team
    try {
      const emailData: {
        to: string;
        subject: string;
        html: string;
        attachments: Array<{
          filename: string;
          content: string;
          contentType: string;
        }>;
      } = {
        to: process.env.HR_EMAIL || 'careers@siteoptz.ai',
        subject: `New Job Application: ${applicationData.positionTitle}`,
        html: generateApplicationEmailHTML(applicationData),
        attachments: []
      };

      // Add resume attachment
      if (applicationData.resumeFile?.filepath) {
        const resumeContent = fs.readFileSync(applicationData.resumeFile.filepath);
        emailData.attachments.push({
          filename: applicationData.resumeFile.originalFilename || 'resume.pdf',
          content: resumeContent.toString('base64'),
          contentType: applicationData.resumeFile.mimetype || 'application/pdf'
        });
      }

      // Add cover letter attachment if exists
      if (applicationData.coverLetterFile?.filepath) {
        const coverLetterContent = fs.readFileSync(applicationData.coverLetterFile.filepath);
        emailData.attachments.push({
          filename: applicationData.coverLetterFile.originalFilename || 'cover_letter.pdf',
          content: coverLetterContent.toString('base64'),
          contentType: applicationData.coverLetterFile.mimetype || 'application/pdf'
        });
      }

      // Send email using your email service (e.g., SendGrid, SES, etc.)
      // This is a placeholder - implement with your email service
      console.log('Email notification prepared for HR team');

    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the whole request if email fails
    }

    // Send confirmation email to applicant
    try {
      const confirmationEmailData: {
        to: string | undefined;
        subject: string;
        html: string;
      } = {
        to: applicationData.email,
        subject: `Application Received: ${applicationData.positionTitle} at SiteOptz`,
        html: generateConfirmationEmailHTML(applicationData),
      };

      console.log('Confirmation email prepared for applicant');

    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    // Clean up uploaded files after processing
    try {
      if (applicationData.resumeFile?.filepath && fs.existsSync(applicationData.resumeFile.filepath)) {
        fs.unlinkSync(applicationData.resumeFile.filepath);
      }
      if (applicationData.coverLetterFile?.filepath && fs.existsSync(applicationData.coverLetterFile.filepath)) {
        fs.unlinkSync(applicationData.coverLetterFile.filepath);
      }
    } catch (cleanupError) {
      console.error('Error cleaning up files:', cleanupError);
    }

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