# GitHub Actions deploy role (OIDC). No long-lived keys: the deploy workflow assumes this
# role via the GitHub OIDC provider, scoped to this repo's production environment / main ref.
# The OIDC provider already exists in the account, so it is referenced, not created.
#
# Mirrors agentic-tekton's infra/aws-static-site/terraform/github-oidc.tf exactly (same
# account, same pattern) rather than hekton-field-journal's manually-created role, per an
# explicit decision to converge on the terraform-managed version. See docs/decisions.md.

data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

locals {
  gh_repo = "coderturtle/coderturtle-blog"
}

resource "aws_iam_role" "deploy" {
  name = "${var.project_name}-deploy"
  tags = local.base_tags

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Federated = data.aws_iam_openid_connect_provider.github.arn }
      Action    = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = { "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com" }
        StringLike = {
          "token.actions.githubusercontent.com:sub" = [
            "repo:${local.gh_repo}:environment:production",
            "repo:${local.gh_repo}:ref:refs/heads/main",
          ]
        }
      }
    }]
  })
}

resource "aws_iam_role_policy" "deploy" {
  name = "${var.project_name}-deploy"
  role = aws_iam_role.deploy.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "ListSiteBucket"
        Effect   = "Allow"
        Action   = ["s3:ListBucket"]
        Resource = aws_s3_bucket.site.arn
      },
      {
        Sid      = "WriteSiteObjects"
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:DeleteObject"]
        Resource = "${aws_s3_bucket.site.arn}/*"
      },
      {
        Sid      = "InvalidateCdn"
        Effect   = "Allow"
        Action   = ["cloudfront:CreateInvalidation"]
        Resource = aws_cloudfront_distribution.site.arn
      },
    ]
  })
}

output "deploy_role_arn" {
  description = "IAM role ARN for the GitHub Actions deploy workflow (OIDC)."
  value       = aws_iam_role.deploy.arn
}
