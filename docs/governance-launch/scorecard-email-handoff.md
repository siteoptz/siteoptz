# AI Compliance Scorecard Email Sequence Handoff

**For**: Marketing team email automation setup  
**Tool**: To be configured in primary email platform (HubSpot/Customer.io/Mailchimp)  
**Trigger**: Scorecard completion at `/ai-governance/scorecard`

---

## Trigger Event & Payload

The scorecard sends a completion event to the existing email capture endpoint (`/api/email-capture`) with the following structure:

### Email Capture Payload
```json
{
  "email": "user@company.com",
  "tool": "AI Compliance Readiness Scorecard",
  "source": "scorecard-completion",
  "additionalData": {
    "company": "Company Name",
    "role": "founder",
    "companySize": "11-50",
    "scorecardResults": {
      "totalScore": 30,
      "scoreBand": "Critical Risk",
      "scoreBandEmoji": "🔴",
      "scorePercentage": 30,
      "questionScores": {
        "q1": 3, "q2": 7, "q3": 0, "q4": 0, "q5": 3,
        "q6": 7, "q7": 0, "q8": 3, "q9": 0, "q10": 7
      },
      "topGaps": [
        {
          "category": "Vendor Due Diligence",
          "score": 0,
          "priority": "critical"
        },
        {
          "category": "AI Acceptable Use Policy", 
          "score": 0,
          "priority": "critical"
        },
        {
          "category": "Customer & Contractual Obligations",
          "score": 0,
          "priority": "critical"
        }
      ],
      "recommendedActionAtSubmission": "Book a free AI risk strategy call",
      "completedAt": "2026-06-01T10:30:00.000Z",
      "completionTimeSeconds": 323,
      "scorecardVersion": "v1.0",
      "pageSource": "scorecard-standalone"
    },
    "utm_source": "linkedin",
    "utm_medium": "social", 
    "utm_campaign": "compliance_awareness_q1",
    "leadQualifiers": {
      "qualificationTier": "critical",
      "companyStage": "11-50",
      "decisionMakerLevel": "high"
    }
  }
}
```

---

## Email Automation Fields

### Required Custom Fields for Email Platform

**Lead Identification:**
- `email` (string) - Primary contact email
- `company` (string) - Company name
- `role` (string) - Contact's role/title
- `company_size` (string) - Number of employees

**Scorecard Results:**
- `scorecard_total_score` (number) - Total score out of 100
- `scorecard_band` (string) - Risk band: "Critical Risk", "Foundational Gaps", "Mostly Ready", "Audit-Ready"
- `scorecard_band_emoji` (string) - Visual indicator: 🔴, 🟡, 🟢, 🏆
- `scorecard_percentage` (number) - Score as percentage

**Top 3 Gaps (for personalization):**
- `top_gap_1_category` (string) - Highest priority gap category
- `top_gap_1_score` (number) - Score for gap 1 (0-10)
- `top_gap_1_priority` (string) - Priority level: "critical", "medium"
- `top_gap_2_category` (string) - Second priority gap category  
- `top_gap_2_score` (number) - Score for gap 2 (0-10)
- `top_gap_2_priority` (string) - Priority level: "critical", "medium"
- `top_gap_3_category` (string) - Third priority gap category
- `top_gap_3_score` (number) - Score for gap 3 (0-10)
- `top_gap_3_priority` (string) - Priority level: "critical", "medium"

**Marketing Attribution:**
- `utm_source` (string) - Traffic source
- `utm_medium` (string) - Marketing medium
- `utm_campaign` (string) - Campaign identifier

**Lead Qualification:**
- `qualification_tier` (string) - Lead quality: "critical", "foundational_gaps", "mostly_ready", "audit_ready"
- `decision_maker_level` (string) - Authority level: "high", "medium", "low"
- `recommended_action` (string) - CTA at time of submission

---

## 5-Email Sequence Schedule

### Email 1: Day 0 (Immediate)
**Trigger**: Scorecard completion  
**Subject**: "Your AI Compliance Score: {{scorecard_percentage}}% ({{scorecard_band}})"  
**Personalization**: Use `scorecard_band`, `top_gap_1_category`, `recommended_action`

### Email 2: Day 2
**Subject**: "The #1 gap you reported: {{top_gap_1_category}}"  
**Content**: Case study of 3 companies that fixed this specific gap  
**Personalization**: Use `top_gap_1_category`, `company_size`

### Email 3: Day 5  
**Subject**: "Free resource: Founder's Guide to AI Compliance"  
**Content**: Founder's Guide download offer  
**CTA**: Link to `/resources/founders-guide-ai-compliance`

### Email 4: Day 9
**Subject**: "Webinar invite: AI Governance for Companies That Actually Ship"  
**Content**: Educational webinar registration  
**Segmentation**: Send only to `qualification_tier` = "foundational_gaps" or "mostly_ready"

### Email 5: Day 14
**Subject**: "Ready to see Compliance Copilot in action?"  
**Content**: Demo offer for AI governance platform  
**Segmentation**: Send to all tiers, customize CTA by `qualification_tier`

---

## Segmentation Rules

### By Qualification Tier:
- **critical** (0-30 points): Focus on strategy calls, foundational help
- **foundational_gaps** (31-60 points): Emphasize templates, guided implementation  
- **mostly_ready** (61-85 points): Advanced features, framework compliance
- **audit_ready** (86-100 points): Certification paths, enterprise features

### By Company Size:
- **1-10 employees**: Bootstrap-friendly messaging, founder-focused
- **11-50 employees**: SMB growth challenges, scaling concerns
- **51-200 employees**: Mid-market compliance, procurement readiness
- **201+ employees**: Enterprise features, audit requirements

### By Role:
- **founder/ceo**: Business impact, deal flow, fundraising
- **cto/engineering**: Technical implementation, developer workflows
- **legal/compliance**: Regulatory requirements, audit preparation
- **operations**: Process efficiency, team coordination

---

## Dynamic Content Variables

Use these variables for email personalization:

```
{{company}} - Company name
{{scorecard_percentage}}% - Score percentage  
{{scorecard_band}} - Risk band text
{{scorecard_band_emoji}} - Risk band emoji
{{top_gap_1_category}} - Primary gap area
{{top_gap_2_category}} - Secondary gap area  
{{top_gap_3_category}} - Third gap area
{{recommended_action}} - Suggested next step
{{qualification_tier}} - Lead qualification level
{{company_size}} - Employee count bracket
```

---

## Technical Integration

### Webhook Configuration
The scorecard completion should trigger a webhook to your email platform:

**Endpoint**: Configure in email platform (HubSpot Forms API, Customer.io API, etc.)  
**Method**: POST  
**Headers**: Include API authentication  
**Payload**: Map the scorecard data to your platform's field structure

### Testing Checklist
- [ ] Test scorecard completion triggers email capture
- [ ] Verify all custom fields populate correctly
- [ ] Test segmentation rules with different score ranges
- [ ] Confirm UTM parameters track through sequence
- [ ] Validate personalization tokens render properly

### Analytics Tracking
Track these metrics for the email sequence:
- Open rates by qualification tier
- Click rates by gap category personalization
- Conversion rates by recommended action type
- Unsubscribe rates by company size segment
- Demo requests by email sequence position

---

## Next Steps for Marketing Team

1. **Map fields** from this payload to your email platform's custom properties
2. **Build the 5-email sequence** using the schedule and content guidelines above
3. **Set up segmentation** rules based on qualification_tier and company_size
4. **Configure webhook** from scorecard completion to email platform
5. **Test the integration** with sample scorecard completions
6. **Monitor performance** and optimize based on engagement metrics

Contact the development team for any questions about the payload structure or webhook configuration.