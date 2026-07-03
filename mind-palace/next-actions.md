# Coderturtle.io Next Actions

Production/infra work is done: AWS static-site stack live and verified, legacy 2020 CloudFront/S3 decommissioned (backed up first), GitHub Pages turned off, reusable deploy-workflow template hardened in `blog-factory-lab`. Remaining open items, condensed from the full list in the main repo's `docs/next-actions.md`:

- [ ] Review `astro.config.mjs` site/base settings against the production domain.
- [ ] Delete the now-disabled legacy `.github/workflows/deploy.yml` file itself (small cleanup, not urgent).
- [ ] Plan a dedicated astro@5->7 upgrade to close the 5 remaining npm audit findings.
- [ ] A handful of open design/content review items on `/enter/` and the gateway (palette/mood confirmation, turtle-art contrast, voice/tone review) — see the full list for detail.
- [ ] Split real Labs and Workshops pages out of the homepage once source content exists.
- [ ] Add real project entries beyond the single migrated "Coderturtle.io" project once other real projects have material worth logging.
- [ ] Review and optionally sync repo-local `mind-palace/` files into the live vault after backup (still requires separate explicit authorization).
