#!/bin/bash

# Test lead capture with real API credentials
echo "Testing Lead Capture System with GoHighLevel Integration"
echo "========================================================"
echo ""
echo "This will:"
echo "1. Create a test lead in GoHighLevel"
echo "2. Send email to test@example.com"
echo "3. BCC to info@siteoptz.ai"
echo "4. Trigger 'New Lead Workflow' in GoHighLevel"
echo ""
echo "Sending test lead..."

curl -X POST http://localhost:3000/api/download-resource \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "Lead",
    "email": "test@example.com",
    "company": "Test Company Inc",
    "role": "Marketing Manager",
    "companySize": "50-200",
    "primaryInterest": "ai-chatbot-implementation",
    "resourceType": "ai-chatbot-implementation",
    "timeline": "1-3 months",
    "marketingConsent": true
  }' | json_pp

echo ""
echo "Test complete! Please check:"
echo "1. GoHighLevel contacts for new lead"
echo "2. info@siteoptz.ai inbox for BCC email"
echo "3. GoHighLevel workflow history for 'New Lead Workflow' trigger"