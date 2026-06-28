# Session Log

Append-only session history for Coderturtle.io.

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
