# Architecture

Coderturtle.io is a public static Astro site. The repository originally contained an Astro/GitHub Pages deployment path; the accepted production target is now the Hekton AWS static-site pattern: private S3 origin, CloudFront, ACM, Route 53, and GitHub Actions deploy via OIDC.

## Observed Legacy Architecture

```text
coderturtle/coderturtle-blog
  -> GitHub Actions: .github/workflows/deploy.yml
  -> npm install
  -> npm run build
  -> dist/
  -> peaceiris/actions-gh-pages
  -> gh-pages branch
  -> GitHub Pages
```

## AWS Static-Site Architecture

Terraform for this target lives under `infra/aws-static-site/terraform`. It should be planned by the Infrastructure Gremlin workflow and applied by the human owner.

```text
GitHub repo: coderturtle/coderturtle-blog
  -> GitHub Actions: .github/workflows/deploy-aws-static-site.yml
  -> checkout
  -> npm ci
  -> npm run build
  -> dist/ artifact
  -> AWS credentials via GitHub OIDC deploy role
  -> aws s3 sync dist/ s3://<S3_BUCKET>/ --delete
  -> aws cloudfront create-invalidation --distribution-id <CLOUDFRONT_DISTRIBUTION_ID> --paths "/*"
  -> CloudFront distribution
  -> private S3 origin via Origin Access Control
  -> DNS: coderturtle.io
```

Infrastructure flow:

```text
infra/aws-static-site/deploy-manifest.yaml
  -> Infrastructure Gremlin preflight
  -> terraform plan
  -> human review gate
  -> human terraform apply
  -> record Terraform outputs
  -> set GitHub repository variables
```

## Known Values

| Item | Value | Source |
|---|---|---|
| GitHub owner/repo | `coderturtle/coderturtle-blog` | Git remote and `.hekton/project.yaml` |
| Local project identity | `coderturtle.io` | `.hekton/project.yaml` |
| Framework | Astro | `package.json`, `astro.config.mjs` |
| Package manager | npm | `package-lock.json` |
| Build command | `npm run build` | `package.json` |
| Output directory | `dist/` | Astro default and workflows |
| Legacy deploy workflow | `.github/workflows/deploy.yml` | Repo inspection |
| Legacy deploy target | GitHub Pages / `gh-pages` branch | Workflow and remote branch |
| AWS static-site workflow | `.github/workflows/deploy-aws-static-site.yml` | Current repo |
| AWS Terraform stack | `infra/aws-static-site/terraform/` | Current repo |
| Deployment manifest | `infra/aws-static-site/deploy-manifest.yaml` | Current repo |
| Default AWS region | `eu-west-2` | Terraform variables and manifest |
| Primary domain | `coderturtle.io` | Terraform variables and manifest |
| Alias domain | `www.coderturtle.io` | Terraform variables and manifest |

## Values To Fill

| Item | Status |
|---|---|
| S3 bucket name | Placeholder in manifest/tfvars example; final value pending |
| Route 53 hosted zone | Required; ID pending |
| CloudFront distribution ID | Terraform output after human apply |
| ACM certificate ARN | Terraform output after human apply |
| GitHub OIDC deploy role ARN | Must be created/configured separately |
| GitHub repository variables | Pending Terraform apply and OIDC role setup |

## Routing And Caching Notes

This is a static Astro site, not a client-side SPA. Pages are built as files under `dist/`, with `trailingSlash: "always"`. The AWS Terraform stack adds a CloudFront Function that rewrites extensionless and trailing-slash paths to `index.html` so routes like `/blog/` resolve against a private S3 origin.

The deployment workflow treats HTML and other general files as revalidated on request, while hashed Astro assets under `dist/_astro/` are eligible for long-lived immutable caching.
