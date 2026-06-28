# Operating Model

Coderturtle.io is a public Astro/Tailwind website and blog adopted into Hekton as a factory-output project.

## Common Commands

```bash
./scripts/check-prereqs.sh
./scripts/bootstrap-project.sh --dry-run
./scripts/bootstrap-project.sh
./scripts/verify-project.sh
npm run dev
npm run build
npm run preview
```

## Change Policy

- Keep Hekton metadata, documentation, and app behavior changes in separate commits.
- Treat deployment configuration as public-release-sensitive; changes require human review.
- Do not modify dependency manifests or lockfiles without explicit approval.
- Do not write to the live vault unless the user authorizes that session.

## Validation

Cheapest local checks:

```bash
./scripts/check-prereqs.sh
./scripts/verify-project.sh
```

Full app check after dependencies are installed:

```bash
npm run build
```
