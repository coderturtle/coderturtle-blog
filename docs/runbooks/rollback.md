# Rollback Runbook

## Fastest Safe Rollback

If the AWS static-site deployment fails after publishing:

1. Identify the last known good commit.
2. Re-run `.github/workflows/deploy-aws-static-site.yml` from the last known good commit or revert the bad commit on `main`.
3. Confirm the S3 sync completed.
4. Create or wait for a CloudFront invalidation.
5. Verify `https://coderturtle.io/`.

## Artifact-Based Recovery

The AWS workflow uploads the `dist/` artifact for 14 days. If the source commit is still available but the deployed files are not:

1. Download the known-good `coderturtle-io-dist` artifact.
2. Sync it to the same S3 bucket with the same cache-header policy.
3. Invalidate CloudFront with `/*`.

## Emergency Stop

If the AWS path is suspected of causing harm, leave `.github/workflows/deploy.yml` untouched and disable or revert `.github/workflows/deploy-aws-static-site.yml`. Do not rotate AWS secrets or recreate AWS resources as a first response unless there is evidence of credential compromise.

## Notes

- S3 `--delete` removes objects that are no longer in the build output. This is usually correct for static sites, but the first production run should be watched carefully.
- CloudFront may serve cached content until invalidation completes.
- Terraform apply is human-only; do not destroy or recreate infrastructure as a rollback shortcut.
