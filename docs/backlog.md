# Backlog

## Deployment

- [ ] Confirm current live DNS target before AWS cutover.
- [ ] Identify the Route 53 hosted zone ID for `coderturtle.io`.
- [ ] Choose a globally unique S3 bucket name and fill local Terraform tfvars.
- [ ] Run Infrastructure Gremlin preflight and Terraform plan.
- [ ] Human-review and apply the Terraform static-site plan.
- [ ] Create a GitHub OIDC role with least-privilege S3 and CloudFront permissions.
- [ ] Add GitHub repository variables for `.github/workflows/deploy-aws-static-site.yml`.
- [ ] Configure GitHub Environment `production` with reviewer protection.
- [ ] Run `.github/workflows/deploy-aws-static-site.yml` in dry-run mode.
- [ ] Run the first AWS deploy manually after AWS values and IAM are confirmed.
- [ ] Add `main` push trigger and path filters after manual AWS deploys are proven.
- [ ] Decide when to retire or replace `.github/workflows/deploy.yml`.

## Infrastructure As Code

- [ ] Add drift-check instructions after the Terraform stack is applied or imported.
- [ ] Decide whether deploy IAM should stay manually managed or move into a reviewed platform IAM module later.

## Site Configuration

- [ ] Update `astro.config.mjs` `site` and `base` after the production hosting target is confirmed.
- [ ] Confirm whether CloudFront has custom error responses or SPA fallback behavior.
- [ ] Confirm cache behavior for HTML, RSS, sitemap, images, fonts, and hashed `_astro/` assets.

## Hygiene

- [ ] Remove tracked `.DS_Store` files in a dedicated hygiene commit.
- [ ] Review npm audit findings in a separate dependency-maintenance session.
