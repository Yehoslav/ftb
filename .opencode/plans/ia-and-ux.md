# FTB România — IA & UX Plan

> Working document. AI-supported analysis of the current site against the twin goals
> (host guides/useful info for students + showcase the organisation's activity), and the
> agreed restructure. We will still iterate on it — captured here so context isn't lost.

Status: **DRAFT / open** — several decisions flagged as `[OPEN]` below.

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
   - the **face of the org for investors / partners / institutions**.
4. **The navbar vs. homepage "mismatch" is intentional, not a bug:**
   - Homepage onboarding = for the student (and provisional audiences).
   - Persistent navbar (org-centric groups) = for member orgs / partners.
   Two surfaces, two mental models, different audiences. **Do not "fix" this.**
5. **`/admitere` vs `/ghiduri#admitere` is intentional:** `/admitere` is a high-level **hub**
   (big picture), `/ghiduri` contains **problem-tuned** detail guides. A hub/detail split
   mirroring the project hub/edition system.
6. **Placeholders everywhere:** every page ships with a visible spec of the content it should
   hold, so colleagues know what info is required by seeing how it will be displayed.

---

## 1. Audience model

**A · The Student** (primary / intended audience)
- A1 **Prospective** — high-schooler in Moldova, pre-arrival. "How do I get in?" (admitere, visa, papers)
- A2 **Enrolled** — student now in Romania. "Papers, language, transport, my city" (guides, city orgs)
- A3 **Engaged** — wants opportunity / civic work. "Funding, projects, volunteering" (guides, projects)

**B · The Member / Organisation** (secondary, internal)
- B1 **Org leaders** — governance, network, docs, funding (structura, transparenta)
- B2 **Volunteers / coordinators** — what's running, who's who, where to help (projects, echipa, events)

**C · The Partner / Funder / Investor / Institution** (the "face of the org")
- Legitimacy, track record, impact, leadership, collaboration, transparency.

**D · Public / Media / Diaspora community**
- What the org is, latest news, national days, events.

### Audience → primary surface mapping

| Audience | Primary surface | Secondary |
|---|---|---|
| A1–A3 | Homepage onboarding → `/ghiduri`, `/admitere`, city orgs, events | projects |
| B1–B2 | Header nav (Organizație / Activități) → `/structura-organizatie`, `/organizatii-membre`, `/proiecte`, `/echipa` | transparenta |
| C | `/despre-noi`, `/proiecte` (proof), **`/transparenta`** | echipa, partners |
| D | `/noutati`, `/evenimente` | contact, socials |

---

## 2. Audience-specific sections — repetition by design

Decided: the info about member organisations is **repeated on two pages** (NOT a lossy merge):

- **`/organizatii-membre`** — optimised for **students (A2)**. *Discovery by city.*
  - "Găsește asociația ta" / "Organizații pe orașe".
  - Priority axis = **city**. Minimimal interactivity (we shouldn't confuse a visitor with
    unneeded interactivity). Benefit-oriented: one line on "what they do for students", contact, social.
- **`/structura-organizatie`** — optimised for **members & partners (B1/C)**. *Governance & network.*
  - "Structura organizației" — **fondatori / activi / candidați / potențiali** with legal/contact details.
  - More laconic & formal — the organisational face, legitimacy for partners.
  - Content currently on `/organizatii-membre` moves here verbatim.
- Both pages cross-link: "Vezi structura" ↔ "Vezi pe orașe".

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

## 4. Proposed sitemap (with audience tags)

```
/  Homepage                       [multi-audience funnel]
│
├── GHIDURI / STUDENT             [A1 A2 A3]
│   ├── /admitere                 Admission HUB — big picture, seasonal   [A1]
│   ├── /ghiduri                  detail guide index (problem-tuned)      [A2 A3]
│   └── /ghiduri/[slug]                                                [A1 A2 A3]
│
├── ACTIVITY (showcase)           [B2 C D]
│   ├── /proiecte (+ hub/edition/arhiva)
│   ├── /noutati                                                         [D B2]
│   └── /evenimente                                                      [A D B2]
│
├── ORGANIZATIA (identity+network) [B1 C D]
│   ├── /despre-noi                                                      [C D]
│   ├── /echipa                                                          [C B2]
│   ├── /organizatii-membre   city discovery    [A2]   ← re-tuned, not governance
│   ├── /structura-organizatie governance       [B1 C] ← NEW, move current content here
│   └── /transparenta          docs/partners    [B1 C] ← NEW
│
├── /contact                                    [A B C D]
└── /sitemap.xml
```

---

## 5. Passes (multiple, iterate as needs arise)

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
- **1a.** Split `/organizatii-membre` → city view (A2) + `/structura-organizatie` (B1/C).
  Move current governance content to the new route; re-tune the city view.
- **1b.** New `/transparenta` (B1/C): statute, annual reports, financials, partners & funders
  (un-hide `showPartners` when real logos exist), leadership link, collaboration CTA.
  Each section a `Placeholder` where content/licence isn't ready.
  `[OPEN: do real document URLs exist now, or should every section be a Placeholder sample? (our NGO likely has docs, just not published)]`
- **1c.** Nav (header):
  - `Organizație` dropdown: add `Transparența`, `Structura organizației`; keep `Despre Noi`, `Echipă`, `Organizații Membre` (now city view).
  - `Resurse` dropdown: add explicit `Admitere` link (currently missing from nav — stub only at `/admitere`).
  - Keep `/admitere` **top-level**.
  - Keep nav org-centric (do NOT align it to homepage onboarding).
- **1d.** Sitemap + redirect map:
  - Add `/admitere` to sitemap static pages (currently MISSING — bug).
  - Add `/structura-organizatie`, `/transparenta`.
  - Redirect map from legacy WP top-level slugs (`pagini.txt`) → new routes:
    `admitere-in-romania`→`/admitere`, `actualitati`→`/noutati`, `resurse`→`/ghiduri`,
    guide slugs→`/ghiduri/[slug]`, `transparenta`→`/transparenta`, `romanian-courses-*`→`/ghiduri/romanian-courses`.
  `[OPEN: include redirect map in this plan, or defer as a separate low-risk pass?]`
- **1e.** Align homepage "De unde pornești?" card copy to the new split (city orgs vs structure).

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
- **2e.** Shared long-form article template reused by `/ghiduri/[slug]`, `/noutati/[slug]`,
  `/evenimente/[slug]` (breadcrumbs + metadata + TOC + reading time + related/sidebars).
- **2f.** Breadcrumbs on all deep content (news, event, project hub/edition).
- **2g.** Consistent labels: one name per destination across header/footer/content —
  "Organizații Membre" (not footer "Membre", not homepage "Toate organizațiile").

### Later passes
- Driven by needs as they arise; IA will iterate.

---

## 6. Decisions (resolved)

1. **Placeholder OFF by default** — the toggle is OFF by default (so pages look clean/normal
   during UI work without needing to explain the boxes). Editors/members toggle it ON to inspect
   pending content.
2. **PlaceholderToggle stays on the live site** — not gated behind a dev flag. During development
   the site is hosted on a `demo` subdomain, so members can view it by URL without compiling,
   and toggle the placeholders themselves.
3. **Legacy redirect map** — do it as soon as possible (own small pass).
4. **Transparency docs** — DO NOT have the documents yet. **Priority = UI/UX first**, fill in
   actual content later. `/transparenta` is built as structure + Placeholder samples now.

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
- "Elev / student" → `/admitere` (A1)
- "Organizație studențească" → `/organizatii-membre` (org net; may need re-tune for A2/B1)
- "Vreau să mă implic" → `/proiecte` (A3/B2)
- "Partener / donator" → `/contact` (C)
