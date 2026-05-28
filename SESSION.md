# Sesiune — 25 Mai 2026

## Realizat

### Design system
- Paletă monochromatic oxford (navy) + albastru accent
- Fundaluri: `--color-bg` (off-white cald)
- Culori adăugate: `oxford-dark`, `blue-light`, `blue-muted`
- Accesibilitate: focus-visible rings, aria-current, aria-expanded, reduced-motion
- Font Rubik, spațiere generoasă, minim decorațiuni

### Navigare (Header.svelte)
- Dropdown "Organizație" (Despre Noi, Echipă) + "Activități" (Proiecte, Membre, Noutăți)
- Desktop: hover/click, Mobile: accordion
- Fix bug gap între buton și dropdown (wrapper `pt-1`)

### Pagini
- Design unitar pe toate paginile: homepage, despre-noi, echipa, membre, proiecte, noutăți (list + articol), contact
- Homepage: hero, stats (Grist), what-we-do, 3 articole recente, membre, quick-links, CTA
- Noutăți: infinite-scroll "load more" (API `/api/posts` + client-side append)

### Cache
- Grist cache in-memory (1h TTL) + `clearGristCache()` la `/api/revalidate`
- Același pattern ca WP GraphQL cache

### Optimizare imagini
- Tipuri WP: `srcSet`, `sizes`, `mediaDetails` adăugate
- Query-uri GraphQL actualizate în toate server files
- Homepage: `<picture>` cu WebP `<source>`, srcSet, sizes, width/height, lazy/eager, decoding async
- Noutăți listing: idem
- Noutăți articol: CSS `.prose img` responsive + border-radius
- Helper `toWebp()` — convertește `.jpg/.jpeg/.png` → `.webp`
- Build: 0 erori

## Următorii pași (în ordine sugerată)

1. **Favicon** — înlocuit logo-ul Svelte cu cel FTB
2. **Paginare** — adăugat "articole mai noi" la noutăți
3. **Calendar evenimente** — placeholder pe articole; integrat cu WP Events
4. **Migrare date statice** — proiecte (`proiecte.ts`), echipă (`echipa.ts`), membre (`membre.ts`), despre noi → WP/Grist
5. **Poze echipă** — inițiale → poze reale (cînd ACF CPT e gata pe WP)

## Comenzi utile

| Comandă | Descriere |
|---|---|
| `deno task dev` | Dev server |
| `deno task check` | Type-check (0 erori așteptate, 2 warnings `state_referenced_locally` cunoscute) |
| `deno task build` | Production build |
