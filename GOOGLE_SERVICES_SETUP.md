# Google Services Integration Setup Guide

This guide will help you configure Google OAuth credentials for the unified Google Services integration (Ads, Search Console, Tag Manager, Analytics).

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID for later use

## Step 2: Enable Required APIs

Navigate to "APIs & Services" > "Library" and enable these APIs:
- **Google Ads API**
- **Google Search Console API** 
- **Google Tag Manager API**
- **Google Analytics Reporting API** (v4)
- **Google Analytics Data API** (GA4)

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have Google Workspace)
3. Fill out the application information:
   - **App name**: SiteOptz
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. Add these scopes in the "Scopes" section:
   ```
   https://www.googleapis.com/auth/adwords
   https://www.googleapis.com/auth/webmasters.readonly
   https://www.googleapis.com/auth/tagmanager.readonly  
   https://www.googleapis.com/auth/analytics.readonly
   ```
5. Add test users (your email and any others who need access)
6. Submit for verification (required for production use)

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Configure the settings:
   - **Name**: SiteOptz Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

## Step 5: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update the following variables in `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your_actual_client_id_from_step_4
   GOOGLE_CLIENT_SECRET=your_actual_client_secret_from_step_4
   NEXTAUTH_SECRET=generate_random_32_char_string
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Generate a secure NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/dashboard/free`

3. You should see the "Google Services Integration" section

4. Click "Connect All Services" to test the OAuth flow

## Step 7: Production Setup

For production deployment:

1. Update OAuth consent screen with your production domain
2. Add production URLs to authorized origins and redirect URIs
3. Update `NEXTAUTH_URL` in production environment variables
4. Submit OAuth consent screen for verification by Google

## Troubleshooting

### "Google Client ID not configured"
- Make sure `GOOGLE_CLIENT_ID` is set in `.env.local`
- Restart your development server after adding environment variables

### "redirect_uri_mismatch"
- Check that your redirect URI matches exactly: `/api/auth/callback/google`
- Ensure the domain matches between your app and Google Console settings

### "Scope not authorized"
- Verify all required scopes are added to your OAuth consent screen
- Make sure the consent screen is published (not in testing mode for production)

### "Access blocked: This app's request is invalid"
- Usually means the OAuth consent screen needs to be completed
- Check that all required fields are filled in the consent screen

## API Usage Notes

Once connected, the application can:
- **Google Ads**: Retrieve campaign data, performance metrics, account information
- **Search Console**: Access website search performance, indexing status, sitemap data
- **Tag Manager**: Read container configurations, tags, and triggers
- **Google Analytics**: Access website traffic data, user behavior metrics

All services use the same authentication token from NextAuth, providing a seamless user experience.