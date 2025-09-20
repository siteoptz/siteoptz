#!/usr/bin/env node

/**
 * Discord Community Setup Script for SiteOptz.ai
 * 
 * This script provides step-by-step instructions for setting up the Discord community
 * and generates the necessary configuration files.
 */

const fs = require('fs');
const path = require('path');

console.log(`
🚀 SiteOptz.ai Discord Community Setup
=====================================

This script will help you set up your Discord community integration.

📋 Prerequisites:
1. Discord account with server creation permissions
2. Access to Discord Developer Portal (optional, for custom bot)
3. Basic understanding of Discord server management

📝 Setup Steps:
`);

const setupSteps = [
  {
    step: 1,
    title: "Create Discord Server",
    description: "Create a new Discord server for your AI tools community",
    instructions: [
      "1. Open Discord and click the '+' button",
      "2. Select 'Create My Own'",
      "3. Choose 'For a club or community'",
      "4. Name it 'SiteOptz AI Tools Community'",
      "5. Upload the SiteOptz logo as server icon",
      "6. Choose your region and click 'Create Server'"
    ]
  },
  {
    step: 2,
    title: "Set Up Channel Structure",
    description: "Create the recommended channel structure",
    instructions: [
      "1. Create category: '📢 ANNOUNCEMENTS'",
      "2. Create channels: #general-announcements, #new-tools-spotlight",
      "3. Create category: '💬 GENERAL DISCUSSION'",
      "4. Create channels: #general-chat, #introductions, #off-topic",
      "5. Create category: '🤖 AI TOOLS DISCUSSION'",
      "6. Create channels: #chatgpt-claude-discussion, #image-generation-tools, #productivity-ai-tools, #coding-ai-tools, #marketing-ai-tools, #new-tool-discoveries",
      "7. Create category: '🛠️ TECHNICAL SUPPORT'",
      "8. Create channels: #siteoptz-support, #tool-integration-help, #api-discussions",
      "9. Create category: '📊 SHARING & SHOWCASE'",
      "10. Create channels: #tool-comparisons, #workflow-showcase, #ai-generated-content",
      "11. Create category: '🎯 COMMUNITY'",
      "12. Create channels: #feedback-suggestions, #feature-requests, #community-events"
    ]
  },
  {
    step: 3,
    title: "Configure Server Settings",
    description: "Set up server permissions and verification",
    instructions: [
      "1. Go to Server Settings > Overview",
      "2. Set verification level to 'Medium' (verified email required)",
      "3. Enable 2FA requirement for moderators",
      "4. Set default notification settings to 'Only @mentions'",
      "5. Enable auto-moderation for spam and explicit content"
    ]
  },
  {
    step: 4,
    title: "Create Role Structure",
    description: "Set up roles for community management",
    instructions: [
      "1. Create role: @Member (verified community members)",
      "2. Create role: @Contributor (active tool reviewers)",
      "3. Create role: @Moderator (community moderators)",
      "4. Create role: @SiteOptz Team (official team members)",
      "5. Set appropriate permissions for each role",
      "6. Create auto-role assignment rules"
    ]
  },
  {
    step: 5,
    title: "Add Essential Bots",
    description: "Install recommended Discord bots",
    instructions: [
      "1. Add MEE6 bot for moderation and auto-roles",
      "2. Add Carl-bot for advanced moderation features",
      "3. Add Dyno bot for comprehensive server management",
      "4. Configure bot permissions and commands",
      "5. Set up auto-moderation rules"
    ]
  },
  {
    step: 6,
    title: "Create Community Guidelines",
    description: "Set up rules and guidelines",
    instructions: [
      "1. Create a #rules channel",
      "2. Post the community guidelines from DISCORD_SETUP_GUIDE.md",
      "3. Set up welcome message with rules",
      "4. Configure auto-moderation for rule violations",
      "5. Create a #faq channel for common questions"
    ]
  },
  {
    step: 7,
    title: "Generate Invite Link",
    description: "Create permanent invite link for website integration",
    instructions: [
      "1. Go to Server Settings > Invites",
      "2. Create new invite with 'Never' expiration",
      "3. Set max uses to 'No limit'",
      "4. Copy the invite link",
      "5. Update the invite link in your website components"
    ]
  },
  {
    step: 8,
    title: "Test Integration",
    description: "Verify website integration works correctly",
    instructions: [
      "1. Test Discord links in header navigation",
      "2. Test Discord widget on community page",
      "3. Test Discord discussion buttons on tool pages",
      "4. Verify analytics tracking for Discord clicks",
      "5. Test mobile responsiveness of Discord components"
    ]
  }
];

setupSteps.forEach(step => {
  console.log(`
${step.step}. ${step.title}
${'='.repeat(step.title.length + 3)}
${step.description}

Instructions:
${step.instructions.map(instruction => `   ${instruction}`).join('\n')}
`);
});

console.log(`
🎉 Next Steps:
=============

1. Follow the setup steps above to create your Discord server
2. Update the invite link in your website components:
   - components/Header.tsx
   - components/Footer.tsx
   - components/CommunitySection.tsx
   - components/DiscordWidget.tsx
   - components/DiscordDiscussionButton.tsx

3. Replace 'https://discord.gg/siteoptz' with your actual invite link

4. Test the integration by:
   - Clicking community links from your website
   - Verifying Discord server loads correctly
   - Testing mobile responsiveness

5. Launch your community:
   - Invite existing SiteOptz users
   - Share on social media
   - Announce in your newsletter
   - Create launch event

📚 Resources:
============

- Discord Setup Guide: DISCORD_SETUP_GUIDE.md
- Community Components: components/CommunitySection.tsx
- Discord Widget: components/DiscordWidget.tsx
- Discussion Buttons: components/DiscordDiscussionButton.tsx

💡 Pro Tips:
============

1. Start with a small group of beta users to test the community
2. Set up regular community events to drive engagement
3. Use Discord's built-in analytics to track growth
4. Consider creating a custom bot for advanced features
5. Cross-promote community content on your website

Need help? Check the DISCORD_SETUP_GUIDE.md for detailed instructions.
`);

// Generate environment variables template
const envTemplate = `
# Discord Community Configuration
DISCORD_INVITE_URL=https://discord.gg/siteoptz
DISCORD_SERVER_ID=your_server_id_here
DISCORD_BOT_TOKEN=your_bot_token_here
DISCORD_WEBHOOK_URL=your_webhook_url_here
`;

fs.writeFileSync(path.join(__dirname, '../.env.discord.example'), envTemplate);

console.log(`
📄 Generated Files:
==================

- .env.discord.example - Environment variables template for Discord integration

Add these variables to your .env.local file when you're ready to implement advanced features.
`);

console.log(`
✅ Setup script completed!

Your Discord community integration is ready to be deployed. 
Follow the steps above to create your Discord server and update the invite links.
`);
