# Adoption Audit - Coderturtle.io

Date: 2026-06-28

## Intake

- Source requested: `coderturtle/coderturtle.io`
- GitHub resolution: `coderturtle/coderturtle-blog`
- Source URL: `https://github.com/coderturtle/coderturtle-blog`
- Temporary intake path: `/private/tmp/hekton-adoption/coderturtle.io`
- Permanent local path: `/Users/hekton/Development/hekton/factory-output/coderturtle.io`
- Owner/account: `coderturtle`
- Privacy boundary: public
- Git history: preserve
- Upstream sync: keep possible

## Initial Inspection

- README reviewed: yes
- License reviewed: MIT License
- Dependency manifests reviewed: `package.json`, `package-lock.json`
- Setup docs reviewed: README getting-started notes
- `.gitignore` reviewed: ignores `node_modules`, `dist`, generated Astro types, env files, macOS files, and IDE files
- Remotes reviewed: origin points to `coderturtle/coderturtle-blog`
- Recent history reviewed: latest commits are MDX/theme/rendering fixes
- Generated/local-only files identified: tracked `.DS_Store` and `.github/.DS_Store`
- Secrets scan performed: no tracked `.env` files, private keys, or obvious credential values found

## Classification

- Classification: `factory-output`
- Rationale: this is a public website/blog deliverable, not reusable Hekton platform machinery and not a time-boxed experimental lab.
- Vault control-plane path: `20-projects/factory-output/coderturtle.io`
- Canonical lifecycle stage: `active`
- Adoption status: `adopted`

## Technical Shape

- Framework: Astro
- Styling: Tailwind CSS
- Content: MDX and Astro content collections
- Build commands: `npm run build`
- Local dev command: `npm run dev`
- Preview command: `npm run preview`
- Deployment: GitHub Pages workflow via `.github/workflows/deploy.yml`

## Risks And Follow-Ups

- Tracked `.DS_Store` files should be removed in a follow-up hygiene commit.
- `astro.config.mjs` currently sets `site` and `base` to the GitHub Pages project path, not the `coderturtle.io` custom domain named by the project.
- The GitHub Actions workflow uses `npm install`; a future reproducibility pass may prefer `npm ci`.
- `npm ci` reported 26 audit vulnerabilities in the current dependency tree; dependency fixes should be handled separately from adoption.
- Live vault mutation was not authorized during adoption; repo-local `mind-palace/` mirror files were drafted only.
