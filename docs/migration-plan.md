# Migration Plan

## Phase 0: Observe Current Deploy

- Confirm whether the live `coderturtle.io` site is currently served by GitHub Pages, older S3/CloudFront, or both.
- Record current DNS, CloudFront, S3, ACM, and IAM values without changing them.
- Capture the current GitHub Actions deployment settings and any repository secrets or variables.

## Phase 1: Clean Docs And Deployment Notes

- Keep `docs/architecture.md`, `docs/deployment.md`, runbooks, status, backlog, and risks current.
- Keep the homepage/design handoff updated with build output, routing, and cache expectations.
- Avoid production deployment changes in this phase.

## Phase 2: Update GitHub Actions Safely

- Run `.github/workflows/deploy-aws-static-site.yml` manually in dry-run mode.
- Confirm the uploaded artifact has the expected `dist/` contents.
- Add path filters and automatic `main` deployment only after the manual workflow has been proven.
- Keep `.github/workflows/deploy.yml` until cutover is explicitly approved.

## Phase 3: Provision AWS And Prepare OIDC

- Fill `infra/aws-static-site/terraform/terraform.tfvars` from `terraform.tfvars.example`.
- Run Infrastructure Gremlin preflight and `terraform plan`.
- Human reviews and applies the Terraform plan.
- Create a least-privilege AWS IAM role for GitHub Actions.
- Configure GitHub OIDC trust for `coderturtle/coderturtle-blog` and the protected `production` environment.
- Add required GitHub repository variables from Terraform outputs and the OIDC role ARN.
- If temporary access keys are used, restrict them to the same policy and backlog their removal.

## Phase 4: Decide IaC Import Vs Replacement

- Prefer the checked-in Terraform static-site stack for new coderturtle.io AWS infrastructure.
- Choose Terraform import instead only if discovery confirms existing production AWS resources that must be preserved.
- Choose replacement/cutover only with rollback and DNS plan in hand.

## Phase 5: Add Monitoring And Verification

- Add post-deploy checks for root, about, blog, RSS, sitemap, and asset loading.
- Confirm CloudFront invalidation behavior.
- Add lightweight uptime or synthetic checks after the production path is stable.
