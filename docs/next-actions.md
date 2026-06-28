# Next Actions

- [ ] Fill local Terraform tfvars for `infra/aws-static-site/terraform/` after confirming Route 53 hosted zone ID and bucket name.
- [ ] Run Infrastructure Gremlin preflight and Terraform plan for the AWS static-site stack.
- [ ] Human-review and apply the AWS static-site Terraform plan.
- [ ] Configure GitHub OIDC role and repository variables for `.github/workflows/deploy-aws-static-site.yml`.
- [ ] Run the AWS deploy workflow in dry-run mode from `main`.
- [ ] Review `astro.config.mjs` site/base settings against the intended `coderturtle.io` production domain.
- [ ] Remove tracked `.DS_Store` and `.github/.DS_Store` in a dedicated hygiene commit.
- [ ] Decide when to retire the current GitHub Pages workflow after AWS deployment is verified.
- [ ] Review npm audit output and plan dependency updates in a dedicated maintenance branch.
- [ ] Review and optionally sync repo-local `mind-palace/` files into the live vault after backup.
- [ ] Split real Labs and Workshops pages out of the homepage once source content exists.
- [ ] Replace legacy About placeholder copy with Coderturtle-specific biographical and ecosystem context.
- [ ] Decide whether `/enter/` should remain the long-term content hub or become a temporary bridge until Labs and Workshops pages exist.
- [ ] Human-review the scarred-shell gateway art direction and decide whether to keep the cranky expert-engineer tone as the durable Coderturtle voice.
