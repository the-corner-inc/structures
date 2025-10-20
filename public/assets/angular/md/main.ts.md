# main.ts

Application bootstrap file. Initializes and starts the Angular application.

## Example

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, 
  {
    providers: [
      provideHttpClient(withFetch()),
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideRouter(routes),
      provideClientHydration(withEventReplay()),

      {
        provide: SOME_SETTINGS,
        useValue: {/* some settings values */}
      },

      // Vendors
      provideVendor(),
    ]
  }
).catch((err) => console.error(err));
```
