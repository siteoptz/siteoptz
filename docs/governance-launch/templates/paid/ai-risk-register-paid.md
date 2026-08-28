# AI Risk Register — Paid Edition

> **How to use this template (delete this box before publishing):**
> This is the full risk-management version of the AI Risk Register. The free starter is a scored table; this edition adds a methodology, a risk taxonomy, a control library, inherent-vs-residual scoring, treatment plans, an EU AI Act classification worksheet, and board-ready reporting. Start with your **top 5 risks** (pulled from the AI Tool Inventory) and expand quarterly. Don't try to boil the ocean on day one.
>
> **Scoring in one line:** rate Likelihood (1–5) and Impact (1–5); **Risk = Likelihood × Impact** (1–25). Score it twice — **inherent** (before controls) and **residual** (after controls). Anything with a residual score **≥ 12 is High** and needs an active treatment plan.

---

**Company:** [COMPANY NAME]
**Register owner:** [NAME, TITLE]
**Version:** [1.0]
**Last updated:** [YYYY-MM-DD]
**Review cadence:** Quarterly (and after any incident)

---

## 1. Purpose & Scope

This register identifies, scores, treats, and monitors the risks created by [COMPANY NAME]'s use of AI. It exists so we make deliberate, documented decisions about AI risk — instead of discovering them in an outage, a breach, or a customer audit. It covers every AI use case tied to a tool in the **AI Tool Inventory**.

## 2. Risk Management Methodology

We run a continuous five-step loop, aligned to NIST AI RMF (Govern, Map, Measure, Manage):

1. **Govern** — roles, appetite, and this methodology are agreed and owned.
2. **Identify** — surface risks from the inventory, incidents, and reviews.
3. **Assess** — score inherent risk, then residual risk after controls.
4. **Treat** — choose accept / mitigate / transfer / avoid; assign owner + due date.
5. **Monitor** — track KRIs, review quarterly, update after incidents.

## 3. Roles & Responsibilities

- **Register Owner** — [Name]: maintains the register, runs quarterly reviews.
- **Risk Owners** — the person accountable for treating a specific risk.
- **Risk Acceptance Approver** — [Name, exec]: signs off when we choose to *accept* a High risk.

## 4. Risk Taxonomy

| Category | What it covers |
|---|---|
| **Data privacy** | PII/customer data exposed to a vendor or used in training. |
| **Security** | Prompt injection, data leakage, insecure AI-generated code, account compromise. |
| **Bias & fairness** | Discriminatory or unfair outputs in decisions about people. |
| **Accuracy / hallucination** | Wrong output relied on without review. |
| **IP / legal** | Copyright, ownership of outputs, contract or license breach. |
| **Vendor / concentration** | Over-reliance on one provider; term, price, or availability changes. |
| **Operational** | Outage of a critical AI dependency; no fallback. |
| **Regulatory** | EU AI Act high-risk obligations, GDPR, sector rules. |
| **Reputational** | Public harm, viral failure, loss of customer trust. |
| **Financial** | Runaway usage costs, fines, remediation expense. |

## 5. Scoring Framework

| Score | Likelihood | Impact |
|---|---|---|
| 1 | Rare | Negligible |
| 2 | Unlikely | Minor |
| 3 | Possible | Moderate |
| 4 | Likely | Major |
| 5 | Almost certain | Severe (legal / PR / financial) |

**Risk = Likelihood × Impact.** Bands: **1–5 Low · 6–11 Medium · 12–25 High.**

**Inherent vs. residual:** score *inherent* risk assuming no controls, then *residual* risk with your current controls in place. The gap shows how much your controls are actually buying you.

**Risk heatmap (residual):**

| Impact ↓ / Likelihood → | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **5** | 5 | 10 | 15 | 20 | 25 |
| **4** | 4 | 8 | 12 | 16 | 20 |
| **3** | 3 | 6 | 9 | 12 | 15 |
| **2** | 2 | 4 | 6 | 8 | 10 |
| **1** | 1 | 2 | 3 | 4 | 5 |

*Green 1–5 · Amber 6–11 · Red 12–25.*

## 6. Risk Appetite & Tolerance

- **Low (1–5):** acceptable; monitor at quarterly review.
- **Medium (6–11):** acceptable only with a named owner and documented controls.
- **High (12–25):** **not acceptable** without an active treatment plan and a due date. Accepting a High risk requires written sign-off from the Risk Acceptance Approver.
- **Hard lines (never acceptable):** customer/regulated data in a tool that trains on inputs; fully automated decisions about people with no human review; processing regulated data with no DPA.

## 7. Control Library

Reusable controls to drop into treatment plans, by category:

| Category | Example controls |
|---|---|
| Data privacy | Enterprise tier with training disabled; signed DPA; data minimization; PII redaction. |
| Security | SSO/MFA; secret scanning in CI; prompt-injection testing; least-privilege API keys. |
| Bias & fairness | Human review of all decisions; bias testing; documented criteria. |
| Accuracy | Mandatory human review before customer-facing use; citation/verification. |
| IP / legal | Contract review; output-ownership terms; no third-party confidential data input. |
| Vendor | Fallback provider; contract caps; monitored sub-processor list. |
| Operational | Failover plan; rate-limit alarms; status-page monitoring. |
| Regulatory | EU AI Act classification; counsel review; records of processing. |

## 8. Master Risk Register

> Keep the live version in a spreadsheet. Duplicate the detailed block in Section 9 for each High risk.

| ID | Use case | Tool(s) | Data | Category | Inherent | Controls | Residual | Treatment | Owner | Due | Status | Next review |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R-01 | [Support chatbot] | [CRM AI] | Customer | Data privacy | 16 | DPA, training off | 8 | Mitigate | [Name] | [date] | Mitigating | [date] |
| R-02 | [Coding assistant] | [Copilot] | Source code | Security | 12 | Biz tier, PR review | 6 | Mitigate | [Name] | [date] | Open | [date] |
| R-03 | [Screening aid] | [Tool] | Personal | Bias & fairness | 15 | Human review | 10 | Mitigate | [Name] | [date] | Open | [date] |
| [Add rows] | | | | | | | | | | | | |

## 9. Risk Treatment Plans (per High risk)

### Treatment Plan — R-[NN]

| Field | Detail |
|---|---|
| **Risk** | [One-line description] |
| **Residual score** | [e.g., 12 — High] |
| **Treatment strategy** | [Mitigate / Transfer / Avoid / Accept] |
| **Actions** | [Specific steps] |
| **Owner** | [Name] |
| **Due date** | [YYYY-MM-DD] |
| **Target residual score** | [e.g., 6] |
| **Acceptance sign-off (if accepting)** | [Name, date] |
| **Status** | [Open / In progress / Done] |

## 10. EU AI Act High-Risk Classification Worksheet

For each AI use case, work through:

1. **Is it a prohibited practice?** (e.g., social scoring, manipulative use) → if yes, **stop**.
2. **Is it a listed high-risk use?** (e.g., employment/recruitment, credit, essential services, biometrics) → if yes, high-risk obligations likely apply.
3. **Are you a provider or a deployer** of the system? (Different duties apply.)
4. **If high-risk:** note obligations — risk management, data governance, human oversight, transparency, logging — and add them as risks/actions here.
5. **Document the rationale** even when the answer is "not high-risk, because…". Auditors want the reasoning, not just the conclusion.

| Use case | Prohibited? | High-risk listed? | Provider/Deployer | Conclusion | Rationale |
|---|---|---|---|---|---|
| [Screening aid] | No | Possibly (employment) | Deployer | Treat as high-risk | [Used to rank candidates] |

## 11. Bias & Fairness Assessment Module

Run this whenever an AI use case affects a person (hiring, pricing, access, credit):

- **What decision** does the AI influence, and how much weight does a human give it?
- **Protected attributes** that could be correlated with inputs?
- **Test:** compare outcomes across groups on representative data.
- **Mitigations:** human review, adjusted inputs, documented criteria, vendor bias documentation.
- **Record** the assessment date, findings, and owner. Re-run annually or on model change.

## 12. Monitoring, KRIs & Reporting

**Key risk indicators (review monthly):**

- # High residual risks open past due date *(target: 0)*
- # use cases touching customer/regulated data without a signed DPA *(target: 0)*
- # AI incidents this quarter (from the Incident Response Plan)
- # use cases classified high-risk under the EU AI Act, with obligations tracked

**Board-ready summary (one page, quarterly):** total risks by band, movement since last quarter, top 3 High risks with status, and any risks formally accepted.

## 13. Review Cadence & Change Log

**Quarterly review:** re-score residual risks, close completed treatments, add new risks from the inventory and incidents, refresh the board summary.

| Date | Change | By |
|---|---|---|
| [date] | [Added R-03; classified as EU AI Act high-risk] | [name] |

---

## Appendix A — Framework Mapping

| This register provides evidence for | NIST AI RMF | ISO/IEC 42001 | SOC 2 | EU AI Act |
|---|---|---|---|---|
| Risk identification & measurement | MEASURE 2.2 | 6.1.2 | CC3.2 | Art. 9 |
| Ongoing risk management | MANAGE 1.1, MANAGE 2.1 | 8.1 | CC3.2, CC3.4 | Art. 9 |
| High-risk classification | MAP 1.5 | 4.1 | CC2.3 | Art. 6 |
| Bias & fairness | MEASURE 2.11 | 6.1.2 | CC3.2 | Art. 10, Art. 15 |

## Appendix B — Worked Examples

Five fully scored risks (inherent → controls → residual) for a typical B2B SaaS: support chatbot (16→8), coding assistant (12→6), candidate screening (15→10), marketing content generator (8→4), vendor concentration on a single model provider (12→9). The pattern to notice: controls move most risks out of the Red band, but **concentration risk** is usually the stubborn one because it needs a real fallback, not just a policy.

## Appendix C — Control-to-Framework Crosswalk

Map each control in Section 7 to the frameworks it satisfies (e.g., "Signed DPA" → GDPR Art. 28, SOC 2 CC9.2, ISO 42001 6.1.2). Maintain as a table for questionnaire responses.

## Appendix D — Risk Acceptance Sign-Off

> I accept the residual risk described below on behalf of [COMPANY NAME], having reviewed the controls in place.

**Risk ID:** ______  **Residual score:** ______  **Approver:** ______________________  **Date:** ____________

*Template provided by SiteOptz. This is a starting point, not legal advice. Have qualified counsel review EU AI Act classifications and any decision to accept a High risk.*
