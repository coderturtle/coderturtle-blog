# Risks

## Open

### RISK-0001 - Legacy GitHub Pages workflow remains before AWS cutover

The Astro config now builds for `https://coderturtle.io/`, but the legacy `.github/workflows/deploy.yml` still deploys to GitHub Pages. Keep it until AWS infrastructure and deployment variables are ready, then retire it in a separate cutover commit.

### RISK-0002 - Tracked macOS metadata files are present

`.DS_Store` and `.github/.DS_Store` are tracked in Git. Remove them in a dedicated hygiene commit after adoption so the adoption commit stays limited to Hekton control-plane setup.

### RISK-0003 - npm audit reports dependency vulnerabilities

`npm ci` completed successfully but reported 26 vulnerabilities in the current dependency tree: 1 low, 14 moderate, 10 high, and 1 critical. Review and fix these in a dedicated dependency-maintenance session rather than mixing dependency changes into the adoption commit.

### RISK-0004 - AWS production details still need human confirmation

The repo now contains Terraform and a deploy manifest for AWS static-site hosting, but the Route 53 hosted zone ID, globally unique bucket name, Terraform plan, CloudFront output, and GitHub OIDC deploy role still need human confirmation before cutover.
