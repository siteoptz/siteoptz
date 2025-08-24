#!/bin/bash

echo "Testing All API Endpoints with GoHighLevel Integration"
echo "===================================================="
echo ""

# Test 1: Newsletter subscription
echo "1. Testing Newsletter Subscription API..."
echo "----------------------------------------"
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test-newsletter@example.com",
    "name": "Newsletter Test",
    "company": "Test Company",
    "source": "API Test",
    "tool": "ChatGPT",
    "category": "Content Generation",
    "interests": ["AI Tools", "Content Creation"],
    "useCase": "Marketing automation",
    "referrer": "test"
  }' | json_pp

echo ""
echo ""

# Test 2: Expert Consultation
echo "2. Testing Expert Consultation API..."
echo "------------------------------------"
curl -X POST http://localhost:3000/api/expert-consultation \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Consultation",
    "lastName": "Test",
    "email": "test-consultation@example.com",
    "company": "Test Consulting Inc",
    "phone": "+1-555-0123",
    "message": "Need help with AI strategy implementation",
    "interestedTools": ["ChatGPT", "Claude"],
    "budget": "$10,000-$25,000",
    "timeline": "3-6 months",
    "totalCost": 15000,
    "billingCycle": "monthly"
  }' | json_pp

echo ""
echo ""

# Test 3: Resource Download  
echo "3. Testing Resource Download API..."
echo "----------------------------------"
curl -X POST http://localhost:3000/api/download-resource \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Resource",
    "lastName": "Test",
    "email": "test-resource@example.com",
    "company": "Test Resources LLC",
    "role": "Marketing Manager",
    "companySize": "50-200",
    "primaryInterest": "AI Content Generation",
    "resourceType": "ai-content-generation",
    "timeline": "1-3 months",
    "marketingConsent": true
  }' | json_pp

echo ""
echo ""
echo "Test Complete! Please check:"
echo "1. GoHighLevel contacts for 3 new leads"
echo "2. info@siteoptz.ai inbox for notification emails"
echo "3. Server logs for GoHighLevel integration success messages"