output "bucket_name" {
  description = "Private S3 origin bucket name."
  value       = aws_s3_bucket.site.id
}

output "bucket_arn" {
  description = "Private S3 origin bucket ARN."
  value       = aws_s3_bucket.site.arn
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID for invalidations."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_distribution_arn" {
  description = "CloudFront distribution ARN."
  value       = aws_cloudfront_distribution.site.arn
}

output "cloudfront_domain_name" {
  description = "CloudFront-assigned domain name."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN used by CloudFront."
  value       = local.effective_cert_arn
}

output "site_url" {
  description = "Primary site URL."
  value       = "https://${var.domain_name}"
}
