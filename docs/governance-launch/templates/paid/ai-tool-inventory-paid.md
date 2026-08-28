# AI Tool Inventory — Paid Edition

> **How to use this template (delete this box before publishing):**
> This is the managed-program version of the AI Tool Inventory. Where the free starter is a single table, this edition adds a data dictionary, discovery toolkit, intake workflow, classification matrix, and lifecycle management so you can actually *run* the inventory, not just fill it once. Copy the register table into Google Sheets, Excel, or Notion and keep the rest of this document as your operating manual.
>
> **First pass:** ~1 week (survey + billing audit + consolidation). **Ongoing:** a 30-minute monthly review. **Owner:** the person named in Section 2.

---

**Company:** [COMPANY NAME]
**Document owner:** [NAME, TITLE]
**Version:** [1.0]
**Effective date:** [YYYY-MM-DD]
**Last updated:** [YYYY-MM-DD]
**Review cadence:** Monthly (register) · Quarterly (this operating manual)

---

## 1. Purpose & Scope

The AI Tool Inventory is the single source of truth for every AI tool used anywhere in [COMPANY NAME]. Every other governance artifact — the Risk Register, Vendor Reviews, the Incident Response Plan — points back to it. If it isn't in the inventory, we can't govern it, secure it, or answer a customer's questions about it.

**In scope:** any software that uses machine learning or generative AI and is used for company work — standalone tools (ChatGPT, Claude, Copilot), AI features embedded in tools you already pay for (the AI add-on in your CRM, help desk, or analytics suite), AI built into your own product, and APIs your product calls.

**Out of scope:** purely deterministic software with no ML component.

## 2. Roles & Ownership (RACI)

| Activity | Inventory Owner | Tool Owner | Reviewer | Approver |
|---|---|---|---|---|
| Maintain the register | A/R | C | I | I |
| Add a new tool | A | R | C | — |
| Vendor review of a tool | A | R | R | C |
| Approve customer/regulated-data use | A | C | C | **R** |
| Monthly inventory review | R/A | C | C | I |
| Retire a tool & revoke access | A | R | I | I |

*R = Responsible, A = Accountable, C = Consulted, I = Informed.* Name the actual people:

- **Inventory Owner:** [Name] — accountable for the inventory as a whole.
- **Approver (sensitive data):** [Name, exec/legal] — signs off on customer/regulated data use.

## 3. Inventory Data Dictionary

Every field in the register, with allowed values. Consistency here is what makes the inventory auditable.

| Field | Definition | Allowed values |
|---|---|---|
| **Tool** | Product name + tier | Free text (e.g., "ChatGPT Team") |
| **Purpose** | What it's used for | Free text |
| **Owner** | One accountable person | Name |
| **Users / teams** | Who uses it | Free text / count |
| **Underlying model/provider** | Which model powers it | OpenAI / Anthropic / Google / AWS / Meta / Other / Unknown |
| **Prime or reseller** | Direct vendor or wrapper | Prime / Reseller |
| **Data classes touched** | Types of data entered | Public / Internal / Customer / Personal / Regulated |
| **Sensitivity** | Highest class above | Public / Internal / Customer / Regulated |
| **Hosting region** | Where data is processed | US / EU / Other / Unknown |
| **Auth method** | How users sign in | SSO/SAML / Email+password / Shared account |
| **Vendor SOC 2** | Security attestation | Type II / Type I / In progress / No / Unknown |
| **DPA in place** | Data Processing Agreement | Yes / No / N/A |
| **Trains on our data** | Provider trains on inputs | Yes / No / Disabled |
| **Business criticality** | Impact if it disappeared | Critical / Important / Nice-to-have |
| **Monthly cost** | Spend | Currency amount |
| **Status** | Governance state | Approved / Approved w/ conditions / Under review / Shadow / Retired |
| **Last reviewed** | Date last vendor-checked | Date |
| **Next review due** | When to re-check | Date |

## 4. Master Inventory Register

> Keep the live version in a spreadsheet. This is the canonical column set.

| Tool | Purpose | Owner | Users | Model/Provider | Data classes | Sensitivity | Region | Auth | SOC 2 | DPA | Trains? | Criticality | Cost/mo | Status | Last review | Next review |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ChatGPT Team] | [Drafting] | [Name] | [Mktg] | OpenAI | Internal | Internal | US | SSO | Type II | Yes | No | Important | [$] | Approved | [date] | [date] |
| [Copilot Business] | [Code] | [Name] | [Eng] | OpenAI | Internal | Internal | US | SSO | Type II | Yes | Disabled | Important | [$] | Approved | [date] | [date] |
| [CRM AI add-on] | [Email drafts] | [Name] | [Sales] | Unknown | Customer | Customer | US | SSO | Type II | Yes | No | Critical | [$] | Approved w/ conditions | [date] | [date] |
| [Free chatbot in use] | [Ad-hoc] | [Unassigned] | [?] | Unknown | Unknown | Unknown | Unknown | Shared | Unknown | No | Yes | Nice-to-have | $0 | **Shadow** | — | [now] |
| [Add a row per tool] | | | | | | | | | | | | | | | | |

## 5. Data Flow Mapping

For each tool that touches **Customer**, **Personal**, or **Regulated** data, document the flow:

| Tool | Data in | Where processed | Retention | Data out | Who can see it |
|---|---|---|---|---|---|
| [CRM AI add-on] | [Customer email content] | [US, vendor cloud] | [30 days] | [Draft reply] | [Sales team] |
| [Add rows] | | | | | |

**Diagram guidance:** a simple boxes-and-arrows sketch (source system → AI tool → output destination) is enough for most data rooms. One diagram per high-sensitivity tool.

## 6. Shadow AI Discovery Toolkit

Most risk hides in tools nobody registered. Run all five methods on the first pass, then the survey quarterly.

1. **Employee survey** — the 5 questions in Appendix C, sent to everyone.
2. **Finance/billing audit** — search expenses and card statements for AI vendors (keyword list below).
3. **SSO / identity logs** — list every app authorized through Google/Okta/Microsoft.
4. **Browser extension audit** — AI extensions are a common shadow vector; ask IT or self-report.
5. **Network/DNS hints** — if available, review outbound traffic to known AI API domains.

**Expense keyword list:** OpenAI, Anthropic, ChatGPT, Claude, Gemini, Copilot, Midjourney, Jasper, Copy.ai, Perplexity, Runway, ElevenLabs, Hugging Face, Replicate, "AI", "GPT".

## 7. Tool Intake & Approval Workflow

Before a new AI tool touches anything beyond public information:

1. **Request** — requester submits the intake form (Appendix D) to [CHANNEL].
2. **Triage** — Inventory Owner classifies sensitivity and assigns a reviewer. Target: **[1 business day]**.
3. **Vendor review** — run the **AI Vendor Review Checklist**. Target: **[3 business days]**.
4. **Decision** — approve / approve with conditions / reject; record in the decision log.
5. **Register** — add to the Master Register; set the next review date.

**Decision log:**

| Date | Tool | Requester | Sensitivity | Decision | Conditions | Approver |
|---|---|---|---|---|---|---|
| [date] | [tool] | [name] | [class] | [Approved] | [Internal only] | [name] |

## 8. Classification Matrix

Sensitivity × business criticality determines how often a tool is reviewed and who must approve it.

| | Nice-to-have | Important | Critical |
|---|---|---|---|
| **Public** | Annual · Owner | Annual · Owner | Semi-annual · Owner |
| **Internal** | Annual · Owner | Semi-annual · Owner | Quarterly · Owner |
| **Customer** | Semi-annual · Approver | Quarterly · Approver | Quarterly · Approver + DPA |
| **Regulated** | Quarterly · Approver + Legal | Quarterly · Approver + Legal | **Quarterly · Exec + Legal + DPA** |

## 9. Lifecycle Management

- **Onboarding** — vendor reviewed, DPA signed (if needed), added to register, owner assigned, users provisioned via SSO.
- **In-life** — reviewed at the cadence set by the classification matrix; re-reviewed early if the vendor changes terms, the use case changes, or an incident occurs.
- **Offboarding / retirement** — revoke access, confirm data deletion with the vendor, cancel billing, mark **Retired** in the register (don't delete the row — keep the audit trail).

## 10. Dashboards & Metrics

Track these monthly; they're also your answers to investor and customer questions.

- **Inventory coverage** — tools registered vs. estimated total.
- **DPA coverage** — % of customer/regulated tools with a signed DPA. *(Target: 100%.)*
- **Training exposure** — # tools with "Trains? = Yes" touching customer/regulated data. *(Target: 0.)*
- **Reviews overdue** — # past their next-review date. *(Target: 0.)*
- **Shadow tools open** — # in Shadow status awaiting triage. *(Target: 0.)*

## 11. Review Cadence & Change Log

**Monthly review ritual (30 min):** new tools since last month, shadow tools found, reviews due, DPA gaps, metric check.

**Change log:**

| Date | Change | By |
|---|---|---|
| [date] | [Added CRM AI add-on; flagged for DPA] | [name] |

---

## Appendix A — Framework Mapping

| This inventory provides evidence for | NIST AI RMF | ISO/IEC 42001 | SOC 2 | EU AI Act |
|---|---|---|---|---|
| AI system inventory & mapping | MAP 1.1, MAP 1.2 | 6.1.2 | CC6.1 | Art. 51 |
| Data sensitivity classification | MAP 2.2 | 8.1 | CC6.1 | Art. 10 |
| Vendor/third-party tracking | GOVERN 6.2 | 6.1.2 | CC9.2 | Art. 28 |
| Lifecycle & change management | MANAGE 4.1 | 8.1 | CC8.1 | Art. 17 |

## Appendix B — Worked Example (excerpt)

A 12-tool inventory for a 40-person B2B SaaS company typically surfaces: 3–4 approved enterprise tools, 2–3 embedded AI features in existing SaaS, 1 coding assistant, and **3–5 shadow tools** found via the billing audit — usually free chatbot accounts and browser extensions. The most common gap: a customer-facing tool with no signed DPA.

## Appendix C — Employee AI-Use Survey

1. Which AI tools do you use for work, even occasionally?
2. What do you use each one for?
3. Do you ever paste customer data, code, or confidential info into them?
4. Is the company paying, or are you using a free/personal account?
5. Is there an AI tool you wish you were allowed to use?

## Appendix D — New Tool Intake Form

- Requester / team / date
- Tool name, tier, vendor, website
- Business purpose
- Data it will touch (be specific)
- Highest sensitivity class
- Expected users
- Cost

*Template provided by SiteOptz. This is a starting point, not legal advice.*
