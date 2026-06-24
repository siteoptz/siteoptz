# AI Vendor Review Checklist (Template)

> **How to use this template (delete this box before publishing):**
> Run this checklist **once per AI tool** before it touches anything beyond public information. It is designed to fit on **one page** of evidence per vendor and to be completed in 20–40 minutes using the vendor's trust center, DPA, and terms of service. Save the completed checklist in your data room and link it from the row for this tool in your **AI Tool Inventory**. Re-run it at least annually or whenever the vendor materially changes its terms.
>
> **Rule of thumb:** A "No" in Section C (Data Handling) or Section D (Contracts) for any tool that touches customer or regulated data is a blocker, not a footnote.

---

## Review Summary

| Field | Detail |
|---|---|
| **Vendor / product** | [e.g., OpenAI — ChatGPT Team] |
| **Tier being reviewed** | [Free / Pro / Team / Enterprise] |
| **Use case** | [What it will be used for] |
| **Highest data sensitivity it will touch** | [Public / Internal / Customer / Regulated] |
| **Reviewer** | [Name, title] |
| **Review date** | [YYYY-MM-DD] |
| **Next review due** | [YYYY-MM-DD] |
| **Decision** | ☐ Approved  ☐ Approved with conditions  ☐ Rejected |
| **Conditions / notes** | [e.g., "Internal data only; no customer PII"] |

---

## Section A — Vendor & Product Basics

- [ ] Vendor legal name, website, and primary contact recorded.
- [ ] We know **which underlying models/providers** power the tool (e.g., built on OpenAI, Anthropic, AWS Bedrock).
- [ ] We know whether the vendor is a **prime provider or a reseller/wrapper** of another model.
- [ ] A named **internal owner** is assigned for this tool.
- [ ] Vendor has a public **trust center / security page** (link: __________).

## Section B — Security & Certifications

- [ ] **SOC 2 Type II** report available (or roadmap with date). _Status:_ __________
- [ ] **ISO/IEC 27001** certified (information security). ☐ Yes ☐ No ☐ N/A
- [ ] **ISO/IEC 42001** certified or in progress (AI management). ☐ Yes ☐ No ☐ N/A
- [ ] Data **encrypted in transit and at rest**.
- [ ] **SSO / SAML** and role-based access available at our tier.
- [ ] Regular **third-party penetration testing** performed.
- [ ] **Audit logs** of user activity available to admins.

## Section C — Data Handling (the part that kills deals)

- [ ] We know **exactly what data** we will send this vendor.
- [ ] Vendor **does NOT train its models on our data** by default (or training can be disabled — confirm where: __________).
- [ ] **Data retention** terms are documented and acceptable. _Retention period:_ __________
- [ ] We can **request deletion** of our data, and the SLA for deletion is known.
- [ ] **Data residency / hosting region** is known and acceptable. _Region:_ __________
- [ ] **Sub-processors** are disclosed (and we've reviewed the list). Link: __________
- [ ] Vendor notifies us of **new sub-processors** before they take effect.
- [ ] **Input/output data is logically isolated** from other customers (no shared training pool).
- [ ] Human review of our data by vendor staff is **disabled or contractually limited**.

## Section D — Contractual & Legal

- [ ] **Data Processing Agreement (DPA)** is available and signed (or ready to sign).
- [ ] **Breach notification SLA** is defined in the contract. _Window:_ __________ (e.g., 72 hours)
- [ ] Terms of service / acceptable use reviewed — **no clauses that conflict with our customer contracts**.
- [ ] **Liability and indemnification** terms reviewed and acceptable.
- [ ] **IP ownership of outputs** is clear (we own / can use the outputs we generate).
- [ ] Contract specifies what happens to our data **on termination**.

## Section E — Compliance & Regulatory

- [ ] **GDPR / privacy**: vendor supports our obligations (DPA, SCCs for international transfers if applicable).
- [ ] **EU AI Act**: we've noted whether this tool contributes to a **high-risk** use case for us. ☐ Not high-risk ☐ High-risk — added to risk register
- [ ] **Sector rules** checked if applicable (HIPAA BAA for health data, GLBA/finance, FERPA/education). ☐ Yes ☐ N/A
- [ ] Vendor provides documentation we can hand to **our** auditors and customers.

## Section F — Operational Resilience

- [ ] **Uptime SLA** documented. _Target:_ __________
- [ ] We have a **fallback plan** if this vendor changes terms, raises prices, or goes down.
- [ ] **Support / escalation path** is known. _Channel & response time:_ __________
- [ ] Cost and **billing owner** recorded for budget tracking.

---

## Scoring & Decision Guide

Count the boxes in **Section C** and **Section D** — these are the deal-critical sections.

- **All C + D boxes checked** → Safe to approve for customer/regulated data (pending DPA signature).
- **Any C or D box unchecked** → Approve for **internal/public data only**, or treat the gap as a condition to resolve before go-live.
- **No DPA, OR vendor trains on our data, OR no breach SLA** → **Do not use with customer or regulated data.** Document the rejection reason in the Review Summary.

**Final decision recorded in the Review Summary above. File this completed checklist in the data room and update the AI Tool Inventory.**

---

## Appendix A — Framework Mapping (for your data room)

| This checklist provides evidence for | NIST AI RMF | ISO/IEC 42001 | SOC 2 | EU AI Act / GDPR |
|---|---|---|---|---|
| Third-party / vendor due diligence (all sections) | GOVERN 6.2 | 6.1.2 | CC9.2 | GDPR Art. 28 |
| Data handling & sub-processors (Sec. C) | MAP 2.2 | 8.1 | CC6.1 | GDPR Art. 28(2) |
| Contracts & breach notification (Sec. D) | GOVERN 6.1 | 8.1 | CC2.3, CC7.3 | GDPR Art. 33 |
| Regulatory classification (Sec. E) | MAP 1.5 | 4.1 | CC2.3 | EU AI Act Art. 6 |
| Resilience & continuity (Sec. F) | MANAGE 4.1 | 8.1 | A1.2 | — |

*Template provided by SiteOptz. This is a starting point, not legal advice. Have qualified counsel review vendor contracts and DPAs before processing regulated data.*
