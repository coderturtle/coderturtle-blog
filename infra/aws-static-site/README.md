# AWS Static Site Infrastructure

This folder contains the infrastructure plan for hosting `coderturtle.io` on AWS.

The pattern is:

```text
Route 53 -> CloudFront -> private S3 origin
                 |
                 +-> ACM certificate in us-east-1
```

The Terraform in `terraform/` creates:

- Private, versioned, encrypted S3 bucket.
- Public access block for the bucket.
- CloudFront Origin Access Control.
- CloudFront Function for Astro directory-index routing.
- CloudFront distribution.
- Bucket policy allowing only the CloudFront distribution to read objects.
- ACM certificate and DNS validation records.
- Route 53 A and AAAA alias records for `coderturtle.io` and `www.coderturtle.io`.
- A GitHub Actions OIDC deploy role scoped to `coderturtle/coderturtle-blog`'s `production` environment / `main` ref (`github-oidc.tf`), least-privilege to S3 read/write on the site bucket and CloudFront invalidation only.

IAM-via-terraform is normally a stop condition for the Infrastructure Gremlin here (`no_terraform_managed_iam` guardrail). This repo carries a recorded, deliberate exception for the deploy role specifically, converging on the same terraform-managed pattern already applied for the sibling `theagentictekton.com` site rather than the alternative sibling pattern (`hekton-field-journal`'s manually-created, out-of-terraform role) — see `docs/decisions.md` (2026-07-03). The exception is scoped to this one role; it does not reopen IAM mutation generally.

## Human Apply Gate

The Infrastructure Gremlin may:

- Read `deploy-manifest.yaml`.
- Generate a local `terraform.tfvars`.
- Run read-only preflight checks.
- Run `terraform plan`.
- Summarise and classify the plan.

The human applies:

```bash
terraform -chdir=infra/aws-static-site/terraform apply tfplan
```

After a successful apply, set the four GitHub repository variables from the terraform outputs (`terraform output`): `AWS_REGION`, `AWS_DEPLOY_ROLE_ARN` (from `deploy_role_arn`), `S3_BUCKET` (from `bucket_name`), `CLOUDFRONT_DISTRIBUTION_ID` (from `cloudfront_distribution_id`). The deploy workflow (`.github/workflows/deploy-aws-static-site.yml`) is already live on push-to-`main` and starts deploying automatically the moment these exist — no further workflow change needed.

Do not commit `terraform.tfvars`, `tfplan`, `tfplan.json`, Terraform state, or AWS account identifiers unless they are explicitly intended to be public project metadata.
