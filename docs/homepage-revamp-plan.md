# Coderturtle.io Homepage Revamp Plan

Date: 2026-06-28

## Current-Site Assessment

- Stack/framework: Astro 5 with MDX, Astro content collections, Tailwind CSS, `@astrojs/sitemap`, `@astrojs/rss`, and `astro-mermaid`.
- Homepage structure: `src/pages/index.astro` renders a hero, persona/philosophy section, latest blog cards, and a library CTA.
- Styling approach: Tailwind utility classes backed by a small `src/styles/global.css` file and a custom palette in `tailwind.config.js`.
- Content model: build-time static generation. Blog posts live in `src/content/blog/*.mdx`, are typed by `src/content/config.ts`, and are rendered into static routes.
- Worth preserving: static-site shape, simple blog collection, turtle identity, shell-green accent, dark-mode intent, MDX/Mermaid support, and the direct practical voice.
- Legacy concerns: placeholder/about content, a test post, old Astro starter components, tracked `.DS_Store` files, and deployment config that still references GitHub Pages.

## Recommended Positioning

Coderturtle is the hands-on workshop voice of the Hekton ecosystem: practical notes, labs, workshops, experiments, and field reports from building agentic engineering systems.

## Homepage Concept

### Hero

Use a first-viewport workshop/field-desk concept: strong Coderturtle logo presence, a direct positioning headline, two calls to action, and a lightweight system-map panel showing the relationship between Hekton, Agentic Tekton, and Coderturtle.

### Navigation

- Notes
- Workbench
- Ecosystem
- About

Future additions can add top-level Labs, Workshops, and Projects once those pages exist.

### Homepage Sections

- Hero: "Field notes from building agentic engineering systems."
- Workbench: field notes, labs, workshops.
- Latest field notes: recent MDX posts from the content collection.
- Ecosystem map: Hekton, Agentic Tekton, Coderturtle, Gremlins.
- Closing CTA: practical, curious, close to the work.

### Interaction Ideas

- Static CSS hover/focus states for cards and buttons.
- Native `details` disclosure in the hero panel for progressive enhancement without a framework runtime.
- Dark-mode toggle using a small inline script and local storage.
- Future: filterable notes/labs list, copyable workshop snippets, and lightweight diagrams rendered from MDX.

### Visual Style Direction

- Personal and technical rather than corporate.
- Use the logo as the primary visual asset.
- Pair a warm paper background with night, shell green, coral, and mist accents.
- Prefer framed workbench panels, simple cards, and readable typography.
- Avoid heavy animation, large client bundles, complex dashboards, or CMS-like editing flows.

### Tone Of Voice

- Practical, curious, calm, lightly playful.
- Write like someone who has actually built the thing and kept the notes.
- Avoid enterprise jargon unless it is being translated into practical consequences.
- Prefer "what broke / what worked / what changed my mind" over generic thought leadership.

## Example Homepage Copy

Headline:

> Field notes from building agentic engineering systems.

Supporting copy:

> Coderturtle is the practical, curious side of the Hekton ecosystem: hands-on notes, labs, workshops, and experiments from building software with agents in the loop.

Section copy:

> A workbench for useful fragments.

> This homepage should make it obvious where to go next, whether the visitor wants a blog post, a lab note, a reusable pattern, or a map of the wider ecosystem.

## Variants

### 1. Field Desk

Concept: A workshop homepage with a strong hero, a small system-map panel, latest notes, and ecosystem framing.

Pros: Clear, memorable, fast, easy to ship, fits the builder/narrator role.

Risks: Some future sections are represented as anchors before dedicated pages exist.

Best use case: MVP homepage revamp.

### 2. Lab Notebook

Concept: A more editorial homepage organized around dated notes, experiments, and decisions.

Pros: Strong writing/blog fit, easy to extend with content collections.

Risks: Less visually distinctive on first impression and may feel too much like a standard blog.

Best use case: When the site has a larger archive of posts and lab reports.

### 3. Ecosystem Map

Concept: A homepage centered on the relationship between Hekton, Agentic Tekton, Coderturtle, and Gremlins.

Pros: Great for orienting visitors who arrive from the broader ecosystem.

Risks: Can become too explanatory or corporate if the personal workshop voice is not dominant.

Best use case: Later stage when all ecosystem destinations have real landing pages.

## MVP Recommendation

Choose Field Desk.

It gives Coderturtle a memorable first impression, keeps the static-site model simple, preserves the existing blog path, and creates enough structure for future labs, workshops, and project pages without needing new infrastructure or a CMS.

## Gateway Update

The Coderturtle site now follows the gateway/front-door convention used by adjacent ecosystem sites:

- `/` is a focused gateway page with one primary Enter action.
- `/enter/` is the richer workbench homepage with notes, lanes, and ecosystem context.
- The gateway uses Coderturtle-specific visuals: shell rings, workbench nodes, shell-green/coral/mist accents, and a practical "Enter the workshop" voice.
- The gateway now builds for the root domain (`https://coderturtle.io/`) rather than the old GitHub Pages `/coderturtle-blog/` path.
- Interactive polish stays lightweight: hover/focus ecosystem nodes, a live readout, pointer-reactive depth on desktop, and reduced-motion/mobile fallbacks.

## Implementation Plan

### Files Likely To Change

- `src/pages/index.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/ThemeToggle.astro`
- `src/styles/global.css`
- `tailwind.config.js`
- `src/consts.ts`
- `docs/homepage-revamp-plan.md`
- `docs/decisions.md`
- `docs/session-log.md`
- `docs/next-actions.md`
- `docs/project-walkthrough.md`

### Components/Pages

- Use the existing `BaseLayout.astro`.
- Keep the homepage in `src/pages/index.astro`.
- Do not add a component layer until repeated patterns appear across pages.

### Styling Approach

- Tailwind plus local component classes in `src/styles/global.css`.
- Local Atkinson font files from `public/fonts`.
- No new CSS framework, animation library, or icon package.

### Dependencies

Needed: none beyond current Astro/Tailwind dependencies.

Avoid: CMS packages, animation frameworks, client-side routers, paid analytics, and visual libraries that add runtime weight.

### Accessibility

- Semantic landmarks: header, nav, main, footer, sections.
- Visible focus outlines.
- Button labels and `aria-pressed` for the theme toggle.
- Sufficient text contrast in light and dark themes.
- Native `details` for progressive disclosure.

### Mobile Responsiveness

- Single-column hero and cards on small screens.
- Header wraps without hiding the brand.
- Buttons use stable heights and full-width stacking on narrow screens.

### Performance

- Static HTML/CSS output.
- No new runtime framework.
- Reuse existing logo assets.
- Use local fonts instead of remote Google font import.
- Keep interactions CSS/native JS only.

### Local Testing

```bash
npm ci
npm run build
npm run dev
```

## Build Backlog

### P0: Required For First Working Homepage

- Replace homepage copy and layout with the Field Desk concept.
- Keep latest posts powered by the existing Astro content collection.
- Update base layout metadata, navigation, footer, and theme toggle.
- Preserve existing blog/about routes.
- Run `npm run build`.

### P1: Nice Interactive Polish

- Add filtered notes/labs index once content exists.
- Add reusable homepage cards if patterns repeat across pages.
- Add small MDX-powered workshop snippets.
- Add subtle scroll or active-section state only if it stays lightweight.

### P2: Future Expansion

- Dedicated Labs page.
- Dedicated Workshops page.
- Project pages for Hekton, Agentic Tekton, Gremlins, and selected builds.
- RSS categories or tag pages.
- Lightweight, privacy-friendly analytics only if explicitly approved.

## Infra Thread Handoff

- Build command assumption: `npm ci && npm run build`.
- Output directory assumption: `dist/`.
- Environment variables: none currently required.
- Routing: static HTML routes with `trailingSlash: "always"`; no SPA fallback required.
- CloudFront/S3: serve static files, default root object should be `index.html`.
- Cache busting: Astro emits hashed assets under `dist/_astro/`; HTML should receive shorter cache TTL than hashed assets.
- Deployment config note: `astro.config.mjs` now uses `site: "https://coderturtle.io/"` and no `base` override. The infra thread should ensure S3/CloudFront serves this as a root-domain static site.
