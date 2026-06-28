# Terraform: coderturtle.io AWS Static Site

This Terraform stack creates the AWS hosting layer for `coderturtle.io`.

## Required Values

Copy the example tfvars locally:

```bash
cp infra/aws-static-site/terraform/terraform.tfvars.example infra/aws-static-site/terraform/terraform.tfvars
```

Then replace:

- `bucket_name`
- `hosted_zone_id`

The Route 53 hosted zone for `coderturtle.io` must exist before planning.

## Gremlin Preflight

Read-only checks:

```bash
terraform -chdir=infra/aws-static-site/terraform version
aws sts get-caller-identity
aws route53 list-hosted-zones-by-name --dns-name coderturtle.io
```

## Plan

```bash
terraform -chdir=infra/aws-static-site/terraform init -input=false
terraform -chdir=infra/aws-static-site/terraform plan -input=false -out=tfplan
terraform -chdir=infra/aws-static-site/terraform show -json tfplan > infra/aws-static-site/terraform/tfplan.json
```

The Infrastructure Gremlin summarises and classifies the plan, then stops.

## Apply

Human only:

```bash
terraform -chdir=infra/aws-static-site/terraform apply tfplan
```

After apply, record outputs back into `infra/aws-static-site/deploy-manifest.yaml` and GitHub repository variables.
