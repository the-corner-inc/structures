# environment.ts

Development-time configuration used by local builds and tests.

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api',
  production: false,
};
```

Keep secrets out of this file: values bundled here are visible to anyone running the application.
