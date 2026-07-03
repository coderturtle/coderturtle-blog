# Deploy Runbook

## Current Production-Safe State

The existing `.github/workflows/deploy.yml` workflow is still present and builds to GitHub Pages. The accepted target is now AWS static-site hosting through `.github/workflows/deploy-aws-static-site.yml`.

The AWS workflow is manual-only and defaults to dry-run mode until Terraform outputs and the OIDC deploy role are configured.

## Preflight

1. Confirm the intended production domain is `coderturtle.io`.
2. Confirm `astro.config.mjs` has the correct `site` and `base` for the AWS cutover commit.
3. Confirm Terraform has provisioned the S3 bucket and CloudFront distribution, or that existing resources have been imported.
4. Confirm the AWS region.
5. Confirm the GitHub OIDC deploy role ARN.
6. Confirm GitHub repository variables:
   - `AWS_REGION`
   - `AWS_DEPLOY_ROLE_ARN`
   - `S3_BUCKET`
   - `CLOUDFRONT_DISTRIBUTION_ID`
7. Confirm GitHub Environment `production` exists and has reviewer protection.

## Dry Run

Run `.github/workflows/deploy-aws-static-site.yml` manually with `dry_run: true`.

Expected result:

- Checkout succeeds.
- `npm ci` succeeds.
- `npm run build` succeeds.
- `coderturtle-io-dist` artifact is uploaded.
- No AWS credentials are assumed.
- No S3 or CloudFront changes happen.

## First Real Deploy

Run `.github/workflows/deploy-aws-static-site.yml` manually with `dry_run: false` from `main` only.

Expected result:

- Build artifact is downloaded.
- AWS OIDC role is assumed.
- General files sync to S3 with revalidation cache headers.
- `_astro/` files sync to S3 with immutable cache headers.
- CloudFront invalidation is created for `/*`.

## Post-Deploy Verification

Check:

- `https://coderturtle.io/`
- `/about/`
- `/blog/`
- RSS feed
- Sitemap
- Browser console for missing assets
- CloudFront distribution status after invalidation

Keep the current GitHub Pages workflow until these checks are repeatable, then retire it in a separate deployment cutover commit.
