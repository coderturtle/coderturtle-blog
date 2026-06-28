# Homepage Thread Handoff

This note is for the separate thread designing and building the new homepage.

## Build Contract

- Framework: Astro.
- Package manager: npm.
- Install command for CI: `npm ci`.
- Build command: `npm run build`.
- Output directory: `dist/`.
- Local preview: `npm run preview`.

## Routing

The site is static, not a confirmed SPA. Routes are generated as static files with `trailingSlash: "always"`. Do not rely on a client-side catch-all fallback unless CloudFront custom error responses are later confirmed.

Current `astro.config.mjs` now builds for the production root URL:

- `site: "https://coderturtle.io/"`
- no `base` override

The infrastructure thread has selected AWS static-site hosting for production. The homepage/design thread should expect the final production base URL to be `https://coderturtle.io/`.

## Cache Considerations

The proposed S3/CloudFront workflow caches hashed Astro assets under `_astro/` for one year with `immutable`, while HTML and general files revalidate. Homepage assets that are not content-hashed should be treated as replaceable and should not require long browser caches.

## Asset Naming Expectations

- Prefer hashed build assets emitted by Astro when possible.
- For files placed in `public/`, use stable, intentional names.
- Avoid reusing the same public filename for materially different images if long cache behavior is later introduced.

## Unknowns

- Final S3 bucket name.
- CloudFront distribution ID after Terraform apply.
- CloudFront custom error responses.
- Route 53 hosted zone ID and ACM certificate output.
- Whether a dedicated `404.html` page should be added before changing CloudFront error responses away from the current `/index.html` fallback.
