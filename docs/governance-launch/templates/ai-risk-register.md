# AI Risk Register (Template)

> **How to use this template (delete this box before publishing):**
> A risk register turns "we use AI" into "we understand and control our AI risks" — which is exactly what investors and enterprise buyers want to see. Start with your **5 highest-priority AI use cases** (from the AI Tool Inventory) rather than trying to be exhaustive. For each one, write what it does, what data it touches, what could go wrong, the control that reduces that risk, and who owns it. Review **quarterly**.
>
> **Scoring:** Rate **Likelihood** and **Impact** each 1–5. **Risk score = Likelihood × Impact** (1–25). Anything **≥ 12 is high** and needs an active mitigation plan with a due date.

---

**Company:** [COMPANY NAME]
**Register owner:** [NAME, TITLE]
**Last updated:** [YYYY-MM-DD]
**Review cadence:** Quarterly

---

## Scoring Key

| Score | Likelihood | Impact |
|---|---|---|
| 1 | Rare | Negligible |
| 2 | Unlikely | Minor |
| 3 | Possible | Moderate |
| 4 | Likely | Major |
| 5 | Almost certain | Severe (legal/PR/financial) |

**Risk score = Likelihood × Impact.** Bands: **1–5 Low · 6–11 Medium · 12–25 High.**

---

## Risk Register

### Risk R-01

| Field | Detail |
|---|---|
| **AI use case** | [e.g., Support chatbot that drafts replies using customer tickets] |
| **Tool(s)** | [From inventory] |
| **Data it touches** | [e.g., Customer names, ticket contents] |
| **What could go wrong (risk)** | [e.g., Customer PII sent to a vendor that trains on inputs] |
| **Category** | [Data privacy / Security / Bias & fairness / Accuracy / Legal / Vendor / Operational] |
| **Likelihood (1–5)** | [3] |
| **Impact (1–5)** | [4] |
| **Risk score** | [12 — High] |
| **Existing control(s)** | [e.g., Enterprise tier with training disabled; DPA signed] |
| **Mitigation plan** | [e.g., Add PII redaction before send; quarterly access review] |
| **Owner** | [Name] |
| **Due date** | [YYYY-MM-DD] |
| **Status** | [Open / Mitigating / Accepted / Closed] |

### Risk R-02

| Field | Detail |
|---|---|
| **AI use case** | [e.g., AI coding assistant on production repos] |
| **Tool(s)** | [From inventory] |
| **Data it touches** | [Proprietary source code] |
| **What could go wrong (risk)** | [IP leakage; insecure code suggestions merged] |
| **Category** | [Security / Legal] |
| **Likelihood (1–5)** | [2] |
| **Impact (1–5)** | [4] |
| **Risk score** | [8 — Medium] |
| **Existing control(s)** | [Business tier; no training on our code; mandatory PR review] |
| **Mitigation plan** | [Add secret-scanning in CI; document approved usage] |
| **Owner** | [Name] |
| **Due date** | [YYYY-MM-DD] |
| **Status** | [Open] |

### Risk R-03

| Field | Detail |
|---|---|
| **AI use case** | [e.g., AI used in screening or a decision affecting a person] |
| **Tool(s)** | [From inventory] |
| **Data it touches** | [Candidate/employee or customer personal data] |
| **What could go wrong (risk)** | [Discriminatory output; EU AI Act high-risk classification] |
| **Category** | [Bias & fairness / Legal] |
| **Likelihood (1–5)** | [2] |
| **Impact (1–5)** | [5] |
| **Risk score** | [10 — Medium] |
| **Existing control(s)** | [Human review of every decision; no fully automated decisions] |
| **Mitigation plan** | [Bias testing; document classification rationale] |
| **Owner** | [Name] |
| **Due date** | [YYYY-MM-DD] |
| **Status** | [Open] |

> Duplicate the block above for each additional risk (R-04, R-05, …). Aim for your top 5 to start.

---

## Register Summary (update each review)

| Risk | Use case | Score | Band | Owner | Status |
|---|---|---|---|---|---|
| R-01 | [Support chatbot] | 12 | High | [Name] | Mitigating |
| R-02 | [Coding assistant] | 8 | Medium | [Name] | Open |
| R-03 | [Screening] | 10 | Medium | [Name] | Open |

- **High risks (≥12):** [N] — these need an active plan with a due date.
- **Risks accepted (with sign-off):** [N]
- **Risks closed since last review:** [N]

---

## Common AI Risk Categories (prompts to think through)

- **Data privacy** — PII/customer data exposed to a vendor or used in training.
- **Security** — prompt injection, data leakage, insecure AI-generated code.
- **Bias & fairness** — discriminatory outputs in decisions about people.
- **Accuracy / hallucination** — wrong output relied on without review.
- **Legal / regulatory** — EU AI Act high-risk classification, IP/copyright, contract breach.
- **Vendor / concentration** — over-reliance on one provider; term or price changes.
- **Operational** — outage of a critical AI dependency with no fallback.

---

## Appendix A — Framework Mapping (for your data room)

| This register provides evidence for | NIST AI RMF | ISO/IEC 42001 | SOC 2 | EU AI Act |
|---|---|---|---|---|
| Risk identification & measurement | MEASURE 2.2 | 6.1.2 | CC3.2 | Art. 9 (risk management) |
| Ongoing risk management | MANAGE 1.1 | 8.1 | CC3.2 | Art. 9 |
| High-risk system classification | MAP 1.5 | 4.1 | CC2.3 | Art. 6 |

*Template provided by SiteOptz. This is a starting point, not legal advice. Have qualified counsel review classifications that may trigger EU AI Act high-risk obligations.*
