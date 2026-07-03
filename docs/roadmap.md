# Roadmap

Forward-looking plan for Coderturtle.io. This document describes the target
end-state, the gap between that and today, and a dependency-sequenced path to
close it. It does **not** re-litigate decisions already made — for *why* the
site is the way it is, read `docs/decisions.md`; for *what* the site currently
is, read `docs/project-walkthrough.md`. This file is about what's left.

Two lanes run in parallel and are kept deliberately separate, per `CLAUDE.md`
and `AGENTS.md`:

- **Product/content lane** — the site itself (design system, content model,
  voice, agent interface). Agent-executable end to end.
- **Infra/deployment lane** — the AWS static-site cutover. Blocked on
  human-owned AWS/DNS decisions; agents can prepare but not apply. Hekton
  adoption metadata (`.hekton/`) stays out of product content.

Sequence below is by **dependency**, not by calendar. This is a one-person +
agents project; there is no sprint schedule and no dates are invented here.

---

## 1. Where things stand

The site has completed a full content-architecture and design rebuild
(committed through `d1f67f8` on `agent/codex/coderturtle-homepage-mvp`).
Measured against the target end-state, here is what is already true versus
still aspirational.

**Already true (shipped and committed):**

- **Content model.** `projects` + `logs` Astro content collections
  (`src/content.config.ts`) replace the old `blog`. A project lives at
  `/projects/<slug>/` with an in-page build-log timeline; each entry is
  individually addressable at `/projects/<slug>/log/<entry>/`. `/blog/`
  redirects to `/projects/` (`astro.config.mjs`).
- **Agent-facing interface.** `/llms.txt`, `/projects/index.json`, and
  `/projects/<slug>.json` are generated at build time from the collections
  (`src/pages/llms.txt.ts`, `src/pages/projects/index.json.ts`,
  `src/pages/projects/[slug].json.ts`), so they can't drift from the site.
  `.hekton/` control-plane data is intentionally never served into them.
- **Design direction.** Dark-first "gateway to the future" is confirmed by the
  user. `/` is a portal-style gateway; `/enter/` is an interactive
  workshop-floor scene (master Coderturtle station supervising Projects, Labs,
  Workshops worker stations) with pointer-tracked 3D tilt, an animated
  connector diagram, and drag/click quote interactions. Light mode remains
  fully functional via toggle.
- **Ecosystem page.** `/ecosystem/` frames Coderturtle as one cog meshing with
  Hekton, Agentic Tekton, and Gremlins. Agentic Tekton
  (`https://theagentictekton.com`) and Hekton
  (`https://hekton.theagentictekton.com`) are real, user-confirmed outbound
  links.
- **Build-log component library.** `TerminalBlock`, `DiffBlock`, `Screenshot`,
  `BeforeAfter` (`src/components/log/`) are MDX-embeddable and demonstrated with
  real content in `0002-the-dark-reset.mdx` and
  `0003-cogs-tilt-and-a-terminal-that-talks-to-agents.mdx`.
- **Voice.** `docs/voice-guide.md` documents the cranky-engineer + Coding Horror
  register, applied to new content only (the pre-guide entry `0001` is
  deliberately left as-is).
- **Infra scaffolding.** Terraform (`infra/aws-static-site/terraform/`), a
  deploy manifest, and a manual-first workflow
  (`.github/workflows/deploy-aws-static-site.yml`) exist.

**Still aspirational (the rest of this document):**

- The site is **not live on AWS.** The legacy GitHub Pages workflow
  (`.github/workflows/deploy.yml`) is still the operative deploy path; no
  Terraform has been applied, no Route 53 zone / bucket / OIDC role is
  configured.
- **Labs and Workshops pages do not exist.** Those two worker stations on
  `/enter/` are honest "still being built" buttons that link nowhere.
- **Only one project exists** — Coderturtle.io itself, with three build-log
  entries. The content model is unproven at scale.
- **Gremlins has no confirmed public URL** and shows as "coming soon."
- Several **human-review gates** on the recent design/content work are open and
  unconfirmed (palette mood, the interactivity pass, worker-turtle art
  contrast, the component library / voice / About tie-in, the agent endpoints).
- Housekeeping (tracked `.DS_Store`, npm audit, mind-palace sync) is
  outstanding.

---

## 2. Target end-state architecture

"Done" is falsifiable. Each claim below can be checked against the live site or
the repo, not just felt.

### 2.1 Content model at scale

- **More than one real project** exists under `src/content/projects/`, each a
  genuine project with its own honest build log — not filler. `/projects/`
  renders as a real index of distinct work, and the timeline/index UI is
  verified to hold up at higher content volume (the current single-project case
  leaves the multi-project layout untested — see
  `docs/session-log.md`, "Projects + build-logs content model" risks).
- **Build logs are populated** with the visual component library in real use
  (terminal transcripts, diffs, screenshots, before/after) rather than plain
  MDX prose, across multiple entries and projects.
- **`changeRefs` are wired to real change-log entries.** Log entries whose work
  corresponds to `.hekton/change-log.yaml` records (currently only `CHG-0001`)
  carry curated `changeRefs` links. Target state: `.hekton/change-log.yaml` has
  entries worth citing, and at least some log entries cite them — kept
  hand-authored and never auto-synced (`src/content.config.ts` comment;
  `CLAUDE.md`).
- **New content is in the documented voice** (`docs/voice-guide.md`); `0001`
  stays as the honest pre-guide record.

### 2.2 Design system

- Dark-first "gateway to the future" is the confirmed, stable direction (this
  part is already true and user-confirmed; the target adds only that the
  remaining review gates in §2.6 are closed).
- The **workshop-floor interaction model** on `/enter/` is either (a) the
  permanent content hub with all three worker stations linking to real
  destinations, or (b) an explicitly-decided bridge to dedicated Labs/Workshops
  pages. Either is a valid end-state; what's *not* an end-state is the current
  ambiguous "two of three stations link nowhere" limbo. See §5.
- The design system is applied consistently: every route uses `BaseLayout` and
  the shared `global.css` component classes (already true for `/about/` after
  its migration off the legacy `BlogPost` layout).

### 2.3 Agent-facing interface

- `/llms.txt`, `/projects/index.json`, `/projects/<slug>.json`, `/rss.xml`, and
  the sitemap all resolve on the **production** host and reflect real content at
  scale (currently they reflect one project). The known dev-server-only
  trailing-slash quirk on `/projects/<slug>.json` does not affect the static
  build (`docs/decisions.md`, "Ship Phase 3"), and this is verified against the
  production CloudFront/S3 serving path once live, not just `npm run preview`.
- The provenance contract holds: `.hekton/` internal data is never exposed.

### 2.4 Ecosystem integration

- **All three sibling links are real, not "coming soon."** Agentic Tekton and
  Hekton already are. The end-state requires a resolved answer for Gremlins:
  either a confirmed public URL wired into `src/pages/ecosystem.astro`
  (`href` currently `null`), or a deliberate, documented decision that Gremlins
  stays "coming soon" because it has no public presence yet. "Coming soon" as an
  unowned default is not the end-state; "coming soon" as a recorded decision is
  acceptable.

### 2.5 Production infrastructure

- Site is **live on AWS**: private S3 origin behind CloudFront, ACM cert, Route
  53 DNS for `coderturtle.io` (+ `www.coderturtle.io` alias), deployed via the
  GitHub Actions OIDC path (`.github/workflows/deploy-aws-static-site.yml`).
- **GitHub Pages is retired** — `.github/workflows/deploy.yml` removed once AWS
  is verified.
- `astro.config.mjs` is confirmed correct for the production domain: `site:
  "https://coderturtle.io/"`, no `base`, `trailingSlash: "always"` (currently
  set this way; the open action is a deliberate review, not a change).
- Terraform outputs (bucket name, CloudFront distribution ID, ACM ARN) are
  recorded and the four GitHub repo variables (`AWS_REGION`,
  `AWS_DEPLOY_ROLE_ARN`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`) are set
  (`docs/deployment.md`). The `production` GitHub Environment gates deploys.
- `.hekton/project.yaml` `architecture.maturity_*` and `last_validated` are
  refreshed to reflect the live-on-AWS reality (currently `2026-06-28`,
  maturity 2 / "working", predating both the content rebuild and any AWS
  cutover). This is adoption-metadata bookkeeping in the infra lane, not a
  product change.

### 2.6 Human-review gates closed

The following recent work shipped on agent judgment and is flagged in
`docs/next-actions.md` as awaiting the owner's confirmation. End-state: each is
explicitly confirmed or corrected.

- The dark/glow palette + mood for `/enter/` and beyond.
- The `/enter/` interactivity pass (tilt, connector, pips, drag).
- The worker-turtle art style contrast (hand-drawn master vs. flat-vector
  workers reading as "senior supervising juniors").
- The build-log component library, the Coding Horror voice, and the About-page
  tie-in.
- `/llms.txt` and the JSON endpoints reviewed live.

---

## 3. Gap analysis

Target vs. current, organized by workstream.

### Infra / Deployment (infra lane)

| Target | Current | Gap |
|---|---|---|
| Live on AWS (S3 + CloudFront + ACM + Route 53) | Terraform written, never applied | Blocked on human DNS/bucket decisions (§5); then human apply |
| OIDC deploy role + 4 GitHub repo variables | None configured | Blocked on apply outputs + IAM (human/gremlin-stop) |
| GitHub Pages retired | `deploy.yml` still operative | Cannot retire until AWS verified |
| `astro.config.mjs` confirmed for prod domain | Already `coderturtle.io` root, `trailingSlash: always` | Confirmation/review only, likely a no-op |
| `.hekton/project.yaml` maturity refreshed post-cutover | Dated 2026-06-28, pre-rebuild | Bookkeeping after cutover |

### Content at Scale (product lane)

| Target | Current | Gap |
|---|---|---|
| Multiple real projects | One (`coderturtle-io`) | Needs real projects with material worth logging |
| Populated build logs using the component library | 3 entries on the one project | More entries as work happens |
| `changeRefs` wired to real change-log records | Only `CHG-0001` exists; no entry cites it | Needs more `.hekton/change-log.yaml` entries first |
| Multi-project index/timeline UI verified | Unverified above 1 project | Verify when a 2nd project lands |

### Labs & Workshops Pages (product lane)

| Target | Current | Gap |
|---|---|---|
| Labs + Workshops resolve to real destinations (or a decided bridge) | Non-linking "still being built" buttons on `/enter/` | No source content exists for either yet; blocked on §5 hub-vs-bridge decision |
| Worker stations link out once pages exist | Buttons only | Depends on the above |

### Human-Review Gates (product lane)

All of §2.6 is open. These are confirmations, not build work — cheap to close,
but only the owner can close them. Several were shipped on 60s-no-response
defaults (palette, narrative direction that was later confirmed) and one is a
*second* miss risk on the same axis if wrong (palette/mood — see
`docs/session-log.md`, "Dark-first... reset" risks).

### Ecosystem Integration (product lane)

| Target | Current | Gap |
|---|---|---|
| All three sibling links real, or Gremlins-"coming-soon" recorded as a decision | AT + Hekton live; Gremlins `href: null` | Needs a confirmed Gremlins URL or an explicit decision (§5) |

### Housekeeping (mixed lane)

| Target | Current | Gap |
|---|---|---|
| No tracked `.DS_Store` | `.DS_Store` + `.github/.DS_Store` tracked | Dedicated hygiene commit (agent-executable) |
| npm audit reviewed | 26 findings reported at adoption, unreviewed | Maintenance branch (agent-executable) |
| Mind-palace sync reviewed | Repo-local mirror only; live vault untouched | Blocked on explicit user authorization (§5) |

---

## 4. Phased implementation plan

Phases are ordered by dependency. Within a phase, steps are marked
**[agent]** (an agent can do it end to end) or **[human]** (requires the owner,
usually because it touches AWS/DNS/IAM, live infra, the vault, or a
subjective-taste confirmation). Nothing here has a date.

### Phase A — Housekeeping and confirmation (no blockers)

Everything here is unblocked and can proceed immediately, independent of the
AWS lane.

- **[agent]** Remove tracked `.DS_Store` and `.github/.DS_Store` in a dedicated
  hygiene commit (`docs/next-actions.md`).
- **[agent]** Review `npm audit` output on a dedicated maintenance branch;
  propose dependency updates without mixing them into product commits.
- **[human]** Walk the open review gates in §2.6 live and confirm/correct each.
  This is the highest-leverage human step in the whole roadmap: it unblocks
  confident forward motion on both the design system and content, and de-risks
  the palette/mood axis that has already missed twice.
- **[human]** Decide the Gremlins question (real URL vs. recorded
  "coming soon"); **[agent]** wire the result into `src/pages/ecosystem.astro`
  and record it in `docs/decisions.md`.

**Definition of done:** clean `git ls-files | grep -i ds_store` returns
nothing; audit reviewed with a recorded decision; each §2.6 gate has an explicit
confirm/correct outcome in the docs; Gremlins state is a recorded decision, not
a default.

### Phase B — AWS deployment cutover (infra lane; human-gated)

This phase is **blocked at its start** on human-owned decisions and cannot be
run agent-to-agent end to end. Do not sequence it as if it were.

Blocking inputs (see §5): Route 53 hosted zone ID, final S3 bucket name.

1. **[human]** Confirm Route 53 hosted zone ID and bucket name.
2. **[agent]** Fill local Terraform tfvars from those values
   (`infra/aws-static-site/terraform/terraform.tfvars.example` → local, not
   committed); run Infrastructure Gremlin preflight and `terraform plan`;
   summarize plan + blast radius. **Gremlin stops before apply.**
3. **[human]** Review the plan and run `terraform apply`. Record outputs
   (bucket name, CloudFront distribution ID, ACM ARN).
4. **[human]** Create the GitHub OIDC deploy role and least-privilege IAM policy
   (`docs/deployment.md` has both policy templates). IAM is a gremlin
   stop-condition — human-owned.
5. **[human]** Set the four GitHub repo variables and the `production`
   environment with required reviewers.
6. **[agent/human]** Run `.github/workflows/deploy-aws-static-site.yml` in
   dry-run from `main`; then a real deploy after review.
7. **[agent]** Review `astro.config.mjs` `site`/`base`/`trailingSlash` against
   the live domain (expected no-op; confirm anyway).
8. **[human]** Verify the live site on `coderturtle.io` — pages, redirects
   (`/blog/`), agent endpoints, RSS, sitemap — served from CloudFront/S3.
9. **[human]** Decide when to retire the GitHub Pages workflow; **[agent]**
   remove `.github/workflows/deploy.yml` once AWS is verified.
10. **[agent]** Refresh `.hekton/project.yaml` architecture maturity /
    `last_validated` / `next_architecture_step` and update `docs/deployment.md`
    + `docs/architecture.md` "Values To Fill" tables with the real outputs.
    Keep this in an infra-lane commit, separate from product content.

**Definition of done:** `coderturtle.io` resolves to the CloudFront
distribution over a private S3 origin; a push-or-manual deploy updates the live
site; `deploy.yml` is gone; the four repo variables are set; Terraform outputs
and the refreshed maturity are recorded in the docs and `.hekton/`.

### Phase C — Labs & Workshops resolution (product lane)

Depends on the §5 hub-vs-bridge decision and on real source content existing.

- **[human]** Decide: is `/enter/` the permanent content hub (worker stations
  link to filtered `/projects/` views or in-page anchors), or a bridge to
  dedicated `/labs/` and `/workshops/` pages?
- **[human/agent]** Produce or identify real Labs and Workshops source content
  — there is none today. Without it, building the pages is premature.
- **[agent]** If dedicated pages: build `/labs/` and `/workshops/` on
  `BaseLayout`; wire the corresponding `/enter/` stations from "still being
  built" buttons to real links (`docs/next-actions.md`).

**Definition of done:** no worker station on `/enter/` links nowhere; either the
two pages exist and are linked, or `/enter/`'s hub role is a recorded decision
with the stations pointing at real destinations.

### Phase D — Content at scale (product lane; ongoing)

Naturally paced by real work; not a one-shot deliverable.

- **[human/agent]** Add real projects beyond `coderturtle-io` as they gain
  material worth logging (`docs/next-actions.md`).
- **[agent]** Verify the multi-project `/projects/` index and per-project
  timeline UI at 2+ projects (currently unverified above one).
- **[agent]** Write new build-log entries in the documented voice, using the
  component library; route imagery through `src/assets` (astro:assets/sharp).
- **[agent]** As `.hekton/change-log.yaml` gains entries worth citing, populate
  curated `changeRefs` on the relevant log entries — hand-authored, never
  auto-synced.

**Definition of done (per increment):** each new project builds, renders in the
index/timeline without regression, and appears correctly in `/llms.txt` +
JSON endpoints; new entries pass the existing Playwright sweep.

### Phase E — Mind-palace sync (governance; human-gated)

- **[human]** Authorize a live-vault sync session (currently
  `vault_mutation_allowed: false` in `.hekton/project.yaml`; every session log
  records "Live vault mutation is not approved").
- **[agent, within an authorized session]** Back up, then sync repo-local
  `mind-palace/` mirror files into the live Obsidian vault.

**Definition of done:** live vault reflects the current control-plane state;
the sync is recorded; `vault_mutation_allowed` handling matches what was
authorized.

---

## 5. Open decisions requiring the human owner

These genuinely cannot be resolved by an agent. They gate the phases noted.

1. **Route 53 hosted zone ID** (gates Phase B). Not in any doc; must come from
   the AWS account owner. `docs/architecture.md` "Values To Fill" lists it as
   pending.
2. **Final S3 bucket name** (gates Phase B). Placeholder in the tfvars example
   and manifest; final value pending.
3. **IAM / OIDC role creation** (gates Phase B). IAM mutation is a deliberate
   gremlin stop-condition — human-owned even though the policy templates are
   pre-written in `docs/deployment.md`.
4. **When to retire GitHub Pages** (Phase B) — a go/no-go the owner makes after
   verifying the live AWS site.
5. **Gremlins' public URL** (Phase A / ecosystem). Either supply a confirmed URL
   or ratify "coming soon" as a standing decision. `veilgremlin` (the local
   project) has no public site.
6. **The open human-review gates** (§2.6, Phase A): palette/mood, `/enter/`
   interactivity, worker-turtle art contrast, the component library + voice +
   About tie-in, and the live agent endpoints. Palette/mood especially — it has
   shipped twice on an unanswered clarifying question and is the one axis where a
   third miss is most costly.
7. **Is `/enter/` a permanent hub or a bridge** to dedicated Labs/Workshops
   pages? (gates Phase C). This shapes whether those pages get built at all.
8. **Commissioning more hand-drawn Coderturtle art** (optional). The design
   review found the character art underused and every pass so far reused
   existing assets only; whether to commission variants (and whether to restyle
   the three flat-vector worker turtles to match the hand-drawn master) is an
   owner call with a cost.
9. **Authorize a live mind-palace vault sync** (gates Phase E). Currently
   disabled by policy in `.hekton/project.yaml`.

---

## Notes on doc consistency

Minor staleness observed while writing this (not errors in the shipped site,
just docs lagging the rebuild):

- `.hekton/project.yaml` `architecture` block (maturity 2 "working",
  `last_validated: 2026-06-28`, `maturity_basis` citing "existing public Astro
  site with deploy workflow") predates the entire content/design rebuild and the
  AWS scaffolding thread. Refreshing it is folded into Phase B step 10.
- `docs/architecture.md` and `docs/deployment.md` still use `/blog/` as an
  example route in the CloudFront-rewrite discussion; `/blog/` is now a redirect,
  not a served page. Accurate enough for the infra target (the rewrite behavior
  is unchanged), but worth tidying during the Phase B doc refresh.
- `src/content/projects/coderturtle-io.mdx` has `startDate: 2025-07-05`, a year
  before its own 2026-07-02 build-log entries and the 2026-06-28 adoption date.
  Possibly intentional (site predates adoption) or a typo — worth a glance, but
  not load-bearing for anything here.
