# The Founder's Guide to AI Compliance Before Your Series A

**Format:** 15-page PDF
**Audience:** Pre-Series-A through Series-B founders, CTOs, and ops leads at AI-using companies (10–150 employees)
**Use:** Gated lead magnet — high-value, indexable, shareable. Designed to be passed around accelerators, VC platforms, and founder Slacks.
**Tone:** Direct, practical, no jargon. Written by an operator, not a lawyer.
**CTA strategy:** Soft CTAs in margins, hard CTA on final two pages

---

## COVER PAGE (Page 1)

**Title:** The Founder's Guide to AI Compliance Before Your Series A

**Subtitle:** What to fix in the next 30 days so AI questions stop killing your deals

**Tagline strip:** *Based on AI implementations at 500+ companies including AT&T, P&G, and US Air Force*

**Cover image concept:** Split image — left side, founder pitching with confidence; right side, the AI risk register on a laptop. Or simpler: clean typographic cover with the title and a single "By SiteOptz" attribution.

---

## TABLE OF CONTENTS (Page 2)

1. Why you're reading this *(p. 3)*
2. The 5 questions every modern VC will ask about AI *(p. 4)*
3. The 7 compliance gaps that kill enterprise deals *(p. 5–6)*
4. The regulatory landscape in 90 seconds *(p. 7–8)*
5. Your minimum viable AI governance program *(p. 9–10)*
6. Sample AI Acceptable Use Policy (copy-paste) *(p. 11)*
7. The 30-day action plan *(p. 12–13)*
8. What to do when you outgrow this guide *(p. 14)*
9. About SiteOptz / Resources *(p. 15)*

---

## SECTION 1 — Why You're Reading This (Page 3)

**Hook:**
You're reading this because something happened. A customer sent a 60-question AI risk assessment. An investor asked where your AI governance documentation lives. Your lawyer mentioned the EU AI Act and you didn't know what to say.

**Set the stakes:**
Three years ago, AI compliance was an enterprise problem. In 2026, it's a deal-closing problem and a fundraising problem and a hiring problem. Companies that can't answer AI risk questions lose deals to companies that can — even when their product is better.

**Set the promise:**
This guide gives you the 90-minute version of what an enterprise governance program looks like, what investors actually check, and the minimum work you need to do in the next 30 days to stop losing deals you should win.

**Sidebar callout:** "Before you read further: Take the 5-minute AI Compliance Readiness Scorecard to get a personalized version of this guide based on your actual gaps. [Link]"

---

## SECTION 2 — The 5 Questions Every Modern VC Will Ask (Page 4)

Frame: *Sourced from real diligence questionnaires across 10+ early-stage funds, 2025–2026.*

1. **"Which AI models or providers does your product depend on, and what happens if one of them is unavailable or changes terms?"**
   - Why they ask: Concentration risk, business continuity.
   - What "good" looks like: A dependency map showing primary and fallback providers.

2. **"What customer data is sent to AI providers, and have you reviewed each provider's training and retention terms?"**
   - Why they ask: Privacy exposure and contract risk.
   - What "good" looks like: A data flow diagram + a one-page vendor summary.

3. **"Do you have an AI acceptable use policy, and have employees acknowledged it?"**
   - Why they ask: Insider risk and IP leakage from shadow AI.
   - What "good" looks like: Signed policy in your data room.

4. **"How are you handling the EU AI Act, and which of your systems are 'high-risk' under that classification?"**
   - Why they ask: Cross-border revenue exposure.
   - What "good" looks like: Classification document, even if the answer is "none of our systems are high-risk and here's why."

5. **"What's your plan if one of your AI features produces a discriminatory or harmful output in production?"**
   - Why they ask: PR and litigation risk.
   - What "good" looks like: A short AI incident response plan with named owners.

**Sidebar:** "If you can't answer all five in a 10-minute conversation, you have homework."

---

## SECTION 3 — The 7 Compliance Gaps That Kill Enterprise Deals (Pages 5–6)

Each gap gets ~80 words: the symptom, the cost, the fix.

1. **No AI inventory.** "We don't actually know which tools our team uses."
2. **Unclear data flows.** "We're not sure which AI providers see customer data."
3. **Missing vendor review.** "We never looked at OpenAI's DPA before signing up."
4. **No written policy.** "Our policy is 'use common sense.'"
5. **Untracked shadow AI.** "Engineering uses GitHub Copilot, marketing uses Jasper, sales uses Clay — none of it is documented anywhere."
6. **No risk classification.** "We have no idea if we're subject to the EU AI Act."
7. **No incident plan.** "If something goes wrong, we'd figure it out."

**Visual:** Checklist graphic. Reader can self-score: how many of these are you?

**Sidebar callout:** "The Compliance Readiness Scorecard tests for all 7 of these — in 5 minutes."

---

## SECTION 4 — The Regulatory Landscape in 90 Seconds (Pages 7–8)

Not a legal treatise. A founder-readable summary of what's enforceable, where, and what triggers exposure.

**EU AI Act**
- Live and enforceable now (phased through 2026–2027)
- Applies if: you sell to EU customers OR your AI affects EU residents
- Trigger: high-risk system classification → significant documentation requirements
- Penalty range: up to 7% of global revenue

**NIST AI Risk Management Framework (RMF)**
- Voluntary in the US, but the de facto standard
- Increasingly required in federal contracts and large enterprise procurement
- Four functions: Govern, Map, Measure, Manage

**State-level US laws (the patchwork)**
- Colorado AI Act (effective 2026), NYC bias audit law (Local Law 144), California ADMT regulations
- If you have remote employees or customers in any of these states, you're exposed

**Sector frameworks**
- HIPAA (healthcare), SR 11-7 (banking model risk), FERPA (education)
- If you're in a regulated industry, AI doesn't get a free pass

**ISO/IEC 42001**
- The new AI management system certification — emerging as the "SOC 2 of AI"
- Expect enterprise buyers to start asking for it in 2026–2027

**Bottom-line graphic:** A flowchart — "Do you sell in EU?" / "Do you handle PHI?" / "Do you have remote workers?" — outputting which frameworks apply to the reader.

---

## SECTION 5 — Your Minimum Viable AI Governance Program (Pages 9–10)

The opposite of a 200-page compliance manual. Five artifacts, in priority order.

1. **AI Tool Inventory** — a single spreadsheet. Columns: tool, purpose, owner, data sensitivity, vendor SOC 2 status, contract review date.

2. **AI Acceptable Use Policy** — 2 pages. Must cover: approved tools, prohibited use cases, data handling rules, IP and confidentiality, training requirements, consequences.

3. **Vendor Review Checklist** — 1 page. SOC 2 status, sub-processors, training-on-customer-data terms, data residency, DPA in place, breach notification SLA.

4. **AI Risk Register** — a single document. For each AI use case: what it does, what data it touches, what could go wrong, what control mitigates it, who owns it.

5. **AI Incident Response Plan** — 1 page. Detection sources, triage steps, named owners, customer notification protocol, post-incident review.

**Visual:** A pyramid showing these 5 artifacts as the foundation. Above: enterprise certifications (SOC 2, ISO 42001). Above that: customer trust + closed deals.

---

## SECTION 6 — Sample AI Acceptable Use Policy (Page 11)

Actual copy-paste-ready policy text. Short. Editable. Real.

**Format:** 400–500 words of policy text in a bordered "extract this" box, plus 100 words of guidance above it explaining what to customize.

Sections to include:
- Purpose & scope
- Approved AI tools (with placeholder for company-specific list)
- Prohibited uses (customer data classes, employee data, regulated data without approval)
- Data handling rules (no proprietary code into consumer AI tools, etc.)
- Vendor approval process
- Reporting incidents
- Consequences of violation
- Acknowledgment signature block

---

## SECTION 7 — The 30-Day Action Plan (Pages 12–13)

A literal week-by-week plan a founder can execute without hiring anyone.

**Week 1 — Inventory**
- Day 1–2: Survey every employee (5 questions) on AI tools they use
- Day 3–4: Pull billing data from finance to find AI subscriptions
- Day 5: Consolidate into the inventory spreadsheet (template included)

**Week 2 — Classify and prioritize**
- Day 6–7: Tag each tool by data sensitivity (public / internal / customer / regulated)
- Day 8–10: Triage — which tools need immediate vendor review?

**Week 3 — Document**
- Day 11–13: Draft AI Acceptable Use Policy (sample provided)
- Day 14–15: Build the risk register for the 5 highest-priority tools

**Week 4 — Communicate and ship**
- Day 16–18: Run a 30-minute company-wide training session
- Day 19–20: Get policy acknowledgments from everyone
- Day 21–25: Add governance section to your data room
- Day 26–30: Brief your investors and key customers — proactively

**Sidebar:** "If you don't have the bandwidth for this 30-day plan, SiteOptz can run it for you in 14 days. [Link to /ai-governance]"

---

## SECTION 8 — What to Do When You Outgrow This Guide (Page 14)

Frame as a maturity progression:

**Stage 1: Foundational (you're here after the 30-day plan)**
- Inventory, policy, vendor checklist, risk register, incident plan all exist on paper

**Stage 2: Operationalized**
- Continuous monitoring (not one-time documents)
- Automated detection of shadow AI
- Quarterly reviews
- Framework mapping (NIST AI RMF, ISO 42001)

**Stage 3: Certified**
- SOC 2 Type II with AI controls
- ISO 42001 certification
- Third-party audited
- Ready for any enterprise procurement on Earth

**The Sale (soft):**
SiteOptz's Compliance Copilot takes companies from Stage 1 to Stage 2 in 14 days, and from Stage 2 to Stage 3 in 90.

---

## SECTION 9 — About SiteOptz + Resources (Page 15)

**About SiteOptz (3 lines max):**
SiteOptz has deployed 500+ AI solutions across Fortune 500 and growth-stage companies, generating $50M+ in productivity gains. We're the only AI consultancy that ships every implementation with an audit-ready governance layer.

**Three resources, three CTAs:**

1. **Run the free Readiness Scorecard** — 5 minutes, personalized PDF, no sales call
   [Big button: Start Scorecard]

2. **Book a free AI Compliance Strategy Call** — 30 minutes with a SiteOptz consultant, custom roadmap, $2,500 value
   [Big button: Book Call]

3. **See AI Compliance Copilot** — pricing and what's included
   [Big button: See Pricing]

**Footer:** siteoptz.ai · contact · linkedin · discord · © 2026 SiteOptz

---

## DESIGN & DISTRIBUTION NOTES

### Visual style
- Clean, white space, two-column where possible
- Stat callouts in colored boxes
- Sidebar CTAs visible on every page after page 3
- One signature pull-quote per major section
- All graphics simple and re-usable (inventory template, pyramid, flowchart)

### File specifications
- 15 pages, A4 and US Letter versions
- Web-optimized PDF, ~2MB target
- Cover image at 1200x630 for social shares (OG tags)
- Editable source file (Figma or Canva) handed to design team

### Distribution plan
- Gated download on `/resources/founders-guide-ai-compliance`
- Promoted in scorecard email sequence (Day 5)
- Pitched to 20 accelerators and VC platforms as a co-branded resource
- LinkedIn carousel adaptation (10 slides drawn from sections 2 and 3)
- Republished in 12-part blog series for SEO

### SEO targets
- Primary keyword: "AI compliance for startups"
- Secondary: "AI governance Series A," "EU AI Act for SaaS," "AI risk register template"
- Aim to rank for "AI compliance founder guide" within 6 months

### Update cadence
- Refresh every 6 months as regulations evolve
- Version control on cover ("2026 Edition" / "Q3 2026 update")
