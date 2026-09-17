# features

**Path:** `src/features`\
**Role:** Project convention: domain organization

## Purpose

Self-contained application capabilities such as authentication and posts.

## Guidelines

Keep a feature's UI, queries, validation, and tests close together. Routes compose features; shared code should not import back into feature modules.

## Contents

- `auth/`
- `posts/`
