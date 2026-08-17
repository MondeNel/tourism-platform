# Architecture & Conventions

Frontend for the **Prieska Digital Tourism Platform** (Siyathemba Local
Municipality LED). Spec ref: `SLM/LED/TOURISM-SPEC/2025`. Section numbers
below (§3.2, §4.6 etc.) refer to that document.

**Status: frontend-only.** No backend exists yet. Forms validate and show
success states but do not submit anywhere; all content is static JS.

---

## 1. Stack

| Concern | Choice | Notes |
|---|---|---|
| Build | Vite 8 | `@` aliased to `src/` in `vite.config.js` |
| UI | React 19 | Function components + hooks only, no classes |
| Styling | Tailwind CSS v4 | Tokens in `src/index.css` `@theme` — **no `tailwind.config.js`** |
| Routing | React Router 7 | `BrowserRouter`, route-level code splitting |
| Icons | lucide-react | Brand/logo icons removed upstream — see §7 |
| Animation | framer-motion | Installed, not yet used |
| Lint | oxlint | `npx oxlint src` — keep at zero warnings |

```bash
npm install
npm run dev      # dev server
npm run build    # production build to dist/
npx oxlint src   # lint
```

---

## 2. Directory structure

```
src/
  components/
    layout/      Navbar, Footer, MainLayout, ScrollToTop, NavDropdown, MobileNavItem
    ui/          Generic primitives — know nothing about tourism
    home/        Homepage sections only
    directory/   Directory + listing feature components
  pages/         One component per route
  data/          Static content (becomes API calls later)
  hooks/         Reusable stateful logic
  lib/           Pure functions — filtering, validation, no React
  App.jsx        Route table
  index.css      Design tokens + global styles
```

### Layering rule

Dependencies flow **one direction only**:

```
pages → components/{feature} → components/ui → (nothing)
             ↓                      ↓
          data/, lib/, hooks/
```

- `components/ui/` must never import from `data/` or a feature folder. If a
  primitive needs domain data, pass it as a prop.
- `lib/` must never import React. These are pure functions so they stay
  testable and can be reused server-side when the API arrives.
- `pages/` composes sections and owns page-level concerns (title/meta,
  eventually data fetching). Keep markup in components, not pages.

---

## 3. Design system — "Karoo Dusk"

Tokens live in `src/index.css` under `@theme`, exposed as normal Tailwind
utilities (`bg-night`, `text-ochre`, `font-display`).

| Token | Hex | Use |
|---|---|---|
| `night` | `#10131F` | Base dark background |
| `ink` | `#0A0D16` | Deepest background, footer |
| `panel` | `#171B2C` | Raised surface on dark sections |
| `river` | `#1F6F6B` | Orange River accent; also success/positive |
| `ochre` | `#C1622D` | Primary CTA, heritage accent |
| `gold` | `#E8B94A` | Premium tier, ratings, highlights |
| `sand` | `#F7F4EC` | Light surface, text on dark |

**Type:** `font-display` (Fraunces) for headings, default sans (Inter) for
body, `font-mono` (IBM Plex Mono) for coordinates, counts and eyebrow labels.

**Signature motif:** `<CoordStamp />` renders a GPS-coordinate "survey
marker" label above section headings. It ties the identity to the spec's
GPS-accuracy and mapping requirements (§3.6) rather than being decoration.

### Colour semantics

Use colour by meaning, not by preference:

- `gold` — premium/platinum tier, star ratings. Not a generic accent.
- `ochre` — primary actions and heritage. The default CTA colour.
- `river` — success states, confirmations, feature tags.
- Red (Tailwind default reds) — validation errors only.

### Z-index scale

Documented in `index.css`. Stick to these rungs:

| Layer | Use |
|---|---|
| `z-10` | Content above a background image within its section |
| `z-20` | Elements overhanging their section (hero search card) |
| `z-50` | Fixed site header and its dropdown panels |
| `z-60` | Full-screen modals, drawers, lightboxes (must cover header) |

Note: a child cannot escape its parent's stacking context. A high `z-index`
inside a lower-`z-index` fixed parent does nothing — raise the parent.

---

## 4. Data conventions

All files in `src/data/` are **placeholder development content**. Business
names, phone numbers, addresses, prices and ratings are invented; real data
arrives during content population (§2, Scope of Work).

### Slugs are the join key

Every entity uses a URL-safe `slug` as its identifier. Cross-references
between datasets use slugs, never display labels:

```js
// business.category holds 'agri-tourism', not 'Agri-Tourism'
const label = CATEGORIES.find((c) => c.slug === business.category)?.label;
```

This keeps display text changeable without touching data relationships.

### Derive, don't duplicate

`FEATURED_BUSINESSES` is computed from `BUSINESSES` rather than being its own
array, so the homepage preview cannot drift out of sync with the directory.
Apply the same principle to any future subset.

### Business record shape

```js
{
  slug, name, category, town,        // identity + classification
  priceRange, rating, reviewCount,   // filtering + sorting
  tier,                              // 'standard' | 'premium' | 'platinum' (§3.3)
  features: [],                      // accessibility/special-feature slugs
  description,                       // short — used on cards
  longDescription,                   // detail page prose
  coord, address,                    // location (§3.6 GPS accuracy)
  phone, email, whatsapp, website,   // contact (§3.2)
  priceFrom, galleryCount,
  payments: [],
  accessibility,                     // free text (§3.2)
  hours: [{ label, value }],
}
```

Empty string means "not supplied" for optional contact fields — components
check truthiness and omit the row entirely rather than rendering blanks.

---

## 5. Patterns

### Filter state lives in the URL

`useDirectoryFilters` reads and writes `?q=&category=&town=&price=&rating=&features=&sort=`.
Results are shareable and survive back/forward. This is why nav dropdown
links like `/directory?category=dining` work with no extra wiring.

Text input is debounced (300ms) before writing to the URL — otherwise every
keystroke becomes a history entry.

### Business logic goes in `lib/`, not components

`filterBusinesses`, `sortBusinesses`, `validateListing`, `validateEnquiry`
are pure. When the API lands, `lib/directory.js` is the file that changes;
components stay untouched.

### Forms

Consistent approach across `BusinessListingForm` and `EnquiryForm`:

1. `useState` for values, `useState` for errors — no form library yet.
2. `noValidate` on the form; we own the validation messages.
3. Validate on submit, not on blur. Clear a field's error as soon as the
   user starts correcting it.
4. On failure: show an error count at the top and **move focus to the first
   invalid field** — errors below the fold are otherwise invisible.
5. Field markup comes from `components/ui/FormField.jsx` (`Field`,
   `TextInput`, `TextArea`, `Select`) so labels, hints, errors and
   `aria-invalid` are wired consistently.

**POPIA (§6.1) is not optional.** Any form collecting personal information
needs an explicit, unticked consent checkbox linking to the privacy notice.
A pre-checked box is not consent.

### Code splitting

`Home` ships eagerly (it's the landing page). Every other route is
`React.lazy` behind a `Suspense` fallback (`RouteLoading`). Keeps first paint
lean for §4.6's mobile targets.

### Scroll behaviour

`ScrollToTop` resets scroll on navigation, but **skips `POP`** (browser
back/forward) so returning to a filtered list keeps the reader's place.

---

## 6. Accessibility baseline

Non-negotiable on every new component:

- Skip-to-content link is in `MainLayout`; keep `#main-content` intact.
- Decorative elements (`aria-hidden="true"`): gradients, hairlines, icons
  that sit next to a text label.
- Every input needs a real `<label>` — `sr-only` if visually redundant.
- Icon-only buttons need `aria-label`.
- Disclosure widgets (dropdowns, drawers, lightbox) need `aria-expanded` /
  `aria-controls`, and must close on `Escape`.
- Modals and drawers lock body scroll while open.
- Focus ring is defined globally via `:focus-visible` — do not remove it.
- `prefers-reduced-motion` is respected globally in `index.css`.

---

## 7. Known constraints & gotchas

**lucide-react has no brand icons.** Facebook, Instagram etc. were removed
upstream. `Footer.jsx` defines small inline SVG glyphs instead. Check an
icon exists before using it:

```bash
node -e "import('lucide-react').then(m => console.log('IconName' in m))"
```

**Tailwind v4 has no config file.** Add tokens to `@theme` in `index.css`.
Arbitrary values (`z-60`, `w-[320px]`) generate fine.

**Images: `public/` vs `src/assets/`.** `public/` files are copied as-is and
referenced by plain path (`/orange-river.jpg`); filenames aren't hashed, so
browsers can serve stale copies after an update. `src/assets/` files are
imported, hashed, and safe to cache long-term. Current hero uses `public/`;
prefer `src/assets/` for the growing photo library.

**Compress photos before committing.** The hero original was 1.5MB; shipped
versions are 220KB (2400px) and 32KB (900px) via `srcset`. §4.6 targets
sub-3s loads on 4G, and the Northern Cape's rural 3G reality is stricter.
Never commit a multi-megabyte image.

**Above-the-fold images must not be lazy-loaded.** The hero uses
`loading="eager"` and `fetchPriority="high"` to protect LCP (§4.6: under
2.5s). Lazy-load everything below the fold.

---

## 8. Status against spec §3

| Feature | Ref | Status |
|---|---|---|
| Homepage / destination portal | §3.1 | Built |
| Business directory + search & filter | §3.2 | Built |
| Business detail page | §3.2 | Built |
| Premium listing tiers + signup | §3.3 | Built (pricing is placeholder) |
| Enquiry / booking requests | §3.5 | UI built, no submission target |
| Town landing pages ×3 | §3.1.1 | **Placeholder** (mandatory) |
| Events & festivals calendar | §3.1.8 | **Placeholder** (mandatory) |
| Visitor essentials / Plan Your Visit | §3.1.11–12 | **Placeholder** (mandatory) |
| Experience pages (Dark Sky, Orange River) | §3.1.13–14 | **Placeholder** |
| Interactive GIS mapping | §3.6 | **Not started** — needs API key decision |
| AI tourism assistant | §3.7 | Teaser UI only — needs backend |
| User accounts | §3.4 | **Not started** — needs backend |
| Privacy notice | §6.1 | **Placeholder** — consent checkboxes link to it |

### Blocked on decisions or backend

- **Mapping provider** (§3.6) — Mapbox vs Google Maps, needs an API key.
- **Subscription pricing** (§3.3) — spec requires the service provider to
  propose a model. Current R150/R400 figures are ours, isolated in
  `data/plans.js`.
- **SEO** (§4.5) — client-rendered SPA serves an empty shell to crawlers
  that don't run JS. Schema.org markup and reliable indexing need SSR or
  prerendering; `useDocumentTitle` only handles the client side.
- **Form submission** (§3.5) — automated email notification to businesses
  requires the API layer.