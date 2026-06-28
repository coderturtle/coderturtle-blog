# Decisions

Append-only decision log for Coderturtle.io.

## 2026-06-28 - Adopt as Hekton factory output

Coderturtle.io is classified as a `factory-output` project because it is a public website/blog deliverable maintained by the factory. It is not shared Hekton machinery and does not have a lab-style promotion target.

## 2026-06-28 - Preserve existing Git history

The repo was cloned from GitHub and kept as a normal Git repository rather than being re-created from a new scaffold. Adoption adds Hekton metadata and docs only; product behavior, dependency versions, and source files remain unchanged.

## 2026-06-28 - Keep live vault mutation disabled

The project proposes `20-projects/factory-output/coderturtle.io` as its mind-palace path, but this adoption session does not write to the live Obsidian vault. Repo-local `mind-palace/` files are the draft control plane until the user approves a sync.

## 2026-06-28 - Use Field Desk as homepage MVP

The homepage revamp will use the Field Desk concept: a static, fast, workshop-like homepage that presents Coderturtle as the hands-on notes/labs/workshops voice of the wider Hekton, Agentic Tekton, and Gremlins ecosystem. This keeps the site personal and practical while avoiding a corporate landing-page feel or a complex CMS.

## 2026-06-28 - Use a gateway front door

Coderturtle.io will follow the gateway pattern used by adjacent ecosystem sites: `/` is a full-viewport front door and `/enter/` contains the richer workbench-style homepage. The gateway leans into Coderturtle's shell/workshop identity while keeping the implementation static and dependency-free.

## 2026-06-28 - Serve from the domain root

Coderturtle.io should build for the canonical root URL, not the old GitHub Pages project path. Astro now uses `site: "https://coderturtle.io/"` with no `base` override, so generated links and assets resolve from `/`.

## 2026-06-28 - Use AWS static-site hosting for production

Coderturtle.io should move to the Hekton AWS static-site pattern for production: private S3 origin, CloudFront, ACM, Route 53, GitHub Actions OIDC, and human-gated Terraform apply. GitHub Pages remains only as the legacy path until AWS deployment is verified.

## 2026-06-28 - Standardize GitHub Pages vs AWS deployment choice

GitHub Pages is appropriate for lightweight previews, docs, examples, and low-risk static sites. AWS static-site hosting is the default for durable Hekton factory-output sites, branded public surfaces, first-class custom domains, private origins, explicit cache policy, CloudFront invalidation, and protected production deploys.

## 2026-06-28 - Emphasize scarred-shell gateway personality

The root gateway should make Coderturtle feel like the hands-on, battle-scarred engineer voice of the ecosystem rather than a generic brand portal. The turtle/shell mark, scar lines, cranky workbench copy, and Hekton / Agentic Tekton / Gremlins / Field notes labels now live on the intertwined trace field to show they are connected parts of one ecosystem.
