# FTB România — Headless WordPress Frontend

## Project identity

**FTB România** (Federația Tinerilor Basarabeni) is a non-profit NGO website — a headless WordPress frontend built with SvelteKit. WordPress serves as the CMS backend via GraphQL; this app renders the public site.

Production: https://ftbromania.ro

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Svelte 5 (runes mode) + SvelteKit 2 |
| Language | TypeScript (strict) |
| CSS | Tailwind CSS v4 (`@theme` directives, `@tailwindcss/vite` plugin) |
| Icons | Font Awesome 6 (brands, solid, regular) — static files in `/static/fa/` |
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
- [ ] **Projects data** — hardcoded in `src/lib/data/proiecte.ts`; migrate to ACF CPT
- [ ] **Member orgs data** — hardcoded in `src/lib/data/membre.ts`; migrate to Grist / WP CPT
- [ ] **Team data** — hardcoded in `src/lib/data/echipa.ts`; migrate to ACF CPT
- [ ] **Event calendar** — placeholder on article pages; integrate with WP Events  ✅ **Portat** — vezi `/evenimente/` (listing + `[slug]` detail), sidebar în articole
- [ ] **Pagination** — only "older articles" exists; add "newer articles" to noutati
- [ ] **Favicon** — currently the default Svelte logo; replace with FTB brand favicon
- [ ] **Contact form** — replace OpnForm iframe with in-house form connected to Gmail API

### 🔴 Security
- [ ] **Auth on `/api/revalidate`** — no authentication; anyone can flush WP GraphQL cache
- [ ] **`rel="noopener noreferrer"`** — missing on all social/external links in Footer, articles

### 🟠 Performance
- [ ] **Font Awesome JS → webfont CSS** — 4 JS bundles (~1.5MB) cause FOUI; replace with static CSS

### 🟡 Accessibility
- [ ] **Skip-to-content link** — first focusable element missing for keyboard users
- [ ] **Header dropdown keyboard navigation** — Arrow keys, Enter, Escape not handled; focus not trapped

### 🟢 UX / Housekeeping
- [x] **Custom `+error.svelte`** — branded error page with 404 detection, nav links back to homepage / noutati
- [ ] **Dead resource tags on homepage** — stale category links in `src/routes/+page.svelte`
- [ ] **Unused `wpEvents` fetch** — orphaned GraphQL query in server load files

## QA notes

- When creating new features, keep the data strategy in mind:
  1. **WordPress GraphQL** for posts/pages content (with caching)
  2. **Grist API** for numeric stats and association data
  3. **Hardcoded TypeScript** only as temporary fallback
- The WP GraphQL client has an in-memory cache with 1-hour TTL. Clear via `POST /api/revalidate`.
- Never commit API keys or secrets.
