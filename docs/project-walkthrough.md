# Project Walkthrough

Coderturtle.io is a public personal website and blog built with Astro, Tailwind CSS, and MDX content. It is a Hekton factory-output project: the factory helps maintain and evolve it, but the site itself is the deliverable.

The adoption did not change app behavior. It added Hekton control-plane files so future agents can understand the project classification, repo location, public/private boundary, setup flow, risks, and next actions before editing.

The main thing to understand deeply is the deployment shape. The repository currently identifies as `coderturtle-blog` on GitHub, while the Hekton project identity is `coderturtle.io`. `astro.config.mjs` also points at a GitHub Pages project path. Before public deployment changes, confirm whether the intended production target is the custom `coderturtle.io` domain or the GitHub Pages URL.

Skimmable material: the governance ledgers and repo-local `mind-palace/` mirror are traceability scaffolding. Agents can keep those current after material changes.
