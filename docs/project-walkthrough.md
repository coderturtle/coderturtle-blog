# Project Walkthrough

Coderturtle.io is a public personal website and blog built with Astro, Tailwind CSS, and MDX content. It is a Hekton factory-output project: the factory helps maintain and evolve it, but the site itself is the deliverable.

The adoption did not change app behavior. It added Hekton control-plane files so future agents can understand the project classification, repo location, public/private boundary, setup flow, risks, and next actions before editing.

The homepage revamp positions Coderturtle as the workshop voice of the wider ecosystem. Hekton is the factory, Agentic Tekton is the architecture/thought-leadership layer, Gremlins are the reusable product/lab direction, and Coderturtle is the builder/narrator who turns real work into notes, labs, workshops, and field reports.

The current front door follows the broader ecosystem gateway pattern. `/` is a focused gateway page with a single Enter action, while `/enter/` is the workbench homepage with notes, workshop lanes, and ecosystem context. The gateway now leans harder into the Coderturtle personality: a scarred shell/workbench visual, cranky expert-engineer copy, and ecosystem project labels placed directly on intertwined trace lines so Hekton, Agentic Tekton, Gremlins, and Field notes read as connected parts of the same system.

The main thing to understand deeply is the deployment shape. The repository currently identifies as `coderturtle-blog` on GitHub, while the Hekton project identity is `coderturtle.io`. The app now builds for the domain root (`https://coderturtle.io/`) rather than the old GitHub Pages project path; the infra thread still owns S3, CloudFront, and workflow alignment.

The deployment review selected AWS static-site hosting as the production target. Terraform now lives under `infra/aws-static-site/`, the deploy manifest drives the Infrastructure Gremlin workflow, and `.github/workflows/deploy-aws-static-site.yml` is the manual-first deploy path. The current GitHub Pages workflow remains only as the legacy path until AWS infrastructure and deployment are verified.

Skimmable material: the governance ledgers and repo-local `mind-palace/` mirror are traceability scaffolding. Agents can keep those current after material changes.
