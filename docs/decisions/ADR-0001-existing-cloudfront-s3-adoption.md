# ADR-0001: Existing CloudFront and S3 Adoption

Date: 2026-06-28

## Status

Accepted

## Context

Coderturtle.io has an existing public site and the checked-in repository showed a GitHub Pages deployment workflow. The project now needs the Hekton AWS static-site path so it can run under `coderturtle.io` with private S3, CloudFront, ACM, Route 53, and GitHub Actions OIDC.

Blindly applying infrastructure can still create duplicate resources if older AWS resources exist, so the repo records the intended stack and keeps apply behind the Infrastructure Gremlin human-review gate.

## Decision

Use the Hekton AWS static-site pattern as the accepted production deployment path for coderturtle.io. Add Terraform under `infra/aws-static-site/`, a deployment manifest for the Infrastructure Gremlin workflow, and a manual-only GitHub Actions deploy workflow.

Do not run `terraform apply` or delete the current GitHub Pages workflow in this session. The human applies the reviewed plan and the Pages workflow is retired in a later cutover commit after AWS deploy verification.

## Consequences

- Production deploy remains untouched until cutover.
- The AWS infrastructure path is reviewable and reproducible.
- Terraform variables, state, and plans stay local and uncommitted.
- Terraform outputs feed GitHub repository variables rather than hardcoding live resource IDs in the workflow.
- GitHub OIDC becomes the preferred target, with access-key fallback documented only as a temporary bridge.
- IAM remains deliberate and outside this Terraform stack for now.
