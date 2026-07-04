# Coderturtle.io Decisions

## 2026-06-28 - Adopt as factory output

The repo is classified as `factory-output` because it is a public website/blog deliverable rather than shared Hekton machinery or an experimental lab.

## 2026-06-28 - Keep vault sync proposed only

Live vault mutation was not approved during adoption. These files are repo-local mirror drafts until the user approves backup and sync.

## 2026-06-28 - Keep S3/CloudFront adoption conservative (superseded)

The repo originally showed GitHub Pages deployment, while the intended production path was known externally as S3 and CloudFront. This conservative v2-candidate stance is superseded by the later decision to create the Hekton AWS static-site Terraform path for production.

## 2026-06-28 - Use AWS static-site hosting for production

Coderturtle.io should use the Hekton AWS static-site pattern for production. GitHub Pages remains only as the legacy path until private S3, CloudFront, ACM, Route 53, OIDC deploy, and manual verification are complete.

## 2026-06-28 - Use GitHub Pages only for low-risk static deployments

GitHub Pages is for previews, examples, docs, and low-risk sites. Durable Hekton factory-output sites with custom domains, protected deploys, private origins, cache control, and rollback needs should use AWS static-site hosting.

## 2026-07-02 - Rebuild content around projects + build-logs, dark-first workshop design

Replaced the generic blog model with `projects`/`logs` content collections (real projects, honest build-log timelines), retired `/blog/` to redirects, and reset the gateway to a dark-first "gateway to the future" workshop identity — deliberately distinct from the adjacent Agentic Tekton site's own dark editorial gateway. Added an agent-facing interface (`/llms.txt`, JSON project endpoints) and a build-log component library (terminal blocks, diffs, screenshots, before/after sliders). Full detail and the many intermediate design decisions are in the main repo's `docs/decisions.md`; this entry summarizes the arc, not each step.

## 2026-07-03 - Apply the AWS static-site cutover; decommission the legacy 2020 infra

`terraform apply` (human-run) created the production stack: S3 bucket, CloudFront distribution, ACM certificate, Route 53 records, and a GitHub OIDC deploy role (added via Terraform, converging on the same pattern already used for the sibling `theagentictekton.com` site rather than a manually-created role). Cutover surfaced a real surprise: `coderturtle.io`'s DNS had been quietly pointing at an unrelated, pre-existing CloudFront distribution from 2020 (not GitHub Pages, as assumed) the whole time. That distribution and its S3-website bucket were backed up locally, then disabled/emptied/deleted once the new stack was verified live. The GitHub Pages workflow was also turned off by the user once the new path was confirmed working. First real auto-deploy-on-merge verified end to end: `https://coderturtle.io` returns 200 with the current build.

Separately, extracted the S3+CloudFront deploy GitHub Action (previously hand-copied across three sites) into its actual canonical reusable template in the sibling `blog-factory-lab` repo, hardened with lessons from all three real consumers.

## 2026-07-04 - Add the old site's footer quote to the brand; no fix needed for `/projects/`

A repeat report of `/projects/` serving the old coming-soon page was investigated fresh (cache-busted `curl` against apex/`www`, `dig`) and, as with the 2026-07-03 report, found only the correct current build being served — a client-side browser-cache issue, not a server fault, so no code change was made for it. The user separately asked to fold the old 2020 site's footer quote ("Innovation is seeing what everybody has seen and thinking what nobody has thought") into the current brand; added as a sitewide footer tagline in `BaseLayout.astro`, matching where it lived on the old site, rather than the homepage's separate cranky-quote rotation whose tone doesn't fit this quote's register.
