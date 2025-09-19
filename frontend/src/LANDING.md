# FinCare Landing Page — Build Spec (Cursor)

**Goal:** Ship a high-converting landing page for FinCare that clearly communicates value to SMEs in Vietnam and captures early-access leads.

**Primary Audience:** SMEs in Vietnam without dedicated finance teams (small shops, startups, small manufacturers).

**Design System**
- **UI kits:** Magic UI + shadcn MCP
- **Brand style:** Clean, trustworthy, fintech; whitespace; rounded-2xl; soft shadows; modern sans-serif.
- **Colors:** Neutral base + one accent (green/teal). Prefer Tailwind tokens.

**Tech Stack**
- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn MCP components
- Magic UI components/effects
- (No analytics, no i18n)

**Placeholders**
- **Logos & preview images:** use gray placeholders (SVG/PNG).  
  - `/public/placeholders/bank-logo-1.svg` (simple gray rounded rect)  
  - `/public/placeholders/bank-logo-2.svg` …  
  - `/public/preview/landing-placeholder.png` (gray 16:10 block)  
  - Ensure all placeholders are grayscale and consistent corner radius.

---

## Page Structure (Single route `/`)
1. **Navbar** — Transparent navbar (logo, minimal links, primary CTA).
2. **Hero** — Magic UI **Safari** component for the “web preview” visual.
3. **Trust/Partner Strip** — Row of grayscale partner/bank logos (gray placeholders).
4. **Use Cases** — Replace Problem/Value-prop with concrete SME scenarios.
5. **Core Features** — **Bento Grid** using Magic UI with **Border Beam** accent.
6. **How It Works** — Scroll-driven **timeline** that highlights each process step and updates the preview visual **while the visual remains in place** (sticky/fixed within section).
7. **FAQ** — Common questions using shadcn `Accordion`.
8. **CTA Banner** — Final conversion banner with lead capture.
9. **Footer** — Links + contact (minimal).

---

## Component Mapping (shadcn + Magic UI)
- **Navbar:** shadcn `Button`, optional `NavigationMenu`; transparent with subtle backdrop on scroll.
- **Hero:** Magic UI **Safari** frame wrapping a gray preview image; two shadcn buttons (Primary “Get Early Access”, Secondary “See How It Works” anchor).
- **Trust Strip:** Responsive grid of logo placeholders (`aspect-[3/1]`, grayscale).
- **Use Cases:** 3–4 compact cards (shadcn `Card`) describing specific SME scenarios.
- **Core Features (Bento Grid):** Magic UI **Bento Grid** with **Border Beam** accent layer; each tile = key feature.
- **How It Works (Timeline):** Steps (**no Sign Up step**):  
  - **Upload Documents → Get Your Score → Find Loan Options → Prepare & Apply**  
  - Scroll animation highlights active step.  
  - Preview visual (Magic UI container) **stays fixed** and updates per step (swap placeholder screenshots or layered states).  
  - Use IntersectionObserver or Framer Motion variants for step highlighting.
- **FAQ:** shadcn `Accordion`.
- **CTA Banner:** Full-width band with brief reassurance text + email field.
- **Footer:** Minimal columns for Product, Company, Legal, Contact.

---

## Copy (Initial Draft)

**Hero**
- **Headline:** Smarter SME Loan Applications
- **Subheadline:** AI-powered platform that helps SMEs in Vietnam save time, reduce effort, and find the right bank loan with confidence.
- **Primary CTA:** Get Early Access
- **Secondary CTA:** See How It Works

**Use Cases (examples)**
- **Small retailer** needing working capital for inventory.
- **Local manufacturer** expanding production capacity.
- **Service startup** consolidating higher-interest debt.
- **Family shop** seeking short-term cash-flow support.

**Core Features**
- **Smart Loan Matching** — AI + partner bank criteria for tailored recommendations.
- **Loan Readiness Score** — Instantly see how prepared you are and what to improve.
- **Secure Document Vault** — Supabase-backed storage; upload once, reuse everywhere.
- **Application Support** — Guided steps and pre-filled forms to reduce errors.

**How It Works Steps (4)**
1. **Upload Documents**  
2. **Get Your Score**  
3. **Find Loan Options**  
4. **Prepare & Apply**  
*(Future: submit directly to partner banks & track repayments.)*

**FAQ (sample)**
- **Is FinCare for me?** Designed for SMEs in Vietnam without a dedicated finance team.
- **Is my data safe?** We use secure storage (Supabase) and best practices to protect your data.
- **How much does it cost?** Pricing packages coming soon—join early access to be first to know.

**CTA Banner**
- **Ready to apply smarter?** Get Early Access

---

## Lead Capture (MVP)
- Simple email form in **Hero** and **CTA Banner**.
- Validate with zod; submit to `/api/lead` (stub OK).
- Show success/toast using shadcn `Toast`.

**Lead payload**
```ts
type Lead = { email: string; source: "hero" | "cta"; createdAt: string }


## Cursor Task

- [ ] Navbar (transparent, shadcn Button for CTA)
- [ ] Hero (Magic UI Safari for preview, shadcn Buttons)
- [ ] Trust Strip (gray logo placeholders)
- [ ] Use Cases (shadcn Card grid)
- [ ] Core Features (Magic UI Bento Grid + Border Beam)
- [ ] How It Works (timeline with scroll animation, Magic UI container for preview)
- [ ] FAQ (shadcn Accordion)
- [ ] CTA Banner (lead form with shadcn Toast on success)
- [ ] Footer (minimal links)
- [ ] Magic UI Enhancements (Blur Fade + Animated Text)