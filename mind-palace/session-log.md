# Coderturtle.io Session Log

## 2026-06-28 - Adoption

Coderturtle.io was onboarded as a Hekton `factory-output` project. The repo was inspected in temporary intake, placed under the canonical factory-output tree, and given Hekton control-plane metadata, docs, scripts, and repo-local mind-palace draft files.

## 2026-06-28 - Deployment architecture review

The current repo deploy was identified as GitHub Pages, while the S3/CloudFront path remains externally known but not represented in checked-in config. Deployment docs, migration plan, runbooks, backlog/status files, a conservative ADR, a homepage handoff note, and a manual-only v2 S3/CloudFront workflow candidate were added without replacing the working deploy path. Validation passed with `git diff --check`, `./scripts/verify-project.sh --dry-run`, and `npm run build`.

## 2026-06-28 - AWS static-site infrastructure path

Coderturtle.io moved from "investigate AWS" to "use AWS static-site hosting for production." The repo now has Terraform under `infra/aws-static-site/`, a deployment manifest for the Infrastructure Gremlin workflow, `.github/workflows/deploy-aws-static-site.yml`, and an ADR for when Hekton projects should choose GitHub Pages vs AWS.

## 2026-07-02 - Content rebuild: projects + build-logs, dark-first workshop design

Over several sessions, replaced the generic blog with a `projects`/`logs` content model, retired `/blog/` to redirects, and iterated the gateway/`/enter/` design multiple times (light-first illustration-forward -> retro-futurist schematic, superseded -> dark-first "gateway to the future" workshop, the direction that stuck). Added an interactive workshop-floor scene, a build-log component library, an agent-facing interface (`/llms.txt`, JSON endpoints), a voice guide (cranky-engineer + Coding Horror), and closed out Phase A housekeeping (untracked `.DS_Store`, non-breaking `npm audit fix`). Full detail across ~20 individual decisions is in the main repo's `docs/decisions.md` and `docs/session-log.md`.

## 2026-07-03 - AWS cutover applied, legacy infra decommissioned, reusable workflow extracted

Merged the accumulated content-rebuild and infra work (9 unpushed commits plus an unmerged infra-planning branch) into one PR, fixed a real bug in the deploy workflow (its push trigger was disabled and its job condition could never have fired), and opened it. User declined to let any agent — including a proposed subagent — run `terraform apply` or create IAM resources directly, citing this project's own recorded human-only guardrail; ran it themselves instead, from commands prepared here.

Applying surfaced a real surprise: `coderturtle.io`'s DNS had been pointing at an unrelated, pre-existing 2020 CloudFront distribution + public S3-website bucket the whole time, not GitHub Pages as assumed. Resolved via `allow_overwrite` on the conflicting Route 53 records (Terraform-side fix) and, for the CloudFront alias-uniqueness constraint that Terraform can't route around, human-run AWS CLI commands prepared here. Final stack applied cleanly: S3 + CloudFront + ACM + Route 53 + a Terraform-managed GitHub OIDC deploy role (converging on the sibling `theagentictekton.com` site's pattern). Repo variables set, PR merged, first real auto-deploy-on-merge verified (`https://coderturtle.io/` returns 200). The old 2020 distribution/bucket were backed up locally then decommissioned; GitHub Pages was turned off once the new path was confirmed working.

Separately, extracted the S3+CloudFront deploy GitHub Action — previously hand-copied across three sites — into its actual canonical reusable template in the sibling `blog-factory-lab` repo (not `agentic-infra-lab`, the initially-assumed but incorrect destination), hardened with the fixes all three real consumers had independently reinvented.

Noted for future sessions: both this repo and `blog-factory-lab` showed signs of concurrent, uncoordinated agent activity from other sessions sharing this machine during this session (branch/working-tree state shifting between commands, `gh auth`'s active account flipping repeatedly, a PR-number collision). Nothing was lost, but every push/PR/merge had to be independently verified rather than trusted at face value.

## 2026-07-04 - Re-confirm `/projects/` is not broken; add old-site quote to the brand

A second, identically-worded report of `/projects/` showing the old coming-soon page was re-investigated (cache-busted `curl`, `dig`) and again found nothing wrong server-side — same browser-cache root cause already closed out 2026-07-03. No code/infra fix needed. Separately, added the old 2020 site's footer quote ("Innovation is seeing what everybody has seen and thinking what nobody has thought") to the current site's sitewide footer, matching its original placement, at the user's request to fold it into the brand.
