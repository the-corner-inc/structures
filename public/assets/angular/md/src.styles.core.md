# core

Implements cross-cutting concerns and application-wide logic. Contains services, guards, interceptors, models, and utilities that are used throughout the app.

- `guards/`: Route guards for access control.
- `interceptors/`: HTTP interceptors for request/response handling.
- `models/`: TypeScript models, enums, and interfaces.
- `services/`: Singleton services for business logic and API calls.
- `utils/`: Utility functions and helpers.

## Services
**Every** services in this folder should be provided in root to ensure singleton behavior across the app. 

```typescript
@Injectable({
  providedIn: 'root',
})
export class SingletonService {
  // Service logic here
}
```
