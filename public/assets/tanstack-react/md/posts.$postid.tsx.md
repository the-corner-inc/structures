# $postId.tsx

**Path:** `src/routes/_public/{-$lang}/posts/$postId.tsx`\
**Role:** Example: dynamic route

## Purpose

The post detail screen at `/posts/$postId` or `/fr/posts/$postId`, where `$postId` captures a URL segment.

## Guidelines

Read the validated `lang` from route context and include it in locale-dependent query keys. Use `Route.useParams()` for the identifier and shared query options in the loader and UI. Validate the identifier at the server boundary, return not-found behavior for missing records, and derive page metadata from public post data.
