# Status

Date: 2026-06-28

Coderturtle.io is adopted into Hekton as a `factory-output` project. The repository is an Astro static site with npm as the package manager and `dist/` as the build output.

## Deployment Status

- Current checked-in legacy deploy: GitHub Pages workflow to `gh-pages`.
- Accepted production target: AWS static-site hosting with private S3, CloudFront, ACM, and Route 53.
- AWS region default: `eu-west-2`.
- IaC: `infra/aws-static-site/terraform/`.
- Deploy workflow: `.github/workflows/deploy-aws-static-site.yml`, manual-only with dry-run default.

## Hekton Status

- `.hekton/project.yaml`: present.
- Core adoption docs: present.
- Deployment docs: added.
- Runbooks: added.
- Backlog/status docs: added.
- Live vault mutation: not authorized; repo-local mirror only.

## Validation Snapshot

Last adoption session reported `npm ci` and `npm run build` passing.

Current deployment review validation:

- `git diff --check`: passed.
- `./scripts/verify-project.sh --dry-run`: passed.
- `terraform fmt -check -recursive infra/aws-static-site/terraform`: passed.
- `npm run build`: passed, with a Browserslist stale-data warning.
