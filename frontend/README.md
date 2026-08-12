# Prieska Digital Tourism Platform — Frontend

Frontend for the Siyathemba LED tourism platform (Prieska, Marydale &
Niekerkshoop), benchmarked against capetown.travel. Ref: `SLM/LED/TOURISM-SPEC/2025`.

## Stack

- **Vite** + **React 19**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, tokens defined in `src/index.css` `@theme`)
- **React Router v7** for routing
- **lucide-react** for icons
- **framer-motion** installed, not yet wired in (reserved for page transitions / scroll reveals)

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
```

## Architecture

```
src/
  components/
    layout/       Navbar, Footer, MainLayout (route shell)
    ui/            Reusable primitives: Button, CoordStamp, SectionHeading, Starfield
    home/           Home-page-only sections: Hero, RouteTowns, Experiences,
                    RoutesStrip, DirectoryTeaser, AIAssistantTeaser
  pages/          One component per route (Home built; others are Placeholder
                    stubs so routing/nav all work end-to-end already)
  data/           Static content as plain JS (towns, experiences, routes,
                    businesses) — swap for API calls later without touching components
  lib/            Constants shared across the app (site info, nav links)
  App.jsx         Route table
  index.css       Design tokens (@theme) + global styles
```

**Why this split:** `ui/` components know nothing about tourism — they're
pure presentation and reusable on any future page (directory, map, booking
forms). `home/` components compose `ui/` + `data/` for one page. `pages/`
just assembles sections and owns page-level concerns (SEO tags, data
fetching) once we add those.

## Design system — "Karoo Dusk"

Tokens live in `src/index.css` under `@theme` and are available as Tailwind
utilities directly (`bg-night`, `text-ochre`, `font-display`, etc.) — no
`tailwind.config.js` needed under Tailwind v4.

| Token | Hex | Use |
|---|---|---|
| `night` | `#10131F` | base background |
| `ink` | `#0A0D16` | deepest background / footer |
| `panel` | `#171B2C` | raised surface on dark sections |
| `river` | `#1F6F6B` | Orange River accent |
| `ochre` | `#C1622D` | primary CTA / heritage accent |
| `gold` | `#E8B94A` | premium / highlight accent |
| `sand` | `#F7F4EC` | light surface / text on dark |

Type: `Fraunces` (display/serif, `font-display`), `Inter` (body, default),
`IBM Plex Mono` (`font-mono` — used for the recurring GPS coordinate stamps).

**Signature motif:** `<CoordStamp />` — real GPS coordinates used as a
recurring "survey marker" label near section headings, tying the visual
identity to the spec's mapping/GPS-accuracy requirements (§3.6) and the "put
Prieska on the map" objective.

## Status vs. spec (§3 Functional Requirements)

Built so far: destination landing (Hero, three-town route), experience
categories, themed routes preview, directory teaser, AI assistant preview —
all homepage-level per §3.1, §3.2, §3.6, §3.7.

Not yet built (stubbed as placeholder routes so nav doesn't break):
directory search/filter (§3.2), business detail page, interactive map
(§3.6), booking/enquiry forms (§3.5), user accounts (§3.4), premium listing
tiers (§3.3).

## Notes on `lucide-react`

The installed version dropped brand/logo icons (Facebook, Instagram, etc.
were removed, likely for trademark reasons). `Footer.jsx` defines small
inline SVG glyphs for these instead of importing from the library.
