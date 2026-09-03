# FTB România — Headless CMS Plan

> Hybrid content management: Turso (libSQL) as local content store, WordPress as media-only
> backend. Admin UI with TipTap rich text editor for content creation/management.

Status: **PHASES 1–5 IMPLEMENTED** (jj commits `feat(cms)` series, Sep 2026).
Remaining: Phase 4b (admin CRUD UI for pages/projects/events/members/team — API exists,
only posts+media have admin pages) and Phase 6 (polish/deploy). See §9.

---

## 9. Implementation status (Sep 2026)

### Done
- **Phase 1** — Turso/libSQL + Drizzle; schema `posts, pages, projects, events, members,
  team, media, users` (`src/lib/server/schema.ts`); migrations in `drizzle/`; tasks
  `db:generate/migrate/push/studio`. Local dev works with `TURSO_DATABASE_URL="file:local.db"`.
- **Phase 2** — `src/scripts/{migrate-wp,migrate-data,seed}.ts`; tasks
  `db:seed[:wp|:data]`. Seeded: 27 posts, 12 guide pages (+categorie/volatility),
  16 projects (6 hubs + 10 ediții), 8 events, 16 members, 9 team. Upsert by slug
  (posts/pages/projects/events); members+team replaced on re-seed (no unique key).
- **Phase 3** — `auth.ts` (WP Application Passwords via `/users/me?context=edit`,
  HMAC-signed cookie `ftb_session`, 7d, role map administrator→admin, users table upsert);
  `media.ts` (WP REST upload + alt/title, registry in DB); `content.ts` (zod-validated
  CRUD per type, unique-slug w/ RO diacritics, pagination); routes:
  `/api/admin/auth/{login,logout,me}`, `/api/admin/content/[type](/[id])`,
  `/api/admin/media`. `AUTH_SECRET` env (falls back to REVALIDATE_TOKEN).
- **Phase 4** — `/admin` (guarded layout, login, dashboard w/ DB counts, posts list w/
  filters+pagination+delete, new/edit post with TipTap + featured-image picker, media page).
  `RichTextEditor.svelte` = TipTap v3 (headings, lists, links, image paste/drop/upload,
  tables, YouTube); `MediaLibrary.svelte` (drag-drop upload, grid, insert hook).
  Root layout skips site Header/Footer/SEO on `/admin`.
- **Phase 5a** — `queries/{posts,pages,events}.ts` shape DB rows to the existing
  `WPPost/WPPage/Eveniment` interfaces (featured-image compat shim) so public components
  were unchanged. Loaders swapped: noutati listing+article, ghiduri/[slug], homepage,
  student-in-romania, proiecte/[slug] related posts, api/posts (offset cursor `o:N`),
  sitemap news. `wp.ts` (WP GraphQL client) DELETED; hooks warm-cache removed;
  revalidate clears only Sheets cache. `types/wp.ts` kept as compat types.
- **Phase 5b** — `queries/{projects,members}.ts`; `googleSheets.getMembri/getEchipa`
  now delegate to DB (same signatures — callers unchanged; Sheets kept ONLY for
  homepage stats "Info" tab). Loaders swapped: proiecte listing (new `+page.server.ts`,
  component uses `data.hubs`), hub, edition, arhiva, admitere, evenimente listing,
  noutati/[slug] sidebar, student-in-romania upcoming events, sitemap (projects/events).

### Deliberate deviations from the original plan
1. Driver: **`@libsql/client`** (not `@tursodatabase/serverless`) — needed `file:` local dev.
2. TipTap via **`@tiptap/core` + Svelte 5 wrapper built in-repo** (no `tipex` dependency);
   TipTap v3 StarterKit already includes Link/Underline/HorizontalRule.
3. WP media upload via GraphQL `filePath` dropped entirely — REST-only (matches §2 research).
4. `members.abreviere` is NOT unique (OSB/CTB duplicates in real data) → members/team
   have no slug; admin CRUD by numeric id; seed replaces those tables.
5. Static metadata KEPT by design (data-files principle from ia-and-ux plan):
   `resurse.ts` (guide categories for Header nav / ghiduri listing / admitere /
   student-in-romania), `proiectPosturi` mapping, pure date helpers
   (`esteTrecut/sorteazaEvenimente`). Guide CONTENT is in DB.
6. Generic `/api/admin/content/[type]` instead of 6× per-type route files.

### Known limitations / follow-ups
- Guides created via admin won't appear in Header/ghiduri listing until `resurse.ts`
  gains a row (or listing migrates to `getPublishedGuides()` — query already exists).
- Admin CRUD UI exists only for posts + media; other 5 types need admin pages (API ready).
- `noutati/[slug]` "featured post" slug is hardcoded (pre-existing behavior).

---

## Phase 6 remaining (original §5 list, adjusted)
1. Caching layer for hot public reads (optional — DB is fast; measure first)
2. Rate limiting on admin API routes
3. Admin CRUD pages for pages/projects/events/members/team
4. Turso production DB setup (cloud) + `deno.json`/deploy env vars
5. Contact-form backend decision (out of scope here)

---

## 1. Architecture

```
SvelteKit Frontend
├── Public Pages → reads from Turso (libSQL)
├── Admin UI (/admin) → TipTap editor → writes to Turso
└── Media uploads → WordPress REST API → URLs stored in Turso
```

**Data flow:**
- **Read**: SvelteKit queries Turso → renders pages
- **Write**: Admin UI → TipTap editor → saves HTML + metadata to Turso
- **Media**: Admin UI uploads to WP REST API → gets URL → stores in Turso
- **Publish**: Draft → review in admin → publish (status change in Turso)

**Why hybrid (not direct WP mutations):**
- WordPress GraphQL schema has NO custom post types (only `post`, `page`, `media`)
- Projects, events, members, team would require ACF Pro + CPT registration + GraphQL schema extension
- Local database gives full control over content types and relationships
- WordPress handles what it does best: media hosting (CDN, image optimization)

---

## 2. Tech Stack Additions

| Layer | Technology | License |
|---|---|---|
| Database | Turso (libSQL) via `@tursodatabase/serverless` | Free tier: 5 GB |
| ORM | Drizzle ORM | MIT |
| Editor | TipTap (core + extensions) | MIT (all extensions we need are free) |
| Auth | WordPress Application Passwords | Built into WP 5.6+ |
| Media | WordPress REST API (`/wp-json/wp/v2/media`) | — |

### TipTap Extensions (all free MIT)

| Extension | Purpose |
|---|---|
| `@tiptap/starter-kit` | Bold, italic, headings, lists, blockquotes |
| `@tiptap/extension-image` | Image embedding (uploads to WP) |
| `@tiptap/extension-link` | Clickable links |
| `@tiptap/extension-table` | Tables with row/column management |
| `@tiptap/extension-horizontal-rule` | `<hr>` dividers |
| `@tiptap/extension-placeholder` | Placeholder text for empty blocks |
| `@tiptap/extension-youtube` | YouTube embeds |
| `@tiptap/extension-iframe` | Generic iframe embeds (Spotify, etc.) |
| `tipex` | Svelte 5 wrapper with floating toolbar + Tailwind v4 |

**Not included:** `@tiptap/extension-code-block-lowlight` (codeblocks not needed)

---

## 3. Database Schema (Turso + Drizzle)

### Content Tables

**`posts`** (noutati / news articles)
| Column | Type | Notes |
|---|---|---|
| id | integer PK | auto-increment |
| slug | text UNIQUE | URL-safe identifier |
| title | text | post title |
| content | text | HTML from TipTap |
| excerpt | text | plain text summary |
| featuredImage | text | URL from WP media library |
| status | text | 'draft' \| 'published' |
| category | text | 'actualitati' \| 'evenimente' \| etc. |
| authorId | text | WP user or local identifier |
| date | integer | publication timestamp |
| createdAt | integer | creation timestamp |
| updatedAt | integer | last modification timestamp |

**`pages`** (ghiduri / static pages)
| Column | Type | Notes |
|---|---|---|
| id | integer PK | |
| slug | text UNIQUE | |
| title | text | |
| content | text | HTML |
| parentId | integer | FK → pages.id (hierarchy) |
| menuOrder | integer | sort order |
| date | integer | |

**`projects`** (proiecte — hub + editions)
| Column | Type | Notes |
|---|---|---|
| id | integer PK | |
| slug | text UNIQUE | |
| titlu | text | |
| categorie | text | 'anuale' \| 'singulare' |
| descriere | text | evergreen description |
| imagine | text | hero image URL |
| culoare | text | brand color hex |
| domenii | text | JSON array of tags |
| website | text | optional external link |
| proiectParinteSlug | text | parent hub slug for subprojects |
| type | text | 'hub' \| 'edition' |
| an | integer | edition year (for editions) |
| perioada | text | edition timeframe |
| finantator | text | optional |
| activitati | text | JSON array |
| beneficiari | text | |
| voluntari | text | |
| parteneri | text | |
| galerie | text | JSON array of image URLs |
| statistici | text | JSON array of {label, value} |
| materiale | text | JSON array of {label, url} |
| stare | text | 'planificat' \| 'in-desfasurare' \| 'finalizat' |
| registrationUrl | text | optional CTA |
| date | integer | |

**`events`** (evenimente)
| Column | Type | Notes |
|---|---|---|
| id | integer PK | |
| slug | text UNIQUE | |
| title | text | |
| description | text | |
| content | text | HTML (detail page) |
| date | integer | event date timestamp |
| location | text | |
| image | text | URL |
| gallery | text | JSON array of URLs |
| projectId | integer | optional FK → projects.id |

**`members`** (organizatii membre)
| Column | Type | Notes |
|---|---|---|
| id | integer PK | |
| nume | text | organisation name |
| oras | text | city |
| rol | text | 'fondator' \| 'activ' \| 'candidat' \| 'potential' |
| logo | text | URL |
| website | text | |
| descriere | text | what they do for students |
| active | integer | 1/0 boolean |

**`team`** (echipa)
| Column | Type | Notes |
|---|---|---|
| id | integer PK | |
| nume | text | name |
| functie | text | role/title |
| foto | text | photo URL |
| ordine | integer | display order |

**`media`** (uploaded media registry)
| Column | Type | Notes |
|---|---|---|
| id | integer PK | |
| wpId | integer | WordPress attachment ID |
| url | text | full URL |
| alt | text | alt text |
| caption | text | |
| type | text | 'image' \| 'document' \| 'video' |
| uploadedAt | integer | |

**`users`** (admin users)
| Column | Type | Notes |
|---|---|---|
| id | integer PK | |
| wpUserId | integer | WordPress user ID |
| username | text | |
| role | text | 'admin' \| 'editor' |
| lastLogin | integer | |

---

## 4. Environment Variables

```env
# Database (Turso) — NEW
TURSO_DATABASE_URL="libsql://ftb-content-<org>.turso.io"
TURSO_AUTH_TOKEN="<token>"

# WordPress (media uploads + auth) — NEW
WP_URL="https://ftbromania.ro/incubator"
WP_USER="headless-editor"
WP_APP_PASSWORD="<application-password>"

# Existing (keep)
WP_GRAPHQL_ENDPOINT="https://ftbromania.ro/incubator/graphql"
REVALIDATE_TOKEN="<existing>"
GOOGLE_SHEETS_API_KEY="<existing>"
GOOGLE_SHEETS_ID="<existing>"
```

---

## 5. Implementation Phases

### Phase 1: Database Foundation
1. Create Turso account + database
2. Install `@tursodatabase/serverless`, `drizzle-orm`, `drizzle-kit`
3. Create `src/lib/server/db.ts` — Turso client + Drizzle instance
4. Create `src/lib/server/schema.ts` — full schema (all tables above)
5. Create `drizzle.config.ts`
6. Run initial migration

### Phase 2: Content Migration Scripts
1. `src/scripts/migrate-wp.ts` — fetch all posts/pages from WP GraphQL, insert into Turso
2. `src/scripts/migrate-data.ts` — import from hardcoded `src/lib/data/` files into Turso
3. `src/scripts/seed.ts` — combines both migrations
4. Add deno task: `db:seed`

### Phase 3: Server API Layer
1. `src/lib/server/auth.ts` — WP Application Password validation + session management
2. `src/lib/server/media.ts` — WP media upload via REST API
3. API routes under `src/routes/api/admin/`:
   - Auth: login, logout
   - Posts: CRUD + publish
   - Pages: CRUD
   - Projects: CRUD
   - Events: CRUD
   - Members: CRUD
   - Team: CRUD
   - Media: upload proxy

### Phase 4: Admin UI
1. `src/routes/admin/+layout.svelte` — auth guard + sidebar nav
2. `src/routes/admin/login/+page.svelte` — WP credential login
3. `src/routes/admin/+page.svelte` — dashboard
4. `src/routes/admin/posts/` — listing + create/edit with TipTap
5. `src/lib/components/admin/RichTextEditor.svelte` — TipTap wrapper (tipex)
6. `src/lib/components/admin/MediaUploader.svelte` — file upload to WP
7. `src/lib/components/admin/ContentForm.svelte` — reusable metadata form
8. Repeat for pages, projects, events, members, team

### Phase 5: Frontend Migration
1. Create query functions in `src/lib/server/queries/` for each content type
2. Update all `+page.server.ts` files to read from Turso
3. Remove `src/lib/server/wp.ts` (WP GraphQL client)
4. Remove hardcoded data files (`src/lib/data/`)
5. Keep Google Sheets temporarily if stats still come from there

### Phase 6: Polish & Production
1. Caching layer (in-memory with TTL or Deno KV)
2. Rate limiting on admin API routes
3. Input validation (zod schemas)
4. Error handling + loading states
5. End-to-end testing
6. Deploy with new env vars

---

## 6. File Structure (New/Additions)

```
src/
├── lib/
│   ├── server/
│   │   ├── db.ts                    # NEW — Turso client + Drizzle
│   │   ├── schema.ts               # NEW — Database schema
│   │   ├── auth.ts                 # NEW — WP Application Password auth
│   │   ├── media.ts                # NEW — WP media upload
│   │   └── queries/
│   │       ├── posts.ts            # NEW — Post queries
│   │       ├── pages.ts            # NEW — Page queries
│   │       ├── projects.ts         # NEW — Project queries
│   │       ├── events.ts           # NEW — Event queries
│   │       ├── members.ts          # NEW — Member queries
│   │       └── team.ts             # NEW — Team queries
│   ├── components/
│   │   └── admin/
│   │       ├── RichTextEditor.svelte  # NEW — TipTap wrapper
│   │       ├── MediaUploader.svelte   # NEW — File upload
│   │       └── ContentForm.svelte     # NEW — Reusable form
│   └── data/                       # DELETE — after migration
├── routes/
│   ├── admin/
│   │   ├── +layout.svelte          # NEW — Admin layout
│   │   ├── +page.svelte            # NEW — Dashboard
│   │   ├── login/+page.svelte      # NEW — Login
│   │   ├── posts/                  # NEW — CRUD
│   │   ├── pages/                  # NEW — CRUD
│   │   ├── projects/               # NEW — CRUD
│   │   ├── events/                 # NEW — CRUD
│   │   ├── members/                # NEW — CRUD
│   │   └── team/                   # NEW — CRUD
│   └── api/admin/
│       ├── auth/                   # NEW — login/logout
│       ├── posts/                  # NEW — CRUD API
│       ├── pages/                  # NEW
│       ├── projects/               # NEW
│       ├── events/                 # NEW
│       ├── members/                # NEW
│       ├── team/                   # NEW
│       └── media/upload/           # NEW — WP upload proxy
├── scripts/
│   ├── migrate-wp.ts               # NEW — WP migration
│   ├── migrate-data.ts             # NEW — Hardcoded data migration
│   └── seed.ts                     # NEW — Combined seed
└── drizzle.config.ts               # NEW — Drizzle config
```

---

## 7. Dependencies

```bash
# Database
deno add npm:@tursodatabase/serverless
deno add npm:drizzle-orm
deno add -D npm:drizzle-kit

# Rich text editor
deno add npm:tipex
deno add npm:@tiptap/core
deno add npm:@tiptap/starter-kit
deno add npm:@tiptap/extension-image
deno add npm:@tiptap/extension-link
deno add npm:@tiptap/extension-table
deno add npm:@tiptap/extension-horizontal-rule
deno add npm:@tiptap/extension-placeholder
deno add npm:@tiptap/extension-youtube
deno add npm:@tiptap/extension-iframe

# Auth & validation
deno add npm:zod
```

---

## 8. Key Decisions

1. **Turso over Neon** — edge-first, 5 GB free (vs 0.5 GB), SQLite-compatible, lower lock-in
2. **TipTap over alternatives** — all extensions needed are free MIT, HTML output matches existing `{@html}` rendering, largest ecosystem
3. **Codeblocks excluded** — not needed for this content
4. **WP as media-only** — no custom post types in WP GraphQL, local DB gives full control
5. **Application Passwords for auth** — built into WP 5.6+, no plugin needed, Basic Auth header
6. **Migrate all content** — both WP content and hardcoded data move to Turso
