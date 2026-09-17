# post-form.tsx

**Path:** `src/features/posts/post-form.tsx`\
**Role:** Optional: TanStack Form

## Purpose

Post editing UI with form values, field validation, and submission feedback.

## Guidelines

Use the shared post schema, explicit default values, and field-level error messages. Await the save action and handle rejection. Keep unsaved input in the form rather than mutating the query cache on every keystroke.

## Reference

[TanStack Form validation](https://tanstack.com/form/latest/docs/framework/react/guides/validation).
