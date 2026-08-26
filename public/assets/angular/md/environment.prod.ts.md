# environment.prod.ts

Production configuration selected through the file replacements declared in `angular.json`.

```typescript
export const environment = {
  apiUrl: 'https://example.com/api',
  production: true,
};
```

It should expose the same keys as `environment.ts` so application code does not depend on the build target.
