# Reproducibility

This project should be rebuildable on a future blank Hekton machine using documented scripts.

## Blank-Machine Flow

```bash
git clone git@github.com-coderturtle:coderturtle/coderturtle-blog.git ~/Development/hekton/factory-output/coderturtle.io
cd ~/Development/hekton/factory-output/coderturtle.io
./scripts/check-prereqs.sh
./scripts/bootstrap-project.sh --dry-run
./scripts/bootstrap-project.sh
./scripts/verify-project.sh
```

## What Bootstrap Does

- Checks for `git`, `bash`, `node`, and `npm`.
- Runs `npm ci` when `package-lock.json` is present.
- Writes setup logs under `.project-setup/logs/`.

## What Verify Does

- Checks required Hekton setup files.
- Confirms the npm package metadata exists.
- Runs `npm run build` when dependencies are installed.

## Rules

- Keep local-only files out of Git.
- Do not commit `.env` files.
- Document any new external services before adding automation.
- Keep dependency upgrades separate from adoption or documentation-only commits.
