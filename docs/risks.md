# Risks

## Open

### RISK-0001 - Deployment target may not match coderturtle.io custom domain

`astro.config.mjs` currently sets the site/base configuration for `https://coderturtle.github.io/coderturtle-blog/`. Before changing deployment behavior, confirm whether production should publish to the `coderturtle.io` custom domain or the GitHub Pages project URL.

### RISK-0002 - Tracked macOS metadata files are present

`.DS_Store` and `.github/.DS_Store` are tracked in Git. Remove them in a dedicated hygiene commit after adoption so the adoption commit stays limited to Hekton control-plane setup.

### RISK-0003 - npm audit reports dependency vulnerabilities

`npm ci` completed successfully but reported 26 vulnerabilities in the current dependency tree: 1 low, 14 moderate, 10 high, and 1 critical. Review and fix these in a dedicated dependency-maintenance session rather than mixing dependency changes into the adoption commit.
