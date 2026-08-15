# Personal Website

A minimal, editorial, typography-driven personal website inspired by the
interaction model and layout logic of [Obys Agency](https://obys.agency/) — but
adapted into a personal index of interests. The visual interest comes from
layout, typography, a synchronized title/image carousel, and a single
choreographed geometric page transition, not from decorative effects.

Built with **React + TypeScript + Vite + GSAP**, deployed as a static site.

## Contents

- [Local development](#local-development)
- [Build & preview](#build--preview)
- [Deployment](#deployment)
- [Editing text](#editing-text)
- [Replacing images](#replacing-images)
- [Adding a new field](#adding-a-new-field)
- [Choosing a detail template](#choosing-a-detail-template)
- [Architecture](#architecture)
- [Animation architecture](#animation-architecture)

---

## Local development

```bash
npm install
npm run dev
```

The dev server prints a local URL (usually `http://localhost:5173`).

Available scripts:

| Script             | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Start the Vite dev server                       |
| `npm run build`    | Type-check, then build the static site to `dist` |
| `npm run preview`  | Serve the production build locally              |
| `npm run lint`     | Run ESLint                                      |
| `npm run typecheck`| Run TypeScript checks                           |
| `npm run format`   | Format the project with Prettier                |
| `npm run assets`   | Regenerate the noise placeholder images         |

## Build & preview

```bash
npm run build
npm run preview
```

The production output lands in `dist/`. The build uses a **relative base path**
and **hash routing**, so the exact same bundle works from a domain root (Vercel,
Netlify) or from a GitHub Pages sub-path with zero configuration.

## Deployment

### GitHub Pages

The repository includes `.github/workflows/deploy.yml`. Push to the `main`
branch and the workflow will install dependencies, lint, type-check, build, and
deploy `dist/` to GitHub Pages.

In the repository settings:

1. **Settings → Pages → Source** → select **GitHub Actions**.
2. Push to `main`.

### Vercel / Netlify / any static host

No special configuration is required:

- **Build command:** `npm run build`
- **Output directory:** `dist`

There are no hardcoded URLs and no server rewrite rules to maintain.

## Editing text

All editable copy is centralized in two files:

- `src/data/site.ts` — name, identity lines, location, contact link, and global
  metadata.
- `src/data/fields.ts` — every content area (field): its id, title, homepage
  image, homepage metadata, detail template, and detail copy.

No text is hardcoded inside components.

## Replacing images

Drop your final images into the existing asset paths and the site will use them
immediately — no code changes:

```
public/
  assets/
    fields/       # homepage carousel images (portrait)
      mathematics.png
      deep-learning.png
      rock-music.png
    detail/       # detail page images (landscape)
      ...
```

Keep the same filenames (they are the content references), or update the path
in `src/data/fields.ts` if you prefer different names. The placeholder files are
generated deterministic grayscale noise; regenerate them at any time with
`npm run assets`.

## Adding a new field

Adding e.g. **Computer Graphics**:

1. Add `computer-graphics.png` to `public/assets/fields/`.
2. Append one object to the `fields` array in `src/data/fields.ts`:

```ts
{
  id: "computer-graphics",
  title: "Computer Graphics",
  image: "assets/fields/computer-graphics.png",
  imageAlt: "…",
  metadata: { lines: ["Focus", "Rendering", "Interest", "Geometry"] },
  detail: {
    template: "text",
    title: "Computer Graphics",
    subtitle: "…",
    sections: [
      { heading: "Rendering", paragraphs: ["…", "…"] },
    ],
  },
}
```

3. Choose a detail template (see below).
4. Run `npm run dev`.

That's it. The carousel, routing, detail page, animation code, and homepage
layout all adapt automatically — there is no per-field code anywhere.

## Choosing a detail template

Each field's `detail.template` selects one of three reusable templates:

| Template        | Value           | Use when                                       |
| --------------- | --------------- | ---------------------------------------------- |
| Text only       | `"text"`        | The field is communicated through writing      |
| Text + image    | `"text-image"`  | One supporting image (set `detail.image`)      |
| Text + gallery  | `"text-gallery"`| Several visuals (set `detail.images`)          |

- `"text-image"` reads a single `detail.image`.
- `"text-gallery"` reads `detail.images` and renders a quietly auto-scrolling
  image column.

## Architecture

```
src/
  components/
    common/        Image, Typography primitives
    layout/        SiteHeader, SiteFooter
    home/          FieldCarousel, FieldTitleColumn, FieldImageColumn,
                   FieldMetadata, GeometryFrame, HomeTransition
    detail/        DetailPage + the three templates + BackButton + DetailAnchor
  pages/           HomePage, FieldPage
  data/            site.ts, fields.ts (all content)
  types/           content.ts (Field, FieldDetail, SiteConfig types)
  hooks/           useFieldCarousel, usePageTransition, useHashRoute,
                   useReducedMotion
  animations/      timing.ts, carousel.ts, homeTransition.ts
  lib/             assets.ts (base-URL-aware asset resolver)
  styles/          variables.css, globals.css, typography.css, layout.css
```

Responsibilities are kept separate: data (what to show), hooks (state), and
components (how to show it). Content never lives inside visual components.

## Animation architecture

- `src/animations/timing.ts` is the single source of truth for durations and
  easings. The CSS custom properties in `src/styles/variables.css` mirror these
  values so CSS transitions and GSAP timelines stay in lockstep.
- The **carousel** is a single `slot` value driving both the title and image
  tracks, so they can never fall out of sync. The title column shows five tight
  rows, the image column three, and it is advanced by mouse wheel, keyboard, or
  click (no autoplay). It is rendered as a tripled list to create an infinite
  loop with no visible end.
- The **page transition** is one GSAP timeline in
  `src/animations/homeTransition.ts`:
  hide homepage → the two right-angle chevrons merge into a diamond → black
  fill → 180° rotation → split into a left chevron, a right chevron, and the
  solid interior. The return direction plays the exact inverse.
- `useReducedMotion` plus a `prefers-reduced-motion` CSS block replace elaborate
  motion with direct page changes when requested.
