# interceptors

Contains HTTP interceptors for modifying requests and responses globally (e.g., adding auth tokens, error handling).

**Typical files:**
- `auth.interceptor.ts`: Adds authentication tokens to requests.
- `version.interceptor.ts`: Handles API versioning.

**Usage:**
Provide interceptors in your app module to apply them globally.
