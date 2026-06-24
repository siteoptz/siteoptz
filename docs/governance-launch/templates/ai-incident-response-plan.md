# AI Incident Response Plan (Template)

> **How to use this template (delete this box before publishing):**
> When an AI tool exposes data, produces a harmful output, or behaves unexpectedly in production, you do not want to be inventing a process under pressure. This **one-page plan** names who does what, in what order. Keep it short enough that someone can follow it during a real incident. Assign the named roles below to actual people, then store it where the team can find it fast (data room + pinned in your incident channel).
>
> **An "AI incident" includes:** customer/personal data entered into an unapproved tool, a confidential data leak via an AI tool, a harmful/discriminatory/defamatory AI output that reached a customer, prompt-injection or security compromise of an AI feature, or a critical AI dependency outage.

---

**Company:** [COMPANY NAME]
**Plan owner:** [NAME, TITLE]
**Version:** [1.0]
**Last reviewed:** [YYYY-MM-DD]

---

## 1. Who to Contact (Incident Roles)

| Role | Responsibility | Person | Contact (24/7) |
|---|---|---|---|
| **Incident Lead** | Owns the response end to end; makes the call on severity | [Name] | [Phone / Slack] |
| **Technical Lead** | Investigates, contains, and remediates | [Name] | [Phone / Slack] |
| **Comms / Legal** | Customer, regulator, and internal communications | [Name] | [Phone / Slack] |
| **Executive Sponsor** | Approves external notifications and major decisions | [Name] | [Phone / Slack] |

**Report an incident immediately to the Incident Lead** at **[EMAIL / PHONE / SLACK]** — even if you are unsure it qualifies. Early reporting is never penalized.

## 2. Detection Sources

Incidents may surface from: employee self-report, customer complaint, security monitoring/alerts, vendor breach notification, audit logs, or social/press mention. Anyone who notices a possible incident must report it (Section 1).

## 3. Severity Levels

| Level | Definition | Target response |
|---|---|---|
| **SEV-1 Critical** | Customer/regulated data exposed, or harmful output reached customers | Respond **immediately**; assemble full team |
| **SEV-2 High** | Confidential/internal data exposed; significant malfunction | Respond within **[2 hours]** |
| **SEV-3 Low** | Contained near-miss; no data left controlled systems | Respond within **[1 business day]** |

## 4. Response Steps

1. **Report & log** — notify the Incident Lead; open an incident record with timestamp, reporter, and what happened.
2. **Triage & classify** — Incident Lead assigns a severity (Section 3) and pulls in the needed roles.
3. **Contain** — stop the bleeding: revoke tool access, disable the AI feature, rotate credentials/keys, or pull the affected output.
4. **Assess scope** — what data, whose data, which systems, how long. Check audit logs and the AI Tool Inventory.
5. **Remediate** — fix the root cause; confirm the exposure is closed.
6. **Notify** — execute Section 5 if anyone outside the company is affected.
7. **Recover** — restore normal operation and confirm controls are back in place.
8. **Review** — run the post-incident review (Section 6) within [5 business days].

## 5. Notification Protocol

- **Customers:** If customer data or a customer-facing output is affected, Comms/Legal drafts notice; Executive Sponsor approves before it goes out. Honor any **breach-notification SLA in your customer contracts** (often 48–72 hours).
- **Regulators / authorities:** If personal data is involved, assess obligations under **GDPR Art. 33 (72-hour breach notice)**, the **EU AI Act serious-incident duties**, and any applicable US state laws. Loop in counsel.
- **Vendors:** Notify the affected AI vendor and request their support and logs.
- **Internal:** Brief the team on need-to-know; avoid speculation outside the incident channel.

## 6. Post-Incident Review (within [5 business days])

Hold a blameless review and document:

- **Timeline** — what happened and when.
- **Root cause** — why it happened.
- **What worked / what didn't** in the response.
- **Corrective actions** — concrete changes, each with an owner and due date.
- **Register update** — add or update the related entry in the **AI Risk Register**.
- **Policy update** — revise the **AI Acceptable Use Policy** or vendor approvals if needed.

---

## Incident Log (keep a running record)

| ID | Date | Severity | Summary | Data involved | Owner | Status | Review done |
|---|---|---|---|---|---|---|---|
| INC-001 | [YYYY-MM-DD] | [SEV-2] | [Short description] | [What data] | [Name] | [Open/Closed] | [Y/N] |
| [Add rows] | | | | | | | |

---

## Appendix A — Framework Mapping (for your data room)

| This plan provides evidence for | NIST AI RMF | ISO/IEC 42001 | SOC 2 | EU AI Act / GDPR |
|---|---|---|---|---|
| Incident detection & response | RESPOND 1.1 | 10.2 | CC7.3, CC7.4 | EU AI Act Art. 73 |
| Breach notification | GOVERN 6.1 | 10.2 | CC7.4 | GDPR Art. 33 |
| Continuous improvement | MANAGE 4.1 | 10.1 | CC7.5 | — |

*Template provided by SiteOptz. This is a starting point, not legal advice. Confirm breach-notification obligations with qualified counsel before an incident occurs.*
