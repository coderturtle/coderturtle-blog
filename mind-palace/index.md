# Coderturtle.io

Classification: factory-output

Coderturtle.io is a public Astro/Tailwind website and blog adopted into the Hekton project system on 2026-06-28.

## Current Status

- Local repo: `/Users/hekton/Development/hekton/factory-output/coderturtle.io`
- Source repo: `https://github.com/coderturtle/coderturtle-blog`
- Live site: `https://coderturtle.io` — production, verified serving the current build
- Privacy boundary: public
- Vault mutation: not approved; this is a repo-local mirror draft

## Current Focus

Production is live and stable. The site now runs on the Hekton AWS static-site pattern: private S3 + CloudFront + ACM + Route 53, with a GitHub OIDC deploy role and an auto-deploy-on-merge GitHub Action, verified working end-to-end (first real deploy confirmed 2026-07-03). The legacy GitHub Pages workflow has been turned off. A pre-existing, unrelated 2020 CloudFront distribution and S3 bucket that had been quietly serving the domain's DNS the whole time were identified during cutover, backed up locally, and decommissioned.

Content-wise, the site was rebuilt around a `projects`/`logs` model (real projects with honest build-log entries) instead of a generic blog, with a dark-first "gateway to the future" gateway design and an agent-facing interface (`/llms.txt`, JSON endpoints). See `docs/roadmap.md` in the main repo for the fuller target-state plan and open decisions.

Next up: verify the design/voice/interaction review items still open in `docs/next-actions.md`, and decide when (if ever) to decommission the old legacy `.github/workflows/deploy.yml` file itself now that GitHub Pages deploys are off.
