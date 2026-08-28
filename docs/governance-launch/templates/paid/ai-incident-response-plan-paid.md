# AI Incident Response Plan — Paid Edition

> **How to use this template (delete this box before publishing):**
> This is the full program version of the AI Incident Response Plan. The free starter is a one-page runbook; this edition adds type-specific playbooks, a communication plan with message templates, a regulatory notification decision tree, evidence handling, and tabletop drills. Assign the named roles **now**, before an incident. Keep this in the data room and pin a short link to it in your incident channel.
>
> **An "AI incident"** = customer/personal data entered into an unapproved tool, a confidential leak via an AI tool, a harmful/biased/defamatory output that reached a customer, prompt-injection or compromise of an AI feature, an AI vendor breach, or a critical AI dependency outage.

---

**Company:** [COMPANY NAME]
**Plan owner:** [NAME, TITLE]
**Version:** [1.0]
**Last reviewed:** [YYYY-MM-DD]
**Distribution:** [IR team, execs, on-call]

---

## 1. Purpose & Scope

This plan defines how [COMPANY NAME] detects, responds to, and learns from AI incidents. It complements (and where relevant defers to) our general security incident response, and it connects to the **AI Tool Inventory** (to scope impact) and the **AI Risk Register** (to feed lessons back).

## 2. Definitions & Incident Taxonomy

| Incident type | Example |
|---|---|
| **Data exposure** | Customer/personal/regulated data entered into an unapproved or consumer AI tool. |
| **Confidential leak** | Source code or secrets pasted into an AI tool. |
| **Harmful output** | Discriminatory, defamatory, or dangerous AI output that reached a customer or the public. |
| **Security compromise** | Prompt injection, jailbreak, or account/key compromise of an AI feature. |
| **Vendor breach** | An AI vendor or sub-processor reports a breach affecting our data. |
| **Availability** | Outage or severe degradation of a critical AI dependency. |
| **Shadow AI exposure** | Discovery of an unsanctioned tool already handling sensitive data. |

## 3. Roles & Responsibilities

| Role | Responsibility | Person | Contact (24/7) |
|---|---|---|---|
| **Incident Lead** | Owns the response; sets severity; coordinates | [Name] | [Phone/Slack] |
| **Technical Lead** | Investigates, contains, remediates | [Name] | [Phone/Slack] |
| **Comms / Legal** | Customer, regulator, vendor, PR comms | [Name] | [Phone/Slack] |
| **Executive Sponsor** | Approves external notices & major calls | [Name] | [Phone/Slack] |
| **Scribe** | Maintains the incident timeline & log | [Name] | [Phone/Slack] |

**Report immediately to the Incident Lead** at **[EMAIL / PHONE / SLACK]** — even if unsure. Early reporting is never penalized.

## 4. Severity Classification Matrix

| Level | Definition | Examples | Response target |
|---|---|---|---|
| **SEV-1 Critical** | Customer/regulated data exposed; harmful output reached customers; active compromise | PII sent to a training-enabled tool; defamatory output emailed to clients | **Immediate**, full team |
| **SEV-2 High** | Confidential/internal data exposed; significant malfunction; vendor breach (limited) | Source code in consumer tool; biased output caught pre-send | Within **[2 hours]** |
| **SEV-3 Low** | Contained near-miss; no data left controlled systems | Employee self-reports a paste they immediately deleted | Within **[1 business day]** |

## 5. Incident Lifecycle

For every incident: **Detect → Triage → Contain → Eradicate → Recover → Review.**

1. **Detect & report** — open an incident record (time, reporter, what happened); notify Incident Lead.
2. **Triage** — assign severity; pull in roles; Scribe starts the timeline.
3. **Contain** — stop the bleeding (revoke access, disable feature, rotate keys, pull output).
4. **Eradicate** — remove root cause; confirm exposure is closed.
5. **Recover** — restore normal operation; verify controls are back in place.
6. **Review** — run the post-incident review (Section 11) within [5 business days].

## 6. Detection & Monitoring Sources

Employee self-report · security alerts/SIEM · vendor breach notifications · audit logs (SSO, tool admin) · customer complaints · social/press monitoring · finance anomalies (usage spikes).

## 7. Type-Specific Playbooks

### 7.1 Data exposure to an AI tool
1. Identify the tool, data, and accounts involved (check the inventory).
2. Revoke access; if the tool trains on inputs, request deletion/opt-out from the vendor in writing.
3. Determine whose data and how much; check vendor retention terms.
4. Trigger the notification decision tree (Section 9).
5. Add/raise the related entry in the Risk Register.

### 7.2 Prompt injection / model abuse
1. Disable or sandbox the affected feature.
2. Capture the malicious input/output for forensics.
3. Assess what the injection could access (data, tools, actions).
4. Patch input handling; add prompt-injection tests before re-enabling.

### 7.3 Harmful / biased / defamatory output
1. Remove or retract the output; stop further distribution.
2. Assess who saw it and the potential harm.
3. Comms/Legal prepares response; Exec approves any external statement.
4. Add a bias/fairness action to the Risk Register; review the use case's human-review control.

### 7.4 AI vendor breach
1. Get the vendor's incident details, scope, and timeline.
2. Determine our data exposure from the data-flow map.
3. Rotate any shared credentials/keys.
4. Run the notification decision tree based on *our* affected data.

### 7.5 Critical AI dependency outage
1. Confirm scope and ETA from the vendor status page.
2. Activate fallback (alternate provider / degraded mode) per the tool's plan.
3. Communicate internally; update customers if the outage is customer-facing.
4. After recovery, log it and reassess concentration risk in the register.

### 7.6 Shadow AI exposure
1. Treat as data exposure (7.1) if sensitive data is involved.
2. Bring the tool into the intake/approval workflow or formally block it.
3. Update the inventory; review how it went undetected.

## 8. Communication Plan

| Audience | When | Owner | Approver | Channel |
|---|---|---|---|---|
| Internal team | All SEV-1/2 | Incident Lead | — | Incident channel |
| Affected customers | Customer data/output affected | Comms/Legal | Exec Sponsor | Email + account manager |
| Regulators | Per Section 9 | Comms/Legal | Exec Sponsor | Formal notice |
| Vendor | Vendor-related | Technical Lead | — | Vendor support/security |
| Public / press | Only if escalated | Comms/Legal | Exec Sponsor | Prepared statement |

Keep customers informed even when you don't yet have every answer: what happened, what you're doing, what they should do, when you'll update next. (Templates in Appendix B.)

## 9. Regulatory Notification Decision Tree

1. **Was personal data involved?** If no → likely no statutory notice (still honor contract SLAs).
2. **If yes — GDPR:** assess risk to individuals; notify the supervisory authority within **72 hours** of awareness unless unlikely to result in risk; notify individuals if high risk. (GDPR Art. 33/34.)
3. **EU AI Act:** if a high-risk system caused a *serious incident*, follow the serious-incident reporting duties.
4. **US state laws:** check breach-notification statutes where affected individuals reside.
5. **Sector rules:** HIPAA (health), GLBA (finance), etc., as applicable.
6. **Contractual:** honor breach-notification SLAs in customer contracts (often 48–72h).

> When personal or regulated data is involved, **loop in counsel before deciding not to notify.**

## 10. Evidence & Forensics Handling

- Preserve logs, inputs/outputs, and timestamps before changing anything where feasible.
- Don't destroy evidence during containment; snapshot first.
- Record who accessed what and when.
- Keep an evidence list with the incident record.

## 11. Post-Incident Review (within [5 business days])

Blameless review documenting:

- **Timeline** — what happened, when, who did what.
- **Root cause** — the real cause, not the symptom.
- **What worked / didn't** in detection and response.
- **Corrective actions** — each with an owner and due date.
- **Register update** — add/raise the related AI risk.
- **Policy/inventory update** — revise the AUP, approvals, or inventory as needed.

## 12. Testing & Tabletop Exercises

- **Cadence:** at least **[twice a year]**, plus after any major change.
- **Format:** 60-minute tabletop; walk a scenario through the lifecycle; capture gaps as actions.
- **Scenarios:** see Appendix D.

## 13. Contact Directory & Escalation Tree

| Order | Contact | Role | Phone | Backup |
|---|---|---|---|---|
| 1 | [Name] | Incident Lead | [#] | [Name] |
| 2 | [Name] | Technical Lead | [#] | [Name] |
| 3 | [Name] | Exec Sponsor | [#] | [Name] |

**Vendor security contacts:** [OpenAI / Anthropic / etc. support & security URLs].

## 14. Plan Maintenance & Version Control

Reviewed at least **[annually]** and after any SEV-1/2 incident or tabletop. Owner keeps it current.

| Date | Change | By |
|---|---|---|
| [date] | [Added vendor-breach playbook] | [name] |

---

## Incident Log

| ID | Date | Severity | Type | Summary | Data involved | Owner | Status | Review done |
|---|---|---|---|---|---|---|---|---|
| INC-001 | [date] | [SEV-2] | [Data exposure] | [Short description] | [What data] | [Name] | [Closed] | [Y] |

---

## Appendix A — Framework Mapping

| This plan provides evidence for | NIST AI RMF | ISO/IEC 42001 | SOC 2 | EU AI Act / GDPR |
|---|---|---|---|---|
| Incident detection & response | RESPOND 1.1, RESPOND 2.1 | 10.2 | CC7.3, CC7.4 | EU AI Act Art. 73 |
| Breach notification | GOVERN 6.1 | 10.2 | CC7.4 | GDPR Art. 33/34 |
| Continuous improvement | MANAGE 4.1 | 10.1 | CC7.5 | — |
| Testing & exercises | MEASURE 1.1 | 9.1 | CC7.3 | — |

## Appendix B — Notification Templates

**Customer notice (skeleton):** what happened · what data was involved · what we've done · what you should do · how to reach us · when we'll update next.

**Regulator notice (skeleton):** nature of the breach · categories & approximate number of individuals/records · likely consequences · measures taken · DPO/contact.

## Appendix C — Incident Log

Maintain the running table above for every incident, including SEV-3 near-misses (they're your best early warnings).

## Appendix D — Tabletop Exercise Scenarios

1. **The helpful paste:** a sales rep pastes a customer list into a free chatbot to "clean it up." Walk detection → containment → notification.
2. **The poisoned prompt:** a user injects instructions that make your support bot reveal another customer's ticket. Walk containment → forensics → fix.
3. **The vendor email:** your AI vendor notifies you of a breach affecting stored prompts. Walk scoping → notification decision tree → comms.

*Template provided by SiteOptz. This is a starting point, not legal advice. Confirm breach-notification obligations with qualified counsel before an incident occurs.*
