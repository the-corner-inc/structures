# posts

**Path:** `src/routes/_public/{-$lang}/posts/`\
**Role:** Example: public, localized nested routes

## Purpose

Groups the posts layout, listing and detail screen. `/posts` and `/fr/posts` share the same route files.

## Guidelines

`route.tsx` defines the parent and renders an `Outlet`; `index.tsx` is the listing and `$postId.tsx` is a detail route. Keep domain logic in `src/features/posts/`. This folder has a distinct stable ID from that feature folder, even though both display `posts`.
