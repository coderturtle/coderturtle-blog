# ADR-0002: GitHub Pages vs AWS Static Site Deployment

Date: 2026-06-28

## Status

Accepted

## Context

Hekton projects need a repeatable decision rule for static-site hosting. GitHub Pages is fast and low-friction, but AWS static-site hosting gives stronger control over custom domains, caching, invalidation, private origins, DNS, TLS, and production deployment gates.

Coderturtle.io started with GitHub Pages. For the revamp, the desired target is a production-grade AWS static site on `coderturtle.io`.

## Decision

Use GitHub Pages for lightweight previews, examples, throwaway demos, documentation-only sites, and low-risk projects where the GitHub Pages URL is acceptable.

Use AWS static-site hosting for Hekton factory outputs and production/public brand surfaces when one or more of these are true:

- The site needs a first-class custom domain.
- The site represents a durable public identity or product.
- The deployment needs CloudFront invalidation, explicit cache policy, or private S3 origin.
- The project needs Route 53, ACM, protected GitHub environments, or OIDC-based AWS deployment.
- Rollback, observability, and infrastructure ownership matter more than minimum setup cost.

For coderturtle.io, AWS static-site hosting is the accepted production target. GitHub Pages may remain as a temporary legacy path until AWS deploys are verified.

## Consequences

- Future static-site work should decide hosting tier early instead of inheriting defaults.
- Hekton factory-output sites default to AWS when they are public, branded, or expected to become durable.
- GitHub Pages remains useful for cheap previews and non-production documentation.
- Infrastructure Gremlin workflow is the standard path for AWS static-site provisioning: manifest, preflight, plan, classify, human apply, record outputs.
