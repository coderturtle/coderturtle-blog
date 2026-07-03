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

It intentionally does not create IAM roles or policies. The Infrastructure Gremlin guardrails treat IAM mutation as a stop condition, so the GitHub OIDC deploy role is documented in `docs/deployment.md` and should be created deliberately.

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

Do not commit `terraform.tfvars`, `tfplan`, `tfplan.json`, Terraform state, or AWS account identifiers unless they are explicitly intended to be public project metadata.
