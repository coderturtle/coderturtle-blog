# Session Log

Append-only session history for Coderturtle.io.

## 2026-07-02 - Real worker-turtle art on the workshop floor

### Changed Files

- `src/assets/turtles/lab-turtle.png`, `project-turtle.png`, `workshop-turtle.png` (new): user-supplied illustrations for the Labs, Projects, and Workshops stations, copied in from `~/Downloads/`.
- `src/pages/enter.astro`: imports the three images via `astro:assets`; each worker station now renders `<Image src={worker.portrait} .../>` in place of the reused Coderturtle portrait + badge placeholder.
- `docs/decisions.md`, `docs/next-actions.md`: recorded the illustration-style judgment call and marked the "supply real artwork" backlog item done.

### What Changed

The three worker-turtle stations on `/enter/` (Labs, Projects, Workshops) previously reused Coderturtle's own portrait as a stand-in. The user supplied real, purpose-built illustrations for each role; they're now wired into the workshop-floor scene through `astro:assets`, which optimized each image from ~1.8MB down to ~130KB across responsive variants automatically.

### Why It Changed

User request: "there are 3 turtle images in ~/Downloads we can use on the site now." Closes out a placeholder that was flagged in `docs/next-actions.md` since the interactivity pass.

### Decisions Made

Kept the illustration-style contrast between Coderturtle's hand-drawn portrait and the three flat-vector, white-background worker portraits rather than trying to paper over it — no image-editing tool is available to restyle them, and the mismatch reads as "senior supervising junior specialists," which fits the workshop-floor premise already in place. Existing `.worker-portrait-wrap` card framing needed no CSS changes to accommodate the white-background art.

### Assumptions Made

- The style contrast is a feature, not a bug, pending human confirmation (flagged as a new `next-actions.md` item).
- File-to-role mapping (lab-turtle → Labs, project-turtle → Projects, workshop-turtle → Workshops) was inferred from filenames; not explicitly confirmed by the user.

### Risks

- If the user wants the three worker turtles restyled to match Coderturtle's hand-drawn look, that requires either commissioned art or an image-generation capability neither of which exists in this session.

### Next Actions

- Human-review the new art on `/enter/` and confirm the style contrast reads as intentional.
- Once real Labs/Workshops pages exist, wire the corresponding stations' links to them.

### Validation Status

- `npm run build`: passed; images optimized via sharp (~1.8MB → ~130KB per source image across responsive variants).
- Browser desktop + mobile check for `/enter/`, both light and dark mode: passed; all three portraits render inside existing card framing, no console errors, no overflow.
- Full site-wide sweep (9 pages × 2 viewports = 18 checks): passed, zero regressions.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-07-02 - Dark-first "gateway to the future" reset

### Changed Files

- `tailwind.config.js`: added `void` (deep near-black background) and `glow` (bright shell-green accent) color tokens.
- `src/components/ThemeToggle.astro`: defaults to dark when no stored preference; now also sets a `data-theme` attribute (see Validation Status) alongside the `.dark` class; script wrapped in an IIFE to fix a scope collision (see below).
- `src/layouts/BaseLayout.astro`, `src/pages/index.astro`: added a blocking pre-paint inline script (also IIFE-wrapped) that applies the theme class + `data-theme` attribute before first paint, avoiding a light-mode flash.
- `src/styles/global.css`: retinted every shared component's dark-mode variant to the new void/glow "glow workshop at night" palette (glow box-shadows on buttons, cards, panels, status pills, timeline dots); added `.station-grid`/`.station`/`.station-portrait` and `.agent-station*` classes for the new workshop-floor concept; added a light "blueprint pinned to the wall" frame for Mermaid diagrams (see below).
- `src/pages/index.astro`: full gateway rebuild — dark-first CSS variables (light kept as an explicit override under `html:not(.dark)`), glowing portal rings + star field background, glowing portrait frame, copy reframed ("the gateway to what's next", "Enter the future"); fixed the quote-bubble/headline overlap bug from the prior pass by keeping it repositioned below the portrait.
- `src/pages/enter.astro`: added a new "workshop floor" section (Coderturtle's active station + two `[ agent turtle · reserved ]` placeholder stations); added a 4th workbench-panel row for "agent turtle"; reframed hero copy around the collaboration concept.
- `astro.config.mjs`: set `mermaid({ theme: "dark" })` to match the new default; kept the earlier `excludeLangs` Shiki fix.

### What Changed

The user rejected the retro-futurist/schematic pass outright and asked to start over: "the gateway should be a gateway to the future led by Coderturtle; the main site should be a futuristic workshop where turtles and agent turtles build together." Rebuilt around a dark-first "glow workshop at night" palette, a portal-style gateway, and a `/enter/` workshop-floor section with explicit reserved slots for agent-turtle artwork the user will supply separately (no fake character art was fabricated).

### Why It Changed

Direct user rejection + a clear new creative brief. Two rounds of clarifying questions resolved: (1) what specifically didn't work about the schematic pass (wrong kind of futuristic, too subtle, missed the actual concept — all three, per multi-select) and (2) how agent turtles should appear given no image-generation capability exists (user will supply the artwork). A third question about palette/mood went unanswered; proceeded with the recommended dark/glow option rather than blocking, with the Agentic Tekton differentiation risk explicitly flagged and mitigated up front.

### Decisions Made

See `docs/decisions.md` 2026-07-02 "Reset to a dark-first..." entry, which explicitly supersedes the prior schematic-pass entry.

### Assumptions Made

- Proceeded with the dark/glow palette option without user confirmation (60s no-response); flagged as overridable.
- "Reserved station" placeholders (dashed glow frame + label) are the right honest treatment for not-yet-supplied agent-turtle art, rather than e.g. blurred/greyed mockups.

### Risks

- The palette direction was not explicitly confirmed by the user — if it's also wrong, this is a second miss on the same axis (mood), so worth an early check-in rather than pushing further on this direction unconfirmed.
- Dark is now the default for all visitors (previously opt-in via toggle); light-mode users who preferred the earlier warm-first default will need to explicitly toggle now.

### Next Actions

- Human-review the dark "gateway to the future" direction live before any further extension (e.g., before applying the workshop-floor/station concept to other pages).
- When the user supplies agent-turtle artwork, replace the reserved `.agent-station` placeholders in `src/pages/enter.astro` with real portraits (same `.station`/`.station-portrait` pattern already used for Coderturtle's station).

### Validation Status

- `npm run build`: passed.
- Found and fixed during verification: both the new pre-paint script and `ThemeToggle`'s own script declared `const stored` in the same global scope, causing a `SyntaxError: Identifier 'stored' has already been declared` on every page using `BaseLayout`. Fixed by wrapping each inline script in an IIFE. Reverified: zero console errors across all pages after the fix.
- Found and fixed during verification: Mermaid diagrams rendered with light node fills regardless of site theme. Root cause: `astro-mermaid`'s auto theme-switching watches a `data-theme` *attribute*, not our `.dark` *class* — our theme scripts only ever set the class. Fixed by also setting `data-theme` in both `ThemeToggle` and the pre-paint scripts. This revealed a second, deeper issue: Mermaid's C4 diagram type doesn't fully honor its own "dark" theme (still renders light node fills) — a Mermaid.js limitation, not fixable via our config — so diagrams are now intentionally framed as a light "blueprint pinned to the workshop wall" panel instead of fighting the library.
- Playwright verification across `/`, `/enter/`, `/about/`, `/projects/`, `/projects/coderturtle-io/`, `/projects/coderturtle-io/log/vibing-with-chatgpt/` at 1280px and 390px: dark (default) passed 26/26 combinations with zero overflow/console errors; explicit light-mode (localStorage override) reverified separately after discovering the sweep script's "light" case had stopped testing light mode at all (it relied on an unset preference, which now resolves to dark by design) — 6/6 pages passed with zero overflow/console errors and confirmed `.dark` class correctly absent.
- Redirect check re-confirmed: `/blog/` and `/blog/vibing/` still resolve correctly to their `/projects/...` URLs.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-07-02 - Close out Phase 4: about/manifesto tie-in

### Changed Files

- `src/pages/about.astro`: new section, "How this actually gets built" / "An agent does some of the typing. The turtle still owns it." — states the documentary/human-agent-collaboration premise directly.

### What Changed

Confirmed the narrative direction (documentary, kept separate from `hekton-field-journal`/`tekton-chronicle`) that had been running on an unconfirmed default, then closed out Phase 4 of the original content-architecture plan with the "about/manifesto tie-in" it called for. Checked `.hekton/change-log.yaml` first — it only has the original adoption entry (CHG-0001), nothing yet worth curating into `changeRefs`, so that part of Phase 4 is a genuine no-op for now rather than something to force.

### Why It Changed

User said "move on to next phase." Rather than guess at open-ended narrative work with a real unconfirmed dependency, asked one targeted question to confirm the direction first — narrative/prose choices are costlier to redo than CSS, and this session already had two visual do-overs from guessing without checking.

### Decisions Made

See `docs/decisions.md` "Ship Phase 4..." entry.

### Assumptions Made

- None of substance — the direction was directly confirmed before writing anything.

### Risks

- None new.

### Next Actions

- Human-review the About page addition alongside the rest of today's work.
- `changeRefs` curation remains a no-op until `.hekton/change-log.yaml` has more entries.

### Validation Status

- `npm run build`: passed.
- Playwright verification across all 9 pages, both viewports (18 checks): zero overflow, zero console errors.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-07-02 - Voice guide + a new build-log entry documenting Phase 2/3 and the ecosystem/interactivity work

### Changed Files

- `docs/voice-guide.md`: new durable style guide — cranky battle-scarred engineer persona + Coding Horror dry-humor reference, with concrete do/avoid guidance and an explicit note on its relationship to Agentic Tekton's own (also Coding-Horror-referencing) voice guide.
- `src/content/logs/coderturtle-io/0003-cogs-tilt-and-a-terminal-that-talks-to-agents.mdx`: new build-log entry covering everything since `0002` that hadn't been logged yet — the `/ecosystem/` cog page, the workshop-floor tilt/connector/pip/drag interactivity pass, the four visual build-log components, and the `/llms.txt`/JSON agent interface. Written in the new voice guide's style.
- `src/assets/logs/coderturtle-io/ecosystem-cogs.png`: new real screenshot for the entry.

### What Changed

Two related asks: log the work that had happened since the last entry, and formalize Coderturtle's voice as Coding Horror-style dry humor paired with the existing cranky-engineer persona, applied globally to future Coderturtle content.

### Why It Changed

Direct user request, in one message: "update the build log for this project" and "set the style globally for coderturtle projects to use a codinghorrors dry humor style to go with the cranky battle scarred expert engineer."

### Decisions Made

See `docs/decisions.md` 2026-07-02 "Adopt Coding Horror + cranky-engineer..." entry. Key judgment call: did not retroactively rewrite `0001-vibing-with-chatgpt.mdx` to match the new voice, since that would conflict with the site's own stated promise that the build log isn't staged after the fact. The guide governs new content; old entries stand as an honest record of the voice at the time.

### Assumptions Made

- "Set the style globally for coderturtle projects" was read as governing content across the `projects` content type on this site (current and future project entries), not a mandate to rewrite existing repos outside coderturtle.io.
- Interpreted "update the build log" as filling the real gap (Phase 2/3 + ecosystem/interactivity work were done but never logged) rather than editing existing entries.

### Risks

- The new voice is a judgment call on tone (dry humor can misfire); not yet confirmed live with the user beyond the instruction to adopt it.

### Next Actions

- Human-review whether the Coding Horror tone in `0003` actually lands, or needs dialing up/down.
- Apply the voice guide to future entries and to Phase 4 (narrative `commentary`) once that direction is confirmed.

### Validation Status

- `npm run build`: passed; 9 pages generated including the new entry.
- Playwright verification across all 9 pages, both viewports (18 checks): zero overflow, zero console errors.
- Confirmed the new entry's `TerminalBlock` renders the literal `\n` in the example curl command correctly (not an actual line break) and its `Screenshot`/timeline ordering are correct via the live `/projects/coderturtle-io.json` endpoint (three entries, correctly date/order-sorted).

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-07-02 - Retro-futurist/schematic chrome pass + gateway bug fix

### Changed Files

- `src/pages/index.astro`: fixed the gateway quote bubble overlapping the headline (repositioned below the portrait); added blueprint grid backdrop + edge tick marks (`.gate-texture`, `.gate-ticks`); added `CornerBrackets` to the portrait frame + a `[UNIT 01]` telemetry label; tightened hover-transition easing on the Enter button and workshop-path marks.
- `src/components/CornerBrackets.astro`: new reusable corner-bracket/reticle framing component.
- `src/styles/global.css`: added `.corner-brackets`/`.corner-bracket` rules; `.telemetry-label`/`.telemetry-row` bracket styling; bracket treatment added to `.panel-kicker` and `.log-timeline-meta` (chrome/metadata only, not body content).
- `src/pages/enter.astro`, `src/pages/about.astro`: added `CornerBrackets` to the workbench panel.
- `tailwind.config.js`: set a snappier default `transitionTimingFunction` (`cubic-bezier(0.16, 1, 0.3, 1)`) applied sitewide to the bare `transition` utility.
- `docs/decisions.md`: recorded both the style-direction decision and the bug fix.

### What Changed

Fixed a real, user-reported visual bug (quote bubble colliding with the gateway headline), then layered a "retro-futurist/schematic" chrome treatment across the gateway and workbench panels per user request for a "next-generation, futuristic" feel — implemented as a restrained instrument-panel motif (grid, tick marks, corner brackets, bracketed telemetry labels) rather than the more generic dark/neon/glass reading of "futuristic," and scoped to chrome/metadata only so project content stays the visual focus.

### Why It Changed

User reported the quote-bubble overlap directly. Separately, user asked for a next-gen/futuristic feel but was explicit that the site shouldn't get busy — projects should pop. Flagged the tension with Agentic Tekton's existing dark aesthetic before implementing; user confirmed the retro-futurist/schematic direction via a clarifying question rather than the more conventional dark/glass reading.

### Decisions Made

See `docs/decisions.md` 2026-07-02 entries: retro-futurist/schematic chrome layer; gateway quote-bubble fix.

### Assumptions Made

- "Chrome only, not content" was my own scoping rule for keeping the site from feeling busy, inferred from "projects should be what make it pop" — not independently re-confirmed with the user before implementing, but low-risk and reversible if wrong.

### Risks

- The Tailwind `transitionTimingFunction.DEFAULT` change applies to every bare `.transition` utility sitewide; low risk since it only changes easing curve, not duration or which properties transition, but worth a visual sanity pass if new components are added later.

### Next Actions

- Human-review the schematic chrome treatment live and confirm it reads as "next-gen" without tipping into busy.
- Continue with Phase 2 (visual build-log components) whenever the user is ready.

### Validation Status

- `npm run build`: passed.
- Playwright verification across `/`, `/enter/`, `/about/`, `/projects/`, `/projects/coderturtle-io/`, `/projects/coderturtle-io/log/vibing-with-chatgpt/`, desktop + mobile, light + dark (26 checks): zero overflow, zero console errors.
- Quote-bubble fix verified directly: bounding-box check confirmed zero overlap with the headline post-fix (previously confirmed overlapping via the same method before the fix).
- Visual review of gateway, workbench panel, and project timeline screenshots confirmed brackets/grid/telemetry labels render as intended and project/build-log content remains untouched by the new chrome styling.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-07-02 - Projects + build-logs content model (Phase 0 + Phase 1)

### Changed Files

- `src/content.config.ts`: reconciled with the legacy shadowed `src/content/config.ts` (deleted); replaced the `blog` collection with `projects` and `logs` collections linked by `reference('projects')`.
- Deleted: `src/content/config.ts`, `src/content/blog/test.mdx`, `src/content/blog/vibing.mdx` (migrated), `src/layouts/BlogPost.astro`, `src/components/{Header,Footer,BaseHead,HeaderLink,FormattedDate}.astro`, `src/assets/blog-placeholder-*.jpg` (all confirmed zero-reference dead scaffold), `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`.
- Added: `src/content/projects/coderturtle-io.mdx`; `src/content/logs/coderturtle-io/0001-vibing-with-chatgpt.mdx` (migrated from `vibing.mdx`, with a fixed Mermaid diagram — see below); `src/lib/logs.ts` (shared `entrySlug` helper); `src/pages/projects/index.astro`, `src/pages/projects/[slug]/index.astro`, `src/pages/projects/[slug]/log/[entry]/index.astro`.
- `src/styles/global.css`: added `.status-pill` (+ status variants), `.project-meta`, `.log-timeline*`, `.log-entry-prose` component classes.
- `tailwind.config.js`, `package.json`: added `@tailwindcss/typography` plugin (fixes previously-flagged unstyled `prose` classes).
- `astro.config.mjs`: added `redirects` for `/blog/` → `/projects/` and the migrated post's URL; fixed `markdown.syntaxHighlight` to the object form with `excludeLangs: ["mermaid"]` (see Validation Status).
- `src/pages/rss.xml.js`: now sources `logs` instead of `blog`.
- `src/layouts/BaseLayout.astro`, `src/pages/enter.astro`, `src/pages/index.astro`, `src/pages/about.astro`: repointed nav/labels/CTAs from `/blog/` and "Field notes" to `/projects/` and "Projects"; `enter.astro`'s "Latest field notes" section now sources `logs`.
- `docs/decisions.md`, `docs/next-actions.md`, `docs/project-walkthrough.md`: updated for the new content model.

### What Changed

Replaced the blog with a **projects + build-logs** content model: projects are the primary navigational unit (`/projects/`), each with an in-page build-log timeline whose entries are individually addressable (`/projects/<slug>/log/<entry>/`). This is Phase 0 (config reconciliation) and Phase 1 (content model + routing skeleton) of the approved content-architecture plan; Phase 2 (visual build-log components), Phase 3 (agent-facing interface), and Phase 4 (narrative) are not yet built.

### Why It Changed

The user wants Coderturtle to speak through real projects and honest build logs rather than a generic blog, since a blog format-overlaps with Agentic Tekton's editorial/thought-leadership site. This followed a design-review discussion, a research phase (confirming no agent-facing interface precedent exists in the Hekton ecosystem, but `.hekton/` YAML is a reusable structural precedent; confirming a similar "gremlin coworkers" narrative already exists in `hekton-field-journal`/`tekton-chronicle`), and an approved phased plan.

### Decisions Made

See `docs/decisions.md` 2026-07-02 entries: replace blog with projects+logs; migrate real content instead of leaving it legacy; default the narrative to documentary and separate from the sibling gremlin fiction (unconfirmed by user); fix the Shiki/Mermaid conflict and remove dead legacy scaffold found during verification.

### Assumptions Made

- The narrative-overlap question went unanswered; proceeded with the recommended default (documentary, separate) rather than blocking, flagged in `next-actions.md` for override.
- Deleting the confirmed-zero-reference legacy Astro-blog-starter scaffold (`Header`/`Footer`/`BaseHead`/`HeaderLink`/`FormattedDate`/placeholder images) is in scope as direct cleanup of what the migration touched, not a separate unrelated change.
- Adding `@tailwindcss/typography` now (rather than deferring again) is justified because the new build-log entry pages genuinely need working prose styling to render MDX content correctly.

### Risks

- `reference('projects')` only validates lazily, when something calls `getEntry()` on it — confirmed by testing (see Validation Status) — not at collection-definition time; a typo'd `project:` in future content won't be caught until something renders that entry.
- Phases 2-4 (visual components, agent interface, narrative) are designed but not yet built; the site is functional but the build-log entries are still plain MDX prose beyond the existing `TurtleTip`/Mermaid pattern.
- Only one project/entry exists so far; the index/timeline UI is unverified at higher content volume.

### Next Actions

See additions to `docs/next-actions.md`: confirm the narrative-direction default; Phase 2/3/4 work; route future build-log imagery through `src/assets`; human-review the live projects/timeline UI.

### Validation Status

- `npm run build`: passed; 6 pages + 2 static redirect stubs.
- Negative test: a deliberately typo'd `project:` reference caused `npm run build` to fail loudly (exit 1, "Entry projects → coderturtle-io-TYPO was not found") once a page actually resolved it via `getEntry()` — confirms `reference()` validation works as intended once exercised; reverted after confirming.
- Browser verification via Playwright across `/`, `/enter/`, `/about/`, `/projects/`, `/projects/coderturtle-io/`, `/projects/coderturtle-io/log/vibing-with-chatgpt/`, at 1280px and 390px, light and dark (24 combinations): all passed, zero horizontal overflow, zero console errors/warnings.
- Redirect check: `/blog/` and `/blog/vibing/` both resolve (via meta-refresh stub) to their new `/projects/...` URLs.
- Found and fixed during verification: Mermaid diagrams were rendering as plain syntax-highlighted code instead of actual diagrams — root cause was `astro.config.mjs`'s `markdown.syntaxHighlight: "shiki"` (string form) highlighting every fenced block, including ` ```mermaid `, before `astro-mermaid`'s rehype plugin could transform it; `excludeLangs` only takes effect on the object form of `syntaxHighlight`, not on `shikiConfig`. Fixed and reverified: both diagrams in the migrated entry now render as real SVG diagrams (confirmed via `astro-mermaid`'s own console logging and DOM inspection for `pre.mermaid svg`). This also surfaced a genuine content bug in the second diagram (a `Rel()` referencing an undeclared `Person` node), fixed in the migrated entry.
- This is a pre-existing bug, not a migration regression — Mermaid had likely never actually rendered anywhere on this site before; it was flagged as "actively used" by prior research based on the fenced-block syntax being present, but nobody had visually verified a rendered post page until this session.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-07-02 - Light-first, illustration-led brand redesign

### Changed Files

- `tailwind.config.js`: added `kraft`, `bark`, `parchment` color tokens; added `darkMode: "class"` (previously unset, which meant Tailwind defaulted to `media` strategy and the site's theme toggle never actually worked on any Tailwind-styled page).
- `src/components/marks/Gear.astro`, `Lightbulb.astro`, `Compass.astro`, `HexBolt.astro`: new reusable hand-drawn SVG mark kit derived from the shell tattoo motif.
- `src/pages/index.astro`: rebuilt the gateway as a warm, light-first, illustration-led hero (large turtle portrait instead of a small blob), replaced the dark ring/trace/scar gradient field with the mark kit, removed the three CSS-prop background "work turtles," made the gateway honor the site's theme toggle instead of being hardcoded dark-only.
- `src/layouts/BaseLayout.astro`: tightened the default meta description.
- `src/styles/global.css`: retuned shared component classes (header, nav, workbench panel, cards, tags) toward parchment/kraft surfaces; added `.log-hero`, `.log-grid`, `.log-section-heading`, `.lane-card-icon` component classes.
- `src/pages/enter.astro`: added mark-kit icons to the workshop lane cards; copy tweak away from "agentic engineering systems" framing.
- `src/pages/blog/index.astro`: rewritten onto the shared `note-grid`/`note-card` component classes (previously ad-hoc Tailwind utilities); added a leather-grimoire hero using `turtle-log.png`.
- `src/pages/about.astro`: replaced placeholder Lorem ipsum with real first-person Coderturtle-voice content; moved from the legacy `BlogPost` layout onto `BaseLayout`.
- `src/consts.ts`: tightened `SITE_DESCRIPTION` toward builder-workshop positioning.
- `docs/decisions.md`, `docs/next-actions.md`, `docs/project-walkthrough.md`: updated for the new brand direction.

### What Changed

A full design review found Coderturtle's gateway had converged visually with the sibling Agentic Tekton site (same dark full-viewport layout, pill Enter button, terminal-mono chrome, pulsing status pip), undermining the intended builder-vs-architecture split, and was badly underusing Coderturtle's strongest asset: the hand-drawn character illustration. The site was redesigned around a warm, light-first, illustration-forward workshop identity built on the existing Tailwind tokens plus new `kraft`/`bark`/`parchment` colors and a small hand-drawn SVG mark kit, while keeping the gateway→`/enter/` structural pattern and the dry cranky voice.

### Why It Changed

User requested a full design review of coderturtle.io with the explicit goal of giving it a unique brand and style distinct from Agentic Tekton (the thought-leader/architecture site). Direction was confirmed via four targeted questions: illustration-forward, keep the gateway pattern but change the skin, warm light-first default, keep the existing voice.

### Decisions Made

See `docs/decisions.md` 2026-07-02 entries: light-first illustration-led brand direction; drop the CSS-prop work turtles; real About page in the established voice.

### Assumptions Made

- Removing the three background "work turtles" is acceptable (they were a weak imitation of the real illustration); flagged in `next-actions.md` rather than silently assumed permanent.
- About page content describes the Coderturtle persona/practice and build principles rather than fabricating specific unverifiable personal biographical facts about the real person behind the site.
- This pass reuses existing illustration assets only; commissioning new art is a follow-up decision for the user.

### Risks

- `darkMode: "class"` is a behavior-affecting Tailwind config change: dark-mode styling on every Tailwind-driven page now depends on the `.dark` class instead of OS `prefers-color-scheme`. This is correct given the ThemeToggle component's actual implementation (it always toggled the class), but it means anyone who was relying on the old (broken) OS-driven behavior will see a change.
- Blog post detail pages (`src/pages/blog/[slug].astro`) use `prose`/`prose-invert` classes with no `@tailwindcss/typography` plugin installed; this pre-existing gap was not fixed in this pass (flagged in `next-actions.md`).
- The legacy `BlogPost`/`Header`/`Footer`/`BaseHead` scaffold is now fully unused (about.astro was its last consumer) but was not deleted in this pass.

### Next Actions

See additions to `docs/next-actions.md`: human-review the new gateway direction against the old one and against Agentic Tekton side-by-side; consider commissioning additional illustration variants; fix or remove the unused `prose` classes on blog posts; retire the unused legacy layout/component scaffold.

### Validation Status

- `npm run build`: passed; Astro generated 6 static pages; one pre-existing Browserslist-staleness warning, unrelated to this change.
- Browser verification via Playwright (Chromium, installed for this session) against `npm run dev` on `/`, `/enter/`, `/blog/`, `/about/`, at 1280px and 390px, light and dark: all 8 combinations passed with zero horizontal overflow and zero console errors/warnings.
- Found and fixed during verification: (1) the gateway hardcoded `body` text color, so dark mode left headline/nav text unreadably dark-on-dark — fixed by moving color onto the theme-aware `.turtle-gate` scope; (2) `tailwind.config.js` had no `darkMode` setting, so the theme toggle silently never worked on any Tailwind-styled page (only reflected OS preference) — fixed with `darkMode: "class"`. Both fixes reverified directly (computed-style checks + screenshots) after applying.
- Gateway interaction check: turtle click cycles through dry quotes, hover on workshop-path marks updates the readout, keyboard focus works; reduced-motion correctly suppresses the idle-wander/drag transform while leaving the quote/readout interactions intact.
- One environment artifact observed and ruled out as unrelated to the app: a small OS-level overlay (likely a macOS screen-recording/Control Center indicator) appeared in several full-page screenshots at a fixed screen position; confirmed via DOM scan that no `position: fixed` element in the page is responsible.
- Not fixed, noted for follow-up: the Turtle Log lists a leftover "Test Post" content entry (pre-existing test data, not introduced by this change).

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-06-28 - Existing project adoption

### Changed Files

- Added `.hekton/` governance and project metadata.
- Added `AGENTS.md`, `CLAUDE.md`, and `CODEX.md`.
- Added Hekton docs under `docs/`.
- Added reproducibility scripts under `scripts/`.
- Added `.env.example`.
- Added repo-local `mind-palace/` draft control-plane files.

### What Changed

Coderturtle.io was inspected in `/private/tmp/hekton-adoption/coderturtle.io`, cloned into `/Users/hekton/Development/hekton/factory-output/coderturtle.io`, classified as `factory-output`, and given Hekton adoption traceability.

### Why It Changed

The user requested switching to the coderturtle GitHub account and onboarding the coderturtle.io repo as a Hekton project.

### Decisions Made

- Classified the repo as `factory-output`.
- Preserved existing Git history.
- Kept product source, dependency manifests, lockfile, and deployment workflow behavior unchanged during adoption.
- Drafted repo-local mind-palace files instead of mutating the live vault.

### Assumptions Made

- The repo identity should be `coderturtle.io` even though GitHub resolves the repo to `coderturtle-blog`.
- The project is public and should use the `coderturtle` GitHub account.

### Risks

- Deployment config may need review against the desired custom domain.
- Tracked `.DS_Store` files remain for a follow-up hygiene commit.
- `npm ci` reported dependency audit findings that need separate review.

### Next Actions

- Review domain/base deployment settings.
- Remove tracked `.DS_Store` files in a dedicated hygiene commit.
- Run app build validation after dependencies are installed.

### Validation Status

- `./scripts/check-prereqs.sh --dry-run`: passed.
- `./scripts/verify-project.sh --dry-run`: passed.
- `just validate-reproducibility /Users/hekton/Development/hekton/factory-output/coderturtle.io`: passed.
- `just governance-check /Users/hekton/Development/hekton/factory-output/coderturtle.io`: passed with one expected warning for uncommitted adoption files.
- `just validate-taxonomy`: passed globally with existing warnings; coderturtle.io is not listed until live vault control-plane files are synced.
- `npm ci`: passed, with 26 audit vulnerabilities reported.
- `npm run build`: passed.

### Mind-Palace Updated

No. Repo-local mirror proposed only; live vault mutation requires explicit approval.

## 2026-06-28 - Homepage MVP design patch

### Changed Files

- `src/pages/index.astro`: redesigned the homepage around the Field Desk MVP concept.
- `src/layouts/BaseLayout.astro`: updated metadata, navigation, footer, and page shell.
- `src/components/ThemeToggle.astro`: replaced the server-side placeholder toggle with a small progressive-enhancement script.
- `src/styles/global.css`: added local font loading and homepage component styles.
- `tailwind.config.js`: added `paper` and `mist` colors and switched the default font stack toward local Atkinson fonts.
- `src/consts.ts`: updated site title and description.
- `docs/homepage-revamp-plan.md`: recorded assessment, variants, recommendation, plan, backlog, and infra handoff.
- `docs/decisions.md`, `docs/next-actions.md`, `docs/project-walkthrough.md`, `docs/session-log.md`: updated Hekton traceability.

### What Changed

Created an initial uncommitted homepage MVP patch that presents Coderturtle as the practical workshop voice of the Hekton ecosystem.

### Why It Changed

The user requested a product/design/front-end lane revamp for coderturtle.io while leaving infrastructure, GitHub Actions, S3, and CloudFront cleanup to a separate thread.

### Decisions Made

- Recommended the Field Desk variant as the MVP.
- Kept the implementation Astro-native and static-site friendly.
- Avoided new dependencies, CMS tooling, paid services, and infrastructure changes.

### Assumptions Made

- Existing blog routes should remain available.
- Labs and workshops can begin as homepage sections until real pages and content exist.
- Deployment config remains owned by the infra thread.

### Risks

- `astro.config.mjs` still needs infra review for the final `coderturtle.io` domain/base path.
- The About page still contains legacy placeholder content.
- Current npm audit findings remain out of scope for this product/design patch.

### Next Actions

- Review the homepage visually on desktop and mobile.
- Decide whether to keep this patch stacked on the adoption PR or wait until adoption merges.
- Replace placeholder About content in a follow-up product/content pass.

### Validation Status

- `npm run build`: passed.
- Browser desktop check at 1280px: passed; no console errors/warnings and no horizontal overflow.
- Browser mobile check at 390px: passed after wrapping the navigation; no console errors/warnings and no horizontal overflow.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-06-29 - Work-state turtle variant pass

### Changed Files

- `src/pages/index.astro`: added lightweight notebook, terminal, and lab-goggles CSS props to the background work turtles and gave each turtle a distinct dry status readout.
- `docs/decisions.md`, `docs/next-actions.md`, `docs/project-walkthrough.md`, `docs/session-log.md`: updated traceability for the work-state variant direction.

### What Changed

The background turtles now read as different Coderturtle work modes while still reusing the canonical turtle image. Field notes gets a notebook/pencil prop, Workbench gets a terminal prop, and Labs gets a goggles/status-light prop. Hovering or focusing each background turtle updates the readout with a more specific status line.

### Why It Changed

The user approved making the background turtles feel like different interactive work-state variants without adding heavy custom image assets yet.

### Decisions Made

- Keep variant treatment CSS-only for now.
- Preserve the central turtle as the clean canonical logo.
- Use the variant turtles as subtle background affordances rather than major navigation cards.

### Assumptions Made

- CSS-drawn props are sufficient for the MVP visual test.
- Custom transparent PNG variants can be considered later if this direction survives human review.

### Risks

- The tiny props may be too subtle or too visually busy depending on final viewport and display.
- Future generated/hand-drawn variants would need asset review so they do not drift away from the main Coderturtle mark.

### Next Actions

- Human-review the live gateway and decide whether CSS props are enough or custom variant assets are worth producing.
- Decide whether hover status lines should become a reusable Coderturtle voice pattern.

### Validation Status

- `npm run build`: passed.
- `git diff --check`: passed.
- Source scan confirmed the variant classes, work status copy, and prop elements are present in `src/pages/index.astro`.
- Browser desktop check passed: three variant turtles render with visible prop overlays, no horizontal overflow, and hover updates the readout to `Documenting the part that broke twice.`
- Browser mobile check passed at 390x844: work turtles are hidden, the headline remains visible, and no horizontal overflow appears.
- Browser console check passed: no warnings or errors.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-06-29 - Turtle motion and work-turtle pass

### Changed Files

- `src/pages/index.astro`: removed the central turtle white scar overlays, added slow idle motion, and added subtle background work turtles for Field notes, Workbench, and Labs.
- `docs/decisions.md`, `docs/next-actions.md`, `docs/project-walkthrough.md`, `docs/session-log.md`: updated traceability for the clean turtle and supporting work-turtle direction.

### What Changed

The main gateway turtle now stays visually clean while moving gently on its own. It still supports click quotes, pointer drag, and keyboard nudging. Smaller muted turtles now sit in the workshop field to imply multiple Coderturtle work streams without replacing the primary mark.

### Why It Changed

The user asked to remove the white lines from the central turtle, make it move around, and consider additional turtles that denote working on different things.

### Decisions Made

- Keep the primary turtle/logo clean and expressive rather than adding overlay scars.
- Use motion and dry quotes for personality.
- Add three supporting work turtles as subtle background markers, not as equal-weight navigation cards.

### Assumptions Made

- Three work turtles are enough to show activity without overcrowding the gateway.
- Supporting turtles should be hidden on small screens until a dedicated mobile treatment is designed.

### Risks

- The extra turtles may feel too busy after human review.
- Direct narrow-viewport browser verification was limited because the in-app browser wrapper did not expose viewport resizing and the local Playwright browser binary was not installed.

### Next Actions

- Human-review the gateway live and decide whether to keep three supporting turtles, reduce them, or make them richer work-state interactions.
- Re-run narrow mobile visual QA when a viewport-capable browser runner is available.

### Validation Status

- `npm run build`: passed.
- `git diff --check`: passed.
- Source scan confirmed `src/pages/index.astro` has no central `emblem-scar` overlays and no root-gateway references to Hekton, Agentic Tekton, Gremlins, or the wider ecosystem.
- Browser desktop check passed: no horizontal overflow, central scar count is zero, work turtles render, turtle idle transform changes over time, and click quotes appear.
- Browser console review found only expected Vite debug messages and the existing Astro Mermaid "No mermaid diagrams found" log.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-06-29 - Gateway style reconsideration

### Changed Files

- `src/pages/index.astro`: simplified the root gateway from an orbit/map composition into a calmer Coderturtle workshop doorway.
- `docs/decisions.md`: recorded the style decision to support the turtle/logo with quieter surrounding UI.
- `docs/project-walkthrough.md`: updated the plain-English gateway description.
- `docs/next-actions.md`: added human review of the calmer workshop-doorway direction.
- `docs/session-log.md`: appended this session summary.

### What Changed

The root gateway now leads with `Coderturtle.` as the primary brand signal, keeps the interactive turtle/logo as the focal point, and moves Field notes, Workbench, Labs, and The builder into a compact workshop-path rail below the Enter action. Background shell traces remain, but they are dimmer and more atmospheric instead of acting like a busy control-panel map.

### Why It Changed

The user liked the turtle/logo but wanted to rethink the rest of the gateway style and approach.

### Decisions Made

- Preserve the interactive turtle/logo and dry quote behavior.
- Replace floating workshop labels with a calmer inline rail.
- Make the gateway headline the brand name rather than an action phrase.
- Keep the root gateway Coderturtle-only and leave wider ecosystem context on `/enter/`.

### Assumptions Made

- The right direction is less sci-fi/dashboard and more weathered workshop doorway.
- The compact rail is still useful for wayfinding without making the gateway feel like a map.

### Risks

- The new calmer composition may feel less overtly interactive until users notice the turtle and rail hover states.
- The exact copy and label set still needs human visual and brand review.

### Next Actions

- Human-review the calmer gateway against the previous orbit/map-style version.
- Decide whether the footer/status line should stay or be simplified further.

### Validation Status

- `npm run build`: passed; Astro generated 6 static pages.
- `git diff --check`: passed.
- Source scan for `src/pages/index.astro`: passed; no Hekton, Agentic Tekton, Gremlins, Tekton, ecosystem, or agentic terms remain.
- Browser desktop check for `/`: passed; no horizontal or vertical overflow, no forbidden ecosystem terms, compact rail renders with Field notes / Workbench / Labs / The builder.
- Browser turtle quote check for `/`: passed; quote appears with no overflow.
- Browser mobile check for `/`: passed at 390x844 after reducing mobile headline scale; no horizontal or vertical overflow and quote does not overlap the headline.
- Browser console check for `/`: passed; no warnings or errors captured.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-06-29 - Coderturtle-only gateway boundary

### Changed Files

- `src/pages/index.astro`: removed root gateway references to Hekton, Agentic Tekton, Gremlins, the wider ecosystem, and agentic framing; replaced the traced labels with Coderturtle-specific workshop marks for Field notes, Workbench, Labs, and The builder.
- `docs/decisions.md`: recorded the decision that named ecosystem references belong on `/enter/` and deeper pages, not the gateway.
- `docs/project-walkthrough.md`: updated the plain-English explanation of the root gateway and `/enter/` boundary.
- `docs/next-actions.md`: added a follow-up to review `/enter/` as the intentional home for ecosystem references.
- `docs/session-log.md`: appended this session summary.

### What Changed

The root gateway is now all Coderturtle: shell, workbench, field notes, labs, dry quotes, and practical engineering scars. The wider Hekton / Agentic Tekton / Gremlins context remains available inside the main `/enter/` experience.

### Why It Changed

The user asked to keep references to Agentic Tekton, Hekton, and related projects on the main site and make the gateway page all about the Coderturtle brand.

### Decisions Made

- Keep `/` as a focused Coderturtle brand gateway.
- Keep `/enter/` as the place where the broader ecosystem map can appear.
- Preserve the interactive turtle behavior while removing ecosystem-specific wording from the root page.

### Assumptions Made

- "Main site" refers to the `/enter/` workbench page and deeper content routes, not the first gateway screen.
- Coderturtle-specific sections can link into `/enter/` as long as the gateway labels themselves stay brand-native.

### Risks

- Some older decision-log entries still describe prior gateway experiments for historical traceability; the 2026-06-29 decision supersedes the named-ecosystem-label approach for `/`.

### Next Actions

- Review `/enter/` to make sure the broader ecosystem references are clear and intentional there.
- Human-review whether Field notes, Workbench, Labs, and The builder are the right four gateway labels.

### Validation Status

- `npm run build`: passed; Astro generated 6 static pages.
- `git diff --check`: passed.
- Source scan for `src/pages/index.astro`: passed; no Hekton, Agentic Tekton, Gremlins, Tekton, ecosystem, or agentic terms remain.
- Browser desktop check for `/`: passed; rendered page has no named ecosystem references, node labels are Coderturtle-specific, links resolve to `/blog/`, `/enter/#workbench`, `/enter/#labs`, and `/about/`, and no overflow appears.
- Browser turtle interaction check for `/`: passed; quote click still works and does not introduce named ecosystem references.
- Browser mobile check for `/`: passed at 390x844; no named ecosystem references, no horizontal or vertical overflow, desktop nodes hidden.
- Browser console check for `/`: passed; no warnings or errors captured.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-06-28 - Interactive turtle quote pass

### Changed Files

- `src/pages/index.astro`: made the central turtle an accessible interactive control with click/tap quotes, pointer dragging, keyboard arrow nudging, quote bubble styling, mobile-safe placement, and reduced-motion handling.
- `docs/decisions.md`: recorded the decision to treat the central turtle as a resident expert interaction.
- `docs/project-walkthrough.md`: explained the interactive turtle behavior in plain English.
- `docs/next-actions.md`: added human review of the turtle quote set and possible voice-library expansion.
- `docs/session-log.md`: appended this session summary.

### What Changed

The gateway turtle now feels more alive. Visitors can click or tap it for dry engineering remarks, briefly drag it around before it springs back, or focus it and use arrow keys to nudge it. The quote bubble avoids the mobile headline and stays out of the page layout.

### Why It Changed

The user asked to make the central turtle more interactive, with possible movement and dry quotes when clicked.

### Decisions Made

- Keep the turtle interaction dependency-free and local to the gateway page.
- Use a real `button` for the turtle so the interaction is keyboard-accessible.
- Keep drag movement temporary and bounded so it adds personality without destabilizing the gateway composition.
- Place mobile quotes above the turtle after screenshot review showed below-turtle placement overlapped the headline.

### Assumptions Made

- The current dry quote set is a starting voice sample, not final brand canon.
- The interaction should add charm without requiring instructions on the page.

### Risks

- The quote set may need human tuning to keep the tone dry and expert without feeling too snarky.
- Drag behavior is intentionally lightweight; deeper animation physics would add complexity and should wait for a later polish pass.

### Next Actions

- Human-review the turtle quote set.
- Decide whether the same resident-expert voice should appear on `/enter/` or only on the gateway.

### Validation Status

- `npm run build`: passed; Astro generated 6 static pages.
- `git diff --check`: passed.
- Browser desktop check for `/`: passed; turtle is a `button`, click/tap reveals quotes, keyboard arrow nudging updates turtle offsets, and no horizontal or vertical overflow appears.
- Browser drag check for `/`: passed; pointer dragging returns the turtle to origin without changing the quote unexpectedly or causing overflow.
- Browser mobile check for `/`: passed at 390x844; quote bubble appears above the turtle, does not overlap the headline, and causes no horizontal or vertical overflow.
- Browser console check for `/`: passed; no warnings or errors captured.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-06-28 - Scarred-shell gateway personality pass

### Changed Files

- `src/pages/index.astro`: strengthened the root gateway with a scarred turtle/shell emblem, intertwined ecosystem trace lines, project labels placed on the traces, compact responsive layout rules, and a more robust pointer readout interaction.
- `docs/decisions.md`: recorded the scarred-shell gateway personality decision.
- `docs/project-walkthrough.md`: updated the plain-English explanation of the gateway direction.
- `docs/next-actions.md`: added human visual/tone review for the durable Coderturtle voice.

### What Changed

The root gateway now emphasizes Coderturtle as the battle-scarred, cranky-but-useful engineer voice of the Hekton ecosystem. Hekton, Agentic Tekton, Gremlins, and Field notes are presented as labels attached to the intertwined shell traces rather than separate objects around the outside.

### Why It Changed

The user asked to accentuate the turtle theme and cranky battle-scarred expert engineer theme, and to show the related projects as connected ecosystem elements on the intertwining lines.

### Decisions Made

- Keep the gateway dependency-free with CSS and a small inline progressive-enhancement script.
- Use "Enter the scarred shell" as the root gateway headline.
- Hide the longer explanatory hint on short desktop viewports so the gateway remains a true first-viewport experience.
- Keep ecosystem labels visible on desktop and hide them on narrow mobile while preserving the shell trace texture.

### Assumptions Made

- The current turtle logo assets remain acceptable source imagery for the gateway emblem.
- The stronger cranky/expert tone is appropriate for Coderturtle but should still receive human visual review before treating it as permanent brand canon.

### Risks

- The scar/eye overlays are CSS treatments on existing imagery; future custom illustration could make the motif more polished.
- The working tree still contains concurrent infra-thread changes that are not owned by this product/design lane.

### Next Actions

- Human-review the scarred-shell gateway tone and visual composition.
- Decide whether the workbench `/enter/` page should adopt more of the same scarred-shell personality.

### Validation Status

- `npm run build`: passed; Astro generated 6 static pages from the root-domain config.
- `git diff --check`: passed.
- Browser desktop check for `/`: passed at 1280x720; no horizontal or vertical overflow, ecosystem labels visible on trace field, root links resolve to `/enter/` and `/blog/`.
- Browser interaction check for `/`: passed; pointer movement updates shell depth variables and hovering Agentic Tekton updates the readout.
- Browser mobile check for `/`: passed at 390x844; no horizontal or vertical overflow, decorative trace field remains visible, desktop ecosystem labels are hidden.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-06-28 - AWS static-site infrastructure path

### Changed Files

- Added `infra/aws-static-site/` with Terraform, deployment manifest, tfvars example, and local ignore rules.
- Replaced the earlier v2 deploy candidate with `.github/workflows/deploy-aws-static-site.yml`.
- Added `docs/decisions/ADR-0002-github-pages-vs-aws-static-site.md`.
- Updated deployment, architecture, migration, runbook, backlog, status, risk, walkthrough, handoff, and project metadata docs.
- Updated repo-local `mind-palace/` mirror files only.

### What Changed

Coderturtle.io moved from "investigate AWS" to "use AWS static-site hosting for production." The repo now contains the Hekton AWS static-site pattern for private S3, CloudFront, ACM, Route 53, and GitHub Actions OIDC deployment.

### Why It Changed

The user confirmed the site should not stay on GitHub Pages and asked to use the static-site workflow and Infrastructure Gremlin pattern to create the AWS infrastructure path.

### Decisions Made

- Use AWS static-site hosting as the production target.
- Keep Terraform apply human-gated through the Infrastructure Gremlin workflow.
- Keep deploy IAM documented/manual for now because IAM mutation is a gremlin stop condition.
- Keep GitHub Pages as a temporary legacy workflow until AWS deployment is verified.
- Record a reusable GitHub Pages vs AWS decision rule for future Hekton static sites.

### Assumptions Made

- `eu-west-2` is the preferred default region for the S3 origin bucket.
- `coderturtle.io` and `www.coderturtle.io` should be served by the same CloudFront distribution.
- Route 53 will manage DNS for the production domain, but the hosted zone ID still needs confirmation.

### Risks

- Terraform has not been planned or applied yet.
- Route 53 hosted zone ID, final bucket name, CloudFront distribution ID, ACM output, and OIDC role ARN remain pending.
- The working tree also contains concurrent homepage/design changes owned by the design lane.

### Next Actions

- Fill local Terraform tfvars after confirming Route 53 hosted zone ID and bucket name.
- Run Infrastructure Gremlin preflight and Terraform plan.
- Human-review and apply the Terraform plan.
- Configure GitHub OIDC role and repository variables.
- Run the AWS deploy workflow in dry-run mode, then real deploy after review.

### Validation Status

- `git diff --check`: passed.
- `./scripts/verify-project.sh --dry-run`: passed.
- `terraform fmt -check -recursive infra/aws-static-site/terraform`: passed.
- `npm run build`: passed, with a Browserslist stale-data warning.

### Mind-Palace Updated

No live vault mutation. Repo-local mirror updated only.

## 2026-06-28 - Coderturtle gateway page

### Changed Files

- `src/pages/index.astro`: converted the root page into a full-viewport Coderturtle gateway.
- `src/pages/enter.astro`: added the workbench homepage at `/enter/`.
- `src/layouts/BaseLayout.astro`: updated workbench/ecosystem nav anchors to point at `/enter/`.
- `docs/decisions.md`, `docs/next-actions.md`, `docs/project-walkthrough.md`, `docs/session-log.md`: updated traceability for the gateway pattern.

### What Changed

Created a Coderturtle-flavored gateway page similar to the adjacent ecosystem sites, with one primary Enter action and a static shell/workshop visual field.

### Why It Changed

The user asked for a gateway page similar to the other sites while leaning into the Coderturtle brand and style.

### Decisions Made

- Use `/` as the gateway and `/enter/` as the richer homepage/content hub.
- Keep the gateway dependency-free and static-site friendly.
- Avoid infrastructure changes; deployment routing assumptions remain for the infra thread.

### Assumptions Made

- Existing blog and about routes should remain unchanged.
- The gateway should be visually related to Hekton/Agentic Tekton gateway pages without copying their exact visual system.

### Risks

- The `base` setting still means local generated paths include `/coderturtle-blog/` until the infra thread resolves the S3/CloudFront deployment config.

### Next Actions

- Validate `/` and `/enter/` on desktop and mobile.
- Decide whether future Labs and Workshops pages should replace or supplement `/enter/`.

### Validation Status

- `npm run build`: passed; Astro generated 6 pages including `/` and `/enter/`.
- Browser desktop check for `/`: passed; Enter link points to `/enter/`, no console warnings/errors, no horizontal overflow.
- Browser desktop check for `/enter/`: passed; workbench nav anchors point to `/enter/#workbench` and `/enter/#ecosystem`, no console warnings/errors, no horizontal overflow.
- Browser mobile check for `/`: passed at 390px; decorative shell field is disabled on mobile, no console warnings/errors, no horizontal overflow.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.

## 2026-06-28 - Gateway root URL and interaction pass

### Changed Files

- `astro.config.mjs`: changed the Astro site config to `https://coderturtle.io/` and removed the old `/coderturtle-blog/` base path.
- `src/pages/index.astro`: upgraded the gateway with interactive ecosystem nodes, pointer-reactive shell depth, animated rings, a live readout, and stronger Coderturtle visual flavor.
- `docs/decisions.md`, `docs/project-walkthrough.md`, `docs/session-log.md`: updated traceability for the root-url and interaction decisions.

### What Changed

The gateway now builds for the root URL and has lightweight progressive-enhancement interactions that make the ecosystem feel more alive without adding dependencies.

### Why It Changed

The user asked to stop using the `/coderturtle-blog` path and to make the gateway pop more while still fitting the Agentic Tekton universe.

### Decisions Made

- Serve Coderturtle from `/` rather than the old GitHub Pages project base path.
- Keep interactivity local to small inline JavaScript and CSS transitions.
- Hide decorative interaction layers on mobile to preserve robustness and avoid horizontal overflow.

### Assumptions Made

- S3/CloudFront will serve Coderturtle from the domain root.
- The infra thread will align any cache and routing behavior with the root build.

### Risks

- Existing GitHub Pages deployment assumptions are no longer valid for the app config.
- The broader repo still contains concurrent infra-thread changes not owned by this product/design lane.

### Next Actions

- Validate `/` and `/enter/` locally after the root-url change.
- Have the infra thread confirm CloudFront default root object and asset cache behavior.

### Validation Status

- `npm run build`: passed; Astro generated 6 pages from the root-domain config.
- Browser desktop check for `/`: passed; page loads at `/`, Enter points to `/enter/`, Notes points to `/blog/`, no console warnings/errors, no horizontal overflow.
- Browser interaction structure check: ecosystem nodes are real focusable links, hit-testing lands on the `Hekton` node, and pointer movement updates gateway depth variables.
- Browser mobile check for `/`: passed at 390px; decorative shell field is disabled on mobile, no console warnings/errors, no horizontal overflow.

### Mind-Palace Updated

No. Live vault mutation is not approved; repo-local docs only.
