# AI Governance Template Suite — Outlines

**Purpose:** This document outlines the 9 new paid templates being added to the SiteOptz compliance product on top of the existing 3 (AI Risk Register, AI Incident Response Plan, AI Tool Inventory).

**Framework alignment:** All templates reference NIST AI Risk Management Framework 1.0 (including the Generative AI Profile NIST AI 600-1), ISO/IEC 42001:2023, and the EU AI Act (Regulation 2024/1689), plus adjacent standards where applicable.

**Anchor scenario used throughout:** A tech startup with 12 engineers using OpenAI, Anthropic, and AWS across four products. Founders have no record of which models touch customer data or whether any of it meets new compliance regulations. An enterprise prospect wants a risk assessment.

**Positioning:** All 9 templates are Starter-tier deliverables, forming a coherent AI governance program that maps directly to what enterprise buyers ask for in security questionnaires.

---

## Template 1: AI Data Governance Policy

**Status:** Full draft complete (see `ai-data-governance-policy-paid.md`)

**Target length:** 4,500-5,500 words
**Framework alignment:** NIST AI RMF (GOVERN function), ISO 42001 (Clauses 5, 7, 8), EU AI Act (Articles 10, 15)
**Primary audience:** Founders/CTOs at Series A-B who now need to answer "how do you govern data used with AI systems?"

### Sections

1. Purpose & Scope (~250 words)
2. Definitions (~300 words, ~12 terms)
3. Roles & Responsibilities (~500 words)
4. Data Classification for AI Use (~600 words)
5. Approved AI Systems & Vendors (~500 words)
6. Data Lifecycle Management for AI (~700 words)
7. Training Data Governance (~500 words)
8. Third-Party AI Provider Management (~400 words)
9. Data Subject Rights (~400 words)
10. Incident Response for Data Issues (~300 words)
11. Monitoring & Compliance (~350 words)
12. Training & Awareness (~250 words)
13. Policy Review & Update Cadence (~200 words)
14. Enforcement (~200 words)
15. References
16. Appendices: RACI Matrix, Classification Decision Tree, Vendor Approval Checklist, Sample DPA Clauses, DSR Response Template, Quarterly Audit Checklist

---

## Template 2: AI Model Risk Management Framework

**Target length:** 4,000-5,000 words
**Framework alignment:** NIST AI RMF (MAP, MEASURE, MANAGE functions), ISO 42001 (Clauses 6.1, 8.2, 8.3), EU AI Act (Articles 9, 15), NIST AI 600-1
**Primary audience:** CTOs and heads of engineering formalizing how their team evaluates AI model risks before deployment
**Anchor:** The 12-engineer team uses foundation models across 4 products. If one hallucinates and gives a wrong answer to a customer, who's responsible? What's the process for catching this before it ships?

### Sections

1. Purpose & Scope (~250 words) — Why model risk differs from generic software risk
2. Definitions (~300 words) — Model, Foundation Model, Fine-tuning, Inference, Hallucination, Model Drift, Model Card, Risk Tier, Mitigations
3. Roles & Responsibilities (~400 words) — Model Risk Owner, Model Reviewer, Product Owner, Security, Legal
4. Risk Categorization Framework (~700 words) — Low/Medium/High/Critical risk tiers based on use case, data sensitivity, decision autonomy, user impact
5. Risk Assessment Process (~800 words) — MAP → MEASURE → MANAGE workflow, when to trigger, deliverables at each stage
6. Pre-Deployment Requirements (~600 words) — Documentation (model card), testing (accuracy, bias, robustness), sign-offs by tier
7. Model Monitoring & Drift Detection (~500 words) — Metrics to track post-deployment, drift indicators, retraining triggers
8. Third-Party Model Governance (~500 words) — Foundation model providers (OpenAI, Anthropic, Google, AWS Bedrock), evaluating provider risk, contract requirements
9. Incident Handling for Model Failures (~300 words) — Hallucinations, bias incidents, safety failures — response and remediation
10. Model Retirement & Decommissioning (~250 words) — When and how to sunset models, data cleanup, communication
11. Review Cadence (~200 words) — Model reviews, framework updates
12. References — NIST AI RMF, ISO 42001, EU AI Act, NIST AI 600-1
13. Appendices:
    - A: Model Risk Categorization Decision Tree
    - B: Pre-Deployment Checklist by Risk Tier
    - C: Model Monitoring Dashboard Template
    - D: Model Retirement Checklist

---

## Template 3: AI Vendor / Third-Party Risk Assessment

**Target length:** 3,500-4,500 words
**Framework alignment:** NIST AI RMF (GOVERN, MAP), ISO 42001 (Clause 8.4), NIST 800-161 (Supply chain), EU AI Act (Article 25 — obligations along the value chain)
**Primary audience:** Anyone approving new AI vendors or reviewing existing ones
**Anchor:** OpenAI, Anthropic, AWS Bedrock — the startup uses all three. Someone signed contracts with each. But nobody has documented what data each vendor sees, what happens if they have a breach, or how to get their data back.

### Sections

1. Purpose & Scope (~250 words) — When this assessment applies
2. Definitions (~250 words) — AI Vendor, Subprocessor, Data Processing Agreement, Data Residency, Sub-tier Provider
3. Roles & Responsibilities (~350 words) — Requestor, Security Reviewer, Legal Reviewer, Approver
4. Assessment Triggers (~250 words) — New vendor, renewal, material change, regulatory update
5. Vendor Risk Categorization (~500 words) — By data sensitivity, business criticality, model autonomy
6. Assessment Methodology (~800 words) — Security review, privacy review, compliance review, financial/operational review
7. Required Documentation from Vendor (~500 words) — SOC 2, ISO 27001, DPA, sub-processor list, model cards, incident history, insurance
8. Contract Requirements (~500 words) — Data processing terms, breach notification, audit rights, data return, indemnification, model change notification
9. Ongoing Vendor Monitoring (~350 words) — Annual reassessment, incident tracking, control drift monitoring
10. Vendor Offboarding (~250 words) — Data return, model access revocation, contract termination
11. References — NIST AI RMF, ISO 42001, EU AI Act Article 25, NIST 800-161
12. Appendices:
    - A: AI Vendor Assessment Questionnaire (30-40 questions across security, privacy, AI-specific)
    - B: Contract Requirements Checklist
    - C: Common AI Vendor Reference Guide (OpenAI, Anthropic, Google, AWS, Microsoft with baseline evaluations)
    - D: Vendor Offboarding Checklist

---

## Template 4: AI System Impact Assessment (EU AI Act aligned)

**Target length:** 4,000-5,000 words
**Framework alignment:** EU AI Act (Articles 27, 29a — Fundamental Rights Impact Assessment), NIST AI RMF (MAP function), ISO 42005 (AI Impact Assessment)
**Primary audience:** Product managers and compliance-adjacent staff evaluating new AI features before launch
**Anchor:** The startup wants to launch an AI-powered feature that reads customer support tickets and drafts replies. Is this high-risk under the EU AI Act? What documentation does it need? Who has to sign off?

### Sections

1. Purpose & Scope (~250 words) — Why impact assessment matters legally and ethically
2. Definitions (~300 words) — AI System, Impact, Affected Persons, Deployer, Provider
3. When to Conduct an Impact Assessment (~400 words) — Trigger events, new features, material changes, regulatory update
4. EU AI Act Risk Classification (~600 words) — Prohibited, High-risk (Annex III categories), Limited-risk, Minimal-risk — with practical examples
5. Assessment Methodology (~800 words) — Purpose analysis, affected persons identification, fundamental rights review, mitigation planning, residual risk evaluation
6. Documentation Requirements (~500 words) — Description of AI system, intended purpose, categories of affected persons, risks identified, mitigations
7. Stakeholder Consultation (~350 words) — When to consult affected users, employees, external experts
8. Roles & Responsibilities (~400 words) — Assessor, Reviewer, Approver, Data Protection Officer if applicable
9. Post-Deployment Monitoring (~300 words) — Effectiveness of mitigations, new risks emerging, review cadence
10. Reporting Obligations (~250 words) — When findings must be reported (regulators, affected persons, internally)
11. Review Cadence (~200 words)
12. References — EU AI Act, NIST AI RMF, ISO 42005, GDPR Article 35 (comparison)
13. Appendices:
    - A: EU AI Act Risk Classification Decision Tree
    - B: Fundamental Rights Impact Assessment Template
    - C: Sample Completed Assessment (using anchor scenario)
    - D: Stakeholder Consultation Guide

---

## Template 5: AI Model Card Template

**Target length:** 3,000-4,000 words (the template itself is shorter; the accompanying guide is longer)
**Framework alignment:** Google's Model Cards for Model Reporting (Mitchell et al. 2019), Hugging Face Model Card format, EU AI Act Article 13 (transparency documentation), NIST AI RMF (MAP function)
**Primary audience:** Anyone shipping an AI model or feature — used both internally for documentation and externally when enterprise buyers request it
**Anchor:** Enterprise prospect asks: "Send us a model card for your AI features." The startup has never heard of a model card. Here's what one looks like and how to fill it out.

**Structure differs from other templates:** This is a template document plus guide. The .docx should be a fill-in template with placeholders and guidance for what to write.

### Sections (fill-in template)

1. Model Details — Name, Version, Type, Owner, Date, Contact
2. Intended Use — Primary use case, users, out-of-scope uses
3. Model Architecture — Foundation model used, fine-tuning approach, key parameters
4. Training Data — Sources, size, preprocessing, known biases, licensing
5. Evaluation Data — Benchmarks used, performance metrics, test sets
6. Performance Metrics — Accuracy, precision/recall, latency, cost per inference, subgroup performance
7. Limitations & Known Issues — Failure modes, edge cases, hallucination patterns, brittleness
8. Ethical Considerations — Bias analysis, fairness metrics, potential misuse
9. Environmental Impact — Compute used, carbon estimate if available
10. Legal & Compliance — Licenses, regulatory considerations, data protection
11. Update History — Version changes, dates, reason

### Additional sections (guide, not template)

- How to use this template
- When to publish externally vs keep internal
- Sample completed card (using anchor scenario)
- References

### Appendices

- A: Model Card Publication Decision Tree
- B: Sample Completed Model Card
- C: Model Card Update Trigger Checklist

---

## Template 6: AI Bias & Fairness Testing Framework

**Target length:** 3,500-4,500 words
**Framework alignment:** NIST AI RMF (MEASURE function, MS-2.11 on bias evaluation), ISO/IEC TR 24027 (Bias in AI systems), EU AI Act (Article 10.2, 10.3 on training data bias), NIST SP 1270 (bias taxonomy)
**Primary audience:** ML engineers and product managers needing to prove their AI isn't biased in harmful ways
**Anchor:** One of the startup's products uses AI to score customer support tickets by priority. If it consistently deprioritizes tickets from certain customer segments, that's a bias problem the founders won't discover until a customer complains publicly. Here's how to test for it before it happens.

### Sections

1. Purpose & Scope (~250 words) — Why bias testing matters (legal, ethical, business)
2. Definitions (~300 words) — Bias, Fairness, Protected Attribute, Disparate Impact, Group Fairness, Individual Fairness, Bias Types (data, algorithmic, deployment)
3. Bias Taxonomy (~500 words) — Historical, representation, measurement, aggregation, evaluation, deployment bias
4. Testing Requirements by Risk Tier (~500 words) — Baseline testing for all AI, deeper testing for high-risk uses
5. Testing Methodology (~800 words) — Data audit, disparate impact analysis, statistical parity testing, subgroup performance analysis
6. Roles & Responsibilities (~350 words) — ML Engineer, Bias Reviewer, Product Owner, Legal
7. Documentation Requirements (~400 words) — Test plan, results, remediation, sign-offs
8. Mitigation Strategies (~500 words) — Data-level (rebalancing, augmentation), model-level (constraints, adversarial), deployment-level (thresholds, monitoring)
9. Post-Deployment Monitoring (~300 words) — Ongoing bias monitoring, drift detection, incident triggers
10. Incident Handling (~250 words) — When bias is discovered post-deployment
11. Review Cadence (~200 words)
12. References — NIST AI RMF, ISO/IEC TR 24027, EU AI Act, NIST SP 1270, academic references (Barocas/Hardt/Narayanan)
13. Appendices:
    - A: Bias Testing Checklist
    - B: Statistical Tests Reference (disparate impact ratio, equalized odds, etc.)
    - C: Sample Bias Report Template
    - D: Remediation Decision Tree

---

## Template 7: AI Training Data Provenance Log

**Target length:** 2,500-3,500 words (this one is more of a tracking system than a policy)
**Framework alignment:** NIST AI RMF (MAP-2.3, MAP-4.1), EU AI Act (Article 10 — data governance), NIST AI 600-1 (Data provenance for GenAI), copyright law considerations
**Primary audience:** Any team fine-tuning models or building AI on internal/customer data
**Anchor:** The startup fine-tuned a model on customer conversation data six months ago. Now a customer asks under GDPR to delete their data. Where did that data go? Which model contains it? What does deletion actually mean?

### Sections

1. Purpose & Scope (~300 words) — Why provenance matters (regulatory, litigation risk, customer trust)
2. Definitions (~250 words) — Provenance, Data Lineage, Training Data, Fine-tuning, RAG, Model Memorization
3. Data Source Categories (~400 words) — First-party, licensed, public, synthetic, scraped (with legal warnings), customer-provided
4. Required Documentation per Dataset (~600 words) — Source, license, date acquired, categories included, consent basis, preprocessing steps, transformations
5. Tracking Requirements (~500 words) — What to log, when, format, storage
6. Roles & Responsibilities (~300 words) — Data Steward, ML Engineer, Legal, Data Governance Lead
7. Chain of Custody (~350 words) — From raw data → cleaned data → training set → model — traceability throughout
8. Handling Data Subject Requests (~400 words) — Locating individual's data across training pipeline, deletion workflows, model retraining implications
9. Third-Party Training Data (~300 words) — Vendor-provided datasets, license tracking, sub-license restrictions
10. Retention & Deletion (~250 words) — How long training data is retained, when it must be deleted
11. Review Cadence (~200 words)
12. References — NIST AI RMF, EU AI Act, GDPR Articles 15-17, copyright case law (recent)
13. Appendices:
    - A: Data Provenance Log Template (spreadsheet structure)
    - B: Data Source Evaluation Checklist
    - C: Sample Data Card Template (for training datasets)
    - D: Data Subject Request Response Workflow

---

## Template 8: AI Access Control Policy

**Target length:** 3,000-3,500 words
**Framework alignment:** NIST SP 800-53 (AC family), ISO 27001 Annex A.9, NIST AI RMF (GOVERN, MANAGE), EU AI Act (Article 15 — cybersecurity)
**Primary audience:** Security-conscious engineering teams
**Anchor:** Everyone at the startup has their own OpenAI account and pastes whatever they want into it. Someone shared a customer database schema with GPT-4 last week to help write a query. Nobody knows this happened. Here's how to prevent that.

### Sections

1. Purpose & Scope (~250 words) — Access control specific to AI systems
2. Definitions (~250 words) — Access Control, Least Privilege, Separation of Duties, Privileged Access, API Key, Service Account
3. Access Control Principles (~400 words) — Least privilege, need-to-know, separation of duties, defense in depth
4. AI System Access Tiers (~500 words) — Developer, Operator, User, Admin — differentiated permissions
5. Authentication Requirements (~400 words) — SSO, MFA, API key management, service account governance
6. Authorization Framework (~400 words) — Role-based access, resource-level access, time-bound access
7. API Key & Credentials Management (~400 words) — Storage, rotation, revocation, monitoring — specific to OpenAI/Anthropic/AWS/Google keys
8. Privileged Access Management (~300 words) — Admin access, model training access, production deployment access
9. Access Reviews (~300 words) — Quarterly reviews, offboarding, role changes
10. Monitoring & Logging (~250 words) — What to log, retention, alerts — references AI Monitoring & Logging Policy
11. Incident Response (~200 words) — Unauthorized access, credential compromise
12. Review Cadence (~150 words)
13. References — NIST SP 800-53, ISO 27001, NIST AI RMF, EU AI Act
14. Appendices:
    - A: Access Tier Definitions Matrix
    - B: Onboarding/Offboarding Checklist for AI System Access
    - C: API Key Rotation Schedule Template
    - D: Access Review Template

---

## Template 9: AI Monitoring & Logging Policy

**Target length:** 3,000-4,000 words
**Framework alignment:** NIST SP 800-92 (Logging), ISO 27001 A.12.4, NIST AI RMF (MEASURE function), EU AI Act (Article 12 — record-keeping), NIST AI 600-1 (monitoring GenAI)
**Primary audience:** Engineering teams needing to build observability into AI systems
**Anchor:** The startup's AI features have been in production for 3 months. If asked "has your AI ever given a harmful response to a customer?" — nobody can answer. Because nothing is being logged. Here's what to log and how to use it.

### Sections

1. Purpose & Scope (~250 words) — Why monitoring AI differs from monitoring regular software
2. Definitions (~250 words) — Log, Event, Metric, Trace, Anomaly, Drift, Guardrail
3. What Must Be Logged (~700 words) — Prompts, completions (with PII redaction), model version, user/session, latency, cost, guardrail triggers, errors, feedback
4. What Must NOT Be Logged (~300 words) — Full PII in prompts, credentials, secrets — with technical guidance
5. Log Retention & Storage (~400 words) — Retention periods by log type, storage security, access controls
6. Metrics & Monitoring (~500 words) — Performance metrics, drift detection, cost tracking, safety metrics
7. Alerting Framework (~400 words) — Alert types (SLA, cost, safety, drift), routing, escalation
8. Incident Detection (~350 words) — Using monitoring to detect issues early (hallucinations, bias, security)
9. Compliance Reporting (~300 words) — Using logs for regulatory reporting, audit trails
10. Roles & Responsibilities (~300 words) — ML Ops, Product Owner, Security, Compliance
11. Review Cadence (~150 words)
12. References — NIST SP 800-92, ISO 27001, NIST AI RMF, EU AI Act
13. Appendices:
    - A: Logging Requirements by AI System Type
    - B: Sample Alert Configuration
    - C: Compliance Reporting Template
    - D: Log Review Checklist

---

## Combined Program Summary

**Total scope:** 9 new templates on top of existing 3
**Total content:** ~30,000-38,000 words across the 9 new templates
**Delivery format:** .docx downloads (web fill-in workflow deferred to Sprint 2/3)
**Tier positioning:** All at Starter tier (justifies eventual price increase to $797-997/yr)

### Framework Coverage

- All 4 NIST AI RMF functions (GOVERN, MAP, MEASURE, MANAGE)
- ISO 42001 major clauses (5, 6, 7, 8)
- EU AI Act Articles 9, 10, 12, 13, 15, 25, 27, 29a
- Adjacent standards: NIST 800-53, NIST 800-92, NIST 800-161, ISO 27001, GDPR, ISO/IEC TR 24027, ISO 42005

### Cross-References Between Templates

Every template references others to form a coherent program:

- **Data Governance** references Vendor Assessment, Model Risk, Monitoring, Incident Response
- **Model Risk** references Data Governance, Bias Testing, Model Card, Monitoring
- **Vendor Assessment** references Data Governance
- **Impact Assessment** references Data Governance, Model Risk, Model Card
- **Model Card** is standalone but referenced by Impact Assessment and Model Risk
- **Bias Testing** references Model Risk, Data Governance
- **Provenance Log** references Data Governance
- **Access Control** references Monitoring
- **Monitoring** referenced by most others

Enterprise buyers evaluating the templates will see they form an integrated program, not disconnected documents. This is the "policy suite" positioning.

### Sprint Roadmap

- **Session 1 (today):** All 9 outlines + full AI Data Governance Policy → shipped
- **Sessions 2-6 (following 2-4 weeks):** One full template per session, in this suggested order:
  1. Session 2: AI Vendor / Third-Party Risk Assessment (foundational, referenced by many)
  2. Session 3: AI Model Risk Management Framework (core operational)
  3. Session 4: AI Access Control Policy (security-critical)
  4. Session 5: AI Monitoring & Logging Policy (operational)
  5. Session 6: AI System Impact Assessment (regulatory-driven)
  6. Session 7: AI Model Card Template (differentiator)
  7. Session 8: AI Bias & Fairness Testing Framework (differentiator)
  8. Session 9: AI Training Data Provenance Log (specialized)

**Target completion:** All 9 templates live within 30 days of Session 1.

---

**End of Outlines Document**
