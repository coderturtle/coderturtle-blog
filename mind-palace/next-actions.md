# Coderturtle.io Next Actions

- [ ] Fill local Terraform tfvars for `infra/aws-static-site/terraform/` after confirming Route 53 hosted zone ID and bucket name.
- [ ] Run Infrastructure Gremlin preflight and Terraform plan for the AWS static-site stack.
- [ ] Human-review and apply the AWS static-site Terraform plan.
- [ ] Configure GitHub OIDC role and repository variables for `.github/workflows/deploy-aws-static-site.yml`.
- [ ] Run the AWS deploy workflow in dry-run mode from `main`.
- [ ] Decide when to retire the current GitHub Pages workflow after AWS deployment is verified.
- [ ] Remove tracked `.DS_Store` files in a separate hygiene commit.
- [ ] Review npm audit output and plan dependency updates separately from adoption.
- [ ] Sync this mirror to the live vault only after explicit approval and backup.
