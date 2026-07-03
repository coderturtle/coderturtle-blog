# Coderturtle.io Decisions

## 2026-06-28 - Adopt as factory output

The repo is classified as `factory-output` because it is a public website/blog deliverable rather than shared Hekton machinery or an experimental lab.

## 2026-06-28 - Keep vault sync proposed only

Live vault mutation was not approved during adoption. These files are repo-local mirror drafts until the user approves backup and sync.

## 2026-06-28 - Keep S3/CloudFront adoption conservative (superseded)

The repo originally showed GitHub Pages deployment, while the intended production path was known externally as S3 and CloudFront. This conservative v2-candidate stance is superseded by the later decision to create the Hekton AWS static-site Terraform path for production.

## 2026-06-28 - Use AWS static-site hosting for production

Coderturtle.io should use the Hekton AWS static-site pattern for production. GitHub Pages remains only as the legacy path until private S3, CloudFront, ACM, Route 53, OIDC deploy, and manual verification are complete.

## 2026-06-28 - Use GitHub Pages only for low-risk static deployments

GitHub Pages is for previews, examples, docs, and low-risk sites. Durable Hekton factory-output sites with custom domains, protected deploys, private origins, cache control, and rollback needs should use AWS static-site hosting.
