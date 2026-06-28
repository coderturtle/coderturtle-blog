# Coderturtle.io Session Log

## 2026-06-28 - Adoption

Coderturtle.io was onboarded as a Hekton `factory-output` project. The repo was inspected in temporary intake, placed under the canonical factory-output tree, and given Hekton control-plane metadata, docs, scripts, and repo-local mind-palace draft files.

## 2026-06-28 - Deployment architecture review

The current repo deploy was identified as GitHub Pages, while the S3/CloudFront path remains externally known but not represented in checked-in config. Deployment docs, migration plan, runbooks, backlog/status files, a conservative ADR, a homepage handoff note, and a manual-only v2 S3/CloudFront workflow candidate were added without replacing the working deploy path. Validation passed with `git diff --check`, `./scripts/verify-project.sh --dry-run`, and `npm run build`.

## 2026-06-28 - AWS static-site infrastructure path

Coderturtle.io moved from "investigate AWS" to "use AWS static-site hosting for production." The repo now has Terraform under `infra/aws-static-site/`, a deployment manifest for the Infrastructure Gremlin workflow, `.github/workflows/deploy-aws-static-site.yml`, and an ADR for when Hekton projects should choose GitHub Pages vs AWS.
