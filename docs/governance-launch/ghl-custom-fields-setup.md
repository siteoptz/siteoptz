# GoHighLevel Custom Fields Setup - AI Compliance Scorecard Integration

## Overview
This document lists all custom fields that must be created in GoHighLevel before implementing the AI Compliance Scorecard integration. These fields capture detailed scorecard completion data for lead scoring and email sequence automation.

## Required Custom Fields

### Contact Information Fields

| Field Name | Field Type | Description | Email Sequence Usage |
|------------|------------|-------------|---------------------|
| `ai_contact_role` | Text | Contact's role (founder, cto, operations, legal, etc.) | Used for role-based personalization in all 5 emails |
| `company_size` | Text | Company size range (1-10, 11-50, 51-200, 201-1000, 1000+) | Used for segmentation in emails 2, 4, and 5 |

### Scorecard Results Fields

| Field Name | Field Type | Description | Email Sequence Usage |
|------------|------------|-------------|---------------------|
| `scorecard_total_score` | Number | Total scorecard score out of 100 | Used for conditional content in all emails |
| `scorecard_band` | Text | Risk band (Critical Risk, Foundational Gaps, Mostly Ready, Audit-Ready) | Primary segmentation for emails 2-5 |
| `scorecard_percentage` | Number | Score as percentage (0-100) | Used in email subject lines and content personalization |
| `qualification_tier` | Text | Lead qualification tier (critical, foundational_gaps, mostly_ready, audit_ready) | Controls which emails are sent (email 4 segmentation) |
| `scorecard_question_scores` | Large Text | JSON string of individual question scores (Q1-Q10) | Used for advanced personalization in email 2 case studies |
| `scorecard_top_gaps` | Large Text | JSON string of top 3 compliance gaps with scores and priorities | Primary content for email 2 personalized gap analysis |
| `scorecard_completion_time` | Number | Time taken to complete scorecard in seconds | Analytics field for lead quality scoring |
| `scorecard_recommended_action` | Text | Recommended next step shown at completion | Used to customize email 5 CTA |
| `scorecard_version` | Text | Version of scorecard taken (v1.0, v1.1, etc.) | Future-proofing for scorecard iterations |

### Attribution & Analytics Fields

| Field Name | Field Type | Description | Email Sequence Usage |
|------------|------------|-------------|---------------------|
| `utm_source` | Text | Traffic source (linkedin, google, direct, etc.) | Used for attribution reporting, no direct email usage |
| `utm_medium` | Text | Marketing medium (social, email, organic, paid, etc.) | Used for attribution reporting, no direct email usage |
| `utm_campaign` | Text | Campaign identifier (compliance_awareness_q1, etc.) | Used for attribution reporting, no direct email usage |
| `scorecard_completed_at` | Text | Full ISO datetime string when scorecard was completed (e.g. 2026-05-12T14:30:00.123Z) | Used to calculate timing for email sequence triggers |
| `scorecard_page_source` | Text | Page where scorecard was completed (scorecard-standalone, etc.) | Analytics field for conversion tracking |

## Field Configuration Notes

### Data Types:
- **Text**: Standard text fields (up to 255 characters) - also used for ISO datetime strings
- **Large Text**: For JSON data that may exceed 255 characters (question_scores, top_gaps)
- **Number**: Integer values (scores, completion time)

### Field Naming:
- Use exact field names as shown above (snake_case with underscores)
- Field names are case-sensitive in API calls
- Do not add prefixes or suffixes to these field names

### Required vs Optional:
- All fields should be created as **optional** (not required for contact creation)
- The integration handles missing values gracefully with empty strings or default values

## Email Sequence Integration Map

### Email 1 (Day 0): Immediate Score Delivery
- Uses: `scorecard_band`, `scorecard_percentage`, `scorecard_top_gaps`

### Email 2 (Day 2): Top Gap Case Study  
- Primary: `scorecard_top_gaps` (JSON parsed to get first gap)
- Secondary: `company_size` for company-size-specific examples

### Email 3 (Day 5): Founder's Guide Download
- Uses: `qualification_tier` for content customization
- Uses: `ai_contact_role` for role-appropriate messaging

### Email 4 (Day 9): Webinar Invite
- **Segmentation**: Only sent to `qualification_tier` = "foundational_gaps" or "mostly_ready"
- Uses: `scorecard_band` for webinar track assignment

### Email 5 (Day 14): Demo Offer
- Uses: `qualification_tier` to customize CTA (strategy call vs demo vs certification)
- Uses: `scorecard_recommended_action` to maintain consistency with original recommendation

## Implementation Checklist

- [ ] Create all 16 custom fields in GoHighLevel with exact names above
- [ ] Verify field types match specifications (Text vs Number vs Date vs Large Text)
- [ ] Test field creation by manually adding a test contact with sample data
- [ ] Confirm API write permissions are enabled for all custom fields
- [ ] Document field IDs if required by your GHL API version
- [ ] Test that Large Text fields can store JSON strings up to expected length (~2KB)

## Next Steps

After field creation is confirmed:
1. Deploy the updated `/pages/api/email-capture.js` handler
2. Test scorecard submission end-to-end
3. Verify all field data appears correctly in GHL contact records
4. Configure email sequences to use the new field data for personalization