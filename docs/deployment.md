# Deployment

Coderturtle.io currently has a legacy GitHub Pages workflow in the repo, but the accepted production target is now the Hekton AWS static-site pattern: private S3 origin, CloudFront, ACM, Route 53, and GitHub Actions deploy through OIDC.

## Current Deployment Assessment

| Question | Answer |
|---|---|
| Framework/static tool | Astro |
| Package manager | npm |
| Legacy install command | `npm install` in `.github/workflows/deploy.yml` |
| AWS workflow install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist/` |
| Legacy workflow | `.github/workflows/deploy.yml` to GitHub Pages |
| AWS workflow | `.github/workflows/deploy-aws-static-site.yml` |
| AWS infrastructure | `infra/aws-static-site/` |
| GitHub auth for AWS | OIDC deploy role |
| S3 sync delete behavior | AWS workflow uses `aws s3 sync --delete` |
| CloudFront invalidation | AWS workflow invalidates `/*` |
| Cache headers | General files revalidate; `_astro/` hashed assets are immutable |
| Branch gating | AWS deploy job only runs from `main`; push trigger is commented until first manual deploy succeeds |
| Environment gating | AWS workflow uses GitHub Environment `production` |

## Legacy Workflow Risks

- The checked-in Pages workflow deploys to `gh-pages`, not AWS.
- It uses `npm install` rather than `npm ci`.
- It has no explicit `permissions:` block.
- It has no concurrency control.
- It has no artifact upload for rollback.
- It has no deployment environment protection.
- It has no S3 cache headers, S3 delete behavior, or CloudFront invalidation.

## AWS Static-Site Workflow

The AWS workflow is `.github/workflows/deploy-aws-static-site.yml`. It is manual-only and defaults to dry-run mode until the Terraform stack, OIDC role, GitHub variables, and production environment are ready.

Required GitHub repository variables:

| Variable | Purpose |
|---|---|
| `AWS_REGION` | AWS region for the S3 bucket and credential session |
| `AWS_DEPLOY_ROLE_ARN` | IAM role ARN trusted by GitHub OIDC |
| `S3_BUCKET` | Terraform output `bucket_name` |
| `CLOUDFRONT_DISTRIBUTION_ID` | Terraform output `cloudfront_distribution_id` |

Recommended GitHub environment:

- `production`, with required reviewers before deploy.

Temporary access-key fallback, if OIDC cannot be done immediately:

- Use `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as temporary GitHub environment secrets, scoped to `production`.
- Limit the IAM user or role to the same least-privilege policy below.
- Add a dated backlog item to remove the long-lived keys after OIDC is live.
- Do not commit or expose the key values.

## Infrastructure Gremlin And Terraform

The AWS hosting layer is represented by:

- `infra/aws-static-site/deploy-manifest.yaml`
- `infra/aws-static-site/terraform/`

The Infrastructure Gremlin may preflight, generate `terraform.tfvars`, run `terraform plan`, summarise the plan, and classify blast radius. It must stop before apply. The human applies the reviewed plan.

Terraform creates the static-site hosting resources but intentionally does not create IAM roles or policies. IAM setup stays deliberate because IAM mutation is a gremlin stop condition.

## Least-Privilege Deploy IAM Policy

Replace the placeholders before use. This can be attached to the GitHub OIDC deploy role after the AWS site resources exist.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListWebsiteBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::<S3_BUCKET>"
    },
    {
      "Sid": "SyncWebsiteObjects",
      "Effect": "Allow",
      "Action": [
        "s3:DeleteObject",
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::<S3_BUCKET>/*"
    },
    {
      "Sid": "InvalidateCloudFront",
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::<AWS_ACCOUNT_ID>:distribution/<CLOUDFRONT_DISTRIBUTION_ID>"
    }
  ]
}
```

## GitHub OIDC Trust Policy

Replace `<AWS_ACCOUNT_ID>` and role name outside this policy. The workflow uses GitHub Environment `production`, so scope the OIDC subject to that environment and keep the workflow itself gated to `refs/heads/main`.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:coderturtle/coderturtle-blog:environment:production"
        }
      }
    }
  ]
}
```

Do not widen this to all branches. If a branch-scoped trust policy is preferred instead, remove the job environment from the workflow and test the OIDC subject before deployment.

## Promotion To Automatic Deployment

After manual AWS deploys are proven, enable the commented `push` trigger for `main` with path filters for source, public assets, package manifests, Astro config, and the workflow itself. Keep concurrency and `environment: production` protection in place.

## Cache Policy

The AWS workflow uses two sync passes:

- General files: `public,max-age=0,must-revalidate`
- Hashed Astro files under `_astro/`: `public,max-age=31536000,immutable`

This keeps HTML and route files easy to update while allowing hashed build assets to be cached aggressively. If cache headers need to be changed for unchanged files, run a deliberate metadata replacement pass; `aws s3 sync` may skip unchanged objects.

## IaC Recommendation

Recommended MVP: Terraform-managed AWS static-site infrastructure, with human-only apply.

- Terraform gives repeatability for the new AWS target.
- The repo avoids committing local state, tfvars, plans, or AWS secrets.
- IAM remains outside Terraform for now to stay aligned with the Infrastructure Gremlin guardrails.
- If a previous S3/CloudFront stack exists and must be preserved, import should happen before apply rather than creating parallel resources.

Do not run `terraform apply` until the hosted zone, bucket name, plan summary, and blast-radius classification have been reviewed.
