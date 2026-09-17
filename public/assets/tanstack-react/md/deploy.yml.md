# deploy.yml

**Path:** `.github/workflows/deploy.yml`\
**Role:** Optional: automated deployment

## Purpose

Builds and deploys a reviewed revision to the chosen hosting provider.

## Guidelines

Configure environment-specific credentials and promotion rules. Run migrations as a controlled release step and document rollback; do not assume every hosting adapter produces the same output directory.
