# FTB România — Headless WordPress Frontend

## Project identity

**FTB România** (Federația Tinerilor Basarabeni) is a non-profit NGO website — a headless WordPress frontend built with SvelteKit. WordPress serves as the CMS backend via GraphQL; this app renders the public site.

Production: https://ftbromania.ro
Staging (headless WP backend): https://ftbromania.ro/incubator

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Svelte 5 (runes mode) + SvelteKit 2 |
| Language | TypeScript (strict) |
| CSS | Tailwind CSS v4 (`@theme` directives, `@tailwindcss/vite` plugin) |
| Icons | Font Awesome 7.2 (brands, solid, regular) — minimal CSS in `/static/fa/css/fa-bare.min.css` with only the 15 icons used on the site; full webfonts in `/static/fa/webfonts/` |
| Font | Rubik (self-hosted woff2 in `/static/fonts/`, `@font-face` in `layout.css`) |
| Runtime | Deno (Node compat via `deno.json`) |
| Build | Vite 7 |
| Adapter | `@deno/svelte-adapter` |
| Backend | WordPress (GraphQL at `WP_GRAPHQL_ENDPOINT` env var) |
| Data layer | Grist API for homepage stats + association data |
| Form tool | OpnForm (embedded iframe on /contact) |

## Commands

- `deno task dev` — start dev server
- `deno task build` — production build
- `deno task check` — run `svelte-check` for type-checking (uses `tsconfig.json` — do not change)
- `deno task preview` — preview production build

## Project structure

```
src/
├── lib/
│   ├── components/       # Reusable UI components
│   │   ├── Counter.svelte
│   │   ├── Footer.svelte
│   │   ├── Header.svelte
│   │   └── Seo.svelte
│   ├── data/             # Hardcoded data files (to migrate to WP/Grist)
│   │   ├── echipa.ts
│   │   ├── membre.ts
│   │   └── proiecte.ts
│   ├── server/
│   │   ├── grist.ts      # Grist API client
│   │   └── wp.ts          # WordPress GraphQL client (with cache)
│   └── types/
│       ├── seo.ts
│       └── wp.ts
├── routes/
│   ├── +layout.svelte     # Root layout (Header, Footer, SEO)
│   ├── layout.css          # Global styles + Tailwind theme
│   ├── +page.svelte        # Homepage
│   ├── contact/
│   ├── despre-noi/
│   ├── echipa/
│   ├── membre/             → now at /organizatii-membre
│   ├── noutati/            # News listing + [slug] article view
│   ├── evenimente/         # Events listing + [slug] detail
│   ├── proiecte/
│   ├── api/                # API routes (grist proxy, cache revalidate)
│   └── sitemap.xml/
└── app.html                # Root HTML template
```

## Brand colors (from `src/routes/layout.css` — do not change)

```css
--color-cerry:      oklch(0.5048 0.1938 27.86);  /* #BA1818 */
--color-red:        oklch(0.6048 0.215 28.87);   /* #E63429 */
--color-oxford:     oklch(0.3848 0.141 273.69);  /* #2F378D */
--color-blue:       oklch(0.5349 0.1375 247.85); /* #1071B8 */
--color-sunglow:    oklch(0.8764 0.1657 91.03);  /* #FFD136 */
--color-orange:     oklch(0.7459 0.1616 62.51);  /* #F39222 */
--color-cerry-light:  oklch(0.65 0.18 27.86);
--color-cerry-dark:   oklch(0.40 0.18 27.86);
--color-oxford-light: oklch(0.50 0.10 273.69);
--color-bg:            oklch(0.97 0.01 90);
--color-bg-alt:        oklch(0.94 0.01 90);
--color-text:          oklch(0.15 0.02 273.69);
--color-text-muted:    oklch(0.45 0.02 273.69);
```

Always use these semantic color names (`text-oxford`, `bg-cerry`, `border-bg-alt`, etc.) — never hardcode hex values.

## UI & accessibility standards

### General principles
- All UI must meet **WCAG 2.1 AA** minimum.
- Responsive design: mobile-first, breakpoints at `sm:640` `md:768` `lg:1024` `xl:1280`.
- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<h1>`-`<h6>`, `<ul>`/`<ol>`).
- Every interactive element must be keyboard accessible.

### Accessibility checklist
- All images must have `alt` text (use `alt=""` for decorative images).
- Buttons and links must have discernible text or `aria-label`.
- Color is never the sole indicator of state (e.g., active nav links use background color AND text changes).
- Focus indicators must be visible (use Tailwind's `focus-visible:` ring utilities).
- Form inputs must have associated `<label>` elements.
- Use `aria-current="page"` on current navigation items.
- Ensure sufficient color contrast (4.5:1 for normal text, 3:1 for large text).
- Mobile hamburger menu must have `aria-label` and `aria-expanded` state.

### Svelte 5 runes conventions
- Use `$state()` for reactive local state.
- Use `$derived()` for computed values.
- Use `$effect()` for side effects.
- Use `$props()` for component props with TypeScript interfaces.
- Use `$bindable()` for two-way binding props.
- Use Svelte 5 snippets (`{#snippet}` / `{@render}`) over slots.

### Component conventions
- One component per file, named `PascalCase.svelte`.
- Props defined via TypeScript `interface Props` at the top of `<script>`.
- Destructure props with `$props()` default values inline.
- Scoped styles within `<style>` block; use Tailwind utilities primarily.

### Data flow
- Server load functions in `+page.server.ts` / `+layout.server.ts`.
- Data passed to page components via `data` prop typed with `PageProps`.
- WordPress GraphQL queries in `src/lib/server/wp.ts`.
- Grist API calls in `src/lib/server/grist.ts`.
- Static/hardcoded data in `src/lib/data/`.

## Current status / known TODOs

- [ ] **Team photos** — avatar placeholders use initials; replace with real images when ACF CPT is ready on WP
- [ ] **Despre Noi** — hardcoded text; migrate to WP GraphQL when WP page stops using Elementor
- [ ] **Projects data** — two-tier model (hub + editions) implemented as hardcoded `src/lib/data/proiecte.ts`; migrate to ACF CPT (Phase 6)
- [x] **Project pages** — hub `/proiecte/[slug]`, edition `/proiecte/[slug]/[editieSlug]`, archive `/proiecte/[slug]/arhiva`, filtering on `/proiecte`, subprojects via `proiectParinteSlug` (e.g. Târgul Universităților → AdmiteRO; parent hub aggregates subproject events/posts) (Phases 1–5)
- [ ] **Member orgs data** — hardcoded in `src/lib/data/membre.ts`; migrate to Grist / WP CPT
- [ ] **Team data** — hardcoded in `src/lib/data/echipa.ts`; migrate to ACF CPT
- [ ] **Event calendar** — placeholder on article pages; integrate with WP Events  ✅ **Portat** — vezi `/evenimente/` (listing + `[slug]` detail), sidebar în articole
- [x] **Pagination** — "older articles" + "newer articles" buttons on noutati
- [ ] **Favicon** — currently the default Svelte logo; replace with FTB brand favicon
- [ ] **Contact form** — replace OpnForm iframe with in-house form connected to Gmail API

### 🔴 Security
- [x] **Auth on `/api/revalidate`** — Bearer token via `REVALIDATE_TOKEN` env var
- [x] **`rel="noopener noreferrer"`** — added to Footer + member org external links

### 🟠 Performance
- [x] **Font Awesome JS → webfont CSS** — JS bundles replaced with CSS + woff2 webfonts (~84KB vs ~1.7MB)
- [x] **FA CSS minimal subset** — `fa-bare.min.css` includes only the 15 used icons (2.4KB vs 75KB for full CSS)
- [ ] **FA woff2 subsetting** — `pyftsubset` or `glyphhanger` can trim the 3 webfonts (currently 244KB) to only the codepoints in `fa-bare.min.css`; worth doing when icon set is stable

### 🟡 Accessibility
- [x] **Skip-to-content link** — first focusable element, slides in on Tab
- [x] **Header dropdown keyboard navigation** — Arrow keys, Home/End, Escape, focusout close

### 🟢 UX / Housekeeping
- [x] **Custom `+error.svelte`** — branded error page with 404 detection, nav links back to homepage / noutati
- [x] **Dead resource tags on homepage** — stale `href="#"` replaced with real `/ghiduri#` links
- [x] **Unused `wpEvents` fetch** — removed orphaned GraphQL query + `EventsQueryResult` type

## QA notes

- When creating new features, keep the data strategy in mind:
  1. **WordPress GraphQL** for posts/pages content (with caching)
  2. **Grist API** for numeric stats and association data
  3. **Hardcoded TypeScript** only as temporary fallback
- The WP GraphQL client has an in-memory cache with 1-hour TTL. Clear via `POST /api/revalidate`.
- Never commit API keys or secrets.

## Project System Plan (two-tier: hub + editions)

### Data model

**`ProiectHub`** — umbrella/parent (e.g., "Admiteri")
| Field | Type | Notes |
|---|---|---|
| `slug` | `string` | URL: `/proiecte/admiteri` |
| `titlu` | `string` | |
| `categorie` | `"anuale" \| "singulare"` | |
| `descriere` | `string` | Evergreen text |
| `imagine` | `string` | Hero image URL |
| `culoare` | `string` | Brand color (e.g. `#BA1818`) |
| `domenii` | `string[]` | Thematic tags (educație, cultură, civic) |
| `website` | `string` (optional) | External link |
| `proiectParinteSlug` | `string` (optional) | Parent hub slug for subprojects (e.g. Târgul Universităților → `admiteri`). Events/posts of a parent aggregate its subprojects' content. |

**`ProiectEditie`** — one per year (e.g., "Admitere 2026")
| Field | Type | Notes |
|---|---|---|
| `slug` | `string` | URL: `/proiecte/admiteri/admitere-2026` |
| `titlu` | `string` | "Admitere 2026" |
| `an` | `number` | 2026 |
| `proiectSlug` | `string` | Reference to parent hub |
| `perioada` | `string` | "Mai — Octombrie 2026" |
| `descriere` | `string` | Year-specific vision |
| `finantator` | `string` (optional) | |
| `activitati` | `string[]` | |
| `beneficiari` | `string` (optional) | |
| `voluntari` | `string` (optional) | |
| `parteneri` | `string` (optional) | |
| `imagine` | `string` | Cover image for this edition |
| `galerie` | `string[]` | Photo gallery |
| `statistici` | `Array<{ label, value }>` | Structured stats |
| `materiale` | `Array<{ label, url }>` | PDFs, brochures, PR kit |
| `stare` | `"planificat" \| "in-desfasurare" \| "finalizat"` | |
| `registrationUrl` | `string` (optional) | CTA link |

### URL structure

```
/proiecte                              → Listing (categorii: anuale, singulare)
/proiecte/[slug]                       → Hub page (/proiecte/admiteri)
/proiecte/[slug]/[editieSlug]          → Edition page (/proiecte/admiteri/admitere-2026)
/proiecte/[slug]/arhiva                → Archive of past editions
```

### Content relationships (news + events)

- **Long-term (WP):** custom taxonomy `project` on `post` and `event` CPTs. GraphQL: `posts(where: {taxonomy: "project", term: "admiteri"})`.
- **Hardcoded phase:** manual mapping `Record<proiectSlug, { postSlugs: string[], eventSlugs: string[] }>` in `proiecte.ts` or a `proiect` field on each post/event.

### WordPress schema (when ACF is ready)

- CPT `project_hub` — ACF fields: descriere, imagine, culoare, domenii, website, proiectParinte (relationship → `project_hub`)
- CPT `project_edition` — ACF fields: an, perioada, descriere, finantator, activitati, beneficiari, voluntari, parteneri, imagine, galerie, statistici, materiale, stare, registrationUrl
- Taxonomy `project` — assigned to `post` and `event`

### Implementation phases

| Phase | What | Depends on | Status |
|---|---|---|---|
| **1** | Expand TypeScript types (`ProiectHub`, `ProiectEditie`), restructure `proiecte.ts` | — | ✅ done |
| **2** | Route `[slug]/` — hub page: hero, description, current edition, related posts & events | Phase 1 | ✅ done |
| **3** | Route `[slug]/[editieSlug]` — edition page: gallery, stats, materials, team, CTA | Phase 2 | ✅ done |
| **4** | Route `[slug]/arhiva` — archive of past editions by year | Phase 3 | ✅ done |
| **5** | Filtering on listing page (`/proiecte`) — by category, year, status, domenii | Phase 4 | ✅ done |
| **6** | WP migration — ACF CPT, GraphQL queries, replace hardcoded data | ACF ready on WP | ⏳ pending |
