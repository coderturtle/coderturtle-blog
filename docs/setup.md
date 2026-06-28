# Setup

This project follows the Hekton reproducible setup standard:

```text
documented -> scripted -> idempotent-ish -> logged -> reproducible on a blank machine
```

## Intended Flow

```bash
./scripts/check-prereqs.sh
./scripts/bootstrap-project.sh --dry-run
./scripts/bootstrap-project.sh
./scripts/verify-project.sh
```

## Project-Specific Steps

1. Use the `coderturtle` GitHub account.
2. Clone the repo using the coderturtle SSH host alias:

```bash
git clone git@github.com-coderturtle:coderturtle/coderturtle-blog.git ~/Development/hekton/factory-output/coderturtle.io
```

3. Install dependencies:

```bash
npm ci
```

4. Run the site locally:

```bash
npm run dev
```

5. Build before publishing or opening a PR:

```bash
npm run build
```
