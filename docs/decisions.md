# Decisions

Append-only decision log for Coderturtle.io.

## 2026-06-28 - Adopt as Hekton factory output

Coderturtle.io is classified as a `factory-output` project because it is a public website/blog deliverable maintained by the factory. It is not shared Hekton machinery and does not have a lab-style promotion target.

## 2026-06-28 - Preserve existing Git history

The repo was cloned from GitHub and kept as a normal Git repository rather than being re-created from a new scaffold. Adoption adds Hekton metadata and docs only; product behavior, dependency versions, and source files remain unchanged.

## 2026-06-28 - Keep live vault mutation disabled

The project proposes `20-projects/factory-output/coderturtle.io` as its mind-palace path, but this adoption session does not write to the live Obsidian vault. Repo-local `mind-palace/` files are the draft control plane until the user approves a sync.

## 2026-06-28 - Use Field Desk as homepage MVP

The homepage revamp will use the Field Desk concept: a static, fast, workshop-like homepage that presents Coderturtle as the hands-on notes/labs/workshops voice of the wider Hekton, Agentic Tekton, and Gremlins ecosystem. This keeps the site personal and practical while avoiding a corporate landing-page feel or a complex CMS.

## 2026-06-28 - Use a gateway front door

Coderturtle.io will follow the gateway pattern used by adjacent ecosystem sites: `/` is a full-viewport front door and `/enter/` contains the richer workbench-style homepage. The gateway leans into Coderturtle's shell/workshop identity while keeping the implementation static and dependency-free.

## 2026-06-28 - Serve from the domain root

Coderturtle.io should build for the canonical root URL, not the old GitHub Pages project path. Astro now uses `site: "https://coderturtle.io/"` with no `base` override, so generated links and assets resolve from `/`.

## 2026-06-28 - Use AWS static-site hosting for production

Coderturtle.io should move to the Hekton AWS static-site pattern for production: private S3 origin, CloudFront, ACM, Route 53, GitHub Actions OIDC, and human-gated Terraform apply. GitHub Pages remains only as the legacy path until AWS deployment is verified.

## 2026-06-28 - Standardize GitHub Pages vs AWS deployment choice

GitHub Pages is appropriate for lightweight previews, docs, examples, and low-risk static sites. AWS static-site hosting is the default for durable Hekton factory-output sites, branded public surfaces, first-class custom domains, private origins, explicit cache policy, CloudFront invalidation, and protected production deploys.

## 2026-06-28 - Emphasize scarred-shell gateway personality

The root gateway should make Coderturtle feel like the hands-on, battle-scarred engineer voice of the ecosystem rather than a generic brand portal. The turtle/shell mark, scar lines, cranky workbench copy, and Hekton / Agentic Tekton / Gremlins / Field notes labels now live on the intertwined trace field to show they are connected parts of one ecosystem.

## 2026-06-28 - Make the central turtle interactive

The root gateway turtle should behave like a small resident expert rather than a static badge. The central turtle is now an accessible button that can produce dry engineering quotes, be dragged briefly with pointer input, and be nudged with keyboard arrows. The interaction remains progressive-enhancement only, dependency-free, and respectful of reduced-motion settings.

## 2026-06-29 - Keep root gateway Coderturtle-only

The root gateway should be all about the Coderturtle brand and character: shell, workbench, field notes, labs, dry quotes, and practical engineering scars. Named references to Hekton, Agentic Tekton, Gremlins, and the wider ecosystem belong on `/enter/` and deeper pages after the visitor chooses to enter the site.

## 2026-06-29 - Simplify gateway into a workshop doorway

The root gateway should not feel like a technical map or control panel. The turtle/logo is the strongest brand asset, so the surrounding page should support it with a quieter scarred-shell atmosphere, the `Coderturtle.` brand headline, and a compact workshop-path rail rather than floating orbit labels.

## 2026-06-29 - Keep the main turtle clean and alive

The central turtle/logo should remain visually intact without extra white scar overlays. Motion now comes from the turtle itself: a slow idle wander, pointer drag, keyboard nudging, and dry quote clicks. Smaller background turtles can denote work happening across Field notes, Workbench, and Labs, but they should stay subtle so the main Coderturtle mark remains the focal point.

## 2026-06-29 - Use lightweight work-state turtle variants

The background turtles should feel like Coderturtle is working on different things without requiring new bitmap assets. Field notes, Workbench, and Labs now use the same turtle image with small CSS-drawn props and distinct dry status readouts. This keeps the page fast, static-site friendly, and easy to tune before commissioning or generating custom image variants.

## 2026-07-02 - Give Coderturtle a light-first, illustration-led brand distinct from Agentic Tekton

A full design review found that Coderturtle's dark, mono-chrome, radial-gradient gateway was structurally and visually converging with Agentic Tekton's own dark gateway (same full-viewport layout, pill "Enter" button, pulsing status pip, terminal-mono chrome), undermining the intended "builder workshop" vs. "architecture/thought-leadership" split. It also badly underused Coderturtle's strongest asset: the hand-drawn cranky inventor-turtle illustration and the leather "Turtle Log" grimoire art, both of which were shrunk into small blobs behind generic CSS gradients.

Coderturtle now leads with a warm, **light-first** palette (paper/parchment/kraft, driven by the existing Tailwind tokens plus new `kraft`, `bark`, and `parchment` colors), an **illustration-forward** hero that shows the turtle portrait at real size, and a small reusable hand-drawn SVG mark kit (gear, lightbulb, compass, hex-bolt) derived from the shell's tattoo motif, replacing the old ring/trace/scar gradient field. Dark mode remains available via the existing theme toggle, which the gateway now honors (previously it was hardcoded dark-only and bypassed the toggle). The gateway → `/enter/` structural pattern is kept for ecosystem consistency; only the skin changed.

## 2026-07-02 - Drop the CSS-prop background work turtles

The three background "work turtle" elements (tiny duplicated logo images with CSS-drawn notebook/terminal/goggles props) were removed. They were a weak imitation of the actual illustration; the new mark kit and the full-size hero portrait carry that job better.

## 2026-07-02 - Write a real About page in the established voice

Replaced the placeholder Lorem ipsum About page with first-person content in Coderturtle's dry, practical voice: what the site is, a few build principles, and links into the log/workbench. Moved `/about/` off the legacy `BlogPost` layout onto the shared `BaseLayout` so it matches the rest of the site's design system.

## 2026-07-02 - Replace the blog with a projects + build-logs content model

Coderturtle should speak through real projects and their honest build logs rather than a generic blog, because a blog format-overlaps with Agentic Tekton's editorial/thought-leadership site. `projects` and `logs` are now separate content collections (`src/content.config.ts`), linked by a validated `reference('projects')` field. Projects are the primary navigational unit at `/projects/`; each project's build log is a timeline of entries at `/projects/<slug>/log/<entry>/`. `/blog/` is retired to redirects (`/blog/` → `/projects/`, and the one real post's URL to its new entry URL) rather than repurposed, to keep the two sibling sites unambiguously distinct.

## 2026-07-02 - Migrate real content instead of leaving it as legacy

The one existing real post (`vibing.mdx`, "Vibing with ChatGPT") was migrated into the new model as the first build-log entry of a new "Coderturtle.io" project, rather than left behind under the old collection. It already uses `TurtleTip` callouts and `astro-mermaid` diagrams, so migrating it validated the new component/rendering path with real content on day one instead of a placeholder.

## 2026-07-02 - Default the human-agent narrative to documentary, not fiction

The planned "cranky engineer learning to work with hybrid human-agent teams" narrative thread will proceed as a documentary account of this project's own real build logs, kept deliberately separate from the similar-sounding "gremlin coworkers" fiction already developing in `hekton-field-journal`/`tekton-chronicle`. This default was not confirmed by the user (a direct question went unanswered); flagged in `next-actions.md` for override before the narrative content pass (Phase 4) begins.

## 2026-07-02 - Replace the reused-portrait placeholders with real worker-turtle art

User supplied three real illustrations (`lab-turtle.png`, `project-turtle.png`, `workshop-turtle.png`) purpose-built for the three workshop-floor roles, resolving the placeholder flagged since the interactive-workshop pass. They're in a different illustration style from Coderturtle's own portrait — clean flat-vector "mascot" art with solid white backgrounds, versus the master turtle's textured hand-drawn look — and no attempt was made to paper over that: the existing card framing (already used for the master turtle and, before this, the reused-placeholder workers) reads the white-background photos as intentional "ID badge" portraits rather than a mismatch, and the style contrast between a weathered master turtle and three shinier junior specialists actually reinforces the "master supervises the floor" premise already built into the scene, rather than undermining it. No CSS changes were needed.

Routed the new images through `astro:assets`/sharp (`src/assets/turtles/`) rather than dropping them in `public/` — real win here, not just following convention: each source PNG was 1.7–1.9MB, optimized down to a handful of responsive WebP variants topping out around 130KB.

## 2026-07-02 - Ship Phase 4: the about/manifesto tie-in

User confirmed the earlier default: the narrative stays documentary and fully separate from `hekton-field-journal`/`tekton-chronicle`'s gremlin fiction. With that settled, and with `.hekton/change-log.yaml` containing only the original adoption entry (nothing yet worth curating into `changeRefs`), the concrete, well-scoped remainder of Phase 4 was the "about/manifesto tie-in" named in the original plan: a new section on `/about/` ("An agent does some of the typing. The turtle still owns it.") that states the human-agent collaboration and the log's honesty commitment directly, in the new voice, rather than leaving it implied by the build-log entries alone. This closes out the original four-phase content-architecture plan in full.

## 2026-07-02 - Adopt Coding Horror + cranky-engineer as the durable Coderturtle voice

User asked to set the style globally for Coderturtle content: dry Coding-Horror-style humor (blunt, self-deprecating, anecdote-driven, allergic to hype language) paired with the already-established cranky battle-scarred expert engineer persona. Recorded as `docs/voice-guide.md`, following this ecosystem's existing precedent of a dedicated voice/style-brief doc per project (Agentic Tekton has `docs/design-brief.md`; hekton-field-journal has its own style guide). Worth noting: Agentic Tekton's own voice guide *also* cites Coding Horror, alongside a Phoenix Project narrative register — this isn't accidental convergence or copying, the guide explicitly addresses it: both sites share the Coding Horror reference but not the job (Agentic Tekton writes for architects, Coderturtle narrates as the engineer who was in the room).

Deliberately did **not** retroactively rewrite `0001-vibing-with-chatgpt.mdx` to match — that entry predates the guide and is left as an accurate record of the voice at the time, consistent with the project's own stated promise that the build log isn't staged after the fact. The guide governs new content going forward; demonstrated immediately in `0003-cogs-tilt-and-a-terminal-that-talks-to-agents.mdx`.

## 2026-07-02 - Ship Phase 3: the agent-facing interface

Built the last piece of the earlier-approved content-architecture plan that wasn't yet done: `/llms.txt` (`src/pages/llms.txt.ts`), `/projects/index.json` (`src/pages/projects/index.json.ts`), and `/projects/<slug>.json` (`src/pages/projects/[slug].json.ts`), all build-time generated from the `projects`/`logs` collections so they can't drift from what the site shows. `llms.txt` follows the emerging convention: a plain-text index with a positioning paragraph, a project list, recent build-log entries, links to the JSON/RSS/sitemap mirrors, and an explicit provenance note that `.hekton/` internal data is intentionally not served.

Verification surfaced a real routing quirk worth recording: `npm run dev` 404s on `/projects/<slug>.json` (no trailing slash) despite `trailingSlash: "always"` correctly exempting the *static* `index.json.ts` endpoint the same way it exempts the existing `rss.xml.js`. Before treating this as a bug to fix, checked it against `npm run preview` (which serves the actual static `dist/` output, closer to how the eventual S3/CloudFront production target will serve it) — the no-slash URL returns 200 with the correct `Content-Type` there. The dev server's SSR-style route rewriting applies trailing-slash redirect logic to dynamic endpoint routes that the static build output itself doesn't need. No code change made; documented here so it isn't "fixed" again by someone testing only against `astro dev`.

## 2026-07-02 - Ship Phase 2: visual build-log components

User confirmed the design work so far as "phase 1" and picked "visual build-log components" (Phase 2 of the earlier-approved content-architecture plan) as the next focus. Built four MDX-embeddable components in `src/components/log/`: `TerminalBlock` (macOS-style transcript block), `DiffBlock` (+/- line rendering), `Screenshot` (astro:assets `Image` in a framed card with native-`<dialog>` zoom-on-click), and `BeforeAfter` (range-slider comparison via `clip-path`). All four accept content as string/image props rather than slotted MDX children, specifically to avoid MDX's markdown-reflow collapsing whitespace in terminal/diff content — and all four carry a `not-prose` class on their root element so Tailwind Typography's `.prose pre/code/img` defaults (backtick pseudo-content on inline code, default pre styling, etc.) don't fight the custom styling once nested inside `.log-entry-prose`.

Demonstrated all four with genuine content rather than placeholders: captured real light/dark and workshop-floor screenshots via Playwright (optimized automatically by `astro:assets`/sharp, e.g. 468KB→41KB), and wrote a second build-log entry ("The dark reset: rejecting the schematic pass") that documents today's actual design pivot using a real terminal transcript from the reference-validation test, the real `astro.config.mjs` diff that fixed the Mermaid theming bug, and a real before/after of the gateway's light/dark toggle states. Verified interactions directly (dialog open/close, slider `clip-path` update, diff line counts matching source) rather than trusting a static screenshot.

## 2026-07-02 - Make the workshop floor genuinely dimensional and interactive

User confirmed Hekton's real URL (`https://hekton.theagentictekton.com`) — now a real outbound link on `/ecosystem/` alongside Agentic Tekton, leaving only Gremlins as "coming soon." Separately, the user said `/enter/` "still feels very 2 dimensional" and asked for more visual/interactive quality. Rather than another guess-and-show pass, invested in concrete, well-understood techniques that directly answer "2D": each worker station now tilts in real 3D (`perspective`/`rotateX`/`rotateY` following the pointer within the card, reset on leave) instead of just a flat hover color change; the single static connecting line was replaced with a real bus-and-drop-line diagram from the master turtle to all three workers, with the specific line to whichever worker is hovered/focused glowing and animating a traveling pulse; each worker got its own idle pulsing status pip (staggered timing) so the scene reads as "alive" independent of interaction; the master turtle gained the same drag/keyboard-nudge interaction the gateway turtle has, for tactile parity between the two pages' hero characters.

Hit the same Astro scoping bug a third time and generalized the lesson: any CSS that styles the *root element of an imported component* (an SVG mark, in this and the two prior cases) must live in `global.css`, never in the consuming page's scoped `<style>` block, because Astro's per-file style scoping doesn't propagate into a child component's own render output.

## 2026-07-02 - Interactive workshop scene + dedicated /ecosystem/ page

The user's follow-up feedback on `/enter/` was concrete: make it a genuinely interactive workshop with a labs turtle, a projects turtle, and a workshops turtle, all supervised by the master turtle (Coderturtle); keep Projects and Ecosystem content off the main page entirely; and give Ecosystem its own page showing the workshop floor as one cog in the wider machine, clicking out to the real Hekton/Agentic Tekton/Gremlins sites.

Implemented: the old static "workshop floor" placeholders and the plain Projects/Labs/Workshops lane-card grid were both replaced by one interactive scene on `/enter/` — a master station (Coderturtle, click for a supervisor-themed quote, distinct from the gateway's engineering quotes) with three worker stations below it (Projects/Labs/Workshops, each reusing the single portrait image with a category badge from the existing mark kit). Projects links to the real `/projects/`; Labs and Workshops have no page yet, so they're buttons with an honest "still being built" readout rather than dead links. The ecosystem-section (Hekton/Agentic Tekton/Coderturtle/Gremlins cards) was moved off `/enter/` entirely onto a new `/ecosystem/` page, which frames the same four entities as interlocking cogs: a central Coderturtle hub cog with three outer cogs. **Checked the repo/docs for real external URLs before linking out** rather than guessing: Agentic Tekton is confirmed live at `https://theagentictekton.com` (explicit "Live at" statement in its own session-log) and is a real clickable outbound link; Hekton's only documented URL was an unconfirmed "intended" target and Gremlins (`veilgremlin`) has no site at all and is marked internal-only, so both are shown as "coming soon" rather than risking wrong or dead links. A clarifying question about this went unanswered; proceeded with this evidence-based default.

Along the way, hit and fixed the same Astro scoping bug twice: styling passed as a `class` prop to an imported mark component (`<Gear class="..." />` etc.) does not receive the parent page's scoped-style attribute, because Astro's per-file CSS scoping only reaches elements written directly in that file, not a child component's own root element. Both `.worker-badge` (workshop stations) and `.cog-icon`/`.cog-icon-hub` (ecosystem page) had to move to `global.css` instead of the page's local `<style>` block to actually apply. Worth remembering for any future page that styles a mark component directly rather than through an already-global class.

## 2026-07-02 - Remove the cross-project build-log feed from /enter/

The user confirmed the gateway direction but said `/enter/` "still doesn't land," and gave one concrete fix: remove the "Latest from the build logs" section entirely, since build logs belong embedded in each project/lab/workshop, not surfaced as a separate homepage feed. Removed the section, its `logs` collection query, and the now-unused `entrySlug`/`getCollection` imports from `src/pages/enter.astro`. The rest of `/enter/`'s dissatisfaction is not yet diagnosed — this was one specific, actionable piece of broader feedback, not a full fix.

## 2026-07-02 - Reset to a dark-first "gateway to the future" / workshop direction

**Supersedes the retro-futurist/schematic pass below.** The user rejected that direction outright ("I don't really like it, let's start over") for three reasons: it read as retro-blueprint rather than futuristic, it was too subtle a change, and — the real gap — it never introduced the actual concept the user wanted: "the gateway should be a gateway to the future led by Coderturtle; the main site should be a futuristic workshop where turtles and agent turtles build together." Clarified before rebuilding: the user has no new illustrated "agent turtle" character art yet and will supply/commission it separately, so the workshop concept had to be built *structurally* now (reserved station slots) without fabricating fake character art. A follow-up palette question went unanswered; proceeded with the recommended option (dark, glowing workshop-at-night) since it best fits "gateway to the future" and was already flagged with an explicit mitigation for the Agentic Tekton convergence risk (glow/bloom + illustration-forward staging, not their flat minimal-ink editorial style).

Changes: dark is now the default theme sitewide (new `void`/`glow` Tailwind tokens, `ThemeToggle` defaults to dark, a blocking pre-paint script avoids a light flash); the gateway is rebuilt as a "portal" — glowing concentric rings, a star field, a glowing portrait frame, copy reframed around "the gateway to what's next" / "Enter the future"; `/enter/` gains a new "workshop floor" section with Coderturtle's active station plus two explicitly-labeled `[ agent turtle · reserved ]` placeholder stations (dashed glow frames, not fake art) ready to receive supplied artwork later. Light mode is kept fully functional as the secondary/toggle option, reusing the earlier warm-palette work rather than being redesigned.

## 2026-07-02 - Add a retro-futurist/schematic chrome layer (superseded)

The user asked for a "next-generation, futuristic" feel but explicitly did not want the site to get busy, since projects should be what pops. Generic "futuristic" (dark, neon, glassmorphic) would have re-converged Coderturtle with Agentic Tekton's existing dark editorial aesthetic, so the direction chosen is retro-futurist/schematic instead: a fine blueprint grid backdrop with edge tick marks, corner-bracket/reticle framing on key panels (`src/components/CornerBrackets.astro`, reused on the gateway portrait and both workbench panels), and bracketed telemetry-style labels (`[ ]`) for chrome/metadata only — panel kickers, timeline meta rows, status pips. Project titles, descriptions, taglines, and build-log prose are explicitly untouched by this treatment so the content stays the visual focus. Hover/interaction transitions were also tightened to a snappier easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`, set as the Tailwind `transition` default) for a more precise, instrument-panel feel; ambient/idle animations (turtle wander, status pip pulse) were left with their original easing since those are meant to feel organic, not snappy.

## 2026-07-02 - Fix gateway quote bubble overlapping the headline

User-reported bug: the dry-quote bubble triggered by clicking the gateway turtle was rendering on top of/colliding with the "Coderturtle." headline, making both illegible. Root cause: the bubble was positioned `left: calc(100% + 1rem)` relative to a portrait frame that had become much narrower after the illustration-forward redesign, pushing it into the adjacent headline column. Fixed by repositioning the bubble below the portrait frame instead of beside it, entirely within the portrait's own column; the existing mobile override (already bottom-anchored above the portrait) was unaffected.

## 2026-07-02 - Fix silent Shiki/Mermaid conflict and dead-code accumulation found during verification

Verifying the migrated build-log entry surfaced two real, pre-existing bugs, both fixed in this session: (1) `astro.config.mjs` had `markdown.syntaxHighlight: "shiki"` as a bare string, which syntax-highlights every fenced code block — including ` ```mermaid ` — before `astro-mermaid`'s rehype plugin can transform it into a diagram, so Mermaid diagrams had likely never actually rendered in this repo; fixed by switching to the object form of `syntaxHighlight` with `excludeLangs: ["mermaid"]`, which only takes effect in that form. (2) The migration exposed a stack of dead legacy scaffold from the original Astro blog-starter template (`Header.astro`, `Footer.astro`, `BaseHead.astro`, `HeaderLink.astro`, `FormattedDate.astro`, five unused placeholder JPGs) whose only consumer, `BlogPost.astro`, was already deleted in the prior session; all confirmed zero-reference and removed.

## 2026-07-02 - Write docs/roadmap.md as the forward-looking plan of record

With the four-phase content-architecture rebuild complete and committed (`d1f67f8`), asked an Opus-backed agent to research the full current repo state (`CLAUDE.md`/`AGENTS.md`, `.hekton/project.yaml`, `docs/project-walkthrough.md`, `docs/decisions.md`, `docs/session-log.md`, `docs/next-actions.md`, the older infra-focused docs, and the actual content/route/component tree) and produce `docs/roadmap.md`: a target end-state architecture (falsifiable, checkable claims across content-at-scale, design system, agent interface, ecosystem integration, and production infra), a gap analysis by workstream, a dependency-sequenced (not calendar-sequenced) phased plan tagging each step `[agent]` or `[human]`, and an explicit list of nine decisions only the user can make. `docs/next-actions.md` remains the raw backlog; `docs/roadmap.md` is the synthesized plan that organizes it — the two are complementary, not duplicates.

The agent flagged three pieces of doc staleness while researching, none of which required a code change: `.hekton/project.yaml`'s `architecture` block (maturity 2 "working", `last_validated: 2026-06-28`) predates the entire content/design rebuild and is folded into the Phase B (AWS cutover) doc-refresh step rather than fixed now; `docs/architecture.md`/`docs/deployment.md` still cite `/blog/` as an example served route (now a redirect) in the CloudFront-rewrite discussion, harmless but worth tidying during that same pass; and `src/content/projects/coderturtle-io.mdx` has `startDate: 2025-07-05`, a year before its own 2026 build-log entries and the 2026-06-28 adoption date — flagged for a glance, not resolved here since it may be intentional (site predates Hekton adoption).

Explicitly out of scope for this pass: no product/infra code was touched, no git commands were run by the researching agent, and the AWS cutover itself (Phase B) was deliberately framed as blocked at its start on human-owned DNS/bucket/IAM decisions rather than sequenced as if an agent could run it end to end.

## 2026-07-02 - Close out Phase A housekeeping: untrack .DS_Store, apply non-breaking npm audit fixes

Started working the roadmap's Phase A housekeeping items one by one per user request. Untracked `.DS_Store` and `.github/.DS_Store` (`09ff31f`) — both were already covered by `.gitignore`, just tracked from before that rule existed; files are kept locally, only removed from Git.

For the npm audit review, did the work on a dedicated `chore/npm-audit-fixes` branch rather than directly on the product branch, per the roadmap's explicit call-out that dependency updates shouldn't mix into product commits. `npm audit` reported 26 findings (1 low, 14 moderate, 10 high, 1 critical); a plain `npm audit fix` (no `--force`) resolved 21 of them via transitive dependency bumps only — `package.json` itself is untouched, only `package-lock.json` changed. Verified `npm run build` stayed green (9 pages, no errors) before committing. The remaining 5 findings (4 low, 1 high) all require `astro@7.0.6`, a breaking major-version jump from the current `astro@5.x` line; left alone rather than forcing, since a major Astro upgrade needs its own dedicated testing pass, not a housekeeping side-effect. Since the fix was lockfile-only, non-breaking, and build-verified, fast-forward merged `chore/npm-audit-fixes` into the product branch immediately and deleted it, rather than leaving it as a lingering unmerged branch.

## 2026-07-02 - Give the AWS cutover its own branch; run the Infrastructure Gremlin preflight + plan

Per user request, created `infra/aws-static-site-cutover` off the product branch so infra-lane work has a dedicated home instead of accumulating on `agent/codex/coderturtle-homepage-mvp` alongside product/content commits (the existing Terraform module and deploy manifest were already present in the tree — added in an earlier session's `b8eb640` — but had never been separated onto their own branch or actually run against AWS).

Acted as the Infrastructure Gremlin (`agent-teams/infrastructure-gremlin/` in `agentic-infra-lab`) for this project, following its documented workflow exactly: preflight, generate tfvars, plan, summarise, classify, stop for human review. Did not run `apply`, `destroy`, `import`, or any state-mutating command, and did not touch IAM — matches the gremlin's hard rules and this project's own `destructive_changes: human_required` governance posture.

**Preflight (all read-only):** `terraform version` (1.15.5, satisfies the module's `>=1.7.0` requirement); `aws sts get-caller-identity` (account `600059206606`, role `hekton`); the module directory contains valid `.tf` files. Two manifest fields were placeholders (`REPLACE_WITH_ROUTE53_HOSTED_ZONE_ID`, `...REPLACE_WITH_ACCOUNT_OR_SUFFIX`) — rather than stopping to ask the user for values that read-only AWS calls could resolve directly, ran `aws route53 list-hosted-zones-by-name --dns-name coderturtle.io` (found `Z3DLQAZ6G5LV63`, the zone already exists and is registered) and `aws s3api head-bucket --bucket coderturtle-io-static-prod-600059206606` (404 = available) to confirm a concrete, available bucket name using the account-ID-suffix convention the manifest's own placeholder already implied. Both values recorded in `infra/aws-static-site/deploy-manifest.yaml` and `docs/architecture.md`'s "Values To Fill" table with their provenance. This closes two of the roadmap's nine open human decisions (§5 items 1–2) without needing to interrupt the user, since they were mechanically resolvable and not actually subjective calls.

**Generated `terraform.tfvars`** (gitignored, not committed) in the module directory from the manifest + these two resolved values; all other fields used the manifest/example defaults (region `eu-west-2`, ACM in `us-east-1`, `www.coderturtle.io` alias, `PriceClass_100`).

**Plan:** `terraform init` + `terraform plan -out=tfplan` against real AWS (read-only). Result: **17 to add, 0 to change, 0 to destroy**, plus one read-only `data.aws_iam_policy_document` render (not a managed IAM resource — no AWS API call, just a local JSON template). Resource types: `aws_s3_bucket` + 5 S3 sub-resources (ownership controls, public-access block, SSE, versioning, bucket policy), `aws_acm_certificate` + validation, `aws_cloudfront_distribution` + origin access control + the index-rewrite function, and 6 `aws_route53_record`s (A/AAAA aliases + cert-validation records for both `coderturtle.io` and `www.coderturtle.io`). All creates, all expected types for the `hekton/aws-static-site` pattern, no deletes/replaces, no managed IAM resource created or changed.

**Blast-radius classification: GREEN** — every action is `create`, every type is on the pattern's allowlist, nothing destroyed, no IAM. Per the gremlin's own rules a GREEN plan is still presented for human review, not auto-approved.

**Well-Architected advisory** (mirroring the review already done for the sibling `hekton.theagentictekton.com` static site in `agentic-infra-lab/docs/well-architected.md`, same pattern):

| Pillar | Verdict | Rationale |
|---|---|---|
| Operational excellence | WARN | Plan is human-gated with a saved `tfplan`, but post-apply verification (HTTPS check, DNS propagation, CloudFront status) isn't wired up yet |
| Security | PASS | Private S3 (`block_public_acls`/`restrict_public_buckets` true), SSE-S3 (AES256), CloudFront OAC, scoped bucket policy, ACM TLS (`TLSv1.2_2021` minimum, `redirect-to-https`), no managed IAM resources |
| Reliability | WARN | S3 versioning enabled, but first apply, ACM DNS validation, and CloudFront propagation are unproven until actually applied |
| Performance efficiency | PASS | CloudFront with compression on, HTTP/2, HTTPS-only, appropriate for a static Astro site |
| Cost optimization | WARN | `PriceClass_100` and S3+CloudFront are low-cost at this scale, but no budget/billing alarm exists yet |
| Sustainability | PASS | No compute or database resources; CDN caching limits origin work |

Overall advisory verdict: **WARN** — same profile as the sibling site's first plan. Reasonable to apply; post-apply verification and a cost-awareness follow-up are recommended, not blocking.

**Handed to the human, not applied:** the exact apply command is `terraform apply "tfplan"` run from `infra/aws-static-site/terraform/` on the `infra/aws-static-site-cutover` branch, with `tfplan` and `tfplan.json` saved locally (gitignored). Did not run it — Terraform apply is a hard stop for this gremlin regardless of any permission granted in conversation, matching `guardrails.apply_authority: human-only` in the deploy manifest and this project's own governance rule that destructive/infrastructure-mutating changes require the human directly, not an agent acting on their behalf.

## 2026-07-02 - Ratify "coming soon" as Gremlins' standing state on /ecosystem/

Asked the user directly whether Gremlins has a real public URL or should stay "coming soon"; got no response within the session. Rather than leave this as an unowned default (the roadmap's framing: "coming soon" is only acceptable as a *recorded decision*, not silence), ratifying the status quo as the decision: `src/pages/ecosystem.astro`'s `href: null` for Gremlins stays as-is, since `veilgremlin` (the local project behind it) has no public site to link to. This is reversible the moment a real URL exists — flip `href: null` to the URL and `status: "soon"` to `"live"`, matching the pattern already used for Agentic Tekton and Hekton in the same array. No code change was needed for this decision; the code was already in the correct honest state.

## 2026-07-03 - Enable push-to-main on the AWS deploy workflow now, gated to no-op until infra exists

`deploy-aws-static-site.yml` previously shipped with its `push` trigger commented out ("enable after the first successful manual production deploy"), which mirrors the same mistake independently made in the sibling `agentic-tekton`/`hekton-field-journal` deploy workflows and is exactly the kind of manual follow-up step that gets forgotten. Enabled `push: branches: [main]` now, and fixed the `deploy` job's `if` condition — it previously depended on `inputs.dry_run`, a `workflow_dispatch`-only field that is `null` (not `false`) on `push` events, so the job would never have run on a push at all. The new condition is `github.ref == 'refs/heads/main' && vars.AWS_DEPLOY_ROLE_ARN != '' && (github.event_name == 'push' || inputs.dry_run == false)`: it skips cleanly (not a failed run) on every push until the four `AWS_*` repository variables are set post-`terraform apply`, and still supports an opt-in dry run via `workflow_dispatch`. This means the deploy automation is live from this merge onward with nothing left to flip on later — only the Terraform apply and repo variable setup (both human-only) stand between this and a working auto-deploy-on-merge.

## 2026-07-03 - Correct "extract as reusable workflow" to blog-factory-lab, not agentic-infra-lab

The user asked for this AWS S3+CloudFront deploy GitHub Action — used nearly identically in `agentic-tekton`, `hekton-field-journal`, and now `coderturtle.io` — to be extracted into "the new site infra setup" as a reusable script/workflow rather than hand-copied a fourth time. The initial plan named `agentic-infra-lab` as the destination, but inspecting that lab plus `blog-factory-lab` showed the canonical reusable template already exists at `blog-factory-lab/infra/aws-static-site/github-actions/deploy-static-site.yml` — explicitly cited as the pattern origin by both `agentic-tekton`'s and this repo's own infra READMEs. `agentic-infra-lab` is the Infrastructure Gremlin's orchestration lab (preflight/plan/classify workflow docs) and consumes this pattern; it isn't where the template itself lives. Updated the actual template in `blog-factory-lab` (merged as [dermdunc/blog-factory-lab#11](https://github.com/dermdunc/blog-factory-lab/pull/11) — a first attempt, #10, had picked up an unrelated auto-log commit from a concurrent session that conflicted with `main`; re-cut cleanly with just the one commit) instead of creating a second copy: v1 hardening ships the push trigger live by default, gates the deploy job on the AWS vars existing instead of a forgotten manual "enable" step, and fixes asset caching to split on the real `_astro/` fingerprint directory instead of by file extension.

## 2026-07-03 - Handle the pre-existing live CloudFront distribution during DNS cutover

Applying the AWS static-site Terraform surfaced something the plan alone didn't show: `coderturtle.io` and `www.coderturtle.io` already had live "A" alias DNS records pointing at a pre-existing CloudFront distribution (`E1L5J5X47UHN2S`, created 2020-11-22, still `Enabled`/`Deployed`), fronting a public S3-website-hosting bucket — not GitHub Pages as this project's docs had assumed, and not tracked in this Terraform state. Two real conflicts followed directly from this, both against pre-existing records this Terraform doesn't own:

1. `terraform apply` tried to *create* the "A"/AAAA alias records and the ACM DNS-validation CNAME records, which errored (`InvalidChangeBatch: ...already exists`) since Route 53 won't allow a second record of the same name+type. Fixed by adding `allow_overwrite = true` to `aws_route53_record.alias_a`, `alias_aaaa`, and `cert_validation` in `main.tf` — repoints the existing records at this stack instead of erroring.
2. CloudFront itself then refused to create the *new* distribution with the same aliases (`CNAMEAlreadyExists`) — an AWS-enforced constraint (an alias can only be attached to one distribution account-wide) that Terraform config can't route around. Resolved out-of-band: the user cleared `Aliases` and switched `ViewerCertificate` to the CloudFront default cert on the old distribution 2020 (`aws cloudfront update-distribution`, prepared as exact copy-paste commands rather than run by an agent, since it mutates a live production resource with real user-facing downtime — this is the same class of action as the human-only Terraform apply gate, just not literally Terraform), immediately followed by `terraform apply` to claim the freed aliases on the new distribution.

**Result:** `terraform apply` completed (7 added, 0 changed, 0 destroyed after the earlier partial-apply's resources). New stack: S3 bucket `coderturtle-io-static-prod-600059206606`, CloudFront distribution `EVFZ1SPLK9PZ1` (`d2fiu60kto5yd0.cloudfront.net`), ACM cert `arn:aws:acm:us-east-1:600059206606:certificate/288d208f-aeed-46a7-86c1-0b6b8f632ba7`, deploy role `arn:aws:iam::600059206606:role/coderturtle-io-deploy`. DNS now points at the new distribution (verified via read-only `list-resource-record-sets`); the new distribution shows `Deployed`. A `curl` to `https://coderturtle.io/` returns `403` — expected and correct, since the private S3 bucket is empty until the deploy workflow actually syncs the built site (see the "GitHub OIDC deploy role" decision below).

**Not resolved:** the old distribution (`E1L5J5X47UHN2S`) and its public S3-website bucket are now orphaned — aliases cleared, no longer receiving traffic, but not deleted. Left as a follow-up cleanup decision, not urgent (low ongoing cost, no security exposure since it no longer resolves from the domain), but shouldn't be forgotten indefinitely.

## 2026-07-03 - Add the GitHub OIDC deploy role via Terraform, converging on agentic-tekton's pattern

Asked the user which sibling-site pattern to mirror for the deploy role: `agentic-tekton`'s (terraform-managed, `github-oidc.tf`, applied and in state) or `hekton-field-journal`'s (manually created outside Terraform, ARN just hardcoded in the workflow). User chose the terraform-managed pattern. Added `infra/aws-static-site/terraform/github-oidc.tf`, copied from `agentic-tekton`'s file and adapted for this repo (`coderturtle/coderturtle-blog`) and account — an `aws_iam_role` trust-scoped to this repo's `production` environment and `main` ref via GitHub's OIDC provider (referenced, not created — it already exists in the account), plus a least-privilege inline policy (S3 list/put/delete on just this bucket, `cloudfront:CreateInvalidation` on just this distribution).

This requires flipping `no_terraform_managed_iam: true` to `false` in `deploy-manifest.yaml` — IAM-via-Terraform is normally a stop condition for the Infrastructure Gremlin here. Recorded as a deliberate, scoped exception (this one role only, not a general reopening of IAM mutation), matching the sibling site's already-evolved pattern rather than reinventing hekton-field-journal's manual/undocumented approach. `terraform apply` (human-run) created the role successfully: `arn:aws:iam::600059206606:role/coderturtle-io-deploy`. The four resulting repo variables (`AWS_REGION`, `AWS_DEPLOY_ROLE_ARN`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`) were set via `gh variable set` from the Terraform outputs, and the deploy workflow (already live on push-to-`main` per the earlier decision) will perform its first real deploy on the next merge.
