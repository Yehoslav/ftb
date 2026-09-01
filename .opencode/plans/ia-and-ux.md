# FTB România — IA & UX Plan

> Working document. AI-supported analysis of the current site against the twin goals
> (host guides/useful info for students + showcase the organisation's activity), and the
> agreed restructure. We will still iterate on it — captured here so context isn't lost.

Status: **PROTOTYPE STRUCTURE APPROVED, VALIDATION + CONTENT-GOVERNANCE GATES ADDED**
(see §4 "Approved sitemap", §4.5 "B-audience", §4.6 "D-audience", §4.7 + Passes 7–9 "A-audience").
The sitemap is the working structure to prototype, not proof that its labels, grouping or journeys work.
Next: complete the prototype brief/content-readiness matrix, then Pass 1 (routes/nav/redirects), the
small-scope manual/professional prototypes, and Passes 7–9 (connections/freshness/student hub).

---

## 0. Guiding principles (locked)

1. **The homepage is the multi-audience funnel.** Every other page is **audience-specific**
   ("single / few-audience") — it does not need to be understood by everyone, only needs a
   **quick escape hatch** back to where the visitor can find what they need.
   - Rationale: most visitors arrive at the homepage from external links (YouTube, Instagram…);
     specialized pages (admitere, structura-organizatie, transparenta) serve a narrower need.
   - "It's OK if a high-school student is confused on a legal/transparency page — we just need
     to give him a quick way out."
2. **Redundancy is fine ACROSS pages** (same info, tuned per audience/need). Avoid redundancy
   only **within a single page**. We may create new paths to build a real "web of knowledge".
3. **Don't disregard other audiences** in favour of the student. The site is also:
   - a **quick-access tool for member/org members** (data + documentation),
   - the **face of the org for funders / partners / institutions**.
4. **The navbar vs. homepage "mismatch" is an intentional prototype hypothesis:**
   - Homepage onboarding = for the student (and provisional audiences).
   - Persistent navbar (org-centric groups) = for member orgs / partners.
   Two surfaces, two mental models, different audiences. Do not erase the distinction by default,
   but test direct landings, mobile navigation and escape hatches before treating it as final.
5. **`/admitere` vs `/ghiduri#admitere` is intentional:** `/admitere` is a high-level **hub**
   (big picture), `/ghiduri` contains **problem-tuned** detail guides. A hub/detail split
   mirroring the project hub/edition system.
6. **Placeholders everywhere:** every page ships with a visible spec of the content it should
   hold, so colleagues know what info is required by seeing how it will be displayed.

### 0.1 Prototype guardrails (locked)

These are safety/quality constraints, not reasons to reduce the exploratory scope:

1. **Prototype decisions are hypotheses.** “Approved” means approved for prototyping. Route names,
   groupings and audience assumptions become final only after representative task testing.
2. **No fictional institutional claim may look real outside a clearly identified demo.** Placeholder
   examples involving impact, finances, legal status, partners, policies, official procedures or
   named people must remain visibly marked as samples, be access-controlled/noindexed, or be replaced
   by an honest “content not yet published” state. The clean Placeholder-off rendering is only safe
   for approved factual copy or obviously generic UI copy.
3. **`Actualizat` is not `Verificat`.** A CMS modification date can support “Actualizat”, never a
   factual-verification claim by itself. “Verificat” requires a recorded reviewer/role, authoritative
   source, review date and review/expiry rule.
4. **Classify records before publishing them.** Minutes, decisions, reports, templates and Drive files
   must be classified as public, public-after-redaction, restricted, or never public. Define approval,
   redaction, retention, correction/takedown and Drive-permission ownership before representative
   documents are exposed.
5. **Canonical facts have one source.** Member counts/status, leadership, legal identity, funders and
   impact figures may be framed differently per audience, but must be reused from one approved source
   rather than copied independently. Reconcile existing 4/16/17-member claims before `/org` uses them.
6. **Every prototype destination needs an owner.** Before a route is treated as launch-ready, record
   its audience task, minimum content, source, approver, maintainer and review cadence. Thin prototype
   pages may still exist in the demo when their learning purpose is explicit.
7. **One contact route still needs triage.** `/contact` remains shared, but should distinguish student,
   member, partnership/media and correction/privacy requests and route them to a responsible role.

### 0.2 What the prototype must learn

The first prototype is successful if it gives evidence about these questions, not if it merely ships
all proposed routes:

1. Can prospective and already-enrolled students distinguish `/admitere` from
   `/student-in-romania` and reach the correct next step from both the homepage and a direct landing?
2. Do a few deliberate cross-links improve completion of representative admission, arrival and
   involvement journeys without creating confusing “related content” noise?
3. Can a member/volunteer locate one authoritative procedure or template without asking a colleague?
4. Can a partner/institution quickly establish identity, legitimacy, relevant results and the right
   contact path from `/org`?
5. Do users correctly understand “Actualizat”, critical-content warnings, official-source exits,
   affiliation labels and sample/placeholder status?
6. Does “organisations by city” answer the student’s need, or is the real task broader “help in my
   city” discovery where organisations are only one resource type?

Minimum validation: 5–8 representative task scenarios across A1/A2/A3, B and C, including direct-entry
and mobile use. Record completion, wrong turns/backtracking, time/confidence and qualitative confusion.
Build/check/accessibility QA remains necessary, but is not evidence that the IA works.

### 0.3 Content-readiness record (per route/section)

Keep this as a small working table beside the prototype backlog:

| Field | Question |
|---|---|
| Audience task | What answer/action does this destination enable? |
| Learning goal | What prototype hypothesis does it test? |
| Minimum content | What must be real enough for a meaningful test? |
| Canonical source | WP, Sheets, approved document, local manual, or demo sample? |
| Approval/publication | Who approves it, and is it public/redacted/restricted/demo-only? |
| Maintenance | Responsible role, review cadence and correction path? |
| Keep/split criterion | What evidence justifies retaining a separate destination? |

---

## 1. Audience model

**A · The Student** (primary / intended audience)
- A1 **Prospective** — high-schooler in Moldova, pre-arrival. "How do I get in?" (admitere, visa, papers)
- A2 **Enrolled** — student now in Romania. "Papers, language, transport, my city" (guides, city orgs)
- A3 **Engaged** — wants opportunity / civic work. "Funding, projects, volunteering" (guides, projects)

**B · The Member / Organisation** (secondary, internal)
- B1 **Org leaders** — governance, network, docs, funding (structura, transparenta)
- B2 **Volunteers / coordinators** — what's running, who's who, where to help (projects, echipa, events)

**C · The Partner / Funder / Sponsor / Donor / Institution** (the "face of the org")
- Shared need: legitimacy, track record, impact, leadership and transparency.
- Different jobs must still be tested: institutional due diligence, programme/funding fit,
  sponsorship value, donation intent and the route to a responsible contact. Avoid “investor” unless
  a concrete social-investment model makes that term accurate.

**D · Public / Media / Diaspora community**
- What the org is, latest news, national days, events.

### Audience → primary surface mapping

| Audience | Primary surface | Secondary |
|---|---|---|
| A1–A3 | Homepage onboarding → `/ghiduri`, `/admitere`, `/organizatii-studentesti`, events, `/despre-noi` | projects |
| B1–B2 | Header nav (Organizație / Activități) → `/org/*` (structura, transparenta), `/proiecte`, `/org/impact` | parteneriate |
| C | `/org` hub, `/org/structura-organizatie`, `/org/transparenta`, `/org/parteneriate`, `/org/impact` (proof) | `/proiecte` |
| D | `/despre-noi`, `/noutati`, `/evenimente` | contact, socials |

---

## 2. Audience-specific sections — repetition by design

Decided (updated under the approved `/org` structure): the member-org info is **repeated on two
pages tuned to different audiences** (NOT a lossy merge):

- **`/organizatii-studentesti`** (was `/organizatii-membre`) — optimised for **students (A2)**.
  *Discovery by city.* Generic — includes organisations that are NOT FTB members but can help
  students choose a city (data to confirm with colleagues).
  - "Găsește asociația ta" / "Organizații pe orașe".
   - Priority axis = **city**. Minimal interactivity. Benefit-oriented: one line on "what they do
     for students", contact, social.
   - Prototype question: is organisation discovery itself the task, or does the student need a
     broader city-support page (housing, university services, paperwork, transport, community,
     urgent contacts) in which organisations are one resource type?
   - Data/governance prerequisite for non-FTB entries: source, inclusion criteria, explicit
     FTB/non-FTB affiliation label, last-check date, correction/reporting path and removal owner.
     The current `Membri` sheet does not yet contain non-members or “what we do for students” copy.
- **`/org/structura-organizatie`** — optimised for **members & partners (B1/C)**. *Governance & network.*
  - "Structura organizației" — **fondatori / activi / candidați / potențiali** with legal/contact
    details, PLUS **leadership (echipa)** as part of governance.
  - Laconic & formal — the organisational face, legitimacy for partners/institutions.
  - Cross-linked with `/organizatii-studentesti` ("Vezi structura" ↔ "Vezi pe orașe").

This differs from the earlier AGENTS.md idea of moving internal structure to `/structura-organizatie`
and making a student-facing `/organizatii-membre` — the end result is the same split, but framed as
**repetition by design** (two audience-tuned versions of the same data).

---

## 3. Current sitemap (frontend, as of Aug 2026)

```
/                          Homepage
│
├── /admitere              Admission hub (top-level)
├── /despre-noi            About
├── /echipa                Team
├── /organizatii-membre    Member orgs (currently: fondatori/activi/candidati/potentiali)
├── /proiecte              Project listing
│   └── /proiecte/[slug]        hub
│       └── /proiecte/[slug]/[editie]   edition
│       └── /proiecte/[slug]/arhiva     past
├── /noutati               News (+ /noutati/[slug])   [WP category "actualitati"]
├── /evenimente            Events (+ /evenimente/[slug])
├── /ghiduri               Guides (Ghiduri / Admitere / Resurse generale)
│   └── /ghiduri/[slug]
├── /contact
└── /sitemap.xml
```

---

## 4. Approved sitemap — prototype structure (locked for implementation, subject to validation)

> Brainstormed with the user. SEO/external-link concerns are NOT blockers (many routes are
> already new / never on the root domain). `/org` is a URL namespace AND the audience-C front door.

```
/                                    Homepage — multi-audience funnel
│
├── STUDENT (A)   [friendly]
│   ├── /admitere                   Admission hub (A1)
│   ├── /ghiduri                    Guide index (A2 A3)   [+ /ghiduri/[slug]]
│   ├── /despre-noi                 STUDENT-facing "who we are for you" (warm) (A C D)
│   ├── /organizatii-studentesti    Generic local-org discovery by city, NON FTB-bound (A2)
│                                   (renamed from /organizatii-membre)
│
├── ACTIVITY (showcase + site connector)
│   ├── /proiecte                   All-purpose showcase; ties together projects↔news↔events (B2 C D)
│   │   └── /proiecte/[slug] /[editie] /arhiva
│   ├── /noutati                    News (D B2)   [+ /noutati/[slug]]
│   └── /evenimente                 Events (A D B2)   [+ /evenimente/[slug]]
│
├── ORG / PROFESSIONAL (C + B1) — /org namespace
│   ├── /org                        Hub — terse professional identity "federation at a glance"
│   │                               (what we are, legal status, member count, credibility numbers,
│   │                                governing summary) — does the despre-noi job for C
│   ├── /org/structura-organizatie  Governance + member-org network by status (fondatori/activi/
│   │                               candidați/potențiali) + LEADERSHIP (echipa) as governance.
│   │                               [moves current /organizatii-membre governance content + echipa]
│   ├── /org/transparenta           Legal identity + financials + annual report archive + policies
│   ├── /org/parteneriate           Partnership offering, why partner, past partners/funders
│   └── /org/impact                 REPORT-LIKE results (aggregated outcomes, metrics, methodology)
│                                   — visibly labelled demo samples for now (real data TBD)
│
└── /contact                        All audiences
```

### Working structural decisions
1. `/org` namespace = audience-C front door; its hub carries the terse "federation at a glance"
   (replaces a `/despre-noi` for C). `/despre-noi` stays warm + student-facing, OUTSIDE `/org`.
2. `/echipa` merged into `/org/structura-organizatie` (leadership = governance). No separate route.
3. `/organizatii-membre` → `/organizatii-studentesti` (generic, not FTB-bound, student city discovery).
   The fondatori/activi/candidați/potențiali governance structure moves to `/org/structura-organizatie`.
4. `/org/impact` ≠ `/proiecte`: impact = report-like (aggregated results/outcomes/methodology, period-framed);
   proiecte = showcase/connector. `/org/impact` ≠ `/org/transparenta` annual-report docs (results narrative
   vs. formal document). Prototype as a distinct section first; keep the separate route only if real
   content and user testing show it has a distinct task.
5. `/org/impact` content = visibly labelled demo samples (show what real data looks like, to validate
   with colleagues). Never expose fictional metrics as normal public content.
6. `/org/transparenta` includes legal identity, financials, annual report archive, policies.
7. `/org/parteneriate` is meaningful overshoot only when it tests at least one concrete offer and
   partner journey. It may begin as a section of `/org`; split it into a route when content volume
   and testing justify it.
8. NO separate contact-for-institutions page; `/contact` serves all audiences.
9. Header/footer grouping is designed and tested alongside this structure in Pass 1c; it is not
   assumed to follow either the sitemap or homepage cards exactly.

### Cross-links (web-of-knowledge; repetition across pages, not within)
- `/despre-noi` ↔ `/org` (warm vs. terse identity)
- `/org/structura-organizatie` ↔ `/organizatii-studentesti` (governance vs. city discovery)
- `/org/impact` ↔ `/proiecte` (report vs. showcase) and ↔ `/org/transparenta` (results vs. annual report)
- `/org/parteneriate` ↔ `/org/transparenta#funders` (prospective vs. current) and `/contact`
- `/org` hub ↔ everything (audience-C routing center)
- Footer: add `/org/transparenta` + legal/registration markers (global credibility signal per funder research)

---

## 4.5 B-audience (members / volunteers) — approved

> Brainstormed with the user. B is *information-heavy, not flashy* — the goal is a public
> **"read the manual" knowledge base** + **official record**, so anyone (BC member, coordinator,
> volunteer, member-org leader, candidate) can look up rules/procedures instead of asking.
> NOT an operations/planning tool (they use Google services for that). The site is a public,
> readily-accessible reference — the "read the man pages" idea.

### Why this matters (volatility)
Student orgs churn leadership every 2–4 years (3yr bachelor, +1yr for popular masters). The site
acts as **institutional memory + onboarding**: candidates consult the archive to "know what to
expect", and new BC members get a first-100-days guide instead of re-learning everything.

### Content-source decision (locked)
- Existing `/ghiduri` guides stay **WP-hosted** (already there; unchanged).
- **NEW `/org/manual` pages are authorable as local Markdown via `mdsvex`** — cheaper to author
  since they don't exist in WP yet; can migrate to WP later, or change the editing/admin model
  (user has ideas to explore). `/org/manual/[slug]` = ONE route loading `.md` files via
  `import.meta.glob` (frontmatter: title, category, `ultimaActualizare`, roles; optional explicit
  verification record later) — no per-page
  routes; trivially add/remove; easy to condense later.
- Reuse the `/ghiduri/[slug]` article envelope (breadcrumbs, metadata, TOC, `.prose`, related) —
  extract as a shared `Article.svelte`.
- ⚠ Implementation caveat: this project forces **runes mode** in `svelte.config`; verify mdsvex
  compatibility under that + Deno. Fallback if mdsvex misbehaves: a `data/manual.ts` module
  mirroring `resurse.ts` (same routes, no new dependency).

### Where B lives (inside `/org`, no new top-level pages)
```
/org
├── /org/structura-organizatie        governance + leadership + member network +
│                                     mandate-cycle / electoral-calendar note (B1/C)
├── /org/transparenta                 OFFICIAL RECORD (C + B1 + institutional memory)
│       └── /org/transparenta/procese-verbale   PV / BC-report / decisions ARCHIVE —
│                                     chronological, filterable, Drive links;
│                                     helps candidates "know what to expect"
├── /org/manual                       "READ THE MANUAL" — member/volunteer knowledge base (mdsvex)
│       └── /org/manual/[slug]        (one route, markdown files)
├── /org/parteneriate                 (C)
└── /org/impact                       report-like results (C, visibly labelled demo samples)
```

### `/org/manual` subpages (full scope)
- `nou-in-bc` — first-100-days onboarding for incoming BC
- `functii-roluri` — BC roles, duties, time commitment → links to PV archive
- `regulamente` — membership-admission rule, ROOF, code of conduct (links → transparenta docs)
- `organizare-evenimente` — event checklist + timeline
- `secretariat` — migrated from `/ghiduri`
- `proiecte-finantare` — migrated from `/ghiduri`
- `comunicare-imagine` — brand kit, post templates, PR
- `voluntari` — recruitment + onboarding + management
- `sabloane` — templates "de la colegi" (event proposal, PV template, volunteer agreement, budget, letterhead) → Drive
- `faq` — members/volunteers FAQ
- `formare-traineri` — training guides + trainers pool (legacy refs)
- **handover / role-report STUB** (reserved): end-of-term + role handover reports indexed from
  Drive; public-vs-gated decision deferred to colleagues. Cheap to remove.

Each manual page: **“Actualizat: [date] + responsible role”** initially; use “ultima verificare” only
with the explicit review record below.

### Manual prototype scope + retrieval

- The list above is the target content inventory, not the first release requirement.
- Prototype 3 high-frequency/high-consequence topics first (recommended: `nou-in-bc`,
  `organizare-evenimente`, `sabloane`) after checking actual recurring questions with members.
- Test retrieval by role, task and lifecycle stage. Add category/role indexes immediately; add search
  when the content volume or failed lookup tests justify it.
- A page becomes authoritative only when its source, responsible role and review rule are assigned.
- “Ultima verificare” follows the same evidence rule as student guides; until then use “Actualizat”.

### Split (legal/administrative vs operational)
- **`/org/transparenta`** = official record: legal/constitutive docs (statute, ROOF, membership
  regulation, policies), financials, annual reports, **PV/decisions archive** (subpath).
- **`/org/manual`** = operational knowledge base: procedures, roles, onboarding, templates, FAQ,
  training. The manual **links to** transparenta docs rather than duplicating them.

### Guide migrations from student `/ghiduri` (with redirects)
- Move to `/org/manual`: `ghid-secretariat-organizational`, `oportunitati-de-finantare`,
  `ghid-de-scriere-a-proiectelor`.
- **Keep** in student `/ghiduri`: `ghid-de-implicare-civica-pentru-tineri` (general-youth).

### Principles carried over
- Repetition allowed across pages, not within a single page.
- Each page may ship on the protected/noindexed demo with visibly labelled `Placeholder` samples for
  still-missing content (so colleagues see what's required); approved real data (e.g. PVs, documents)
  may be linked after classification and permission checks.
- Institutional-memory value: every rule/procedure likely to go stale under a new mandate shows its
  last-update date + responsible role, and a verification date only where a review record exists.

---

## 4.6 D-audience (public / media / diaspora) — test tasks before adding structure

> Working hypothesis: **no structural changes are needed for audience D.** `noutati`, `evenimente`,
> homepage funnel and `contact` remain D's entry points. Start with perspective/tone polish and fold
> media contact into `/contact`; add structure only if representative tasks fail.

### The one nuance to watch
- `/despre-noi` becomes **student-facing** under the plan, yet it is D's natural "who is FTB?" page
  and a commonly-shared URL. Keep a **society/diaspora-facing identity framing** alongside the
  student warmth — "what the org is/does for the diaspora & Romania" — so journalists and diaspora
   still get the org's societal role. This is **tone/copy, not a structural change**.
- Validate at least one media and one diaspora task before concluding that tone alone is sufficient:
  e.g. find verified organisational facts/spokesperson contact; find a public event or way to connect.
  A press route is still unnecessary unless those tasks cannot be served elsewhere.

### Perspective/tone shifts to apply (cheap, positive-image)
1. `/despre-noi` — dual framing: warm-for-students **+** society/diaspora identity.
2. News/event intros (`/noutati`, `/evenimente`) — lean into "what we build for the diaspora &
   Romania", culture / national-day moments (e.g. `ziua-nationala`), and community openness
   (reassure D that events are open to the public/diaspora where true).
3. Small SEO/PR phrasing on D-landing pages (e.g. "comunitatea tinerilor basarabeni din România",
   "vocea diasporei") tuned for public/media searches.
4. Footer transparency/legal markers already help D (trust for public/media too).

---

## 4.7 A-audience (students) — knowledge web, journeys & trust

The primary audience is structurally well-served by the approved IA (admitere funnel, ghiduri
categories, `/organizatii-studentesti`, proiecte/noutati/evenimente). The real gaps are
**connections, journeys, and trust** — not routes. Scaffolding already exists in the guide article
template (TOC, breadcrumb, reading time, "Actualizat" date, in-category related links) and is
**extended into a deliberate, reusable pattern**, not built greenfield.

### 4.7.1 New route `/student-in-romania` — the settled-student hub
- Fills the missing **"ongoing student"** mid-journey branch. `/admitere` stays **admission-only**
  (calendars, admission-specific events); the student who has arrived/enrolled gets a dedicated hub.
- **Name is intentional:** must read as *student life* (not travel/places) for a student already
  settled in Romania.
- **Content: composite hub **curating existing surfaces — practical guides (ședere, transport, limba
  română, vizitează România, minus admission-only items), community by city →
  `/organizatii-studentesti`, involvement → `/proiecte` + `/evenimente`, news → `/noutati`.
  **No new substantive content model initially** — assemble existing sources + `connections.ts`,
  then add data only where testing exposes a real gap (for example actionable opportunities).
- `/admitere` gets a pointer ("Ești deja student? Începe aici") → `/student-in-romania`.
- Sitemap entry + (deferred T1) nav slot.
- Include one explicit **involvement path**, not only a project showcase: current opportunity/open
  status, eligibility, city/remote, expected commitment, deadline and next action. If the underlying
  data is unavailable, test the shape with visibly labelled demo opportunities rather than implying
  that every project accepts participants.
- Treat city organisations as one candidate answer to “help in my city”; test whether the hub should
  lead to the broader city-support concept described in §2.

### 4.7.2 `CrossLinks` connector pattern — the "web of knowledge" backbone
- **`src/lib/data/connections.ts`** — edge map `Record<sourceSlug, { nextStep?, relatedProjects?,
  external?, relatedEvents? }>`. Seed minimal & high-value; grow iteratively as flows develop.
  Migrate to WP GraphQL when taxonomies/relations are final (**keep the interface stable**) to ease
  content addition.
- **`CrossLinks.svelte`** — renders typed blocks: `nextStep` (journey chain), `relatedGuides`
  (existing in-category block), `relatedProject`, `relatedEvents`, `external`.
- **`external`** = official authority (embassy, MAE, transport operator). **Retention is NOT the goal;
  correctness is** — bouncing to the official source is fine and encouraged for high-stakes items.
  Cite the relevant authority near the claim/section it supports, not only as a generic page-level link.

### 4.7.3 Freshness + volatility (`FreshnessStamp.svelte`)
- Timestamp source for publication/editing = **WP `modified`** (extend `Page` query + `WPPage` type).
  It is not a verification source.
- Label is a **function of a volatility tier** (`volatility` on each `ResurseItem`):
  - **`timeless`** (news, blogposts, reports, culture) → "Publicat la X · Actualizat la Y".
    No verification claim, no warning.
  - **`volatile`** (advice worth re-checking, lower risk) → "Actualizat la [date]" until a separate
    review record exists; then "Verificat la [review date]".
  - **`critical`** (high-cost advice where being wrong has real consequences: **legal** — visa,
    ședere, admitere, deadlines — **and routes of transport**, since a stale promise of a route can
    disrupt a reader's real plans) → "Actualizat la [date]" + **amber warning banner** + link to the
    official source. Upgrade to "Verificat" only from an explicit review record.
- **Verification record requirement:** reviewer/responsible role, review date, authoritative source(s)
  and review/expiry rule. A re-save in WP is insufficient. If a review expires, show a stale warning
  or remove the verification claim.
- Add “Semnalează informații învechite” for critical guides and directory entries, with a responsible
  role and response expectation.

### 4.7.4 Data-files principle
- `connections.ts` + `volatility` (in `resurse.ts`) hold **only structural/editorial metadata**
  (edges, volatility tiers) — not substantive content. WP stays the single content source.
  These files are a **starting point, subject to change** as we develop.

---

## 5. Passes (multiple, iterate as needs arise)

Passes below use the canonical `/org` structure from §4. Historical top-level proposals are no
longer implementation instructions.

### Pass 0 — Foundation: the `Placeholder` system (build FIRST)
Unlocks everything; lets every page self-document required content.

> **Status: DONE** (implemented + `deno task check` = 0 errors from these files).

- **`src/lib/stores/devToggles.svelte.ts`** — Svelte 5 runes module store holding all dev toggles.
  Each persisted to its own `localStorage` key, **off by default**:
  - `ftb:placeholders`  → `isPlaceholdersEnabled/set/togglePlaceholders`
  - `ftb:sectionLabels` → `isSectionLabelsEnabled/set/toggleSectionLabels`
  (Consolidates the placholder toggle AND the homepage section-labels toggle here.)
- **`src/lib/components/Placeholder.svelte`**
  - Props: `label`, `id?`, `tone` (`info|warning|content`), `children` (Snippet = sample content).
  - **Off** (default): renders only `children` (sample content) — page looks clean/real.
  - **On**: wraps children in a dashed highlighted box + "Conținut preconizat" chip + `label`,
    marked `data-placeholder` for counting/jumping. Highlight uses border + chip (not colour alone) → WCAG.
  - **Safety constraint:** Off may reveal only approved facts or generic copy. Institutional samples
    remain visibly labelled/gated as required by §0.1; the component toggle is not a publication approval.
- **`src/lib/components/DevMenu.svelte`** — single global floating dev menu (bottom-right),
  rendered in the root layout. A small gear launcher that expands to a panel containing all dev
  toggles as switch rows. Currently hosts:
  - **Conținut lipsă** (placeholders) — with count badge + "jump to next block" (`[data-placeholder]` scan).
  - **Etichete secțiuni** (homepage design comments).
  Keyboard accessible (Esc closes, `menuitemcheckbox` semantics). Extensible for future toggles.
- **`src/routes/+layout.svelte`** — renders `<DevMenu />` after `<Footer />`.
- **Homepage (`/`)** — the previous standalone floating `labels` button was removed; the
  `sectionLabel` snippet now reads `isSectionLabelsEnabled()` from the shared store (so the
  DevMenu controls it).
- **Removed** `PlaceholderToggle.svelte` and the old `placeholders` store (replaced by DevMenu + devToggles).
- **Usage:** wrap unfinished content with `<Placeholder label="..."> <sample/> </Placeholder>`.

### Pass 1 — IA restructure (routes + nav + sitemap)
- **1a. Prototype brief + content readiness:** for every §4 route, record audience task, minimum
  content, source, approver, maintainer, review cadence and whether it is demo-only. Reconcile
  canonical member/impact figures before using them as credibility claims.
- **1b. Routes/content split:**
  - `/organizatii-membre` → `/organizatii-studentesti`: city-first student discovery. Use current
    FTB data initially; any non-FTB/sample entry needs the affiliation and governance rules in §2.
  - Move current membership-status content and `/echipa` leadership into
    `/org/structura-organizatie`.
  - Add `/org` as the professional hub. Prototype impact and partnership as hub sections first;
    retain `/org/impact` and `/org/parteneriate` as separate routes only when their content/task
    justifies it.
  - Add `/org/transparenta` structure, but use honest unpublished/sample states until classified,
    approved documents exist. Do not populate the PV archive before the §0.1 publication rules.
  - Add `/org/manual` with the small prototype scope from §4.5; the full inventory comes later.
- **1c. Nav/footer prototype:** design header, mobile menu, footer and contextual escape hatches
  together. Keep the org-centric persistent nav as the working hypothesis, but test direct-entry
  recovery and labels. Include explicit `/admitere`, `/student-in-romania`, `/org`, transparency and
  student-organisation paths without overcrowding one menu. Remove standalone `/echipa` navigation.
- **1d. Sitemap + redirect map (own early sub-pass):**
  - Add `/admitere` (currently missing), `/student-in-romania` and public `/org/*` routes; remove
    deleted routes once redirects exist. Demo-only/noindex routes must not enter the sitemap.
  - Redirect `/echipa`→`/org/structura-organizatie` and `/organizatii-membre`→the destination that
    best preserves its current governance intent (normally `/org/structura-organizatie`, not the new
    student directory).
  - Map legacy WP slugs (`pagini.txt`): `admitere-in-romania`→`/admitere`,
    `actualitati`→`/noutati`, `resurse`→`/ghiduri`, `transparenta`→`/org/transparenta`, and guide
    slugs→their canonical guide/manual destinations.
  - For guides moving to `/org/manual`, preserve the old `/ghiduri/[slug]` URL until its replacement
    and redirect are both ready; do not remove its resource metadata first.
  - Inventory hardcoded links in homepage, header, footer, sitemap and admission pages; monitor 404s
    and redirect use after release.
- **1e. Homepage/contact alignment:** update audience cards for prospective student, settled student,
  involvement, member organisation and partner tasks. Keep one `/contact`, with intent-based triage.
- **1f. Legal baseline:** reconcile the footer’s existing privacy/cookie/disclaimer links with real
  destinations before adding transparency/legal trust markers.

### Pass 2 — UI/UX consistency (adapt all pages to the homepage system)
- **2a.** Unify page intro patterns (3 → 2 models):
  - Type H (brand hero): homepage, `/admitere`, `/despre-noi`.
  - Type P (title + divider + optional lede) for all inner pages — standardize spacing/typography
    (`/ghiduri` currently `mb-12`, others `mb-10` → unify).
- **2b.** Fix `/despre-noi` brand violations: replace hardcoded hex
  (`#2f7dc8 #253680 #1a2660 #f0c93a`) with semantic tokens (`oxford-dark`, `blue`, `sunglow`);
  replace Unsplash stock photos with Placeholder + real imagery + proper alt.
- **2c.** Header logo: use the real logo asset (as footer does) instead of text-only "FTB România".
- **2d.** Unify arrow/CTA affordance: single FA `fa-arrow-right`; remove raw `→` char (proiecte)
  and mixed inline SVGs.
- **2e.** Shared long-form article template (`Article`) reused by `/ghiduri/[slug]` and
  `/noutati/[slug]` (breadcrumbs + metadata + TOC + reading time + related/sidebars).
  `/evenimente/[slug]` keeps its specialized hero/date/event-details layout — its structure does not
  map to Article's title/lede/TOC — but shares the `Breadcrumbs` component and CTA arrow conventions.
  Reading time applies to long-form guides and news articles.
- **2f.** Breadcrumbs on all deep content (news, event, project hub/edition).
- **2g.** Consistent labels: one name per destination across header/footer/content —
  use the new audience-specific names (`Organizații studențești`, `Structura organizației`) rather
  than the ambiguous old `Organizații Membre` label.
- **2h.** Accessibility validation across representative journeys: keyboard and screen-reader
  orientation, heading/focus order, 200% zoom/reflow, warning announcements, plain-language critical
  guidance, and accessible/stable alternatives for published PDFs or Drive documents.

### Pass 7 — Knowledge-web & trust foundations
- **7a.** `resurse.ts`: add `volatility: 'timeless' | 'volatile' | 'critical'` per item (seed:
  visa/ședere/admitere/**transport** = `critical`; news/culture/reports = `timeless`; tips/storage = `volatile`).
- **7b.** WP `Page` query + `WPPage` type: fetch `modified` (`ghiduri/[slug]/+page.server.ts`).
- **7c.** `src/lib/components/FreshnessStamp.svelte` — `modified` drives “Actualizat”; `critical`
  adds an amber warning, official source and correction path. Support “Verificat” only when the
  separate review record from §4.7.3 exists.
- **7d.** `src/lib/data/connections.ts` + `src/lib/components/CrossLinks.svelte` — typed blocks;
  seed only 2–3 representative journeys and wire them into `ghiduri/[slug]/+page.svelte` (reuse
  existing `relatedItems`). Expand only after journey testing shows useful patterns.
- `deno task check` + `deno task build` green.

### Pass 8 — `/student-in-romania` (settled-student hub) + journey chaining
- **8a.** Create `src/routes/student-in-romania/` composite hub (guides / city orgs / projects /
  events / news via connections + existing data sources). Add no substantive content model unless
  testing identifies a gap; multi-source page assembly is still required.
- **8b.** `/admitere`: keep admission-only; add "Ești deja student?" pointer → `/student-in-romania`.
- **8c.** Chain admitere steps 1→4 in the UI ("Pasul următor →").
- **8d.** `nextStep` on visa/ședere guides → `/student-in-romania`.
- **8e.** Prototype one actionable involvement opportunity/path, not only links to project showcase.
- **8f.** Sitemap and tested nav/homepage entry.

### Pass 9 — Journey QA
- Run the §0.2 representative tasks from homepage and direct landings on mobile and desktop.
- Record completion, wrong path/backtracking, time/confidence, interpretation of trust labels and
  official exits; adjust labels, route boundaries and `connections.ts` edges from evidence.
- Include keyboard, screen-reader smoke testing and checks for sample-content leakage, restricted
  documents, broken official links and expired review claims.

### Later passes
- Driven by needs as they arise; IA will iterate.
- Edges (`connections.ts`) → WP GraphQL once taxonomies/relations are final (keep `CrossLinks`
  interface stable; ease content addition).
- Expand the manual inventory and add search based on support-question frequency and failed lookups.
- Split `/org/impact` and `/org/parteneriate` from `/org` when real content and tested tasks justify it.
- Analytics after a privacy decision: minimally measure audience entry choices, next-step/official
  exits, city discovery, failed searches/dead ends and contact intent; avoid collecting more than
  needed for the prototype.

### Open — discuss next session
- **Conditionally compiling a route out of production** (for placeholder/experiment pages shown to
  colleagues but not shipped to prod). **Preferred: Option A**:
  - **Option A (PREFERRED). Loader flag** — `if (!SHOW) error(404)`; route file stays in bundle
    (minor); flag off on prod → 404. Simplest. Not urgent — defer implementation (not a concern now).
  - **Option B. Prebuild script** — remove the route dir (`src/routes/...`) before `vite build` when a
    flag/env is unset; route **truly absent** from production (not even compiled). Most literal.
  - Decide based on **how the demo site is deployed** (production build on subdomain vs. dev/preview
    process) — `$app/environment` `dev` is `false` for any production build, so do NOT gate on `dev`
    if the colleague-facing demo is a production build (Placeholder toggle logic already reflects
    this).
  - Middle path: where appropriate, serve placeholder content via the existing `Placeholder` system
    (toggle on demo) rather than gating a whole route.
- Decide how the colleague-facing demo is protected/noindexed and how institutional sample content
  remains visibly non-factual when the Placeholder UI is off.
- Confirm the first 3 manual topics from real recurring member questions and assign responsible roles.
- Confirm directory scope: organisation discovery only versus broader city-support discovery; agree
  the source/governance for non-FTB organisations and student-benefit copy.
- Classify transparency/PV/handover material before selecting representative documents.
- Define the smallest explicit verification record/editorial workflow before enabling “Verificat”.
- Finalize and test header/footer nav groupings as part of Pass 1c, not after all route work.

---

## 6. Decisions (resolved)

1. **Placeholder OFF by default** — the toggle is OFF by default for ordinary UI work. Only approved
   facts/generic copy may render cleanly in that state; sensitive institutional samples stay marked
   or gated independently of this toggle.
2. **PlaceholderToggle stays on the demo site** — not gated behind a dev flag. During development
   the site is hosted on a `demo` subdomain, so members can view it by URL without compiling,
   and toggle the placeholders themselves. Public production exposure is not implied.
3. **Legacy redirect map** — do it as soon as possible (own small pass).
4. **Transparency docs** — DO NOT have the documents yet. **Priority = UI/UX first**, fill in
   actual content later. `/org/transparenta` is built as structure + visibly labelled/gated samples;
   no representative record is public before classification and approval.
5. **B-audience** — no new top-level pages; folded into `/org`. Official record (legal, financials,
   reports, policies, **PV/decisions archive**) → `/org/transparenta`; operational manual → `/org/manual`.
6. **`/org/manual` content source = mdsvex (local Markdown)** — new pages don't exist in WP yet,
   cheaper to author locally; can migrate to WP later or change editing model. One `[slug]` route
   via `import.meta.glob`. Reuse shared `Article.svelte`.
7. **PV / decisions archive → `/org/transparenta/procese-verbale`** (subpath of transparenta).
8. **Manual pages show “Actualizat + responsible role” first.** Use “ultima verificare” only when
   an explicit reviewer/source/date/expiry record exists.
9. **Handover / role-report archive is a stub for now** — classify public/redacted/restricted before
   exposing documents to colleagues or the public.
10. **A-audience knowledge web** — `/student-in-romania` (settled-student hub), `connections.ts` +
    `CrossLinks` connectors, `FreshnessStamp` volatility tiers, WP `modified` timestamps, admitere
    step chaining. See §4.7 + Passes 7–9. Metadata files (`connections.ts`, `volatility`) are a
    starting point, subject to change.

---

## 7. Reference — known UI/UX debt (from analysis)
- 3 distinct page-intro patterns.
- `/despre-noi` hex literals + Unsplash stock.
- Text-only header logo vs real logo in footer.
- Arrow implemented 3 ways (FA icon, inline SVG, raw `→`).
- Long-form pages diverge (guide has TOC/metadata/breadcrumb; news has sidebars; event has its own).
- Breadcrumbs only on `/ghiduri/[slug]`.
- Same destination, 3 labels (header/footer/homepage).
- `/admitere` missing from sitemap.

---

## 8. How the homepage audience cards map (current copy → intent)

Current copy is superseded by the following prototype intents; exact grouping/labels are tested in Pass 1c/9:

- “Vreau să studiez în România” → `/admitere` (A1)
- “Sunt deja student în România” → `/student-in-romania` (A2/A3)
- “Caut ajutor/comunitate în orașul meu” → `/organizatii-studentesti` initially; test broader city support (A2)
- “Vreau să mă implic” → an actionable opportunity path, with `/proiecte` as supporting proof (A3/B2)
- “Reprezint o organizație membră” → `/org/manual` or `/org/structura-organizatie` by task (B)
- “Partener / instituție / finanțator” → `/org`, then a triaged partnership contact path (C)
