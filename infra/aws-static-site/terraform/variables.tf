variable "project_name" {
  description = "Project name used for tags and resource naming."
  type        = string
  default     = "coderturtle-io"
}

variable "aws_region" {
  description = "AWS region for the S3 origin bucket."
  type        = string
  default     = "eu-west-2"
}

variable "bucket_name" {
  description = "Globally unique private S3 origin bucket name."
  type        = string
}

variable "domain_name" {
  description = "Primary site domain."
  type        = string
  default     = "coderturtle.io"
}

variable "aliases" {
  description = "Additional custom domains served by the distribution."
  type        = list(string)
  default     = ["www.coderturtle.io"]
}

variable "hosted_zone_id" {
  description = "Route 53 hosted zone ID for coderturtle.io."
  type        = string
}

variable "create_acm_certificate" {
  description = "Create and DNS-validate a CloudFront ACM certificate in us-east-1."
  type        = bool
  default     = true
}

variable "acm_certificate_arn" {
  description = "Existing ACM certificate ARN in us-east-1. Used when create_acm_certificate is false."
  type        = string
  default     = ""
}

variable "create_dns_records" {
  description = "Create Route 53 alias records for domain_name and aliases."
  type        = bool
  default     = true
}

variable "default_root_object" {
  description = "CloudFront default root object."
  type        = string
  default     = "index.html"
}

variable "error_response_page_path" {
  description = "Object to serve for missing paths. Use /404.html after the site ships one."
  type        = string
  default     = "/index.html"
}

variable "price_class" {
  description = "CloudFront price class. PriceClass_100 keeps the first cut cost-aware."
  type        = string
  default     = "PriceClass_100"
}

variable "tags" {
  description = "Extra tags merged onto managed resources."
  type        = map(string)
  default     = {}
}
