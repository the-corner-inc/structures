import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { COLOR_SCHEME_OPTIONS } from 'ngx-color-scheme';
import { provideMarkdown } from 'ngx-markdown';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // Vendors
    provideMarkdown(),
    {
      provide: COLOR_SCHEME_OPTIONS,
      useValue: {
        darkModeClass: 'dark',
        lightModeClass: 'light',
      },
    },
  ],
};
