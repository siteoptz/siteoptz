# AI Tool Inventory (Template)

> **How to use this template (delete this box before publishing):**
> This is the foundation of your entire AI governance program — every other document points back to it. Keep it as a **single living spreadsheet** (copy the table below into Google Sheets, Excel, or Notion). The goal is one row per AI tool that anyone on the team uses for work, including the "shadow" tools nobody officially approved. Fill it once, then review it **monthly** and whenever someone adopts a new tool.
>
> **How to populate it fast:** (1) survey every employee with 5 questions about which AI tools they use, (2) pull billing/expense data from finance to catch paid subscriptions, (3) consolidate into the table below. Budget ~1 week for the first pass.

---

**Company:** [COMPANY NAME]
**Inventory owner:** [NAME, TITLE]
**Last updated:** [YYYY-MM-DD]
**Review cadence:** Monthly

---

## Column Definitions

| Column | What goes here |
|---|---|
| **Tool** | Product name and tier (e.g., "ChatGPT Team", "GitHub Copilot Business"). |
| **Purpose** | What the team uses it for, in plain language. |
| **Owner** | The one person accountable for this tool. |
| **Users / teams** | Who uses it (a team name or count is fine). |
| **Data sensitivity** | Highest class of data it touches: Public / Internal / Customer / Regulated. |
| **Vendor SOC 2** | Yes (Type II) / Yes (Type I) / In progress / No / Unknown. |
| **DPA in place** | Yes / No / N/A. Required before any Customer or Regulated data. |
| **Trains on our data** | Yes / No / Disabled. "Yes" with Customer/Regulated data is a red flag. |
| **Status** | Approved / Approved w/ conditions / Under review / **Shadow** / Retired. |
| **Last reviewed** | Date the vendor was last checked (use the AI Vendor Review Checklist). |
| **Next review due** | When to re-check (default: 12 months, or sooner if high sensitivity). |

---

## Inventory

| Tool | Purpose | Owner | Users / teams | Data sensitivity | Vendor SOC 2 | DPA in place | Trains on our data | Status | Last reviewed | Next review due |
|---|---|---|---|---|---|---|---|---|---|---|
| [ChatGPT Team] | [Drafting, research] | [Name] | [Marketing] | Internal | Yes (Type II) | Yes | No | Approved | [YYYY-MM-DD] | [YYYY-MM-DD] |
| [GitHub Copilot Business] | [Code completion] | [Name] | [Engineering] | Internal | Yes (Type II) | Yes | Disabled | Approved | [YYYY-MM-DD] | [YYYY-MM-DD] |
| [Claude for Work] | [Analysis] | [Name] | [Ops] | Internal | Yes (Type II) | Yes | No | Approved | [YYYY-MM-DD] | [YYYY-MM-DD] |
| [e.g., a free chatbot in use] | [Ad-hoc] | [Unassigned] | [Unknown] | Unknown | Unknown | No | Yes | **Shadow** | — | [Review now] |
| [Add a row per tool] | | | | | | | | | | |

---

## Quick Stats (update each review)

- **Total tools tracked:** [N]
- **Touching Customer or Regulated data:** [N]
- **Without a signed DPA:** [N] ← prioritize these
- **Shadow tools to triage:** [N]
- **Reviews overdue:** [N]

## Survey Questions (to find shadow AI)

Send these five to every employee:

1. Which AI tools do you use for work, even occasionally?
2. What do you use each one for?
3. Do you ever paste customer data, code, or confidential info into them?
4. Is the company paying for it, or are you using a free/personal account?
5. Is there an AI tool you wish you were allowed to use?

---

## Appendix A — Framework Mapping (for your data room)

| This inventory provides evidence for | NIST AI RMF | ISO/IEC 42001 | SOC 2 | EU AI Act |
|---|---|---|---|---|
| AI system inventory & mapping | MAP 1.1 | 6.1.2 | CC6.1 | Art. 51 (GPAI awareness) |
| Data sensitivity classification | MAP 2.2 | 8.1 | CC6.1 | Art. 10 (data governance) |
| Vendor / third-party tracking | GOVERN 6.2 | 6.1.2 | CC9.2 | Art. 28 (obligations) |

*Template provided by SiteOptz. This is a starting point, not legal advice.*
